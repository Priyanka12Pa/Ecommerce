import React, { useState, useRef, useCallback, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik, ErrorMessage } from "formik";
import { signUpSchema } from "../schemas";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./Registration.css";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialLinkedin
} from 'reactjs-social-login'
import Swal from 'sweetalert2'

// CUSTOMIZE ANY UI BUTTON
import {

  GoogleLoginButton,
  GithubLoginButton,
  FacebookLoginButton,
  LinkedInLoginButton
} from 'react-social-login-buttons'
import { faMehRollingEyes } from '@fortawesome/free-regular-svg-icons';

const initialvalue = {
  FirstName: "",
  LastName: "",
  Role: "",
  Email: "",
  Contact: "",
  Password: ""

};


const REDIRECT_URI = window.location.href;

// const REDIRECT_URI = "http://localhost:3000/home";
const Registration = () => {


  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState(null)
  // const[Roledata,setRole]=useState()
  // console.log(Roledata,"rolessssss")
  const googleRef = useRef();
  const facebookRef = useRef();
  const linkedinRef = useRef();
  const githubRef = useRef();

  console.log(profile)

  const onLoginStart = useCallback(() => {
    alert('login start')
  }, [])
  const onLogoutFailure = useCallback(() => {
    alert("logout fail");
  }, []);



  const onSocial = () => {
    (async () => {
      const { value: fruit } =
        await Swal.fire({
          title: "Select Role",
          input: "select",

          inputOptions: {
            User: "User",
            Admin: "Admin",

          },
          inputPlaceholder: "Select Role",
          showCancelButton: true,

          inputValidator: (value) => {
            console.log(value);
            axios.post("http://localhost:5000/sociallogin", {
              FirstName: profile?.name,
              Email: profile?.email,
              Role: value,
            })

              .then((response) => {
                console.log(response.data);
                localStorage.setItem("Role", value);
              }
              )
            if (value === "User") {
              console.log("hello");
              history("/product");
            }
            else if (value === "Admin") {
              history("/admindash");
            }
          }
        });


    })()


    // const j = localStorage.getItem("Role");


  }

  useEffect(() => {


    if (profile?.name) {
      onSocial();
    }


  });
  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success')
  }, [])
  const history = useNavigate();
  const [submitted, setSubmitted] = useState("");
  const [error, setError] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalue,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        axios
          .post("http://localhost:5000/addUser", {
            FirstName: values.FirstName,
            LastName: values.LastName,
            Role: values.Role,
            Email: values.Email,
            Contact: values.Contact,
            Password: values.Password

          })

          .then((response) => {
            console.log(response.data);
            console.log(values.Role);

            localStorage.setItem("Role", values.Role);
            localStorage.setItem("id", values.id);
            localStorage.setItem("Email", values.Email);

            toast.success("Registration successful! You can now log in.");
            history("/login");
            if (errors.response) {
              setError("please enter all field");
            }
          });

        console.log(values);
      },
    });

  console.log(errors);
  return (
    <section
      style={{
        backgroundColor: "rgb(209 166 40)",
        width: "100%",
        height: "100vh",
        paddingTop: "100px",
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
        <h4 style={{ color: "black", fontWeight: "bold" }}>SIGN UP</h4>

        <br></br>
        <Form onSubmit={handleSubmit}>
          {submitted && <div className="success-message">{submitted}</div>}
          <div className="messages">{error}</div>
          <div className="row">
            <div className="col">
              <Form.Group>
                <Form.Label className="filed" htmlFor="FirstName" style={{

                  marginLeft: "-220px", fontWeight: "bold", color: "black", fontSize: "15px"
                }}>
                  FirstName:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  name="FirstName"
                  id="FirstName"
                  value={values.FirstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.FirstName && touched.FirstName ? (
                  <p className="form-error">{errors.FirstName}</p>
                ) : null}
              </Form.Group>
            </div>
            <br></br>
            <div className="col">
              <Form.Group>
                <Form.Label className="filed" htmlFor="LastName" style={{
                  marginLeft: "-220px", fontWeight: "bold", color: "black", fontSize: "15px"
                }}>
                  LastName:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={values.LastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  name="LastName"
                  id="LastName"
                />
                {errors.LastName && touched.LastName ? (
                  <p className="form-error">{errors.LastName}</p>
                ) : null}
              </Form.Group>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col">
              <Form.Group>
                <Form.Label className="filed" htmlFor="Role" style={{
                  marginLeft: "-250px", fontWeight: "bold", color: "black", fontSize: "15px"
                }} >
                  Role:
                </Form.Label>
                <Form.Select
                  className="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Role}
                  autoComplete="off"
                  name="Role"
                  id="Role"
                >
                  <option>Option</option>
                  <option>User</option>
                  <option>Admin</option>
                </Form.Select>
                {errors.Role && touched.Role ? (
                  <p className="form-error">{errors.Role}</p>
                ) : null}
              </Form.Group>
            </div>
            <br></br>
            <div className="col">
              <Form.Group>
                <Form.Label className="filed" htmlFor="Email" style={{

                  marginLeft: "-220px", fontWeight: "bold", color: "black", fontSize: "15px"
                }}>
                  Address:
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your your email address"
                  value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  name="Email"
                  id="Email"
                />
                {errors.Email && touched.Email ? (
                  <p className="form-error">{errors.Email}</p>
                ) : null}
              </Form.Group>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col">
              <Form.Group>
                <Form.Label className="filed" htmlFor="Password" style={{

                  marginLeft: "-220px", fontWeight: "bold", color: "black", fontSize: "15px"
                }}>
                  Password:
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={values.Password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  name="Password"
                  id="Password"
                />

                {errors.Password && touched.Password ? (
                  <p className="form-error">{errors.Password}</p>
                ) : null}
              </Form.Group>
            </div>
            <br></br>
            <div className="col">
              <Form.Group>
                <Form.Label className="filed" htmlFor="Contact" style={{

                  marginLeft: "-220px", fontWeight: "bold", color: "black", fontSize: "15px"
                }}>
                  Contact:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Contact"
                  maxLength={10}
                  value={values.Contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  name="Contact"
                  id="Contact"
                />
                {errors.Contact && touched.Contact ? (
                  <p className="form-error">{errors.Contact}</p>
                ) : null}
              </Form.Group>
            </div>
          </div>
          <br></br>
          <Button variant="warning" type="submit">
            Register
          </Button>

          <div>
            <p style={{ marginLeft: "0px" }}>If Already Registered </p>
            <Link to="/login" style={{ marginLeft: "0px" }}>
              Login Here
            </Link>
          </div>
        </Form>
        <LoginSocialGoogle
          ref={googleRef}
          scope="email"
          client_id="1024616921919-hns9m0q39jb21qrp4kpb57kti2sd5t1n.apps.googleusercontent.com"
          onLogoutFailure={onLogoutFailure}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            console.log(data, "data");
            console.log(provider, "provider");
          }}
          onReject={(err) => {
            console.log("hbhbdhd", err);
          }}
        >
          <GoogleLoginButton />


        </LoginSocialGoogle>
        <LoginSocialGithub
          isOnlyGetToken
          client_id={process.env.REACT_APP_GITHUB_APP_ID || ''}
          client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onResolve={({ provider, data }) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err) => {
            console.log(err)
          }}
        >
          <GithubLoginButton />
        </LoginSocialGithub>
        <LoginSocialFacebook
          isOnlyGetToken
          appId={process.env.REACT_APP_FB_APP_ID || ''}
          onLoginStart={onLoginStart}
          onResolve={({ provider, data }) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err) => {
            console.log(err)
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
        {/* "https://www.linkedin.com/developers/apps/verification/07040fb6-30b1-4641-81e4-5419c4bef088" */}
        <LoginSocialLinkedin
          isOnlyGetToken
          client_id="86vs862stbiyj3"
          client_secret="XilW0d6gQdqG2vAS"
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onResolve={({ provider, data }) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err) => {
            console.log(err)
          }}
        >
          <LinkedInLoginButton />
        </LoginSocialLinkedin>
      </div>

    </section>
  );
};


export default Registration