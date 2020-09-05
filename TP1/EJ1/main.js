const matrixContainer = document.getElementById('matrix-container')
const maxContainer = document.getElementById('max-value')
const maxEvenContainer = document.getElementById('max-value-even')
const minOddContainer = document.getElementById('min-value-odd')
const averageContainer = document.getElementById('average-value')
const matrix = []
const n = 100

const getRandom = () => {
    return Math.floor(Math.random() * 100)
}

const generateMatrix = () => {
    for (let i = 0; i < n; i++) {
        matrix[i] = []
        for (let j = 0; j < n; j++) {
            matrix[i][j] = getRandom()
        }   
    }
}

const printMatrix = () => {
    let matrixString = ''
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrixString += matrix[i][j] + ' '
        }   
        matrixString+= '\n'
    }
    matrixContainer.innerText = matrixString
}

const getMaxValue = () => {
    let max = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if(matrix[i][j] > max) {
                max = matrix[i][j]
            }
        }   
    }
    return max
}

const printMaxValue = () => {
    maxContainer.innerText = getMaxValue()
}

const getMaxValueInEvenRows = () => {
    let max = 0
    for (let i = 0; i < n; i+=2) {
        for (let j = 0; j < n; j++) {   
            if(matrix[i][j] > max) {
                max = matrix[i][j]
            }   
        }
    }
    return max
}

const printMaxValueInEvenRows = () => {
    maxEvenContainer.innerText = getMaxValueInEvenRows()
}

const getMinValueInOddRows = () => {
    let min = 100
    for (let i = 1; i < n; i+=2) {
        for (let j = 0; j < n; j++) {   
            if(matrix[i][j] < min) {
                min = matrix[i][j]
            }   
        }
    }
    return min
}

const printMinValueInOddRows = () => {
    minOddContainer.innerText = getMinValueInOddRows()
}

const getAverageValue = () => {
    let sum = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            sum += matrix[i][j]
        }   
    }
    return sum/(n*n)
}


const printAverageValue = () => {
    averageContainer.innerText = getAverageValue()
}

generateMatrix()
printMatrix()
printMaxValue()
printMaxValueInEvenRows()
printMinValueInOddRows()
printAverageValue()
