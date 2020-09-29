class Shape {

    constructor (ctx, x, y, fill, strokeColor, lineWidth) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.fill = fill
        this.strokeColor = strokeColor
        this.lineWidth = lineWidth
        this.active = false
    }

    setCoords = (x, y) => {
        this.x = x
        this.y = y
    }  

    setFill = (fill) => {
        this.ctx.fillStyle = fill
    }
    
    getX = () => this.x

    getY = () => this.y

    toggleActive = () => {
        this.active = !this.active
    }

    draw () {
        this.ctx.fillStyle = this.fill
        this.ctx.strokeColor = this.strokeColor
        this.ctx.lineWidth = this.lineWidth
    }

}

class Rect extends Shape { 

    constructor (ctx, x, y, fill, w, h, strokeColor, lineWidth) {
        super(ctx, x, y, fill, strokeColor, lineWidth)
        this.w = w
        this.h = h
    }   

    setW = (w) => {
        this.w = w
    }

    setH = (h) => {
        this.h = h
    }

    getW = () => this.w

    getH = () => this.h

    draw = () => {
        super.draw()
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
        this.ctx.strokeRect(this.x, this.y, this.w, this.h)
    }

    setCoords = (x, y) => {
        this.x = x - this.w/2
        this.y = y - this.h/2
    } 

    clicked = (x, y) => {
        return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    }

}

class Circle extends Shape {

    constructor (ctx, x, y, fill, strokeColor, lineWidth, r) {
        super(ctx, x, y, fill, strokeColor, lineWidth)
        this.r = r
    }   

    setR = (r) => {
        this.r = r
    }

    getR = () => this.r

    draw = () => {
        super.draw()
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.closePath()
    }

    clicked = (x, y) => {
        let distance = Math.sqrt(Math.pow((x - this.x),2) + Math.pow((y - this.y),2))
        return distance < this.r
    }

}

class Token extends Circle {
    constructor(ctx, x, y, fill, strokeColor, lineWidth, r) {
        super(ctx, x, y, fill, strokeColor, lineWidth, r)
        this.defaultX = x
        this.defaultY = y
    }

    drawToken() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.stroke()
        this.ctx.drawImage(this.fill, this.x- this.r, this.y- this.r, 50, 50)
        this.ctx.closePath()
    }

    backToDefault() {
        this.x = this.defaultX
        this.y = this.defaultY
    }
}