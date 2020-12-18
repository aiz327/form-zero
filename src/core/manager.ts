import { isFunc } from "./util"



export class FormSubscription<Payload = any> {

  subscriber : {
    index: number,
    [key: number]: any,
    [key: string]: any
  } = {
    index: 0
  }

  subscribe = (name: string, callback: any)=> {
    if (callback) {
      const index: number = this.subscriber.index + 1
      this.subscriber[name] = callback
    }
    debugger
  }

  unsubscribe = () => {
    
  }

  notify = () => {
    Object.keys(this.subscriber).forEach(key => {
      if (isFunc(this.subscriber[key])) {
        this.subscriber[key]();
      }
    })
  }
}
