// Canvas 

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const defaultW = canvas.width
const defaultH = canvas.height
let image
let imageCoords = {}

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

// Utils
const getRed = (imageData, x, y) => {
    index = (x + y * imageData.width) * 4
    return imageData.data[index + 0]
}
  
const getGreen = (imageData, x, y) => {
    index = (x + y * imageData.width) * 4
    return imageData.data[index + 1]
}
  
const getBlue = (imageData, x, y) => {
    index = (x + y * imageData.width) * 4
    return imageData.data[index + 2]
}
  
const setPixel = (imageData, x, y, r, g, b) => {
    index = (x + y * imageData.width) * 4
    imageData.data[index + 0] = r
    imageData.data[index + 1] = g
    imageData.data[index + 2] = b
}

// Binarization

const negativeButton = document.getElementById('negative')

const negative = () => {
    if(!image) return
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    let r, g, b
    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
          r = getRed(imageData, x, y)
          g = getGreen(imageData, x, y)
          b = getBlue(imageData, x, y)
          setPixel(imageData, x, y, 255 - r, 255 - g, 255 - b)
      }
    }
    ctx.putImageData(imageData, 0, 0)
}

negativeButton.addEventListener('click', negative)

// Bright

const brightButton = document.getElementById('bright')

const bright = () => {
    if(!image) return
    imageData = ctx.getImageData(0, 0, image.width, image.height)
    let r, g, b
    const bright = 20
    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
          r = getRed(imageData, x, y);
          g = getGreen(imageData, x, y);
          b = getBlue(imageData, x, y);
          setPixel(imageData, x, y, r + bright, g + bright, b + bright)
      }
    }
    ctx.putImageData(imageData, 0, 0)
}

brightButton.addEventListener('click', bright)

// Binarization

const binarizationButton = document.getElementById('binarization')

const binarization = () => {
    if(!image) return
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    let r, g, b
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            r = getRed(imageData, x, y)
            g = getGreen(imageData, x, y)
            b = getBlue(imageData, x, y)
            let rgb = (r + g + b)/3
            if (rgb <= 127) {
                setPixel(imageData, x, y, 0, 0, 0)
            }
            else setPixel(imageData, x, y, 255, 255, 255)
        }
    }
    ctx.putImageData(imageData, 0, 0)
}

binarizationButton.addEventListener('click', binarization)

// Sepia

const sepiaButton = document.getElementById('sepia')

const sepia = () => {
    if(!image) return
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    let r, g, b
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);
            setPixel(imageData, x, y, 
            (r * .393 + g * .769 + b * .189),
            (r * .349) + (g * .686) + (b * .168),
            (r * .272) + (g * .534) + (b * .131))
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

sepiaButton.addEventListener('click', sepia)

// Saturation
const saturationButton = document.getElementById('saturation')

const saturation = () => {
    alert('saturacion')
}

saturationButton.addEventListener('click', saturation)


// Border detection
const borderDetectionButton = document.getElementById('border-detection')

const borderDetection = () => {
    alert('border det')
}

borderDetectionButton.addEventListener('click', borderDetection)

////////////////// Image Data //////////////////////

// Load

let loadImageInput = document.getElementById('load-image'); 

loadImageInput.onchange = e => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file); 

    reader.onload = readerEvent => {
        let content = readerEvent.target.result; 
        image = new Image()
        image.src = content
        image.onload = function () {
            let [imageScaledWidth, imageScaledHeight] = getScales(this)
            ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight)
            loadImageInput.value = ''
        }
    }
}

const getScales = (image) => {
    let w = image.width
    let h = image.height
    let imageAspectRatio
    if(w <= defaultW && h <= defaultW) {
        canvas.width = w
        canvas.height = h
        return [w, h]
    }
    canvas.width = 1200
    canvas.height = 600
    if( w > canvas.width) {
        imageAspectRatio = (1.0 * h) / w
        return [canvas.width, canvas.width * imageAspectRatio]
    }
}

// Save

const saveButton = document.getElementById('save-image')
const download = document.getElementById('download-image')
saveButton.addEventListener("click", () => {
    let dataURL = canvas.toDataURL("image/jpg");
    download.href = dataURL
})


// clear 

const clearButton = document.getElementById('clear')

const resetCanvas = () => {
    canvas.width = defaultW
    canvas.height = defaultH
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

clearButton.addEventListener('click', resetCanvas)




