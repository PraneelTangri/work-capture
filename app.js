const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server);
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/room",(req,res)=>{
    if(req.query.type==="WORKER"){
        res.render("worker");
    }else{
        res.render("admin");
    }
});
io.on("connection",socket=>{
    socket.on("join-room",roomId=>{
        socket.join(roomId);
        socket.on("serverImage",image=>{
            socket.to(roomId).broadcast.emit("getImage",image);
        });
    });
});
server.listen(process.env.PORT || 3000);