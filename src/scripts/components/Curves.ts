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

  baseFrameRate = 40
  frameRate = this.baseFrameRate
  variation = 0.001
  amp = 200
  perlin = new ClassicalNoise()
  variators = []
  isIntersecting = false

  canvas:HTMLCanvasElement
  ctx:CanvasRenderingContext2D
  canvasWidth
  canvasHeight
  startY
  maxLines
  animationInstance

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

        if (this.isIntersecting === false) {

          this.isIntersecting = true

        }

      }

      else {

        this.frameRate = 1

        if (this.isIntersecting === true) {

          this.isIntersecting = false

        }

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

      // const color = Math.floor(150 * Math.abs(y))
      const alpha = Math.min(Math.abs(y) + 0.1, 0.25)

      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = 'rgba(114,181,175,' + alpha * 2 + ')'
      this.ctx.stroke()
      this.ctx.closePath()

      this.variators[i] += 0.005

    }

  }

  start():void {

    let then = performance.now()

    const interval = 1000 / this.frameRate
    const tolerance = 0.1

    const animateCanvas = (now:number) => {

      this.animationInstance = requestAnimationFrame(
        animateCanvas
      )

      const delta = now - then

      if (delta >= interval - tolerance) {

        then = now - (delta % interval)

        this.ctx.clearRect(
          0, 0, this.canvasWidth, this.canvasHeight
        )

        this.draw()

      }

    }

    this.animationInstance = requestAnimationFrame(
      animateCanvas
    )

  }

  stop():void {

    cancelAnimationFrame(
      this.animationInstance
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

    this.start()
    this.resizeCanvas.bind(this)

    this._createWrapper()
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

    this.start()
    this._inViewort()

    window.addEventListener(
      'resize', this.resizeCanvas.bind(this)
    )

  }

  protected render():TemplateSpecification {

    return html`
      <slot></slot>
    `

  }

}

