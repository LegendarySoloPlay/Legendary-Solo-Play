// cardAbilities.js

// Example ability function for a hero card
function extraDraw() {
  // Check if both playerDeck and playerDiscardPile are empty
  if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
    console.log("No cards available to draw.");
    onscreenConsole.log("No cards available to draw.");
    return; // Exit the function
  }

  // If playerDeck is empty but playerDiscardPile has cards, reshuffle discard pile into deck
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  // Draw a card and add it to the player's hand
  const card = playerDeck.pop();
  playerHand.push(card);
  extraCardsDrawnThisTurn++;
  console.log("Card drawn. Total cards drawn this turn: ", extraCardsDrawnThisTurn);
  onscreenConsole.log(`Extra card drawn: <span class="console-highlights">${card.name}</span>`);
  
  // Update the game board to reflect the new state
  updateGameBoard();
}

function WolverineExtraDraw() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
extraDraw();
}

function EmmaFrostExtraDraw() {

const previousCards = cardsPlayedThisTurn.slice(0, -1);
const cardsYouHave = [...playerHand,...previousCards];

 const XMenCount = cardsYouHave.filter(item => item.team === "X-Men").length;
 
  if (XMenCount === 0) {
    onscreenConsole.log(`You are unable to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`);
return;
  }

  if (XMenCount >= 1) {
    onscreenConsole.log(`<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero revealed.`);
extraDraw();
  }

}

function StormExtraDraw() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
extraDraw();
}

function IronManExtraDraw() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
extraDraw();
}



function WolverineBonusAttackPerExtraCard() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
  const extraCardsDrawn = extraCardsDrawnThisTurn;
  const extraDrawBonusAttack = 1 * extraCardsDrawn;
onscreenConsole.log(`You have drawn ${extraCardsDrawn} extra cards this turn. +${extraDrawBonusAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

  totalAttackPoints += extraDrawBonusAttack;
  cumulativeAttackPoints += extraDrawBonusAttack;


  updateGameBoard();
}


function SpiderManRevealTopCardToDrawAndBystander() {

  // Rescue a bystander if available
  if (bystanderDeck.length > 0) {
    const rescuedBystander = bystanderDeck.pop();
    victoryPile.push(rescuedBystander);
    console.log("Bystander rescued:", rescuedBystander);
    console.log("Current Victory Pile:", victoryPile);
    onscreenConsole.log('Bystander rescued.');
    updateGameBoard();
  } else {
    console.log("No bystanders left in the deck to rescue.");
    onscreenConsole.log('No Bystanders left to rescue.');
  }

  // Shuffle discard pile into deck if deck is empty
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.cost <= 2) {
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> and it cost 2 or less. It has been added to your hand.`);
  } else {
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> and it cost more than 2. It has been returned to the top of your deck.`);
    updateGameBoard();
  }
}


function SpiderManRevealTopCardToDraw() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.cost <= 2) {
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> and it cost 2 or less. It has been added to your Hand.`);
  } else {
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> and it cost more than 2. It has been returned to the top of your Deck.`);
    updateGameBoard();
  }
}

function drawWound() {
  function hasWoundInvulnerability() {
    return playerHand.some(card => card.invulnerability === 'Wound') ||
           cardsPlayedThisTurn.some(card => card.invulnerability === 'Wound');
  }

  if (hasWoundInvulnerability()) {
    console.log("Invulnerability to wound found.");
    drawInsteadOfWound();
    return;
  }

  if (woundDeck.length > 0) {
    const gainedWound = woundDeck.pop();

    playerDiscardPile.push(gainedWound);

    console.log("Wound gained.");
onscreenConsole.log("Wound gained.");
    updateGameBoard();

  } else {
    console.log("No wounds left. You've taken enough damage!");
onscreenConsole.log("No wounds left. You've taken enough damage!");
  }
}



function EscapeDrawWound() {
 onscreenConsole.log(`Escape! You gain a Wound.`);
  drawWound();

}

function drawTwo() {
  extraDraw();
  extraDraw();
}

function IronManDrawTwo() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
  drawTwo();
}

function WolverineDrawTwo() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
  drawTwo();
}

function WolverineDrawThree() {
  drawThree();
}



function FightDrawThree() {
onscreenConsole.log(`Fight! Draw three cards.`);
  drawThree();
}

function drawThree() {
  extraDraw();
  extraDraw();
  extraDraw();
}

function rescueBystander() {
  if (bystanderDeck.length > 0) {
    const rescuedBystander = bystanderDeck.pop();
    victoryPile.push(rescuedBystander);
    console.log("Bystander rescued:", rescuedBystander);
    console.log("Current Victory Pile:", victoryPile);
onscreenConsole.log('Bystander rescued.');
    updateGameBoard();
  } else {
    console.log("No bystanders left in the deck to rescue.");
onscreenConsole.log('No Bystanders left to rescue.');
  }
}

function BlackWidowRescueBystander() {
  if (bystanderDeck.length > 0) {
    const rescuedBystander = bystanderDeck.pop();
    victoryPile.push(rescuedBystander);
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log('Bystander rescued.');
    updateGameBoard();
  } else {
    console.log("No bystanders left in the deck to rescue.");
onscreenConsole.log('No Bystanders left to rescue.');
  }
}

 

function BlackWidowRescueBystanderByKO() {
  return new Promise((resolve) => {
    const discardPileList = document.getElementById("discard-pile-cards");
    const handList = document.getElementById("hand-cards");


const hoverText = document.getElementById("card-ko-card-popupHoverText");
const KOImage = document.getElementById("card-ko-popup-image");

onscreenConsole.log(`<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower ability activated.`); 

    discardPileList.innerHTML = "";
    handList.innerHTML = "";

    const discardPile = playerDiscardPile.slice(0, -1);
    const hand = playerHand;

    discardPile.forEach((card) => {
      const li = document.createElement("li");
      li.textContent = card.name;
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        KOImage.src = card.image;  // Dynamically change the image source
        KOImage.style.display = 'block';  // Ensure the image is visible
hoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        KOImage.src = '';  // Clear the image source
        KOImage.style.display = 'none';  // Hide the image
hoverText.style.display = 'block';
    };
      li.onclick = () => koDiscardCardForBystander(card);
      discardPileList.appendChild(li);
    });

    hand.forEach((card) => {
      const li = document.createElement("li");
      li.textContent = card.name;
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        KOImage.src = card.image;  // Dynamically change the image source
        KOImage.style.display = 'block';  // Ensure the image is visible
hoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        KOImage.src = '';  // Clear the image source
        KOImage.style.display = 'none';  // Hide the image
hoverText.style.display = 'block';
    };
      li.onclick = () => koHandCardForBystander(card);
      handList.appendChild(li);
    });

    document.getElementById("card-ko-popup").style.display = "block";
    document.getElementById("modal-overlay").style.display = "block";

    resolve(); // Resolve after displaying the popup
  });
}

function koDiscardCardForBystander(card) {
  const index = playerDiscardPile.indexOf(card);
  if (index !== -1) {
    playerDiscardPile.splice(index, 1);
  }
  koPile.push(card);
  console.log("KO Pile", koPile);
  const bystanderCard = bystanderDeck.pop();
  victoryPile.push(bystanderCard);
  console.log("Victory Pile", victoryPile);
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> KO'd. 1 Bystander rescued.`);
  document.getElementById("card-ko-popup").style.display = "none";
  document.getElementById("modal-overlay").style.display = "none";

  updateGameBoard();
}

function koHandCardForBystander(card) {
  const index = playerHand.indexOf(card);
  if (index !== -1) {
    playerHand.splice(index, 1);
  }
  koPile.push(card);
  console.log("KO Pile", koPile);
  const bystanderCard = bystanderDeck.pop();
  victoryPile.push(bystanderCard);
  console.log("Victory Pile", victoryPile);
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> KO'd. 1 Bystander rescued.`);

  document.getElementById("card-ko-popup").style.display = "none";
  document.getElementById("modal-overlay").style.display = "none";

  updateGameBoard();
}

function closeKoPopup() {
  document.getElementById("card-ko-popup").style.display = "none";
  document.getElementById("modal-overlay").style.display = "none";
onscreenConsole.log(`You chose "No Thanks!"`);

  updateGameBoard();
}

function bonusAttack() {
  const previousCards = cardsPlayedThisTurn.slice(0, -1);
  const lastCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
  const { multiplierLocation, multiplier, multiplierAttribute, bonusAttack } = lastCard;

  if (multiplierLocation === "None" || multiplier === "None" || multiplierAttribute === "None") {
    const totalBonusAttack = bonusAttack || 0;
    totalAttackPoints += totalBonusAttack;
    cumulativeAttackPoints += totalBonusAttack;

    console.log("Multiplier is 'None', directly adding bonusAttack.");
    updateGameBoard();
    return;
  }

  if (!multiplierLocation || !multiplier || !multiplierAttribute) {
    console.error("Required attributes missing in the last card.");
    return;
  }

  const locations = {
    victoryPile: victoryPile,
    discardPile: playerDiscardPile,
    villainDeck: villainDeck,
    heroDeck: heroDeck,
    hq: hq,
    city: city,
    playerHand: playerHand,
    playerDeck: playerDeck,
    playedCards: previousCards,
    koPile: koPile,
    escapedVillainsDeck: escapedVillainsDeck,
    mastermindDeck: mastermindDeck
  };

  const locationCards = locations[multiplierLocation];

  if (!Array.isArray(locationCards)) {
    console.error(`Invalid or missing array for multiplierLocation: ${multiplierLocation}`);
    return;
  }

  let multiplierCount = 0;
  locationCards.forEach((card) => {
    if (card[multiplierAttribute.toLowerCase()] === multiplier) {
      multiplierCount++;
    }
  });

  const totalBonusAttack = (bonusAttack || 0) * multiplierCount;

  totalAttackPoints += totalBonusAttack;
  cumulativeAttackPoints += totalBonusAttack;

  updateGameBoard();
}

function ThorBonusAttack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log(`+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}


function RogueBonusAttack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log(`+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}


function NickFuryBonusAttack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log(`+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function NickFuryCommanderBonusAttack() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const SHELDCount = previousCards.filter(item => item.team === "S.H.I.E.L.D.").length;
  let SHIELDText = "Heroes";  // Use let to allow reassignment

  if (SHELDCount === 1) {
    SHIELDText = "Hero";  // Singular for one bystander
  }

  onscreenConsole.log(`You have played ${SHELDCount} <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> ${SHIELDText}. +${SHELDCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  
  bonusAttack();
}


function HulkGrowingAngerBonusAttack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log(`+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function HulkSmashBonusAttack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log(`+5<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function BlackWidowBonusAttack() {
  const bystanderVPCount = victoryPile.filter(item => item.name === "Bystander").length;
  let bystanderText = "Bystanders";  // Use let to allow reassignment

  if (bystanderVPCount === 1) {
    bystanderText = "Bystander";  // Singular for one bystander
  }

  onscreenConsole.log(`You have ${bystanderVPCount} ${bystanderText} in your Victory Pile. +${bystanderVPCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  
  bonusAttack();
}

function IronManBonusAttack() {
 onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
 onscreenConsole.log(`+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  
  bonusAttack();
}

function IronManArcReactorBonusAttack() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

 const techCount = previousCards.filter(item => item.class1 === "Tech").length;
  let techText = "Heroes";  // Use let to allow reassignment

  if (techCount === 1) {
    techText = "Hero";
  }

 onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log(`You have played ${techCount} ${techText}. +${techCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  
  bonusAttack();
}


function HawkeyeBonusAttack() {
 onscreenConsole.log(`<img src="Visual Assets/Icons/Avengers.svg" alt="Avengers Icon" class="console-card-icons"> Hero played. Superpower ability activated.`); 
onscreenConsole.log(`+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  
  bonusAttack();
}



function CaptainAmericaBonusAttack() {
  const AvengersCount = cardsPlayedThisTurn.slice(0, -1).filter(item => item.team === "Avengers").length;
  let AvengersText = "Heroes";  // Use let since we might reassign this value
  const AvengersAttack = AvengersCount * 3;

  if (AvengersCount === 1) {
    AvengersText = "Hero";  // Reassign to singular if only one Avenger
  }

  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Avengers.svg" alt="Avengers Icon" class="console-card-icons"> Hero played. Superpower ability activated.`); 
onscreenConsole.log(`You have played ${AvengersCount} <img src="Visual Assets/Icons/Avengers.svg" alt="Avengers Icon" class="console-card-icons"> ${AvengersText}. +${AvengersAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`
  );

  bonusAttack();
}

function CyclopsBonusAttack() {
  const XMenCount = cardsPlayedThisTurn.slice(0, -1).filter(item => item.team === "X-Men").length;
let XMenText = "Heroes";
  const XMenAttack = XMenCount * 2;

  if (XMenCount === 1) {
    XMenText = "Hero";
  }

  onscreenConsole.log(
    `<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log(`You have played ${XMenCount} <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> ${XMenText}. +${XMenAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`
  );

  bonusAttack();
}


function bonusRecruit() {
  const lastCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
  const { multiplierLocation, multiplier, multiplierAttribute, bonusRecruit } = lastCard;

  if (multiplierLocation === "None" || multiplier === "None" || multiplierAttribute === "None") {
    const totalBonusRecruit = bonusRecruit || 0;
    totalRecruitPoints += totalBonusRecruit;
    cumulativeRecruitPoints += totalBonusRecruit;

    console.log("Multiplier is 'None', directly adding bonusRecruit.");
    updateGameBoard();
    return;
  }

  if (!multiplierLocation || !multiplier || !multiplierAttribute) {
    console.error("Required attributes missing in the last card.");
    return;
  }

  const locations = {
    victoryPile: victoryPile,
    discardPile: playerDiscardPile,
    villainDeck: villainDeck,
    heroDeck: heroDeck,
    hq: hq,
    city: city,
    playerHand: playerHand,
    playerDeck: playerDeck,
    playedCards: cardsPlayedThisTurn.slice(0, -1),
    koPile: koPile,
    escapedVillainsDeck: escapedVillainsDeck,
    mastermindDeck: mastermindDeck
  };

  const locationCards = locations[multiplierLocation];

  if (!Array.isArray(locationCards)) {
    console.error(`Invalid or missing array for multiplierLocation: ${multiplierLocation}`);
    return;
  }

  let multiplierCount = 0;
  locationCards.forEach((card) => {
    if (card[multiplierAttribute.toLowerCase()] === multiplier) {
      multiplierCount++;
    }
  });

  const totalBonusRecruit = (bonusRecruit || 0) * multiplierCount;

  totalRecruitPoints += totalBonusRecruit;
  cumulativeRecruitPoints += totalBonusRecruit;

  updateGameBoard();
}

function ThorBonusRecruit() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);
onscreenConsole.log(`+2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function GambitRevealTopCardForAttack() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0 && playerDiscardPile === 0) {
    onscreenConsole.log(`No cards are available to be revealed.`);
return;
  }

  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];
  const topCardCost = topCardPlayerDeck.cost;

  totalAttackPoints += topCardCost;
  cumulativeAttackPoints += topCardCost;

  console.log(`You revealed ${topCardPlayerDeck.name}. Its cost of ${topCardPlayerDeck.cost} has been added to your attack points.`);
onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It has a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of ${topCardPlayerDeck.cost}. +${topCardPlayerDeck.cost}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  updateGameBoard();
}

function GambitRevealXTopCardToDraw() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
onscreenConsole.log(`No cards are available to be revealed.`);
return;
  }

  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.team === "X-Men") {
    playerDeck.pop();
    playerHand.push(topCardPlayerDeck);
extraCardsDrawnThisTurn++;
    console.log(`You revealed ${topCardPlayerDeck.name}. It has been added to your hand.`);
onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. They are an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have been added to your hand.`);
    updateGameBoard();
  } else {
    console.log(`You revealed ${topCardPlayerDeck.name}. They are not a member of the X-Men and have been returned to the top of the deck.`);
onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. They are not an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have been returned to the top of your deck.`);
    updateGameBoard();
  }
}

function ThorHighRecruitReward() {
  if (cumulativeRecruitPoints >= 8) {
onscreenConsole.log(`You have made at least 8 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> this turn. +3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
    totalAttackPoints += 3;
    cumulativeAttackPoints += 3;
    updateGameBoard();
  }
}

function DeadpoolApplyOddCostBonus() {
  let oddCostCount = 0;
  const playedCards = cardsPlayedThisTurn.slice(0, -1);
let oddCostText = "Heroes";

  playedCards.forEach(card => {
    if (card.cost % 2 !== 0) {
      oddCostCount++;
    }
  });

if (oddCostCount === 1) {
oddCostText = "Hero";
} else {
oddCostText = "Heroes";
}

  totalAttackPoints += oddCostCount;
  cumulativeAttackPoints += oddCostCount;

  console.log(`Number of odd cost cards: ${oddCostCount}`);
  console.log(`${oddCostCount} added to Attack points.`);

onscreenConsole.log(`Superpower ability activated. You have played ${oddCostCount} ${oddCostText} with an odd-numbered <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${oddCostCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

  updateGameBoard();
}

function CaptainAmericaCountUniqueColorsAndAddAttack() {
  const allCards = [...playerHand, ...cardsPlayedThisTurn];
  console.log('Combined allCards:', allCards);

  const uniqueColors = new Set();

  allCards.forEach(card => {
    if (card.color) {
      uniqueColors.add(card.color);
      console.log(`Card color added: ${card.color}`);
    } else {
      console.log('Card without color encountered:', card);
    }
  });

  const uniqueColorCount = uniqueColors.size;
  console.log('Unique colors found:', uniqueColorCount);

  const attackPointsToAdd = uniqueColorCount;
  totalAttackPoints += attackPointsToAdd;
  cumulativeAttackPoints += attackPointsToAdd;
  console.log('Updated totalAttackPoints:', totalAttackPoints);
  console.log('Updated cumulativeAttackPoints:', cumulativeAttackPoints);

  updateGameBoard();
  console.log(`You have ${uniqueColorCount} unique colors. ${attackPointsToAdd} Attack points have been added.`);
onscreenConsole.log(`Superpower ability activated. You have ${uniqueColorCount} unique colors. +${uniqueColorCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
}

function CaptainAmericaCountUniqueColorsAndAddRecruit() {
  const allCards = [...playerHand, ...cardsPlayedThisTurn];
  console.log('Combined allCards:', allCards);

  const uniqueColors = new Set();

  allCards.forEach(card => {
    if (card.color) {
      uniqueColors.add(card.color);
      console.log(`Card color added: ${card.color}`);
    } else {
      console.log('Card without color encountered:', card);
    }
  });

  const uniqueColorCount = uniqueColors.size;
  console.log('Unique colors found:', uniqueColorCount);

  const recruitPointsToAdd = uniqueColorCount;
  totalRecruitPoints += recruitPointsToAdd;
  cumulativeRecruitPoints += recruitPointsToAdd;
  console.log('Updated totalRecruitPoints:', totalRecruitPoints);
  console.log('Updated cumulativeRecruitPoints:', cumulativeRecruitPoints);

  updateGameBoard();
  console.log(`You have ${uniqueColorCount} unique colors. ${recruitPointsToAdd} Recruit points have been added.`);
onscreenConsole.log(`Superpower ability activated. You have ${uniqueColorCount} unique colors. +${uniqueColorCount} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
}

function DeadpoolReDraw() {
  if (cardsPlayedThisTurn.length === 1) {
    return new Promise((resolve) => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "Do you wish to discard the remainder of your hand and draw four cards?",
        "Yes",
        "No"
      );

      const cardImage = document.getElementById('hero-ability-may-card');
const hoverText = document.getElementById('heroAbilityHoverText');
      cardImage.style.display = 'block';
hoverText.style.display = 'none';


      // Set the correct image source
      cardImage.src = 'Visual Assets/Heroes/Core/Core_Deadpool_DoOver.png';



      confirmButton.onclick = function () {
        // Discard all cards in hand
        playerDiscardPile.push(...playerHand);
        justAddedToDiscard.push(...playerHand);
        playerHand = [];
        console.log('Hand discarded.');
        onscreenConsole.log('Hand discarded.');

        // Draw four new cards
        extraDraw();
        extraDraw();
        extraDraw();
        extraDraw();
        updateGameBoard();

        // Hide the popup and card image
        hideHeroAbilityMayPopup();
        cardImage.style.display = 'none';
hoverText.style.display = 'block';

        // Handle invulnerability after discarding and drawing new cards
        discardInvulnerabilityReturnChoice().then(() => {
          updateGameBoard(); // Update game state after handling invulnerability
          resolve(); // Resolve the promise after everything is done
        });
      };

      denyButton.onclick = function () {
        onscreenConsole.log("Original hand preserved.");
        hideHeroAbilityMayPopup();
        cardImage.style.display = 'none'; // Hide the card image after popup is closed
hoverText.style.display = 'block';
        resolve(); // Resolve the promise immediately since no additional actions are needed
      };
    });
  }
}

function EmmaFrostVoluntaryVillainForAttack() {

onscreenConsole.log(`<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);

  return new Promise((resolve) => {
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `You may play an extra villain card for +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">. Do you wish to proceed?`,
      "Yes",
      "No"
    );

const cardImage = document.getElementById('hero-ability-may-card');
const hoverText = document.getElementById('heroAbilityHoverText');
cardImage.style.display = 'block';
hoverText.style.display = 'none';


cardImage.src = 'Visual Assets/Heroes/Core/Core_EmmaFrost_ShadowedThoughts.png';

    confirmButton.onclick = function() {
      console.log("Extra villain card played. +2 attack granted.");
onscreenConsole.log(`Extra Villain card played. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
      drawVillainCard();
      totalAttackPoints += 2;
      cumulativeAttackPoints += 2;
      updateGameBoard();
      hideHeroAbilityMayPopup();
cardImage.style.display = 'none';
hoverText.style.display = 'block';
      resolve();
    };

    denyButton.onclick = function() {
      console.log("No extra villain card played.");
onscreenConsole.log('No extra Villain card has been played.');
      hideHeroAbilityMayPopup();
cardImage.style.display = 'none';
hoverText.style.display = 'block';
      resolve();
    };
  });
}

function hideHeroAbilityMayPopup() {
document.getElementById('hero-ability-may-popup').style.display = 'none';
document.getElementById('modal-overlay').style.display = 'none';
const cardImage = document.getElementById('hero-ability-may-card');
cardImage.style.display = 'none';

}
function drawInsteadOfWound() {
  return new Promise((resolve) => {
    // Show the popup and get the buttons
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      "DO YOU WISH TO REVEAL THIS CARD TO DRAW A CARD INSTEAD OF GAINING A WOUND?",
      "REVEAL AND DRAW",
      "GAIN A WOUND"
    );

    // Get the card image element and set the image source properly
    const cardImage = document.getElementById('hero-ability-may-card');
const hoverText = document.getElementById('heroAbilityHoverText');
    if (cardImage) {
      cardImage.src = 'Visual Assets/Heroes/Core/Core_CaptainAmerica_DivingBlock.png'; // Set the correct image path
      cardImage.style.display = 'block'; // Ensure the image is visible
 hoverText.style.display = 'none';
    } else {
      console.error('Card image element not found.');
    }

    // Handle confirm button click
    confirmButton.onclick = function() {
onscreenConsole.log(`Superpower ability activated. You have avoided gaining a Wound.`);
      extraDraw(); // Logic for drawing the extra card
      hideHeroAbilityMayPopup();
      resolve(); // Resolve the promise after completing the action
    };

    // Handle deny button click
    denyButton.onclick = function() {
      if (woundDeck.length > 0) {
        const gainedWound = woundDeck.pop(); // Gain a wound if available
        playerDiscardPile.push(gainedWound);
        console.log("Wound Gained");
onscreenConsole.log(`Wound gained.`);
        updateGameBoard(); // Update the game board
      } else {
        console.log("No wounds left. You've taken enough damage!");
onscreenConsole.log(`No Wounds left to gain. You've taken enough damage!`);
      }
      hideHeroAbilityMayPopup();
      resolve(); // Resolve the promise after completing the action
    };
  });
}



function DeadpoolChooseToGainWound() {
  return new Promise((resolve) => {
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      "Do you wish to gain a Wound?",
      "Yes",
      "No"
    );

    const WoundImage = document.getElementById('hero-ability-may-card');
    const imageText = document.getElementById('heroAbilityHoverText');

    // Display the wound image and hide hover text
    if (WoundImage && imageText) {
      WoundImage.style.display = 'block';
      WoundImage.src = "Visual Assets/Other/Wound.png";
      imageText.style.display = 'none'; // Hide hover text
    }

    // Confirm button handling
    confirmButton.onclick = function() {
      function hasWoundInvulnerability() {
        return playerHand.some(card => card.invulnerability === 'Wound') ||
               cardsPlayedThisTurn.some(card => card.invulnerability === 'Wound');
      }

      if (hasWoundInvulnerability()) {
        console.log("Invulnerability to wound found.");
        drawInsteadOfWound().then(() => {
          hideHeroAbilityMayPopup();
          if (WoundImage && imageText) {
            imageText.style.display = 'block';
            WoundImage.src = ""; // Clear the wound image
          }
          resolve(); // Resolve after the wound handling is complete
        });
        return; // Exit since we're waiting for `drawInsteadOfWound`
      }

      // Handle gaining a wound
      if (woundDeck.length > 0) {
        const gainedWound = woundDeck.pop();
        playerHand.push(gainedWound);
        console.log("Wound gained and added to your hand.");
onscreenConsole.log("Wound gained and added to your hand.");
        updateGameBoard();
      } else {
        console.log("No wounds left. You've taken enough damage!");
onscreenConsole.log("No wounds left. You've taken enough damage!");
      }

      hideHeroAbilityMayPopup();
      if (WoundImage && imageText) {
        imageText.style.display = 'block';
        WoundImage.src = ""; // Clear the wound image
      }
      resolve();
    };

    // Deny button handling
    denyButton.onclick = function() {
      console.log("No Wound gained.");
onscreenConsole.log("No Wound gained.");
      hideHeroAbilityMayPopup();
      if (WoundImage && imageText) {
        imageText.style.display = 'block';
        WoundImage.src = ""; // Clear the wound image
      }
      resolve();
    };
  });
}


function GambitTopCardDiscardOrPutBack(currentPlayer) {
    return new Promise((resolve) => {
        // Check if the player deck is empty and needs reshuffling
        if (playerDeck.length === 0) {
            if (playerDiscardPile.length > 0) {
                playerDeck = shuffle(playerDiscardPile);
                playerDiscardPile = [];
            } else {
                console.log("No cards available to be drawn.");
onscreenConsole.log("No cards available to be drawn.");
                resolve();
                return;
            }
        }

    const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: <span class="bold-spans">${topCardPlayerDeck.name}</span>. Do you wish to discard or return to deck?`,
      "Discard",
      "Return to Deck"
    );

const cardImage = document.getElementById('hero-ability-may-card');
cardImage.style.display = 'block';
cardImage.src = topCardPlayerDeck.image;

const hoverText = document.getElementById('heroAbilityHoverText');
hoverText.style.display = 'none';

    confirmButton.onclick = function() {
      playerDeck.pop();
      playerDiscardPile.push(topCardPlayerDeck);
justAddedToDiscard.push(topCardPlayerDeck);
      console.log(`You discarded ${topCardPlayerDeck.name}.`);
onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been discarded.`);
     updateGameBoard();
      hideHeroAbilityMayPopup();
hoverText.style.display = 'block';
cardImage.style.display = 'none';
      resolve();
if (topCardPlayerDeck.invulnerability === "Discard") {
discardInvulnerabilityReturnChoice();
}
    };

    denyButton.onclick = function() {
      console.log(`You put ${topCardPlayerDeck.name} back on top of your deck.`);
onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`);
      updateGameBoard();
      hideHeroAbilityMayPopup();
hoverText.style.display = 'block';
cardImage.style.display = 'none';
      resolve();
    };
  });
}

function topCardKOOrPutBack(currentPlayer) {
onscreenConsole.log(`Fight! Reveal the top card of your deck and choose to KO it or put it back.`);
  return new Promise((resolve) => {
    if (playerDeck.length === 0) {
      playerDeck = shuffle(playerDiscardPile);
      playerDiscardPile = [];
    }

    const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: ${topCardPlayerDeck.name}. Do you wish to KO it or put it back?`,
      "KO",
      "Put It Back"
    );

    confirmButton.onclick = function() {
      playerDeck.pop();
      koPile.push(topCardPlayerDeck);
      onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`);
     updateGameBoard();
      hideHeroAbilityMayPopup();
      resolve();
    };

    denyButton.onclick = function() {
      onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`);
      updateGameBoard();
      hideHeroAbilityMayPopup();
      resolve();
    };
  });
}




function rescueThreeBystanders() {
  rescueThreeBystandersAvailable = true;
 console.log('Whenever you defeat a villain or mastermind this turn, you will rescue 3 bystanders.');
 onscreenConsole.log('Whenever you defeat a Villain or Mastermind this turn, you will rescue three Bystanders.');
}

function EmmaFrostExtraThreeRecruit() {
  extraThreeRecruitAvailable = true;

console.log('Whenever you defeat a villain or mastermind this turn, you will gain 3 Recruit points.');
 onscreenConsole.log('Whenever you defeat a Villain or Mastermind this turn, you will rescue gain +3 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.');
}


function WolverineKoWoundToDraw() {
  return new Promise((resolve) => {
    // Check for wounds in hand and discard pile
    const hasWoundInHand = playerHand.some(card => card.type === 'Wound');
    const hasWoundInDiscard = playerDiscardPile.some(card => card.type === 'Wound');

    // If no wounds are found, log 'No Wounds' and resolve the promise
    if (!hasWoundInHand && !hasWoundInDiscard) {
      console.log('No Wounds');
      onscreenConsole.log('No Wounds available to KO.');
      resolve();
      return;
    }

    // Determine which buttons to show
    let confirmLabel = "";
    let denyLabel = "";
    let extraLabel = "No Thanks";
    let showConfirmButton = false;
    let showDenyButton = false;

    if (hasWoundInHand) {
      confirmLabel = "KO From Hand";
      showConfirmButton = true;
    }

    if (hasWoundInDiscard) {
      denyLabel = "KO From Discard";
      showDenyButton = true;
    }

    // Show the popup with the relevant options
    const { confirmButton, denyButton, extraButton } = showHeroAbilityMayPopup(
      `You may KO a wound from your hand or discard pile to draw a card.`,
      confirmLabel,
      denyLabel,
      extraLabel,
      true // Always show the third button for 'No Thanks'
    );

    // Show or hide buttons based on the availability of wounds
    confirmButton.style.display = showConfirmButton ? 'inline-block' : 'none';
    denyButton.style.display = showDenyButton ? 'inline-block' : 'none';

    const WoundImage = document.getElementById('hero-ability-may-card');

    const imageText = document.getElementById('heroAbilityHoverText');

WoundImage.style.display = 'block';

    // Ensure the elements exist before trying to modify them
    if (WoundImage && imageText) {
      WoundImage.src = "Visual Assets/Other/Wound.png";
      imageText.style.display = 'none'; // Hide the hover text while showing the wound image
    }

    confirmButton.onclick = function() {
      if (hasWoundInHand) {
        // KO a wound from the hand
        const woundCardIndex = playerHand.findIndex(card => card.type === 'Wound');
        const woundCard = playerHand.splice(woundCardIndex, 1)[0];
        koPile.push(woundCard); // Send the wound to the KO pile
        console.log(`You KO'd a wound from your hand.`);
        onscreenConsole.log(`You KO'd a Wound from your Hand.`);
        extraDraw();
        updateGameBoard();
        hideHeroAbilityMayPopup();



        // Restore the hover text and clear the wound image
        if (WoundImage && imageText) {
          imageText.style.display = 'block';
          WoundImage.src = ""; // Clear the image
        }

        resolve();
      }
    };

    denyButton.onclick = function() {
      if (hasWoundInDiscard) {
        // KO a wound from the discard pile
        const woundCardIndex = playerDiscardPile.findIndex(card => card.type === 'Wound');
        const woundCard = playerDiscardPile.splice(woundCardIndex, 1)[0];
        koPile.push(woundCard); // Send the wound to the KO pile
        console.log(`You KO'd a wound from your discard pile.`);
        onscreenConsole.log(`You KO'd a Wound from your discard pile.`);
        extraDraw();
        updateGameBoard();
        hideHeroAbilityMayPopup();

        // Restore the hover text and clear the wound image
        if (WoundImage && imageText) {
          imageText.style.display = 'block';
          WoundImage.src = ""; // Clear the image
        }

        resolve();
      }
    };

    extraButton.onclick = function() {
      console.log(`No wound was KO'd.`);
      onscreenConsole.log(`You chose not to KO any Wounds.`);
      hideHeroAbilityMayPopup();

      // Restore the hover text and clear the wound image
      if (WoundImage && imageText) {
        imageText.style.display = 'block';
        WoundImage.src = ""; // Clear the image
      }

      resolve();
    };
  });
}

function HulkKoWoundToGainAttack() {
  return new Promise((resolve) => {
    // Check for wounds in hand and discard pile
    const hasWoundInHand = playerHand.some(card => card.type === 'Wound');
    const hasWoundInDiscard = playerDiscardPile.some(card => card.type === 'Wound');

    // If no wounds are found, log 'No Wounds' and resolve the promise
    if (!hasWoundInHand && !hasWoundInDiscard) {
      console.log('No Wounds');
onscreenConsole.log('No Wounds available to KO.');
      resolve();
      return;
    }

    // Determine which buttons to show
    let confirmLabel = "";
    let denyLabel = "";
    let extraLabel = "No Thanks";
    let showConfirmButton = false;
    let showDenyButton = false;

    if (hasWoundInHand) {
      confirmLabel = "KO From Hand";
      showConfirmButton = true;
    }

    if (hasWoundInDiscard) {
      denyLabel = "KO From Discard";
      showDenyButton = true;
    }

    // Show the popup with the relevant options
    const { confirmButton, denyButton, extraButton } = showHeroAbilityMayPopup(
      `You may KO a Wound from your hand or discard pile to gain +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`,
      confirmLabel,
      denyLabel,
      extraLabel,
      true // Always show the third button for 'No Thanks'
    );

    const HulkImage = document.getElementById('hero-ability-may-card');
const HulkText = document.getElementById('heroAbilityHoverText');
        HulkImage.src = "Visual Assets/Heroes/Core/Core_Hulk_UnstoppableHulk.png"; 
HulkText.style.display = 'none';
HulkImage.style.display = 'block';



    // Show or hide buttons based on the availability of wounds
    if (showConfirmButton) {
      confirmButton.style.display = 'inline-block';
    } else {
      confirmButton.style.display = 'none';
    }

    if (showDenyButton) {
      denyButton.style.display = 'inline-block';
    } else {
      denyButton.style.display = 'none';
    }

    confirmButton.onclick = function() {
      if (hasWoundInHand) {
        // KO a wound from the hand
        const woundCardIndex = playerHand.findIndex(card => card.type === 'Wound');
        const woundCard = playerHand.splice(woundCardIndex, 1)[0];
        koPile.push(woundCard); // Send the wound to the KO pile
        onscreenConsole.log(`You KO'd a Wound from your hand. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
         totalAttackPoints += 2;
  cumulativeAttackPoints += 2;

        updateGameBoard();
        hideHeroAbilityMayPopup();
HulkText.style.display = 'block';
HulkImage.style.display = 'none';
        resolve();
      }
    };

    denyButton.onclick = function() {
      if (hasWoundInDiscard) {
        // KO a wound from the discard pile
        const woundCardIndex = playerDiscardPile.findIndex(card => card.type === 'Wound');
        const woundCard = playerDiscardPile.splice(woundCardIndex, 1)[0];
        koPile.push(woundCard); // Send the wound to the KO pile
                onscreenConsole.log(`You KO'd a Wound from your discard pile. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
        totalAttackPoints += 2;
  cumulativeAttackPoints += 2;
        updateGameBoard();
        hideHeroAbilityMayPopup();
HulkText.style.display = 'block';
HulkImage.style.display = 'none';
        resolve();
      }
    };

    extraButton.onclick = function() {
      onscreenConsole.log(`No Wound was KO'd.`);
      hideHeroAbilityMayPopup();
HulkText.style.display = 'block';
HulkImage.style.display = 'none';
      resolve();
    };
  });
}

function SpiderManRevealTopThreeAndReorder() {
  return new Promise((resolve) => {
    // Prepare to hold up to three cards
    let holdingArray = [];

    // Draw up to three cards, checking for an empty deck after each draw
    for (let i = 0; i < 3; i++) {
      // Check if the player deck is empty and needs reshuffling
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
        } else {
          onscreenConsole.log("No cards available to reveal.");
          break; // Exit the loop if both deck and discard pile are empty
        }
      }

      // Draw the top card and add it to the holding array
      holdingArray.push(playerDeck.pop());
    }

    // Filter cards with cost <= 2 into the player's hand
    holdingArray = holdingArray.filter(card => {
      if (card.cost <= 2) {
        playerHand.push(card);
        extraCardsDrawnThisTurn++;
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> (Cost: ${card.cost}) has been added to your hand.`);
        return false; // Remove from holdingArray
      }
      return true; // Keep in holdingArray
    });

    // Update the game board if no cards left in holdingArray
    if (holdingArray.length === 0) {
      onscreenConsole.log("All revealed cards cost 2 or less and have been added to your hand.");
      updateGameBoard();
      resolve();
      return;
    }

    // Handle remaining cards in holdingArray
    if (holdingArray.length === 1) {
      const onlyCard = holdingArray.pop();
      playerDeck.push(onlyCard);
      console.log(`${onlyCard.name} cost more than 2 and has been returned to the top of your deck.`);
onscreenConsole.log(`<span class="console-highlights">${onlyCard.name}</span> cost more than 2 and has been returned to the top of your deck.`);
      updateGameBoard();
      resolve();
      return;
    }

    if (holdingArray.length === 2) {
      const [option1, option2] = holdingArray;

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `The following two cards cost more than 2 and couldn’t be drawn. Which do you wish to place back on your deck first?`,
        `${option1.name}`,
        `${option2.name}`
      );

      // Add hover functionality for the first option
      confirmButton.onmouseover = () => showCardImage(option1.image);
      confirmButton.onmouseout = () => hideCardImage();

      // Add hover functionality for the second option
      denyButton.onmouseover = () => showCardImage(option2.image);
      denyButton.onmouseout = () => hideCardImage();

      confirmButton.onclick = function() {
        playerDeck.push(option1);
        playerDeck.push(option2);
        console.log(`You returned ${option1.name} to your deck first and then ${option2.name}.`);
onscreenConsole.log(`You returned <span class="console-highlights">${option1.name}</span> to your deck first, followed by <span class="console-highlights">${option2.name}</span>.`);
        updateGameBoard();
        hideHeroAbilityMayPopup();
        resolve();
      };

      denyButton.onclick = function() {
        playerDeck.push(option2);
        playerDeck.push(option1);
        console.log(`You returned ${option2.name} to the deck first and then ${option1.name}.`);
onscreenConsole.log(`You returned <span class="console-highlights">${option2.name}</span> to your deck first, followed by <span class="console-highlights">${option1.name}</span>.`);
        updateGameBoard();
        hideHeroAbilityMayPopup();
        resolve();
      };
    }

    if (holdingArray.length === 3) {
      let [card1, card2, card3] = holdingArray;

      function showFirstChoice() {
        const { confirmButton, denyButton, extraButton } = showHeroAbilityMayPopup(
          `You have three cards to return to your deck. Choose the first card to return.`,
          card1.name,
          card2.name,
          card3.name, // Label for the third button (card3)
          true // Show the third button
        );

        // Add hover functionality for the first card
        confirmButton.onmouseover = () => showCardImage(card1.image);
        confirmButton.onmouseout = () => hideCardImage();

        // Add hover functionality for the second card
        denyButton.onmouseover = () => showCardImage(card2.image);
        denyButton.onmouseout = () => hideCardImage();

        // Add hover functionality for the third card
        extraButton.onmouseover = () => showCardImage(card3.image);
        extraButton.onmouseout = () => hideCardImage();

        confirmButton.onclick = function() {
          playerDeck.push(card1);
          holdingArray = [card2, card3];
          console.log(`${card1.name} was returned to the deck first.`);
onscreenConsole.log(`<span class="console-highlights">${card1.name}</span> was returned to your deck first.`);
          hideHeroAbilityMayPopup();
          showSecondChoice();
        };

        denyButton.onclick = function() {
          playerDeck.push(card2);
          holdingArray = [card1, card3];
          console.log(`${card2.name} was returned to the deck first.`);
onscreenConsole.log(`<span class="console-highlights">${card2.name}</span> was returned to your deck first.`);
          hideHeroAbilityMayPopup();
          showSecondChoice();
        };

        extraButton.onclick = function() {
          playerDeck.push(card3);
          holdingArray = [card1, card2];
          console.log(`${card3.name} was returned to the deck first.`);
onscreenConsole.log(`<span class="console-highlights">${card3.name}</span> was returned to your deck first.`);
          hideHeroAbilityMayPopup();
          showSecondChoice();
        };
      }

      function showSecondChoice() {
        const [remaining1, remaining2] = holdingArray;

        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          `Choose the next card to return to the deck.`,
          remaining1.name,
          remaining2.name
        );

        // Add hover functionality for the first remaining card
        confirmButton.onmouseover = () => showCardImage(remaining1.image);
        confirmButton.onmouseout = () => hideCardImage();

        // Add hover functionality for the second remaining card
        denyButton.onmouseover = () => showCardImage(remaining2.image);
        denyButton.onmouseout = () => hideCardImage();

        confirmButton.onclick = function() {
          playerDeck.push(remaining1);
          playerDeck.push(remaining2);
          console.log(`${remaining1.name} was returned to your deck second, followed by ${remaining2.name}.`);
onscreenConsole.log(`<span class="console-highlights">${remaining1.name}</span> was returned to your deck second, followed by <span class="console-highlights">${remaining2.name}</span>.`);
          updateGameBoard();
          hideHeroAbilityMayPopup();
          resolve();
        };

        denyButton.onclick = function() {
          playerDeck.push(remaining2);
          playerDeck.push(remaining1);
          console.log(`${remaining2.name} was returned to your deck second, followed by ${remaining1.name}.`);
onscreenConsole.log(`<span class="console-highlights">${remaining2.name}</span> was returned to your deck second, followed by <span class="console-highlights">${remaining1.name}</span>.`);
          updateGameBoard();
          hideHeroAbilityMayPopup();
          resolve();
        };
      }

      // Start the choice process
      showFirstChoice();
    }
  });
}

// Helper functions to show and hide card images on hover
function showCardImage(imageSrc) {
  const heroImage = document.getElementById('hero-ability-may-card');
  const hoverText = document.getElementById('heroAbilityHoverText');
  heroImage.src = imageSrc;  // Set the image source
  heroImage.style.display = 'block';  // Show the image
  hoverText.style.display = 'none';  // Hide hover text
}

function hideCardImage() {
  const heroImage = document.getElementById('hero-ability-may-card');
  const hoverText = document.getElementById('heroAbilityHoverText');
  heroImage.src = '';  // Clear the image source
  heroImage.style.display = 'none';  // Hide the image
  hoverText.style.display = 'block';  // Show hover text again
}

function RogueCopyTopCardEffect(currentPlayer) {
  return new Promise((resolve) => {
    // Check if the player deck is empty and needs reshuffling
    if (playerDeck.length === 0) {
      if (playerDiscardPile.length > 0) {
        playerDeck = shuffle(playerDiscardPile);
        playerDiscardPile = [];
      } else {
        console.log("No cards left in deck or discard pile.");
onscreenConsole.log('No cards available to draw and discard.');
        resolve();
        return;
      }
    }

    // Draw the top card and immediately send it to the discard pile
    const topCard = playerDeck.pop();
    playerDiscardPile.push(topCard);
justAddedToDiscard.push(topCard);

    // Simulate the play of the card by adding its full details to cardsPlayedThisTurn
    const simulatedCard = { ...topCard };
    cardsPlayedThisTurn.push(simulatedCard);

    // Extract card details for simulation
    const cardName = simulatedCard.name;
    const cardAttack = simulatedCard.attack || 0;
    const cardRecruit = simulatedCard.recruit || 0;
    const cardUnconditionalAbility = simulatedCard.unconditionalAbility || "None";
    const cardConditionalAbility = simulatedCard.conditionalAbility || "None";
    const cardConditionType = simulatedCard.conditionType || null;
    const cardCondition = simulatedCard.condition || null;

    console.log(`You reveal the top card of your deck: ${cardName}. It has ${cardAttack} attack and ${cardRecruit} recruit points.`);
onscreenConsole.log(`You revealed the top card of your deck: <span class="console-highlights">${cardName}</span>. It has been discarded so that <span class="console-highlights">Rogue</span> can copy it.`);
onscreenConsole.log(`You have gained +${cardAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> attack and +${cardRecruit} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);


    // Simulate attack and recruit points
    totalAttackPoints += cardAttack;
    totalRecruitPoints += cardRecruit;
cumulativeAttackPoints += cardAttack;
cumulativeRecruitPoints += cardRecruit;

    // Handle unconditional ability
    let abilityPromise = Promise.resolve();
    if (cardUnconditionalAbility && cardUnconditionalAbility !== "None") {
      const abilityFunction = window[cardUnconditionalAbility];
      if (typeof abilityFunction === 'function') {
        // Wrap the result in a Promise if it isn't one
        abilityPromise = new Promise((resolve, reject) => {
          try {
            const result = abilityFunction(currentPlayer, simulatedCard);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        console.error(`Unconditional ability function ${cardUnconditionalAbility} not found`);
      }

if (topCard.invulnerability === "Discard") {
discardInvulnerabilityReturnChoice();
}

    }

    // Handle conditional ability
    abilityPromise.then(() => {
      if (cardConditionalAbility && cardConditionalAbility !== "None") {
        if (isConditionMet(cardConditionType, cardCondition)) {
          const conditionalAbilityFunction = window[cardConditionalAbility];
          if (typeof conditionalAbilityFunction === 'function') {
            // Wrap the result in a Promise if it isn't one
            return new Promise((resolve, reject) => {
              try {
                const result = conditionalAbilityFunction(currentPlayer, simulatedCard);
                resolve(result);
              } catch (error) {
                reject(error);
              }
            });
          } else {
            console.error(`Conditional ability function ${cardConditionalAbility} not found`);
          }
        } else {
          console.log(`Condition not met for: ${cardConditionalAbility}`);
        }
      }
    }).then(() => {
      // Update game state/UI
      updateGameBoard();
      resolve();
    }).catch(err => {
      console.error('Error during copy effect simulation:', err);
      resolve();
    });
  });
}

function findCardsWithBystanders() {
    const cardsWithBystanders = [];

    console.log('City state:', city);

    // Check each city space for villains with bystanders
    city.forEach((card, index) => {
        if (card) {
            console.log(`Checking city card at index ${index}:`, card);
            if (card.bystander && card.bystander.length > 0) {
                console.log(`Card at index ${index} has bystanders:`, card.bystander);
                cardsWithBystanders.push({ 
                    name: card.name, 
                    type: 'villain', 
                    index: index, 
                    image: card.image, 
                    bystander: card.bystander // Include the bystander array
                });
            }
        }
    });

    // Get the mastermind data object
    const mastermind = getSelectedMastermind();

    // Check the mastermind for bystanders
    if (mastermind) {
        console.log('Checking mastermind:', mastermind);
        if (mastermind.bystanders && mastermind.bystanders.length > 0) {
            console.log('Mastermind has bystanders:', mastermind.bystanders);
            cardsWithBystanders.push({ 
                name: mastermind.name, 
                type: 'mastermind', 
                bystander: mastermind.bystanders // Include the bystanders array
            });
        } else {
            console.log('Mastermind has no bystanders.');
        }
    } else {
        console.log('No mastermind found.');
    }

    console.log('Cards with bystanders found:', cardsWithBystanders);
    return cardsWithBystanders;
}

function BlackWidowShowBystanderRescueOptions() {
    const cardsWithBystanders = findCardsWithBystanders();
    if (cardsWithBystanders.length === 0) {
        onscreenConsole.log('No targets with Bystanders to rescue.');
        return;
    }

    // Get the popup elements
    const popup = document.getElementById('card-choice-one-location-popup');
    const cardsList = document.getElementById('cards-to-choose-from');
const context = document.getElementById('context');

context.innerHTML = 'Defeat a villain or mastermind that has a bystander.';

    // Clear previous list
    cardsList.innerHTML = '';

    // Populate the list with cards that have bystanders
    cardsWithBystanders.forEach(card => {
        console.log('Adding card to selection list:', card);
        const li = document.createElement('li');
        li.textContent = card.name;

const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

        li.onclick = () => handleBystanderRescueSelection(card);
        cardsList.appendChild(li);
    });

    // Show the popup
    popup.style.display = 'block';
}

function handleBystanderRescueSelection(card) {
    console.log('Card selected for rescue:', card);
    const popup = document.getElementById('card-choice-one-location-popup');
    let bystanderCount = 0;
    let bystanderLabel = "Bystander"; // Declare with 'let' to modify later

    popup.style.display = 'none';

    // Ensure card.bystander exists before accessing its length
    if (card.bystander && card.bystander.length) {
        bystanderCount = card.bystander.length;
    }

    // Use '===' for comparison instead of '=' for assignment
    bystanderLabel = (bystanderCount === 1) ? "Bystander" : "Bystanders";

    // Adjust log message to use string interpolation correctly
    if (card.type === 'villain') {
        console.log(`Attacking villain at index ${card.index}`);
        onscreenConsole.log(`<span class="console-highlights">${card.name}</span> defeated. ${bystanderCount} ${bystanderLabel} rescued.`);
        
        // Refund the attack points spent
        totalAttackPoints += city[card.index].attack;
        confirmAttack(card.index);
    } else if (card.type === 'mastermind') {
        console.log('Attacking mastermind');
        
        // Refund the attack points spent
        const mastermind = getSelectedMastermind();
        totalAttackPoints += mastermind.attack;
        confirmMastermindAttack();
    }

    updateGameBoard(); // Ensure the board is updated
}

function CyclopsOpticBlastDiscardToPlay() {
    
    // Check if there are any cards to discard
    if (playerHand.length === 0) {
        console.log("No cards in Hand to discard. You are unable to play this card.");
onscreenConsole.log("No cards in Hand to discard. You are unable to play this card.");
        return;
    }

    // Get the popup elements
    const popup = document.getElementById('card-choice-one-location-popup');
    const cardsList = document.getElementById('cards-to-choose-from');
const closeButton = document.getElementById('close-choice-button');
const context = document.getElementById('context');

context.innerHTML = "IN ORDER TO PLAY THIS CARD, YOU MUST DISCARD ANOTHER FROM YOUR HAND. IF YOU WISH TO, CHOOSE A CARD.";

    // Clear previous list
    cardsList.innerHTML = '';

    // Populate the list with cards in the player's hand
    playerHand.forEach((card, index) => {
        console.log('Adding card to selection list:', card);
        const li = document.createElement('li');
        li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

        li.onclick = () => CyclopsOpticBlastDiscardSelectedCard(index);
        cardsList.appendChild(li);
    });

    // Show the popup
    popup.style.display = 'block';
document.getElementById("modal-overlay").style.display = "block";
 closeButton.style.display = 'inline-block';

    closeButton.onclick = () => {
        console.log('Card cannot be played since no card was discarded.');
onscreenConsole.log(`You have chosen not to discard, preventing you from playing <span class="console-highlights">Cyclops - Optic Blast</span>.`);
        popup.style.display = 'none';
document.getElementById("modal-overlay").style.display = "none";
const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
            playerHand.push(unplayedCard);
totalAttackPoints -= unplayedCard.attack;
totalRecruitPoints -= unplayedCard.recruit;
cumulativeAttackPoints -= unplayedCard.attack;
cumulativeRecruitPoints -= unplayedCard.recruit;
updateGameBoard();
    };

    function CyclopsOpticBlastDiscardSelectedCard(cardIndex) {
        const selectedCard = playerHand[cardIndex];
        console.log('Card selected for discard:', selectedCard);
        
        // Remove the card from the player's hand
        playerHand.splice(cardIndex, 1);
        
        // Add the card to the discard pile
        playerDiscardPile.push(selectedCard);
justAddedToDiscard.push(selectedCard);

onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCard.name}</span>, allowing you to play <span class="console-highlights">Cyclops - Optic Blast</span>.`);
        
        // Update the game state, if necessary
        updateGameBoard();

        // Close the popup
        popup.style.display = 'none';
document.getElementById("modal-overlay").style.display = "none";

if (selectedCard.invulnerability === "Discard") {
discardInvulnerabilityReturnChoice();
}
    }
}

function CyclopsDeterminationDiscardToPlay() {
    
    // Check if there are any cards to discard
    if (playerHand.length === 0) {
        console.log("No cards in Hand to discard. You are unable to play this card.");
onscreenConsole.log("No cards in Hand to discard. You are unable to play this card.");
        return;
    }

    // Get the popup elements
    const popup = document.getElementById('card-choice-one-location-popup');
    const cardsList = document.getElementById('cards-to-choose-from');
const closeButton = document.getElementById('close-choice-button');
const context = document.getElementById('context');

context.innerHTML = "IN ORDER TO PLAY THIS CARD, YOU MUST DISCARD ANOTHER FROM YOUR HAND. IF YOU WISH TO, CHOOSE A CARD.";

    // Clear previous list
    cardsList.innerHTML = '';

    // Populate the list with cards in the player's hand
    playerHand.forEach((card, index) => {
        console.log('Adding card to selection list:', card);
        const li = document.createElement('li');
        li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

        li.onclick = () => CyclopsDeterminationDiscardSelectedCard(index);
        cardsList.appendChild(li);
    });

    // Show the popup
    popup.style.display = 'block';
document.getElementById("modal-overlay").style.display = "block";
 closeButton.style.display = 'inline-block';

    closeButton.onclick = () => {
        console.log('Card cannot be played since no card was discarded.');
onscreenConsole.log(`You have chosen not to discard, preventing you from playing <span class="console-highlights">Cyclops - Determination</span>.`);
        popup.style.display = 'none';
document.getElementById("modal-overlay").style.display = "none";
const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
            playerHand.push(unplayedCard);
totalAttackPoints -= unplayedCard.attack;
totalRecruitPoints -= unplayedCard.recruit;
cumulativeAttackPoints -= unplayedCard.attack;
cumulativeRecruitPoints -= unplayedCard.recruit;
updateGameBoard();
    };

    function CyclopsDeterminationDiscardSelectedCard(cardIndex) {
        const selectedCard = playerHand[cardIndex];
        console.log('Card selected for discard:', selectedCard);
        
        // Remove the card from the player's hand
        playerHand.splice(cardIndex, 1);
        
        // Add the card to the discard pile
        playerDiscardPile.push(selectedCard);
justAddedToDiscard.push(selectedCard);

onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCard.name}</span>, allowing you to play <span class="console-highlights">Cyclops - Determination</span>.`);
        
        // Update the game state, if necessary
        updateGameBoard();

        // Close the popup
        popup.style.display = 'none';
document.getElementById("modal-overlay").style.display = "none";

if (selectedCard.invulnerability === "Discard") {
discardInvulnerabilityReturnChoice();
}
    }
}


function discardInvulnerabilityReturnChoice() {
    const invulnerableCards = justAddedToDiscard.filter(card => card.invulnerability === "Discard");

    function processNextInvulnerableCard(index = 0) {
        if (index >= invulnerableCards.length) {
            updateGameBoard();
            return Promise.resolve();
        }

        const card = invulnerableCards[index];
        return new Promise((resolve) => {
            const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                `Would you like to return <span style="font-weight:600;">${card.name}</span> to your hand?`,
                "Yes",
                "No - Discard"
            );

const cardImage = document.getElementById('hero-ability-may-card');
const imageHoverText = document.getElementById('heroAbilityHoverText');

cardImage.src = card.image;
cardImage.style.display = 'block';
imageHoverText.style.display = 'none';

            // Debounce mechanism: Disable buttons temporarily after click
            function disableButtons() {
                confirmButton.disabled = true;
                denyButton.disabled = true;
                setTimeout(() => {
                    confirmButton.disabled = false;
                    denyButton.disabled = false;
                }, 300); // Set to a reasonable time to prevent accidental double clicks
            }

            confirmButton.onclick = function() {
                disableButtons();
                const cardIndex = playerDiscardPile.indexOf(card);
                if (cardIndex !== -1) {
                    playerDiscardPile.splice(cardIndex, 1);
                    playerHand.push(card);
                    console.log(`${card.name} returned to hand.`);
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been returned to your hand.`);
                }
                hideHeroAbilityMayPopup();
cardImage.src = 'none';
cardImage.style.display = 'none';
imageHoverText.style.display = 'block';
                resolve();
            };

            denyButton.onclick = function() {
                disableButtons();
                console.log(`${card.name} remains in the discard pile.`);
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been discarded.`);
                hideHeroAbilityMayPopup();
cardImage.src = 'none';
cardImage.style.display = 'none';
imageHoverText.style.display = 'block';
                resolve();
            };
        }).then(() => {
            return processNextInvulnerableCard(index + 1);
        });
    }

    return processNextInvulnerableCard();
}

function DeadpoolAssignBystanderToVillain() {
    // Check if there are any bystanders available
    if (bystanderDeck.length === 0) {
        console.log('There are no bystanders available to be captured.');
onscreenConsole.log('There are no Bystanders available to be captured.');
        return;
    }

    // Filter the villains (including henchmen) from the city array
    const villainsInCity = city.map((card, index) => {
        if (card && (card.type === 'Villain' || card.type === 'Henchman')) {
            return { ...card, originalIndex: index };
        }
        return null;
    }).filter(card => card !== null);

    // Check if there are any villains in the city
    if (villainsInCity.length === 0) {
        console.log('There are no villains in the city to capture a Bystander.');
onscreenConsole.log('There are no Villains in the city to capture a Bystander.');
        return;
    }

    // Get the popup elements
    const popup = document.getElementById('card-choice-one-location-popup');
    const cardsList = document.getElementById('cards-to-choose-from');

document.getElementById('context').innerHTML = 'CHOOSE A VILLAIN TO CAPTURE A BYSTANDER.';

    // Clear the previous list
    cardsList.innerHTML = '';

    // Populate the list with villains in the city
    villainsInCity.forEach((villain, index) => {
        const li = document.createElement('li');
        li.textContent = villain.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = villain.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

        li.onclick = () => assignBystander(index);
        cardsList.appendChild(li);
    });

    // Show the popup
    popup.style.display = 'block';
    document.getElementById("modal-overlay").style.display = "block";

    function assignBystander(villainIndex) {
        // Get the actual index of the villain in the city array
        const cityIndex = villainsInCity[villainIndex].originalIndex;

        // Remove the bystander from the bystander deck
        const bystander = bystanderDeck.pop();

        // Assign the bystander to the selected villain
        attachBystanderToVillain(cityIndex, bystander);

        console.log(`Bystander assigned to ${city[cityIndex].name}.`);
onscreenConsole.log(`Bystander captured by <span class="console-highlights">${city[cityIndex].name}</span>.`);

        // Close the popup
        popup.style.display = 'none';
        document.getElementById("modal-overlay").style.display = "none";

        updateGameBoard(); // Update the game state/UI as needed
    }
}

function attachBystanderToVillain(villainIndex, bystanderCard) {
    if (!city[villainIndex].bystanders) {
        city[villainIndex].bystanders = [];
    }
    city[villainIndex].bystanders.push(bystanderCard);
}

function GambitDrawTwoPutOneBack() {
    return new Promise((resolve) => {
        // Check if the player deck is empty and needs reshuffling
        if (playerDeck.length === 0) {
            if (playerDiscardPile.length > 0) {
                playerDeck = shuffle(playerDiscardPile);
                playerDiscardPile = [];
            } else {
                console.log("No cards available to be drawn.");
onscreenConsole.log("No cards available to be drawn.");
                resolve();
                return;
            }
        }

        // Draw two cards
        extraDraw();
        extraDraw();

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const cardsList = document.getElementById('cards-to-choose-from');
const context = document.getElementById('context');

        // Clear previous list
        cardsList.innerHTML = '';

        context.innerHTML = 'SELECT ONE CARD TO RETURN TO THE TOP OF YOUR DECK';

        // Populate the list with cards in the player's hand
        playerHand.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => returnSelectedCard(index);
            cardsList.appendChild(li);
        });

        // Show the popup
        popup.style.display = 'block';
        document.getElementById("modal-overlay").style.display = "block";

        function returnSelectedCard(cardIndex) {
            const selectedCard = playerHand[cardIndex];
            console.log('Card returned to the top of the deck:', selectedCard);
            
            // Remove the card from the player's hand
            playerHand.splice(cardIndex, 1);
            
            // Add the card to the top of the deck
            playerDeck.push(selectedCard);

onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been returned to the top of your deck.`);
            
            // Update the game state, if necessary
            updateGameBoard();


            // Close the popup
            popup.style.display = 'none';
            document.getElementById("modal-overlay").style.display = "none";

context.innerHTML = 'Context';

            // Resolve the promise to indicate the action is complete
            resolve();
        }
    });
}

function DoomDrawOrDiscard() {
    return new Promise((resolve) => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            `Do you wish to draw or discard?`,
            "Draw",
            "Discard"
        );

 const DoomImage = document.getElementById('hero-ability-may-card');
const DoomText = document.getElementById('heroAbilityHoverText');
        DoomImage.src = "Visual Assets/Masterminds/DrDoom_5.png"; 
const DoomTitle = document.getElementById('hero-ability-may-h2');

DoomTitle.innerText = 'MASTERMIND TACTIC!';

DoomText.style.display = 'none';
DoomImage.style.display = 'block';


        confirmButton.onclick = function() {
            if (playerDeck.length === 0) {
                if (playerDiscardPile.length > 0) {
                    playerDeck = shuffle(playerDiscardPile);
                    playerDiscardPile = [];
                } else {
                    console.log("No cards left in deck or discard pile.");
onscreenConsole.log(`No cards available to be drawn.`);
                    hideHeroAbilityMayPopup();
DoomText.style.display = 'block';
DoomImage.style.display = 'none';
DoomImage.src = ""; 
DoomTitle.innerHTML = 'HERO ABILITY!';
                    resolve();
                    return;
                }
            }

            extraDraw();
            hideHeroAbilityMayPopup();
            resolve();
        };

        denyButton.onclick = function() {
            hideHeroAbilityMayPopup();
            if (playerHand.length === 0) {
                console.log("No cards in hand to discard. You are unable to play this card.");
onscreenConsole.log(`No cards available to be discarded.`);
DoomText.style.display = 'block';
DoomImage.style.display = 'none';
DoomImage.src = ""; 
DoomTitle.innerHTML = 'HERO ABILITY!';
                resolve();
                return;
            }

            const popup = document.getElementById('card-choice-one-location-popup');
            const cardsList = document.getElementById('cards-to-choose-from');
            cardsList.innerHTML = '';
const doomTacticTitle = document.getElementById('cardChoiceh2');
const doomContext = document.getElementById('context');

doomTacticTitle.innerHTML = 'MASTERMIND TACTIC!';
doomContext.innerHTML = 'Select a card to discard.';

            playerHand.forEach((card, index) => {
                const li = document.createElement('li');
                li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

                li.onclick = () => {
                    discardSelectedCard(index);
                    popup.style.display = 'none';
                    document.getElementById("modal-overlay").style.display = "none";
doomTacticTitle.innerHTML = 'HERO ABILITY!';
doomContext.innerHTML = 'Context';
                    resolve();
                };
                cardsList.appendChild(li);
            });

            function discardSelectedCard(cardIndex) {
                const selectedCard = playerHand[cardIndex];
                console.log('Card selected for discard:', selectedCard);
onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been discarded.`);
                
                playerHand.splice(cardIndex, 1);
                playerDiscardPile.push(selectedCard);
                justAddedToDiscard.push(selectedCard);
                
                updateGameBoard();

                if (selectedCard.invulnerability === "Discard") {
                    discardInvulnerabilityReturnChoice();
                }
            }

            popup.style.display = 'block';
            document.getElementById("modal-overlay").style.display = "block";
        };
    });
}

function HawkeyeDrawOrDiscard() {
    return new Promise((resolve) => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            `Do you wish to draw or discard?`,
            "Draw",
            "Discard"
        );

onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);

    const HawkeyeImage = document.getElementById('hero-ability-may-card');
const HawkeyeText = document.getElementById('heroAbilityHoverText');
        HawkeyeImage.src = "Visual Assets/Heroes/Core/Core_Hawkeye_CoveringFire.png"; 

HawkeyeText.style.display = 'none';
HawkeyeImage.style.display = 'block';

        confirmButton.onclick = function() {
            if (playerDeck.length === 0) {
                if (playerDiscardPile.length > 0) {
                    playerDeck = shuffle(playerDiscardPile);
                    playerDiscardPile = [];
                } else {
                    console.log("No cards left in deck or discard pile.");
onscreenConsole.log(`No cards available to draw.`);
                    hideHeroAbilityMayPopup();
HawkeyeText.style.display = 'block';
HawkeyeImage.style.display = 'none';
                    resolve();
                    return;
                }
            }

            extraDraw();
            hideHeroAbilityMayPopup();
HawkeyeText.style.display = 'block';
HawkeyeImage.style.display = 'none';
            resolve();
        };

        denyButton.onclick = function() {
            hideHeroAbilityMayPopup();
HawkeyeText.style.display = 'block';
HawkeyeImage.style.display = 'none';
            if (playerHand.length === 0) {
                console.log("No cards in hand to discard. You are unable to play this card.");
onscreenConsole.log(`No cards available to discard.`);
                resolve();
                return;
            }

            const popup = document.getElementById('card-choice-one-location-popup');
            const cardsList = document.getElementById('cards-to-choose-from');
const context = document.getElementById('context');

context.innerHTML = 'SELECT A CARD TO DISCARD.'
            cardsList.innerHTML = '';

            playerHand.forEach((card, index) => {
                const li = document.createElement('li');
                li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

                li.onclick = () => {
                    discardSelectedCard(index);
                    popup.style.display = 'none';
                    document.getElementById("modal-overlay").style.display = "none";
                    resolve();
                };
                cardsList.appendChild(li);
            });

            function discardSelectedCard(cardIndex) {
                const selectedCard = playerHand[cardIndex];
                console.log('Card selected for discard:', selectedCard);
                
                playerHand.splice(cardIndex, 1);
                playerDiscardPile.push(selectedCard);
                justAddedToDiscard.push(selectedCard);

onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been discarded.`);
                
                updateGameBoard();

                if (selectedCard.invulnerability === "Discard") {
                    discardInvulnerabilityReturnChoice();
                }
            }

            popup.style.display = 'block';
            document.getElementById("modal-overlay").style.display = "block";
        };
    });
}



function NickFuryFindEligibleVillains() {
    const eligibleVillains = [];
    const SHIELDInKO = [];
    let KOdSHIELDNumber = 0;

    // Step 1: Find all SHIELD heroes in the KO pile
    koPile.forEach(card => {
        if (card && card.team === "S.H.I.E.L.D.") { // Ensure card exists
            SHIELDInKO.push(card);
            console.log(`${card.name} added to list of S.H.I.E.L.D. heroes in the KO Pile.`);
            KOdSHIELDNumber = SHIELDInKO.length;
        }
    });

    console.log('Total S.H.I.E.L.D. in KO pile:', KOdSHIELDNumber);

    if (SHIELDInKO.length === 0) {
        console.log('No S.H.I.E.L.D. heroes in KO Pile.');
        onscreenConsole.log('There are no <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> Heroes in the KO Pile.');
        return;
    }

    // Step 2: Check each city space for eligible villains (those with attack less than SHIELD heroes in KO)
    city.forEach((card, index) => {
        if (card) { // Ensure card exists
            const villainAttack = recalculateVillainAttack(card); // Safely recalculate attack

            if (villainAttack < KOdSHIELDNumber) {
                if (card.name) {
                    console.log(`${card.name} added to the eligible villain list.`);
                    eligibleVillains.push({ ...card, type: 'villain', index });
                } else {
                    console.error(`Error: card at city[${index}] has no name.`);
                }
            }
        } else {
            console.error(`Error: No card at city[${index}].`);
        }
    });

    // Step 3: Check the mastermind if eligible for attack
    const mastermind = getSelectedMastermind();
    if (mastermind) { // Ensure mastermind exists
        const mastermindAttack = recalculateMastermindAttack(mastermind); // Use recalculated attack for mastermind
        if (mastermindAttack < KOdSHIELDNumber) {
            console.log(`${mastermind.name} added to the eligible villain list.`);
            eligibleVillains.push({ name: mastermind.name, type: 'mastermind', image: mastermind.image });
        }
    }

    console.log('Eligible villains after filtering:', eligibleVillains);

    // Step 4: Display the eligible villains (or mastermind) options to the player
    showEligibleVillainsOptions(eligibleVillains);
}



function showEligibleVillainsOptions(eligibleVillains) {
    if (eligibleVillains.length === 0) {
        console.log('No villains are eligible for attack.');
        onscreenConsole.log('There are not enough <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> Heroes in the KO Pile for you to attack any Villain or the Mastermind.');
        return;
    }

    // Get the popup elements
    const popup = document.getElementById('card-choice-one-location-popup');
    const cardsList = document.getElementById('cards-to-choose-from');
    const noThanks = document.getElementById('close-choice-button');

    noThanks.style.display = 'block';
    noThanks.onclick = () => {
        popup.style.display = 'none';
        document.getElementById("modal-overlay").style.display = "none";
        onscreenConsole.log('You have chosen not to defeat a Villain or Mastermind.');
        return;
    };

    // Update the context text based on the eligible villains
    const context = document.getElementById('context');
    let villainText = "Villains and Mastermind";

    if (eligibleVillains.length === 1 && eligibleVillains[0].type === "mastermind") {
        villainText = "Mastermind has";
    } else if (eligibleVillains.length === 1 && eligibleVillains[0].type === "villain") {
        villainText = "Villain has";
    } else if (eligibleVillains.length > 1 && eligibleVillains.every(villain => villain.type === "villain")) {
        villainText = "Villains have";
    } else if (eligibleVillains.length > 1 && eligibleVillains.some(villain => villain.type === "mastermind") && 
               eligibleVillains.some(villain => villain.type === "villain")) {
        villainText = "Villains and Mastermind have";
    }

    context.innerHTML = `The following ${villainText} less <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> than the number of <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="card-icons"> Heroes in the KO pile. Select one to defeat.`;

    // Clear the previous list of cards
    cardsList.innerHTML = '';

    // Populate the list with eligible villains or mastermind
    eligibleVillains.forEach(card => {
        console.log('Adding card to selection list:', card);
        const li = document.createElement('li');
        li.textContent = card.name;

        // On mouseover, change the hero image to the selected card's image
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
        li.onmouseover = () => {
            heroImage.src = card.image;
            heroImage.style.display = 'block';
            oneChoiceHoverText.style.display = 'none';
        };

        // On mouseout, reset the image
        li.onmouseout = () => {
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
        };

        // Handle the click selection
        li.onclick = () => handleEligibleVillainSelection(card);
        cardsList.appendChild(li);
    });

    // Show the popup
    popup.style.display = 'block';
    document.getElementById("modal-overlay").style.display = "block";
}

function handleEligibleVillainSelection(card) {
    console.log('Card selected for defeat:', card);
    const popup = document.getElementById('card-choice-one-location-popup');
    const noThanks = document.getElementById('close-choice-button');
    
    popup.style.display = 'none';
    document.getElementById("modal-overlay").style.display = "none";
    noThanks.style.display = 'none';

    if (card.type === 'villain') {
        console.log(`Attacking villain at index ${card.index}`);
        onscreenConsole.log(`You have chosen to defeat <span class="console-highlights">${card.name}</span>.`);
        totalAttackPoints += recalculateVillainAttack(city[card.index]); // Refund recalculated attack
        confirmAttack(card.index);
    } else if (card.type === 'mastermind') {
        console.log('Attacking mastermind');
        const mastermind = getSelectedMastermind();
        onscreenConsole.log(`You have chosen to defeat <span class="console-highlights">${mastermind.name}</span>.`);
        totalAttackPoints += recalculateMastermindAttack(mastermind); // Refund recalculated attack
        confirmMastermindAttack();
    }

    updateGameBoard(); // Ensure the board is updated
}

function NickFuryRecruitShieldOfficerByKO() {
    return new Promise((resolve) => {
        const discardPileList = document.getElementById("discard-pile-cards");
        const handList = document.getElementById("hand-cards");

const hoverText = document.getElementById("card-ko-card-popupHoverText");
const KOImage = document.getElementById("card-ko-popup-image");

const context = document.getElementById("card-ko-popup-h2");

context.innerHTML = `Do you wish to KO a card from your Discard Pile or Hand to recruit a <span class="bold-spans">S.H.I.E.L.D. Officer</span> ?`



        discardPileList.innerHTML = "";
        handList.innerHTML = "";

        const discardPile = playerDiscardPile.filter(card => card.team === "S.H.I.E.L.D.");
        const hand = playerHand.filter(card => card.team === "S.H.I.E.L.D.");

        discardPile.forEach((card) => {
            const li = document.createElement("li");
            li.textContent = card.name;

// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        KOImage.src = card.image;  // Dynamically change the image source
        KOImage.style.display = 'block';  // Ensure the image is visible
hoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        KOImage.src = '';  // Clear the image source
        KOImage.style.display = 'none';  // Hide the image
hoverText.style.display = 'block';
    };


            li.onclick = () => koDiscardCard(card);

            discardPileList.appendChild(li);
        });

        hand.forEach((card) => {
            const li = document.createElement("li");
            li.textContent = card.name;

// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        KOImage.src = card.image;  // Dynamically change the image source
        KOImage.style.display = 'block';  // Ensure the image is visible
hoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        KOImage.src = '';  // Clear the image source
        KOImage.style.display = 'none';  // Hide the image
hoverText.style.display = 'block';
    };
            li.onclick = () => koHandCard(card);

            handList.appendChild(li);
        });

        document.getElementById("card-ko-popup").style.display = "block";
        document.getElementById("modal-overlay").style.display = "block";

        resolve(); // Resolve after displaying the popup
    });
}

function koDiscardCard(card) {
    const index = playerDiscardPile.indexOf(card);
onscreenConsole.log(`You have chosen to KO <span class="console-highlights">${card.name}</span> from your discard pile in order to recruit a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`);
    if (index !== -1) {
        playerDiscardPile.splice(index, 1);
    }
    koPile.push(card);
    console.log("KO Pile", koPile);

    moveShieldOfficerToHand();

context.innerHTML = `Do you wish to KO a card from your Discard Pile or Hand to rescue a Bystander?`;



    document.getElementById("card-ko-popup").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";

    updateGameBoard();
}

function koHandCard(card) {
    const index = playerHand.indexOf(card);
onscreenConsole.log(`You have chosen to KO <span class="console-highlights">${card.name}</span> from your hand in order to recruit a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`);
    if (index !== -1) {
        playerHand.splice(index, 1);
    }
    koPile.push(card);
    console.log("KO Pile", koPile);

    moveShieldOfficerToHand();

context.innerHTML = `Do you wish to KO a card from your Discard Pile or Hand to rescue a Bystander?`;




    document.getElementById("card-ko-popup").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";

    updateGameBoard();
}

function moveShieldOfficerToHand() {
    if (shieldOfficers.length > 0) {
        const shieldOfficer = shieldOfficers.pop();
        playerHand.push(shieldOfficer);
extraCardsDrawnThisTurn++;
        console.log("Shield Officer recruited and added to hand.");
    } else {
        console.log("No Shield Officers left to recruit.");
onscreenConsole.log('There are no <span class="console-highlights">S.H.I.E.L.D. Officers</span> left to recruit.');
    }
}



function RogueKOHandOrDiscardForRecruit() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower ability activated.`);

    return new Promise((resolve) => {
  
        const discardPileList = document.getElementById("discard-pile-cards");
        const handList = document.getElementById("hand-cards");

const hoverText = document.getElementById("card-ko-card-popupHoverText");
const KOImage = document.getElementById("card-ko-popup-image");

const context = document.getElementById("card-ko-popup-h2");

context.innerHTML = `Do you wish to KO a card from your discard pile or hand to gain +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">?`;




        discardPileList.innerHTML = "";
        handList.innerHTML = "";

        // Function to handle KO'ing a card
        const handleKO = (card, pile, source) => {
            console.log(`KO'ing card from ${source}:`, card);
            const index = pile.indexOf(card);
            if (index !== -1) {
                pile.splice(index, 1);
            }
            koPile.push(card);
            totalRecruitPoints += 1;
            cumulativeRecruitPoints += 1;

            document.getElementById("card-ko-popup").style.display = "none";
            document.getElementById("modal-overlay").style.display = "none";
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd from your ${source}. +1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
            updateGameBoard(); // Ensure the board is updated

            console.log("KO'd card:", card);
            resolve();
        };

        playerDiscardPile.forEach((card) => {
            const li = document.createElement("li");
            li.textContent = card.name;
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        KOImage.src = card.image;  // Dynamically change the image source
        KOImage.style.display = 'block';  // Ensure the image is visible
hoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        KOImage.src = '';  // Clear the image source
        KOImage.style.display = 'none';  // Hide the image
hoverText.style.display = 'block';
    };
            li.onclick = () => handleKO(card, playerDiscardPile, 'discard pile');
            discardPileList.appendChild(li);
        });

        playerHand.forEach((card) => {
            const li = document.createElement("li");
            li.textContent = card.name;
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        KOImage.src = card.image;  // Dynamically change the image source
        KOImage.style.display = 'block';  // Ensure the image is visible
hoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        KOImage.src = '';  // Clear the image source
        KOImage.style.display = 'none';  // Hide the image
hoverText.style.display = 'block';
    };
            li.onclick = () => handleKO(card, playerHand, 'hand');
            handList.appendChild(li);
        });

        console.log("Showing KO selection popup");
        document.getElementById("card-ko-popup").style.display = "block";
        document.getElementById("modal-overlay").style.display = "block";
    });
}



function RogueCopyPowers(currentPlayer) {
    return new Promise((resolve) => {
        // Check if any cards have been played this turn
        if (cardsPlayedThisTurn.length === 1) {
            console.log("No heroes have been played yet.");
            onscreenConsole.log("No Heroes have been played this turn. There are no powers to copy.");
            resolve();
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const cardsList = document.getElementById('cards-to-choose-from');
        const heroesToCopy = cardsPlayedThisTurn.slice(0, -1); // Exclude the last card played
        const noThanks = document.getElementById('close-choice-button');

        noThanks.style.display = 'block';

        const context = document.getElementById('context');
        context.innerHTML = `Choose a card to copy.`;

        // Clear previous list
        cardsList.innerHTML = '';

        // Populate the list with cards the player has played
        heroesToCopy.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;

            const heroImage = document.getElementById('hero-one-location-image');
            const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

            // On mouseover, change the hero image to the selected card's image
            li.onmouseover = () => {
                heroImage.src = card.image;  // Dynamically change the image source
                heroImage.style.display = 'block';  // Ensure the image is visible
                oneChoiceHoverText.style.display = 'none';
            };

            // On mouseout, reset the image to its default state (or hide it)
            li.onmouseout = () => {
                heroImage.src = '';  // Clear the image source
                heroImage.style.display = 'none';  // Hide the image
                oneChoiceHoverText.style.display = 'block';
            };

            li.onclick = () => {
                const rogueCardIndex = cardsPlayedThisTurn.findIndex(c => c.name === 'Rogue - Copy Powers' && !c.isCopied);
                const rogueCard = cardsPlayedThisTurn[rogueCardIndex];

                // Mark Rogue as copied
                rogueCard.isCopied = true;

                // Store original attributes
                rogueCard.originalAttributes = {
                    name: rogueCard.name,
                    type: rogueCard.type,
                    rarity: rogueCard.rarity,
                    team: rogueCard.team,
                    class1: rogueCard.class1,
                    class2: rogueCard.class2,
                    color: rogueCard.color,
                    cost: rogueCard.cost,
                    attack: rogueCard.attack,
                    recruit: rogueCard.recruit,
                    bonusAttack: rogueCard.bonusAttack,
                    bonusRecruit: rogueCard.bonusRecruit,
                    multiplier: rogueCard.multiplier,
                    multiplierAttribute: rogueCard.multiplierAttribute,
                    mulitplierLocation: rogueCard.mulitplierLocation,
                    unconditionalAbility: rogueCard.unconditionalAbility,
                    conditionalAbility: rogueCard.conditionalAbility,
                    conditionType: rogueCard.conditionType,
                    condition: rogueCard.condition,
                    invulnerability: rogueCard.invulnerability,
                    image: rogueCard.image
                };

                // Modify Rogue's attributes to match the selected card, while keeping its covert attribute
                rogueCard.name = card.name || "None";
                rogueCard.type = card.type || "None";
                rogueCard.rarity = card.rarity || "None";
                rogueCard.team = card.team || "None";
                rogueCard.class1 = 'Covert' || "None";
                rogueCard.class2 = card.class2 || "None";
                rogueCard.color = card.color || "None";
                rogueCard.cost = card.cost || 0;
                rogueCard.attack = card.attack || 0;
                rogueCard.recruit = card.recruit || 0;
                rogueCard.bonusAttack = card.bonusAttack || 0;
                rogueCard.bonusRecruit = card.bonusRecruit || 0;
                rogueCard.multiplier = card.multiplier || "None";
                rogueCard.multiplierAttribute = card.multiplierAttribute || "None";
                rogueCard.mulitplierLocation = card.mulitplierLocation || "None";
                rogueCard.unconditionalAbility = card.unconditionalAbility || "None";
                rogueCard.conditionalAbility = card.conditionalAbility || "None";
                rogueCard.conditionType = card.conditionType || "None";
                rogueCard.condition = card.condition || "None";
                rogueCard.invulnerability = card.invulnerability || "None";
                rogueCard.image = card.image || "None";

                console.log(`You chose to copy: ${card.name}. You have gained ${rogueCard.attack} attack and ${rogueCard.recruit} recruit points.`);
                onscreenConsole.log(`You chose to copy <span class="console-highlights">${card.name}</span>. You have gained +${rogueCard.attack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and +${rogueCard.recruit} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);

                // Simulate attack and recruit points
                totalAttackPoints += rogueCard.attack;
                totalRecruitPoints += rogueCard.recruit;
                cumulativeAttackPoints += rogueCard.attack;
                cumulativeRecruitPoints += rogueCard.recruit;

                // Handle unconditional ability immediately
                if (rogueCard.unconditionalAbility && rogueCard.unconditionalAbility !== "None") {
                    const abilityFunction = window[rogueCard.unconditionalAbility];
                    if (typeof abilityFunction === 'function') {
                        abilityFunction(currentPlayer, rogueCard);
                        console.log(`Unconditional ability triggered: ${rogueCard.unconditionalAbility}`);
                    } else {
                        console.error(`Unconditional ability function ${rogueCard.unconditionalAbility} not found`);
                    }
                }

                // Resolve the promise here, allowing confirmActions to handle conditional abilities
                resolve();

                // Hide the popup
                popup.style.display = 'none';
                document.getElementById("modal-overlay").style.display = "none";
                noThanks.style.display = 'none';
            };
            cardsList.appendChild(li);
        });

        console.log("Showing copy selection popup");
        popup.style.display = 'block';
        document.getElementById("modal-overlay").style.display = "block";
    });
}




function StormMinus2ToRooftops() {
city3TempBuff--;
city3TempBuff--;
onscreenConsole.log(`Any Villain you fight on the Rooftops this turn gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
updateGameBoard();
}

function StormMinus2ToBridge() {
city1TempBuff--;
city1TempBuff--;
console.log('Any villain on the bridge loses 2 Attack this turn.')
onscreenConsole.log(`Any Villain you fight on the Bridge this turn gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

updateGameBoard();
}

function StormMinus2ToMastermind() {
mastermindTempBuff--;
mastermindTempBuff--;
console.log('The Mastermind loses 2 Attack this turn.')
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower ability activated. The Mastermind gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> this turn.`);
updateGameBoard();
}

function StormMoveVillain() {
    // Elements for the popup and overlay
    const popup = document.getElementById('villain-movement-popup');
    const overlay = document.getElementById('modal-overlay');
    const closeButton = popup.querySelector('.close-btn');
    const noThanksButton = document.getElementById('no-thanks-villain-movement');
    const confirmButton = document.getElementById('confirm-villain-movement');
    const selectionArrow = document.getElementById('selection-arrow');
confirmButton.disabled = true; // Disable the confirm button


    // Elements representing the rows in the table
    const villainCells = {
        bridge: document.getElementById('villain-bridge'),
        streets: document.getElementById('villain-streets'),
        rooftops: document.getElementById('villain-rooftops'),
        bank: document.getElementById('villain-bank'),
        sewers: document.getElementById('villain-sewers')
    };
let selectedCells = []; // To store the selected cells

function selectCell(cellElement) {
    const cellText = cellElement.textContent.trim();

    // The cell is considered to have a villain if it's not empty
    const hasVillain = cellText !== "Empty";

    // 0. If the player selects an Empty cell first, nothing happens.
    if (!hasVillain && selectedCells.length === 0) {
        console.log("Empty cell selected first, no action.");
        return; // Do nothing if the first selected cell is empty
    }

    // If the selected cell is already in selectedCells, deselect it and remove from the array
    if (selectedCells.includes(cellElement)) {
        cellElement.classList.remove('selected');
        selectedCells = selectedCells.filter(cell => cell !== cellElement);

        // Check if we need to hide the arrow after deselection
        if (selectedCells.length < 2) {
            selectionArrow.style.display = 'none';
            confirmButton.disabled = true; // Disable the confirm button
            console.log("Deselected cell, less than two selections, disabling confirm button.");
        }
        return; // Exit early since we're just deselecting
    }

    // 1. If the player selects a villain, highlight it and add to selectedCells.
    if (hasVillain && selectedCells.length === 0) {
        cellElement.classList.add('selected');
        selectedCells.push(cellElement);
        console.log("First villain selected, added to selection.");
    }
    // 2a. If the player then selects a second villain, highlight it and add to selectedCells.
    else if (hasVillain && selectedCells.length === 1) {
        cellElement.classList.add('selected');
        selectedCells.push(cellElement);
        console.log("Second villain selected, added to selection.");
    }
    // 2b. If the player selects an Empty space after selecting a villain, highlight it and add to selectedCells.
    else if (!hasVillain && selectedCells.length === 1 && selectedCells[0].textContent.trim() !== "Empty") {
        cellElement.classList.add('selected');
        selectedCells.push(cellElement);
        console.log("Empty space selected after villain, added to selection.");
    }

    // 3a. If the player selects another cell (villain or empty), deselect the first choice and highlight the new one.
    if (selectedCells.length > 2) {
        const firstCell = selectedCells.shift(); // Remove the first selected cell
        firstCell.classList.remove('selected'); // Remove the highlight from the first cell
        console.log("More than two selections, deselected the first.");
    }

    // 3b. If the player selects another villain after an empty, deselect everything and highlight the new villain.
    if (selectedCells.length === 2 && selectedCells[0].textContent.trim() === "Empty") {
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        selectedCells = [cellElement];
        cellElement.classList.add('selected');
        console.log("Selected another villain after an empty, reset selections.");
    }

    // Handle drawing the arrow based on the current selection
    if (selectedCells.length === 2) {
        drawArrow(selectedCells[0], selectedCells[1]);

        // Enable the confirm button if valid combination is selected
        if (
            (selectedCells[0].textContent.trim() !== "Empty" && selectedCells[1].textContent.trim() === "Empty") ||
            (selectedCells[0].textContent.trim() !== "Empty" && selectedCells[1].textContent.trim() !== "Empty")
        ) {
            confirmButton.disabled = false; // Enable the confirm button
            console.log("Valid selection made, enabling confirm button.");
        } else {
            confirmButton.disabled = true; // Disable the confirm button if not valid
            console.log("Invalid selection, disabling confirm button.");
        }
    } else {
        selectionArrow.style.display = 'none';
        confirmButton.disabled = true; // Disable the confirm button
        console.log("Less than two selections, disabling confirm button.");
    }
}



    function updateCityCellsInPopup() {
    for (let i = 0; i < city.length; i++) {
        const cityCellKey = Object.keys(villainCells)[i];
        const cityCellElement = villainCells[cityCellKey];
        cityCellElement.innerHTML = ''; // Clear existing content

if (city[i]) {
    // Create an img element for the villain
    const cardImage = document.createElement('img');
    
    // Set the src to the image path
    cardImage.src = city[i].image; // Assuming city[i].image holds the path to the image
    
    // Add the class to the img element
    cardImage.classList.add('villain-movement-card-image');
    
    // Append the image to the city cell element
    cityCellElement.appendChild(cardImage);

    // Add the bystander overlay if there are bystanders
    if (city[i].bystander && city[i].bystander.length > 0) {
        const bystanderOverlay = document.createElement('div');
        bystanderOverlay.className = 'bystander-overlay';
        bystanderOverlay.innerText = `${city[i].bystander.length} Bystander${city[i].bystander.length > 1 ? 's' : ''}`;
        cityCellElement.appendChild(bystanderOverlay);
    }

     if (city[i].name === 'Killbot') {
        city[i].overlayTextAttack = `${killbotAttack}`;
    }

    
    // Check if the villain has an overlayTextAttack
    if (city[i].overlayTextAttack) {
        const villainOverlayAttack = document.createElement('div');
        villainOverlayAttack.className = 'attack-overlay';
        villainOverlayAttack.innerHTML = city[i].overlayTextAttack;
        cityCellElement.appendChild(villainOverlayAttack);
    }


    // Add the Skrull overlay if the villain has an overlayText
    if (city[i].overlayText) {
        const skrullOverlay = document.createElement('div');
        skrullOverlay.className = 'skrull-overlay';
        skrullOverlay.innerText = city[i].overlayText;
        cityCellElement.appendChild(skrullOverlay);
    }
} else {
    // If no villain, add a blank card image
    const blankCardImage = document.createElement('img');
    
    // Set the src to the blank card image
    blankCardImage.src = 'Visual Assets/BlankCardSpace.png';
    
    // Add a class to style the blank card image
    blankCardImage.classList.add('villain-movement-card-image');
    
    // Append the blank card image to the city cell element
    cityCellElement.appendChild(blankCardImage);
}

        // Add the temp buff overlay if there is a buff
        const tempBuffVariableName = `city${i + 1}TempBuff`; // Construct the variable name (e.g., "city1TempBuff")
        const currentTempBuff = window[tempBuffVariableName]; // Access the variable using window
        if (currentTempBuff !== 0) {
            const tempBuffOverlay = document.createElement('div');
            tempBuffOverlay.className = 'temp-buff-overlay-villain-move';
            tempBuffOverlay.innerHTML = `<p>${currentTempBuff} Attack</p>`;
            cityCellElement.appendChild(tempBuffOverlay);
        }

      // Add the perm buff overlay if there is a buff
        const permBuffVariableName = `city${i + 1}PermBuff`; // Construct the variable name (e.g., "city1PermBuff")
        const currentPermBuff = window[permBuffVariableName]; // Access the variable using window
        if (currentPermBuff !== 0) {
            const permBuffOverlay = document.createElement('div');
            permBuffOverlay.className = 'perm-buff-overlay-villain-move';
            permBuffOverlay.innerHTML = `<p>${currentPermBuff} Attack</p>`;
            cityCellElement.appendChild(permBuffOverlay);
        }


        // Add click event listener to each cell for selection
        cityCellElement.onclick = () => selectCell(cityCellElement);
        
        // Ensure the cell has the correct class
        cityCellElement.classList.add('city-cell');
    }
}

// Update city cells with the current game state in the popup
updateCityCellsInPopup();

    // Function to hide the popup and overlay
    function hidePopup() {
selectedCells.forEach(cell => cell.classList.remove('selected'));
        selectedCells = [];
        popup.style.display = 'none';
        overlay.style.display = 'none';
        selectionArrow.style.display = 'none'; // Hide the arrow when the popup is closed
    }

function drawArrow(cell1, cell2) {
    // Get the bounding box of the popup
    const popupRect = document.getElementById('villain-movement-popup').getBoundingClientRect();

    // Get the bounding box of the selected cells
    const rect1 = cell1.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();

    // Calculate the bottom center position of each cell relative to the popup
    const posn1 = {
        x: rect1.left - popupRect.left + rect1.width / 2,
        y: rect1.bottom - popupRect.top // Bottom of the cell
    };
    const posn2 = {
        x: rect2.left - popupRect.left + rect2.width / 2,
        y: rect2.bottom - popupRect.top // Bottom of the cell
    };

    console.log('Calculated Position 1:', posn1);
    console.log('Calculated Position 2:', posn2);

    // Calculate control points for a curve that goes under the cells
    const controlX = (posn1.x + posn2.x) / 2;
    const controlY = Math.max(posn1.y, posn2.y) + 30; // Adjust the +50 value for more or less curve

    // Create the curved path
    const dStr =
        `M${posn1.x},${posn1.y} ` +
        `C${controlX},${controlY} ${controlX},${controlY} ${posn2.x},${posn2.y}`;

    console.log('Path Data:', dStr);

    const selectionArrow = document.getElementById('selection-arrow');
    selectionArrow.setAttribute("d", dStr);
    selectionArrow.style.display = 'block';
}

    // Show the popup and overlay
    popup.style.display = 'block';
    overlay.style.display = 'block';

    // Attach event listeners to close elements
    closeButton.addEventListener('click', hidePopup);
    noThanksButton.addEventListener('click', hidePopup);
    
confirmButton.addEventListener('click', () => {
    if (selectedCells.length === 2) {
        const firstCell = selectedCells[0];
        const secondCell = selectedCells[1];

        // Find the index of the first and second cells in the city array
        const firstIndex = Object.values(villainCells).indexOf(firstCell);
        const secondIndex = Object.values(villainCells).indexOf(secondCell);

        if (firstIndex === -1 || secondIndex === -1) {
            console.error("Could not find the index of the selected cells.");
            return;
        }

        // Debugging: Log the initial state before any operation
        console.log("Initial State:");
        console.log("First Cell:", city[firstIndex]);
        console.log("Second Cell:", city[secondIndex]);

let bystanderText = "Bystander";

// Rescue bystanders if any are attached to the first villain
if (city[firstIndex] && city[firstIndex].bystander && city[firstIndex].bystander.length > 0) {
    // Update the bystander text based on how many there are
    bystanderText = city[firstIndex].bystander.length > 1 ? "Bystanders" : "Bystander";
    
    // Add bystanders to the player's victory pile
    victoryPile.push(...city[firstIndex].bystander);
    onscreenConsole.log(`${city[firstIndex].bystander.length} ${bystanderText} added to Victory Pile.`);
    
    // Clear bystanders from the villain
    city[firstIndex].bystander = null;

    // Recalculate the villain's attack value after removing bystanders
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);
    city[firstIndex].attack = recalculateVillainAttack(city[firstIndex], selectedScheme);
}

// Check if the second cell contains the blank card image (i.e., it's empty)
const secondCellImage = secondCell.querySelector('img'); // Find the image element in the second cell
if (secondCellImage && secondCellImage.src.includes('BlankCardSpace.png')) {
    // Move the villain to the empty cell
    console.log("Moving villain to empty space");
    onscreenConsole.log(`<span class="console-highlights">${city[firstIndex].name}</span> moved to empty space.`);
    
    city[secondIndex] = city[firstIndex]; // Move the villain to the new space
    city[firstIndex] = null; // Clear the original space

} else if (city[secondIndex] && city[firstIndex]) {
    // Both cells have villains, perform the swap
    console.log("Swapping villains");
    console.log("Before Swap:", city[firstIndex], city[secondIndex]);
    onscreenConsole.log(`<span class="console-highlights">${city[firstIndex].name}</span> swapped places with <span class="console-highlights">${city[secondIndex].name}</span>.`);

    // Perform the swap
    const temp = city[secondIndex];
    city[secondIndex] = city[firstIndex];
    city[firstIndex] = temp;

    console.log("After Swap:", city[firstIndex], city[secondIndex]);

} else {
    console.error("Cannot swap cells: one of the cells is empty.");
    return;
}

// Clear selections and update the game board
selectedCells.forEach(cell => cell.classList.remove('selected'));
selectedCells = [];
selectionArrow.style.display = 'none'; // Hide the arrow
confirmButton.disabled = true; // Disable the confirm button
popup.style.display = 'none';
overlay.style.display = 'none';
updateGameBoard(); // Update the actual game board with the new state

// Debugging: Log the final state after the operation
console.log("Final State:");
console.log("First Cell:", city[firstIndex]);
console.log("Second Cell:", city[secondIndex]);
    }
});

}

function ThorRecruitPointsCanAttack() {
const recruitLabel = document.getElementById('recruit-point-label')
recruitLabel.innerHTML = "RECRUIT OR ATTACK: ";
recruitUsedToAttack = true;
onscreenConsole.log(`<span class="console-highlights">Thor - God of Thunder's</span> Superpower ability activated. You can use <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> as <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> this turn.`);
}

function add1Recruit() {

            totalRecruitPoints += 1;
            cumulativeRecruitPoints += 1;
onscreenConsole.log('+1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.');
updateGameBoard();
}

function SentinelKOHeroYouHave() {
  return new Promise((resolve, reject) => {
        // Combine heroes from the player's hand and cards played this turn
        const combinedCards = [...playerHand, ...cardsPlayedThisTurn].filter(card => card.type === 'Hero');
        
        // Check if there are any heroes in the combined list
        if (combinedCards.length === 0) {
            console.log('No heroes in hand or played to KO.');
onscreenConsole.log(`<span class="console-highlights">Sentinel's</span> Fight effect negated. No Heroes available to KO.`);
            resolve(); // Resolve immediately if there are no heroes to KO
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');

        // Clear previous list
        cardsList.innerHTML = '';

        // Change the <h2> text (assuming it's the first <h2> in the popup)
        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'FIGHT EFFECT!';

        // Set instructions for the player
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select a hero to KO.';

        // Function to handle the card selection
        function handleCardClick(card, cardIndex, isFromHand) {
            console.log(`${card.name} has been KO'd.`);
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            // Remove the card from the correct array (hand or played)
            if (isFromHand) {
                playerHand.splice(cardIndex, 1);
            } else {
                cardsPlayedThisTurn.splice(cardIndex - playerHand.length, 1); // Adjust index for played cards
            }
            // Add the card to the KO pile
            koPile.push(card);
            // Hide the popup after selection
            closePopup();
            // Update the game board
            updateGameBoard();
            resolve(); // Resolve the promise after the card is KO'd
        }

        function closePopup() {
            // Reset popup elements to default state
            popupTitle.textContent = 'Hero Ability!'; // Replace with the default title
            instructionsDiv.textContent = 'Context'; // Replace with the default instructions

            // Hide the popup
            popup.style.display = 'none';
            document.getElementById("modal-overlay").style.display = "none";
        }

        // Populate the list with the heroes from the player's hand and played cards
        combinedCards.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            const isFromHand = index < playerHand.length; // Determine if the card is from the hand
            li.onclick = () => handleCardClick(card, index, isFromHand);
            cardsList.appendChild(li);
        });

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

function FightKOHeroYouHave() {
onscreenConsole.log(`Fight! KO one of your Heroes.`);
  return new Promise((resolve, reject) => {
        // Combine heroes from the player's hand and cards played this turn
        const combinedCards = [...playerHand, ...cardsPlayedThisTurn];
        
        // Check if there are any heroes in the combined list
        if (combinedCards.length === 0) {
            onscreenConsole.log(`No Heroes available to KO.`);
            resolve(); // Resolve immediately if there are no heroes to KO
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');

        // Clear previous list
        cardsList.innerHTML = '';

        // Change the <h2> text (assuming it's the first <h2> in the popup)
        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'FIGHT EFFECT!';

        // Set instructions for the player
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select a Hero to KO.';

        // Function to handle the card selection
        function handleCardClick(card, cardIndex, isFromHand) {
            
onscreenConsole.log(`<span style="font-weight:600;">${card.name}</span> has been KO'd.`);
            // Remove the card from the correct array (hand or played)
            if (isFromHand) {
                playerHand.splice(cardIndex, 1);
            } else {
                cardsPlayedThisTurn.splice(cardIndex - playerHand.length, 1); // Adjust index for played cards
            }
            // Add the card to the KO pile
            koPile.push(card);
            // Hide the popup after selection
            closePopup();
            // Update the game board
            updateGameBoard();
            resolve(); // Resolve the promise after the card is KO'd
        }

        function closePopup() {
            // Reset popup elements to default state
            popupTitle.textContent = 'Hero Ability!'; // Replace with the default title
            instructionsDiv.textContent = 'Context'; // Replace with the default instructions

            // Hide the popup
            popup.style.display = 'none';
            document.getElementById("modal-overlay").style.display = "none";
        }

        // Populate the list with the heroes from the player's hand and played cards
        combinedCards.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            const isFromHand = index < playerHand.length; // Determine if the card is from the hand
            li.onclick = () => handleCardClick(card, index, isFromHand);
            cardsList.appendChild(li);
        });

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}


function addToNextDraw1() {
nextTurnsDraw++;
onscreenConsole.log("An extra card will be drawn next turn.");
}

function addToNextDraw2() {
nextTurnsDraw++;
nextTurnsDraw++;
onscreenConsole.log("Two extra cards will be drawn next turn.");
}

function addToNextDraw3() {
nextTurnsDraw++;
nextTurnsDraw++;
nextTurnsDraw++;
onscreenConsole.log("Three extra cards will be drawn next turn.");
}

function DrOctopusNextDraw2() {
    if (secondDocOc === true) {  // Renamed variable
        onscreenConsole.log("You've already defeated <span class=\"console-highlights\">Doctor Octopus</span> this turn. You will still draw eight cards instead of six next turn.");
        return;
    }

    nextTurnsDraw += 2;  // Adding two cards to next turn's draw
    onscreenConsole.log("Fight! At the end of your next turn, you will draw eight cards instead of six.");

    secondDocOc = true;  // Set the flag to true after first defeat
}


function topTwoCardsKOChoice() {
  return new Promise((resolve) => {
    
    let holdingArray = [];

    // We need to draw two cards in total, so we loop up to 2 times
    for (let i = 0; i < 2; i++) {
      // Step 1: Check if the deck is empty and needs reshuffling
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          // Reshuffle the discard pile into the deck
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
        } else {
          // If both the deck and discard are empty, stop and log it, then return
          console.log("No cards left in deck or discard pile.");
          onscreenConsole.log(`<span class="console-highlights">Doombot Legion</span> Fight effect negated. No cards available to look at or KO.`);
          return; // Exit immediately to prevent further code execution
        }
      }

      // Step 2: Draw a card if available
      const topCardPlayerDeck = playerDeck.pop();
      if (topCardPlayerDeck) {
        holdingArray.push(topCardPlayerDeck);
      }
    }

    // If fewer than two cards were available (from deck or discard pile)
    if (holdingArray.length < 2) {
      // If only one card was drawn, we automatically KO it and log it
      if (holdingArray.length === 1) {
        const singleCard = holdingArray[0];
        koPile.push(singleCard);
        console.log(`Only 1 card available to view. ${singleCard.name} has been KO'd.`);
        onscreenConsole.log(`<span class="console-highlights">Doombot Legion</span> Fight effect carried out: Only 1 card was available to look at. <span class="console-highlights">${singleCard.name}</span> has been automatically KO'd.`);
        updateGameBoard();
        resolve();
      } else {
        // If no cards were drawn, we log it and resolve
                resolve();
      }
      return;
    }

    // Step 3: Show the popup with the two drawn cards if two cards are available
    const topCardPlayerDeck = holdingArray[0];
    const secondTopCardPlayerDeck = holdingArray[1];

    console.log(`You revealed the top two cards of your deck: ${topCardPlayerDeck.name} and ${secondTopCardPlayerDeck.name}.`);

    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      'You revealed the top two cards of your deck. KO one and put back the other. Which do you wish to KO?',
      topCardPlayerDeck.name,
      secondTopCardPlayerDeck.name
    );

    // Get the elements for the hero image and text
    const heroImage = document.getElementById('hero-ability-may-card');
    const heroAbilityHoverText = document.getElementById('heroAbilityHoverText');
       
const popupTitle = document.getElementById('hero-ability-may-h2');
       popupTitle.textContent = 'FIGHT EFFECT!';

    // Handle mouseover for confirm button (top card)
    confirmButton.onmouseover = () => {
      heroImage.src = topCardPlayerDeck.image;  // Change the image to the top card's image
      heroImage.style.display = 'block';        // Ensure the image is visible
      heroAbilityHoverText.style.display = 'none';  // Hide the hover text
    };

    // Reset image when the mouse is no longer over the confirm button
    confirmButton.onmouseout = () => {
      heroImage.src = '';  // Clear the image
      heroImage.style.display = 'none';  // Hide the image
      heroAbilityHoverText.style.display = 'block';  // Show the hover text again
    };

    // Handle mouseover for deny button (second card)
    denyButton.onmouseover = () => {
      heroImage.src = secondTopCardPlayerDeck.image;  // Change the image to the second card's image
      heroImage.style.display = 'block';        // Ensure the image is visible
      heroAbilityHoverText.style.display = 'none';  // Hide the hover text
    };

    // Reset image when the mouse is no longer over the deny button
    denyButton.onmouseout = () => {
      heroImage.src = '';  // Clear the image
      heroImage.style.display = 'none';  // Hide the image
      heroAbilityHoverText.style.display = 'block';  // Show the hover text again
    };

    // Step 4: Handle the KO decision
    confirmButton.onclick = function() {
      koPile.push(topCardPlayerDeck);
      playerDeck.push(secondTopCardPlayerDeck);
      console.log(`As per <span class="console-highlights">Doombot Legion's</span> Fight effect, you KO’d <span class="console-highlights">${topCardPlayerDeck.name}</span>. You have returned <span class="console-highlights">${secondTopCardPlayerDeck.name}</span> to the top of your deck.`);
      onscreenConsole.log(`As per <span class="console-highlights">Doombot Legion's</span> Fight effect, you KO’d <span class="console-highlights">${topCardPlayerDeck.name}</span>. You have returned <span class="console-highlights">${secondTopCardPlayerDeck.name}</span> to the top of your deck.`);
      updateGameBoard();
      hideHeroAbilityMayPopup();
popupTitle.textContent = 'HERO ABILITY!';
      resolve();
    };

    denyButton.onclick = function() {
      koPile.push(secondTopCardPlayerDeck);
      playerDeck.push(topCardPlayerDeck);
      console.log(`You KO’d ${secondTopCardPlayerDeck.name}. ${topCardPlayerDeck.name} has been returned to the top of your deck.`);
      onscreenConsole.log(`As per <span class="console-highlights">Doombot Legion's</span> Fight effect, you KO’d <span class="console-highlights">${secondTopCardPlayerDeck.name}</span>. You have returned <span class="console-highlights">${topCardPlayerDeck.name}</span> to the top of your deck.`);
      updateGameBoard();
      hideHeroAbilityMayPopup();
popupTitle.textContent = 'HERO ABILITY!';
      resolve();
    };
  });
}





function doomStrike() {
    return new Promise((resolve, reject) => {
        // Check if the player has exactly 6 cards in their hand
        if (playerHand.length !== 6) {
            console.log('Player does not have exactly 6 cards in hand. No action required.');
onscreenConsole.log('You do not have exactly 6 cards in your hand. Master Strike avoided!');
            resolve(); // Resolve immediately since no action is required
            return;
        }

        // Check if the player has a "Tech" card in hand or cards played this turn
        const hasTech = playerHand.some(card => card.class1 === 'Tech') || 
                        cardsPlayedThisTurn.some(card => card.class1 === 'Tech');

        if (hasTech) {
            console.log('Player has a Tech card. No action required.');
onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped Dr. Doom's Master Strike!`);
            resolve(); // Resolve immediately since no action is required
            return;
        }

        console.log('No Tech card found. Player must return 2 cards to the top of their deck.');
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`);

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const returnButton = document.getElementById('close-choice-button');
        returnButton.textContent = 'Return to Deck';
        returnButton.disabled = true; // Initially disabled

        // Change the <h2> text (assuming it's the first <h2> in the popup)
        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'Master Strike';

        // Clear previous list and instructions
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select two cards to return to the top of your deck in the desired order.';
        
        // Array to store the selected cards' IDs
        let selectedCards = [];

        function updateReturnButton() {
            // Enable and display the return button only if 2 cards are selected
            if (selectedCards.length === 2) {
                returnButton.disabled = false;
                returnButton.style.display = 'inline-block'; // Show the button
            } else {
                returnButton.disabled = true;
                returnButton.style.display = 'none'; // Hide the button if less than 2 cards are selected
            }
        }

        // Function to handle card selection
        function toggleCardSelection(card, cardIndex, listItem) {
            const cardId = cardIndex; // Use the cardIndex as a unique identifier

            if (selectedCards.includes(cardId)) {
                // Remove the card ID from the selection if it is already selected
                selectedCards = selectedCards.filter(id => id !== cardId);
                listItem.classList.remove('selected');
            } else {
                if (selectedCards.length >= 2) {
                    // If two cards are already selected, remove the oldest one
                    const firstSelectedId = selectedCards.shift();
                    // Find the list item by its unique id and unhighlight it
                    const listItemToRemove = document.querySelector(`[data-card-id="${firstSelectedId}"]`);
                    if (listItemToRemove) {
                        listItemToRemove.classList.remove('selected');
                    }
                }
                // Add the newly selected card's ID
                selectedCards.push(cardId);
                listItem.classList.add('selected');
            }

            updateReturnButton();
            updateInstructions();
            console.log('Selected cards for return:', selectedCards);
        }

        // Function to update instructions with the order of return
        function updateInstructions() {
            if (selectedCards.length === 0) {
                instructionsDiv.textContent = 'Select 2 cards to return to the top of your deck in the desired order.';
            } else if (selectedCards.length === 1) {
                const firstCard = playerHand[selectedCards[0]]; // Get the first selected card object
                instructionsDiv.textContent = `Selected: ${firstCard.name} (First to return)`;
            } else if (selectedCards.length === 2) {
                const firstCard = playerHand[selectedCards[0]]; // Get the first selected card object
                const secondCard = playerHand[selectedCards[1]]; // Get the second selected card object
                instructionsDiv.textContent = `Selected: ${firstCard.name} (First to return), ${secondCard.name} (Second to return)`;
            }
        }

        // Populate the list with the heroes in the player's hand
        playerHand.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', index); // Assign a unique id based on index

const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle the return action
        returnButton.onclick = () => {
            // Create a temporary array to store the selected card objects
            const selectedCardObjects = selectedCards.map(cardId => playerHand[cardId]);
onscreenConsole.log(`You have returned <span class="console-highlights">${selectedCardObjects[0].name}</span> and then <span class="console-highlights">${selectedCardObjects[1].name}</span> to the top of your deck.`);

            // Remove selected cards from the playerHand and add them to the top of the deck
            selectedCardObjects.reverse().forEach(card => {
                const cardIndex = playerHand.indexOf(card);
                if (cardIndex !== -1) {
                    playerHand.splice(cardIndex, 1); // Remove from hand
                    playerDeck.unshift(card); // Add to top of deck
                }
            });

            console.log(`Cards returned to top of deck: ${selectedCardObjects.map(card => card.name).join(', ')}`);


            // Hide the popup and update the game board
            closePopup();
            updateGameBoard();
            resolve(); // Resolve the promise after the action is complete
        };

        function closePopup() {
            // Reset popup elements to default state
            popupTitle.textContent = 'Hero Ability!'; // Replace with the default title
            instructionsDiv.textContent = 'Context'; // Replace with the default instructions
            returnButton.textContent = 'No Thanks!';
            returnButton.style.display = 'none';

            // Hide the popup
            popup.style.display = 'none';
            document.getElementById("modal-overlay").style.display = "none";
        }

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

function magnetoStrike() {
    return new Promise((resolve, reject) => {
        // Check if the player has an X-Men card in hand or played this turn
        const hasXMen = playerHand.some(card => card.team === 'X-Men') || 
                        cardsPlayedThisTurn.some(card => card.team === 'X-Men');

        if (hasXMen) {
            console.log('Player has an X-Men card. No action required.');
onscreenConsole.log(`You are able to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have avoided Magneto's Master Strike!`);
            resolve(); // Resolve immediately if no action is required
            return;
        }

        console.log('No X-Men card found. Player must discard until 4 cards remain.');
onscreenConsole.log(`You are unable to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`);

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const discardButton = document.getElementById('close-choice-button');
        discardButton.textContent = 'DISCARD SELECTED CARDS';
        discardButton.disabled = true; // Initially disabled
        discardButton.style.display = 'none'; // Initially hidden

        // Change the <h2> text (assuming it's the first <h2> in the popup)
        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'Master Strike';

        // Clear previous list and instructions
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select cards to discard until you have 4 cards remaining.';

        // Array to store the selected cards for discarding (using their indices)
        let selectedCards = [];

        function updateDiscardButton() {
            // Show and enable the discard button only if enough cards are selected to leave 4 remaining
            if (selectedCards.length === (playerHand.length - 4)) {
                discardButton.disabled = false;
                discardButton.style.display = 'inline-block'; // Show the button
            } else {
                discardButton.disabled = true;
                discardButton.style.display = 'none'; // Hide the button if not enough cards are selected
            }
        }

        // Function to handle card selection
        function toggleCardSelection(card, cardIndex, listItem) {
            if (selectedCards.includes(cardIndex)) {
                // Remove card from selection
                selectedCards = selectedCards.filter(index => index !== cardIndex);
                listItem.classList.remove('selected');
            } else {
                // FIFO: Remove the oldest selection if more than needed are selected
                if (selectedCards.length >= (playerHand.length - 4)) {
                    const firstSelectedIndex = selectedCards.shift();
                    const firstLi = document.querySelector(`[data-card-id="${firstSelectedIndex}"]`);
                    if (firstLi) firstLi.classList.remove('selected');
                }
                // Add the new card to the selection
                selectedCards.push(cardIndex);
                listItem.classList.add('selected');
            }
            updateDiscardButton();
            console.log('Selected cards for discard:', selectedCards.map(index => playerHand[index].name));
        }

        // Populate the list with the heroes in the player's hand
        playerHand.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', index); // Assign a unique id based on index
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle the discard action
        discardButton.onclick = () => {
            // Create a temporary array to store the selected card objects
            const selectedCardObjects = selectedCards.map(cardIndex => playerHand[cardIndex]);

if (selectedCardObjects.length === 1) {
    onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCardObjects[0].name}</span>.`);
} else if (selectedCardObjects.length === 2) {
    onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCardObjects[0].name}</span> and <span class="console-highlights">${selectedCardObjects[1].name}</span>.`);
} else if (selectedCardObjects.length === 3) {
    onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCardObjects[0].name}</span>, <span class="console-highlights">${selectedCardObjects[1].name}</span>, and <span class="console-highlights">${selectedCardObjects[2].name}</span>.`);
} else if (selectedCardObjects.length === 4) {
    onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCardObjects[0].name}</span>, <span class="console-highlights">${selectedCardObjects[1].name}</span>, <span class="console-highlights">${selectedCardObjects[2].name}</span>, and <span class="console-highlights">${selectedCardObjects[3].name}</span>.`);
} else if (selectedCardObjects.length === 5) {
    onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCardObjects[0].name}</span>, <span class="console-highlights">${selectedCardObjects[1].name}</span>, <span class="console-highlights">${selectedCardObjects[2].name}</span>, <span class="console-highlights">${selectedCardObjects[3].name}</span>, and <span class="console-highlights">${selectedCardObjects[4].name}</span>.`);
} else if (selectedCardObjects.length === 6) {
    onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCardObjects[0].name}</span>, <span class="console-highlights">${selectedCardObjects[1].name}</span>, <span class="console-highlights">${selectedCardObjects[2].name}</span>, <span class="console-highlights">${selectedCardObjects[3].name}</span>, <span class="console-highlights">${selectedCardObjects[4].name}</span>, and <span class="console-highlights">${selectedCardObjects[5].name}</span>.`);
} else if (selectedCardObjects.length === 7) {
    onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCardObjects[0].name}</span>, <span class="console-highlights">${selectedCardObjects[1].name}</span>, <span class="console-highlights">${selectedCardObjects[2].name}</span>, <span class="console-highlights">${selectedCardObjects[3].name}</span>, <span class="console-highlights">${selectedCardObjects[4].name}</span>, <span class="console-highlights">${selectedCardObjects[5].name}</span>, and <span class="console-highlights">${selectedCardObjects[6].name}</span>.`);
} else if (selectedCardObjects.length === 8) {
    onscreenConsole.log(`You have discarded <span class="console-highlights">${selectedCardObjects[0].name}</span>, <span class="console-highlights">${selectedCardObjects[1].name}</span>, <span class="console-highlights">${selectedCardObjects[2].name}</span>, <span class="console-highlights">${selectedCardObjects[3].name}</span>, <span class="console-highlights">${selectedCardObjects[4].name}</span>, <span class="console-highlights">${selectedCardObjects[5].name}</span>, <span class="console-highlights">${selectedCardObjects[6].name}</span>, and <span class="console-highlights">${selectedCardObjects[7].name}</span>.`);
}


            // Remove selected cards from the playerHand and add them to the discard pile
            selectedCardObjects.forEach(card => {
                const cardIndex = playerHand.indexOf(card);
                if (cardIndex !== -1) {
                    playerHand.splice(cardIndex, 1); // Remove from hand
                    playerDiscardPile.push(card); // Add to discard pile
                }
            });

            console.log('Cards discarded:', selectedCardObjects.map(card => card.name));
            // Hide the popup and update the game board
            closePopup();
            updateGameBoard();
            resolve(); // Resolve after the discard action is completed
        };

        function closePopup() {
            // Reset popup elements to default state
            popupTitle.textContent = 'Hero Ability!'; // Replace with the default title
            instructionsDiv.textContent = 'Context'; // Replace with the default instructions
            discardButton.textContent = 'No Thanks!';
            discardButton.style.display = 'none';

            // Hide the popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }


discardInvulnerabilityReturnChoice().then(() => {
      // Additional logic can go here if needed after handling invulnerable cards
      updateGameBoard(); // Ensure the game state is updated after the choice
    });



        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}


function RedSkullKOHandHero() {
    return new Promise((resolve, reject) => {
        // Combine heroes from the player's hand and cards played this turn
        const combinedCards = [...playerHand, ...cardsPlayedThisTurn];
        
        // Check if there are any heroes in the combined list
        if (combinedCards.length === 0) {
            console.log('No heroes in hand or played to KO.');
onscreenConsole.log('You have no Heroes available to KO.');
            resolve(); // Resolve immediately if there are no heroes to KO
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
document.getElementById('close-choice-button').style.display = 'none';


        // Clear previous list
        cardsList.innerHTML = '';

        // Change the <h2> text (assuming it's the first <h2> in the popup)
        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'Master Strike';

        // Set instructions for the player
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select a hero to KO.';

        // Function to handle the card selection
        function handleCardClick(card, cardIndex, isFromHand) {
            console.log(`${card.name} has been KO'd.`);
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            // Remove the card from the correct array (hand or played)
            if (isFromHand) {
                playerHand.splice(cardIndex, 1);
            } else {
                cardsPlayedThisTurn.splice(cardIndex - playerHand.length, 1); // Adjust index for played cards
            }
            // Add the card to the KO pile
            koPile.push(card);
            // Hide the popup after selection
            closePopup();

            // Update the game board
            updateGameBoard();
            resolve(); // Resolve the promise after the card is KO'd
        }

        function closePopup() {
            // Reset popup elements to default state
            popupTitle.textContent = 'Hero Ability!'; // Replace with the default title
            instructionsDiv.textContent = 'Context'; // Replace with the default instructions

            // Hide the popup
            popup.style.display = 'none';
            document.getElementById("modal-overlay").style.display = "none";
        }

        // Populate the list with the heroes from the player's hand and played cards
        combinedCards.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            const isFromHand = index < playerHand.length; // Determine if the card is from the hand
            li.onclick = () => handleCardClick(card, index, isFromHand);
            cardsList.appendChild(li);
        });

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}


function revealStrengthOrWound() {

const cardsYouHave = [...playerHand,...cardsPlayedThisTurn];

if (cardsYouHave.filter(item => item.class1 === 'Strength').length === 0) {
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`)
drawWound();
} else {
onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero and have escaped gaining a Wound.`);
return;
}
}

function EscapeRevealStrengthOrWound() {
onscreenConsole.log(`Escape! Reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero or gain a Wound.`);
revealStrengthOrWound();
}

function FightRevealStrengthOrWound() {
onscreenConsole.log(`Fight! Reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero or gain a Wound.`);
revealStrengthOrWound();
}



function LokiRevealStrengthOrWound() {

const cardsYouHave = [...playerHand,...cardsPlayedThisTurn];

if (cardsYouHave.filter(item => item.class1 === 'Strength').length === 0) {
onscreenConsole.log('You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.')
drawWound();
} else {
onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero and and have escaped Loki's Master Strike!`);
return;
}
}


function HYDRAVPOrWound() {

if (victoryPile.filter(item => item.team === 'HYDRA').length === 0) {
onscreenConsole.log(`You are unable to reveal a HYDRA Villain in your Victory Pile.`)
drawWound();
} else {
onscreenConsole.log(`You are able to reveal a HYDRA Villain in your Victory Pile and have escaped gaining a Wound.`);
return;
}
}

function FightHYDRAVPOrWound() {
onscreenConsole.log(`Fight! Reveal another HYDRA Villain in your Victory Pile or gain a Wound.`);
HYDRAVPOrWound();
}

function EscapeHYDRAVPOrWound() {
onscreenConsole.log(`Escape! Reveal another HYDRA Villain in your Victory Pile or gain a Wound.`);
HYDRAVPOrWound();
}

function revealTechOrWound() {

const cardsYouHave = [...playerHand,...cardsPlayedThisTurn];

if (cardsYouHave.filter(item => item.class1 === 'Tech').length === 0) {
console.log('You are unable to reveal a Tech hero.')
drawWound();
} else {
console.log('You are able to reveal a Tech hero and have escaped gaining a wound.');
return;
}
}


function EscapeRevealTechOrWound() {
onscreenConsole.log('Escape! Reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero or gain a Wound.');
revealTechOrWound();
}

function revealRangeOrWound() {

const cardsYouHave = [...playerHand,...cardsPlayedThisTurn];

if (cardsYouHave.filter(item => item.class1 === 'Range').length === 0) {
onscreenConsole.log('You are unable to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero.')
drawWound();
} else {
onscreenConsole.log('You are able to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero and have escaped gaining a Wound.');
return;
}
}

function EscapeRevealRangeOrWound() {
onscreenConsole.log('Escape! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.');
revealRangeOrWound();
}

function AmbushRevealRangeOrWound() {
onscreenConsole.log('Ambush! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.');
revealRangeOrWound();
}

function FightRevealRangeOrWound() {
onscreenConsole.log('Fight! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.');
revealRangeOrWound();
}






function doomHeroRecruit() {
    return new Promise((resolve, reject) => {
        const eligibleHeroesForDoomRecruit = hq.map((item, index) => ({ ...item, index }))
                                 .filter(item => item.class1 === 'Tech' || item.class1 === 'Range');

        if (eligibleHeroesForDoomRecruit.length === 0) {
            console.log('No available Tech or Range Heroes to recruit.');
onscreenConsole.log(`No available <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='console-card-icons'> or<img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='console-card-icons'>Heroes to recruit.`);
            resolve(); // Resolve immediately if there are no heroes to recruit
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const cardsList = document.getElementById('cards-to-choose-from');
        const modalOverlay = document.getElementById('modal-overlay');
        const noThanksButton = document.getElementById('close-choice-button'); // Assuming this is your "No Thanks" button
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');


        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'Recruit a Hero';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.innerHTML = `You may recruit a <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='card-icons'> or<img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='card-icons'>Hero from the HQ for free.`;

        // Clear previous list
        cardsList.innerHTML = '';

        // Populate the list with eligible heroes
        eligibleHeroesForDoomRecruit.forEach(card => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;

// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => {
                recruitHeroConfirmed(card, card.index);
                totalRecruitPoints += card.cost;
                updateGameBoard();
                
                // Hide the popup after selection
                closePopup();
                resolve(); // Resolve after the hero is recruited
            };

            cardsList.appendChild(li);
        });

        // Add functionality to the "No Thanks" button
        noThanksButton.textContent = 'No Thanks!';
        noThanksButton.style.display = 'inline-block';
        noThanksButton.onclick = () => {
            closePopup();
            resolve(); // Resolve when "No Thanks" is clicked
        };

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            noThanksButton.style.display = 'none'; // Hide the button after it's used

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function instantVillainDefeat() {
    return new Promise((resolve, reject) => {
        // Filter the city to get only valid Villains and Henchmen with their unique indexes
        const villainsInCity = city
            .map((card, index) => (card && card.type === 'Villain') ? { ...card, id: `city-${index}`, index } : null)
            .filter(card => card !== null);

        if (villainsInCity.length === 0) {
            onscreenConsole.log('There are no Villains available to defeat.');
            resolve(); // Resolve immediately if there are no villains to defeat
            return;
        }

        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const defeatButton = document.getElementById('close-choice-button');
        defeatButton.textContent = 'DEFEAT SELECTED VILLAIN';
        defeatButton.disabled = true;

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'Defeat Villain';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select a Villain or Henchman to defeat.';

        let selectedVillainId = null;

        function updateDefeatButton() {
            if (selectedVillainId !== null) {
                defeatButton.disabled = false;
                defeatButton.style.display = 'inline-block';
            } else {
                defeatButton.disabled = true;
                defeatButton.style.display = 'none';
            }
        }

        function toggleVillainSelection(card, listItem) {
            if (selectedVillainId === card.id) {
                selectedVillainId = null;
                listItem.classList.remove('selected');
            } else {
                const previouslySelectedItem = document.querySelector(`[data-card-id="${selectedVillainId}"]`);
                if (previouslySelectedItem) {
                    previouslySelectedItem.classList.remove('selected');
                }
                selectedVillainId = card.id;
                listItem.classList.add('selected');
            }

            updateDefeatButton();

            if (selectedVillainId !== null) {
                console.log('Selected Villain for defeat:', card.name);
            } else {
                console.log('No valid Villain selected for defeat.');
            }
        }

        villainsInCity.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };


            li.onclick = () => toggleVillainSelection(card, li);
            cardsList.appendChild(li);
        });

        defeatButton.onclick = () => {
            if (selectedVillainId !== null) {
                const selectedVillain = villainsInCity.find(villain => villain.id === selectedVillainId);

                if (!selectedVillain) {
                    console.error(`No villain found with id ${selectedVillainId}.`);
                    alert("Invalid selection. No villain found.");
                    reject("Invalid villain selection"); // Reject the promise if an invalid selection occurs
                    return;
                }

                console.log('Villain selected for defeat:', selectedVillain.name);

                // Add the villain's attack value to the player's total attack points
                const tempBuffVariableName = `city${selectedVillain.index + 1}TempBuff`; // Match index correctly
                const tempBuffValue = window[tempBuffVariableName] || 0;
                const permBuffVariableName = `city${selectedVillain.index + 1}PermBuff`; // Match index correctly
                const permBuffValue = window[permBuffVariableName] || 0;

                let villainAttack = selectedVillain.attack + tempBuffValue + permBuffValue;

                if (villainAttack < 0) {
                    villainAttack = 0;
                }

                totalAttackPoints += villainAttack;

                // Trigger the confirmAttack function to handle the defeat
                confirmAttack(selectedVillain.index);

                // Close the popup and resolve the promise
                closePopup();
                resolve(); // Resolve the promise after the villain is defeated
            } else {
                alert("You must select a valid Villain to defeat.");
                reject("No villain selected"); // Reject the promise if no villain is selected
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            defeatButton.textContent = 'No Thanks!';
            defeatButton.style.display = 'none';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}


function KO1To4FromDiscard() {
    return new Promise((resolve, reject) => {
        if (playerDiscardPile.length === 0) {
            console.log('No cards in the Discard Pile to KO.');
onscreenConsole.log('Your discard pile is currently empty. Unable to KO any cards.');
            resolve(); // Resolve immediately if there are no cards to KO
            return;
        }

        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('close-choice-button');

        koButton.textContent = 'No Thanks!';
koButton.style.display = 'block';
        koButton.disabled = false; // The button is now active from the start

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'KO Cards';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'You may select up to four cards from your discard pile to KO.';

        let selectedCards = [];

        // Update the KO button text based on selection status
        function updateKOButton() {
            if (selectedCards.length > 0 && selectedCards.length <= 4) {
                koButton.textContent = 'KO Selected Cards';
            } else {
                koButton.textContent = 'No Thanks!';
            }
        }

        function toggleCardSelection(card, listItem) {
            const cardIndex = selectedCards.indexOf(card);
            if (cardIndex > -1) {
                selectedCards.splice(cardIndex, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedCards.length >= 4) return;
                selectedCards.push(card);
                listItem.classList.add('selected');
            }

            updateKOButton();
            console.log('Selected cards for KO:', selectedCards.map(c => c.name));
        }

        // Render discard pile cards as selectable list items
        playerDiscardPile.forEach((card, index) => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', `discard-${index}`);
            
            const heroImage = document.getElementById('hero-one-location-image');
            const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
            
            // On mouseover, change the hero image to the selected card's image
            li.onmouseover = () => {
                heroImage.src = card.image;  // Dynamically change the image source
                heroImage.style.display = 'block';  // Ensure the image is visible
                oneChoiceHoverText.style.display = 'none';
            };

            // On mouseout, reset the image to its default state (or hide it)
            li.onmouseout = () => {
                heroImage.src = '';  // Clear the image source
                heroImage.style.display = 'none';  // Hide the image
                oneChoiceHoverText.style.display = 'block';
            };

            li.onclick = () => toggleCardSelection(card, li);
            cardsList.appendChild(li);
        });

        // KO button click handler
        koButton.onclick = () => {
            if (selectedCards.length > 0) {
                selectedCards.forEach(card => {
                    const cardIndex = playerDiscardPile.indexOf(card);
                    if (cardIndex !== -1) {
                        playerDiscardPile.splice(cardIndex, 1);
                        koPile.push(card);
                        console.log(`${card.name} is being sent from the Discard Pile to the KO Pile.`);
                        onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd from your discard pile.`);
                    }
                });
                closePopup();
                updateGameBoard();
                resolve(); // Resolve after the user has completed the KO action
            } else {
                console.log('No cards selected. Action skipped.');
                onscreenConsole.log(`You chose not to KO any cards.`);
                closePopup(); // Close the popup even if no cards are selected
                resolve(); // Resolve even if no action is taken
            }
        };

        // Function to close the popup
        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'No Thanks!';
            koButton.style.display = 'none';  // Hide the button when the popup closes

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        // Show the popup and overlay
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}


function chooseVillainKOFromVP() {
    return new Promise((resolve, reject) => {
        const villainsInVP = victoryPile
            .map((card, index) => (card && (card.type === 'Villain' || card.type === 'Henchman')) ? { ...card, id: `vp-${index}`, index } : null)
            .filter(card => card !== null);

        if (villainsInVP.length === 0) {
            onscreenConsole.log('There are no Villains in your Victory Pile to KO.');
            resolve(); // Resolve immediately if there are no villains to KO
            return;
        }

        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('close-choice-button');
        koButton.textContent = 'KO Selected Villain';
        koButton.disabled = true;

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'KO a Villain';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select a Villain or Henchman to KO from your Victory Pile.';

        let selectedVillainId = null;

        function updateKOButton() {
            if (selectedVillainId !== null) {
                koButton.disabled = false;
                koButton.style.display = 'inline-block';
            } else {
                koButton.disabled = true;
                koButton.style.display = 'none';
            }
        }

        function toggleVillainSelection(card, listItem) {
            if (selectedVillainId === card.id) {
                selectedVillainId = null;
                listItem.classList.remove('selected');
            } else {
                const previouslySelectedItem = document.querySelector(`[data-card-id="${selectedVillainId}"]`);
                if (previouslySelectedItem) {
                    previouslySelectedItem.classList.remove('selected');
                }
                selectedVillainId = card.id;
                listItem.classList.add('selected');
            }

            updateKOButton();

            if (selectedVillainId !== null) {
                console.log('Selected card for KO:', card.name);
            } else {
                console.log('No valid Villain selected for KO.');
            }
        }

        villainsInVP.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => toggleVillainSelection(card, li);
            cardsList.appendChild(li);
        });

        koButton.onclick = () => {
            if (selectedVillainId !== null) {
                const selectedVillain = villainsInVP.find(villain => villain.id === selectedVillainId);

                onscreenConsole.log(`<span class="console-highlights">${selectedVillain.name}</span> has been KO'd from your Victory Pile.`);

                victoryPile.splice(selectedVillain.index, 1);
                koPile.push(selectedVillain);

                closePopup();
                updateGameBoard();
                resolve(); // Resolve the Promise after the villain is KO'd
            } else {
                alert("You must select a valid Villain to KO.");
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'No Thanks!';
            koButton.style.display = 'none';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}


function chooseBystanderKOFromVP() {
    return new Promise((resolve, reject) => {
        const bystandersInVP = victoryPile
            .map((card, index) => (card && card.type === 'Bystander') ? { ...card, id: `vp-${index}` } : null)
            .filter(card => card !== null);

if (bystandersInVP.length === 0) {
            onscreenConsole.log(`There are no Bystanders in your Victory Pile to KO.`);
               
            updateGameBoard();
            resolve(); // Resolve immediately after KOing
            return;
        }


        if (bystandersInVP.length <= 2) {
            bystandersInVP.forEach(card => {
                const indexInVP = victoryPile.indexOf(card);
                if (indexInVP !== -1) {
                    victoryPile.splice(indexInVP, 1);
                    koPile.push(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd from your Victory Pile.`);
                }
            });
            updateGameBoard();
            resolve(); // Resolve immediately after KOing
            return;
        }

        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('close-choice-button');
        koButton.textContent = 'KO Selected Bystanders';
        koButton.disabled = true;

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'KO Bystanders';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select exactly two Bystanders to KO from your Victory Pile.';

        let selectedBystanders = [];

        function updateKOButton() {
            if (selectedBystanders.length === 2) {
                koButton.disabled = false;
                koButton.style.display = 'inline-block';
            } else {
                koButton.disabled = true;
                koButton.style.display = 'none';
            }
        }

        function toggleBystanderSelection(card, listItem) {
            const index = selectedBystanders.indexOf(card);
            if (index > -1) {
                selectedBystanders.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedBystanders.length >= 2) return;
                selectedBystanders.push(card);
                listItem.classList.add('selected');
            }

            updateKOButton();
            console.log('Selected Bystanders for KO:', selectedBystanders.map(b => b.name));
        }

        bystandersInVP.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => toggleBystanderSelection(card, li);
            cardsList.appendChild(li);
        });

        koButton.onclick = () => {
            if (selectedBystanders.length === 2) {
                selectedBystanders.forEach(card => {
                    const indexInVP = victoryPile.indexOf(card);
                    if (indexInVP !== -1) {
                        victoryPile.splice(indexInVP, 1);
                        koPile.push(card);
                         onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd from your Victory Pile.`);
                    }
                });
                closePopup();
                updateGameBoard();
                resolve(); // Resolve after the user has completed the action
            } else {
                alert("You must select exactly 2 Bystanders to KO.");
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'No Thanks!';
            koButton.style.display = 'none';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

function updateHealWoundsButton() {
    const healWoundsButton = document.getElementById('healing-possible');
    const hasWounds = playerHand.some(card => card.name === "Wound");
    if (hasWounds && healingPossible) {
        healWoundsButton.style.display = 'block'; // Show the button
    } else {
        healWoundsButton.style.display = 'none'; // Hide the button
    }
}

function recruitXMen() {
    return new Promise((resolve, reject) => {
        const eligibleHeroesForXMenRecruit = hq.map((item, index) => ({ ...item, index }))
                                 .filter(item => item.team === 'X-Men');

        if (eligibleHeroesForXMenRecruit.length === 0) {
            console.log('No available X-Men Heroes to recruit.');
onscreenConsole.log(`No available <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes to recruit.`);
            resolve(); // Resolve immediately if there are no heroes to recruit
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const cardsList = document.getElementById('cards-to-choose-from');
        const modalOverlay = document.getElementById('modal-overlay');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        
        popupTitle.textContent = 'Recruit a Hero';
        cardsList.innerHTML = '';
        instructionsDiv.innerHTML = `Recruit an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Hero from the HQ for free.`;

        // Clear previous list
        cardsList.innerHTML = '';

        // Populate the list with eligible heroes
        eligibleHeroesForXMenRecruit.forEach(card => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => {
                recruitHeroConfirmed(card, card.index);
                totalRecruitPoints += card.cost;
                updateGameBoard();
                
                // Hide the popup after selection
                closePopup();
                resolve(); // Resolve after the hero is recruited
            };

            cardsList.appendChild(li);
        });

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';

        // Define closePopup within the scope of the variables it needs
        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';

            resolve(); // Ensure the promise is resolved when closing the popup
        }
    });
}


function MagnetoRevealXMenOrWound() {

const cardsYouHave = [...playerHand,...cardsPlayedThisTurn];

if (cardsYouHave.filter(item => item.team === 'X-Men').length === 0) {
console.log('You are unable to reveal an X-Men hero.')
onscreenConsole.log(`You are unable to reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero.`)
drawWound();
drawWound();
} else {
console.log('You are able to reveal an X-Men hero and have escaped gaining Wounds.');
onscreenConsole.log(`You are able to reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero and have escaped gaining Wounds.`);
return;
}
}

function revealXMenOrWound() {

const cardsYouHave = [...playerHand,...cardsPlayedThisTurn];

if (cardsYouHave.filter(item => item.team === 'X-Men').length === 0) {
onscreenConsole.log(`You are unable to reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero.`)
drawWound();
} else {
onscreenConsole.log(`You are able to reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero and have escaped gaining a Wound.`);
return;
}
}

function EscapeRevealXMenOrWound() {
onscreenConsole.log(`Escape! Reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero or gain a Wound.`);
revealXMenOrWound();
}


function FightRevealXMenOrWound() {
onscreenConsole.log(`Fight! Reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero or gain a Wound.`);
revealXMenOrWound();
}



function XMenToBystanders() {
    const cardsYouHave = [...playerHand, ...cardsPlayedThisTurn];
    const XMenCardsYouHave = cardsYouHave.filter(item => item.team === 'X-Men');

    if (XMenCardsYouHave.length === 0) {
        console.log('You do not currently have any X-Men heroes.');
onscreenConsole.log(`You do not currently have any <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes and are unable to rescue any Bystanders.`);
    } else {
        const bystanderText = XMenCardsYouHave.length === 1 ? 'Bystander' : 'Bystanders';
        console.log(`You have rescued ${XMenCardsYouHave.length} ${bystanderText}.`);
onscreenConsole.log(`You have ${XMenCardsYouHave.length} <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes. You are able to rescue ${XMenCardsYouHave.length} ${bystanderText}.`);
        for (let i = 0; i < XMenCardsYouHave.length; i++) {
            rescueBystander();
        }
    }
}

function AvengersToBystanders() {
onscreenConsole.log(`Fight! For each of your <img src='Visual Assets/Icons/Avengers.svg' alt='Avengers Icon' class='console-card-icons'> Heroes, rescue a Bystander.`);
    const cardsYouHave = [...playerHand, ...cardsPlayedThisTurn];
    const AvengersCardsYouHave = cardsYouHave.filter(item => item.team === 'Avengers');

    if (AvengersCardsYouHave.length === 0) {
        onscreenConsole.log(`You do not currently have any <img src='Visual Assets/Icons/Avengers.svg' alt='Avengers Icon' class='console-card-icons'> Heroes.`);
    } else {
        const bystanderText = AvengersCardsYouHave.length === 1 ? 'Bystander' : 'Bystanders';
const HeroText = AvengersCardsYouHave.length === 1 ? 'Hero' : 'Heroes';
onscreenConsole.log(`You currently have ${AvengersCardsYouHave.length} <img src='Visual Assets/Icons/Avengers.svg' alt='Avengers Icon' class='console-card-icons'> ${HeroText}. You have rescued ${AvengersCardsYouHave.length} ${bystanderText}.`);
        for (let i = 0; i < AvengersCardsYouHave.length; i++) {
            rescueBystander();
        }
    }
}

function XMen7thDraw() {
    return new Promise((resolve, reject) => {
    const cardsYouHave = [...playerHand, ...cardsPlayedThisTurn];
    const XMenCardsYouHave = cardsYouHave.filter(item => item.team === 'X-Men');

        if (XMenCardsYouHave.length === 0) {
            console.log('No available X-Men Heroes.');
onscreenConsole.log(`You do not have any <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes to add to next turn's draw.`);
            resolve(); // Resolve immediately if there are no heroes to recruit
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const cardsList = document.getElementById('cards-to-choose-from');
        const modalOverlay = document.getElementById('modal-overlay');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        
        popupTitle.textContent = 'Mastermind Tactic!';
        cardsList.innerHTML = '';
        instructionsDiv.innerHTML = `Choose one of your <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Heroes. When you draw a new hand of cards at the end of this turn, add that Hero to you hand as a seventh card.`;

        // Clear previous list
        cardsList.innerHTML = '';

        // Populate the list with eligible heroes
XMenCardsYouHave.forEach(card => {
    console.log('Adding card to selection list:', card);
    const li = document.createElement('li');
    li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

    li.onclick = () => {
        // Remove the card from the player's hand or played cards
        const handIndex = playerHand.indexOf(card);
        const playedIndex = cardsPlayedThisTurn.indexOf(card);

        if (handIndex !== -1) {
            playerHand.splice(handIndex, 1);
            console.log(`${card.name} removed from hand.`);
        } else if (playedIndex !== -1) {
            cardsPlayedThisTurn.splice(playedIndex, 1);
            console.log(`${card.name} removed from cards played this turn.`);
        }

        // Add the card to cardsToBeDrawnNextTurn array
        cardsToBeDrawnNextTurn.push(card);
nextTurnsDraw++;
        console.log(`${card.name} has been reserved for next turn.`);
onscreenConsole.log(`You have selected <span class="console-highlights">${card.name}</span> to be added to your next draw as a seventh card.`);


        // Update the game board to reflect changes
        updateGameBoard();

        // Hide the popup after selection
        closePopup();
        resolve(); // Resolve after the card is added and removed from play
    };

    cardsList.appendChild(li);
});

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';

        // Define closePopup within the scope of the variables it needs
        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';

            resolve(); // Ensure the promise is resolved when closing the popup
        }
    });
}

function add4Recruit() {

            totalRecruitPoints += 4;
            cumulativeRecruitPoints += 4;
onscreenConsole.log(`+4 <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'> gained.`);
updateGameBoard();
}

function add3Attack() {

            totalAttackPoints += 3;
            cumulativeAttackPoints += 3;
onscreenConsole.log(`+3 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> gained.`);
updateGameBoard();
}

function redSkullDrawing() {
    // Draw two extra cards
    extraDraw();
    extraDraw();

    // Count Villains with alwaysLeads in victory pile
    const alwaysLeadsInVP = victoryPile.filter(item => item.alwaysLeads === "true").length;

    // Determine whether to use singular or plural form
    const cardText = alwaysLeadsInVP === 1 ? "card" : "cards";
    const villainText = alwaysLeadsInVP === 1 ? "Villain" : "Villains";

    // Log the result, correcting the usage of alwaysLeadsInVP
    onscreenConsole.log(`Solo Play rules enable your chosen Villain group to be used instead of HYDRA. As such, with ${alwaysLeadsInVP} ${villainText} in your Victory Pile, you can draw ${alwaysLeadsInVP} additional ${cardText}.`);

    // Draw additional cards based on the number of Villains
    for (let i = 0; i < alwaysLeadsInVP; i++) {
        extraDraw();
    }
}


function revealTop3AndChooseActions() {
    return new Promise((resolve) => {
        // Calculate the total number of available cards (deck + discard pile)
        const totalAvailableCards = playerDeck.length + playerDiscardPile.length;

        // If fewer than 3 cards are available, exit early
        if (totalAvailableCards < 3) {
            onscreenConsole.log('Not enough cards available to reveal and resolve.');
            console.log('Not enough cards available to reveal and resolve.');
            resolve(); // Resolve immediately if fewer than 3 cards are available
            return;
        }

        // Function to draw up to 3 cards, shuffling if necessary
        function drawCards(num) {
            const drawnCards = [];
            for (let i = 0; i < num; i++) {
                if (playerDeck.length === 0) {
                    if (playerDiscardPile.length > 0) {
                        playerDeck = shuffle(playerDiscardPile);
                        playerDiscardPile = [];
                    } else {
                        console.log("No cards left in deck or discard pile.");
                        onscreenConsole.log("No cards left in deck or discard pile.");
                        break; // Exit the loop if both deck and discard pile are empty
                    }
                }
                drawnCards.push(playerDeck.shift()); // Draw the top card
            }
            return drawnCards;
        }

        // Draw the top 3 cards
        const top3Cards = drawCards(3);

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const cardsList = document.getElementById('cards-to-choose-from');
        const title = document.getElementById('cardChoiceh2');
        const context = document.getElementById('context');

        title.innerHTML = 'MASTERMIND TACTIC!';
        context.innerHTML = 'You revealed the following cards. Select one to KO.';

        // Clear previous list and set initial instructions
        cardsList.innerHTML = '';

        let choices = { KO: null, Discard: null, Return: null };

        // Function to update the instructions
        function updateInstructions(newInstructions) {
            context.innerHTML = newInstructions;
        }

        // Function to handle card selection and action updates
        function handleCardClick(card, cardElement) {
            if (!choices.KO) {
                choices.KO = card;
                console.log(`${card.name} has been KO'd.`);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
                koPile.push(card);
                cardElement.remove(); // Remove the card element from the DOM
                updateInstructions('Now select a card to discard.');
            } else if (!choices.Discard) {
                choices.Discard = card;
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been discarded.`);
                playerDiscardPile.push(card);
                cardElement.remove(); // Remove the card element from the DOM
                updateInstructions('The last card will be returned to the top of the deck.');
            } else {
                choices.Return = card;
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been returned to the top of your deck.`);
                playerDeck.unshift(card); // Move the card to the top of the deck
                console.log(`Choices Summary: KO - ${choices.KO.name}, Discard - ${choices.Discard.name}, Return - ${choices.Return.name}`);
                // Hide the popup after the last selection
                closePopup();
                updateGameBoard();
                resolve(); // Resolve the promise after all choices are made
            }
        }

        // Function to close the popup and reset
        function closePopup() {
            title.innerHTML = 'HERO ABILITY';
            context.innerHTML = 'Context';
            popup.style.display = 'none';
            document.getElementById("modal-overlay").style.display = "none";
        }

        // Populate the list with the top 3 cards
        top3Cards.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;

            const heroImage = document.getElementById('hero-one-location-image');
            const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

            // On mouseover, change the hero image to the selected card's image
            li.onmouseover = () => {
                heroImage.src = card.image;  // Dynamically change the image source
                heroImage.style.display = 'block';  // Ensure the image is visible
                oneChoiceHoverText.style.display = 'none';
            };

            // On mouseout, reset the image to its default state (or hide it)
            li.onmouseout = () => {
                heroImage.src = '';  // Clear the image source
                heroImage.style.display = 'none';  // Hide the image
                oneChoiceHoverText.style.display = 'block';
            };

            // Attach the click handler for card selection
            li.onclick = () => handleCardClick(card, li);
            cardsList.appendChild(li);
        });

        discardInvulnerabilityReturnChoice().then(() => {
            updateGameBoard(); // Ensure the game state is updated after the choice
        });

        // Show the popup
        popup.style.display = 'block';
    });
}

function EscapeChooseHeroesToKO() {

onscreenConsole.log("Escape! You must KO two Heroes from your hand.");
chooseHeroesToKO();
}

function chooseHeroesToKO() {
    return new Promise((resolve, reject) => {
        const availableHeroes = [...cardsPlayedThisTurn, ...playerHand]
            .filter(card => card && card.type === 'Hero');

        if (availableHeroes.length === 0) {
            console.log("No Heroes available to KO.");
onscreenConsole.log("No Heroes available to KO.");
            resolve();
            return;
        }

        if (availableHeroes.length <= 2) {
            availableHeroes.forEach(card => {
                const indexInCardsPlayed = cardsPlayedThisTurn.indexOf(card);
                const indexInHand = playerHand.indexOf(card);

                if (indexInCardsPlayed !== -1) {
                    cardsPlayedThisTurn.splice(indexInCardsPlayed, 1);
                } else if (indexInHand !== -1) {
                    playerHand.splice(indexInHand, 1);
                }

                koPile.push(card);
                console.log(`${card.name} is being KO'd.`);
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been automatically chosen and KO'd.`);
            });
            updateGameBoard();
            resolve(); // Resolve immediately after KO'ing
            return;
        }

        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('close-choice-button');
        koButton.textContent = 'KO Selected Heroes';
        koButton.disabled = true;

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'KO Heroes';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select two Heroes to KO from your played cards or hand.';

        let selectedHeroes = [];

        function updateKOButton() {
            if (selectedHeroes.length === 2) {
                koButton.disabled = false;
                koButton.style.display = 'inline-block';
            } else {
                koButton.disabled = true;
                koButton.style.display = 'none';
            }
        }

        function toggleHeroSelection(card, listItem) {
            const index = selectedHeroes.indexOf(card);
            if (index > -1) {
                selectedHeroes.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedHeroes.length >= 2) return;
                selectedHeroes.push(card);
                listItem.classList.add('selected');
            }

            updateKOButton();
            console.log('Selected Heroes for KO:', selectedHeroes.map(hero => hero.name));
        }

        availableHeroes.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => toggleHeroSelection(card, li);
            cardsList.appendChild(li);
        });

        koButton.onclick = () => {
            if (selectedHeroes.length === 2) {
                selectedHeroes.forEach(card => {
                    const indexInCardsPlayed = cardsPlayedThisTurn.indexOf(card);
                    const indexInHand = playerHand.indexOf(card);

                    if (indexInCardsPlayed !== -1) {
                        cardsPlayedThisTurn.splice(indexInCardsPlayed, 1);
                    } else if (indexInHand !== -1) {
                        playerHand.splice(indexInHand, 1);
                    }

                    koPile.push(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
                });
                closePopup();
                updateGameBoard();
                resolve(); // Resolve after the user has completed the action
            } else {
                alert("You must select exactly two Heroes to KO.");
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'No Thanks!';
            koButton.style.display = 'none';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

function handleMystiqueEscape() {
    return new Promise((resolve, reject) => {
        // Search for Mystique in the escape pile
        const mystiqueIndex = escapedVillainsDeck.findIndex(card => card.name === 'Mystique');
        
        if (mystiqueIndex !== -1) {
            // Splice Mystique from the escape pile
            const mystiqueCard = escapedVillainsDeck.splice(mystiqueIndex, 1)[0];

            // Change the card's properties
            mystiqueCard.name = 'Scheme Twist';
            mystiqueCard.type = 'Scheme Twist';

            // Place it on top of the villain deck
            villainDeck.unshift(mystiqueCard);

            onscreenConsole.log(`Escape! <span class="console-highlights">Mystique</span> has transformed into a Scheme Twist.`);

            // Draw the top card of the villain deck
            drawVillainCard().then(() => {
                resolve(); // Resolve the promise after the card is drawn
            }).catch(error => {
                reject(error); // Reject the promise if drawing the card fails
            });
        } else {
            console.log('Mystique was not found in the Escape Pile.');
            resolve(); // Resolve immediately if Mystique is not found
        }
    });
}

function ambushBystander(bystanderCard) {
    let sewersIndex = city.length - 1;
onscreenConsole.log(`Ambush! <span class="console-highlights">${city[sewersIndex].name}</span> captures a Bystander.`);


    // Check if there's a villain in the sewers
    if (city[sewersIndex]) {
        attachBystanderToVillain(sewersIndex, bystanderCard);
    } else {
        // Find the next closest villain to the villain deck
        let closestVillainIndex = findClosestVillain();
        
        if (closestVillainIndex !== -1) {
            attachBystanderToVillain(closestVillainIndex, bystanderCard);
        } else {
            // If no villains in the city, attach to the mastermind
            attachBystanderToMastermind(bystanderCard);
        }
    }

    updateGameBoard();
}

function extraVillainDraw() {
let sewersIndex = city.length - 1;
    onscreenConsole.log(`Ambush! <span class="console-highlights">${city[sewersIndex].name}</span> forces you to play the top card of the Villain Deck.`);

drawVillainCard();
}

function villainDrawX2() {
let sewersIndex = city.length - 1;
     onscreenConsole.log(`Fight! Play the top two cards of the Villain Deck.`);
drawVillainCard();
drawVillainCard();
}

function chooseHeroesToKOFromDiscardPile() {
onscreenConsole.log(`Ambush! You must KO two Heroes from your discard pile.`);
    return new Promise((resolve, reject) => {
        // Filter to get all Hero cards in the discard pile
        const availableHeroes = playerDiscardPile.filter(card => card && card.type === 'Hero');

        // If no Heroes are available in the discard pile
        if (availableHeroes.length === 0) {
            console.log("No Heroes available to KO in the discard pile.");
onscreenConsole.log("No Heroes available to KO in the discard pile.");
            resolve();
            return;
        }

        // If 2 or fewer Heroes are available, KO them instantly
        if (availableHeroes.length <= 2) {
            availableHeroes.forEach(card => {
                const indexInDiscard = playerDiscardPile.indexOf(card);

                if (indexInDiscard !== -1) {
                    playerDiscardPile.splice(indexInDiscard, 1);
                }

                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been automatically chosen and KO'd from the discard pile.`);
            });
            updateGameBoard();
            resolve(); // Resolve immediately after KO'ing
            return;
        }

        // If more than 2 Heroes are available, prompt the player to choose
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('close-choice-button');
        koButton.textContent = 'KO Selected Heroes';
        koButton.disabled = true;

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'KO Heroes';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Select two Heroes to KO from your Discard Pile.';

        let selectedHeroes = [];

        function updateKOButton() {
            if (selectedHeroes.length === 2) {
                koButton.disabled = false;
                koButton.style.display = 'inline-block';
            } else {
                koButton.disabled = true;
                koButton.style.display = 'none';
            }
        }

        function toggleHeroSelection(card, listItem) {
            const index = selectedHeroes.indexOf(card);
            if (index > -1) {
                selectedHeroes.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedHeroes.length >= 2) return;
                selectedHeroes.push(card);
                listItem.classList.add('selected');
            }

            updateKOButton();
            console.log('Selected Heroes for KO:', selectedHeroes.map(hero => hero.name));
        }

        availableHeroes.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => toggleHeroSelection(card, li);
            cardsList.appendChild(li);
        });

        koButton.onclick = () => {
            if (selectedHeroes.length === 2) {
                selectedHeroes.forEach(card => {
                    const indexInDiscard = playerDiscardPile.indexOf(card);

                    if (indexInDiscard !== -1) {
                        playerDiscardPile.splice(indexInDiscard, 1);
                    }

                    koPile.push(card);
                    
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd from the discard pile.`);
                });
                closePopup();
                updateGameBoard();
                resolve(); // Resolve after the user has completed the action
            } else {
                alert("You must select exactly two Heroes to KO.");
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'No Thanks!';
            koButton.style.display = 'none';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

function AmbushRightHeroSkrull() {
    onscreenConsole.log(`Ambush! The rightmost Hero from the HQ is captured by <span class="console-highlights">Skrull Shapeshifters</span>.`);

    // Identify the rightmost HQ space (index 4 since HQ usually has 5 spaces, 0-4)
    const hqIndex = hq.length - 1;
    const hero = hq[hqIndex];

    // Check if there's a hero in the rightmost HQ space
    if (!hero) {
        onscreenConsole.log('There is no Hero available in the rightmost HQ space.');
        return;
    }

    // Identify the villain in the rightmost city space (index 4 assuming 5 city spaces, 0-4)
    const cityIndex = city.length - 1;
    const skrullShapeshifters = city[cityIndex];

    // Check if there's a villain in the rightmost city space
    if (!skrullShapeshifters) {
        onscreenConsole.log('No Villain in the rightmost city space.');
        return;
    }

    // Create a timestamp-based code for both the hero and the Skrull Shapeshifters
    const captureCode = Date.now(); // This timestamp is unique for each capture event

    // Assign the captureCode to both the hero and the villain
    skrullShapeshifters.captureCode = captureCode;
    hero.captureCode = captureCode;

    // Set the villain's attack equal to the hero's cost
    skrullShapeshifters.originalAttack = hero.cost;
skrullShapeshifters.overlayTextAttack = hero.cost;

    // Move the hero to the Skrull deck (or equivalent storage) and tag it with the captureCode
    skrullDeck.push({ ...hero, skrull: captureCode }); // Store the hero with its captureCode

    // Attach an overlay to the villain
    skrullShapeshifters.overlayText = `SKRULL<p><img src="${hero.image}" alt="${hero.name}" class="hero-image-overlay">`;

    onscreenConsole.log(`<span class="console-highlights">Skrull Shapeshifters</span> has captured <span class="console-highlights">${hero.name}</span>. This Villain now has ${skrullShapeshifters.originalAttack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Fight this Villain to gain the captured Hero.`);

    // Replace the rightmost HQ space with the top card from the hero deck, if available
    hq[hqIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;

    // Check if the HQ space is empty after drawing
    if (!hq[hqIndex]) {
        showHeroDeckEmptyPopup();
    }

    // Update the game board to reflect the changes
    updateGameBoard();
}

function highestCostHeroSkrullQueen() {
    onscreenConsole.log(`Ambush! The highest-cost Hero from the HQ is captured by <span class="console-highlights">Skrull Queen Veranke</span>.`);

    // Identify the heroes in HQ
    const heroesInHQ = hq.filter(card => card && card.type === 'Hero');

    // Find the highest cost among the heroes
    const maxCost = Math.max(...heroesInHQ.map(hero => hero.cost));

    // Filter heroes with the highest cost
    const highestCostHeroes = heroesInHQ.filter(hero => hero.cost === maxCost);

    // If there's only one hero with the highest cost, capture it automatically
    if (highestCostHeroes.length === 1) {
        captureHeroBySkrullQueen(highestCostHeroes[0]);
    } else if (highestCostHeroes.length > 1) {
        // If there are multiple heroes with the same highest cost, prompt the player to choose
        showHeroSelectionPopup(highestCostHeroes, captureHeroBySkrullQueen);
    } else {
        onscreenConsole.log("No Heroes available in the HQ.");
    }
}

function captureHeroBySkrullQueen(hero) {
    // Identify the Skrull Queen in the city (assuming she's in the rightmost position)
    const cityIndex = city.length - 1;
    const skrullQueen = city[cityIndex];

    if (!skrullQueen) {
        console.log('No Villain in the rightmost city space.');
        return;
    }

    // Create a unique captureCode using the timestamp
    const captureCode = Date.now();

    // Assign the captureCode to both the villain and the hero
    skrullQueen.captureCode = captureCode;
    hero.captureCode = captureCode;

    // Set the Skrull Queen's attack equal to the hero's cost
    skrullQueen.originalAttack = hero.cost;
skrullQueen.overlayTextAttack = hero.cost;

    // Move the hero to the Skrull deck and tag it with the captureCode
    skrullDeck.push({ ...hero, skrull: captureCode });

    // Replace the hero's HQ space with the top card from the hero deck, if available
    const heroIndex = hq.indexOf(hero);
    hq[heroIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;

    // Check if the HQ space is empty after drawing
    if (!hq[heroIndex]) {
        showHeroDeckEmptyPopup();
    }

    // Attach an overlay to the villain
    skrullQueen.overlayText = `SKRULL<p><img src="${hero.image}" alt="${hero.name}" class="hero-image-overlay">`;

    onscreenConsole.log(`<span class="console-highlights">Skrull Queen Veranke</span> has captured <span class="console-highlights">${hero.name}</span>. This Villain now has ${skrullQueen.originalAttack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Fight this Villain to gain the captured Hero.`);

    // Update the game board to reflect the changes
    updateGameBoard();
}

function showHeroSelectionPopup(heroes, onHeroSelected) {
    const popup = document.getElementById('card-choice-one-location-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const cardsList = document.getElementById('cards-to-choose-from');
    const selectButton = document.getElementById('close-choice-button');
    selectButton.textContent = 'Select Hero';
    selectButton.disabled = true;

    const popupTitle = popup.querySelector('h2');
    popupTitle.innerHTML = `Choose a Hero for <span class="bold-spans">Skrull Queen</span> to capture.`;
    cardsList.innerHTML = '';
    const instructionsDiv = document.getElementById('context');
    instructionsDiv.innerHTML = 'Select a Hero in the HQ for <span class="bold-spans">Skrull Queen</span> to capture.';

    let selectedHero = null;

    function updateSelectButton() {
        if (selectedHero) {
            selectButton.disabled = false;
            selectButton.style.display = 'inline-block';
        } else {
            selectButton.disabled = true;
            selectButton.style.display = 'none';
        }
    }

    function toggleHeroSelection(hero, listItem) {
        if (selectedHero === hero) {
            selectedHero = null;
            listItem.classList.remove('selected');
        } else {
            selectedHero = hero;
            Array.from(cardsList.children).forEach(li => li.classList.remove('selected'));
            listItem.classList.add('selected');
        }

        updateSelectButton();
        console.log('Selected Hero for capture:', selectedHero ? selectedHero.name : 'None');
    }

    heroes.forEach(hero => {
        const li = document.createElement('li');
        li.textContent = hero.name;
        li.setAttribute('data-card-id', hero.id);
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = hero.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

        li.onclick = () => toggleHeroSelection(hero, li);
        cardsList.appendChild(li);
    });

    selectButton.onclick = () => {
        if (selectedHero) {
            onHeroSelected(selectedHero);
            closePopup();
        } else {
            alert("You must select a Hero for Skrull Queen to capture.");
        }
    };

    function closePopup() {
        popupTitle.textContent = 'Hero Ability!';
        instructionsDiv.textContent = 'Context';
        selectButton.textContent = 'No Thanks!';
        selectButton.style.display = 'none';

        popup.style.display = 'none';
        modalOverlay.style.display = 'none';
    }

    popup.style.display = 'block';
    modalOverlay.style.display = 'block';
}

function fightSkrullQueen(villainCard) {
    onscreenConsole.log(`Fight! Gain the captured Hero.`);

    // Find the hero in the Skrull deck with the same captureCode as the villain being fought
    const heroIndex = skrullDeck.findIndex(hero => hero.skrull === villainCard.captureCode);

    if (heroIndex === -1) {
        console.log('Error. Unable to rescue any Heroes.');
        return;
    }

    // Remove the hero from the Skrull deck
    const hero = skrullDeck.splice(heroIndex, 1)[0];

    // Remove the skrull attribute (captureCode)
    delete hero.skrull;
villainCard.overlayTextAttack = '';

    // Add the hero to the player's discard pile
    playerDiscardPile.push(hero);

    onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been rescued from <span class="console-highlights">Skrull Queen Veranke</span> and added to your discard pile.`);

    // Update the game board to reflect the changes
    updateGameBoard();
}

function escapeSkrullQueen(escapedVillain) {
    onscreenConsole.log(`Escape! <span class="console-highlights">Skrull Queen Veranke</span> has escaped with her captured Hero.`);

    // Find the hero in the Skrull deck with the same captureCode as the escaping villain
    const heroIndex = skrullDeck.findIndex(hero => hero.skrull === escapedVillain.captureCode);

    if (heroIndex === -1) {
        console.log('Error. Unable to find the captured hero during escape.');
        return;
    }

    // Remove the hero from the Skrull deck and move it to the escaped villains deck
    const hero = skrullDeck.splice(heroIndex, 1)[0];
    escapedVillainsDeck.push(hero);  // You could push this to a deck for escaped villains

escapedVillain.overlayTextAttack = '';

    // Update the game board to reflect the changes
    updateGameBoard();
}


function fightSkrullShapeshifters(villainCard) {
    onscreenConsole.log(`Fight! Gain the captured hero.`);

    // Find the hero in the Skrull deck with the same captureCode as the villain being fought
    const heroIndex = skrullDeck.findIndex(hero => hero.skrull === villainCard.captureCode);

villainCard.overlayTextAttack = '';

    if (heroIndex === -1) {
        onscreenConsole.log('Error. Unable to rescue the captured hero.');
        return;
    }

    // Remove the hero from the Skrull deck
    const hero = skrullDeck.splice(heroIndex, 1)[0];

    // Remove the skrull attribute (captureCode) from the hero (no longer captured)
    delete hero.skrull;

    // Add the hero to the player's discard pile
    playerDiscardPile.push(hero);

    onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been rescued from <span class="console-highlights">Skrull Shapeshifters</span> and added to your discard pile.`);

    // Update the game board to reflect the changes
    updateGameBoard();
}

function escapeSkrullShapeshifter(escapedVillain) {
    onscreenConsole.log(`Escape! <span class="console-highlights">Skrull Shapeshifters</span> have escaped with their captured Hero.`);

    // Find the hero in the Skrull deck with the same captureCode as the escaping villain
    const heroIndex = skrullDeck.findIndex(hero => hero.skrull === escapedVillain.captureCode);

    if (heroIndex === -1) {
        onscreenConsole.log('Error. Unable to find the captured hero during escape.');
        return;
    }

    // Remove the hero from the Skrull deck and move it to the escaped villains deck
    const hero = skrullDeck.splice(heroIndex, 1)[0];
    escapedVillainsDeck.push(hero);
escapedVillain.overlayTextAttack = '';

    // Update the game board to reflect the changes
    updateGameBoard();
}


function freeHeroRecruit() {
 onscreenConsole.log(`Fight! Choose a Hero in the HQ to gain.`);

    return new Promise((resolve, reject) => {
        // Modify the filter to include any class attribute
        const eligibleHeroesForRecruit = hq.map((item, index) => ({ ...item, index }))
                                           .filter(item => item.class1 !== undefined && item.class1 !== null);

        if (eligibleHeroesForRecruit.length === 0) {
            onscreenConsole.log('No available Heroes to gain.');
            resolve(); // Resolve immediately if there are no heroes to recruit
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const cardsList = document.getElementById('cards-to-choose-from');
        const modalOverlay = document.getElementById('modal-overlay');

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'Recruit a Hero';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Choose a Hero in the HQ and gain it.';

        // Clear previous list
        cardsList.innerHTML = '';

        // Populate the list with eligible heroes
        eligibleHeroesForRecruit.forEach(card => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => {
                recruitHeroConfirmed(card, card.index);
                totalRecruitPoints += card.cost;
                updateGameBoard();
                
                // Hide the popup after selection
                closePopup();
                resolve(); // Resolve after the hero is recruited
            };

            cardsList.appendChild(li);
        });

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function chooseToGainSHIELDOfficer() {
onscreenConsole.log(`Fight! You may gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`);

  return new Promise((resolve) => {
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `Do you wish to gain a <span class="bold-spans">S.H.I.E.L.D. Officer</span>?`,
      "Yes",
      "No"
    );


    const SHIELDImage = document.getElementById('hero-ability-may-card');
const imageText = document.getElementById('heroAbilityHoverText');
        SHIELDImage.src = "Visual Assets/Heroes/SHIELD/shieldofficer.png"; 


       const popupTitle = document.getElementById('cardChoiceh2');
       popupTitle.textContent = 'FIGHT EFFECT!';
SHIELDImage.style.display = 'block';
imageText.style.display = 'none';



    confirmButton.onclick = function() {
      drawSHIELDOfficer();
      hideHeroAbilityMayPopup();
popupTitle.textContent = 'HERO ABILITY!';
imageText.style.display = 'block';
SHIELDImage.style.display = 'none';
      resolve();
    };

    denyButton.onclick = function() {
    
onscreenConsole.log(`No <span class="console-highlights">S.H.I.E.L.D. Officer</span> gained.`);
      hideHeroAbilityMayPopup();
popupTitle.textContent = 'HERO ABILITY!';
imageText.style.display = 'block';
SHIELDImage.style.display = 'none';
      resolve();
    };
  });
}

function drawSHIELDOfficer() {
    if (shieldOfficers.length > 0) {
    const shieldOfficer = shieldOfficers.pop();
    playerDiscardPile.push(shieldOfficer);
    console.log(`<span class="console-highlights">S.H.I.E.L.D. Officer</span> gained.`);
    updateGameBoard();
  } else {
    console.log("No S.H.I.E.L.D. Officers left to recruit.");
  }
}

function sewersWound() {
if (currentVillainLocation === 4) {
onscreenConsole.log('Fight! You defeated <span class="console-highlights">The Lizard</span> in the Sewers.');
drawWound();
} else {
onscreenConsole.log('Fight! You defeated <span class="console-highlights">The Lizard</span> outside of the Sewers and avoid gaining a Wound.');
}
}

function streetsOrBridgeBystanders() {
if (currentVillainLocation === 0 || currentVillainLocation === 1) {
onscreenConsole.log(`Fight! You fought <span class="console-highlights">Abomination</span> on the Streets or Bridge.`);
rescueBystander();
rescueBystander();
rescueBystander();
} else {
onscreenConsole.log(`Fight! You fought <span class="console-highlights">Abomination</span> outside of the Streets or Bridge. No Bystanders rescued.`);
}
}

function KOAllSHIELD() {
onscreenConsole.log(`Fight! KO all your <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> Heroes.`);

    let shieldKOCounter = 0; // Counter to track how many S.H.I.E.L.D. cards are KO'd

    // KO S.H.I.E.L.D. cards from player's hand
    for (let i = playerHand.length - 1; i >= 0; i--) {
        if (playerHand[i].team === "S.H.I.E.L.D.") {
            // Move the card to the KO pile
            koPile.push(playerHand.splice(i, 1)[0]);
            shieldKOCounter++; // Increment the counter
        }
    }

    // KO S.H.I.E.L.D. cards from cards played this turn
    for (let i = cardsPlayedThisTurn.length - 1; i >= 0; i--) {
        if (cardsPlayedThisTurn[i].team === "S.H.I.E.L.D.") {
            // Move the card to the KO pile
            koPile.push(cardsPlayedThisTurn.splice(i, 1)[0]);
            shieldKOCounter++; // Increment the counter
        }
    }

    if (shieldKOCounter > 0) {
        const cardText = shieldKOCounter === 1 ? 'card' : 'cards'; // Determine singular or plural
        onscreenConsole.log(`KO'd ${shieldKOCounter} <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> ${cardText}.`);
    } else {
        onscreenConsole.log('No <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> cards available to KO.');
    }
}

function rooftopsOrBridgeKOs() {
if (currentVillainLocation === 0 || currentVillainLocation === 2) {
onscreenConsole.log(`Fight! You fought <span class="console-highlights">Whirlwind</span> on the Rooftops or Bridge. KO two of your Heroes.`);
chooseHeroesToKO();
} else {
onscreenConsole.log(`Fight! You fought <span class="console-highlights">Whirlwind</span> outside of the Rooftops or Bridge. No Heroes are KO'd.`);
}
}

function strengthHeroesNumberToKO() {
onscreenConsole.log(`Fight! For each of your <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Heroes, KO one of your Heroes.`);
    return new Promise((resolve, reject) => {
        const availableHeroes = [...cardsPlayedThisTurn, ...playerHand]
            .filter(card => card && card.type === 'Hero');

        if (availableHeroes.length === 0) {
            onscreenConsole.log("No Heroes available to KO.");
            resolve();
            return;
        }

        // Find all Strength Heroes in the player's hand or cards played this turn
        const strengthHeroes = [...cardsPlayedThisTurn, ...playerHand]
            .filter(card => card && card.class1 === 'Strength');

        const numberToKO = strengthHeroes.length;

        if (numberToKO === 0) {
            onscreenConsole.log(`No <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Heroes found. No cards need to be KO'd.`);
            resolve();
            return;
        }

        onscreenConsole.log(`You have ${numberToKO} <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero${numberToKO > 1 ? 'es' : ''}. You must KO ${numberToKO} card${numberToKO > 1 ? 's' : ''}.`);

        if (availableHeroes.length <= numberToKO) {
            availableHeroes.forEach(card => {
                const indexInCardsPlayed = cardsPlayedThisTurn.indexOf(card);
                const indexInHand = playerHand.indexOf(card);

                if (indexInCardsPlayed !== -1) {
                    cardsPlayedThisTurn.splice(indexInCardsPlayed, 1);
                } else if (indexInHand !== -1) {
                    playerHand.splice(indexInHand, 1);
                }

                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            });
            updateGameBoard();
            resolve(); // Resolve immediately after KO'ing
            return;
        }

        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('close-choice-button');
        koButton.textContent = 'KO Selected Heroes';
        koButton.disabled = true;

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'KO Heroes';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = `Select ${numberToKO} Hero${numberToKO > 1 ? 'es' : ''} to KO.`;

        let selectedHeroes = [];

        function updateKOButton() {
            if (selectedHeroes.length === numberToKO) {
                koButton.disabled = false;
                koButton.style.display = 'inline-block';
            } else {
                koButton.disabled = true;
                koButton.style.display = 'none';
            }
        }

        function toggleHeroSelection(card, listItem) {
            const index = selectedHeroes.indexOf(card);
            if (index > -1) {
                selectedHeroes.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedHeroes.length >= numberToKO) return;
                selectedHeroes.push(card);
                listItem.classList.add('selected');
            }

            updateKOButton();
            console.log('Selected Heroes for KO:', selectedHeroes.map(hero => hero.name));
        }

        availableHeroes.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = card.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => toggleHeroSelection(card, li);
            cardsList.appendChild(li);
        });

        koButton.onclick = () => {
            if (selectedHeroes.length === numberToKO) {
                selectedHeroes.forEach(card => {
                    const indexInCardsPlayed = cardsPlayedThisTurn.indexOf(card);
                    const indexInHand = playerHand.indexOf(card);

                    if (indexInCardsPlayed !== -1) {
                        cardsPlayedThisTurn.splice(indexInCardsPlayed, 1);
                    } else if (indexInHand !== -1) {
                        playerHand.splice(indexInHand, 1);
                    }

                    koPile.push(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
                });
                closePopup();
                updateGameBoard();
                resolve(); // Resolve after the user has completed the action
            } else {
                alert(`You must select ${numberToKO} Hero${numberToKO > 1 ? 'es' : ''} to KO.`);
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'No Thanks!';
            koButton.style.display = 'none';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

function koAnyNumberOfWounds() {

onscreenConsole.log(`Fight! KO any number of Wounds from your hand or discard pile.`);

    return new Promise((resolve) => {
        const discardPileList = document.getElementById("discard-pile-cards");
        const handList = document.getElementById("hand-cards");

        discardPileList.innerHTML = "";
        handList.innerHTML = "";

        const discardPile = playerDiscardPile.filter(card => card.type === "Wound");
        const hand = playerHand.filter(card => card.type === "Wound");

        const hoverText = document.getElementById("card-ko-card-popupHoverText");
        const KOImage = document.getElementById("card-ko-popup-image");

        if (discardPile.length === 0 && hand.length === 0) {
            onscreenConsole.log("No Wounds in your hand or discard pile to KO.");
            resolve();
            return;
        }

        discardPile.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            // On mouseover, change the hero image to the selected card's image
            li.onmouseover = () => {
                KOImage.src = card.image;  // Dynamically change the image source
                KOImage.style.display = 'block';  // Ensure the image is visible
                hoverText.style.display = 'none';
            };

            // On mouseout, reset the image to its default state (or hide it)
            li.onmouseout = () => {
                KOImage.src = '';  // Clear the image source
                KOImage.style.display = 'none';  // Hide the image
                hoverText.style.display = 'block';
            };

            li.onclick = () => toggleWoundSelection(card, "discard", li);
            discardPileList.appendChild(li);
        });

        hand.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            // On mouseover, change the hero image to the selected card's image
            li.onmouseover = () => {
                KOImage.src = card.image;  // Dynamically change the image source
                KOImage.style.display = 'block';  // Ensure the image is visible
                hoverText.style.display = 'none';
            };

            // On mouseout, reset the image to its default state (or hide it)
            li.onmouseout = () => {
                KOImage.src = '';  // Clear the image source
                KOImage.style.display = 'none';  // Hide the image
                hoverText.style.display = 'block';
            };

            li.onclick = () => toggleWoundSelection(card, "hand", li);
            handList.appendChild(li);
        });

        let selectedWounds = [];

        // Function to toggle selection of wounds from hand or discard
        function toggleWoundSelection(card, location, listItem) {
            const index = selectedWounds.indexOf(card);
            if (index > -1) {
                selectedWounds.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                selectedWounds.push(card);
                listItem.classList.add('selected');
            }
            console.log('Selected Wounds for KO:', selectedWounds.map(c => c.name));
        }

        // Display the KO popup
        document.getElementById("card-ko-popup").style.display = "block";
        document.getElementById("modal-overlay").style.display = "block";
 document.getElementById("card-ko-popup-h2").innerHTML = "Select any number of Wounds from your hand and/or discard pile to KO.";



        document.getElementById("close-ko-button").style.display = 'block';

        // Fix: Use the correct button ("close-ko-button") for KO action
        document.getElementById("close-ko-button").onclick = () => {
            selectedWounds.forEach(card => {
                if (playerHand.includes(card)) {
                    playerHand.splice(playerHand.indexOf(card), 1);
                } else if (playerDiscardPile.includes(card)) {
                    playerDiscardPile.splice(playerDiscardPile.indexOf(card), 1);
                }

                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlight">${card.name}</span> has been KO'd.`);
            });
            closePopup();
            document.getElementById("close-ko-button").style.display = 'none';
            updateGameBoard();
            resolve();
        };

        // Function to close the KO popup and reset the UI
        function closePopup() {
            document.getElementById("card-ko-popup").style.display = "none";
            document.getElementById("modal-overlay").style.display = "none";
document.getElementById("card-ko-popup-h2").innerHTML = "Do you wish to KO a card from your Discard Pile or Hand to rescue a Bystander?";
        }
    });
}

function bankRobbery() {
    const cityIndex = 3; // Specifically targeting city index 3

    return new Promise((resolve, reject) => {
        try {
            // Check if there is a villain at the specified city index
            if (city[cityIndex] && city[cityIndex].type === 'Villain') {

                // Check if there are any bystanders left in the deck
                if (bystanderDeck.length === 0) {
                    onscreenConsole.log('No Bystanders left to capture.');
                    resolve(); // Resolve the promise to continue after logging
                    return;
                }

                // Attach the first bystander if available
                const firstBystander = bystanderDeck.pop();
                attachBystanderToVillain(cityIndex, firstBystander);
                console.log(`Bystander assigned to ${city[cityIndex].name} at index ${cityIndex}.`);

                // Attach the second bystander if available
                if (bystanderDeck.length > 0) {
                    const secondBystander = bystanderDeck.pop();
                    attachBystanderToVillain(cityIndex, secondBystander);
                    console.log(`Second bystander assigned to ${city[cityIndex].name} at index ${cityIndex}.`);
                } else {
                    onscreenConsole.log('Only one Bystander was available to capture.');
                }

                // Update the game state/UI as needed
                updateGameBoard();
                resolve(); // Resolve the promise after the board is updated

            } else {
                console.log(`No villain found at city index ${cityIndex}. Bystanders not assigned.`);
                resolve(); // Resolve even if no villain is found
            }
        } catch (error) {
            console.error('Error in bankRobbery function:', error);
            reject(error); // Reject the promise if an error occurs
        }
    }).then(() => {
        // Draw the next villain card after everything is done
        drawVillainCard();
    }).catch(error => {
        // Handle any errors that occurred
        console.error('Error during bankRobbery process:', error);
    });
}


function drawMultipleVillainCards(count) {
  let promiseChain = Promise.resolve();

  for (let i = 0; i < count; i++) {
    promiseChain = promiseChain.then(() => drawVillainCard());
  }

  return promiseChain;
}

// Example for drawing two villain cards
function doubleVillainDraw() {
  onscreenConsole.log(`<span style="font-style:italic">Playing the top two cards of the Villain Deck...</span>`);

  drawMultipleVillainCards(2).then(() => {
    console.log("Both villain cards have been played.");
  }).catch((error) => {
    console.error("Error during double villain draw:", error);
  });
}




function darkPortal() {
    const twistCount = koPile.filter(item => item.type === 'Scheme Twist').length;

    switch (twistCount) {
        case 1:
            console.log('A dark portal opens beneath the Mastermind. They gain 1 Attack.');
            mastermindPermBuff++;
            break;
        case 2:
            console.log('A dark portal opens beneath the Bridge. Villains on the Bridge gain 1 Attack.');
            city1PermBuff++;
            break;
        case 3:
            console.log('A dark portal opens beneath the Streets. Villains on the Streets gain 1 Attack.');
            city2PermBuff++;
            break;
        case 4:
            console.log('A dark portal opens above the Rooftops. Villains on the Rooftops gain 1 Attack.');
            city3PermBuff++;
            break;
        case 5:
            console.log('A dark portal opens within the Bank. Villains in the Bank gain 1 Attack.');
            city4PermBuff++;
            break;
        case 6:
            console.log('A dark portal opens within the Sewers. Villains within the Sewers gain 1 Attack.');
            city5PermBuff++;
            break;
        case 7:
            console.log('Dark portals have opened across the entire city!');
            break;
        default:
            console.log('No Scheme Twist effect at this time.');
            break;
    }

    updateGameBoard(); // Assuming this function updates the game board or UI
}


function cosmicCube() {
    const twistCount = koPile.filter(item => item.type === 'Scheme Twist').length;

    if (twistCount < 5) {
        console.log('Nothing happens at this time.');
    } else if (twistCount <= 6) {
        console.log('Scheme Twist!');
        drawWound();
    } else if (twistCount === 7) {
        console.log('Scheme Twist!');
        drawWound();
        drawWound();
        drawWound();
    } else {
        console.log('No other Scheme Twist effects.');
    }

    updateGameBoard(); // Update game board after changes
}


function KOAllHeroesInHQ() {
    let heroesKOCounter = 0;

    for (let i = hq.length - 1; i >= 0; i--) {
        if (hq[i] && hq[i].type === "Hero") {
            koPile.push(hq.splice(i, 1)[0]);
            heroesKOCounter++;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (!hq[i] && heroDeck.length > 0) {
            hq[i] = heroDeck.pop();
        }
    }

    if (heroesKOCounter > 0) {
        const cardText = heroesKOCounter === 1 ? 'Hero' : 'Heroes';
        console.log(`KO'd ${heroesKOCounter} ${cardText} from the HQ.`);
    } else {
        console.log('No Heroes found in the HQ to KO.');
    }

    updateGameBoard(); // Update game board after changes
}


function killbotAttackIncrease() {
    killbotAttack++;
    console.log(`Killbot attack increased to ${killbotAttack}`);
    updateGameBoard(); // Optional, if this should update the UI
}

async function highestCostHeroSkrulled() {
    // Identify the heroes in HQ
    const heroesInHQ = hq.filter(card => card && card.type === 'Hero');

    // Find the highest cost among the heroes
    const maxCost = Math.max(...heroesInHQ.map(hero => hero.cost));

    // Filter heroes with the highest cost
    const highestCostHeroes = heroesInHQ.filter(hero => hero.cost === maxCost);

    // If there's only one hero with the highest cost, capture it automatically
    if (highestCostHeroes.length === 1) {
        heroSkrulled(highestCostHeroes[0]);
    } else if (highestCostHeroes.length > 1) {
        // If there are multiple heroes with the same highest cost, prompt the player to choose
        const selectedHero = await showHeroSelectionSkrullPopup(highestCostHeroes);
        heroSkrulled(selectedHero);
    } else {
        console.log("No heroes available in HQ.");
    }
}

function heroSkrulled(hero) {
    hero.skrulled = true;
    hero.originalAttack = hero.attack;
    hero.cost += 2; // Increase cost
    hero.attack = hero.cost; // Assign the increased cost to attack
    hero.type = 'Villain';
    hero.fightEffect = 'unskrull';


    // Move the hero to the Villain deck
    villainDeck.push(hero);

    // Replace the hero's HQ space with the top card from the hero deck, if available
    const heroIndex = hq.indexOf(hero);
    hq[heroIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;

    // Check if the HQ space is empty after drawing
    if (!hq[heroIndex]) {
        showHeroDeckEmptyPopup();
    }

    drawVillainCard();

    // Attach an overlay to the villain
    hero.overlayText = `SKRULL`;
hero.overlayTextAttack = `${hero.attack}`;

    // Update the game board to reflect the changes
    updateGameBoard();
}

function showHeroSelectionSkrullPopup(heroes) {
    return new Promise((resolve, reject) => {
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const selectButton = document.getElementById('close-choice-button');
        selectButton.textContent = 'Select Hero';
        selectButton.disabled = true;

        const popupTitle = popup.querySelector('h2');
        popupTitle.textContent = 'Skrull Hero';
        cardsList.innerHTML = '';
        const instructionsDiv = document.getElementById('context');
        instructionsDiv.textContent = 'Choose a Hero from the HQ to enter the city as a Skrull.';

        let selectedHero = null;

        function updateSelectButton() {
            if (selectedHero) {
                selectButton.disabled = false;
                selectButton.style.display = 'inline-block';
            } else {
                selectButton.disabled = true;
                selectButton.style.display = 'none';
            }
        }

        function toggleHeroSkrullSelection(hero, listItem) {
            if (selectedHero === hero) {
                selectedHero = null;
                listItem.classList.remove('selected');
            } else {
                selectedHero = hero;
                Array.from(cardsList.children).forEach(li => li.classList.remove('selected'));
                listItem.classList.add('selected');
            }

            updateSelectButton();
            console.log('Selected Hero for capture:', selectedHero ? selectedHero.name : 'None');
        }

        heroes.forEach(hero => {
            const li = document.createElement('li');
            li.textContent = hero.name;
            li.setAttribute('data-card-id', hero.id);
const heroImage = document.getElementById('hero-one-location-image');
const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
// On mouseover, change the hero image to the selected card's image
    li.onmouseover = () => {
        heroImage.src = hero.image;  // Dynamically change the image source
        heroImage.style.display = 'block';  // Ensure the image is visible
oneChoiceHoverText.style.display = 'none';
    };

    // On mouseout, reset the image to its default state (or hide it)
    li.onmouseout = () => {
        heroImage.src = '';  // Clear the image source
        heroImage.style.display = 'none';  // Hide the image
oneChoiceHoverText.style.display = 'block';
    };

            li.onclick = () => toggleHeroSkrullSelection(hero, li);
            cardsList.appendChild(li);
        });

        selectButton.onclick = () => {
            if (selectedHero) {
                resolve(selectedHero);
                closePopup();
            } else {
                alert("You must select a Hero to enter the city as a Skrull.");
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            selectButton.textContent = 'No Thanks!';
            selectButton.style.display = 'none';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
    });
}

function unskrull(villainCard) {
    if (!villainCard) {
        console.error("Error: villainCard is undefined or null");
        return;
    }

    villainCard.cost -= 2;
    villainCard.attack = villainCard.originalAttack;
    villainCard.skrulled = false;
    villainCard.fightEffect = '';
villainCard.type = 'Hero';
villainCard.overlayTextAttack = '';

    playerDiscardPile.push(villainCard);
    console.log(`${villainCard.name} has been defeated and rescued from the Skrulls. They have been added to your Discard Pile.`);
    updateGameBoard();
}
