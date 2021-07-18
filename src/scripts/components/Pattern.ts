//
// component - pattern
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
    'c-pattern': Pattern,
  }
}

@customElement('c-pattern')

export class Pattern extends LitElement {

  static styles = css`
    :host {
      display: grid;
      height:  var(--pattern-height);
      margin-bottom: 20vh;
      margin-top: 20vh;
    }
    .c-pattern__inner {
      background-position: var(--pattern-position);
      background-repeat: repeat;
      background-size: var(--pattern-width) auto;
    }
  `

  @property({
    type: String,
    attribute: true
  })
  image:string

  @property({
    type: Number,
    attribute: true
  })
  patternWidth:number

  @property({
    type: String,
    attribute: true
  })
  patternPosition:string

  @property({
    type: Number,
    attribute: true
  })
  height:number

  connectedCallback():void {

    super.connectedCallback()

    this.style.setProperty(
      '--pattern-height',
      this.height.toString() + 'vh'
    )

    this.style.setProperty(
      '--pattern-position',
      this.patternPosition
    )

    this.style.setProperty(
      '--pattern-width',
      this.patternWidth.toString() + 'px'
    )


  }

  protected render():TemplateSpecification {

    return html`
      <div
        style='background-image:url(${this.image})'
        class='c-pattern__inner'
      ></div>
    `

  }

}
