import {Fighter} from './Fighter.js';
import { FighterState } from '../../constants/fighter.js';

export class Ella extends Fighter
{
    constructor(x, y, velocidade)
    {
        super('Ella', x, y, velocidade);

        this.image = document.querySelector('img[alt="ella"]');

        let idleString = 'ella/idle-';
        let forwardsString = 'ella/forwards-';
        let backwardsString = 'ella/backwards-';
        let jumpUpString = 'ella/jump-up-';

        //this.frames = [];
        this.frames = this.frames.concat(this.fillFrameArray(idleString, 16));
        this.frames = this.frames.concat(this.fillFrameArray(forwardsString, 13));
        this.frames = this.frames.concat(this.fillFrameArray(backwardsString, 6));
        this.frames = this.frames.concat(this.fillFrameArray(jumpUpString, 5));

        this.animations = {
            [FighterState.IDLE]: this.fillFrameArray(idleString, 16),
            [FighterState.WALK_FORWARD]: this.fillFrameArray(forwardsString, 13),
            [FighterState.WALK_BACKWARD]: this.fillFrameArray(backwardsString, 6),
            [FighterState.JUMP_UP]: this.fillFrameArray(jumpUpString, 5)
        };

        this.velocidadeInicial = {
            jump: -420,  
          };

        this.gravity = 1000;
        this.createFrameElementsDOM("ellaSrc");
    }
}