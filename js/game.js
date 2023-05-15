let containerHtml = document.querySelector('.container');
let playerOne = '';
let playerTwo = '';
let end = 0;
const themeLocal = localStorage.getItem('theme');

// function que cria elemento na tela
function createElementHtml(tag, className) {
    const el = document.createElement(tag);
    el.className = className;
    return el;
}

// montando a carta e adicionando classes
function createCard(character) {
    let card = createElementHtml('div', 'card');
    let front = createElementHtml('div', `face front`);
    let back = createElementHtml('div', `face back`);

    if (themeLocal === 'Futebol') {
        front.style.backgroundImage = `url(../images/futebol/${character}.png)`;
        back.style.backgroundImage = `url(../images/futebol/back.png)`;
    } else if (themeLocal === 'Vídeo games') {
        front.style.backgroundImage = `url(../images/games/${character}.png)`;
        back.style.backgroundImage = `url(../images/games/back.png)`;
        back.style.backgroundColor = '#6666ff';
    }    

    card.appendChild(front);
    card.appendChild(back);
    // adicionando click as cartas
    card.addEventListener('click', turn);
    // atribuindo um atributo as cartas
    card.setAttribute('data-character', character);

    containerHtml.appendChild(card);
}

const characters = [
    [   'barcelona',
        'bayern',
        'botafogo',
        'chelsea',
        'corinthians',
        'flamengo',
        'fluminense',
        'fortaleza',
        'gremio',
        'liverpool',
        'm-city',
        'm-united',
        'palmeiras',
        'psg',
        'real-madrid',
        'santos',
        'sao-paulo',
        'vasco',
    ],
    [
        'crash',
        'ken',
        'knuckles',
        'kong',
        'link',
        'luigi',
        'mario',
        'mcQueen',
        'minicraft',
        'minicraft-2',
        'pacman',
        'peach',
        'pikachu',
        'ryu',
        'sonic'
    ]
];


function updatePage() {
    // duplicando os personagens
    let duplicateCharacters = []; 

    if (themeLocal === 'Futebol') {
        duplicateCharacters = [...characters[0], ...characters[0]]
    } else if (themeLocal === 'Vídeo games') {
        duplicateCharacters = [...characters[1], ...characters[1]]
    }

    // exibindo aleatoriamente os personagens
    duplicateCharacters.sort(function () {
        return Math.random() - 0.5;
    });

    duplicateCharacters.forEach((character) => {
        createCard(character);
    });
}
updatePage();

// function que vira as cartas e as adiciona 
function turn({ target }) {
    if (target.parentNode.className !== 'card') return;
    if (target.parentNode.className.includes('turn')) return;

    if (playerOne === '') {
        target.parentNode.classList.add('turn');
        playerOne = target.parentNode;
    } else if (playerTwo === '') {
        target.parentNode.classList.add('turn');
        playerTwo = target.parentNode;
        checkCards()
    }
}

function checkCards() {
    let firstCharacter = playerOne.getAttribute('data-character');
    let secondCharacter = playerTwo.getAttribute('data-character');

    if (firstCharacter !== secondCharacter) {
        reset(playerOne, playerTwo);

    } else {
        playerOne = '';
        playerTwo = '';
        end++;
    }

    if (themeLocal === 'Futebol') {
        if(end === characters[0].length) {
            alert('Fim de jogo');
        }
    } else {
        if(end === characters[1].length) {
            alert('Fim de jogo');
        }
    }
    // if ((end === characters[0].length) || (end === characters[1].length)) {        
    //     alert('Fim de jogo');
    //     return;
    // }
}

function reset(cardOne, cardTwo) {
    playerOne = '';
    playerTwo = '';

    // escondendo as cartas novamente
    setTimeout(() => {
        cardOne.classList.remove('turn');
        cardTwo.classList.remove('turn');
    }, '500');
}