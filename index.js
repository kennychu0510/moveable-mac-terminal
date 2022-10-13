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
  headerHeight = 100
  constructor(init) {
    const {
      x,
      y,
      width,
      height,
      radius
    } = init
    Object.assign(this, {
      x,
      y,
      width,
      height,
      radius
    })
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
    Draw.topBar(ctx, this.x, this.y, this.width, this.headerHeight, this.radius, true)

    Draw.buttons(ctx, this.x, this.y)
  }

  move(moveX, moveY) {
    this.x += moveX
    this.y += moveY
  }

  mouseInHeader(clientX, clientY) {
    const x = clientX * canvas.width / browserWidth
    const y = clientY * canvas.height / browserHeight

    if ((x < this.x + this.width && x > this.x) && (y < this.y + this.headerHeight && y > this.y)) {
      return true
    } 
    return false
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

const mouse = new Mouse()

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

function draw() {
  ctx.drawImage(background, 0, 0)
  terminal.draw()
  requestAnimationFrame(draw)
}
draw()
