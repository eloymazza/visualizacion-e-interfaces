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

class Circle extends Shape {

    constructor(ctx, radius, color) {
        super(ctx, color)
        this.radius = radius
    }

    draw = (x, y) => {
        this.context.fillStyle = this.color
        this.context.beginPath();
        this.context.arc(x, y, this.radius, 0, 2 * Math.PI);
        this.context.fill()
        this.context.closePath()
    }

}
