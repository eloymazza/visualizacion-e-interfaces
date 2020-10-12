const leftButton = document.querySelector('#left-button')
const rightButton = document.querySelector('#right-button')
const images = document.querySelectorAll('.image')
const imageIndexes = document.querySelectorAll('.image-index')
let activeIndex = 0

const prev = () => {
    images[activeIndex].classList.remove('active')
    activeIndex = activeIndex === 0 ? activeIndex = 2 : activeIndex - 1
    images[activeIndex].classList.add('active')
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