
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Registration.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginSchema, signUpSchema } from "../schemas";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import React, { useCallback, useRef, useState } from "react";
import {
  LoginSocialGoogle,

  LoginSocialFacebook,
  LoginSocialGithub,

  LoginSocialLinkedin,

} from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  
  LinkedInLoginButton

} from "react-social-login-buttons"; 

const REDIRECT_URI = "http://localhost:3000/account/login";
const initialvalue = {
  Email: "",
  Password: "",
};
const Login = () => {



  const history = useNavigate();
  const j = localStorage.getItem("Role");
  const [loginStatus, setLoginStatus] = useState("");
  console.log(j);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalue,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        console.log("this");
        axios
          .post("http://localhost:5000/login", {
            Email:values.Email,
            Password:values.Password
          })
          .then((response) => {
            toast.success("Login Successfull");
            if (!response.data.message) {
              setLoginStatus(response.data.message);
            } else {
              setLoginStatus(response.data[0].message);
            }
          });
        if (j == "User") {
          console.log("hello");
          history("/product");
        }
        if (j == "Admin") {
          history("/admindash");
        }
      },
    });

  return (
    <section
      style={{
        backgroundColor:"rgb(209 166 40)",
        width: "100%",
        height: "100vh",
        paddingTop: "200px",
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
        <h4 style={{fontWeight:"bold"}}>SIGN IN</h4>

        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="filed1" style={{fontWeight:"bold" ,marginLeft:"-460px"}}>Email or Username:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email or Username"
              id="Email"
              value={values.Email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {errors.Email && touched.Email ? (
              <p className="form-error">{errors.Email}</p>
            ) : null}
          </Form.Group>
<br></br>
          <Form.Group>
            <Form.Label className="filed2" style={{fontWeight:"bold" ,marginLeft:"-510px"}}> Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              id="Password"
              value={values.Password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {errors.Password && touched.Password ? (
              <p className="form-error">{errors.Password}</p>
            ) : null}
          </Form.Group>

          <br></br>
          <Button variant="warning" type="submit">
          SIGN IN
          </Button>

          <div>
            <br></br>
            <p style={{ marginLeft: "0px" }}>If New User Creat An Account: <Link to="/registera" style={{ marginLeft: "0px" }}>
              Register Here
            </Link></p> 
           
          </div>
          <div>
            {/* <p style={{ marginLeft: "0px" }}>Forgot Password </p> */}
            <Link to="/forgot" style={{ marginLeft: "0px" }}>
              Forgot Password
            </Link>
          </div>
        </Form>
       

      </div>
    </section>
  )
}

export default Login









