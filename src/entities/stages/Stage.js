export class Stage
{
    constructor(width, height) {
        //this.image = document.querySelector('img[alt="ken_stage"]');
        this.image = document.querySelector('img[alt="background2"]');
        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;
        this.gamePortWidth = width;
        this.gamePortHeight = height;
    }

    draw(context){
        this.resizeRatio();
        context.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight);
    }

    update(context){
        
    }

    resizeRatio(){    
        var width = this.image.width;
        var height = this.image.height;

        // Change the resizing logic
        if (width > height) {
            if (width > this.gamePortWidth) {
                this.imageHeight = height * (this.gamePortWidth / width);
                this.imageWidth = this.gamePortWidth;
            }
        } 
        else {
            if (height > this.gamePortHeight) {
                this.imageWidth = width * (this.gamePortHeight / height);
                this.imageHeight = this.gamePortHeight;
            }
        }
    }
}




