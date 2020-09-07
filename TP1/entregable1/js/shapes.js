class Shape { 
    constructor(ctx, color) { 
        this.context = ctx
        this.color = color
    }

    setColor = (color) => {
        this.color = color
    }
}

class Rectangle extends Shape {

    constructor(ctx, w, h, color) {
        super(ctx, color)
        this.width = w
        this.height = h
    }

    draw = (x, y) => {
        this.context.fillStyle = this.color
        this.context.fillRect(x, y, this.width, this.height)
    }
}
