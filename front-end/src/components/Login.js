import React, { useEffect }  from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login=()=>{

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
     const navigate = useNavigate();
 
     useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
     })

    const login= async ()=>{
        console.warn(email,password);

        let result = await fetch ("http://localhost:5000/login",{
            method:'Post',
            body:JSON.stringify({email,password}),
            headers:{
                'content-type':'Application/json'
            }
        })

        result = await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
           navigate('/')
        }else{
            alert('plz enter correct details');
        }
    }

    return(
        <div className='Loginform'><h1>Login Form</h1>
            <input type='text' className='Formtext' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter email' />
            <input type='text' className='Formtext' value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='enter password' />
            <button type="button" onClick={login} className="Formbutton">Login</button>
        </div>
    )
}

export default Login;