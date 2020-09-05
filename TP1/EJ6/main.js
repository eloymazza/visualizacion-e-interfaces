const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const imageData = ctx.createImageData(width, height)
const sections = 3
const sectionWidth = width/sections


let colors = [[230, 18, 12], [230, 213, 12], [82, 20, 156],[9, 181, 21] ]

let transitions = [ 
    [
        {
            ratio: Math.abs(18-213)/sectionWidth,
            operation: 'increase',
            pos: 1
        }
    ],
    [
        {
            ratio: Math.abs(230-82)/sectionWidth,
            operation: 'decrease',
            pos: 0
        },
        {
            ratio: Math.abs(213-20)/sectionWidth,
            operation: 'decrease',
            pos: 1
        },
        {
            ratio: Math.abs(12-156)/sectionWidth,
            operation: 'increase',
            pos: 2
        }
    ],
    [
        {
            ratio: Math.abs(82-9)/sectionWidth,
            operation: 'decrease',
            pos: 0
        },
        {
            ratio: Math.abs(20-181)/sectionWidth,
            operation: 'increase',
            pos: 1
        },
        {
            ratio: Math.abs(156-21)/sectionWidth,
            operation: 'decrease',
            pos: 2
        }
    ] 
]

const getColor = (section) => {

    transitions[section].forEach(transition => {
        let ratio = transition.ratio
        if(transition.operation === 'increase') {
            colors[section][transition.pos] += ratio
        }
        else {
            colors[section][transition.pos] -= ratio
        }
    })

    return colors[section]
}

const setPixel = (imageData, x, y, color, a) => {
    let index = (x + y * width) * 4
    imageData.data[index] = color[0]
    imageData.data[index + 1] = color[1]
    imageData.data[index + 2] = color[2]
    imageData.data[index + 3] = a     
}

for (let section = 0; section < sections; section++) {
    let pos = width * (section/sections)
    for (let x = pos; x < sectionWidth + pos; x++) {
        color = getColor(section)
        for (let y = 0; y < height; y++) {  
            setPixel(imageData, x, y, color, 255)
        }
    }
    
}

ctx.putImageData(imageData, 0, 0)




