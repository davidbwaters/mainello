//
// component - WarpText
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  property,
  customElement
} from 'lit/decorators.js'

import inViewport from '../lib/inViewport'


declare global {
  interface HTMLElementTagNameMap {
    'c-warp-text': WarpText,
  }
}

@customElement('c-warp-text')

export class WarpText extends LitElement {

  static styles = css`
    :host {
      border-bottom: 1px solid var(
        --color-opaque-dark-subtle
      );
      display: grid;
      height: 60vh;
      position: relative;
    }

    .c-warp-text__gradient {
      background-image: linear-gradient(
        0deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,.95) 90%
      );
      position: absolute;
      height: calc(4.6875rem * 4);
      top: 0;
      width: 100%;
    }
  `


  baseFrameRate = 40
  frameRate = this.baseFrameRate

  instance

  private _wrapper:HTMLDivElement

  @property({
    type: String,
    attribute: true
  })
  text:string

  private _createWrapper() {

    const el = document.createElement('div')

    el.id = 'c-warp-text__inner'

    this.appendChild(el)
    this._wrapper = el

  }

  private _inViewort() {

    inViewport(this._wrapper, el => {

      if (el.isIntersecting) {

        this.frameRate = this.baseFrameRate

      }
      else {

        this.frameRate = 4

      }

    })

  }

  sketch = (sketch): void => {

    const text = ' ' + this.text + ' '

    let shader:any
    let graphics:any
    let font:any
    let textWidth:any

    sketch.preload = () => {

      font = sketch.loadFont(
        '/fonts/sohne-buch.otf'
      )

      shader = sketch.loadShader(
        '/scripts/shaders/warp.vert',
        '/scripts/shaders/warp.frag'
      )

    }

    sketch.setup = () => {

      let textSize = 1

      let wrapperSize = this._wrapper
        .getBoundingClientRect()

      const canvas = sketch.createCanvas(
        wrapperSize.width,
        wrapperSize.height,
        sketch.WEBGL
      )

      sketch.windowResized = () => {

        wrapperSize = this._wrapper.getBoundingClientRect()

        sketch.resizeCanvas(
          wrapperSize.width,
          wrapperSize.height
        )

      }

      canvas.parent('c-warp-text__inner')

      graphics = sketch.createGraphics(
        sketch.width,
        sketch.height
      )

      graphics.noStroke()
      graphics.fill(0)
      graphics.textFont(font)
      graphics.textSize(textSize)

      textWidth = graphics.textWidth(text)

      textSize = textSize / textWidth * graphics.width

      graphics.textSize(textSize)
      graphics.textAlign(
        sketch.LEFT,
        sketch.TOP
      )

      sketch.shader(shader)

      shader.setUniform(
        'u_resolution', [
          sketch.width * sketch.pixelDensity(),
          sketch.height * sketch.pixelDensity()
        ]
      )

      shader.setUniform(
        'u_tex',
        graphics
      )

      sketch.noStroke()

    }

    sketch.draw = () => {

      sketch.frameRate(this.frameRate)

      graphics.background(255)

      const textSize = graphics.textSize()
      const lineHeight = textSize * 0.8
      const cycle = 100
      const frameRatio = (sketch.frameCount % cycle) / cycle
      const offY = frameRatio * lineHeight

      for (
        let y = -textSize;
        y < graphics.height + textSize;
        y += lineHeight
      ) {

        graphics.text(text, 0, y + offY)

      }

      shader.setUniform(
        'u_time',
        sketch.millis() / 1000
      )

      sketch.rect(
        -sketch.width / 2,
        -sketch.height / 2,
        sketch.width,
        sketch.height
      )

    }

  }

  firstUpdated(): void {

    this._createWrapper()
    this._inViewort()

    this.instance = new window.p5(this.sketch)

  }

  protected render():TemplateSpecification {

    return html`
      <slot></slot>
      <div
        class='c-warp-text__gradient'
      ></div>
    `

  }

}

