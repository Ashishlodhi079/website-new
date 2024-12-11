const express = require('express');
const app  = express();
require ('./db/config');
const cors = require('cors');
const User = require('./db/User');
const Product = require('./db/Product');

app.use(express.json())
app.use(cors());

app.post('/register',async (req,resp)=>{

    const user = new User(req.body);
    result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
    

})

app.post('/login',async (req,resp)=>{

   

    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select('-password');
        if(user){
            resp.send(user);
           }
           else{
            resp.send({result: 'user not found'});
           }
    }
    else{
       resp.send({result: 'enter correct details'});
    }

})

app.post('/add-product',async (req,resp)=>{

    const product = new Product(req.body);
    result = await product.save();
    resp.send(result);

})

app.get('/products',async (req,resp)=>{

    let products = await Product.find();
    if(products.length>0){
       
        resp.send(products);
    }else{
        resp.send({result:'products not found'});
    }

})

app.delete('/product/:id',async (req,resp)=>{

    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result);

})

app.get('/product/:id', async (req,resp)=>{

    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"data not found"});
    }

})

app.put('/product/:id',async (req,resp)=>{

    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set : req.body}
    )
    resp.send(result);

})

app.get('/search/:key', async (req,resp)=>{

    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {brand:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    })
    resp.send(result);

})

app.listen(5000);

