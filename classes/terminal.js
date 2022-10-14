import * as Canvas from '../functions.js'

const COLOR = {
  headerBar: 'rgb(44,39,50)',
  terminalBackground: 'rgb(30,30,30)',
  text: 'rgb(180,177,184)'
}

export class Terminal {
  headerHeight = 100
  lineHeight = 40
  showButtonDetails = false
  constructor(init) {
    const {
      ctx,
      x,
      y,
      width,
      height,
      radius,
      browserHeight,
      browserWidth,
      canvas
    } = init
    Object.assign(this, {
      ctx,
      x,
      y,
      width,
      height,
      radius,
      browserHeight,
      browserWidth,
      canvas
    })
  }

  draw() {
    Canvas.setColor(this.ctx, COLOR.terminalBackground)
    Canvas.roundRect(
      this.ctx,
      this.x,
      this.y,
      this.width,
      this.height,
      this.radius,
      true
    )
    Canvas.setColor(this.ctx, COLOR.headerBar)
    Canvas.topBar(this.ctx, this.x, this.y, this.width, this.headerHeight, this.radius, true)
    Canvas.buttons(this.ctx, this.x, this.y, this.showButtonDetails)
    Canvas.caret(this.ctx, this.x + 20, this.y + this.headerHeight + this.lineHeight)
  }

  move(moveX, moveY) {
    this.x += moveX
    this.y += moveY
  }

  mouseInHeader(clientX, clientY) {
    const {
      x,
      y
    } = this.convertClientPosToCanvas(clientX, clientY)

    if ((x < this.x + this.width && x > this.x) && (y < this.y + this.headerHeight && y > this.y)) {
      return true
    }
    this.showButtonDetails = false
    return false
  }

  mouseInButtons(clientX, clientY) {
    const {
      x,
      y
    } = this.convertClientPosToCanvas(clientX, clientY)

    if ((x < this.x + 200 && x > this.x) && (y < this.y + this.headerHeight && y > this.y)) {
      this.showButtonDetails = true
      this.changeCursor('pointer')
      return
    }
    this.showButtonDetails = false
    this.changeCursor('initial')
  }

  convertClientPosToCanvas(clientX, clientY) {
    const x = clientX * this.canvas.width / this.browserWidth
    const y = clientY * this.canvas.height / this.browserHeight

    return {
      x,
      y
    }
  }

  changeCursor(style) {
    this.canvas.style.cursor = style
  }

  detectRedButtonClick(clientX, clientY) {
    const {
      x,
      y
    } = this.convertClientPosToCanvas(clientX, clientY)


  }
}
