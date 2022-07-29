
let player= document.querySelector('#player-hand');
let dealer = document.querySelector('#dealer-hand')
let button = document.querySelector('.buttons');

let suits = ['spades', 'hearts', 'clubs', 'diamonds']
let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace']
let deck = []
let playerHand = []
let dealerHand = []
let playerSum = 0
let dealerSum = 0

//!Shuffle
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
//!Create Deck
for (let i = 0; i < suits.length; i++){
    for (let j =0 ; j < ranks.length; j++){
        
        if (deck[j] === NaN){
            if(NaN === 'ace'){
                deck.push({
                    'suit': `${suits[i]}`,
                    'rank': `${ranks[j]}`,
                    'img' : `images/${ranks[j]}_of_${suits[i]}.png`,
                    'points': 11
                })
            }
            else {
                deck.push({
                    'suit': `${suits[i]}`,
                    'rank': `${ranks[j]}`,
                    'img' : `images/${ranks[j]}_of_${suits[i]}.png`,
                    'points': 10
                })
            }
        }else 
        {
            deck.push({
            'suit': `${suits[i]}`,
            'rank': `${ranks[j]}`,
            'img' : `images/${ranks[j]}_of_${suits[i]}.png`,
            'points': ranks[j]
        })
    }
    }
    console.log(deck);
}

//!Deal
function deal(){
    for (let i = 0; i <2; i ++){
        let dealerCard = shuffledDeck.pop()
        dealerHand.push(dealerCard)
        let playerCard = shuffledDeck.pop()
        playerHand.push(playerCard)
        let newimage1 = document.createElement('img')
        newimage1.setAttribute('src', `${playerCard['img']}`)
        player.append(newimage1)
        let newimage2 = document.createElement('img')
        newimage2.setAttribute('src', `${dealerCard['img']}`)
        dealer.append(newimage2)
    }
}
//!Hit
function hit(){
    let dealerCard = shuffledDeck.pop()
    dealerHand.push(dealerCard)
    let playerCard = shuffledDeck.pop()
    playerHand.push(playerCard)
    let newimage1 = document.createElement('img')
    newimage1.setAttribute('src', `${playerCard['img']}`)
    player.append(newimage1)
    let newimage2 = document.createElement('img')
    newimage2.setAttribute('src', `${dealerCard['img']}`)
    dealer.append(newimage2)
}
//!Get Card Values
function getCardValues(player, pSum){
    for (i = 0; i < player.length; i ++){
        value = player[i].rank
        val
    }
}
let shuffledDeck = shuffleArray(deck);

button.addEventListener('click', (e)=>{
    if (e.target.innerText === 'Deal'){
        deal()
    }
    else if (e.target.innerText === 'Hit'){
        hit()
    }
})
