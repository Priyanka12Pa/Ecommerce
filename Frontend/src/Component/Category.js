import React, { useEffect, useState } from 'react'
import "../index.css";
import axios from 'axios';
const Category = () => {
    const [products, setProducts] = useState([])
    async function getProducts() {
        const response = await axios.get("http://localhost:5000/getallproduct");
        setProducts(response.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const filterss = (catitem) => {
       
        const result = products.filter((currdata) => {
            if(!catitem){
                return products
            }
            return currdata.Category === catitem

        })
       
        setProducts(result)



    }
    return (
        <div>
            <h1>Lets Shop </h1>
            <div className="container-fluid-mx-2 container">
                <div className='row md-3 mx-2 overflow-auto'>
                    <div className='col-md-12' style={{ display: "flex", marginLeft: "10px" }}>

                        <button className='btn btn-warning w-100 mb-4' style={{ marginLeft: "50px" }} onClick={() => filterss('Men')}>Men</button>
                        <button className='btn btn-warning w-100 mb-4' style={{ marginLeft: "50px" }} onClick={() => filterss('Women')}>Women</button>
                        <button className='btn btn-warning w-100 mb-4' style={{ marginLeft: "50px" }} onClick={() => filterss('Kids')}>Kids</button>
                        <button className='btn btn-warning w-100 mb-4' style={{ marginLeft: "50px" }} onClick={() => filterss('Accesories')}>Accesories</button>


                    </div>

                    <div className='col-md-9 ' >
                        <div className='row'>
                            <div className='col-md-3'style={{display:"flex",marginTop:"50px"}}>


                                {

                                    products.map(product => {
                                        console.log(product)

                                        return (
                                           

                                            <div key={product.id} className='bg-white shadow-md rounded-lg px-10 py-10' >
                                                   
                                                <img src={`/uploads/${product.ProductImage}`} alt={product.Title} className='rounded-md h-48' />
                                                <div className='mt-4'>
                                                    <h1 className='text-lg uppercase font-bold'>{product.Title}</h1>
                                                    <p className='mt-2 text-gray-600 text-sm'>{product.ProductName.slice(0, 40)}...</p>
                                                    <p className='mt-2 text-gray-600'>Price: {product.Price}</p>
                                                </div>
                                                <div className='mt-6 flex justify-between items-center'>

                                                </div>

                                                </div>
                                    
                                        )
                                    }
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Category