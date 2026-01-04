const SLA_COUNT = Number(process.argv[2]) || 5000
const MODE = process.argv[3] || 'timeout' // timeout | interval

console.log(`\nRunning ${MODE.toUpperCase()} test with ${SLA_COUNT} SLAs\n`)

const slas = []
const now = Date.now()

for (let i = 0; i < SLA_COUNT; i++) {
    slas.push({
        id: i,
        breachTime: now + Math.random() * 10000_000, // 0–60s
        breached: false
    })
}

/* ----------------------------------
   MEMORY & CPU MONITOR
-----------------------------------*/
setInterval(() => {
    const mem = process.memoryUsage()
    const cpu = process.cpuUsage()

    console.log(
        `MEM ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB | ` +
        `CPU ${(cpu.user / 1000).toFixed(2)} ms`
    )
}, 2000)

/* ----------------------------------
   MODE 1: setTimeout per SLA
-----------------------------------*/
function runTimeoutMode() {
    for (const sla of slas) {
        const delay = sla.breachTime - Date.now()

        setTimeout(() => {
            sla.breached = true
        }, delay)
    }
}

/* ----------------------------------
   MODE 2: single setInterval poller
-----------------------------------*/
function runIntervalMode() {
    setInterval(() => {
        const now = Date.now()

        for (const sla of slas) {
            if (!sla.breached && sla.breachTime <= now) {
                sla.breached = true
            }
        }
    }, 1000)
}

/* ----------------------------------
   RUN
-----------------------------------*/
console.time('setup')

if (MODE === 'timeout') runTimeoutMode()
if (MODE === 'interval') runIntervalMode()

console.timeEnd('setup')
