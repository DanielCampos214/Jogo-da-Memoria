const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characters = [
    'bulls',
    'cavaliers',
    'celtics',
    'dallas',
    'heat',
    'hornets',
    'kicks',
    'lakers',
    'pacers',
    'pelicans',
    'pistons',
    'raptors',
    'rockets',
    'thunder',
    'wairros',
]


const createElement = (tag, className) =>{
  const element = document.createElement(tag);
  element.className = className
  return element
}

let firstCard = ''
let seccoundCard = ''

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disable-card')

    if(disabledCards.length === 30){
        clearInterval(this.loop)
        alert(`Parabéns ${spanPlayer.innerHTML}, Seu tempo foi:${timer.innerHTML}`)
    }
}

 const checkCard = () =>{
    const firsCharacter = firstCard.getAttribute('data-character')
    const seccoundCharacter = seccoundCard.getAttribute('data-character')
    
    if (firsCharacter === seccoundCharacter){
        firstCard.firstChild.classList.add('disable-card')
        seccoundCard.firstChild.classList.add('disable-card')

        firstCard = ''
        seccoundCard = ''

        checkEndGame()
    }else{
        setTimeout(()=>{
            firstCard.classList.remove('reveal-card')
            seccoundCard.classList.remove('reveal-card')
            
             firstCard = ''
             seccoundCard = ''
        },500)

       
    }

}

const revealCard = ({target}) =>{
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === ''){
       target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    }else if(seccoundCard === ''){
        target.parentNode.classList.add('reveal-card')
        seccoundCard = target.parentNode
        
        checkCard()
    }

}

const createCard = (character) =>{

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')  

    front.style.backgroundImage = `url('../imgs/${character}.png')` 

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card
}

const LoadGame = () =>{
    const duplicateCharacters = [...characters, ...characters  ]
    const shuffledArray = duplicateCharacters.sort(()=> Math.random()-0.5)
    shuffledArray.forEach((character) => {
        const card = createCard(character)
        grid.appendChild(card)
    });
}

    const startTimer = () =>{
        
         this.loop = setInterval(()=>{
            const currentTime = + timer.innerHTML;
            timer.innerHTML = currentTime + 1
        },1000)
    }

window.onload = () =>{
     

    spanPlayer.innerHTML = localStorage.getItem('player') 
    startTimer()
    LoadGame()
} 

