import {Module} from '../core/module'

export class ClicksModule extends Module {
    constructor(type, text) {
        if (!type) {
          throw new Error('Please specify "type" param')
        }
        if (!text) {
          throw new Error('Please specify "text" param')
        }

        super(type, text)

        this.state= {
          clicks:0,
          winClicks:0,
          seconds:20,
          mtimer:0,
          isModalDialog:false,
          isRunning: false 
       }

        this.message_container=null
        
        this.type = type
        this.text = text
      }

      reset() {
       // if (document.querySelector('.message_container'))
        this.message_container.remove() 
        document.body.onclick=null

        if (this.state.mtimer!=0) clearTimeout(this.state.mtimer)
        this.state= {
          clicks:0,
          winClicks:0,
          seconds:20,
          mtimer:0,
          isModalDialog:false,
          isRunning: false 
       }
      }


      trigger(popup) {

        let user_message=''

        if (!this.state.isRunning) {

          this.state.isRunning=true
          document.body.insertAdjacentHTML('beforeend', `<div class='message_container'><h2>Пользователь нажал на мышь: ${this.state.clicks} раз </h2>
                                                                                      <h2>Время для подсчета кликов: ${this.state.seconds} сек</h2></div>`)
          this.message_container=document.body.querySelector('.message_container')

          document.body.onclick= (event)=>{
            if (this.message_container && this.state.isRunning) {
               this.message_container.firstChild.textContent=`Пользователь нажал на мышь: ${this.state.clicks} раз`
               this.message_container.lastChild.textContent=`Время для подсчета кликов: ${this.state.seconds} сек`
               this.state.clicks+=1
            }
          }

          if (this.state.mtimer===0 && this.state.isRunning) 
          this.state.mtimer=setInterval(()=>{
            this.state.seconds-=1
            if (this.message_container) {
               this.message_container.firstChild.textContent=`Пользователь нажал на мышь: ${this.state.clicks} раз`
               this.message_container.lastChild.textContent=`Время для подсчета кликов: ${this.state.seconds} сек`
            }
            if (this.state.seconds<1) {
              this.state.isRunning=false
              clearTimeout(this.state.mtimer)
              this.state.mtimer=0

              if (this.state.winClicks<this.state.clicks && this.state.winClicks>0)
                 user_message=`Поздавляю, вы установили новый рекорд модуля: <i><b>${this.state.clicks}</b></i> кликов.`
              else if (this.state.clicks<=50)
                 user_message=`Поздравляю, вы справились с заданием. <br/>`
              else if (this.state.clicks<=100)
                 user_message=`Поздавляю, вы дошли до конца модуля с отличными результатами.`
              else
                 user_message=`Поздавляю, вы завершили задание модуля с ошеломляющими результатами.`

              console.log(this.state.winClicks,this.state.clicks, this.state.winClicks>=this.state.clicks || this.state.winClicks===0)

              if (this.state.winClicks>=this.state.clicks || this.state.winClicks===0)
              // Запускаем всплыющее окно сообщений с уведомлением о завершении работы модуля CLICKS
                   popup.openPopup({ left:'',
                                     top:'80%',
                                     right:'100px',
                                     transition:`transform 1s ease-out 1s, opacity 2s ease-in-out 0.5s`,
                                     transform: 'translate(0,-200%) scale(1.25)',
                                     opacity:1,                                
                                     textCaption: 'Сообщение модуля CLICKS',
                                     textMessage: `${user_message}
                                                   За отведенное время было сделано <b>${this.state.clicks}</b> кликов по области окна.<br/>
                                                   В будущем вы сможете улучшить свои результаты и поставить новый рекорд!`

                                  },1)
              else {
                  this.state.isModalDialog=true
                  // Запускаем всплыющее окно сообщений с уведомлением о завершении работы модуля CLICKS
                  popup.openModal({ right:'',
                                    top:'50%',
                                    left:'50%',
                                    transform: 'translate(-50%,-50%) scale(1.25)',
                                    transition:`opacity 0.5s ease-in-out 0.5s`,
                                    opacity:1,                                
                                    textCaption: 'Сообщение модуля CLICKS',
                                    textMessage: `${user_message}
                                                  При должном старании позже вы сможете улучшить свои результаты и поставить новый рекорд!`

                }, function(){this.state.isModalDialog=false; this.state.winClicks=this.state.clicks}.bind(this))              
              }
               
              this.state.clicks=0
            }
          },1000)

        }
      }    
}