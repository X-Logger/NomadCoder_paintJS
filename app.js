const canvas = document.querySelector('#jsCanvas');
const context = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = '#2c2c2c';


let painting = false;
let filling = false;

function init() {
    canvas.width = 700;
    canvas.height = 700;
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);

    context.strokeStyle = INITIAL_COLOR;
    context.fillStyle=INITIAL_COLOR;
    context.lineWidth = 2.7;
   

    if(canvas) {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPaint);
        canvas.addEventListener("mouseup", stopPaint);
        canvas.addEventListener("mouseleave", stopPaint);
        canvas.addEventListener("contextmenu",handleCM);
    }
    
    if (colors) {
        Array
            .from(colors)
            .forEach(element => element.addEventListener("click", handleColorClick));
    }
    if (range) {
        range.addEventListener("input", handleRangeClick);
    }
    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }
    if(saveBtn){
        saveBtn.addEventListener("click",handleSaveClick);
    }
}

function startPaint() {
    painting = true;

    if (filling) {
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

}

function stopPaint() {
    painting = false;
    context.closePath();
}
function onMouseMove(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (painting && !filling) {
        context.lineTo(x, y);
        context.stroke();
    } else {
        context.beginPath();
        context.moveTo(x, y);
    }
}
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle=color;
}
function handleRangeClick(event) {
    // const size = range.value;
    const size = event.target.value;
    context.lineWidth = size;
}

function handleModeClick(event) {
    const text = event.target.innerText;
    if (text === 'FILL') {
        event.target.innerText = 'PAINT'
        filling = true;
    } else {
        event.target.innerText = 'FILL'
        filling = false;
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    //파일 변환
    const image = canvas.toDataURL('iamge/jpeg');

    //a 태그로 링크를 생성하고
    const link = document.createElement("a");
    //링크 주소를 할당한 다음
    link.href=image;
    //해당 링크를 다운 받도록 지정 (파일 이름까지)
    link.download = "PAINTJS";
    //링크가 클릭됨을 임의로 지정 -> 저장 됨
    link.click();
}

init();