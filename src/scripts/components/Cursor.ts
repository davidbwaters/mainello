//
// component - cursor
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

import {
  ref,
  createRef
} from 'lit/directives/ref'

import gsap from 'gsap'

declare global {
  interface HTMLElementTagNameMap {
    'c-cursor': Cursor,
  }
}

interface CursorPosition {
  'cursorX': number,
  'cursorY': number,
  'currentX': number,
  'currentY': number
}

interface CursorTarget {
  'element': Element
}

@customElement('c-cursor')

export class Cursor extends LitElement {

  static styles = css`
    :host {
      --cursor-size: 2.5rem;

      display: var(--cursor-display);
      height: var(--cursor-size);
      left: calc(var(--cursor-size) / 2 * -1);
      pointer-events: none;
      position: fixed;
      top: calc(var(--cursor-size) / 2 * -1);
      width: var(--cursor-size);
      will-change: transform, opacity;
    }

    .c-cursor__inner {
      background-color: var(--color-opaque-dark);
      border-radius: var(--cursor-size);
      border-style: solid;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      will-change: transform, background-color, border-color;
    }
  `

  @property({
    type: Object,
    attribute: true,
    reflect: true
  })
  position:CursorPosition

  @property({
    type: String,
    attribute: true,
    reflect: true
  })
  css:string

  innerEl = createRef<HTMLDivElement>()

  private _set = gsap.quickSetter(this, 'css')
  private _speed = 0.2
  private _targets:Array<CursorTarget>
  private _delta:number
  private _activeTarget:HTMLElement

  private _enterStyles = {
    backgroundColor: 'rgba(160,160,160,0.2)',
    borderColor: 'rgba(80,80,80,0.3)',
    duration: 0.4,
    scale: 1
  }

  private _leaveStyles = {
    backgroundColor: 'rgba(80,80,80,0.8)',
    borderColor: 'rgba(80,80,80,0.3)',
    borderWidth: '1px',
    duration: 0.4,
    scale: 0.35,
    opacity: 1.0
  }

  setViewport():void {

    this.position.currentX = window.innerWidth / 2
    this.position.currentY = window.innerHeight / 2

  }

  handleEnter(e):void {

    gsap.to(
      this.innerEl.value,
      this._enterStyles
    )

    this._activeTarget = e.target

  }

  handleLeave(e):void {

    gsap.to(
      this.innerEl.value,
      this._leaveStyles
    )

    gsap.to(
      e.target, {
        x: 0,
        y: 0
      }
    )

    this._activeTarget = null

  }

  refresh():void {

    if (this._targets) {

      this._targets.forEach(el => {

        el.element.removeEventListener(
          'mouseenter', this.handleEnter
        )

        el.element.removeEventListener(
          'mouseleave', this.handleLeave
        )

      })

    }

    this._targets = []

    const magneticTargetEls:Array<HTMLElement> = Array.from(
      document.querySelectorAll(
        'c-button, c-toggle, [data-cursor-magnetic="true"]'
      )
    )

    const normalTargetEls = Array.from(
      document.querySelectorAll(
        'a, button, [data-cursor-target]'
      )
    )

    magneticTargetEls.forEach(el => {

      el.dataset.cursorMagnetic = 'true'

    })

    const targetEls = [
      ...magneticTargetEls, ...normalTargetEls
    ]

    targetEls.forEach(el => {

      this._targets = this._targets.concat(
        [{
          'element': el
        }]
      )

    })

    if (this._targets) {

      this._targets.forEach(el => {

        el.element.addEventListener(
          'mouseenter', this.handleEnter.bind(this)
        )

        el.element.addEventListener(
          'mouseleave', this.handleLeave.bind(this)
        )

      })

    }


  }

  constructor() {

    super()

    this.position = {
      currentX: 0,
      currentY: 0,
      cursorX: 0,
      cursorY: 0
    }

    this.setViewport()

    this.position.cursorX =
      this.position.currentX

    this.position.cursorY =
      this.position.currentY

    window.addEventListener(
      'resize', () => {

        setTimeout(() => {

          this.setViewport()
          this.refresh()

        }, 4000)

      }
    )

  }

  firstUpdated():void {

    const isTouch =
      'ontouchstart' in document.documentElement

    if (isTouch === true) {

      this.style.setProperty(
        '--cursor-display', 'none'
      )

    }
    else {

      this.style.setProperty(
        '--cursor-display', 'block'
      )

    }

    window.addEventListener('mousemove', e => {

      this.position.cursorX = e.x
      this.position.cursorY = e.y

    })

    gsap.ticker.add(() => {

      this._delta = 1.0 - Math.pow(
        1.0 - this._speed,
        gsap.ticker.deltaRatio()
      )

      this.position.currentX +=
        (this.position.cursorX - this.position.currentX) *
        this._delta

      this.position.currentY +=
        (this.position.cursorY - this.position.currentY) *
        this._delta


      this._set({
        x: this.position.currentX,
        y: this.position.currentY
      })

      if (
        this._activeTarget &&
        (this._activeTarget.dataset.cursorMagnetic === 'true' ||
        this._activeTarget.parentElement.dataset.cursorMagnetic === 'true')
      ) {

        const rect = this._activeTarget
          .getBoundingClientRect()

        let magneticX =
          (
            (
              rect.x +
              (rect.width / 2) -
              this.position.cursorX
            )
          ) / -2

        if (magneticX > 0) {

          magneticX = Math.min(
            magneticX, 15
          )

        }
        else {

          magneticX = Math.max(
            magneticX, -15
          )

        }

        let magneticY =
          (
            (
              rect.y +
              (rect.height / 2) -
              this.position.cursorY
            )
          ) / -2

        if (magneticY > 0) {

          magneticY = Math.min(
            magneticY, 15
          )

        }
        else {

          magneticY = Math.max(
            magneticY, -15
          )

        }
        gsap.to(
          this._activeTarget, {
            x: magneticX,
            y: magneticY,
            duration: 0.15
          }
        )

      }

    })


    gsap.to(
      this.innerEl.value,
      this._leaveStyles
    )

    setTimeout(() => {

      this.refresh()

    }, 2000)

  }

  protected render():TemplateSpecification {

    return html`
      <div
        class='c-cursor__inner'
        ${ref(this.innerEl)}
      ></div>
    `

  }

}
