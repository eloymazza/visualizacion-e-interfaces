const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const imageData = ctx.createImageData(width, height)
const halfRatio = 255/(width/2)

const setPixel = (imageData, x, y, r, g, b, a) => {
    let index = (x + y * width) * 4
    imageData.data[index + 0] = r
    imageData.data[index + 1] = g
    imageData.data[index + 2] = b
    imageData.data[index + 3] = a     
}

let yellow = 0
const middle = width/2
for (let x = 0; x < middle; x++) {
    yellow += halfRatio
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, yellow, yellow, 0, 255)
    }
}

green = 255
for (let x = middle; x < width; x++) {
    green -= halfRatio
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, 255, green, 0, 255)
    }
}

ctx.putImageData(imageData, 0, 0)




