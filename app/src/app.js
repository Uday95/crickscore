const express=require('express');
const bodyParser=require('body-parser');
const {authenticate}=require('./auth');
const pool=require('./db');
const app=express();
app.use(bodyParser.json());

app.get('/health',(req,res)=>res.json({ok:true}));

app.post('/auth/signup',async(req,res)=>{
  const [r]=await pool.query('INSERT INTO users (email,password) VALUES (?,?)',[req.body.email,req.body.password]);
  res.json({id:r.insertId});
});

app.get('/matches',authenticate,async(req,res)=>{
  const [rows]=await pool.query('SELECT * FROM matches LIMIT 50');
  res.json(rows);
});

module.exports=app;