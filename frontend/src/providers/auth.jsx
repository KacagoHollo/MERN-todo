import { useState, useEffect } from "react";
import { useContext, createContext } from "react";
import http from 'axios';
import jwt from 'jwt-decode'
import { toDoApi } from "../api/toDoApi";
import config from '../app.config'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
 
    useEffect(() => {
      const tokenInStorage = localStorage.getItem("token");
      if (tokenInStorage) {
        setToken(tokenInStorage);
        setUser(jwt(tokenInStorage))
      }

    }, [])
    

    const auth = () => {
        const googleBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const searchParams = new URLSearchParams();
        searchParams.append("client_id", "423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com");
        searchParams.append("scope", "openid");
        searchParams.append("redirect_uri",
        window.location.origin + "/callback"
        );
        searchParams.append("response_type", "code");
        searchParams.append("prompt", "select_account");

        const fullUrl = googleBaseUrl + "?" + searchParams.toString();
        window.location.href = fullUrl;
    };

    const login = async (code, provider) => {
        try {
            const response = await http.post('http://localhost:4000/api/user/login', {'code': code, "provider": provider});
            setToken(response.data.sessionToken);
            localStorage.setItem("token", response.data.sessionToken)
            setUser(jwt(response.data.sessionToken));
        } catch (error) {
          console.log(error);
          setToken(null)
          localStorage.removeItem("token");
        }
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem("token");
    };
    const contextValue = { token, auth, login, logout, user };
  return (
    
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("add AuthProvider to root");
    return context;
}

export {AuthProvider, useAuth};