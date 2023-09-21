import React, { useState } from 'react';
import axios from 'axios'; 
import {useParams} from 'react-router-dom' ;
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Resetpassword({ match }) {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const params = useParams();
  const navigate=useNavigate();
  
  const handleResetPassword = async () => {
    // console.log(match.params.resetToken);
    console.log(newPassword);
    try {
      const response = await axios.post(`http://localhost:5000/reset/${params.token}`, {
        newPassword,
      });
      setMessage(response.data.message);
      toast.success("password reset Succefully")
   navigate("/login")
    } catch (error) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <section
    style={{
      backgroundColor:" rgb(209 166 40)",
      // backgroundImage: `url("https://img.freepik.com/free-photo/top-view-desk-concept-with-copy-space_23-2148236823.jpg?w=1380&t=st=1691668901~exp=1691669501~hmac=68981a07217ea1b35ef6b2f0400f3039a87bf3744597fef184e408bbb7a68e33")`,
      width: "100%",
      height: "100vh",
      paddingTop: "300px",
     
    }}
  >
     <div
      style={{
        display: "block",
        backgroundColor: "white",

        width: 700,
        padding: 30,
        marginLeft: "600px",
      }}
    >
    <div>
      <h2>Reset Password</h2>
      <p>{message}</p>
      <Form.Label className="filed1" >Reset Password:</Form.Label>
      <Form.Control 
        type="password"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br></br>
      <Button variant="warning" onClick={()=>{handleResetPassword()}}>Reset Password</Button>
    </div>
    </div>
    </section>
  );
}

export default Resetpassword;