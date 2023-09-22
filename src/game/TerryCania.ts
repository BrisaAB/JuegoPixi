import { Container, Sprite } from "pixi.js";

export class TerryCania extends Container {
    constructor(){
        super();
        	//-------- Transformaciones TERRY-----------------------
	        const terry: Sprite = Sprite.from("normalTerry");
            this.addChild(terry);

            //-------- Transformaciones CANIA-----------------------
            const cania: Sprite = Sprite.from("normalcania");
            cania.y = 45;
            cania.x = 80;
            cania.scale.set(0.50,0.50);
            this.addChild(cania);
    }
}