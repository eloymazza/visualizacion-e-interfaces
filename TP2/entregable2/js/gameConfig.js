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