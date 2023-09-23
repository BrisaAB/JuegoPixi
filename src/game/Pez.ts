import {Graphics, Rectangle, Sprite} from "pixi.js";
import {IHitbox} from "../utils/IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";


export class Pez extends PhysicsContainer implements IHitbox{
    
    private hitbox:Graphics;

    public fclass:number;

    constructor(scalex: number,scaley: number,x: number,y: number,speed:number,fclass:number){
        super();
        //-------------pez-------------//
        this.fclass = fclass;
        let pez: Sprite = new Sprite();
        if(this.fclass==0){
            pez = Sprite.from("normalFish"); //La idea de esto es cambiar los sprites para tener 
            this.speed.x = speed;
        }else if(this.fclass==1){                //tres tipos de peces diferentes, por ahora les pon-
            pez = Sprite.from("normalFish"); //go el mismo sprite
            //this.speed.x = speed*1.5;
        }else if(this.fclass==2){
            pez = Sprite.from("normalFish");
            //this.speed.x = speed*2;     
        }
        pez.scale.set(scalex,scaley);
        pez.y = y;
        pez.x = x;

        //-------------hitbox-------------//
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF,0.3);
        this.hitbox.drawRect(0,0,2000,1600);
        this.hitbox.endFill();
        this.hitbox.scale.set(scalex,scaley);
        this.hitbox.y = y+450*scaley;
        this.hitbox.x = x;
        //this.hitbox.angle = angle;

        //-------------adds-------------//
        this.addChild(pez);
        this.addChild(this.hitbox);
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}