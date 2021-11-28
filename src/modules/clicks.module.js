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

        this.type = type
        this.text = text
      }

      trigger() {
        alert(`Trigger method implemented by "${this.type}"`)
        //
      }
}