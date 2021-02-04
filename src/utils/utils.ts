export const debounce = (func: any, delayTime: number|undefined) => {
    let timer: any = null;
    return function(...args: any[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delayTime);
    };
};


export const isValid = (val: any) => val !== undefined && val !== null

const isEvent = (candidate: any): boolean =>
  candidate &&
  (candidate.stopPropagation || candidate.preventDefault || candidate.bubbles)

export const getValueFromEvent = (event: any) => {
    if (isEvent(event)) {
      if (
        event.nativeEvent &&
        isValid(event.nativeEvent.text)
      ) {
        return event.nativeEvent.text
      }
  
      const detypedEvent = event
      const {
        target: { type, value, checked, files },
        dataTransfer
      } = detypedEvent
  
      if (type === 'checkbox') {
        return !!checked
      }
  
      if (type === 'file') {
        return files || (dataTransfer && dataTransfer.files)
      }
      
      return value
    }
    return event
  }
  