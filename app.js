const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

//middleware 
app.use(bodyParser.json())
app.use(morgan('tiny'))


require('dotenv/config')
const api = process.env.API_URL
const uri = process.env.MONGODB_URI

app.get(`${api}/products`,(req, res)=>{
    const product = {
        id:1,
        name: 'hairdresser',
        image: 'some_url'
    }
    res.send(product)
})

app.post(`${api}/products`,(req, res)=>{
    const newProduct = req.body
    console.log(newProduct);
    
    res.send(newProduct)
})

mongoose.connect(uri)

app.listen(3000, ()=>{
    console.log('server has started now at http://localhost:3000');
    console.log(api);

})