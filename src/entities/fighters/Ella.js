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
        let crouchDownString = 'ella/crouch-down-';
        let crouchString = 'ella/crouch-';
        let crouchUpString = 'ella/crouch-up-';

        //this.frames = [];
        this.frames = this.frames.concat(this.fillFrameArray(idleString, 16));
        this.frames = this.frames.concat(this.fillFrameArray(forwardsString, 13));
        this.frames = this.frames.concat(this.fillFrameArray(backwardsString, 6));
        this.frames = this.frames.concat(this.fillFrameArray(jumpUpString, 5));
        this.frames = this.frames.concat(this.fillFrameArray(crouchDownString, 4));
        this.frames = this.frames.concat(this.fillFrameArray(crouchString, 10));
        this.frames = this.frames.concat(this.fillFrameArray(crouchUpString, 6));

        this.animations = {
            [FighterState.IDLE]: this.fillFrameArray(idleString, 16),
            [FighterState.WALK_FORWARD]: this.fillFrameArray(forwardsString, 13),
            [FighterState.WALK_BACKWARD]: this.fillFrameArray(backwardsString, 6),
            [FighterState.JUMP_UP]: this.fillFrameArray(jumpUpString, 5),
            [FighterState.JUMP_FORWARD]: this.fillFrameArray(jumpUpString, 5),
            [FighterState.JUMP_BACKWARD]: this.fillFrameArray(jumpUpString, 5),
            [FighterState.CROUCH_DOWN]: this.fillFrameArray(crouchDownString, 4),
            [FighterState.CROUCH]: this.fillFrameArray(crouchString, 10),
            [FighterState.CROUCH_UP]: this.fillFrameArray(crouchString, 6),
        };

        this.velocidadeInicial = {
            x:{
                [FighterState.WALK_FORWARD]: 200,
                [FighterState.WALK_BACKWARD]: -150,
                [FighterState.JUMP_FORWARD]: 170,
                [FighterState.JUMP_BACKWARD]: -200,
            },
            jump: -420,  
        };

        this.gravity = 1000;
        this.createFrameElementsDOM("ellaSrc");
    }
}