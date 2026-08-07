cpu_usage="$(mpstat | grep 'all' | awk '{print 100 - $13}')"
cpu_temp="$(sensors 2>/dev/null | grep 'Package id 0' | awk '{print $4}' | grep -oE '[0-9\.]+')"

gpu="$(nvidia-smi \
    --query-gpu=utilization.gpu,temperature.gpu,memory.used,memory.total \
    --format=csv,noheader,nounits |
    awk -F', ' '{printf "{\"usage\":%s,\"temp\":%s,\"used_vram\":%s,\"total_vram\":%s}", $1,$2,$3,$4}')"

memory="$(free --mega | grep 'Mem' | grep -oE '[0-9\.]+' | paste -sd ' ' | awk '{print "{\"used\":" $2 ", \"total\":" $1 "}"}')"

disk="$(df -BM / | awk 'NR==2 {gsub(/M/,"",$3); gsub(/M/,"",$2); printf "{\"used\":%s,\"total\":%s}", $3,$2}')"

printf '{"cpu":{"usage":%s,"temp":%s},"gpu":%s,"memory":%s,"disk":%s}\n' \
    "$cpu_usage" "$cpu_temp" "$gpu" "$memory" "$disk"