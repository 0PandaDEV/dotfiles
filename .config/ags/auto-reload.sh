#!/bin/bash

# Configuration
LOG_FILE="$HOME/.cache/ags-combined.log"
AGS_CONFIG_DIR="$HOME/.config/ags"

# Function to log with timestamp
log_with_timestamp() {
    while IFS= read -r line; do
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1: $line" >> "$LOG_FILE"
    done
}

# Function to start AGS with logging
start_ags() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting AGS..." >> "$LOG_FILE"
    
    # Start AGS and redirect both stdout and stderr to logging function
    ags run --gtk 3 > >(log_with_timestamp "AGS") 2> >(log_with_timestamp "AGS-ERR") &
    
    # Also capture any gjs processes that might spawn
    sleep 1
    
    # Monitor for new gjs processes and log them too
    pkill -f "gjs.*ags" 2>/dev/null || true
    
    # Start AGS again to ensure clean start
    ags run --gtk 3 > >(log_with_timestamp "AGS") 2> >(log_with_timestamp "AGS-ERR") &
}

# Function to stop AGS and related processes
stop_ags() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Stopping AGS and GJS processes..." >> "$LOG_FILE"
    killall ags gjs 2>/dev/null || true
    sleep 1
}

# Initialize log file
echo "[$(date '+%Y-%m-%d %H:%M:%S')] AGS watcher started" > "$LOG_FILE"

# Start AGS if not running
if ! pgrep -x "ags" > /dev/null; then
    start_ags
fi

# Monitor for config changes
current_checksum=$(find "$AGS_CONFIG_DIR" -type f -exec md5sum {} \; 2>/dev/null | sort | md5sum)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Monitoring $AGS_CONFIG_DIR for changes..." >> "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Log file: $LOG_FILE" >> "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Use 'tail -f $LOG_FILE' to monitor in real-time" >> "$LOG_FILE"

while true; do
    new_checksum=$(find "$AGS_CONFIG_DIR" -type f -exec md5sum {} \; 2>/dev/null | sort | md5sum)
    
    if [ "$current_checksum" != "$new_checksum" ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Configuration change detected, restarting..." >> "$LOG_FILE"
        stop_ags
        start_ags
        current_checksum=$new_checksum
    fi
    
    sleep 1
done
