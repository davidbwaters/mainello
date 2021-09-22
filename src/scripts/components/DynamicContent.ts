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

    :host(.dynamic-content--fill-alt) *:nth-child(odd) {
      background-color: var(--color-main-background-shade-1);
    }
    :host(.dynamic-content--fill-alt) *:nth-child(even) {
      background-color: var(--color-main-background-shade-2);
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
            background=${block.background_color}
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
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
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
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
            small=${block.small}
            split=${block.split_content}
            background=${block.background_image}
            text-light=${block.text_light}
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
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
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
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
                data-scroll
                data-scroll-offset="0%, 15%" data-scroll-repeat='true'
              >
            `).join('')}
          </c-offset-columns>
        `

      }

      if (block.component === 'section_title') {

        this._blocks += `
          <c-section-title
            text='${block.text}'
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
          >
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
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
          >
          </c-pattern>
        `

      }

      if (block.component === 'blockquote') {

        this._blocks += `
          <c-blockquote
            quote='${block.quote}'
            citation='${block.citation}'
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
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

            background='${block.background_image}'
            text-light='${block.text_light}'
            border='${block.bottom_border}'
            split='${block.split}'
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
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
            reverse='${block.reverse}'
            data-scroll
            data-scroll-offset="0%, 15%" data-scroll-repeat='true'
          >

          </c-image-text>
        `

      }

      if (block.component === 'services_lists') {

        this._blocks += `
          <c-services-lists list='${JSON.stringify(
            block.list
          )}'></c-services-lists>
        `

      }

    }

  }

  protected createRenderRoot():DynamicContent {

    return this

  }

  protected render():TemplateSpecification {

    return html`
     ${unsafeHTML(this._blocks)}
    `

  }

}
