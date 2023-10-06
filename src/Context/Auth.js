import React from 'react';
import jwtDecode from 'jwt-decode';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

let user = null;
const token = localStorage.getItem("tokenInternMe");

let email = localStorage.getItem("internMe_email");
if(email === undefined){
    email = null;
}

let reset_token = localStorage.getItem("internMe_reset_token");
if(reset_token === undefined){
    reset_token = null;
}

if(token){
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);

    if(new Date() > expiresAt){
        localStorage.removeItem('tokenInternMe');
    } else {
        user = token;
    }
} else {
    console.error('token not found');
}

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN' :
            localStorage.setItem('tokenInternMe',action.payload);
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT' :
            localStorage.removeItem('tokenInternMe');
            return {
                ...state,
                user: null,
            }
        case 'Save_Email' :
            localStorage.setItem('internMe_email', action.payload);
            return {
                ...state,
                email: action.payload,
            }
        case 'Remove_Email' :
            localStorage.removeItem('internMe_email');
            return {
                ...state,
                email: null,
            }
        case 'Save_Token' :
            localStorage.setItem('internMe_reset_token', action.payload);
            return {
                ...state,
                reset_token: action.payload,
            }
        case 'Remove_Token' :
            localStorage.removeItem('internMe_reset_token');
            return {
                ...state,
                reset_token: null,
            }
        default:
            throw new Error(`Unkonwn action type: ${action.type}`);
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(authReducer, { user, email, reset_token });

    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    );
}

export const useAuthState = () => React.useContext(AuthStateContext);
export const useAuthDispatch = () => React.useContext(AuthDispatchContext);