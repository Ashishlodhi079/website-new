import React ,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';


const Products=()=>{

    const [products,setProducts] = useState([]);

    useEffect(()=>{

        getProducts();

    },[])

    const getProducts=async ()=>{

        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    
    }
    //console.warn('products',products)

    const deleteproduct=async (id)=>{
     
     let result = await fetch(`http://localhost:5000/product/${id}`,{
        method:'delete'
     }) 
     result = await result.json();
     getProducts();
     console.warn(result);

     if(result){
        alert('record is deleted');
     }

    }

    const Searchdata=async (event)=>{

        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getProducts();
        }

    }

    return(
        <div className="List-header"><h1>Product List</h1>
        <input type="text" placeholder="Search..." className="Search-Product" onChange={Searchdata} />
        <ul>
             <li>Sr No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Brand</li>
            <li>Option</li>

        </ul>
{
  products.length > 0 ? products.map((item,index)=>
    <ul>
    <li>{index+1}</li>
   <li>{item.name}</li>
   <li>{item.price}</li>
   <li>{item.category}</li>
   <li>{item.brand}</li>
   <li><button onClick={()=>deleteproduct(item._id)}>Delete</button>
   <Link to={"/update/"+item._id}>Update</Link>
   </li>
   

</ul>
  )  : <h2>No result found</h2>
}
        </div>
    );
}

export default Products;