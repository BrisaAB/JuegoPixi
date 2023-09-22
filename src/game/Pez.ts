import {Container, Graphics, Rectangle, Sprite} from "pixi.js";
import {IHitbox} from "../utils/IHitbox";


export class Pez extends Container implements IHitbox{
    
    private hitbox:Graphics;

    constructor(scalex: number,scaley: number,x: number,y: number,angle: number){
        super();
        const pez: Sprite = Sprite.from("normalPez");
        pez.scale.set(scalex,scaley);
        pez.y = y;
        pez.x = x;
        pez.angle = angle;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF,0.3);
        this.hitbox.drawRect(0,0,2000,1600);
        this.hitbox.endFill();
        this.hitbox.scale.set(scalex,scaley);
        this.hitbox.y = y+450*scaley;
        this.hitbox.x = x;
        this.hitbox.angle = angle;

        this.addChild(pez);

        this.addChild(this.hitbox);
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}