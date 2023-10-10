import {Graphics, Point, Rectangle, Sprite, Texture} from "pixi.js";
import {IHitbox} from "../utils/IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { SceneManager } from "../utils/SceneManager";


export class Pez extends PhysicsContainer implements IHitbox{
    private hitbox:Graphics;
    private rounds:number = 0;

    private pez: Sprite = new Sprite();

    private fclass:number = 0;
    private scalexy:Point = new Point();

    constructor(scalex: number,scaley: number,x: number,y: number,speed:number/*,clase:number*/){
        super();
        //-------------pez-------------//
        this.pez = Sprite.from("normalFish0");
        this.speed.x = speed;
        this.scalexy.x = scalex;
        this.scalexy.y = scaley;
        
        this.pez.scale.set(scalex,scaley);
        this.pez.y = y;
        this.pez.x = x;

        //-------------hitbox-------------//
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF,0.001);
        this.hitbox.drawRect(0,0,2000,1600);
        this.hitbox.endFill();
        this.hitbox.scale.set(scalex,scaley);
        this.hitbox.height = this.pez.height;
        this.hitbox.y = y+scaley;
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
        if(this.fclass==0){
            this.speed.x = this.speed.x*1.25;
            this.pez.scale.set(this.scalexy.x*0.5,this.scalexy.y*0.5);
            this.hitbox.scale.set(this.scalexy.x*0.5,this.scalexy.y*0.5);
            if(this.pez.scale.x<0){
                this.pez.x = -2413*this.scalexy.y*0.5;
            this.hitbox.x = -2413*this.scalexy.y*0.5;
            }
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