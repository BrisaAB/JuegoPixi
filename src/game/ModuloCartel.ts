import { Container,Sprite,Text} from "pixi.js";

export class ModuloCartel extends Container{
    constructor(texto: string, img: string, cant: string, x: number){
        super();
        /*const fondo = new NineSlicePlane(
            Texture.from("normalCartelito"),
            0,5,5,0);
        fondo.height = 800;
        fondo.width = 1000;
        */
        //const fondoNro: Sprite = Sprite.from("normalCartelito");
        //this.addChild(fondoNro);
        const texto1 = new Text(texto, {fontSize: 27, fill: 0x372e36});
        texto1.x = x*2/3;
        const imagen: Sprite = Sprite.from(img);
        const escalaImagen = Math.min(texto1.height/imagen.height,(x/3)/(imagen.width+2));
        imagen.x = x*1/3;
        imagen.scale.set(escalaImagen);
        const texto2 = new Text(cant, {fontSize: 27, fill: 0x372e36});
        texto2.x = x+3;
        this.addChild(texto1);
        this.addChild(imagen);
        this.addChild(texto2);
        cant;
    }
}