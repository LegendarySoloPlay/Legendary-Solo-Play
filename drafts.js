// Function to get focus cost and ability function based on card name
function getFocusDetails(card) {
    let focusCost = 0;
    let focusFunction = null;

    switch (card.name) {
        case "Silver Surfer - The Power Cosmic":
            focusCost = 9;
            focusFunction = telepathicProbeAbility;
            break;
        case "Silver Surfer - Epic Destiny":
            focusCost = 6;
            focusFunction = psionicBlastAbility;
            break;
        case "Silver Surfer - Warp Speed":
            focusCost = 2;
            focusFunction = mentalDominationAbility;
            break;
        case "Invisible Woman - Unseen Rescue":
            focusCost = 2;
            focusFunction = precognitiveVisionAbility;
            break;
            case "Invisible Woman - Disappearing Act":
            focusCost = 2;
            focusFunction = precognitiveVisionAbility;
            break;
            case "Thing - Crime Stopper":
            focusCost = 1;
            focusFunction = precognitiveVisionAbility;
            break;
            case "Thing - Knuckle Sandwich":
            focusCost = 3;
            focusFunction = precognitiveVisionAbility;
            break;
            case "Mr. Fantastic - Ultimate Nullifier":
            focusCost = 1;
            focusFunction = precognitiveVisionAbility;
            break;
            case "Mr. Fantastic - Twisting Equations":
            focusCost = 2;
            focusFunction = precognitiveVisionAbility;
            break;
            case "Human Torch - Flame On!":
            focusCost = 6;
            focusFunction = precognitiveVisionAbility;
            break;
        // Add more cases as needed
        default:
            // Default case if no specific card is matched
            if (card.keyword1 === "Focus" || card.keyword2 === "Focus" || card.keyword3 === "Focus") {
                focusCost = card.focusCost || 2; // Default cost if not specified
                focusFunction = card.focusAbility || defaultFocusAbility;
            }
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
                // Deduct the focus cost
                totalRecruitPoints -= focusCost;
                updateRecruitPointsDisplay(); // Assume this function exists
                
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