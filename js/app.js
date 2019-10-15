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

//how quickly text should be deleted/written
const writeSpeed = 10;

const terminalTextCounter = 0;

const terminalText = document.querySelector('#terminal-text');

const terminalParent = terminalText.parentElement;

const terminalAppear = document.querySelector('#terminal-appear');

const elements = document.querySelectorAll('.composition__image img');


const altMap = {
    "csulb": "My alma mater: beautiful Long Beach State. Where I wrote my first 'Hello, World!'",
    "la": "The city of Angeles. Glamorous and fruitbearing yet not for the faint of heart. ",
    "mayan": "The Mayan nightclub. Want to find on a Saturday night? Meet me at the dance floor."
}

const rewriteText = alt => {
    if (terminalText.textContent) {
        removeText(() => writeText(altMap[alt]));
    }
    writeText(altMap[alt]);
}

const writeText = (message, terminal) => {
    for (let i = 0; i < message.length; i++) {
        setTimeout(() => {
            terminal.textContent = terminal.textContent + message.charAt(i);
        }, writeSpeed * i);
    }
}

const removeText = (callback) => {
    const textLength = terminalText.textContent.length;
    for (let i = 0; i <= textLength; i++) {
        setTimeout(() => {
            terminalText.textContent = terminalText.textContent.slice(0, textLength - i);
        }, writeSpeed * i);
    }
    setTimeout(callback, writeSpeed * (textLength + 1));
}

elements.forEach(element => element.addEventListener('click', event => {
    terminalParent.removeChild(document.querySelector('#terminal-text'));
    const p = document.createElement('p');
    p.className = 'composition__terminal__text';
    p.id = 'terminal-text';
    terminalParent.insertBefore(p, terminalAppear);
    writeText(altMap[event.srcElement.alt], p);
}));
