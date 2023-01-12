import {Fighter} from './Fighter.js';

export class Ella extends Fighter
{
    constructor(x, y, velocidade)
    {
        super('Ella', x, y, velocidade);

        this.image = document.querySelector('img[alt="ella"]');

        let idleString = 'ella/idle-';
        let forwardsString = 'ella/forwards-';
        let backwardsString = 'ella/backwards-';

        //this.frames = [];
        this.frames = this.frames.concat(this.fillFrameArray(idleString, 16));
        this.frames = this.frames.concat(this.fillFrameArray(forwardsString, 13));
        this.frames = this.frames.concat(this.fillFrameArray(backwardsString, 6));
     
        this.animations = {
            'walkForwards': this.fillFrameArray(forwardsString, 13),
            'walkBackwards': this.fillFrameArray(backwardsString, 6)
        };
    }
}