import React,{useState} from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useAuth()

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = async(e) =>{
        e.preventDefault(); // sabse pehle ham default ko prevent karayge yanike jo page hamara refresh ho raha he vo aab refresh nai hoga
        //console.log(name,email,password,address,phone);
       // toast.success('Register Successsfully'); //success matlab vo green me show karega or agar error likhege to vo red me show hoga
        try {
          const res = await axios.post("/api/v1/auth/login",
          {email,password}); // yaha pe ham env jo banaya he na client me react ka api vo paas kara dege
          if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
            });
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state || "/");
          }
          else{
            toast.error(res.data.message);
          }
        
        } catch (error) {
          console.log(error)
          toast.error("Something went wrong");
        }
      };
  return (
    <Layout title="Register - Ecommerce App">
       <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              required
            />           
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
