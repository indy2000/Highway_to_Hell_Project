import { RaveEx } from "./entities/fighters/RaveEx.js";
import { Ella } from "./entities/fighters/Ella.js";
import { Stage } from "./entities/stages/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection, FighterState } from "./constants/fighter.js";

const GameViewPort = {
    WIDTH: 334,
    HEIGHT: 224,
    //SCALE: 4,
}

function populateMoveDropdown() {
    const dropdown = document.getElementById('state-dropdown');

    Object.entries(FighterState).forEach(([, value]) => {
        const option = document.createElement('option');
        option.setAttribute('value', value);
        option.innerText = value;
        dropdown.appendChild(option);
    });
}

function handleFormSubmit(event, fighters) {
    event.preventDefault();

    const checkboxesSelectionadas = Array.from(event.target.querySelectorAll('input:checked'))
    .map(checkbox => checkbox.value);

    const options = event.target.querySelector('select');

    fighters.forEach(fighter => {
        if(checkboxesSelectionadas.includes(fighter.name)){
            fighter.changeState(options.value);
        }
    });
}

window.addEventListener('load', function(){
    populateMoveDropdown();
    const canvasElement = document.querySelector('canvas');
    const context = canvasElement.getContext('2d');

    canvasElement.width = GameViewPort.WIDTH;
    canvasElement.height = GameViewPort.HEIGHT;

    //canvasElement.style.width = `${GameViewPort.WIDTH * GameViewPort.SCALE}px`;
    //canvasElement.style.height = `${GameViewPort.HEIGHT * GameViewPort.SCALE}px`;

    //const [raveex, stage1, stage2, ken_stage] = document.querySelectorAll('img');
   const fighters = [
    new RaveEx(280, STAGE_FLOOR, FighterDirection.LEFT),
    new Ella(104, STAGE_FLOOR, FighterDirection.RIGHT),
   ]

   const entities = [
    new Stage(),
    ...fighters,
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
    this.document.addEventListener('submit', (event) => handleFormSubmit(event, fighters));
     window.requestAnimationFrame(frame);
    //console.log(context);
});