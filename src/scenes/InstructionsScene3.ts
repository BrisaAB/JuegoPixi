import { Sprite, Text, Texture } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { InstructionsScene2 } from "./InstructionsScene2";
import { MainMenu } from "./MainMenu";

export class InstructionsScene3 extends SceneBase {
    private buttonMenu:Button;
    private BackButton:Button;

    constructor(){
        super();
        const bg:Sprite = Sprite.from("normalIns2");
        bg.scale.set(0.51);
        bg.anchor.set(0.5);
        bg.x = SceneManager.WIDTH/2;
        bg.y = SceneManager.HEIGHT/2;
        
        const texto1 = new Text("Atrapá la mayor cantidad de peces durante 90 segundos para ganar puntos", {fontSize: 20, fill: 0x372e36,wordWrap:true,wordWrapWidth:200});
        texto1.x = SceneManager.HEIGHT/10;
        texto1.y = SceneManager.HEIGHT*2/20;
        
        const texto2 = new Text("Las mojarritas son las mas comunes, pero son chiquitas. Atrapar una te dará 50 pts.", {fontSize: 20, fill: 0x372e36,wordWrap:true,wordWrapWidth:200});
        texto2.anchor.set(1,0);
        texto2.x = SceneManager.WIDTH;
        texto2.y = SceneManager.HEIGHT*9/20;
        const texto3 = new Text("Las bogas te darán 100 pts.", {fontSize: 20, fill: 0x372e36,wordWrap:true,wordWrapWidth:200});
        texto3.x = texto3.width/10;
        texto3.y = SceneManager.HEIGHT*13/20

        const texto4 = new Text("Cuidado con las palometas, te restarán 60 pts.", {fontSize: 20, fill: 0x372e36,wordWrap:true,wordWrapWidth:200});
        texto4.x = SceneManager.WIDTH*1/2;
        texto4.y = SceneManager.HEIGHT*5/20

        this.addChild(bg);
        this.addChild(texto1);
        this.addChild(texto2);
        this.addChild(texto3);
        this.addChild(texto4);

        this.BackButton = new Button(Texture.from("normalBButton"),
                                    Texture.from("clickBButton"),
                                    Texture.from("overBButton"),
                                    this.onButtonClickB.bind(this));
        this.BackButton.scale.set(0.04);
        this.BackButton.x = this.BackButton.width;
        this.BackButton.y = SceneManager.HEIGHT/2;

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
        
        this.addChild(this.BackButton);
        this.addChild(this.buttonMenu);
        this.addChild(tBotMenu);
    }
    public update(_deltaFrame: number, _deltaTime: number): void {
    }
    private onButtonClickB():void{
        const Ins1Scene = new InstructionsScene2();
        SceneManager.changeScene(Ins1Scene);
    }
    private onButtonClickM():void{
        const menuScene = new MainMenu();
        SceneManager.changeScene(menuScene);
    }
}
