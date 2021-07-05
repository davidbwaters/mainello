//
// components - curves
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  customElement
} from 'lit/decorators.js'

import p5 from 'p5'

import inViewport from './../lib/inViewport'


declare global {
  interface HTMLElementTagNameMap {
    'c-curves': Footer,
  }
}

@customElement('c-curves')

export class Footer extends LitElement {

  frameRate = 60

  instance

  private _speed = 0.045
  private _time = 0
  private _nPoints = 10
  private _nCircles = 10
  private _minRadius = 0

  private _wrapper:HTMLDivElement
  private _size:DOMRect
  private _velocity:number
  private _maxRadius:number
  private _noiseScale:number

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .c-curves__fade {
      background-image:
        linear-gradient(
          0deg,
          white 0%,
          transparent 25%,
          transparent 75%,
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

  private _createWrapper() {

    const el = document.createElement('div')

    el.id = 'c-curves__inner'

    this.appendChild(el)
    this._wrapper = el

  }

  private _inViewort() {

    inViewport(this._wrapper, el => {

      if (el.isIntersecting) {

        this.frameRate = 30

      }
      else {

        this.frameRate = 1

      }

    })

  }

  sketch = (sketch): void => {

    sketch.setup = () => {

      const width = sketch.windowWidth
      const height = sketch.windowHeight

      const canvas = sketch.createCanvas(
        width,
        height
      )

      sketch.windowResized = () => {

        sketch.resizeCanvas(
          sketch.windowWidth,
          sketch.windowHeight
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
      sketch.fill(255, 90)
      //sketch.rect(0, 0, sketch.width, sketch.height)
      sketch.pop()

    }

    sketch.draw = () => {

      sketch.frameRate(this.frameRate)

      const STEP = 30
      const numCurveVertices = sketch.floor(
        sketch.width * 1.5 / STEP
      )

      //sketch.applyFade()
      sketch.background(255, 99)

      sketch.push()
      sketch.scale(1)

      const phase = sketch.frameCount / 2

      for (let y = 0; y < sketch.height; y += 30) {

        sketch.drawPerlinCurve(
          sketch.width +
          50, y, phase, STEP, numCurveVertices
        )

      }

      sketch.pop()

    }

  }

  firstUpdated(): void {

    this._createWrapper()
    this._inViewort()

    this._size = this.getBoundingClientRect()

    this.instance = new p5(this.sketch)

  }

  protected render(): TemplateSpecification {

    return html`
      <footer
        class="c-footer"
      >
        <div class="c-footer__inner">
          <h2 class="c-footer__contact u-heading-huge">
            <span class="u-text-outline">have an idea?</span>
            <a href="/contact.html">
              get in touch
            </a>
          </h2>
          <div class="c-line c-line--light"></div>
          <div class="c-footer__lower">
            <img
              class="c-footer__logo"
              src="/images/logo-glyph.svg"
            >

            <nav class="c-footer__nav">
              <% navPages.forEach(function(entry){ %>
                <a
                  class="c-footer__nav-link u-hide-tablet-down"
                  href="<%- entry.url %>"
                >
                  <%- entry.title %>
                </a>
              <% }); %>
            </nav>

            <div class="c-footer__social">
              <a
                class="c-footer__social-link"
              >
                <img src="/icons/social/instagram.svg">
              </a>
              <a
                class="c-footer__social-link"
              >
                <img src="/icons/social/twitter.svg">
              </a>
              <a
                class="c-footer__social-link"
              >
                <img src="/icons/social/facebook.svg">
              </a>
            </div>
          </div>
        </div>

        <div class="c-footer__background" id="c-footer__background">
        </div>

      </footer>
    `

  }

}

