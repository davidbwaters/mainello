//
// component - image row
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
    'c-image-row': ImageRow,
  }
}

interface ComponentImage {
  'url': string,
  'title': string
}

@customElement('c-image-row')

export class ImageRow extends LitElement {

  static styles = css`
    :host {
      display: grid;
      gap: var(--spacing-6);
      grid-auto-flow: column;
      margin-bottom: calc(var(--spacing-8) * 2);
      margin-left: auto;
      margin-right: auto;
      margin-top: calc(var(--spacing-8) * 2);
      width: 87.6%;
    }
  `

  @property({
    type: Array,
    attribute: true
  })
  images:Array<ComponentImage>

  protected render():TemplateSpecification {

    return html`
      ${this.images.map(item =>

        html`
          <div class='c-image-row__image-wrapper'>
            <img
              src='${item.url}'
              alt='${item.title}'
            >
          </div>
        `

      )}
    `

  }

}
