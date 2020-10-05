const loader = document.querySelector(".loader")
const submitButton = document.querySelector("#submit")
const buttonWidth = 150
const maxProgress = 45
const minProgress = 20
let currentProgress = 0

const startTransition = () => {
    submitButton.innerText = "Processing Transaction.."
    addProgress()
}

const getRandomProgress = () => {
    return Math.floor(Math.random() * (maxProgress - minProgress) + minProgress)
}

const addProgress = () => {
    let progress
    progress = getRandomProgress()
    currentProgress += progress
    if(currentProgress > 150) currentProgress = 150
    loader.style.width = `${currentProgress}px`
    if(currentProgress < buttonWidth) {
        setTimeout(addProgress, 3000)
    }
    else {
        setTimeout(() => {
            submitButton.innerText = "Transaction finished!"
        }, 2000)
        
    }
}

submitButton.addEventListener("click", startTransition)