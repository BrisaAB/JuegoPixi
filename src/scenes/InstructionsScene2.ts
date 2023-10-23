import { Sprite,Text, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { MainMenu } from "./MainMenu";
import { Player } from "../game/Player";
import { InstructionsScene1 } from "./InstructionsScene1";
import { InstructionsScene3 } from "./InstructionsScene3";

export class InstructionsScene2 extends SceneBase {
    private buttonMenu:Button;
    private BackButton:Button;
    private NextButton:Button;
    private playerExample:Player;
    constructor(){
        super();
        this.playerExample = new Player();
        this.playerExample.x = SceneManager.WIDTH/2

        const bg:Sprite = Sprite.from("normalIns1");
        bg.anchor.set(0.5,0);
        //bg.scale.set(0.55)
        bg.x = SceneManager.WIDTH/2

        const texto = new Text("Utilizá las flechitas del teclado para mover el anzuelo para arriba o para abajo", {fontSize: 27, fill: 0x372e36,wordWrap:true,wordWrapWidth:500});
        texto.anchor.set(0.5,0.5);
        texto.x = SceneManager.WIDTH/2;
        texto.y = SceneManager.HEIGHT/2;

        this.addChild(bg);
        this.addChild(texto);

        this.BackButton = new Button(Texture.from("normalBButton"),
                                    Texture.from("clickBButton"),
                                    Texture.from("overBButton"),
                                    this.onButtonClickB.bind(this));
        this.BackButton.scale.set(0.04);
        this.BackButton.x = this.BackButton.width;
        this.BackButton.y = SceneManager.HEIGHT/2;

        this.NextButton = new Button(Texture.from("normalNButton"),
                                    Texture.from("clickNButton"),
                                    Texture.from("overNButton"),
                                    this.onButtonClickN.bind(this));
        this.NextButton.scale.set(0.04);
        this.NextButton.x = SceneManager.WIDTH-this.NextButton.width;
        this.NextButton.y = SceneManager.HEIGHT/2;


        this.buttonMenu = new Button(Texture.from("normalButton"),
                                    Texture.from("downButton"),
                                    Texture.from("overButton"),
                                    this.onButtonClickM.bind(this));
        
        this.buttonMenu.x = SceneManager.WIDTH/2;
        this.buttonMenu.y = SceneManager.HEIGHT*6/7;
        this.buttonMenu.scale.set(0.04);
        
        const tBotMenu = new Text("Menu", {fontSize: 25, fill: 0xc9f1fd});
        tBotMenu.x = this.buttonMenu.x-this.buttonMenu.width/4;
        tBotMenu.y = this.buttonMenu.y-this.buttonMenu.height/3;
        
        this.addChild(this.playerExample);
        this.addChild(this.BackButton);
        this.addChild(this.NextButton);
        this.addChild(this.buttonMenu);
        this.addChild(tBotMenu);
    }
    public update(_deltaFrame: number, _deltaTime: number): void {
        this.playerExample.update(_deltaFrame);
    }
    private onButtonClickB():void{
        const Ins1Scene = new InstructionsScene1();
        SceneManager.changeScene(Ins1Scene);
    }
    private onButtonClickN():void{
        const Ins2Scene = new InstructionsScene3();
        SceneManager.changeScene(Ins2Scene);
    }
    private onButtonClickM():void{
        const menuScene = new MainMenu();
        SceneManager.changeScene(menuScene);
    }
}
