export class Stage
{
    constructor() {
        this.image = document.querySelector('img[alt="ken_stage"]');
    }

    draw(context){
        context.drawImage(this.image, 0, 0);
    }

    update(context){
        
    }
}




