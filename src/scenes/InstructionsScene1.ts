import { Texture,Text, Sprite } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { MainMenu } from "./MainMenu";
import { InstructionsScene2 } from "./InstructionsScene2";



export class InstructionsScene1 extends SceneBase {
    private buttonMenu:Button;
    private NextButton:Button;
    constructor(){
        super();
        
        const bg:Sprite = Sprite.from("normalFondoG");
        bg.anchor.set(0.5,0);
        bg.x = SceneManager.WIDTH/2;
        bg.scale.set(0.30)
        this.addChild(bg);
        
        const character:Sprite = Sprite.from("normalCat");
        character.scale.set(0.45);
        character.x = SceneManager.WIDTH/10;
        character.y = SceneManager.HEIGHT*2/9;
        this.addChild(character);
        
        const texto1 = new Text("Toto tiene hambre, ¡Ayudalo a pescar algunos peces para comer!", {fontSize: 27, fill: 0x372e36,wordWrap:true,wordWrapWidth:250});
        texto1.anchor.set(0,0.5);
        texto1.x = SceneManager.WIDTH/2;
        texto1.y = SceneManager.HEIGHT/2;
        this.addChild(texto1);


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
        
        
        this.addChild(this.NextButton);
        this.addChild(this.buttonMenu);
        this.addChild(tBotMenu);
    }
    public update(_deltaFrame: number, _deltaTime?: number | undefined): void {
        //throw new Error("Method not implemented.");
    }
    private onButtonClickN():void{
        const Ins2Scene = new InstructionsScene2();
        SceneManager.changeScene(Ins2Scene);
    }
    private onButtonClickM():void{
        const menuScene = new MainMenu();
        SceneManager.changeScene(menuScene);
    }
}
