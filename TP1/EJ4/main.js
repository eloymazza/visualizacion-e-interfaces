const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const imageData = ctx.createImageData(width, height)
const ratio = 255/canvas.height

const setGrayLevel = (imageData, x, y, grayLevel) => {
    let index = (x + y * width) * 4
    imageData.data[index] = grayLevel
    imageData.data[index + 1] = grayLevel
    imageData.data[index + 2] = grayLevel
    imageData.data[index + 3] = 255     
}

let grayLevel = 0 
for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
        grayLevel+= ratio
        setGrayLevel(imageData, x, y, grayLevel)
    }
    grayLevel = 0
}
console.log(imageData)
ctx.putImageData(imageData, 0, 0)




