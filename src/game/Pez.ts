import {Graphics, Rectangle, Sprite, Texture} from "pixi.js";
import {IHitbox} from "../utils/IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { SceneManager } from "../utils/SceneManager";


export class Pez extends PhysicsContainer implements IHitbox{
    private hitbox:Graphics;
    private rounds:number = 0;

    private pez: Sprite = new Sprite();

    private fclass:number = 0;

    constructor(scalex: number,scaley: number,x: number,y: number,speed:number){
        super();
        //-------------pez-------------//
        this.pez = Sprite.from("normalFish0");
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
        if(this.pez.x+this.x<0-this.pez.width||this.pez.x+this.x>SceneManager.WIDTH+this.pez.width+10){
            this.speed.x = -this.speed.x;
            this.pez.scale.x = -this.pez.scale.x;
            this.hitbox.scale.x = -this.hitbox.scale.x;
            this.rounds++;
        }
    }
    setClass(newClass:number):void{
        this.fclass = newClass;
        const fishSprite:string = "normalFish"+newClass.toString();
        this.pez.texture = Texture.from(fishSprite);
        if(this.fclass==1){
        this.speed.x = this.speed.x*1.25;
        }else if(this.fclass==2){
            this.speed.x = this.speed.x*1.5;     
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