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
          seconds:20,
          mtimer:0,
          isRunning: false 
       }


        this.type = type
        this.text = text
      }

      reset() {
       // if (document.querySelector('.click_container'))
        document.querySelector('.click_container').remove() 
        document.body.onclick=null

        if (this.state.mtimer!=0) clearTimeout(this.state.mtimer)
        this.state.mtimer=0
        this.state.clicks=0
        this.state.seconds=20
        this.state.isRunning=false
      }


      trigger() {

        if (!this.state.isRunning) {

          this.state.isRunning=true
          document.body.insertAdjacentHTML('beforeend', `<div class='click_container'><h2>Пользователь нажал на мышь - ${this.state.clicks} раз </h2>
                                                                                      <h2>Время для подсчета кликов: ${this.state.seconds} сек</h2></div>`)
          document.body.onclick= (event)=>{
            if (document.querySelector('.click_container')) {
               document.querySelector('.click_container').firstChild.textContent=`Пользователь нажал на мышь - ${this.state.clicks} раз`
               document.querySelector('.click_container').lastChild.textContent=`Время для подсчета кликов: ${this.state.seconds} сек`
            }

            if (this.state.isRunning) {
              //console.log(event.target)
              this.state.clicks+=1
            }
          }

          if (this.state.mtimer===0 && this.state.isRunning) 
          this.state.mtimer=setInterval(()=>{
            this.state.seconds-=1
            if (document.querySelector('.click_container')) {
               document.querySelector('.click_container').firstChild.textContent=`Пользователь нажал на мышь - ${this.state.clicks} раз`
               document.querySelector('.click_container').lastChild.textContent=`Время для подсчета кликов: ${this.state.seconds} сек`
            }
            if (this.state.seconds<1) {
              this.state.isRunning=false
              clearTimeout(this.state.mtimer)
              this.state.mtimer=0

            }
          },1000)

        }
      }    
}