import {Module} from '../core/module'
import * as Utils from '../utils'

export class BackgroundModule extends Module {

    #bgcolors=["#0099cc","#c0c0c0","#587b2e","#990000","#000000","#1C8200","#987baa","#981890","#AA8971","#1987FC","#99081E"]
    #iteration=0
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
           col_middle:-1,
           col_end:-1,
           iterations:10,
           grad:0,
           isTransition:false,
           isModalDialog:false,
           isRunning: false 
        }

        this.message_container=null

        this.type = type
        this.text = text
      }

      reset() {

        this.message_container.remove() 
        document.body.ontransitionend=null
        document.body.onanimationend=null
        document.body.style.backgroundColor=document.body.style.background=document.body.style.backgroundSize=document.body.style.animation=''
        this.state= {
          col_start:-1,
          col_middle:-1,
          col_end:-1,
          iterations:10,
          grad:0,
          isModalDialog:false,
          isTransition:false,
          isRunning: false 
       }
      }

      trigger(popup) {

        if (this.state.isRunning)
           console.log('Background module is working, please wait for ending and try again')
        else {
           this.state.isRunning=true

           document.body.insertAdjacentHTML('beforeend', `<div class='message_container'><h2>Текущая итерация модуля: ${this.state.iterations} из 10</h2>
                                                                                       <h2>Время анимации для итерации: 15 сек</h2></div>`)
           
           this.message_container=document.body.querySelector('.message_container')
           this.set_new_iteration()
           document.body.onanimationiteration=function (event){
                this.state.iterations-=1
                if (this.state.iterations>0) {
                  console.log(`Текущая итерация смены фона ${this.state.iterations}`)
                  this.set_new_iteration()
                  this.message_container.firstChild.innerHTML=`Текущая итерация модуля: ${this.state.iterations} из 10`
                } else if (!this.state.isModalDialog) {
                  this.state.isModalDialog=true
                  this.message_container.firstChild.innerHTML=`Текущая итерация модуля: ${this.state.iterations} из 10`
                  //document.body.style.backgroundSize=document.body.style.animation=''
                  // Запускаем всплыющее окно сообщений с уведомлением о завершении работы модуля BGCOLOR
                  popup.openModal({ right:'',
                                    top:'50%',
                                    left:'50%',
                                    transform: 'translate(-50%,-50%) scale(1.35)',
                                    transition:`opacity 0.5s ease-in-out 0.5s`,
                                    opacity:1,                                
                                    textCaption: 'Сообщение от BGCOLOR',
                                    textMessage: `Модуль завершил свою работу. Приходите к нам еще, будем рады видеть вас снова!`

                },this.reset.bind(this))

                }

           }.bind(this)

           document.body.ontransitionend=function (event){
            console.log('Transition bg run', event, this.state.isTransition, this.state.isRunning)
             if (event.propertyName==='background-color' && event.target.tagName==='BODY' && this.state.isRunning && this.state.isTransition) {
                this.state.isTransition=!this.state.isTransition
                
                document.body.style.background=`linear-gradient(${this.state.grad}deg, ${this.#bgcolors[this.state.col_start]}, ${this.#bgcolors[this.state.col_middle]}, ${this.#bgcolors[this.state.col_end]})`
                document.body.style.backgroundSize='400% 400%'
                document.body.style.animation='gradient 10s ease-in infinite'

             }
           }.bind(this)
        }
           
      }

      set_new_iteration() {

        let new_bgelem=-1
        while (new_bgelem===this.state.col_start || new_bgelem<0) {
          new_bgelem=Utils.random(0,this.#bgcolors.length-1)
         }
         this.state.col_start=new_bgelem

         new_bgelem=-1
         while (new_bgelem===this.state.col_start || new_bgelem===this.state.col_middle || new_bgelem<0) {
          new_bgelem=Utils.random(0,this.#bgcolors.length-1)
         }
         this.state.col_middle=new_bgelem

         new_bgelem=-1
         while (new_bgelem===this.state.col_start || new_bgelem===this.state.col_middle || new_bgelem===this.state.col_end || new_bgelem<0) {
          new_bgelem=Utils.random(0,this.#bgcolors.length-1)
         }
         this.state.col_end=new_bgelem

         this.state.grad=parseInt(Utils.random(-90,90))

         this.state.isTransition=true   
         document.body.style.background=this.#bgcolors[this.state.col_start]
         document.body.style.backgroundSize=document.body.style.animation=''

           
        }


}