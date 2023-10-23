import { Texture,Text, Sprite /*,NineSlicePlane*/} from "pixi.js";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/SceneBase";
import { TickerScene } from "./TickerScene";
import { SceneManager } from "../utils/SceneManager";
import { InstructionsScene1 } from "./InstructionsScene1";

export class MainMenu extends SceneBase {
    private playButton:Button;
    private instructionsButton:Button;
    constructor(){
        super();
        //=================fondo==================//

        const background:Sprite = Sprite.from("normalFondoM");
        background.scale.set(0.25)
        this.addChild(background);
       const titulo:Sprite = Sprite.from("normalTitulo");
       titulo.x = 20;
       titulo.y = 20;
       titulo.scale.set(0.4);
       this.addChild(titulo);
        //=================botones==================//
        this.playButton = new Button(Texture.from("normalButton"),
                                    Texture.from("downButton"),
                                    Texture.from("overButton"),
                                    this.onButtonClickP.bind(this));
        
        this.playButton.scale.set(0.05)
        this.playButton.x = SceneManager.WIDTH/2;
        this.playButton.y = SceneManager.HEIGHT*1/5;
        
        this.instructionsButton = new Button(Texture.from("normalButton"),
                                    Texture.from("downButton"),
                                    Texture.from("overButton"),
                                    this.onButtonClickI.bind(this));
        this.instructionsButton.scale.set(0.05)
        this.instructionsButton.x = SceneManager.WIDTH/2;
        this.instructionsButton.y = SceneManager.HEIGHT*2/5;
       //-------------texto botones-------------//
        const pBoton = new Text("Jugar", {fontSize: 25, fill: 0xc9f1fd});
        pBoton.x = this.playButton.x-(pBoton.width/2);
        pBoton.y = this.playButton.y-(pBoton.height*2/3);
        const iBoton = new Text("Instrucciones", {fontSize: 22, fill: 0xc9f1fd});
        iBoton.x = this.instructionsButton.x-(iBoton.width/2);
        iBoton.y = this.instructionsButton.y-(iBoton.height*2/3);

        //=================adds==================//
        this.addChild(this.playButton);
        this.addChild(this.instructionsButton)
        this.addChild(pBoton);
        this.addChild(iBoton);

        const texto2 = new Text("*a exepción del fondo del agua y la imagen del anzuelo", {fontSize: 10, fill: 0x372e36,wordWrap:true,wordWrapWidth:640});
        texto2.anchor.set(1,1);
        texto2.x = SceneManager.WIDTH;
        texto2.y = SceneManager.HEIGHT;

        const texto1 = new Text("Juego e ilustraciones* realizadas por Brisa Antuña Bianchi durante el curso de programación de videojuegos proporcionado por Capital Activa, Municipalidad de Santa Fe 2023", {fontSize: 10, fill: 0x372e36,wordWrap:true,wordWrapWidth:640});
        texto1.anchor.set(0,1);
        texto1.x = 0;
        texto1.y = SceneManager.HEIGHT-texto2.height;

        this.addChild(texto1);
        this.addChild(texto2);
    }
    public override update(_deltaFrame: number, _deltaTime?: number | undefined): void {
      //
    }
    private onButtonClickP():void{
        const gameScene = new TickerScene();
            SceneManager.changeScene(gameScene);
    }
    private onButtonClickI():void{
        const insScene = new InstructionsScene1();
        SceneManager.changeScene(insScene);
    }
}