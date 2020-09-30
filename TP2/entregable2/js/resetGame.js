
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

const evaluateClick = (e) => {
   if(resetButton.clicked(e.layerX, e.layerY)) {
       resetButton.clickEffect()
       redrawCanvas(tctx)
       setTimeout(resetGame, 50)
   }
}

tokenCanvas.addEventListener("click", evaluateClick)

// Listeners
