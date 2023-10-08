import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '../context/Auth'

export default function DynamicRoutes(props) {

    const { user, email, reset_token } = useAuthState();

    console.log(email,props.verification,props.verification && email != null);

    if(props.verification){
        if(email){
            return <Outlet />
        }else{
            return <Navigate to="/forget" />
        }
    }

    if(props.reset){
        if(reset_token){
            return <Outlet />
        }else{
            return <Navigate to="/forget" />
        }
    }

    return user ? <Outlet /> : <Navigate to="/signin" />;

}