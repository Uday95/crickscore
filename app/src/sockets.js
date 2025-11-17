exports.registerSocket = io => {
  io.on('connection', s=>{
    s.on('joinMatch', ({matchId})=>s.join(`match:${matchId}`));
    s.on('scoreEvent', ({matchId,event})=>{
      io.to(`match:${matchId}`).emit('scoreUpdate',{event,matchId,ts:Date.now()});
    });
  });
};