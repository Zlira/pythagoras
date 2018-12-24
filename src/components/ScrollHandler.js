class ScrollController {
  constructor() {
    this.allowed = true

    this.prevent = this.prevent.bind(this)
    this.allow = this.allow.bind(this)
  }

  prevent (threshodlElId, leeway=60) {
    // todo handle window resize
    if (!this.allowed) {return}
    this.allowed = false
    window.onscroll = e => {
      const threshodlEl = document.getElementById(threshodlElId)
      const html = document.querySelector('html')
      const yLimit = threshodlEl.getBoundingClientRect().y +
        html.scrollTop - window.innerHeight + leeway
      if (html.scrollTop >= yLimit) {
        window.scrollTo(html.scrollLeft, yLimit)
      }
    }
  }

  allow () {
    window.onscroll = null
    this.allowed = true
  }
}


export default ScrollController