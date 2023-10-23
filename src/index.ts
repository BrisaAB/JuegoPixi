import { Loader} from 'pixi.js'
import { assets } from './assets';
//import { TickerScene } from './scenes/TickerScene';
import { SceneManager } from './utils/SceneManager';
import { MainMenu } from './scenes/MainMenu';

Loader.shared.add(assets)
        
Loader.shared.onComplete.add(()=>{	

	const TScene = new MainMenu();
	SceneManager.initialize();
	SceneManager.changeScene(TScene);
	window.addEventListener("contextmenu",e=>e.preventDefault());
})   

Loader.shared.load();