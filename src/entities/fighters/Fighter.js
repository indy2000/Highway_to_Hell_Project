export class Fighter{
    constructor(name, x, y, velocidade){
        this.name = name;
        this.image = new Image();
        this.position = {x, y};
        this.velocidade = velocidade;
    }

    update(secondsPassed, context){
        this.position.x += this.velocidade * secondsPassed;

        if(this.position.x > context.canvas.width - this.image.width || this.position.x < 0)
        {
            this.velocidade = -this.velocidade;
        }
    }

    draw(context){
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}