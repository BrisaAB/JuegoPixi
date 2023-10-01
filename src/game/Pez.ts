import {Graphics, Rectangle, Sprite} from "pixi.js";
import {IHitbox} from "../utils/IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { WHIDTH } from "..";


export class Pez extends PhysicsContainer implements IHitbox{
    private hitbox:Graphics;
    private rounds:number = 0;

    private pez: Sprite = new Sprite();

    private fclass:number;

    constructor(scalex: number,scaley: number,x: number,y: number,speed:number,fclass:number){
        super();
        //-------------pez-------------//
        this.fclass = fclass;
        this.pez = Sprite.from("normalFish");
        this.speed.x = speed;
    
        /* if(this.fclass==0){
            this.pez = Sprite.from("normalFish"); //La idea de esto es cambiar los sprites para tener 
            this.speed.x = speed;
        }else if(this.fclass==1){                //tres tipos de peces diferentes, por ahora les pon-
            this.pez = Sprite.from("normalFish"); //go el mismo sprite
            //this.speed.x = speed*1.25;
        }else if(this.fclass==2){
            this.pez = Sprite.from("normalFish");
            //this.speed.x = speed*1.5;     
        }*/
        this.pez.scale.set(scalex,scaley);
        this.pez.y = y;
        this.pez.x = x;

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
        this.addChild(this.pez);
        this.addChild(this.hitbox);
    }
    public override update(deltaSeconds: number): void {
        super.update(deltaSeconds);
        if(this.pez.x+this.x<0-this.pez.width||this.pez.x+this.x>WHIDTH+this.pez.width+10){
            this.speed.x = -this.speed.x;
            this.pez.scale.x = -this.pez.scale.x;
            this.hitbox.scale.x = -this.hitbox.scale.x;
            this.rounds++;
        }
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
    getClass():number{
        return this.fclass;
    }
    getRounds():number{
        return this.rounds;
    }
}