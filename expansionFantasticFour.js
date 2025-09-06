// Fantastic Four Expansion
// Pre-release
// 05/09/2025 17.45

//Heroes

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

//NEEDED - establish variable in script for numbwr of rescues, reset at end turn
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

//NEEDED - establish an if condition in handling villain draws that allows the player to reveal this card before an ambush occurs
function invisibleWomanInvisibleBarrier() {
        onscreenConsole.log(`You revealed <span class="console-highlights">Invisible Woman - Invisible Barrier</span>, preventing an ambush and allowing you to draw two cards!`);
        extraDraw();
        extraDraw();
        updateGameBoard();
}

function mrFantasticTwistingEquations() {
onscreenConsole.log(`Focus! You have spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to draw an extra card next turn.`);
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

//NEEDED - an if condition check that looks for this card and negates fight effects
function mrFantasticUltimateNullifier() {
onscreenConsole.log(`Focus! You have spent 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, giving you +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> usable only against the Mastermind.`);
mastermindTempBuff--;
updateGameBoard();
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
       totalAttackPoints += 2;
cumulativeAttackPoints += 2;
updateGameBoard();
}

//NEEDED - Add to postdefeat and check for thing variable, establish variable when game starts and turn off in end turn
function thingCrimeStopper() {
onscreenConsole.log(`Whenever you defeat a Villain in the Bank this turn, rescue a Bystander.`);
 thingCrimeStopperRescue = true;
updateGameBoard();            
}

function thingCrimeStopperFocus() {
onscreenConsole.log(`Focus! You have spent 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to move a Villain to an adjacent city space.`);

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

  const StrengthCount = previousCards.filter(item => item.class1 === "Strength").length;
  let StrengthText = "Heroes";  // Use let to allow reassignment

  if (StrengthCount === 1) {
    StrengthText = "Hero";  // Singular for one
  }

  onscreenConsole.log(`You have played ${StrengthCount} <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> ${StrengthText}. +${StrengthCount * 3}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);
  
  bonusAttack();
updateGameBoard();
}      




//Villains


//Masterminds


//Schemes

