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
    'c-stat-columns': StatColumns
  }
}

interface StatColumn {
  'stat': string,
  'text': string
}

@customElement('c-stat-columns')

export class StatColumns extends LitElement {

  static styles = css`
    :host {
      border-top: 1px solid var(--color-opaque-dark-subtle);
      display: grid;
      gap: var(--spacing-6);
      grid-auto-flow: column;
      padding-bottom: calc(var(--spacing-8) * 2);
      padding-left: 6.2vw;
      padding-right: 6.2vw;
      padding-top: calc(var(--spacing-8) * 2);
      width: 87.6%;
    }

    .c-stat-columns__column {
      text-align: center;
    }

    .c-stat-columns__stat {
      font-size: var(--font-size-large-5);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-1);
      -webkit-text-stroke: 1px currentColor;
      -webkit-text-fill-color: transparent;
    }

    .c-stat-columns__text {
      font-family: var(--font-mono);
      font-size: var(--font-size-mono-normal);
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
            <div class="c-stat-columns__stat">
              ${item.stat}
            </div>
            <div class="c-stat-columns__text">
              ${item.text}
            </div>
          </div>
        `

      )}

    `

  }

}
