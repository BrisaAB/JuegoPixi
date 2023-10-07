import { Texture,Text} from "pixi.js";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/SceneBase";
import { TickerScene } from "./TickerScene";
import { SceneManager } from "../utils/SceneManager";

export class MainMenu extends SceneBase {
    private playButton:Button;
    private instructionsButton:Button;
    constructor(){
        super();
        this.playButton = new Button(Texture.from("normalButton"),
                                    Texture.from("downButton"),
                                    Texture.from("overButton"),
                                    this.onButtonClickP.bind(this));
        
        this.playButton.scale.set(0.05)
        this.playButton.x = SceneManager.WIDTH/2;
        this.playButton.y = SceneManager.HEIGHT*3/5;
        
        this.instructionsButton = new Button(Texture.from("normalButton"),
                                    Texture.from("downButton"),
                                    Texture.from("overButton"),
                                    this.onButtonClickI.bind(this));
        this.instructionsButton.scale.set(0.05)
        this.instructionsButton.x = SceneManager.WIDTH/2;
        this.instructionsButton.y = SceneManager.HEIGHT*4/5;
        //=================texto botones==================//(probablemente lo saque cuando cambie los sprites)
        const pBoton = new Text("Jugar", {fontSize: 25, fill: 0xa9ffbf});
        pBoton.x = this.playButton.x-(pBoton.width/2);
        pBoton.y = this.playButton.y-(pBoton.height*2/3);
        const iBoton = new Text("Instrucciones", {fontSize: 22, fill: 0xa9ffbf});
        iBoton.x = this.instructionsButton.x-(iBoton.width/2);
        iBoton.y = this.instructionsButton.y-(iBoton.height*2/3);


        this.addChild(this.playButton);
        this.addChild(this.instructionsButton)
        this.addChild(pBoton);
        this.addChild(iBoton);

    }
    public override update(_deltaFrame: number, _deltaTime?: number | undefined): void {
       // throw new Error("Method not implemented.");
    }
    private onButtonClickP():void{
        const gameScene = new TickerScene();
            SceneManager.changeScene(gameScene);
    }
    private onButtonClickI():void{
        console.log("my new button clicked!");
    }
}