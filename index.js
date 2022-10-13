const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const background = document.querySelector('img')

import * as Draw from './functions.js'

const browserWidth = canvas.clientWidth
const browserHeight = canvas.clientHeight

canvas.width = background.width
canvas.height = background.height

const terminalInit = {
  x: canvas.width / 2 - (canvas.width * 0.4) / 2,
  y: canvas.height / 2 - (canvas.height * 0.5) / 2,
  width: canvas.width * 0.4,
  height: canvas.height * 0.5,
  radius: (canvas.width * 0.4) / 40,
}

const COLOR = {
  headerBar: 'rgb(44,39,50)',
  terminalBackground: 'rgb(30,30,30)',
  text: 'rgb(180,177,184)'
}

class Terminal {
  constructor(init) {
    const { x, y, width, height, radius } = init
    Object.assign(this, { x, y, width, height, radius })
  }

  draw() {
    Draw.setColor(ctx, COLOR.terminalBackground)
    Draw.roundRect(
      ctx,
      this.x,
      this.y,
      this.width,
      this.height,
      this.radius,
      true
    )
    Draw.setColor(ctx, COLOR.headerBar)
    Draw.topBar(ctx, this.x, this.y, this.width, 100, this.radius, true)

    Draw.buttons(ctx, this.x, this.y)
  }

  move(moveX, moveY) {
    this.x += moveX
    this.y += moveY
  }
}

class Mouse {
  constructor() {
    this.x = 0
    this.y = 0
  }

  update(x, y) {
    this.x = x
    this.y = y
  }
}

const terminal = new Terminal(terminalInit)

const mouse = new Mouse()

document.addEventListener('keydown', (e) => {
  const { key } = e
  const keyMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  }
  switch (key) {
    case 'ArrowUp':
      terminal.y -= 10
      break
    case 'ArrowDown':
      terminal.y += 10
      break
    case 'ArrowLeft':
      terminal.x -= 10
      break
    case 'ArrowRight':
      terminal.x += 10
      break
  }
})

document.addEventListener('mousedown', (e) => {
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
    },
    { once: true }
  )
})

function draw() {
  ctx.drawImage(background, 0, 0)
  terminal.draw()
  requestAnimationFrame(draw)
}
draw()
