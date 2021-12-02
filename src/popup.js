
export class DialogMessage {

    constructor() {

      this.state= {
        isModal: false,
        isPopup: false,
        isOpen:false,
        step:0,
        direction: 1,
        runOnClose:null
      }

      this.buttonClose=buttonClose
      this.transitionPopup=transitionPopup
      this.contextMenu=null

      if (!document.body.querySelector('#overlay')) {
        document.body.insertAdjacentHTML('beforeend',       
        `<div id="overlay">
            <div class="popup">
                <h2>Модальное Окно!</h2>
                <p>Здесь необходимо указать текст, выводимый в окне.</p>
                <button class="close" title="Закрыть"></button>
            </div>
        </div>`)
        document.body.querySelector('#overlay').style.display='none'

        this.popup=document.body.querySelector('.popup')
        this.close=document.body.querySelector('.popup .close')

        this.popup.addEventListener('transitionend', (e)=> {this.transitionPopup()})
        this.close.addEventListener('click', (e)=>{this.closeDialog()
                                                   if (this.state.runOnClose) this.state.runOnClose()
                                                  })
      }

    }

    openModal(settings, reset_func){

     [this.state.isModal,this.state.isOpen]=[true, true]
     if (reset_func) this.state.runOnClose=reset_func

     document.body.querySelector('#overlay').style.background='rgba(0, 0, 0, 0.65)'
     document.body.querySelector('#overlay').style.opacity=1
     document.body.querySelector('#overlay').style.display='block'

     this.popup.style.transition=''
     this.popup.style.opacity=0
     this.popup.style.transform='scale(0.5)'
     this.popup.style.display='block'

     setTimeout(()=>{
         Object.assign(this.popup.style,settings)
         this.popup.querySelector('h2').textContent=settings.textCaption
         this.popup.querySelector('p').innerHTML=settings.textMessage},0)
    }

    openPopup(settings, direction){

        [this.state.isPopup,this.state.isOpen]=[true, true]
        this.state.direction=direction

        document.body.querySelector('#overlay').style.background='rgba(0, 0, 0, 0)'
        document.body.querySelector('#overlay').style.opacity=1
        document.body.querySelector('#overlay').style.display='block'

        this.popup.style.transition=''
        this.popup.style.opacity=0
        this.popup.style.transform=''
        this.popup.style.display='block'

        setTimeout(()=>{
            Object.assign(this.popup.style,settings)
            this.popup.querySelector('h2').textContent=settings.textCaption
            this.popup.querySelector('p').innerHTML=settings.textMessage},0)

    }
 
    closeDialog() {
        console.log('Dialog is closing', this)
        if (this.state.isOpen) this.buttonClose()
    }


}


function buttonClose() {

    document.body.querySelector('#overlay').style.display='none'
    this.popup.style.opacity=0

    if (this.state.isModal && this.state.isOpen) {
       [this.state.isModal,this.state.isOpen, ]=[false,false]
       this.state.step=0
    } else {
        if (this.state.isPopup && this.state.isOpen) {
           [this.state.isPopup,this.state.isOpen]=[false,false]
           this.state.step=0
        }
    }
}

function transitionPopup() {
    this.state.step+=1
    console.log('Transition func is running. Current step is',this.state.step)
    if (this.state.step===2) {
        setTimeout(function(){
           if (this.state.isOpen)
              if (this.state.direction===1) {
                 setTimeout(()=> { 
                    this.popup.style.opacity=0
                    this.popup.style.transform=`translate(0,-400%) scale(0.5)`
                 },0)
              } else {
                setTimeout(()=> { 
                    this.popup.style.opacity=0
                    this.popup.style.transform=`translate(200%,0) scale(0.5)`
                 },0)                  
              }
                
        }.bind(this),3000)

    } else if (this.state.step===4) 
        if (this.state.isOpen) this.closeDialog()
}