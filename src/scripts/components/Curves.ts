//
// component - curves
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  customElement
} from 'lit/decorators.js'

import inViewport from './../lib/inViewport'
import ClassicalNoise from './../lib/ClassicalNoise'


declare global {
  interface HTMLElementTagNameMap {
    'c-curves': Curves,
  }
}

@customElement('c-curves')

export class Curves extends LitElement {

  static styles = css`
    :host {
      display: block;
      height: 60vh;
      position: relative;
    }
  `

  baseFrameRate = 12
  frameRate = this.baseFrameRate
  variation = 0.001
  amp = 200
  perlin = new ClassicalNoise()
  variators = []


  canvas:HTMLCanvasElement
  ctx:CanvasRenderingContext2D
  canvasWidth
  canvasHeight
  startY
  maxLines

  private _createWrapper() {

    const el = document.createElement('canvas')

    this.appendChild(el)

    this.canvas = el
    this.ctx = this.canvas.getContext('2d')

  }

  private _inViewort() {

    inViewport(this.canvas, el => {

      if (el.isIntersecting) {

        this.frameRate = this.baseFrameRate

      }
      else {

        this.frameRate = 1

      }

    })

  }

  draw():void {

    this.ctx.shadowColor = 'rgba(0, 0, 0, 0)'
    this.ctx.shadowBlur = 0

    for (let i = 0; i <= this.maxLines; i++) {

      let y

      this.ctx.beginPath()
      this.ctx.moveTo(0, this.startY)

      for (let x = 0; x <= this.canvasWidth; x++) {

        y = this.perlin.noise(
          x * this.variation + this.variators[i],
          x * this.variation, 0
        )

        this.ctx.lineTo(
          x, this.startY + this.amp * y
        )

      }

      const color = Math.floor(150 * Math.abs(y))
      const alpha = Math.min(Math.abs(y) + 0.1, 0.25)

      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = 'rgba(114,181,175,' + alpha * 2 + ')'
      this.ctx.stroke()
      this.ctx.closePath()

      this.variators[i] += 0.005

    }

  }

  animateCanvas() {

    this.ctx.clearRect(
      0, 0, this.canvasWidth, this.canvasHeight
    )

    this.draw()

    requestAnimationFrame(
      this.animateCanvas.bind(this)
    )

  }

  resizeCanvas():void {

    const size = this.getBoundingClientRect()

    this.canvasWidth = size.width
    this.canvasHeight = size.height

    this.canvas.setAttribute(
      'width',
      this.canvasWidth
    )

    this.canvas.setAttribute(
      'height',
      this.canvasHeight
    )

    this.startY = this.canvasHeight / 2

  }

  firstUpdated(): void {

    this._createWrapper()
    this._inViewort()
    this.resizeCanvas()

    this.maxLines = (
      navigator.userAgent.toLowerCase()
        .indexOf('firefox') > -1
    ) ? 25 : 40

    for (
      let i = 0, u = 0; i < this.maxLines; i++, u += 0.02
    ) {

      this.variators[i] = u

    }

    this.animateCanvas.bind(this)

    this.animateCanvas()

    window.addEventListener(
      'resize', this.resizeCanvas
    )

  }

  protected render():TemplateSpecification {

    return html`
      <slot></slot>
    `

  }

}

