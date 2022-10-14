/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
export function roundRect(
  ctx,
  x,
  y,
  width,
  height,
  radius = 5,
  fill = false,
  stroke = true
) {
  if (typeof radius === 'number') {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius,
    }
  } else {
    radius = {
      ...{
        tl: 0,
        tr: 0,
        br: 0,
        bl: 0,
      },
      ...radius,
    }
  }
  ctx.beginPath()
  ctx.moveTo(x + radius.tl, y)
  ctx.lineTo(x + width - radius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  ctx.lineTo(x + width, y + height - radius.br)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
  ctx.lineTo(x + radius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  ctx.lineTo(x, y + radius.tl)
  ctx.quadraticCurveTo(x, y, x + radius.tl, y)
  ctx.closePath()
  if (fill) {
    ctx.fill()
  }
  if (stroke) {
    ctx.stroke()
  }
}

export function topBar(
  ctx,
  x,
  y,
  width,
  height,
  radius = 5,
  fill = false,
  stroke = true
) {
  if (typeof radius === 'number') {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius,
    }
  } else {
    radius = {
      ...{
        tl: 0,
        tr: 0,
        br: 0,
        bl: 0,
      },
      ...radius,
    }
  }
  ctx.beginPath()
  ctx.moveTo(x + radius.tl, y)
  ctx.lineTo(x + width - radius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  ctx.lineTo(x + width, y + height)
  ctx.lineTo(x, y + height)
  ctx.lineTo(x, y + radius.tl)
  ctx.quadraticCurveTo(x, y, x + radius.tl, y)
  ctx.closePath()
  if (fill) {
    ctx.fill()
  }
  if (stroke) {
    ctx.stroke()
  }

  setColor(ctx, 'rgb(180,177,184)')
  ctx.font = '60px Arial'
  ctx.fillText('Terminal', x + width / 2 - 100, y + 75, 200)
}

export function buttons(ctx, x, y) {
  const red = 'rgb(237,106,94)'
  const cross = 'rgb(142,27,18)'
  const yellow = 'rgb(245,191,79)'
  const dash = 'rgb(169,114,41)'
  const green = 'rgb(97,195,83)'
  const expander = 'rgb(54,119,37)'
  const r = 22

  const redButton = {
    x: x + 50,
    y: y + 50
  }
  const yellowButton = {
    x: x + 120,
    y: y + 50
  }

  const greenButton = {
    x: x + 190,
    y: y + 50
  }
  // red button
  setColor(ctx, red)
  ctx.beginPath()
  ctx.arc(redButton.x, redButton.y, r, 0, 2 * Math.PI)
  ctx.fill()

  // red cross
  setColor(ctx, cross)
  ctx.lineWidth = 4
  const crossOffset = 11
  ctx.beginPath();

  ctx.moveTo(redButton.x - crossOffset, redButton.y - crossOffset);
  ctx.lineTo(redButton.x + crossOffset, redButton.y + crossOffset);

  ctx.moveTo(redButton.x + crossOffset, redButton.y - crossOffset);
  ctx.lineTo(redButton.x - crossOffset, redButton.y + crossOffset);
  ctx.stroke();

  // yellow button
  setColor(ctx, yellow)
  ctx.beginPath()
  ctx.arc(yellowButton.x, yellowButton.y, r, 0, 2 * Math.PI)
  ctx.fill()
  
  // yellow slash
  setColor(ctx, dash)
  ctx.lineWidth = 6
  const dashOffset = 15
  ctx.beginPath()
  ctx.moveTo(yellowButton.x - dashOffset, yellowButton.y)
  ctx.lineTo(yellowButton.x + dashOffset, yellowButton.y)
  ctx.stroke()

  // green button
  setColor(ctx, green)
  ctx.beginPath()
  ctx.arc(greenButton.x, greenButton.y, r, 0, 2 * Math.PI)
  ctx.fill()

  // green expander
  setColor(ctx, expander)
  const expanderOffset = 10
  const gap = 3
  ctx.beginPath()
  ctx.moveTo(greenButton.x - expanderOffset - gap, greenButton.y + expanderOffset - gap)
  ctx.lineTo(greenButton.x - expanderOffset - gap, greenButton.y - expanderOffset - gap)
  ctx.lineTo(greenButton.x + expanderOffset - gap, greenButton.y - expanderOffset - gap)
  ctx.closePath()
  ctx.fill()
  
  ctx.beginPath()
  ctx.moveTo(greenButton.x + expanderOffset + gap, greenButton.y - expanderOffset + gap)
  ctx.lineTo(greenButton.x + expanderOffset + gap, greenButton.y + expanderOffset + gap)
  ctx.lineTo(greenButton.x - expanderOffset + gap, greenButton.y + expanderOffset + gap)
  ctx.closePath()

  ctx.fill()
}


export function setColor(ctx, color) {
  ctx.fillStyle = color
  ctx.strokeStyle = color
}
