//
// component - liquid title
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
    'c-liquid-title': LiquidTitle,
  }
}

@customElement('c-liquid-title')

export class LiquidTitle extends LitElement {

  static styles = css`
    :host {
      border-bottom: 1px solid var(
        --color-opaque-dark-subtle
      );
      display: grid;
      height: 60vh;
      position: relative;
    }

    .c-liquid-title__gradient {
      background-image: linear-gradient(
        0deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,.95) 90%
      );
      position: absolute;
      height: calc(4.6875rem * 2);
      top: 0;
      width: 100%;
    }
  `


  baseFrameRate = 30
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

    el.id = 'c-liquid-title__inner'

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

  sketch = (sketch):void => {

    const text = ' ' + this.text + ' '

    let shader:any
    let graphics:any
    let font:any

    sketch.preload = () => {

      font = sketch.loadFont(
        '/fonts/sohne-buch.otf'
      )

      shader = sketch.loadShader(
        '/shaders/liquid.vert',
        '/shaders/liquid.frag'
      )

    }

    sketch.setup = () => {

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

      canvas.parent('c-liquid-title__inner')

      graphics = sketch.createGraphics(
        sketch.width,
        sketch.height
      )

      graphics.background(255, 255, 255)
      graphics.noStroke()
      graphics.textFont(font)

      graphics.textSize(
        sketch.width * 0.15
      )

      graphics.textAlign(
        sketch.CENTER,
        sketch.CENTER
      )

      graphics.fill(40)
      graphics.stroke(0)
      graphics.strokeWeight(0)
      graphics.text(
        text,
        sketch.width * 0.5,
        sketch.height * 0.5
      )

      sketch.shader(shader)
      shader.setUniform('tex', graphics)

    }

    sketch.draw = () => {

      sketch.frameRate(this.frameRate)

      const freq = sketch.map(
        sketch.mouseX, 0, sketch.width, 2.0, 2.5
      )
      const amp = sketch.map(
        sketch.mouseY, 0, sketch.height, 0.075, 0.1
      )

      shader.setUniform(
        'frequency', freq
      )
      shader.setUniform(
        'amplitude', amp
      )
      shader.setUniform(
        'speed', sketch.frameCount * 0.035
      )

      sketch.rect(
        0, 0, sketch.width, sketch.height
      )

    }

  }

  connectedCallback():void {

    super.connectedCallback()

    this._createWrapper()
    this._inViewort()

    this.instance = new window.p5(this.sketch)

  }

  disconnectedCallback():void {

    super.disconnectedCallback()

    this.instance.remove()

  }

  protected render():TemplateSpecification {

    return html`
      <slot></slot>
      <div
        class='c-liquid-title__gradient'
      ></div>
    `

  }

}

