import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
const Protectedroutes = ({children}) => {
    const navigate=useNavigate();
    const auth=localStorage.getItem("Role");
   
    if(auth){
        console.log(auth,"fdgd")
        return children
           
           
     
    }
    else {
        navigate("/registra");
    }
  
}

export default Protectedroutes