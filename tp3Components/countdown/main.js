
const countdown = document.querySelector(".countdown")
const premiereDate = {
    year: 2021,
    zeroIndexMonth: 2,
    day: 4,
    hours: 0,
    minutes: 0,
    seconds: 0 
}



let today 
let premiere = new Date(...Object.values(premiereDate))
let pendingMS, pendingDays, pendingHours, pendingMinutes, pendingSeconds
let parsedPendingDays, parsedPendingHours, parsedPendingMinutes, parsedPendingSeconds

const setCountdown = () => {
    today = new Date()
    pendingMS = premiere - today
    pendingDays = (premiere - today)/(1000*60*60*24)
    pendingHours = ((pendingDays - Math.floor(pendingDays))*24)
    pendingMinutes = ((pendingHours - Math.floor(pendingHours))*60)
    pendingSeconds = ((pendingMinutes - Math.floor(pendingMinutes))*60)
    parsedPendingDays = Math.floor(pendingDays)
    parsedPendingHours = Math.floor(pendingHours)
    parsedPendingMinutes = Math.floor(pendingMinutes)
    parsedPendingSeconds = Math.floor(pendingSeconds)
    countdown.textContent = `${parsedPendingDays}D : ${addLeftZero(parsedPendingHours)}H : ${addLeftZero(parsedPendingMinutes)}M : ${addLeftZero(parsedPendingSeconds)}S`
}

const addLeftZero = (time) => {
    return time < 10 ? '0' + time : time
}

setCountdown()
setInterval(() => {
    setCountdown()
}, 1000);


