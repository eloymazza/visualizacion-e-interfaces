// players config
let p1
let p2 
let currentPlayer
let winner = null

// Board config

const leftPanel = {
    x: 50,
    y: 100,
    color: "#66552e",
    width: 245,
    height: 420,
    strokeColor: "black",
    lineWidth: 3
}

const centerPanel = {
    x: 350,
    y: 100,
    color: "#66552e",
    width: 490,
    height: 420,
    strokeColor: "black",
    lineWidth: 3
}

const rightPanel = {
    x: 900,
    y: 100,
    color: "#66552e",
    width: 245,
    height: 420,
    strokeColor: "black",
    lineWidth: 3
}

const resetBtn = {
    x: centerPanel.x + centerPanel.width/2 - 100,
    y: 620,
    color:"#66552e",
    width: 200,
    height: 50,
    strokeColor: "black",
    lineWidth: 2,
    label: "Reset Game"
}

const colsNumber = 7
const rowsNumber = 6
const columnWidth = centerPanel.width/colsNumber
const rowHeight = centerPanel.height/rowsNumber

const tokenPanelColumns = 3
const tokenPanelrows = 7
const tokenPanelColumnsWidth = leftPanel.width/tokenPanelColumns
const tokenPanelRowsHeight = leftPanel.height/tokenPanelrows


// Board Canvas
const canvas = document.querySelector("#board")
const bctx = canvas.getContext("2d")

const width = canvas.width
const height = canvas.height

// token Canvas

const tokenCanvas = document.querySelector("#tokens")
const tctx = tokenCanvas.getContext("2d")

// Game generator

let board 
let leftTokenPanel
let rightTokenPanel
let dropZones = []
let gameState = []

let columnFilling = [0,0,0,0,0,0,0]

const generateBoard = () => {
    
    leftTokenPanel = new Rect(bctx, ...Object.values(leftPanel))
    leftTokenPanel.draw()

    board = new Rect(bctx, ...Object.values(centerPanel))
    board.draw()

    rightTokenPanel = new Rect(bctx, ...Object.values(rightPanel))
    rightTokenPanel.draw()

    resetButton = new Button(bctx, ...Object.values(resetBtn))
    resetButton.draw()
    
    generateSpaces(board)
    generateDropZones(board)
    generateTokens(leftTokenPanel, p1)
    generateTokens(rightTokenPanel, p2)
    turnInstructions()
}

const turnInstructions = () => { 
    let panel = currentPlayer.panel
    let id = currentPlayer.id
    if(winner == null) {
        tctx.fillStyle = "white"
        tctx.font = "25px Arial";
        tctx.fillText(`Turno P${id}`, panel.x + panel.width/2 - 45, panel.y - 20)
        showGameInstructions()
    }
}

const showGameInstructions = () => {
    tctx.font = "15px Arial";
    tctx.fillText(`Instrucciones:`,
    centerPanel.x + centerPanel.width/2 - 50, centerPanel.y + centerPanel.height + 30)
    tctx.fillText(`Toma una ficha del panel correspondiente y suéltala en la columna deseada`,
    centerPanel.x + centerPanel.width/2 - 250, centerPanel.y + centerPanel.height + 50)
    tctx.fillText(`Forma una linea de 4 fichas consecutivas en cualquier direccion para ganar`,
    centerPanel.x + centerPanel.width/2 - 245, centerPanel.y + centerPanel.height + 70)
}

const displayWinMessage = () => {
    tctx.fillStyle = "white"
    tctx.font = "30px Arial";
    tctx.fillText(`P${currentPlayer.id} ha ganado !!!`, centerPanel.x + centerPanel.width/2 - 105 , centerPanel.y + centerPanel.height + 55)
}

const generateDropZones = (panel) => {
    bctx.font = "12px Arial";
    for (let column = 1; column < colsNumber+1; column++) {
        let spaceX = (columnWidth * column) - (columnWidth/2)
        let dropZone = new Circle(bctx, panel.x + spaceX, panel.y - 35, "white", "black", 2, 25)
        dropZone.draw()
        dropZones.push(dropZone)
        bctx.fillStyle = "black"
        bctx.fillText("Soltar", panel.x + spaceX - 15, panel.y - 37);
        bctx.fillText("Aquí", panel.x + spaceX - 12, panel.y - 23);
    }
}

const generateSpaces = (panel) => {
    let spaceX
    let spaceY
    for (let column = 1; column <= colsNumber; column++) {
        let gameColumn = []
        for (let row = 1; row <= rowsNumber; row++) {
            spaceX = (columnWidth * column) - (columnWidth/2)
            spaceY = (rowHeight * row) - (rowHeight/2)
            new Circle(bctx, panel.x + spaceX, panel.y + spaceY, "white", "black", 2, 25).draw()
            gameColumn.push({x: panel.x + spaceX, y: panel.y + spaceY, state: 0})
        }
        gameState.push(gameColumn)
    }
}

const generateTokens = (panel, player) => {
    let spaceX
    let spaceY
    for (let column = 1; column <= tokenPanelColumns; column++) {
        for (let row = 1; row <= tokenPanelrows; row++) {
            spaceX = (tokenPanelColumnsWidth * column) - (tokenPanelColumnsWidth/2)
            spaceY = (tokenPanelRowsHeight * row) - (tokenPanelRowsHeight/2)
            let newToken = new Token(tctx, panel.x + spaceX, panel.y + spaceY, player.tokenImage, "black", 3, 25)
            player.addToken(newToken)
            newToken.drawToken()
        }
    }
}

let tokenP1 = new Image(55, 55)
let tokenP2 = new Image(55, 55)
tokenP1.src = './images/p1.png'
tokenP2.src = './images/p2.png'
tokenP2.onload = () => {
    p1 = new Player(1, tokenP1, leftPanel)
    p2 = new Player(2, tokenP2, rightPanel)
    currentPlayer = p1
    generateBoard()
}


// Drag token

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

const redrawCanvas = (ctx) => {
    clearCanvas(ctx)
    p1.drawTokens()
    p2.drawTokens()
}

// Drop Token

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

// Listeners

tokenCanvas.addEventListener("mousedown", evaluateDrag)

// reset game
const resetGame = () => { 
    p1 = new Player(1, tokenP1, leftPanel)
    p2 = new Player(2, tokenP2, rightPanel)
    dropZones = []
    gameState = []
    columnFilling = [0,0,0,0,0,0,0]
    winner = null
    currentPlayer = p1
    clearCanvas(tctx)
    clearCanvas(bctx)
    generateBoard()
    tokenCanvas.addEventListener("mousedown", evaluateDrag)
    tokenCanvas.addEventListener("mouseup", evaluateDrop)
}

const clearCanvas = (ctx) => {
    ctx.fillStyle = "white"
    ctx.clearRect(0,0, width, height)
}

const evaluateClick = (e) => {
   if(resetButton.clicked(e.layerX, e.layerY)) {
       resetButton.clickEffect()
       redrawCanvas(tctx)
       setTimeout(resetGame, 50)
   }
}

tokenCanvas.addEventListener("click", evaluateClick)