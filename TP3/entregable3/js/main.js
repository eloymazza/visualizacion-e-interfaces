const navItems = document.querySelectorAll('.nav-item')
const mainContainer = document.querySelector('.main-container')
const baseURL = '../components/'
const htmlFile = '.html'
const pages = ['home', 'events', 'form']
const waitTime = 2800

// router

let activePage = 0

const navigateTo = (page) => {
    navItems[activePage].classList.remove('active-page')
    navItems[page].classList.add('active-page')
    activePage = page
    showSpinner()
    setTimeout(() => loadPage(page), waitTime)
}

const loadPage = (page) => {
    fetch(baseURL + pages[page] + htmlFile)
    .then( response => response.text())
    .then( data => { 
        mainContainer.innerHTML = data
        setTimeout(loadJS(), waitTime)
    })
}

const loadJS = () => {
    switch (activePage) {
        case 0:
            loadHomeJS() 
            break;
        case 1:
            loadEventsJS()
            break;
        case 2: 
            loadFormJS()
            break;
        default:
            break;
    }
}

navItems.forEach((navItem, i) => {
    navItem.addEventListener("click", () => navigateTo(i))
});

navigateTo(0)
