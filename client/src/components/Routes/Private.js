import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute(){
    const [ok,setOk] = useState(false); // kyuki hamne authRoute me bhi state ok kiya he so same name se yaha pe bhi ham kar rahe he
    const [auth,setAuth] = useAuth()

    useEffect(() =>{
        const authCheck = async() =>{
            const res = await axios.get("/api/v1/auth/user-auth",
            //{   
                // ham ye puri  chiz auth.js me bhi likh sakte he through axios so vo likhege 
                //headers:{
                    // headers isliye kyuki hamare paas token he 
                    // authorization me jo bhi hamare paas token he usko ham fulfill kar sakte he
                   // "Authorization": auth?.token // agar hamko auth milta he to optional chaining me add kar deta hu
                    // or yaha ? mark ka matlab ye hi ki pehle condition check hogi uske baad me age ka exection hoga
                //}
            //}
            );
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }

        if(auth?.token){
            authCheck()
        }
    },[auth?.token])

    return ok ? <Outlet/> : <Spinner/>
}