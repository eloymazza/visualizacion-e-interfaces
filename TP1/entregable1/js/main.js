// Canvas 

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Utils

const toggleClass = (element, className) => {
    if(element.classList.contains(className)) {
        element.classList.remove(className) 
    }
    else {
        element.classList.add(className) 
    }
}

// Pencil 

const pencil = document.getElementById('pencil')
pencil.addEventListener('click', () => {
    toggleClass(canvas, 'pencil-cursor')
    canvas.classList.remove('eraser-cursor')
    canvas.removeEventListener('mousedown', activateEraser)
})



const pencilConfigContainer = document.getElementById('pencil-config-container')
const pencilConfig = document.getElementById('pencil-config')

const openPencilConfig = () => { 
    toggleClass(pencilConfigContainer, 'hide')
}

pencilConfig.addEventListener('click', (e) => {
    openPencilConfig(e)
})

// Eraser 
const eraser = new Rectangle(ctx, 10, 10, 'red')
const eraserButton = document.getElementById('eraser')

eraserButton.addEventListener('click', () => {
    toggleClass(canvas, 'eraser-cursor')
    canvas.classList.remove('pencil-cursor')
    canvas.addEventListener('mousedown', activateEraser)
})

const activateEraser = (e) => {
    eraser.draw(e.layerX, e.layerY)
    canvas.addEventListener('mousemove', erase)
    canvas.addEventListener('mouseup', () => {
        canvas.removeEventListener('mousemove', erase)
    })
}

const erase = (e) => {
    eraser.draw(e.layerX, e.layerY)
}

const eraserConfigContainer = document.getElementById('eraser-config-container')
const eraserConfig = document.getElementById('eraser-config')

const openEraserConfig = () => { 
    toggleClass(eraserConfigContainer, 'hide')
}

eraserConfig.addEventListener('click', (e) => {
    openEraserConfig(e)
})

//  Main


