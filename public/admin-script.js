const socket = io("/");
let lastImg = undefined;
socket.emit("join-room","room");
socket.on("getImage",data=>{
    const image = new Image();
    image.src = data;
    if(lastImg!==undefined){
        lastImg.remove();
    }
    document.body.appendChild(image);
    lastImg = image;
});