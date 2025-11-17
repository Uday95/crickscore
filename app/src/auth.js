const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

exports.generateToken = u => jwt.sign({ id: u.id }, JWT_SECRET, { expiresIn: '1h' });

exports.authenticate = (req,res,next)=>{
  const h=req.headers['authorization'];
  if(!h)return res.status(401).json({error:"Missing"});
  try{
    req.user=jwt.verify(h.split(' ')[1], JWT_SECRET);
    next();
  }catch(e){res.status(401).json({error:"Invalid"});}
};