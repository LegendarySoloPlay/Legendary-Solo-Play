// Add to Card Database:
{
    id: 17,
        name: "Bathe the Earth in Cosmic Rays",
        bystanderCount: 1,
        twistCount: 6,
        endGame: "sixNonGreyHeroesKOd",
        twistEffect: "batheEarthInCosmicRaysTwist",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3,  
variableTwist: false,
twistText: "Reveal your hand. KO one of your non-grey Heroes. Choose a Hero from the HQ with the same or lower cost and put it into your hand.",
image: "Visual Assets/Schemes/FantasticFour_batheEarthInCosmicRays.webp"
    },
    {
        id: 18,
        name: "Flood the Planet with Melted Glaciers",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "twentyNonGreyHeroesKOd",
        twistEffect: "risingWatersTwist",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: false,
        twistText: `Stack this Twist next to the Scheme as “Rising Waters.“ Then KO each Hero from the HQ whose cost is less than or equal to the number of Rising Waters in that stack.`,
        image: "Visual Assets/Schemes/FantasticFour_floodThePlanetWithMeltedGlaciers.webp"
    },
    {
        id: 19,
        name: "Invincible Force Field",
        bystanderCount: 1,
        twistCount: 7,
        endGame: "ForceField7Twists",
        twistEffect: "invincibleForceField",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3,  
variableTwist: false,
twistText: `Stack this Twist next to the Mastermind as a “Force Field.“`,
image: "Visual Assets/Schemes/FantasticFour_invincibleForceField.webp"
    },
    {
        id: 20,
        name: "Pull Reality Into the Negative Zone",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "NegativeZone7Twists",
        twistEffect: "pullRealityIntoTheNegativeZoneTwist",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: true,
twistText1: "Nothing happens yet...",
twistText2: `Until the next Twist, Enemies cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to recruit.`,
twistText3: `Reality is temporarily stabilised! Enemies once again cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit.`,
twistText4: `Until the next Twist, Enemies cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to recruit.`,
twistText5: `Reality is temporarily stabilised! Enemies once again cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit.`,
twistText6: `Until the next Twist, Enemies cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to recruit.`,
twistText7: "Evil Wins!",
twistText8: "Extra Twist. No effect.",
twistText9: "Extra Twist. No effect.",
twistText10: "Extra Twist. No effect.",
 image: "Visual Assets/Schemes/FantasticFour_pullRealityIntoTheNegativeZone.webp"
    }
    
// Schemes for Index

<li><label><input type="checkbox" data-set="Fantastic Four"/> Fantastic Four</label></li>

 <li><label><input type="checkbox" data-set="Fantastic Four"/> Fantastic Four</label></li>

  
    <hr>
            <label><input type="radio" name="scheme" value="Bathe the Earth in Cosmic Rays" data-set="Fantastic Four"> Bathe the Earth in Cosmic Rays</label>
            <label><input type="radio" name="scheme" value="Flood the Planet with Melted Glaciers" data-set="Fantastic Four"> Flood the Planet with Melted Glaciers</label>
            <label><input type="radio" name="scheme" value="Invincible Force Field" data-set="Fantastic Four"> Invincible Force Field</label>
            <label><input type="radio" name="scheme" value="Pull Reality into the Negative Zone" data-set="Fantastic Four"> Pull Reality into the Negative Zone</label>


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