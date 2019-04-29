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
var color = false
var bucket_select = false
var picker_select = false
var transform_select = false

// COLORS
var current_color = ""
var prev_color = ""
var red_color = ""
var blue_color = ""

var figures = []
for (var c = 0; c < figureColumnCount; c++) {
  figures[c] = []
  for (var r = 0; r < figureRowCount; r++) {
    figures[c][r] = {x: 0, y: 0, color: "lightgreen", shape: "rec"}
  }
}

// var figures = [
//   {color: "green", coord: [10, 10, 150, 150]},
//   {color: "rebeccapurple", coord: [170, 10, 150, 150]},
//   {color: "yellow", coord: [330, 10, 150, 150]},
//   {color: "lightgreen", coord: [10, 170, 150, 150]},
// ]



document.getElementsByClassName("colors__ul")[0].addEventListener("click", changeColor, false)

document.getElementsByClassName("pallete__ul--color")[0].addEventListener("click", pickColor, false)

document.getElementsByClassName("pallete__ul--bucket")[0].addEventListener("click", selectBucket, false)
canvas.addEventListener("click", onClick, false);

document.getElementsByClassName("pallete__ul--transform")[0].addEventListener("click", selectTransform, false)
canvas.addEventListener("click", changeFigure, false)


function drawBasic() {
  for (var c = 0; c < figureColumnCount; c++) {
    for (var r = 0; r < figureRowCount; r++) {
      var figureX = (c*(figureWidth+figurePadding))+figureOffsetLeft;
      var figureY = (r*(figureHeight+figurePadding))+figureOffsetTop;
      figures[c][r].x = figureX
      figures[c][r].y = figureY
      ctx.beginPath();
      if (figures[c][r].shape == "rec") 
      {
        ctx.fillStyle = figures[c][r].color
        ctx.fillRect(figureX, figureY, figureWidth, figureHeight)
      } else if (figures[c][r].shape == "circle") {
        ctx.fillStyle = figures[c][r].color
        ctx.arc(figureX+75, figureY+75, 75, 0, 2 * Math.PI)
        ctx.fill();
      }  
      ctx.fill();
    }
  }
}


function selectBucket(event) {
  if (event && bucket_select != true) {
    bucket_select = true
    picker_select = false
    transform_select = false
  }
}

function selectTransform(event) {
  if (event) {
    bucket_select = false
    picker_select = false
    transform_select = true
  }
}


function onClick(event) {
  if (bucket_select) {
    var mx = event.layerX
    var my = event.layerY
    console.log(mx + " " + my)
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

function pickColor(event) {
  if (event) {
    console.log("T")
    picker_select = true
    bucket_select = false

    document.body.addEventListener("mousemove", (event)=> {
      var x = event.clientX
      var y = event.clientY

      var pixel = ctx_body.getImageData(x, y, 1, 1)
      console.log(pixel)
      var data = pixel.data
      // console.log(data)
      var rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`
      // console.log(rgb)
  
      document.getElementsByClassName("circle_current-color")[0].style.backgroundColor = rgb
    })
  }
}

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
  pickColor()

  current_colors()
  changeColor()

}

setInterval(draw, 10)