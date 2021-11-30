import {Menu} from './core/menu'
import {DialogMessage} from './popup'


export class ContextMenu extends Menu {

    constructor(selector) {
     super(selector)

     this.el = document.querySelector(selector)
     this.activeModule=null
     this.messageDialog=new DialogMessage()

     this.state={ 
                  width:150,
                  height:0,
                  top:-1,
                  left:-1,
                  isOpening:false
                }

     this.el.addEventListener('transitionend', (event) => {
        event.preventDefault()

        if (event.propertyName==='opacity' && event.target.tagName==='UL') {
            this.state.isOpening=false
        }
        console.log(event.propertyName, event.target.tagName, this.state.isOpening)
     })

     document.body.addEventListener('contextmenu', event => {
        event.preventDefault()

        let [newTop, newLeft]=[0,0]
        
        console.log('Contextmenu clicked', event.target.offsetParent,event.target)
        if (event.target.offsetParent !== this.el && !this.state.isOpening) {
          this.close()

           if (event.pageY+this.state.height>document.body.clientHeight)
              newTop=document.body.clientHeight-this.state.height
           else
              newTop=event.pageY 

           if (event.pageX+this.state.width>document.body.clientWidth)
              newLeft=document.body.clientWidth-this.state.width
           else
              newLeft=event.pageX 

           if (this.state.top==-1 && this.state.left==-1) {
              [this.state.top, this.state.left]=[event.pageY, event.pageX]
              this.el.style.top=`${this.state.top}px`
              this.el.style.left=`${this.state.left}px` 
           }

           this.el.style.opacity=0
           this.open(newTop, newLeft)

        }

      })
      

   }

   close() {
     if (this.el.classList.contains('open')) {
       this.el.classList.toggle('open')
       this.state.isOpening=false

       this.el.style.opacity=0
       this.el.style.top=`${this.state.top}px`
       this.el.style.left=`${this.state.left}px`
     }
   }

   open(mTop, mLeft) {
     
    if (!this.el.classList.contains('open')) {

      this.state.isOpening=true
 
      this.el.classList.toggle('open')

      console.log('Open menu clicked', this.state.isOpening)
      setTimeout(()=>{
        this.el.style.opacity=1
        this.el.style.transform=`translate(${mLeft-this.state.left+10}px,${mTop-this.state.top+10}px)`

      },50)
    }  
    }

    add(module) {
       let new_item=null

       if (!this.el.querySelector(`.menu-item[data-type='${module.text}']`)) {
          this.el.insertAdjacentHTML('beforeend',module.toHTML())

          this.el.lastElementChild.onclick=function() {
            this.close()
            setTimeout(()=>{ 
                             if (this.activeModule && this.activeModule.reset) this.activeModule.reset()
                             this.activeModule=module
                             module.trigger(this.messageDialog)
                           },0)

          }.bind(this)
       }

       this.open(0,-this.state.width)
       this.state.width=this.el.clientWidth
       this.state.height=this.el.clientHeight
       this.close()
    }


}