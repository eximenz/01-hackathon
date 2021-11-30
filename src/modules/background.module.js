import {Module} from '../core/module'
import * as Utils from '../utils'

export class BackgroundModule extends Module {

    #bgcolors=["#0099cc","#c0c0c0","#587b2e","#990000","#000000","#1C8200","#987baa","#981890","#AA8971","#1987FC","#99081E"]
    //['yellow','lime','aqua','fuchsia','red','green',
    //           'blue','purple','maroon','olive','navy','teal']

    constructor(type, text) {
        if (!type) {
          throw new Error('Please specify "type" param')
        }
        if (!text) {
          throw new Error('Please specify "text" param')
        }

        super(type, text)

        this.state= {
           col_start:-1,
           col_end:-1,
           grad:0,
           isRunning: false 
        }

        this.type = type
        this.text = text
      }

      reset() {

        document.body.style.backgroundColor=document.body.style.background=document.body.style.backgroundSize=document.body.style.animation=''
        document.body.ontransitionend=null
        this.state.isRunning=false
      }

      trigger(popup) {

        let new_bgelem=-1
        console.log('State of BG module',this.state.isRunning)

        if (this.state.isRunning)
           console.log('Background module is working, please wait for ending and try again')
        else {
           this.state.isRunning=true

           while (new_bgelem===this.state.col_start || new_bgelem<0) {
            new_bgelem=Utils.random(0,this.#bgcolors.length-1)
           }
           this.state.col_start=new_bgelem

           new_bgelem=-1
           while (new_bgelem===this.state.col_start || new_bgelem===this.state.col_end || new_bgelem<0) {
            new_bgelem=Utils.random(0,this.#bgcolors.length-1)
           }
           this.state.col_end=new_bgelem

           this.state.grad=parseInt(Utils.random(-90,90))

           document.body.style.background=document.body.style.backgroundSize=document.body.style.animation=''
           document.body.style.backgroundColor=this.#bgcolors[this.state.col_start]

           document.body.ontransitionend=function (event){
            
             if (event.propertyName==='background-color' && event.target.tagName==='BODY' && this.state.isRunning) {
                this.state.isRunning=false

                document.body.style.background=`linear-gradient(${this.state.grad}deg, ${this.#bgcolors[this.state.col_start]}, ${this.#bgcolors[this.state.col_end]})`
                document.body.style.backgroundSize='400% 400%'
                document.body.style.animation='gradient 15s ease infinite'

             }
           }.bind(this)
        }
           
      }

}