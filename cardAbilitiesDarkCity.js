// Card Abilities for Dark City

function angelDivingCatch(card) {
    return new Promise((resolve) => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `Would you like to use <span style="font-weight:600;">${card.name}</span>'s ability?`,
        "Yes",
        "No"
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
        }, 200);
      }
  
      confirmButton.onclick = function () {
        disableButtons();
        playerDiscardPile.push(card); 
        console.log(`${card.name} discarded. Updated playerHand:`, playerHand);
        onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been discarded.`);
        rescueBystander();
        extraDraw();
        extraDraw();
        hideHeroAbilityMayPopup();
        cardImage.src = '';
        cardImage.style.display = 'none';
        imageHoverText.style.display = 'block';
  
        // Update the game state after the popup is fully hidden
        setTimeout(() => {
          updateGameBoard();
          resolve(card); // Return the card to be added to the temporary array
        }, 100);
      };
  
      denyButton.onclick = function () {
        disableButtons();
        // Typically, a deny action wouldn't discard the card - is this intended?
        // If not, remove the next line:
        playerDiscardPile.push(card);
        
        console.log(`${card.name} remains in the discard pile.`);
        onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been discarded.`);
        hideHeroAbilityMayPopup();
        cardImage.src = '';
        cardImage.style.display = 'none';
        imageHoverText.style.display = 'block';
  
        setTimeout(() => {
          updateGameBoard();
          resolve(null); // Resolve with null (no card returned)
        }, 100);
      };
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
            let selectedIndex = null;
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

                const handleMouseOver = () => {
                    if (!activeImage) {
                        heroImage.src = card.image;
                        heroImage.style.display = 'block';
                        oneChoiceHoverText.style.display = 'none';
                    }
                };

                const handleMouseOut = () => {
                    if (!activeImage) {
                        heroImage.src = '';
                        heroImage.style.display = 'none';
                        oneChoiceHoverText.style.display = 'block';
                    }
                };

                const handleClick = () => toggleCardSelection(card, index, li);

                li.addEventListener('mouseover', handleMouseOver);
                li.addEventListener('mouseout', handleMouseOut);
                li.addEventListener('click', handleClick);

                cardsList.appendChild(li);
            });

            // Handle confirmation
            confirmButton.onclick = async () => {
                if (selectedCard) {
                    try {
                        console.log('Card discarded:', selectedCard);
                        
                        // Remove the card from the player's hand
                        playerHand.splice(selectedIndex, 1);
                        
                        await checkDiscardForInvulnerability(selectedCard);
                        
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
                console.log("No cards in Hand to discard. You are unable to play this card.");
                onscreenConsole.log("No cards in Hand to discard. You are unable to use this ability.");
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
            let selectedIndex = null;
            let activeImage = null;
            const eventListeners = [];

            // Cleanup function
            const cleanup = () => {
                // Remove all event listeners
                eventListeners.forEach(({element, type, handler}) => {
                    element.removeEventListener(type, handler);
                });
                eventListeners.length = 0;
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
            const toggleCardSelection = (card, index, listItem) => {
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
            };

            // Add event listener with cleanup tracking
            const addListener = (element, type, handler) => {
                element.addEventListener(type, handler);
                eventListeners.push({element, type, handler});
            };

            // Populate the list with cards in the player's hand
            playerHand.forEach((card, index) => {
                console.log('Adding card to selection list:', card);
                const li = document.createElement('li');
                li.textContent = card.name;
                li.setAttribute('data-card-id', card.id);

                const mouseOverHandler = () => {
                    if (!activeImage) {
                        heroImage.src = card.image;
                        heroImage.style.display = 'block';
                        oneChoiceHoverText.style.display = 'none';
                    }
                };

                const mouseOutHandler = () => {
                    if (!activeImage) {
                        heroImage.src = '';
                        heroImage.style.display = 'none';
                        oneChoiceHoverText.style.display = 'block';
                    }
                };

                const clickHandler = () => toggleCardSelection(card, index, li);

                addListener(li, 'mouseover', mouseOverHandler);
                addListener(li, 'mouseout', mouseOutHandler);
                addListener(li, 'click', clickHandler);

                cardsList.appendChild(li);
            });

            // Handle confirmation
            const confirmHandler = async () => {
                if (!selectedCard) return;
                
                try {
                    const discardedCard = playerHand.splice(selectedIndex, 1)[0];
                    
                    // Handle the discard logic
                    await checkDiscardForInvulnerability(discardedCard);

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
            const cancelHandler = () => {
                onscreenConsole.log(`You have chosen not to discard, preventing you from activating this ability.`);
                closePopup();
                updateGameBoard();
                cleanup();
                resolve(false);
            };

            addListener(confirmButton, 'click', confirmHandler);
            addListener(closeButton, 'click', cancelHandler);

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
    return new Promise((resolve, reject) => {
        try {
            const handList = document.getElementById("hand-cards");
            handList.innerHTML = "";

            const hand = [...playerHand]; // Create a copy to avoid direct manipulation
            const hoverText = document.getElementById("card-ko-card-popupHoverText");
            const KOImage = document.getElementById("card-ko-popup-image");
            const eventListeners = [];

            if (hand.length === 0) {
                onscreenConsole.log("No cards in your Hand to discard.");
                resolve(false);
                return;
            }

            let selectedCards = [];
            const discardButton = document.getElementById("close-ko-button");

            // Cleanup function
            const cleanup = () => {
                eventListeners.forEach(({element, type, handler}) => {
                    element.removeEventListener(type, handler);
                });
                eventListeners.length = 0;
            };

            // Add event listener with cleanup tracking
            const addListener = (element, type, handler) => {
                element.addEventListener(type, handler);
                eventListeners.push({element, type, handler});
            };

            // Update discard button state
            const updateDiscardButton = () => {
                discardButton.disabled = selectedCards.length === 0;
            };

            // Toggle selection of cards
            const toggleCardSelection = (card, listItem) => {
                const index = selectedCards.findIndex(c => c.id === card.id);
                if (index > -1) {
                    selectedCards.splice(index, 1);
                    listItem.classList.remove('selected');
                } else {
                    selectedCards.push(card);
                    listItem.classList.add('selected');
                }
                console.log('Selected cards:', selectedCards.map(c => c.name));
                updateDiscardButton();
            };

            // Populate hand list
            hand.forEach(card => {
                const li = document.createElement('li');
                li.textContent = card.name;
                li.dataset.cardId = card.id;

                const mouseOverHandler = () => {
                    KOImage.src = card.image;
                    KOImage.style.display = 'block';
                    hoverText.style.display = 'none';
                };

                const mouseOutHandler = () => {
                    KOImage.src = '';
                    KOImage.style.display = 'none';
                    hoverText.style.display = 'block';
                };

                const clickHandler = () => toggleCardSelection(card, li);

                addListener(li, 'mouseover', mouseOverHandler);
                addListener(li, 'mouseout', mouseOutHandler);
                addListener(li, 'click', clickHandler);

                handList.appendChild(li);
            });

            // Display popup
            document.getElementById("card-ko-popup").style.display = "block";
            document.getElementById("modal-overlay").style.display = "block";
            document.getElementById("card-ko-popup-h2").textContent = 
                "Select any number of cards from your hand to discard and then draw that number.";

            // Initialize button
            discardButton.style.display = 'block';
            discardButton.disabled = true;

            // Handle discard
            addListener(discardButton, 'click', async () => {
                try {
                    // Process each selected card
                    for (const card of selectedCards) {
                        const index = playerHand.findIndex(c => c.id === card.id);
                        if (index > -1) {
                            const discardedCard = playerHand.splice(index, 1)[0];
                            playerDiscardPile.push(discardedCard);
                            onscreenConsole.log(`<span class="console-highlight">${discardedCard.name}</span> discarded.`);
                            extraDraw();
                        }
                    }

                    closePopup();
                    updateGameBoard();
                    cleanup();
                    resolve(true);
                } catch (error) {
                    cleanup();
                    reject(error);
                }
            });

            // Close popup function
            const closePopup = () => {
                document.getElementById("card-ko-popup").style.display = "none";
                document.getElementById("modal-overlay").style.display = "none";
                handList.innerHTML = "";
                selectedCards = [];
                KOImage.src = "";
                KOImage.style.display = "none";
                hoverText.style.display = "block";
                discardButton.style.display = "none";
                document.getElementById("card-ko-popup-h2").textContent = 
                    "Do you wish to KO a card from your Discard Pile or Hand to rescue a Bystander?";
            };

        } catch (error) {
            reject(error);
        }
    });
}

