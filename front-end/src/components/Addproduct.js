import react from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Addproduct=()=>{

    const[name,setName] = useState('');
    const[price,setPrice] = useState('');
    const[category,setCategory] = useState('');
    const[brand,setBrand] = useState('');
    const[error,setError] = useState(false);

    const navigate = useNavigate();

    const add= async ()=>{

        console.warn(name,price,category,brand);

        const userid = JSON.parse(localStorage.getItem('user'))._id;
        
        console.warn(!name);
        if(!name || !price || !category || !brand){

            setError(true);
            return false;
        }
      

       // console.warn(userid);
          
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,brand,userid}),
            headers:{
                'content-type':'Application/json'
            }

        });

        result = await result.json();
        console.warn(result);
        navigate('/');

    }

    return(
        <div className='Loginform'><h1>Add Product</h1>
        <input type='text' className='Formtext' value={name} 
        onChange={(e)=>setName(e.target.value)} placeholder='enter name' />
        {error && !name && <span className='form-error'>Enter valid name</span> } 
        <input type='text' className='Formtext'
         value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder='enter price' />
         {error && !price && <span className='form-error'>Enter valid price</span> } 

        <input type='text' className='Formtext' value={category} 
        onChange={(e)=>setCategory(e.target.value)}   placeholder='enter category' />
 {error && !category && <span className='form-error'>Enter valid category</span> } 

        <input type='text' className='Formtext' value={brand} 
        onChange={(e)=>setBrand(e.target.value)}  placeholder='enter company' />
         {error && !brand && <span className='form-error'>Enter valid company</span> } 

        <button type="button" onClick={add}  className="Formbutton">Submit</button>
    </div>
    )

}
export default Addproduct;