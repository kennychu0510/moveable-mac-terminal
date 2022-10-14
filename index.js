const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const background = new Image()
background.src = './background.jpg'

import {
  Terminal
} from './classes/terminal.js'
import {
  Mouse
} from './classes/mouse.js'

const browserWidth = canvas.clientWidth
const browserHeight = canvas.clientHeight

canvas.width = background.width
canvas.height = background.height

const terminalInit = {
  ctx,
  x: canvas.width / 2 - (canvas.width * 0.4) / 2,
  y: canvas.height / 2 - (canvas.height * 0.5) / 2,
  width: canvas.width * 0.4,
  height: canvas.height * 0.5,
  radius: (canvas.width * 0.4) / 40,
  canvas,
  browserWidth,
  browserHeight
}


const terminal = new Terminal(terminalInit)
const mouse = new Mouse()


// document.addEventListener('mousedown', e => {
//   const {
//     clientX: x,
//     clientY: y
//   } = e

//   if (terminal.mouseInHeader(x, y)) {
//     console.log('true')
//   } else {
//     console.log('false')
//   }
// })


document.addEventListener('mousedown', (e) => {

  // mouse.x = e.clientX
  // mouse.y = e.clientY

  const {
    x,
    y
  } = convertClientPosToCanvas(e.clientX, e.clientY)
  let resizingMode = false
  let movingHeader = false

  if (terminal.mouseInHeader(x, y)) {
    movingHeader = true
  }

  if (terminal.mouseOnEdge(x, y)) {
    terminal.resizeMode = true
    if (terminal.mouseOnLeftEdge(x)) {
      resizingMode = 'left'
      terminal.changeCursor('col-resize')
    } else if (terminal.mouseOnRightEdge(x)) {
      resizingMode = 'right'
      terminal.changeCursor('col-resize')
    } else if (terminal.mouseOnTopEdge(y)) {
      resizingMode = 'top'
      terminal.changeCursor('row-resize')
    } else if (terminal.mouseOnBotEdge(y)) {
      resizingMode = 'bot'
      terminal.changeCursor('row-resize')
    }
  }


  const trackMouse = (e) => {
    const moveX = (e.movementX * canvas.width) / browserWidth
    const moveY = (e.movementY * canvas.height) / browserHeight

    switch (resizingMode) {
      case 'left':
        terminal.updateWidthLeft(moveX)
        return;
      case 'right':
        terminal.updateWidthRight(moveX)
        return;
      case 'top':
        terminal.updateHeightTop(moveY)
        return;
      case 'bot':
        terminal.updateHeightBot(moveY)
        return;
    }

    if (movingHeader) {
      terminal.move(moveX, moveY)
    }
    // mouse.update(mouse.x, mouse.y)
  }

  document.addEventListener('mousemove', trackMouse)

  document.addEventListener(
    'mouseup',
    (e) => {
      document.removeEventListener('mousemove', trackMouse)
      movingHeader = false
      resizingMode = false
      terminal.resetState()
    }, {
      once: true
    }
  )
})

document.addEventListener('mousemove', e => {
  const {
    x,
    y
  } = convertClientPosToCanvas(e.clientX, e.clientY)
  terminal.mouseInButtons(x, y)
  terminal.mouseOnEdge(x, y)
})

function draw() {
  ctx.drawImage(background, 0, 0)
  terminal.draw()
  requestAnimationFrame(draw)
}

document.addEventListener('keypress', e => {
  const {
    key
  } = e
  if (key === 'Enter') {
    terminal.enterLine()
    return
  }

  terminal.setText(key)
})

document.addEventListener('keydown', e => {
  const {
    key
  } = e
  if (key === 'Backspace') {
    terminal.backspace()
    return
  }
  if (key === 'ArrowDown') {
    terminal.scrollDown()
    return
  }
  if (key === 'ArrowUp') {
    terminal.scrollUp()
    return
  }
})

draw()

function convertClientPosToCanvas(clientX, clientY) {
  const x = clientX * canvas.width / browserWidth
  const y = clientY * canvas.height / browserHeight

  return {
    x,
    y
  }
}
