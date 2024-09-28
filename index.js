//import dotenv
require('dotenv').config()//loads the environment
//import express
const express = require ('express')

//import cors
const cors = require ('cors')

//import router
const router = require('./routes')

//import mongodb connection file
require('./connection')

 

//create server
const pfserver = express()

//to connect with frontend
pfserver.use(cors())

//parse json formate -json()
pfserver.use(express.json())

//router
pfserver.use(router)

//static
pfserver.use('/uploads',express.static('./uploads'))

//port
const PORT=4000 || process.env.PORT

pfserver.listen(PORT,()=>{
    console.log(`server running syccessfully at port ${PORT}`);
})

//logic

/* pfserver.get('/get',(req,res)=>{
    res.send('get request received')
})

pfserver.put('/get',(req,res)=>{
    res.put('put request received');
})

pfserver.delete('/delete',(req,res)=>{
    res.delete('delete request received');
}) */