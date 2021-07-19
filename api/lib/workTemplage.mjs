//
// page template
//

export function buildWorkTemplate(title, content) {

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

        <div asscroll-container>

          <main data-barba='container' asscroll>

            <c-page-header>
              <div>${title}</div>
            </c-page-header>

            <div class='c-page-body'>
              <c-dynamic-content
                content='${JSON.stringify(content)}'>
              </c-dynamic-content>
            </div>
          </main>

          <c-footer
            socialLinks='{{site.social_links}}'
            navLinks='{{site.menu_items}}'
            logo='{{site.logo_footer}}'
            asscroll>
            <div slot='heading' class='u-heading-huge-fluid'>
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
