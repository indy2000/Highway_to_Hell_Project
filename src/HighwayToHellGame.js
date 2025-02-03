import { RaveEx } from "./entities/fighters/RaveEx.js";
import { Ella } from "./entities/fighters/Ella.js";
import { Stage } from "./entities/stages/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./constants/fighter.js";
import { registerKeyboardEvents } from "./InputHandler.js";

export class HighwayToHellGame {
constructor() {
    this.GameViewPort = {
        //Aspect Ratio 16:9
        WIDTH: 400,//334,
        HEIGHT: 225,//224,
        //SCALE: 4,
    }

    this.context = this.getContext();

    this.fighters = [
        new RaveEx(280, STAGE_FLOOR, FighterDirection.LEFT, 1),
        new Ella(74, STAGE_FLOOR, FighterDirection.RIGHT, 0),
    ];
    
    this.entities = [
        new Stage(this.GameViewPort.WIDTH, this.GameViewPort.HEIGHT),
        ...this.fighters,
        new FpsCounter(),
    ];
    
    this.frameTime = {
         previousTime: 0,
         secondsPassed: 0,
    };

       
}

getContext(){
    const canvasElement = document.querySelector('canvas');
    const context = canvasElement.getContext('2d');

    //DECIDIR SE VAI USAR
    context.imageSmoothingEnabled = true;

    canvasElement.width = this.GameViewPort.WIDTH;
    canvasElement.height = this.GameViewPort.HEIGHT;
    return context;
}

update() {
    for(const entity of this.entities)
    {
        entity.update(this.frameTime, this.context);
    }
}

draw() {
    for(const entity of this.entities)
    {
        entity.draw(this.context);
    }
}
    
   
    frame(time){
        window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
            //Pegar o tempo em segundos
            secondsPassed: (time - this.frameTime.previousTime) / 1000,
            //Armazenar o tempo anterior
            previousTime: time,
        };
        this.update();
        this.draw();
    }

     handleFormSubmit(event) {
        event.preventDefault();
    
        const checkboxesSelectionadas = Array.from(event.target.querySelectorAll('input:checked'))
        .map(checkbox => checkbox.value);
    
        const options = event.target.querySelector('select');
    
        this.fighters.forEach(fighter => {
            if(checkboxesSelectionadas.includes(fighter.name)){
                fighter.changeState(options.value);
            }
        });
    }

    start(){
        registerKeyboardEvents();
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        window.requestAnimationFrame(this.frame.bind(this));
       //console.log(context);
    }
}