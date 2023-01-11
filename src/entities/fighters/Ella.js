import {Fighter} from './Fighter.js';

export class Ella extends Fighter
{
    constructor(x, y, velocidade)
    {
        super('Ella', x, y, velocidade);

        this.image = document.querySelector('img[alt="ella"]');
    }
}