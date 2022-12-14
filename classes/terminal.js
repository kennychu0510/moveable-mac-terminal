import * as Canvas from '../functions.js'

const COLOR = {
  headerBar: 'rgb(44,39,50)',
  terminalBackground: 'rgb(30,30,30)',
  text: 'rgb(180,177,184)'
}

export class Terminal {
  headerHeight = 100
  textOffsetY = 80
  lineHeight = 70
  fontSize = 60
  lastLine = 0
  showButtonDetails = false
  history = []
  text = ''
  resizeMode = false
  minWidth = 500
  minHeight = 500
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
    this.maxLinesToShow = Math.floor((this.height - this.headerHeight - this.textOffsetY) / this.lineHeight)
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
    const history = this.getHistoryToDisplay()
    for (let i = 0; i < history.length; i++) {
      Canvas.caret(this.ctx, this.x + 20, this.y + this.textOffsetY + this.lineHeight + this.lineHeight * i, 'rgb(237,106,94)')
      Canvas.drawText(this.ctx, this.x + 150, this.y + this.textOffsetY + this.lineHeight + this.lineHeight * i + 20, history[i], this.width - 200, 50)
    }
    Canvas.caret(this.ctx, this.x + 20, this.y + this.textOffsetY + this.lineHeight + this.lineHeight * history.length)
    Canvas.drawText(this.ctx, this.x + 150, this.y + this.textOffsetY + this.lineHeight + this.lineHeight * history.length + 20, this.text, this.width - 200, 50)
  }

  move(moveX, moveY) {
    this.x += moveX
    this.y += moveY
  }

  updateWidthLeft(moveX) {
    this.x += moveX
    this.width -= moveX
  }

  updateWidthRight(moveX) {
    this.width += moveX
  }

  updateHeightTop(moveY) {
    this.y += moveY
    this.height -= moveY
  }

  updateHeightBot(moveY) {
    this.height += moveY
  }

  mouseInHeader(x, y) {
    if ((x < this.x + this.width && x > this.x) && (y < this.y + this.headerHeight && y > this.y)) {
      return true
    }
    this.showButtonDetails = false
    return false
  }

  mouseInButtons(x, y) {
    if ((x < this.x + 200 && x > this.x) && (y < this.y + this.headerHeight && y > this.y)) {
      this.showButtonDetails = true
      this.changeCursor('pointer')
      return
    }
    this.showButtonDetails = false
    if (!this.resizeMode) {
      this.changeCursor('initial')
    }
  }

  mouseOnEdge(x, y) {
    if ((this.mouseOnLeftEdge(x) || this.mouseOnRightEdge(x)) && (y < this.y + this.height && y > this.y)) {
      this.changeCursor('col-resize')
      return true
    } 
    if ((this.mouseOnTopEdge(y) || this.mouseOnBotEdge(y)) && (x < this.x + this.width && x > this.x)) {
      this.changeCursor('row-resize')
      return true
    } 
    return false
  }

  mouseOnLeftEdge(x) {
    return (x < this.x + 2 && x > this.x - 2)
  }

  mouseOnRightEdge(x) {
    return x < this.x + this.width + 2 && x > this.x + this.width - 2
  }

  mouseOnTopEdge(y) {
    return y < this.y + 2 && y > this.y - 2
  }

  mouseOnBotEdge(y) {
    return y < this.y + this.height + 2 && y > this.y + this.height - 2
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

  detectRedButtonClick(x, y) {
  }

  setText(text) {
    this.text += text
  }

  enterLine() {
    if (this.text === 'clear()') {
      this.history = []
    } else {
      this.history.push(this.text)
    }
    this.text = ''
  }

  backspace() {
    this.text = this.text.slice(0, -1)
  }

  getHistoryToDisplay() {
    if (this.lastLine > 0) {
      return this.history.slice(-this.maxLinesToShow - this.lastLine, -this.lastLine)
    }
    return this.history.slice(-this.maxLinesToShow)
  }

  scrollUp() {
    if ( this.history.length <= this.maxLinesToShow || this.lastLine === this.history.length - this.maxLinesToShow ) return
    this.lastLine++
  }

  scrollDown() {
    if (this.lastLine === 0) return
    this.lastLine--
  }

  resetState() {
    this.changeCursor('initial')
    this.resizeMode = false
    this.maxLinesToShow = Math.floor((this.height - this.headerHeight - this.textOffsetY) / this.lineHeight)
  }
}
