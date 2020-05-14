const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext('2d');

let painting = false;

function init(){
    context.strokeStyle="#2c2c2c";
    context.lineWidth=2.7;
}

function startPaint(event){
    painting=true;
    context.beginPath();
    // context.moveTo(0,0);
    context.lineTo(100,100);
    context.stroke();
}

function stopPaint(){
    painting=false;
    context.closePath();
}
function onMouseMove(event){
    let x=event.offsetX+canvas.offsetLeft;
    let y=event.offsetY+canvas.offsetTop;

    if(painting){
        context.lineTo(x,y);
        context.stroke();
    }
}
if(canvas){
    init();
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPaint);
    canvas.addEventListener("mouseup",stopPaint);
    canvas.addEventListener("mouseleave",stopPaint);
    
}