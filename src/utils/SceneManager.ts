import { Application, Ticker } from "pixi.js";
import { Keyboard } from "./Keyboard";
import { SceneBase } from "./SceneBase";

export namespace SceneManager{
    
    export const WIDTH = 640;
    export const HEIGHT = 480;
    
    let app:Application;

    let currentScene:SceneBase;

    export function initialize(){
        if(app != undefined){
            console.error("Do not call initialize twice!");
            return;
        }
        app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x6495ed,
            width: WIDTH,
            height: HEIGHT
        });
        
        Keyboard.initialize();
        window.addEventListener("resize",()=>{
                console.log("resized");
                //-------------TAMANO DEL JUEGO-------------------
                //Calculo las escalas en X y en Y dividiendo el ancho y 
                //alto real de la pantalla(window.inner...) por el ancho
                // y alto definido para la imagen(app.screen...)
                
                const scaleX = window.innerWidth/app.screen.width;
                const scaleY = window.innerHeight/app.screen.height;
                const scale = Math.min(scaleX,scaleY);
        
                
                const gameWidth = app.screen.width*scale;
                const gameHeight = app.screen.height*scale;
        
                app.view.style.width = gameWidth + "px";
                app.view.style.height = gameHeight + "px";
                //-----------POSICION DEL JUEGO--------------------
        
                const marginHorizontal = (window.innerWidth - gameWidth)/2;
                const marginVertical = (window.innerHeight - gameHeight)/2;
        
                app.view.style.marginLeft = marginHorizontal + "px";
                app.view.style.marginRight = marginHorizontal + "px";
        
                app.view.style.marginTop = marginVertical + "px";
                app.view.style.marginBottom = marginVertical + "px";
                
        })
        
        window.dispatchEvent(new Event("resize"));
        
        Ticker.shared.add(update)

    }
    export function changeScene(newScene:SceneBase){
        if (currentScene){
            currentScene.destroy();
        }
        currentScene = newScene;
        app.stage.addChild(currentScene);
    }

    function update(framePassed:number){
        //si tengo animaciones con tween: Group.shared.update();
        currentScene?.update(Ticker.shared.elapsedMS/100,framePassed)
    }
}