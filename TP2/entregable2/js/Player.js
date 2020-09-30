
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