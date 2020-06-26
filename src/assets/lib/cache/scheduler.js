const queue = []
let wait = false

function nextTick(callback) {
  Promise.resolve().then(callback)
}

function resetSchedulerState() {
  queue.length = 0
  wait = false
}

function flushSchedulerQueue() {
  for (let i = 0; i < queue.length; i += 1) queue[i]()
  resetSchedulerState()
}

export default function (handler) {
  if (!queue.includes(handler)) queue.push(handler)
  if (!wait) {
    wait = true
    nextTick(flushSchedulerQueue)
  }
}
