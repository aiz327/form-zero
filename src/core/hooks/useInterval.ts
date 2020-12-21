import React, { useEffect, useRef,useCallback } from 'react'

type Callback=()=>void;
export default function useInterval(callback:Callback, delay:number) {
    const myRef = useRef<any>({});;
    useEffect(() => {
        myRef.current = callback;
    });
    useEffect(() => {
        function tick() {
            myRef.current();
        }
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
