import { Container, Sprite } from "pixi.js";
import { TerryCania } from "./TerryCania";

export class Fondo extends Container{
    constructor(){
        super()
        //-------------cielo-------------//
        const bkgScale = 0.5;
        const sky: Sprite = Sprite.from("normalSky");
        sky.scale.set(bkgScale);
        this.addChild(sky);
        
        //-------------tierra-------------//
        const ground: Sprite = Sprite.from("normalGround")
        ground.scale.set(bkgScale);
        ground.y = sky.width*bkgScale-(ground.width*bkgScale)/4;

        this.addChild(ground);
        //-------------personaje-------------//
        const character:TerryCania = new TerryCania();
        character.scale.set(0.45);
        character.x = ground.width/2-character.width+6//*9/7;
        character.y = ground.y-ground.height*3/4;
        this.addChild(character);
    }
}