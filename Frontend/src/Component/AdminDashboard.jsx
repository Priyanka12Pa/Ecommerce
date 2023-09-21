import React, { Fragment, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik, ErrorMessage } from "formik";
import axios from "axios";
import "./AdminDashboard.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Productschema } from "../schemas";
import { faTrash } from "@fortawesome/free-regular-svg-icons";
import { Table } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

const initialvalue = {
  ProductName: "",
  Category: "",
  Title: "",
  Price: "",
  Couponcode: "",
  ProductImage: null,
};



export default function AdminDashboard() {
  const history = useNavigate();
  const [submitted, setSubmitted] = useState("");
  const [error, setError] = useState(false);
  const [productImg, setProductImg] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isedit, setEdit] = useState(false);
  const [productid, setProductid] = useState();
  // const [handleDeleteClick, setDelete] = useState();


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalue,
      validationSchema: Productschema,

      // addproduct-------------------------------------------------------------
      onSubmit: (values) => {
        console.log(productid, "gkdjfgiiiidddddddddd")
        const formData = new FormData();

        formData.append("ProductName", values.ProductName);
        formData.append("Category", values.Category);
        formData.append("Title", values.Title);
        formData.append("Price", values.Price);
        formData.append("Couponcode", values.Couponcode);
        formData.append("ProductImage", productImg);



        if (isedit) {
          const formDatas = {

            ProductName: values.ProductName,
            Category: values.Category,
            Title: values.Title,
            Price: values.Price,
            Couponcode: values.Couponcode
            , productImg
          }



          axios.post(`http://localhost:5000/updateproduct/${productid}`, formDatas).then((response) => {
            console.log(response.data)
            setEdit(response.data)
            toast.success("Product updated succefully")
          }

          )
        }


        else {


          axios
            .post("http://localhost:5000/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })

            .then((response) => {
              console.log(response.data);
              console.log(values.Role);

              localStorage.setItem("Role", values.Role);
              values.ProductName = "";
              toast.success("Product added successfully");

              handleClose();
              fetchCards();
              if (errors.response) {
                setError("please enter all field");
              }
            });
        }
        console.log(values);
      },
    });

  const nav = useNavigate();
  const auth = localStorage.getItem("Role");
  const Logout = () => {
    localStorage.clear();
    nav("/registera");
  };




  //getcart
  const [cards, setCards] = useState([]);
  console.log(cards[0]);
  useEffect(() => {


    fetchCards();
  }, []);
  async function fetchCards() {
    try {
      const response = await axios.get("http://localhost:5000/getallproduct");
      console.log(response.data);
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  }
  const handleDeleteClick = (id) => {
    console.log(id)

    axios
      .delete(`http://localhost:5000/deleteproduct/${id}`)
      .then((response) => {
        fetchCards();
        console.log("Item deleted successfully");
        toast.success("Item deleted successfully")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function handleEdit(e, id) {
    console.log("check")
    axios.get(`http://localhost:5000/findoneproduct/${id}`).then((res) => {
      console.log(res, "res")
      if (res.data) {

        handleShow();
        setEdit(true);
        setProductid(id);
        initialvalue.ProductName = res.data.ProductName;
        initialvalue.Category = res.data.Category;
        initialvalue.Title = res.data.Title;
        initialvalue.Price = res.data.Price;
        initialvalue.Couponcode = res.data.Couponcode;
        initialvalue.ProductImage = res.data.ProductImage;

      }


    })

  }




  return (
    // navbar----------------------------------------------------------
    <Fragment>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" className="text-3xl font-bold underline">
            Pfour.in
          </Navbar.Brand>

          <div className="hellos">
            <FontAwesomeIcon className="j" icon={faUser} />
          </div>
          <NavDropdown id="basic-nav-dropdown" style={{ marginRight: "80px" }}>
            <li>
              {" "}
              {auth ? (
                <Link onClick={Logout} to="/registera" style={{ marginLeft: "30px" }}>
                  Logout
                </Link>
              ) : (
                <Link to="/registera" style={{ marginLeft: "30px" }}>Logout</Link>
              )}{" "}
            </li>
            <Link style={{ marginLeft: "40px" }}>
              Profile
            </Link>
            {/* <NavDropdown.Item id="basic-nav-dropdown"style={{marginLeft:"30px"}}>Profile</NavDropdown.Item> */}


            <NavDropdown.Item id="basic-nav-dropdown"></NavDropdown.Item>
          </NavDropdown>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="inline-block rounded bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={handleShow}
          >
            Add Product
          </button>
        </Container>
      </Navbar>

      {/* addproduct--------------------------------------------------------------------------- */}
      <div>
        {/* <!-- Modal --> */}
        <Modal centered show={show} onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={values.Title}
                  onChange={handleChange}
                  placeholder="Title"
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.Title && touched.Title ? (
                  <p className="form-error">{errors.Title}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="Category"
                  value={values.Category}
                  onChange={handleChange}
                  placeholder=" Category"
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.Category && touched.Category ? (
                  <p className="form-error">{errors.Category}</p>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>ProductName</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={values.ProductName}
                  onChange={handleChange}
                  placeholder="ProductName"
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.ProductName && touched.ProductName ? (
                  <p className="form-error">{errors.ProductName}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="Number"
                  name="Price"
                  value={values.Price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.Price && touched.Price ? (
                  <p className="form-error">{errors.Price}</p>
                ) : null}
                <Form.Text className="text-muted">
                  Price should be positive only
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="Couponcode"
                  value={values.Couponcode}
                  onChange={handleChange}
                  placeholder="Couponcode"
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors.Couponcode && touched.Couponcode ? (
                  <p className="form-error">{errors.Couponcode}</p>
                ) : null}
              </Form.Group>

              <Form.Group>
                <Form.Label>ProductImage</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  // value={productImg}
                  onBlur={handleBlur}
                  autoComplete="off"
                  onChange={(e) => {
                    setProductImg(e.target.files[0]);
                  }}
                  placeholder="ProductImage"
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="warning" type="submit">
                  Submit
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* <!--Modal body--> */}
      </div>
      {/* getproduct--------------------------------------------------------- */}


<Fragment className="container" >

      <Table striped bordered hover style={{ borderCollapse:"collapse",
    margin: "auto"}}>
        <thead>
          <tr >
            <td >No</td>
            <td > ProductImage </td>
            <td > ProductName</td>
            <td > Price</td>
            <td >Category</td>
            <td >Created Date</td>
            <td >Action</td>
          </tr>
        </thead>
        <tbody >

          {cards.map((card, index) => {
            return (

              <tr  key={card.id}>
                <td >{index + 1}</td>
                <td >  <img

                  src={`/uploads/${card.ProductImage}`}
                  style={{ width: "50px", height: "50px" }}
                /></td>
                <td >{card.ProductName}</td>
                <td >{card.Price}</td>
                <td >{card.Category}
                </td>
                <td >{card.createdAt}
                </td>
                <td>
                  <Button variant="warning" onClick={(e) => { handleEdit(e, card.id) }} >Edit</Button>&nbsp;
                  &nbsp;

                  <Button
                    variant="danger"
                    onClick={() => { handleDeleteClick(card.id) }}
                  >
                    Delete
                  </Button>


                </td>

              </tr>
            )
          })}

        </tbody>
      </Table>

     
      </Fragment>

    </Fragment>
  );
}
