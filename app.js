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

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number,
})

const Product = mongoose.model('Product', productSchema)

app.get(`${api}/products`,(req, res)=>{
    const product = {
        id:1,
        name: 'hairdresser',
        image: 'some_url'
    }
    res.send(product)
})

app.post(`${api}/products`,(req, res)=>{
    const product = new Product({
        name: req.body.name,
        Image: req.body.image,
        countInStock: req.body.countInStock, 
    })
    
    product.save().then((craetedProduct => {
        res.status(201).json(craetedProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false,
        })
    })
    // res.send(newProduct)
})

mongoose.connect(uri, {

})
.then(()=>{
    console.log('Database connection is ready');
})
.catch((err) => {
    console.log(err);
    
})
app.listen(3000, ()=>{
    console.log('server has started now at http://localhost:3000');
    console.log(api);

})