// const string = 'Richard DeAvila';
// const underescore = document.querySelector('#underscore');
// const div = document.querySelector('.animatable-text');

// for (let i = 0; i < string.length; i++) {
//     let char = string.charAt(i);

//     setTimeout(function () {
//         const span = document.createElement('span');
//         span.className = 'font-text';
//         span.innerText = char;
//         div.insertBefore(span, underescore);
//     }, 100 * i);
// }

// how quickly text should be deleted/written
const writeSpeed = 10

const terminalText = document.querySelector('#terminal-text')

const terminalParent = terminalText.parentElement

const elements = document.querySelectorAll('.composition__image img')

const sectionAbout = document.querySelector('.section-about')

const img = document.querySelector('.composition__image')

const altMap = {
  csulb: 'My alma mater: beautiful Long Beach State. Where I wrote my first (but certainly not last) "Hello, World!"',
  la: 'The city of Angeles. Glamorous. Fruitful. Challenging. The skyline whose shadow I was raised under. Not for the faint of heart but rewarding to those who conquer it.',
  mayan: 'The Mayan nightclub. Want to find on a Saturday night? Meet me on the dance floor.'
}

const writeText = (message, terminal) => {
  for (let i = 0; i < message.length; i++) {
    setTimeout(() => {
      terminal.textContent = terminal.textContent + message.charAt(i)
    }, writeSpeed * i)
  }
}

elements.forEach(element => element.addEventListener('click', event => {
  terminalParent.removeChild(document.querySelector('#terminal-text'))
  const p = document.createElement('p')
  p.className = 'composition__terminal__text'
  p.id = 'terminal-text'
  terminalParent.appendChild(p)
  writeText(altMap[event.srcElement.alt], p)
}))

// remove this event listener once they've scrolled all the way down
// document.addEventListener('scroll', e => {
//   const windowHeight = window.innerHeight
//   const windowDistance = window.pageYOffset

//   if (sectionAbout.offsetHeight > windowHeight - windowDistance + 200) {
//     sectionAbout.className = 'section-about fade-in'
//   }
// })
