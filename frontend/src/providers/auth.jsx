import { useState, useEffect, useContext, createContext  } from "react";
import http from 'axios';
import jwt from 'jwt-decode'
import { toDoApi } from "../api/toDoApi";
import config from '../app.config'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const { post } = toDoApi();
 
    const auth = (provider) => {
        const googleBaseUrl = config[provider].base_url;

        const searchParams = new URLSearchParams();
        searchParams.append("response_type", "code");
        searchParams.append("client_id", config[provider].client_id);
        searchParams.append("scope", "openid");
        searchParams.append("redirect_uri",
        window.location.origin + "/callback/" + provider
        );
        searchParams.append("prompt", "select_account");

        const fullUrl = googleBaseUrl + "?" + searchParams.toString();
        window.location.href = fullUrl;
    };

    const login = async (code, provider) => {
        try {
            const response = await http.post('/user/login', {'code': code, "provider": provider});
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setUser(jwt(response.data.token));
        } catch (error) {
          console.log(error);
          localStorage.removeItem("token");
          setToken(null);
        }
    };

    const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
    };

    const register = async (username) => {
      const response = await post("/user/create", { username });
  
      if (response?.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUser(jwt(response.data.token));
      }
    };
    const contextValue = { token, auth, login, logout, user, register };

    useEffect(() => {
      const tokenInStorage = localStorage.getItem("token");
      if (tokenInStorage) {
        setToken(tokenInStorage);
        setUser(jwt(tokenInStorage));
      }

    }, [])
    
  return (
    
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
};

const useAuth = () => {
    const context = useContext(AuthContext); // read the context and subscribe to its changes
    if (!context) throw new Error("add AuthProvider to root"); // dev help only
    return context;
};

export {AuthProvider, useAuth};