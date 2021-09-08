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
      background-color: var(--color-main-background);
      border-bottom: solid var(--labeled-text-border) var(
        --color-opaque-dark-subtle
      );
      box-sizing: border-box;
      display: block;
      grid-column: 1 / span 2;
    }

    @media (min-width: 320px) {
      :host {
        grid-column: 2 / span 8;
        grid-template-columns: 100%;
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


    :host(.c-labeled-content__small) {
      display: inline-block;
      width: 49%;
    }

    .c-labeled-content__inner {
      align-content: center;
      box-sizing: border-box;
      display: grid;
      gap: var(--spacing-8);
      grid-auto-flow: row;
      justify-content: center;
      margin: auto;
      max-width: var(--wrapper-width);
      padding-bottom: 16vh;
      padding-left: 6.4vw;
      padding-right: 6.4vw;
      padding-top: 16vh;
    }

    @media (min-width: 320px) {

      .c-labeled-content__inner {
        grid-template-columns: 1fr;
      }

    }

    @media (min-width: 768px) {

      .c-labeled-content__inner {
        grid-auto-flow: column;
        grid-template-columns: 1fr 3fr;
      }

    }

    :host(.c-labeled-content__small) .c-labeled-content__inner {
      background-color: var(--color-main-background) !important;
      gap: var(--spacing-4);
      grid-auto-flow: row;
      grid-template-columns: 1fr;
      padding-bottom: 12vh;
      padding-left: 6.4vw;
      padding-right: 6.4vw;
      padding-top: 12vh;
    }

    :host(.c-labeled-content__split) .c-labeled-content__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .c-labeled-content__label {
      letter-spacing: var(--title-normal-spacing);
      padding-bottom: var(--spacing-4);
    }

    @media (min-width: 480px) {

      .c-labeled-content__label {
        font-size:  var(--font-size-large-2);
        font-weight: var(--font-weight-normal);
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
        font-size:  var(--font-size-normal);
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

  @property({
    type: Boolean,
    attribute: true
  })
  small:boolean

  @property({
    type: Boolean,
    attribute: true
  })
  split:boolean

  firstUpdated():void {

    this.small = JSON.parse(this.getAttribute(
      'small'
    ))

    if (this.small) {

      this.classList.add('c-labeled-content__small')

    }

    this.split = JSON.parse(this.getAttribute(
      'split'
    ))
    if (this.split) {

      this.classList.add('c-labeled-content__split')

    }

  }

  protected render():TemplateSpecification {

    return html`

      <div class='c-labeled-content__inner'>

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
