export class FpsCounter{
 constructor() {
    this.fps = 0;
 }

 update(time){
    this.fps = Math.trunc(1 / time.secondsPassed);
 }

 draw(context){
    context.font = "bold 15px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(`FPS: ${this.fps}`, 30, 20);
 }
}