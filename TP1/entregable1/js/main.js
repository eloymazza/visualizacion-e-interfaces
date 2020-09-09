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

let pencilData = {
    radius: 5,
    color: 'red',
    iconDeviation: 25
}

const pencil = new Circle(ctx, pencilData.radius, pencilData.color)
const pencilButton = document.getElementById('pencil')

pencilButton.addEventListener('click', () => {
    canvas.classList.remove('eraser-cursor')
    toggleClass(canvas, 'pencil-cursor')
    canvas.removeEventListener('mousedown', activateEraser)
    canvas.addEventListener('mousedown', activatePencil)
})

const activatePencil = (e) => {
    pencil.draw(e.layerX, e.layerY + pencilData.iconDeviation)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', () => {
        canvas.removeEventListener('mousemove', draw)
    })
}

const draw = (e) => {
    pencil.draw(e.layerX, e.layerY + pencilData.iconDeviation)
}

const pencilConfigContainer = document.getElementById('pencil-config-container')
const pencilConfig = document.getElementById('pencil-config')

const openPencilConfig = () => { 
    toggleClass(pencilConfigContainer, 'hide')
}

pencilConfig.addEventListener('click', (e) => {
    openPencilConfig(e)
})

// Eraser 

let eraserData = {
    size: 10,
    color: 'white',
    iconDeviation: 15
}

const eraser = new Rectangle(ctx, eraserData.size, eraserData.size, eraserData.color)
const eraserButton = document.getElementById('eraser')

eraserButton.addEventListener('click', () => {
    toggleClass(canvas, 'eraser-cursor')
    canvas.classList.remove('pencil-cursor')
    canvas.removeEventListener('mousedown', activatePencil)
    canvas.addEventListener('mousedown', activateEraser)
})

const activateEraser = (e) => {
    eraser.draw(e.layerX, e.layerY + eraserData.iconDeviation)
    canvas.addEventListener('mousemove', erase)
    canvas.addEventListener('mouseup', () => {
        canvas.removeEventListener('mousemove', erase)
    })
}

const erase = (e) => {
    eraser.draw(e.layerX, e.layerY + eraserData.iconDeviation)
}

const eraserConfigContainer = document.getElementById('eraser-config-container')
const eraserConfig = document.getElementById('eraser-config')

const openEraserConfig = () => { 
    toggleClass(eraserConfigContainer, 'hide')
}

eraserConfig.addEventListener('click', (e) => {
    openEraserConfig(e)
})

////////////////// Filters //////////////////////

// Black & white
const blackAndWhiteButton = document.getElementById('black-and-white')
blackAndWhiteButton.addEventListener('click', () => {
    alert("black and white")
})

// Bright
const brightButton = document.getElementById('bright')
brightButton.addEventListener('click', () => {
    alert("bright")
})

// Binarization
const binarizationButton = document.getElementById('binarization')
binarizationButton.addEventListener('click', () => {
    alert("binarization")
})

// Sepia
const sepiaButton = document.getElementById('sepia')
sepiaButton.addEventListener('click', () => {
    alert("Sepia")
})

// Saturation
const saturationButton = document.getElementById('saturation')
saturationButton.addEventListener('click', () => {
    alert("Saturacion")
})

// Border detection
const borderDetectionButton = document.getElementById('border-detection')
borderDetectionButton.addEventListener('click', () => {
    alert("Deteccion de bordes")
})




////////////////// Image Data //////////////////////

// Load

let loadImageInput = document.getElementById('load-image'); 

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

loadImageInput.onchange = e => {

    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 

    reader.onload = readerEvent => {
        let content = readerEvent.target.result; 
        let image = new Image();
        image.src = content;

        image.onload = function () {

            let [posx, posY, imageScaledWidth, imageScaledHeight] = adaptImage(this)

            // draw image on canvas
            ctx.drawImage(this, posx, posY, imageScaledWidth, imageScaledHeight);

            // get imageData from content of canvas
            //let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
            
            // draw the modified image
            //ctx.putImageData(imageData, 0, 0);
        }
    }
}

const adaptImage = (image) => {
    let w = image.width
    let h = image.height
    let imageAspectRatio
    if(w < canvas.width && h < canvas.height) {
        return [canvas.width/2 - w/2, canvas.height/2 - h/2, w, h]
    } 

    if( w > canvas.width) {
        imageAspectRatio = (1.0 * h) / w;
        return [0,0, canvas.width, canvas.width * imageAspectRatio];
    }

}

// Save


// clear 

const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
})




