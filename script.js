
function changeColor(event){
    if(event.type=='mouseover' && !mouseDown) return
    this.style['background-color'] = "black";

}

function sliderChange(event){
    let sliderVal = document.querySelector('#slider-value');
    sliderVal.innerText = this.value;
    drawGrid(this.value);
}

function drawGrid(size=16){
const sketch = document.querySelector(".sketch");
sketch.textContent='';
sketch.style.cssText += `grid-template-columns: repeat(${size},1fr); grid-template-rows: repeat(${size},1fr);`;

let div = null;
for(let i =0; i<size; i++){
    for(let j = 0; j<size; j++){
        div = document.createElement('div');
        div.classList.add('sketch-cell');
        div.addEventListener('mouseover', changeColor);
        div.addEventListener('mousedown', changeColor);
        sketch.appendChild(div);
    }
}
}


let mouseDown = false;
document.body.addEventListener('mousedown', ()=> mouseDown=true);
document.body.addEventListener('mouseup', ()=> mouseDown=false);

let slider = document.querySelector('#slider');
slider.addEventListener('input', sliderChange);
slider.addEventListener('change', sliderChange);

drawGrid();

