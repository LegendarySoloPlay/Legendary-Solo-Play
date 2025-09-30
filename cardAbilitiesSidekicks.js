//30.09.2025 20.55

function returnToSidekickDeck(card) {
    if (!card) {
        console.error("No card provided to returnToSidekickDeck.");
        return;
    }

    // Clone the card within the `cardsPlayedThisTurn` array
    let clonedCard = { ...card }; // Creates a shallow copy of the card object

    // Move one copy to the bottom of the sidekick deck
    sidekickDeck.unshift(clonedCard);

    // Mark the remaining copy in `cardsPlayedThisTurn` for destruction
    card.sidekickToDestroy = true;
updateGameBoard();
}

function sidekickExtraDraw() {
    let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Sidekick");
    if (!playedSidekick) {
        console.error("No sidekick card found in cardsPlayedThisTurn.");
        return;
    }

    if (autoSuperpowers) {
        // If autoSuperpowers is true, activate the superpower automatically
        onscreenConsole.log(`<span class="console-highlights">Sidekick</span> played. Special Ability activated.`);
        extraDraw();
        extraDraw();
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
    } else {
        // If autoSuperpowers is false, ask the player if they want to activate the superpower
        return new Promise((resolve, reject) => {
            const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                `DO YOU WISH TO ACTIVATE <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Special Ability?`,
                "Yes",
                "No"
            );

            document.getElementById('heroAbilityHoverText').style.display = 'none';

            const cardImage = document.getElementById('hero-ability-may-card');
            cardImage.src = playedSidekick.image;
            cardImage.style.display = 'block';

            confirmButton.onclick = () => {
                try {
                    onscreenConsole.log(`Sidekick played. Special Ability activated.`);
                    extraDraw();
                    extraDraw();
                    returnToSidekickDeck(playedSidekick);
                    updateGameBoard();
                    resolve();
                } catch (error) {
                    reject(error);
                }
                hideHeroAbilityMayPopup();
                document.getElementById('heroAbilityHoverText').style.display = 'block';
            };

            denyButton.onclick = () => {
                onscreenConsole.log(`You have chosen not to activate <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Special Ability.`);
                hideHeroAbilityMayPopup();
                document.getElementById('heroAbilityHoverText').style.display = 'block';
                resolve();
            };
        });
    }
}

function hairballExtraDraw() {
    let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Hairball");
    if (!playedSidekick) {
        console.error("No sidekick card found in cardsPlayedThisTurn.");
        return;
    }

    onscreenConsole.log(`<span class="console-highlights">Hairball</span> played. Special Ability activated.`);
    extraDraw();
    returnToSidekickDeck(playedSidekick);
updateGameBoard();
}

function msLionBystanderAndDraw() {
let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Ms. Lion");
    if (!playedSidekick) {
        console.error("No sidekick card found in cardsPlayedThisTurn.");
        return;
    }

    onscreenConsole.log(`<span class="console-highlights">Ms. Lion</span> played. Special Ability activated.`);
    rescueBystander();
    extraDraw();
    returnToSidekickDeck(playedSidekick);
updateGameBoard();
}

function lockheedBonusAttack() {
let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Lockheed");
    if (!playedSidekick) {
        console.error("No sidekick card found in cardsPlayedThisTurn.");
        return;
    }

    onscreenConsole.log(`<span class="console-highlights">Lockheed</span> played.`);
    if (cardsPlayedThisTurn.filter(card => card.class1 === "Range").length > 1) {
     totalAttackPoints += 1;
	cumulativeAttackPoints += 1;
    onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
} else {
    onscreenConsole.log(`A <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> hero has not been played. No additional <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
}
    returnToSidekickDeck(playedSidekick);
updateGameBoard();
}

function darwinAttackOrRecruit() {
    if (cardsPlayedThisTurn.length === 0) {
        console.warn("No cards have been played this turn.");
        return;
    }
    
    let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Darwin");
    if (!playedSidekick) {
        console.error("No sidekick card found in cardsPlayedThisTurn.");
        return;
    }

    // Get the last played card
    let lastPlayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 2];
   
    if (lastPlayedCard.attackIcon === true && lastPlayedCard.recruitIcon === true) {
        totalAttackPoints += 2;
	cumulativeAttackPoints += 2;
        totalRecruitPoints += 2;
	cumulativeRecruitPoints += 2;
        onscreenConsole.log(`You last played  <span class="console-highlights">${lastPlayedCard.name}</span>. It had both <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icons. +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and +2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
    } else if (lastPlayedCard.attackIcon === true) {
        totalAttackPoints += 2;
	cumulativeAttackPoints =+ 2;
        onscreenConsole.log(`You last played  <span class="console-highlights">${lastPlayedCard.name}</span>. It had an <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon. +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
    } else if (lastPlayedCard.recruitIcon === true) {
        totalRecruitPoints += 2;
	cumulativeRecruitPoints =+ 2;
        onscreenConsole.log(`You last played  <span class="console-highlights">${lastPlayedCard.name}</span>. It had a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon. +2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
    } else {
        onscreenConsole.log(`You last played  <span class="console-highlights">${lastPlayedCard.name}</span>. It did not have an <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> or <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon.`);
    }

    // Update the game state
    returnToSidekickDeck(playedSidekick);
    updateGameBoard();
}

function throgHighRecruitReward() {
let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Throg");
    if (!playedSidekick) {
        console.error("No sidekick card found in cardsPlayedThisTurn.");
        return;
    }

  if (cumulativeRecruitPoints >= 6) {
onscreenConsole.log(`You have made at least 6 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> this turn. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
    totalAttackPoints += 2;
    cumulativeAttackPoints += 2;
  }

returnToSidekickDeck(playedSidekick);
updateGameBoard();

  
}


function lockjawPhasing() {
    let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Lockjaw");
    if (!playedSidekick) {
        console.error("No Lockjaw card found in cardsPlayedThisTurn.");
        return;
    }

    return new Promise((resolve, reject) => {
        // Show the popup to ask the player if they want to Phase or Play
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            `DO YOU WISH TO PHASE OR PLAY <span class="console-highlights">${playedSidekick.name}</span>?`,
            "Phase",
            "Play"
        );

        document.getElementById('heroAbilityHoverText').style.display = 'none';

        const cardImage = document.getElementById('hero-ability-may-card');
        cardImage.src = playedSidekick.image;
        cardImage.style.display = 'block';

        confirmButton.onclick = () => {
            // Player chose to Phase
            try {
                if (playerDeck.length > 0) {
                    // Swap Lockjaw with the top card of the playerDeck
			playSFX('card-draw');
                    const topCard = playerDeck.pop(); // Remove the top card from the deck
                    playerHand.push(topCard); // Add the top card to the player's hand
                    playerDeck.push(playedSidekick); // Move Lockjaw to the top of the deck

                    playedSidekick.revealed = true;

                    // Remove Lockjaw from cardsPlayedThisTurn
                    const lockjawIndex = cardsPlayedThisTurn.findIndex(card => card.name === "Lockjaw");
                    if (lockjawIndex !== -1) {
                        cardsPlayedThisTurn.splice(lockjawIndex, 1);
                    }

                    // Deduct 2 from totalAttackPoints and cumulativeAttackPoints
                    totalAttackPoints -= 2;
                    cumulativeAttackPoints -= 2;

                    onscreenConsole.log(`Phasing activated. ${topCard.name} added to hand, <span class="console-highlights">Lockjaw</span> moved to the top of the deck.`);
                    
                } else if (playerDiscardPile.length > 0) {
                    // Shuffle the discard pile into the player deck if the deck is empty
                    shuffleArray(discardPile);
                    playerDeck = discardPile.slice(); // Copy the shuffled discard pile to the player deck
                    discardPile = []; // Clear the discard pile
                    onscreenConsole.log("Discard pile shuffled into the player deck.");

                    if (playerDeck.length > 0) {
			playSFX('card-draw');
                        const topCard = playerDeck.pop(); // Remove the top card from the deck
                        playerHand.push(topCard); // Add the top card to the player's hand
                        playerDeck.push(playedSidekick); // Move Lockjaw to the top of the deck

                        playedSidekick.revealed = true;

                        // Remove Lockjaw from cardsPlayedThisTurn
                        const lockjawIndex = cardsPlayedThisTurn.findIndex(card => card.name === "Lockjaw");
                        if (lockjawIndex !== -1) {
                            cardsPlayedThisTurn.splice(lockjawIndex, 1);
                        }

                        // Deduct 2 from totalAttackPoints and cumulativeAttackPoints
                        totalAttackPoints -= 2;
                        cumulativeAttackPoints -= 2;

                        onscreenConsole.log(`Phasing activated. <span class="console-highlights">${topCard.name}</span> added to hand, <span class="console-highlights">Lockjaw</span> moved to the top of the deck.`);
                        
                    } else {
                        onscreenConsole.log("Phasing not possible. No cards available to draw.");
                    }
                } else {
                    onscreenConsole.log("Phasing not possible. No cards available to draw.");
                }
            } catch (error) {
                reject(error);
            }
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            updateGameBoard();
            resolve();
        };

        denyButton.onclick = () => {
            // Player chose to Play
            try {
                returnToSidekickDeck(playedSidekick);

                // Do NOT remove Lockjaw from cardsPlayedThisTurn
                onscreenConsole.log(`You have chosen to play <span class="console-highlights">${playedSidekick.name}</span>.`);
            } catch (error) {
                reject(error);
            }
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            updateGameBoard();
            resolve();
        };
    });
}

function zabuKO() {
  let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Zabu");
  if (!playedSidekick) {
    console.error("No Zabu card found in cardsPlayedThisTurn.");
    return Promise.resolve(false);
  }

  onscreenConsole.log(`<span class="console-highlights">Zabu</span> played. Special Ability activated.`);

  // Execute the KO logic and wait for it to complete
  return zabuKOChoice().then((kocard) => {
    if (kocard) {
      // After the KO logic is complete, return Zabu to the sidekick deck
      returnToSidekickDeck(playedSidekick);
      updateGameBoard();
      return true;
    }
    return false;
  });
}

function zabuKOChoice() {
  return new Promise((resolve) => {
    if (playerDiscardPile.length === 0 && playerHand.length === 0) {
      console.log('There are no cards available to KO.');
      onscreenConsole.log('There are no cards available to KO.');
      resolve(null);
      return;
    }

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
    context.innerHTML = 'Select a card to KO.';
    discardPileList.innerHTML = '';
    handList.innerHTML = '';
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;
    confirmButton.textContent = 'KO Card';
    closeButton.style.display = 'none';
    xcloseButton.style.display = 'none';
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';

    KOImage.src = '';
    KOImage.style.display = 'none';
    hoverText.style.display = 'block';

    // Track selection with simple object reference
    let selectedCard = null;
    let selectedLocation = null;
    let activeImage = null;

    function updateConfirmButton() {
      confirmButton.disabled = selectedCard === null;
    }

    function updateInstructions() {
      if (!selectedCard) {
        context.innerHTML = 'Select a card to KO.';
      } else {
        context.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd from your ${selectedLocation}.`;
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

    // Create sorted copies for display only
    const sortedDiscardPile = [...playerDiscardPile];
    const sortedHand = [...playerHand];
    genericCardSort(sortedDiscardPile);
    genericCardSort(sortedHand);

    // Populate discard pile using sorted copy
    sortedDiscardPile.forEach((card) => {
      const li = document.createElement('li');
      const createTeamIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
      };

      const createClassIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
      };
      
      const teamIcon = createTeamIconHTML(card.team);
      const class1Icon = createClassIconHTML(card.class1);
      const class2Icon = createClassIconHTML(card.class2);
      const class3Icon = createClassIconHTML(card.class3);
      
      li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;
      
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

    // Populate hand using sorted copy
    sortedHand.forEach((card) => {
      const li = document.createElement('li');
      const createTeamIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
      };

      const createClassIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
      };
      
      const teamIcon = createTeamIconHTML(card.team);
      const class1Icon = createClassIconHTML(card.class1);
      const class2Icon = createClassIconHTML(card.class2);
      const class3Icon = createClassIconHTML(card.class3);
      
      li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;
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
          onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> KO'd.`);
          koBonuses();
          closePopup();
          updateGameBoard();
          resolve(selectedCard);
          return;
        }
      }
      resolve(null);
    };

    function closePopup() {
      context.innerHTML = 'Select a card to KO.';
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

function RedwingRevealTopThreeDrawAndReorder() {
  return new Promise((resolve) => {
    let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Redwing");
    if (!playedSidekick) {
      console.error("No Redwing card found in cardsPlayedThisTurn.");
      resolve();
      return;
    }

    onscreenConsole.log(`<span class="console-highlights">Redwing</span> played. Special Ability activated.`);

    redwingDrawAndReturn().then(() => {
      returnToSidekickDeck(playedSidekick);
      updateGameBoard();
      resolve();
    });
  });
}

async function redwingDrawAndReturn() {
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
        return;
      }
    }
    holdingArray.push(playerDeck.pop());
  }

  if (holdingArray.length < 3) {
    onscreenConsole.log(`Only ${holdingArray.length} card(s) were revealed.`);
  }

  // Step 1: Choose card to add to hand
  const chosenCard = await showCardSelectionPopup({
    title: 'Choose Card to Draw',
    instructions: 'Select one card to add to your hand:',
    items: holdingArray.map(card => ({
      name: card.name,
      image: card.image,
      card: card
    })),
    confirmText: 'DRAW SELECTED CARD'
  });
playSFX('card-draw');
  playerHand.push(chosenCard.card);
  onscreenConsole.log(`<span class="console-highlights">${chosenCard.card.name}</span> added to hand.`);

  // Remove chosen card from holding array
  const remainingCards = holdingArray.filter(card => card !== chosenCard.card);

  // Step 2: Handle return order for remaining cards
  if (remainingCards.length > 0) {
    await handleCardReturnOrder(remainingCards, 'Return Cards to Deck');
  }
}

async function handleCardReturnOrder(cards, title = 'Return Order') {
  const remainingCards = [...cards];
  const returnedOrder = [];

  while (remainingCards.length > 0) {
    const choice = await showCardSelectionPopup({
      title: title,
      instructions: remainingCards.length === cards.length 
        ? 'Select the first card to return to the deck.' 
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

function RustyRevealTopTwoAndHandle() {
  return new Promise((resolve) => {
    // Find the played Rusty card
    let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Rusty 'Firefist' Collins");
    if (!playedSidekick) {
      console.error("No Rusty 'Firefist' Collins card found in cardsPlayedThisTurn.");
      resolve();
      return;
    }

    onscreenConsole.log(`<span class="console-highlights">Rusty 'Firefist' Collins</span> played. Special Ability activated.`);

    // Draw up to two cards
    let revealedCards = [];
    for (let i = 0; i < 2; i++) {
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
          onscreenConsole.log("Shuffled discard pile into deck.");
        } else {
          onscreenConsole.log("No cards available to reveal.");
          returnToSidekickDeck(playedSidekick);
          updateGameBoard();
          resolve();
          return;
        }
      }
      revealedCards.push(playerDeck.pop());
    }

    const [card1, card2] = revealedCards;
    const zeroCostCards = revealedCards.filter(card => card.cost === 0);

    // Case 1: Two zero-cost cards
    if (zeroCostCards.length === 2) {
      handleTwoZeroCostCards(card1, card2).then(() => {
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
        resolve();
      });
    }
    // Case 2: One zero-cost card
    else if (zeroCostCards.length === 1) {
      handleOneZeroCostCard(zeroCostCards[0], card1.cost === 0 ? card2 : card1).then(() => {
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
        resolve();
      });
    }
    // Case 3: No zero-cost cards
    else {
      handleNoZeroCostCards(card1, card2).then(() => {
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
        resolve();
      });
    }
  });
}

async function handleTwoZeroCostCards(card1, card2) {
  // First choose which card to investigate
  const investigationChoice = await showCardSelectionPopup({
    title: 'Investigation Choice',
    instructions: 'You revealed two cards with cost 0. Which one do you want to investigate?',
    items: [
      { name: card1.name, image: card1.image, card: card1 },
      { name: card2.name, image: card2.image, card: card2 }
    ],
    confirmText: 'INVESTIGATE THIS CARD'
  });

  // Handle KO/Discard choice for selected card
  await handleKoOrDiscardChoice(investigationChoice.card);
  
  // Automatically return the other card
  const otherCard = investigationChoice.card === card1 ? card2 : card1;
  await handleCardPlacement(otherCard);
}

async function handleOneZeroCostCard(zeroCostCard, otherCard) {
  // Handle KO/Discard choice for zero-cost card
  await handleKoOrDiscardChoice(zeroCostCard);
  
  // Return the other card
  await handleCardPlacement(otherCard);
}

async function handleNoZeroCostCards(card1, card2) {
  // First choose return order
  const returnOrder = await showCardSelectionPopup({
    title: 'No Zero Cost Cards',
    instructions: 'Select which card to return first:',
    items: [
      { name: `Return ${card1.name} first`, image: card1.image, card: card1 },
      { name: `Return ${card2.name} first`, image: card2.image, card: card2 }
    ],
    confirmText: 'CONFIRM ORDER'
  });

  // Return first chosen card
  await handleCardPlacement(returnOrder.card);
  
  // Return the other card
  const otherCard = returnOrder.card === card1 ? card2 : card1;
  await handleCardPlacement(otherCard);
}

async function handleKoOrDiscardChoice(card) {
  const action = await showCardSelectionPopup({
    title: 'Card Disposition',
    instructions: `What would you like to do with <span class="console-highlights">${card.name}</span>?`,
    items: [
      { text: 'KO', value: 'ko', image: card.image },
      { text: 'DISCARD', value: 'discard', image: card.image }
    ],
    confirmText: 'CONFIRM ACTION'
  });

  if (action.value === 'ko') {
    koPile.push(card);
    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
koBonuses();
  } else {
    playerDiscardPile.push(card);
    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been discarded.`);
  }
}



function boomBoomNicknames() {
  return new Promise((resolve) => {
    const { confirmButton, denyButton, extraButton } = showHeroAbilityMayPopup(
      `Which of <span class="console-highlights">Boom-Boom</span><span class="bold-spans">'s</span> nicknames would you like to choose?`,
      "Time Bomb",
      "Boomer",
      "Meltdown",
      true
    );

    const cardImage = document.getElementById("hero-ability-may-card");
    const cardHoverText = document.getElementById("heroAbilityHoverText");
    
    if (cardImage && cardHoverText) {
      cardImage.src = "Visual Assets/Sidekicks/Boom_Boom.webp";
      cardImage.style.display = "block";
      cardHoverText.style.display = "none";

      confirmButton.onclick = () => {
        cardImage.src = "";
        cardImage.style.display = "none";
        cardHoverText.style.display = "block";
        boomboomTimeBomb();
        hideHeroAbilityMayPopup();
        resolve("Time Bomb");
      };

      denyButton.onclick = () => {
        cardImage.src = "";
        cardImage.style.display = "none";
        cardHoverText.style.display = "block";
        boomboomBoomer();
        hideHeroAbilityMayPopup();
        resolve("Boomer");
      };

      extraButton.onclick = () => {
        cardImage.src = "";
        cardImage.style.display = "none";
        cardHoverText.style.display = "block";
        boomboomMeltdown();
        hideHeroAbilityMayPopup();
        resolve("Meltdown");
      };
    }
  });
}

function boomboomMeltdown() {
let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => 
  card.name === "Boom-Boom" || 
  card.originalAttributes?.name === "Boom-Boom"
);

  if (!playedSidekick) {
    console.error("No Boom-Boom card found.");
    return;
  }

  // Skip card movement if this is a Prodigy copy
  if (playedSidekick.isCopied || playedSidekick.name !== "Boom-Boom") {
  
  totalAttackPoints += 4;
  cumulativeAttackPoints += 4;
  drawWound();
  
  return;
  } else {
  
   totalAttackPoints += 4;
  cumulativeAttackPoints += 4;
  drawWound();
  
 // Create a shallow copy to leave in `cardsPlayedThisTurn`
  const copy = { ...playedSidekick };
  copy.sidekickToDestroy = true; // Mark for cleanup

  // Replace the original with the copy
  const index = cardsPlayedThisTurn.indexOf(playedSidekick);
  if (index !== -1) {
    cardsPlayedThisTurn[index] = copy; // Keep the copy
    koPile.push(playedSidekick);      // Move original to KO pile
      onscreenConsole.log(`You chose to play <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Meltdown ability. You have gained +4 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and a Wound. <span class="console-highlights">${playedSidekick.name}</span> has been KO’d.`);
koBonuses();
  } else {
    console.error("playedSidekick not found in cardsPlayedThisTurn.");
  }
  }
}

function boomboomBoomer() {
let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => 
  card.name === "Boom-Boom" || 
  card.originalAttributes?.name === "Boom-Boom"
);

  if (!playedSidekick) {
    console.error("No Boom-Boom card found.");
    return;
  }

  // Skip card movement if this is a Prodigy copy
  if (playedSidekick.isCopied || playedSidekick.name !== "Boom-Boom") {
  
  totalAttackPoints += 3;
  cumulativeAttackPoints += 3;

return;
} else {

  totalAttackPoints += 3;
  cumulativeAttackPoints += 3;


 const copy = { ...playedSidekick };
  copy.sidekickToDestroy = true;

  const index = cardsPlayedThisTurn.indexOf(playedSidekick);
  if (index !== -1) {
    cardsPlayedThisTurn[index] = copy; // Keep the copy
    sidekickDeck.unshift(playedSidekick); // Move original to deck
      onscreenConsole.log(`You chose to play <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Boomer ability. You have gained +3 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. <span class="console-highlights">${playedSidekick.name}</span> has been returned to the bottom of the Sidekick deck.`);
  } else {
    console.error("playedSidekick not found in cardsPlayedThisTurn.");
  }
  }
}

function boomboomTimeBomb() {
 let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => 
  card.name === "Boom-Boom" || 
  card.originalAttributes?.name === "Boom-Boom"
);

  if (!playedSidekick) {
    console.error("No Boom-Boom card found.");
    return;
  }

  // Skip card movement if this is a Prodigy copy
  if (playedSidekick.isCopied || playedSidekick.name !== "Boom-Boom") {
  

  totalAttackPoints += 1;
  cumulativeAttackPoints += 1;

return;
} else {

  totalAttackPoints += 1;
  cumulativeAttackPoints += 1;


  const copy = { ...playedSidekick };
  copy.sidekickToDestroy = true;

  const index = cardsPlayedThisTurn.indexOf(playedSidekick);
  if (index !== -1) {
    cardsPlayedThisTurn[index] = copy; // Keep the copy
    playerDeck.push(playedSidekick);  // Move original to player deck
playedSidekick.revealed = true;
      onscreenConsole.log(`You chose to play <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Time Bomb ability. You have gained +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. <span class="console-highlights">${playedSidekick.name}</span> has been returned to the top of your deck.`);
  } else {
    console.error("playedSidekick not found in cardsPlayedThisTurn.");
  }
  }
}

function skidsRecruitReturn() {
let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Skids");
    if (!playedSidekick) {
        console.error("No sidekick card found in cardsPlayedThisTurn.");
        return;
    }

    onscreenConsole.log(`<span class="console-highlights">Skids</span> was played and will now be returned to the bottom of the Sidekick Stack.`);
    returnToSidekickDeck(playedSidekick);
updateGameBoard();
}

function skidsWoundInvulnerability(card) {
  // 1. First check if we even got a card
  if (!card) {
    console.error("⚠️ No card provided to skidsWoundInvulnerability");
    return;
  }

  // 2. Find ANY Skids card in the hand (since we only care about the name)
  const skidsInHand = playerHand.filter(handCard => handCard.name === "Skids");
  
  // 3. If no Skids found, show error
  if (skidsInHand.length === 0) {
    console.error("🚨 No Skids card found in hand. Current hand:", playerHand);
    return;
  }

  // 4. Take THE FIRST Skids card found (even if multiple exist)
  const skidsCard = skidsInHand[0]; 
  const cardIndex = playerHand.indexOf(skidsCard); // Now we have the exact reference

  // 5. Move it to discard
  playerHand.splice(cardIndex, 1);
  playerDiscardPile.push(skidsCard);

  // 6. Do the rest of the ability
  onscreenConsole.log(`<span class="console-highlights">Skids</span><span class="bold-spans">'</span> ability activated! Avoided a Wound.`);
  extraDraw();
  extraDraw();
  updateGameBoard();
}

async function prodigyCopyPowers() {
    return new Promise((resolve) => {
        // Check for eligible heroes
        if (!cardsPlayedThisTurn.some(card => card.cost <= 6)) {
            console.log("No eligible heroes have been played yet (cost 6 or less).");
            onscreenConsole.log("No Heroes with a cost of 6 or less have been played this turn.");
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
        const heroesToCopy = cardsPlayedThisTurn
            .slice(0, -1)
            .filter(card => card.cost <= 6);

        // Initialize UI
        popup.querySelector('h2').textContent = 'Prodigy - Copy Powers';
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

        // Create sorted copy for display only
        const sortedHeroesToCopy = [...heroesToCopy];
        genericCardSort(sortedHeroesToCopy);

        // Populate hero list using sorted copy
        sortedHeroesToCopy.forEach(hero => {
            const li = document.createElement('li');
            const createTeamIconHTML = (value) => {
                if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
                    return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
                }
                return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
            };

            const createClassIconHTML = (value) => {
                if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
                    return '';
                }
                return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
            };
            
            const teamIcon = createTeamIconHTML(hero.team);
            const class1Icon = createClassIconHTML(hero.class1);
            const class2Icon = createClassIconHTML(hero.class2);
            const class3Icon = createClassIconHTML(hero.class3);
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${hero.name}</span>`;
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
                // Find Prodigy card
                const prodigyCardIndex = cardsPlayedThisTurn.findIndex(c => c.name === 'Prodigy' && !c.isCopied);
                if (prodigyCardIndex === -1) {
                    console.log("Prodigy has already copied a card.");
                    resolve(false);
                    return;
                }
                
                const prodigyCard = cardsPlayedThisTurn[prodigyCardIndex];
                
                // Clone Prodigy to sidekick deck
                const clonedProdigy = { ...prodigyCard };
                sidekickDeck.unshift(clonedProdigy);

                // Mark Prodigy as copied
                prodigyCard.isCopied = true;
                prodigyCard.sidekickToDestroy = true;
                
                // Store original attributes
                prodigyCard.originalAttributes = {
                    name: prodigyCard.name,
                    type: prodigyCard.type,
                    rarity: prodigyCard.rarity,
                    team: prodigyCard.team,
                    class1: prodigyCard.class1,
                    class2: prodigyCard.class2,
                    class3: prodigyCard.class3,
                    color: prodigyCard.color,
                    cost: prodigyCard.cost,
                    attack: prodigyCard.attack,
                    recruit: prodigyCard.recruit,
                    attackIcon: prodigyCard.attackIcon,
                    recruitIcon: prodigyCard.recruitIcon,
                    bonusAttack: prodigyCard.bonusAttack,
                    bonusRecruit: prodigyCard.bonusRecruit,
                    multiplier: prodigyCard.multiplier,
                    multiplierAttribute: prodigyCard.multiplierAttribute,
                    mulitplierLocation: prodigyCard.mulitplierLocation,
                    unconditionalAbility: prodigyCard.unconditionalAbility,
                    conditionalAbility: prodigyCard.conditionalAbility,
                    conditionType: prodigyCard.conditionType,
                    condition: prodigyCard.condition,
                    invulnerability: prodigyCard.invulnerability,
                    image: prodigyCard.image
                };

                // Copy selected hero's attributes (keeping Tech class1)
                Object.assign(prodigyCard, {
                    name: selectedHero.name || "None",
                    type: selectedHero.type || "None",
                    rarity: selectedHero.rarity || "None",
                    team: selectedHero.team || "None",
                    class1: 'Tech', // Always keep Tech as primary class
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

                console.log(`Copying: ${selectedHero.name}. Gained ${prodigyCard.attack} attack and ${prodigyCard.recruit} recruit.`);
                onscreenConsole.log(`Copied <span class="console-highlights">${selectedHero.name}</span>. Gained +${prodigyCard.attack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and +${prodigyCard.recruit}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);

                // Handle unconditional ability if it exists
                if (prodigyCard.unconditionalAbility && prodigyCard.unconditionalAbility !== "None") {
                    const abilityFunction = window[prodigyCard.unconditionalAbility];
                    if (typeof abilityFunction === 'function') {
                        console.log(`Triggering ability: ${prodigyCard.unconditionalAbility}`);
                        await abilityFunction(prodigyCard);
                    } else {
                        console.error(`Ability function ${prodigyCard.unconditionalAbility} not found`);
                    }
                }

                // Update game state
                totalAttackPoints += prodigyCard.attack;
                totalRecruitPoints += prodigyCard.recruit;
                cumulativeAttackPoints += prodigyCard.attack;
                cumulativeRecruitPoints += prodigyCard.recruit;

                updateGameBoard();
                resolve(true);
            } catch (error) {
                console.error("Error copying powers:", error);
                resolve(false);
            }
        };

        closeButton.onclick = () => {
            onscreenConsole.log(`You've cancelled <span class="console-highlights">Prodigy</span><span class="bold-spans">'s</span> ability.`);
            const prodigyCardIndex = cardsPlayedThisTurn.findIndex(c => c.name === 'Prodigy' && !c.isCopied);
            if (prodigyCardIndex !== -1) {
                const prodigyCard = cardsPlayedThisTurn[prodigyCardIndex];
                cardsPlayedThisTurn.splice(prodigyCardIndex, 1);
                playerHand.push(prodigyCard);
            }
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

function rockslideShatter() {
    return new Promise((resolve) => {
        // Find played Rockslide
        let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Rockslide");
        if (!playedSidekick) {
            console.error("No Rockslide card found in cardsPlayedThisTurn.");
            resolve(false);
            return;
        }

        // Get eligible villains/henchmen
        const villainsInCity = city.map((card, index) => {
            if (card && (card.type === 'Villain' || card.type === 'Henchman')) {
                return {
                    index,
                    card // Store the full card object
                };
            }
            return null;
        }).filter(Boolean);

        if (villainsInCity.length === 0) {
            onscreenConsole.log('There are no Villains in the city to <span class="bold-spans">Shatter</span>.');
            resolve(false);
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const closeButton = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const hoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Rockslide - Shatter';
        instructionsDiv.innerHTML = 'Select a Villain or Henchman to Shatter:';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Shatter';
        closeButton.style.display = 'inline-block';
        closeButton.textContent = 'Cancel';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';
        heroImage.style.display = 'none';
        hoverText.style.display = 'block';

        let selectedVillain = null;
        let activeImage = null;

        // Update confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedVillain === null;
        }

        // Update instructions
        function updateInstructions() {
            if (!selectedVillain) {
                instructionsDiv.innerHTML = 'Select a Villain or Henchman to Shatter:';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedVillain.card.name}</span> will be Shattered.`;
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
        function toggleSelection(villain, listItem) {
            if (selectedVillain === villain) {
                // Deselect
                selectedVillain = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection
                if (selectedVillain) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new villain
                selectedVillain = villain;
                listItem.classList.add('selected');
                updateHeroImage(villain.card);
            }
            updateConfirmButton();
            updateInstructions();
        }

        // Populate villain list
        villainsInCity.forEach(villain => {
            const li = document.createElement('li');
            li.textContent = villain.card.name;
            li.dataset.index = villain.index;

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = villain.card.image;
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

            li.onclick = () => toggleSelection(villain, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = async () => {
            if (!selectedVillain) return;
            
            // Close popup immediately to prevent multiple clicks
            closePopup();
            
            try {
                // Return Rockslide to deck
                returnToSidekickDeck(playedSidekick);
                
                // Perform shatter effect and wait for completion
                await shatter(city[selectedVillain.index]);
                
                updateGameBoard();
                resolve(true);
            } catch (error) {
                console.error("Error during shatter:", error);
                updateGameBoard();
                resolve(false);
            }
        };

        // Handle cancellation
        closeButton.onclick = () => {
            onscreenConsole.log('Rockslide did not shatter any Villains.');
            closePopup();
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
            hoverText.style.display = 'block';
            activeImage = null;

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

function shatter(card) {
    return new Promise((resolve) => {
        if (!card) {
            console.error("No card provided to shatter");
            resolve();
            return;
        }

        const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
        const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

        const shatteredVillainAttack = recalculateVillainAttack(card);
        const shatteredValue = Math.floor(shatteredVillainAttack / 2);

        card.shattered = (card.shattered || 0) + shatteredValue;

        onscreenConsole.log(`Shatter! <span class="console-highlights">${card.name}</span> loses ${shatteredValue}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

        // Make sure updateGameBoard() returns a Promise
        updateGameBoard();
        resolve();
    });
}

function laylaMillerInvestigate() {
  return new Promise((resolve) => {
    // 1. Display the popup
    const popup = document.getElementById('investigate-popup');
    popup.style.display = 'block';
    
    // 2. Set the card image
    const cardImage = document.getElementById('investigate-card');
    cardImage.src = "Visual Assets/Sidekicks/Layla_Miller.webp";
    cardImage.style.display = "block";
    
    document.getElementById('investigate-team-filter').style.display = "block";
    
    // 3. Disable confirm button initially
    const confirmBtn = document.getElementById('investigate-confirm');
    confirmBtn.disabled = true;
    
    // Get team radios
    const teamRadios = document.querySelectorAll('input[name="investigate-team"]');
    
    // Cleanup function
    function cleanup() {
      // Remove all radio change listeners
      teamRadios.forEach(radio => {
        radio.onchange = null;
      });
      // Remove confirm button listener
      confirmBtn.onclick = null;
      // Reset UI elements
      popup.style.display = 'none';
      document.getElementById('investigate-team-filter').style.display = "none";
      cardImage.src = "";
    }
    
    // Enable confirm button when a team is selected
    teamRadios.forEach(radio => {
      radio.onchange = () => {
        confirmBtn.disabled = false;
      };
    });
    
    // Handle confirm button click
    confirmBtn.onclick = async () => {
      try {
        // Get selected team
        const selectedTeam = document.querySelector('input[name="investigate-team"]:checked')?.dataset.team;
        if (!selectedTeam) return;
        
        cleanup(); // Clean up event listeners immediately
        
        // Reset team selection
        teamRadios.forEach(radio => {
          radio.checked = false;
        });

        // Find the played Layla Miller card
        let playedSidekick = [...cardsPlayedThisTurn].reverse().find(card => card.name === "Layla Miller");
        if (!playedSidekick) {
          console.error("No Layla Miller card found in cardsPlayedThisTurn.");
          resolve();
          return;
        }
        
        // Return to sidekick deck
        returnToSidekickDeck(playedSidekick);
        
        // Check top two cards, shuffling if needed
        let revealedCards = [];
        for (let i = 0; i < 2; i++) {
          if (playerDeck.length === 0) {
            if (playerDiscardPile.length > 0) {
              playerDeck = shuffle(playerDiscardPile);
              playerDiscardPile = [];
            } else {
              onscreenConsole.log("No cards available to investigate.");
              updateGameBoard();
              resolve();
              return;
            }
          }
          revealedCards.push(playerDeck.pop());
        }
        
        const [card1, card2] = revealedCards;
        
        // Case 1: Both cards match selected team
        if (card1.team === selectedTeam && card2.team === selectedTeam) {
          const choice = await showCardSelectionPopup({
            title: 'Investigation Results',
            instructions: `You found two ${selectedTeam} cards. Select one to draw:`,
            items: [
              { name: card1.name, image: card1.image, card: card1 },
              { name: card2.name, image: card2.image, card: card2 }
            ],
            confirmText: 'DRAW SELECTED CARD'
          });

          if (choice.card === card1) {
            playerHand.push(card1);
            onscreenConsole.log(`You added <span class="console-highlights">${card1.name}</span> to your hand.`);
            await handleCardPlacement(card2);
          } else {
            playerHand.push(card2);
            onscreenConsole.log(`You added <span class="console-highlights">${card2.name}</span> to your hand.`);
            await handleCardPlacement(card1);
          }
        }
        // Case 2: One card matches selected team
        else if (card1.team === selectedTeam || card2.team === selectedTeam) {
          const matchingCard = card1.team === selectedTeam ? card1 : card2;
          const otherCard = card1.team === selectedTeam ? card2 : card1;
          playSFX('card-draw');
          playerHand.push(matchingCard);
          onscreenConsole.log(`You added <span class="console-highlights">${matchingCard.name}</span> to your hand.`);
          updateGameBoard();
          
          await handleCardPlacement(otherCard, {
            title: 'Investigation Results',
            instructions: `You found and drew <span class="console-highlights">${matchingCard.name}</span>. Where should <span class="console-highlights">${otherCard.name}</span> be returned?`,
            card: otherCard
          });
        }
        // Case 3: Neither card matches selected team
        else {
          const firstChoice = await showCardSelectionPopup({
            title: 'Investigation Failed',
            instructions: `No ${selectedTeam} cards found. Select return order:`,
            items: [
              { name: `Return ${card1.name} first`, image: card1.image, card: card1 },
              { name: `Return ${card2.name} first`, image: card2.image, card: card2 }
            ],
            confirmText: 'CONFIRM ORDER'
          });

          await handleCardPlacement(firstChoice.card);
          await handleCardPlacement(firstChoice.card === card1 ? card2 : card1);
        }
        
        updateGameBoard();
        resolve();
      } catch (error) {
        console.error("Error in Layla Miller investigation:", error);
        cleanup();
        resolve();
      }
    };
  });
}

// Reusable card selection popup (add this to your code)
async function showCardSelectionPopup(options) {
  return new Promise((resolve) => {
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
    popupTitle.textContent = options.title || 'Make a Selection';
    instructionsDiv.innerHTML = options.instructions || 'Select an option:';
    cardsList.innerHTML = '';
    
    // Button setup
    confirmButton.textContent = options.confirmText || 'CONFIRM';
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;

    let selectedItem = null;
    let activeImage = null;

    options.items.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item.name || item.text;
      li.setAttribute('data-item-id', index);

      // Only add hover effects if enabled
      if (options.showImages !== false && item.image) {
        li.onmouseover = () => {
          if (!activeImage) {
            heroImage.src = item.image;
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
      }
      
      li.onclick = () => {
        // Toggle selection
        if (selectedItem === index) {
          selectedItem = null;
          li.classList.remove('selected');
          activeImage = null;
          updateHeroImage(null);
        } else {
          // Deselect previous
          if (selectedItem !== null) {
            const prevLi = document.querySelector(`[data-item-id="${selectedItem}"]`);
            if (prevLi) prevLi.classList.remove('selected');
          }
          // Select new
          selectedItem = index;
          li.classList.add('selected');
          if (item.image) {
            activeImage = item.image;
            updateHeroImage(item);
          }
        }
        confirmButton.disabled = selectedItem === null;
      };

      cardsList.appendChild(li);
    });

    // Confirm action
    confirmButton.onclick = () => {
      closePopup();
      resolve(options.items[selectedItem]);
    };

    function updateHeroImage(item) {
      if (item?.image) {
        heroImage.src = item.image;
        heroImage.style.display = 'block';
        hoverText.style.display = 'none';
      } else {
        heroImage.src = '';
        heroImage.style.display = 'none';
        hoverText.style.display = 'block';
      }
    }

    function closePopup() {
      popup.style.display = 'none';
      modalOverlay.style.display = 'none';
      confirmButton.style.display = 'none';
      heroImage.src = '';
      heroImage.style.display = 'none';
      hoverText.style.display = 'block';
    }
  });
}

async function handleCardPlacement(card, options = {}) {
  // Get the elements we need
  const heroImage = document.getElementById('hero-one-location-image');
  const hoverText = document.getElementById('oneChoiceHoverText');
  
  // Show the card image and hide hover text immediately
  heroImage.src = card.image;
  heroImage.style.display = 'block';
  hoverText.style.display = 'none'; // Explicitly hide hover text
  
  const placement = await showCardSelectionPopup({
    title: options.title || 'Card Placement',
    instructions: options.instructions || `Where should <span class="console-highlights">${card.name}</span> go?`,
    items: [
      { text: 'TOP OF THE DECK', value: 'top' },
      { text: 'BOTTOM OF THE DECK', value: 'bottom' }
    ],
    confirmText: 'CONFIRM PLACEMENT',
    showImages: false // Disable hover effects
  });

  // Clean up after selection
  heroImage.src = '';
  heroImage.style.display = 'none';
  hoverText.style.display = 'block'; // Restore hover text for future use

  // Handle placement
  if (placement.value === 'top') {
    playerDeck.push(card);
    onscreenConsole.log(`You returned <span class="console-highlights">${card.name}</span> to the top of your deck.`);
  } else {
    playerDeck.unshift(card);
    onscreenConsole.log(`You returned <span class="console-highlights">${card.name}</span> to the bottom of your deck.`);
  }
  updateGameBoard();

}
