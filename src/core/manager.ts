import { isFunc } from "./util"



export class Subscription<Payload = any> {

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
  }

  unsubscribe = () => {
    
  }

  notify = (name: string, payload: any) => {
    Object.keys(this.subscriber).forEach(key => {
      if (isFunc(this.subscriber[key])) {
        if (name && key === name) {
          this.subscriber[key](payload);
        }
        if (!name) {
          this.subscriber[key](payload);
        }   
      }
    })
  }
}
