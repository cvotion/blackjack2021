//! ////////// Getting player/dealer hands and buttons//////////
let player= document.querySelector('#player-hand');
let dealer = document.querySelector('#dealer-hand');
let button = document.querySelector('.buttons');
//! ////////// Creating Hidden Card Image //////////
let hiddenImage = document.createElement('img')
hiddenImage.setAttribute('src', `images/NicePng_playing-card-back-png_1215756.png`)
let bet = document.querySelector('.bet');
//! ////////// Creating Deck and Player Arrays //////////
let suits = ['spades', 'hearts', 'clubs', 'diamonds']
let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace']
let deck = []
let playerHand = []
let dealerHand = []
//! ////////// Creating Deck Arrays //////////
let dealt = false
let betAmount = 0
let playerSum = 0
let dealerSum = 0
createDeck()
let shuffledDeck = shuffleArray(deck);
let hiddenCard = shuffledDeck.pop()
let playerMoney = 20
let message = document.querySelector('.message-container');
let playerScore = document.querySelector('.player-name')
playerScore.innerText = `Player: $ ${playerMoney}`

//! //////////////// Shuffle ////////////////
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
//! //////////////// Create Deck ////////////////
function createDeck(){
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
}
function dealCard(p){
    let pCard = shuffledDeck.pop()
    pHand.push(pCard)
    let newimage1 = document.createElement('img')
    newimage1.setAttribute('src', `${pCard['img']}`)
    player.append(newimage1)
}
//! //////////////// Deal ////////////////
function deal(){
    dealerHand.push(hiddenCard)
    let dealerCard = shuffledDeck.pop()
    dealerHand.push(dealerCard)
    dealer.append(hiddenImage)
    let newimage2 = document.createElement('img')
    newimage2.setAttribute('src', `${dealerCard.img}`)
    dealer.append(newimage2)
    for (let i = 0; i <2; i ++){
        let playerCard = shuffledDeck.pop()
        playerHand.push(playerCard)
        let newimage1 = document.createElement('img')
        newimage1.setAttribute('src', `${playerCard['img']}`)
        player.append(newimage1)
    }
}
//! //////////////// Hit ////////////////
function hit(){
    let playerCard = shuffledDeck.pop()
    playerHand.push(playerCard)
    let newimage1 = document.createElement('img')
    newimage1.setAttribute('src', `${playerCard['img']}`)
    player.append(newimage1)
    
}
//! //////////////// Get Card Values ////////////////
function getCardValues(player){
    let sum = 0
    for (i = 0; i < player.length; i ++){
        let value = player[i].points
        sum += value
    }
    console.log(sum);
    return sum
}
//! //////////////// Check for Ace ////////////////
function playerAce(){
    for (let i = 0; i < playerHand.length; i ++){
        if (playerHand[i].rank === 'ace' && playerSum > 21){
            playerHand[i].points = 1
        }
    }
}
function dealerAce(){
    for (let i = 0; i < dealerHand.length; i ++){
        if (dealerHand[i].rank === 'ace' && dealerSum > 21){
            dealerHand[i].points = 1
            return true
        }
    }
}
//! //////////////// Message ////////////////
function youWin(){
    let message = document.querySelector('.message-container');
    let newMessage = document.createElement('div')
    newMessage.setAttribute('class', 'message green')
    newMessage.innerText = 'You Win!'
    message.append(newMessage)
    playerMoney += betAmount * 1.5
}
function youLose(){
    let message = document.querySelector('.message-container');
    let newMessage = document.createElement('div')
    newMessage.setAttribute('class', 'message red')
    newMessage.innerText = 'You Lose!'
    message.append(newMessage)
    playerMoney -= betAmount
}
function over21(){
    if (playerSum > 21){
        youLose()
    }
}
//! //////////////// Buttons ////////////////
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
        if (dealt === true){    
            hit()
            playerSum = getCardValues(playerHand)
            playerAce()
            playerSum = getCardValues(playerHand)
            over21()
        }
    }
    else if (e.target.innerText === 'Stand'){
        console.log('click');
        if (dealt === true){
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
            dealerAce()
            dealerSum = getCardValues(dealerHand)
            if (playerSum === 21){
                youWin()
            }
            else if (playerSum < 21 && playerSum > dealerSum){
                youWin()
            }
            else if (dealerSum > 21){
                youWin()
            }
            else if(playerSum > 21){
                youLose()
            }
            else if (dealerSum <= 21 && dealerSum > playerSum){
                youLose()
            }
            else if (dealerSum === playerSum){
                let newMessage = document.createElement('div')
                newMessage.setAttribute('class', 'message yellow')
                newMessage.innerText = 'Tie!'
                message.append(newMessage)
                
            }
        }
    }    
    else if (e.target.innerText === '+'){
        console.log('clicked');
        betAmount += 1
        bet.innerText = `$ ${betAmount}`
    }
    else if (e.target.innerText === '-' && betAmount > 1){
        console.log('clicked');
        betAmount -= 1
        bet.innerText = `$ ${betAmount}`
    }
    else if (e.target.innerText === 'Reset'){
        console.log('reset');
        hiddenImage.setAttribute('src', `images/NicePng_playing-card-back-png_1215756.png`)
        dealt = false
        betAmount = 0
        deck = []
        playerHand = []
        dealerHand = []
        playerSum = 0
        dealerSum = 0
        createDeck()
        shuffledDeck = shuffleArray(deck);
        hiddenCard = shuffledDeck.pop()
        player.innerHTML = ''
        dealer.innerHTML = ''
        message.innerHTML = ''
        playerScore.innerText = `Player: $ ${playerMoney}`
        bet.innerText = `$ ${betAmount}`
    }
})
