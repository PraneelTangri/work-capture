const socket = io("/");
socket.emit("join-room","room");
const btn = document.querySelector('#btn');
btn.addEventListener('click', (event) => {
    navigator.mediaDevices.getDisplayMedia({video: {mediaSource:'screen'}})
    .then(gotMedia)
    .catch(error => console.error('getUserMedia() error:', error));
    event.preventDefault()
});
// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function gotMedia(mediaStream) {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    const canvas = document.querySelector('#screenshot');
    const video = document.createElement('video');
    const myImg = document.getElementById("myImg");
    let lastImg = undefined;
    video.autoplay = true;
    video.srcObject = mediaStream;
    video.onplay = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        setInterval(async ()=>{
            canvas.getContext('2d').drawImage(video, 0, 0);
            socket.emit("serverImage",canvas.toDataURL("image/png"));
            // if(lastImg!==undefined){
            //     lastImg.remove();
            // }
            // lastImg = image;
            // document.body.appendChild(image);
        },2000);
    };
}