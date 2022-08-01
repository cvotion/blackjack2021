
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
        
        if(j < 9){
            deck.push({
                'suit': `${suits[i]}`,
                'rank': `${ranks[j]}`,
                'img' : `images/${ranks[j]}_of_${suits[i]}.png`,
                'points': j+2
            })
        }
        else if (j === 12){
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
    }
    console.log(deck);
}
function dealCard(p){
    let pCard = shuffledDeck.pop()
    pHand.push(pCard)
    let newimage1 = document.createElement('img')
    newimage1.setAttribute('src', `${pCard['img']}`)
    player.append(newimage1)
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
    let playerCard = shuffledDeck.pop()
    playerHand.push(playerCard)
    let newimage1 = document.createElement('img')
    newimage1.setAttribute('src', `${playerCard['img']}`)
    player.append(newimage1)
    
    if (dealerSum < 17){
        console.log("yes");
        let dealerCard = shuffledDeck.pop()
        dealerHand.push(dealerCard)
        let newimage2 = document.createElement('img')
        newimage2.setAttribute('src', `${dealerCard['img']}`)
        dealer.append(newimage2)
    }
}
//!Get Card Values
function getCardValues(player){
    let sum = 0
    for (i = 0; i < player.length; i ++){
        let value = player[i].points
        sum += value
    }
    console.log(sum);
    return sum
}
function over21(){
    if (playerSum > 21){
        alert('You Lose!')
    }
}
let shuffledDeck = shuffleArray(deck);

button.addEventListener('click', (e)=>{
    if (e.target.innerText === 'Deal'){
        deal()
        dealerSum = getCardValues(dealerHand)
        playerSum = getCardValues(playerHand)
        over21()
        
    }
    else if (e.target.innerText === 'Hit'){
        hit()
        dealerSum = getCardValues(dealerHand)
        playerSum = getCardValues(playerHand)
        over21()
    }
    else if (e.target.innerText === 'Stand'){
        dealerSum = getCardValues(dealerHand)
        playerSum = getCardValues(playerHand)
        if (playerSum === 21){
            alert('You Win!')
        }
        else if (playerSum < 21 && playerSum > dealerSum){
            alert('You Win!')
        }
        else if (dealerSum > 21){
            alert('You Win!')
        }
        else if(playerSum > 21){
            alert('You Lose!')
        }
        else if (dealerSum <= 21 && dealerSum > playerSum){
            alert('You Lose!')
        }
        
    }
})
