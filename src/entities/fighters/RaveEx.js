import {Fighter} from './Fighter.js';
import { FighterState } from '../../constants/fighter.js';

export class RaveEx extends Fighter
{
    constructor(x, y, velocidade)
    {
        super('RaveEx', x, y, velocidade);

        this.image = document.querySelector('img[alt="raveex"]');

        let idleString = 'raveex/idle-';
        let forwardsString = 'raveex/forwards-';
        let backwardsString = 'raveex/backwards-';
        let jumpUpString = 'raveex/jump-up-';

        //this.frames = [];
        this.frames = this.frames.concat(this.fillFrameArray(idleString, 22));
        this.frames = this.frames.concat(this.fillFrameArray(forwardsString, 12));
        this.frames = this.frames.concat(this.fillFrameArray(backwardsString, 13));
        this.frames = this.frames.concat(this.fillFrameArray(jumpUpString, 18));


        this.animations = {
            [FighterState.IDLE]: this.fillFrameArray(idleString, 22),
            [FighterState.WALK_FORWARD]: this.fillFrameArray(forwardsString, 12),
            [FighterState.WALK_BACKWARD]: this.fillFrameArray(backwardsString, 13),
            [FighterState.JUMP_UP]: this.fillFrameArray(jumpUpString, 18)
        };

        this.velocidadeInicial = {
          jump: -420,  
        };

        this.gravity = 1000;
        this.createFrameElementsDOM("raveexSrc");
    }
}