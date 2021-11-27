import {Menu} from './core/menu'

export class ContextMenu extends Menu {

   constructor(selector) {
     super(selector)


   }

   run() {
    console.log(this.innerHTML)
     
   }

}