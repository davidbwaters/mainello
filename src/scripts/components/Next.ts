//
// component - next
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


declare global {
  interface HTMLElementTagNameMap {
    'c-next': Next,
  }
}

@customElement('c-next')

export class Next extends LitElement {

  static styles = css`
    :host {
      background-color: var(--color-main-background-shade-2);
      display: block;
      font-size: var(--font-size-large-4);
      padding: 20vh 6.4vw;
      text-align: center;
    }
    .c-next__link {
      color: inherit;
    }
  `

  @property({
    type: Object,
    attribute: true
  })
  item

  firstUpdated():void {

    this.item = JSON.parse(this.getAttribute('item'))

  }

  protected render():TemplateSpecification {

    return html`

      ${this.item.title && this.item.slug

        ? html`
          <a class='c-next__link' href='${'/work/' + this.item.slug + '.html'}'>
            next case:
            ${this.item.title}
          </a>`
        : html``

      }

    `

  }

}
