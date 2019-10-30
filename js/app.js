// Constructors for objects to facilitate animations nested within a fade in section
function AnimatedParent(element, animatedChildren) {
  this.element = element
  this.animatedChildren = animatedChildren
}

function AnimatedChild(element, animationName) {
  this.element = element
  this.animationName = ' ' + animationName
}

const sectionAboutDistance = document.querySelector('.section-header').offsetHeight
const sectionTechnicalDistance = document.querySelector('.section-about').offsetHeight + sectionAboutDistance

// To avoid repeating the trigger on subsequent scrolls that satisfy the trigger
let aboutTriggered = false
let technicalTriggered = false

// How far into sections to trigger the fade in
const offsetTrigger = 200

// How long the fade in animation is configured to last on the CSS side
const fadeInAnimationDelay = 500

const greeting = new AnimatedChild(document.querySelector('#greeting'), 'come-in-left')
const name = new AnimatedChild(document.querySelector('#name'), 'u-flip-in')
const animatedLine = new AnimatedChild(document.querySelector('#header-line'), 'u-line--animated')
const sectionAbout = new AnimatedParent(document.querySelector('#section-about'), [animatedLine, greeting, name])

const typeAnimate = document.querySelector('#type-animate')

const animatedHr = new AnimatedChild(document.querySelector('#animated-hr'), 'title-box__line--animated')
const popupHeader = new AnimatedChild(document.querySelector('#popup-header'), 'pop-up')
const java = new AnimatedChild(document.querySelector('#java'), 'title-box__animate-left')
const javascript = new AnimatedChild(document.querySelector('#javascript'), 'title-box__animate-right')
const sectionTechnical = new AnimatedParent(document.querySelector('#section-technical'), [animatedHr, popupHeader, java, javascript])

// Function to create a 'typing' animation
const writeText = (message, writeSpeed = 100, element = typeAnimate) => {
  for (let i = 0; i < message.length; i++) {
    setTimeout(() => {
      element.textContent += message.charAt(i)
    }, writeSpeed * i)
  }
}

// We have to use a named function in order to have the ability to remove the handler
const onscroll = e => {
  const windowHeight = window.innerHeight
  const windowDistance = window.pageYOffset

  if (sectionAboutDistance < windowHeight + windowDistance - offsetTrigger && !aboutTriggered) {
    sectionAbout.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
    aboutTriggered = true
  }

  if (sectionTechnicalDistance < windowHeight + windowDistance - offsetTrigger && !technicalTriggered) {
    sectionTechnical.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
    technicalTriggered = true
  }

  if (aboutTriggered && technicalTriggered) {
    document.removeEventListener('scroll', onscroll)
  }
}
// remove this event listener once they've scrolled all the way down
document.addEventListener('scroll', onscroll)
