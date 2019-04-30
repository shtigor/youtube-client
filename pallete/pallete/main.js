const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const figureRowCount = 3;
const figureColumnCount = 3;
const figureHeight = 150;
const figureWidth = 150;
const figurePadding = 10;
const figureOffsetTop = 0;
const figureOffsetLeft = 0;
let bucketSelect = false;
let pickerSelect = false;
let transformSelect = false;
let moveSelect = false;
let activeFigure;

// COLORS
let currentColor = '';
let prevColor = '';
let redColor = '';
let blueColor = '';


const figures = [
  [
    { x: 0, y: 0, color: '#cccccc', shape: 'rec', active: false }, 
    { x: 0, y: 0, color: '#bababa', shape: 'rec', active: false },
    { x: 0, y: 0, color: '#c7c7c7', shape: 'circle', active: false }
  ],
  [
    { x: 0, y: 0, color: '#bdbdbd', shape: 'rec', active: false },
    { x: 0, y: 0, color: '#cfcfcf', shape: 'rec', active: false },
    { x: 0, y: 0, color: '#c4c4c4', shape: 'rec', active: false }
  ],
  [
    { x: 0, y: 0, color: '#bfbfbf', shape: 'rec', active: false },
    { x: 0, y: 0, color: '#c9c9c9', shape: 'rec', active: false },
    { x: 0, y: 0, color: '#cccccc', shape: 'rec', active: false }
  ]
]
// for (var c = 0; c < figureColumnCount; c++) {
//   figures[c] = []
//   for (var r = 0; r < figureRowCount; r++) {
//     figures[c][r] = {x: 0, y: 0, color: "lightgreen", shape: "rec", active: false, modified: false}
//   }
// }


document.getElementsByClassName('colors__ul')[0].addEventListener('click', changeColor, false);

document.getElementsByClassName('pallete__ul--bucket')[0].addEventListener('click', selectBucket, false);
document.body.addEventListener('keypress', (event) => {
  if (event.code === 'KeyB') {
    bucketSelect = true;
    pickerSelect = false;
    transformSelect = false;
    moveSelect = false;
  }
}, false);
canvas.addEventListener('click', onClick, false);

document.getElementsByClassName('pallete__ul--color')[0].addEventListener('click', selectColorPicker, false);
document.body.addEventListener('keypress', (event) => {
  if (event.code === 'KeyC') {
    bucketSelect = false;
    pickerSelect = true;
    transformSelect = false;
    moveSelect = false;
  }
}, false);
canvas.addEventListener('click', pickerColor, false);

document.getElementsByClassName('pallete__ul--transform')[0].addEventListener('click', selectTransform, false);
document.body.addEventListener('keypress', (event) => {
  if (event.code === 'KeyT') {
    bucketSelect = false;
    pickerSelect = false;
    transformSelect = true;
    moveSelect = false;
  }
}, false);
canvas.addEventListener('click', changeFigure, false);

document.getElementsByClassName('pallete__ul--move')[0].addEventListener('click', selectMove, false);
document.body.addEventListener('keypress', (event) => {
  if (event.code === 'KeyM') {
    bucketSelect = false;
    pickerSelect = false;
    transformSelect = false;
    moveSelect = true;
  }
}, false);
canvas.addEventListener("mousedown", moveFigure, false);


function drawBasic() {
  for (let c = 0; c < figureColumnCount; c++) {
    for (var r = 0; r < figureRowCount; r++) {
      var figureX = (c*(figureWidth+figurePadding))+figureOffsetLeft;
      var figureY = (r*(figureHeight+figurePadding))+figureOffsetTop;
      if (figures[c][r].active == false) {
        figures[c][r].x = figureX
        figures[c][r].y = figureY
      }
        
      ctx.beginPath();
      if (figures[c][r].shape == "rec") 
      {
        ctx.fillStyle = figures[c][r].color
        if (figures[c][r].status == false) {
          ctx.fillRect(figureX, figureY, figureWidth, figureHeight)
        } else {
          ctx.fillRect(figures[c][r].x, figures[c][r].y, figureWidth, figureHeight)
        }
      } else if (figures[c][r].shape == "circle") {
        ctx.fillStyle = figures[c][r].color
        if (figures[c][r].status == false) {
          ctx.arc(figureX+75, figureY+75, 75, 0, 2 * Math.PI)
        } else {
          ctx.arc(figures[c][r].x+75, figures[c][r].y+75, 75, 0, 2 * Math.PI)
        }
        
        ctx.fill();
      }  
      ctx.fill();
    }
  }
}


function selectBucket(event) {
  if (event) {
    bucketSelect = true
    pickerSelect = false
    transformSelect = false
    moveSelect = false
  }
}

function selectTransform(event) {
  if (event) {
    transformSelect = true
    bucketSelect = false
    pickerSelect = false
    moveSelect = false
  }
}

function selectColorPicker(event) {
  if (event) {
    pickerSelect = true
    bucketSelect = false
    transformSelect = false
    moveSelect = false
  }
}

function selectMove(event) {
  if (event) {
    moveSelect = true
    pickerSelect = false
    bucketSelect = false
    transformSelect = false
  }
}


function onClick(event) {
  if (bucketSelect) {
    var mx = event.layerX
    var my = event.layerY
    // console.log(mx + " " + my)
    for (var c = 0; c < figureColumnCount; c++) {
      for (var r = 0; r < figureRowCount; r++) {
        if ((mx >= figures[c][r].x && mx <= figures[c][r].x + figureWidth) && (my >= figures[c][r].y && my <= figures[c][r].y + figureHeight)) {
          figures[c][r].color = currentColor
        }
      }
    }
  }  
}


function changeFigure(event) {
  if (transformSelect) {

    var x = event.layerX
    var y = event.layerY

    for (var c = 0; c < figureColumnCount; c++) {
      for (var r = 0; r < figureRowCount; r++) {
        if ((x >= figures[c][r].x && x <= figures[c][r].x + figureHeight + figurePadding) && (y >= figures[c][r].y && y <= figures[c][r].y + figureHeight + figurePadding)) {
          if (figures[c][r].shape == "rec") {
            figures[c][r].shape = "circle"
          } else if (figures[c][r].shape == "circle") {
            figures[c][r].shape = "rec"
          }
        }
      }
    }
  }
}


function pickerColor(event) {
  if (pickerSelect) {
  
  var x = event.layerX
  var y = event.layerY

  var pixel = ctx.getImageData(x, y, 1, 1)
  // console.log(pixel)
  var data = pixel.data
  var rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`

  document.getElementsByClassName("circle_current-color")[0].style.backgroundColor = rgb

  }
}


function moveFigure(event) {
  if (moveSelect) {

    var x = event.layerX
    var y = event.layerY

    for (var c = 0; c < figureColumnCount; c++) {
      for (var r = 0; r < figureRowCount; r++) {
        if ((x >= figures[c][r].x && x <= figures[c][r].x + figureWidth) && (y >= figures[c][r].y && y <= figures[c][r].y + figureHeight)) {
          figures[c][r].active = true
          activeFigure = figures[c][r]
        }
      }
    }

    canvas.addEventListener("mousemove", (event) => {
      var x = event.layerX
      var y = event.layerY

      if ((x >= activeFigure.x && x <= activeFigure.x + figureWidth) && (y >= activeFigure.y && y <= activeFigure.y + figureHeight)) {
        activeFigure.x = event.layerX - figureWidth / 2
        activeFigure.y = event.layerY - figureHeight / 2
      }
    })

  }
}

canvas.addEventListener("mouseup", (event) => {
  // activeFigure.x = event.layerX - figureWidth / 2
  // activeFigure.y = event.layerY - figureHeight / 2

  activeFigure = ""
})



function current_colors() {
  currentColor = getComputedStyle(document.getElementsByClassName("circle_current-color")[0]).backgroundColor
  prevColor = getComputedStyle(document.getElementsByClassName("circle_prev-color")[0]).backgroundColor
  redColor = getComputedStyle(document.getElementsByClassName("circle_red-color")[0]).backgroundColor
  blueColor = getComputedStyle(document.getElementsByClassName("circle_blue-color")[0]).backgroundColor
}

function changeColor() {
  // RED
  document.getElementsByClassName("colors__ul--red")[0].addEventListener("click", () => {
    document.getElementsByClassName("circle_prev-color")[0].style.backgroundColor = currentColor
    document.getElementsByClassName("circle_current-color")[0].style.backgroundColor = redColor 
  })

  // BLUE
  document.getElementsByClassName("colors__ul--blue")[0].addEventListener("click", () => {
    document.getElementsByClassName("circle_prev-color")[0].style.backgroundColor = currentColor
    document.getElementsByClassName("circle_current-color")[0].style.backgroundColor = blueColor 
  })

  // PREVIOUS
  document.getElementsByClassName("colors__ul--prev-color")[0].addEventListener("click", () => {
    document.getElementsByClassName("circle_prev-color")[0].style.backgroundColor = currentColor
    document.getElementsByClassName("circle_current-color")[0].style.backgroundColor = prevColor 
  })
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawBasic()

  selectBucket()
  selectTransform()
  selectColorPicker()

  current_colors()
  changeColor()

}

setInterval(draw, 10)