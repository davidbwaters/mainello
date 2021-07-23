//
// component - bounce title
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
    'c-bounce-title': BounceTitle,
  }
}

@customElement('c-bounce-title')

export class BounceTitle extends LitElement {

  static styles = css`
    :host {
      border-bottom: 1px solid var(
        --color-opaque-dark-subtle
      );
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      height: 60vh;
      position: relative;
    }

    .c-bounce-title__gradient {
      background-image: linear-gradient(
        0deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.25) 100%
      );
      position: absolute;
      height: 100%;
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

    el.id = 'c-bounce-title__inner'

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

    let font:any
    let angle = 0

    sketch.preload = () => {

      font = sketch.loadFont(
        '/fonts/sohne-halbfett.otf'
      )

    }


    sketch.setup = () => {

      let wrapperSize = this._wrapper
        .getBoundingClientRect()

      const canvas = sketch.createCanvas(
        wrapperSize.width,
        wrapperSize.height
      )

      sketch.windowResized = () => {

        wrapperSize = this._wrapper.getBoundingClientRect()

        sketch.resizeCanvas(
          wrapperSize.width,
          wrapperSize.height
        )

      }

      canvas.parent('c-bounce-title__inner')

    }

    sketch.draw = () => {

      sketch.frameRate(this.frameRate)

      sketch.background(114, 180, 174, 60)

      sketch.textSize(sketch.width / 10)
      sketch.textFont(font)

      const startX = (
        sketch.width - sketch.textWidth(text)
      ) / 2

      let currentX = startX
      let offsetAngle = angle

      for (let i = 0; i < text.length; i++) {

        const chr = text.charAt(i)

        const y = sketch.height / 2 + (
          sketch.sin(offsetAngle) * 40
        ) + 40

        sketch.fill(114, 180, 174)

        sketch.stroke(255)
        sketch.strokeWeight(3)

        sketch.text(chr, currentX, y)

        currentX += sketch.textWidth(chr)

        offsetAngle += sketch.mouseX / 2000

      }

      angle += 0.06

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
        class='c-bounce-title__gradient'
      ></div>
    `

  }

}

