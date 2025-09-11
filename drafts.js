            if (card.keyword1 === "Focus" ||  card.keyword2 === "Focus" || card.keyword3 === "Focus") {
            imgElement.classList.add('clickable-card', 'telepathic-probe-active');
            imgElement.style.cursor = 'pointer';
            imgElement.style.border = '3px solid rgb(235 43 58 / 100%)';
            
            const focusIndicator = document.createElement('div');
            indicator.className = 'villain-indicator'; //Create a focus-villain-indicator to style
            indicator.innerHTML = `
                <span style="filter:drop-shadow(0vh 0vh 0.3vh black);">FOCUS</span>`;
            
            // Create attack button (hidden by default)
            const focusButton = document.createElement('div');
            focusButton.className = 'played-cards-attack-button'; //May need to create a focus version
            focusButton.innerHTML = `
                <span style="filter: drop-shadow(0vh 0vh 0.3vh black);">
                    <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="overlay-attack-icons"> //Check this styling
                </span>`;
            focusButton.style.display = 'none';
            focusIndicator.appendChild(focusButton);

            // Indicator click handler
            focusIndicator.addEventListener('click', (e) => {
                e.stopPropagation();
                let focusCost = //Way of getting focus cost? switch case?

                // Toggle attack button visibility
                if (totalRecruitPoints >= focusCost) {
                    focusButton.style.display = focusButton.style.display === 'none' ? 'block' : 'none';
                } else {
                    onscreenConsole.log(`You need ${focusCost}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to activate <span class="console-highlights">${card.name}</span><span class="bold-span">'s</span> Focus ability.`);
                }
            });

            // Attack button click handler
            focusButton.addEventListener('click', async (e) => {
                e.stopPropagation();
                focusButton.style.display = 'none'; // Hide button immediately
                
                //Change this section for focus functions
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
        
