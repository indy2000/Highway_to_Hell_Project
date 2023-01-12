import { FighterDirection } from "../../constants/fighter.js";

export class Fighter{
    constructor(name, x, y, direction){
        this.name = name;
        this.image = new Image();
        this.position = {x, y};
        this.direction = direction;
        this.velocidade = 150 * direction;
        this.frames = [];
        this.animationFrame = 0;
        this.animationTimer = 0;        
        this.animations = {};
        this.state = this.changeState();
    }

    changeState = () => this.velocidade * this.direction < 0 ? 'walkBackwards' : 'walkForwards';

    update(time, context){
        //const nextFrame = this.frames.find(x => x.includes(`forwards-${this.animationFrame}`)); 
        const nextFrame = this.frames.find(x => x.includes(this.animations[this.state][this.animationFrame])); 


        if(time.previousTime > this.animationTimer + 60){
            this.animationTimer = time.previousTime;

            this.animationFrame++;
            if(this.animationFrame > this.animations[this.state].length) this.animationFrame = 0;
        }

        this.image.src = nextFrame; 

        this.position.x += this.velocidade * time.secondsPassed;

        const width = this.image.naturalWidth;
        //TODO: Usar o if comentado quando a lógica estiver ok
        if(this.position.x > context.canvas.width - width / 2)
        //if(this.position.x > context.canvas.width - this.image.width)
        {
            this.velocidade = -150;
            this.state = this.changeState();
        }

        if(this.position.x < width / 2)
        //if(this.position.x < 0)
        {
            this.velocidade = 150;
            this.state = this.changeState();
        }
    }

    drawDebug(context){
        context.lineWidth = 1;

        context.beginPath();
        context.strokeStyle = 'white';
        context.moveTo(this.position.x - 5, this.position.y);
        context.lineTo(this.position.x + 4, this.position.y);
        context.moveTo(this.position.x, this.position.y - 5);
        context.lineTo(this.position.x, this.position.y + 4);
        context.stroke();
    }

    draw(context){
        //const nextFrame = this.frames.find(x => x.includes(this.animationFrame)); 
        const nextFrame = this.frames.find(x => x.includes(this.animations[this.state][this.animationFrame])); 

        context.scale(this.direction, 1);
        context.drawImage(
            this.image,
            this.position.x * this.direction - this.image.naturalWidth / 2, this.position.y - this.image.naturalHeight
        );

        context.setTransform(1,0,0,1,0,0);
        this.drawDebug(context);
    }

    fillFrameArray(nomenclatura, quant_frames){
        const frameMap = [];
        for (let index = 0; index < quant_frames; index++) {
            frameMap.push(`../../chars/${nomenclatura}${index}.png`);        
        }
        return frameMap
    }
}