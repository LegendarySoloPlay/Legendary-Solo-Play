// Add to USB DarkCity file:
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


// Function to get focus cost and ability function based on card name
function getFocusDetails(card) {
    let focusCost = 0;
    let focusFunction = null;

    switch (card.name) {
        case "Silver Surfer - The Power Cosmic":
            focusCost = 9;
            focusFunction = silverSurferThePowerCosmic;
            break;
        case "Silver Surfer - Epic Destiny":
            focusCost = 6;
            focusFunction = silverSurferEpicDestiny;
            break;
        case "Silver Surfer - Warp Speed":
            focusCost = 2;
            focusFunction = silverSurferWarpSpeed;
            break;
        case "Invisible Woman - Unseen Rescue":
            focusCost = 2;
            focusFunction = invisibleWomanUnseenRescue;
            break;
            case "Invisible Woman - Disappearing Act":
            focusCost = 2;
            focusFunction = invisibleWomanDisappearingAct;
            break;
            case "Thing - Crime Stopper":
            focusCost = 1;
            focusFunction = thingCrimeStopperFocus;
            break;
            case "Thing - Knuckle Sandwich":
            focusCost = 3;
            focusFunction = thingKnuckleSandwich;
            break;
            case "Mr. Fantastic - Ultimate Nullifier":
            focusCost = 1;
            focusFunction = mrFantasticUltimateNullifier;
            break;
            case "Mr. Fantastic - Twisting Equations":
            focusCost = 2;
            focusFunction = mrFantasticTwistingEquations;
            break;
            case "Human Torch - Flame On!":
            focusCost = 6;
            focusFunction = humanTorchFlameOn;
            break;
        // Add more cases as needed
        default:
            break;
    }

    return { focusCost, focusFunction };
}


// Refactored card creation code
if (card.keyword1 === "Focus" || card.keyword2 === "Focus" || card.keyword3 === "Focus") {
    imgElement.classList.add('clickable-card', 'telepathic-probe-active');
    imgElement.style.cursor = 'pointer';
    imgElement.style.border = '3px solid rgb(235 43 58 / 100%)';
    
// Get focus details using the switch-based function
    const { focusCost, focusFunction } = getFocusDetails(card);


    const focusIndicator = document.createElement('div');
    focusIndicator.className = 'villain-indicator';
    focusIndicator.innerHTML = `
        <span style="filter:drop-shadow(0vh 0vh 0.3vh black);">FOCUS ${focusCost}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="overlay-focus-icons"></span>`;
    
    // Create focus button (hidden by default)
    const focusButton = document.createElement('div');
    focusButton.className = 'played-cards-focus-button';
    focusButton.innerHTML = `
        <span style="filter: drop-shadow(0vh 0vh 0.3vh black);">
            <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="overlay-focus-icons">
        </span>`;
    focusButton.style.display = 'none';
    focusIndicator.appendChild(focusButton);

    
    // Indicator click handler
    focusIndicator.addEventListener('click', (e) => {
        e.stopPropagation();

        // Toggle focus button visibility
        if (totalRecruitPoints >= focusCost) {
            focusButton.style.display = focusButton.style.display === 'none' ? 'block' : 'none';
        } else {
            onscreenConsole.log(`You need ${focusCost}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to activate <span class="console-highlights">${card.name}</span><span class="bold-span">'s</span> Focus ability.`);
        }
    });

    // Focus button click handler
    focusButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        focusButton.style.display = 'none'; // Hide button immediately
        
        if (focusFunction && typeof focusFunction === 'function') {
            try {
                // Execute the focus ability
                await focusFunction(card);
            } catch (error) {
                console.error(`Error executing focus ability for ${card.name}:`, error);
            }
        } else {
            console.error(`Focus ability function not found for ${card.name}`);
        }
    });

    cardContainer.appendChild(focusIndicator);
}