import { useState } from "react";
import { useContext, createContext } from "react";
import http from 'axios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const auth = () => {
        const googleBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const searchParams = new URLSearchParams();
        searchParams.append("client_Id", "423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com");
        searchParams.append("scope", "openid");
        searchParams.append("redirect_uri", "http://localhost:3000/callback");
        searchParams.append("response_type", "code");
        searchParams.append("prompt", "select_account");

        const fullUrl = googleBaseUrl + "?" + searchParams.toString();
        window.open(fullUrl)
    };

    const login = async (code, provider) => {
        try {
            const response = await http.post('http://localhost:4000/api/login/user', {'code': code, "provider": provider});
            setToken(response.data.sessionToken);
        } catch (error) {
            setToken(null)
        }
    }

    const logout = () => {
        setToken(null)
    };
    const contextValue = { token, auth, login, logout };
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