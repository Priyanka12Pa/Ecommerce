import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Invoice.css"

const Invoice = () => {
  let {id} = useParams();
  console.log(id,"ids")
    const [invoice,setInvoice]=useState([]);
    console.log(invoice,"invoice")
    async function getProducts() {
        const response = await axios.get(`http://localhost:5000/getinvoice/${id}`);
        console.log(id,"id invoice")
        console.log(response,"res")
        setInvoice(response.data)
      }
    
      useEffect(() => {
        getProducts()
      }, [])
   
     
  return (
  <div className='hello' style={{marginLeft:"400px",marginRight:"400px" ,marginTop:"100px"}}>
    
      <header>

<h1> INVOICE </h1>        
{/* <address>
  <p>  </p>
  <p> #429, First Floor </p>
  <p> Bettadasanapura </p>
  <p> +918660876889 </p>
</address> */}

<span>
  <img alt="Pfour.in" src="https://logos.textgiraffe.com/logos/logo-name/Priyanka-designstyle-smoothie-m.png" className="rounded float-right align-top" />          
</span>
        
</header>
      <body>
    <article>
      <address>
        <p> Pfour.in </p>            
      </address>        
    <div>
   
        
      <table className="firstTable">
      
        <tr>
          <th><span >Invoice #</span></th>
          <td><span >{invoice.IDs}</span></td>
        </tr>
        
      <tr>
          <th><span >Date</span></th>
          <td><span >January 1, 2012</span></td>
        </tr>
     <tr>
          <th><span >Amount Due</span></th>
          <td><span id="prefix" >$</span><span>{invoice.Price}</span></td>
        </tr>
      </table>

      <table className="secondTable">
        <thead>
          <tr>
            <th><span >Item</span></th>
            <th><span >Description</span></th>
          
            <th><span >Price</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a class="cut">-</a><span >Front End Consultation</span></td>
            <td><span >Experience Review</span></td>
            {/* <td><span data-prefix>$</span><span >150.00</span></td>
            <td><span >4</span></td> */}
            <td><span data-prefix>$</span><span>{invoice.Price}</span></td>
          </tr>
        </tbody>
      </table>
      <table className="firstTable">
        <tr>
          <th><span >Total</span></th>
          <td><span data-prefix>$</span><span>{invoice.Price}</span></td>
        </tr>
        {/* <tr>
          <th><span >Amount Paid</span></th>
          <td><span data-prefix>$</span><span >0.00</span></td>
        </tr> */}
        <tr>
          <th><span >Balance Due</span></th>
          <td><span data-prefix>$</span><span>{invoice.Price}</span></td>
        </tr>
      </table>   
          
      
      </div>      
       
    </article>
    </body>
    <aside>
      <h1 id="notes">Additional Notes</h1>
      <div >
        <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
      </div>
    </aside>
    </div>
   
  )
 
}
export default Invoice