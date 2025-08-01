// cardAbilities.js

function extraDraw() {
    // Check if both playerDeck and playerDiscardPile are empty
    if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
        console.log("No cards available to draw.");
        onscreenConsole.log("No cards available to draw.");
        return false; // Indicate failure
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

    return true; // Indicate success
}

function WolverineExtraDraw() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
extraDraw();
}

function EmmaFrostExtraDraw() {
    return new Promise((resolve) => {
        const previousCards = cardsPlayedThisTurn.slice(0, -1);
        const cardsYouHave = [
            ...playerHand,
            ...previousCards.filter(card => 
                !card.isCopied && 
                !card.sidekickToDestroy
            )
        ];

        const XMenCount = cardsYouHave.filter(item => item.team === "X-Men").length;
        
        if (XMenCount === 0) {
            onscreenConsole.log(`You are unable to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`);
            resolve();
            return;
        }

        setTimeout(() => {
            const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                "DO YOU WISH TO REVEAL AN <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> HERO?",
                "Yes",
                "No"
            );

            document.getElementById('heroAbilityHoverText').style.display = 'none';
            
            const cardImage = document.getElementById('hero-ability-may-card');
            cardImage.src = 'Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp'; // Update with Emma Frost image
            cardImage.style.display = 'block';

            confirmButton.onclick = () => {
                onscreenConsole.log(`<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero revealed.`);
                extraDraw();
                hideHeroAbilityMayPopup();
                document.getElementById('heroAbilityHoverText').style.display = 'block';
                cardImage.style.display = 'none';
                resolve();
            };

            denyButton.onclick = () => {
                onscreenConsole.log(`You have chosen not to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`);
                hideHeroAbilityMayPopup();
                document.getElementById('heroAbilityHoverText').style.display = 'block';
                cardImage.style.display = 'none';
                resolve();
            };
        }, 10);
    });
}

function StormExtraDraw() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
extraDraw();
}

function IronManExtraDraw() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
extraDraw();
}



function WolverineBonusAttackPerExtraCard() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
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
  // Find all invulnerable cards and track their location
  const invulnerableCards = [
    ...playerHand.filter(card => card.invulnerability === 'revealWound').map(card => ({...card, location: 'Hand'})),
	...playerHand.filter(card => card.invulnerability === 'discardWound').map(card => ({...card, location: 'Hand'})),
    ...cardsPlayedThisTurn.filter(card => card.invulnerability === 'revealWound').map(card => ({...card, location: 'Already Played'}))
  ];

  if (invulnerableCards.length === 0) {
    defaultWoundDraw();
    return;
  }

  showInvulnerabilityChoicePopup(invulnerableCards);
}

function showInvulnerabilityChoicePopup(invulnerableCards) {
    return new Promise((resolve) => {
        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Avoid Wound';
        instructionsDiv.innerHTML = 'Select a card to avoid gaining a Wound.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let activeImage = null;

        // Update confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = 'Select a card to avoid gaining a Wound.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be used to avoid gaining a Wound.`;
            }
        }

        // Show/hide card image
        function updateCardImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                listItem.classList.remove('selected');
                updateCardImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                listItem.classList.add('selected');
                updateCardImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with invulnerable cards
        invulnerableCards.forEach(card => {
            const li = document.createElement('li');
            li.textContent = `${card.name} (${card.location})`;
            li.dataset.cardId = card.id;

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard) {
                triggerInvulnerabilityEffect(selectedCard);
                closePopup();
                resolve(true);
            }
        };

        // Handle take wound option
        const takeWoundButton = document.getElementById('close-choice-button');
        takeWoundButton.style.display = 'block';
        takeWoundButton.textContent = 'Take Wound Instead';
        takeWoundButton.onclick = () => {
            defaultWoundDraw();
            closePopup();
            resolve(false);
        };
      

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

          takeWoundButton.textContent = 'No Thanks!';
          takeWoundButton.style.display = 'none';

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
            updateGameBoard();
        }
    });
}

// Helper function to find the original card object
function getOriginalCard(cardWithLocation) {
  if (cardWithLocation.location === 'Hand') {
    return playerHand.find(c => c.name === cardWithLocation.name);
  } else {
    return cardsPlayedThisTurn.find(c => c.name === cardWithLocation.name);
  }
}

function triggerInvulnerabilityEffect(card) {
  switch (card.name) {
    case "Captain America - Diving Block":
      drawInsteadOfWound();
      break;
    case "Skids":
      skidsWoundInvulnerability(card); // Now properly passes the card reference
      break;
    default:
      console.warn(`No effect defined for ${card.name}'s Wound invulnerability.`);
      defaultWoundDraw();
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
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
  drawTwo();
}

function WolverineDrawTwo() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
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
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log('Bystander rescued.');
    updateGameBoard();
  } else {
    console.log("No bystanders left in the deck to rescue.");
onscreenConsole.log('No Bystanders left to rescue.');
  }
}

 

function BlackWidowRescueBystanderByKO() {
  return new Promise((resolve) => {
    onscreenConsole.log(`<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);

    // Check if there are any bystanders available
    if (bystanderDeck.length === 0) {
        console.log('There are no Bystanders available to be rescued.');
        onscreenConsole.log('There are no Bystanders available to be rescued.');
        resolve();
        return;
    }

            if (playerHand.length === 0 && playerDiscardPile.length === 0) {
                console.log("No cards in hand to discard.");
                onscreenConsole.log(`No cards available to be KO'd.`);
                updateGameBoard();
                resolve(false);
                return;
            }

    const popup = document.getElementById("card-ko-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const discardPileList = document.getElementById("discard-pile-cards");
    const handList = document.getElementById("hand-cards");
    const confirmButton = document.getElementById("close-ko-button");
    const hoverText = document.getElementById("card-ko-card-popupHoverText");
    const KOImage = document.getElementById("card-ko-popup-image");
    const context = document.getElementById("card-ko-popup-h2");

    // Initialize UI
    context.innerHTML = `Select a card to KO and rescue a <span class="bold-spans">Bystander</span>`;
    discardPileList.innerHTML = "";
    handList.innerHTML = "";
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;
    confirmButton.textContent = 'Confirm KO';
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';

    let selectedCard = null;
    let selectedLocation = null; // 'hand' or 'discard'
    let activeImage = null;

    // Update the confirm button state
    function updateConfirmButton() {
        confirmButton.disabled = selectedCard === null;
    }

    // Update instructions
    function updateInstructions() {
        if (selectedCard === null) {
            context.innerHTML = `Select a card to KO and rescue a <span class="bold-spans">Bystander</span>`;
        } else {
            context.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd to rescue a Bystander.`;
        }
    }

    // Show/hide card image
    function updateCardImage(card) {
        if (card) {
            KOImage.src = card.image;
            KOImage.style.display = 'block';
            hoverText.style.display = 'none';
            activeImage = card.image;
        } else {
            KOImage.src = '';
            KOImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;
        }
    }

    // Toggle card selection
    function toggleCardSelection(card, location, listItem) {
        if (selectedCard === card) {
            // Deselect if same card clicked
            selectedCard = null;
            selectedLocation = null;
            listItem.classList.remove('selected');
            updateCardImage(null);
        } else {
            // Clear previous selection if any
            if (selectedCard) {
                const prevListItem = document.querySelector('li.selected');
                if (prevListItem) prevListItem.classList.remove('selected');
            }
            // Select new card
            selectedCard = card;
            selectedLocation = location;
            listItem.classList.add('selected');
            updateCardImage(card);
        }

        updateConfirmButton();
        updateInstructions();
    }

    // Populate discard pile
    playerDiscardPile.forEach((card) => {
      const li = document.createElement("li");
      li.textContent = card.name;
      li.setAttribute('data-card-id', card.id);

      li.onmouseover = () => {
          if (!activeImage) {
              KOImage.src = card.image;
              KOImage.style.display = 'block';
              hoverText.style.display = 'none';
          }
      };

      li.onmouseout = () => {
          if (!activeImage) {
              KOImage.src = '';
              KOImage.style.display = 'none';
              hoverText.style.display = 'block';
          }
      };

      li.onclick = () => toggleCardSelection(card, 'discard', li);
      discardPileList.appendChild(li);
    });

    // Populate hand
    playerHand.forEach((card) => {
      const li = document.createElement("li");
      li.textContent = card.name;
      li.setAttribute('data-card-id', card.id);

      li.onmouseover = () => {
          if (!activeImage) {
              KOImage.src = card.image;
              KOImage.style.display = 'block';
              hoverText.style.display = 'none';
          }
      };

      li.onmouseout = () => {
          if (!activeImage) {
              KOImage.src = '';
              KOImage.style.display = 'none';
              hoverText.style.display = 'block';
          }
      };

      li.onclick = () => toggleCardSelection(card, 'hand', li);
      handList.appendChild(li);
    });

    // Handle confirmation
    confirmButton.onclick = () => {
        if (selectedCard && selectedLocation) {
            // Perform the KO and rescue
            if (selectedLocation === 'discard') {
                const index = playerDiscardPile.indexOf(selectedCard);
                if (index !== -1) playerDiscardPile.splice(index, 1);
            } else {
                const index = playerHand.indexOf(selectedCard);
                if (index !== -1) playerHand.splice(index, 1);
            }
            
            koPile.push(selectedCard);
            const bystanderCard = bystanderDeck.pop();
            victoryPile.push(bystanderCard);
            
            onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> KO'd. 1 Bystander rescued.`);
            closePopup();
            updateGameBoard();
            resolve();
        }
    };

  // Handle cancellation
        const closeButton = document.getElementById('no-thanks-button');
        closeButton.style.display = 'inline-block';
        closeButton.onclick = () => {
            console.log(`No wound was KO'd.`);
            onscreenConsole.log(`You chose not to KO any cards.`);
            closePopup();
            resolve(false);
        };

        const closeXButton = document.getElementById('card-ko-popup-close');
            closeXButton.onclick = () => {
            console.log(`No wound was KO'd.`);
            onscreenConsole.log(`You chose not to KO any cards.`);
            closePopup();
            resolve(false);
        };


    function closePopup() {
        context.innerHTML = `Do you wish to KO a card from your Discard Pile or Hand to rescue a <span class="bold-spans">S.H.I.E.L.D. Officer</span>?`;
        confirmButton.style.display = 'none';
        confirmButton.disabled = true;
        KOImage.src = '';
        KOImage.style.display = 'none';
        hoverText.style.display = 'block';
        activeImage = null;
        popup.style.display = 'none';
        modalOverlay.style.display = 'none';
    }
  });
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
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}


function RogueBonusAttack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}


function NickFuryBonusAttack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
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
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function HulkSmashBonusAttack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
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
 onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
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

 onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`You have played ${techCount} ${techText}. +${techCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  
  bonusAttack();
}


function HawkeyeBonusAttack() {
 onscreenConsole.log(`<img src="Visual Assets/Icons/Avengers.svg" alt="Avengers Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`); 
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
    `<img src="Visual Assets/Icons/Avengers.svg" alt="Avengers Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`); 
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
    `<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
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
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
bonusRecruit();
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

onscreenConsole.log(`Special Ability: You have played ${oddCostCount} ${oddCostText} with an odd-numbered <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${oddCostCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

  updateGameBoard();
}

function CaptainAmericaCountUniqueColorsAndAddAttack() {
  const allCards = [
    ...playerHand,  // Include all cards from hand
    ...cardsPlayedThisTurn.filter(card => 
        !card.isCopied && 
        !card.sidekickToDestroy
    )
];
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
onscreenConsole.log(`Special Ability: You have ${uniqueColorCount} unique colors. +${uniqueColorCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
}

function CaptainAmericaCountUniqueColorsAndAddRecruit() {
    const allCards = [
    ...playerHand,  // Include all cards from hand
    ...cardsPlayedThisTurn.filter(card => 
        !card.isCopied && 
        !card.sidekickToDestroy
    )
];

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
onscreenConsole.log(`Special Ability: You have ${uniqueColorCount} unique colors. +${uniqueColorCount} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
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
      cardImage.src = 'Visual Assets/Heroes/Reskinned Core/Core_Deadpool_HeyCanIGetADoOver.webp';

      confirmButton.onclick = async function () {
        console.log("Player hand before discard:", playerHand); // Debugging: Log player hand

        // Temporary array to store cards returned to the hand
        const returnedCards = [];

        // Discard all cards in hand (except those returned via invulnerability)
        await checkDiscardForInvulnerability(playerHand, returnedCards);

        // Clear the player's hand and draw four new cards
        playerHand = [];
        extraDraw();
        extraDraw();
        extraDraw();
        extraDraw();

        // Add any returned cards back to the hand
        playerHand.push(...returnedCards);

        console.log('Hand discarded and redrawn. Updated playerHand:', playerHand); // Debugging: Log updated playerHand
        onscreenConsole.log('Hand discarded and redrawn.');

        // Update the game state
        updateGameBoard();

        // Hide the popup and card image
        hideHeroAbilityMayPopup();
        cardImage.style.display = 'none';
        hoverText.style.display = 'block';

        resolve(); // Resolve the promise after everything is done
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

onscreenConsole.log(`<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);

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


cardImage.src = 'Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_ShadowedThoughts.webp';

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
document.getElementById('hero-ability-may-h2').innerHTML = 'Hero Ability!';
const cardImage = document.getElementById('hero-ability-may-card');
cardImage.style.display = 'none';
updateGameBoard();

}

function drawInsteadOfWound() {
  
onscreenConsole.log(`Special Ability: You have avoided gaining a Wound.`);
      extraDraw(); // Logic for drawing the extra card
     
}



function DeadpoolChooseToGainWound() {
  return new Promise(async (resolve) => {
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
      WoundImage.src = "Visual Assets/Other/Wound.webp";
      imageText.style.display = 'none';
    }

    // Confirm button handling
    confirmButton.onclick = async function() {
      await drawWound(); // Let drawWound handle all the logic
      hideHeroAbilityMayPopup();
      if (WoundImage && imageText) {
        imageText.style.display = 'block';
        WoundImage.src = "";
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
        WoundImage.src = "";
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
      checkDiscardForInvulnerability(topCardPlayerDeck);
      console.log(`You discarded ${topCardPlayerDeck.name}.`);
onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been discarded.`);
     updateGameBoard();
      hideHeroAbilityMayPopup();
hoverText.style.display = 'block';
cardImage.style.display = 'none';
      resolve();
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

const cardImage = document.getElementById('hero-ability-may-card');
const imageHoverText = document.getElementById('heroAbilityHoverText');
const popupTitle = document.getElementById('hero-ability-may-h2');

popupTitle.innerHTML = `FIGHT EFFECT!`;

cardImage.src = topCardPlayerDeck.image;
cardImage.style.display = 'block';
imageHoverText.style.display = 'none';


    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: <span class="console-highlights">${topCardPlayerDeck.name}</span>. Do you wish to KO it or put it back?`,
      "KO",
      "Put It Back"
    );

    confirmButton.onclick = function() {
      playerDeck.pop();
      koPile.push(topCardPlayerDeck);
      onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`);
     updateGameBoard();
      hideHeroAbilityMayPopup();
      popupTitle.innerHTML = `Hero Ability!`;
cardImage.src = '';
cardImage.style.display = 'none';
imageHoverText.style.display = 'block';

      resolve();
    };

    denyButton.onclick = function() {
      onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`);
      updateGameBoard();
      hideHeroAbilityMayPopup();
      popupTitle.innerHTML = `Hero Ability!`;
cardImage.src = '';
cardImage.style.display = 'none';
imageHoverText.style.display = 'block';
      resolve();
    };
  });
}

function Gambit2ndTopCardDiscardOrPutBack() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability not activated - "each other player" Hero effects do not apply in Solo play.`);
}

function HawkeyeDontDrawOrDiscard() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability not activated - "each other player" Hero effects do not apply in Solo play.`);
}

function rescueThreeBystanders() {
  rescueExtraBystanders += 3;
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
        // Get wounds from both locations
        const discardPileWounds = playerDiscardPile.filter(card => card.type === 'Wound');
        const handWounds = playerHand.filter(card => card.type === 'Wound');

        // If no wounds are found, log and resolve
        if (discardPileWounds.length === 0 && handWounds.length === 0) {
            console.log('No Wounds');
            onscreenConsole.log('No Wounds available to KO.');
            resolve(false);
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-ko-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const discardPileList = document.getElementById('discard-pile-cards');
        const handList = document.getElementById('hand-cards');
        const confirmButton = document.getElementById('close-ko-button');
        const hoverText = document.getElementById('card-ko-card-popupHoverText');
        const KOImage = document.getElementById('card-ko-popup-image');
        const context = document.getElementById('card-ko-popup-h2');

        // Initialize UI
        context.innerHTML = 'Select a Wound to KO and draw a card';
        discardPileList.innerHTML = '';
        handList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'KO Wound';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        // Initialize image display
        KOImage.src = '';
        KOImage.style.display = 'none';
        hoverText.style.display = 'block';

        let selectedWound = null;
        let selectedLocation = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedWound === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedWound === null) {
                context.innerHTML = 'Select a Wound to KO and draw a card';
            } else {
                context.innerHTML = `Selected: <span class="console-highlights">${selectedWound.name}</span> will be KO'd from your ${selectedLocation} to draw a card.`;
            }
        }

        // Show/hide wound image
        function updateWoundImage(card) {
            if (card) {
                KOImage.src = card.image;
                KOImage.style.display = 'block';
                hoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                KOImage.src = '';
                KOImage.style.display = 'none';
                hoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle wound selection
        function toggleWoundSelection(wound, location, listItem) {
            if (selectedWound === wound && selectedLocation === location) {
                // Deselect if same wound clicked
                selectedWound = null;
                selectedLocation = null;
                listItem.classList.remove('selected');
                updateWoundImage(null);
            } else {
                // Clear previous selection if any
                if (selectedWound) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new wound
                selectedWound = wound;
                selectedLocation = location;
                listItem.classList.add('selected');
                updateWoundImage(wound);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate discard pile list
        discardPileWounds.forEach((wound) => {
            const li = document.createElement('li');
            li.textContent = wound.name;
            li.setAttribute('data-card-id', wound.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    KOImage.src = wound.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    KOImage.src = '';
                    KOImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleWoundSelection(wound, 'discard pile', li);
            discardPileList.appendChild(li);
        });

        // Populate hand list
        handWounds.forEach((wound) => {
            const li = document.createElement('li');
            li.textContent = wound.name;
            li.setAttribute('data-card-id', wound.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    KOImage.src = wound.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    KOImage.src = '';
                    KOImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleWoundSelection(wound, 'hand', li);
            handList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedWound && selectedLocation) {
                // Remove wound from its location
                if (selectedLocation === 'discard pile') {
                    const index = playerDiscardPile.indexOf(selectedWound);
                    if (index !== -1) playerDiscardPile.splice(index, 1);
                } else {
                    const index = playerHand.indexOf(selectedWound);
                    if (index !== -1) playerHand.splice(index, 1);
                }

                // Add to KO pile and draw card
                koPile.push(selectedWound);
                extraDraw();

                onscreenConsole.log(`You KO'd <span class="console-highlights">${selectedWound.name}</span> from your ${selectedLocation} and drew a card.`);

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        // Handle cancellation
        const closeButton = document.getElementById('no-thanks-button');
        closeButton.style.display = 'inline-block';
        closeButton.onclick = () => {
            console.log(`No wound was KO'd.`);
            onscreenConsole.log(`You chose not to KO any Wounds.`);
            closePopup();
            resolve(false);
        };

        const closeXButton = document.getElementById('card-ko-popup-close');
            closeXButton.onclick = () => {
            console.log(`No wound was KO'd.`);
            onscreenConsole.log(`You chose not to KO any Wounds.`);
            closePopup();
            resolve(false);
        };

        function closePopup() {
            // Reset UI
            context.innerHTML = `Do you wish to KO a card from your Discard Pile or Hand to draw a card?`;
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            KOImage.src = '';
            KOImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function HulkKoWoundToGainAttack() {
    return new Promise((resolve) => {
        // Get wounds from both locations
        const discardPile = playerDiscardPile.filter(card => card.type === 'Wound');
        const hand = playerHand.filter(card => card.type === 'Wound');

        // If no wounds are found, log and resolve
        if (discardPile.length === 0 && hand.length === 0) {
            onscreenConsole.log('No Wounds available to KO.');
            resolve(false);
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-ko-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const discardPileList = document.getElementById('discard-pile-cards');
        const handList = document.getElementById('hand-cards');
        const confirmButton = document.getElementById('close-ko-button');
        const hoverText = document.getElementById('card-ko-card-popupHoverText');
        const KOImage = document.getElementById('card-ko-popup-image');
        const context = document.getElementById('card-ko-popup-h2');

        // Initialize UI
        context.innerHTML = `Select a Wound to KO and gain +2<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.`;
        discardPileList.innerHTML = '';
        handList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'KO Wound';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        // Set Hulk image
        KOImage.src = "Visual Assets/Heroes/Reskinned Core/Core_Hulk_UnstoppableHulk.webp";
        KOImage.style.display = 'block';
        hoverText.style.display = 'none';

        let selectedWound = null;
        let selectedLocation = null; // 'Hand' or 'Discard Pile'
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedWound === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedWound === null) {
                context.innerHTML = `Select a Wound to KO and gain +2<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>`;
            } else {
                context.innerHTML = `Selected: <span class="console-highlights">${selectedWound.name}</span> will be KO'd from your ${selectedLocation} to gain +2<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.`;
            }
        }

        // Toggle wound selection
        function toggleWoundSelection(wound, location, listItem) {
            if (selectedWound === wound && selectedLocation === location) {
                // Deselect if same wound clicked
                selectedWound = null;
                selectedLocation = null;
                listItem.classList.remove('selected');
            } else {
                // Clear previous selection if any
                if (selectedWound) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new wound
                selectedWound = wound;
                selectedLocation = location;
                listItem.classList.add('selected');
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate discard pile list
        discardPile.forEach((wound) => {
            const li = document.createElement('li');
            li.textContent = wound.name;
            li.setAttribute('data-card-id', wound.id);

            li.onmouseover = () => {
                KOImage.src = wound.image;
                KOImage.style.display = 'block';
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    KOImage.src = "Visual Assets/Heroes/Reskinned Core/Core_Hulk_UnstoppableHulk.webp";
                }
            };

            li.onclick = () => toggleWoundSelection(wound, 'Discard Pile', li);
            discardPileList.appendChild(li);
        });

        // Populate hand list
        hand.forEach((wound) => {
            const li = document.createElement('li');
            li.textContent = wound.name;
            li.setAttribute('data-card-id', wound.id);

            li.onmouseover = () => {
                KOImage.src = wound.image;
                KOImage.style.display = 'block';
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    KOImage.src = "Visual Assets/Heroes/Reskinned Core/Core_Hulk_UnstoppableHulk.webp";
                }
            };

            li.onclick = () => toggleWoundSelection(wound, 'Hand', li);
            handList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedWound && selectedLocation) {
                // Remove wound from its location
                if (selectedLocation === 'Discard Pile') {
                    const index = playerDiscardPile.indexOf(selectedWound);
                    if (index !== -1) playerDiscardPile.splice(index, 1);
                } else {
                    const index = playerHand.indexOf(selectedWound);
                    if (index !== -1) playerHand.splice(index, 1);
                }

                // Add to KO pile and gain attack
                koPile.push(selectedWound);
                totalAttackPoints += 2;
                cumulativeAttackPoints += 2;

                onscreenConsole.log(`You KO'd a <span class="console-highlights">${selectedWound.name}</span> from your ${selectedLocation}. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
            // Reset UI
            context.innerHTML = `Do you wish to KO a card from your Discard Pile or Hand to rescue a Bystander?`;
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            KOImage.src = '';
            KOImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        // Handle cancellation
        const closeButton = document.getElementById('no-thanks-button');
        closeButton.style.display = 'inline-block';
        closeButton.onclick = () => {
            console.log(`No wound was KO'd.`);
            onscreenConsole.log(`You chose not to KO any Wounds.`);
            closePopup();
            resolve(false);
        };

        const closeXButton = document.getElementById('card-ko-popup-close');
            closeXButton.onclick = () => {
            console.log(`No Wound was KO'd.`);
            onscreenConsole.log(`You chose not to KO any Wounds.`);
            closePopup();
            resolve(false);
        };
    });
}


function SpiderManRevealTopThreeAndReorder() {
  return new Promise((resolve) => {
    // Draw up to three cards
    let holdingArray = [];
    for (let i = 0; i < 3; i++) {
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
          onscreenConsole.log("Shuffled discard pile into deck.");
        } else {
          onscreenConsole.log("No cards available to reveal.");
          break;
        }
      }
      holdingArray.push(playerDeck.pop());
    }

    // Process cards with cost <= 2
    holdingArray = holdingArray.filter(card => {
      if (card.cost <= 2) {
        playerHand.push(card);
        extraCardsDrawnThisTurn++;
        onscreenConsole.log(`<span class="console-highlights">${card.name}</span> (Cost: ${card.cost}) added to hand.`);
        return false;
      }
      return true;
    });

    // Handle remaining cards
    if (holdingArray.length === 0) {
      onscreenConsole.log("All revealed cards cost 2 or less and have been added to your hand.");
      updateGameBoard();
      resolve();
      return;
    }

    if (holdingArray.length === 1) {
      const card = holdingArray[0];
      playerDeck.push(card);
      onscreenConsole.log(`<span class="console-highlights">${card.name}</span> cost more than 2 and was returned to the deck.`);
      updateGameBoard();
      resolve();
      return;
    }

    // Use toggle-and-confirm for multiple cards
    handleCardReturnOrder(holdingArray).then(() => {
      updateGameBoard();
      resolve();
    });
  });
}

async function handleCardReturnOrder(cards) {
  const remainingCards = [...cards];
  const returnedOrder = [];

  while (remainingCards.length > 0) {
    const choice = await showCardSelectionPopup({
      title: 'Return Cards to Deck',
      instructions: remainingCards.length === cards.length 
        ? 'Select the first card to place back on the deck.)' 
        : 'Select the next card to return.',
      items: remainingCards.map(card => ({
        name: card.name,
        image: card.image,
        card: card
      })),
      confirmText: 'CONFIRM SELECTION'
    });

    // Move selected card from remaining to returned
    const selectedIndex = remainingCards.findIndex(c => c === choice.card);
    remainingCards.splice(selectedIndex, 1);
    returnedOrder.unshift(choice.card); // Add to beginning for correct order
  }

  // Add all cards to deck in chosen order (last selected will be on top)
  returnedOrder.forEach(card => {
    playerDeck.push(card);
  });

  // Format console message
  const cardNames = returnedOrder.map(card => 
    `<span class="console-highlights">${card.name}</span>`
  ).reverse(); // Reverse to show from first to last returned

  if (cardNames.length > 1) {
    const last = cardNames.pop();
    onscreenConsole.log(`Returned to deck: ${cardNames.join(', ')} and ${last}`);
  } else {
    onscreenConsole.log(`Returned to deck: ${cardNames[0]}`);
  }
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
    
    simulatedCard.isCopied = true;

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
    return new Promise((resolve) => {
        const cardsWithBystanders = findCardsWithBystanders();
        if (cardsWithBystanders.length === 0) {
            onscreenConsole.log('No targets with Bystanders to rescue.');
            resolve();
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Silent Sniper';
        instructionsDiv.innerHTML = 'Defeat a Villain or Mastermind that has a Bystander.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Rescue Bystander';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = 'Defeat a Villain or Mastermind that has a Bystander.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be defeated.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with cards that have bystanders
        cardsWithBystanders.forEach(card => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
    if (selectedCard) {
        const result = handleBystanderRescueSelection(selectedCard);
        closePopup();
        resolve(result);
    }
};
        

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.textContent = 'Confirm';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function handleBystanderRescueSelection(card) {
    console.log('Card selected for rescue:', card);
    let bystanderCount = 0;
    let bystanderLabel = "Bystander";

    // Ensure card.bystander exists before accessing its length
    if (card.bystander && card.bystander.length) {
        bystanderCount = card.bystander.length;
    }

    bystanderLabel = (bystanderCount === 1) ? "Bystander" : "Bystanders";

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

    updateGameBoard();
    return card; // Return the card for Promise resolution
}

function CyclopsOpticBlastDiscardToPlay() {
    return new Promise((resolve) => {
        // Check if there are any cards to discard
        if (playerHand.length === 0) {
            console.log("No cards in Hand to discard. You are unable to play this card.");
            const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
            playerHand.push(unplayedCard);
            cardsPlayedThisTurn.pop(unplayedCard);
            totalAttackPoints -= unplayedCard.attack;
            totalRecruitPoints -= unplayedCard.recruit;
            cumulativeAttackPoints -= unplayedCard.attack;
            cumulativeRecruitPoints -= unplayedCard.recruit;
            updateGameBoard();
            onscreenConsole.log("No cards in Hand to discard. You are unable to play this card.");
            resolve(false);
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const closeButton = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Discard to Play';
        instructionsDiv.innerHTML = 'Select a card to discard in order to play Cyclops - Optic Blast.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Discard Card';
        closeButton.style.display = 'inline-block';
        closeButton.textContent = 'Cancel';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = 'Select a card to discard in order to play Cyclops - Optic Blast.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be discarded.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, index, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedIndex = index;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with cards in the player's hand
        playerHand.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = async () => {
            if (selectedCard) {
                const discardedCard = playerHand.splice(selectedIndex, 1)[0];
                
                

                onscreenConsole.log(`You have discarded <span class="console-highlights">${discardedCard.name}</span>, allowing you to play <span class="console-highlights">Cyclops - Optic Blast</span>.`);

                closePopup();
                // Handle the discard logic
                await checkDiscardForInvulnerability(discardedCard);
                updateGameBoard();
                resolve(true);
            }
        };

        // Handle cancellation
        closeButton.onclick = () => {
            console.log('Card cannot be played since no card was discarded.');
            onscreenConsole.log(`You have chosen not to discard, preventing you from playing <span class="console-highlights">Cyclops - Optic Blast</span>.`);
            
            const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
            playerHand.push(unplayedCard);
            cardsPlayedThisTurn.pop(unplayedCard);
            totalAttackPoints -= unplayedCard.attack;
            totalRecruitPoints -= unplayedCard.recruit;
            cumulativeAttackPoints -= unplayedCard.attack;
            cumulativeRecruitPoints -= unplayedCard.recruit;
            
            closePopup();
            updateGameBoard();
            resolve(false);
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            closeButton.style.display = 'none';
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

async function checkDiscardForInvulnerability(cards, returnedCards = null) {
  const cardsArray = Array.isArray(cards) ? [...cards] : [cards];
  const cardsToDiscard = [...cardsArray];
  const actuallyDiscarded = []; // Track which cards we've already processed

  for (let i = 0; i < cardsToDiscard.length; i++) {
    const card = cardsToDiscard[i];
    console.log(`Processing card: ${card.name}, Invulnerability: ${card.invulnerability}`);

    if (!card.invulnerability || card.invulnerability === "None") {
      playerDiscardPile.push(card);
      actuallyDiscarded.push(card); // Mark as processed
      console.log(`${card.name} discarded normally.`);
    } else if (card.invulnerability === "Discard") {
      switch (card.name) {
        case "Cyclops - Unending Energy":
          console.log(`Triggering invulnerability effect for: ${card.name}`);
          const returnedCard = await cyclopsDiscardInvulnerability(card);
          if (returnedCard) {
            if (returnedCards) returnedCards.push(returnedCard);
            cardsToDiscard.splice(i, 1);
            i--;
          } else {
            playerDiscardPile.push(card);
            actuallyDiscarded.push(card); // Mark as processed
          }
          break;
        default:
          playerDiscardPile.push(card);
          actuallyDiscarded.push(card); // Mark as processed
          console.log(`No special effect defined for card: ${card.name}`);
          break;
      }
    }
  }

  // Only discard cards that weren't already processed
  for (const card of cardsToDiscard) {
    if (!actuallyDiscarded.includes(card)) {
      playerDiscardPile.push(card);
      console.log(`${card.name} finally discarded.`);
    }
  }
}

function cyclopsDiscardInvulnerability(card) {
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

    // Remove existing event listeners to avoid duplicates
    confirmButton.onclick = null;
    denyButton.onclick = null;

    // Debounce mechanism: Disable buttons temporarily after click
    function disableButtons() {
      confirmButton.disabled = true;
      denyButton.disabled = true;
      setTimeout(() => {
        confirmButton.disabled = false;
        denyButton.disabled = false;
      }, 200); // Reduced delay for better user experience
    }

    confirmButton.onclick = function () {
      disableButtons();
      playerHand.push(card); // Return the card to the player's hand
      console.log(`${card.name} returned to hand. Updated playerHand:`, playerHand); // Debugging: Log updated playerHand
      onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been returned to your hand.`);
      hideHeroAbilityMayPopup();
      cardImage.src = ''; // Clear the image source
      cardImage.style.display = 'none';
      imageHoverText.style.display = 'block';

      // Update the game state after the popup is fully hidden
      setTimeout(() => {
        updateGameBoard(); // Ensure the UI is updated
        resolve(card); // Return the card to be added to the temporary array
      }, 100); // Adjust the delay as needed
    };

    denyButton.onclick = function () {
      disableButtons();
      playerDiscardPile.push(card); // Discard the card
      console.log(`${card.name} remains in the discard pile.`);
      onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been discarded.`);
      hideHeroAbilityMayPopup();
      cardImage.src = ''; // Clear the image source
      cardImage.style.display = 'none';
      imageHoverText.style.display = 'block';

      // Update the game state after the popup is fully hidden
      setTimeout(() => {
        updateGameBoard(); // Ensure the UI is updated
        resolve(null); // Resolve with null (no card returned)
      }, 100); // Adjust the delay as needed
    };
  });
}

function CyclopsDeterminationDiscardToPlay() {
    return new Promise((resolve) => {
        // Check if there are any cards to discard
        if (playerHand.length === 0) {
            console.log("No cards in Hand to discard. You are unable to play this card.");
            const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
            playerHand.push(unplayedCard);
            cardsPlayedThisTurn.pop(unplayedCard);
            totalAttackPoints -= unplayedCard.attack;
            totalRecruitPoints -= unplayedCard.recruit;
            cumulativeAttackPoints -= unplayedCard.attack;
            cumulativeRecruitPoints -= unplayedCard.recruit;
            updateGameBoard();
            onscreenConsole.log("No cards in Hand to discard. You are unable to play this card.");
            resolve(false);
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const closeButton = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Discard to Play';
        instructionsDiv.innerHTML = 'Select a card to discard in order to play <span class="console-highlights">Cyclops - Determination</span>.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Discard Card';
        closeButton.style.display = 'inline-block';
        closeButton.textContent = 'Cancel';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = 'Select a card to discard in order to play <span class="console-highlights">Cyclops - Determination</span>.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be discarded.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, index, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedIndex = index;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with cards in the player's hand
        playerHand.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = async () => {
            if (selectedCard) {
                const discardedCard = playerHand.splice(selectedIndex, 1)[0];
                
               

                onscreenConsole.log(`You have discarded <span class="console-highlights">${discardedCard.name}</span>, allowing you to play <span class="console-highlights">Cyclops - Determination</span>.`);

                closePopup();
                 // Handle the discard logic
                 await checkDiscardForInvulnerability(discardedCard);
                updateGameBoard();
                resolve(true);
            }
        };

        // Handle cancellation
        closeButton.onclick = () => {
            console.log('Card cannot be played since no card was discarded.');
            onscreenConsole.log(`You have chosen not to discard, preventing you from playing <span class="console-highlights">Cyclops - Determination</span>.`);
            
            const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
            playerHand.push(unplayedCard);
            cardsPlayedThisTurn.pop(unplayedCard);
            totalAttackPoints -= unplayedCard.attack;
            totalRecruitPoints -= unplayedCard.recruit;
            cumulativeAttackPoints -= unplayedCard.attack;
            cumulativeRecruitPoints -= unplayedCard.recruit;
            
            closePopup();
            updateGameBoard();
            resolve(false);
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            closeButton.style.display = 'none';
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function DeadpoolAssignBystanderToVillain() {
    return new Promise((resolve) => {
        // Check if there are any bystanders available
        if (bystanderDeck.length === 0) {
            console.log('There are no bystanders available to be captured.');
            onscreenConsole.log('There are no Bystanders available to be captured.');
            resolve(false);
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
            resolve(false);
            return;
        }

        // Get the popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Capture Bystander';
        instructionsDiv.innerHTML = 'Select a Villain to capture a Bystander.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Capture Bystander';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedVillain = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedVillain === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedVillain === null) {
                instructionsDiv.innerHTML = 'Select a Villain to capture a Bystander.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedVillain.name}</span> will capture a Bystander.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(villain) {
            if (villain) {
                heroImage.src = villain.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = villain.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle villain selection
        function toggleVillainSelection(villain, listItem) {
            if (selectedVillain === villain) {
                // Deselect if same villain clicked
                selectedVillain = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedVillain) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new villain
                selectedVillain = villain;
                listItem.classList.add('selected');
                updateHeroImage(villain);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with villains in the city
        villainsInCity.forEach((villain) => {
            const li = document.createElement('li');
            li.textContent = villain.name;
            li.setAttribute('data-card-id', villain.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = villain.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleVillainSelection(villain, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedVillain) {
                // Remove the bystander from the bystander deck
                const bystander = bystanderDeck.pop();

                // Assign the bystander to the selected villain
                attachBystanderToVillain(selectedVillain.originalIndex, bystander);

                console.log(`Bystander assigned to ${selectedVillain.name}.`);
                onscreenConsole.log(`Bystander captured by <span class="console-highlights">${selectedVillain.name}</span>.`);

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
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
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
        document.getElementById('close-choice-button').style.display = 'none';

        // Initialize UI
        popupTitle.textContent = 'Hero Ability';
        instructionsDiv.innerHTML = 'Select one card to return to the top of your deck.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Return Card';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';
        document.getElementById('close-choice-button').style.display = 'none';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = 'Select one card to return to the top of your deck.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be returned to your deck.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, index, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedIndex = index;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with cards in the player's hand
        playerHand.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard) {
                console.log('Card returned to the top of the deck:', selectedCard);
                
                // Remove the card from the player's hand
                playerHand.splice(selectedIndex, 1);
                
                // Add the card to the top of the deck
                playerDeck.push(selectedCard);

                onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been returned to the top of your deck.`);
                
                closePopup();
                updateGameBoard();
                resolve();
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function doomAdditionalTurn() {
    if (!finalBlowEnabled && victoryPile.filter(obj => obj.type === "Mastermind").length === 4) {
        delayEndGame = true;
        impossibleToDraw = true;
        onscreenConsole.log(`You will be able to take one final turn before claiming your victory!`);
        return;
    } 
    else if (finalBlowEnabled && victoryPile.filter(obj => obj.type === "Mastermind").length === 4) {
        doomDelayEndGameFinalBlow = true;
        impossibleToDraw = true;
        mastermindDefeatTurn = turnCount;
        onscreenConsole.log(`If you deliver the Final Blow this turn, you will be able to take another before claiming your victory!`);
        return;
    } 
    else {
        return;
    }
}

function DoomDrawOrDiscard() {
    return new Promise((resolve) => {
        // Show initial choice popup
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            `Do you wish to draw or discard?`,
            "Draw",
            "Discard"
        );

        const DoomImage = document.getElementById('hero-ability-may-card');
        const DoomText = document.getElementById('heroAbilityHoverText');
        DoomImage.src = "Visual Assets/Masterminds/DrDoom_5.webp";
        const DoomTitle = document.getElementById('hero-ability-may-h2');

        DoomTitle.innerText = 'MASTERMIND TACTIC!';
        DoomText.style.display = 'none';
        DoomImage.style.display = 'block';

        function resetPopup() {
            DoomText.style.display = 'block';
            DoomImage.style.display = 'none';
            DoomImage.src = "";
            DoomTitle.innerText = 'HERO ABILITY!';
        }

        // Handle Draw choice
        confirmButton.onclick = async function() {
            if (playerDeck.length === 0) {
                if (playerDiscardPile.length > 0) {
                    playerDeck = shuffle(playerDiscardPile);
                    playerDiscardPile = [];
                } else {
                    console.log("No cards left in deck or discard pile.");
                    onscreenConsole.log(`No cards available to be drawn.`);
                    hideHeroAbilityMayPopup();
                    resetPopup();
                    updateGameBoard();
                    resolve(false);
                    return;
                }
            }

            await extraDraw();
            hideHeroAbilityMayPopup();
            resetPopup();
            resolve(true);
        };

        // Handle Discard choice
        denyButton.onclick = function() {
            hideHeroAbilityMayPopup();
            resetPopup();

            if (playerHand.length === 0) {
                console.log("No cards in hand to discard.");
                onscreenConsole.log(`No cards available to be discarded.`);
                updateGameBoard();
                resolve(false);
                return;
            }

            // Setup discard selection popup
            const popup = document.getElementById('card-choice-one-location-popup');
            const modalOverlay = document.getElementById('modal-overlay');
            const cardsList = document.getElementById('cards-to-choose-from');
            const confirmButton = document.getElementById('card-choice-confirm-button');
            const popupTitle = document.getElementById('cardChoiceh2');
            const instructionsDiv = document.getElementById('context');
            const heroImage = document.getElementById('hero-one-location-image');
            const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

            // Initialize UI
            popupTitle.textContent = 'MASTERMIND TACTIC!';
            instructionsDiv.textContent = 'Select a card to discard.';
            cardsList.innerHTML = '';
            confirmButton.style.display = 'inline-block';
            confirmButton.disabled = true;
            confirmButton.textContent = 'Discard Card';
            modalOverlay.style.display = 'block';
            popup.style.display = 'block';

            let selectedCard = null;
            let selectedIndex = null;
            let activeImage = null;

            // Update confirm button state
            function updateConfirmButton() {
                confirmButton.disabled = selectedCard === null;
            }

            // Update instructions with styled card name
            function updateInstructions() {
                if (selectedCard === null) {
                    instructionsDiv.textContent = 'Select a card to discard.';
                } else {
                    instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be discarded.`;
                }
            }

            // Show/hide hero image
            function updateHeroImage(card) {
                if (card) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                    activeImage = card.image;
                } else {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                    activeImage = null;
                }
            }

            // Toggle card selection
            function toggleCardSelection(card, index, listItem) {
                if (selectedCard === card) {
                    // Deselect if same card clicked
                    selectedCard = null;
                    selectedIndex = null;
                    listItem.classList.remove('selected');
                    updateHeroImage(null);
                } else {
                    // Clear previous selection if any
                    if (selectedCard) {
                        const prevListItem = document.querySelector('li.selected');
                        if (prevListItem) prevListItem.classList.remove('selected');
                    }
                    // Select new card
                    selectedCard = card;
                    selectedIndex = index;
                    listItem.classList.add('selected');
                    updateHeroImage(card);
                }

                updateConfirmButton();
                updateInstructions();
            }

            // Populate the list with cards in hand
            playerHand.forEach((card, index) => {
                const li = document.createElement('li');
                li.textContent = card.name;
                li.setAttribute('data-card-id', card.id);

                li.onmouseover = () => {
                    if (!activeImage) {
                        heroImage.src = card.image;
                        heroImage.style.display = 'block';
                        oneChoiceHoverText.style.display = 'none';
                    }
                };

                li.onmouseout = () => {
                    if (!activeImage) {
                        heroImage.src = '';
                        heroImage.style.display = 'none';
                        oneChoiceHoverText.style.display = 'block';
                    }
                };

                li.onclick = () => toggleCardSelection(card, index, li);
                cardsList.appendChild(li);
            });

            // Handle confirmation
            confirmButton.onclick = async function() {
                if (selectedCard) {
                    const discardedCard = playerHand.splice(selectedIndex, 1)[0];
                    console.log('Card discarded:', discardedCard);
                    onscreenConsole.log(`<span class="console-highlights">${discardedCard.name}</span> has been discarded.`);

                    await checkDiscardForInvulnerability(discardedCard);
                    closeDiscardPopup();
                    updateGameBoard();
                    resolve(true);
                }
            };

            function closeDiscardPopup() {
                // Reset UI
                popupTitle.textContent = 'HERO ABILITY!';
                instructionsDiv.textContent = 'Context';
                confirmButton.style.display = 'none';
                confirmButton.disabled = true;
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;

                // Hide popup
                popup.style.display = 'none';
                modalOverlay.style.display = 'none';
            }
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

onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);

    const HawkeyeImage = document.getElementById('hero-ability-may-card');
const HawkeyeText = document.getElementById('heroAbilityHoverText');
        HawkeyeImage.src = "Visual Assets/Heroes/Reskinned Core/Core_Hawkeye_CoveringFire.webp"; 

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
                checkDiscardForInvulnerability(selectedCard);
            

onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been discarded.`);
                
                updateGameBoard();

           }

            popup.style.display = 'block';
            document.getElementById("modal-overlay").style.display = "block";
        };
    });
}



function NickFuryFindEligibleVillains() {
    return new Promise((resolve) => {
        const eligibleVillains = [];
        const SHIELDInKO = [];
        let KOdSHIELDNumber = 0;

        // Step 1: Find all SHIELD heroes in the KO pile
        koPile.forEach(card => {
            if (card && card.team === "S.H.I.E.L.D.") {
                SHIELDInKO.push(card);
                console.log(`${card.name} added to list of S.H.I.E.L.D. heroes in the KO Pile.`);
                KOdSHIELDNumber = SHIELDInKO.length;
            }
        });

        console.log('Total S.H.I.E.L.D. in KO pile:', KOdSHIELDNumber);

        if (SHIELDInKO.length === 0) {
            console.log('No S.H.I.E.L.D. heroes in KO Pile.');
            onscreenConsole.log('There are no <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> Heroes in the KO Pile.');
            resolve(false);
            return;
        }

        // Step 2: Check each city space for eligible villains
        city.forEach((card, index) => {
            if (card) {
                const villainAttack = recalculateVillainAttack(card);
                if (villainAttack < KOdSHIELDNumber) {
                    if (card.name) {
                        console.log(`${card.name} added to the eligible villain list.`);
                        eligibleVillains.push({ ...card, type: 'villain', index });
                    }
                }
            }
        });

        // Step 3: Check the mastermind if eligible for attack
        const mastermind = getSelectedMastermind();
        if (mastermind) {
            const mastermindAttack = recalculateMastermindAttack(mastermind);
            if (mastermindAttack < KOdSHIELDNumber) {
                console.log(`${mastermind.name} added to the eligible villain list.`);
                eligibleVillains.push({ ...mastermind, type: 'mastermind' });
            }
        }

        console.log('Eligible villains after filtering:', eligibleVillains);

        // Step 4: Display the eligible villains options with confirm button
        showEligibleVillainsOptions(eligibleVillains).then(resolve);
    });
}

function showEligibleVillainsOptions(eligibleVillains) {
    return new Promise((resolve) => {
        if (eligibleVillains.length === 0) {
            console.log('No villains are eligible for attack.');
            onscreenConsole.log('There are not enough <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> Heroes in the KO Pile for you to attack any Villain or the Mastermind.');
            resolve(false);
            return;
        }

        // Get all popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Nick Fury - S.H.I.E.L.D. Support';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Defeat Target';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
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

            if (selectedCard === null) {
                instructionsDiv.innerHTML = `The following ${villainText} less <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> than the number of <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="card-icons"> Heroes in the KO pile. Select one to defeat.`;
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be defeated.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, index, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedIndex = index;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Clear the previous list of cards
        cardsList.innerHTML = '';

        // Populate the list with eligible villains or mastermind
        eligibleVillains.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id || index);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = async () => {
            if (selectedCard) {
                popup.style.display = 'none';
                modalOverlay.style.display = 'none';
                
                if (selectedCard.type === 'villain') {
                    console.log(`Attacking villain at index ${selectedCard.index}`);
                    onscreenConsole.log(`You have chosen to defeat <span class="console-highlights">${selectedCard.name}</span>.`);
                    totalAttackPoints += recalculateVillainAttack(city[selectedCard.index]);
                    await confirmAttack(selectedCard.index);
                } else if (selectedCard.type === 'mastermind') {
                    console.log('Attacking mastermind');
                    const mastermind = getSelectedMastermind();
                    onscreenConsole.log(`You have chosen to defeat <span class="console-highlights">${mastermind.name}</span>.`);
                    totalAttackPoints += recalculateMastermindAttack(mastermind);
                    await confirmMastermindAttack();
                }

                updateGameBoard();
                closePopup();
                resolve(true);
            }
        };

function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        // Initialize instructions
        updateInstructions();
    });
}

function NickFuryRecruitShieldOfficerByKO() {
    return new Promise((resolve) => {
        // Get SHIELD cards from both locations
        const discardPile = playerDiscardPile.filter(card => card.team === "S.H.I.E.L.D.");
        const hand = playerHand.filter(card => card.team === "S.H.I.E.L.D.");

        // Check if there are any SHIELD cards to KO
        if (discardPile.length === 0 && hand.length === 0) {
            onscreenConsole.log(`No <img src='Visual Assets/Icons/SHIELD.svg' alt='SHIELD Icon' class='console-card-icons'> Heroes available to KO.`);
            resolve(false);
            return;
        }

        // Check if there are any SHIELD Officers left to recruit
        if (shieldOfficers.length === 0) {
            onscreenConsole.log(`No <span class="console-highlights">S.H.I.E.L.D. Officers</span> left to gain.`);
            resolve(false);
            return;
        }

        // Get the popup elements
        const popup = document.getElementById("card-ko-popup");
        const modalOverlay = document.getElementById("modal-overlay");
        const discardPileList = document.getElementById("discard-pile-cards");
        const handList = document.getElementById("hand-cards");
        const confirmButton = document.getElementById("close-ko-button");
const secondConfirmButton = document.getElementById("ko-third-option-button");
        const hoverText = document.getElementById("card-ko-card-popupHoverText");
        const KOImage = document.getElementById("card-ko-popup-image");
        const context = document.getElementById("card-ko-popup-h2");

        // Initialize UI
        context.innerHTML = `Select a <img src='Visual Assets/Icons/SHIELD.svg' alt='SHIELD Icon' class='console-card-icons'> Hero to KO and if you wish to gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`;
        discardPileList.innerHTML = '';
        handList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
	secondConfirmButton.style.display = 'inline-block';
	secondConfirmButton.disabled = true;
        confirmButton.textContent = 'KO + GAIN';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedLocation = null; // 'hand' or 'discard'
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
		secondConfirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                context.innerHTML = `Select a <img src='Visual Assets/Icons/SHIELD.svg' alt='SHIELD Icon' class='console-card-icons'> Hero to KO and if you wish to gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`;
            } else {
                context.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd from your ${selectedLocation}.`;
            }
        }

        // Show/hide card image
        function updateCardImage(card) {
            if (card) {
                KOImage.src = card.image;
                KOImage.style.display = 'block';
                hoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                KOImage.src = '';
                KOImage.style.display = 'none';
                hoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, location, listItem) {
            if (selectedCard === card && selectedLocation === location) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedLocation = null;
                listItem.classList.remove('selected');
                updateCardImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedLocation = location;
                listItem.classList.add('selected');
                updateCardImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate discard pile list
        discardPile.forEach((card) => {
            const li = document.createElement("li");
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    KOImage.src = card.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    KOImage.src = '';
                    KOImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, 'discard pile', li);
            discardPileList.appendChild(li);
        });

        // Populate hand list
        hand.forEach((card) => {
            const li = document.createElement("li");
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    KOImage.src = card.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    KOImage.src = '';
                    KOImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, 'hand', li);
            handList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard && selectedLocation) {
                // Remove card from its location
                if (selectedLocation === 'discard pile') {
                    const index = playerDiscardPile.indexOf(selectedCard);
                    if (index !== -1) playerDiscardPile.splice(index, 1);
                } else {
                    const index = playerHand.indexOf(selectedCard);
                    if (index !== -1) playerHand.splice(index, 1);
                }

                // Add to KO pile
                koPile.push(selectedCard);
                
                // Recruit SHIELD Officer
                moveShieldOfficerToHand();

                onscreenConsole.log(`You KO'd <span class="console-highlights">${selectedCard.name}</span> from your ${selectedLocation} to gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`);

                closePopup();
                updateGameBoard();
                resolve(true);
            }
};

 secondConfirmButton.onclick = () => {
            if (selectedCard && selectedLocation) {
                // Remove card from its location
                if (selectedLocation === 'discard pile') {
                    const index = playerDiscardPile.indexOf(selectedCard);
                    if (index !== -1) playerDiscardPile.splice(index, 1);
                } else {
                    const index = playerHand.indexOf(selectedCard);
                    if (index !== -1) playerHand.splice(index, 1);
                }

                // Add to KO pile
                koPile.push(selectedCard);
                
                onscreenConsole.log(`You KO'd <span class="console-highlights">${selectedCard.name}</span> from your ${selectedLocation} and chose not to gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`);

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
            // Reset UI
            context.innerHTML = `Do you wish to KO a card from your Discard Pile or Hand to rescue a Bystander?`;
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
	secondConfirmButton.style.display = 'none';
            secondConfirmButton.disabled = true;
            KOImage.src = '';
            KOImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        // Add cancel button functionality
        const closeButton = document.getElementById('no-thanks-button');
        closeButton.onclick = () => {
            onscreenConsole.log(`You chose not to KO a <img src='Visual Assets/Icons/SHIELD.svg' alt='SHIELD Icon' class='console-card-icons'> Hero.`);
            closePopup();
            resolve(false);
        };

        const closeXButton = document.getElementById('card-ko-popup-close');
            closeButton.onclick = () => {
            onscreenConsole.log(`You chose not to KO a <img src='Visual Assets/Icons/SHIELD.svg' alt='SHIELD Icon' class='console-card-icons'> Hero.`);
            closePopup();
            resolve(false);
        };
    });
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
    onscreenConsole.log(`<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);

  if (playerHand.length === 0) {
                console.log("No cards in hand to discard. You are unable to play this card.");
onscreenConsole.log(`No cards available to KO.`);
                return;
            }

    return new Promise((resolve) => {
        // Get popup elements
        const popup = document.getElementById('card-ko-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const discardPileList = document.getElementById('discard-pile-cards');
        const handList = document.getElementById('hand-cards');
        const confirmButton = document.getElementById('close-ko-button');
        const hoverText = document.getElementById('card-ko-card-popupHoverText');
        const KOImage = document.getElementById('card-ko-popup-image');
        const context = document.getElementById('card-ko-popup-h2');
        const closeButton = document.getElementById('no-thanks-button');
const xcloseButton = document.getElementById('card-ko-popup-close');


        // Initialize UI
        context.innerHTML = `Select a card to KO and gain +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`;
        discardPileList.innerHTML = '';
        handList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'KO Card';
        closeButton.style.display = 'inline-block';
        closeButton.textContent = 'Cancel';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        KOImage.src = '';
        KOImage.style.display = 'none';
        hoverText.style.display = 'block';

        // Track selection
        let selectedCard = null;
        let selectedLocation = null;
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (!selectedCard) {
                context.innerHTML = `Select a card to KO and gain +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`;
            } else {
                context.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd from your ${selectedLocation} to gain +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`;
            }
        }

        function updateCardImage(card) {
            if (card) {
                KOImage.src = card.image;
                KOImage.style.display = 'block';
                hoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                KOImage.src = '';
                KOImage.style.display = 'none';
                hoverText.style.display = 'block';
                activeImage = null;
            }
        }

        function toggleCardSelection(card, location, listItem) {
            if (selectedCard === card && selectedLocation === location) {
                // Deselect
                selectedCard = null;
                selectedLocation = null;
                listItem.classList.remove('selected');
                updateCardImage(null);
            } else {
                // Clear previous selection
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedLocation = location;
                listItem.classList.add('selected');
                updateCardImage(card);
            }
            updateConfirmButton();
            updateInstructions();
        }

        // Populate discard pile
        playerDiscardPile.forEach((card) => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.dataset.cardId = card.id;

            li.onmouseover = () => {
                if (!activeImage) {
                    KOImage.src = card.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    KOImage.src = '';
                    KOImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, 'discard pile', li);
            discardPileList.appendChild(li);
        });

        // Populate hand
        playerHand.forEach((card) => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.dataset.cardId = card.id;

            li.onmouseover = () => {
                if (!activeImage) {
                    KOImage.src = card.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    KOImage.src = '';
                    KOImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, 'hand', li);
            handList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard && selectedLocation) {
                let koIndex;
                if (selectedLocation === 'discard pile') {
                    koIndex = playerDiscardPile.findIndex(c => c.id === selectedCard.id);
                    if (koIndex !== -1) playerDiscardPile.splice(koIndex, 1);
                } else {
                    koIndex = playerHand.findIndex(c => c.id === selectedCard.id);
                    if (koIndex !== -1) playerHand.splice(koIndex, 1);
                }

                if (koIndex !== -1) {
                    koPile.push(selectedCard);
                    totalRecruitPoints += 1;
                    cumulativeRecruitPoints += 1;
                    
                    onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been KO'd from your ${selectedLocation}. +1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
                    closePopup();
                    updateGameBoard();
                    resolve(true);
                    return;
                }
            }
            resolve(false);
        };

        // Handle cancellation
        closeButton.onclick = () => {
            onscreenConsole.log(`No card was KO'd.`);
            closePopup();
            resolve(false);
        };
        
                // Handle cancellation
        xcloseButton.onclick = () => {
            onscreenConsole.log(`No card was KO'd.`);
            closePopup();
            resolve(false);
        };


        function closePopup() {
            context.innerHTML = `Select a card to KO and gain +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`;
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            closeButton.style.display = 'none';
            KOImage.src = '';
            KOImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}


function RogueCopyPowers(currentPlayer) {
    return new Promise((resolve) => {
        // Check if any cards have been played this turn
        if (cardsPlayedThisTurn.length === 1) {
            console.log("No heroes have been played yet.");
            onscreenConsole.log("No Heroes have been played this turn. There are no powers to copy.");
            resolve(false);
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const closeButton = document.getElementById('close-choice-button');
        const context = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const hoverText = document.getElementById('oneChoiceHoverText');

        // Filter eligible heroes (excluding last played card)
        const heroesToCopy = cardsPlayedThisTurn.slice(0, -1);

        // Initialize UI
        popup.querySelector('h2').textContent = 'Rogue - Copy Powers';
        context.innerHTML = 'Select a Hero to copy:';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        closeButton.style.display = 'inline-block';
        closeButton.textContent = 'Cancel';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';
        heroImage.style.display = 'none';
        hoverText.style.display = 'block';

        let selectedHero = null;
        let activeImage = null;

        // Update confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedHero === null;
        }

        // Update instructions
        function updateInstructions() {
            if (!selectedHero) {
                context.innerHTML = 'Select a Hero to copy:';
            } else {
                context.innerHTML = `Selected: <span class="console-highlights">${selectedHero.name}</span> will be copied.`;
            }
        }

        // Update hero image display
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                hoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                hoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle selection
        function toggleSelection(hero, listItem) {
            if (selectedHero === hero) {
                // Deselect
                selectedHero = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection
                if (selectedHero) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new hero
                selectedHero = hero;
                listItem.classList.add('selected');
                updateHeroImage(hero);
            }
            updateConfirmButton();
            updateInstructions();
        }

        // Populate hero list
        heroesToCopy.forEach(hero => {
            const li = document.createElement('li');
            li.textContent = hero.name;
            li.dataset.cardId = hero.id;

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = hero.image;
                    heroImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleSelection(hero, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = async () => {
            if (!selectedHero) return;
            
            // Close popup immediately
            closePopup();
            
            try {
                // Find Rogue card
                const rogueCardIndex = cardsPlayedThisTurn.findIndex(c => c.name === 'Rogue - Copy Powers' && !c.isCopied);
                if (rogueCardIndex === -1) {
                    console.log("Rogue has already copied a card.");
                    resolve(false);
                    return;
                }
                
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
                    class3: rogueCard.class3,
                    color: rogueCard.color,
                    cost: rogueCard.cost,
                    attack: rogueCard.attack,
                    recruit: rogueCard.recruit,
                    attackIcon: rogueCard.attackIcon,
                    recruitIcon: rogueCard.recruitIcon,
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

                // Copy selected hero's attributes (keeping Covert class1)
                Object.assign(rogueCard, {
                    name: selectedHero.name || "None",
                    type: selectedHero.type || "None",
                    rarity: selectedHero.rarity || "None",
                    team: selectedHero.team || "None",
                    class1: 'Covert', // Always keep Covert as primary class
                    class2: selectedHero.class1 || "None",
                    class3: selectedHero.class2 || "None",
                    color: selectedHero.color || "None",
                    cost: selectedHero.cost || 0,
                    attack: selectedHero.attack || 0,
                    recruit: selectedHero.recruit || 0,
                    attackIcon: selectedHero.attackIcon || "None",
                    recruitIcon: selectedHero.recruitIcon || "None",
                    bonusAttack: selectedHero.bonusAttack || 0,
                    bonusRecruit: selectedHero.bonusRecruit || 0,
                    multiplier: selectedHero.multiplier || "None",
                    multiplierAttribute: selectedHero.multiplierAttribute || "None",
                    mulitplierLocation: selectedHero.mulitplierLocation || "None",
                    unconditionalAbility: selectedHero.unconditionalAbility || "None",
                    conditionalAbility: selectedHero.conditionalAbility || "None",
                    conditionType: selectedHero.conditionType || "None",
                    condition: selectedHero.condition || "None",
                    invulnerability: selectedHero.invulnerability || "None",
                    image: selectedHero.image || "None"
                });

                console.log(`Copied: ${selectedHero.name}. Gained ${rogueCard.attack} attack and ${rogueCard.recruit} recruit.`);
                onscreenConsole.log(`Copied <span class="console-highlights">${selectedHero.name}</span>. Gained +${rogueCard.attack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and +${rogueCard.recruit}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);

                // Handle unconditional ability if it exists
                if (rogueCard.unconditionalAbility && rogueCard.unconditionalAbility !== "None") {
                    const abilityFunction = window[rogueCard.unconditionalAbility];
                    if (typeof abilityFunction === 'function') {
                        console.log(`Triggering ability: ${rogueCard.unconditionalAbility}`);
                        await abilityFunction(currentPlayer, rogueCard);
                    } else {
                        console.error(`Ability function ${rogueCard.unconditionalAbility} not found`);
                    }
                }

                // Update game state
                totalAttackPoints += rogueCard.attack;
                totalRecruitPoints += rogueCard.recruit;
                cumulativeAttackPoints += rogueCard.attack;
                cumulativeRecruitPoints += rogueCard.recruit;

                updateGameBoard();
                resolve(true);
            } catch (error) {
                console.error("Error copying powers:", error);
                resolve(false);
            }
        };

        // Handle cancellation
        closeButton.onclick = () => {
            onscreenConsole.log("Rogue did not copy any powers.");
            closePopup();
            resolve(false);
        };

        function closePopup() {
            // Reset UI
            popup.querySelector('h2').textContent = 'Hero Ability!';
            context.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            closeButton.style.display = 'none';
            heroImage.src = '';
            heroImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
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
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated. The Mastermind gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> this turn.`);
updateGameBoard();
}

function StormMoveVillain() {
    // Elements for the popup and overlay
    const popup = document.getElementById('villain-movement-popup');
    const overlay = document.getElementById('modal-overlay');
    const closeButton = popup.querySelector('.close-triangle-btn');
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
        skrullOverlay.innerHTML = `${city[i].overlayText}`;
        cityCellElement.appendChild(skrullOverlay);
    }
} else {
    // If no villain, add a blank card image
    const blankCardImage = document.createElement('img');
    
    // Set the src to the blank card image
    blankCardImage.src = 'Visual Assets/BlankCardSpace.webp';
    
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
if (secondCellImage && secondCellImage.src.includes('BlankCardSpace.webp')) {
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
onscreenConsole.log(`<span class="console-highlights">Thor - God of Thunder's</span> Special Ability: You can use <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> as <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> this turn.`);
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
        const combinedCards = [
            ...playerHand.filter(card => card.type === 'Hero'), // Heroes in hand (always included)
            ...cardsPlayedThisTurn.filter(card => 
                card.type === 'Hero' && 
                !card.isCopied && 
                !card.sidekickToDestroy
            )
        ];
        
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
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'FIGHT EFFECT!';
        instructionsDiv.textContent = 'Select a hero to KO.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block'; // Always visible
        confirmButton.disabled = true; // Disabled by default
        confirmButton.innerHTML = "Confirm";
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let activeImage = null; // Track the currently locked image

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
            // No need to show/hide the button anymore since it's always visible
        }

        // Update instructions based on selection
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.textContent = 'Select a hero to KO.';
            } else {
                instructionsDiv.innerHTML= `Selected: <span class="console-highlights">${selectedCard.card.name}</span> will be KO'd.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, cardIndex, listItem) {
            if (selectedCard && selectedCard.index === cardIndex && selectedCard.isFromHand === (cardIndex < playerHand.length)) {
                // Deselect if clicking the same card
                selectedCard = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Deselect previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector(`[data-card-id="${selectedCard.index}"]`);
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = {
                    card: card,
                    index: cardIndex,
                    isFromHand: cardIndex < playerHand.length
                };
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Handle the confirm action
        confirmButton.onclick = () => {
            if (!selectedCard) return;

            const { card, index, isFromHand } = selectedCard;
            console.log(`${card.name} has been KO'd.`);
            onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            
            // Remove the card from the correct array (hand or played)
            if (isFromHand) {
                playerHand.splice(index, 1);
            } else {
                cardsPlayedThisTurn.splice(index - playerHand.length, 1);
            }
            
            // Add the card to the KO pile
            koPile.push(card);
            
            closePopup();
            updateGameBoard();
            resolve();
        };

        function closePopup() {
            // Reset popup elements to default state
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;
            
            // Hide the popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        // Populate the list with the heroes from the player's hand and played cards
        combinedCards.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', index);

            li.onmouseover = () => {
                if (!activeImage) { // Only change if no selection is locked
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) { // Only hide if no selection is locked
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });
    });
}

function FightKOHeroYouHave() {
    onscreenConsole.log(`Fight! KO one of your Heroes.`);
    return new Promise((resolve, reject) => {
        // Combine heroes from the player's hand and cards played this turn
        const combinedCards = [
            ...playerHand,
            ...cardsPlayedThisTurn.filter(card => 
                card.isCopied !== true && 
                card.sidekickToDestroy !== true
            )
        ];        
        
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
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'FIGHT EFFECT!';
        instructionsDiv.textContent = 'Select a Hero to KO.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block'; // Always visible
        confirmButton.disabled = true; // Disabled by default
confirmButton.textContent = 'Confirm'; 
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let activeImage = null; // Track the currently locked image

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions based on selection
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.textContent = 'Select a Hero to KO.';
            } else {
                instructionsDiv.innerHTML= `Selected: <span class="console-highlights">${selectedCard.card.name}</span> will be KO'd.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, cardIndex, listItem) {
            if (selectedCard && selectedCard.index === cardIndex && selectedCard.isFromHand === (cardIndex < playerHand.length)) {
                // Deselect if clicking the same card
                selectedCard = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Deselect previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector(`[data-card-id="${selectedCard.index}"]`);
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = {
                    card: card,
                    index: cardIndex,
                    isFromHand: cardIndex < playerHand.length
                };
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Handle the confirm action
        confirmButton.onclick = () => {
            if (!selectedCard) return;

            const { card, index, isFromHand } = selectedCard;
            onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            
            // Remove the card from the correct array (hand or played)
            if (isFromHand) {
                playerHand.splice(index, 1);
            } else {
                cardsPlayedThisTurn.splice(index - playerHand.length, 1);
            }
            
            // Add the card to the KO pile
            koPile.push(card);
            
            closePopup();
            updateGameBoard();
            resolve();
        };

        function closePopup() {
            // Reset popup elements to default state
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;
            
            // Hide the popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        // Populate the list with the heroes from the player's hand and played cards
        combinedCards.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', index);

            li.onmouseover = () => {
                if (!activeImage) { // Only change if no selection is locked
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) { // Only hide if no selection is locked
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });
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

    // Draw up to 2 cards with reshuffle if needed
    for (let i = 0; i < 2; i++) {
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
        } else {
          console.log("No cards left in deck or discard pile.");
          onscreenConsole.log(`<span class="console-highlights">Doombot Legion</span> Fight effect negated. No cards available to look at or KO.`);
          resolve(false);
          return;
        }
      }

      const topCard = playerDeck.pop();
      if (topCard) holdingArray.push(topCard);
    }

    // Handle cases with fewer than 2 cards
    if (holdingArray.length < 2) {
      if (holdingArray.length === 1) {
        const singleCard = holdingArray[0];
        koPile.push(singleCard);
        onscreenConsole.log(`<span class="console-highlights">Doombot Legion</span> Fight effect carried out: Only 1 card was available. <span class="console-highlights">${singleCard.name}</span> has been KO'd.`);
        updateGameBoard();
        resolve(true);
      } else {
        resolve(false);
      }
      return;
    }

    // Use the correct popup structure that matches your HTML
    const popup = document.getElementById('card-choice-one-location-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const cardsList = document.getElementById('cards-to-choose-from');
    const confirmButton = document.getElementById('card-choice-confirm-button');
    const context = document.getElementById('context');
    const heroImage = document.getElementById('hero-one-location-image');
    const hoverText = document.getElementById('oneChoiceHoverText');

    // Initialize UI - No cancel option
    const popupTitle = popup.querySelector('h2');
    popupTitle.textContent = 'Doombot Legion - Fight Effect';
    context.innerHTML = 'Select a card to KO (other returns to deck):';
    cardsList.innerHTML = '';
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;
    confirmButton.textContent = 'KO Selected';
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';
    heroImage.style.display = 'none';
    hoverText.style.display = 'block';

    const [card1, card2] = holdingArray;
    let selectedCard = null;
    let activeImage = null;

    // Update confirm button state
    function updateConfirmButton() {
      confirmButton.disabled = selectedCard === null;
    }

    // Update instructions
    function updateInstructions() {
      if (!selectedCard) {
        context.innerHTML = 'Select a card to KO (other returns to deck):';
      } else {
        const otherCard = selectedCard === card1 ? card2 : card1;
        context.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd. <span class="console-highlights">${otherCard.name}</span> will return to deck.`;
      }
    }

    // Update hero image display
    function updateHeroImage(card) {
      if (card) {
        heroImage.src = card.image;
        heroImage.style.display = 'block';
        hoverText.style.display = 'none';
        activeImage = card.image;
      } else {
        heroImage.src = '';
        heroImage.style.display = 'none';
        hoverText.style.display = 'block';
        activeImage = null;
      }
    }

    // Toggle selection
    function toggleSelection(card, listItem) {
      if (selectedCard === card) {
        // Deselect
        selectedCard = null;
        listItem.classList.remove('selected');
        updateHeroImage(null);
      } else {
        // Select new card
        selectedCard = card;
        document.querySelectorAll('#cards-to-choose-from li').forEach(li => {
          li.classList.remove('selected');
        });
        listItem.classList.add('selected');
        updateHeroImage(card);
      }
      updateConfirmButton();
      updateInstructions();
    }

    // Create list items for both cards
    [card1, card2].forEach(card => {
      const li = document.createElement('li');
      li.textContent = card.name;
      li.dataset.cardId = card.id;

      li.onmouseover = () => {
        if (!activeImage) {
          heroImage.src = card.image;
          heroImage.style.display = 'block';
          hoverText.style.display = 'none';
        }
      };

      li.onmouseout = () => {
        if (!activeImage) {
          heroImage.src = '';
          heroImage.style.display = 'none';
          hoverText.style.display = 'block';
        }
      };

      li.onclick = () => toggleSelection(card, li);
      cardsList.appendChild(li);
    });

    // Handle confirmation - REQUIRED ACTION
    confirmButton.onclick = () => {
      if (!selectedCard) return;
      
      const cardToKO = selectedCard;
      const cardToReturn = selectedCard === card1 ? card2 : card1;
      
      koPile.push(cardToKO);
      playerDeck.push(cardToReturn);
      
      onscreenConsole.log(`<span class="console-highlights">Doombot Legion</span> Fight effect: KO'd <span class="console-highlights">${cardToKO.name}</span>, returned <span class="console-highlights">${cardToReturn.name}</span> to deck.`);
      
      closePopup();
      updateGameBoard();
      resolve(true);
    };

    function closePopup() {
      // Reset UI
      popupTitle.textContent = 'Fight Effect!';
      context.textContent = 'Context';
      confirmButton.style.display = 'none';
      confirmButton.disabled = true;
      heroImage.src = '';
      heroImage.style.display = 'none';
      hoverText.style.display = 'block';
      activeImage = null;

      // Hide popup
      popup.style.display = 'none';
      modalOverlay.style.display = 'none';
    }
  });
}



function doomStrike() {
    return new Promise((resolve, reject) => {
        // Add a small delay to allow the modalOverlay to re-render
        setTimeout(() => {
            // Check if the player has exactly 6 cards in their hand
            if (playerHand.length !== 6) {
                console.log('Player does not have exactly 6 cards in hand. No action required.');
                onscreenConsole.log('You do not have exactly 6 cards in your hand. Master Strike avoided!');
                resolve(); // Resolve immediately since no action is required
                return;
            }

           const hasTech = playerHand.some(card => card.class1 === 'Tech') || 
                cardsPlayedThisTurn.some(card => 
                    card.class1 === 'Tech' && 
                    card.isCopied !== true && 
                    card.sidekickToDestroy !== true
                );
                
                
            if (!hasTech) {
                console.log('No Tech card found. Player must return 2 cards to the top of their deck.');
                onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`);

                // Ensure modalOverlay is visible before showing the next popup
                document.getElementById('modal-overlay').style.display = 'block';
                handleNoTechRevealed(resolve);
            } else {
                // Ensure modalOverlay is visible before showing the next popup
                document.getElementById('modal-overlay').style.display = 'block';
                handleTechRevealed(resolve);
            }
        }, 10); // 10ms delay
    });
}


function handleNoTechRevealed(resolve) {
    const popup = document.getElementById('card-choice-one-location-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const cardsList = document.getElementById('cards-to-choose-from');
    const confirmButton = document.getElementById('card-choice-confirm-button');
    const popupTitle = popup.querySelector('h2');
    const instructionsDiv = document.getElementById('context');
    const heroImage = document.getElementById('hero-one-location-image');
    const hoverText = document.getElementById('oneChoiceHoverText');

    // Initialize UI
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';
    popupTitle.textContent = 'Master Strike';
    instructionsDiv.innerHTML = 'Select 2 cards to return to your deck.';
    cardsList.innerHTML = '';
    
    // Button setup - always visible
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;
   

    let selectedCards = [];
    let activeImage = null;

    // Update button state
    function updateButton() {
        confirmButton.disabled = selectedCards.length !== 2;
    }

    // Update instructions with card names
    function updateInstructions() {
        if (selectedCards.length === 0) {
            instructionsDiv.innerHTML = 'Select 2 cards to return to your deck.';
        } else {
            const names = selectedCards.map(index => 
                `<span class="console-highlights">${playerHand[index].name}</span>`
            ).join(', ');
            
            if (selectedCards.length === 1) {
                instructionsDiv.innerHTML = `Selected: ${names}. Select 1 more card.`;
            } else {
                instructionsDiv.innerHTML = `Selected: 1. ${names.split(', ')[0]} (Top of Deck), 2. ${names.split(', ')[1]}`;
            }
        }
    }

    // Update hero image display
    function updateHeroImage(card) {
        if (card) {
            heroImage.src = card.image;
            heroImage.style.display = 'block';
            hoverText.style.display = 'none';
            activeImage = card.image;
        } else {
            heroImage.src = '';
            heroImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;
        }
    }

    // Toggle card selection
    function toggleCardSelection(card, cardIndex, listItem) {
        const index = selectedCards.indexOf(cardIndex);
        
        if (index !== -1) {
            // Deselect
            selectedCards.splice(index, 1);
            listItem.classList.remove('selected');
            if (activeImage === card.image) updateHeroImage(null);
        } else {
            if (selectedCards.length >= 2) {
                // Remove oldest selection if already have 2
                const oldestIndex = selectedCards.shift();
                const oldestItem = document.querySelector(`[data-card-id="${oldestIndex}"]`);
                if (oldestItem) oldestItem.classList.remove('selected');
            }
            // Add new selection
            selectedCards.push(cardIndex);
            listItem.classList.add('selected');
            updateHeroImage(card);
        }

        updateButton();
        updateInstructions();
    }

    // Populate card list
    playerHand.forEach((card, index) => {
        const li = document.createElement('li');
        li.textContent = card.name;
        li.setAttribute('data-card-id', index);

        li.onmouseover = () => {
            if (!activeImage) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                hoverText.style.display = 'none';
            }
        };

        li.onmouseout = () => {
            if (!activeImage) {
                heroImage.src = '';
                heroImage.style.display = 'none';
                hoverText.style.display = 'block';
            }
        };

        li.onclick = () => toggleCardSelection(card, index, li);
        cardsList.appendChild(li);
    });

    // Confirm action - return cards to deck
    confirmButton.onclick = () => {
        if (selectedCards.length !== 2) return;

        const [firstIndex, secondIndex] = selectedCards;
        const firstCard = playerHand[firstIndex];
        const secondCard = playerHand[secondIndex];

        // Remove from hand and add to deck (in reverse order)
        playerHand.splice(firstIndex, 1);
        playerHand.splice(secondIndex > firstIndex ? secondIndex - 1 : secondIndex, 1);
        playerDeck.push(secondCard, firstCard);

        onscreenConsole.log(
            `Returned to deck: <span class="console-highlights">${secondCard.name}</span> ` +
            `then <span class="console-highlights">${firstCard.name}</span> on top.`
        );

        closePopup();
        updateGameBoard();
        resolve();
    };

    function closePopup() {
        // Reset UI
        popupTitle.textContent = 'Hero Ability!';
        instructionsDiv.textContent = 'Context';
        confirmButton.style.display = 'none';
        heroImage.src = '';
        heroImage.style.display = 'none';
        hoverText.style.display = 'block';

        // Hide popup
        popup.style.display = 'none';
        modalOverlay.style.display = 'none';
    }
}

function handleTechRevealed(resolve) {
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

    // Ensure modalOverlay is visible
    document.getElementById('modal-overlay').style.display = 'block';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Masterminds/DrDoom_1.webp';
    cardImage.style.display = 'block';
document.getElementById('heroAbilityHoverText').style.display = 'none';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped Dr. Doom's Master Strike!`);
        hideHeroAbilityMayPopup();
        document.getElementById('heroAbilityHoverText').style.display = 'block';
        resolve();
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`);
        hideHeroAbilityMayPopup();
        document.getElementById('oneChoiceHoverText').style.display = 'block';

        // Ensure modalOverlay is visible before showing the next popup
        document.getElementById('modal-overlay').style.display = 'block';
        handleNoTechRevealed(resolve);
    };
}

function magnetoStrike() {
    return new Promise((resolve, reject) => {
setTimeout(() => {   
        // Check if the player has an X-Men card in hand or played this turn
       const hasXMen = 
    playerHand.some(card => card.team === 'X-Men') || 
    cardsPlayedThisTurn.some(card => 
        card.team === 'X-Men' && 
        !card.isCopied && 
        !card.sidekickToDestroy
    );
    
if (!hasXMen) {
            console.log('No X-Men card found. Player must return 2 cards to the top of their deck.');
            onscreenConsole.log(`You are unable to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero. you must discard until 4 cards remain.`);
            handleNoXMenRevealed(resolve);
        } else {
            handleXMenRevealed(resolve);
        }
 }, 10); // 10ms delay
    });
}

function handleNoXMenRevealed(resolve) {
    const popup = document.getElementById('card-choice-one-location-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const cardsList = document.getElementById('cards-to-choose-from');
    const confirmButton = document.getElementById('card-choice-confirm-button');
    const popupTitle = popup.querySelector('h2');
    const instructionsDiv = document.getElementById('context');
    const heroImage = document.getElementById('hero-one-location-image');
    const hoverText = document.getElementById('oneChoiceHoverText');

    // Initialize UI
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';
    popupTitle.textContent = 'Master Strike';
    instructionsDiv.innerHTML = 'Select cards to discard until you have 4 cards remaining.';
    cardsList.innerHTML = '';
    
    // Button setup
    confirmButton.textContent = 'CONFIRM';
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;

    let selectedCards = [];
    let activeImage = null;
    const requiredRemaining = 4;
    const cardsToDiscard = playerHand.length - requiredRemaining;

    // Update button state and instructions
    function updateUI() {
        const remainingToSelect = cardsToDiscard - selectedCards.length;
        
        confirmButton.disabled = selectedCards.length !== cardsToDiscard;
        
        if (selectedCards.length === 0) {
            instructionsDiv.innerHTML = `Select ${cardsToDiscard} cards to discard (leaving 4 in hand).`;
        } else {
            const names = selectedCards.map(index => 
                `<span class="console-highlights">${playerHand[index].name}</span>`
            ).join(', ');
            
            instructionsDiv.innerHTML = `
                Selected: ${names}.
                ${remainingToSelect > 0 
                    ? `Select ${remainingToSelect} more card${remainingToSelect > 1 ? 's' : ''}.` 
                    : 'Ready to confirm discard.'}
            `;
        }
    }

    // Update hero image display
    function updateHeroImage(card) {
        if (card) {
            heroImage.src = card.image;
            heroImage.style.display = 'block';
            hoverText.style.display = 'none';
            activeImage = card.image;
        } else {
            heroImage.src = '';
            heroImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;
        }
    }

    // Toggle card selection
    function toggleCardSelection(card, cardIndex, listItem) {
        const index = selectedCards.indexOf(cardIndex);
        
        if (index !== -1) {
            // Deselect
            selectedCards.splice(index, 1);
            listItem.classList.remove('selected');
            if (activeImage === card.image) updateHeroImage(null);
        } else {
            if (selectedCards.length >= cardsToDiscard) {
                // Remove oldest selection if already at limit
                const oldestIndex = selectedCards.shift();
                const oldestItem = document.querySelector(`[data-card-id="${oldestIndex}"]`);
                if (oldestItem) oldestItem.classList.remove('selected');
            }
            // Add new selection
            selectedCards.push(cardIndex);
            listItem.classList.add('selected');
            updateHeroImage(card);
        }
        updateUI();
    }

    // Populate card list
    playerHand.forEach((card, index) => {
        const li = document.createElement('li');
        li.textContent = card.name;
        li.setAttribute('data-card-id', index);

        li.onmouseover = () => {
            if (!activeImage) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                hoverText.style.display = 'none';
            }
        };

        li.onmouseout = () => {
            if (!activeImage) {
                heroImage.src = '';
                heroImage.style.display = 'none';
                hoverText.style.display = 'block';
            }
        };

        li.onclick = () => toggleCardSelection(card, index, li);
        cardsList.appendChild(li);
    });

    // Confirm discard action (FIXED VERSION - matches original behavior)
    confirmButton.onclick = async () => {
        if (selectedCards.length !== cardsToDiscard) return;

        // Process cards ONE BY ONE like the original
        const sortedIndices = [...selectedCards].sort((a, b) => b - a); // Sort descending
        const discardedCardNames = [];
        
        for (const index of sortedIndices) {
            if (index >= 0 && index < playerHand.length) {
                const [card] = playerHand.splice(index, 1); // Remove from hand first
                discardedCardNames.push(card.name);
                await checkDiscardForInvulnerability(card); // Then process discard
            }
        }

       if (discardedCardNames.length > 0) {
    const formattedNames = discardedCardNames.length > 1 
        ? `${discardedCardNames.slice(0, -1).map(name => `<span class="console-highlights">${name}</span>`).join(', ')} and <span class="console-highlights">${discardedCardNames.slice(-1)[0]}</span>`
        : `<span class="console-highlights">${discardedCardNames[0]}</span>`;
    
    onscreenConsole.log(`Discarded ${formattedNames}`);
}
        closePopup();
        updateGameBoard();
        resolve();
    };

    function closePopup() {
        // Reset UI
        popupTitle.textContent = 'Hero Ability!';
        instructionsDiv.textContent = 'Context';
        confirmButton.textContent = 'Confirm';
        confirmButton.style.display = 'none';
        heroImage.src = '';
        heroImage.style.display = 'none';
        hoverText.style.display = 'block';

        // Hide popup
        popup.style.display = 'none';
        modalOverlay.style.display = 'none';
    }
}

function handleXMenRevealed(resolve) {
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Masterminds/Magneto_1.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have escaped needing to discard!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
        resolve();
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
        handleNoXMenRevealed(resolve);
    };
}

function RedSkullKOHandHero() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const combinedCards = [...playerHand, ...cardsPlayedThisTurn].filter(card => card?.type === "Hero");
            
            if (combinedCards.length === 0) {
                onscreenConsole.log('You have no Heroes available to KO.');
                resolve();
                return;
            }

            const popup = document.getElementById('card-choice-one-location-popup');
            const modalOverlay = document.getElementById('modal-overlay');
            const cardsList = document.getElementById('cards-to-choose-from');
            const confirmButton = document.getElementById('card-choice-confirm-button');
            const popupTitle = popup.querySelector('h2');
            const instructionsDiv = document.getElementById('context');
            const heroImage = document.getElementById('hero-one-location-image');
            const hoverText = document.getElementById('oneChoiceHoverText');

            // Initialize UI
            modalOverlay.style.display = 'block';
            popup.style.display = 'block';
            popupTitle.textContent = 'Master Strike';
            instructionsDiv.innerHTML = 'Select a hero to KO.';
            cardsList.innerHTML = '';
            
            // Button setup
            confirmButton.textContent = 'CONFIRM';
            confirmButton.style.display = 'inline-block';
            confirmButton.disabled = true;

            let selectedCard = null;
            let selectedIndex = null;
            let isFromHand = null;
            let activeImage = null;

            // Update UI based on selection
            function updateUI() {
                if (selectedCard) {
                    instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span>`;
                    confirmButton.disabled = false;
                } else {
                    instructionsDiv.innerHTML = 'Select a hero to KO.';
                    confirmButton.disabled = true;
                }
            }

            // Update hero image display
            function updateHeroImage(card) {
                if (card) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    hoverText.style.display = 'none';
                    activeImage = card.image;
                } else {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    hoverText.style.display = 'block';
                    activeImage = null;
                }
            }

            // Populate card list
            combinedCards.forEach((card, index) => {
                const li = document.createElement('li');
                li.textContent = card.name;
                li.setAttribute('data-card-id', index);

                li.onmouseover = () => {
                    if (!activeImage) {
                        heroImage.src = card.image;
                        heroImage.style.display = 'block';
                        hoverText.style.display = 'none';
                    }
                };

                li.onmouseout = () => {
                    if (!activeImage) {
                        heroImage.src = '';
                        heroImage.style.display = 'none';
                        hoverText.style.display = 'block';
                    }
                };

                li.onclick = () => {
                    // Deselect if clicking same card
                    if (selectedIndex === index) {
                        selectedCard = null;
                        selectedIndex = null;
                        isFromHand = null;
                        li.classList.remove('selected');
                        updateHeroImage(null);
                    } else {
                        // Deselect previous selection
                        if (selectedIndex !== null) {
                            const prevLi = document.querySelector(`[data-card-id="${selectedIndex}"]`);
                            if (prevLi) prevLi.classList.remove('selected');
                        }
                        
                        // Select new card
                        selectedCard = card;
                        selectedIndex = index;
                        isFromHand = index < playerHand.length;
                        li.classList.add('selected');
                        updateHeroImage(card);
                    }
                    updateUI();
                };

                cardsList.appendChild(li);
            });

            // Confirm KO action
            confirmButton.onclick = () => {
                if (!selectedCard) return;

                console.log(`${selectedCard.name} has been KO'd.`);
                onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`);
                
                // Remove from correct array
                if (isFromHand) {
                    playerHand.splice(selectedIndex, 1);
                } else {
                    cardsPlayedThisTurn.splice(selectedIndex - playerHand.length, 1);
                }
                
                koPile.push(selectedCard);
                closePopup();
                updateGameBoard();
                resolve();
            };

            function closePopup() {
                popupTitle.textContent = 'Hero Ability!';
                instructionsDiv.textContent = 'Context';
                confirmButton.style.display = 'none';
                heroImage.src = '';
                heroImage.style.display = 'none';
                hoverText.style.display = 'block';
                popup.style.display = 'none';
                modalOverlay.style.display = 'none';
            }
        }, 10);
    });
}

function revealStrengthOrWound() {

const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Strength').length === 0) {
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`)
drawWound();
} else {
setTimeout(() => {   
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Villains/Radiation_Zzzax.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
}, 10); // 10ms delay
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

const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        !card.isCopied && 
        !card.sidekickToDestroy
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Strength').length === 0) {
onscreenConsole.log('You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.')
drawWound();
} else {
setTimeout(() => {   

const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Masterminds/Loki_1.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
}, 10); // 10ms delay
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

const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Tech').length === 0) {
onscreenConsole.log('You are unable to reveal a Tech hero.')
drawWound();
} else {
setTimeout(() => { 
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD TO AVOID GAINING A WOUND?",
        "Yes",
        "No"
    );
    
document.getElementById('hero-ability-may-h2').innerHTML = 'SCHEME TWIST!';
    

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Schemes/legacyvirus.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
document.getElementById('hero-ability-may-h2').innerHTML = 'HERO ABILITY!';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
document.getElementById('hero-ability-may-h2').innerHTML = 'HERO ABILITY!';
    };
 }, 10); // 10ms delay
}
}


function EscapeRevealTechOrWound() {
onscreenConsole.log('Escape! Reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero or gain a Wound.');

const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Tech').length === 0) {
onscreenConsole.log('You are unable to reveal a Tech hero.')
drawWound();
} else {
setTimeout(() => {  
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Villains/MastersOfEvil_Ultron.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
 }, 10); // 10ms delay
}
}

function revealRangeOrWound() {

const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Range').length === 0) {
onscreenConsole.log('You are unable to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero.')
drawWound();
} else {
setTimeout(() => {  
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Villains/EnemiesOfAsgard_FrostGiant.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
 }, 10); // 10ms delay
}
}

function EscapeRevealRangeOrWound() {
onscreenConsole.log('Escape! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.');
revealRangeOrWound();
}

function AmbushRevealRangeOrWound() {
onscreenConsole.log('Ambush! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.');

const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Range').length === 0) {
onscreenConsole.log('You are unable to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero.')
drawWound();
} else {
setTimeout(() => {  
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Villains/EnemiesOfAsgard_Ymir.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
 }, 10); // 10ms delay
}
}

function FightRevealRangeOrWound() {
onscreenConsole.log('Fight! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.');
revealRangeOrWound();
}






function doomHeroRecruit() {
    return new Promise((resolve) => {
        const eligibleHeroesForDoomRecruit = hq.map((item, index) => ({ ...item, index }))
                                 .filter(item => item.class1 === 'Tech' || item.class1 === 'Range');

        if (eligibleHeroesForDoomRecruit.length === 0) {
            console.log('No available Tech or Range Heroes to recruit.');
            onscreenConsole.log(`No available <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='console-card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='console-card-icons'> Heroes to recruit.`);
            resolve(false);
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Recruit a Hero';
        instructionsDiv.innerHTML = `Select a <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='card-icons'> Hero to recruit for free.`;
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Recruit Hero';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = `Select a <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='card-icons'> Hero to recruit for free.`;
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be recruited for free.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, index, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedIndex = index;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with eligible heroes
        eligibleHeroesForDoomRecruit.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard) {
                recruitHeroConfirmed(selectedCard, selectedCard.index);
                totalRecruitPoints += selectedCard.cost;
                
                console.log(`${selectedCard.name} has been recruited.`);
                onscreenConsole.log(`You have recruited <span class="console-highlights">${selectedCard.name}</span> for free.`);

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function instantVillainDefeat() {
    return new Promise((resolve, reject) => {
        const villainsInCity = city
            .map((card, index) => (card && card.type === 'Villain') ? { ...card, id: `city-${index}`, index } : null)
            .filter(card => card !== null);

        if (villainsInCity.length === 0) {
            onscreenConsole.log('There are no Villains available to defeat.');
            resolve();
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const defeatButton = document.getElementById('card-choice-confirm-button');
        const noThanksButton = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Defeat Villain';
        instructionsDiv.innerHTML = 'Select a Villain or Henchman to defeat.';
        cardsList.innerHTML = '';
        defeatButton.style.display = 'inline-block';
        defeatButton.disabled = true;
        defeatButton.textContent = 'DEFEAT SELECTED VILLAIN';
        noThanksButton.style.display = 'none';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedVillain = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update defeat button state
        function updateDefeatButton() {
            defeatButton.disabled = selectedVillain === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedVillain === null) {
                instructionsDiv.textContent = 'Select a Villain or Henchman to defeat.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedVillain.name}</span> will be defeated.`;
            }
        }

        // Show/hide villain image
        function updateVillainImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle villain selection
        function toggleVillainSelection(card, listItem) {
            if (selectedVillain === card) {
                // Deselect if same villain clicked
                selectedVillain = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateVillainImage(null);
            } else {
                // Clear previous selection if any
                if (selectedVillain) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new villain
                selectedVillain = card;
                selectedIndex = card.index;
                listItem.classList.add('selected');
                updateVillainImage(card);
            }

            updateDefeatButton();
            updateInstructions();
        }

        // Populate the list with eligible villains
        villainsInCity.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleVillainSelection(card, li);
            cardsList.appendChild(li);
        });

        // Handle defeat confirmation
        defeatButton.onclick = () => {
            if (selectedVillain) {
                // Calculate attack points
                const tempBuffVariableName = `city${selectedVillain.index + 1}TempBuff`;
                const tempBuffValue = window[tempBuffVariableName] || 0;
                const permBuffVariableName = `city${selectedVillain.index + 1}PermBuff`;
                const permBuffValue = window[permBuffVariableName] || 0;

                let villainAttack = selectedVillain.attack + tempBuffValue + permBuffValue;
                if (villainAttack < 0) villainAttack = 0;

                totalAttackPoints += villainAttack;
                confirmAttack(selectedVillain.index);

                console.log(`${selectedVillain.name} has been defeated.`);
                onscreenConsole.log(`You have defeated <span class="console-highlights">${selectedVillain.name}</span>.`);

                closePopup();
                updateGameBoard();
                resolve();
            } else {
                alert("You must select a valid Villain to defeat.");
                reject("No villain selected");
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            defeatButton.style.display = 'none';
            defeatButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function KO1To4FromDiscard() {
    return new Promise((resolve) => {
        if (playerDiscardPile.length === 0) {
            console.log('No cards in the Discard Pile to KO.');
            onscreenConsole.log('Your discard pile is currently empty. Unable to KO any cards.');
            resolve();
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'KO Cards';
        instructionsDiv.innerHTML = 'You may select up to four cards from your discard pile to KO.';
        cardsList.innerHTML = '';
        koButton.style.display = 'inline-block';
        koButton.disabled = false;
        koButton.textContent = 'No Thanks!';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCards = [];
        let activeImage = null;

        // Update KO button text and state
        function updateKOButton() {
            if (selectedCards.length > 0) {
                koButton.textContent = `KO ${selectedCards.length} Selected Card${selectedCards.length !== 1 ? 's' : ''}`;
            } else {
                koButton.textContent = 'No Thanks!';
            }
        }

        // Update instructions with selected cards
        function updateInstructions() {
            if (selectedCards.length === 0) {
                instructionsDiv.textContent = 'You may select up to four cards from your discard pile to KO.';
            } else {
                const names = selectedCards.map(card => `<span class="console-highlights">${card.name}</span>`).join(', ');
                instructionsDiv.innerHTML = `Selected: ${names} (${selectedCards.length}/4)`;
            }
        }

        // Show/hide card image
        function updateCardImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, listItem) {
            const cardIndex = selectedCards.indexOf(card);
            
            if (cardIndex > -1) {
                // Deselect card
                selectedCards.splice(cardIndex, 1);
                listItem.classList.remove('selected');
                if (activeImage === card.image) updateCardImage(null);
            } else if (selectedCards.length < 4) {
                // Select card
                selectedCards.push(card);
                listItem.classList.add('selected');
                updateCardImage(card);
            }

            updateKOButton();
            updateInstructions();
        }

        // Populate the list with discard pile cards
        playerDiscardPile.forEach((card, index) => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', `discard-${index}`);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, li);
            cardsList.appendChild(li);
        });

        // Handle KO button click
        koButton.onclick = () => {
            if (selectedCards.length > 0) {
                selectedCards.forEach(card => {
                    const cardIndex = playerDiscardPile.indexOf(card);
                    if (cardIndex !== -1) {
                        playerDiscardPile.splice(cardIndex, 1);
                        koPile.push(card);
                        console.log(`${card.name} KO'd from discard pile.`);
                        onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
                    }
                });
            } else {
                console.log('No cards selected for KO.');
                onscreenConsole.log('You chose not to KO any cards.');
            }

            closePopup();
            updateGameBoard();
            resolve();
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'No Thanks!';
            koButton.style.display = 'none';
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}


function chooseVillainKOFromVP() {
    return new Promise((resolve) => {
        const villainsInVP = victoryPile
            .map((card, index) => (card && (card.type === 'Villain' || card.type === 'Henchman')) 
                ? { ...card, id: `vp-${index}`, index } 
                : null)
            .filter(card => card !== null);

        if (villainsInVP.length === 0) {
            onscreenConsole.log('There are no Villains in your Victory Pile to KO.');
            resolve();
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'KO a Villain';
        instructionsDiv.innerHTML = 'Select a Villain or Henchman to KO from your Victory Pile.';
        cardsList.innerHTML = '';
        koButton.style.display = 'inline-block';
        koButton.disabled = true;
        koButton.textContent = 'KO Selected Villain';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedVillain = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update KO button state
        function updateKOButton() {
            koButton.disabled = selectedVillain === null;
        }

        // Update instructions with selected card
        function updateInstructions() {
            if (selectedVillain === null) {
                instructionsDiv.textContent = 'Select a Villain or Henchman to KO from your Victory Pile.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedVillain.name}</span> will be KO'd.`;
            }
        }

        // Show/hide villain image
        function updateVillainImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle villain selection
        function toggleVillainSelection(card, listItem) {
            if (selectedVillain === card) {
                // Deselect if same card clicked
                selectedVillain = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateVillainImage(null);
            } else {
                // Clear previous selection if any
                if (selectedVillain) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new villain
                selectedVillain = card;
                selectedIndex = card.index;
                listItem.classList.add('selected');
                updateVillainImage(card);
            }

            updateKOButton();
            updateInstructions();
        }

        // Populate the list with eligible villains
        villainsInVP.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleVillainSelection(card, li);
            cardsList.appendChild(li);
        });

        // Handle KO confirmation
        koButton.onclick = () => {
            if (selectedVillain) {
                victoryPile.splice(selectedIndex, 1);
                koPile.push(selectedVillain);
                
                console.log(`${selectedVillain.name} KO'd from Victory Pile.`);
                onscreenConsole.log(`<span class="console-highlights">${selectedVillain.name}</span> has been KO'd from your Victory Pile.`);

                closePopup();
                updateGameBoard();
                resolve();
            } else {
                alert("Please select a Villain to KO.");
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'Confirm';
            koButton.style.display = 'none';
            koButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}


function chooseBystanderKOFromVP() {
    return new Promise((resolve) => {
        const bystandersInVP = victoryPile
            .map((card, index) => (card && card.type === 'Bystander') 
                ? { ...card, id: `vp-${index}`, index } 
                : null)
            .filter(card => card !== null);

        // Handle cases with 0-2 bystanders immediately
        if (bystandersInVP.length === 0) {
            onscreenConsole.log('There are no Bystanders in your Victory Pile to KO.');
            updateGameBoard();
            resolve();
            return;
        }

        if (bystandersInVP.length <= 2) {
            bystandersInVP.forEach(card => {
                victoryPile.splice(card.index, 1);
                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            });
            updateGameBoard();
            resolve();
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const koButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'KO Bystanders';
        instructionsDiv.innerHTML = 'Select exactly two Bystanders to KO from your Victory Pile.';
        cardsList.innerHTML = '';
        koButton.style.display = 'inline-block';
        koButton.disabled = true;
        koButton.textContent = 'KO Selected Bystanders';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedBystanders = [];
        let activeImage = null;

        // Update KO button state and text
        function updateKOButton() {
            const count = selectedBystanders.length;
            koButton.disabled = count !== 2;
            koButton.textContent = count === 2 ? 'KO 2 Selected Bystanders' : `Select ${2 - count} More`;
        }

        // Update instructions with selection status
        function updateInstructions() {
            const count = selectedBystanders.length;
            if (count === 0) {
                instructionsDiv.textContent = 'Select exactly two Bystanders to KO from your Victory Pile.';
            } else {
                const names = selectedBystanders.map(b => `<span class="console-highlights">${b.name}</span>`).join(', ');
                instructionsDiv.innerHTML = `Selected: ${names} (${count}/2)`;
            }
        }

        // Show/hide bystander image
        function updateBystanderImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle bystander selection
        function toggleBystanderSelection(card, listItem) {
            const index = selectedBystanders.indexOf(card);
            
            if (index > -1) {
                // Deselect
                selectedBystanders.splice(index, 1);
                listItem.classList.remove('selected');
                if (activeImage === card.image) updateBystanderImage(null);
            } else if (selectedBystanders.length < 2) {
                // Select
                selectedBystanders.push(card);
                listItem.classList.add('selected');
                updateBystanderImage(card);
            }

            updateKOButton();
            updateInstructions();
        }

        // Populate the list with bystanders
        bystandersInVP.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleBystanderSelection(card, li);
            cardsList.appendChild(li);
        });

        // Handle KO confirmation
        koButton.onclick = () => {
            if (selectedBystanders.length === 2) {
                selectedBystanders.forEach(card => {
                    victoryPile.splice(card.index, 1);
                    koPile.push(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> KO'd from Victory Pile.`);
                });
                
                closePopup();
                updateGameBoard();
                resolve();
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'Confirm';
            koButton.style.display = 'none';
            koButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
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
    return new Promise((resolve) => {
        const eligibleHeroesForXMenRecruit = hq.map((item, index) => ({ ...item, index }))
                                 .filter(item => item.team === 'X-Men');

        if (eligibleHeroesForXMenRecruit.length === 0) {
            console.log('No available X-Men Heroes to recruit.');
            onscreenConsole.log(`No available <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes to recruit.`);
            resolve(false);
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Recruit a Hero';
        instructionsDiv.innerHTML = `Select an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Hero from the HQ to recruit for free.`;
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Recruit Hero';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = `Select an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Hero from the HQ to recruit for free.`;
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be recruited for free.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, index, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedIndex = index;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with eligible heroes
        eligibleHeroesForXMenRecruit.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard) {
                recruitHeroConfirmed(selectedCard, selectedCard.index);
                totalRecruitPoints += selectedCard.cost;
                
                console.log(`${selectedCard.name} has been recruited.`);
                onscreenConsole.log(`You have recruited <span class="console-highlights">${selectedCard.name}</span> for free.`);

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function MagnetoRevealXMenOrWound() {

const cardsYouHave = [
    ...playerHand, // Include all cards in hand (unchanged)
    ...cardsPlayedThisTurn.filter(card => 
        !card.isCopied &&  // Exclude copied cards
        !card.sidekickToDestroy // Exclude sidekicks marked for destruction
    )
];

if (cardsYouHave.filter(item => item.team === 'X-Men').length === 0) {
console.log('You are unable to reveal an X-Men hero.')
onscreenConsole.log(`You are unable to reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero.`)
drawWound();
drawWound();
} else {
setTimeout(() => {  
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Masterminds/Magneto_3.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have escaped gaining Wounds!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`);
drawWound();
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
  }, 10); // 10ms delay
}
}

function revealXMenOrWound() {

const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.team === 'X-Men').length === 0) {
onscreenConsole.log(`You are unable to reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero.`)
drawWound();
} else {
setTimeout(() => {  
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Villains/Brotherhood_Sabretooth.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
  }, 10); // 10ms delay
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
    const cardsYouHave = [
    ...playerHand, // Include all cards in hand (unchanged)
    ...cardsPlayedThisTurn.filter(card => 
        !card.isCopied &&  // Exclude copied cards
        !card.sidekickToDestroy // Exclude sidekicks marked for destruction
    )
];

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
updateGameBoard();
    }
}

function AvengersToBystanders() {
onscreenConsole.log(`Fight! For each of your <img src='Visual Assets/Icons/Avengers.svg' alt='Avengers Icon' class='console-card-icons'> Heroes, rescue a Bystander.`);
    const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];
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
    return new Promise((resolve) => {
        const cardsYouHave = [
            ...playerHand,
            ...cardsPlayedThisTurn.filter(card => 
                !card.isCopied && 
                !card.sidekickToDestroy
            )
        ];
        const XMenCardsYouHave = cardsYouHave.filter(item => item.team === 'X-Men');

        if (XMenCardsYouHave.length === 0) {
            console.log('No available X-Men Heroes.');
            onscreenConsole.log(`You do not have any <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes to add to next turn's draw.`);
            resolve(false);
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Mastermind Tactic!';
        instructionsDiv.innerHTML = `Choose one of your <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Heroes to add to next turn's draw.`;
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Select Hero';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        // Update confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = `Choose one of your <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Heroes to add to next turn's draw.`;
            } else {
                const location = playerHand.includes(selectedCard) ? '(from Hand)' : '(from Played Cards)';
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> ${location} will be added to next turn's draw.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, index, listItem) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new card
                selectedCard = card;
                selectedIndex = index;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with eligible heroes
        XMenCardsYouHave.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            const location = playerHand.includes(card) ? '(Hand)' : '(Played Cards)';
            li.textContent = `${card.name} ${location}`;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleCardSelection(card, index, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard) {
                const cardCopy = { ...selectedCard };
                cardsToBeDrawnNextTurn.push(cardCopy);
                nextTurnsDraw++;
                
                // Mark the original card to be destroyed later
                selectedCard.markedToDestroy = true;
                
                console.log(`${selectedCard.name} has been reserved for next turn.`);
                onscreenConsole.log(`You have selected <span class="console-highlights">${selectedCard.name}</span> to be added to your next draw as a seventh card.`);

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
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
        // Calculate total available cards
        const totalAvailableCards = playerDeck.length + playerDiscardPile.length;

        if (totalAvailableCards < 3) {
            onscreenConsole.log('Not enough cards available to reveal and resolve.');
            console.log('Not enough cards available to reveal and resolve.');
            resolve(false);
            return;
        }

        // Draw up to 3 cards, shuffling if needed
        function drawCards(num) {
            const drawnCards = [];
            for (let i = 0; i < num; i++) {
                if (playerDeck.length === 0) {
                    if (playerDiscardPile.length > 0) {
                        playerDeck = shuffle(playerDiscardPile);
                        playerDiscardPile = [];
                    } else {
                        break;
                    }
                }
                drawnCards.push(playerDeck.shift());
            }
            return drawnCards;
        }

        const top3Cards = drawCards(3);
        if (top3Cards.length < 3) {
            resolve(false);
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = document.getElementById('cardChoiceh2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'MASTERMIND TACTIC!';
        instructionsDiv.textContent = 'Select a card to KO.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm KO';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;
        let currentAction = 'KO'; // KO -> Discard -> Return
        let availableCards = [...top3Cards];

        // Update UI based on current state
        function updateUI() {
            cardsList.innerHTML = '';
            confirmButton.disabled = true;
            selectedCard = null;
            selectedIndex = null;
            updateHeroImage(null);

            availableCards.forEach((card, index) => {
                const li = document.createElement('li');
                li.textContent = card.name;
                li.setAttribute('data-card-id', card.id);

                li.onmouseover = () => {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                };

                li.onmouseout = () => {
                    if (!activeImage) {
                        heroImage.src = '';
                        heroImage.style.display = 'none';
                        oneChoiceHoverText.style.display = 'block';
                    }
                };

                li.onclick = () => {
                    // Clear any previous selection
                    const selected = cardsList.querySelector('.selected');
                    if (selected) selected.classList.remove('selected');
                    
                    // Set new selection
                    li.classList.add('selected');
                    selectedCard = card;
                    selectedIndex = index;
                    activeImage = card.image;
                    updateHeroImage(card);
                    confirmButton.disabled = false;
                };

                cardsList.appendChild(li);
            });

            switch (currentAction) {
                case 'KO':
                    instructionsDiv.textContent = 'Select a card to KO.';
                    confirmButton.textContent = 'Confirm KO';
                    break;
                case 'Discard':
                    instructionsDiv.textContent = 'Select a card to discard.';
                    confirmButton.textContent = 'Confirm Discard';
                    break;
                case 'Return':
                    instructionsDiv.textContent = 'Select a card to return to deck.';
                    confirmButton.textContent = 'Confirm Return';
                    break;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Process the current action
        async function processAction() {
            if (!selectedCard) return;

            const card = selectedCard;

            switch (currentAction) {
                case 'KO':
                    koPile.push(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
                    break;
                case 'Discard':
                    await checkDiscardForInvulnerability(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been discarded.`);
                    break;
                case 'Return':
                    playerDeck.unshift(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been returned to your deck.`);
                    break;
            }

            // Remove processed card from available selections
            availableCards = availableCards.filter(c => c !== card);

            // Move to next action or complete
            if (currentAction === 'KO') {
                currentAction = 'Discard';
            } else if (currentAction === 'Discard') {
                currentAction = 'Return';
            } else {
                closePopup();
                updateGameBoard();
                resolve(true);
                return;
            }

            updateUI();
        }

        // Initialize the first selection UI
        updateUI();

        // Handle confirmation
        confirmButton.onclick = processAction;

        function closePopup() {
            popupTitle.textContent = 'HERO ABILITY';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function EscapeChooseHeroesToKO() {

onscreenConsole.log("Escape! You must KO two Heroes.");
chooseHeroesToKO();
}

function EscapeChooseHandHeroesToKO() {
onscreenConsole.log("Escape! You must KO two Heroes from your hand.");
    return new Promise((resolve, reject) => {
        const availableHeroes = [
            ...playerHand.filter(card => card && card.type === 'Hero')
        ].map((card, index) => ({ ...card, uniqueId: `${card.id}-${index}` }));

        if (availableHeroes.length === 0) {
            onscreenConsole.log("No Heroes available to KO.");
            resolve();
            return;
        }

        if (availableHeroes.length <= 2) {
            availableHeroes.forEach(card => {
                const indexInHand = playerHand.findIndex(c => c.id === card.id);

                if (indexInHand !== -1) {
                    playerHand.splice(indexInHand, 1);
                }

                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been automatically chosen and KO'd.`);
            });
            updateGameBoard();
            resolve();
            return;
        }

        // Get UI elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Hide the "No Thanks" button
        document.getElementById('close-choice-button').style.display = 'none';

        // Initialize UI
        popupTitle.textContent = 'KO Heroes';
        instructionsDiv.textContent = 'Select two Heroes to KO.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedHeroes = [];
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedHeroes.length !== 2;
        }

        function updateInstructions() {
            if (selectedHeroes.length < 2) {
                instructionsDiv.textContent = `Select ${2 - selectedHeroes.length} more Hero${selectedHeroes.length === 0 ? 's' : ''} to KO.`;
            } else {
                const namesList = selectedHeroes.length === 2 ? 
                    `<span class="console-highlights">${selectedHeroes[0].name}</span> and <span class="console-highlights">${selectedHeroes[1].name}</span>` :
                    `<span class="console-highlights">${selectedHeroes[0].name}</span>`;
                instructionsDiv.innerHTML = `Selected: ${namesList} will be KO'd.`;
            }
        }

        function updateHeroImage(hero) {
            if (hero) {
                heroImage.src = hero.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = hero.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        function toggleHeroSelection(card, listItem) {
            const index = selectedHeroes.findIndex(h => h.uniqueId === card.uniqueId);
            
            if (index > -1) {
                selectedHeroes.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedHeroes.length >= 2) {
                    const firstSelected = document.querySelector(`[data-card-id="${selectedHeroes[0].uniqueId}"]`);
                    if (firstSelected) firstSelected.classList.remove('selected');
                    selectedHeroes.shift();
                }
                selectedHeroes.push(card);
                listItem.classList.add('selected');
            }

            if (selectedHeroes.length > 0) {
                updateHeroImage(selectedHeroes[selectedHeroes.length - 1]);
            } else {
                updateHeroImage(null);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with available heroes
        availableHeroes.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.uniqueId);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleHeroSelection(card, li);
            cardsList.appendChild(li);
        });

        confirmButton.onclick = () => {
            if (selectedHeroes.length === 2) {
                selectedHeroes.forEach(card => {
                    const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(c => c.id === card.id);
                    const indexInHand = playerHand.findIndex(c => c.id === card.id);

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
                resolve();
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.textContent = 'Confirm';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}



function chooseHeroesToKO() {
    return new Promise((resolve, reject) => {
        const availableHeroes = [
            ...playerHand.filter(card => card && card.type === 'Hero'),
            ...cardsPlayedThisTurn.filter(card => 
                card && 
                card.type === 'Hero' && 
                !card.isCopied && 
                !card.sidekickToDestroy
            )
        ].map((card, index) => ({ ...card, uniqueId: `${card.id}-${index}` }));

        if (availableHeroes.length === 0) {
            onscreenConsole.log("No Heroes available to KO.");
            resolve();
            return;
        }

        if (availableHeroes.length <= 2) {
            availableHeroes.forEach(card => {
                const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(c => c.id === card.id);
                const indexInHand = playerHand.findIndex(c => c.id === card.id);

                if (indexInCardsPlayed !== -1) {
                    cardsPlayedThisTurn.splice(indexInCardsPlayed, 1);
                } else if (indexInHand !== -1) {
                    playerHand.splice(indexInHand, 1);
                }

                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been automatically chosen and KO'd.`);
            });
            updateGameBoard();
            resolve();
            return;
        }

        // Get UI elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Hide the "No Thanks" button
        document.getElementById('close-choice-button').style.display = 'none';

        // Initialize UI
        popupTitle.textContent = 'KO Heroes';
        instructionsDiv.textContent = 'Select two Heroes to KO.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedHeroes = [];
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedHeroes.length !== 2;
        }

        function updateInstructions() {
            if (selectedHeroes.length < 2) {
                instructionsDiv.textContent = `Select ${2 - selectedHeroes.length} more Hero${selectedHeroes.length === 0 ? 's' : ''} to KO.`;
            } else {
                const namesList = selectedHeroes.length === 2 ? 
                    `<span class="console-highlights">${selectedHeroes[0].name}</span> and <span class="console-highlights">${selectedHeroes[1].name}</span>` :
                    `<span class="console-highlights">${selectedHeroes[0].name}</span>`;
                instructionsDiv.innerHTML = `Selected: ${namesList} will be KO'd.`;
            }
        }

        function updateHeroImage(hero) {
            if (hero) {
                heroImage.src = hero.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = hero.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        function toggleHeroSelection(card, listItem) {
            const index = selectedHeroes.findIndex(h => h.uniqueId === card.uniqueId);
            
            if (index > -1) {
                selectedHeroes.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedHeroes.length >= 2) {
                    const firstSelected = document.querySelector(`[data-card-id="${selectedHeroes[0].uniqueId}"]`);
                    if (firstSelected) firstSelected.classList.remove('selected');
                    selectedHeroes.shift();
                }
                selectedHeroes.push(card);
                listItem.classList.add('selected');
            }

            if (selectedHeroes.length > 0) {
                updateHeroImage(selectedHeroes[selectedHeroes.length - 1]);
            } else {
                updateHeroImage(null);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with available heroes
        availableHeroes.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.uniqueId);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleHeroSelection(card, li);
            cardsList.appendChild(li);
        });

        confirmButton.onclick = () => {
            if (selectedHeroes.length === 2) {
                selectedHeroes.forEach(card => {
                    const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(c => c.id === card.id);
                    const indexInHand = playerHand.findIndex(c => c.id === card.id);

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
                resolve();
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.textContent = 'Confirm';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
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

function ambushBystander() {
    let sewersIndex = city.length - 1;

    if (bystanderDeck.length === 0) {
        console.log("No bystanders left in the deck to rescue.");
        onscreenConsole.log('Ambush! No Bystanders available for <span class="console-highlights">Green Goblin</span> to capture.');
    } else {
        const ambushedBystander = bystanderDeck.pop();
        
        if (city[sewersIndex].bystander) {
            city[sewersIndex].bystander.push(ambushedBystander);
        } else {
            city[sewersIndex].bystander = [ambushedBystander];
        }

        const villain = city[sewersIndex]; 

        onscreenConsole.log(`Ambush! Bystander captured by <span class="console-highlights">${villain.name}</span>.`);

        updateGameBoard();
    }
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
    return new Promise((resolve) => {
        const availableHeroes = playerDiscardPile.filter(card => card && card.type === 'Hero');

        // Handle cases with 0-2 heroes immediately
        if (availableHeroes.length === 0) {
            onscreenConsole.log("No Heroes available to KO in the discard pile.");
            resolve();
            return;
        }

        if (availableHeroes.length <= 2) {
            availableHeroes.forEach(card => {
                const index = playerDiscardPile.indexOf(card);
                if (index !== -1) playerDiscardPile.splice(index, 1);
                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> automatically KO'd from discard.`);
            });
            updateGameBoard();
            resolve();
            return;
        }

        // Setup UI elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const hoverText = document.getElementById('oneChoiceHoverText');

        // Hide the "No Thanks" button
        document.getElementById('close-choice-button').style.display = 'none';

        // Initialize UI
        popupTitle.textContent = 'KO Heroes';
        instructionsDiv.textContent = 'Select two Heroes to KO from discard.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'CONFIRM';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedHeroes = [];
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedHeroes.length !== 2;
        }

        function updateInstructions() {
            if (selectedHeroes.length === 0) {
                instructionsDiv.innerHTML = 'Select two Heroes to KO from discard.';
            } else {
                const names = selectedHeroes.map(h => 
                    `<span class="console-highlights">${h.name}</span>`
                ).join(', ');
                
                instructionsDiv.innerHTML = `Selected: ${names}. ${selectedHeroes.length < 2 ? 
                    `Select ${2 - selectedHeroes.length} more Hero${selectedHeroes.length === 1 ? '' : 's'}` : 
                    'Ready to confirm KO.'}`;
            }
        }

        function updateHeroImage(hero) {
            if (hero) {
                heroImage.src = hero.image;
                heroImage.style.display = 'block';
                hoverText.style.display = 'none';
                activeImage = hero.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                hoverText.style.display = 'block';
                activeImage = null;
            }
        }

        function toggleHeroSelection(card, listItem) {
            const index = selectedHeroes.indexOf(card);
            
            if (index !== -1) {
                selectedHeroes.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedHeroes.length >= 2) {
                    const firstSelected = document.querySelector(`[data-card-id="${selectedHeroes[0].id}"]`);
                    if (firstSelected) firstSelected.classList.remove('selected');
                    selectedHeroes.shift();
                }
                selectedHeroes.push(card);
                listItem.classList.add('selected');
            }

            updateHeroImage(selectedHeroes.length > 0 ? selectedHeroes[selectedHeroes.length - 1] : null);
            updateConfirmButton();
            updateInstructions();
        }

        // Populate hero list
        availableHeroes.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleHeroSelection(card, li);
            cardsList.appendChild(li);
        });

        confirmButton.onclick = () => {
            if (selectedHeroes.length !== 2) return;

            selectedHeroes.forEach(card => {
                const index = playerDiscardPile.indexOf(card);
                if (index !== -1) playerDiscardPile.splice(index, 1);
                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> KO'd from discard.`);
            });

            closePopup();
            updateGameBoard();
            resolve();
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            heroImage.src = '';
            heroImage.style.display = 'none';
            hoverText.style.display = 'block';

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
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
    skrullShapeshifters.overlayText = `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">SKRULL</span><img src="${hero.image}" alt="${hero.name}" class="hero-image-overlay">`;

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
    skrullQueen.overlayText = `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">SKRULL</span><img src="${hero.image}" alt="${hero.name}" class="hero-image-overlay">`;

    onscreenConsole.log(`<span class="console-highlights">Skrull Queen Veranke</span> has captured <span class="console-highlights">${hero.name}</span>. This Villain now has ${skrullQueen.originalAttack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Fight this Villain to gain the captured Hero.`);

    // Update the game board to reflect the changes
    updateGameBoard();
}

function showHeroSelectionPopup(heroes, onHeroSelected) {
    return new Promise((resolve) => {
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.innerHTML = `AMBUSH!`;
        instructionsDiv.innerHTML = 'There are multiple heroes with the same cost for <span class="console-highlights">Skrull Queen Veranke</span> to capture. Select one.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block'; // Always visible
        confirmButton.disabled = true; // Disabled by default
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedHero = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedHero === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedHero === null) {
                instructionsDiv.innerHTML = 'There are multiple heroes with the same cost for <span class="console-highlights">Skrull Queen Veranke</span> to capture. Select one.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedHero.name}</span> will be captured by <span class="console-highlights">Skrull Queen Veranke</span>.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(hero) {
            if (hero) {
                heroImage.src = hero.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = hero.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle hero selection
        function toggleHeroSelection(hero, listItem) {
            if (selectedHero === hero) {
                // Deselect if same hero clicked
                selectedHero = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Select new hero
                selectedHero = hero;
                // Clear previous selection
                Array.from(cardsList.children).forEach(li => li.classList.remove('selected'));
                listItem.classList.add('selected');
                updateHeroImage(hero);
            }

            updateConfirmButton();
            updateInstructions();
            console.log('Selected Hero for capture:', selectedHero ? selectedHero.name : 'None');
        }

        // Populate hero list
        heroes.forEach(hero => {
            const li = document.createElement('li');
            li.textContent = hero.name;
            li.setAttribute('data-card-id', hero.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = hero.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleHeroSelection(hero, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedHero) {
                onHeroSelected(selectedHero);
                closePopup();
                resolve(selectedHero);
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.textContent = 'Confirm';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
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
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Recruit a Hero';
        instructionsDiv.textContent = 'Choose a Hero in the HQ and gain it.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block'; // Always visible
        confirmButton.disabled = true; // Disabled by default
        confirmButton.textContent = 'Recruit Hero';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedHero = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedHero === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedHero === null) {
                instructionsDiv.textContent = 'Choose a Hero in the HQ and gain it.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedHero.name}</span> will be recruited.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(hero) {
            if (hero) {
                heroImage.src = hero.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = hero.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle hero selection
        function toggleHeroSelection(hero, listItem) {
            if (selectedHero === hero) {
                // Deselect if same hero clicked
                selectedHero = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Select new hero
                selectedHero = hero;
                // Clear previous selection
                Array.from(cardsList.children).forEach(li => li.classList.remove('selected'));
                listItem.classList.add('selected');
                updateHeroImage(hero);
            }

            updateConfirmButton();
            updateInstructions();
            console.log('Selected Hero for recruit:', selectedHero ? selectedHero.name : 'None');
        }

        // Populate the list with eligible heroes
        eligibleHeroesForRecruit.forEach(card => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.index);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleHeroSelection(card, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedHero) {
                recruitHeroConfirmed(selectedHero, selectedHero.index);
                totalRecruitPoints += selectedHero.cost;
                updateGameBoard();
                closePopup();
                resolve();
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.textContent = 'Confirm';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
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
        SHIELDImage.src = "Visual Assets/Heroes/SHIELD/shieldofficer.webp"; 


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
        // Get reference to original card
        const originalCard = cardsPlayedThisTurn[i];
        
        // Create marked duplicate
        const markedDuplicate = { ...originalCard, markedToDestroy: true };
        
        // Replace original with marked duplicate in cardsPlayedThisTurn
        cardsPlayedThisTurn[i] = markedDuplicate;
        
        // Move original to KO pile
        koPile.push(originalCard);
        
        shieldKOCounter++; // Increment the counter
    }
}

    if (shieldKOCounter > 0) {
        const cardText = shieldKOCounter === 1 ? 'card' : 'cards'; // Determine singular or plural
        onscreenConsole.log(`KO'd ${shieldKOCounter} <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> ${cardText}.`);
    } else {
        onscreenConsole.log('No <img src="Visual Assets/Icons/SHIELD.svg" alt="SHIELD Icon" class="console-card-icons"> cards available to KO.');
    }

    updateGameBoard();
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
    onscreenConsole.log('Fight! For each of your <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Heroes, KO one of your Heroes.');
    return new Promise((resolve, reject) => {
        // Add unique identifiers to each card
        const availableHeroes = [...cardsPlayedThisTurn, ...playerHand]
    .filter(card => 
        card && 
        card.type === 'Hero' &&
        (card.fromHand || (!card.isCopied && !card.sidekickToDestroy))
    ) // <-- This was missing
    .map((card, index) => ({
                    ...card, 
                uniqueId: `${card.id}-${index}` // Create unique identifier
            }));

        if (availableHeroes.length === 0) {
            onscreenConsole.log('No Heroes available to KO.');
            resolve();
            return;
        }

        // Find all Strength Heroes
        const strengthHeroes = [...cardsPlayedThisTurn, ...playerHand]
            .filter(card => card && card.class1 === 'Strength');

        const numberToKO = strengthHeroes.length;

        if (numberToKO === 0) {
            onscreenConsole.log('No <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Heroes found. No cards need to be KO\'d.');
            resolve();
            return;
        }

        onscreenConsole.log(`You have ${numberToKO} <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero${numberToKO > 1 ? 'es' : ''}. You must KO ${numberToKO} card${numberToKO > 1 ? 's' : ''}.`);

        if (availableHeroes.length <= numberToKO) {
            availableHeroes.forEach(card => {
                const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(c => c.id === card.id);
                const indexInHand = playerHand.findIndex(c => c.id === card.id);

                if (indexInCardsPlayed !== -1) {
                    cardsPlayedThisTurn.splice(indexInCardsPlayed, 1);
                } else if (indexInHand !== -1) {
                    playerHand.splice(indexInHand, 1);
                }

                koPile.push(card);
                onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            });
            updateGameBoard();
            resolve();
            return;
        }

        // Get UI elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Hide the "No Thanks" button
        const noThanksButton = document.getElementById('close-choice-button');
        noThanksButton.style.display = 'none';

        // Initialize UI
        popupTitle.textContent = 'KO Heroes';
        instructionsDiv.innerHTML = `Select ${numberToKO} Hero${numberToKO > 1 ? 'es' : ''} to KO.`;
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedHeroes = [];
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedHeroes.length !== numberToKO;
        }

        // Update instructions with styled card names and proper list formatting
        function updateInstructions() {
            if (selectedHeroes.length < numberToKO) {
                const remaining = numberToKO - selectedHeroes.length;
                instructionsDiv.innerHTML = `Select ${remaining} more Hero${remaining > 1 ? 'es' : ''} to KO.`;
            } else {
                // Format the list of names with proper English conjunctions
                let namesList;
                if (selectedHeroes.length === 1) {
                    namesList = `<span class="console-highlights">${selectedHeroes[0].name}</span>`;
                } 
                else if (selectedHeroes.length === 2) {
                    namesList = `<span class="console-highlights">${selectedHeroes[0].name}</span> and <span class="console-highlights">${selectedHeroes[1].name}</span>`;
                }
                else {
                    // For 3+ items, use Oxford comma style
                    const allButLast = selectedHeroes.slice(0, -1).map(hero => 
                        `<span class="console-highlights">${hero.name}</span>`
                    ).join(', ');
                    const last = `<span class="console-highlights">${selectedHeroes[selectedHeroes.length - 1].name}</span>`;
                    namesList = `${allButLast}, and ${last}`;
                }
                instructionsDiv.innerHTML = `Selected: ${namesList} will be KO'd.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(hero) {
            if (hero) {
                heroImage.src = hero.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = hero.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Improved toggle hero selection with unique IDs
        function toggleHeroSelection(card, listItem) {
            const index = selectedHeroes.findIndex(h => h.uniqueId === card.uniqueId);
            
            if (index > -1) {
                // Deselect if already selected
                selectedHeroes.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedHeroes.length >= numberToKO) {
                    // If we've reached max selections, replace the first one
                    const firstSelected = document.querySelector(`[data-card-id="${selectedHeroes[0].uniqueId}"]`);
                    if (firstSelected) firstSelected.classList.remove('selected');
                    selectedHeroes.shift();
                }
                // Select new hero
                selectedHeroes.push(card);
                listItem.classList.add('selected');
            }

            // Show image of last selected hero
            if (selectedHeroes.length > 0) {
                updateHeroImage(selectedHeroes[selectedHeroes.length - 1]);
            } else {
                updateHeroImage(null);
            }

            updateConfirmButton();
            updateInstructions();
            console.log('Selected Heroes for KO:', selectedHeroes.map(hero => hero.name));
        }

        // Populate the list with available heroes
        availableHeroes.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.setAttribute('data-card-id', card.uniqueId);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleHeroSelection(card, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedHeroes.length === numberToKO) {
                selectedHeroes.forEach(card => {
                    const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(c => c.id === card.id);
                    const indexInHand = playerHand.findIndex(c => c.id === card.id);

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
                resolve();
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.textContent = 'Confirm';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
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

        let selectedWounds = [];
        const koButton = document.getElementById("close-ko-button");

        // Function to update KO button state
        function updateKoButton() {
            koButton.disabled = selectedWounds.length === 0;
        }

        discardPile.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            // On mouseover, change the hero image to the selected card's image
            li.onmouseover = () => {
                KOImage.src = card.image;
                KOImage.style.display = 'block';
                hoverText.style.display = 'none';
            };

            // On mouseout, reset the image to its default state (or hide it)
            li.onmouseout = () => {
                KOImage.src = '';
                KOImage.style.display = 'none';
                hoverText.style.display = 'block';
            };

            li.onclick = () => {
                toggleWoundSelection(card, "discard", li);
                updateKoButton(); // Update button state after selection
            };
            discardPileList.appendChild(li);
        });

        hand.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            // On mouseover, change the hero image to the selected card's image
            li.onmouseover = () => {
                KOImage.src = card.image;
                KOImage.style.display = 'block';
                hoverText.style.display = 'none';
            };

            // On mouseout, reset the image to its default state (or hide it)
            li.onmouseout = () => {
                KOImage.src = '';
                KOImage.style.display = 'none';
                hoverText.style.display = 'block';
            };

            li.onclick = () => {
                toggleWoundSelection(card, "hand", li);
                updateKoButton(); // Update button state after selection
            };
            handList.appendChild(li);
        });

        // Function to toggle selection of wounds from hand or discard
        function toggleWoundSelection(card, location, listItem) {
            const index = selectedWounds.indexOf(card);
            if (index > -1) {
                selectedWounds.splice(index, 1);
                listItem.classList.remove('selected-wound'); // Changed to match other popups
            } else {
                selectedWounds.push(card);
                listItem.classList.add('selected-wound'); // Changed to match other popups
            }
            console.log('Selected Wounds for KO:', selectedWounds.map(c => c.name));
        }

        // Display the KO popup
        document.getElementById("card-ko-popup").style.display = "block";
        document.getElementById("modal-overlay").style.display = "block";
        document.getElementById("card-ko-popup-h2").innerHTML = "Select any number of Wounds from your hand and/or discard pile to KO.";

        // Initialize KO button state
        koButton.style.display = 'block';
        koButton.disabled = true; // Disabled by default

        koButton.onclick = () => {
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
            koButton.style.display = 'none';
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

function doubleVillainDraw() {
  return new Promise((resolve) => {  // Make it return a Promise
    onscreenConsole.log(`<span style="font-style:italic">Playing the top two cards of the Villain Deck...</span>`);

    drawMultipleVillainCards(2).then(() => {
      console.log("Both villain cards have been played.");
      resolve();  // Resolve when done
    }).catch((error) => {
      console.error("Error during double villain draw:", error);
      resolve();  // Still resolve on error
    });
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
    hero.attack = hero.cost + 2; // Assign the increased cost to attack
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
    hero.overlayText = `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">SKRULL</span>`;
hero.overlayTextAttack = `${hero.cost + 2}`;

    // Update the game board to reflect the changes
    updateGameBoard();
}

function showHeroSelectionSkrullPopup(heroes) {
    return new Promise((resolve, reject) => {
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Skrull Hero';
        instructionsDiv.textContent = 'Choose a Hero from the HQ to enter the city as a Skrull.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block'; // Always visible
        confirmButton.disabled = true; // Disabled by default
        confirmButton.textContent = 'Select Hero';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedHero = null;
        let activeImage = null;

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedHero === null;
        }

        // Update instructions with styled card name
        function updateInstructions() {
            if (selectedHero === null) {
                instructionsDiv.textContent = 'Choose a Hero from the HQ to enter the city as a Skrull.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedHero.name}</span> will enter as a Skrull.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(hero) {
            if (hero) {
                heroImage.src = hero.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = hero.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle hero selection
        function toggleHeroSkrullSelection(hero, listItem) {
            if (selectedHero === hero) {
                // Deselect if same hero clicked
                selectedHero = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Select new hero
                selectedHero = hero;
                // Clear previous selection
                Array.from(cardsList.children).forEach(li => li.classList.remove('selected'));
                listItem.classList.add('selected');
                updateHeroImage(hero);
            }

            updateConfirmButton();
            updateInstructions();
            console.log('Selected Hero for Skrull:', selectedHero ? selectedHero.name : 'None');
        }

        // Populate hero list
        heroes.forEach(hero => {
            const li = document.createElement('li');
            li.textContent = hero.name;
            li.setAttribute('data-card-id', hero.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = hero.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            };

            li.onclick = () => toggleHeroSkrullSelection(hero, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedHero) {
                resolve(selectedHero);
                closePopup();
            }
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.textContent = 'Confirm';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function unskrull(villainCard) {
    if (!villainCard) {
        console.error("Error: villainCard is undefined or null");
        return;
    }

    villainCard.attack = villainCard.originalAttack;
    villainCard.skrulled = false;
    villainCard.fightEffect = '';
villainCard.type = 'Hero';
villainCard.overlayTextAttack = '';

    playerDiscardPile.push(villainCard);
    victoryPile.pop(villainCard);
    onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been defeated and rescued from the Skrulls. They have been added to your Discard Pile.`);
    updateGameBoard();
}
