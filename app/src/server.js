const cluster=require('cluster');
const os=require('os');
const http=require('http');
const app=require('./app');
const {registerSocket}=require('./sockets');
const {REDIS_URL,PORT}=require('./config');

if(cluster.isMaster){
  for(let i=0;i<os.cpus().length;i++)cluster.fork();
}else{
  const server=http.createServer(app);
  const {Server}=require('socket.io');
  const io=new Server(server,{cors:{origin:'*'}});
  const {createAdapter}=require('@socket.io/redis-adapter');
  const {createClient}=require('ioredis');
  const pub=createClient(REDIS_URL);
  const sub=pub.duplicate();
  Promise.all([pub.connect(),sub.connect()]).then(()=>{
    io.adapter(createAdapter(pub,sub));
    registerSocket(io);
    server.listen(PORT,()=>console.log("Running",PORT));
  });
}