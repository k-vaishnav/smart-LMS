import { Outlet, useNavigate } from "react-router"
import {useAuth} from "../context/AuthContext"

const PrivateRoute =()=>{
    const {user} = useAuth();
    const navigate = useNavigate();
    return(
        <>
        {user? <Outlet/>: navigate("/login")}
        </>
    )
}
export default PrivateRoute