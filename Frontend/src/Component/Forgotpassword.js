import React, { useState } from 'react';
import axios from 'axios'; // You'll need to install axios
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';
function Forgotpassword() {
  const [Email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/forgot-password", { Email });
      setMessage(response.data.message);
   toast.success("Email sent Succefully")
    } catch (error) {
      setMessage('Error requesting password reset.');
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
      <h2>Forgot Password</h2>
      <p>{message}</p>
      <Form.Label className="filed1" >Forgot Password:</Form.Label>
      <Form.Control 
        type="email"
        placeholder="Enter your email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      <Button  variant="warning" onClick={handleForgotPassword}> Reset</Button>
    </div>
    </div>
    </section>
  );
}

export default Forgotpassword;
