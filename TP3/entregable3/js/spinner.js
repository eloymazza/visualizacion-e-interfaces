const spinnerContainer = document.querySelector(".spinner-container")

const showSpinner = () => {
    spinnerContainer.classList.remove('hide-spinner')
    setTimeout(() => {
        spinnerContainer.classList.add('hide-spinner')
    }, 3000);
}

