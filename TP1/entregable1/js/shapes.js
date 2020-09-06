class Shape { 
    constructor(ctx, x, y, color) { 
        this.context = ctx
        this.posX = x
        this.posY = y
        this.color = color
    }

    setColor = (color) => {
        this.color = color
    }
}

class Rectangle extends Shape {

    constructor(ctx, x, y, w, h, color) {
        super(ctx, x, y, color)
        this.width = w
        this.height = h
    }

    draw = () => {
        this.context.fillStyle = this.color
        this.context.fillRect(this.posX, this.posY, this.width, this.height)
    }

}