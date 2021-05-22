//
// shortcode
//

exports.carousel = data => {

  return `
    <div class="c-carousel">
      <div class="glider">
        ${data}
      </div>
    </div>

  `

}

exports.fullWidthImage = (data, alt) => {

  return `
    <div class="c-full-width-image">
      <img src="${data}" alt="${alt}">
    </div>
  `

}

exports.fullWidthVideo = (data, style) => {

  return `
    <div class="c-full-width-video" style=${style}>
      <video class="js-play-in-view">
        <source
          src="${data}"
          type="video/mp4"
        >
      </video>
    </div>

  `

}

exports.labeledText = (data, title) => {

  return `
    <div class="o-container">
      <div class="c-labeled-text c-labeled-text--spacing-large">
        <div class="c-labeled-text__label">
          ${title}
        </div>
        <div class="c-labeled-text__text">
          ${data}
        </div>
      </div>
    </div>
  `

}

exports.offsetColumns = data => {

  return `
    <div class="c-offset-columns">
      ${data}
    </div>

  `

}

exports.spacedVideo = data => {

  return `
    <div class="c-spaced-video">
      <video>
        <source
          src="${data}"
          type="video/mp4"
        >
      </video>
    </div>

  `

}

