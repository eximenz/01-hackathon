import {Menu} from './core/menu'


export class ContextMenu extends Menu {

    constructor(selector) {
     super(selector)

     this.el = document.querySelector(selector)
    
     //this.el.style.top='0px'
     //this.el.style.left='0px'
     this.top=-1
     this.left=-1

     /*this.el.addEventListener('transitionend', (event) => {
        //if (event.transitionend.propertyName)
        if (event.propertyName==='transform') {
            this.el.style.top=`${this.top}px`
            this.el.style.left=`${this.left}px`
        }
     })*/
     //super.close=this.close
     document.body.addEventListener('contextmenu', event => {
        event.preventDefault()

        let [newTop, newLeft]=[0,0]

        if (event.target.offsetParent !== this.el) {
           this.close()

           if (event.clientY+this.height>event.target.clientHeight)
              newTop=event.target.clientHeight-this.height
           else
              newTop=event.clientY 

           if (event.clientX+this.width>event.target.clientWidth)
              newLeft=event.target.clientWidth-this.width
           else
              newLeft=event.clientX 

           if (this.top==-1 || this.left==-1) {
              [this.top, this.left]=[event.clientY, event.clientX]
              this.el.style.top=`${this.top}px`
              this.el.style.left=`${this.left}px` 
           }

           this.open(newTop, newLeft)

        }
        
        //console.log(`Context menu clicked at - ${event.clientX}/${event.clientY}`)
 
      })
      

   }

   close() {
     if (this.el.classList.contains('open')) {
       this.el.classList.toggle('open')
       this.el.style.opacity=0
       this.el.style.top=`${this.top}px`
       this.el.style.left=`${this.left}px`
     }
   }

   open(mTop, mLeft) {
    if (!this.el.classList.contains('open')) {

      this.el.classList.toggle('open')
      setTimeout(()=>{
        this.el.style.opacity=1
        this.el.style.transform=`translate(${mLeft-this.left+10}px,${mTop-this.top+10}px)`
      },0)
    }  
    }

    add(module) {
       if (!this.el.querySelector(`.menu-item[data-type='${module.text}']`)) {
          this.el.insertAdjacentHTML('beforeend',module.toHTML())
          console.log(this.el.lastElementChild)
          this.el.lastElementChild.onclick=function() {
            this.close()
            setTimeout(()=>{module.trigger()},0)

          }.bind(this)
       }

       this.open(0,-100)
       this.width=this.el.clientWidth
       this.height=this.el.clientHeight
       this.close()
    }


}