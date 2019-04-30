var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var RectCount = 8
var CircleCount = 1
var figureRowCount = 3
var figureColumnCount = 3
var figureHeight = 150
var figureWidth = 150
var figurePadding = 10
var figureOffsetTop = 0
var figureOffsetLeft = 0
var bucket_select = false
var picker_select = false
var transform_select = false
var move_select = false
var active_figure

// COLORS
var current_color = ""
var prev_color = ""
var red_color = ""
var blue_color = ""




var figures = [
  [
    {x: 0, y: 0, color: "#cccccc", shape: "rec", active: false}, 
    {x: 0, y: 0, color: "#bababa", shape: "rec", active: false},
    {x: 0, y: 0, color: "#c7c7c7", shape: "circle", active: false}
  ],
  [
    {x: 0, y: 0, color: "#bdbdbd", shape: "rec", active: false},
    {x: 0, y: 0, color: "#cfcfcf", shape: "rec", active: false},
    {x: 0, y: 0, color: "#c4c4c4", shape: "rec", active: false}
  ],
  [
    {x: 0, y: 0, color: "#bfbfbf", shape: "rec", active: false},
    {x: 0, y: 0, color: "#c9c9c9", shape: "rec", active: false},
    {x: 0, y: 0, color: "#cccccc", shape: "rec", active: false}
  ]
]
// for (var c = 0; c < figureColumnCount; c++) {
//   figures[c] = []
//   for (var r = 0; r < figureRowCount; r++) {
//     figures[c][r] = {x: 0, y: 0, color: "lightgreen", shape: "rec", active: false, modified: false}
//   }
// }



document.getElementsByClassName("colors__ul")[0].addEventListener("click", changeColor, false)

document.getElementsByClassName("pallete__ul--bucket")[0].addEventListener("click", selectBucket, false)
document.body.addEventListener("keypress", (event) => {
  if (event.code == "KeyB") {
    bucket_select = true
    picker_select = false
    transform_select = false
    move_select = false
  }
}, false)
canvas.addEventListener("click", onClick, false);

document.getElementsByClassName("pallete__ul--color")[0].addEventListener("click", selectColorPicker, false)
document.body.addEventListener("keypress", (event) => {
  if (event.code == "KeyC") {
    bucket_select = false
    picker_select = true
    transform_select = false
    move_select = false
  }
}, false)
canvas.addEventListener("click", pickerColor, false)

document.getElementsByClassName("pallete__ul--transform")[0].addEventListener("click", selectTransform, false)
document.body.addEventListener("keypress", (event) => {
  if (event.code == "KeyT") {
    bucket_select = false
    picker_select = false
    transform_select = true
    move_select = false
  }
}, false)
canvas.addEventListener("click", changeFigure, false)

document.getElementsByClassName("pallete__ul--move")[0].addEventListener("click", selectMove, false)
document.body.addEventListener("keypress", (event) => {
  if (event.code == "KeyM") {
    bucket_select = false
    picker_select = false
    transform_select = false
    move_select = true
  }
}, false)
canvas.addEventListener("mousedown", moveFigure, false)


function drawBasic() {
  for (var c = 0; c < figureColumnCount; c++) {
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
    bucket_select = true
    picker_select = false
    transform_select = false
    move_select = false
  }
}

function selectTransform(event) {
  if (event) {
    transform_select = true
    bucket_select = false
    picker_select = false
    move_select = false
  }
}

function selectColorPicker(event) {
  if (event) {
    picker_select = true
    bucket_select = false
    transform_select = false
    move_select = false
  }
}

function selectMove(event) {
  if (event) {
    move_select = true
    picker_select = false
    bucket_select = false
    transform_select = false
  }
}


function onClick(event) {
  if (bucket_select) {
    var mx = event.layerX
    var my = event.layerY
    // console.log(mx + " " + my)
    for (var c = 0; c < figureColumnCount; c++) {
      for (var r = 0; r < figureRowCount; r++) {
        if ((mx >= figures[c][r].x && mx <= figures[c][r].x + figureWidth) && (my >= figures[c][r].y && my <= figures[c][r].y + figureHeight)) {
          figures[c][r].color = current_color
        }
      }
    }
  }  
}


function changeFigure(event) {
  if (transform_select) {

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
  if (picker_select) {
  
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
  if (move_select) {

    var x = event.layerX
    var y = event.layerY

    for (var c = 0; c < figureColumnCount; c++) {
      for (var r = 0; r < figureRowCount; r++) {
        if ((x >= figures[c][r].x && x <= figures[c][r].x + figureWidth) && (y >= figures[c][r].y && y <= figures[c][r].y + figureHeight)) {
          figures[c][r].active = true
          active_figure = figures[c][r]
        }
      }
    }

    canvas.addEventListener("mousemove", (event) => {
      var x = event.layerX
      var y = event.layerY

      if ((x >= active_figure.x && x <= active_figure.x + figureWidth) && (y >= active_figure.y && y <= active_figure.y + figureHeight)) {
        active_figure.x = event.layerX - figureWidth / 2
        active_figure.y = event.layerY - figureHeight / 2
      }
    })

  }
}

canvas.addEventListener("mouseup", (event) => {
  // active_figure.x = event.layerX - figureWidth / 2
  // active_figure.y = event.layerY - figureHeight / 2

  active_figure = ""
})



function current_colors() {
  current_color = getComputedStyle(document.getElementsByClassName("circle_current-color")[0]).backgroundColor
  prev_color = getComputedStyle(document.getElementsByClassName("circle_prev-color")[0]).backgroundColor
  red_color = getComputedStyle(document.getElementsByClassName("circle_red-color")[0]).backgroundColor
  blue_color = getComputedStyle(document.getElementsByClassName("circle_blue-color")[0]).backgroundColor
}

function changeColor() {
  // RED
  document.getElementsByClassName("colors__ul--red")[0].addEventListener("click", () => {
    document.getElementsByClassName("circle_prev-color")[0].style.backgroundColor = current_color
    document.getElementsByClassName("circle_current-color")[0].style.backgroundColor = red_color 
  })

  // BLUE
  document.getElementsByClassName("colors__ul--blue")[0].addEventListener("click", () => {
    document.getElementsByClassName("circle_prev-color")[0].style.backgroundColor = current_color
    document.getElementsByClassName("circle_current-color")[0].style.backgroundColor = blue_color 
  })

  // PREVIOUS
  document.getElementsByClassName("colors__ul--prev-color")[0].addEventListener("click", () => {
    document.getElementsByClassName("circle_prev-color")[0].style.backgroundColor = current_color
    document.getElementsByClassName("circle_current-color")[0].style.backgroundColor = prev_color 
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