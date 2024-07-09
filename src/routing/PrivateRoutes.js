import { Children } from "react";

const { useNavigate, Navigate } = require("react-router-dom");



export const PrivateRoutes = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to={'/'} replace={true}/>)

}