const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
cPick = document.querySelector("#color-picker"),
clearC = document.querySelector(".clear-canvas"),
saveC = document.querySelector(".save-img")

ctx = canvas.getContext("2d");
let prevMouseX,prevMouseY,snapshot,
isDrawing = false;
slectedTool="brush",
brushWidth=5;
selectedColor ="#000";

window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
});

const drawRect =(e)=>{
    if(fillColor.checked){
        ctx.fillRect(e.offsetX,e.offsetY,prevMouseX - e.offsetX,prevMouseY - e.offsetY );
    }
    ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX - e.offsetX,prevMouseY - e.offsetY );
}

const drawCircle =(e)=>{
    ctx.beginPath();
    let redius = Math.sqrt(Math.pow((prevMouseX-e.offsetX),2)+Math.pow((prevMouseY-e.offsetY),2));
    ctx.arc(prevMouseX,prevMouseY,redius,0,2* Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTri=(e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.lineTo(prevMouseX*2 - e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.stroke();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}
const drawLine=(e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}

const startDraw = (e) =>{
    isDrawing = true;
    prevMouseX=e.offsetX;
    prevMouseY=e.offsetY;
    ctx.beginPath();
    ctx.lineWidth=brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
}

const drawing =(e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot,0,0);

    if(slectedTool=== "brush" || slectedTool=== "eraser"){
        ctx.strokeStyle=slectedTool=== "eraser" ?"#fff":selectedColor;
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }else if(slectedTool==="rectangle"){
        drawRect(e);
    }
    else if(slectedTool==="circle"){
        drawCircle(e);
    }
    else if(slectedTool==="triangle"){
        drawTri(e);
    }
    else if(slectedTool==="Line"){
        drawLine(e);
    }


    }
   

toolBtns.forEach(btn =>{
    btn.addEventListener("click",()=>{
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        slectedTool =btn.id;
        console.log(slectedTool);
    })
});

sizeSlider.addEventListener("change",()=>brushWidth=sizeSlider.value);
colorBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor=window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

cPick.addEventListener("change",()=>{
    cPick.parentElement.style.background = cPick.value;
    cPick.parentElement.click();
})


clearC.addEventListener("click",()=>{
    alert("Are you sure you want to clear all?");
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

saveC.addEventListener("click",()=>{
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href=canvas.toDataURL();
    link.click();

})


canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",()=>isDrawing=false);



