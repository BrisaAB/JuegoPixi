import {NineSlicePlane,Texture,Text, Sprite} from "pixi.js";
import { ModuloCartel } from "../game/ModuloCartel";
//import { Objeto } from "../game/Objeto";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { MainMenu } from "./MainMenu";
import { TickerScene } from "./TickerScene";

export class LoseMenu extends SceneBase {
    private buttonMenu:Button;
    private buttonRestart:Button;

    constructor(score:number[]){
        super();
        const bg:Sprite = Sprite.from("normalFondoG");
        bg.scale.set(0.35)
        this.addChild(bg);

        //=================cartel base==================//
        const tablero = new NineSlicePlane(
            Texture.from("normalTablero"),
            50,50,50,50
            );
        tablero.height = 3100;
        tablero.width = SceneManager.WIDTH*3;

        const escalaT = 0.15;
        tablero.scale.set(escalaT);
        tablero.y = (SceneManager.HEIGHT-(tablero.height*escalaT))/2;
        tablero.x = (SceneManager.WIDTH-(tablero.width*escalaT))/2;
        
        //=================cartelito==================//(ya no lo uso, pero como todas las referencias espaciales estaban en base a esto lo deje)
        const cartel = new NineSlicePlane(
            Texture.from("normalCartelito"),
            10,10,10,10
        )
        const escalaC = 0.5;
        cartel.width = (tablero.width*escalaT)*2;
        cartel.height = (tablero.height*escalaT)/2;
        cartel.scale.set(escalaC);
        cartel.y = tablero.y-((cartel.height*escalaC)/3);
        cartel.x = (SceneManager.WIDTH-(cartel.width*escalaC))/2;
        
        const titulo = new Text("Completo", {fontSize: 25, fill: 0xc9f1fd});
        titulo.x = SceneManager.WIDTH/2-titulo.width/2;
        titulo.y = cartel.y+(titulo.height*1.25);
        
        /*
        //=================estrellas==================//
        const estrella1: Objeto = new Objeto("normalEstrellaL",
                                            tablero.x+(tablero.width*escalaT*2/9),
                                            tablero.y+(tablero.height*escalaT/5),
                                            0.05,0.05,-20);
        const estrella2: Objeto = new Objeto("normalEstrellaL",
                                            tablero.x+(tablero.width*escalaT/2),
                                            tablero.y+(tablero.height*escalaT/6),
                                            0.05,0.05,0);
        const estrella3: Objeto = new Objeto("normalEstrellaV",
                                            tablero.x+(tablero.width*escalaT*7/9),
                                            tablero.y+(tablero.height*escalaT/5),
                                            0.2,0.2,20);
        */
       //=================puntajes==================//
        const mod1: ModuloCartel = new ModuloCartel("Puntaje:","nada","",tablero.width*escalaT/2);

        mod1.x = tablero.x-mod1.width*1/3//tablero.x+((1/6)*(tablero.width*escalaT));
        mod1.y = (tablero.height*escalaT*2/10);
        
        const mod2: ModuloCartel = new ModuloCartel("x"+score[0].toString(),"normalFish0",(score[0]*50).toString(),(cartel.width)*escalaC);

        mod2.x = tablero.x-mod2.width*1/3//+((1/6)*(tablero.width*escalaT));
        mod2.y = (tablero.height*escalaT*3/10);
        
        const mod3: ModuloCartel = new ModuloCartel("x"+score[1].toString(),"normalFish1",(score[1]*-60).toString(),(cartel.width)*escalaC);

        mod3.x = tablero.x-mod2.width*1/3//+((1/6)*(tablero.width*escalaT));
        mod3.y = (tablero.height*escalaT*4/10);//La idea es que tengan diferentes imagenes de peces, pero por ahora uso la misma
        
        const mod4: ModuloCartel = new ModuloCartel("x"+ score[2].toString(),"normalFish2",(score[2]*100).toString(),(cartel.width)*escalaC);

        mod4.x = tablero.x-mod2.width*1/3//+((1/6)*(tablero.width*escalaT));
        mod4.y = (tablero.height*escalaT*5/10);

        const tot = score[0]*50 + score[1]*-60+ score[2]*100;
        const mod5: ModuloCartel = new ModuloCartel("total:","nada",tot.toString(),(cartel.width)*escalaC);

        mod5.x = tablero.x-mod2.width*1/3//+((1/6)*(tablero.width*escalaT));
        mod5.y = (tablero.height*escalaT*6/10);

        //=================botones==================//
        this.buttonMenu = new Button(Texture.from("normalButton"),
                                    Texture.from("downButton"),
                                    Texture.from("overButton"),
                                    this.onButtonClickM.bind(this));
        
        this.buttonMenu.x = tablero.x+(tablero.width*(escalaT)/4);
        this.buttonMenu.y = (tablero.height*escalaT*9/10);
        this.buttonMenu.scale.set(0.04);

        this.buttonRestart = new Button(Texture.from("normalButton"),
                                    Texture.from("downButton"),
                                    Texture.from("overButton"),
                                    this.onButtonClickR.bind(this));
        
        this.buttonRestart.x = tablero.x+(tablero.width*(escalaT)*3/4);
        this.buttonRestart.y = (tablero.height*escalaT*9/10);
        this.buttonRestart.scale.set(0.04);

        const tBotMenu = new Text("Menu", {fontSize: 25, fill: 0xc9f1fd});
        tBotMenu.x = this.buttonMenu.x-this.buttonMenu.width/4;
        tBotMenu.y = this.buttonMenu.y-this.buttonMenu.height/3;

        const tBotRes = new Text("Reintentar", {fontSize: 20, fill: 0xc9f1fd});
        tBotRes.x = this.buttonRestart.x-this.buttonRestart.width/3;
        tBotRes.y = this.buttonRestart.y-this.buttonRestart.height/4;

        //=================adds==================//
        this.addChild(tablero);
        this.addChild(titulo);
        this.addChild(mod1);
        this.addChild(mod2);
        this.addChild(mod3);
        this.addChild(mod4);
        this.addChild(mod5);
        this.addChild(this.buttonMenu);
        this.addChild(this.buttonRestart);
        this.addChild(tBotMenu);
        this.addChild(tBotRes);
    }
    private onButtonClickM():void{
        const menuScene = new MainMenu();
            SceneManager.changeScene(menuScene);
    }
    private onButtonClickR():void{
        const gameScene = new TickerScene();
            SceneManager.changeScene(gameScene);
    }
    public override update(): void {
    }
}