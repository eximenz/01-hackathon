import './styles.css'
import {ContextMenu} from './menu';
import { BackgroundModule } from './modules/background.module';

const contextMenu = new ContextMenu('.menu');

document.body.addEventListener('contextmenu', event => {
	contextMenu.open(event);
})

const backgroundModule = new BackgroundModule('background', 'To generate random background');
contextMenu.add(backgroundModule);








