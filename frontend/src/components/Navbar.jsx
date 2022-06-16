import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../providers/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const { auth, token, logout } = useAuth()
    const nav = (path) => {
        console.log('rerouting');
        navigate(path);
    }
  return (
    <nav className='navbar' style={{backgroundColor:"gray", display:"flex", justifyContent:"space-between"}}>
        <div className='left'>
          <button onClick={() => nav('/')}>Home</button>
          <button onClick={() => nav('/about')}>About</button>
          <button  onClick={() => nav('/profile')}>Profile</button>
          <Link to='/profile'>Profile</Link>
        </div>
        <div className='right'>
          { token ? 
            <button onClick={logout}>Logout</button> 
            :
            <button onClick={auth}>Login</button>
            
          }
        </div>
    </nav>
  )
}

export default Navbar;