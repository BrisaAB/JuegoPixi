import {NineSlicePlane,Texture,Text} from "pixi.js";
import { ModuloCartel } from "../game/ModuloCartel";
import { Objeto } from "../game/Objeto";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { MainMenu } from "./MainMenu";

export class LoseMenu extends SceneBase {
    private buttonMouse:Button;

    constructor(score:number[]){
        super();
        const tablero = new NineSlicePlane(
            Texture.from("normalTablero"),
            50,50,50,50
            );
        //tablero.anchor.set(0.5);
        tablero.height = 3100;
        const escalaT = 0.15;
        tablero.scale.set(escalaT);
        tablero.y = (SceneManager.HEIGHT-(tablero.height*escalaT))/2;
        tablero.x = (SceneManager.WIDTH-(tablero.width*escalaT))/2;
        
        const cartel = new NineSlicePlane(
            Texture.from("normalCartelito"),
            10,10,10,10
        )
        const escalaC = 0.25;
        cartel.width = (tablero.width*escalaT)*2;
        cartel.height = (tablero.height*escalaT)/2;
        cartel.scale.set(escalaC);
        cartel.y = tablero.y-((cartel.height*escalaC)/3);
        cartel.x = (SceneManager.WIDTH-(cartel.width*escalaC))/2;
        
        const titulo = new Text("Completo", {fontSize: 40, fill: 0x54d16e});
        titulo.x = SceneManager.WIDTH/2;
        titulo.y = cartel.y+(titulo.height/2);
        
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
        const mod1: ModuloCartel = new ModuloCartel("Puntos:","nada","",(cartel.width)*escalaC);

        //let scores:ModuloCartel[] = [];

        /*for(let i = 0; i<score.length;i++){
            const mod2: ModuloCartel = new ModuloCartel("","normalFish","X "+scores[i],(cartel.width)*escalaC);
            mod2.x = tablero.x+((1/6)*(tablero.width*escalaT));
            mod2.y = (tablero.height*escalaT*i+5/10);
            scores.push(mod2)
            this.addChild(mod2)
        }*/
        mod1.x = tablero.x+((1/6)*(tablero.width*escalaT));
        mod1.y = (tablero.height*escalaT*2/5);
        
        const mod2: ModuloCartel = new ModuloCartel("","normalFish0","x"+score[0].toString(),(cartel.width)*escalaC);

        mod2.x = tablero.x+((1/6)*(tablero.width*escalaT));
        mod2.y = (tablero.height*escalaT*5/10);
        
        const mod3: ModuloCartel = new ModuloCartel("","normalFish0","x"+score[1].toString(),(cartel.width)*escalaC);

        mod3.x = tablero.x+((1/6)*(tablero.width*escalaT));
        mod3.y = (tablero.height*escalaT*6/10);//La idea es que tengan diferentes imagenes de peces, pero por ahora uso la misma
        
        const mod4: ModuloCartel = new ModuloCartel("","normalFish0","x"+ score[2].toString(),(cartel.width)*escalaC);

        mod4.x = tablero.x+((1/6)*(tablero.width*escalaT));
        mod4.y = (tablero.height*escalaT*7/10);

        this.buttonMouse = new Button(Texture.from("normalButton"),
                                    Texture.from("downButton"),
                                    Texture.from("overButton"),
                                    this.onButtonClick.bind(this));
        
        this.buttonMouse.x = tablero.x+(tablero.width*(escalaT)/2);
        this.buttonMouse.y = (tablero.height*escalaT*9/10);
        this.buttonMouse.scale.set(0.08);

        const tBoton = new Text("Menu", {fontSize: 35, fill: 0xa9ffbf});
        tBoton.x = tablero.x+(tablero.width*(escalaT)/2)-(tBoton.width/2);
        tBoton.y = (tablero.height*escalaT*9/10)-(tBoton.height*2/3)

        this.addChild(tablero);
        this.addChild(cartel);
        this.addChild(titulo);
        this.addChild(estrella1);
        this.addChild(estrella2);
        this.addChild(estrella3);
        this.addChild(mod1);
        this.addChild(mod2);
        this.addChild(mod3);
        this.addChild(mod4);
        this.addChild(this.buttonMouse);
        this.addChild(tBoton);
    }
    private onButtonClick():void{
        const menuScene = new MainMenu();
            SceneManager.changeScene(menuScene);
    }
    public override update(): void {
    }
}