import { FighterDirection } from "../../constants/fighter.js";
import { FighterState } from "../../constants/fighter.js";
import { STAGE_FLOOR } from "../../constants/stage.js";

export class Fighter{
    constructor(name, x, y, direction){
        this.name = name;
        this.image = new Image();
        this.position = {x, y};
        this.velocidade = {x: 0, y: 0};
        this.velocidadeInicial = {};
        this.direction = direction;
        this.gravity = 0;

        this.frames = [];
        this.animationFrame = 0;
        this.animationTimer = 0;        
        this.animations = {};

        this.states = {
            [FighterState.IDLE]:{
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [
                    undefined,
                    FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                    FighterState.CROUCH_UP,
                ],
            },
            [FighterState.WALK_FORWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleMoveState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD],
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleMoveState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD],
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE],
            },
            [FighterState.JUMP_FORWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD],
            },
            [FighterState.JUMP_BACKWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD],
            },
            [FighterState.CROUCH]: {
                init: () => { },
                update: () => { },
                validFrom: [FighterState.CROUCH_DOWN]
            },
            [FighterState.CROUCH_DOWN]: {
                init: () => { },
                update: this.handleCrouchDownState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD]
            },
            [FighterState.CROUCH_UP]: {
                init: () => { },
                update: this.handleCrouchUpState.bind(this),
                validFrom: [FighterState.CROUCH]
            }
        }

        this.changeState(FighterState.IDLE);
    }

    changeState(newState) {
        if(newState === this.currentState || !this.states[newState].validFrom.includes(this.currentState) )
        return;

        this.currentState = newState;
        this.animationFrame = 0;

        this.states[this.currentState].init();
    }

    handleIdleInit() {
        this.velocidade.x = 0;
        this.velocidade.y = 0;
    }

    handleIdleState() {

    }

    handleMoveInit() {
        this.velocidade.x = this.velocidadeInicial.x[this.currentState] ?? 0;
    }

    handleMoveState() {

    }

    handleJumpInit() {
        this.velocidade.y = this.velocidadeInicial.jump;
        this.handleMoveInit();
    }

    handleJumpState(time) {
        this.velocidade.y += this.gravity * time.secondsPassed;

        if(this.position.y > STAGE_FLOOR){
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.IDLE);
        }
    }

    handleCrouchDownState() {
        let framePath = this.animations[this.currentState][this.animations[this.currentState].length - 1].split('/')
        let frameName = framePath[framePath.length - 1]

        if(this.image.src.includes(frameName))
        this.changeState(FighterState.CROUCH);
    }

    handleCrouchUpState() {
        let framePath = this.animations[this.currentState][this.animations[this.currentState].length - 1].split('/')
        let frameName = framePath[framePath.length - 1]

        if(this.image.src.includes(frameName))
        this.changeState(FighterState.IDLE);
    }

    updateStageConstraints(context) {
        //const width = this.image.naturalWidth;        
        const WIDTH = 32; 


        if(this.position.x > context.canvas.width - WIDTH)
        //if(this.position.x > context.canvas.width - this.image.width)
        {
            //this.currentState = this.changeState();
            this.position.x = context.canvas.width - WIDTH;
        }

        if(this.position.x < WIDTH)
        //if(this.position.x < 0)
        {
            //this.currentState = this.changeState();
            this.position.x = WIDTH;
        }
    }

    updateAnimation(time)
    {
        if(time.previousTime > this.animationTimer + 60){
            this.animationTimer = time.previousTime;

            this.animationFrame++;
            if(this.animationFrame > this.animations[this.currentState].length) this.animationFrame = 0;
        }
    }

    update(time, context){
        const oldFrame = this.image.src;

        //LÓGICA ANTIGA PARA CARREGAR FRAMES (ALGUNS FRAMES QUEBRAVAM) 
        //const nextFrame = this.frames.find(x => x.includes(this.animations[this.currentState][this.animationFrame])); 
        //if(nextFrame != null && nextFrame != undefined)
            //this.image.src = nextFrame; 
        
        //LÓGICA NOVA PARA CARREGAR FRAMES
        const imgPath = this.frames.find(x => x.includes(this.animations[this.currentState][this.animationFrame]));
        const nextFrame = document.querySelector(`img[src="${imgPath}"]`);  

        if(nextFrame != null && nextFrame != undefined)
            this.image = nextFrame;

        this.position.x += (this.velocidade.x * this.direction) * time.secondsPassed;
        this.position.y += this.velocidade.y * time.secondsPassed;

        this.states[this.currentState].update(time, context);
        this.updateAnimation(time);
        this.updateStageConstraints(context);
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
        const nextFrame = this.frames.find(x => x.includes(this.animations[this.currentState][this.animationFrame])); 

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

    fillFrameArrayFromList(arrayAnimations){
        const frameMap = [];
        arrayAnimations.forEach(element => {
            for (let index = 0; index < element.quant_frames; index++) {
                frameMap.push(`../../chars/${element.nomenclatura}${index}.png`);        
            }
        });
        
        return frameMap
    }

    createFrameElementsDOM(idElemento) {
        var imgElement = document.getElementById(idElemento);
        for(var i=0;i<this.frames.length;i++){
            const img = document.createElement("img");
            img.setAttribute('src', this.frames[i]);            
            imgElement.appendChild(img);            
        }
    }
}