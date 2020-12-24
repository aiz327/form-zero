export const debounce = (func: any, delayTime: number|undefined) => {
    let timer: any = null;
    return function(...args: any[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delayTime);
    };
};