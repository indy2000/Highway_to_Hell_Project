import { RaveEx } from "./entities/fighters/RaveEx.js";
import { Ella } from "./entities/fighters/Ella.js";
import { Stage } from "./entities/stages/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./constants/fighter.js";

const GameViewPort = {
    WIDTH: 334,
    HEIGHT: 224,
    //SCALE: 4,
}

window.addEventListener('load', function(){
    const canvasElement = document.querySelector('canvas');
    const context = canvasElement.getContext('2d');

    canvasElement.width = GameViewPort.WIDTH;
    canvasElement.height = GameViewPort.HEIGHT;

    //canvasElement.style.width = `${GameViewPort.WIDTH * GameViewPort.SCALE}px`;
    //canvasElement.style.height = `${GameViewPort.HEIGHT * GameViewPort.SCALE}px`;

    //const [raveex, stage1, stage2, ken_stage] = document.querySelectorAll('img');
   
   const entities = [
    new Stage(),
    new RaveEx(104, STAGE_FLOOR, FighterDirection.LEFT),
    new Ella(280, STAGE_FLOOR, FighterDirection.RIGHT),
    new FpsCounter(),
   ];

   let frameTime = {
     previousTime: 0,
     secondsPassed: 0,
   };
    

 function frame(time){
    window.requestAnimationFrame(frame);

    frameTime = {
        //Pegar o tempo em segundos
        secondsPassed: (time - frameTime.previousTime) / 1000,
        //Armazenar o tempo anterior
        previousTime: time,
    };

    for(const entity of entities)
    {
        entity.update(frameTime, context);
    }

    for(const entity of entities)
    {
        entity.draw(context);
    }

    //console.log(time);
    //context.clearRect(0, 0, GameViewPort.WIDTH, GameViewPort.HEIGHT);
}

     window.requestAnimationFrame(frame);
    //console.log(context);
});