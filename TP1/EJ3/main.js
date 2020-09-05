let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let width = canvas.width
let height = canvas.height
let imageData = ctx.createImageData(width, height)

const setPixel = (imageData, x, y, r, g, b, a) => {
    let index = (x + y * width) * 4
    imageData.data[index] = r
    imageData.data[index + 1] = g
    imageData.data[index + 2] = b
    imageData.data[index + 3] = a     
}


for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, 255, 0, 0, 255)
    }
    
}

ctx.putImageData(imageData, 0, 0)




