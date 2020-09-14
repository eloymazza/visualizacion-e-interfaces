// Canvas 

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const defaultW = canvas.width
const defaultH = canvas.height
let image

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
    let index = (x + y * imageData.width) * 4
    return imageData.data[index + 0]
}
  
const getGreen = (imageData, x, y) => {
    let index = (x + y * imageData.width) * 4
    return imageData.data[index + 1]
}
  
const getBlue = (imageData, x, y) => {
    let index = (x + y * imageData.width) * 4
    return imageData.data[index + 2]
}
  
const setPixel = (imageData, x, y, r, g, b) => {
    let index = (x + y * imageData.width) * 4
    imageData.data[index + 0] = r
    imageData.data[index + 1] = g
    imageData.data[index + 2] = b
}

const getAverageRGB = (imageData, x, y) => {
    let avgR = 0
    let avgG = 0
    let avgB = 0
    for (let h = x - 1; h < x + 2; h++) {
        for (let v = y - 1; v < y + 2; v++) {
            if(!(h == x && v == y)) {
                avgR += getRed(imageData, h, v)
                avgG += getGreen(imageData, h, v)
                avgB += getBlue(imageData, h, v)
            }
        }
    }
    avgR /= 8
    avgG /= 8
    avgB /= 8
    return [avgR, avgG, avgB]
}

const isBorder = (imageData, x, y) => {

    let lRed = getRed(imageData, x - 1, y)
    let lGreen = getGreen(imageData, x - 1, y)
    let lBlue = getBlue(imageData, x - 1, y)
    let tRed = getRed(imageData, x, y - 1)
    let tGreen = getGreen(imageData, x, - 1)
    let tBlue = getBlue(imageData, x, y - 1)
    let cRed = getRed(imageData, x, y)
    let cGreen = getGreen(imageData, x, y)
    let cBlue = getBlue(imageData, x, y)

    return isDifferent(lRed, cRed) || isDifferent(lGreen, cGreen) || isDifferent(lBlue, cBlue) || 
           isDifferent(tRed, cRed) || isDifferent(tGreen, cGreen) || isDifferent(tBlue, cBlue) 
}

const isDifferent = (leftColor, centerColor) => {
    return Math.abs(leftColor - centerColor) > 50
}

// Negative
const negativeButton = document.getElementById('negative')

const negative = () => {
    if(!image) return
    let imageData = ctx.getImageData(0, 0, image.width, image.height)
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
    let imageData = ctx.getImageData(0, 0, image.width, image.height)
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
    let imageData = ctx.getImageData(0, 0, image.width, image.height);
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
    let imageData = ctx.getImageData(0, 0, image.width, image.height);
    let r, g, b
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            r = getRed(imageData, x, y)
            g = getGreen(imageData, x, y)
            b = getBlue(imageData, x, y)
            setPixel(imageData, x, y, 
            (r * .393 + g * .769 + b * .189),
            (r * .349) + (g * .686) + (b * .168),
            (r * .272) + (g * .534) + (b * .131))
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

sepiaButton.addEventListener('click', sepia)

// Border Detection
const borderDetectionButton = document.getElementById('border-detection')

const borderDetection = () => {
    if(!image) return
    let imageData = ctx.getImageData(0, 0, image.width, image.height)
    let newImage = ctx.getImageData(0, 0, image.width, image.height)
    for (let x = 1; x < image.width - 1; x++) {
        for (let y = 1; y < image.height - 1; y++) { 
            if(isBorder(imageData, x, y))
                setPixel(newImage, x, y, 0, 0, 0)
        }
    }
    ctx.putImageData(newImage, 0, 0)
}

borderDetectionButton.addEventListener('click', borderDetection)

// Blur
const blurButton = document.getElementById('blur')

const blur = () => {
    if(!image) return
    let imageData = ctx.getImageData(0, 0, image.width, image.height)
    let newImage = ctx.getImageData(0, 0, image.width, image.height)
    let r, g, b
    for (let x = 1; x < image.width - 1; x++) {
        for (let y = 1; y < image.height - 1; y++) { 
            [r, g, b] = getAverageRGB(imageData, x, y)
            setPixel(newImage, x, y, r, g, b)
        }
    }
    ctx.putImageData(newImage, 0, 0)
}

blurButton.addEventListener('click', blur)

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
            image.width = imageScaledWidth
            image.height = imageScaledHeight
            loadImageInput.value = ''
        }
    }
}

const getScales = (image) => {
    
    let w = image.width
    let h = image.height
    // case image width and height fit canvas
    if(w <= defaultW && h <= defaultW) {
        canvas.width = w
        canvas.height = h
        return [w, h]
    }
    canvas.width = 1200
    canvas.height = 600 
    // case image width and height does not fit canvas
    if(w > canvas.width && h > canvas.height) {
        return [canvas.width, canvas.height]
    }
    // case only image width fit canvas
    if(w < canvas.width && h > canvas.height ) {
        return [w, canvas.height]
    }
    // case only image height fit canvas
    if(h < canvas.height && w > canvas.width) {
        return [canvas.width, h]
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
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

clearButton.addEventListener('click', resetCanvas)