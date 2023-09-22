import { Graphics, Rectangle, Sprite } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { HEIGHT } from "..";
import { IHitbox } from "../utils/IHitbox";

export class Player extends PhysicsContainer implements IHitbox{
    public endLine: number = 100;

    public line:Graphics = new Graphics();

    private hook : Sprite = Sprite.from("normalHook");
    private hitbox: Graphics;

    private scaleHook = 0.15;
    private posx = 0- ((this.hook.width*2/3))*this.scaleHook;

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
    public override update(deltaSeconds: number): void {
        super.update(deltaSeconds/1000)
        if(Keyboard.state.get("ArrowUp")&&this.endLine>100){
            this.endLine -= 2;
            console.log('up')
        }else if(Keyboard.state.get("ArrowDown")&&this.endLine<HEIGHT*2)
        {
            console.log('down')
            this.endLine += 2;
        }
        //console.log('updateLine')
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