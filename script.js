function getRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.random();
    return [r, g, b, a];
}


function changeCellColor(event) {
    if (event.type == 'mouseover' && !mouseDown) return

    if (currentMode == 'color mode') {
        this.style['background-color'] = colorPicker.value;
        this.style['border-color'] = colorPicker.value;
    }
    else if (currentMode == 'random mode') {
        let color = getRandomColor();
        this.style['background-color'] = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
        this.style['border-color'] = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;

    }
    else if (currentMode == 'erase mode') {
        this.style['background-color'] = 'white';
        this.style['border-color'] = 'black';
    }
}

function sliderChange(event) {
    let sliderVal = document.querySelector('#slider-value');
    sliderVal.innerText = this.value;
    drawGrid(this.value);
}

function toggleButtons(button, modeChosen) {
    modeChosen.style['background-color'] = "white";
    modeChosen.style['color'] = '#2d2d2d';
    if (button === modeChosen) {
        return;
    }
    button.style['background-color'] = '#2d2d2d';
    button.style['color'] = 'white';
}


function buttonClicked(event) {

    if (this.value == 'clear mode') {
        drawGrid(slider.value);
        return;
    }
    
    currentMode = this.value;
    buttons.forEach((button) => toggleButtons(button, this))
}



function drawGrid(size = 16) {
    const sketch = document.querySelector(".sketch");
    sketch.textContent = '';
    sketch.style.cssText += `grid-template-columns: repeat(${size},1fr); grid-template-rows: repeat(${size},1fr);`;

    let div = null;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            div = document.createElement('div');
            div.classList.add('sketch-cell');
            div.addEventListener('mouseover', changeCellColor);
            div.addEventListener('mousedown', changeCellColor);
            sketch.appendChild(div);
        }
    }
}


let mouseDown = false;
document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

let slider = document.querySelector('#slider');
slider.addEventListener('input', sliderChange);
slider.addEventListener('change', sliderChange);

let currentMode = 'color mode';
let colorPicker = document.querySelector('#color-picker');

let buttons = document.querySelectorAll('button');
buttons.forEach(function (button) {
    button.addEventListener('click', buttonClicked);
})

drawGrid();

