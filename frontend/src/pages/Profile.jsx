import React, {useEffect} from 'react'
import { useCounter } from '../hooks/useCounter';
import { useCounter as useGlobalCounter } from '../providers/counter';
import { useAuth } from '../providers/auth';

const Profile = () => {
    const {counter, increment, decrement} = useCounter("Profile");

    
    const {
        value,
        increment: up,
        decrement: down
    } = useGlobalCounter();

    const {token} = useAuth()

  return (
    <>
        <div>Profile</div>
        {token ? <p>Logged in</p> : <p>Anonymus</p>}
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <p>Value: {counter}</p>
        <button onClick={down}>-</button>
        <button onClick={up}>+</button>
        <p>Global value: {value}</p>
    </>
  )
}

export default Profile