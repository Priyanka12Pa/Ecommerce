import { useState, useEffect, useContext, Fragment } from 'react'
import { CartContext } from './CartContext.js'
import Cart from './Cart.js'
import axios from 'axios';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51L7wPHSAFhwExXj72I7kFLGP13KlZyZMs80iqe4jOoc3mnXPqqCaPRfpPxJsNSWrKtXaJ1bSHd5VIkwdNmL0lWq200tgcve7jR');
export default function Product() {




  const nav = useNavigate();
  const auth = localStorage.getItem("Role");
  const Logout = () => {
    localStorage.clear();
    nav("/registera");
  };


  const [showModal, setshowModal] = useState(false);
  const [products, setProducts] = useState([])
  const { cartItems, addToCart } = useContext(CartContext)

  const toggle = () => {
    setshowModal(!showModal);
  };

  async function getProducts() {
    const response = await axios.get("http://localhost:5000/getallproduct");
    setProducts(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Fragment>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className="text-3xl font-bold underline">
          Pfour.in
        </Navbar.Brand>

        <div className="hellos"  style={{color:"black"}}>
          <FontAwesomeIcon className="j" icon={faUser} />
        </div>
        <NavDropdown title="Profile" id="basic-nav-dropdown" style={{color:"black"}}>
          <li>
            {" "}
            {auth ? (
              <Link onClick={Logout} to="/registera"  style={{color:"black"}}>
                Logout
              </Link>
            ) : (
              <Link to="/registera" style={{color:"black"}} >Logout</Link>
            )}{" "}
          </li>

        

          <NavDropdown.Item id="basic-nav-dropdown"></NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
    <div className='flex flex-col justify-center bg-gray-100 '>
      <div className='flex justify-between items-center px-20 py-5 '>
        <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>
        {!showModal && <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 '
          onClick={toggle}
        >Cart ({cartItems.length})</button>}
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10  '>
        {
          products.map(product => (
            <div key={product.id} className='bg-white d-flex gap-4 shadow-md rounded-lg px-10 py-10'>

              <img src={`/uploads/${product.ProductImage}`} alt={product.Title} className='rounded-md h-48 w-48 object-fit-cover' />
              <div className='d-flex flex-col gap-2'>
              <div className='mt-4 text-start'>
                <h1 className='text-lg uppercase font-bold'>{product.Title}</h1>
                <p className='mt-2 text-gray-600 text-sm'>{product.ProductName.slice(0, 40)}...</p>
                <p className='mt-2 text-gray-600'>Price: {product.Price}</p>
              </div>
              <div className='flex justify-between items-center'>
                <button className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                  onClick={() => {
                    addToCart(product)
                  }
                  }
                >Add to cart</button>
                  
             
              </div>
              </div>
            </div>
          ))
        }
      </div>
      <Elements stripe={stripePromise}>
      <Cart showModal={showModal} toggle={toggle} />
  </Elements>
     
    </div>
    </Fragment>
  )
}
