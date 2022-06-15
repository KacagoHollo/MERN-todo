import { useState } from "react";
import { useContext, createContext } from "react";
const CounterContext = createContext();

const CounterProvider = ({children}) => {
    const [value, setValue] = useState(0);

    const decrement = () => {
        setValue(value - 1)
    };
    const increment = () => {
        setValue(value + 1)
    };
    const contextValue = {value, decrement, increment};
  return (
    
    <CounterContext.Provider value={contextValue}>
        {children}
    </CounterContext.Provider>
  )
};

const useCounter = () => {
    return useContext(CounterContext)
}

export {CounterProvider, useCounter};