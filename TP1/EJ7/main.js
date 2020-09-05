const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let image = new Image()
image.src = 'bluecar.jpg'

const setPixelToGray = (imageData, x, y) => {
    let index = (x + y * imageData.width) * 4
    let avg = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2])/3
    imageData.data[index] = avg
    imageData.data[index + 1] = avg
    imageData.data[index + 2] = avg
    imageData.data[index + 3] = 255     
}

image.onload = () => {
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0,0)
    let imageData = ctx.getImageData(0,0, canvas.width, canvas.height)
    
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height ; y++) {
            setPixelToGray(imageData, x, y)
        }
    }
    
    ctx.putImageData(imageData, 0,0)
}








