// Card Abilities for Dark City
//30.09.2025 20.55

function angelDivingCatch(card) {
  return new Promise((resolve) => {
    const popup = document.getElementById('hero-ability-may-popup');
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `Would you like to use <span style="font-weight:600;">${card.name}</span>'s ability?`,
      "Yes",
      "No"
    );
    
    const cardImage = document.getElementById('hero-ability-may-card');
    const imageHoverText = document.getElementById('heroAbilityHoverText');
    popup.style.zIndex = '1500';
    cardImage.src = card.image;
    cardImage.style.display = 'block';
    imageHoverText.style.display = 'none';

    // Clear previous event listeners
    confirmButton.onclick = null;
    denyButton.onclick = null;


    const handleConfirm = async () => {   
      await rescueBystander(card);
      extraDraw(card);
      extraDraw(card);
      
      hideHeroAbilityMayPopup();
      cardImage.style.display = 'none';
      imageHoverText.style.display = 'block';
      popup.style.zIndex = '1000';
      
      setTimeout(() => {
        updateGameBoard();
        resolve();
      }, 100);
    };

    const handleDeny = () => {     
      hideHeroAbilityMayPopup();
      cardImage.style.display = 'none';
      imageHoverText.style.display = 'block';
      popup.style.zIndex = '1000';
      
      setTimeout(() => {
        updateGameBoard();
        resolve();
      }, 100);
    };

    confirmButton.onclick = handleConfirm;
    denyButton.onclick = handleDeny;
  });
}



  function angelHighSpeedChase() {
    return new Promise((resolve, reject) => {
        try {
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

            // Initialize UI
            popupTitle.textContent = 'Hero Ability';
            instructionsDiv.innerHTML = 'Select one card to discard.';
            cardsList.innerHTML = '';
            confirmButton.style.display = 'inline-block';
            confirmButton.disabled = true;
            confirmButton.textContent = 'Confirm';
            modalOverlay.style.display = 'block';
            popup.style.display = 'block';

            let selectedCard = null;
            let selectedCardId = null; // Use card ID instead of index
            let activeImage = null;

            // Cleanup function for event listeners
            const cleanup = () => {
                confirmButton.onclick = null;
                const listItems = cardsList.querySelectorAll('li');
                listItems.forEach(li => {
                    li.onmouseover = null;
                    li.onmouseout = null;
                    li.onclick = null;
                });
            };

            // Update the confirm button state
            function updateConfirmButton() {
                confirmButton.disabled = selectedCard === null;
            }

            // Update instructions with styled card name
            function updateInstructions() {
                if (selectedCard === null) {
                    instructionsDiv.innerHTML = 'Select one card to discard.';
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
            function toggleCardSelection(card, listItem) {
                if (selectedCard === card) {
                    // Deselect if same card clicked
                    selectedCard = null;
                    selectedCardId = null;
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
                    selectedCardId = card.id;
                    listItem.classList.add('selected');
                    updateHeroImage(card);
                }

                updateConfirmButton();
                updateInstructions();
            }

            // Sort the hand before displaying (moved this earlier)
            genericCardSort(playerHand);

            // Populate the list with cards in the player's hand
            playerHand.forEach((card) => {
                console.log('Adding card to selection list:', card);
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
            confirmButton.onclick = async () => {
                if (selectedCard) {
                    try {
                        console.log('Card discarded:', selectedCard);
                        
                        // Find the card by ID instead of index to avoid sorting issues
                        const cardIndex = playerHand.findIndex(card => card.id === selectedCardId);
                        if (cardIndex !== -1) {
                            // Remove the card from the player's hand
                            const [discardedCard] = playerHand.splice(cardIndex, 1);
                            
                            const { returned } = await checkDiscardForInvulnerability(discardedCard);
                            if (returned.length) {
                                playerHand.push(...returned);
                            }
                        }
                        
                        closePopup();
                        updateGameBoard();
                        cleanup();
                        resolve();
                    } catch (error) {
                        cleanup();
                        reject(error);
                    }
                }
            };

            function closePopup() {
                // Reset UI
                popupTitle.textContent = 'Hero Ability!';
                instructionsDiv.textContent = 'Context';
                cardsList.innerHTML = '';
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
        } catch (error) {
            reject(error);
        }
    });
}

function angelDropOffAFriend() {
    return new Promise((resolve, reject) => {
        try {
            // Check if there are any cards to discard
            if (playerHand.length === 0) {
                console.log("No cards in hand to discard. You are unable to play this card.");
                onscreenConsole.log("No cards in hand to discard. You are unable to use this ability.");
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
            popupTitle.textContent = 'Hero Ability';
            instructionsDiv.innerHTML = 'Select a card to discard in order to gain +<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> equal to the selected card\'s cost.';
            cardsList.innerHTML = '';
            confirmButton.style.display = 'inline-block';
            confirmButton.disabled = true;
            confirmButton.textContent = 'Confirm';
            closeButton.style.display = 'inline-block';
            closeButton.textContent = 'Cancel';
            modalOverlay.style.display = 'block';
            popup.style.display = 'block';

            let selectedCard = null;
            let selectedCardId = null; // Use card ID instead of index
            let activeImage = null;

            // Cleanup function
            const cleanup = () => {
                // Remove all event handlers by setting them to null
                confirmButton.onclick = null;
                closeButton.onclick = null;
                
                // Clean up list item handlers
                const listItems = cardsList.querySelectorAll('li');
                listItems.forEach(li => {
                    li.onmouseover = null;
                    li.onmouseout = null;
                    li.onclick = null;
                });
            };

            // Update the confirm button state
            const updateConfirmButton = () => {
                confirmButton.disabled = selectedCard === null;
            };

            // Update instructions with styled card name
            const updateInstructions = () => {
                if (selectedCard === null) {
                    instructionsDiv.innerHTML = 'Select a card to discard in order to gain +<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> equal to the selected card\'s cost.';
                } else {
                    instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be discarded.`;
                }
            };

            // Show/hide hero image
            const updateHeroImage = (card) => {
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
            };

            // Toggle card selection
            const toggleCardSelection = (card, listItem) => {
                if (selectedCard === card) {
                    // Deselect if same card clicked
                    selectedCard = null;
                    selectedCardId = null;
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
                    selectedCardId = card.id;
                    listItem.classList.add('selected');
                    updateHeroImage(card);
                }
                updateConfirmButton();
                updateInstructions();
            };

            // Sort the hand BEFORE populating the list (moved this earlier)
            genericCardSort(playerHand);

            // Populate the list with cards in the player's hand
            playerHand.forEach((card) => {
                console.log('Adding card to selection list:', card);
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
            confirmButton.onclick = async () => {
                if (!selectedCard) return;
                
                try {
                    // Find the card by ID instead of index to avoid sorting issues
                    const cardIndex = playerHand.findIndex(card => card.id === selectedCardId);
                    if (cardIndex === -1) {
                        throw new Error('Selected card not found in hand');
                    }
                    
                    const discardedCard = playerHand.splice(cardIndex, 1)[0];
                    
                    const { returned } = await checkDiscardForInvulnerability(discardedCard);
                    if (returned.length) {
                        playerHand.push(...returned);
                    }

                    totalAttackPoints += discardedCard.cost;

                    onscreenConsole.log(`You have discarded <span class="console-highlights">${discardedCard.name}</span>. You have gained +${discardedCard.cost}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">, equal to its cost.`);

                    closePopup();
                    updateGameBoard();
                    cleanup();
                    resolve(true);
                } catch (error) {
                    cleanup();
                    reject(error);
                }
            };

            // Handle cancellation
            closeButton.onclick = () => {
                onscreenConsole.log(`You have chosen not to discard, preventing you from activating this ability.`);
                closePopup();
                updateGameBoard();
                cleanup();
                resolve(false);
            };

            const closePopup = () => {
                // Reset UI
                popupTitle.textContent = 'Hero Ability!';
                instructionsDiv.textContent = 'Context';
                cardsList.innerHTML = '';
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
            };

        } catch (error) {
            reject(error);
        }
    });
}

function angelStrengthOfSpirit() {
    return new Promise(async (resolve) => {
        // Create a copy of the current hand with unique IDs
        const availableCards = playerHand
            .map((card, index) => ({ ...card, uniqueId: `${card.id}-${index}` }));

        // Handle case where there are no cards available
        if (availableCards.length === 0) {
            onscreenConsole.log("No cards available to discard.");
            resolve();
            return;
        }

        // Sort the cards BEFORE setting up the UI (moved this earlier)
        genericCardSort(availableCards);

        // Setup UI for selection
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const cancelButton = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Hero Ability!';
        instructionsDiv.textContent = 'Discard any number of cards. Draw that many cards.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = false; // Can confirm with 0 selections (to do nothing)
        confirmButton.textContent = 'Confirm';
        cancelButton.style.display = 'inline-block';
        cancelButton.textContent = 'No Thanks';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCards = [];
        let activeImage = null;

        // Cleanup function
        const cleanup = () => {
            confirmButton.onclick = null;
            cancelButton.onclick = null;
            const listItems = cardsList.querySelectorAll('li');
            listItems.forEach(li => {
                li.onmouseover = null;
                li.onmouseout = null;
                li.onclick = null;
            });
        };

        function updateConfirmButton() {
            // Button is always enabled since 0 is a valid selection
            confirmButton.disabled = false;
        }

        function updateInstructions() {
            if (selectedCards.length === 0) {
                instructionsDiv.textContent = 'Discard any number of cards. Draw that many cards.';
            } else {
                const namesList = selectedCards.map(card => 
                    `<span class="console-highlights">${card.name}</span>`
                ).join(', ');
                instructionsDiv.innerHTML = `Selected ${selectedCards.length} card${selectedCards.length !== 1 ? 's' : ''}: ${namesList} will be discarded.`;
            }
        }

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

        function toggleCardSelection(card, listItem) {
            const index = selectedCards.findIndex(c => c.uniqueId === card.uniqueId);
            
            if (index > -1) {
                selectedCards.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                selectedCards.push(card);
                listItem.classList.add('selected');
            }

            updateHeroImage(selectedCards.length > 0 ? selectedCards[selectedCards.length - 1] : null);
            updateConfirmButton();
            updateInstructions();
        }

        // Populate the list with available cards (already sorted)
        availableCards.forEach(card => {
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

            li.onclick = () => toggleCardSelection(card, li);
            cardsList.appendChild(li);
        });

        // Confirm button handler
        confirmButton.onclick = async () => {
            const numToDraw = selectedCards.length;

            if (selectedCards.length === 0) {
                onscreenConsole.log(`You chose not to discard any cards.`);
            }
            
            // Discard selected cards - use the original card objects from playerHand
            const cardsToDiscard = [];
            for (const selectedCard of selectedCards) {
                // Find the actual card in playerHand by ID (not index)
                const cardIndex = playerHand.findIndex(c => c.id === selectedCard.id);
                if (cardIndex !== -1) {
                    const [discardedCard] = playerHand.splice(cardIndex, 1);
                    cardsToDiscard.push(discardedCard);
                }
            }
            
            // Process discard effects for all discarded cards
            for (const card of cardsToDiscard) {
                const { returned } = await checkDiscardForInvulnerability(card);
                if (returned.length) {
                    playerHand.push(...returned);
                }
            }
            
            closePopup();
            updateGameBoard();
            
            // Draw new cards
            for (let i = 0; i < numToDraw; i++) {
                await extraDraw();
            }
            
            cleanup();
            resolve();
        };

        // Cancel button handler
        cancelButton.onclick = () => {
            closePopup();
            onscreenConsole.log(`You chose not to discard any cards.`);
            cleanup();
            resolve();
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

function xforcewolverineSuddenAmbush() {
if (extraCardsDrawnThisTurn > 0) {
onscreenConsole.log(`You have drawn extra cards this turn. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  totalAttackPoints += 2;
  cumulativeAttackPoints += 2;
updateGameBoard();
} else {
onscreenConsole.log(`You haven't drawn any extra cards this turn. No <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
}
}


function xforcewolverineAnimalInstincts() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function xforcewolverineNoMercy() {
    extraDraw();
    if (playerHand.length === 0 && playerDiscardPile.length === 0) {
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
        context.innerHTML = `Do you wish to KO a card from your hand or discard pile?`;
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
                context.innerHTML = `Do you wish to KO a card from your hand or discard pile?`;
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

        // Handle confirmation - use ID-based removal instead of index-based
        confirmButton.onclick = () => {
            if (selectedCard && selectedLocation) {
                let cardRemoved = false;
                
                if (selectedLocation === 'discard pile') {
                    // Find by ID in the original array
                    const index = playerDiscardPile.findIndex(c => c.id === selectedCard.id);
                    if (index !== -1) {
                        const [removedCard] = playerDiscardPile.splice(index, 1);
                        koPile.push(removedCard);
                        cardRemoved = true;
                    }
                } else {
                    // Find by ID in the original array
                    const index = playerHand.findIndex(c => c.id === selectedCard.id);
                    if (index !== -1) {
                        const [removedCard] = playerHand.splice(index, 1);
                        koPile.push(removedCard);
                        cardRemoved = true;
                    }
                }

                if (cardRemoved) {
                    onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been KO'd from your ${selectedLocation}.`);
                    koBonuses();
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

function xforcewolverineRecklessAbandon() {
    // Store initial value before any drawing occurs
    const cardsToDraw = extraCardsDrawnThisTurn;

    if (cardsToDraw <= 0) {
        onscreenConsole.log(`You haven't drawn any extra cards this turn.`);
        return;
    }

    const plural = cardsToDraw > 1 ? 's' : '';
    onscreenConsole.log(`Drawing ${cardsToDraw} extra card${plural}...`);

    // Draw exactly the initial amount, regardless of future increments
    for (let i = 0; i < cardsToDraw; i++) {
        if (playerDeck.length === 0) {
            if (playerDiscardPile.length === 0) {
                onscreenConsole.log(`Stopped early - no more cards to draw!`);
                break;
            }
            // Reshuffle discard into deck if needed
            playerDeck = shuffle(playerDiscardPile);
            playerDiscardPile = [];
        }
        
        extraDraw(); // This may increment extraCardsDrawnThisTurn, but we're using cardsToDraw
    }

    // Optional: Log how many were actually drawn
    const actuallyDrawn = Math.min(cardsToDraw, cardsToDraw + (playerDeck.length + playerDiscardPile.length));
    if (actuallyDrawn < cardsToDraw) {
        onscreenConsole.log(`Successfully drew ${actuallyDrawn} of ${cardsToDraw} attempted card${plural}`);
    }
}

function jeangreyReadYourThoughts() {
jeanGreyBystanderRecruit += 1;
onscreenConsole.log('Whenever you rescue a Bystander this turn, you get +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.');
}

function jeangreyMindOverMatter() {
jeanGreyBystanderDraw += 1;
onscreenConsole.log('Whenever you rescue a Bystander this turn, draw a card.');
}

function jeangreyTelekineticMastery() {
jeanGreyBystanderAttack += 1;
onscreenConsole.log('Whenever you rescue a Bystander this turn, you get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.');
}

function jeanGreyXMenBystanders() {
onscreenConsole.log(`<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
const previousCards = cardsPlayedThisTurn.slice(0, -1);
for (let i = 0; i < previousCards.filter(item => item.team === 'X-Men').length; i++) {
    if (previousCards.filter(item => item.team === 'X-Men').length > 0) {
        rescueBystander();
    } else {
        return;    }
        }
}


function jeangreyPsychicSearch() {
onscreenConsole.log(`<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
rescueBystander();
}

function icemanIceSlide() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
const previousCards = cardsPlayedThisTurn.slice(0, -1);
let rangeCardsPlayedThisTurn = previousCards.filter(card => card.class1 === 'Range' || card.class2 === 'Range').length;

totalAttackPoints += rangeCardsPlayedThisTurn;
cumulativeAttackPoints += rangeCardsPlayedThisTurn;

onscreenConsole.log(`${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero${rangeCardsPlayedThisTurn > 1 ? 'es have' : ' has'} been played. +${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

}

function icemanDeepFreeze() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
const previousCards = cardsPlayedThisTurn.slice(0, -1);
let rangeCardsPlayedThisTurn = previousCards.filter(card => card.class1 === 'Range' || card.class2 === 'Range').length;

totalRecruitPoints += rangeCardsPlayedThisTurn;
cumulativeRecruitPoints += rangeCardsPlayedThisTurn;

onscreenConsole.log(`${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero${rangeCardsPlayedThisTurn > 1 ? 'es have' : ' has'} been played. +${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
}

function icemanFrostSpikeArmor() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
const previousCards = cardsPlayedThisTurn.slice(0, -1);
let rangeCardsPlayedThisTurn = previousCards.filter(card => card.class1 === 'Range' || card.class2 === 'Range').length;

onscreenConsole.log(`${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero${rangeCardsPlayedThisTurn > 1 ? 'es have' : ' has'} been played. If available, ${rangeCardsPlayedThisTurn} card${rangeCardsPlayedThisTurn > 1 ? 's' : ''} will be drawn.`);

for (let i = 0; i < rangeCardsPlayedThisTurn; i++) {
    extraDraw();
        };
}

function elektraFirstStrike() {
if (cardsPlayedThisTurn.length === 1) {
totalAttackPoints += 1;
cumulativeAttackPoints += 1;
onscreenConsole.log(`<span class="console-highlights">Elektra - First Strike</span> is the first card you have played this turn. +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
updateGameBoard();
} else {
onscreenConsole.log(`<span class="console-highlights">Elektra - First Strike</span> was not the first card you played this turn. No <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
}
}

function elektraNinjitsu() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
bonusRecruit();
}

function elektraSaiBlades() {
  let minimalCostCount = 0;
  const playedCards = cardsPlayedThisTurn.slice(0, -1);
let minimalCostText = "Heroes";

  playedCards.forEach(card => {
    if (card.cost === 1 || card.cost === 2) {
      minimalCostCount++;
    }
  });

if (minimalCostCount === 1) {
minimalCostText = "Hero";
} else {
minimalCostText = "Heroes";
}

  totalAttackPoints += minimalCostCount;
  cumulativeAttackPoints += minimalCostCount;

  console.log(`Number of odd cost cards: ${minimalCostCount}`);
  console.log(`${minimalCostCount} added to Attack points.`);

onscreenConsole.log(`Special Ability: You have played ${minimalCostCount} ${minimalCostText} that cost <b>1</b> or <b>2</b> <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${minimalCostCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

  updateGameBoard();
}

function elektraSilentMeditationRecruit() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
bonusRecruit();
}

function elektraSilentMeditation() {
silentMeditationRecruit = true;
onscreenConsole.log(`The next Hero you recruit this turn will go into your hand.`);
}

function colossusInvulnerability(card) {
// 1. First check if we even got a card
  if (!card) {
    console.error(`⚠️ No card provided to colossusInvulnerability`);
    return;
  }

  // 2. Find ANY Colossus - Invulnerability card in the hand (since we only care about the name)
  const colossusInHand = playerHand.filter(handCard => handCard.name === "Colossus - Invulnerability");
  
  // 3. If no Colossus - Invulnerability found, show error
  if (colossusInHand.length === 0) {
    console.error("🚨 No Colossus - Invulnerability card found in hand. Current hand:", playerHand);
    return;
  }

  // 4. Take THE FIRST Colossus - Invulnerability card found (even if multiple exist)
  const colossusCard = colossusInHand[0]; 
  const cardIndex = playerHand.indexOf(colossusCard); // Now we have the exact reference

  // 5. Move it to discard
  playerHand.splice(cardIndex, 1);
  playerDiscardPile.push(colossusCard);

  // 6. Do the rest of the ability
  onscreenConsole.log(`<span class="console-highlights">Colossus - Invulnerability</span><span class="bold-spans">'s</span> ability activated! You avoided gaining a Wound.`);
  extraDraw();
  extraDraw();
  updateGameBoard();
}

function colossusSilentStatue() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function ghostRiderHellOnWheels() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
bonusRecruit();
}

function ghostRiderBlazingHellfire() {
    return new Promise((resolve) => {
        const villainsInVP = victoryPile
            .map((card, index) => (card && (card.type === 'Villain')) 
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
	const noThanks = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'KO a Villain';
        instructionsDiv.innerHTML = 'You may KO a Villain from your Victory Pile. If you do, you get +3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.';
        cardsList.innerHTML = '';
        koButton.style.display = 'inline-block';
        koButton.disabled = true;
        koButton.textContent = 'KO Selected Villain';
        modalOverlay.style.display = 'block';
	noThanks.style.display = 'block';
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
                instructionsDiv.textContent = 'You may KO a Villain from your Victory Pile. If you do, you get +3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.';
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
		totalAttackPoints += 3;
		cumulativeAttackPoints += 3;
                console.log(`${selectedVillain.name} KO'd from Victory Pile.`);
                onscreenConsole.log(`<span class="console-highlights">${selectedVillain.name}</span> has been KO'd from your Victory Pile. You gain +3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
                koBonuses();
                closePopup();
                updateGameBoard();
                resolve();
            } else {
                alert("Please select a Villain to KO.");
            }
        };

noThanks.onclick = () => {
                closePopup();
                updateGameBoard();
                resolve();
}

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            koButton.textContent = 'Confirm';
            koButton.style.display = 'none';
            koButton.disabled = true;
	noThanks.style.display = 'none';
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

function ghostRiderInfernalChains() {
    return new Promise((resolve, reject) => {
        onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);

        const eligibleVillains = [];
        
        // Check city for eligible villains
        city.forEach((card, index) => {
            if (card && card.type === 'Villain') {  // Explicitly check for villain type
                const villainAttack = recalculateVillainAttack(card);
                if (villainAttack < 4) {
                    if (card.name) {
                        console.log(`${card.name} added to the eligible villain list.`);
                        eligibleVillains.push({ ...card, index });
                    }
                }
            }
        });

        // Check for Professor X - Telepathic Probe revealed villain
        const telepathicProbeCard = cardsPlayedThisTurn.find(card => 
            card.name === "Professor X - Telepathic Probe" && 
            card.villain && 
            villainDeck.length > 0 &&
            villainDeck[villainDeck.length - 1]?.name === card.villain.name &&
            villainDeck.length === card.villain.deckLength
        );

        if (telepathicProbeCard && villainDeck.length > 0) {
            const topVillainCard = villainDeck[villainDeck.length - 1];
            const villainAttack = recalculateVillainAttack(topVillainCard);
            
            if (villainAttack < 4) {
                console.log(`${topVillainCard.name} (from Telepathic Probe) added to the eligible villain list.`);
                eligibleVillains.push({ 
                    ...topVillainCard, 
                    index: 'telepathic-probe', // Special identifier for telepathic probe villains
                    telepathicProbe: true,
                    telepathicProbeCard: telepathicProbeCard
                });
            }
        }

        // Check for Demon Goblin
        if (demonGoblinDeck.length > 0) {
            const demonGoblin = demonGoblinDeck[demonGoblinDeck.length - 1];
            console.log(`Demon Goblin added to the eligible villain list.`);
            eligibleVillains.push({
                name: 'Demon Goblin',
                image: 'Visual Assets/Other/Transform Citizens Into Demons/demonGoblin.webp', // Custom image path
                index: 'demon-goblin', // Special identifier for demon goblin
                isDemonGoblin: true,
                attack: 2 // Fixed attack value for Demon Goblin
            });
        }

        if (eligibleVillains.length === 0) {
            onscreenConsole.log('There are no Villains available to defeat.');
            resolve();
            return;
        }

        // Get popup elements - add null checks
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
        instructionsDiv.innerHTML = 'Select a Villain to defeat for free.';
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
                instructionsDiv.textContent = 'Select a Villain to defeat for free.';
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

        eligibleVillains.forEach(card => {
            const li = document.createElement('li');
            
            // Add special indicators for different villain types
            if (card.telepathicProbe) {
                li.textContent = `${card.name} (Telepathic Probe)`;
                li.style.fontStyle = 'italic';
            } else if (card.isDemonGoblin) {
                li.textContent = 'Demon Goblin';
                li.style.fontWeight = 'bold';
            } else {
                li.textContent = card.name;
            }
            
            li.setAttribute('data-card-id', card.id || 'demon-goblin');

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
        defeatButton.onclick = async () => {
            if (selectedVillain) {
                if (selectedVillain.telepathicProbe) {
                    // Handle telepathic probe villain defeat (FREE version)
                    await freeTelepathicVillainDefeat(selectedVillain, selectedVillain.telepathicProbeCard);
                    console.log(`${selectedVillain.name} has been defeated via Telepathic Probe for free.`);
                    onscreenConsole.log(`You have defeated <span class="console-highlights">${selectedVillain.name}</span> for free using Telepathic Probe.`);
                } else if (selectedVillain.isDemonGoblin) {
                    // Handle Demon Goblin defeat (free rescue without point deduction)
                    const demonBystander = demonGoblinDeck.pop();
                    victoryPile.push(demonBystander);
                    
                    onscreenConsole.log(`<span class="console-highlights">${demonBystander.name}</span> has been rescued for free.`);
                    
                    defeatBonuses();
                    bystanderBonuses();
                    await rescueBystanderAbility(demonBystander);
                } else {
                    // Handle regular city villain defeat
                    await instantDefeatAttack(selectedVillain.index);
                    console.log(`${selectedVillain.name} has been defeated.`);
                    onscreenConsole.log(`You have defeated <span class="console-highlights">${selectedVillain.name}</span> for free.`);
                }
                
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

        // Helper function for free telepathic probe villain defeat
        async function freeTelepathicVillainDefeat(villainCard, telepathicProbeCard) {
            if (telepathicProbeCard) {
                telepathicProbeCard.villain = null; // Clear the reference after fighting
            }

            onscreenConsole.log(`Defeating <span class="console-highlights">${villainCard.name}</span> for free using <span class="console-highlights">Professor X - Telepathic Probe</span>.`);
            
            // Remove villain from deck and add to victory pile (NO point deduction)
            villainDeck.pop();
            victoryPile.push(villainCard);

            onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been defeated for free.`);
            
            // Handle rescue of extra bystanders
            if (rescueExtraBystanders > 0) {
                for (let i = 0; i < rescueExtraBystanders; i++) {
                    rescueBystander();
                }
            }

            defeatBonuses();

            // Handle fight effect if the villain has one
            let fightEffectPromise = Promise.resolve();
            if (villainCard.fightEffect && villainCard.fightEffect !== "None") {
                const fightEffectFunction = window[villainCard.fightEffect];
                console.log("Fight effect function found:", fightEffectFunction);
                if (typeof fightEffectFunction === 'function') {
                    fightEffectPromise = new Promise((resolve, reject) => {
                        try {
                            const result = fightEffectFunction(villainCard);
                            console.log("Fight effect executed:", result);
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    });
                } else {
                    console.error(`Fight effect function ${villainCard.fightEffect} not found`);
                }
            } else {
                console.log("No fight effect found for this villain.");
            }

            // Handle fight effect promise
            await fightEffectPromise
                .then(() => {
                    updateGameBoard(); // Update the game board after fight effect is handled
                })
                .catch(error => {
                    console.error(`Error in fight effect: ${error}`);
                    updateGameBoard(); // Ensure the game board is updated even if the fight effect fails
                });

            if (hasProfessorXMindControl) {
                // Show popup for gaining villain as hero
                const gainVillainResult = await new Promise((resolve) => {
                    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                        "DO YOU WISH TO GAIN THIS VILLAIN?",
                        "GAIN AS A HERO",
                        "NO THANKS!"
                    );

                    document.getElementById('heroAbilityHoverText').style.display = 'none';

                    // Show the villain card image in the popup
                    const cardImage = document.getElementById('hero-ability-may-card');
                    cardImage.src = 'Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_MindControl.webp';
                    cardImage.style.display = 'block';

                    confirmButton.onclick = () => {
                        // Create and modify the copy
                        const cardCopy = JSON.parse(JSON.stringify(villainCard));
                        cardCopy.type = "Hero";
                        cardCopy.color = "Grey";
                        cardCopy.cost = villainCard.attack;
                        cardCopy.keyword1 = "None";
                        cardCopy.keyword2 = "None";
                        cardCopy.keyword3 = "None";
                        
                        playerDiscardPile.push(cardCopy);
                        
                        onscreenConsole.log(`You have chosen to add <span class="console-highlights">${villainCard.name}</span> to your discard pile as a grey Hero.`);
                        updateGameBoard();
                        
                        hideHeroAbilityMayPopup();
                        document.getElementById('heroAbilityHoverText').style.display = 'block';
                        resolve(true); // Resolve with true indicating the player chose to copy
                    };

                    denyButton.onclick = () => {
                        onscreenConsole.log(`You declined to copy ${villainCard.name}.`);
                        hideHeroAbilityMayPopup();
                        document.getElementById('heroAbilityHoverText').style.display = 'block';
                        resolve(false); // Resolve with false indicating the player declined
                    };
                });
            }

            // Reset the currentVillainLocation after the attack is resolved
            currentVillainLocation = null;
            updateGameBoard();
        }
    });
}

function ghostRiderPenanceStare() {
return new Promise((resolve) => {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

if (previousCards.filter(item => item.team === 'Marvel Knights').length > 0) {
onscreenConsole.log(`<img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`Any Villain KO'd would be returned to your Victory Pile. 1+<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
totalAttackPoints += 1;
cumulativeAttackPoints += 1;
updateGameBoard();
resolve();
return;
} 
        const villainsInVP = victoryPile
            .map((card, index) => (card && (card.type === 'Villain')) 
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
	const noThanks = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'KO a Villain';
        instructionsDiv.innerHTML = 'Select a Villain from your Victory Pile to KO. You get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.';
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
                instructionsDiv.textContent = 'Select a Villain from your Victory Pile to KO. You get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.';
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
		totalAttackPoints += 1;
		cumulativeAttackPoints += 1;
                console.log(`${selectedVillain.name} KO'd from Victory Pile.`);
                onscreenConsole.log(`<span class="console-highlights">${selectedVillain.name}</span> has been KO'd from your Victory Pile. You gain +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
                koBonuses();
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


function ironfistFocusChi() {
    const allCards = [
        ...playerHand,  // Include all cards from hand
        ...cardsPlayedThisTurn.filter(card => 
            !card.isCopied && 
            !card.sidekickToDestroy
        )
    ];

    console.log('Combined allCards:', allCards);

    const uniqueCosts = new Set();

    allCards.forEach(card => {
        // Treat undefined/null cost as 0, and include 0 costs
        const cost = card.cost !== undefined && card.cost !== null ? card.cost : 0;
        uniqueCosts.add(cost);
        console.log(`Card cost added: ${cost}`);
    });

    const uniqueCostCount = uniqueCosts.size;
    console.log('Unique costs found:', uniqueCostCount);

    const recruitPointsToAdd = uniqueCostCount;
    totalRecruitPoints += recruitPointsToAdd;
    cumulativeRecruitPoints += recruitPointsToAdd;
    console.log('Updated totalRecruitPoints:', totalRecruitPoints);
    console.log('Updated cumulativeRecruitPoints:', cumulativeRecruitPoints);

    updateGameBoard();
    console.log(`You have ${uniqueCostCount} cards with different costs. ${recruitPointsToAdd} Recruit points have been added.`);
    onscreenConsole.log(`Special Ability: You have ${uniqueCostCount} card${uniqueCostCount > 1 ? 's' : ''} with a different <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${uniqueCostCount} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
}

function ironfistWieldTheIronFist() {
    const allCards = [
        ...playerHand,  // Include all cards from hand
        ...cardsPlayedThisTurn.filter(card => 
            !card.isCopied && 
            !card.sidekickToDestroy
        )
    ];

    console.log('Combined allCards:', allCards);

    const uniqueCosts = new Set();

    allCards.forEach(card => {
        // Treat undefined/null cost as 0, and include 0 costs
        const cost = card.cost !== undefined && card.cost !== null ? card.cost : 0;
        uniqueCosts.add(cost);
        console.log(`Card cost added: ${cost}`);
    });

    const uniqueCostCount = uniqueCosts.size;
    console.log('Unique costs found:', uniqueCostCount);

    const attackPointsToAdd = uniqueCostCount;
    totalAttackPoints += attackPointsToAdd;
    cumulativeAttackPoints += attackPointsToAdd;
    console.log('Updated totalAttackPoints:', totalAttackPoints);
    console.log('Updated cumulativeAttackPoints:', cumulativeAttackPoints);

    updateGameBoard();
    console.log(`You have ${uniqueCostCount} cards with different costs. ${attackPointsToAdd} Attack points have been added.`);
    onscreenConsole.log(`Special Ability: You have ${uniqueCostCount} card${uniqueCostCount > 1 ? 's' : ''} with a different <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${uniqueCostCount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
}

function ironfistAncientLegacy() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"><img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`);
const cardImage = "Visual Assets/Heroes/Dark City/DarkCity_IronFist_AncientLegacy.webp";
const amount = 2;  
versatile(amount, cardImage);
}

function versatile(amount, cardImage) {
if (trueVersatility) {
onscreenConsole.log(`Thanks to <span class="console-highlights">Domino - Against All Odds</span>, you gain both ${amount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> <span class="bold-spans">and</span> <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`);
totalAttackPoints += amount;
cumulativeAttackPoints += amount;
totalRecruitPoints += amount;
cumulativeRecruitPoints += amount;
updateGameBoard();
return;
}

const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `VERSATILE: DO YOU WISH TO GAIN ${amount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> or <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">?`,
        "ATTACK",
        "RECRUIT"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImageDisplay = document.getElementById('hero-ability-may-card');
    cardImageDisplay.src = cardImage;
    cardImageDisplay.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You gain +${amount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
totalAttackPoints += amount;
cumulativeAttackPoints += amount;
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
updateGameBoard();
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You gain +${amount} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);
totalRecruitPoints += amount;
cumulativeRecruitPoints += amount;
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
updateGameBoard();
    };

}

function ironfistLivingWeapon() {
    let revealedCards = [];
    let seenCosts = new Set();
    let duplicateFound = false;
    let totalCardsAvailable = playerDeck.length + (playerDiscardPile?.length || 0);

    if (totalCardsAvailable === 0) {
        onscreenConsole.log(`No cards available to reveal.`);
        return;
    }

    while (!duplicateFound && revealedCards.length < totalCardsAvailable) {
        // Reshuffle discard pile if deck is empty
        if (playerDeck.length === 0) {
            if (playerDiscardPile?.length > 0) {
                playerDeck = shuffle([...playerDiscardPile]);
                playerDiscardPile = [];
            } else {
                break;
            }
        }

        const currentCard = playerDeck.pop(); // Take from top of deck
        
        // Check for duplicate cost
        if (seenCosts.has(currentCard.cost)) {
            duplicateFound = true;
            revealedCards.push(currentCard); // Include the matching card
            break;
        }
        
        seenCosts.add(currentCard.cost);
        revealedCards.push(currentCard);
    }

    // Put revealed cards back on TOP of deck (in reverse order)
    playerDeck.push(...revealedCards.reverse());

    if (duplicateFound) {
        onscreenConsole.log(`${revealedCards.length} cards were revealed until a matching <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> was found. These cards will now be drawn.`);
    } else {
        onscreenConsole.log(`All available cards were revealed without finding a matching <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. All cards will now be drawn.`);
    }

    // Draw the revealed cards
    for (let i = 0; i < revealedCards.length; i++) {
        extraDraw(); // Will now draw from the cards we put back on top
    }

    revealedCards = [];
}

function punisherThePunisher() {
if (heroDeck.length === 0) {
onscreenConsole.log(`Hero deck is empty - no cards available to reveal.`);
return;
}

let revealedCards = [];
let seenCosts = new Set();
let duplicateFound = false;

for (let i = 0; i < heroDeck.length && !duplicateFound; i++) {
const currentCard = heroDeck[i];
revealedCards.push(currentCard);

onscreenConsole.log(`Revealed: <span class="console-highlights">${currentCard.name}</span>. <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> = ${currentCard.cost}.`);

if (seenCosts.has(currentCard.cost)) {
duplicateFound = true;
} else {
seenCosts.add(currentCard.cost);
}
}

const attackGained = revealedCards.length;
totalAttackPoints += attackGained;
cumulativeAttackPoints += attackGained;

if (duplicateFound) {
onscreenConsole.log(`${revealedCards.length} cards were revealed until a matching <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> was found. +${attackGained}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
} else {
onscreenConsole.log(`All available cards were revealed without finding a matching <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">.  +${attackGained}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
}

heroDeck.splice(0, revealedCards.length);

if (revealedCards.length > 0) {
const shuffledRevealed = shuffle([...revealedCards]);

heroDeck.push(...shuffledRevealed);
onscreenConsole.log(`All revealed Heroes have been shuffled and added to the bottom of the Hero deck.`);

}
}

function punisherBoomGoesTheDynamiteConditional() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
extraDraw();
}

function punisherBoomGoesTheDynamite() {
    // Check if both playerDeck and playerDiscardPile are empty
    if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
        console.log("No cards available to draw.");
        onscreenConsole.log("No cards available to reveal.");
        return;
    }

    // If playerDeck is empty but playerDiscardPile has cards, reshuffle discard pile into deck
    if (playerDeck.length === 0) {
        playerDeck = shuffle(playerDiscardPile);
        playerDiscardPile = [];
    }

 const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

if (topCardPlayerDeck.cost === 0) {
    playerDeck.pop();
    koPile.push(topCardPlayerDeck);
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> with a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of 0. They have been KO'd.`);
koBonuses();
} else {
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> with a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of ${topCardPlayerDeck.cost}. They have not been KO'd.`);
topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function punisherHailOfBullets() {
    if (villainDeck.length === 0) {
        onscreenConsole.log(`No cards in the Villain deck to reveal.`);
        return;
    }

    const topCardVillainDeck = villainDeck[villainDeck.length - 1];
	topCardVillainDeck.revealed = true;
    const victoryPoints = Number.isInteger(topCardVillainDeck.victoryPoints) 
        ? topCardVillainDeck.victoryPoints 
        : 0;

    if (topCardVillainDeck.type === 'Villain') {
        onscreenConsole.log(`You revealed <span class="console-highlights">${topCardVillainDeck.name}</span>, worth ${victoryPoints}. +${victoryPoints} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
        
        totalAttackPoints += victoryPoints;
        cumulativeAttackPoints += victoryPoints;
        updateGameBoard();
    } else {
        onscreenConsole.log(`You revealed <span class="console-highlights">${topCardVillainDeck.name}</span>. This card is not a Villain.`);
    }
}

function punisherHailOfBulletsDefeat() {
    onscreenConsole.log(`<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"><img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`);

    if (villainDeck.length === 0) {
        onscreenConsole.log(`No cards in the Villain deck to reveal.`);
        return;
    }

    const topCardVillainDeck = villainDeck[villainDeck.length - 1];

    if (topCardVillainDeck.type !== 'Villain') {
        onscreenConsole.log(`You revealed <span class="console-highlights">${topCardVillainDeck.name}</span>. This card is not a Villain.`);
        return;
    }

    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO DEFEAT THIS VILLAIN FOR FREE?",
        "Yes",
        "No"
    );

    document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = topCardVillainDeck.image;
    cardImage.style.display = 'block';

    // Moved denyButton event handler outside of confirmButton handler
    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to defeat <span class="console-highlights">${topCardVillainDeck.name}</span>.`);
        hideHeroAbilityMayPopup();
        document.getElementById('heroAbilityHoverText').style.display = 'block';
        updateGameBoard();
    };

    confirmButton.onclick = () => {
        onscreenConsole.log(`You have chosen to defeat <span class="console-highlights">${topCardVillainDeck.name}</span> for free.`);

        hideHeroAbilityMayPopup();
        document.getElementById('heroAbilityHoverText').style.display = 'block';
        villainDeck.pop(topCardVillainDeck);
        victoryPile.push(topCardVillainDeck);
        updateGameBoard();
        
        if (hasProfessorXMindControl) {
            return new Promise((resolve) => {
                const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                    "DO YOU WISH TO GAIN THIS VILLAIN?",
                    "GAIN AS A HERO",
                    "NO THANKS!"
                );

                document.getElementById('heroAbilityHoverText').style.display = 'none';

                // Show the villain card image in the popup
                const cardImage = document.getElementById('hero-ability-may-card');
                cardImage.src = 'Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_MindControl.webp';
                cardImage.style.display = 'block';

                confirmButton.onclick = () => {
                    // Create and modify the copy
                    const cardCopy = JSON.parse(JSON.stringify(topCardVillainDeck));
                    cardCopy.type = "Hero";
                    cardCopy.color = "Grey";
                    cardCopy.cost = topCardVillainDeck.attack;
                    cardCopy.keyword1 = "None";
                    cardCopy.keyword2 = "None";
                    cardCopy.keyword3 = "None";
                    
                    playerDiscardPile.push(cardCopy);
                    
                    onscreenConsole.log(`You have chosen to add <span class="console-highlights">${topCardVillainDeck.name}</span> to your discard pile as a grey Hero.`);
                    updateGameBoard();
                    
                    hideHeroAbilityMayPopup();
                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                    resolve(true); // Resolve with true indicating the player chose to copy
                };

                denyButton.onclick = () => {
                    onscreenConsole.log(`You declined to copy ${topCardVillainDeck.name}.`);
                    hideHeroAbilityMayPopup();
                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                    resolve(false); // Resolve with false indicating the player declined
                };
            });
        }

        if (rescueExtraBystanders > 0) {
            for (let i = 0; i < rescueExtraBystanders; i++) {
                rescueBystander();
            }
        }
        defeatBonuses();

        // Handle fight effect if the villain has one
        let fightEffectPromise = Promise.resolve();
        if (topCardVillainDeck.fightEffect && topCardVillainDeck.fightEffect !== "None") {
            const fightEffectFunction = window[topCardVillainDeck.fightEffect];
            console.log("Fight effect function found:", fightEffectFunction);
            if (typeof fightEffectFunction === 'function') {
                fightEffectPromise = new Promise((resolve, reject) => {
                    try {
                        const result = fightEffectFunction(topCardVillainDeck); // Pass villainCard as an argument here
                        console.log("Fight effect executed:", result);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            } else {
                console.error(`Fight effect function ${topCardVillainDeck.fightEffect} not found`);
            }
        } else {
            console.log("No fight effect found for this villain.");
        }

        fightEffectPromise.then(() => {
            updateGameBoard(); // Update the game board after fight effect is handled
        }).catch(error => {
            console.error(`Error in fight effect: ${error}`);
            updateGameBoard(); // Ensure the game board is updated even if the fight effect fails
        });
    };
}


function punisherHostileInterrogation() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability not activated - "each other player" Hero effects do not apply in Solo play.`);

}

function bladeVampiricSurge() {

const villainsInVP = victoryPile
            .map((card, index) => (card && (card.type === 'Villain')) 
                ? { ...card, id: `vp-${index}`, index } 
                : null)
            .filter(card => card !== null);

        if (villainsInVP.length === 0) {
            onscreenConsole.log('There are no Villains in your Victory Pile.');
            return;
        }

totalAttackPoints += villainsInVP.length;
cumulativeAttackPoints += villainsInVP.length;

onscreenConsole.log(`You have ${villainsInVP.length} Villain${villainsInVP.length > 1 ? 's' : ''} in your Victory Pile. +${villainsInVP.length}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
updateGameBoard();
}

function bladeNowhereToHide() {
sewerRooftopDefeats = true;
onscreenConsole.log(`Whenever you defeat a Villain in the Sewers or Rooftops this turn, you will draw two cards.`);
}

function bladeNightHunter() {
sewerRooftopBonusRecruit += 2;
onscreenConsole.log(`Whenever you defeat a Villain in the Sewers or Rooftops this turn, you get +2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);
}

function bladeStalkThePrey() {

    if (isCityEmpty()) {
    onscreenConsole.log(`No Villains in the city to move.`);
    return;
}

    // Elements for the popup and overlay
    const popup = document.getElementById('villain-movement-popup');
    const overlay = document.getElementById('modal-overlay');
    const closeButton = popup.querySelector('.close-triangle-btn');
    const noThanksButton = document.getElementById('no-thanks-villain-movement');
document.getElementById('villain-movement-context').innerHTML = 'You may move a Villain to an adjacent city space. If another Villain is already there, swap them.';
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
    let firstSelectedIndex = null; // To store the index of the first selected cell

    function selectCell(cellElement) {
        const cellText = cellElement.textContent.trim();
        const hasVillain = cellText !== "Empty";
        const currentIndex = Object.values(villainCells).indexOf(cellElement);

        // If the player selects an Empty cell first, nothing happens
        if (!hasVillain && selectedCells.length === 0) {
            console.log("Empty cell selected first, no action.");
            return;
        }

        // If the selected cell is already in selectedCells, deselect it and reset
        if (selectedCells.includes(cellElement)) {
            cellElement.classList.remove('selected');
            selectedCells = [];
            firstSelectedIndex = null;
            selectionArrow.style.display = 'none';
            confirmButton.disabled = true;
            console.log("Deselected cell, resetting selections.");
            return;
        }

        // If the player selects a villain first, highlight it
        if (hasVillain && selectedCells.length === 0) {
            cellElement.classList.add('selected');
            selectedCells.push(cellElement);
            firstSelectedIndex = currentIndex;
            console.log("First villain selected at index", firstSelectedIndex);
            return;
        }

        // If we have a first selection, only allow adjacent cells
        if (selectedCells.length === 1) {
            // Check if the new selection is adjacent to the first selection
            const isAdjacent = Math.abs(currentIndex - firstSelectedIndex) === 1;
            
            if (isAdjacent) {
                cellElement.classList.add('selected');
                selectedCells.push(cellElement);
                console.log("Adjacent cell selected at index", currentIndex);
                
                // Enable confirm button since we have a valid adjacent selection
                confirmButton.disabled = false;
                drawArrow(selectedCells[0], selectedCells[1]);
            } else {
                console.log("Non-adjacent cell selected, ignoring.");
                onscreenConsole.log(`You may only move a Villain to an adjacent city space.`)
            }
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
                cardImage.src = city[i].image;
                cardImage.classList.add('villain-movement-card-image');
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
                blankCardImage.src = 'Visual Assets/BlankCardSpace.webp';
                blankCardImage.classList.add('villain-movement-card-image');
                cityCellElement.appendChild(blankCardImage);
            }

            // Add the temp buff overlay if there is a buff
            const tempBuffVariableName = `city${i + 1}TempBuff`;
            const currentTempBuff = window[tempBuffVariableName];
            if (currentTempBuff !== 0) {
                const tempBuffOverlay = document.createElement('div');
                tempBuffOverlay.className = 'temp-buff-overlay-villain-move';
                tempBuffOverlay.innerHTML = `<p>${currentTempBuff} Attack</p>`;
                cityCellElement.appendChild(tempBuffOverlay);
            }

            // Add the perm buff overlay if there is a buff
            const permBuffVariableName = `city${i + 1}PermBuff`;
            const currentPermBuff = window[permBuffVariableName];
            if (currentPermBuff !== 0) {
                const permBuffOverlay = document.createElement('div');
                permBuffOverlay.className = 'perm-buff-overlay-villain-move';
                permBuffOverlay.innerHTML = `<p>${currentPermBuff} Attack</p>`;
                cityCellElement.appendChild(permBuffOverlay);
            }

            // Add click event listener to each cell for selection
            cityCellElement.onclick = () => selectCell(cityCellElement);
            cityCellElement.classList.add('city-cell');
        }
    }

    function hidePopup() {
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        selectedCells = [];
        firstSelectedIndex = null;
        popup.style.display = 'none';
        overlay.style.display = 'none';
document.getElementById('villain-movement-context').innerHTML = 'You may move a Villain to a new city space (swapping two if needed). Rescue any Bystanders captured by that Villain.';
        selectionArrow.style.display = 'none';
    }

    function drawArrow(cell1, cell2) {
        const popupRect = document.getElementById('villain-movement-popup').getBoundingClientRect();
        const rect1 = cell1.getBoundingClientRect();
        const rect2 = cell2.getBoundingClientRect();

        const posn1 = {
            x: rect1.left - popupRect.left + rect1.width / 2,
            y: rect1.bottom - popupRect.top
        };
        const posn2 = {
            x: rect2.left - popupRect.left + rect2.width / 2,
            y: rect2.bottom - popupRect.top
        };

        const controlX = (posn1.x + posn2.x) / 2;
        const controlY = Math.max(posn1.y, posn2.y) + 30;

        const dStr = `M${posn1.x},${posn1.y} C${controlX},${controlY} ${controlX},${controlY} ${posn2.x},${posn2.y}`;

        selectionArrow.setAttribute("d", dStr);
        selectionArrow.style.display = 'block';
    }

    // Update city cells with the current game state in the popup
    updateCityCellsInPopup();

// Show the popup and overlay
popup.style.display = 'block';
overlay.style.display = 'block';

closeButton.onclick = hidePopup;
noThanksButton.onclick = hidePopup;
    
confirmButton.onclick = async () => {
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

            // Check if the second cell contains the blank card image (i.e., it's empty)
            const secondCellImage = secondCell.querySelector('img');
            if (secondCellImage && secondCellImage.src.includes('BlankCardSpace.webp')) {
                // Move the villain to the empty cell
                console.log("Moving villain to empty space");
                onscreenConsole.log(`<span class="console-highlights">${city[firstIndex].name}</span> moved to empty space.`);
                
                city[secondIndex] = city[firstIndex]; // Move the villain to the new space
                city[firstIndex] = null; // Clear the original space

            } else if (city[secondIndex] && city[firstIndex]) {
                // Both cells have villains, perform the swap
                console.log("Swapping villains");
                onscreenConsole.log(`<span class="console-highlights">${city[firstIndex].name}</span> swapped places with <span class="console-highlights">${city[secondIndex].name}</span>.`);

                // Perform the swap
                const temp = city[secondIndex];
                city[secondIndex] = city[firstIndex];
                city[firstIndex] = temp;
            } else {
                console.error("Cannot swap cells: one of the cells is empty.");
                return;
            }

            // Clear selections and update the game board
            selectedCells.forEach(cell => cell.classList.remove('selected'));
            selectedCells = [];
            firstSelectedIndex = null;
            selectionArrow.style.display = 'none';
            confirmButton.disabled = true;
            popup.style.display = 'none';
document.getElementById('villain-movement-context').innerHTML = 'You may move a Villain to a new city space (swapping two if needed). Rescue any Bystanders captured by that Villain.';
            overlay.style.display = 'none';
            updateGameBoard();
        }
    }
}

function nightcrawlerSwashbuckler() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"><img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`);
onscreenConsole.log(`+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

async function teleport(card) {
    const index = playerHand.indexOf(card);
    cardsToBeDrawnNextTurn.push(card);
    if (card.temporaryTeleport === true) {
        delete card.temporaryTeleport;
        card.keyword3 = "None";
    }
    playerHand.splice(index, 1);
    nextTurnsDraw++;
    updateGameBoard();

if (card.name.trim().toUpperCase() === 'NIGHTCRAWLER - ALONG FOR THE RIDE') {
    await nightcrawlerAlongForTheRide();
}
}

function playOrTeleport(card) {
    return new Promise((resolve) => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            `DO YOU WISH TO TELEPORT OR PLAY <span class="console-highlights">${card.name}</span>?`,
            "Teleport",
            "Play"
        );

        document.getElementById('heroAbilityHoverText').style.display = 'none';

        const cardImage = document.getElementById('hero-ability-may-card');
        cardImage.src = card.image;
        cardImage.style.display = 'block';

        confirmButton.onclick = () => {
            onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has teleported and will be drawn as an extra card next turn.`);
            teleport(card);
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            updateGameBoard();
            resolve();
        };

        denyButton.onclick = async () => {
            hideHeroAbilityMayPopup();
            onscreenConsole.log(`You have chosen to play <span class="console-highlights">${card.name}</span>.`);
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            
            // Remove card from hand and add to played cards
            const cardIndex = playerHand.indexOf(card);
            if (cardIndex > -1) {
                playerHand.splice(cardIndex, 1);
            }
            cardsPlayedThisTurn.push(card);

            // Update points
            totalAttackPoints += card.attack || 0;
            totalRecruitPoints += card.recruit || 0;
            cumulativeAttackPoints += card.attack || 0;
            cumulativeRecruitPoints += card.recruit || 0;

            updateGameBoard();

            // Special case for Nightcrawler
            if (card.name.trim().toUpperCase() === 'NIGHTCRAWLER - ALONG FOR THE RIDE') {
                await nightcrawlerAlongForTheRide();
            }

            // Handle unconditional ability
            try {
                if (card.unconditionalAbility && card.unconditionalAbility !== "None") {
                    const abilityFunction = window[card.unconditionalAbility];
                    if (typeof abilityFunction === 'function') {
                        await Promise.resolve(abilityFunction(card));
                    } else {
                        console.error(`Unconditional ability function ${card.unconditionalAbility} not found`);
                    }
                }

                // Handle conditional ability
                if (card.conditionalAbility && card.conditionalAbility !== "None") {
                    const { conditionType, condition } = card;
                    if (isConditionMet(conditionType, condition)) {
                        if (autoSuperpowers) {
                            const conditionalAbilityFunction = window[card.conditionalAbility];
                            if (typeof conditionalAbilityFunction === 'function') {
                                await Promise.resolve(conditionalAbilityFunction(card));
                            } else {
                                console.error(`Conditional ability function ${card.conditionalAbility} not found`);
                            }
                        } else {
                            await new Promise((abilityResolve) => {
                                const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                                    `DO YOU WISH TO ACTIVATE <span class="console-highlights">${card.name}</span><span class="bold-spans">'s</span> ability?`,
                                    "Yes",
                                    "No"
                                );

                                document.getElementById('heroAbilityHoverText').style.display = 'none';
                                cardImage.src = card.image;
                                cardImage.style.display = 'block';

                                confirmButton.onclick = async () => {
                                    try {
                                        const conditionalAbilityFunction = window[card.conditionalAbility];
                                        if (typeof conditionalAbilityFunction === 'function') {
                                            await Promise.resolve(conditionalAbilityFunction(card));
                                        }
                                    } catch (error) {
                                        console.error(error);
                                    }
                                    hideHeroAbilityMayPopup();
                                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                                    abilityResolve();
                                };

                                denyButton.onclick = () => {
                                    onscreenConsole.log(`You have chosen not to activate <span class="console-highlights">${card.name}</span><span class="bold-spans">'s</span> ability.`);
                                    hideHeroAbilityMayPopup();
                                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                                    abilityResolve();
                                };
                            });
                        }
                    }
                }
            } catch (error) {
                console.error('Error processing card abilities:', error);
            } finally {
                resolve();
            }
        };
    });
}

async function nightcrawlerAlongForTheRide() {
    return new Promise((resolve) => {
        // Debug logging
        console.log("[Nightcrawler] Ability activated");
        
        // Validate player hand
        if (!playerHand || playerHand.length === 0) {
            onscreenConsole.log('No cards available to teleport.');
            return resolve();
        }

        // Get DOM elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const teleportButton = document.getElementById('close-choice-button'); // Using existing button
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
        const instructionsDiv = document.getElementById('context');

        // Verify all required elements exist
        if (!popup || !modalOverlay || !cardsList || !teleportButton || !heroImage || !oneChoiceHoverText || !instructionsDiv) {
            console.error("Missing required popup elements");
            return resolve();
        }

        // Initialize UI
        popup.querySelector('h2').textContent = 'TELEPORT CARDS';
        instructionsDiv.innerHTML = 'Select up to 3 cards to teleport to next turn';
        cardsList.innerHTML = '';
        
        // Configure the single action button
        teleportButton.textContent = 'NO THANKS';
        confirmButton.style.display = 'none';
        teleportButton.style.display = 'block';
        teleportButton.disabled = false;

        // Track selections
        const selectedCards = [];
        let activeImage = null;

        // Cleanup function
        const cleanup = () => {
            teleportButton.onclick = null;
            const listItems = cardsList.querySelectorAll('li');
            listItems.forEach(li => {
                li.onmouseover = null;
                li.onmouseout = null;
                li.onclick = null;
            });
        };

        // Image display functions
        const updateCardImage = (card) => {
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
        };

        // Create sorted copy for display only
        const sortedHand = [...playerHand];
        genericCardSort(sortedHand);

        // Create card list items using sorted copy
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
            
            // Hover effects
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

            // Selection handling
            li.onclick = () => {
                const index = selectedCards.findIndex(selected => selected.id === card.id);
                
                if (index > -1) {
                    // Deselect
                    selectedCards.splice(index, 1);
                    li.classList.remove('selected');
                    if (activeImage === card.image) {
                        updateCardImage(null);
                    }
                } else if (selectedCards.length < 3) {
                    // Select
                    selectedCards.push(card);
                    li.classList.add('selected');
                    updateCardImage(card);
                }
                
                updateUI();
            };
            
            cardsList.appendChild(li);
        });

        // Update UI state
        const updateUI = () => {
            teleportButton.textContent = selectedCards.length > 0 
                ? `TELEPORT ${selectedCards.length} CARD${selectedCards.length !== 1 ? 'S' : ''}`
                : 'NO THANKS';
                
            instructionsDiv.innerHTML = selectedCards.length > 0
                ? `Selected: ${selectedCards.map(c => `<span class="console-highlights">${c.name}</span>`).join(', ')}`
                : 'Select up to 3 cards to teleport';
        };

        // Handle teleport action - use ID-based removal
        teleportButton.onclick = () => {
            if (selectedCards.length > 0) {
                selectedCards.forEach(card => {
                    // Find by ID in the original playerHand array
                    const index = playerHand.findIndex(c => c.id === card.id);
                    if (index !== -1) {
                        const [removedCard] = playerHand.splice(index, 1);
                        cardsToBeDrawnNextTurn.push(removedCard);
                        nextTurnsDraw++;
                        onscreenConsole.log(`<span class="console-highlights">${removedCard.name}</span> teleported to next turn.`);
                    }
                });
                updateGameBoard();
            } else {
                onscreenConsole.log(`No cards were teleported.`);
            }
            
            // Cleanup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
            confirmButton.style.display = 'block';
            teleportButton.textContent = 'NO THANKS';
            teleportButton.style.display = 'none';
            cleanup();
            updateCardImage(null);
            resolve();
        };

        // Show the popup
        popup.style.display = 'block';
        modalOverlay.style.display = 'block';
        updateUI();
    });
}

function dominoLuckyBreak() {
onscreenConsole.log(`<img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
const cardImage = "Visual Assets/Heroes/Dark City/DarkCity_Domino_LuckyBreak.webp";
const amount = 1;  
versatile(amount, cardImage);
}

function dominoReadyForAnything() {
const cardImage = "Visual Assets/Heroes/Dark City/DarkCity_Domino_ReadyForAnything.webp";
const amount = 2;  
versatile(amount, cardImage);
}

function dominoAgainstAllOdds() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);
if (previousCards.filter(item => item.team === 'X-Force').length > 0) {
onscreenConsole.log(`<img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`This card and each other Versatile ability you use this turn produce both <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> and <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
trueVersatility = true;
}
const cardImage = "Visual Assets/Heroes/Dark City/DarkCity_Domino_AgainstAllOdds.webp";
const amount = 5;  
versatile(amount, cardImage);
}

function dominoSpecializedAmmunition() {
    return new Promise((resolve) => {
        if (playerHand.length === 0) {
            onscreenConsole.log('You have no cards available to discard.');
            resolve();
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const discardButton = document.getElementById('card-choice-confirm-button');
        const noThanks = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Discard';
        instructionsDiv.innerHTML = 'You may discard a card from your hand. If that card has a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon, you get +4<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">. If that card has a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon, you get +4<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.';
        cardsList.innerHTML = '';
        discardButton.style.display = 'inline-block';
        discardButton.disabled = true;
        discardButton.textContent = 'Discard Selected Card';
        modalOverlay.style.display = 'block';
        noThanks.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let activeImage = null;

        function updateDiscardButton() {
            discardButton.disabled = selectedCard === null;
        }

        // Update instructions with selected card
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.textContent = 'You may discard a card from your hand. If that card has a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon, you get +4<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">. If that card has a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon, you get +4<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be discarded.`;
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
                // Select new Card
                selectedCard = card;
                listItem.classList.add('selected');
                updateCardImage(card);
            }

            updateDiscardButton();
            updateInstructions();
        }

        // Create sorted copy for display only
        const sortedHand = [...playerHand];
        genericCardSort(sortedHand);

        // Populate the list with sorted cards
        sortedHand.forEach(card => {
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

        // Handle discard confirmation
        discardButton.onclick = async () => {
            if (selectedCard) {
                if (selectedCard.attackIcon === true) {
                    totalAttackPoints += 4;
                    cumulativeAttackPoints += 4;
                }
                if (selectedCard.recruitIcon === true) {
                    totalRecruitPoints += 4;
                    cumulativeRecruitPoints += 4;
                }
                updateGameBoard();
                
                if (selectedCard.attackIcon === true) {
                    onscreenConsole.log(`They have a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon. +4<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
                }
                if (selectedCard.recruitIcon === true) {
                    onscreenConsole.log(`They have a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon. +4<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
                }
                
                // Find by ID in the original playerHand array
                const index = playerHand.findIndex(card => card.id === selectedCard.id);
                let discardedCard = null;
                if (index !== -1) {
                    [discardedCard] = playerHand.splice(index, 1);
                }
                
                closePopup();
                updateGameBoard();
                
                if (discardedCard) {
                    const { returned } = await checkDiscardForInvulnerability(discardedCard);
                    if (returned.length) {
                        playerHand.push(...returned);
                        updateGameBoard();
                    }
                }
                
                resolve();
            } else {
                alert("Please select a card to discard.");
            }
        };

        noThanks.onclick = () => {
            onscreenConsole.log(`You have chosen not to discard any cards.`);
            closePopup();
            updateGameBoard();
            resolve();
        }

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            discardButton.textContent = 'Confirm';
            discardButton.style.display = 'none';
            discardButton.disabled = true;
            noThanks.style.display = 'none';
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

function cableStrike() {
mastermindReserveAttack++;
mastermindReserveAttack++;
onscreenConsole.log(`You get +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> when fighting the Mastermind this turn.`);
updateGameBoard();
}

function cableRapidResponseForce() {  // Add parameters here
    const XForceCount = cardsPlayedThisTurn.slice(0, -1).filter(item => item.team === "X-Force").length;
    let XForceText = "Heroes";  // Use let since we might reassign this value
    const XForceAttack = XForceCount;

    if (XForceCount === 1) {
        XForceText = "Hero";  // Reassign to singular if only one XForce
    }

    onscreenConsole.log(
        `<img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`); 
    onscreenConsole.log(`You have played ${XForceCount} <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> ${XForceText}. +${XForceAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`
    );

    bonusAttack();
}

function cableArmyOfOne() {
    return new Promise((resolve) => {
        if (playerHand.length === 0) {
            console.log('No cards available to KO.');
            onscreenConsole.log('Your hand is currently empty. Unable to KO any cards.');
            resolve();
            return;
        }

        // Sort the hand FIRST, before any processing
        genericCardSort(playerHand);

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const koButton = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'KO Cards';
        instructionsDiv.innerHTML = `KO any number of cards from your hand. You get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> for each card KO'd this way.`;
        cardsList.innerHTML = '';
        koButton.style.display = 'inline-block';
        confirmButton.style.display = 'none';
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
                instructionsDiv.innerHTML = `KO any number of cards from your hand. You get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> for each card KO'd this way.`;
            } else {
                const names = selectedCards.map(card => `<span class="console-highlights">${card.name}</span>`).join(', ');
                instructionsDiv.innerHTML = `Selected: ${names} (${selectedCards.length})`;
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
            } else if (selectedCards.length < 30) {
                // Select card
                selectedCards.push(card);
                listItem.classList.add('selected');
                updateCardImage(card);
            }

            updateKOButton();
            updateInstructions();
        }

        // Populate the list with discard pile cards
        playerHand.forEach((card, index) => {
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

            li.setAttribute('data-card-id', `playerHand-${index}`);

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
                    const cardIndex = playerHand.indexOf(card);
                    if (cardIndex !== -1) {
                        playerHand.splice(cardIndex, 1);
                        koPile.push(card);
                        totalAttackPoints += 1;
                        cumulativeAttackPoints += 1;
                        console.log(`${card.name} KO'd from hand.`);
                        onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd. +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> gained.`);
                        koBonuses();
                        updateGameBoard();
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
            confirmButton.style.display = 'block';
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

function daredevilBackflip() {
backflipRecruit = true;
onscreenConsole.log(`The next Hero you recruit this turn goes on top of your deck.`);
}

function daredevilRadarSense() {
  return new Promise((resolve) => {
    // 1. Display the popup
    const popup = document.getElementById('investigate-popup');
    popup.style.display = 'block';

    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.style.display = 'block';
    
    // 2. Set the card image
    const cardImage = document.getElementById('investigate-card');
    cardImage.src = "Visual Assets/Heroes//Dark City/DarkCity_Daredevil_RadarSense.webp";
    cardImage.style.display = "block";
    
    // 3. Modify the popup content for number selection
    const popupTitle = document.getElementById('investigate-h2');
    popupTitle.textContent = "CHOOSE A NUMBER";
    
    const popupText = popup.querySelector('p');
    popupText.innerHTML = `Choose a number. If the first card in your deck has the same cost, you get +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;
    
    // 4. Replace team selection with number dropdown
    const teamFilter = document.getElementById('investigate-team-filter');
    teamFilter.style.display = "none";
    
    // Create number dropdown
    const numberDropdown = document.createElement('select');
    numberDropdown.id = 'number-selection-dropdown';
    numberDropdown.innerHTML = '<option value="">Choose a number</option>' + 
      Array.from({length: 11}, (_, i) => i) // Creates array [0, 1, 2, ..., 10]
        .map(num => `<option value="${num}">${num}</option>`)
        .join('');
    
    // Insert the dropdown before the confirm button
    const confirmBtn = document.getElementById('investigate-confirm');
    popup.querySelector('.popup-content').insertBefore(numberDropdown, confirmBtn);
    
    // 5. Disable confirm button initially
    confirmBtn.disabled = true;
    
numberDropdown.onchange = () => {
  confirmBtn.disabled = !numberDropdown.value && numberDropdown.value !== "0";
};
    
    // Handle confirm button click
    confirmBtn.onclick = () => {
      try {
        const selectedNumber = parseInt(numberDropdown.value);
        if (isNaN(selectedNumber)) return; // Changed from !selectedNumber
        
        // Hide popup immediately
        popup.style.display = 'none';
        modalOverlay.style.display = 'none';
        
        // Check deck status - shuffle discard pile into deck if empty
        if (playerDeck.length === 0) {
          if (playerDiscardPile.length > 0) {
            playerDeck = shuffle(playerDiscardPile);
            playerDiscardPile = [];
          } else {
            onscreenConsole.log("Your deck and discard pile are empty. No cards available to reveal.");
            cleanupPopup();
            updateGameBoard();
            resolve();
            return;
          }
        }
        
        const topCard = playerDeck[playerDeck.length - 1];
	topCard.revealed = true;
        if (topCard.cost === selectedNumber) {
          totalAttackPoints += 2;
          cumulativeAttackPoints += 2;
          updateGameBoard();
          onscreenConsole.log(`You revealed <span class="console-highlights">${topCard.name}</span>. They have the same cost as your chosen number! You gain +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
        } else {
          onscreenConsole.log(`You revealed <span class="console-highlights">${topCard.name}</span>. They do not have the same cost as your chosen number. No <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> gained.`);
        }
        
        // Clean up and resolve
        cleanupPopup();
        updateGameBoard();
        resolve();
      } catch (error) {
        console.error("Error in number selection function:", error);
        cleanupPopup();
        resolve();
      }
    };
    
    function cleanupPopup() {
      // Reset popup to original state
      popup.style.display = 'none';
      modalOverlay.style.display = 'none';
      popupTitle.textContent = "INVESTIGATE!";
      popupText.textContent = "Choose a team. Investigate for a card of that team.";
      teamFilter.style.display = "block";
      cardImage.src = "";
      
      // Remove number dropdown if it exists
      const dropdown = document.getElementById('number-selection-dropdown');
      if (dropdown) dropdown.remove();
      
      // Reset confirm button
      confirmBtn.disabled = true;
    }
  });
}

function daredevilBlindJustice() {
  return new Promise((resolve) => {
    // 1. Display the popup
    const popup = document.getElementById('investigate-popup');
    popup.style.display = 'block';

    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.style.display = 'block';
    
    // 2. Set the card image
    const cardImage = document.getElementById('investigate-card');
    cardImage.src = "Visual Assets/Heroes//Dark City/DarkCity_Daredevil_BlindJustice.webp";
    cardImage.style.display = "block";
    
    // 3. Modify the popup content for number selection
    const popupTitle = document.getElementById('investigate-h2');
    popupTitle.textContent = "CHOOSE A NUMBER";
    
    const popupText = popup.querySelector('p');
    popupText.textContent = "Choose a number. If the first card in your deck has the same cost, draw it.";
    
    // 4. Replace team selection with number dropdown
    const teamFilter = document.getElementById('investigate-team-filter');
    teamFilter.style.display = "none";
    
    // Create number dropdown
    const numberDropdown = document.createElement('select');
    numberDropdown.id = 'number-selection-dropdown';
    numberDropdown.innerHTML = '<option value="">Choose a number</option>' + 
      Array.from({length: 11}, (_, i) => i) // Creates array [0, 1, 2, ..., 10]
        .map(num => `<option value="${num}">${num}</option>`)
        .join('');
    
    // Insert the dropdown before the confirm button
    const confirmBtn = document.getElementById('investigate-confirm'); // Fixed typo: 'investigate-confirm' was 'investigate-confirm'
    popup.querySelector('.popup-content').insertBefore(numberDropdown, confirmBtn);
    
    // 5. Disable confirm button initially
    confirmBtn.disabled = true;
    
    numberDropdown.onchange = () => {
  confirmBtn.disabled = !numberDropdown.value && numberDropdown.value !== "0";
};
    
    // Handle confirm button click
    confirmBtn.onclick = () => {
      try {
        const selectedNumber = parseInt(numberDropdown.value);
        if (isNaN(selectedNumber)) return; // Changed from !selectedNumber
        
        // Hide popup immediately
        popup.style.display = 'none';
        modalOverlay.style.display = 'none';
        
        // Check deck status - shuffle discard pile into deck if empty
        if (playerDeck.length === 0) {
          if (playerDiscardPile.length > 0) {
            playerDeck = shuffle(playerDiscardPile);
            playerDiscardPile = [];
            onscreenConsole.log("Shuffled discard pile into deck.");
          } else {
            onscreenConsole.log("Your deck and discard pile are empty. No cards available to reveal.");
            cleanupPopup();
            updateGameBoard();
            resolve();
            return;
          }
        }
        
        const topCard = playerDeck[playerDeck.length - 1];
        if (topCard.cost === selectedNumber) {
          onscreenConsole.log(`You revealed <span class="console-highlights">${topCard.name}</span>. They have the same cost as your chosen number! Now drawing...`);
          extraDraw();
        } else {
          onscreenConsole.log(`You revealed <span class="console-highlights">${topCard.name}</span>. They do not have the same cost as your chosen number.`);
	topCard.revealed = true;
        }
        
        // Clean up and resolve
        cleanupPopup();
        updateGameBoard();
        resolve();
      } catch (error) {
        console.error("Error in number selection function:", error);
        cleanupPopup();
        resolve();
      }
    };
    
    function cleanupPopup() {
      // Reset popup to original state
      popup.style.display = 'none';
      modalOverlay.style.display = 'none';
      popupTitle.textContent = "INVESTIGATE!";
      popupText.textContent = "Choose a team. Investigate for a card of that team.";
      teamFilter.style.display = "block";
      cardImage.src = "";
      
      // Remove number dropdown if it exists
      const dropdown = document.getElementById('number-selection-dropdown');
      if (dropdown) dropdown.remove();
      
      // Reset confirm button
      confirmBtn.disabled = true;
    }
  });
}

function daredevilTheManWithoutFear() {
  return new Promise((resolve) => {
    // This will handle the recursive attempts
    const attemptSelection = () => {
      // 1. Display the popup
      const popup = document.getElementById('investigate-popup');
      popup.style.display = 'block';
        const modalOverlay = document.getElementById('modal-overlay');
      modalOverlay.style.display = 'block';
      
      // 2. Set the card image
      const cardImage = document.getElementById('investigate-card');
      cardImage.src = "Visual Assets/Heroes/Dark City/DarkCity_Daredevil_TheManWithoutFear.webp";
      cardImage.style.display = "block";
      
      // 3. Modify the popup content for number selection
      const popupTitle = document.getElementById('investigate-h2');
      popupTitle.textContent = "CHOOSE A NUMBER";
      
      const popupText = popup.querySelector('p');
      popupText.textContent = "Choose a number. If the first card in your deck has the same cost, draw it and repeat this process";
      
      // 4. Replace team selection with number dropdown
      const teamFilter = document.getElementById('investigate-team-filter');
      teamFilter.style.display = "none";
      
      // Create number dropdown
      const numberDropdown = document.createElement('select');
      numberDropdown.id = 'number-selection-dropdown';
      numberDropdown.innerHTML = '<option value="">Choose a number</option>' + 
        Array.from({length: 11}, (_, i) => i) // Creates array [0, 1, 2, ..., 10]
          .map(num => `<option value="${num}">${num}</option>`)
          .join('');
      
      // Insert the dropdown before the confirm button
      const confirmBtn = document.getElementById('investigate-confirm');
      popup.querySelector('.popup-content').insertBefore(numberDropdown, confirmBtn);
      
      // 5. Disable confirm button initially
      confirmBtn.disabled = true;
      
numberDropdown.onchange = () => {
  confirmBtn.disabled = !numberDropdown.value && numberDropdown.value !== "0";
};
      
      // Handle confirm button click
      confirmBtn.onclick = () => {
        try {
          const selectedNumber = parseInt(numberDropdown.value);
          if (isNaN(selectedNumber)) return; // Changed from !selectedNumber
          
          // Hide popup immediately
          popup.style.display = 'none';
          modalOverlay.style.display = 'none';
          
          // Check deck status - shuffle discard pile into deck if empty
          if (playerDeck.length === 0) {
            if (playerDiscardPile.length > 0) {
              playerDeck = shuffle(playerDiscardPile);
              playerDiscardPile = [];
              onscreenConsole.log("Shuffled discard pile into deck.");
            } else {
              onscreenConsole.log("Your deck and discard pile are empty. No cards available to reveal.");
              cleanupPopup();
              updateGameBoard();
              resolve();
              return;
            }
          }
          
          // Check first card in playerDeck
          const topCard = playerDeck[playerDeck.length - 1];
          if (topCard.cost === selectedNumber) {
            onscreenConsole.log(`You revealed <span class="console-highlights">${topCard.name}</span>. They have the same cost as your chosen number! Drawing now...`);
            extraDraw();
            onscreenConsole.log(`Repeat the process and choose a number again.`);            
            // Clean up current popup
            cleanupPopup();
            
            // If we got a match, try again
            attemptSelection();
          } else {
            onscreenConsole.log(`You revealed <span class="console-highlights">${topCard.name}</span>. They do not have the same cost as your chosen number.`);
	topCard.revealed = true;
            cleanupPopup();
            updateGameBoard();
            resolve();
          }
        } catch (error) {
          console.error("Error in Daredevil's The Man Without Fear:", error);
          cleanupPopup();
          resolve();
        }
      };
      
      function cleanupPopup() {
        // Reset popup to original state
        popup.style.display = 'none';
        modalOverlay.style.display = 'none';
        popupTitle.textContent = "INVESTIGATE!";
        popupText.textContent = "Choose a team. Investigate for a card of that team.";
        teamFilter.style.display = "block";
        cardImage.src = "";
        
        // Remove number dropdown if it exists
        const dropdown = document.getElementById('number-selection-dropdown');
        if (dropdown) dropdown.remove();
        
        // Reset confirm button
        confirmBtn.disabled = true;
      }
    };
    
    // Start the first attempt
    attemptSelection();
  });
}

function forgeDirtyWork() {
city5TempBuff--;
city5TempBuff--;
onscreenConsole.log(`Any Villain you fight in the Sewers this turn gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
updateGameBoard();
}

function forgeReboot() {
    return new Promise((resolve) => {
        if (playerHand.length === 0) {
            onscreenConsole.log('You have no cards available to discard.');
            resolve();
            return;
        }

        // Sort the hand FIRST, before any processing
        genericCardSort(playerHand);

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const discardButton = document.getElementById('card-choice-confirm-button');
        const noThanks = document.getElementById('close-choice-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Discard';
        instructionsDiv.innerHTML = 'You may discard a card from your hand to draw two more.';
        cardsList.innerHTML = '';
        discardButton.style.display = 'inline-block';
        discardButton.disabled = true;
        discardButton.textContent = 'Discard Selected Card';
        modalOverlay.style.display = 'block';
        noThanks.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        function updateDiscardButton() {
            discardButton.disabled = selectedCard === null;
        }

        // Update instructions with selected card
        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.textContent = 'You may discard a card from your hand to draw two more.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be discarded.`;
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
        function toggleCardSelection(card, listItem, index) {
            if (selectedCard === card) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedIndex = null;
                listItem.classList.remove('selected');
                updateCardImage(null);
            } else {
                // Clear previous selection if any
                if (selectedCard) {
                    const prevListItem = document.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                // Select new Card
                selectedCard = card;
                selectedIndex = index; // Store the actual index
                listItem.classList.add('selected');
                updateCardImage(card);
            }

            updateDiscardButton();
            updateInstructions();
        }

        // Populate the list with eligible cards
        playerHand.forEach((card, index) => {
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

            li.setAttribute('data-card-id', card.id);
            li.setAttribute('data-card-index', index); // Store index for reference

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

            li.onclick = () => toggleCardSelection(card, li, index);
            cardsList.appendChild(li);
        });

        // Handle discard confirmation
        discardButton.onclick = async () => {
            if (selectedCard && selectedIndex !== null) {
                extraDraw();
                extraDraw();
                
                // Use the stored index to remove the correct card
                if (selectedIndex >= 0 && selectedIndex < playerHand.length && playerHand[selectedIndex] === selectedCard) {
                    const discardedCard = playerHand.splice(selectedIndex, 1)[0];
                    
                    const { returned } = await checkDiscardForInvulnerability(discardedCard);
                    if (returned.length) {
                        playerHand.push(...returned);
                    }
                } else {
                    // Fallback: find by ID if index doesn't match (shouldn't happen with proper sorting)
                    const index = playerHand.findIndex(card => card.id === selectedCard.id);
                    if (index !== -1) {
                        const discardedCard = playerHand.splice(index, 1)[0];
                        const { returned } = await checkDiscardForInvulnerability(discardedCard);
                        if (returned.length) {
                            playerHand.push(...returned);
                        }
                    }
                }

                closePopup();
                updateGameBoard();
                resolve();
            } else {
                alert("Please select a card to discard.");
            }
        };

        noThanks.onclick = () => {
            closePopup();
            updateGameBoard();
            resolve();
        };

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            discardButton.textContent = 'Confirm';
            discardButton.style.display = 'none';
            discardButton.disabled = true;
            noThanks.style.display = 'none';
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

function forgeOverdrive() {
const cardImage = "Visual Assets/Heroes/Dark City/DarkCity_Forge_Overdrive.webp";
const amount = 3;  
versatile(amount, cardImage);
}

async function forgeBFG() {
let mastermind = getSelectedMastermind();

if (mastermind.tactics.length === 0) {
        const defeatedMasterminds = victoryPile.filter(card => card.type === "Mastermind");
        
        if (finalBlowEnabled === true && defeatedMasterminds.length < 5) {
            onscreenConsole.log(`Defeating the Mastermind!`);
        } else {
            onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> has been defeated! Finish your turn to win.`);
		return;
        }
}

confirmInstantMastermindAttack();
updateGameBoard();

}

function bishopConcussiveBlast() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"><img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`);
onscreenConsole.log(`+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function bishopWhateverTheCost() {
    onscreenConsole.log(`<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);

    if (playerHand.length === 0 && playerDiscardPile.length === 0) {
        onscreenConsole.log(`No cards available to KO.`);
        return;
    }

    return new Promise((resolve) => {
        // Sort both arrays FIRST, before any processing
        genericCardSort(playerDiscardPile);
        genericCardSort(playerHand);

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
        context.innerHTML = `You may KO a card from your hand or discard pile.`;
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
        let selectedIndex = null; // Store the index for reliable removal
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (!selectedCard) {
                context.innerHTML = `You may KO a card from your hand or discard pile.`;
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

        function toggleCardSelection(card, location, listItem, index) {
            if (selectedCard === card && selectedLocation === location) {
                // Deselect
                selectedCard = null;
                selectedLocation = null;
                selectedIndex = null;
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
                selectedIndex = index; // Store the index
                listItem.classList.add('selected');
                updateCardImage(card);
            }
            updateConfirmButton();
            updateInstructions();
        }

        // Populate discard pile
        playerDiscardPile.forEach((card, index) => {
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
            li.dataset.cardIndex = index; // Store index for reference

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

            li.onclick = () => toggleCardSelection(card, 'discard pile', li, index);
            discardPileList.appendChild(li);
        });

        // Populate hand
        playerHand.forEach((card, index) => {
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
            li.dataset.cardIndex = index; // Store index for reference

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

            li.onclick = () => toggleCardSelection(card, 'hand', li, index);
            handList.appendChild(li);
        });

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard && selectedLocation && selectedIndex !== null) {
                let koIndex = -1;
                let sourceArray = selectedLocation === 'discard pile' ? playerDiscardPile : playerHand;
                
                // First try using the stored index (most reliable)
                if (selectedIndex >= 0 && selectedIndex < sourceArray.length && sourceArray[selectedIndex] === selectedCard) {
                    koIndex = selectedIndex;
                } else {
                    // Fallback: find by ID if index doesn't match
                    koIndex = sourceArray.findIndex(c => c.id === selectedCard.id);
                }

                if (koIndex !== -1) {
                    const koedCard = sourceArray.splice(koIndex, 1)[0];
                    koPile.push(koedCard);                  
                    onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been KO'd from your ${selectedLocation}.`);
                    koBonuses();
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

function professorXPsionicAstralForm() {
onscreenConsole.log(`<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`+2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
bonusAttack();
}

function professorXClassDismissedKO() {
    onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);

    if (playerHand.length === 0 && playerDiscardPile.length === 0) {
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
        context.innerHTML = `You may KO a card from your hand or discard pile.`;
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
                context.innerHTML = `You may KO a card from your hand or discard pile.`;
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

        // Create sorted copies for display only - don't modify the original arrays
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
                // Use the original arrays (not the sorted copies) for removal
                if (selectedLocation === 'discard pile') {
                    koIndex = playerDiscardPile.findIndex(c => c.id === selectedCard.id);
                    if (koIndex !== -1) playerDiscardPile.splice(koIndex, 1);
                } else {
                    koIndex = playerHand.findIndex(c => c.id === selectedCard.id);
                    if (koIndex !== -1) playerHand.splice(koIndex, 1);
                }

                if (koIndex !== -1) {
                    koPile.push(selectedCard);                  
                    onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been KO'd from your ${selectedLocation}.`);
                    koBonuses();
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

function professorXClassDismissed() {
  updateGameBoard();

  return new Promise((resolve) => {
    const heroSelectPopup = document.getElementById('hero-select-popup');
    const modalOverlay     = document.getElementById('modal-overlay');
    const heroOptions      = document.getElementById('hero-options');
    const context          = document.getElementById('hero-select-context');
    const heroImage        = document.getElementById('hero-select-image');
    const hoverText        = document.getElementById('selectHoverText');

    // Clean any old buttons
    const existingConfirm = document.getElementById('hero-select-confirm');
    if (existingConfirm) heroSelectPopup.removeChild(existingConfirm);
    const existingNoThanks = heroSelectPopup.querySelector('.heroSelectNoThanksButton');
    if (existingNoThanks) heroSelectPopup.removeChild(existingNoThanks);

    // Build buttons
    const confirmButton = document.createElement('button');
    confirmButton.id = 'hero-select-confirm';
    confirmButton.textContent = 'CONFIRM';
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;

    const noThanksButton = document.createElement('button');
    noThanksButton.className = 'heroSelectNoThanksButton';
    noThanksButton.textContent = 'No Thanks';
    noThanksButton.style.width = '50%';

    // UI copy (no Scheme Twist wording)
    context.innerHTML = 'You may choose a Hero in the HQ to return to the bottom of the Hero Deck.';

    heroImage.style.display = 'none';
    hoverText.style.display = 'block';
    heroOptions.innerHTML = '';

    let selectedHQIndex = null;
    let activeImage = null;

    heroSelectPopup.appendChild(confirmButton);
    heroSelectPopup.appendChild(noThanksButton);

    // Preserve original HQ order
    const eligible = hq
      .map((hero, hqIndex) => ({ hero, hqIndex }))
      .filter(x => x.hero && x.hero.type === 'Hero' && x.hero.cost <= 10);

    if (eligible.length === 0) {
      onscreenConsole.log('No eligible Heroes in the HQ (cost 10 or less).');
      heroSelectPopup.removeChild(confirmButton);
      heroSelectPopup.removeChild(noThanksButton);
      heroSelectPopup.style.display = 'none';
      modalOverlay.style.display = 'none';
      resolve();
      return;
    }

    // Helpers
    const createTeamIconHTML = (value) => {
      if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
        return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
      }
      return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
    };
    const createClassIconHTML = (value) => {
      if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') return '';
      return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
    };

    // Populate options strictly in HQ order
    eligible.forEach(({ hero, hqIndex }) => {
      const heroButton = document.createElement('button');
      heroButton.classList.add('hero-option');
      heroButton.setAttribute('data-hq-index', String(hqIndex));

      const teamIcon = createTeamIconHTML(hero.team);
      const class1   = createClassIconHTML(hero.class1);
      const class2   = createClassIconHTML(hero.class2);
      const class3   = createClassIconHTML(hero.class3);

      heroButton.innerHTML =
        `<span style="white-space: nowrap;">HQ-${hqIndex + 1} | ${teamIcon} | ${class1} ${class2} ${class3} | ${hero.name}</span>`;

      // Hover preview
      heroButton.onmouseover = () => {
        if (!activeImage) {
          heroImage.src = hero.image;
          heroImage.style.display = 'block';
          hoverText.style.display = 'none';
        }
      };
      heroButton.onmouseout = () => {
        if (!activeImage) {
          heroImage.src = '';
          heroImage.style.display = 'none';
          hoverText.style.display = 'block';
        }
      };

      // Selection (by HQ index)
      heroButton.onclick = () => {
        const thisHQIndex = Number(heroButton.getAttribute('data-hq-index'));
        if (selectedHQIndex === thisHQIndex) {
          selectedHQIndex = null;
          heroButton.classList.remove('selected');
          activeImage = null;
          heroImage.src = '';
          heroImage.style.display = 'none';
          hoverText.style.display = 'block';
          confirmButton.disabled = true;
        } else {
          if (selectedHQIndex !== null) {
            const prev = heroOptions.querySelector(`button[data-hq-index="${selectedHQIndex}"]`);
            if (prev) prev.classList.remove('selected');
          }
          selectedHQIndex = thisHQIndex;
          heroButton.classList.add('selected');
          activeImage = hero.image;
          heroImage.src = hero.image;
          heroImage.style.display = 'block';
          hoverText.style.display = 'none';
          confirmButton.disabled = false;
        }
      };

      heroOptions.appendChild(heroButton);
    });

    // Confirm
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(() => {
        const chosen = hq[selectedHQIndex];
        if (chosen) {
          onscreenConsole.log(
            `You have chosen to return <span class="console-highlights">${chosen.name}</span> to the bottom of the Hero Deck.`
          );
        }
        returnHeroToDeck(selectedHQIndex); // keep your existing implementation
        updateGameBoard();

        // Cleanup
        heroSelectPopup.removeChild(confirmButton);
        heroSelectPopup.removeChild(noThanksButton);
        heroSelectPopup.style.display = 'none';
        modalOverlay.style.display = 'none';
        resolve();
      }, 100);
    };

    // No Thanks
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      setTimeout(() => {
        onscreenConsole.log('You chose not to return a Hero to the bottom of the Hero Deck.');
        updateGameBoard();

        // Cleanup
        heroSelectPopup.removeChild(confirmButton);
        heroSelectPopup.removeChild(noThanksButton);
        heroSelectPopup.style.display = 'none';
        modalOverlay.style.display = 'none';
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = 'block';
    heroSelectPopup.style.display = 'block';
  });
}

async function bishopFirepowerFromTheFuture() {
    // Check if we need to shuffle discard into deck
    if (playerDeck.length < 4) {
        if (playerDiscardPile.length > 0) {
            // Shuffle discard pile into deck
		shuffle(playerDiscardPile);
            playerDeck = [...playerDeck, ...playerDiscardPile];
            playerDiscardPile = [];
        } else if (playerDeck.length === 0) {
            onscreenConsole.log("No cards available to discard.");
            return;
        }
    }

    // Take up to 4 cards from the top of the deck
    const cardsToProcess = playerDeck.splice(-4);
    const originalCardsToProcess = [...cardsToProcess]; // Keep a copy for potential KO selection

    // Calculate attack points
    const attackPoints = cardsToProcess.reduce((sum, card) => sum + (card.attack || 0), 0);
    totalAttackPoints += attackPoints;
    cumulativeAttackPoints += attackPoints;
    
    updateGameBoard();

    // Process discard with invulnerability checks
    for (const card of cardsToProcess) {
        
        const { returned } = await checkDiscardForInvulnerability(card);
                        if (returned.length) {
                        playerHand.push(...returned);
                        }

        onscreenConsole.log(`They gave you +${card.attack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
        // Note: checkDiscardForInvulnerability handles the actual discarding
    }

    onscreenConsole.log(`You gained a total of +${attackPoints}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from the cards on top of your deck.`);

const previousCards = cardsPlayedThisTurn.slice(0, -1);

    // Check for X-Men hero in cards played this turn
    const hasXMenHero = previousCards.some(card => 
        card.team && card.team.includes("X-Men")
    );

    if (hasXMenHero && originalCardsToProcess.length > 0) {
        // Filter to only include cards that are actually in the discard pile
        const availableCardsToKO = originalCardsToProcess.filter(card => 
            playerDiscardPile.includes(card)
        );
        
        if (availableCardsToKO.length > 0) {
onscreenConsole.log(`<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
            await showXMenKOPopup(availableCardsToKO);
        }
    }

    updateGameBoard();
}

async function showXMenKOPopup(availableCards) {
    return new Promise((resolve) => {
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
        popupTitle.textContent = 'KO CHOICE';
        instructionsDiv.innerHTML = 'Choose any number of these cards to KO.';
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
                instructionsDiv.innerHTML = 'Choose any number of these cards to KO.';
            } else {
                const names = selectedCards.map(card => `<span class="console-highlights">${card.name}</span>`).join(', ');
                instructionsDiv.innerHTML = `Selected: ${names} (${selectedCards.length})`;
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
            const cardIndex = selectedCards.findIndex(c => c.id === card.id);
            
            if (cardIndex > -1) {
                // Deselect card
                selectedCards.splice(cardIndex, 1);
                listItem.classList.remove('selected');
                if (activeImage === card.image) updateCardImage(null);
            } else if (selectedCards.length < 30) {
                // Select card
                selectedCards.push(card);
                listItem.classList.add('selected');
                updateCardImage(card);
            }

            updateKOButton();
            updateInstructions();
        }

        // Create a sorted copy for display only
        const sortedAvailableCards = [...availableCards];
        genericCardSort(sortedAvailableCards);

        // Populate the list with sorted available cards
        sortedAvailableCards.forEach((card) => {
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

        // Handle KO button click
        koButton.onclick = () => {
            if (selectedCards.length > 0) {
                selectedCards.forEach(card => {
                    // Find card in discard pile by ID (more reliable than indexOf)
                    const discardIndex = playerDiscardPile.findIndex(c => c.id === card.id);
                    if (discardIndex !== -1) {
                        const [koCard] = playerDiscardPile.splice(discardIndex, 1);
                        // Add to KO pile
                        koPile.push(koCard);
                        console.log(`${koCard.name} KO'd from discard.`);
                        onscreenConsole.log(`<span class="console-highlights">${koCard.name}</span> has been KO'd.`);
                        koBonuses();
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

function bishopAbsorbEnergies() {
onscreenConsole.log(`Whenever a card you own is KO'd this turn, you get +2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);
twoRecruitFromKO += 2;
}

function professorXMindControl() {
onscreenConsole.log(`Whenever you defeat a Villain this turn, you may gain it. It becomes a grey Hero with no text that gives +<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> equal to its <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. (You still get its Victory Points.)`);
hasProfessorXMindControl = true;
}

async function professorXTelepathicProbe() {
    if (villainDeck.length === 0) {
        onscreenConsole.log("Villain deck is empty.");
        return;
    }

    const topCard = villainDeck[villainDeck.length - 1];
topCard.revealed = true;

    switch (topCard.type) {
        case "Bystander":
            onscreenConsole.log(`You revealed the top card of the Villain deck. It is a <span class="console-highlights">${topCard.type}</span>.`);
            await professorXHandleBystanderCard(topCard);
            break;
        case "Scheme Twist":
        case "Master Strike":
            onscreenConsole.log(`You revealed the top card of the Villain deck. It is a <span class="console-highlights">${topCard.type}</span>.`);
            break;
        case "Villain":
            onscreenConsole.log(`You revealed the top card of the Villain deck - <span class="console-highlights">${topCard.name}</span>. As it is a <span class="console-highlights">${topCard.type}</span>, you may fight it this turn by clicking <span class="console-highlights">Professor X - Telepathic Probe</span> in your Played Cards pile.`);
            const telepathicProbeCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
            telepathicProbeCard.villain = {
                name: topCard.name,
                deckLength: villainDeck.length // Store the deck length when the probe was used
            };
            break;
        default:
            console.log(`Unknown card type: ${topCard.type}`);
    }
}

async function professorXHandleBystanderCard(bystanderCard) {
    return new Promise((resolve) => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            "RESCUE BYSTANDER?",
            "Rescue",
            "Leave"
        );

        document.getElementById('heroAbilityHoverText').style.display = 'none';

        const cardImage = document.getElementById('hero-ability-may-card');
        cardImage.src = bystanderCard.image || 'Visual Assets/Cards/Bystander.webp';
        cardImage.style.display = 'block';

        confirmButton.onclick = async () => {
            // Remove from villain deck and add to victory pile
            villainDeck.pop();
            victoryPile.push(bystanderCard);

            onscreenConsole.log(`You rescued <span class="console-highlights">${bystanderCard.name}</span>!`);
            bystanderBonuses();
            updateGameBoard();
            hideHeroAbilityMayPopup();

            await rescueBystanderAbility(bystanderCard);

            document.getElementById('heroAbilityHoverText').style.display = 'block';
            resolve();
        };

        denyButton.onclick = () => {
            onscreenConsole.log(`You left <span class="console-highlights">${bystanderCard.name}</span> on top of the Villain deck.`);
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            resolve();
        };
    });
}

async function initiateTelepathicVillainFight(villainCard, telepathicProbeCard) {
playSFX('attack');

    if (telepathicProbeCard) {
        telepathicProbeCard.villain = null; // Clear the reference after fighting
    }

    onscreenConsole.log(`Preparing to fight <span class="console-highlights">${villainCard.name}</span> using <span class="console-highlights">Professor X - Telepathic Probe</span>.`);
    
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    // Calculate the villain's effective attack value
    let villainAttack = recalculateVillainAttack(villainCard);

    // Ensure villainAttack doesn't drop below 0
    if (villainAttack < 0) {
        villainAttack = 0;
    }

    villainDeck.pop(villainCard);
    victoryPile.push(villainCard);

    onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been defeated.`);
 
    if (recruitUsedToAttack === true) {
        // Show counter popup for point allocation
        const result = await showCounterPopup(villainCard, villainAttack);
        totalAttackPoints -= result.attackUsed;
        totalRecruitPoints -= result.recruitUsed;
        
        onscreenConsole.log(`You chose to use ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points`);
    } else {
        totalAttackPoints -= villainAttack;
    }

    // Handle rescue of extra bystanders
    if (rescueExtraBystanders > 0) {
        for (let i = 0; i < rescueExtraBystanders; i++) {
            rescueBystander();
        }
    }

defeatBonuses();

    // Handle fight effect if the villain has one
    let fightEffectPromise = Promise.resolve();
    if (villainCard.fightEffect && villainCard.fightEffect !== "None") {
        const fightEffectFunction = window[villainCard.fightEffect];
        console.log("Fight effect function found:", fightEffectFunction);
        if (typeof fightEffectFunction === 'function') {
            fightEffectPromise = new Promise((resolve, reject) => {
                try {
                    const result = fightEffectFunction(villainCard);
                    console.log("Fight effect executed:", result);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            console.error(`Fight effect function ${villainCard.fightEffect} not found`);
        }
    } else {
        console.log("No fight effect found for this villain.");
    }

    // Handle fight effect promise
    await fightEffectPromise
        .then(() => {
            updateGameBoard(); // Update the game board after fight effect is handled
        })
        .catch(error => {
            console.error(`Error in fight effect: ${error}`);
            updateGameBoard(); // Ensure the game board is updated even if the fight effect fails
        });

            if (hasProfessorXMindControl) {
    // Show popup for gaining villain as hero
    const gainVillainResult = await new Promise((resolve) => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            "DO YOU WISH TO GAIN THIS VILLAIN?",
            "GAIN AS A HERO",
            "NO THANKS!"
        );

        document.getElementById('heroAbilityHoverText').style.display = 'none';

        // Show the villain card image in the popup
        const cardImage = document.getElementById('hero-ability-may-card');
        cardImage.src = 'Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_MindControl.webp';
        cardImage.style.display = 'block';

        confirmButton.onclick = () => {
            // Create and modify the copy
            const cardCopy = JSON.parse(JSON.stringify(villainCard));
            cardCopy.type = "Hero";
            cardCopy.color = "Grey";
            cardCopy.cost = villainCard.attack;
            cardCopy.keyword1 = "None";
            cardCopy.keyword2 = "None";
            cardCopy.keyword3 = "None";
            
            playerDiscardPile.push(cardCopy);
            
            onscreenConsole.log(`You have chosen to add <span class="console-highlights">${villainCard.name}</span> to your discard pile as a grey Hero.`);
            updateGameBoard();
            
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            resolve(true); // Resolve with true indicating the player chose to copy
        };

        denyButton.onclick = () => {
            onscreenConsole.log(`You declined to copy ${villainCard.name}.`);
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            resolve(false); // Resolve with false indicating the player declined
        };
    });
}

    // Reset the currentVillainLocation after the attack is resolved
    currentVillainLocation = null;
    updateGameBoard();

}

// Card Abilities for Dark City Henchmen

async function PhalanxTechOrKOAttack() {
    return new Promise((resolve) => {  // Remove reject since it's not used
        // Remove the setTimeout - it's not needed and can cause issues
        const hasTech = playerHand.some(card => card.class1 === 'Tech') || 
            cardsPlayedThisTurn.some(card => 
                card.class1 === 'Tech' && 
                card.isCopied !== true && 
                card.sidekickToDestroy !== true
            );
            
        if (!hasTech) {
            onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`);
            document.getElementById('modal-overlay').style.display = 'block';
            // Properly chain the Promise
            handlePhalanxNoTechRevealed().then(resolve);
        } else {
            document.getElementById('modal-overlay').style.display = 'block';
            // Properly chain the Promise
            handlePhalanxTechRevealed().then(resolve);
        }
    });
}


function handlePhalanxNoTechRevealed() {
    return new Promise((resolve) => {
        const cardsYouHave = [
            ...playerHand,
            ...cardsPlayedThisTurn.filter(card => 
                !card.isCopied && 
                !card.sidekickToDestroy
            )
        ];
        const AttackCardsYouHave = cardsYouHave.filter(item => item.attackIcon === true);

        if (AttackCardsYouHave.length === 0) {
            console.log('No available Heroes.');
            onscreenConsole.log(`You do not have any Heroes with a <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> icon.`);
            document.getElementById('modal-overlay').style.display = 'none';
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
        popupTitle.textContent = 'Fight Effect!';
        instructionsDiv.innerHTML = `Choose one of your Heroes with a <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'> icon to KO.`;
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
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
                instructionsDiv.innerHTML = `Choose one of your Heroes with a <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'> icon to KO.`;
            } else {
                const location = playerHand.includes(selectedCard) ? '(from Hand)' : '(from Played Cards)';
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> ${location} will be KO'd.`;
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
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Sort the cards for display
        genericCardSort(AttackCardsYouHave);

        // Populate the list with eligible heroes
        AttackCardsYouHave.forEach((card) => {
            console.log('Adding card to selection list:', card);
            const li = document.createElement('li');
            const location = playerHand.includes(card) ? '(Hand)' : '(Played Cards)';
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
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name} ${location}</span>`;

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
                // Find the card by ID in the original arrays, not by index
                const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(c => c.id === selectedCard.id);
                const indexInHand = playerHand.findIndex(c => c.id === selectedCard.id);

                if (indexInCardsPlayed !== -1) {
                    selectedCard.markedToDestroy = true;
                } else if (indexInHand !== -1) {
                    playerHand.splice(indexInHand, 1);
                }

                koPile.push(selectedCard);

                onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`);
                koBonuses();
                closePopup();
                updateGameBoard();
                resolve(true);
            }
        }

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

function handlePhalanxTechRevealed() {
    return new Promise((resolve) => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            "DO YOU WISH TO REVEAL A CARD?",
            "Yes",
            "No"
        );

        document.getElementById('modal-overlay').style.display = 'block';
        const cardImage = document.getElementById('hero-ability-may-card');
        cardImage.src = 'Visual Assets/Henchmen/DarkCity_phalanx.webp';
        cardImage.style.display = 'block';
        document.getElementById('heroAbilityHoverText').style.display = 'none';

        confirmButton.onclick = () => {
            onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped <span class="console-highlights">Phalanx</span><span class="bold-spans">'s</span> fight effect!`);
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            resolve(true);  // Explicitly resolve
        };

        denyButton.onclick = () => {
            onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`);
            hideHeroAbilityMayPopup();
            document.getElementById('oneChoiceHoverText').style.display = 'block';
            document.getElementById('modal-overlay').style.display = 'block';
            // Chain to the next handler and resolve when it completes
            handlePhalanxNoTechRevealed().then(resolve);
        };
    });
}

// Card Abilities for Dark City Bystanders

async function rescueBystanderAbility(bystander) {  
let abilityPromise = Promise.resolve();
            if (bystander.bystanderUnconditionalAbility && bystander.bystanderUnconditionalAbility !== "None") {
                const abilityFunction = window[bystander.bystanderUnconditionalAbility];
                if (typeof abilityFunction === 'function') {
                    // Wrap the result in a Promise if it isn't one
                    abilityPromise = new Promise((resolve, reject) => {
                        try {
                            const result = abilityFunction(bystander);
                            resolve(result);
				addHRToTopWithInnerHTML();
                        } catch (error) {
                            reject(error);
                        }
                    });
                } else {
                    console.error(`Unconditional ability function ${bystander.bystanderUnconditionalAbility} not found`);
                }
            }

}

function bystanderNewsReporter() {
onscreenConsole.log(`<span class="console-highlights">News Reporter</span><span class="bold-spans">'s</span> ability activated!`);
extraDraw();
}

function bystanderRadiationScientist() {
    onscreenConsole.log(`<span class="console-highlights">Radiation Scientist</span><span class="bold-spans">'s</span> ability activated!`);
    return new Promise((resolve) => {
        // Get only Hero cards from each location
        const handHeroes = playerHand.filter(card => card.type === 'Hero');
        const discardHeroes = playerDiscardPile.filter(card => card.type === 'Hero');
        const playedHeroes = cardsPlayedThisTurn.filter(card => card.type === 'Hero' && !card.isCopied && !card.sidekickToDestroy);

        if (handHeroes.length === 0 && discardHeroes.length === 0 && playedHeroes.length === 0) {
            onscreenConsole.log(`No Heroes available to be KO'd.`);
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

        document.getElementById("card-list-hand").innerHTML = 'Cards You Have';

        // Initialize UI
        context.innerHTML = `<span class="console-highlights">Radiation Scientist</span> - You may KO one of your Heroes or a Hero from your discard pile.`;
        discardPileList.innerHTML = "";
        handList.innerHTML = "";
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm KO';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';
        popup.style.zIndex = 1002;

        let selectedCard = null;
        let selectedLocation = null; // 'hand', 'played', or 'discard'
        let activeImage = null; // Declare activeImage variable
        
        KOImage.style.display = 'block';
        hoverText.style.display = 'none';
        KOImage.src = 'Visual Assets/Other/Bystanders/radiationScientist.webp';
        activeImage = 'Visual Assets/Other/Bystanders/radiationScientist.webp';

        // Update the confirm button state
        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        // Update instructions
        function updateInstructions() {
            if (selectedCard === null) {
                context.innerHTML = `<span class="console-highlights">Radiation Scientist</span> - You may KO one of your Heroes or a Hero from your discard pile.`;
            } else {
                context.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
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
                KOImage.style.display = 'block';
                hoverText.style.display = 'none';
                KOImage.src = 'Visual Assets/Other/Bystanders/radiationScientist.webp';
                activeImage = 'Visual Assets/Other/Bystanders/radiationScientist.webp';
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

        // Sort the arrays for display
        genericCardSort(discardHeroes);
        genericCardSort(handHeroes);
        genericCardSort(playedHeroes);

        // Populate discard pile
        discardHeroes.forEach((card) => {
            const li = document.createElement("li");
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
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name} (Discard Pile)</span>`;

            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage || activeImage === 'Visual Assets/Other/Bystanders/radiationScientist.webp') {
                    KOImage.src = card.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage || activeImage === 'Visual Assets/Other/Bystanders/radiationScientist.webp') {
                    KOImage.src = 'Visual Assets/Other/Bystanders/radiationScientist.webp';
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onclick = () => toggleCardSelection(card, 'discard', li);
            discardPileList.appendChild(li);
        });

        // Populate hand with location indicators
        handHeroes.forEach((card) => {
            const li = document.createElement("li");
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
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name} (Hand)</span>`;

            li.setAttribute('data-card-id', card.id);

            li.onmouseover = () => {
                if (!activeImage || activeImage === 'Visual Assets/Other/Bystanders/radiationScientist.webp') {
                    KOImage.src = card.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onmouseout = () => {
                if (!activeImage || activeImage === 'Visual Assets/Other/Bystanders/radiationScientist.webp') {
                    KOImage.src = 'Visual Assets/Other/Bystanders/radiationScientist.webp';
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            li.onclick = () => toggleCardSelection(card, 'hand', li);
            handList.appendChild(li);
        });

        // Populate played cards - FIXED: Create a separate section for played cards
        // Check if we need to create a separate list for played cards
        if (playedHeroes.length > 0) {
            // Create a heading for played cards
            const playedHeading = document.createElement('div');
            playedHeading.innerHTML = '<strong>Played Cards</strong>';
            handList.appendChild(playedHeading);
            
            playedHeroes.forEach((card) => {
                const li = document.createElement("li");
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
                
                li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name} (Played Cards)</span>`;

                li.setAttribute('data-card-id', card.id);

                li.onmouseover = () => {
                    if (!activeImage || activeImage === 'Visual Assets/Other/Bystanders/radiationScientist.webp') {
                        KOImage.src = card.image;
                        KOImage.style.display = 'block';
                        hoverText.style.display = 'none';
                    }
                };

                li.onmouseout = () => {
                    if (!activeImage || activeImage === 'Visual Assets/Other/Bystanders/radiationScientist.webp') {
                        KOImage.src = 'Visual Assets/Other/Bystanders/radiationScientist.webp';
                        KOImage.style.display = 'block';
                        hoverText.style.display = 'none';
                    }
                };

                li.onclick = () => toggleCardSelection(card, 'played', li);
                handList.appendChild(li);
            });
        }

        // Handle confirmation
        confirmButton.onclick = () => {
            if (selectedCard && selectedLocation) {
                // Perform the KO from the correct location using ID lookup
                if (selectedLocation === 'discard') {
                    const index = playerDiscardPile.findIndex(card => card.id === selectedCard.id);
                    if (index !== -1) playerDiscardPile.splice(index, 1);
                } 
                else if (selectedLocation === 'hand') {
                    const index = playerHand.findIndex(card => card.id === selectedCard.id);
                    if (index !== -1) playerHand.splice(index, 1);
                }
                else if (selectedLocation === 'played') {
                    selectedCard.markedToDestroy = true;
                }
                
                koPile.push(selectedCard);
                onscreenConsole.log(`<span class="console-highlights">Radiation Scientist</span> - you KO'd <span class="console-highlights">${selectedCard.name}</span>.`);
                                
                koBonuses();
                document.getElementById("card-list-hand").innerHTML = 'Hand';
                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        // Handle cancellation
        const closeButton = document.getElementById('no-thanks-button');
        closeButton.style.display = 'inline-block';
        closeButton.onclick = () => {
            onscreenConsole.log(`<span class="console-highlights">Radiation Scientist</span> - You chose not to KO any cards.`);
            document.getElementById("card-list-hand").innerHTML = 'Hand';
            closePopup();
            resolve(false);
        };

        const closeXButton = document.getElementById('card-ko-popup-close');
        closeXButton.onclick = () => {
            onscreenConsole.log(`<span class="console-highlights">Radiation Scientist</span> - You chose not to KO any cards.`);
            document.getElementById("card-list-hand").innerHTML = 'Hand';
            closePopup();
            resolve(false);
        };

        function closePopup() {
            context.innerHTML = `<span class="console-highlights">Radiation Scientist</span> - You may KO one of your Heroes or a Hero from your discard pile.`;
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            KOImage.src = '';
            KOImage.style.display = 'none';
            hoverText.style.display = 'block';
            activeImage = null;
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
            popup.style.zIndex = 1000;
        }
    });
}

function bystanderParamedic() {
return new Promise((resolve) => {
    onscreenConsole.log(`<span class="console-highlights">Paramedic</span><span class="bold-spans">'s</span> ability activated!`);
        // Get wounds from both locations
        const discardPile = playerDiscardPile.filter(card => card.type === 'Wound');
        const hand = playerHand.filter(card => card.type === 'Wound');

        // If no wounds are found, log and resolve
        if (discardPile.length === 0 && hand.length === 0) {
            onscreenConsole.log('<span class="console-highlights">Paramedic</span> - No Wounds available to KO.');
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
        context.innerHTML = `<span class="console-highlights">Paramedic</span> - You may KO a Wound from your hand or discard pile.`;
        discardPileList.innerHTML = '';
        handList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'KO Wound';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        // Set Hulk image
        KOImage.src = "Visual Assets/Other/Bystanders/paramedic.webp";
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
                context.innerHTML = `<span class="console-highlights">Paramedic</span> - You may KO a Wound from your hand or discard pile.`;
            } else {
                context.innerHTML = `Selected: <span class="console-highlights">${selectedWound.name}</span> will be KO'd from your ${selectedLocation}.`;
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
                    KOImage.src = "Visual Assets/Other/Bystanders/paramedic.webp";
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
                    KOImage.src = "Visual Assets/Other/Bystanders/paramedic.webp";
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
                onscreenConsole.log(`<span class="console-highlights">Paramedic</span> - You KO'd a <span class="console-highlights">${selectedWound.name}</span> from your ${selectedLocation}.`);
koBonuses();

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
            console.log(`<span class="console-highlights">Paramedic</span> - No Wound was KO'd.`);
            onscreenConsole.log(`<span class="console-highlights">Paramedic</span> - You chose not to KO any Wounds.`);
            closePopup();
            resolve(false);
        };

        const closeXButton = document.getElementById('card-ko-popup-close');
            closeXButton.onclick = () => {
            console.log(`<span class="console-highlights">Paramedic</span> - No Wound was KO'd.`);
            onscreenConsole.log(`<span class="console-highlights">Paramedic</span> - You chose not to KO any Wounds.`);
            closePopup();
            resolve(false);
        };
    });
}

//Card Abilities for Dark City Villains

function rhinoAmbush() {
onscreenConsole.log(`Ambush! <span class="console-highlights">Rhino</span> makes you reveal the top card of the Villain deck.`);

const topCardOfVillainDeck = villainDeck[villainDeck.length - 1];

if (villainDeck.length === 0) {
onscreenConsole.log(`The Villain deck is empty. No cards to reveal.`);
return;
} 

if (topCardOfVillainDeck.type === "Master Strike") {
onscreenConsole.log(`You revealed a <span class="console-highlights">Master Strike</span> and gain a Wound.`);
topCardOfVillainDeck.revealed = true;
drawWound();
updateGameBoard();
} else {
onscreenConsole.log(`You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It is not a Master Strike and you have avoided gaining a Wound.`);
topCardOfVillainDeck.revealed = true;
updateGameBoard();
return;
}

}

function rhinoEscape() {
onscreenConsole.log(`Escape! <span class="console-highlights">Rhino</span> causes you to gain a Wound.`);
drawWound();
}

function electroAmbush() {
onscreenConsole.log(`Ambush! <span class="console-highlights">Electro</span> makes you reveal the top card of the Villain deck.`);
const topCardOfVillainDeck = villainDeck[villainDeck.length - 1];

if (villainDeck.length === 0) {
onscreenConsole.log(`The Villain deck is empty. No cards to reveal.`);
return;
} 

if (topCardOfVillainDeck.type === "Scheme Twist") {
onscreenConsole.log(`You revealed a <span class="console-highlights">Scheme Twist</span>. It will now be played.`);
drawVillainCard();
} else {
onscreenConsole.log(`You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It is not a Scheme Twist and does not need to be played.`);
topCardOfVillainDeck.revealed = true;
updateGameBoard();
return;
}
}

function eggheadAmbush() {
onscreenConsole.log(`Ambush! <span class="console-highlights">Egghead</span> makes you reveal the top card of the Villain deck.`);

const topCardOfVillainDeck = villainDeck[villainDeck.length - 1];

if (villainDeck.length === 0) {
onscreenConsole.log(`The Villain deck is empty. No cards to reveal.`);
return;
} 

if (topCardOfVillainDeck.type === "Villain") {
onscreenConsole.log(`You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It will now be played.`);
drawVillainCard();
} else {
onscreenConsole.log(`You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It is not a Villain and does not need to be played.`);
topCardOfVillainDeck.revealed = true;
updateGameBoard();
return;
}

}

function gladiatorAmbush(gladiatorCard) {
    onscreenConsole.log(`Ambush! <span class="console-highlights">Gladiator</span> makes you reveal the top card of the Villain deck.`);

    // Verify the gladiatorCard is actually in the city
    const gladiatorIndex = city.findIndex(card => card === gladiatorCard);
    if (gladiatorIndex === -1 || !(gladiatorCard.type === "Villain" || gladiatorCard.type === "Henchman")) {
        onscreenConsole.log(`No valid Gladiator found in the city to capture the Bystander.`);
        return;
    }

    if (villainDeck.length === 0) {
        onscreenConsole.log(`The Villain deck is empty. No cards to reveal.`);
        return;
    }

    const topCardOfVillainDeck = villainDeck[villainDeck.length - 1];

    if (topCardOfVillainDeck.type === "Bystander") {
        onscreenConsole.log(`You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>.`);
        
        // Attach the bystander to the specific Gladiator that triggered this
        attachBystanderToVillain(gladiatorIndex, topCardOfVillainDeck);
        
        updateGameBoard();
    } else {
        onscreenConsole.log(`You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It is not a Bystander and is not captured by <span class="console-highlights">Gladiator</span>.`);
topCardOfVillainDeck.revealed = true;
        updateGameBoard();
    }
}

function warFight() {
onscreenConsole.log(`<span class="console-highlights">War</span> - fight effect!`);

    const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Instinct').length === 0) {
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
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
    cardImage.src = 'Visual Assets/Villains/DarkCity_FourHorsemen_War.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
}, 10); // 10ms delay
}
}

function warEscape() {
onscreenConsole.log(`<span class="console-highlights">War</span> has escaped!`);

    const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Instinct').length === 0) {
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
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
    cardImage.src = 'Visual Assets/Villains/DarkCity_FourHorsemen_War.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
}, 10); // 10ms delay
}

}

function famineFight() {
onscreenConsole.log(`<span class="console-highlights">Famine</span> - fight effect!`);

    const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Instinct').length === 0) {
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
genericDiscardChoice();
} else {
setTimeout(() => {   
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Villains/DarkCity_FourHorsemen_Famine.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
genericDiscardChoice();
    };
}, 10); // 10ms delay
}    
}

function famineEscape() {
onscreenConsole.log(`<span class="console-highlights">Famine</span> has escaped!`);

    const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Instinct').length === 0) {
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
genericDiscardChoice();
} else {
setTimeout(() => {   
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Villains/DarkCity_FourHorsemen_Famine.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
genericDiscardChoice();
    };
}, 10); // 10ms delay
}    
}

function pestilenceFight() {
onscreenConsole.log(`<span class="console-highlights">Pestilence</span> - fight effect!`);
return new Promise((resolve) => {
    // Draw up to three cards
    let revealedCards = [];
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
      revealedCards.push(playerDeck.pop());
    }

    // Process cards - discard any with cost >= 1
    const cardsToDiscard = revealedCards.filter(card => card.cost >= 1);
    const cardsToReturn = revealedCards.filter(card => card.cost < 1);

    // Discard high cost cards immediately
    cardsToDiscard.forEach(card => {
      playerDiscardPile.push(card);
      onscreenConsole.log(`<span class="console-highlights">${card.name}</span> (Cost: ${card.cost}) discarded.`);
    });

    // Handle remaining cards (cost 0)
    if (cardsToReturn.length === 0) {
      onscreenConsole.log("All revealed cards cost 1 or more and have been discarded.");
      updateGameBoard();
      resolve();
      return;
    }

    if (cardsToReturn.length === 1) {
      // Only one card to return - just put it back
      playerDeck.push(cardsToReturn[0]);
      onscreenConsole.log(`<span class="console-highlights">${cardsToReturn[0].name}</span> returned to deck.`);
cardsToReturn[0].revealed = true;
      updateGameBoard();
      resolve();
      return;
    }

    // Multiple cards to return - let player choose order
    handleCardReturnOrder(cardsToReturn).then(() => {
      updateGameBoard();
      resolve();
    });
  });
}

function pestilenceEscape() {
onscreenConsole.log(`<span class="console-highlights">Pestilence</span> has escaped!`);
return new Promise((resolve) => {
    // Draw up to three cards
    let revealedCards = [];
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
      revealedCards.push(playerDeck.pop());
    }

    // Process cards - discard any with cost >= 1
    const cardsToDiscard = revealedCards.filter(card => card.cost >= 1);
    const cardsToReturn = revealedCards.filter(card => card.cost < 1);

    // Discard high cost cards immediately
    cardsToDiscard.forEach(card => {
      playerDiscardPile.push(card);
      onscreenConsole.log(`<span class="console-highlights">${card.name}</span> (Cost: ${card.cost}) discarded.`);
    });

    // Handle remaining cards (cost 0)
    if (cardsToReturn.length === 0) {
      onscreenConsole.log("All revealed cards cost 1 or more and have been discarded.");
      updateGameBoard();
      resolve();
      return;
    }

    if (cardsToReturn.length === 1) {
      // Only one card to return - just put it back
      playerDeck.push(cardsToReturn[0]);
      onscreenConsole.log(`<span class="console-highlights">${cardsToReturn[0].name}</span> returned to deck.`);
	cardsToReturn[0].revealed = true;
      updateGameBoard();
      resolve();
      return;
    }

    // Multiple cards to return - let player choose order
    handleCardReturnOrder(cardsToReturn).then(() => {
      updateGameBoard();
      resolve();
    });
  });
}

async function handleCardReturnOrder(cards) {
  const remainingCards = [...cards];
  const returnOrder = [];

  while (remainingCards.length > 0) {
    const choice = await showCardSelectionPopup({
      title: 'Return Cards to Deck',
      instructions: remainingCards.length === cards.length 
        ? 'Select first card to place on top of deck' 
        : 'Select next card to place on deck',
      items: remainingCards.map(card => ({
        name: card.name,
        image: card.image,
        card: card
      })),
      confirmText: 'CONFIRM SELECTION'
    });

    // Move selected card from remaining to return order
    const selectedIndex = remainingCards.findIndex(c => c === choice.card);
    remainingCards.splice(selectedIndex, 1);
    returnOrder.push(choice.card); // Changed from unshift to push
  }

  // Add all cards to deck in chosen order (now using unshift to maintain top-deck order)
  returnOrder.forEach(card => {
    playerDeck.push(card);
    card.revealed = true;
  });

  // Format console message
  const cardNames = returnOrder.map(card => 
    `<span class="console-highlights">${card.name}</span>`
  );

  if (cardNames.length > 1) {
    const last = cardNames.pop();
    onscreenConsole.log(`Returned to deck: ${cardNames.join(', ')} and ${last}`);
  } else {
    onscreenConsole.log(`Returned to deck: ${cardNames[0]}`);
  }
  updateGameBoard();
}

function deathFight() {
    onscreenConsole.log(`<span class="console-highlights">Death</span> - fight effect!`);
    return new Promise((resolve, reject) => {
        // Create array with original indices from playerHand
        const heroesThatCostMoreThanOne = playerHand
            .map((card, index) => ({ card, originalIndex: index }))
            .filter(item => item.card.cost >= 1);
        
        // Check if there are any heroes in the combined list
        if (heroesThatCostMoreThanOne.length === 0) {
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
        function toggleCardSelection(cardItem, cardIndex, listItem) {
            if (selectedCard && selectedCard.index === cardIndex) {
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
                    card: cardItem.card,
                    originalIndex: cardItem.originalIndex,
                    index: cardIndex
                };
                listItem.classList.add('selected');
                updateHeroImage(cardItem.card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Handle the confirm action
        confirmButton.onclick = () => {
            if (!selectedCard) return;

            const { card, originalIndex } = selectedCard;
            onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            koBonuses();
            
            // Remove the card from playerHand using the original index
            playerHand.splice(originalIndex, 1);
            
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

        // Sort the array (now it will sort by card but preserve originalIndex)
        genericCardSort(heroesThatCostMoreThanOne, item => item.card);

        // Populate the list with the heroes from the player's hand
        heroesThatCostMoreThanOne.forEach((cardItem, index) => {
            console.log('Adding card to selection list:', cardItem.card);
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
            
            const teamIcon = createTeamIconHTML(cardItem.card.team);
            const class1Icon = createClassIconHTML(cardItem.card.class1);
            const class2Icon = createClassIconHTML(cardItem.card.class2);
            const class3Icon = createClassIconHTML(cardItem.card.class3);
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${cardItem.card.name}</span>`;

            li.setAttribute('data-card-id', index);

            li.onmouseover = () => {
                if (!activeImage) { // Only change if no selection is locked
                    heroImage.src = cardItem.card.image;
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

            li.onclick = () => toggleCardSelection(cardItem, index, li);
            cardsList.appendChild(li);
        });
    });
}

function deathEscape() {
    onscreenConsole.log(`<span class="console-highlights">Death</span> has escaped!`);
    return new Promise((resolve, reject) => {
        // Create array with original indices from playerHand
        const heroesThatCostMoreThanOne = playerHand
            .map((card, index) => ({ card, originalIndex: index }))
            .filter(item => item.card.cost >= 1);
        
        // Check if there are any heroes in the combined list
        if (heroesThatCostMoreThanOne.length === 0) {
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
        popupTitle.textContent = 'ESCAPE EFFECT!';
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
        function toggleCardSelection(cardItem, cardIndex, listItem) {
            if (selectedCard && selectedCard.index === cardIndex) {
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
                    card: cardItem.card,
                    originalIndex: cardItem.originalIndex,
                    index: cardIndex
                };
                listItem.classList.add('selected');
                updateHeroImage(cardItem.card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Handle the confirm action
        confirmButton.onclick = () => {
            if (!selectedCard) return;

            const { card, originalIndex } = selectedCard;
            onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd.`);
            koBonuses();
            
            // Remove the card from playerHand using the original index
            playerHand.splice(originalIndex, 1);
            
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

        // Sort the array (now it will sort by card but preserve originalIndex)
        genericCardSort(heroesThatCostMoreThanOne, item => item.card);

        // Populate the list with the heroes from the player's hand
        heroesThatCostMoreThanOne.forEach((cardItem, index) => {
            console.log('Adding card to selection list:', cardItem.card);
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
            
            const teamIcon = createTeamIconHTML(cardItem.card.team);
            const class1Icon = createClassIconHTML(cardItem.card.class1);
            const class2Icon = createClassIconHTML(cardItem.card.class2);
            const class3Icon = createClassIconHTML(cardItem.card.class3);
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${cardItem.card.name}</span>`;

            li.setAttribute('data-card-id', index);

            li.onmouseover = () => {
                if (!activeImage) { // Only change if no selection is locked
                    heroImage.src = cardItem.card.image;
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

            li.onclick = () => toggleCardSelection(cardItem, index, li);
            cardsList.appendChild(li);
        });
    });
}

async function vertigoFight() {
    onscreenConsole.log(`<span class="console-highlights">Vertigo</span> - fight effect!`);
    const numberToDraw = playerHand.length;
    console.log("Player hand before discard:", playerHand);

    // Process discard with invulnerability check
    const { returned: returnedCards } = await checkDiscardForInvulnerability([...playerHand]);

    // Clear and redraw
    playerHand = [];
    
    // Draw new cards first
    for (let i = 0; i < numberToDraw; i++) {
        extraDraw();
    }

    // Then add back any invulnerable cards
    if (returnedCards.length > 0) {
        playerHand.push(...returnedCards);
    }

    console.log('Hand discarded and redrawn. Updated playerHand:', playerHand);
    onscreenConsole.log('Hand discarded and redrawn.');
    updateGameBoard();
}

function scalphunterAmbush(scalphunter) {
onscreenConsole.log(`Ambush! <span class="console-highlights">Scalphunter</span> captures a Bystander from your Victory Pile.`);
    return new Promise((resolve) => {
        const bystandersInVP = victoryPile
            .map((card, index) => (card && card.type === 'Bystander') 
                ? { ...card, id: `vp-${index}`, index } 
                : null)
            .filter(card => card !== null);

        // Handle cases with 0 bystanders immediately
        if (bystandersInVP.length === 0) {
            onscreenConsole.log('There are no Bystanders in your Victory Pile for <span class="console-highlights">Scalphunter</span> to capture.');
            updateGameBoard();
            resolve();
            return;
        }

        // If only 1 bystander, automatically capture it
        if (bystandersInVP.length === 1) {
            const card = bystandersInVP[0];
            victoryPile.splice(card.index, 1);
            const scalphunterIndex = city.findIndex(c => c === scalphunter);
            attachBystanderToVillain(scalphunterIndex, card);
            onscreenConsole.log(`You only had one Bystander in your Victory Pile: <span class="console-highlights">${card.name}</span> has been captured by <span class="console-highlights">Scalphunter</span>.`);
            updateGameBoard();
            resolve();
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const captureButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'Capture Bystander';
        instructionsDiv.innerHTML = 'Select one Bystander to capture with Scalphunter from your Victory Pile.';
        cardsList.innerHTML = '';
        captureButton.style.display = 'inline-block';
        captureButton.disabled = true;
        captureButton.textContent = 'Capture Selected Bystander';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedBystander = null;
        let activeImage = null;

        // Update capture button state and text
        function updateCaptureButton() {
            captureButton.disabled = !selectedBystander;
            captureButton.textContent = selectedBystander ? 'Capture Selected Bystander' : 'Select a Bystander';
        }

        // Update instructions with selection status
        function updateInstructions() {
            if (!selectedBystander) {
                instructionsDiv.textContent = 'Select one Bystander from your Victory Pile to be captured.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedBystander.name}</span>`;
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

        // Select bystander
        function selectBystander(card, listItem) {
            // Deselect previous selection if any
            if (selectedBystander) {
                const prevItem = cardsList.querySelector(`li[data-card-id="${selectedBystander.id}"]`);
                if (prevItem) prevItem.classList.remove('selected');
            }
            
            // Select new one
            selectedBystander = card;
            listItem.classList.add('selected');
            updateBystanderImage(card);

            updateCaptureButton();
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

            li.onclick = () => selectBystander(card, li);
            cardsList.appendChild(li);
        });

// Handle capture confirmation
captureButton.onclick = () => {
    if (selectedBystander) {
        victoryPile.splice(selectedBystander.index, 1);
        const scalphunterIndex = city.findIndex(c => c === scalphunter);
        
        // Create a copy instead of using the original reference
        const bystanderCopy = {...selectedBystander};
        villainEffectAttachBystanderToVillain(scalphunterIndex, bystanderCopy);
        
        closePopup();
        updateGameBoard();
        resolve();
    }
};

        function closePopup() {
            // Reset UI
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            captureButton.textContent = 'Confirm';
            captureButton.style.display = 'none';
            captureButton.disabled = true;
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

function chimeraAmbush(chimera) {
    onscreenConsole.log(`Ambush! <span class="console-highlights">Chimera</span> reveals the top three cards of the Villain Deck.`);

    return new Promise((resolve) => {
        // Reveal top 3 cards (using pop since top is last in array)
        const revealedCards = [];
        for (let i = 0; i < 3 && villainDeck.length > 0; i++) {
            revealedCards.unshift(villainDeck.pop()); // pop removes from end, unshift adds to front
        }

        // Log revealed cards
        if (revealedCards.length === 0) {
            onscreenConsole.log('The Villain deck is empty - no cards can be revealed.');
            resolve();
            return;
        }

        onscreenConsole.log('Revealed from Villain deck:');
        revealedCards.forEach(card => {
            onscreenConsole.log(`- <span class="console-highlights">${card.name}</span>`);
        });

        // Filter out bystanders
        const bystanders = revealedCards.filter(card => card.type === 'Bystander');
        const nonBystanders = revealedCards.filter(card => card.type !== 'Bystander');

        // Capture bystanders with Chimera
        if (bystanders.length > 0) {
            const chimeraIndex = city.findIndex(card => card === chimera);
            bystanders.forEach(bystander => {
                // No need to remove from villain deck - we already popped them
                attachBystanderToVillain(chimeraIndex, bystander);
                onscreenConsole.log(`<span class="console-highlights">${bystander.name}</span> captured by <span class="console-highlights">Chimera</span>!`);
            });
        } else {
            onscreenConsole.log('No Bystanders were revealed.');
        }

if (nonBystanders.length === 1) {
nonBystanders[0].revealed = true;
}

        // Shuffle non-bystanders and put back on top
        if (nonBystanders.length > 0) {
            // Shuffle them
            const shuffled = [...nonBystanders].sort(() => Math.random() - 0.5);
            
            // Put back on top (end of array)
            villainDeck.push(...shuffled);
            onscreenConsole.log('Remaining cards shuffled back on top of the Villain deck.');
        } else {
            onscreenConsole.log('No cards to shuffle back onto the Villain deck.');
        }

        updateGameBoard();
        resolve();
    });
}

function blockbusterAmbush(blockbuster) {
    onscreenConsole.log(`Ambush! <span class="console-highlights">Blockbuster</span> may capture a Bystander.`);
    const bankIndex = 3; // Bank is at city index 3
    const bankVillain = city[bankIndex];
    
    return new Promise((resolve) => {
        try {
            // Check if there's a villain in the bank
            if (bankVillain && bankVillain.type === 'Villain') {
                const isBlockbusterInBank = bankVillain === blockbuster;
                let totalCaptured = 0;
                
                // Handle bystander capture for bank villain
                if (bystanderDeck.length > 0) {
                    const bystander = bystanderDeck.pop();
                    attachBystanderToVillain(bankIndex, bystander);
                    onscreenConsole.log(`<span class="console-highlights">${bankVillain.name}</span> is in the Bank and captures <span class="console-highlights">${bystander.name}</span>.`);
                    totalCaptured++;
                }
                
                // Handle Blockbuster (if different from bank villain)
                if (!isBlockbusterInBank) {
                    const blockbusterIndex = city.findIndex(card => card === blockbuster);
                    if (blockbusterIndex !== -1 && bystanderDeck.length > 0) {
                        const bystander = bystanderDeck.pop();
                        attachBystanderToVillain(blockbusterIndex, bystander);
                        onscreenConsole.log(`<span class="console-highlights">Blockbuster</span> captures <span class="console-highlights">${bystander.name}</span>.`);
                        totalCaptured++;
                    }
                } else if (bystanderDeck.length > 0) {
                    // Special case: Blockbuster is in bank - capture second bystander
                    const secondBystander = bystanderDeck.pop();
                    attachBystanderToVillain(bankIndex, secondBystander);
                    onscreenConsole.log(`<span class="console-highlights">Blockbuster</span> is in the Bank and captures a second Bystander`);
                    totalCaptured++;
                }
                
                if (totalCaptured === 0) {
                    onscreenConsole.log('No Bystanders available to capture.');
                }
            } else {
                onscreenConsole.log('There is no Villain in the Bank. No Bystanders are captured.');
            }
            
            updateGameBoard();
            resolve();
        } catch (error) {
            onscreenConsole.log('Error - no Bystanders captured.');
            resolve(); // Still resolve to prevent game hang
        }
    });
}

function reignfireEscape() {
    return new Promise((resolve, reject) => {
        // Search for Reignfire in the escape pile
        const reignfireIndex = escapedVillainsDeck.findIndex(card => card.name === 'Reignfire');
        
        if (reignfireIndex !== -1) {
            // Splice Reignfire from the escape pile
            const reignfireCard = escapedVillainsDeck.splice(reignfireIndex, 1)[0];

            // Change the card's properties
            reignfireCard.name = 'Master Strike';
            reignfireCard.type = 'Master Strike';

            // Place it on top of the villain deck
            villainDeck.push(reignfireCard);

            onscreenConsole.log(`Escape! <span class="console-highlights">Reignfire</span> has transformed into a Master Strike.`);


            // Draw the top card of the villain deck
            drawVillainCard().then(() => {
                resolve(); // Resolve the promise after the card is drawn
            }).catch(error => {
                reject(error); // Reject the promise if drawing the card fails
            });
        } else {
            console.log('Reignfire was not found in the Escape Pile.');
            resolve(); // Resolve immediately if Reignfire is not found
        }
    });
}

function wildsideFight(wildside) {

    if (currentVillainLocation === 3 || currentVillainLocation === 4) {
        onscreenConsole.log(`Fight! You fought <span class="console-highlights">${wildside.name}</span> in the Sewers or Bank. KO two of your Heroes.`);
        chooseHeroesToKO();
    } else {
        onscreenConsole.log(`Fight! You fought <span class="console-highlights">${wildside.name}</span> outside of the Sewers or Bank. No Heroes are KO'd.`);
    }
}

// Global variable to track active popup state
let activePopupState = null;

function zeroFight() {
    return new Promise(async (resolve) => {
        // Create array with original indices from playerHand
        const zeroCardsInHand = playerHand
            .map((card, index) => ({ card, originalIndex: index }))
            .filter(item => item.card.cost === 0);

        // Handle cases with 0-3 zero-cost cards immediately
        if (zeroCardsInHand.length === 0) {
            onscreenConsole.log('You have no cards with a cost of 0.');
            updateGameBoard();
            resolve();
            return;
        }

        if (zeroCardsInHand.length <= 3) {
            // Sort by original index in descending order to avoid index shifting issues
            const cardsToRemove = zeroCardsInHand.sort((a, b) => b.originalIndex - a.originalIndex);
            
            for (const cardItem of cardsToRemove) {
                // Remove using the original index
                playerHand.splice(cardItem.originalIndex, 1);
                
                const { returned } = await checkDiscardForInvulnerability(cardItem.card);
                if (returned.length) {
                    playerHand.push(...returned);
                }
            }
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
        popupTitle.textContent = 'DISCARD';
        instructionsDiv.innerHTML = 'Select three cards that cost <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> to discard.';
        cardsList.innerHTML = '';
        koButton.style.display = 'inline-block';
        koButton.disabled = true;
        koButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedZeroCards = []; // Store card items with original indices
        let activeImage = null;

        // Update KO button state and text
        function updateKOButton() {
            const count = selectedZeroCards.length;
            koButton.disabled = count !== 3;
            koButton.textContent = count === 3 ? 'Confirm' : `Select ${3 - count} more cards`;
        }

        // Update instructions with selection status
        function updateInstructions() {
            const count = selectedZeroCards.length;
            if (count === 0) {
                instructionsDiv.textContent = 'Select three cards that cost <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> to discard.';
            } else {
                const names = selectedZeroCards.map(b => `<span class="console-highlights">${b.card.name}</span>`).join(', ');
                instructionsDiv.innerHTML = `Selected: ${names} (${count}/3)`;
            }
        }

        // Show/hide card image
        function updateZeroImage(card) {
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
        function toggleZeroSelection(cardItem, listItem) {
            const index = selectedZeroCards.findIndex(item => item.originalIndex === cardItem.originalIndex);
            
            if (index > -1) {
                // Deselect
                selectedZeroCards.splice(index, 1);
                listItem.classList.remove('selected');
                if (activeImage === cardItem.card.image) updateZeroImage(null);
            } else if (selectedZeroCards.length < 3) {
                // Select
                selectedZeroCards.push(cardItem);
                listItem.classList.add('selected');
                updateZeroImage(cardItem.card);
            }

            updateKOButton();
            updateInstructions();
        }

        // Sort the array (now it will sort by card but preserve originalIndex)
        genericCardSort(zeroCardsInHand, item => item.card);

        // Populate the list with zero-cost cards
        zeroCardsInHand.forEach(cardItem => {
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
            
            const teamIcon = createTeamIconHTML(cardItem.card.team);
            const class1Icon = createClassIconHTML(cardItem.card.class1);
            const class2Icon = createClassIconHTML(cardItem.card.class2);
            const class3Icon = createClassIconHTML(cardItem.card.class3);
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${cardItem.card.name}</span>`;

            li.setAttribute('data-card-id', cardItem.originalIndex);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = cardItem.card.image;
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

            li.onclick = () => toggleZeroSelection(cardItem, li);
            cardsList.appendChild(li);
        });

        // Handle confirmation
        koButton.onclick = async () => {
            if (selectedZeroCards.length === 3) {
                // Sort by original index in descending order to avoid index shifting issues
                const cardsToRemove = selectedZeroCards.sort((a, b) => b.originalIndex - a.originalIndex);
                
                for (const cardItem of cardsToRemove) {
                    // Remove using the original index
                    playerHand.splice(cardItem.originalIndex, 1);
                    
                    const { returned } = await checkDiscardForInvulnerability(cardItem.card);
                    if (returned.length) {
                        playerHand.push(...returned);
                    }
                }
                
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


function tombstoneEscape() {
    onscreenConsole.log(`<span class="console-highlights">Tombstone</span> has escaped!`);

const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.class1 === 'Strength').length === 0) {
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`);
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
    cardImage.src = 'Visual Assets/Villains/DarkCity_StreetsOfNewYork_Tombstone.webp';
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

function hammerheadFight() {
    onscreenConsole.log(`Fight! <span class="console-highlights">Hammerhead</span> forces you to KO one of your Heroes with a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon.`);
    return new Promise((resolve, reject) => {
        // Combine heroes from the player's hand and cards played this turn
        const combinedCards = [
            ...playerHand.filter(card => card.recruitIcon === true).map(card => ({ card, source: 'hand' })),
            ...cardsPlayedThisTurn.filter(card => 
                card.isCopied !== true && 
                card.sidekickToDestroy !== true &&
                card.recruitIcon === true
            ).map(card => ({ card, source: 'played' }))
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
        instructionsDiv.innerHTML = 'Select a Hero with a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons"> icon to KO.';
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
                instructionsDiv.innerHTML = 'Select a Hero with a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons"> icon to KO.';
            } else {
                instructionsDiv.innerHTML= `Selected: <span class="console-highlights">${selectedCard.card.card.name}</span> will be KO'd.`;
            }
        }

        // Show/hide hero image
        function updateHeroImage(card) {
            if (card) {
                heroImage.src = card.card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection
        function toggleCardSelection(card, cardIndex, listItem) {
            if (selectedCard && selectedCard.index === cardIndex) {
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
                    index: cardIndex
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

            const { card } = selectedCard;
            onscreenConsole.log(`<span class="console-highlights">${card.card.name}</span> has been KO'd.`);
            koBonuses();
            
            // Remove the card from the correct array (hand or played)
            if (card.source === 'hand') {
                const handIndex = playerHand.findIndex(handCard => handCard === card.card);
                if (handIndex !== -1) {
                    playerHand.splice(handIndex, 1);
                }
} else {
    // Directly mark the card to be destroyed instead of splicing
    card.card.markedToDestroy = true;
}
            
            // Add the card to the KO pile
            koPile.push(card.card);
            
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

        // Sort the combined cards
        genericCardSort(combinedCards, 'card');

        // Populate the list with the heroes from the player's hand and played cards
        combinedCards.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
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
            
            const teamIcon = createTeamIconHTML(card.card.team);
            const class1Icon = createClassIconHTML(card.card.class1);
            const class2Icon = createClassIconHTML(card.card.class2);
            const class3Icon = createClassIconHTML(card.card.class3);
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.card.name}</span>`;

            li.setAttribute('data-card-id', index);

            li.onmouseover = () => {
                if (!activeImage) { // Only change if no selection is locked
                    heroImage.src = card.card.image;
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

function jigsawAmbush() {
    onscreenConsole.log(`Ambush! <span class="console-highlights">Jigsaw</span> forces you to discard and draw.`);
    
    return new Promise(async (resolve) => {
        // Get all cards in hand with their original indices
        const availableCards = playerHand
            .filter(card => card) // Filter out any undefined/null cards
            .map((card, originalIndex) => ({ 
                card, 
                originalIndex,
                uniqueId: `${card.id}-${originalIndex}` 
            }));

        // Handle cases where there are 3 or fewer cards available
        if (availableCards.length === 0) {
            onscreenConsole.log("No cards in hand to discard.");
            resolve();
            return;
        }

        if (availableCards.length <= 3) {
            // Discard all cards if 3 or fewer
            const returnedCards = [];
            // Process in reverse order to avoid index shifting issues
            const cardsToProcess = [...availableCards].reverse();
            
            for (const cardObj of cardsToProcess) {
                if (cardObj.originalIndex < playerHand.length && playerHand[cardObj.originalIndex] === cardObj.card) {
                    playerHand.splice(cardObj.originalIndex, 1);
                    const { returned } = await checkDiscardForInvulnerability(cardObj.card);
                    returnedCards.push(...returned);
                } else {
                    // Fallback: find card by ID if indices don't match
                    const fallbackIndex = playerHand.findIndex(c => c.id === cardObj.card.id);
                    if (fallbackIndex !== -1) {
                        playerHand.splice(fallbackIndex, 1);
                        const { returned } = await checkDiscardForInvulnerability(cardObj.card);
                        returnedCards.push(...returned);
                    }
                }
            }
            
            // Add back any invulnerable cards
            if (returnedCards.length > 0) {
                playerHand.push(...returnedCards);
            }
            
            updateGameBoard();
            onscreenConsole.log(`Discarded ${availableCards.length} card${availableCards.length !== 1 ? 's' : ''}.`);
            extraDraw();
            extraDraw();
            resolve();
            return;
        }

        // Setup UI for selection when more than 3 cards available
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
        popupTitle.textContent = 'Ambush!';
        instructionsDiv.textContent = 'Select three cards to discard.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Discard';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCards = [];
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCards.length !== 3;
        }

        function updateInstructions() {
            if (selectedCards.length < 3) {
                instructionsDiv.textContent = `Select ${3 - selectedCards.length} more card${selectedCards.length === 2 ? '' : 's'} to discard.`;
            } else {
                const namesList = selectedCards.map(cardObj => 
                    `<span class="console-highlights">${cardObj.card.name}</span>`
                ).join(', ');
                instructionsDiv.innerHTML = `Selected: ${namesList} will be discarded.`;
            }
        }

        function updateCardImage(cardObj) {
            if (cardObj) {
                heroImage.src = cardObj.card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = cardObj.card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        function toggleCardSelection(cardObj, listItem) {
            const index = selectedCards.findIndex(c => c.uniqueId === cardObj.uniqueId);
            
            if (index > -1) {
                selectedCards.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedCards.length >= 3) {
                    const firstSelected = document.querySelector(`[data-card-id="${selectedCards[0].uniqueId}"]`);
                    if (firstSelected) firstSelected.classList.remove('selected');
                    selectedCards.shift();
                }
                selectedCards.push(cardObj);
                listItem.classList.add('selected');
            }

            updateCardImage(selectedCards[selectedCards.length - 1] || null);
            updateConfirmButton();
            updateInstructions();
        }

        // Sort the available cards
        genericCardSort(availableCards, 'card');

        // Populate the list with available cards
        availableCards.forEach(cardObj => {
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
            
            const teamIcon = createTeamIconHTML(cardObj.card.team);
            const class1Icon = createClassIconHTML(cardObj.card.class1);
            const class2Icon = createClassIconHTML(cardObj.card.class2);
            const class3Icon = createClassIconHTML(cardObj.card.class3);
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${cardObj.card.name}</span>`;

            li.setAttribute('data-card-id', cardObj.uniqueId);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = cardObj.card.image;
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

            li.onclick = () => toggleCardSelection(cardObj, li);
            cardsList.appendChild(li);
        });

        confirmButton.onclick = async () => {
            if (selectedCards.length === 3) {
                const returnedCards = [];
                
                // Process in reverse order to avoid index shifting issues
                const sortedSelectedCards = [...selectedCards].sort((a, b) => b.originalIndex - a.originalIndex);
                
                for (const cardObj of sortedSelectedCards) {
                    // Try using original index first
                    if (cardObj.originalIndex < playerHand.length && playerHand[cardObj.originalIndex] === cardObj.card) {
                        playerHand.splice(cardObj.originalIndex, 1);
                        const { returned } = await checkDiscardForInvulnerability(cardObj.card);
                        returnedCards.push(...returned);
                    } else {
                        // Fallback: find card by ID if indices don't match
                        const fallbackIndex = playerHand.findIndex(c => c.id === cardObj.card.id);
                        if (fallbackIndex !== -1) {
                            playerHand.splice(fallbackIndex, 1);
                            const { returned } = await checkDiscardForInvulnerability(cardObj.card);
                            returnedCards.push(...returned);
                        }
                    }
                }
                
                // Add back any invulnerable cards
                if (returnedCards.length > 0) {
                    playerHand.push(...returnedCards);
                }
                
                closePopup();
                updateGameBoard();
                extraDraw();
                extraDraw();
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

function bullseyeFight() {
    return new Promise((resolve) => {
        // Combine cards from hand and played cards with source tracking
        const combinedCards = [
            ...playerHand.map(card => ({ card, source: 'hand' })),
            ...cardsPlayedThisTurn.filter(card => 
                !card.isCopied && 
                !card.sidekickToDestroy
            ).map(card => ({ card, source: 'played' }))
        ];

        // Filter cards with recruit and attack icons
        const recruitCards = combinedCards.filter(item => item.card.recruitIcon === true);
        const attackCards = combinedCards.filter(item => item.card.attackIcon === true);

        // Check if we have at least one card in at least one list
        if (recruitCards.length === 0 && attackCards.length === 0) {
            onscreenConsole.log("No Heroes with <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'> or <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> icons available to KO.");
            resolve(false);
            return;
        }

        // Get popup elements
        const popup = document.getElementById('card-ko-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const recruitList = document.getElementById('discard-pile-cards');
        const attackList = document.getElementById('hand-cards');
        const hoverText = document.getElementById('card-ko-card-popupHoverText');
        const KOImage = document.getElementById('card-ko-popup-image');
        const koButton = document.getElementById('close-ko-button');
        const popupTitle = document.getElementById('card-ko-popup-h2');
        const instructionsDiv = document.getElementById('card-ko-instructions');
        const noThanks = document.getElementById('no-thanks-button');
        const closeX = document.getElementById('card-ko-popup-close');
        
        // Initialize UI
        popupTitle.innerHTML = `KO one Hero with a <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'> icon and one with a <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'> icon.`;
        recruitList.innerHTML = '';
        attackList.innerHTML = '';
        recruitList.previousElementSibling.textContent = 'Recruit Heroes';
        attackList.previousElementSibling.textContent = 'Attack Heroes';
        koButton.style.display = 'inline-block';
        koButton.disabled = true;
        koButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';
        hoverText.style.display = 'block';
        KOImage.style.display = 'none';
        noThanks.style.display = 'none';
        closeX.style.display = 'none';
        instructionsDiv.style.display = 'block';

        let selectedRecruitCard = null;
        let selectedAttackCard = null;
        let activeImage = null;

        // Update instructions based on current selection and available cards
        function updateInstructions() {
            const hasRecruit = recruitCards.length > 0;
            const hasAttack = attackCards.length > 0;
            
            if (hasRecruit && hasAttack) {
                if (selectedRecruitCard && selectedAttackCard) {
                    instructionsDiv.innerHTML = `
                        Ready to KO: 
                        <span class="console-highlights">${selectedRecruitCard.card.name}</span> (Recruit) and 
                        <span class="console-highlights">${selectedAttackCard.card.name}</span> (Attack)
                    `;
                } else if (selectedRecruitCard) {
                    instructionsDiv.innerHTML = `
                        Selected: <span class="console-highlights">${selectedRecruitCard.card.name}</span> (Recruit)<br>
                        Still need to select an Attack Hero
                    `;
                } else if (selectedAttackCard) {
                    instructionsDiv.innerHTML = `
                        Selected: <span class="console-highlights">${selectedAttackCard.card.name}</span> (Attack)<br>
                        Still need to select a Recruit Hero
                    `;
                } else {
                    instructionsDiv.innerHTML = `
                        KO one Hero with <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'> 
                        and one with <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'>
                    `;
                }
            } else if (hasRecruit) {
                instructionsDiv.innerHTML = selectedRecruitCard ? 
                    `Selected: <span class="console-highlights">${selectedRecruitCard.card.name}</span> (Recruit)` :
                    `KO one Hero with <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'>`;
            } else if (hasAttack) {
                instructionsDiv.innerHTML = selectedAttackCard ? 
                    `Selected: <span class="console-highlights">${selectedAttackCard.card.name}</span> (Attack)` :
                    `KO one Hero with <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'>`;
            }
        }

        // Update KO button state and text
        function updateKoButton() {
            const hasRecruit = recruitCards.length > 0;
            const hasAttack = attackCards.length > 0;
            
            if (hasRecruit && hasAttack) {
                // Need one of each
                koButton.disabled = !(selectedRecruitCard && selectedAttackCard);
                koButton.textContent = (selectedRecruitCard && selectedAttackCard) ? 
                    'Confirm KO' : 
                    `Select ${!selectedRecruitCard ? 'Recruit' : 'Attack'} Hero`;
            } else {
                // Only need one from whichever list has cards
                koButton.disabled = !(selectedRecruitCard || selectedAttackCard);
                koButton.textContent = (selectedRecruitCard || selectedAttackCard) ? 
                    'Confirm KO' : 
                    'Select a Hero';
            }
        }

        // Show/hide hero image
        function updateHeroImage(cardItem) {
            if (cardItem) {
                KOImage.src = cardItem.card.image;
                KOImage.style.display = 'block';
                hoverText.style.display = 'none';
                activeImage = cardItem.card.image;
            } else {
                KOImage.src = '';
                KOImage.style.display = 'none';
                hoverText.style.display = 'block';
                activeImage = null;
            }
        }

        // Toggle card selection for recruit list
        function toggleRecruitSelection(cardItem, listItem) {
            if (selectedRecruitCard === cardItem) {
                // Deselect if same card clicked
                selectedRecruitCard = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedRecruitCard) {
                    const prevListItem = recruitList.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                
                // Select new card
                selectedRecruitCard = cardItem;
                listItem.classList.add('selected');
                updateHeroImage(cardItem);
                
                // If this card was selected in attack list, deselect it there
                if (selectedAttackCard === cardItem) {
                    selectedAttackCard = null;
                    const attackListItem = attackList.querySelector('li.selected');
                    if (attackListItem) attackListItem.classList.remove('selected');
                }
            }

            updateKoButton();
            updateInstructions();
        }

        // Toggle card selection for attack list
        function toggleAttackSelection(cardItem, listItem) {
            if (selectedAttackCard === cardItem) {
                // Deselect if same card clicked
                selectedAttackCard = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                // Clear previous selection if any
                if (selectedAttackCard) {
                    const prevListItem = attackList.querySelector('li.selected');
                    if (prevListItem) prevListItem.classList.remove('selected');
                }
                
                // Select new card
                selectedAttackCard = cardItem;
                listItem.classList.add('selected');
                updateHeroImage(cardItem);
                
                // If this card was selected in recruit list, deselect it there
                if (selectedRecruitCard === cardItem) {
                    selectedRecruitCard = null;
                    const recruitListItem = recruitList.querySelector('li.selected');
                    if (recruitListItem) recruitListItem.classList.remove('selected');
                }
            }

            updateKoButton();
            updateInstructions();
        }

        // Sort the cards
        genericCardSort(recruitCards, 'card');
        genericCardSort(attackCards, 'card');

        // Populate recruit list
        recruitCards.forEach(cardItem => {
            const li = document.createElement('li');
            const location = cardItem.source === 'hand' ? '(Hand)' : '(Played Cards)';
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
            
            const teamIcon = createTeamIconHTML(cardItem.card.team);
            const class1Icon = createClassIconHTML(cardItem.card.class1);
            const class2Icon = createClassIconHTML(cardItem.card.class2);
            const class3Icon = createClassIconHTML(cardItem.card.class3);
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${cardItem.card.name} ${location}</span>`;

            li.setAttribute('data-card-id', cardItem.card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    KOImage.src = cardItem.card.image;
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

            li.onclick = () => toggleRecruitSelection(cardItem, li);
            recruitList.appendChild(li);
        });

        // Populate attack list
        attackCards.forEach(cardItem => {
            const li = document.createElement('li');
            const location = cardItem.source === 'hand' ? '(Hand)' : '(Played Cards)';
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
            
            const teamIcon = createTeamIconHTML(cardItem.card.team);
            const class1Icon = createClassIconHTML(cardItem.card.class1);
            const class2Icon = createClassIconHTML(cardItem.card.class2);
            const class3Icon = createClassIconHTML(cardItem.card.class3);
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${cardItem.card.name} ${location}</span>`;

            li.setAttribute('data-card-id', cardItem.card.id);

            li.onmouseover = () => {
                if (!activeImage) {
                    KOImage.src = cardItem.card.image;
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

            li.onclick = () => toggleAttackSelection(cardItem, li);
            attackList.appendChild(li);
        });

        // Handle confirmation
        koButton.onclick = () => {
            const koedCards = [];
            
            if (selectedRecruitCard) {
                koedCards.push(selectedRecruitCard.card);
                // Remove from original location using source tracking
                if (selectedRecruitCard.source === 'hand') {
                    const index = playerHand.findIndex(c => c.id === selectedRecruitCard.card.id);
                    if (index !== -1) {
                        playerHand.splice(index, 1);
                    }
                } else {
                    selectedRecruitCard.card.markedToDestroy = true;
                }
                koPile.push(selectedRecruitCard.card);
                onscreenConsole.log(`<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'> Choice: <span class="console-highlights">${selectedRecruitCard.card.name}</span> has been KO'd.`);
                koBonuses();
            }
            
            if (selectedAttackCard) {
                koedCards.push(selectedAttackCard.card);
                // Remove from original location using source tracking
                if (selectedAttackCard.source === 'hand') {
                    const index = playerHand.findIndex(c => c.id === selectedAttackCard.card.id);
                    if (index !== -1) {
                        playerHand.splice(index, 1);
                    }
                } else {
                    selectedAttackCard.card.markedToDestroy = true;
                }
                koPile.push(selectedAttackCard.card);
                onscreenConsole.log(`<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> Choice: <span class="console-highlights">${selectedAttackCard.card.name}</span> has been KO'd.`);
                koBonuses();
            }

            closePopup();
            updateGameBoard();
            resolve(koedCards.length > 0);
        };

        function closePopup() {
            // Reset UI
            popupTitle.innerHTML = "Do you wish to KO a card from your Discard Pile or Hand to rescue a Bystander?";
            recruitList.previousElementSibling.textContent = 'Discard Pile';
            attackList.previousElementSibling.textContent = 'Hand';
            koButton.style.display = 'none';
            koButton.disabled = true;
            KOImage.src = '';
            KOImage.style.display = 'none';
            hoverText.style.display = 'block';
            hoverText.textContent = "Hover over a card to see its image";
            activeImage = null;
            noThanks.style.display = 'block';
            closeX.style.display = 'block';
            instructionsDiv.style.display = 'none';
            instructionsDiv.innerHTML = '';

            // Hide popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
}

async function lilithEscape() {
onscreenConsole.log(`<span class="console-highlights">Lilith, Daughter of Dracula</span> has escaped!`);
await woundAvoidance();
if (hasWoundAvoidance) {
onscreenConsole.log(`You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`);
hasWoundAvoidance = false;
return; 
}
lilithWound();
}

function lilithWound() {
if (victoryPile.filter(item => item.name === 'Dracula').length === 0) {
onscreenConsole.log(`You do not have <span class="console-highlights">Dracula</span> in your Victory Pile.`)
drawWound();
} else {
onscreenConsole.log(`You have <span class="console-highlights">Dracula</span> in your Victory Pile and have escaped gaining a Wound.`);
return;
}
}

async function blackheartAmbush() {
onscreenConsole.log(`Ambush! <span class="console-highlights">Blackheart</span> may force you to gain a Wound!`);
await blackheartFunctions();
}

async function blackheartFight() {
onscreenConsole.log(`<span class="console-highlights">Blackheart</span> - fight effect!`);
await blackheartFunctions();
}

async function blackheartEscape() {
onscreenConsole.log(`<span class="console-highlights">Blackheart</span> has escaped!`);
await blackheartFunctions();
}


async function blackheartFunctions() {
		await woundAvoidance();
		if (hasWoundAvoidance) {
onscreenConsole.log(`You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`);
hasWoundAvoidance = false;
		return; 
		}

const cardsYouHave = [
    ...playerHand, // Include all cards in hand (unchanged)
    ...cardsPlayedThisTurn.filter(card => 
        !card.isCopied &&  // Exclude copied cards
        !card.sidekickToDestroy // Exclude sidekicks marked for destruction
    )
];

if (cardsYouHave.filter(item => item.team === 'Marvel Knights').length === 0) {
console.log('You are unable to reveal a Marvel Knights hero.')
onscreenConsole.log(`You are unable to reveal a <img src='Visual Assets/Icons/Marvel Knights.svg' alt='Marvel Knights Icon' class='console-card-icons'> Hero.`)
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
    cardImage.src = 'Visual Assets/Villains/DarkCity_Underworld_Blackheart.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero and have escaped gaining a Wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
  }, 10); // 10ms delay
}
}

function draculaAmbush(draculaCard) {
    onscreenConsole.log(`Ambush! <span class="console-highlights">Dracula</span> captures the top card of the Hero deck.`);

    if (heroDeck.length === 0) {
        onscreenConsole.log(`The Hero deck is empty and no card is captured.`);
        return; // Add return here
    }

    const hero = heroDeck.pop();
    const draculaIndex = city.findIndex(c => c === draculaCard);
 
    // Check if Dracula is in the city
    if (draculaIndex === -1) { // Correct check
        onscreenConsole.log('Cannot locate <span class="console-highlights">Dracula</span> in the city.');
        return;
    }

    const dracula = city[draculaIndex]; // Get the actual card object

    // Create a timestamp-based code for both the hero and Dracula
    const captureCode = Date.now(); // This timestamp is unique for each capture event

  

    // Assign the captureCode to both the hero and the villain
    dracula.captureCode = captureCode;
    hero.captureCode = captureCode;

      console.log("CAPTURING - Dracula code:", captureCode, "Hero:", hero.name);

    // Increase the villain's attack by the hero's cost
    dracula.originalAttack = dracula.attack;
    dracula.attack += hero.cost;
    dracula.overlayTextAttack = dracula.attack;

    // Move the hero to the Skrull deck (or equivalent storage) and tag it with the captureCode
    capturedCardsDeck.push({ ...hero, captured: captureCode }); // Store the hero with its captureCode

    // Attach an overlay to the villain
    dracula.capturedOverlayText = `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">CAPTURED</span><img src="${hero.image}" alt="${hero.name}" class="captured-hero-image-overlay">`;

    onscreenConsole.log(`<span class="console-highlights">Dracula</span> has captured <span class="console-highlights">${hero.name}</span>. This Villain now has ${dracula.attack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Fight this Villain to gain the captured Hero.`);

    // Update the game board to reflect the changes
    updateGameBoard();
}

function draculaFight(villainCard) {
    // FIRST - Find the ACTUAL Dracula instance in the city
    const actualDracula = city.find(card => 
        card.id === villainCard.id ||  // Match by ID if available
        card.name === villainCard.name // Or fallback to name match
    ) || villainCard; // Ultimate fallback
    
    // NOW use the actual instance's captureCode
    const heroIndex = capturedCardsDeck.findIndex(hero => 
        hero.captured === actualDracula.captureCode
    );

    console.log("DEBUG - Actual Dracula:", {
        id: actualDracula.id,
        name: actualDracula.name,
        code: actualDracula.captureCode
    });

    if (heroIndex === -1) {
        onscreenConsole.log(`Error. ${actualDracula.name} has no captured hero.`);
        return;
    }


    const hero = capturedCardsDeck.splice(heroIndex, 1)[0];
    if (!hero) {
        onscreenConsole.log('Error. Captured Hero not found.');
        return;
    }


    delete hero.captured;
    playerDiscardPile.push(hero);

    onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been rescued from <span class="console-highlights">Dracula</span> and added to your discard pile.`);
    updateGameBoard();
}

function draculaEscape(escapedVillain) {
    // 1. First find the ACTUAL villain instance in city (like we did for fight)
    const actualVillain = city.find(v => 
        v.persistentId === escapedVillain.persistentId || // Best case
        v.captureCode === escapedVillain.captureCode      // Fallback
    ) || escapedVillain;

    // 2. Get the capture code from the actual instance
    const captureCode = actualVillain.captureCode;

    onscreenConsole.log(`<span class="console-highlights">Dracula</span> has escaped with his captured Hero!`);

    // 3. Find hero using the PROPER capture code
    const heroIndex = capturedCardsDeck.findIndex(hero => hero.captured === captureCode);

    // 4. Clear overlays and reset - modify the ACTUAL villain
    actualVillain.overlayText = '';
    actualVillain.overlayTextAttack = '';
    actualVillain.attack = actualVillain.originalAttack || 0;
    delete actualVillain.captureCode;

    if (heroIndex === -1) {
        console.error("Escape Failed - Villain:", {
            name: actualVillain.name,
            id: actualVillain.persistentId,
            code: captureCode
        });
        onscreenConsole.log('Error. No hero was captured by this Dracula.');
        return;
    }

    const hero = capturedCardsDeck.splice(heroIndex, 1)[0];
    if (!hero) {
        onscreenConsole.log('Error. Hero data corrupted during escape.');
        return;
    }

    // 5. Clean up hero data
    delete hero.captured;
    escapedVillainsDeck.push(hero);

    // 6. If using central registry (from previous fixes)
    if (window.captureRegistry?.[actualVillain.persistentId]) {
        delete window.captureRegistry[actualVillain.persistentId];
    }

    updateGameBoard();
}

function azazelFight() {
    onscreenConsole.log(`<span class="console-highlights">Azazel</span> - fight effect!`);
    
    // SORT FIRST - before any card processing
    genericCardSort(playerHand);
    
    return new Promise((resolve) => {
        // Check if there are any cards to select
        if (playerHand.length === 0) {
            onscreenConsole.log("No cards in Hand to gain Teleport.");
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
        popupTitle.textContent = 'Fight Effect!';
        instructionsDiv.innerHTML = 'Select a card to gain Teleport this turn.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        closeButton.style.display = 'none';
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
                instructionsDiv.innerHTML = 'Select a card to gain Teleport this turn.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will gain Teleport this turn.`;
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

        // Populate the list with cards in the player's hand (now sorted)
        playerHand.forEach((card, index) => {
            console.log('Adding card to selection list:', card);
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
                selectedCard.keyword3 = 'Teleport';
                selectedCard.temporaryTeleport = true;
                onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has gained Teleport for this turn.`);
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

// Dark City Mastermind Abilities

function apocalypseStrike() {
    const cardsAboveOneCost = [...playerHand.filter(card => card.cost > 1)];
    if (cardsAboveOneCost.length === 0) {
        onscreenConsole.log(`No cards need to be returned to your deck.`);
        return;
    }

    for (const card of cardsAboveOneCost) {
        const index = playerHand.indexOf(card);
        if (index > -1) {
            playerHand.splice(index, 1);
            playerDeck.push(card);
	onscreenConsole.log(`<span class="console-highlights">${card.name}</span> costs more than 1 and has been returned to the top of your deck.`);
        }
    }
}


async function kingpinStrike() {
    const cardsYouHave = [
        ...playerHand,
        ...cardsPlayedThisTurn.filter(card => 
            !card.isCopied && 
            !card.sidekickToDestroy
        )
    ];

    const hasMarvelKnights = cardsYouHave.some(card => card.team === 'Marvel Knights');

    if (!hasMarvelKnights) {
        console.log('You are unable to reveal a Marvel Knights hero.');
        onscreenConsole.log(`You are unable to reveal a <img src='Visual Assets/Icons/Marvel Knights.svg' alt='Marvel Knights Icon' class='console-card-icons'> Hero.`);
        
        // Process discard with invulnerability check
        const returnedCards = [];
        while (playerHand.length > 0) {
            const card = playerHand[0];
            playerHand.splice(0, 1);
            const { returned } = await checkDiscardForInvulnerability(card);
            returnedCards.push(...returned);
        }
        
        // Add back any invulnerable cards
        if (returnedCards.length > 0) {
            playerHand.push(...returnedCards);
        }
        
        // Draw 5 cards
        for (let i = 0; i < 5; i++) {
            await extraDraw();
        }

	hideRevealedCards();
        
        updateGameBoard();
    } else {
        return new Promise((resolve) => {
            setTimeout(() => {  
                const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                    "DO YOU WISH TO REVEAL A CARD?",
                    "Yes",
                    "No"
                );

                document.getElementById('heroAbilityHoverText').style.display = 'none';
                const cardImage = document.getElementById('hero-ability-may-card');
                cardImage.src = 'Visual Assets/Masterminds/DarkCity_Kingpin.webp';
                cardImage.style.display = 'block';

                const cleanup = () => {
                    cardImage.src = '';
                    cardImage.style.display = 'none';
                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                    hideHeroAbilityMayPopup();
                    updateGameBoard();
                    resolve();
                };

                confirmButton.onclick = async () => {
                    onscreenConsole.log(`You revealed a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero and escaped discarding your hand!`);
                    cleanup();
                };

                denyButton.onclick = async () => {
                    onscreenConsole.log(`You chose not to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero.`);
                    
                    // Process discard with invulnerability check
                    const returnedCards = [];
                    while (playerHand.length > 0) {
                        const card = playerHand[0];
                        playerHand.splice(0, 1);
                        const { returned } = await checkDiscardForInvulnerability(card);
                        returnedCards.push(...returned);
                    }
                    
                    // Add back any invulnerable cards
                    if (returnedCards.length > 0) {
                        playerHand.push(...returnedCards);
                    }
                    
                    // Draw 5 cards
                    for (let i = 0; i < 5; i++) {
                        await extraDraw();
                    }

			hideRevealedCards();
                    
                    cleanup();
                };
            }, 10);
        });
    }
}



async function mephistoStrike() {

await woundAvoidance();
		if (hasWoundAvoidance) {
onscreenConsole.log(`You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`);
hasWoundAvoidance = false;
		return; 
		}

const cardsYouHave = [
    ...playerHand, // Include all cards in hand (unchanged)
    ...cardsPlayedThisTurn.filter(card => 
        !card.isCopied &&  // Exclude copied cards
        !card.sidekickToDestroy // Exclude sidekicks marked for destruction
    )
];

if (cardsYouHave.filter(item => item.team === 'Marvel Knights').length === 0) {
console.log('You are unable to reveal a Marvel Knights hero.')
onscreenConsole.log(`You are unable to reveal a <img src='Visual Assets/Icons/Marvel Knights.svg' alt='Marvel Knights Icon' class='console-card-icons'> Hero.`)
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
    cardImage.src = 'Visual Assets/Masterminds/DarkCity_Mephisto.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero and have escaped gaining a Wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero.`);
drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
  }, 10); // 10ms delay
}
}


async function mrSinisterStrike() {
    // 1. Take top card from bystander deck and attach to mastermind
    const bystanderCard = bystanderDeck.pop();
    if (bystanderCard) {
        attachBystanderToMastermind(bystanderCard);
    } else {
        onscreenConsole.log("No Bystanders left to capture!");
    }

    // 2. Check if player has exactly 6 cards
    if (playerHand.length !== 6) {
        onscreenConsole.log(`You do not have 6 cards. <span class="console-highlights">Mr. Sinister</span><span class="bold-spans">'s</span> Master Strike ends here.`);
        return;
    }

    // 3. Check for Covert cards
    const cardsYouHave = [
        ...playerHand,
        ...cardsPlayedThisTurn.filter(card => 
            !card.isCopied && !card.sidekickToDestroy
        )
    ];

    const hasCovert = cardsYouHave.some(card => 
        card.class1 === 'Covert' || card.class2 === 'Covert'
    );

    if (hasCovert) {
        // Show reveal popup
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            "DO YOU WISH TO REVEAL A CARD?",
            "Yes",
            "No"
        );

        const cardImage = document.getElementById('hero-ability-may-card');
        const cardText = document.getElementById('heroAbilityHoverText');
        cardImage.src = 'Visual Assets/Masterminds/DarkCity_MrSinister.webp';
        cardImage.style.display = 'block';
        cardText.style.display = 'none';

        return new Promise((resolve) => {
            confirmButton.onclick = () => {
                onscreenConsole.log(`You revealed a <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero. <span class="console-highlights">Mr. Sinister</span><span class="bold-spans">'s</span> Master Strike ends here.`);
                hideHeroAbilityMayPopup();
                resolve();
            };

            denyButton.onclick = async () => {
                hideHeroAbilityMayPopup();
                onscreenConsole.log(`You chose not to reveal a <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero.`);
                await mrSinisterProcessDiscardPhase();
                resolve();
            };
        });
    } else {
        // No Covert cards - proceed to discard phase
        onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero.`);
        await mrSinisterProcessDiscardPhase();
    }
}

async function mrSinisterProcessDiscardPhase() {
    const mastermind = getSelectedMastermind();
    const bystanderCount = mastermind.bystanders.length;
    
    // SORT FIRST - before any card processing
    genericCardSort(playerHand);
    
    const cardsToDiscard = Math.min(bystanderCount, playerHand.length);

    // If discarding all cards or only 1 option, auto-process
    if (cardsToDiscard === playerHand.length || playerHand.length === 1) {
        onscreenConsole.log(`<span class="console-highlights">Mr. Sinister</span> has ${bystanderCount} captured Bystander${bystanderCount !== 1 ? 's' : ''} forcing you to discard ${cardsToDiscard} card${cardsToDiscard !== 1 ? 's' : ''}.`);
        
        while (playerHand.length > 0) {
            const card = playerHand[0];
            playerHand.splice(0, 1);
            
            const { returned } = await checkDiscardForInvulnerability(card);
            if (returned.length) {
                playerHand.push(...returned);
            }
        }
        return;
    }

    // Setup card selection popup with image display
    const popup = document.getElementById('card-choice-one-location-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const cardsList = document.getElementById('cards-to-choose-from');
    const confirmButton = document.getElementById('card-choice-confirm-button');
    const cancelButton = document.getElementById('close-choice-button');
    const popupTitle = popup.querySelector('h2');
    const instructionsDiv = document.getElementById('context');
    const heroImage = document.getElementById('hero-one-location-image');
    const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

    // Initialize UI
    popupTitle.textContent = 'Master Strike';
    instructionsDiv.innerHTML = `<span class="console-highlights">Mr. Sinister</span> has ${bystanderCount} captured Bystander${bystanderCount !== 1 ? 's' : ''}. Select ${cardsToDiscard} card${cardsToDiscard !== 1 ? 's' : ''} to discard.`;
    cardsList.innerHTML = '';
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;
    confirmButton.textContent = `Confirm`;
    cancelButton.style.display = 'none';
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';
    heroImage.style.display = 'none';
    oneChoiceHoverText.style.display = 'block';

    let selectedCards = [];
    let activeImage = null;
    const cardElements = [];

    function updateConfirmButton() {
        confirmButton.disabled = selectedCards.length !== cardsToDiscard;
    }

    function updateInstructions() {
        if (selectedCards.length < cardsToDiscard) {
            instructionsDiv.textContent = `Select ${cardsToDiscard - selectedCards.length} more card${selectedCards.length === cardsToDiscard - 1 ? '' : 's'} to discard.`;
        } else {
            const namesList = selectedCards.map(card => 
                `<span class="console-highlights">${card.name}</span>`
            ).join(', ');
            instructionsDiv.innerHTML = `Selected: ${namesList} will be discarded.`;
        }
    }

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

    // Handle card selection with automatic oldest deselection
    function handleCardClick(card, index) {
        const li = cardElements[index];
        const cardId = card.id; // Use card.id instead of index-based ID
        
        if (selectedCards.some(c => c.id === cardId)) {
            // Card is already selected - deselect it
            selectedCards = selectedCards.filter(c => c.id !== cardId);
            li.classList.remove('selected');
        } else {
            if (selectedCards.length < cardsToDiscard) {
                // Can select without replacing
                selectedCards.push(card);
                li.classList.add('selected');
            } else {
                // Need to replace oldest selection
                const oldestCard = selectedCards.shift(); // Remove oldest
                const oldestLi = cardElements.find(li => 
                    li.getAttribute('data-card-id') === oldestCard.id
                );
                if (oldestLi) {
                    oldestLi.classList.remove('selected');
                }
                
                // Add new selection
                selectedCards.push(card);
                li.classList.add('selected');
            }
        }
        
        // Update the displayed image to show the last selected card
        if (selectedCards.length > 0) {
            updateHeroImage(selectedCards[selectedCards.length - 1]);
        } else {
            updateHeroImage(null);
        }
        
        updateConfirmButton();
        updateInstructions();
    }

    // Handle hover effects
    function handleCardHover(card) {
        if (!activeImage) {
            heroImage.src = card.image;
            heroImage.style.display = 'block';
            oneChoiceHoverText.style.display = 'none';
        }
    }

    function handleCardHoverOut() {
        if (!activeImage) {
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
        } else if (selectedCards.length > 0) {
            // Show the last selected card when hovering out
            const lastCard = selectedCards[selectedCards.length - 1];
            heroImage.src = lastCard.image;
        }
    }

    // Populate card list (now sorted)
    playerHand.forEach((card, index) => {
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

        li.setAttribute('data-card-id', card.id); // Use card.id instead of index-based ID

        // Set hover and click handlers
        li.onmouseover = () => handleCardHover(card);
        li.onmouseout = handleCardHoverOut;
        li.onclick = () => handleCardClick(card, index);
        
        cardsList.appendChild(li);
        cardElements.push(li);
    });

    confirmButton.onclick = async function() {
        if (selectedCards.length === cardsToDiscard) {
            closePopup();
            
            // Process discard by card ID instead of index to avoid index shifting issues
            for (const card of selectedCards) {
                // Find the card by ID instead of index
                const handIndex = playerHand.findIndex(c => c.id === card.id);
                if (handIndex !== -1) {
                    const [discardedCard] = playerHand.splice(handIndex, 1);
                    
                    const { returned } = await checkDiscardForInvulnerability(discardedCard);
                    if (returned.length) {
                        playerHand.push(...returned);
                    }
                    updateGameBoard();
                }
            }
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

    // Wait for player selection
    await new Promise((resolve) => {
        const originalOnclick = confirmButton.onclick;
        confirmButton.onclick = async function() {
            await originalOnclick.call(this);
            resolve();
        };
    });
}

async function stryfeStrike() {
     mastermindPermBuff += 1;
       updateMastermindOverlay();

    // 2. Handle player choice (reveal X-Force or discard random)
    await handleStryfePlayerChoice();

    async function handleStryfePlayerChoice() {
        // Check for X-Force heroes in hand or played cards this turn
        const xForceHeroes = [
            ...playerHand,
            ...cardsPlayedThisTurn.filter(card => 
                !card.isCopied && 
                !card.sidekickToDestroy
            )
        ].filter(card => card.team === 'X-Force');

        if (xForceHeroes.length > 0) {
            // Show choice popup
            const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                `DO YOU WISH TO REVEAL A CARD?`,
                "Yes",
                "No"
            );

            document.getElementById('hero-ability-may-card').src = 'Visual Assets/Masterminds/DarkCity_Stryfe.webp';
            document.getElementById('hero-ability-may-card').style.display = 'block';
            document.getElementById('heroAbilityHoverText').style.display = 'none';

            await new Promise((resolve) => {
                confirmButton.onclick = () => {
                    const randomXForce = xForceHeroes[Math.floor(Math.random() * xForceHeroes.length)];
                    onscreenConsole.log(`You revealed <span class="console-highlights">${randomXForce.name}</span> as a <img src="Visual Assets/Icons/X-Force.svg" class="console-card-icons"> Hero.`);
                    hideHeroAbilityMayPopup();
                    resolve();
                };

                denyButton.onclick = async () => {
                    if (playerHand.length > 0) {
                        const randomCard = playerHand.splice(Math.floor(Math.random() * playerHand.length), 1)[0];
                        onscreenConsole.log(`<span class="console-highlights">${randomCard.name}</span> was chosen at random to be discarded.`);
                        
                        const { returned } = await checkDiscardForInvulnerability(randomCard);
                        if (returned.length) {
                        playerHand.push(...returned);
                        }
                        
                        updateGameBoard();
                    } else {
                        onscreenConsole.log("No cards to discard!");
                    }
                    hideHeroAbilityMayPopup();
                    resolve();
                };
            });
        } else {
            // Auto discard if no X-Force
            if (playerHand.length > 0) {
                const randomCard = playerHand.splice(Math.floor(Math.random() * playerHand.length), 1)[0];
                onscreenConsole.log(`No <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Heroes - <span class="console-highlights">${randomCard.name}</span> was chosen at random to be discarded.`);
                
                const { returned } = await checkDiscardForInvulnerability(randomCard);
                        if (returned.length) {
                        playerHand.push(...returned);
                        }

                updateGameBoard();
            } else {
                onscreenConsole.log(`No <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Heroes to reveal and no cards to discard.`);
            }
        }
    }
}



function apocalypseImmortalAndUndefeated() {

const mastermind = getSelectedMastermind();

    if (mastermind.tactics.length !== 0) {
        onscreenConsole.log(`This is not the final Tactic.`);    
        
// Rescue six Bystanders
        for (let i = 0; i < 6; i++) {
            rescueBystander();
        }

// Find and shuffle this Tactic back into mastermind.tactics
        const tacticIndex = victoryPile.findIndex(tactic => tactic.name === 'Immortal and Undefeated');
        if (tacticIndex !== -1) {
            const [tactic] = victoryPile.splice(tacticIndex, 1);         

            // Insert at random position in mastermind.tactics

            const randomPos = Math.floor(Math.random() * mastermind.tactics.length);

            mastermind.tactics.splice(randomPos, 0, tactic);         

            onscreenConsole.log(`Shuffled <span class="console-highlights">Immortal and Undefeated</span> back into Mastermind Tactics.`);

        } else {
            onscreenConsole.log(`Could not find <span class="console-highlights">Immortal and Undefeated</span> in your Victory Pile.`);
        }
    } else {
        onscreenConsole.log(`This is the final Tactic - no effect.`);
    }
}

async function kingpinCriminalEmpire() {
    const mastermind = getSelectedMastermind();

    if (mastermind.tactics.length !== 0) {
        onscreenConsole.log(`This is not the final Tactic.`);
        
        // Get top 3 cards from villain deck
        const revealedCards = [];
        for (let i = 0; i < 3 && villainDeck.length > 0; i++) {
            revealedCards.push(villainDeck.pop());
        }

        // Log revealed cards
        if (revealedCards.length > 0) {
            const cardNames = revealedCards.map(card => 
                `<span class="console-highlights">${card.name}</span>`
            ).join(', ');
            onscreenConsole.log(`You revealed the top ${revealedCards.length} card${revealedCards.length !== 1 ? 's' : ''} of the Villain deck: ${cardNames}.`);
        } else {
            onscreenConsole.log("No cards left in Villain deck to reveal!");
            return;
        }

        // Separate villains from non-villains
        const villains = revealedCards.filter(card => card.type === 'Villain');
        const nonVillains = revealedCards.filter(card => card.type !== 'Villain');

        // Handle different cases
        if (villains.length === 3) {
            // All are villains - put back in original order and play all
            villainDeck.push(...revealedCards.reverse()); // Reverse to maintain order
            onscreenConsole.log(`Three Villains revealed. Playing them now.`);
            for (let i = 0; i < 3; i++) {
                await drawVillainCard();
            }
        } else if (villains.length === 2) {
            // Two villains - play them first, then handle non-villain after
            villainDeck.push(...villains.reverse()); // Reverse to maintain order
            onscreenConsole.log(`Two Villains revealed. Playing them now.`);
            for (let i = 0; i < 2; i++) {
                await drawVillainCard();
            }
            // Now handle the non-villain
            if (nonVillains.length > 0) {
                villainDeck.push(nonVillains[0]);
                nonVillains[0].revealed = true;
            }
        } else if (villains.length === 1) {
            // One villain - play it first, then handle non-villains after
            villainDeck.push(villains[0]);
            onscreenConsole.log(`One Villain revealed. It will be played now. The other revealed cards will be shuffled and returned to the top of the Villain deck.`);
            await drawVillainCard();
            // Now handle the non-villains
            shuffleArray(nonVillains);
            villainDeck.push(...nonVillains);
        } else {
            // No villains - randomize all cards and return to deck
            shuffleArray(revealedCards);
            villainDeck.push(...revealedCards);
            onscreenConsole.log(`No Villains were revealed. The revealed cards have been shuffled and returned to the top of the Villain deck.`);
        }
        updateGameBoard();
    } else {
        // This is the final tactic
        onscreenConsole.log(`This is the final Tactic. No effect.`);
    }
}

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function mephistoPainBegetsPain() {
onscreenConsole.log(`In Solo play, you are the player to your right. No action required.`);
}



function stryfeSwiftVengeance() {

if (woundDeck.length === 0) {
onscreenConsole.log(`No Wounds available to become a Master Strike.`);
return;
}

const topWound = woundDeck.pop();
topWound.name = 'Master Strike';
topWound.type = 'Master Strike';

onscreenConsole.log(`A Wound from the Wound Stack is becoming a Master Strike to take effect immediately.`);
villainDeck.push(topWound);
drawVillainCard();

}

function mephistoThePriceOfFailure() {
    if (victoryPile.filter(card => card.type === 'Mastermind').length > 1) {
        onscreenConsole.log(`You have a Mastermind Tactic in your Victory Pile. No Wound gained.`);
    } else {
        onscreenConsole.log(`In Solo Play, "each other player" refers to you and you just gained <span class="console-highlights">The Price of Failure</span> to your Victory Pile. No Wound gained.`);
    }
}

async function apocalypseTheEndOfAllThings() {
    // Edge Case 1: Completely empty deck and discard
    if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
        onscreenConsole.log("Your deck and discard pile are empty - no cards to reveal.");
        return;
    }

    // Edge Case 2: Need to reshuffle discard into deck
    if (playerDeck.length < 3) {
        updateDeck = shuffleArray([...playerDiscardPile]);
        playerDiscardPile = [];
        playerDeck = [...playerDeck, ...updateDeck];
    }

const cardsToProcess = Math.min(3, playerDeck.length);
const revealedCards = playerDeck.splice(-cardsToProcess);

    // Log revealed cards
    const cardNames = revealedCards.map(card => 
        `<span class="console-highlights">${card.name}</span>`
    ).join(', ');
    onscreenConsole.log(`You revealed ${cardNames || 'no cards'}.`);

    // Process cards
    const cardsToKO = [];
    const cardsToReturn = [];

    for (const card of revealedCards) {
        if (card.cost >= 1) {
            cardsToKO.push(card);
            onscreenConsole.log(`<span class="console-highlights">${card.name}</span> cost ${card.cost} <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> and has been KO'd.`);
            koBonuses();
        } else {
            cardsToReturn.push(card);
        }
    }

    // KO eligible cards
    if (cardsToKO.length > 0) {
        koPile.push(...cardsToKO);
        updateGameBoard();
    } else if (revealedCards.length > 0) {
        onscreenConsole.log(`No revealed cards were KO'd as they all cost less than 1 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">.`);
    }

    // Return remaining cards to deck with player choice of order
    if (cardsToReturn.length === 0) {
        return;
    }

    if (cardsToReturn.length === 1) {
        // Only one card to return - just put it back
        playerDeck.push(cardsToReturn[0]);
        onscreenConsole.log(`<span class="console-highlights">${cardsToReturn[0].name}</span> returned to top of deck.`);
        cardsToReturn[0].revealed = true;
        updateGameBoard();
        return;
    }

    // Multiple cards to return - let player choose order
    await handleCardReturnOrder(cardsToReturn);
    updateGameBoard();
}

async function kingpinCallAHit() {    
    // First check if discard pile is empty
    if (playerDiscardPile.length === 0) {
        onscreenConsole.log(`Your discard pile is empty - no Heroes to KO!`);
        return;
    }

    // Filter for only Heroes in discard
    const heroesInDiscard = playerDiscardPile.filter(card => card.type === 'Hero');
    
    // Check if no heroes in discard
    if (heroesInDiscard.length === 0) {
        onscreenConsole.log(`No Heroes in your discard pile to KO.`);
        return;
    }

    // If only 1 Hero in discard, auto-KO it
    if (heroesInDiscard.length === 1) {
        const cardIndex = playerDiscardPile.findIndex(c => c.id === heroesInDiscard[0].id);
        const [card] = playerDiscardPile.splice(cardIndex, 1);
        koPile.push(card);
        onscreenConsole.log(`You only have one Hero in your discard pile. <span class="console-highlights">${card.name}</span> has been automatically KO'd.`);
        
        koBonuses();
        
        updateGameBoard();
        return;
    }

    // Setup UI for selection when multiple Heroes available
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
        popupTitle.textContent = 'TACTIC!';
        instructionsDiv.textContent = 'Select a Hero from your discard to KO.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (selectedCard) {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
            } else {
                instructionsDiv.textContent = 'Select a Hero from your discard to KO.';
            }
        }

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

        // Create a copy for sorting without affecting the original array
        const sortedHeroesInDiscard = [...heroesInDiscard];
        genericCardSort(sortedHeroesInDiscard);

        // Populate the list with Heroes from discard
        sortedHeroesInDiscard.forEach((card, index) => {
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
            
            // Combine all icons
            const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;

            li.setAttribute('data-card-id', card.id);

            li.addEventListener('mouseover', () => {
                if (!activeImage) {
                    heroImage.src = card.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                }
            });

            li.addEventListener('mouseout', () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                }
            });

            li.addEventListener('click', () => {
                if (selectedCard && selectedCard.id === card.id) {
                    selectedCard = null;
                    li.classList.remove('selected');
                    updateHeroImage(null);
                } else {
                    // Clear previous selection
                    if (selectedCard) {
                        const prevLi = document.querySelector(`[data-card-id="${selectedCard.id}"]`);
                        if (prevLi) prevLi.classList.remove('selected');
                    }
                    selectedCard = card;
                    li.classList.add('selected');
                    updateHeroImage(card);
                }
                updateConfirmButton();
                updateInstructions();
            });

            cardsList.appendChild(li);
        });

        confirmButton.addEventListener('click', async () => {
            if (selectedCard) {
                // Find the card in the original playerDiscardPile by ID, not by index from sorted array
                const cardIndex = playerDiscardPile.findIndex(c => c.id === selectedCard.id);
                if (cardIndex !== -1) {
                    const [card] = playerDiscardPile.splice(cardIndex, 1);
                    koPile.push(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd from your discard.`);
                    
                    koBonuses();
                }
                closePopup();
                updateGameBoard();
                resolve();
            }
        });

        function closePopup() {
            popupTitle.textContent = 'FIGHT EFFECT!';
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;
        }
    });
}

async function stryfeTideOfRetribution() {
const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

if (cardsYouHave.filter(item => item.team === 'X-Force').length === 0) {
onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero.`);
await drawWound();
} else {
setTimeout(() => {   
const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL A CARD?",
        "Yes",
        "No"
    );

document.getElementById('heroAbilityHoverText').style.display = 'none';

    const cardImage = document.getElementById('hero-ability-may-card');
    cardImage.src = 'Visual Assets/Masterminds/DarkCity_Stryfe_TideOfRetribution.webp';
    cardImage.style.display = 'block';

    confirmButton.onclick = () => {
        onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero and have escaped gaining a Wound!`);
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };

    denyButton.onclick = async () => {
        onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero.`);
await drawWound();
        hideHeroAbilityMayPopup();
document.getElementById('heroAbilityHoverText').style.display = 'block';
    };
}, 10); // 10ms delay
}
}

async function stryfeFuriousWrath() {
    // Get top 6 cards from villain deck
    const revealedCards = [];
    for (let i = 0; i < 6 && villainDeck.length > 0; i++) {
        revealedCards.push(villainDeck.pop());
    }

    // Log revealed cards
    if (revealedCards.length > 0) {
        const cardNames = revealedCards.map(card => 
            `<span class="console-highlights">${card.name}</span>`
        ).join(', ');
        onscreenConsole.log(`You revealed the top ${revealedCards.length} card${revealedCards.length !== 1 ? 's' : ''} of the Villain deck: ${cardNames}.`);
    } else {
        onscreenConsole.log("No cards left in Villain deck to reveal!");
        return;
    }

    // Separate Master Strikes from other cards
    const masterStrikes = revealedCards.filter(card => card.type === 'Master Strike');
    const otherCards = revealedCards.filter(card => card.type !== 'Master Strike');

    // Put Master Strikes back on top of deck (in original order)
    if (masterStrikes.length > 0) {
        villainDeck.push(...masterStrikes.reverse()); // Reverse to maintain original order
        onscreenConsole.log(`${masterStrikes.length} Master Strike${masterStrikes.length !== 1 ? 's' : ''} revealed. Playing now.`);
        
        // Play each Master Strike
        for (let i = 0; i < masterStrikes.length; i++) {
            await drawVillainCard();
        }
    } else {
        onscreenConsole.log("No Master Strikes were revealed.");
    }

	if (otherCards.length === 1) {
	otherCards[0].revealed = true;
	}

    // Shuffle other cards and put them back on top of the deck
    if (otherCards.length > 0) {
        shuffleArray(otherCards);
        villainDeck.push(...otherCards);
        onscreenConsole.log(`The remaining revealed cards have been shuffled and returned to the top of the Villain deck.`);
    }

    updateGameBoard();
}

async function mrSinisterMasterGeneticist() {
    // Get top 7 cards from villain deck
    const revealedCards = [];
    for (let i = 0; i < 7 && villainDeck.length > 0; i++) {
        revealedCards.push(villainDeck.pop());
    }

    // Log revealed cards
    if (revealedCards.length > 0) {
        const cardNames = revealedCards.map(card => 
            `<span class="console-highlights">${card.name}</span>`
        ).join(', ');
        onscreenConsole.log(`Revealed top ${revealedCards.length} card${revealedCards.length !== 1 ? 's' : ''} of the Villain deck: ${cardNames}.`);
    } else {
        onscreenConsole.log("Villain deck is empty!");
        return;
    }

    // Separate Bystanders from other cards
    const bystanders = revealedCards.filter(card => card.type === 'Bystander');
    const otherCards = revealedCards.filter(card => card.type !== 'Bystander');

    // Attach each Bystander to Mastermind
    if (bystanders.length > 0) {
        onscreenConsole.log(`Found ${bystanders.length} Bystander${bystanders.length !== 1 ? 's' : ''}! <span class="console-highlights">Mr. Sinister</span> captures them!`);
        for (const bystander of bystanders) {
            attachBystanderToMastermind(bystander);
        }
    } else {
        onscreenConsole.log(`No Bystanders were revealed for <span class="console-highlights">Mr. Sinister</span> to capture.`);
    }

	if (otherCards.length === 1) {
	otherCards[0].revealed = true;
}

    // Shuffle remaining cards and return to top of deck
    if (otherCards.length > 0) {
        shuffleArray(otherCards);
        villainDeck.push(...otherCards);
        onscreenConsole.log(`${otherCards.length !== 1 ? 'Shuffled' : 'Placed'} the ${otherCards.length} other card${otherCards.length !== 1 ? 's' : ''} back on top of the Villain deck.`);
    }

    updateGameBoard();
}

async function stryfePsychicTorment() {
    return new Promise(async (resolve) => {
        // Check total available cards
        const totalAvailableCards = playerDeck.length + playerDiscardPile.length;

        if (totalAvailableCards === 0) {
            onscreenConsole.log('No cards available to reveal.');
            console.log('No cards available to reveal.');
            resolve(false);
            return;
        }

        // Draw up to 5 cards, shuffling if needed
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
                drawnCards.push(playerDeck.pop());
            }
            return drawnCards;
        }

        const revealedCards = drawCards(5);
        if (revealedCards.length === 0) {
            onscreenConsole.log('Unable to reveal any cards.');
            resolve(false);
            return;
        }

        // Setup popup for card selection
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = document.getElementById('cardChoiceh2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'CHOOSE A CARD!';
        instructionsDiv.textContent = `Select 1 of the ${revealedCards.length} revealed cards to add to your hand. The rest will be discarded.`;
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedCardId = null; // Track by ID instead of index
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.textContent = `Select 1 of the ${revealedCards.length} revealed cards to add to your hand. The rest will be discarded.`;
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be added to your hand.`;
            }
        }

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

        function toggleCardSelection(card, listItem) {
            if (selectedCardId === card.id) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedCardId = null;
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
                selectedCardId = card.id;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }

            updateConfirmButton();
            updateInstructions();
        }

        // Create a copy for sorting without affecting the original array
        const sortedRevealedCards = [...revealedCards];
        genericCardSort(sortedRevealedCards);

        // Populate the list with revealed cards
        sortedRevealedCards.forEach((card, index) => {
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
            
            // Combine all icons
            const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;

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
        confirmButton.onclick = async function() {
            if (selectedCard) {
                // Add selected card to hand
                playSFX('card-draw');
                playerHand.push(selectedCard);
                onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> added to hand.`);

			await discardAvoidance();
            if (hasDiscardAvoidance) {
                onscreenConsole.log(`You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided discarding.`);
                hasDiscardAvoidance = false;
                return; 
            }

                // Discard the remaining cards - filter by ID to avoid reference issues
                const cardsToDiscard = revealedCards.filter(card => card.id !== selectedCardId);
                for (const card of cardsToDiscard) {
                    const { returned } = await checkDiscardForInvulnerability(card);
                    if (returned.length) {
                        playerHand.push(...returned);
                    }
                }

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
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
    });
}

async function mephistoDamnedIfYouDo() {
    return new Promise(async (resolve) => {
        // Check available options
        const hasBystanders = victoryPile.some(card => card.type === 'Bystander');
        const hasWounds = woundDeck.length > 0;

        // Edge cases where only one option is available
        if (!hasBystanders && !hasWounds) {
            onscreenConsole.log("No Bystanders in VP and no Wounds available.");
            resolve(false);
            return;
        }

        if (!hasBystanders && hasWounds) {
            // Automatically take wound
            onscreenConsole.log(`No Bystanders in VP. You automatically gain a Wound.`);
            await drawWound();
            resolve(true);
            return;
        }

        if (hasBystanders && !hasWounds) {
            // Automatically proceed to KO bystander
            await mephistoKoBystanderFromVP();
            resolve(true);
            return;
        }

        // Both options available - show choice popup
        const popup = document.getElementById('hero-ability-may-popup');
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            "Choose one:",
            "KO Bystander from VP",
            "Gain Wound"
        );
        
    const TacticImage = document.getElementById('hero-ability-may-card');
const imageText = document.getElementById('heroAbilityHoverText');
        TacticImage.src = "Visual Assets/Masterminds/DarkCity_Mephisto_DamnedIfYouDo.webp"; 


       const popupTitle = document.getElementById('cardChoiceh2');
       popupTitle.textContent = 'TACTIC!';
TacticImage.style.display = 'block';
imageText.style.display = 'none';

        // Clear previous event listeners
        confirmButton.onclick = null;
        denyButton.onclick = null;

        const handleBystanderChoice = async () => {   
            hideHeroAbilityMayPopup();
            await mephistoKoBystanderFromVP();
            updateGameBoard();
            resolve(true);
        };

        const handleWoundChoice = async () => {     
            hideHeroAbilityMayPopup();
            await drawWound();
            updateGameBoard();
            resolve(true);
        };

        confirmButton.onclick = handleBystanderChoice;
        denyButton.onclick = handleWoundChoice;
    });
}

async function mephistoKoBystanderFromVP() {
    return new Promise(async (resolve) => {
        const bystanders = victoryPile.filter(card => card.type === 'Bystander');

        // Setup popup for bystander selection
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = document.getElementById('cardChoiceh2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'KO BYSTANDER';
        instructionsDiv.textContent = 'Select a Bystander to KO from your Victory Pile.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.textContent = 'Select a Bystander to KO from your Victory Pile.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
            }
        }

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

        // Populate the list with bystanders
        bystanders.forEach((card, index) => {
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
                // Remove from victory pile and add to KO pile
                const indexInVP = victoryPile.findIndex(card => card.id === selectedCard.id);
                if (indexInVP !== -1) {
                    const koedCard = victoryPile.splice(indexInVP, 1)[0];
                    koPile.push(koedCard);
                    onscreenConsole.log(`<span class="console-highlights">${koedCard.name}</span> was KO'd.`);
koBonuses();
                }

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
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
    });
}

function mrSinisterPlansWithinPlans() {
if (bystanderDeck.length === 0) {
onscreenConsole.log(`No Bystanders available to attach to the Mastermind.`);
}

const tacticsInVP = victoryPile.filter(card => card.type === 'Mastermind').length;
const bystandersInDeck = bystanderDeck.length;

if (tacticsInVP > bystandersInDeck && bystandersInDeck !== 0) {
onscreenConsole.log(`You have ${tacticsInVP} Tactic${tacticsInVP !== 1 ? 's' : ''} in your Victory Pile. There are not enough Bystanders to account for that. Processing as many as possible.`);
} else if (tacticsInVP <= bystandersInDeck) {
    onscreenConsole.log(`You have ${tacticsInVP} Tactic${tacticsInVP !== 1 ? 's' : ''} in your Victory Pile. Processing that number of Bystanders now.`);
}

    // Get as many bystanders as tactics or as close as possible
    const bystandersToProcess = Math.min(tacticsInVP, bystanderDeck.length);
    const bystanderCards = bystanderDeck.splice(0, bystandersToProcess);

   for (const card of bystanderCards) {
      attachBystanderToMastermind(card);
        }

updateGameBoard();
}

function mrSinisterTelepathicManipulation() {
    // Filter only Bystanders from victory pile
    const bystanders = victoryPile.filter(card => card.type === 'Bystander');
    
    if (bystanders.length === 0) {
        onscreenConsole.log(`No Bystanders in your Victory Pile for <span class="console-highlights">Mr. Sinister</span> to capture.`);
        return;
    }
    
    // Select a random Bystander
    const randomIndex = Math.floor(Math.random() * bystanders.length);
    const selectedBystander = bystanders[randomIndex];
    
    // Remove from victory pile and attach to Mastermind
    const indexInVP = victoryPile.findIndex(card => card.id === selectedBystander.id);
    if (indexInVP !== -1) {
        victoryPile.splice(indexInVP, 1);
    }
    
let mastermind = getSelectedMastermind();
    mastermind.bystanders.push(selectedBystander);
    onscreenConsole.log(`<span class="console-highlights">${selectedBystander.name}</span> was chosen at random from your Victory Pile and captured by <span class="console-highlights">Mr. Sinister</span>.`);
    updateGameBoard();
}

function mrSinisterHumanExperimentation() {
    // Get all Villains in the city with their positions
    const villainsInCity = city
        .map((card, index) => (card && card.type === 'Villain') ? { ...card, id: `city-${index}`, index } : null)
        .filter(card => card !== null);

    if (villainsInCity.length === 0) {
        onscreenConsole.log('There are no Villains in the city. No effect.');
        return;
    }

    if (bystanderDeck.length === 0) {
        onscreenConsole.log('There are no Bystanders left to be captured by <span class="console-highlights">Mr. Sinister</span>.');
        return;
    }

    const mastermind = getSelectedMastermind();
    const villainCount = villainsInCity.length;
    const bystanderCount = bystanderDeck.length;

    if (villainCount > bystanderCount) {
        onscreenConsole.log(`There are ${villainCount} Villain${villainCount !== 1 ? 's' : ''} in the city; however, you do not have that many Bystanders remaining. <span class="console-highlights">Mr. Sinister</span> will capture all that are left.`);
        
        // Capture all remaining Bystanders
        while (bystanderDeck.length > 0) {
            const bystander = bystanderDeck.pop();
            mastermind.bystanders.push(bystander);
        }
    } else {
        onscreenConsole.log(`There are ${villainCount} Villain${villainCount !== 1 ? 's' : ''} in the city. <span class="console-highlights">Mr. Sinister</span> will now capture that many Bystanders.`);
        
        // Capture exactly villainCount number of Bystanders
        for (let i = 0; i < villainCount; i++) {
            if (bystanderDeck.length > 0) {
                const bystander = bystanderDeck.pop();
                mastermind.bystanders.push(bystander);
            }
        }
    }

    updateGameBoard();
}


async function kingpinDirtyCops() {
    // Filter KO pile for zero-cost Hero cards
    const zeroCostHeroes = koPile.filter(card => card.cost === 0 && card.type === 'Hero');
    
    if (zeroCostHeroes.length === 0) {
        console.log("No zero-cost Hero cards in KO pile.");
        onscreenConsole.log(`No 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> Hero cards available in the KO pile.`);
        return false;
    }

    if (zeroCostHeroes.length === 1) {
        // Only one eligible card - automatically add it to player deck
        const hero = zeroCostHeroes[0];
        hero.revealed = true;
        const index = koPile.findIndex(card => card.id === hero.id);
        if (index !== -1) {
            koPile.splice(index, 1);
            playerDeck.push(hero);
            onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> is the only 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> Hero in the KO Pile and has been automatically added to the top of your deck.`);
            updateGameBoard();
            return true;
        }
        return false;
    }

    // Multiple eligible cards - show selection popup
    return new Promise((resolve) => {
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = document.getElementById('cardChoiceh2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'TACTIC';
        instructionsDiv.innerHTML = 'Select a 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> Hero to add to your deck.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Select Hero';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedCardId = null; // Track by ID instead of index
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.textContent = 'Select a 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> Hero to add to your deck.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be added to your deck.`;
            }
        }

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

        function toggleCardSelection(card, listItem) {
            if (selectedCardId === card.id) {
                // Deselect if same card clicked
                selectedCard = null;
                selectedCardId = null;
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
                selectedCardId = card.id;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }
            updateConfirmButton();
            updateInstructions();
        }

        // Create a copy for sorting without affecting the original array
        const sortedZeroCostHeroes = [...zeroCostHeroes];
        genericCardSort(sortedZeroCostHeroes);

        // Populate the list with zero-cost Heroes
        sortedZeroCostHeroes.forEach((card, index) => {
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
            
            // Combine all icons
            const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;

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
        confirmButton.onclick = async function() {
            if (selectedCard) {
                selectedCard.revealed = true;
                // Remove from KO pile and add to player deck - find by ID
                const indexInKOPile = koPile.findIndex(card => card.id === selectedCardId);
                if (indexInKOPile !== -1) {
                    koPile.splice(indexInKOPile, 1);
                    playerDeck.push(selectedCard);
                    onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been added to your deck from the KO pile.`);
                }

                closePopup();
                updateGameBoard();
                resolve(true);
            }
        };

        function closePopup() {
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
    });
}

            
async function kingpinMobWar() {
    // Filter victory pile for Henchmen cards
    const henchmenInVP = victoryPile.filter(card => card.henchmen === true);
    
    if (henchmenInVP.length === 0) {
        onscreenConsole.log("No Henchmen cards available in Victory Pile.");
        return false;
    }

    if (henchmenInVP.length === 1) {
        // Only one Henchmen - automatically return it to villain deck
        const henchman = henchmenInVP[0];
        const index = victoryPile.findIndex(card => card.id === henchman.id);
        if (index !== -1) {
onscreenConsole.log(`<span class="console-highlights">${henchman.name}</span> was the only Henchmen in your Victory Pile. Playing now.`);
            victoryPile.splice(index, 1);
            villainDeck.push(henchman);
            await drawVillainCard(); // Trigger villain card draw
            return true;
        }
        return false;
    }

    // Multiple Henchmen - show selection popup
    return new Promise((resolve) => {
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = document.getElementById('cardChoiceh2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'TACTIC';
        instructionsDiv.textContent = 'Select a Henchmen from your Victory Pile to play.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.textContent = 'Select a Henchmen from your Victory Pile to play.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be played.`;
            }
        }

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

        // Populate the list with Henchmen
        henchmenInVP.forEach((card, index) => {
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
                // Remove from victory pile and add to villain deck
                const indexInVP = victoryPile.findIndex(card => card.id === selectedCard.id);
                if (indexInVP !== -1) {
onscreenConsole.log(`Playing <span class="console-highlights">${selectedCard.name}</span> now.`);

                    victoryPile.splice(indexInVP, 1);
                    villainDeck.push(selectedCard);
                    closePopup();
                updateGameBoard();
                   await drawVillainCard(); // Trigger villain card draw
                }

                
                resolve(true);
            }
        };

        function closePopup() {
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
    });
}

async function apocalypseHorsemenAreDrawingNearer() {
    // Filter victory pile for Horsemen cards
    const horsemenInVP = victoryPile.filter(card => card.alwaysLeads === "true");
    
    if (horsemenInVP.length === 0) {
        onscreenConsole.log(`<span class="console-highlights">Apocalypse</span> always leads your chosen Adversary group; however, there are no suitable Villain cards available in your Victory Pile.`);
        return false;
    }

    if (horsemenInVP.length === 1) {
        // Only one Horsemen - automatically return it to villain deck
        const horsemen = horsemenInVP[0];
        const index = victoryPile.findIndex(card => card.id === horsemen.id);
        if (index !== -1) {
onscreenConsole.log(`<span class="console-highlights">Apocalypse</span> always leads your chosen Adversary group: <span class="console-highlights">${horsemen.name}</span> was the only suitable Villain in your Victory Pile. Playing now.`);
            victoryPile.splice(index, 1);
            villainDeck.push(horsemen);
            await drawVillainCard(); // Trigger villain card draw
            return true;
        }
        return false;
    }

    // Multiple Horsemen - show selection popup
    return new Promise((resolve) => {
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = document.getElementById('cardChoiceh2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'TACTIC';
        instructionsDiv.innerHTML = '<span class="console-highlights">Apocalypse</span> always leads your chosen Adversary group: select a Villain from your Victory Pile to play.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let selectedIndex = null;
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = '<span class="console-highlights">Apocalypse</span> always leads your chosen Adversary group: select a Villain from your Victory Pile to play.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be played.`;
            }
        }

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

horsemenInVP.forEach((card, index) => {
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
                // Remove from victory pile and add to villain deck
                const indexInVP = victoryPile.findIndex(card => card.id === selectedCard.id);
            if (selectedCard.bystander) {
                delete selectedCard.bystander; // Or set to empty array: selectedCard.bystander = [];
            }
                if (indexInVP !== -1) {
onscreenConsole.log(`Playing <span class="console-highlights">${selectedCard.name}</span> now.`);

                    victoryPile.splice(indexInVP, 1);
                    villainDeck.push(selectedCard);
		closePopup();
                updateGameBoard();
                
                   await drawVillainCard(); // Trigger villain card draw
resolve(true);
                }

                
            }
        };

        function closePopup() {
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
    });
}

function apocalypseApocalypticDestruction() {
    return new Promise((resolve) => {
        // Get eligible cards from discard pile (cost >= 1)
        const eligibleCards = playerDiscardPile.filter(card => card.cost >= 1 && card.type === 'Hero');
        
        // Handle empty or insufficient discard pile cases
        if (eligibleCards.length === 0) {
            onscreenConsole.log(`No eligible cards in discard pile to KO.`);
            resolve();
            return;
        }

        // Auto-process if 1 or 2 cards
        if (eligibleCards.length <= 2) {
            onscreenConsole.log(`Based on limited availability, ${eligibleCards.length !== 1 ? 'cards have' : 'a card has'} been chosen for you and will be KO'd.`);
            const cardsToKO = eligibleCards.slice(0, 2); // Take all available (1 or 2)
            cardsToKO.forEach(card => {
                // Find by ID instead of indexOf to avoid reference issues
                const index = playerDiscardPile.findIndex(c => c.id === card.id);
                if (index !== -1) {
                    playerDiscardPile.splice(index, 1);
                    koPile.push(card);
                    onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd from discard.`);
                    koBonuses();
                }
            });
            updateGameBoard();
            resolve();
            return;
        }

        // Setup popup for selecting 2 cards
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = document.getElementById('cardChoiceh2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Initialize UI
        popupTitle.textContent = 'TACTIC';
        instructionsDiv.innerHTML = 'Select 2 Heroes in your discard that cost 1 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> or more to KO.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'KO 2 Cards';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCards = [];
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCards.length < 2;
        }

        function updateInstructions() {
            const selectedCount = selectedCards.length;
            if (selectedCount === 0) {
                instructionsDiv.textContent = 'Select 2 Heroes in your discard that cost 1 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> or more to KO.';
            } else {
                const cardNames = selectedCards.map(c => `<span class="console-highlights">${c.card.name}</span>`).join(', ');
                instructionsDiv.innerHTML = `Selected: ${cardNames} will be KO'd.`;
            }
        }

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

        function toggleCardSelection(card, listItem) {
            const existingIndex = selectedCards.findIndex(c => c.card.id === card.id);
            
            if (existingIndex >= 0) {
                // Deselect if already selected
                selectedCards.splice(existingIndex, 1);
                listItem.classList.remove('selected');
                if (selectedCards.length === 0) {
                    updateHeroImage(null);
                }
            } else if (selectedCards.length < 2) {
                // Select new card if less than 2 selected
                selectedCards.push({ card, listItem });
                listItem.classList.add('selected');
                updateHeroImage(card);
            }
            
            updateConfirmButton();
            updateInstructions();
        }

        // Create a copy for sorting without affecting the original array
        const sortedEligibleCards = [...eligibleCards];
        genericCardSort(sortedEligibleCards);

        // Populate the list with eligible cards
        sortedEligibleCards.forEach(card => {
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
            
            // Combine all icons
            const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
            
            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;

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
            if (selectedCards.length === 2) {
                selectedCards.forEach(({ card }) => {
                    // Find by ID to ensure correct card is removed
                    const index = playerDiscardPile.findIndex(c => c.id === card.id);
                    if (index !== -1) {
                        playerDiscardPile.splice(index, 1);
                        koPile.push(card);
                        onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been KO'd from discard.`);
                        koBonuses();
                    }
                });
                
                closePopup();
                updateGameBoard();
                resolve();
            }
        };

        function closePopup() {
            popupTitle.textContent = 'HERO ABILITY!';
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

async function mephistoDevilishTorment() {
    // Filter zero-cost cards from discard pile
    let remainingCards = [...playerDiscardPile.filter(card => card.cost === 0)];

    if (remainingCards.length === 0) {
        onscreenConsole.log(`No 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> cards available to place on top of your deck.`);
        return false;
    }

    const selectedCards = [];
    
    // Use existing single card popup elements
    const popup = document.getElementById('card-choice-one-location-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const cardsList = document.getElementById('cards-to-choose-from');
    const confirmButton = document.getElementById('card-choice-confirm-button');
    const closeButton = document.getElementById('close-choice-button');
    const popupTitle = document.getElementById('cardChoiceh2');
    const contextSpan = document.getElementById('context');
    const previewImage = document.getElementById('hero-one-location-image');
    const hoverText = document.getElementById('oneChoiceHoverText');

    // Initialize UI elements
    popupTitle.textContent = `TACTIC`;
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true; // Disabled until selection is made
    closeButton.style.display = 'none';
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';

    return new Promise(async (resolve) => {
        let currentSelection = null;
        
        // Function to update the card list display
        const updateCardList = () => {
            cardsList.innerHTML = '';
            previewImage.style.display = 'none';
            hoverText.style.display = 'block';
            
            // Create a sorted copy for display only
            const sortedRemainingCards = [...remainingCards];
            genericCardSort(sortedRemainingCards);
            
            // Create card elements for remaining cards using sorted order
            sortedRemainingCards.forEach(card => {
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
                
                // Combine all icons
                const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
                
                li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;

                li.setAttribute('data-card-id', card.id);
                
                // Add selected class if this is the current selection
                if (currentSelection && card.id === currentSelection.id) {
                    li.classList.add('selected');
                }
                
                // Hover effects
                li.onmouseenter = () => {
                    previewImage.src = card.image;
                    previewImage.style.display = 'block';
                    hoverText.style.display = 'none';
                };
                
                li.onmouseleave = () => {
                    if (!currentSelection || card.id !== currentSelection.id) {
                        previewImage.style.display = 'none';
                        hoverText.style.display = 'block';
                    }
                };
                
                // Click handler - selects this card
                li.onclick = () => {
                    // Remove selection from all cards
                    document.querySelectorAll('#cards-to-choose-from li').forEach(el => {
                        el.classList.remove('selected');
                    });
                    
                    // Set new selection
                    currentSelection = card;
                    li.classList.add('selected');
                    
                    // Show preview
                    previewImage.src = card.image;
                    previewImage.style.display = 'block';
                    hoverText.style.display = 'none';
                    
                    // Enable confirm button
                    confirmButton.disabled = false;
                };
                
                cardsList.appendChild(li);
            });
            
            // Update context message
            const cardsLeft = remainingCards.length;
            const cardsSelected = selectedCards.length;
            contextSpan.innerHTML = `These 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> cards must be placed on top of your deck. Choose which one to return next:`;
        };

        // Initial card list display
        updateCardList();
        
        // Confirm button handler
        confirmButton.onclick = () => {
            if (currentSelection) {
                // Move card from remaining to selected - find by ID to avoid index issues
                const index = remainingCards.findIndex(c => c.id === currentSelection.id);
                if (index !== -1) {
                    const [selectedCard] = remainingCards.splice(index, 1);
                    selectedCards.unshift(selectedCard); // Add to beginning (we'll reverse later)
                    selectedCard.revealed = true;
                    currentSelection = null;
                    
                    if (remainingCards.length > 0) {
                        // More cards to select - update display
                        updateCardList();
                        confirmButton.disabled = true;
                    } else {
                        // All cards selected - process the results
                        processFinalSelection();
                    }
                }
            }
        };
        
        const processFinalSelection = () => {
            // Clean up event handlers first
            confirmButton.onclick = null;
            cardsList.innerHTML = ''; // Remove all li elements and their handlers
            
            if (selectedCards.length > 0) {
                // Remove all zero-cost cards from discard by filtering
                playerDiscardPile = playerDiscardPile.filter(card => card.cost !== 0);
                
                // Add selected cards to deck in correct order
                const correctlyOrderedCards = [...selectedCards].reverse();
                playerDeck.push(...correctlyOrderedCards);
                
                onscreenConsole.log(`Arranged ${selectedCards.length} 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> card${selectedCards.length !== 1 ? 's' : ''} on top of deck.`);
            }
            
            // Close popup
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
            updateGameBoard();
            resolve(selectedCards.length > 0);
        };
    });
}

// Dark City Scheme Effects

function strengthOrKOTop() {
    return new Promise((resolve) => { // Return a Promise
        const cardsYouHave = [
            ...playerHand,
            ...cardsPlayedThisTurn.filter(card => 
                card.isCopied !== true && 
                card.sidekickToDestroy !== true
            )
        ];

        if (cardsYouHave.filter(item => item.class1 === 'Strength').length === 0) {
            onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`);

            if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
                onscreenConsole.log("No cards available to KO.");
                resolve();
                return;
            }

            // If playerDeck is empty but playerDiscardPile has cards, reshuffle discard pile into deck
            if (playerDeck.length === 0) {
                playerDeck = shuffle(playerDiscardPile);
                playerDiscardPile = [];
            }

            const topCardPlayerDeck = playerDeck[playerDeck.length - 1];
            
            // Fix: splice should use index and delete count
            playerDeck.splice(playerDeck.length - 1, 1);
            koPile.push(topCardPlayerDeck);
            onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd from the top of your deck.`);
            koBonuses();
            resolve();
        } else {
            const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                "DO YOU WISH TO REVEAL A CARD?",
                "Yes",
                "No"
            );

            document.getElementById('heroAbilityHoverText').style.display = 'none';

            const cardImage = document.getElementById('hero-ability-may-card');
            cardImage.src = 'Visual Assets/Schemes/DarkCity_massiveEarthquakeGenerator.webp';
            cardImage.style.display = 'block';

            confirmButton.onclick = () => {
                onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero and have escaped KOing a card!`);
                hideHeroAbilityMayPopup();
                document.getElementById('heroAbilityHoverText').style.display = 'block';
                resolve(); // Resolve the Promise when done
            };

            denyButton.onclick = () => {
                onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`);

                if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
                    onscreenConsole.log("No cards available to KO.");
                    resolve();
                    return;
                }

                // If playerDeck is empty but playerDiscardPile has cards, reshuffle discard pile into deck
                if (playerDeck.length === 0) {
                    playerDeck = shuffle(playerDiscardPile);
                    playerDiscardPile = [];
                }

                const topCardPlayerDeck = playerDeck[playerDeck.length - 1];
                
                // Fix: splice should use index and delete count
                playerDeck.splice(playerDeck.length - 1, 1);
                koPile.push(topCardPlayerDeck);
                onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd from the top of your deck.`);
                koBonuses();

                hideHeroAbilityMayPopup();
                document.getElementById('heroAbilityHoverText').style.display = 'block';
                resolve(); // Resolve the Promise when done
            };
        }
    });
}

async function GoonsEscape() {

for (let i = 0; i < city.length; i++) {
        if (city[i] && city[i].name === "Maggia Goons") {
    await handleVillainEscape(city[i]);
    city[i] = null;
    updateGameBoard();
}
}

    const goons = victoryPile.filter(card => 
        card && card.name === "Maggia Goons"
    );
    
    // Remove goons from victory pile
    victoryPile = victoryPile.filter(card => 
        !card || card.name !== "Maggia Goons"
    );
    
    // Add goons to villain deck
    villainDeck.push(...goons);
    
    // Shuffle the villain deck
    shuffle(villainDeck);
    
    // Update game board if needed
    updateGameBoard();
    
    // Log action to console
    if (goons.length > 0) {
        onscreenConsole.log(`${goons.length} <span class="console-highlights">Maggia Goons</span> have escaped your Victory Pile and have been shuffled back into the Villain deck.`);
    } else {
onscreenConsole.log(`There are no <span class="console-highlights">Maggia Goons</span> in your Victory Pile to shuffle back into the Villain deck.`);
}
}

function organizedCrimeAmbush() {
onscreenConsole.log(`Ambush! <span class="console-highlights">Maggia Goons</span> forces you to play another card from the Villain deck.`);
drawVillainCard();
}

async function KOAllHQBystanders() {
    // First collect all indices where Bystanders are found
    const bystanderIndices = [];
    
    for (let i = 0; i < hq.length; i++) {
        if (hq[i] && hq[i].type === 'Bystander') {
            bystanderIndices.push(i);
        }
    }
    
    // If no bystanders found, exit early
    if (bystanderIndices.length === 0) {
        onscreenConsole.log("No Bystanders found in HQ.");
    }
    
    // Process each bystander position
    for (const index of bystanderIndices) {
        // KO the bystander (add to KO pile if needed)
        const koedBystander = hq[index];
        koPile.push(koedBystander);
        
        // Draw new card from hero deck (if available)
        const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
        hq[index] = newCard;
        
        // Log the changes
        if (koedBystander && newCard) {
            onscreenConsole.log(`<span class="console-highlights">${koedBystander.name}</span> was KO'd and replaced by <span class="console-highlights">${newCard.name}</span>.`);
        } else if (koedBystander) {
            onscreenConsole.log(`<span class="console-highlights">${koedBystander.name}</span> was KO'd (no replacement available).`);
        }
    }
    
    // Update the game board
    updateGameBoard();
    
    // Check if hero deck ran out
    if (heroDeck.length === 0) {
        heroDeckHasRunOut = true;
    }

    if (victoryPile.filter(card => card.type === 'Bystander').length === 0) {
        onscreenConsole.log(`No Bystanders in your Victory Pile to KO.`);
        return;
    }

    const cardsYouHave = [
        ...playerHand,
        ...cardsPlayedThisTurn.filter(card => 
            card.isCopied !== true && 
            card.sidekickToDestroy !== true
        )
    ];

    if (cardsYouHave.filter(item => item.class1 === 'Instinct').length === 0) {
        onscreenConsole.log(`You are unable to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
        await saveHumanityInstinctKO();
    } else {
        // Create a promise that resolves when the user makes a choice
        const userChoice = await new Promise((resolve) => {
            setTimeout(() => {
                const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                    "DO YOU WISH TO REVEAL A CARD?",
                    "Yes",
                    "No"
                );

                document.getElementById('heroAbilityHoverText').style.display = 'none';
                const cardImage = document.getElementById('hero-ability-may-card');
                cardImage.src = 'Visual Assets/Schemes/DarkCity_saveHumanity.webp';
                cardImage.style.display = 'block';

                confirmButton.onclick = () => {
                    onscreenConsole.log(`You are able to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have avoided KOing a Bystander from your Victory Pile!`);
                    hideHeroAbilityMayPopup();
                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                    resolve(false); // No KO needed
                };

                denyButton.onclick = () => {
                    onscreenConsole.log(`You have chosen not to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`);
                    hideHeroAbilityMayPopup();
                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                    resolve(true); // KO needed
                };
            }, 10);
        });

        if (userChoice) {
            await saveHumanityInstinctKO();
        }
    }
}

async function saveHumanityInstinctKO() {
    const bystanders = victoryPile.filter(card => card.type === 'Bystander');

    // Setup popup for bystander selection
    const popup = document.getElementById('card-choice-one-location-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const cardsList = document.getElementById('cards-to-choose-from');
    const confirmButton = document.getElementById('card-choice-confirm-button');
    const popupTitle = document.getElementById('cardChoiceh2');
    const instructionsDiv = document.getElementById('context');
    const heroImage = document.getElementById('hero-one-location-image');
    const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

    // Initialize UI
    popupTitle.textContent = 'KO BYSTANDER';
    instructionsDiv.textContent = 'Select a Bystander to KO from your Victory Pile.';
    cardsList.innerHTML = '';
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;
    confirmButton.textContent = 'Confirm';
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';

    let selectedCard = null;
    let selectedIndex = null;
    let activeImage = null;

    function updateConfirmButton() {
        confirmButton.disabled = selectedCard === null;
    }

    function updateInstructions() {
        if (selectedCard === null) {
            instructionsDiv.textContent = 'Select a Bystander to KO from your Victory Pile.';
        } else {
            instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
        }
    }

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

    // Populate the list with bystanders
    bystanders.forEach((card, index) => {
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

    // Return a promise that resolves when the user confirms
    return new Promise((resolve) => {
        confirmButton.onclick = () => {
            if (selectedCard) {
                // Remove from victory pile and add to KO pile
                const indexInVP = victoryPile.findIndex(card => card.id === selectedCard.id);
                if (indexInVP !== -1) {
                    const koedCard = victoryPile.splice(indexInVP, 1)[0];
                    koPile.push(koedCard);
                    onscreenConsole.log(`<span class="console-highlights">${koedCard.name}</span> was KO'd.`);
                    koBonuses();
                }

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

                updateGameBoard();
                resolve();
            }
        };
    });
}

async function plutoniumCaptured(twistCard) {
    const sewersIndex = city.length - 1;

    // If villain in sewers, attach there
    if (city[sewersIndex]) {
        await attachPlutoniumToVillain(sewersIndex, twistCard);
    } 
    // Otherwise, find the closest villain
    else {
        const closestVillainIndex = findClosestVillain();
        if (closestVillainIndex !== -1) {
            await attachPlutoniumToVillain(closestVillainIndex, twistCard);
        } 
        // If no villains, KO the plutonium
        else {
            koPile.push(twistCard);
            onscreenConsole.log(`No Villains in city. Plutonium KO'd.`);
        }
    }

    updateGameBoard();
    // **Note:** The villain draw happens in `handlePlutoniumSchemeTwist`, not here!
}


async function attachPlutoniumToVillain(villainIndex, twistCard) {
    if (!city[villainIndex].plutoniumCaptured) {
        city[villainIndex].plutoniumCaptured = [];
    }
    city[villainIndex].plutoniumCaptured.push(twistCard);
    
    const villain = city[villainIndex];
    onscreenConsole.log(`<span class="console-highlights">${villain.name}</span> captured Plutonium.`);
    updateGameBoard();
}

function BystanderstToDemonGoblins() {
    if (bystanderDeck.length === 0) {
        onscreenConsole.log('There are no Bystanders available to become "Demon Goblin" Villains.');
        return;
    }

    // Determine how many cards we can take (up to 5)
    const count = Math.min(5, bystanderDeck.length);
    
    // Move the cards from bystanderDeck to demonGoblinDeck
    for (let i = 0; i < count; i++) {
        demonGoblinDeck.push(bystanderDeck.pop());
    }

    // Optional: Log how many were converted
    onscreenConsole.log(`${count} Bystander${count !== 1 ? 's have become "Demon Goblin" Villains.' : ' has become a "Demon Goblin" Villain.'}`);
}

async function rescueDemonGoblin() {

    const demonBystander = demonGoblinDeck[demonGoblinDeck.length - 1];

    try {
        if (recruitUsedToAttack === true) {
            const result = await showCounterPopup(demonBystander, 2);
            totalAttackPoints -= result.attackUsed || 0;
            totalRecruitPoints -= result.recruitUsed || 0;
            onscreenConsole.log(`You chose to use ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points.`);
        } else {
            totalAttackPoints -= 2;
        }
    } catch (error) {
        console.error('Error handling point deduction:', error);
    }

    demonGoblinDeck.pop();
    victoryPile.push(demonBystander);
    onscreenConsole.log(`<span class="console-highlights">${demonBystander.name}</span> has been rescued.`);

    defeatBonuses();
    bystanderBonuses();

        const attackButton = document.querySelector('#demon-goblin-deck .attack-button');
    if (attackButton) {
        attackButton.style.display = 'none';
    }

    await rescueBystanderAbility(demonBystander);
    updateGameBoard();
}

function showDemonGoblinAttackButton() {
    let playerAttackPoints = totalAttackPoints;
    if (recruitUsedToAttack === true) {
        playerAttackPoints += totalRecruitPoints;
    }

    const demonDeck = document.getElementById('demon-goblin-deck');
    if (!demonDeck) return;

    if (playerAttackPoints >= 2 && demonGoblinDeck.length > 0) {
        let attackButton = demonDeck.querySelector('.attack-button');
        if (!attackButton) {
            attackButton = document.createElement('div');
            attackButton.classList.add('attack-button');
            demonDeck.appendChild(attackButton);
        }

        attackButton.innerHTML = `<span style="filter: drop-shadow(0vh 0vh 0.3vh black);"><img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="overlay-attack-icons"></span>`;
        attackButton.style.display = 'block';

        // Store the handler so we can remove it later
        let handleClickOutside;

        attackButton.onclick = async function() {
            attackButton.style.pointerEvents = 'none';
            try {
                await rescueDemonGoblin();
                attackButton.style.display = 'none';
            } catch (error) {
                console.error("Attack failed:", error);
            } finally {
                attackButton.style.pointerEvents = 'auto';
                document.removeEventListener('click', handleClickOutside);
                updateGameBoard();
            }
        };

        handleClickOutside = (event) => {
            if (!attackButton.contains(event.target)) {
                attackButton.style.display = 'none';
                document.removeEventListener('click', handleClickOutside);
            }
        };

        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);
    }
}

function handleXCutionerHero(villainCard) {
    let sewersIndex = city.length - 1;

    // Check if there's a villain in the sewers
    if (city[sewersIndex]) {
        attachXCutionerHeroToVillain(sewersIndex, villainCard);
    } else {
        // Find the next closest villain to the villain deck
        let closestVillainIndex = findClosestVillain();
        
        if (closestVillainIndex !== -1) {
            attachXCutionerHeroToVillain(closestVillainIndex, villainCard);
        } else {
            // If no villains in the city, attach to the mastermind
            attachXCutionerHeroToMastermind(villainCard);
        }
    }
    updateGameBoard();
}

async function attachXCutionerHeroToVillain(villainIndex, villainCard) {
            await new Promise((resolve) => {
        showPopup('X-Cutioner Hero to Villain', villainCard, () => {
            resolve();
        });
    });
    if (city[villainIndex].XCutionerHeroes) {
        city[villainIndex].XCutionerHeroes.push(villainCard);
    } else {
        city[villainIndex].XCutionerHeroes = [villainCard];
    }

    // Access the villain object using the index to get its name
    const villain = city[villainIndex]; 

   // Log the villain's name correctly
    onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been captured by <span class="console-highlights">${villain.name}</span>.`);
addHRToTopWithInnerHTML();


    updateGameBoard();

}

async function attachXCutionerHeroToMastermind(villainCard) {
            await new Promise((resolve) => {
        showPopup('X-Cutioner Hero to Mastermind', villainCard, () => {
            resolve();
        });
    });
let mastermind = getSelectedMastermind();
   
    if (mastermind.XCutionerHeroes) {
        mastermind.XCutionerHeroes.push(villainCard);
    } else {
        mastermind.XCutionerHeroes = [villainCard];
    }
    
    updateMastermindOverlay();

        updateGameBoard();

    onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been captured by <span class="console-highlights">${mastermind.name}</span>.`);
addHRToTopWithInnerHTML();

}

async function KOCapturedHeroes() {
    const mastermind = getSelectedMastermind();

    // 1. Handle XCutioner's captured heroes (original logic - already has null check)
    if (mastermind.XCutionerHeroes && mastermind.XCutionerHeroes.length > 0) {
        for (const hero of mastermind.XCutionerHeroes) {
            koPile.push(hero);
            onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd.`);
        }
        mastermind.XCutionerHeroes = [];
    }

    // 2. Handle city spaces' XCutionerHeroes (FIXED VERSION)
    for (let i = city.length - 1; i >= 0; i--) {
        if (city[i] && city[i].XCutionerHeroes && city[i].XCutionerHeroes.length > 0) {
            for (const hero of city[i].XCutionerHeroes) {
                koPile.push(hero);
                onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd.`);
            }
            city[i].XCutionerHeroes = [];
        }
    }

    // 3. KO ALL captured heroes (Skrull/other captures) - unchanged
    for (const hero of capturedCardsDeck) {
        koPile.push(hero);
        onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd.`);
    }
    capturedCardsDeck = []; // Clear the captured deck

    // 4. Reset any villains that had captured heroes (FIXED VERSION)
    for (const villain of city) {
        if (villain && villain.captureCode) { // Added null check here too
            // Remove capture-related properties
            delete villain.captureCode;
            delete villain.overlayText;
            delete villain.overlayTextAttack;
            delete villain.capturedOverlayText;
            villain.attack = villain.originalAttack;
            delete villain.XCutionerHeroes;
        }
    }

    // 5. Also reset mastermind if it had capture abilities - unchanged
    if (mastermind.captureCode) {
        delete mastermind.captureCode;
        // Remove any overlays, reset attack, etc.
    }

    onscreenConsole.log(`All Heroes captured by enemies have been KO'd. Now playing another card from the Villain Deck...`)
    await drawVillainCard();

    updateGameBoard(); // Refresh UI
}

function explosionKO() {
    let twistsRemaining = schemeTwistCount;
    let currentHQIndex = 0; // Start with left-most HQ (index 0 = HQ1)
    
    while (twistsRemaining > 0 && currentHQIndex < 5) {
        const explosionCounts = [hqExplosion1, hqExplosion2, hqExplosion3, hqExplosion4, hqExplosion5];
        
        // Skip destroyed HQs (explosion >= 6)
        while (currentHQIndex < 5 && explosionCounts[currentHQIndex] >= 6) {
            currentHQIndex++;
        }
        
        if (currentHQIndex >= 5) break; // All HQs destroyed
        
        // Process KO
        const originalCount = explosionCounts[currentHQIndex];
        koHeroInHQ(currentHQIndex); // Uses existing Helicarrier logic
        
        // Check if this KO destroyed the HQ
        const newCount = [hqExplosion1, hqExplosion2, hqExplosion3, hqExplosion4, hqExplosion5][currentHQIndex];
        if (originalCount < 6 && newCount >= 6) {
            onscreenConsole.log(`HQ ${currentHQIndex + 1} has been destroyed!`);
            currentHQIndex++; // Move to next HQ only after destruction
        }
        
        twistsRemaining--;
    }
    
    if (twistsRemaining > 0) {
        onscreenConsole.log(`${twistsRemaining} scheme twists had no valid targets!`);
    }
    
    updateGameBoard();
}

async function babyKidnap() {
    // Find villain with babyHope
    const babyVillainIndex = city.findIndex(card => card?.type === 'Villain' && card.babyHope === true);
    
    if (babyVillainIndex !== -1) {
        // Case 1: Villain with baby exists
        const babyVillain = city[babyVillainIndex];
        
        // PROPERLY clear the city cell (set to empty string, not undefined)
        
               
        // Process escape
        delete babyVillain.babyHope;
        babyVillain.attack = babyVillain.originalAttack;
        document.getElementById('scheme-token').style.display = 'flex';
        stackedTwistNextToMastermind += 1;

        city[babyVillainIndex] = null;
        
        // Force immediate UI update BEFORE escape handling
        updateGameBoard();
        
        await handleVillainEscape(babyVillain);

    } else {
        // Case 2: No villain with baby - find closest to villain deck
        const closestVillainIndex = city.findLastIndex(card => card?.type === 'Villain');
        if (closestVillainIndex !== -1) {
            city[closestVillainIndex].babyHope = true;
            document.getElementById('scheme-token').style.display = 'none';
            victoryPile = victoryPile.filter(card => card?.type !== 'Baby');
            updateGameBoard();
        }
    }
}

function isCityEmpty() {
    return !city.some(card => card != null);
}

async function instantDefeatAttack(cityIndex) {
playSFX('attack');
    // Get fresh references
    const villainCard = city[cityIndex];
    if (!villainCard) {
        console.error('Villain disappeared during attack.');
        onscreenConsole.log(`Error: Villain could not be targeted.`);
        return;
    }

     // Set the currentVillainLocation to the current location of the villain
    currentVillainLocation = cityIndex; // Store the city index (location) of the villain
console.log("Selected Villain's Location: ", currentVillainLocation);

    // Make a copy of critical data before any async operations
    const villainCopy = {
        name: villainCard.name,
        attack: villainCard.attack,
        originalAttack: villainCard.originalAttack,
        bystander: [...(villainCard.bystander || [])],
        fightEffect: villainCard.fightEffect,
        shattered: villainCard.shattered,
        fightCondition: villainCard.fightCondition,
        image: villainCard.image,
        captureCode: villainCard.captureCode
    };

    // Calculate attack synchronously
    const selectedScheme = getSelectedScheme();
    const villainAttack = recalculateVillainAttack(villainCard);

// Replace the forEach with a for...of loop which properly handles async/await
if (Array.isArray(villainCard.bystander)) {
    for (const bystander of villainCard.bystander) {
        if (bystander) {
            victoryPile.push(bystander);
            bystanderBonuses();
            await rescueBystanderAbility(bystander);
        }
    }
}

 if (villainCard.babyHope === true) {
        delete villainCard.babyHope;
        villainCard.attack = villainCard.originalAttack;
        const BabyHopeCard = { 
            name: "Baby Hope", 
            type: "Baby", 
            victoryPoints: 6, 
            image: 'Visual Assets/Other/babyHope.webp'
        };
        victoryPile.push(BabyHopeCard);
        updateGameBoard();
    }

    // Rest of the post-defeat handling remains the same
    if (villainCard.plutoniumCaptured && villainCard.plutoniumCaptured.length > 0) {
        for (const plutonium of villainCard.plutoniumCaptured) {
            villainDeck.push(plutonium);
        }
        villainCard.plutoniumCaptured = [];
        shuffle(villainDeck);
        onscreenConsole.log(`Plutonium from <span class="console-highlights">${villainCard.name}</span> shuffled back into Villain Deck.`);
    }


// Handle X-Cutioner Heroes
if (Array.isArray(villainCard.XCutionerHeroes) && villainCard.XCutionerHeroes.length > 0) {
    for (const hero of villainCard.XCutionerHeroes) {
        playerDiscardPile.push(hero);
        onscreenConsole.log(`You have rescued <span class="console-highlights">${hero.name}</span>. They have been added to your Discard pile.`);
    }
    villainCard.XCutionerHeroes.length = 0; // clear in-place
}


    // Handle extra bystanders
    if (rescueExtraBystanders > 0) {
        for (let i = 0; i < rescueExtraBystanders; i++) {
            rescueBystander();
        }
    }

if (villainCard.name === 'Dracula') {
villainCard.attack = 3;
villainCard.cost = 0;
}

    victoryPile.push(villainCard);

    onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been defeated.`);

    // Handle location-based bonuses
    try {
        if (sewerRooftopDefeats && (cityIndex === 2 || cityIndex === 4)) {
            onscreenConsole.log(`You defeated <span class="console-highlights">${villainCard.name}</span> ${cityIndex === 4 ? 'in the Sewers' : 'on the Rooftops'}. Drawing two cards.`);
            extraDraw();
            extraDraw();
        }

        if (sewerRooftopBonusRecruit > 0 && (cityIndex === 2 || cityIndex === 4)) {
            onscreenConsole.log(`You defeated <span class="console-highlights">${villainCard.name}</span> ${cityIndex === 4 ? 'in the Sewers' : 'on the Rooftops'}. +${sewerRooftopBonusRecruit}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
            totalRecruitPoints += sewerRooftopBonusRecruit;
            cumulativeRecruitPoints += sewerRooftopBonusRecruit;
        }
    } catch (error) {
        console.error('Error processing location bonuses:', error);
    }

                // Clear the city slot and add to victory pile
    city[cityIndex] = null;

defeatBonuses();

    // Handle Professor X Mind Control
    if (hasProfessorXMindControl) {
        try {
            await new Promise((resolve) => {
                const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                    "DO YOU WISH TO GAIN THIS VILLAIN?",
                    "GAIN AS A HERO",
                    "NO THANKS!"
                );

                document.getElementById('heroAbilityHoverText').style.display = 'none';

                const cardImage = document.getElementById('hero-ability-may-card');
                cardImage.src = 'Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_MindControl.webp';
                cardImage.style.display = 'block';

                confirmButton.onclick = () => {
                    const cardCopy = JSON.parse(JSON.stringify(villainCard));
                    cardCopy.type = "Hero";
                    cardCopy.color = "Grey";
                    cardCopy.cost = villainCard.attack;
                    cardCopy.keyword1 = "None";
                    cardCopy.keyword2 = "None";
                    cardCopy.keyword3 = "None";
                    
                    playerDiscardPile.push(cardCopy);
                    
                    onscreenConsole.log(`You have chosen to add <span class="console-highlights">${villainCard.name}</span> to your discard pile as a grey Hero.`);
                    updateGameBoard();
                    
                    hideHeroAbilityMayPopup();
                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                    resolve(true);
                };

                denyButton.onclick = () => {
                    onscreenConsole.log(`You declined to copy ${villainCard.name}.`);
                    hideHeroAbilityMayPopup();
                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                    resolve(false);
                };
            });
        } catch (error) {
            console.error('Error in mind control popup:', error);
        }
    }

    // Handle fight effects
    try {
        if (villainCopy.fightEffect && villainCopy.fightEffect !== "None") {
            const fightEffectFunction = window[villainCopy.fightEffect];
            if (typeof fightEffectFunction === 'function') {
                await fightEffectFunction(villainCopy);
            }
        }
    } catch (error) {
        console.error(`Error in fight effect: ${error}`);
    } finally {
        currentVillainLocation = null;
        updateGameBoard();
    }    
}

async function confirmInstantMastermindAttack() {
playSFX('attack');
    try {
        const defeatedMasterminds = victoryPile.filter(card => card.type === "Mastermind");
        let mastermind = getSelectedMastermind();
        healingPossible = false;
        let mastermindAttack = recalculateMastermindAttack(mastermind);

        // Handle doom delay logic
        if (doomDelayEndGameFinalBlow) {
            delayEndGame = (mastermindDefeatTurn === turnCount);
        }

        // Handle bystanders and recruit points
        if (rescueExtraBystanders > 0) {
            for (let i = 0; i < rescueExtraBystanders; i++) {
                rescueBystander();
            }
        }

defeatBonuses();

             if (mastermind.XCutionerHeroes && mastermind.XCutionerHeroes.length > 0) {
        for (const hero of mastermind.XCutionerHeroes) {
            playerDiscardPile.push(hero);
            onscreenConsole.log(`You have rescued <span class="console-highlights">${hero.name}</span>. They have been added to your Discard pile.`);
        }
   
        mastermind.XCutionerHeroes = [];
    }

        // Handle mastermind defeat
for (const bystander of mastermind.bystanders) {
    victoryPile.push(bystander);
    bystanderBonuses();
    await rescueBystanderAbility(bystander); // Now works properly
}
        mastermind.bystanders = [];

        updateMastermindOverlay();
        updateGameBoard();

        onscreenConsole.log(`You attacked <span class="console-highlights">${mastermind.name}</span>. Revealing tactic now!`);

        // Check win condition
        if (mastermind.tactics.length === 0) {
            if (finalBlowEnabled) {
                const finalBlowCard = { 
                    name: "Final Blow", 
                    type: "Mastermind", 
                    victoryPoints: mastermind.victoryPoints, 
                    image: mastermind.image
                };
                victoryPile.push(finalBlowCard);
                updateGameBoard();
            }
            checkWinCondition();
        } else {
            revealMastermindTactic(mastermind);
        }
    } catch (error) {
        console.error("Mastermind attack error:", error);
        throw error; // Re-throw to be caught by the caller
    }
}

async function doubleVillainDraw() {
    onscreenConsole.log(`<span style="font-style:italic">Playing the top two cards of the Villain Deck...</span>`);
    // Process cards one at a time, fully completing each before moving to next
    await processVillainCard();
    await processVillainCard();
}
