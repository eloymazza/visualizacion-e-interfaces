// Canvas 

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


// Utils

const toggleHide = (element) => {
    if(element.classList.contains("hide")) {
        element.classList.remove("hide") 
    }
    else {
        element.classList.add("hide") 
    }
}

// Pencil events 

const pencil = document.getElementById('pencil')
pencil.addEventListener('click', () => {
    
})

const pencilConfigContainer = document.getElementById('pencil-config-container')
const pencilConfig = document.getElementById('pencil-config')

const openPencilConfig = () => { 
    toggleHide(pencilConfigContainer)
}

pencilConfig.addEventListener('click', (e) => {
    openPencilConfig(e)
})

// Eraser events

const eraser = document.getElementById('eraser')
eraser.addEventListener('click', () => {
    alert("eraser touched")
})

const eraserConfigContainer = document.getElementById('eraser-config-container')
const eraserConfig = document.getElementById('eraser-config')

const openEraserConfig = () => { 
    toggleHide(eraserConfigContainer)
}

eraserConfig.addEventListener('click', (e) => {
    openEraserConfig(e)
})

//  Main


