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
    'c-labeled-content': LabeledText
  }
}

@customElement('c-labeled-content')

export class LabeledText extends LitElement {

  static styles = css`
    :host {
      border-bottom: solid var(--labeled-text-border) var(
        --color-opaque-dark-subtle
      );
      display: block;
      grid-column: 1 / span 2;
      padding-bottom: 6rem;
      padding-top: 6rem;
    }

    @media (min-width: 320px) {
      :host {
        grid-column: 2 / span 8;
        grid-template-columns: 100%;
        padding-left: 0;
        padding-right: 0;
      }
    }

    @media (min-width: 768px) {
      :host {
        grid-column: 3 / span 12;
      }
    }


    @media (min-width: 1080px) {
      :host {
        grid-column: 2 / span 14;
      }
    }

    .c-labeled-content__inner {
      align-content: center;
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 87.6%;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
      max-width: var(--wrapper-width);
    }

    @media (min-width: 320px) {

      .c-labeled-content__inner {
        grid-template-columns: 1fr;
      }

    }

    @media (min-width: 768px) {

      .c-labeled-content__inner {
        grid-auto-flow: column;
        grid-template-columns: 1fr 4fr;
      }

    }

    .c-labeled-content__label {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-semibold);
      letter-spacing: var(--title-normal-spacing);
      padding-bottom: var(--spacing-4);
    }

    @media (min-width: 480px) {

      .c-labeled-content__label {
        font-size:  var(--font-size-large-1);
      }

    }


    .c-labeled-content__content img {
      height: auto;
      width: 100%;
    }

    .c-labeled-content__content p {
      line-height: var(--line-height-normal-spaced);
      margin-bottom: 1.4em;
      margin-top: 0;
    }

    @media (min-width: 768px) {

      .c-labeled-content__content p {
        font-size:  var(--font-size-large-1);
      }

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
    type: String,
    attribute: true
  })
  image:string

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

  firstUpdated() {}

  protected render():TemplateSpecification {

    return html`

      <div class="c-labeled-content__inner">

        <div class="c-labeled-content__label">
          ${this.label}
        </div>

        <div class="c-labeled-content__content">
          <slot></slot>
          ${this.text
            ? html`
              ${this.text.map(item => html`
                <p>${item.paragraph}</p>
              `)}
            `
            : ``
          }
          ${this.image
            ? html`
              <img src='${this.image}' alt=''>
            `
            : ``
          }


        </div>

      </div>

    `

  }

}
