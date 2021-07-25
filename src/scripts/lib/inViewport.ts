//
// in viewport detection
//

export default function inViewport(
  el:Element, callback, options = {}
):void {

  return new IntersectionObserver(entries => {

    entries.forEach(entry => callback(entry))

  }, options).observe(el)

}
