//
// components - rings
//

import {
  LitElement,
  html
} from 'lit'

import {
  customElement
} from 'lit/decorators.js'

import inViewport from './../lib/inViewport'


declare global {
  interface HTMLElementTagNameMap {
    'c-rings': Rings,
  }
}

@customElement('c-rings')

export class Rings extends LitElement {

  baseFrameRate = 20
  frameRate = this.baseFrameRate

  instance

  private _speed = 0.08
  private _time = 0
  private _nPoints = 10
  private _nCircles = 10
  private _minRadius = 0

  private _wrapper:HTMLDivElement
  private _size:DOMRect
  private _velocity:number
  private _maxRadius:number
  private _noiseScale:number

  private _createWrapper() {

    const el = document.createElement('div')

    el.id = 'c-rings__inner'

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

      this._size =
        this._wrapper.getBoundingClientRect()

      const canvas = sketch.createCanvas(
        this._size.width,
        this._size.height
      )

      const setSize = () => {

        if (sketch.width < sketch.height) {

          this._noiseScale = sketch.width * 0.12
          this._maxRadius = sketch.width * 0.45

        }
        else {

          this._noiseScale = sketch.height * 0.12
          this._maxRadius = sketch.height * 0.45

        }

      }

      sketch.windowResized = () => {

        this._size =
          this._wrapper.getBoundingClientRect()

        sketch.resizeCanvas(
          this._size.width,
          this._size.height
        )

        setSize()

      }

      canvas.parent('c-rings__inner')
      sketch.pixelDensity(sketch.displayDensity())
      setSize()

      this._minRadius = 0
      sketch.background(255)

    }

    sketch.draw = () => {

      sketch.frameRate(this.frameRate)
      sketch.noStroke()
      sketch.fill(255, 80)
      sketch.rect(0, 0, sketch.width, sketch.height)

      sketch.translate(
        sketch.width / 2,
        sketch.height / 2
      )
      sketch.noFill()
      sketch.stroke(114, 180, 174)

      for (let i = 0; i < this._nCircles; i++) {

        sketch.strokeWeight(
          sketch.map(i, 0, this._nCircles, 1, 5)
        )

        const radius = sketch.map(
          i,
          0,
          this._nCircles,
          this._minRadius,
          this._maxRadius
        )

        sketch.beginShape()

        for (let j = 0; j < this._nPoints + 3; j++) {

          let jj = j

          if (j >= this._nPoints) {

            jj -= this._nPoints

          }

          const x =
            (
              radius +
              sketch.noise(
                this._time / this._nPoints + jj
              ) *
              this._noiseScale
            ) *
            sketch.cos((sketch.TWO_PI / this._nPoints) * jj)

          const y =
            (
              radius +
              sketch.noise(
                this._time / this._nPoints + jj
              ) *
              this._noiseScale
            ) *
            sketch.sin(
              (sketch.TWO_PI / this._nPoints) * jj
            )

          sketch.curveVertex(x, y)

        }
        sketch.endShape()

      }

      this._velocity =
        sketch.abs(
          sketch.winMouseX - sketch.pwinMouseX
        ) / 150

      this._time += this._speed + this._velocity

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
    `

  }

}

