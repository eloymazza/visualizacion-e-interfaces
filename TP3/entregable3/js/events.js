const loadEventsJS = () => {

    const accordionButtons = document.querySelectorAll('.accordion-button')

    const toggleClass = (item, className) => {
        if(item.classList.contains(className)) {
            item.classList.remove(className)
        }
        else {
            item.classList.add(className)
        }
    }

    const toggleItem = (e) => {
        let item = e.target.nextElementSibling
        toggleClass(item, 'deploy')
    }

    accordionButtons.forEach(accordionButton => {
        accordionButton.addEventListener('click', toggleItem)
    })
    
}
