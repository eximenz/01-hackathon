import './styles.css'
import {ContextMenu} from './menu'

import {BackgroundModule} from './modules/background.module'
import {ClicksModule} from './modules/clicks.module'
import {ShapeModule} from './modules/shape.module'

const menu= new ContextMenu('.menu')

menu.add(new BackgroundModule('background','Change BCOLOR'))
menu.add(new ClicksModule('clicks','Calc clicks'))
menu.add(new ShapeModule('shape','Make shapes'))

//alert('123')
