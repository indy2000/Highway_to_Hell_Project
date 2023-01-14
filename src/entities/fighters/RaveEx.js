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

        //Inicia todos os pulos
        let jumpString = 'raveex/jump-';
        //Finaliza todos os pulos
        let fallFromJump = 'raveex/fall-from-jump-';
        let jumpUpString = 'raveex/jump-up-';
        let jumpForwards = 'raveex/jump-forwards-';
        let jumpBackwards = 'raveex/jump-backwards-';
        let crouchDownString = 'raveex/crouch-down-';
        let crouchString = 'raveex/crouch-';
        let crouchUpString = 'raveex/crouch-up-';
        

        //this.frames = [];
        this.frames = this.frames.concat(this.fillFrameArray(idleString, 22));
        this.frames = this.frames.concat(this.fillFrameArray(forwardsString, 12));
        this.frames = this.frames.concat(this.fillFrameArray(backwardsString, 13));
        this.frames = this.frames.concat(this.fillFrameArray(jumpString, 3));
        this.frames = this.frames.concat(this.fillFrameArray(fallFromJump, 3));
        this.frames = this.frames.concat(this.fillFrameArray(jumpUpString, 12));
        this.frames = this.frames.concat(this.fillFrameArray(jumpForwards, 13));
        this.frames = this.frames.concat(this.fillFrameArray(jumpBackwards, 11));
        this.frames = this.frames.concat(this.fillFrameArray(crouchDownString, 9));
        this.frames = this.frames.concat(this.fillFrameArray(crouchString, 11));
        this.frames = this.frames.concat(this.fillFrameArray(crouchUpString, 3));


        this.animations = {
            [FighterState.IDLE]: this.fillFrameArray(idleString, 22),
            [FighterState.WALK_FORWARD]: this.fillFrameArray(forwardsString, 12),
            [FighterState.WALK_BACKWARD]: this.fillFrameArray(backwardsString, 13),
            [FighterState.JUMP_UP]: this.fillFrameArrayFromList([
                {nomenclatura: jumpString, quant_frames: 3},
                {nomenclatura: jumpUpString, quant_frames: 12},
                {nomenclatura: fallFromJump, quant_frames: 3},
            ]),
            [FighterState.JUMP_FORWARD]: this.fillFrameArrayFromList([
                {nomenclatura: jumpString, quant_frames: 3},
                {nomenclatura: jumpForwards, quant_frames: 13},
                {nomenclatura: fallFromJump, quant_frames: 3},
            ]),
            [FighterState.JUMP_BACKWARD]: this.fillFrameArrayFromList([
                {nomenclatura: jumpString, quant_frames: 3},
                {nomenclatura: jumpBackwards, quant_frames: 11},
                {nomenclatura: fallFromJump, quant_frames: 3},
            ]),
            [FighterState.CROUCH_DOWN]: this.fillFrameArray(crouchDownString, 9),
            [FighterState.CROUCH]: this.fillFrameArray(crouchString, 11),
            [FighterState.CROUCH_UP]: this.fillFrameArray(crouchString, 3),
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
        this.createFrameElementsDOM("raveexSrc");
    }
}