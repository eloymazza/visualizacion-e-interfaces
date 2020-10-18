const loadHomeJS = () => {

    let scrollLevel = 0
    const paralaxContainer = document.querySelector(".paralax-container") 
    const countdownContainer = document.querySelector(".countdown-container") 
    const castGridContainer = document.querySelector(".cast-grid-container") 
    const sliderContainer = document.querySelector(".slider-container") 

    document.addEventListener("wheel", (e) => {
        if(e.deltaY > 0) {
            scrollLevel += 1
        }
        else {
            console.log("arriba")
        }
        transitionManager()
    })

    const transitionManager = () => {
        if(scrollLevel > 0 && scrollLevel < 11) assignParalaxTransition()
        else if (scrollLevel >= 11 && scrollLevel < 20) assignCoundownEntrance() 
        else if (scrollLevel >= 20 && scrollLevel < 23) assignCoundownExit()
        else if(scrollLevel > 24 && scrollLevel < 32) assignGridEntrance() 
        else if(scrollLevel >= 33 && scrollLevel < 42) assignGridExit() 
        else if(scrollLevel >= 42) assignSliderEntrance() 

    }

    const assignParalaxTransition = () => [
        paralaxContainer.style.opacity = 1 - scrollLevel/10 
    ]
    
    const assignCoundownEntrance = () => {
        countdownContainer.classList.add('fade-in')
    }

    const assignCoundownExit = () => {
        countdownContainer.classList.remove('fade-in')
    }

    const assignGridEntrance = () => {
        castGridContainer.classList.add('slide-in')
    }

    const assignGridExit = () => {
        castGridContainer.classList.remove('slide-in')
    }

    const assignSliderEntrance = () => {
        sliderContainer.classList.add('appear-in-center')
    }

    
    // Countdown
    
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



    /* Slider */ 

    const leftButton = document.querySelector('#left-button')
    const rightButton = document.querySelector('#right-button')
    const images = document.querySelectorAll('.image')
    const imageIndexes = document.querySelectorAll('.image-index')
    let activeIndex = 0

    const prev = () => {
        images[activeIndex].classList.remove('active')
        imageIndexes[activeIndex].classList.remove('active-image')
        activeIndex = activeIndex === 0 ? activeIndex = 2 : activeIndex - 1
        images[activeIndex].classList.add('active')
        imageIndexes[activeIndex].classList.add('active-image')
    }

    const next = () => {
        images[activeIndex].classList.remove('active')
        imageIndexes[activeIndex].classList.remove('active-image')
        activeIndex = activeIndex === 2 ? activeIndex = 0 : activeIndex + 1
        images[activeIndex].classList.add('active')
        imageIndexes[activeIndex].classList.add('active-image')
    }

    leftButton.addEventListener('click', prev)
    rightButton.addEventListener('click', next)

}