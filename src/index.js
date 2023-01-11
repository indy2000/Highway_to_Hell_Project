import { RaveEx } from "./entities/fighters/RaveEx.js";
import { Ella } from "./entities/fighters/Ella.js";
import { Stage } from "./entities/stages/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";

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
    new RaveEx(80, 80, 130),
    new Ella(80, 83, -130),
    new FpsCounter(),
   ];

    let previousTime = 0;
    let secondsPassed = 0;

function frame(time){
    window.requestAnimationFrame(frame);
    //Pegar o tempo em segundos
    secondsPassed = (time - previousTime) / 1000;

    //Armazenar o tempo anterior
    previousTime = time;

    for(const entity of entities)
    {
        entity.update(secondsPassed, context);
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