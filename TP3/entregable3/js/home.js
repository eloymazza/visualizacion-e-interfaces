const loadHomeJS = () => {

    let scrollLevel = 0
    let scrollDown = true
    const paralaxContainer = document.querySelector(".paralax-container") 
    const countdownContainer = document.querySelector(".countdown-container") 
    const castGridContainer = document.querySelector(".cast-grid-container") 
    const sliderContainer = document.querySelector(".slider-container") 
    const scrolldownContainer = document.querySelector(".scroll-down-container")
    const scrollupContainer = document.querySelector(".scroll-up-container")

    document.addEventListener("wheel", (e) => {
        if(e.deltaY > 0) {
            increaseScrollLevel()
        }
        else {
            decreaseScrollLevel()
        }
        console.log(scrollLevel)
        transitionManager()
    })

    const increaseScrollLevel = () => {
        showScroll(scrollupContainer)
        scrollLevel += 1
        scrollDown = true
        if(scrollLevel >= 55) {
            scrollLevel = 55
        } 
    }

    const decreaseScrollLevel = () => {
        console.log("entro")
        showScroll(scrolldownContainer)
        scrollLevel -= 1
        scrollDown = false
        if(scrollLevel < 0) {
            scrollLevel = 0
            hideScroll(scrollupContainer)
        } 
    }

    const transitionManager = () => {
        if(scrollLevel > 0 && scrollLevel < 11) assignParalaxTransition()
        else if (scrollLevel >= 14 && scrollLevel <= 24) assignCountdownTransition() 
        else if(scrollLevel >= 28 && scrollLevel <= 38) assignGridTransition() 
        else if(scrollLevel >= 42) assignSliderTransition() 
    }

    const assignParalaxTransition = () => {
        paralaxContainer.style.opacity = 1 - scrollLevel/10 
    }

    const assignCountdownTransition = () => {
        if(scrollLevel === 14 && !scrollDown) {
            assignCountdownExit()
        }
        else if (scrollLevel === 24 && scrollDown){
            assignCountdownExit()
        }
        else {
            assignCountdownEntrance()
        }
    }
    
    const assignCountdownEntrance = () => {
        countdownContainer.classList.add('fade-in')
    }

    const assignCountdownExit = () => {
        countdownContainer.classList.remove('fade-in')
    }

    const assignGridTransition = () => {
        if(scrollLevel === 28 && !scrollDown) {
            assignGridExit()
        }
        else if (scrollLevel === 38 && scrollDown){
            assignGridExit()
        }
        else {
            assignGridEntrance()
        }
    }

    const assignGridEntrance = () => {
        castGridContainer.classList.add('slide-in')
    }

    const assignGridExit = () => {
        castGridContainer.classList.remove('slide-in')
    }

    const assignSliderTransition = () => {
        if(scrollLevel === 42 && !scrollDown) {
            console.log("entro en slier exit")
            assignSliderExit()
        }
        else {
            console.log("entro en slier in")
            assignSliderEntrance()
            hideScroll(scrolldownContainer)
        }
    }

    const assignSliderEntrance = () => {
        sliderContainer.classList.remove('dissapear-in-center')
        sliderContainer.classList.add('appear-in-center')
    }

    const assignSliderExit = () => {
        sliderContainer.classList.remove('appear-in-center')
        sliderContainer.classList.add('dissapear-in-center')
    }


    const hideScroll = (scrollContainer) => {
        scrollContainer.classList.remove('fade-in')
        scrollContainer.classList.add('fade-out')

    }

    const showScroll = (scrollContainer) => {
        scrollContainer.classList.add('fade-in')
        scrollContainer.classList.remove('fade-out')
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