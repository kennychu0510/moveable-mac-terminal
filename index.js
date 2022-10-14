const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const background = new Image()
background.src = './background.jpg'

import { Terminal } from './classes/terminal.js'
import { Mouse } from './classes/mouse.js'

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
}


const terminal = new Terminal(terminalInit)
const mouse = new Mouse()


document.addEventListener('mousedown', e => {
  const {
    clientX: x,
    clientY: y
  } = e

  if (terminal.mouseInHeader(x, y)) {
    console.log('true')
  } else {
    console.log('false')
  }
})


document.addEventListener('mousedown', (e) => {
  if (!terminal.mouseInHeader(e.clientX, e.clientY)) return
  mouse.x = e.clientX
  mouse.y = e.clientY

  const trackMouse = (e) => {
    const moveX = (e.movementX * canvas.width) / browserWidth
    const moveY = (e.movementY * canvas.height) / browserHeight

    terminal.move(moveX, moveY)
    mouse.update(mouse.x, mouse.y)
  }

  document.addEventListener('mousemove', trackMouse)

  document.addEventListener(
    'mouseup',
    (e) => {
      document.removeEventListener('mousemove', trackMouse)
    }, {
      once: true
    }
  )
})

document.addEventListener('mousemove', e => {
  terminal.mouseInButtons(e.clientX, e.clientY)
})

function draw() {
  ctx.drawImage(background, 0, 0)
  terminal.draw()
  requestAnimationFrame(draw)
}
draw()
