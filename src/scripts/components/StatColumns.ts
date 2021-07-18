//
// component - stat column
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
    'c-stat-colums': ImageRow
  }
}

interface StatColumn {
  'stat': string,
  'text': string
}

@customElement('c-stat-colums')

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

    .c-stat-columns__column {
      text-align: center;
    }

    .c-stat-columns__stat {
      font-size: var(--font-size-large-4);
    }
  `

  @property({
    type: Array,
    attribute: true
  })
  stats:Array<StatColumn>

  protected render():TemplateSpecification {

    return html`
      ${this.stats.map(item =>

        html`
          <div class="c-stat-columns__column">
            <h4 class="c-stat-columns__stat">
              ${item.stat}
            </h4>
            <div class="c-stat-columns__stat">
              ${item.text}
            </div>
          </div>
        `

      )}
    `

  }

}
