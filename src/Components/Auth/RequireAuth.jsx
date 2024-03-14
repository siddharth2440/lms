import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({allowedRoles}) => {

    const {isLoggedIn,role,data} = useSelector((state)=>state.auth)
    return (
        <>
            {
                isLoggedIn && allowedRoles.find((r)=>r==role)?(
                    <Outlet />
                ):isLoggedIn?<Navigate to="/deny"/>:
                <Navigate to="/login"/>
            }
        </>
    )
}

export default RequireAuth