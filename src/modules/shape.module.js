import {Module} from '../core/module'
import * as Utils from '../utils'

export class ShapeModule extends Module {

    #shapeColors=[]

    constructor(type, text) {
        if (!type) {
          throw new Error('Please specify "type" param')
        }
        if (!text) {
          throw new Error('Please specify "text" param')
        }

        super(type, text)

        this.state = {
          cur_rotation:0,
          cur_position:[0,0],
          cur_scale:1,
          iterations:10,
          i_time:10,
          id_killer:0,
          animationBG: [0,0,0],
          isModalDialog:false,
          isCreated:false,
          isDestroy:false,
          isRunning:false,
        }

        this.#shapeColors=[...Utils.AppSettings.bgcolors]

        this.shapeObj=null
        this.message_container=null

        this.type = type
        this.text = text
      }

      reset() {

        if (this.state.id_killer!=0) clearTimeout(this.state.id_killer)

        if (this.shapeObj) this.shapeObj.remove()
        if (this.message_container) this.message_container.remove() 
        document.body.ontransitionend=null

        this.state = {
          cur_rotation:0,
          cur_position:[0,0],
          cur_scale:1,
          iterations:10,
          i_time:15,
          id_killer:0,
          animationBG: [0,0,0],   
          isModalDialog:false,
          isCreated:false,
          isDestroy:false,
          isRunning:false,
        }

      }

      trigger(popup) {
        //alert(`Trigger method implemented by "${this.type}"`)
        //
        if (!this.state.isRunning) {

          this.state.isRunning=true
          document.body.insertAdjacentHTML('beforeend', `<div class='message_container'><h2>Текущая фигура: ${11-this.state.iterations} из 10</h2>
                                                                                        <h2>Время анимации для фигуры: ${this.state.i_time} сек</h2></div>`)
          this.message_container=document.body.querySelector('.message_container')

          document.body.insertAdjacentHTML('beforeend', `<div class='shape-bug'></div>`)
          this.shapeObj=document.body.querySelector('.shape-bug')

          this.shapeObj.addEventListener('mouseenter', function() {if (this.state.isRunning && !this.state.isDestroy && 
                                                                       this.state.isCreated && !this.state.isModalDialog) {
                                                                       this.shapeObj.style.opacity=0.4
                                                                       this.shapeObj.style.borderColor='#817a7a'
                                                                       this.shapeObj.style.transform=`scale(1.5) rotate(${this.state.cur_rotation}deg) translate(${this.state.cur_position[1]}px, ${this.state.cur_position[0]}px)`
                                                                    }
                                                                  }.bind(this))

          this.shapeObj.addEventListener('mouseleave', function() {if (this.state.isRunning && !this.state.isDestroy && 
                                                                       this.state.isCreated && !this.state.isModalDialog) {
                                                                       this.shapeObj.style.opacity=1
                                                                       this.shapeObj.style.borderColor='whitesmoke'
                                                                       this.shapeObj.style.transform=`scale(${this.state.cur_scale}) rotate(${this.state.cur_rotation}deg) translate(${this.state.cur_position[1]}px, ${this.state.cur_position[0]}px)`                                                                       
                                                                    }
                                                                  }.bind(this))

          this.shapeObj.addEventListener('click', function() {if (this.state.isRunning && !this.state.isDestroy && 
                                                                    this.state.isCreated) {
                                                                      console.log(this.state.iterations,'Количество итераций')
                                                                      if (this.state.iterations>0) {
                                                                         this.state.iterations-=1
                                                                         this.state.i_time=16
                                                                       } else {
                                                                            this.state.i_time=0
                                                                            this.message_container.lastChild.innerHTML=`Время анимации для фигуры: ${this.state.i_time} сек`   
                                                                          } 
                                                                      
                                                                      this.destroy_shape() 
                                                                   }
                                                               }.bind(this))

          if (this.state.id_killer===0) this.state.id_killer=setInterval(function () { if (!this.state.isRunning || this.state.isModalDialog || !this.state.isCreated) return
                                                                                       if (this.state.i_time>0) {
                                                                                         this.state.i_time-=1
                                                                                         if (this.state.i_time===15) this.message_container.firstChild.innerHTML=`Текущая фигура: ${(this.state.iterations>0?11-this.state.iterations:10)} из 10`
                                                                                         this.message_container.lastChild.innerHTML=`Время анимации для фигуры: ${this.state.i_time} сек`
                                                                                        } else if (this.state.iterations>0) {
                                                                                                   this.state.iterations-=1
                                                                                                   this.state.i_time=16
                                                                                                   //this.message_container.firstChild.innerHTML=`Текущая фигура: ${(this.state.iterations>0?11-this.state.iterations:10)} из 10`
                                                                                                   this.destroy_shape() 
                                                                                          } else {
                                                                                            // Время анимации для последней фигуры подошло к концу, необходимо уничтожить текущую фигуру и показать модальный диалог
                                                                                            this.destroy_shape() 
                                                                                          }

                                                                                      }.bind(this),1000)

          document.body.ontransitionend=function (event){
            //console.log('Transition SHAPE run', event, event.propertyName, event.target.tagName, this.state)
              //if (!this.state.isRunning || this.state.isCreated) return
               
              if (event.propertyName==='opacity' && this.state.isDestroy) {
                if (this.state.iterations>0) {
                    console.log(this.state.isDestroy,'Destroyed shape')
                    this.state.isDestroy=false
                    this.make_animate()
                } else {
                  if (this.state.isDestroy && !this.state.isModalDialog && this.state.iterations===0) {
                    console.log(this.state.iterations,'Всего итераций')
  
                    this.state.isModalDialog=true
                    popup.openModal({ right:'',
                                      top:'50%',
                                      left:'50%',
                                      transform: 'translate(-50%,-50%) scale(1.2)',
                                      transition:`opacity 0.5s ease-in-out 0.5s`,
                                      opacity:1,                                
                                      textCaption: 'Сообщение от SHAPE',
                                      textMessage: `Модуль завершил свою работу. Приходите к нам еще, будем рады видеть вас снова!`
  
                    },this.reset.bind(this))
                 }  
                }
              }

              if (event.propertyName==='transform') {
                 if (!this.state.isDestroy && this.state.iterations>0)
                    this.make_transform()
              }
            }.bind(this)

          this.make_animate()
     } 
    }

    make_animate() {
      if (this.state.isRunning && this.shapeObj && !this.state.isDestroy && !this.state.isModalDialog) {

          if (this.shapeObj.classList.contains('destroy')) this.shapeObj.classList.toggle('destroy')
          this.shapeObj.style.transition=this.shapeObj.style.transform=''

          this.state.cur_rotation=0
          this.state.cur_position=[0,0]
          this.state.cur_scale=1

          this.state.animationBG[0]=this.#shapeColors[Utils.random(0,this.#shapeColors.length-1)]

          let new_gradient=-1
          while (new_gradient<0 || this.#shapeColors[new_gradient]===this.state.animationBG[0]) {
            new_gradient=Utils.random(0,this.#shapeColors.length-1)
          }
          this.state.animationBG[1]=this.#shapeColors[new_gradient]

          new_gradient=-1
          while (new_gradient<0 || this.#shapeColors[new_gradient]===this.state.animationBG[0] || this.#shapeColors[new_gradient]===this.state.animationBG[1]) {
            new_gradient=Utils.random(0,this.#shapeColors.length-1)
          }
          this.state.animationBG[2]=this.#shapeColors[new_gradient]
          
          // Устанавливаем ширину и высоту фигуры
          this.shapeObj.style.width=`${Utils.random(100,200)}px`
          this.shapeObj.style.height=`${Utils.random(100,200)}px`
          // Устанавливаем начальные координаты фигуры
          this.shapeObj.style.top=`${Utils.random(100,document.body.clientHeight-100)}px`
          this.shapeObj.style.left=`${Utils.random(100,document.body.clientWidth-100)}px`
          // Формируем анимированный градиентный фон фигуры
          
          this.shapeObj.style.background=`linear-gradient(${(Utils.random(0,10)<=5?0:90)}deg, ${this.state.animationBG[0]}, ${this.state.animationBG[1]}, ${this.state.animationBG[2]})`
          //this.shapeObj.style.background='linear-gradient(crimson, gold, yellowgreen, teal, crimson)'

          // Если фигура появляется близко к границам экрана, корректируем ее местоположение в прямоугольнике BODY - 50px
          if (parseInt(this.shapeObj.style.top)<50) this.shapeObj.style.top= `${parseInt(this.shapeObj.style.top)+50}px`
          if (parseInt(this.shapeObj.style.left)<50) this.shapeObj.style.left= `${parseInt(this.shapeObj.style.left)+50}px`
          if (parseInt(this.shapeObj.style.top)+parseInt(this.shapeObj.style.height)>document.body.clientHeight-50) this.shapeObj.style.top= `${parseInt(this.shapeObj.style.top)-50}px`
          if (parseInt(this.shapeObj.style.left)+parseInt(this.shapeObj.style.width)>document.body.clientWidth-50) this.shapeObj.style.left= `${parseInt(this.shapeObj.style.left)-50}px`          
         
          this.shapeObj.style.transition='transform 1.5s ease-in-out, opacity 3.5s ease, border-radius 1s ease-out '
          this.shapeObj.style.opacity=1

          this.make_transform()
          this.state.isCreated=true
      }
     }
      
      make_transform() {

        // Устанавливаем радиус и толщину рамки
        this.shapeObj.style.borderRadius=`${Utils.random(20,60)}px`
        this.shapeObj.style.borderWidth=`5px`

        let tr_param=-1
        while (tr_param===this.state.cur_rotation || tr_param<0) {
          tr_param=Utils.random(-30,30)
        }
        this.state.cur_rotation=tr_param

        tr_param=Utils.random(0,10)
        if (tr_param<=5) {
          if (this.state.cur_scale>0.5) 
             this.state.cur_scale-=0.1
          else
             this.state.cur_scale+=0.1
        } else {
          if (this.state.cur_scale<1.5) 
             this.state.cur_scale+=0.1
          else
             this.state.cur_scale-=0.1
        }

        tr_param=-1
        while (tr_param===this.state.cur_position[0] || tr_param<0) {
          tr_param=Utils.random(-50,50)
        }
        if (parseInt(this.shapeObj.getBoundingClientRect().top)+tr_param<50 || parseInt(this.shapeObj.getBoundingClientRect().bottom)+tr_param>document.body.clientHeight-50) {
           //this.shapeObj.style.top= `${parseInt(this.shapeObj.style.top)-tr_param}px`
           this.state.cur_position[0]-=tr_param
        } else {
          //this.shapeObj.style.top= `${parseInt(this.shapeObj.style.top)+tr_param}px`
          this.state.cur_position[0]+=tr_param
        }

        tr_param=-1
        while (tr_param===this.state.cur_position[1] || tr_param<0) {
          tr_param=Utils.random(-50,50)
        }
        if (parseInt(this.shapeObj.getBoundingClientRect().left)+tr_param<50 || parseInt(this.shapeObj.getBoundingClientRect().right)+tr_param>document.body.clientWidth-50) {
           //this.shapeObj.style.left= `${parseInt(this.shapeObj.style.left)-tr_param}px`
           this.state.cur_position[1]-=tr_param
        } else {
          //this.shapeObj.style.left= `${parseInt(this.shapeObj.style.left)+tr_param}px`
          this.state.cur_position[1]+=tr_param
        }
        this.shapeObj.style.transform=`scale(${this.state.cur_scale}) rotate(${this.state.cur_rotation}deg) translate(${this.state.cur_position[1]}px, ${this.state.cur_position[0]}px)`
      }

      destroy_shape() {
        if (this.state.isRunning && this.shapeObj) {
          this.state.isDestroy=true
          this.state.isCreated=false
         
          if (!this.shapeObj.classList.contains('destroy')) this.shapeObj.classList.toggle('destroy')

          this.shapeObj.style.transform=`scale(${Utils.random(3,5)}) rotate(${360*parseInt(Utils.random(2,5))*(Utils.random(0,10)<=5?-1:1)}deg) translate(${Utils.random(-100,100)}px, ${Utils.random(-100,100)}px)`
          this.shapeObj.style.opacity=0
          this.shapeObj.style.transformOrigin='center center'
          this.shapeObj.style.borderRadius=0
          this.shapeObj.style.borderWidth=`20px`

        }


      }

}