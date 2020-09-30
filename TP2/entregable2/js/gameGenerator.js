// Player class
// IMPORTANTE: puse la clase player aca ya que por alguna razon me tiraba not found en github pages. 
// Cargaba todos los js menos player.js donde habia puesto esta clase
class Player {
    constructor(id, tokenImage, panel) {
        this.id = id
        this.tokenImage = tokenImage
        this.tokens = []
        this.tokensCount = 0
        this.activeToken = null
        this.panel = panel
    }

    addToken(token) {
        this.tokens.push(token)
        this.tokensCount++
    }

    updateTokenCoords(tokenID, x, y) {
        let token = this.tokens[tokenID]
        token.x = x
        token.x = y
    }

    tokenClicked(x, y) {
        for (let i = 0; i < this.tokensCount; i++) {
            if(this.tokens[i].clicked(x,y)) {
                this.activeToken = this.tokens[i]
                return true
            } 
        }
        return false
    } 

    getToken(id) { 
        this.tokens[id]
    }

    drawTokens() {
        this.tokens.forEach(token => {
            token.drawToken()
        });
    }

    tokenToDefault() {
        if(this.activeToken) this.activeToken.backToDefault()
    }
}


// Board Canvas
const canvas = document.querySelector("#board")
const bctx = canvas.getContext("2d")

const width = canvas.width
const height = canvas.height

// Token Canvas

const tokenCanvas = document.querySelector("#tokens")
const tctx = tokenCanvas.getContext("2d")

// clears and redraws

const clearCanvas = (ctx) => {
    ctx.fillStyle = "white"
    ctx.clearRect(0,0, width, height)
}

const redrawCanvas = (ctx) => {
    clearCanvas(ctx)
    p1.drawTokens()
    p2.drawTokens()
}

// Board Generator

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