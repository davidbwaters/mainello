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
      display: grid;
      gap: 6.2vw;
      grid-auto-flow: row;
      grid-column: 1 / span 2;
      margin-bottom: var(--spacing-8);
      margin-left: auto;
      margin-right: auto;
      margin-top: var(--spacing-8);
      width: 87.6vw;
    }

    @media (min-width: 320px) {
      :host {
        grid-column: 2 / span 8;
      }
    }

    @media (min-width: 768px) {
      :host {
        grid-auto-flow: column;
        grid-column: 3 / span 12;
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

  connectedCallback() {

    super.connectedCallback()

  }

  protected render():TemplateSpecification {

    return html`
      <div class="c-labeled-text__label">
        ${this.label}
      </div>

      <div class="c-labeled-text__text">
        ${this.text.map(item => html`
          <p>${item.paragraph}</p>
        `)}
      </div>
    `

  }

}
