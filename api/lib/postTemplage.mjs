//
// post template
//

export function buildPostTemplate(title, content) {

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

          <main data-barba='container' data-barba-namespace='post'>


            <div class='u-wrapper u-padding-grid-horizontal u-margin-20vh-bottom '>
              <div class='
                u-heading-large
                active
                u-margin-20vh-bottom
                u-margin-30vh-top
              '>
                ${title}
              </div>
              ${JSON.stringify(content)
                .replace(/\\n/g, '')
                .replace(/"/g, '')
              }
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

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DEMW61VYHQ"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DEMW61VYHQ');
        </script>

      </body>
    </html>
  `

}
