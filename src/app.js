import './styles.css'
import {ContextMenu} from './menu'

import {BackgroundModule} from './modules/background.module'
import {ClicksModule} from './modules/clicks.module'
import {ShapeModule} from './modules/shape.module'

class App {

    constructor(mselector) {
      this.contextmenu= new ContextMenu(mselector)
    }

    run() {
      this.contextmenu.add(new BackgroundModule('background','Change BCOLOR'))
      this.contextmenu.add(new ClicksModule('clicks','Calc clicks'))
      this.contextmenu.add(new ShapeModule('shape','Make shapes'))

    }
}

const app=new App('.menu')

app.run()


// коллекция всех элементов на странице, которые могут открывать всплывающие окна
// их отличительной особенность является наличие атрибута '[data-modal]'
const mOpen = document.querySelectorAll('[data-modal]');
// если нет элементов управления всплывающими окнами, прекращаем работу скрипта
if (mOpen.length == 0) return;
 
	  // подложка под всплывающее окно
const overlay = document.querySelector('.overlay'),
	  // коллекция всплывающих окон
	  modals = document.querySelectorAll('.dlg-modal'),
	  // коллекция всех элементов на странице, которые могут
	  // закрывать всплывающие окна
	  // их отличительной особенность является наличие атрибута '[data-close]'
	  mClose = document.querySelectorAll('[data-close]');
// флаг всплывающего окна: false - окно закрыто, true - открыто
let	mStatus = false;
var typeAnimate = 'fade';
for (let el of mOpen) {
	el.addEventListener('click', function(e) {
		// используюя атрибут [data-modal], определяем ID всплывающего окна,
		// которое требуется открыть
		// по значению ID получаем ссылку на элемент с таким идентификатором
		let modalId = el.dataset.modal,
			modal = document.getElementById(modalId);
		// вызываем функцию открытия всплывающего окна, аргументом
		// является объект всплывающего окна
		modalShow(modal);
	});
}