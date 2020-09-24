// Board config


const leftPanel = {
    x: 50,
    y: 100,
    color: "red",
    width: 245,
    height: 420,
    strokeColor: "black",
    lineWidth: 3
}

const centerPanel = {
    x: 350,
    y: 100,
    color: "blue",
    width: 490,
    height: 420,
    strokeColor: "black",
    lineWidth: 3
}

const rightPanel = {
    x: 900,
    y: 100,
    color: "yellow",
    width: 245,
    height: 420,
    strokeColor: "black",
    lineWidth: 3
}

const colsNumber = 7
const rowsNumber = 6
const columnWidth = centerPanel.width/colsNumber
const rowHeight = centerPanel.height/rowsNumber


// Board
const canvas = document.querySelector("#board")
const bctx = canvas.getContext("2d")

const width = canvas.width
const height = canvas.height

let board 
let leftTokenPanel
let rightTokenPanel
let dropZones = []
let gameState = []

const generateBoard = () => {
    
    leftTokenPanel = new Rect(bctx, ...Object.values(leftPanel))
    leftTokenPanel.draw()

    board = new Rect(bctx, ...Object.values(centerPanel))
    board.draw()

    rightTokenPanel = new Rect(bctx, ...Object.values(rightPanel))
    rightTokenPanel.draw()

    generateSpaces(board)
    generateDropZones(board)
   
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
    for (let column = 1; column < colsNumber+1; column++) {
        let gameColumn = []
        for (let row = 1; row < rowsNumber+1; row++) {
            spaceX = (columnWidth * column) - (columnWidth/2)
            spaceY = (rowHeight * row) - (rowHeight/2)
            new Circle(bctx, panel.x + spaceX, panel.y + spaceY, "white", "black", 2, 25).draw()
            gameColumn.push({x: spaceX, y: spaceY, state: 0})
        }
        gameState.push(gameColumn)
    }
}

generateBoard()

// Figures



