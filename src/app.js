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
      this.contextmenu.add(new BackgroundModule('background','Модуль BACKGROUND'))
      this.contextmenu.add(new ClicksModule('clicks',' Модуль CLICKS'))
      this.contextmenu.add(new ShapeModule('shape','Модуль SHAPES'))

    }
}

const app=new App('.menu')

app.run()
