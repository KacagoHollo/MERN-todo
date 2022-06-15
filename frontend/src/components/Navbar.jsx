import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const nav = (path) => {
        console.log('rerouting');
        navigate(path);
    }
  return (
    <div>
        <nav>
          <button onClick={() => nav('/')}>Home</button>
          <button onClick={() => nav('/about')}>About</button>
          <button  onClick={() => nav('/profile')}>Profile</button>
          <Link to='/profile'>Profile</Link>
        </nav>
    </div>
  )
}

export default Navbar