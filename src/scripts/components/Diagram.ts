//
// component - featured image
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  customElement,
  property
} from 'lit/decorators.js'

import { gsap } from 'gsap'


declare global {
  interface HTMLElementTagNameMap {
    'c-diagram': Diagram,
  }
}

@customElement('c-diagram')

export class Diagram extends LitElement {

  static styles = css`

    :host {
      --diagram-circle-size: 28vmin;
      --diagram-offset-x: 50%;
      --diagram-offset-y: 43.3%;
      --diagram-noise: url(data:image/png;base64,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);
      background-color: white;
      display: block;
      height: 80vh;
      position: relative;
    }

    .c-diagram__inner {
      border-radius: var(--diagram-circle-size);
      height: calc(var(--diagram-circle-size) * 2);
      left: calc(50% - var(--diagram-circle-size));
      position: absolute;
      top: calc(50% - var(--diagram-circle-size));
      transform-origin: center center;
      width: calc(var(--diagram-circle-size) * 2);
    }

    .c-diagram__circle {
      align-content: center;
      box-sizing: border-box;
      color: var(--diagram-color-2-text);
      border-radius: var(--diagram-circle-size);
      display: grid;
      height: var(--diagram-circle-size);
      left: calc(50% - var(--diagram-circle-size) / 2);
      mix-blend-mode: multiply;
      position: absolute;
      top: calc(50% - var(--diagram-circle-size) / 2);
      transform-origin: center center;
      width: var(--diagram-circle-size);
    }

    .c-diagram__circle:nth-child(1) {
      background-size: 2.5vmin auto;
      box-shadow: inset 0vmin 0 2vmin rgba(247, 248, 252, 0.005),
        inset 0vmin -1vmin 10vmin rgba(212, 197, 199, 0.005),
        inset 0vmin 0vmin 10vmin rgba(195, 197, 234, 0.005),
        inset 0vmin 0vmin 18vmin rgba(114, 181, 175, 0.2);
      color: rgba(110, 175, 169, 1);
    }

    .c-diagram__circle:nth-child(2) {
      background-size: 14vmin auto;
      box-shadow: inset 0vmin 0vmin 2vmin rgba(247, 248, 252, 0.1),
        inset 0vmin -1vmin 10vmin rgba(126, 159, 232, 0.05),
        inset 0vmin 0vmin 10vmin rgba(195, 197, 234, 0.075),
        inset 0vmin 0vmin 18vmin rgba(94, 124, 226, 0.2);
      color: rgba(94, 124, 226, 0.8);
    }
    .c-diagram__circle:nth-child(3) {
      background-size: 2.5vmin auto;
      box-shadow: inset 0vmin 0vmin 2vmin rgba(247, 248, 252, 0.1),
        inset 0vmin -1vmin 10vmin rgba(114, 181, 175, 0.05),
        inset 0vmin 0vmin 10vmin rgba(195, 197, 234, 0.075),
        inset 0vmin 0vmin 18vmin rgba(29, 30, 44, 0.125);
      color: rgba(163, 143, 146, 1);
    }

    .c-diagram__circle:nth-child(1),
    .c-diagram__circle:nth-child(2),
    .c-diagram__circle:nth-child(3) {
      z-index: 1;
    }
    .c-diagram__circle:nth-child(1) .c-diagram__title {
      transform: translateY(120%);
    }

    .c-diagram__circle:nth-child(2) .c-diagram__title {
      transform: translateY(-120%);
    }

    .c-diagram__title {
      box-sizing: border-box;
      display: grid;
      font-size: 1.2rem;
      justify-content: center;
      height: 100%;
      position: relative;
      z-index: 9;
      width: 100%;
    }
  `

  firstUpdated():void {

    const animation = gsap.timeline({
      repeat: -1
    })

    const duration = 0.8

    const down = 50 * 0.866
    const left = -50
    const right = 50
    const up = -50 * 0.866

    const borderSize = 0

    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-title-1]'
      ),
      {
        x: 0 + '%',
        y: 120 + '%',
        scale: 1,
        duration: 0
      },
      duration * 0
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-title-2]'
      ),
      {
        x: 0 + '%',
        y: -120 + '%',
        scale: 1,
        duration: 0
      },
      duration * 0
    )

    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-1]'
      ),
      {
        x: left * 0.8 + '%',
        y: down * 0.8 + '%',
        scale: 1,
        duration: duration * 2
      },
      duration * 0
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-2]'
      ),
      {
        x: right * 0.8 + '%',
        y: down * 0.8 + '%',
        scale: 1,
        duration: duration * 2
      },
      duration * 0
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-3]'
      ),
      {
        x: 0,
        y: up * 0.8 + '%',
        scale: 1,
        duration: duration * 2
      },
      duration * 0
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-title-1]'
      ),
      {
        x: 0 + '%',
        y: 0 + '%',
        scale: 1,
        duration: duration
      },
      duration * 0
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-title-2]'
      ),
      {
        x: 0 + '%',
        y: 0 + '%',
        scale: 1,
        duration: duration
      },
      duration * 0
    )

    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-1]'
      ),
      {
        x: left + '%',
        y: down + '%',
        scale: 0.7,
        duration: duration * 2
      },
      duration * 4
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-2'
      ),
      {
        x: right + '%',
        y: down + '%',
        scale: 0.7,
        duration: duration * 2
      },
      duration * 4
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-3]'
      ),
      {
        x: 0,
        y: up + '%',
        scale: 0.7,
        duration: duration * 2
      },
      duration * 4
    )

    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-1]'
      ),
      {
        x: left * 1.5 + '%',
        y: 0,
        scale: 1,
        duration: duration * 2
      },
      duration * 8
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-2]'
      ),
      {
        x: right * 1.5 + '%',
        y: 0,
        scale: 1,
        duration: duration * 2
      },
      duration * 8
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-3]'
      ),
      {
        x: 0,
        y: 0,
        scale: 1,
        duration: duration
      },
      duration * 8
    )

    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-1]'
      ),
      {
        x: 0 + '%',
        y: 0 + '%',
        scale: 1,
        duration: duration
      },
      duration * 12
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-2]'
      ),
      {
        x: 0 + '%',
        y: 0 + '%',
        scale: 1,
        duration: duration
      },
      duration * 12
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-bubble-3]'
      ),
      {
        x: 0,
        y: 0 + '%',
        scale: 1,
        duration: duration
      },
      duration * 12
    )

    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-title-1]'
      ),
      {
        x: 0 + '%',
        y: 120 + '%',
        scale: 1,
        duration: duration
      },
      duration * 12
    )
    animation.to(
      this.shadowRoot.querySelector(
        '[data-diagram-title-2]'
      ),
      {
        x: 0 + '%',
        y: -120 + '%',
        scale: 1,
        duration: duration
      },
      duration * 12
    )

    animation.to(
      this.shadowRoot.querySelector('[data-diagram-inner]'),
      {
        rotate: '1440deg',
        duration: duration * 15,
        ease: 'none'
      },
      duration * 0
    )

    animation.to(
      [
        this.shadowRoot.querySelector(
          '[data-diagram-bubble-1]'
        ),
        this.shadowRoot.querySelector(
          '[data-diagram-bubble-2]'
        ),
        this.shadowRoot.querySelector(
          '[data-diagram-bubble-3]'
        )
      ],
      {
        rotate: '-1440deg',
        duration: duration * 15,
        ease: 'none'
      },
      duration * 0
    )

    //animation.pause()


  }


  protected render():TemplateSpecification {

    return html`
      <div class="c-diagram__inner" data-diagram-inner="data-diagram-inner">
        <div class="c-diagram__circle" data-diagram-bubble-1="data-diagram-bubble-1">
          <div class="c-diagram__title" data-diagram-title-1="data-diagram-title-1">
            development
          </div>
        </div>
        <div class="c-diagram__circle" data-diagram-bubble-2="data-diagram-bubble-2">
          <div class="c-diagram__title" data-diagram-title-2="data-diagram-title-2">
            design
          </div>
        </div>
        <div class="c-diagram__circle" data-diagram-bubble-3="data-diagram-bubble-3">
          <div class="c-diagram__title" data-diagram-title-3="data-diagram-title-3">
            operations
          </div>
        </div>
      </div>`

  }

}
