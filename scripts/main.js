
let player= document.querySelector('#player-hand');
let dealer = document.querySelector('#dealer-hand')
let button = document.querySelector('.buttons');
let hiddenImage = document.createElement('img')
hiddenImage.setAttribute('src', `images/NicePng_playing-card-back-png_1215756.png`)
let dealt = false

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
let shuffledDeck = shuffleArray(deck);
function dealCard(p){
    let pCard = shuffledDeck.pop()
    pHand.push(pCard)
    let newimage1 = document.createElement('img')
    newimage1.setAttribute('src', `${pCard['img']}`)
    player.append(newimage1)
}
//!Deal
let hiddenCard = shuffledDeck.pop()
function deal(){
    dealerHand.push(hiddenCard)
    let dealerCard = shuffledDeck.pop()
    dealerHand.push(dealerCard)
    dealer.append(hiddenImage)
    let newimage2 = document.createElement('img')
    newimage2.setAttribute('src', `${dealerCard['img']}`)
    dealer.append(newimage2)
    for (let i = 0; i <2; i ++){
        let playerCard = shuffledDeck.pop()
        playerHand.push(playerCard)
        let newimage1 = document.createElement('img')
        newimage1.setAttribute('src', `${playerCard['img']}`)
        player.append(newimage1)
    }
}
//!Hit
function hit(){
    let playerCard = shuffledDeck.pop()
    playerHand.push(playerCard)
    let newimage1 = document.createElement('img')
    newimage1.setAttribute('src', `${playerCard['img']}`)
    player.append(newimage1)
    
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
        console.log("you lose");
    }
}
button.addEventListener('click', (e)=>{
    if (e.target.innerText === 'Deal'){
        if (dealt === false){
            deal()
            dealt = true
            dealerSum = getCardValues(dealerHand)
            playerSum = getCardValues(playerHand)
            over21()
        }
    }
    else if (e.target.innerText === 'Hit'){
        hit()
        dealerSum = getCardValues(dealerHand)
        playerSum = getCardValues(playerHand)
        over21()
    }
    else if (e.target.innerText === 'Stand'){
        hiddenImage.setAttribute('src', `${hiddenCard['img']}`)
        dealerSum = getCardValues(dealerHand)
        playerSum = getCardValues(playerHand)
        if (dealerSum < 17){
            let dealerCard = shuffledDeck.pop()
            dealerHand.push(dealerCard)
            let newimage2 = document.createElement('img')
            newimage2.setAttribute('src', `${dealerCard['img']}`)
            dealer.append(newimage2)
        }
        dealerSum = getCardValues(dealerHand)
        if (playerSum === 21){
            console.log("you win");
        }
        else if (playerSum < 21 && playerSum > dealerSum){
            console.log("you win");
        }
        else if (dealerSum > 21){
            console.log('you win');
        }
        else if(playerSum > 21){
            console.log('you lose');
        }
        else if (dealerSum <= 21 && dealerSum > playerSum){
            console.log('you lose');
        }
        
    }
})
