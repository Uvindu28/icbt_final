import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    jwtToken: null,
    user: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (token) => {
        setIsAuthenticated(true);
        setJwtToken(token);
        localStorage.getItem('token',token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setJwtToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setJwtToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            jwtToken,
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};

export const useAuth = () => {
    return useContext(AuthContext);
};
