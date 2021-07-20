//
// component - labeled text
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


declare global {
  interface HTMLElementTagNameMap {
    'c-labeled-text': LabeledText
  }
}

@customElement('c-labeled-text')

export class LabeledText extends LitElement {

  static styles = css`
    :host {
      border-bottom: solid var(--labeled-text-border) var(
        --color-opaque-dark-subtle
      );
      display: block;
      grid-column: 1 / span 2;
      padding-bottom: calc(10vh + 5.5vw);
      padding-top: calc(10vh + 5.5vw);
    }

    @media (min-width: 320px) {
      :host {
        grid-column: 2 / span 8;
        padding-left: 0;
        padding-right: 0;
      }
    }

    @media (min-width: 768px) {
      :host {
        grid-column: 3 / span 12;
      }
    }

    .c-labeled-text__inner {
      display: grid;
      gap: 6.2vw;
      grid-auto-flow: row;
      margin-left: auto;
      margin-right: auto;
      padding-left: var(
        --labeled-text-spacing
      );
      padding-right: var(
        --labeled-text-spacing
      );
      max-width: var(--wrapper-width);
    }

    @media (min-width: 768px) {

      .c-labeled-text__inner {
        grid-auto-flow: column;
      }

    }

    .c-labeled-text__label {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--title-normal-spacing);
      line-height: 1.6rem;
      padding-bottom: var(--spacing-4);
    }

    .c-labeled-text__text p {
      line-height: var(--line-height-normal-spaced);
      margin-bottom: 1.4em;
      margin-top: 0;
    }
  `

  @property({
    type: String,
    attribute: true
  })
  label:string

  @property({
    type: Array,
    attribute: true
  })
  text:Array<Record<string, unknown>>

  @property({
    type: Boolean,
    attribute: true
  })
  spacing:boolean

  @property({
    type: Boolean,
    attribute: true
  })
  border:boolean

  connectedCallback():void {

    super.connectedCallback()

    const spacing = '6.2vw'

    this.border = JSON.parse(
      this.getAttribute('border')
    )

    this.spacing = JSON.parse(
      this.getAttribute('spacing')
    )

    if (this.spacing) {

      this.style.setProperty(
        '--labeled-text-spacing',
        spacing
      )

    }
    else {

      this.style.setProperty(
        '--labeled-text-spacing',
        '0'
      )

    }

    if (this.border) {

      this.style.setProperty(
        '--labeled-text-border',
        '1px'
      )

    }
    else {

      this.style.setProperty(
        '--labeled-text-border',
        '0'
      )

    }

  }

  protected render():TemplateSpecification {

    return html`

      <div class="c-labeled-text__inner">

        <div class="c-labeled-text__label">
          ${this.label}
        </div>

        <div class="c-labeled-text__text">
          ${this.text.map(item => html`
            <p>${item.paragraph}</p>
          `)}
        </div>

      </div>

    `

  }

}
