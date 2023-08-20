import React,{useState} from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = async(e) =>{
        e.preventDefault(); // sabse pehle ham default ko prevent karayge yanike jo page hamara refresh ho raha he vo aab refresh nai hoga
        //console.log(name,email,password,address,phone);
       // toast.success('Register Successsfully'); //success matlab vo green me show karega or agar error likhege to vo red me show hoga
        try {
          const res = await axios.post("/api/v1/auth/forgot-password",
          {email,newPassword,answer}); // yaha pe ham env jo banaya he na client me react ka api vo paas kara dege
          if(res && res.data.success){
            toast.success(res.data && res.data.message);
            navigate(location.state || "/login");
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
    <Layout title={'Forgot Password - Ecommerce APP'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className="title">RESET PASSWORD</h4>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your best friend name?"
              required
            />           
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
