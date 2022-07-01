import React, {useEffect} from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/auth';

function Protected ({children}) {
    const {token, user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!token) {
          return navigate('/');
        }
        if (!user.userId) {
          return navigate('/register')
        }
        // eslint-disable-next-line
      }, [token, user]);
      
  return (
    // <React.Fragment>{children}</React.Fragment>
    <>
      {!token ? (
        <Navigate to={"/"} />
      ) : !user.userId && location.pathname !== "/register" ? (
        <Navigate to={"/register"} />
      ) : (
        children
      )}
    </>
  )
}

export default Protected