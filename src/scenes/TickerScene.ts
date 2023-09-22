import { Container, Sprite } from "pixi.js";
import { IUpdateable } from "../utils/Updateable";
import { Fondo } from "../game/Fondo";
import { Pez } from "../game/Pez";
import { Player } from "../game/Player";

export class TickerScene extends Container implements IUpdateable{
    private winx:number;
    private winy:number;
    private fish:Pez[] = [];
    private playerLine : Player = new Player();
    private world:Container;
    constructor(windowx:number,windowy:number){
        super();
        
        this.winx = windowx;
        this.winy = windowy;
        this.world = new Container();

        //-------------fondo-------------//
        const water:Sprite = Sprite.from("normalWater");
        water.scale.set(0.5,1);
        const fondoMovil: Fondo = new Fondo();
        water.y = fondoMovil.width/4;

        this.addChild(water);
        this.world.addChild(fondoMovil);

        //-------------jugador-------------//
        this.playerLine.x = windowx/2
        this.playerLine.y = windowy/3;
        console.log(this.playerLine.y)
        this.world.addChild(this.playerLine);
        console.log(this.world.y)
        this.addChild(this.world)
    }
    start(){
        const pez1: Pez = new Pez(0.05,0.05,this.winx*3/4,this.winy*3/4,-20);
        const pez2: Pez = new Pez((-0.035),0.035,(this.winx/3),(this.winy/2),20);
        const pez3: Pez = new Pez(0.02,0.02,(this.winx*3/8),(this.winy*3/4),5);

        this.fish.push(pez1);
        this.fish.push(pez2);
        this.fish.push(pez3);
    }
    update(_deltaTime: number, _deltaFrame?: number | undefined): void {
        //console.log("updated")
        this.playerLine.update(_deltaTime);
        //console.log(this.playerLine.y)
        //throw new Error("Method not implemented.");
        this.world.y = (100-this.playerLine.endLine)*this.worldTransform.d;
        //console.log("world y: ",this.world.y);
        //console.log('endline: ', this.playerLine.endLine);
    }

}