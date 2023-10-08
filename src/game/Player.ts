import { Graphics, Rectangle, Sprite } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "../utils/IHitbox";
import { SceneManager } from "../utils/SceneManager";

export class Player extends PhysicsContainer implements IHitbox{
    public endLine: number = 101;

    public line:Graphics = new Graphics();

    private hook : Sprite = Sprite.from("normalHook");
    private hitbox: Graphics;

    private scaleHook = 0.15;
    private posx = 0- ((this.hook.width*2/3))*this.scaleHook;

    private speedy:number=0;
    private accelerationy:number=0;
    private mooving:boolean=false;
    private up:boolean = false;
    constructor(){
        super();
        this.line.lineStyle({color: 0x000000, width: 5, alpha: 1});
        this.line.moveTo(0,0);
        this.line.lineTo(0,this.endLine);
        
        this.hook.x = this.posx;
        this.hook.y = this.endLine-10;
        this.hook.scale.set(this.scaleHook);
        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFFFF00,0.3);
        this.hitbox.drawRect(10,0,30,45);
        this.hitbox.endFill();
        //this.hitbox.scale.set();
        this.hitbox.y = this.endLine;
        this.hitbox.x = this.posx;

        this.addChild(this.line);
        this.addChild(this.hook);
        this.addChild(this.hitbox);
    }
    public override update(deltaTime: number): void {
        const dt = deltaTime/1000;
        const maxvel = 70;
        super.update(dt)
        if(Keyboard.state.get("ArrowUp")&&this.endLine>100){
            this.mooving = true;
            this.up = true;
            console.log('up',this.speedy)
            if(this.speedy > -maxvel){
                this.accelerationy -= 10;
            }else{
                this.accelerationy = 0;
                this.speedy = -maxvel;
            }            
        }else if(Keyboard.state.get("ArrowDown")&&this.endLine<SceneManager.HEIGHT*2)
        {
            this.mooving = true;
            this.up = false;
            console.log('down',this.speedy)
            if(this.speedy < maxvel){
                this.accelerationy += 10;
            }else{
                this.accelerationy = 0;
                this.speedy = maxvel;
            }          
        }else if(this.endLine>100&&this.endLine<SceneManager.HEIGHT*2){
            console.log('none', this.speedy)
            if(this.mooving){
                if(this.up){
                    this.accelerationy = 10;
                }else{
                    this.accelerationy = -10;
                }
                this.mooving = false;
            }else if(Math.abs(this.speedy)<9){
                this.accelerationy = 0;
                this.speedy = 0;
            }
        }else{
            this.accelerationy = 0;
            this.speedy = 0;
        }

        const auxVel =this.speedy * deltaTime + 1/2*this.accelerationy*deltaTime*deltaTime;
        const auxPos = this.endLine + auxVel;
        if(auxVel<maxvel && auxVel > -maxvel && auxPos>100&&auxPos<SceneManager.HEIGHT*2){
            this.endLine += auxVel;
            this.speedy += this.accelerationy*deltaTime;
        }else{
            this.speedy = 0;
        }
        this.line.clear();
        this.line.lineStyle({color: 0x000000, width: 5, alpha: 1});
        this.line.moveTo(0,0);
        this.line.lineTo(0,this.endLine);
        this.hook.position.set( this.posx,this.endLine-10);
        this.hitbox.y = this.endLine;
    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }
}