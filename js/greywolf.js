class GreyWolf {
  constructor(canvas) {
    this.colors = {
      hair: '#5e615e',
      tummy: 'rgba(138,138,138,.4)',
      hat: '#f06610',
      patch: '#ffd759',
      bongrace: '#f9a571',
      bib: '#ffd358',
      shy: '#bf5246',
      outline: '#333'
    }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const screen = canvas.getContext('2d')
    const offscreenCanvas = document.createElement('canvas')

    offscreenCanvas.width = this.width = 480
    offscreenCanvas.height = this.height = 640

    this.ctx = offscreenCanvas.getContext('2d')
    
    const image = new Image()

    image.src = 'greywolf.jpg'
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 212, 480, 428)
      this.render()

      screen.drawImage(
        offscreenCanvas, 
        Math.round((canvas.width - this.width) / 2), 
        Math.round((canvas.height - this.height) / 2)
      )
    }
  }

  render() {
    this.ctx.globalAlpha = .2
    this.ctx.lineWidth = 4
    this.ctx.strokeStyle = this.colors.hair
    this.ctx.beginPath()
    this.ctx.moveTo(0, 640)
    this.ctx.lineTo(480, 640)
    this.ctx.stroke()

    this.drawBody()
    this.drawHead()
    this.drawHat()
  }

  drawHat() {
    const ctx = this.ctx

    ctx.save()
    ctx.lineWidth = 2
    ctx.lineJoin = 'round'
    ctx.fillStyle = this.colors.bongrace
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(20, 100)
    ctx.quadraticCurveTo(150, 30, 200, 50)
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  }

  drawHead() {
    const ctx = this.ctx
    const radius = this.width / 4
    const x = this.width / 2
    const y = (this.height - radius) / 2
    const PI = Math.PI

    ctx.save()
    // face
    ctx.fillStyle = this.colors.hair
    ctx.strokeStyle = this.colors.outline
    ctx.beginPath()
    ctx.moveTo(170, 222)
    ctx.quadraticCurveTo(-100, 516, 200, 564)
    ctx.fill()
    ctx.stroke()
    // eyes
    ctx.lineCap = 'round'
    ctx.lineWidth = 4
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(80, 375)
    ctx.lineTo(170, 390)
    ctx.moveTo(230, 406)
    ctx.lineTo(340, 420)
    ctx.stroke()

    ctx.restore()
  }

  drawBody() {
    const ctx = this.ctx
    const PI = Math.PI
    let a = 96
    let b = 140
    let ox = 50
    let oy = 100

    ctx.save()
    ctx.translate(230, 606)
    // body
    ctx.lineWidth = 2
    ctx.fillStyle = this.colors.hair
    ctx.strokeStyle = this.colors.outline
    ctx.beginPath()
    ctx.moveTo(0, b)
    ctx.bezierCurveTo(ox, b, a, oy, a, 0)
    ctx.bezierCurveTo(a, -oy, ox, -b, 0, -b)
    ctx.bezierCurveTo(-ox, -b, -a, -oy, -a, 0)
    ctx.bezierCurveTo(-a, oy, -ox, b, 0, b)
    ctx.fill()
    ctx.stroke()
    // tummy
    a = 64
    b = 100
    ctx.translate(0, -50)
    ctx.fillStyle = this.colors.tummy
    ctx.beginPath()
    ctx.moveTo(0, b)
    ctx.bezierCurveTo(ox, b, a, oy, a, 0)
    ctx.bezierCurveTo(a, -oy, ox, -b, 0, -b)
    ctx.bezierCurveTo(-ox, -b, -a, -oy, -a, 0)
    ctx.bezierCurveTo(-a, oy, -ox, b, 0, b)
    ctx.fill()

    ctx.restore()
  }
}

new GreyWolf(document.getElementById('greywolf'))