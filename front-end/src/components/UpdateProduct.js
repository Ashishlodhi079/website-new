import React, { useEffect } from "react";
import {useState} from 'react';
import{useParams, useNavigate} from 'react-router-dom';


const UpdateProduct=()=>{

const[name,setName] = useState('');
const[price,setPrice] = useState('');
const[category,setCategory] = useState('');
const[brand,setBrand] = useState('');


const params = useParams();
const navigate = useNavigate();

useEffect(()=>{

    getproductdata();
},[])

const getproductdata= async ()=>{
    
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json()
    
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setBrand(result.brand);

}

const updateProduct=async ()=>{

    let result = await fetch(`http://localhost:5000/product/${params.id}`,
        {
            method:'PUT',
            body:JSON.stringify({name,price,category,brand}),
            headers:{
                "Content-Type":"application/json"
            }
        }
    )

    result = await result.json()

    navigate('/');
    console.warn(result);
}

    return(
        <div className='Loginform'><h1>Update Product</h1>
        <input type='text' className='Formtext' value={name} 
       onChange={(e)=>setName(e.target.value)} placeholder='enter name' />

        <input type='text' className='Formtext'
         value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder='enter price' />
 

        <input type='text' className='Formtext' value={category} 
        onChange={(e)=>setCategory(e.target.value)}   placeholder='enter category' />


        <input type='text' className='Formtext' value={brand} 
        onChange={(e)=>setBrand(e.target.value)}  placeholder='enter company' />


        <button type="button" onClick={updateProduct}  className="Formbutton">Submit</button>
    </div>
    )
}
export default UpdateProduct;