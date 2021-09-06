//
// page template
//

export function buildWorkTemplate(
  title,
  heading,
  featuredImage,
  descriptionLabel,
  description,
  content
) {

  return `
    <!DOCTYPE html>
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{{site.title}}</title>
        <link rel='icon' href='/images/favicon.png' />
        <script type='module' src='/scripts/main.ts'></script>
      </head>
      <body data-barba='wrapper' style='opacity: 0'>

        <c-navbar>
          <a href='/'>
            <img src='{{site.logo_header}}'>
          </a>
        </c-navbar>

        <c-nav-menu
          navLinks='{{site.menu_items}}'
        >
        </c-nav-menu>

        <div data-scroll-container class="u-will-change-transform-opacity">

          <main data-barba='container'>

            <c-page-header>
              <div>
                ${title}
              </div>
              <div slot='subtitle'>
                ${heading}
              </div>
            </c-page-header>

            <c-featured-image
              link='${featuredImage}'
              alt='${title}'
            >
            </c-featured-image>

            <c-article
              class='u-bg-main-shade-1'
              heading='${descriptionLabel}'
              text='${description}'
            >
            </c-article>

            <div class='c-page-body'>
              <c-dynamic-content
                content='${content}'>
              </c-dynamic-content>
            </div>
          </main>


          <c-footer
            socialLinks='{{site.social_links}}'
            navLinks='{{site.menu_items}}'
            logo='{{site.logo_footer}}'
          >
            <div slot='heading' class='u-heading-huge'>
              {{{site.footer_heading}}}
            </div>
          </c-footer>
        </div>

        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.3/p5.min.js'
          integrity='sha512-xrAcaPlDVY5TDNAKKsVPf040TnCatM3YFUi/AChhyBLJ1IVn+lbAKTiVDjhicrUFPqz/IvC0S2uVlbi7iF6I7w=='
          crossorigin='anonymous'
          referrerpolicy='no-referrer'
        >
        </script>

      </body>
    </html>
  `

}
