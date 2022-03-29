import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import api from "../../conf/apiConf";
import useAuth from "../../hooks/useAuth";

const RequiredAuth = () => {
    const { auth, setAuth } = useAuth()
    const location = useLocation()
    const [user] = useState(() => {
        return JSON.parse(localStorage.getItem('user'))
    })

    useEffect(() => {
        api.get(`user/${user?.id}`, {
            headers: {
                authorization: 'Bearer ' + user.token
            }
        })
        .then(res => setAuth(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        auth && user
            ? <Outlet />
            : <Navigate to='login' state={{ from: location }} replace />
    )
}

export default RequiredAuth