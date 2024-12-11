import React,{useEffect, useState} from "react";
import {useNavigate } from 'react-router-dom'

const Signup=()=>{

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
     
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
     
    const collectData=async ()=>{

        console.warn(name,email,password);

        let result = await fetch('http://localhost:5000/register',{
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-type':'Application/json'
            },
        });

         result = await result.json()
         console.warn(result)
         localStorage.setItem('user',JSON.stringify(result));

         if(result){
            navigate('/')
         }
    }

    return(
        <div className="Signupform">
<h1>Signup Form</h1>
<input type="text" className="Formtext" value={name} onChange={(e)=>setName(e.target.value)} placeholder="name" />

<input type="text" className="Formtext" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" />

<input type="text" className="Formtext" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="password" />

<button type="button" onClick={collectData} className="Formbutton">Sign Up</button>
        </div>
    )
}
export default Signup;