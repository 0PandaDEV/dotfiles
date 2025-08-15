#!/bin/bash

LOG_FILE="$HOME/.cache/ags-combined.log"
AGS_CONFIG_DIR="$HOME/.config/ags"

log_with_timestamp() {
    while IFS= read -r line; do
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1: $line" >> "$LOG_FILE"
    done
}

start_ags() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting AGS..." >> "$LOG_FILE"
    
    ags run --gtk 3 > >(log_with_timestamp "AGS") 2> >(log_with_timestamp "AGS-ERR") &
}

stop_ags() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Stopping AGS and GJS processes..." >> "$LOG_FILE"
    killall ags gjs 2>/dev/null || true
    sleep 1
}

if ! pgrep -x "ags" > /dev/null; then
    start_ags
fi

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
