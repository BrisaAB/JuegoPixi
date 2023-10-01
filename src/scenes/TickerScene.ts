import { Container, Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/Updateable";
import { Fondo } from "../game/Fondo";
import { Pez } from "../game/Pez";
import { Player } from "../game/Player";
import { checkCollision } from "../utils/IHitbox";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { LoseMenu } from "./LoseMenu";

export class TickerScene extends SceneBase implements IUpdateable{
   /* private winx:number;
    private winy:number;*/
    private waterSupLimit = SceneManager.HEIGHT*4/5;

    private fish:Pez[] = [];

    private playerLine : Player = new Player();

    private world:Container;
    private bg:TilingSprite;

    private timePassed:number = 0;
    private changeLevel:number = 0;

    public score:number[] = [];
    private level:number = 1;

    constructor(/*windowx:number,windowy:number*/){
        super();
        
        /*this.winx = windowx;
        this.winy = windowy;*/
        this.world = new Container();

        //-------------fondo-------------//
        this.bg = new TilingSprite(Texture.from("normalWater"),SceneManager.WIDTH,SceneManager.HEIGHT)
        this.bg.scale.set(1,2);
        const fondoMovil: Fondo = new Fondo();

        this.addChild(this.bg);
        this.world.addChild(fondoMovil);

        //-------------jugador-------------//
        this.playerLine.x = SceneManager.WIDTH/2;//Si no funciona volver a poner winx y winy
        this.playerLine.y = SceneManager.HEIGHT/3;
        this.world.addChild(this.playerLine);

        //-------------inicializaciones-------------//
        for(let i=0;i<4;i++){
            this.score.push(0);
        }
        const pez1: Pez = new Pez(-0.025,0.025,0,this.waterSupLimit,0.5,0);
        
        this.fish.push(pez1);

        this.world.addChild(pez1);


        this.addChild(this.world);

    }
    update(_deltaTime: number, _deltaFrame?: number | undefined): void {

        this.timePassed += _deltaTime;
        this.changeLevel += _deltaTime;

        if(this.changeLevel>500 && this.level<6){
            this.changeLevel = 0;
            this.level +=1
        }
        //=============nuevos peces=============//
        if(this.timePassed> 200 && this.fish.length<6){
            this.timePassed = 0;
            //const aux = Math.random()*11;//Esto es para decidir la cantidad de peces en cada nivel
            //-----------parametros-----------//
            const heightAux =Math.random()*((SceneManager.HEIGHT*2+150)-this.waterSupLimit)+this.waterSupLimit;//ARREGLAR ALTURA para que llegue hasta abajo
            let scalexAux = 0.015+Math.random()*0.01;
            const scaleyAux = scalexAux;
            let posxAux = SceneManager.WIDTH;
            let velAux = -0.5;
            const aux = Math.random()-0.5
            if(aux<0){
                posxAux = 0-4824*scalexAux;//ESTO ES EL TAMANIO DE LA IMAGEN, NO ES LO MEJOR PERO BUENO. Si cambias la imagen cambia esto
                scalexAux = -scalexAux;
                velAux = 0.5
            }

            const fishAux: Pez = new Pez(scalexAux,scaleyAux,posxAux,heightAux,velAux,0);
            /*-------------PECES POR NIVELES--------------(proximamente)
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
            this.fish.push(fishAux);
            this.world.addChild(fishAux);
        }

        //=============colisiones=============//
        this.playerLine.update(_deltaTime);
        this.world.y = (100-this.playerLine.endLine)*this.worldTransform.d;
        this.bg.tilePosition.y = this.world.y*0.5;
        for(let pez of this.fish){
            pez.update(_deltaTime);
            const overlap = checkCollision(this.playerLine,pez);
            //console.log(overlap != false)
            if(overlap){
                console.log('lpm');
                this.score[pez.getClass()] += 1;
                pez.destroy();
            }
            if(pez.getRounds()>2){
                pez.destroy();
            }
        }

        this.fish = this.fish.filter((elem) => !elem.destroyed);
        if(this.level >= 2){
            const looseScene = new LoseMenu();
            SceneManager.changeScene(looseScene);
            
        }
    }

}