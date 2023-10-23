import { Container, Sprite } from "pixi.js";
import { SceneManager } from "../utils/SceneManager";
//import { TerryCania } from "./TerryCania";

export class Fondo extends Container{
    constructor(){
        super()

        //-------------fondo-------------//
        const bgScale:number = 0.25;
        const background:Sprite = Sprite.from("normalFondoG");
        background.scale.set(bgScale);
        background.height = SceneManager.HEIGHT*9/12;
        this.addChild(background);

        
        //-------------personaje-------------//
        const character:Sprite = Sprite.from("normalCat");
        character.scale.set(0.45);
        character.x = SceneManager.WIDTH*2/3-character.width*4/3+6;
        character.y = SceneManager.HEIGHT*1/9+5;
        this.addChild(character);
        
    }
}