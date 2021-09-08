//
// component - footer
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

import inViewport from './../lib/inViewport'
import { ContactFab } from './ContactFab'
import { Navbar } from './Navbar'
import 'shader-doodle'


declare global {
  interface HTMLElementTagNameMap {
    'c-footer': Footer,
  }
}

interface SocialLinks {
  service: string;
  link: string;
}

interface NavLinks {
  title: string;
  link: string;
}

@customElement('c-footer')

export class Footer extends LitElement {

  static styles = css`
    :host {
      background: var(--color-eerie-black);
      color: white;
      display: block;
      overflow: hidden;
      position: relative;
      top: 0;
      width: 100%;
    }

    :host a {
      color: inherit;
    }

    .c-footer__inner,
    .c-footer__line,
    .c-footer__contact {
      box-sizing: border-box;
      max-width: var(--wrapper-width);
      padding-left: 6.2vw;
      padding-right: 6.2vw;
    }

    .c-footer__inner {
      align-content: center;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
      min-height: 60vh;
      position: relative;
      width: 100%;
      z-index: 2;
    }

    .c-footer__contact {
      display: grid;
      justify-content: center;
      margin: 0;
      padding-bottom: 21.7vh;
      padding-top: 21.7vh;
    }

    .c-footer__contact a,
    .c-footer__contact span {
      padding-left: 10.46vw;
      padding-right: 10.46vw;
    }

    .c-footer__line {
      border-bottom: solid 1px var(--color-opaque-light);
    }

    .c-footer__lower {
      align-items: center;
      display: grid;
      gap: 6.2vh;
      justify-content: space-between;
      padding-bottom: 6.2vh;
      padding-top: 6.2vh;
    }

    @media (min-width: 768px) {

      .c-footer__lower {
        gap: var(--spacing-6);
        grid-auto-flow: column;
        grid-template-columns: 1fr 5fr;
      }

    }

    .c-footer__logo {
      width: 5rem
    }

    .c-footer__nav {
      display: none;
      gap: var(--spacing-4);
      grid-auto-flow: column;
      justify-content: center;
    }


    @media (max-width: 768px) {

      .c-footer__nav {
        align-items: center;
        grid-column: span 2;
        grid-row: 1;
        justify-content: space-between;
      }

    }

    .c-footer__nav-link {
      text-decoration: none;
    }

    .c-footer__nav-link.active {
      text-decoration: underline;
    }

    .c-footer__social,
    .c-footer__contact-link {
      align-content: end;
      display: grid;
      grid-auto-columns: min-content;
      grid-auto-flow: column;
      gap: 1rem;
      justify-self: end;
    }

    @media (max-width: 768px) {

      .c-footer__social {
        grid-area: 2 / 2 / auto / auto;
      }

    }

    .c-footer__social img {
      height: 20px;
      width: 20px;
    }

    .c-footer__background {
      opacity: 0.4;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    ::slotted(a) {
      color: inherit;
    }
  `

  @property({
    type: Array,
    attribute: true
  })
  socialLinks:Array<SocialLinks>

  @property({
    type: Array,
    attribute: true
  })
  navLinks:Array<NavLinks>

  @property({
    type: String,
    attribute: true
  })
  logo:string

  baseFrameRate = 30
  frameRate = this.baseFrameRate

  instance

  private _wrapper:HTMLDivElement

  private _createWrapper() {

    const el = document.createElement('div')

    el.id = 'c-footer__background'
    el.setAttribute('slot', 'background')

    this.appendChild(el)
    this._wrapper = el

  }

  private _inViewort() {

    const contactFab:ContactFab = document.querySelector(
      'c-contact-fab'
    )

    const navbar:Navbar = document.querySelector(
      'c-navbar'
    )

    let visible = false

    inViewport(this._wrapper, el => {

      if (el.isIntersecting) {

        this.frameRate = this.baseFrameRate

      }
      else {

        this.frameRate = 4

      }

    })

    inViewport(this, el => {

      if (el.isIntersecting) {

        visible = true

        if (contactFab) {

          contactFab.style.opacity = '0'
          contactFab.style.pointerEvents = 'none'

        }

        navbar.classList.toggle('u-transparent')

      }
      else {

        if (visible) {

          visible = false

          if (contactFab) {

            contactFab.style.opacity = '1'
            contactFab.style.pointerEvents = 'all'

          }

          navbar.classList.toggle('u-transparent')

        }

      }

    })

  }

  sketch = (sketch):void => {

    let shader

    sketch.preload = () => {

      shader = sketch.loadShader(
        '/shaders/fabric.vert',
        '/shaders/fabric.frag'
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

      canvas.parent('c-footer__background')

    }

    sketch.draw = () => {

      sketch.frameRate(this.frameRate)
      sketch.shader(shader)

      shader.setUniform('u_resolution', [
        sketch.width, sketch.height
      ])

      shader.setUniform('u_time', (
        sketch.millis() / 1000) +
        (Math.abs(sketch.mouseX) / 300)
      )

      sketch.quad(-5, -5, 5, -5, 5, 5, -5, 5)

    }

  }

  firstUpdated(): void {

    this._createWrapper()
    this._inViewort()

    //this.instance = new window.p5(this.sketch)

  }

  protected render():TemplateSpecification {

    return html`
      <shader-doodle class='c-footer__background'>

        <script type="x-shader/x-fragment" />#ifdef GL_ES
      precision mediump float;
      #endif
      uniform sampler2D backbuffer;

      void main() {
          vec2 st = (2.*gl_FragCoord.xy-u_resolution)/min(u_resolution.x,u_resolution.y)*1.1;
          vec2 coord = st;

          float len;

          for (int i = 0; i < 3; i++) {
              len = length(vec2(coord.x, coord.y));

              coord.x +=  sin(coord.y + u_time * 0.3)*1.;
              coord.y +=  cos(coord.x + u_time * 0.1 + cos(len * 1.0))*6.;
          }

          vec3 color = vec3(0.);

          color = mix(color, vec3(cos(len)), 1.0);

          gl_FragColor = vec4(0.7*color,1.);

          //vec4 c = vec4(9.*color,1.);

          //float alpha = 0.07;

          //gl_FragColor = c*alpha + texture2D( backbuffer, st )*(1.0-alpha);
      }

          </script>
      </shader-doodle>

      <div class='c-footer__inner'>
        <div class='c-footer__contact'>

          <slot name='heading'>
          </slot>

        </div>
        <div class='c-footer__line'></div>
        <div class='c-footer__lower'>
          <img
            class='c-footer__logo'
            src='${this.logo}'
          >

          <nav class='c-footer__nav'>
            ${this.navLinks.map(item =>

              html`
                <a
                  class='c-footer__nav-link'
                  href='${item.link}'
                >
                  ${item.title}
                </a>
              `

            )}
          </nav>
          <!--
            <div class='c-footer__social'>

              ${this.socialLinks.map(item =>

                html`
                  <a
                    class='c-footer__social-link'
                    href="${item.link}"
                  >
                    <img
                      src='/icons/social/${item.service}.svg'
                    >
                  </a>
                `

              )}

            </div>
          -->
          <a class="c-footer__contact-link" href="/contact.html">
            contact
          </a>
        </div>
      </div>
    `

  }

}

