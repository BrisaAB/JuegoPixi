import { Loader} from 'pixi.js'
import { assets } from './assets';
import { TickerScene } from './scenes/TickerScene';
import { SceneManager } from './utils/SceneManager';

Loader.shared.add(assets)
        
Loader.shared.onComplete.add(()=>{	

	const TScene = new TickerScene(/*app.screen.width, app.screen.height*/);
	SceneManager.initialize();
	SceneManager.changeScene(TScene)
})   

Loader.shared.load();