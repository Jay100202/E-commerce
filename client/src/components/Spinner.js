import React ,{useState,useEffect}from "react";
import { useNavigate,useLocation } from "react-router-dom";


const Spinner = () => {
    const [count,setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() =>{
        const interval = setInterval(() =>{
            setCount((prevValue) => --prevValue)
        },1000);

        count === 0 && navigate("/login",{
            state:location.pathname
        })
        return () => clearInterval(interval)
    },[count,navigate,location]);
    
    // so agar ham login user nai he or ham dashboard ko access karna chahte he to hamko vo login page pe lejayga
    // according to ye code jo hamne likha he 
    // to agar mene aab login kiya to vo merko homepage pr le jara he na ki dashboard page pr
    // to ham kya kar sakte he user ki location history ko bhi access kar sakte he or isase kafi fayda hoga
    // man lijye uske paas koi cart ke andar product save ho ya fir usko koi link mili hui he vo link checkout ki link bhi ho sakti he 
    // to vo login karega firse home pr ayga to ye thoda acha nai he 
    // so uske liuye ham useLocation hook ko use karege 
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center"
      style={{height:"100vh"}}>
        <h1 className="Text-center">redirecting to you in {count} second</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
