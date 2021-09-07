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

import { unsafeHTML } from 'lit/directives/unsafe-html.js'


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

    :host *:nth-child(even) {
      background-color: var(--color-main-background-shade-1);
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

      //console.log(block)

      if (block.component === 'featured_image') {

        this._blocks += `
          <c-featured-image
            link=${block.media}
            alt=$(block.title)}
            spacing=${block.spacing}
            size=${block.image_size}
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
            color=${block.background_color}
          >
          </c-featured-video>
        `

      }

      if (block.component === 'labeled_text') {

        this._blocks += `
          <c-labeled-content
            label='${JSON.stringify(
              block.label
            )
              .replace(/'/g, '&#39;')
              .replace(/"/g, "")}'
            text='${JSON.stringify(
              block.text
            )
              .replace(/'/g, '&#39;')
            }'
            spacing=true
            border=${block.bottom_border}
          >
          </c-labeled-content>
        `

      }

      if (block.component === 'labeled_image') {

        this._blocks += `
          <c-labeled-content
            label='${block.label
              .replace(/'/g, '&#39;')
          }'
            image='${block.image}'
            spacing=true
            border=${block.bottom_border}
          >
          </c-labeled-content>
        `

      }

      if (block.component === 'offset_columns') {

        this._blocks += `
          <c-offset-columns
            reverse='${block.reverse}'
            items='${block.items}'
          >
            ${block.items.map(item => `
              <img
                class='c-offset-columns__item'
                src='${item.url}'
                alt='${item.title}'
              >
            `).join('')}
          </c-offset-columns>
        `

      }

      if (block.component === 'section_title') {

        this._blocks += `
          <c-section-title text='${block.text}'>
          </c-section-title>
        `

      }

      if (block.component === 'pattern') {

        this._blocks += `
          <c-pattern
            height='${block.wrapper_height_percent}'
            image='${block.image}'
            patternPosition='${block.pattern_position}'
            patternWidth='${block.pattern_width}'
            repeat='${block.repeat}'
          >
          </c-pattern>
        `

      }

      if (block.component === 'blockquote') {

        this._blocks += `
          <c-blockquote
            quote='${block.quote}'
            citation='${block.citation}'
          >
          </c-blockquote>
        `

      }

      if (block.component === 'article') {


        this._blocks += `
          <c-article
            heading='${JSON.stringify(
              block.heading
            )
              .replace(/'/g, '&#39;')
              .replace(/"/g, "")}'
            text='${
              block.text
                .replace(/'/g, '&#39;')
          }'
            border='${block.bottom_border}'
          >
          </c-article>
        `

      }


      if (block.component === 'stat_columns') {

        this._blocks += `
          <c-stat-columns
          stats='${JSON.stringify(
            block.stats
          ).replace(/'/g, '&#39;')
        }'
          >
          </c-stat-columns>
        `

      }


      if (block.component === 'line_divider') {

        this._blocks += `
          <div class='c-line'></div>
        `

      }


      if (block.component === 'image_with_text') {

        this._blocks += `
          <c-image-text
            image=${block.image}
            heading='${block.heading}'
            subheading='${block.subheading}'
            text='${block.text}'
          >

          </c-image-text>
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
