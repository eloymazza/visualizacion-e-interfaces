
class Player {

    constructor(id, color) {
        this.id = id
        this.color = color
        this.tokens = []
        this.tokensCount = 0
        this.activeToken = null
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
            token.draw()
        });
    }
}