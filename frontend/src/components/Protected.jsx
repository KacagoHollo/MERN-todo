import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

function Protected({children}) {
    const {token} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          navigate('/');
        }
        // eslint-disable-next-line
      }, [token])
  return (
    <React.Fragment>{children}</React.Fragment>
  )
}

export default Protected