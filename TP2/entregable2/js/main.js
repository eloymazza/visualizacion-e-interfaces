// Board config

const centerPanel = {
    x: 350,
    y: 100,
    color: "blue",
    width: 490,
    height: 420,
    strokeColor: "black",
    lineWidth: 3
}



// Board
const canvas = document.querySelector("#board")
const bctx = canvas.getContext("2d")

const width = canvas.width
const height = canvas.height

let board 
let leftTokenPanel
let rightTokenPanel

const generateBoard = () => {
    
    leftTokenPanel = new Rect(bctx, 50, 100, "red", 245, 420, "black", 3)
    leftTokenPanel.draw()

    board = new Rect(bctx, ...Object.values(centerPanel))
    board.draw()

    rightTokenPanel = new Rect(bctx, 900, 100, "yellow", 245, 420, "black", 3)
    rightTokenPanel.draw()

    generateWhiteSpaces(board, 7, 6)
   
}

const generateWhiteSpaces = (panel, colsNumber, rowsNumber) => {
    let spaceX
    let spaceY
    let columnWidth = panel.getW()/colsNumber
    let rowHeight = panel.getH()/rowsNumber
    for (let column = 1; column < colsNumber+1; column++) {
        for (let row = 1; row < rowsNumber+1; row++) {
            spaceX = (columnWidth * column) - (columnWidth/2)
            spaceY = (rowHeight * row) - (rowHeight/2)
            let space = new Circle(bctx, panel.x + spaceX, panel.y + spaceY, "white", "black", 2, 25)
            space.draw()
        }
    }
}

generateBoard()

// Figures



