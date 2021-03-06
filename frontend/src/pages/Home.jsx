import React, {useState} from 'react';
import { useCounter } from '../hooks/useCounter';
import { useCounter as useGlobalCounter } from '../providers/counter';
import {useAuth} from '../providers/auth'

const Home = () => {
    const {counter, increment, decrement} = useCounter("Home");
    const {token, auth } = useAuth();
    const {
        value,
        increment: up,
        decrement: down
        } = useGlobalCounter();
    
    

    return (
      <>
          <div>Home</div>
          <p>{token ? "Logged in": "Annonymus"}</p>
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
          <p>Value: {counter}</p>
          <button onClick={down}>-</button>
          <button onClick={up}>+</button>
          <p>Global value: {value}</p>

         {token ? "Welcome" : (<button onClick={auth}>Login with Google</button>)}
      </>
    )
}

export default Home