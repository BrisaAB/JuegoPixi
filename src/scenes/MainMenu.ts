import { Texture,Text, Sprite} from "pixi.js";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/SceneBase";
import { TickerScene } from "./TickerScene";
import { SceneManager } from "../utils/SceneManager";

export class MainMenu extends SceneBase {
    private playButton:Button;
    private instructionsButton:Button;
    constructor(){
        super();
        //=================fondo==================//

        const background:Sprite = Sprite.from("normalFondoM");
        background.scale.set(0.25)
        this.addChild(background);

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

    }
    public override update(_deltaFrame: number, _deltaTime?: number | undefined): void {
      //
    }
    private onButtonClickP():void{
        const gameScene = new TickerScene();
            SceneManager.changeScene(gameScene);
    }
    private onButtonClickI():void{
        console.log("my new button clicked!");
    }
}