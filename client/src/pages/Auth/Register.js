import React,{useState} from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {
  // so ye name ham get kar sakte he or iske andar ham value ko set kar sakte he
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [answer,setAnswer] = useState("");
  const navigate = useNavigate();


  // ye hamne onSubmit isliye likha he kyuki jab ham hamari website pe value likh ke submit kar rahe he to hamara page reload horaha he
  // ye isliye ho raha he kyuki he javascript ka by default system he isliye uske change karne ke liye ye kar rahe he 
  // form function
  const handleSubmit = async(e) =>{
    e.preventDefault(); // sabse pehle ham default ko prevent karayge yanike jo page hamara refresh ho raha he vo aab refresh nai hoga
    //console.log(name,email,password,address,phone);
   // toast.success('Register Successsfully'); //success matlab vo green me show karega or agar error likhege to vo red me show hoga
    try {
      const res = await axios.post("/api/v1/auth/register",
      {name,email,password,phone,address,answer,}); // yaha pe ham env jo banaya he na client me react ka api vo paas kara dege
      if(res && res.data.success){
        toast.success(res.data && res.data.message);
        navigate("/login");
      }
      else{
        toast.error(res.data.message);
      }
    
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  };

  // aab ye jo data hamne likha vo hame server pr bhejna he lekin ham drect communicate nai kar sakte so uske liye best he Axios ka use karna
  // Axios se ham hamare backend me jo data he usko get,post ,update saab kar sakte he 


  return (
    <Layout title="Register - Ecommerce App">
       <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              // so aab hamne jo upar state banai to usko kese use karege so usko use karne ke liye value likhege 
              value={name}
              // so ye sab karne ke baad ham register ke page pr jayege to ham kuch nai likh payge kyuki hamne initial value empty 
              // rakha he but agar ham koi value likh dege to vo value reflect hogi hamari website pr but ham usko change nai kar sakte
              // kyuki hamko iske change event pe kam karna he so
              onChange={(e) => setName(e.target.value)} // arrow function ki madad se ham value ko set karege so ye name kese ayga so ye onchange he uske andar hamko ek event milta he e
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your name"
              required // ye required isliye if koi chiz empty reh jati he to hamko red line ye sab show kar dega
            />        
          </div>
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
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Phone"
              required
            />    
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Address"
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
              placeholder="What is your best friend Name?"
              required
            />    
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

// 2:20:28 to aab ham iske liye na state create karege kyuki uske andar jo bhi value rahegi 
// hamko usko hold karana he so ham usko hold karayge uske baad me ham isko server pr bhejege
// so usi tarah hame get karna he get karne ke baad hame usko ek variable me store karana he 
// or uske baad jab network request call hogi tab hame usme paas karana he so hamko 4-5 state lagegi 

export default Register;
