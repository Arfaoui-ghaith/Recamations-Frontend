import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '../context/Auth'

export default function DynamicRoutes(props) {

    const { user } = useAuthState();

    if(props.authenticated){
        if(user){
            return <Outlet />
        }else{
            return <Navigate to="/signin" />
        }
    }

    return user ? <Outlet /> : <Navigate to="/signin" />;
}