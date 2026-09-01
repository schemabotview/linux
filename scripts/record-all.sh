#!/usr/bin/env bash
# record-all.sh — overnight batch: every Linux course → scripts/out/<course>.mp4
#
#   caffeinate -dimsu bash scripts/record-all.sh
#
# Runs its OWN dedicated dev server on RECORD_PORT (default 5183, --strictPort so it never
# silently lands on a neighbour's port) and hands it to every course via APP_URL, so the eight
# record-course runs share one Vite process instead of spawning and killing eight. The server is
# torn down on exit (including Ctrl-C) by the trap.
#
# Courses run in spine order; a failing course does not stop the batch — it is recorded in the
# summary at the end. record-course.mjs is incrementally resumable (per-segment fingerprints), so
# re-running this script after a failure re-uses every good segment.

set -uo pipefail
cd "$(dirname "$0")/.."

PORT="${RECORD_PORT:-5183}"
COURSES=(kernel shell filesystem processes text admin scripting project)
LOG_DIR="scripts/out"
mkdir -p "$LOG_DIR"

echo "▶ dev server on :$PORT"
npx vite --port "$PORT" --strictPort >"$LOG_DIR/dev-server.log" 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null' EXIT

for i in $(seq 1 60); do
  curl -sf "http://localhost:$PORT/" >/dev/null && break
  sleep 1
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "✗ dev server died — see $LOG_DIR/dev-server.log"; exit 1
  fi
done
echo "  up at http://localhost:$PORT/"

export APP_URL="http://localhost:$PORT/"
declare -a RESULTS=()

for course in "${COURSES[@]}"; do
  echo ""
  echo "=== $course ($(date '+%H:%M:%S')) ==="
  if node scripts/record-course.mjs "$course"; then
    RESULTS+=("✓ $course")
  else
    RESULTS+=("✗ $course")
  fi
done

echo ""
echo "=== batch done $(date '+%Y-%m-%d %H:%M:%S') ==="
printf '%s\n' "${RESULTS[@]}"
ls -lh "$LOG_DIR"/*.mp4 2>/dev/null
