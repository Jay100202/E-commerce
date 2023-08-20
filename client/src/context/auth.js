import { useState,useEffect,useContext,createContext} from "react";
import axios from "axios";

const AuthContest = createContext();

const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user:null,
        token:""
    })
    
   // default axios
   axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() =>{
        // useEffect me ham multiple function execute kar sakte he 
        const data = localStorage.getItem('auth')
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        //eslint-disable-next-line
    },[]);
    return (
        <AuthContest.Provider value={[auth,setAuth]}>
            {children}
        </AuthContest.Provider>
    )
}

// custom hook create kar dege 
const useAuth = () => useContext(AuthContest)

export {useAuth,AuthProvider}