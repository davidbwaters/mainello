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
    'c-services-lists': ServicesList
  }
}

@customElement('c-services-lists')


export class ServicesList extends LitElement {

  static styles = css`
    :host {
      background-color: var(--color-main-background);
      border-bottom: solid var(--labeled-text-border) var(
        --color-opaque-dark-subtle
      );
      box-sizing: border-box;
      display: block;
      gap: var(--spacing-5);
      grid-column: 1 / span 2;
      padding-left: 6.4vw;
      padding-right: 6.4vw;
    }

    @media (min-width: 320px) {
      :host {
        display: grid;
        grid-column: 1 / span 10;
        grid-template-columns: 100%;
      }
    }

    @media (min-width: 768px) {
      :host {
        grid-column: 1 / span 16;
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
    }


    @media (min-width: 1080px) {
      :host {
        grid-column: 1 / span 16;
      }
    }


    :host(.c-services-lists--small) {
      display: inline-block;
      width: 49%;
    }

    .c-services-lists__list {
      align-content: start;
      box-sizing: border-box;
      display: grid;
      gap: 0;
      grid-auto-flow: column;
      grid-template-columns: 1fr 2fr;
      justify-content: center;
      max-width: var(--wrapper-width);
      padding-bottom: 16vh;
      padding-top: 16vh;
    }

    @media (min-width: 320px) {

      .c-services-lists__list {
      }

    }

    @media (min-width: 768px) {

      .c-services-lists__list {
        grid-auto-flow: row;
        grid-template-columns: 1fr;
      }

    }

    :host(.c-services-lists--small) .c-services-lists__list {
      background-color: var(--color-main-background) !important;
      gap: var(--spacing-4);
      grid-auto-flow: row;
      grid-template-columns: 1fr;
      padding-bottom: 12vh;
      padding-left: 6.4vw;
      padding-right: 6.4vw;
      padding-top: 12vh;
    }

    :host(.c-services-lists__split) .c-services-lists__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .c-services-lists__label {
      letter-spacing: var(--title-normal-spacing);
      padding-bottom: var(--spacing-4);
    }

    .c-services-lists__label:after {
      background-color: currentColor;
      content: '';
      display: block;
      height: .125rem;
      margin-top: 0.75em;
      width: 1em
    }

    @media (min-width: 480px) {

      .c-services-lists__label {
        font-size:  var(--font-size-large-2);
        font-weight: var(--font-weight-normal);
      }

    }

    .c-services-lists__content {
      list-style-type: none;
      padding-left: .25rem;
    }

    .c-services-lists__content img {
      height: auto;
      width: 100%;
    }

    .c-services-lists__content p,
    .c-services-lists__content li {
      line-height: var(--line-height-normal-spaced);
      margin-bottom: 1.0em;
      margin-top: 0;
    }

    @media (min-width: 768px) {

      .c-services-lists__content p {
        font-size:  var(--font-size-normal);
      }

    }

    .c-services-lists__content li {
      text-indent: -5px;
    }

    .c-services-lists__content li:before {
      content: "- ";
      text-indent: -5px;
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
  list:Array<Record<string, Array<Record<string, unknown>>>>


  protected render():TemplateSpecification {

    return html`
      ${this.list
        ? html`

          ${this.list.map(item => html`
            <div class='c-services-lists__list'>

              <div class="c-services-lists__label">
                ${item.service}
              </div>

              <ul class="c-services-lists__content">
                <slot></slot>
                ${item.services
                  ? html`
                    ${item.services.map(item => html`
                      <li>${item.service}</li>
                    `)}
                  `
                  : ``
                }


              </ul>

            </div>

          `)}
        `
        : html``
      }

    `

  }

}
