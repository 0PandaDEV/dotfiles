#!/bin/bash

if ! pgrep -x "ags" > /dev/null; then
	ags run --gtk 3 &
fi

current_checksum=$(find ~/.config/ags -type f -exec md5sum {} \; | sort | md5sum)

while true; do
	new_checksum=$(find ~/.config/ags -type f -exec md5sum {} \; | sort | md5sum)

	if [ "$current_checksum" != "$new_checksum" ]; then
		killall ags gjs && ags run --gtk 3 & current_checksum=$new_checksum
	fi

	sleep 1
done
