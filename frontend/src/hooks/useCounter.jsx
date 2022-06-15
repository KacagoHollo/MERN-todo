import { useState, useEffect } from 'react';

export const useCounter = (path) => {
    const [counter, setCounter] = useState(0);

    
    useEffect(() => {
        localStorage.setItem("counter" + path, counter);
      }, [counter])
      
      useEffect(() => {
        const localCounter = parseInt(localStorage.getItem("counter" + path))
        setCounter(localCounter || 0)
      }, [])

    const decrement = () => {
        setCounter(counter - 1)
    }
    const increment = () => {
        setCounter(counter + 1)
    }
    return { counter, decrement, increment}
    
}