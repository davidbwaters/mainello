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

    .c-curves__fade {
      background-image:
        linear-gradient(
          0deg,
          white 0%,
          rgba(255,255,255,0.1) 25%,
          rgba(255,255,255,0.1) 75%,
          white 100%
        );
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 2;
      top: 0;
    }
  `

  baseFrameRate = 12
  frameRate = this.baseFrameRate

  instance

  private _wrapper:HTMLDivElement


  private _createWrapper() {

    const el = document.createElement('div')

    el.id = 'c-curves__inner'

    this.appendChild(el)
    this._wrapper = el

  }

  private _inViewort() {

    inViewport(this._wrapper, el => {

      if (el.isIntersecting) {

        this.frameRate = this.baseFrameRate

      }
      else {

        this.frameRate = 1

      }

    })

  }

  sketch = (sketch): void => {

    sketch.setup = () => {

      let wrapperSize = this.getBoundingClientRect()

      const canvas = sketch.createCanvas(
        wrapperSize.width,
        wrapperSize.height
      )

      sketch.windowResized = () => {

        wrapperSize = this.getBoundingClientRect()

        sketch.resizeCanvas(
          wrapperSize.width,
          wrapperSize.height
        )

      }

      canvas.parent('c-curves__inner')

      sketch.strokeWeight(1)
      sketch.noFill()
      sketch.background(255)

    }

    sketch.drawPerlinCurve = (
      x, y, phase, step, numCurveVertices
    ) => {

      sketch.push()
      //sketch.stroke(114,180,174, 60)
      sketch.stroke(220, 60)

      const noiseScale = 0.0025

      sketch.beginShape()

      for (let i = 0; i < numCurveVertices; i++) {

        sketch.curveVertex(x, y)
        const angle =
            sketch.TWO_PI *
            sketch.noise(
              x * noiseScale,
              y * noiseScale,
              phase * noiseScale
            )
        x += sketch.cos(angle) * step
        y += sketch.sin(angle) * step

      }

      sketch.endShape()
      sketch.pop()

    }

    sketch.applyFade = () => {

      sketch.push()
      //sketch.fill(255, 80)
      sketch.pop()

    }

    sketch.draw = () => {

      sketch.frameRate(this.frameRate)

      const STEP = 30
      const numCurveVertices = sketch.floor(
        sketch.width * 1.5 / STEP
      )

      sketch.background(255, 90)

      sketch.push()
      sketch.scale(1)

      const phase = sketch.frameCount / 2

      for (let y = 0; y < sketch.height; y += 30) {

        sketch.drawPerlinCurve(
          sketch.width + 100,
          y, phase, STEP, numCurveVertices
        )

      }

      sketch.pop()

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
      <div class="c-curves__fade"></div>
    `

  }

}

