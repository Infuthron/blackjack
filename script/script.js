var hand = [
//Played cards go here
];

var playerHand = [
//Player cards go here
];

var valueHand = [
//Value of random cards goes here
];

var crupierHand = [
//Random crupier carads go here
];

var valueCrupierHand = [
//Value of random crupier cards goese here
];

var suits = [
  "_of_diamonds.svg",
  "_of_spades.svg",
  "_of_hearts.svg",
  "_of_clubs.svg"
];

var cards = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king"
];

var playerValue = 0;
var crupierValue = 0;

var end = false;
var stand = false;
var crupierTurn = false;
var crupierCloseTurn = false;
var reset = false;

var winCon = 0; // 0 = neutral 1 = win 2 = loose

butt1.disabled = true;
butt2.disabled = true;
butt3.disabled = true;


butt0.addEventListener('click',()=> {
 startGame();
 playerValue = 0;
 replacePar("scoreValue", forUpdateScore());
})

butt1.addEventListener('click',()=>{
saveHand();
addValue(playerValue);
addValueCrupier();
replacePar("scoreValue", forUpdateScore());
compare();
})

butt2.addEventListener('click',()=>{
restart();
})

butt3.addEventListener('click',()=>{
playerStand();
addValueCrupier();
})

//=========================================FUNCTIONS======================================

//START GAME

function startGame() {
  crupierTurn = true;
  saveHand();
  giveCrupierFirst();
  crupierTurn = false;
  saveHand();
  crupierTurn = true;
  saveHand();
  crupierTurn = false;
  saveHand();

  butt0.disabled = true;
  butt1.disabled = false;
  butt2.disabled = false;
  butt3.disabled = false;

}


//STAND

function playerStand() {
  butt1.disabled = true;
  stand = true;
  compare();
}

function compare() {
  if (playerValue > 21) {
    loose();
    console.log("You immidietly loose");
  } else if (playerValue === 21) {
    win();
    console.log("You immidietly win");
  } else if (playerValue < 21 && stand === true) {
    console.log("You stand, crupiers turn");


    if (playerValue >= crupierValue && crupierValue < 17) {
      crupierTurn = true;
      saveHand();
      addValueCrupier();
      console.log("Crupier takes another card");
      crupierCloseTurn = true;
      compare();
    } else if (crupierValue > playerValue && crupierValue <= 21 ) {
      crupierTurn = true;
      console.log("Crupier took cards and won");
      crupierCloseTurn = false;
    } else if (crupierValue < 21) {
      crupierTurn = true;
      console.log("Crupier took to much cards, you win");
      crupierCloseTurn = false;
    }
    resolveGame();

  }
}

function resolveGame() {
  if (playerValue > crupierValue && playerValue < 22 || crupierValue > 21) {
    win();
  } else if (crupierValue > playerValue && crupierValue < 22) {
    loose();
  } else if (crupierValue === playerValue) {
    draw();
  }
}

function loose() {
  crupierShow();
  replacePar("resolveNotice", "YOU LOSE");
  butt1.disabled = true;
}

function win() {
  crupierShow();
  replacePar("resolveNotice", "YOU WIN");
}

function draw() {
  crupierShow();
  replacePar("resolveNotice", "YOU BOTH DRAW");
}

function giveCrupierFirst() {
  let firstCard = crupierHand[0];
  giveImage('test2', firstCard);

}

function crupierShow() { //USE THIS TO FIX SAVE HAND
clearCrupier();
giveImageCrupier("test2");

replacePar("scoreValueCrupier", forUpdateScoreCrupier());
}

//ADD CARD VALUE TO GET HER

function addValue() {
let totalValue = valueHand.reduce(takeValue);
playerValue = totalValue;
return playerValue;
}

function addValueCrupier() {
  let totalValue = valueCrupierHand.reduce(takeValue);
  crupierValue = totalValue;
}

function takeValue(total, num) {
  return total + num;
}

//GENERATE CARDS


function giveSuits(argument) {
  let localSuit = argument;
  let length = argument.length;
  let randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * length);
  return randomNumber;
}

function getCard() {
  let card = cards[giveSuits(cards)];
    return card;
}

function getSuit() {
  let suit = suits[giveSuits(suits)];
    return suit;
}


function saveHand() {

//CHANGE
  let cardToCheck = getCard();
  let suit = getSuit();
  let cardSuit = (cardToCheck + suit);
  let pass = checkCard(cardSuit);

  if ( pass === false && crupierTurn === false) {
    hand.push(cardSuit);
    playerHand.push(cardSuit);
    //replacePar("test1", playerHand);
    giveImage('test1', cardSuit);


    let valueCard = checkValue(cardToCheck);
    valueHand.push(valueCard);

    return cardToCheck;

  } else if (pass === false && crupierTurn === true) {
    hand.push(cardSuit);
    crupierHand.push(cardSuit);
    //let par = document.createElement("P");
    //let card = document.createTextNode("▉▉");
    //par.appendChild(card);
    //document.getElementById("test2").appendChild(par);


    let valueCard = checkValue(cardToCheck);
    valueCrupierHand.push(valueCard);

    return cardToCheck;

  } else if (pass === false && crupierCloseTurn === true) {
    hand.push(cardSuit);
    crupierHand.push(cardSuit);

    let valueCard = checkValue(cardToCheck);
    valueCrupierHand.push(valueCard);

  } else if (pass === true) {
    saveHand();
  }

}

//ADD CARD VALUE TOGETHER AND CHECK SCORE


  // innermHTML

  function replacePar(child, argument) {
    let childEl = document.getElementById(child);
    childEl.innerHTML = argument;
  }



  function giveImage(id, fileName) { //MAKE IMAGE ELEMENT TO FIC EVERYTHING ===============================================================
    let cardImage = new Image(100, 200)
    cardImage.src = 'images/svg-cards/' + fileName;
    document.getElementById(id).appendChild(cardImage);
  }

  function giveImageCrupier(id) {

    for (i = 0; i < crupierHand.length; i++) {
      let fileName = crupierHand[i];
      let cardImage = new Image(100, 200)
      cardImage.src = 'images/svg-cards/' + fileName;
      document.getElementById(id).appendChild(cardImage);
    }
  }

//CHECK VALUE AND REDUNDENCY

function checkCard(argument) {
let check = hand.includes(argument);
return check;
}

function checkValue(card) {
  let check = cards.indexOf(card);
   if (check < 10 ) {
     check = check += 1;
     return check;
   } else {
     check = 10;
     return check;
   }

}

function forUpdateScore() {
  let give = ("Sum of your cards: " + addValue());
  return give;
}

function forUpdateScoreCrupier() {
  let give = ("Sum of crupier cards: " + crupierValue);
  return give;
}

function forEndScore() {
  let give = ("Sum of your cards: 0");
  return give;
}

function forEndScoreCrupier() {
  let give = ("Sum of crupier cards: ?");
  return give;
}

function forLoose() {
  let give = ("YOU LOSE");
  return give;
}

function forWin() {
  let give = "YOU WIN";
  return give;
}

function clearHand() {
  hand.length = 0;
  playerHand.length = 0;
  valueHand.length = 0;
  document.getElementById("test1").innerHTML = "";
  crupierHand.length = 0;
  valueCrupierHand.length = 0;

}

function clearCrupier() {
  document.getElementById("test2").innerHTML = "";
}

function restart() {
  clearHand();
  clearCrupier();
  end = false;
  stand = false;
  reset = true;
  playerValue = 0;
  crupierValue = 0;
  replacePar("scoreValue", forEndScore());
  replacePar("scoreValueCrupier", forEndScoreCrupier());
  replacePar("resolveNotice", "");
  butt0.disabled = false;
  butt1.disabled = true;
  butt2.disabled = true;
  butt3.disabled = true;
}


//===========================================SCORESYSTEM=============================================

























//
