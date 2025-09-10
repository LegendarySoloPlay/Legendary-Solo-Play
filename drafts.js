//Use with all the Cosmic Threat villains with multiple choices
function handleCosmicThreatChoice(card, index) {
    return new Promise((resolve) => {
        setTimeout(() => {
               
            const allRevealableCards = [
                ...playerHand,
                ...cardsPlayedThisTurn.filter(card => 
                    !card.isCopied && 
                    !card.sidekickToDestroy
                )
            ];
            
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
            
            // Calculate card counts
            const countClass1 = allRevealableCards.filter(c => 
                c.class1 === className1 || c.class2 === className1 || c.class3 === className1
            ).length;
            
            const countClass2 = allRevealableCards.filter(c => 
                c.class1 === className2 || c.class2 === className2 || c.class3 === className2
            ).length;
            
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
    // Map index to city variables
    const cityMap = {
        0: city1TempBuff,
        1: city2TempBuff, 
        2: city3TempBuff,
        3: city4TempBuff,
        4: city5TempBuff
    };
    
    const cosmicThreatBuffMap = {
    0: city1CosmicThreat,
        1: city2CosmicThreat, 
        2: city3CosmicThreat,
        3: city4CosmicThreat,
        4: city5CosmicThreat
    };
    
    // Apply to the correct city
    cityMap[index] -= attackReduction;
    cosmicThreatBuffMap[index] = attackReduction;
    
    const cardCount = attackReduction / 3;
    const cardText = cardCount === 1 ? 'card' : 'cards';
    
    onscreenConsole.log(`Cosmic Threat! You have revealed ${cardCount} <img src="Visual Assets/Icons/${className}.svg" alt="${className} Icon" class="console-card-icons"> ${cardText}. <span class="console-highlights">${card.name}</span> gets -${attackReduction} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
    
    updateGameBoard();
}

//Establish in opening of script
let city1CosmicThreat = 0;
let city2CosmicThreat = 0;
let city3CosmicThreat = 0;
let city4CosmicThreat = 0;
let city5CosmicThreat = 0;

// Call whenever an attack is completed
function removeCosmicThreatBuff() {
    
    const cosmicThreatBuffMap = {
    0: city1CosmicThreat,
        1: city2CosmicThreat, 
        2: city3CosmicThreat,
        3: city4CosmicThreat,
        4: city5CosmicThreat
    };
    
const cityMap = {
        0: city1TempBuff,
        1: city2TempBuff, 
        2: city3TempBuff,
        3: city4TempBuff,
        4: city5TempBuff
    };
    
if (cosmicThreatBuffMap[cityIndex] > 0) {
    cityMap[cityIndex] += cosmicThreatBuffMap[cityIndex];
    }
    
    updateGameBoard();
    }

