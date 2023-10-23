import { Container, Texture, TilingSprite, Text } from "pixi.js";
import { IUpdateable } from "../utils/Updateable";
import { Fondo } from "../game/Fondo";
import { Pez } from "../game/Pez";
import { Player } from "../game/Player";
import { checkCollision } from "../utils/IHitbox";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { LoseMenu } from "./LoseMenu";
import { Button } from "../ui/Button";
import { MainMenu } from "./MainMenu";

export class TickerScene extends SceneBase implements IUpdateable{
    private waterSupLimit = SceneManager.HEIGHT*4/5;

    private exitButton:Button;

    private fish:Pez[] = [];

    private playerLine : Player = new Player();

    private world:Container;
    private bg:TilingSprite;

    private timePassed:number = 0;
    private changeLevel:number = 0;
    private time:number = 0;

    public score:number[] = [];
    private level:number = 1;

    private tiempo:Text = new Text("",{fontSize: 15, fill: 0x372e36});
    private puntos:Text = new Text("",{fontSize: 15, fill: 0x372e36});
    constructor(){
        super();
        

        this.world = new Container();

        //=================fondo==================//
        this.bg = new TilingSprite(Texture.from("normalWater"),SceneManager.WIDTH,SceneManager.HEIGHT)
        this.bg.scale.set(1,2);
        const fondoMovil: Fondo = new Fondo();

        this.addChild(this.bg);
        this.world.addChild(fondoMovil);

        //=================jugador==================//
        this.playerLine.x = SceneManager.WIDTH/2;//Si no funciona volver a poner winx y winy
        this.playerLine.y = SceneManager.HEIGHT/3;
        this.world.addChild(this.playerLine);

        //=================inicializaciones==================//
        for(let i=0;i<4;i++){
            this.score.push(0);
        }
        

        /*
        const pez1: Pez = new Pez(-0.025,0.025,0,this.waterSupLimit,5);
        
        this.fish.push(pez1);

        this.world.addChild(pez1);*/


        this.addChild(this.world);

        //=================boton==================//
        this.exitButton = new Button(Texture.from("normalButton"),
        Texture.from("downButton"),
        Texture.from("overButton"),
        this.onButtonClick.bind(this));
        this.exitButton.scale.set(0.03)
        this.exitButton.x = 0+this.exitButton.width/2//SceneManager.WIDTH;
        this.exitButton.y = SceneManager.HEIGHT-this.exitButton.width/3;
    
        const tButton = new Text("Salir", {fontSize: 25, fill: 0xc9f1fd});
        tButton.x = this.exitButton.x-this.exitButton.width/4;
        tButton.y = this.exitButton.y-this.exitButton.height/3;
        
        this.addChild(this.exitButton);
        this.addChild(tButton);


    }
    update(_deltaTime: number, _deltaFrame?: number | undefined): void {
        this.timePassed += _deltaTime;
        this.changeLevel += _deltaTime;
        this.time += _deltaTime;
        const sPuntaje:string = "Puntos: " + (this.score[0]*50-this.score[1]*60+this.score[2]*100);
        this.puntos.text = sPuntaje;
        this.puntos.anchor.set(1,0);
        this.puntos.x = SceneManager.WIDTH;
        this.puntos.y = this.puntos.height*1.5;

        const sTiempo:string = "Tiempo restante: " + Math.floor(90-(this.time/10))+"s";
        this.tiempo.text = sTiempo
        this.tiempo.anchor.set(1,0);
        this.tiempo.x = SceneManager.WIDTH;

        this.addChild(this.tiempo);
        this.addChild(this.puntos);
        if(this.changeLevel>180 && this.level<6){
            this.changeLevel = 0;
            this.level +=1
        }
        //=============nuevos peces=============//
        
        if(this.timePassed>15 && this.fish.length<8){
            this.timePassed = 0;
            
            const aux = Math.random();//Esto es para decidir la cantidad de peces en cada nivel
            //-----------parametros-----------//
            const heightAux =Math.random()*((SceneManager.HEIGHT*2+150)-this.waterSupLimit)+this.waterSupLimit;//ARREGLAR ALTURA para que llegue hasta abajo
            let scalexAux = 0.04+Math.random()*0.04;
            const scaleyAux = scalexAux;
            let posxAux = SceneManager.WIDTH;
            let velAux = -(Math.random()+10);
            const aux2 = Math.random()-0.5;
            if(aux2<0){
                posxAux = 0-2412*scalexAux;//ESTO ES EL TAMANIO DE LA IMAGEN, NO ES LO MEJOR PERO BUENO-no, no es :(-. Si cambias la imagen cambia esto
                scalexAux = -scalexAux;
                velAux = -velAux;
            }

            //-------------PECES POR NIVELES--------------
            let fishAux:Pez = new Pez(scalexAux,scaleyAux,posxAux,heightAux,velAux);
            
            if(this.level==1){
                fishAux.setClass(0);
            }else if(this.level==2){
                if(aux<0.8){
                    fishAux.setClass(1);//en el nivel 2, van a haber varios peces de clase 1
                }else{
                    fishAux.setClass(0);
                }
            }else if(this.level==3){
                if(aux<0.4){
                    fishAux.setClass(0);
                }else if(aux<0.7){
                    fishAux.setClass(1);
                }else{
                    fishAux.setClass(2);
                }
                
            }else if(this.level==4){
                if(aux<0.33){
                    fishAux.setClass(0);
                }else if(aux<0.66){
                    fishAux.setClass(1);
                }else{
                    fishAux.setClass(2);
                }
            }else{
                if(aux<0.7){
                    fishAux.setClass(1);
                } else if(aux<0.95){
                    fishAux.setClass(2);
                }else{
                    fishAux.setClass(0);
                }
            }
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
            if(overlap){
                this.score[pez.getClass()] += 1;
                pez.destroy();
            }
            if(pez.getRounds()>2){
                pez.destroy();
            }
        }

        this.fish = this.fish.filter((elem) => !elem.destroyed);
        if(this.time >= 900){
            const looseScene = new LoseMenu(this.score);
            SceneManager.changeScene(looseScene);
            
        }
    }
    private onButtonClick():void{
        const menuScene = new MainMenu();
            SceneManager.changeScene(menuScene);
    }

}