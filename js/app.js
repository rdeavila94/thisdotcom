// Constructors for objects to facilitate animations nested within a fade in section
function AnimatedParent(element, animatedChildren) {
  this.element = element
  this.animatedChildren = animatedChildren
}

function AnimatedChild(element, animationName) {
  this.element = element
  this.animationName = ' ' + animationName
}

// To avoid repeating the trigger on subsequent scrolls that satisfy the trigger
let greetingTriggered = false
let bioTriggered = false
let compTriggered = false
let technicalTriggered = false
let cardTriggered = false

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

const bio = new AnimatedChild(document.querySelector('#bio-col'), 'col-fade-in-left')
const comp = new AnimatedChild(document.querySelector('#comp-col'), 'col-fade-in-right')

let offsetTrigger, sectionHeaderHeight, sectionAboutHeight, greetingTrigger, bioTrigger, compTrigger, technicalTrigger, cardTrigger

// How far into sections to trigger the fade in
const calculateOffsets = () => {
  offsetTrigger = 100
  sectionHeaderHeight = document.querySelector('.section-header').offsetHeight
  sectionAboutHeight = document.querySelector('.section-about').offsetHeight + sectionHeaderHeight
  greetingTrigger = sectionHeaderHeight + offsetTrigger
  bioTrigger = greetingTrigger + document.querySelector('#greeting-row').offsetHeight
  compTrigger = bioTrigger + comp.element.offsetHeight
  technicalTrigger = sectionAboutHeight + offsetTrigger
  cardTrigger = document.querySelector('body').offsetHeight - document.querySelector('.footer').offsetHeight - document.querySelector('#card-row').offsetHeight
}
calculateOffsets()

const card1 = new AnimatedChild(document.querySelector('#col-card-1'), 'col-fade-in-left')
const card2 = new AnimatedChild(document.querySelector('#col-card-2'), 'col-fade-in-right')

// We have to use a named function in order to have the ability to remove the handler
const onscroll = e => {
  const windowHeight = window.innerHeight
  const windowDistance = window.pageYOffset

  if (greetingTrigger < windowHeight + windowDistance - offsetTrigger && !greetingTriggered) {
    greetingTriggered = true
    sectionAbout.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
  }

  if (bioTrigger < windowHeight + windowDistance - offsetTrigger && !bioTriggered) {
    bioTriggered = true
    bio.element.className = 'col-6 ' + bio.animationName
  }

  if (compTrigger < windowHeight + windowDistance - offsetTrigger && !compTriggered) {
    compTriggered = true
    comp.element.className = 'col-6 ' + comp.animationName
  }

  if (technicalTrigger < windowHeight + windowDistance - offsetTrigger && !technicalTriggered) {
    technicalTriggered = true
    sectionTechnical.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
  }

  if (cardTrigger < windowHeight + windowDistance - offsetTrigger && !cardTriggered) {
    cardTriggered = true
    card1.element.className = 'col-6 ' + card1.animationName
    card2.element.className = 'col-6 ' + card2.animationName
  }

  if (greetingTriggered && bioTriggered && compTriggered && technicalTriggered && cardTriggered) {
    document.removeEventListener('scroll', onscroll)
  }
}
// remove this event listener once they've scrolled all the way down
document.addEventListener('scroll', onscroll)

window.addEventListener('resize', calculateOffsets, false)
