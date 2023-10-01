import { Container, Sprite } from "pixi.js";

export class Objeto extends Container {
    constructor(img: string, 
                posx: number = 0,
                posy: number = 0,
                escalax: number = 1,
                escalay: number = 1,
                angulo: number = 0){
        super();
        const objeto: Sprite = Sprite.from(img);
        objeto.anchor.set(0.5);
        objeto.scale.set(escalax,escalay);
        objeto.x = posx;
        objeto.y = posy;
        objeto.angle = angulo;
        this.addChild(objeto);
    }
}