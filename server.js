const express =require("express");




const app=express();
const server=require("http").createServer(app);
app.use(express.static("public"));
server.listen(3000,function(){
    console.log("server is running on 3000 port!");
})

const io=require("socket.io")(server);
io.on('connection',(socket)=>{
     console.log("connected");
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
      
    })

})