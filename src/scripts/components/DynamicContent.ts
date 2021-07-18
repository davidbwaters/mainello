//
// component - dynamic content
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

import {unsafeHTML} from 'lit/directives/unsafe-html.js'


declare global {
  interface HTMLElementTagNameMap {
    'c-dynamic-content': DynamicContent,
  }
}

@customElement('c-dynamic-content')

export class DynamicContent extends LitElement {

  static styles = css`
    :host {
      display: block;
    }


  `

  @property({
    type: Array,
    attribute: true
  })
  content:Array<Record<string, unknown>>

  private _blocks = ''

  connectedCallback():void {

    super.connectedCallback()

    for (const block of this.content) {

      console.log(block)

      if (block.component === 'featured_image') {

        this._blocks += `
          <c-featured-image
            link=${block.media}
            alt=${block.title}
            spacing=${block.spacing}
          >
          </c-featured-image>
        `

      }

      if (block.component === 'featured_video') {

        this._blocks += `
          <c-featured-video
            loop=${block.loop}
            link=${block.media}
            spacing=${block.spacing}
          >
          </c-featured-video>
        `

      }

      if (block.component === 'labeled_text') {

        this._blocks += `
          <c-labeled-text
            label='${block.label}'
            text='${JSON.stringify(block.text)}'
          >
          </c-labeled-text>
        `

      }

      if (block.component === 'offset_columns') {

        this._blocks += `
          <c-offset-columns
            reverse='${block.reverse}'
            items='${JSON.stringify(block.items)}'
          >
          </c-offset-columns>
        `

      }


      if (block.component === 'pattern') {

        this._blocks += `
          <c-pattern
            height='${block.wrapper_height_percent}'
            image='${block.image}'
            patternPosition='${block.pattern_position}'
            patternWidth='${block.pattern_width}'
          >
          </c-pattern>
        `

      }

    }

  }

  protected render():TemplateSpecification {

    return html`
     ${unsafeHTML(this._blocks)}
    `

  }

}
