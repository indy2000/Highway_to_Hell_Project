import {Fighter} from './Fighter.js';

export class RaveEx extends Fighter
{
    constructor(x, y, velocidade)
    {
        super('RaveEx', x, y, velocidade);

        this.image = document.querySelector('img[alt="raveex"]');
    }
}