sketchybar --set $NAME \
  icon.color=0xfff7b860

SITE_IDS=("pandadev.net" "nextron.pandadev.net" "vleer.app" "time4-map.vercel.app" "blocks.pandadev.net")
TOTAL_VISITORS=0

for SITE_ID in "${SITE_IDS[@]}"; do
  VISITORS_JSON=$(curl -s -H "Authorization: Bearer {TOKEN ._.}" "https://plausible.pandadev.net/api/v1/stats/aggregate?site_id=${SITE_ID}&period=12mo&metrics=visitors")
  VISITORS=$(echo $VISITORS_JSON | jq '.results.visitors.value')
  TOTAL_VISITORS=$(($TOTAL_VISITORS + $VISITORS))
done

sketchybar --set $NAME label="$TOTAL_VISITORS"