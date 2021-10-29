const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;



const particlesArray = [];


class particle{
  constructor(){
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.r = 3;
    this.speedX = Math.random() * 5 - 2.5;
    this.speedY = Math.random() * 5 - 2.5;
  }
  draw(){
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    

  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < 0 || this.x > window.innerWidth){
      this.speedX = -this.speedX
    }
    if(this.y < 0 || this.y > window.innerHeight){
      this.speedY = -this.speedY
    }

  }
}

function pushParticle(n){
  for(var i = 0; i < n; i++){
    particlesArray.push(new particle);
    
  }
  console.log(particlesArray)
}

pushParticle(200);

function animate(){
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  for(var i = 0; i < particlesArray.length; i++){
    particlesArray[i].draw();
    particlesArray[i].update();
    for(let j = i; j < particlesArray.length; j++){
      var xx = particlesArray[i].x - particlesArray[j].x
      var yy = particlesArray[i].y - particlesArray[j].y
      var distance = Math.sqrt(xx*xx + yy*yy)
      if(distance < 100){
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)"
          ctx.beginPath()
          ctx.lineWidth = 0.2
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
          ctx.stroke()
          
      }

  }
  }
  

  window.requestAnimationFrame(animate);
}

animate();






//record
var videoStream = canvas.captureStream(60); 
// the parameter is the desired framerate, see the MDN doc for more info
var mediaRecorder = new MediaRecorder(videoStream);
var chunks = [];

mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
};

mediaRecorder.onstop = function(e) {
  var blob = new Blob(chunks, { 'type' : 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info
   chunks = [];
   var videoURL = URL.createObjectURL(blob);
  
   const a = document.createElement("a");
                a.href = videoURL;
                a.download = "recording.mp4";
                a.click();
                URL.revokeObjectURL(videoURL);
 };

 mediaRecorder.start();
 setTimeout(function (){ mediaRecorder.stop(); }, 50000);

 let image = "";
 setTimeout(function (){
     image = canvas.toDataURL('image/png'); 
     console.log(image);
}, 5000);