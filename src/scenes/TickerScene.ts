import { Container, /*Sprite,*/ Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/Updateable";
import { Fondo } from "../game/Fondo";
import { Pez } from "../game/Pez";
import { Player } from "../game/Player";
import { HEIGHT, WHIDTH } from "..";
import { checkCollision } from "../utils/IHitbox";

export class TickerScene extends Container implements IUpdateable{
    private winx:number;
    private winy:number;

    private fish:Pez[] = [];

    private playerLine : Player = new Player();

    private world:Container;
    private bg:TilingSprite;

    private timePassed:number = 0;

    public score:number[] = [];
    private level:number = 1;
    constructor(windowx:number,windowy:number){
        super();
        
        this.winx = windowx;
        this.winy = windowy;
        this.world = new Container();

        //-------------fondo-------------//
        this.bg = new TilingSprite(Texture.from("normalWater"),WHIDTH,HEIGHT)
        this.bg.scale.set(1,2);
        const fondoMovil: Fondo = new Fondo();

        this.addChild(this.bg);
        this.world.addChild(fondoMovil);

        //-------------jugador-------------//
        this.playerLine.x = this.winx/2
        this.playerLine.y = this.winy/3;
        console.log(this.playerLine.y)
        this.world.addChild(this.playerLine);
        console.log(this.world.y)

        //-------------inicializaciones-------------//
        for(let i=0;i<4;i++){
            this.score.push(0);
        }
        const pez1: Pez = new Pez(0.025,0.025,windowx*3/4,windowy*3/4,-0.1,0);
        //const pez2: Pez = new Pez((-0.035),0.035,(this.winx/3),(this.winy/2),20,100,-1);
        //const pez3: Pez = new Pez(0.02,0.02,(this.winx*3/8),(this.winy*3/4),5,100,1);

        this.fish.push(pez1);
       // this.fish.push(pez2);
        //this.fish.push(pez3);

        this.world.addChild(pez1);
        //this.world.addChild(pez2);
        //this.world.addChild(pez3);
        
        this.addChild(this.world)

    }
    update(_deltaTime: number, _deltaFrame?: number | undefined): void {
        this.timePassed += _deltaTime;
        if(this.timePassed>100 && this.level<5){
            this.level +=1
        }
        //-------------nuevos peces-------------//
        /*if(this.timePassed> 100 && this.fish.length<6){
            this.timePassed = 0;
            const aux = Math.random()*11;
            if(this.level ==1){
                const fishAux = new Pez()//class0
            }else if(this.level==2){
                if(aux<8){
                    const fishAux = new Pez()//class0
                }else{
                    const fishAux = new Pez()//class1
                }
            }else if(this.level==3){
                const fishAux = new Pez()//class1
            }else if(this.level==4){
                if(aux<8){
                    const fishAux = new Pez()//class1
                }else{
                    const fishAux = new Pez()//class2
                }
            }else{
                const fishAux = new Pez()//class2
            }l
        }*/

        //-------------colisiones-------------//
        this.playerLine.update(_deltaTime);
        this.world.y = (100-this.playerLine.endLine)*this.worldTransform.d;
        this.bg.tilePosition.y = this.world.y*0.5;
        for(let pez of this.fish){
            pez.update(_deltaTime);
            const overlap = checkCollision(this.playerLine,pez);
            console.log(overlap != false)
            if(overlap != false){
                this.score[pez.fclass] += 1;
                
                pez.destroy();
            }
        }
        this.fish = this.fish.filter((elem) => !elem.destroyed)
    }

}