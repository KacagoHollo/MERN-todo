import React from 'react'
import { useState } from 'react'
import http from 'axios'
import { useNavigate } from 'react-router-dom';
import {toDoApi} from '../api/toDoApi';

function Register() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate()

    const register = async () => {
        const response = await http.post("http://localhost:3000/api/user/create", {
            username
        }, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
        setUsername("")
        navigate('/profile')
    }

  return (
    <div>Register
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <button onClick={register}>Register</button>
    </div>
  )
}

export default Register