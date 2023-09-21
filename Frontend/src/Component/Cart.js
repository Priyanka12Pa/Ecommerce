import PropTypes from 'prop-types'
import { useContext, useState, useEffect } from 'react'
import { CartContext } from './CartContext.js'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from "react-toastify";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';
import Payment from './Payment';
import { Navigate, useNavigate } from "react-router-dom";

export default function Cart({ showModal, toggle }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
  console.log(cartItems,"fsjdk")
  const price = cartItems.Price
  const [open, setOpen] = useState(false);
  const [IDss, setId] = useState();
  const [Pricee, setPrice] = useState();
  const [currencyy, setCurrency] = useState();

  const openCardElement = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false)
  }
  const stripe = useStripe();
  const elements = useElements();
console.log(getCartTotal(),"total")
  const handlePayment = async () => {
    const cardElement = elements.getElement("card");
    const url = 'http://localhost:5000/payment';
    const data = { 'amount': getCartTotal() };
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log(responseData, "response")
    const IDs = responseData.clientSecret.id
    const Price = responseData.clientSecret.amount
    const currency = responseData.clientSecret.currency
console.log(IDs)
    setId(IDs);
    setPrice(Price);
    setCurrency(currency);
    if (responseData) {
      const url = 'http://localhost:5000/invoice';
      const data = {
        'IDs': IDs,
        'Price': Price,
        'currency': currency
      };
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responsedata = await response.json();
      console.log(responsedata,"invoice")
    }
 console.log(IDss,"sdff")
      toast.success("payment successfull")
      navigate(`/invoice/${IDs}`);
     
    




    const { clientSecret } = responseData;

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    // const {error}= await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: paymentMethodReq.paymentMethod.id,

    // });

  }
  //   const handleinvoice = async () => {

  //     const url = 'http://localhost:5000/invoice';
  //     const data = { 'id': IDs ,
  //   'price':  Price,
  // 'currency': currency};
  //     const response = await fetch(url, {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //     });
  //     const responseData = await response.json();
  //   }



  return (
    showModal && (
      <div className="flex-col flex items-center fixed inset-0 left-1/4 bg-white dark:bg-black gap-8  p-10  text-black dark:text-white font-normal uppercase ml-500px text-sm overflow-auto">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="absolute right-16 top-10 ml-500">
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div className="flex justify-between items-center" key={item.id}>
              <div className="flex gap-4">
                <img src={`/uploads/${item.ProductImage}`} alt={item.Title} className="rounded-md h-24" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{item.Title}</h1>
                  <p className="text-gray-600">Price: {item.Price}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    addToCart(item)
                  }}
                >
                  +
                </button>
                <p>{item.Couponcode}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    removeFromCart(item)
                  }}
                >
                  -
                </button>

              </div>
            </div>
          ))}
        </div>
        {
          cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-lg font-bold">Total: {getCartTotal()}</h1>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  clearCart()
                }}
              >
                Clear cart
              </button>
              <br></br>
              
            </div>
          ) : (
            <h1 className="text-lg font-bold">Your cart is empty</h1>
          )
        }
        <Button variant="warning" onClick={openCardElement} >Buy now</Button>
              <Payment open={open} handleClose={handleClose} handlePayment={handlePayment} />

      </div>
    )
  )


  Cart.propTypes = {
    showModal: PropTypes.bool,
    toggle: PropTypes.func
  }
}