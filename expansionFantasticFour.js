// Fantastic Four Expansion
// Pre-release
// 05/09/2025 17.45

// Need to code Focus and changes to attack and recruit usable in particular city spaces.
// Need to add cards to database/index, images to Visual Assets and keywords to database.
// Need to code expansion splash screen
// Explore adding animations now

//Keywords

async function handleCosmicThreatChoice(card, index) {
    return new Promise((resolve) => {
        setTimeout(() => {
               
            const allRevealableCards = [
                ...playerHand,
                ...cardsPlayedThisTurn.filter(card => 
                    !card.isCopied && 
                    !card.sidekickToDestroy
                )
            ];

 const hasClass = (card, wanted) =>
  ['class1','class2','class3'].some(k =>
    String(card?.[k] ?? '').trim().toLowerCase() === String(wanted).trim().toLowerCase()
  );
           
            let className1, className2, imagePath, attackPerCard;
            
            switch(card.name) {
                case 'Arishem, The Judge':
                    className1 = 'Range';
                    className2 = 'Strength';
                    imagePath = 'Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp';
                    attackPerCard = 3;
                    break;
                
                case 'Exitar, The Exterminator':
                    className1 = 'Tech';
                    className2 = 'Range';
                    imagePath = 'Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp';
                    attackPerCard = 3;
                    break;
                    
                case 'Gammenon, The Gatherer':
                    className1 = 'Strength';
                    className2 = 'Instinct';
                    imagePath = 'Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp';
                    attackPerCard = 3;
                    break;
                    
                case 'Nezarr, The Calculator':
                    className1 = 'Covert';
                    className2 = 'Tech';
                    imagePath = 'Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp';
                    attackPerCard = 3;
                    break;
                    
                case 'Tiamut, The Dreaming Celestial':
                    className1 = 'Instinct';
                    className2 = 'Covert';
                    imagePath = 'Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp';
                    attackPerCard = 3;
                    break;
                
                default:
                    className1 = 'Class1';
                    className2 = 'Class2';
                    imagePath = 'Visual Assets/Other/cardback.webp';
                    attackPerCard = 3;
            }
            

            const countClass1 = allRevealableCards
  .filter(c => hasClass(c, className1))
  .length;

           const countClass2 = allRevealableCards
  .filter(c => hasClass(c, className2))
  .length;
            
            // Calculate attack reduction values
            const valueClass1 = countClass1 * attackPerCard;
            const valueClass2 = countClass2 * attackPerCard;
            
            // Create button texts with icons
            const confirmText = `<img src="Visual Assets/Icons/${className1}.svg" alt="${className1} Icon" class="console-card-icons"> - ${countClass1} card${countClass1 !== 1 ? 's' : ''}`;
            const denyText = `<img src="Visual Assets/Icons/${className2}.svg" alt="${className2} Icon" class="console-card-icons"> - ${countClass2} card${countClass2 !== 1 ? 's' : ''}`;

            const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                `CHOOSE A CLASS TO REVEAL:`,
                confirmText,
                denyText
            );

            document.getElementById('heroAbilityHoverText').style.display = 'none';
            
            const cardImage = document.getElementById('hero-ability-may-card');
            cardImage.src = imagePath;
            cardImage.style.display = 'block';

            confirmButton.onclick = () => {
                cosmicThreat(card, index, valueClass1, className1);
                hideHeroAbilityMayPopup();
                document.getElementById('heroAbilityHoverText').style.display = 'block';
                cardImage.style.display = 'none';
                resolve();
            };

            denyButton.onclick = () => {
                cosmicThreat(card, index, valueClass2, className2);
                hideHeroAbilityMayPopup();
                document.getElementById('heroAbilityHoverText').style.display = 'block';
                cardImage.style.display = 'none';
                resolve();
            };
        }, 10);
    });
}

function cosmicThreat(card, index, attackReduction, className) {
  // temp buff
  if (index === 0) city1TempBuff -= attackReduction;
  else if (index === 1) city2TempBuff -= attackReduction;
  else if (index === 2) city3TempBuff -= attackReduction;
  else if (index === 3) city4TempBuff -= attackReduction;
  else if (index === 4) city5TempBuff -= attackReduction;

  // cosmic threat record
  if (index === 0) city1CosmicThreat = attackReduction;
  else if (index === 1) city2CosmicThreat = attackReduction;
  else if (index === 2) city3CosmicThreat = attackReduction;
  else if (index === 3) city4CosmicThreat = attackReduction;
  else if (index === 4) city5CosmicThreat = attackReduction;

  const cardCount = attackReduction / 3;
  const cardText = cardCount === 1 ? 'card' : 'cards';
  onscreenConsole.log(`Cosmic Threat! You have revealed ${cardCount} <img src="Visual Assets/Icons/${className}.svg" alt="${className} Icon" class="console-card-icons"> ${cardText}. <span class="console-highlights">${card.name}</span> gets -${attackReduction} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
  updateGameBoard();
}


// Call whenever an attack is completed
function removeCosmicThreatBuff(cityIndex) {
    if (cityIndex === 0 && city1CosmicThreat > 0) {
        city1TempBuff += city1CosmicThreat;
        city1CosmicThreat = 0;
    } 
    else if (cityIndex === 1 && city2CosmicThreat > 0) {
        city2TempBuff += city2CosmicThreat;
        city2CosmicThreat = 0;
    } 
    else if (cityIndex === 2 && city3CosmicThreat > 0) {
        city3TempBuff += city3CosmicThreat;
        city3CosmicThreat = 0;
    } 
    else if (cityIndex === 3 && city4CosmicThreat > 0) {
        city4TempBuff += city4CosmicThreat;
        city4CosmicThreat = 0;
    } 
    else if (cityIndex === 4 && city5CosmicThreat > 0) {
        city5TempBuff += city5CosmicThreat;
        city5CosmicThreat = 0;
    }

    updateGameBoard();
}

//To go near Telepathic Probe in cardsplayedthisturn popup in script - need to fix its onscreen console log for bolding and full stop. not finished here where it switches back to attack button, also need to add abck in part of the indicator code from original.
if (card.keyword1 === "Focus" ||  card.keyword2 === "Focus" || card.keyword3 === "Focus") {
            imgElement.classList.add('clickable-card', 'telepathic-probe-active');
            imgElement.style.cursor = 'pointer';
            imgElement.style.border = '3px solid rgb(235 43 58 / 100%)';
            
            // Create attack button (hidden by default)
            const focusButton = document.createElement('div');
            focusButton.className = 'played-cards-attack-button';
            focusButton.innerHTML = `
                <span style="filter: drop-shadow(0vh 0vh 0.3vh black);">
                    <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="overlay-attack-icons">
                </span>
            `;
            focusButton.style.display = 'none';
            focusIndicator.appendChild(focusButton);

            // Indicator click handler
            focusIndicator.addEventListener('click', (e) => {
                e.stopPropagation();
                let focusCost = recalculateVillainAttack(topCard);

                // Calculate available attack points
                let playerRecruitPoints = totalRecruitPoints;
            
                // Toggle attack button visibility
                if (playerRecruitPoints >= focusCost) {
                    focusButton.style.display = focusButton.style.display === 'none' ? 'block' : 'none';
                } else {
                    onscreenConsole.log(`You need ${focusCost}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to activate <span class="console-highlights">${card.name}</span><span class="bold-span">'s</span> Focus ability.`);
                }
            });

            // Attack button click handler
            attackButton.addEventListener('click', async (e) => {
                e.stopPropagation();
                attackButton.style.display = 'none'; // Hide button immediately
                
                try {
                    await initiateTelepathicVillainFight(topCard, card);
                    closePlayedCardsPopup();
                } catch (error) {
                    console.error('Error handling Telepathic Probe:', error);
                    onscreenConsole.log(`Error fighting ${card.villain}`);
                }
            });

            cardContainer.appendChild(indicator);
        }


//Schemes

function risingWatersTwist() {
    stackedTwistNextToMastermind++;
  // Create a copy of the current HQ to avoid issues with changing array
  const currentHQ = [...hq];
  let heroesKOd = 0;
 
  // Check each hero in the current HQ
  for (let i = 0; i < currentHQ.length; i++) {
    const hero = currentHQ[i];
    
    // Skip empty slots
    if (!hero) continue;
    
    // Check if hero cost is equal to or less than schemeTwistCount
    if (hero.cost <= schemeTwistCount) {
      // KO the hero
      koPile.push(hero);
      heroesKOd++;
      
      // Remove from HQ
      const hqIndex = hq.indexOf(hero);
      if (hqIndex !== -1) {
        hq[hqIndex] = null;
      }
      
      // Log the KO
      onscreenConsole.log(`KO'd <span class="console-highlights">${hero.name}</span> (Cost: ${hero.cost}) from HQ.`);
      
    }
  }
  
  // Log results
  if (heroesKOd === 0) {
    onscreenConsole.log(`No Heroes in HQ cost less than or equal to the Rising Waters stack (${schemeTwistCount}).`);
  } else {
    onscreenConsole.log(`Rising Waters KO'd ${heroesKOd} Hero${heroesKOd !== 1 ? 'es' : ''} from the HQ.`);
  }
  
  updateGameBoard();
}

function pullRealityIntoTheNegativeZoneTwist() {
    if (schemeTwistCount === 2 || schemeTwistCount === 4 ||schemeTwistCount === 6) {
        negativeZoneAttackAndRecruit = true;
        } else {
            negativeZoneAttackAndRecruit = false;
            }
        updateGameBoard();
        }
        
function invincibleForceField() {
    stackedTwistNextToMastermind++;
    const mastermind = getSelectedMastermind();
    invincibleForceField++;
    onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> now has ${invincibleForceField} Force Field${invincibleForceField === 1 ? '' : 's'}.`);
    updateGameBoard();
}

async function batheEarthInCosmicRaysTwist() {
    return new Promise((resolve) => {
        // Build an array of eligible (non-grey) heroes you can access later
        const COLOURS = new Set(['Green', 'Yellow', 'Black', 'Blue', 'Red']);
        const eligibleCards = playerHand.filter(
            c => c && COLOURS.has(String(c.color || '').trim())
        );

        if (eligibleCards.length === 0) {
            console.log("No eligible coloured cards in hand (Green/Yellow/Black/Blue/Red).");
            onscreenConsole.log("No non-grey Heroes available to KO.");
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
        document.getElementById('close-choice-button').style.display = 'none';

        // Initialise UI
        popupTitle.textContent = 'Scheme Twist';
        instructionsDiv.innerHTML = 'Select a non-grey Hero to KO from your hand. You will then be able to choose a Hero from the HQ with the same or lower cost and put it into your hand.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Return Card';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';
        document.getElementById('close-choice-button').style.display = 'none';

        let selectedCard = null;
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (selectedCard === null) {
                instructionsDiv.innerHTML = 'Select a non-grey Hero to KO from your hand. You will then be able to choose a Hero from the HQ with the same or lower cost and put it into your hand.';
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

        function toggleCardSelection(card, listItem) {
            if (selectedCard === card) {
                selectedCard = null;
                listItem.classList.remove('selected');
                updateHeroImage(null);
            } else {
                const prevListItem = document.querySelector('li.selected');
                if (prevListItem) prevListItem.classList.remove('selected');
                selectedCard = card;
                listItem.classList.add('selected');
                updateHeroImage(card);
            }
            updateConfirmButton();
            updateInstructions();
        }

        // Sort & render only the eligible (non-grey) cards
        // If genericCardSort sorts in-place, pass the array directly.
        genericCardSort(eligibleCards);

        eligibleCards.forEach((card) => {
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
                console.log('Card returned to the top of the deck:', selectedCard);

                // Find the selected card's current index in the *actual* hand
                const indexInHand = playerHand.findIndex(c => c && c.id === selectedCard.id);
                if (indexInHand !== -1) {
                    // Remove the card from the player's hand
                    playerHand.splice(indexInHand, 1);
                }

                koPile.push(selectedCard);
		onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`);
		koBonuses();
                closePopup();
                updateGameBoard();
		await cosmicRaysRecruit(selectedCard.cost);
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

async function cosmicRaysRecruit(maxCost) {
    return new Promise((resolve) => {
        // Filter HQ for eligible recruits
        const eligibleHQ = (hq || []).filter(c =>
  c && c.type === 'Hero' && Number.isFinite(c.cost) && c.cost <= maxCost
);

        if (eligibleHQ.length === 0) {
            console.log(`No HQ Heroes with cost ≤ ${maxCost}.`);
            onscreenConsole.log(`No Heroes in the HQ with ${maxCost} or less cost.`);
            updateGameBoard();
            resolve();
            return;
        }

        // --- Popup wiring (same scaffold as your twist function) ---
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
        const closeBtn = document.getElementById('close-choice-button');

        if (closeBtn) closeBtn.style.display = 'none';
        popupTitle.textContent = 'Scheme Twist';
        instructionsDiv.innerHTML = `Choose a Hero from the HQ with ${maxCost} or less cost to put into your hand.`;
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Recruit';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCard = null;
        let activeImage = null;

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

        function updateConfirmButton() {
            confirmButton.disabled = selectedCard === null;
        }

        function updateInstructions() {
            if (!selectedCard) {
                instructionsDiv.innerHTML = `Choose a Hero from the HQ with ${maxCost} or less cost to put into your hand.`;
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be gained and put in your hand.`;
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

        function toggleCardSelection(card, li) {
            if (selectedCard === card) {
                selectedCard = null;
                li.classList.remove('selected');
                updateHeroImage(null);
            } else {
                const prev = cardsList.querySelector('li.selected');
                if (prev) prev.classList.remove('selected');
                selectedCard = card;
                li.classList.add('selected');
                updateHeroImage(card);
            }
            updateConfirmButton();
            updateInstructions();
        }

        // Render eligible HQ cards
        eligibleHQ.forEach(card => {
            const li = document.createElement('li');
            const teamIcon = createTeamIconHTML(card.team);
            const class1Icon = createClassIconHTML(card.class1);
            const class2Icon = createClassIconHTML(card.class2);
            const class3Icon = createClassIconHTML(card.class3);

            li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name} (Cost ${card.cost})</span>`;
            li.setAttribute('data-card-id', card.id ?? card.uniqueId ?? '');
            li.onmouseover = () => { if (!activeImage) { heroImage.src = card.image; heroImage.style.display = 'block'; oneChoiceHoverText.style.display = 'none'; } };
            li.onmouseout  = () => { if (!activeImage) { heroImage.src = ''; heroImage.style.display = 'none'; oneChoiceHoverText.style.display = 'block'; } };
            li.onclick = () => toggleCardSelection(card, li);

            cardsList.appendChild(li);
        });

        confirmButton.onclick = async () => {
            if (!selectedCard) return;

            // Remove from HQ
            const idx = hq.findIndex(c =>
                (c && (c.id ?? c.uniqueId)) === (selectedCard.id ?? selectedCard.uniqueId)
            );
            if (idx !== -1) {
                hq.splice(idx, 1);
            }

    const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
    hq[hqIndex] = newCard;
    
    if (newCard) {
        onscreenConsole.log(`<span class="console-highlights">${newCard.name}</span> has entered the HQ.`);
    } 

addHRToTopWithInnerHTML();
    
    if (!hq[hqIndex] && heroDeck.length === 0) {
        heroDeckHasRunOut = true;
    }

            // Add to hand
            playerHand.push(selectedCard);
	playSFX('recruit');
            onscreenConsole.log(`<span class="console-highlights">${selectedCard.name}</span> gained and put in your hand.`);



            // Cleanup UI
            closePopup();
            updateGameBoard();
            resolve();
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.style.display = 'none';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;
            if (closeBtn) closeBtn.style.display = ''; // restore default for future modals
            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
            cardsList.innerHTML = '';
        }
    });
}


//Masterminds

function galactusMasterStrike() {
    // Find the first non-destroyed space starting from the front
    for (let i = 0; i < destroyedSpaces.length; i++) {
        if (!destroyedSpaces[i]) {
            // Destroy this space
            destroyedSpaces[i] = true;
            onscreenConsole.log(`<span class="console-destruction">${citySpaceLabels[i]} is destroyed!</span>`);
            
            // Any villain at this space immediately escapes
            if (city[i] !== null) {
                const escapedVillain = city[i];
                city[i] = null;
                removeCosmicThreatBuff(i);
                
                // Show escape popup
                setTimeout(async () => {
                    await new Promise(resolve => {
                        showPopup('Villain Escape', escapedVillain, resolve);
                    });
                    await handleVillainEscape(escapedVillain);
                    addHRToTopWithInnerHTML();
                }, 500);
            }
            updateGameBoard();
            return; // Exit after destroying one space
        }
    }
    
    // If we get here, all spaces are already destroyed
    onscreenConsole.log("<span class='console-destruction'>The entire city has been destroyed!</span>");
}

// Function to get the effective front index (first non-destroyed space)
function getEffectiveFrontIndex() {
    for (let i = 0; i < destroyedSpaces.length; i++) {
        if (!destroyedSpaces[i]) {
            return i;
        }
    }
    return -1; // All spaces destroyed
}

async function galactusCosmicEntity() {
    return new Promise((resolve) => {
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const listContainer = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
        const closeBtn = document.getElementById('close-choice-button');

        // --- Constants & helpers
        const CLASSES = ['Strength', 'Instinct', 'Covert', 'Tech', 'Range'];

        const cardsPool = [
            ...playerHand,
            ...cardsPlayedThisTurn.filter(c => !c?.isCopied && !c?.sidekickToDestroy)
        ];

        const cardHasClass = (card, cls) =>
            !!card && (card.class1 === cls || card.class2 === cls || card.class3 === cls);

        const countsByClass = {};
        for (const cls of CLASSES) {
            countsByClass[cls] = cardsPool.reduce((acc, c) => acc + (cardHasClass(c, cls) ? 1 : 0), 0);
        }

        // --- Local UI state
        let selectedClass = null;
        let selectedQty = null;
        let phase = 'chooseClass'; // or 'chooseQuantity'

        // --- UI: initialise for this modal mode
        if (closeBtn) closeBtn.style.display = 'none'; // hide cancel for this flow
        if (heroImage) { heroImage.src = ''; heroImage.style.display = 'none'; }
        if (oneChoiceHoverText) oneChoiceHoverText.style.display = 'block';

        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';

        popupTitle.textContent = 'Mastermind Tactic';
        instructionsDiv.textContent = 'Select a class. You may reveal any number of cards of that class, then draw that many cards.';

        listContainer.innerHTML = '';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        // --- Render helpers
        const clearList = () => { listContainer.innerHTML = ''; };

        function renderClassButtons() {
            phase = 'chooseClass';
            selectedClass = null;
            selectedQty = null;
            confirmButton.disabled = true;
            popupTitle.textContent = 'Mastermind Tactic';
            instructionsDiv.textContent = 'Select a class. You may reveal any number of cards of that class, then draw that many cards.';
            clearList();

            CLASSES.forEach(cls => {
                const count = countsByClass[cls] || 0;
                const li = document.createElement('li');
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = `<img src="Visual Assets/Icons/${cls}.svg" alt="${cls} Icon" class="console-card-icons"> — Up to ${count} card${count === 1 ? '' : 's'} to reveal`;
                btn.onclick = () => {
                    selectedClass = cls;
                    selectedQty = null;
                    // If you want to prevent moving forward when count is 0, keep confirm disabled.
                    // Otherwise, allow continuing (and show no quantity options).
                    confirmButton.disabled = false;
                    instructionsDiv.textContent = `Selected: <img src="Visual Assets/Icons/${cls}.svg" alt="${cls} Icon" class="console-card-icons">. Press Confirm to choose how many cards to reveal (up to ${count}).`;
                };
                li.appendChild(btn);
                listContainer.appendChild(li);
            });
        }

        function renderQuantityButtons(max) {
            phase = 'chooseQuantity';
            selectedQty = null;
            confirmButton.disabled = true;
            popupTitle.textContent = `How many <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards to reveal?`;
            clearList();

            if (max <= 0) {
                instructionsDiv.textContent = `You have 0 <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards. Confirm to reveal none (0).`;
                confirmButton.disabled = false;
                selectedQty = 0;
                return;
            }

            instructionsDiv.textContent = `Select how many <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards you wish to reveal.`;
            for (let n = max; n >= 1; n--) {
                const li = document.createElement('li');
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = `${n}`;
                btn.onclick = () => {
                    selectedQty = n;
                    confirmButton.disabled = false;
                    instructionsDiv.textContent = `Reveal ${n} <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> card${n === 1 ? '' : 's'}. Press Confirm to proceed.`;
                };
                li.appendChild(btn);
                listContainer.appendChild(li);
            }

            // Optional: include a "0" option explicitly
            // const li0 = document.createElement('li');
            // const btn0 = document.createElement('button');
            // btn0.type = 'button';
            // btn0.textContent = '0 (none)';
            // btn0.onclick = () => { selectedQty = 0; confirmButton.disabled = false; instructionsDiv.textContent = `Reveal 0 <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards. Press Confirm to proceed.`; };
            // li0.appendChild(btn0);
            // listContainer.appendChild(li0);
        }

        // --- Wire confirm behaviour for both phases
        confirmButton.onclick = async () => {
            if (phase === 'chooseClass') {
                if (!selectedClass) return;
                const max = countsByClass[selectedClass] || 0;
                renderQuantityButtons(max);
                return;
            }

            if (phase === 'chooseQuantity') {
                if (selectedQty == null) return;

                // Perform the extra draws
                for (let i = 0; i < selectedQty; i++) {
                    if (typeof extraDraw === 'function') extraDraw();
                }

                // Cleanup & restore popup to "normal" default state
                if (typeof closePopup === 'function') closePopup();
                // Make sure to reset any tweaks we made so future popups behave normally
                try {
                    // Reset content
                    listContainer.innerHTML = '';
                    instructionsDiv.textContent = '';
                    popupTitle.textContent = '';

                    // Restore visibility defaults
                    if (heroImage) { heroImage.src = ''; heroImage.style.display = 'none'; }
                    if (oneChoiceHoverText) oneChoiceHoverText.style.display = 'block';
                    if (closeBtn) closeBtn.style.display = ''; // show default close for future uses

                    // Reset confirm button
                    confirmButton.textContent = 'Confirm';
                    confirmButton.disabled = true;

                    // Hide overlay/popup in case closePopup didn't do it
                    modalOverlay.style.display = 'none';
                    popup.style.display = 'none';
                } catch (e) {
                    // swallow any minor UI reset errors
                }

                // Update board & resolve
                updateGameBoard();
                resolve();
            }
        };

        // Initial render
        renderClassButtons();
    });
}


async function galactusPanickedMobs() {
    return new Promise((resolve) => {
        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const listContainer = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
        const closeBtn = document.getElementById('close-choice-button');

        // --- Constants & helpers
        const CLASSES = ['Strength', 'Instinct', 'Covert', 'Tech', 'Range'];

        const cardsPool = [
            ...playerHand,
            ...cardsPlayedThisTurn.filter(c => !c?.isCopied && !c?.sidekickToDestroy)
        ];

        const cardHasClass = (card, cls) =>
            !!card && (card.class1 === cls || card.class2 === cls || card.class3 === cls);

        const countsByClass = {};
        for (const cls of CLASSES) {
            countsByClass[cls] = cardsPool.reduce((acc, c) => acc + (cardHasClass(c, cls) ? 1 : 0), 0);
        }

        // --- Local UI state
        let selectedClass = null;
        let selectedQty = null;
        let phase = 'chooseClass'; // or 'chooseQuantity'

        // --- UI: initialise for this modal mode
        if (closeBtn) closeBtn.style.display = 'none'; // hide cancel for this flow
        if (heroImage) { heroImage.src = ''; heroImage.style.display = 'none'; }
        if (oneChoiceHoverText) oneChoiceHoverText.style.display = 'block';

        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Confirm';

        popupTitle.textContent = 'Mastermind Tactic';
        instructionsDiv.textContent = 'Select a class. You may reveal any number of cards of that class, then rescue that many Bystanders.';

        listContainer.innerHTML = '';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        // --- Render helpers
        const clearList = () => { listContainer.innerHTML = ''; };

        function renderClassButtons() {
            phase = 'chooseClass';
            selectedClass = null;
            selectedQty = null;
            confirmButton.disabled = true;
            popupTitle.textContent = 'Mastermind Tactic';
            instructionsDiv.textContent = 'Select a class. You may reveal any number of cards of that class, then rescue that many Bystanders.';
            clearList();

            CLASSES.forEach(cls => {
                const count = countsByClass[cls] || 0;
                const li = document.createElement('li');
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = `<img src="Visual Assets/Icons/${cls}.svg" alt="${cls} Icon" class="console-card-icons"> — Up to ${count} card${count === 1 ? '' : 's'} to reveal`;
                btn.onclick = () => {
                    selectedClass = cls;
                    selectedQty = null;
                    // If you want to prevent moving forward when count is 0, keep confirm disabled.
                    // Otherwise, allow continuing (and show no quantity options).
                    confirmButton.disabled = false;
                    instructionsDiv.textContent = `Selected: <img src="Visual Assets/Icons/${cls}.svg" alt="${cls} Icon" class="console-card-icons">. Press Confirm to choose how many cards to reveal (up to ${count}).`;
                };
                li.appendChild(btn);
                listContainer.appendChild(li);
            });
        }

        function renderQuantityButtons(max) {
            phase = 'chooseQuantity';
            selectedQty = null;
            confirmButton.disabled = true;
            popupTitle.textContent = `How many <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards to reveal?`;
            clearList();

            if (max <= 0) {
                instructionsDiv.textContent = `You have 0 <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards. Confirm to reveal none (0).`;
                confirmButton.disabled = false;
                selectedQty = 0;
                return;
            }

            instructionsDiv.textContent = `Select how many <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards you wish to reveal.`;
            for (let n = max; n >= 1; n--) {
                const li = document.createElement('li');
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = `${n}`;
                btn.onclick = () => {
                    selectedQty = n;
                    confirmButton.disabled = false;
                    instructionsDiv.textContent = `Reveal ${n} <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> card${n === 1 ? '' : 's'}. Press Confirm to proceed.`;
                };
                li.appendChild(btn);
                listContainer.appendChild(li);
            }

            // Optional: include a "0" option explicitly
            // const li0 = document.createElement('li');
            // const btn0 = document.createElement('button');
            // btn0.type = 'button';
            // btn0.textContent = '0 (none)';
            // btn0.onclick = () => { selectedQty = 0; confirmButton.disabled = false; instructionsDiv.textContent = `Reveal 0 <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards. Press Confirm to proceed.`; };
            // li0.appendChild(btn0);
            // listContainer.appendChild(li0);
        }

        // --- Wire confirm behaviour for both phases
        confirmButton.onclick = async () => {
            if (phase === 'chooseClass') {
                if (!selectedClass) return;
                const max = countsByClass[selectedClass] || 0;
                renderQuantityButtons(max);
                return;
            }

            if (phase === 'chooseQuantity') {
                if (selectedQty == null) return;

                // Perform the extra draws
                for (let i = 0; i < selectedQty; i++) {
                    if (typeof rescueBystander === 'function') rescueBystander();
                }

                // Cleanup & restore popup to "normal" default state
                if (typeof closePopup === 'function') closePopup();
                // Make sure to reset any tweaks we made so future popups behave normally
                try {
                    // Reset content
                    listContainer.innerHTML = '';
                    instructionsDiv.textContent = '';
                    popupTitle.textContent = '';

                    // Restore visibility defaults
                    if (heroImage) { heroImage.src = ''; heroImage.style.display = 'none'; }
                    if (oneChoiceHoverText) oneChoiceHoverText.style.display = 'block';
                    if (closeBtn) closeBtn.style.display = ''; // show default close for future uses

                    // Reset confirm button
                    confirmButton.textContent = 'Confirm';
                    confirmButton.disabled = true;

                    // Hide overlay/popup in case closePopup didn't do it
                    modalOverlay.style.display = 'none';
                    popup.style.display = 'none';
                } catch (e) {
                    // swallow any minor UI reset errors
                }

                // Update board & resolve
                updateGameBoard();
                resolve();
            }
        };

        // Initial render
        renderClassButtons();
    });
}

function galactusForceOfEternity() {
        galactusForceOfEternityDraw = true;
}

function galactusForceOfEternityDiscard() {
onscreenConsole.log(`<span class="console-highlights">Galactus</span> has made you draw six additional cards. Now discard six cards.`);
    
    return new Promise(async (resolve) => {
        // Get all cards in hand (not just zero-cost)
        const availableCards = playerHand
            .filter(card => card) // Filter out any undefined/null cards
            .map((card, index) => ({ ...card, uniqueId: `${card.id}-${index}` }));

        // Handle cases where there are 6 or fewer cards available
        if (availableCards.length === 0) {
            onscreenConsole.log("No cards in hand to discard.");
            resolve();
            return;
        }

        if (availableCards.length <= 6) {
            // Discard all cards if 6 or fewer
            const returnedCards = [];
            for (const card of availableCards) {
                const indexInHand = playerHand.findIndex(c => c.id === card.id);
                if (indexInHand !== -1) {
                    playerHand.splice(indexInHand, 1);
                    const { returned } = await checkDiscardForInvulnerability(card);
                    returnedCards.push(...returned);
                }
            }
            
            // Add back any invulnerable cards
            if (returnedCards.length > 0) {
                playerHand.push(...returnedCards);
            }
            
            updateGameBoard();
            onscreenConsole.log(`Discarded ${availableCards.length} card${availableCards.length !== 1 ? 's' : ''}.`);
            resolve();
            return;
        }

        // Setup UI for selection when more than 6 cards available
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
        popupTitle.textContent = 'Mastermind Tactic!';
        instructionsDiv.textContent = 'Select six cards to discard.';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Discard';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCards = [];
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCards.length !== 6;
        }

        function updateInstructions() {
            if (selectedCards.length < 6) {
                instructionsDiv.textContent = `Select ${6 - selectedCards.length} more card${selectedCards.length === 2 ? '' : 's'} to discard.`;
            } else {
                const namesList = selectedCards.map(card => 
                    `<span class="console-highlights">${card.name}</span>`
                ).join(', ');
                instructionsDiv.innerHTML = `Selected: ${namesList} will be discarded.`;
            }
        }

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

        function toggleCardSelection(card, listItem) {
            const index = selectedCards.findIndex(c => c.uniqueId === card.uniqueId);
            
            if (index > -1) {
                selectedCards.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedCards.length >= 6) {
                    const firstSelected = document.querySelector(`[data-card-id="${selectedCards[0].uniqueId}"]`);
                    if (firstSelected) firstSelected.classList.remove('selected');
                    selectedCards.shift();
                }
                selectedCards.push(card);
                listItem.classList.add('selected');
            }

            updateCardImage(selectedCards[selectedCards.length - 1] || null);
            updateConfirmButton();
            updateInstructions();
        }
genericCardSort(availableCards);
        // Populate the list with available cards
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
    
    // Combine all icons
    const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
    
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

        confirmButton.onclick = async () => {
            if (selectedCards.length === 6) {
                const returnedCards = [];
                for (const card of selectedCards) {
                    const indexInHand = playerHand.findIndex(c => c.id === card.id);
                    if (indexInHand !== -1) {
                        playerHand.splice(indexInHand, 1);
                        const { returned } = await checkDiscardForInvulnerability(card);
                        returnedCards.push(...returned);
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

function galactusSunderTheEarth() {
  return new Promise((resolve) => {
    // Find all cards in discard pile that match names in HQ
    const cardsToKO = playerDiscardPile.filter(card => 
      hq.some(hqCard => hqCard.name === card.name)
    );
    
    // If no matches found, log and exit
    if (cardsToKO.length === 0) {
      console.log('No matching cards found between discard pile and HQ.');
      onscreenConsole.log('Mastermind Tactic! No cards in your discard pile have the same name as a Hero in the HQ!');
      resolve();
      return;
    }
    
    // Group cards by name for logging
    const cardCounts = {};
    cardsToKO.forEach(card => {
      cardCounts[card.name] = (cardCounts[card.name] || 0) + 1;
    });
    
    const cardNames = Object.keys(cardCounts);
    const totalCount = cardsToKO.length;
    
    // Format card names with highlights
    const highlightedCardNames = cardNames.map(name => 
      `<span class="console-highlights">${name}</span>`
    ).join(', ');
    
    // Log matches found
    onscreenConsole.log(`Mastermind Tactic! ${totalCount} card${totalCount === 1 ? '' : 's'} in your discard pile have the same name as a Hero in the HQ: ${highlightedCardNames}.`);
    
    // Remove matching cards from discard pile and add to KO pile
    for (const card of cardsToKO) {
      const index = playerDiscardPile.indexOf(card);
      if (index !== -1) {
        playerDiscardPile.splice(index, 1);
        koPile.push(card);
        // Trigger KO bonuses for each individual card
        koBonuses();
      }
    }
    
    // Format KO message with highlights
    const countMessages = Object.entries(cardCounts)
      .map(([name, count]) => `${count} <span class="console-highlights">${name}</span>${count > 1 ? 's' : ''}`)
      .join(', ');
    
    onscreenConsole.log(`KO'd ${countMessages} from discard pile.`);
    
    updateGameBoard();
    resolve();
  });
}

async function moleManMasterStrike() {
  let subterraneaVillainsEscaped = false;
  
  for (let i = 0; i < city.length; i++) {
    if (city[i] && city[i].team === "Subterranea") {
      await handleVillainEscape(city[i]);
      city[i] = null;
      removeCosmicThreatBuff(i);
      updateGameBoard();
      subterraneaVillainsEscaped = true;
    }
  }
  
  // Trigger drawWound() only once if any Subterranea villains escaped
  if (subterraneaVillainsEscaped) {
    await drawWound();
  }
}

function moleManDigToFreedom() {
        const subterraneaInVP = victoryPile.filter(card => card.alwaysLeads === "true");
    
    if (subterraneaInVP.length === 0) {
        onscreenConsole.log(`Mastermind Tactic! <span class="console-highlights">Mole Man</span> always leads your chosen Adversary group; however, there are no suitable Villain cards available in your Victory Pile.`);
        return false;
    }

    if (subterraneaInVP.length === 1) {
        // Only one Subterranean - automatically escape it
        const subterranean = subterraneaInVP[0];
        const index = victoryPile.findIndex(card => card.id === subterranean.id);
        if (index !== -1) {
onscreenConsole.log(`<span class="console-highlights">Mole Man</span> always leads your chosen Adversary group: <span class="console-highlights">${subterranean.name}</span> was the only suitable Villain in your Victory Pile. Placing in the Escape Pile now.`);
            victoryPile.splice(index, 1);
            escapedVillainsDeck.push(subterranean);
            return true;
        }
        return false;
    }

    // Multiple Subterraneans - show selection popup
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
        instructionsDiv.innerHTML = '<span class="console-highlights">Mole Man</span> always leads your chosen Adversary group: select a Villain from your Victory Pile to move to the Escaped Villians pile.';
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
                instructionsDiv.innerHTML = '<span class="console-highlights">Mole Man</span> always leads your chosen Adversary group: select a Villain from your Victory Pile to move to the Escaped Villains pile.';
            } else {
                instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be moved to the Escaped Villains pile.`;
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

subterraneaInVP.forEach((card, index) => {
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
onscreenConsole.log(`Moving <span class="console-highlights">${selectedCard.name}</span> to the Escaped Villains pile.`);

                    victoryPile.splice(indexInVP, 1);
                    escapedVillainsDeck.push(selectedCard);
		closePopup();
                updateGameBoard();
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

async function moleManMastersOfMonsters() {
    const mastermind = getSelectedMastermind();

    if (mastermind.tactics.length !== 0) {
        onscreenConsole.log(`This is not the final Tactic.`);
        
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
            onscreenConsole.log("No cards left in the Villain deck to reveal!");
            return;
        }

        // Separate Subterranea villains from other cards
        const subterraneaVillains = revealedCards.filter(card => card.team === "Subterranea");
        const otherCards = revealedCards.filter(card => card.team !== "Subterranea");

        // Play all Subterranea villains
        if (subterraneaVillains.length > 0) {
            const villainNames = subterraneaVillains.map(card => 
                `<span class="console-highlights">${card.name}</span>`
            ).join(', ');
            
            onscreenConsole.log(`Playing Subterranea Villain${subterraneaVillains.length !== 1 ? 's' : ''}: ${villainNames}.`);
            
            // Add Subterranea villains to the bottom of the villain deck to be played
            villainDeck.unshift(...subterraneaVillains);
            
            // Play all Subterranea villains
            for (let i = 0; i < subterraneaVillains.length; i++) {
                await drawVillainCard();
            }
        }

        // Handle remaining cards - shuffle and add to bottom of deck
        if (otherCards.length > 0) {
            shuffleArray(otherCards);
            
            const otherCardNames = otherCards.map(card => 
                `<span class="console-highlights">${card.name}</span>`
            ).join(', ');
            
            onscreenConsole.log(`Shuffling the other cards and placing them on the bottom of the Villain deck.`);
            
            // Add remaining cards to the bottom of the villain deck
            villainDeck.unshift(...otherCards);
        } else if (subterraneaVillains.length === 0) {
            onscreenConsole.log("No Subterranea Villains were revealed. All revealed cards have been shuffled and placed at the bottom of the Villain deck.");
        }
        
        updateGameBoard();
    } else {
        // This is the final tactic
        onscreenConsole.log(`This is the final Tactic. No effect.`);
    }
}  

function moleManSecretTunnel() {
    onscreenConsole.log(`You gain +6 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> usable only against Villains in the Streets.`);
    streetsReserveAttack += 6;
    updateGameBoard();
}

function moleManUndergroundRiches() {
    onscreenConsole.log(`You gain +6 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> usable only to recruit Heroes in the HQ space under the Streets.`);
    streetsReserveRecruit += 6;
    updateGameBoard();
}
        
//Villains

function gigantoFight() {
onscreenConsole.log(`Fight! When you draw a new hand of cards at the end of this turn, draw two extra cards.`);
nextTurnsDraw++;
nextTurnsDraw++;
updateGameBoard();
}

async function megataurAmbush(megataur) {
if (bystanderDeck.length === 0) {
onscreenConsole.log(`Ambush! There are no Bystanders left for <span class="console-highlights">Megatuar</span> to capture.`);
return;
}

if (bystanderDeck.length === 1) {
onscreenConsole.log(`Ambush! There is one Bystander left for <span class="console-highlights">Megatuar</span> to capture.`);
const bystander = bystanderDeck.pop();
const megataurIndex = city.findIndex(c => c === megataur);
await villainEffectAttachBystanderToVillain(megataurIndex, bystander);        
return;
}

if (bystanderDeck.length > 1) {
onscreenConsole.log(`Ambush! <span class="console-highlights">Megatuar</span> captures two Bystanders.`);
const bystander = bystanderDeck.pop();
const megataurIndex = city.findIndex(c => c === megataur);
await villainEffectAttachBystanderToVillain(megataurIndex, bystander);
const bystander2 = bystanderDeck.pop();        
await villainEffectAttachBystanderToVillain(megataurIndex, bystander2);
return;
}
}

function moloidsFight() {
onscreenConsole.log(`Fight! KO one of your Heroes.`);
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
koBonuses();
            
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
genericCardSort(combinedCards);
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
    
    const teamIcon = createTeamIconHTML(card.team);
    const class1Icon = createClassIconHTML(card.class1);
    const class2Icon = createClassIconHTML(card.class2);
    const class3Icon = createClassIconHTML(card.class3);
    
    // Combine all icons
    const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
    
    li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;
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

async function moveVillainFromCity1ToCity0() {
    // Check if there's a card in city[1]
    if (city[1] !== null) {
        const cardToMove = city[1];
        
        // If city[0] is destroyed (when fighting Galactus), card escapes immediately
        if (mastermind.name === "Galactus" && destroyedSpaces[0]) {
            onscreenConsole.log(`<span class="console-highlights">${cardToMove.name}</span> escapes from the Streets!`);
            await new Promise(resolve => {
                showPopup('Villain Escape', cardToMove, resolve);
            });
            await handleVillainEscape(cardToMove);
            city[1] = null;
            addHRToTopWithInnerHTML();
            return;
        }
        
        const cardAtCity0 = city[0];
        
        // Move card from city[1] to city[0]
        city[0] = cardToMove;
        city[1] = null;
        
        onscreenConsole.log(`<span class="console-highlights">${cardToMove.name}</span> moves from the Streets to the Bridge.`);
        
        // If there was a card at city[0], handle it based on game state
        if (cardAtCity0 !== null) {
            // When fighting Galactus, try to push to next available space
            if (mastermind.name === "Galactus") {
                // Try to find next available space
                let moved = false;
                for (let i = 1; i < city.length; i++) {
                    if (city[i] === null && !destroyedSpaces[i]) {
                        city[i] = cardAtCity0;
                        onscreenConsole.log(`<span class="console-highlights">${cardAtCity0.name}</span> is pushed to ${citySpaceLabels[i]}.`);
                        moved = true;
                        break;
                    }
                }
                
                // If no space found, villain escapes
                if (!moved) {
                    await new Promise(resolve => {
                        showPopup('Villain Escape', cardAtCity0, resolve);
                    });
                    await handleVillainEscape(cardAtCity0);
                    addHRToTopWithInnerHTML();
                }
            } else {
                // Standard behavior - push to escape
                await new Promise(resolve => {
                    showPopup('Villain Escape', cardAtCity0, resolve);
                });
                await handleVillainEscape(cardAtCity0);
                addHRToTopWithInnerHTML();
            }
        }
        
        // Show popup for the moved card
        await new Promise(resolve => {
            showPopup('Villain Moved', cardToMove, resolve);
        });
        addHRToTopWithInnerHTML();
        
    } else {
        onscreenConsole.log(`There is no Villain in the Streets to be moved.`);
    }
}

// Your raktarAmbush function
async function raktarAmbush(villain) {
    onscreenConsole.log(`Ambush! Any Villain in the Streets moves to the Bridge, pushing any Villain already there to escape.`);   
    
    // Use the enhanced moveVillainFromCity1ToCity0 function
    await moveVillainFromCity1ToCity0();
}

async function firelordFight() {
await FightRevealRangeOrWound();
}

async function firelordEscape() {
await EscapeRevealRangeOrWound();
}

function morgAmbush() {
onscreenConsole.log(`Ambush! Put each non-<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero from the HQ on the bottom of the Hero Deck.`);
    let heroesMovedCounter = 0;
    const nonInstinctHeroes = [];

    // First pass: identify and remove non-Instinct heroes from HQ
    for (let i = hq.length - 1; i >= 0; i--) {
        if (hq[i] && hq[i].type === "Hero") {
            const hero = hq[i];
            const hasInstinct = hero.class1 === "Instinct" || 
                               hero.class2 === "Instinct" || 
                               hero.class3 === "Instinct";
            
            if (!hasInstinct) {
                nonInstinctHeroes.push(hq.splice(i, 1)[0]);
                heroesMovedCounter++;
            }
        }
    }

    // Put non-Instinct heroes at the bottom of heroDeck (index 0)
    if (nonInstinctHeroes.length > 0) {
        heroDeck.unshift(...nonInstinctHeroes);
    }

    // Fill empty HQ spaces with new heroes from top of deck
    for (let i = 0; i < 5; i++) {
        if (!hq[i] && heroDeck.length > 0) {
            hq[i] = heroDeck.pop();
        }
    }

    if (heroesMovedCounter > 0) {
        const cardText = heroesMovedCounter === 1 ? 'Hero' : 'Heroes';
        onscreenConsole.log(`Moved ${heroesMovedCounter} non-<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> ${cardText} to the bottom of hero deck.`);
    } else {
        onscreenConsole.log('No non-<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Heroes found in the HQ.');
    }

    updateGameBoard(); // Update game board after changes
}


function stardustFight() {
onscreenConsole.log(`Fight! Choose one of your <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Heroes to add to next turn's draw as a seventh card.`);
return new Promise((resolve) => {
        const cardsYouHave = [
            ...playerHand,
            ...cardsPlayedThisTurn.filter(card => 
                !card.isCopied && 
                !card.sidekickToDestroy
            )
        ];
        
        const CovertCardsYouHave = cardsYouHave.filter(item => 
    item.type === "Hero" && (
        item.class1 === "Covert" || 
        item.class2 === "Covert" || 
        item.class3 === "Covert"
    )
);

        if (CovertCardsYouHave.length === 0) {
            console.log('No available Covert Heroes.');
            onscreenConsole.log(`You do not have any <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='console-card-icons'> Heroes to add to next turn's draw.`);
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
        popupTitle.textContent = 'FIGHT!';
        instructionsDiv.innerHTML = `Choose one of your <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='card-icons'> Heroes to add to next turn's draw.`;
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
                instructionsDiv.innerHTML = `Choose one of your <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='card-icons'> Heroes to add to next turn's draw.`;
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
genericCardSort(CovertCardsYouHave);
        // Populate the list with eligible heroes
        CovertCardsYouHave.forEach((card, index) => {
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
    
    // Combine all icons
    const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
    
    li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name} (${location})</span>`;            

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
                selectedCard.markedToDrawNextTurn = true;
                
                console.log(`${selectedCard.name} has been reserved for next turn.`);
                onscreenConsole.log(`You have selected <span class="console-highlights">${selectedCard.name}</span> to be added to your next draw as a seventh card.`);

                closePopup();
                CovertCardsYouHave = [];
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

async function terraxTheTamerAmbush(terrax) {
    onscreenConsole.log(`Ambush! For each <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero in the HQ, <span class="console-highlight">Terrax the Tamer</span> captures a Bystander.`);
    
    const strengthCardsInHQCount = hq.filter(card => 
        card && (
            card.class1 === "Strength" || 
            card.class2 === "Strength" || 
            card.class3 === "Strength"
        )
    ).length;
    
    let strengthHQText = "Heroes";
    if (strengthCardsInHQCount === 1) {
        strengthHQText = "Hero";
    }
    
    onscreenConsole.log(`The HQ contains ${strengthCardsInHQCount} <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> ${strengthHQText}. <span class="console-highlight">Terrax the Tamer</span> will capture that many Bystanders.`);

    const terraxIndex = city.findIndex(c => c === terrax);
    let bystandersCaptured = 0;

    // Loop for each Strength hero found, but don't exceed bystander deck size
    for (let i = 0; i < strengthCardsInHQCount; i++) {
        if (bystanderDeck.length === 0) {
            onscreenConsole.log(`No more Bystanders left to capture!`);
            break;
        }
        
        const bystander = bystanderDeck.pop(); // Added parentheses to call pop()
        await villainEffectAttachBystanderToVillain(terraxIndex, bystander);
        bystandersCaptured++;
        
        // Optional: add a small delay between captures for visual effect
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    if (bystandersCaptured > 0) {
        const bystanderText = bystandersCaptured === 1 ? 'Bystander' : 'Bystanders';
        onscreenConsole.log(`<span class="console-highlight">Terrax the Tamer</span> captured ${bystandersCaptured} ${bystanderText}!`);
    } else {
        onscreenConsole.log(`No Bystanders were captured.`);
    }
}

//Heroes - Variables Done

function humanTorchCallForBackup() {
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
        context.innerHTML = `Select a Wound to KO and gain +1<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'>.`;
        discardPileList.innerHTML = '';
        handList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'KO Wound';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        // Set image
        KOImage.src = "Visual Assets/Heroes/humanTorchCallForBackup.webp";
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
                context.innerHTML = `Select a Wound to KO and gain +1<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'>`;
            } else {
                context.innerHTML = `Selected: <span class="console-highlights">${selectedWound.name}</span> will be KO'd from your ${selectedLocation} to gain +1<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'>.`;
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
                totalRecruitPoints += 1;
                cumulativeRecruitPoints += 1;

                onscreenConsole.log(`You KO'd a <span class="console-highlights">${selectedWound.name}</span> from your ${selectedLocation}. +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
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
    
function humanTorchHothead() {
    drawWound();
}
    
function humanTorchNovaFlame() {
    onscreenConsole.log(`<img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
    
    let villainsInCityCount = 0;
    
    city.forEach((card, index) => {
        if (card && card.type === 'Villain') {  
            villainsInCityCount++;
        }
    });

    totalAttackPoints += villainsInCityCount;
    cumulativeAttackPoints += villainsInCityCount;

    onscreenConsole.log(`There ${villainsInCityCount === 1 ? 'is' : 'are'} ${villainsInCityCount} Villain${villainsInCityCount === 1 ? '' : 's'} in the city. ${villainsInCityCount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

villainsInCityCount = 0;

updateGameBoard();
}

function humanTorchFlameOn() {
onscreenConsole.log(`Focus! You have spent 6 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain 4 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

totalRecruitPoints -= 6;
totalAttackPoints += 4;
cumulativeAttackPoints += 4;

updateGameBoard();

}

function invisibleWomanDisappearingAct() {
onscreenConsole.log(`Focus! You have spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to KO a card from your hand or discard pile.`);

totalRecruitPoints -= 2;

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
genericCardSort(playerDiscardPile);
        // Populate discard pile
        playerDiscardPile.forEach((card) => {
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
genericCardSort(playerHand);
        // Populate hand
        playerHand.forEach((card) => {
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

updateGameBoard();

}

function invisibleWomanFourOfAKind() {
        let fourCostCount = 0;
  const playedCards = cardsPlayedThisTurn.slice(0, -1);
let fourCostText = "Heroes";

  playedCards.forEach(card => {
    if (card.cost === 4) {
      fourCostCount++;
    }
  });

if (fourCostCount === 1) {
fourCostText = "Hero";
} else {
fourCostText = "Heroes";
}

if (fourCostCount > 0) {
totalAttackPoints += 2;
onscreenConsole.log(`Special Ability: You have played ${fourCostCount} ${fourCostText} that cost <b>4</b> <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
} else {
onscreenConsole.log(`Special Ability: You have not played any other Heroes that cost <b>4</b> <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. No <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
}
 updateGameBoard();
}

async function invisibleWomanUnseenRescue() {
        if (unseenRescueBystanders >= 4) {
                onscreenConsole.log(`Focus! You have already used this ability four times.`);
                return;
                }

onscreenConsole.log(`Focus! You have spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to rescue a Bystander.`);
totalRecruitPoints -= 2;
await rescueBystander();
unseenRescueBystanders++;

updateGameBoard();
}

function invisibleWomanInvisibleBarrier() {
        onscreenConsole.log(`You revealed <span class="console-highlights">Invisible Woman - Invisible Barrier</span>, preventing an ambush and allowing you to draw two cards!`);
        extraDraw();
        extraDraw();
        updateGameBoard();
}

function canRevealInvisibleWomanInvisibleBarrier() {
    const cardsYouHave = [
        ...playerHand,
        ...cardsPlayedThisTurn.filter(card => !card.isCopied && !card.sidekickToDestroy)
    ];
    return cardsYouHave.some(c => c && c.name === 'Invisible Woman - Invisible Barrier');
}

// --- Popup flow to optionally negate a villain's Ambush effect
function promptNegateAmbushEffectWithInvisibleWoman() {
    const INVISIBLE_WOMAN_IMAGE = 'Visual Assets/Heroes/Fantastic_Four_InvisibleWoman_InvisibleBarrier.webp';

    return new Promise((resolve) => {
        // If player cannot reveal, immediately resolve "no negate"
        if (!canRevealInvisibleWomanInvisibleBarrier()) {
            resolve(false);
            return;
        }

        setTimeout(() => {
            const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                "Would you like to use <span class='console-highlights'>Invisible Woman – Invisible Barrier</span> to cancel this Ambush effect and draw two cards instead?",
                "Yes",
                "No"
            );

            const hoverEl = document.getElementById('heroAbilityHoverText');
            if (hoverEl) hoverEl.style.display = 'none';

            const cardImage = document.getElementById('hero-ability-may-card');
            if (cardImage) {
                cardImage.src = INVISIBLE_WOMAN_IMAGE;
                cardImage.style.display = 'block';
            }

            confirmButton.onclick = () => {
                onscreenConsole.log("<span class='console-highlights'>Invisible Woman – Invisible Barrier</span> used to cancel an Ambush. Drawing two cards isntead.");
                hideHeroAbilityMayPopup();
                if (hoverEl) hoverEl.style.display = 'block';
                if (cardImage) cardImage.style.display = 'none';
		invisibleWomanInvisibleBarrier();
                resolve(true); // negate
            };

            denyButton.onclick = () => {
                onscreenConsole.log("You chose not to cancel an Ambush using <span class='console-highlights'>Invisible Woman – Invisible Barrier</span>.");
                hideHeroAbilityMayPopup();
                if (hoverEl) hoverEl.style.display = 'block';
                if (cardImage) cardImage.style.display = 'none';
                resolve(false); // do not negate
            };
        }, 10);
    });
}

function mrFantasticTwistingEquations() {
onscreenConsole.log(`Focus! You have spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to draw an extra card next turn.`);
totalRecruitPoints -= 2;
nextTurnsDraw++;
updateGameBoard();
}

function mrFantasticUnstableMolecules() {
extraDraw();
extraDraw();
}

function mrFantasticOneGiganticHand() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`You have ${playerHand.length} card${playerHand.length === 1 ? '' : 's'} in your hand. +${playerHand.length}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

totalAttackPoints += playerHand.length;
cumulativeAttackPoints += playerHand.length;

updateGameBoard();
}

function mrFantasticUltimateNullifier() {
onscreenConsole.log(`Focus! You have spent 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, giving you +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> usable only against the Mastermind.`);
totalRecruitPoints -= 1;
mastermindTempBuff--;
updateGameBoard();
}

function canRevealMrFantasticUltimateNullifier() {
    const cardsYouHave = [
        ...playerHand,
        ...cardsPlayedThisTurn.filter(card => !card.isCopied && !card.sidekickToDestroy)
    ];
    return cardsYouHave.some(c => c && c.name === 'Mr. Fantastic - Ultimate Nullifier');
}

function promptNegateFightEffectWithMrFantastic() {
    const MR_FANTASTIC_IMAGE = 'Visual Assets/Heroes/Fantastic_Four_MrFantastic_UltimateNullifier.webp';

    return new Promise((resolve) => {
        // Safety: if player cannot reveal, immediately resolve "no negate"
        if (!canRevealMrFantasticUltimateNullifier()) {
            resolve(false);
            return;
        }

        setTimeout(() => {
            const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                "<span class='console-highlights'>Mr. Fantastic – Ultimate Nullifier</span> allows you to cancel this fight effect. Would you like to?",
                "Yes",
                "No"
            );

            const hoverEl = document.getElementById('heroAbilityHoverText');
            if (hoverEl) hoverEl.style.display = 'none';

            const cardImage = document.getElementById('hero-ability-may-card');
            if (cardImage) {
                cardImage.src = MR_FANTASTIC_IMAGE;
                cardImage.style.display = 'block';
            }

            confirmButton.onclick = () => {
                onscreenConsole.log(`<span class="console-highlights">Mr. Fantastic – Ultimate Nullifier</span> used to cancel a fight effect.`);
                hideHeroAbilityMayPopup();
                if (hoverEl) hoverEl.style.display = 'block';
                if (cardImage) cardImage.style.display = 'none';
                resolve(true); // negate
            };

            denyButton.onclick = () => {
                onscreenConsole.log(`You chose not to cancel a fight effect using <span class="console-highlights">Mr. Fantastic – Ultimate Nullifier</span>.`);
                hideHeroAbilityMayPopup();
                if (hoverEl) hoverEl.style.display = 'block';
                if (cardImage) cardImage.style.display = 'none';
                resolve(false); // do not negate
            };
        }, 10);
    });
}

function thingItStartedOnYancyStreet() {
        onscreenConsole.log(`<img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
    onscreenConsole.log(`+2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
    totalRecruitPoints += 2;
cumulativeRecruitPoints += 2;
updateGameBoard();
}

function thingKnuckleSandwich() {
        onscreenConsole.log(`Focus! You have spent 3 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain 2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
       totalRecruitPoints -= 3;
totalAttackPoints += 2;
cumulativeAttackPoints += 2;
updateGameBoard();
}

function thingCrimeStopper() {
onscreenConsole.log(`Whenever you defeat a Villain in the Bank this turn, rescue a Bystander.`);
thingCrimeStopperRescue = true;
updateGameBoard();            
}

function thingCrimeStopperFocus() {
onscreenConsole.log(`Focus! You have spent 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to move a Villain to an adjacent city space.`);
totalRecruitPoints -= 1;
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

function thingItsClobberinTime() {
    onscreenConsole.log(`<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
    const previousCards = cardsPlayedThisTurn.slice(0, -1);

    // Filter for cards that have "Strength" in any class attribute
    const StrengthCount = previousCards.filter(item => 
        item.class1 === "Strength" || 
        item.class2 === "Strength" || 
        item.class3 === "Strength"
    ).length;
    
    let StrengthText = "Heroes";  // Use let to allow reassignment

    if (StrengthCount === 1) {
        StrengthText = "Hero";  // Singular for one
    }

    onscreenConsole.log(`You have played ${StrengthCount} <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> ${StrengthText}. +${StrengthCount * 3}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
    
    bonusAttack();
    updateGameBoard();
}

function silverSurferWarpSpeed() {
onscreenConsole.log(`Focus! You have spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to draw a card.`);
totalRecruitPoints -= 2;
extraDraw();
updateGameBoard();        
}

function silverSurferEpicDestiny() {
onscreenConsole.log(`Focus! You have spent 6 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to defeat a Villain with 5 or 6 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
totalRecruitPoints -= 6;
return new Promise((resolve, reject) => {
    const eligibleVillains = [];
    
    // Check city for eligible villains
    city.forEach((card, index) => {
        if (card && card.type === 'Villain') {  // Explicitly check for villain type
            const villainAttack = recalculateVillainAttack(card);
            if (villainAttack === 5 || villainAttack === 6) {  // Changed to target attack 5 or 6
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
        
        if (villainAttack === 5 || villainAttack === 6) {  // Changed to target attack 5 or 6
            console.log(`${topVillainCard.name} (from Telepathic Probe) added to the eligible villain list.`);
            eligibleVillains.push({ 
                ...topVillainCard, 
                index: 'telepathic-probe', // Special identifier for telepathic probe villains
                telepathicProbe: true,
                telepathicProbeCard: telepathicProbeCard
            });
        }
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
        } else {
            li.textContent = card.name;
        }
        
        li.setAttribute('data-card-id', card.id || 'telepathic-probe');

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

function silverSurferThePowerCosmic(){
onscreenConsole.log(`Focus! You have spent 9 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain +9 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

totalRecruitPoints -= 9;
totalAttackPoints += 9;
cumulativeAttackPoints += 9;

updateGameBoard();

}

function silverSurferEnergySurge() {
    // Store the original values for the log message
    const originalRecruit = totalRecruitPoints;
    const originalCumulative = cumulativeRecruitPoints;
    
    // Actually update the values by assigning the results
    totalRecruitPoints = totalRecruitPoints * 2;
    cumulativeRecruitPoints = cumulativeRecruitPoints * 2;
    
    onscreenConsole.log(`You had ${originalRecruit} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">. It has been doubled and you now have ${totalRecruitPoints} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);
    
    updateGameBoard();
}
