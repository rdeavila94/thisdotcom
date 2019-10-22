function AnimatedParent(element, animatedChildren) {
  this.element = element
  this.animatedChildren = animatedChildren
}

function AnimatedChild(element, animationName) {
  this.element = element
  this.animationName = ' ' + animationName
}

let aboutTriggered = false
let technicalTriggered = false

const aboutOffsetMargin = 200
const technicalOffsetMargin = 400

const animatedLine = new AnimatedChild(document.querySelector('#header-line'), 'u-line--animated')
const sectionAbout = new AnimatedParent(document.querySelector('#section-about'), [animatedLine])

const underscore = document.querySelector('#underscore')

const animatedHr = new AnimatedChild(document.querySelector('#animated-hr'), 'u-line-slice--animated')
const sectionTechnical = new AnimatedParent(document.querySelector('#section-technical'), [animatedHr])

// remove this event listener once they've scrolled all the way down
document.addEventListener('scroll', e => {
  const windowHeight = window.innerHeight
  const windowDistance = window.pageYOffset

  if (sectionAbout.element.offsetHeight > windowHeight - windowDistance + aboutOffsetMargin && !aboutTriggered) {
    sectionAbout.element.className = 'section-about fade-in'
    sectionAbout.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
    aboutTriggered = true
  }

  if (sectionTechnical.element.offsetHeight > windowHeight - windowDistance + technicalOffsetMargin && !technicalTriggered) {
    sectionTechnical.element.className = 'section-technical__content fade-in'
    sectionTechnical.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
    technicalTriggered = true
  }
})
