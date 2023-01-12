import {Fighter} from './Fighter.js';

export class RaveEx extends Fighter
{
    constructor(x, y, velocidade)
    {
        super('RaveEx', x, y, velocidade);

        this.image = document.querySelector('img[alt="raveex"]');

        let idleString = 'raveex/idle-';
        let forwardsString = 'raveex/forwards-';
        let backwardsString = 'raveex/backwards-';

        //this.frames = [];
        this.frames = this.frames.concat(this.fillFrameArray(idleString, 22));
        this.frames = this.frames.concat(this.fillFrameArray(forwardsString, 12));
        this.frames = this.frames.concat(this.fillFrameArray(backwardsString, 13));
        
        this.animations = {
            'walkForwards': this.fillFrameArray(forwardsString, 12),
            'walkBackwards': this.fillFrameArray(backwardsString, 13)
        };
    }
}