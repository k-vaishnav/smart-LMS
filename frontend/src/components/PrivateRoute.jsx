import {useEffect} from "react"
import { Outlet, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext";

const PrivateRoute =()=>{
    const {user,loading} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!loading && !user){
            console.log("no user");
            navigate("/login")
        }
        
    },[user,loading,navigate])
    if(loading){
            return <p>loading...</p>
        }
    return(
        <>
        {user? <Outlet/>: null}
        </>
    )
}
export default PrivateRoute