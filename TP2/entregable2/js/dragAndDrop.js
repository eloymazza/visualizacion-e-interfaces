


// Drag & drop

// Drag

const evaluateDrag = (e) => {
    let clickX = e.layerX
    let clickY = e.layerY  
    if(currentPlayer.tokenClicked(clickX, clickY) ) {
        tokenCanvas.addEventListener('mousemove', dragToken)
        tokenCanvas.addEventListener("mouseup", evaluateDrop)
    }
}

const dragToken = (e) => {
    let activeToken = currentPlayer.activeToken
    activeToken.setCoords(e.layerX, e.layerY)
    redrawCanvas(tctx)
    turnInstructions()
    activeToken.drawToken()
}

// Drop 

const evaluateDrop = (e) => { 
    tokenCanvas.removeEventListener('mousemove', dragToken)
    tokenCanvas.removeEventListener("mouseup", evaluateDrop)
    let clickX = e.layerX
    let clickY = e.layerY
    let droped = false
    for (let dropZone = 0; dropZone < dropZones.length; dropZone++) {
        if(dropZones[dropZone].clicked(clickX, clickY) && columnFilling[dropZone] != rowsNumber) {
            dropToken(dropZone)
            droped = true
        }
    }
    if(!droped) {
        currentPlayer.tokenToDefault()
        redrawCanvas(tctx)
        turnInstructions()
    }
}

const dropToken = (column) => {
    let row = rowsNumber-1
    let dropped = false
    while (row >= 0 && !dropped) {
        let space = gameState[column][row]
        if(space.state === 0) { 
            currentPlayer.activeToken.setCoords(space.x, space.y)
            space.state = currentPlayer.id
            redrawCanvas(tctx)
            dropped = true
            evaluateWinCondition(column, row)
        }
        row--
    }
    currentPlayer = currentPlayer.id === 1 ? p2 : p1
    columnFilling[column]++
    turnInstructions()
}

const evaluateWinCondition = (column, row) => {
    if(evaluateHorizontal(row) || evaluateVertical(column) || evaluateDiagonals(column, row)) {
        winner = currentPlayer
        tokenCanvas.removeEventListener("mouseup", evaluateDrop)
        tokenCanvas.removeEventListener("mousedown", evaluateDrag)
        displayWinMessage()
    }
}


const evaluateHorizontal = (row) => {
    let won = false
    let tokenCount = 0
    let column = 0
    while(column < colsNumber && !won) {
        if(gameState[column][row].state === currentPlayer.id) {
            tokenCount++
            if(tokenCount === 4) won = true
        } 
        else {
            tokenCount = 0
        }
        column++
    }
    return won
}

const evaluateVertical = (column) => {
    let won = false
    let tokenCount = 0
    let row = 0
    while(row < rowsNumber && !won) {
        if(gameState[column][row].state === currentPlayer.id) {
            tokenCount++
        } 
        else {
            tokenCount = 0
        }
        if(tokenCount === 4) won = true
        row++
    }
    return won
}

const evaluateDiagonals = (column, row) => {
    return evaluateLeftUpDiagonal(column, row) || evaluateRightUpDiagonal(column, row)
}

const evaluateLeftUpDiagonal = (column, row) => {
    let won = false
    let tokenCount = 0
    while(!isLeftBorder(column) && !isBottomBorder(row)) {
        column--
        row++
    }
    // left-up diagonal
    while(column < colsNumber && row >= 0 && !won) {
        if(gameState[column][row].state === currentPlayer.id) {
            tokenCount++
        } 
        else {
            tokenCount = 0
        }
        if(tokenCount === 4) won = true
        column++
        row--
    }
    return won
}

const evaluateRightUpDiagonal = (column, row) => {
    let won = false
    let tokenCount = 0
    while(!isRightBorder(column) && !isBottomBorder(row)) {
        column++
        row++
    }
    // right-up diagonal
    while(column >= 0 && row >= 0 && !won) {
        if(gameState[column][row].state === currentPlayer.id) {
            tokenCount++
        } 
        else {
            tokenCount = 0
        }
        if(tokenCount === 4) won = true
        column--
        row--
    }
    return won
}

const isLeftBorder = (column) => {
    return column == 0 
}

const isRightBorder = (column) => {
    return column == colsNumber-1
}

const isBottomBorder = (row) => {
    return row == rowsNumber-1
}

const displayWinMessage = () => {
    tctx.fillStyle = "white"
    tctx.font = "30px Arial";
    tctx.fillText(`P${currentPlayer.id} ha ganado !!!`, centerPanel.x + centerPanel.width/2 - 105 , centerPanel.y + centerPanel.height + 55)
}


tokenCanvas.addEventListener("mousedown", evaluateDrag)