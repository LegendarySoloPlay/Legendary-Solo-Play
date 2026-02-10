// Expansion - Guardians of the Galaxy
//10.02.26 20:45

// Global Variables

let shardSupply = 500;
let totalPlayerShards = 0;
let shardsGainedThisTurn = 0;
let playerArtifacts = [];
let grootRecruitBonus = false;
let shardsForRecruitEnabled = false;
let gamoraGodslayerOne = false;
let gamoraGodslayerTwo = false;
let boundSouls = [];
let negaBombDeck = [];
let kreeConquests = 0;
let skrullConquests = 0;

// Keywords and Other

async function uniteTheShardsMastermindRecruitShards() {
return new Promise((resolve) => {
    setTimeout(() => {
      const mastermind = getSelectedMastermind();

if (totalRecruitPoints < 2) {
        onscreenConsole.log(`You do not have enough <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain one of <span class="console-highlights">${mastermind.name}</span><span class="bold-spans">'s</span> Shards.`);
        resolve();
        return;
      }

if (!mastermind.shards || mastermind.shards === 0) {
  onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> has no Shards for you to gain.`);
    resolve();
    return;
}

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `<span class="console-highlights">${mastermind.name}</span> HAS ${mastermind.shards} SHARDS. WOULD YOU LIKE TO SPEND 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> TO GAIN ONE OF THEM?`,
        "YES",
        `NO THANKS!`,
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "UNITE THE SHARDS";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('${mastermind.image}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

     confirmButton.onclick = async function () {
          closeInfoChoicePopup();
          onscreenConsole.log(`You spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain one of <span class="console-highlights">${mastermind.name}</span><span class="bold-spans">'s</span> Shards.`);
          playSFX("shards");
          totalPlayerShards += 1;
          shardsGainedThisTurn += 1;
          mastermind.shards -= 1;
          totalRecruitPoints -= 2;
          resolve();
          updateGameBoard();
          if (mastermind.shards && mastermind.shards > 0 && totalRecruitPoints >= 2) {
            uniteTheShardsMastermindRecruitShards();
          }
      };

      denyButton.onclick = async function () {
          closeInfoChoicePopup();
          onscreenConsole.log(`You chose not to spend 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain one of <span class="console-highlights">${mastermind.name}</span><span class="bold-spans">'s</span> Shards.`);
          resolve();
      };
    }, 10);
  });
}

document
  .getElementById("player-artifact-zone")
  .addEventListener("click", openArtifactsPopup);

function openArtifactsPopup() {
  genericCardSort(playerArtifacts);

  const artifactsCardsTable = document.getElementById("artifacts-cards-window-cards");
  artifactsCardsTable.innerHTML = "";

  // Close popup when clicking outside
  const popup = document.getElementById("artifacts-cards-window");
  
  // Remove existing event listener to prevent duplicates
  const clickHandler = (e) => {
    if (e.target === popup) {
      closeArtifactsPopup();
    }
  };
  
  // Remove previous listener if it exists, then add new one
  popup.removeEventListener("click", clickHandler);
  popup.addEventListener("click", clickHandler);

  playerArtifacts.forEach((card) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "artifacts-card-container";

    const imgElement = document.createElement("img");
    imgElement.src = card.image;
    imgElement.alt = card.name;
    imgElement.classList.add("pile-card-image");

if (card.name === "Soul Gem" && card.shards && card.shards > 0) {
    const shardsOverlay = document.createElement("div");
    shardsOverlay.classList.add("artifacts-shards-class");
    shardsOverlay.innerHTML = `<span class="artifacts-shards-count">${card.shards}</span><img src="Visual Assets/Icons/Shards.svg" alt="Shards" class="villain-shards-overlay">`;
    cardContainer.appendChild(shardsOverlay);
  }

    // Apply visual effects based on usage state
    if (card.artifactAbilityUsed === true) {
      imgElement.style.opacity = "0.5";
    } else {
      imgElement.style.animation = "pulseGlowArtifact 2s infinite ease-in-out";
      
      // Make card interactive only if not used
      imgElement.classList.add("clickable-card", "telepathic-probe-active");
      imgElement.style.cursor = "default";
      imgElement.style.border = "3px solid rgb(92 60 159)"; // Fixed syntax error (semicolon to comma)
      
      // Create USE button (visible by default based on your requirements)
      const useButton = document.createElement("div");
      useButton.className = "artifacts-use-button";
      useButton.innerHTML = `
        <span style="filter: drop-shadow(0vh 0vh 0.3vh black);">
          USE
        </span>`;
      useButton.style.display = "flex"; // Changed from "none" to show immediately

      // In your click handler, update to this:
useButton.addEventListener("click", async (e) => {
  e.stopPropagation();
  e.preventDefault();
  
  const abilityFunctionName = card.unconditionalAbility;
  
  // Check if it's a function reference
  if (typeof abilityFunctionName === "function") {
    // It's already a function
    try {
      playSFX("focus");
      await closeArtifactsPopup();
      await abilityFunctionName(card);
      updateArtifactUsageState(card); // Use the helper
      updateGameBoard();
      openArtifactsPopup();
    } catch (error) {
      console.error(`Error executing ability for ${card.name}:`, error);
    }
  } 

  // Check if it's a string that should map to a function
  else if (card.artifactAbilityUsed === false && typeof abilityFunctionName === "string") {
    // Try to find the function in the global scope or your game's namespace
    const abilityFunction = window[abilityFunctionName] || 
                          abilityFunctions[abilityFunctionName]; // Using Option 1's lookup
    
    if (abilityFunction && typeof abilityFunction === "function") {
      try {
        await closeArtifactsPopup();
        await abilityFunction(card);
        updateArtifactUsageState(card); // Use the helper
        updateGameBoard();
        openArtifactsPopup();
      } catch (error) {
        console.error(`Error executing ability for ${card.name}:`, error);
      }
    } else {
      console.error(`Ability function "${abilityFunctionName}" not found for ${card.name}`);
      console.log(`Define a function named ${abilityFunctionName} or add it to abilityFunctions lookup`);
    }
  } else {
    console.error(`Invalid ability type for ${card.name}:`, abilityFunctionName);
  }
});

      cardContainer.appendChild(useButton);
    }

    cardContainer.appendChild(imgElement);
    artifactsCardsTable.appendChild(cardContainer);
  });

  // Show the popup
  popup.style.display = "block";
  const overlay = document.getElementById("played-cards-modal-overlay");
  if (overlay) {
    overlay.style.display = "block";
  }
}

// Add this helper function at the top of your file or in a utility section
function updateArtifactUsageState(card) {
  console.log("=== UPDATE ARTIFACT USAGE DEBUG ===");
  console.log("Card name:", card.name);
  console.log("gamoraGodslayerOne:", gamoraGodslayerOne);
  console.log("gamoraGodslayerTwo:", gamoraGodslayerTwo);
  
  if (card.name === "Gamora - Godslayer Blade") {
    // Special handling for Gamora
    const bothAbilitiesUsed = gamoraGodslayerOne && gamoraGodslayerTwo;
    const oneAbilityUsed = (gamoraGodslayerOne || gamoraGodslayerTwo) && !bothAbilitiesUsed;
    
    console.log("bothAbilitiesUsed:", bothAbilitiesUsed);
    console.log("oneAbilityUsed:", oneAbilityUsed);
    
    card.artifactAbilityUsed = bothAbilitiesUsed;
    card.partiallyUsed = oneAbilityUsed;
    
    console.log("Set artifactAbilityUsed to:", card.artifactAbilityUsed);
    console.log("Set partiallyUsed to:", card.partiallyUsed);
    console.log("======================");
    
    return card.artifactAbilityUsed;
  } else {
    // Standard behavior for all other artifacts
    card.artifactAbilityUsed = true;
    console.log("Non-Gamora card, set artifactAbilityUsed to true");
    console.log("======================");
    return true;
  }
}

// Function to close the Played Cards popup
async function closeArtifactsPopup() {
  document.getElementById("artifacts-cards-window").style.display = "none";
  document.getElementById("played-cards-modal-overlay").style.display = "none";
}

async function playedArtifact(card) {
  const cardIndex = playerHand.indexOf(card);
  if (cardIndex > -1) {
    playerHand.splice(cardIndex, 1);
  }
  playerArtifacts.push(card);
  playSFX("artifact");
  const secondCopy = card;
  secondCopy.markedToDestroy = true;
  cardsPlayedThisTurn.push(secondCopy);

  // Update points
  if (card.team !== "Infinity Gems") {
  totalAttackPoints += card.attack || 0;
  totalRecruitPoints += card.recruit || 0;
  cumulativeAttackPoints += card.attack || 0;
  cumulativeRecruitPoints += card.recruit || 0;
  }

  updateGameBoard();
}

function toggleArtifactsDeck() {
  const playerHand = document.getElementById('player-card-zone');
  const artifactDeck = document.getElementById('player-artifact-zone');
  const artifactDeckLabel = document.getElementById('player-artifact-label');
  const reserveAttackLabel = document.getElementById('reserveAttackPointDisplay');
  const artifactDeckImage = document.getElementById('artifact-deck-image');

  if (playerArtifacts && playerArtifacts.length > 0) {
artifactDeck.style.display = 'block';
artifactDeckLabel.style.display = 'flex';
playerHand.style.gridColumn = 'span 4';
reserveAttackLabel.style.gridColumn = 'span 1';

        artifactDeckImage.src =
        playerArtifacts[playerArtifacts.length - 1].image;
        artifactDeckImage.style.display = "flex";
        artifactDeckImage.classList.remove("card-image-back");
        artifactDeckImage.classList.add("revealed-deck-card-image");
  } else {
artifactDeck.style.display = 'none';
artifactDeckLabel.style.display = 'none';
playerHand.style.gridColumn = 'span 5';
reserveAttackLabel.style.gridColumn = 'span 2';

        artifactDeckImage.src =
        "Visual Assets/CardBack.webp";
        artifactDeckImage.style.display = "none";
        artifactDeckImage.classList.add("card-image-back");
        artifactDeckImage.classList.remove("revealed-deck-card-image");
  }
}

document
  .getElementById("player-shard-counter")
  .addEventListener("click", shardsToAttack);

function shardsToAttack() {
  return new Promise(async (resolve) => {
    // If recruit mode is enabled, first ask which resource they want
    if (shardsForRecruitEnabled) {
      const choice = await new Promise((choiceResolve) => {
        const popup = document.querySelector(".info-or-choice-popup");
        const modalOverlay = document.getElementById("modal-overlay");
        const titleEl = document.querySelector(".info-or-choice-popup-title");
        const instrEl = document.querySelector(
          ".info-or-choice-popup-instructions",
        );
        const previewEl = document.querySelector(".info-or-choice-popup-preview");
        const confirmBtn = document.getElementById("info-or-choice-popup-confirm");
        const otherBtn = document.getElementById(
          "info-or-choice-popup-otherchoice",
        );
        const noThanksBtn = document.getElementById(
          "info-or-choice-popup-nothanks",
        );
        const closeBtn = document.querySelector(
          ".info-or-choice-popup-closebutton",
        );
        closeBtn.onclick = null;
        const minimizeBtn = document.querySelector(
          ".info-or-choice-popup-minimizebutton",
        );

        // Set popup content
        titleEl.textContent = "SHARDS";
        instrEl.innerHTML = `Would you like to spend Shards for <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> or <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">?`;

        // Set shard preview
        if (previewEl) {
          previewEl.style.backgroundImage = `url('Visual Assets/Icons/Shards.svg')`;
          previewEl.style.backgroundColor = `transparent`;
          previewEl.style.border = `none`;
          previewEl.style.backgroundSize = "contain";
          previewEl.style.backgroundRepeat = "no-repeat";
          previewEl.style.backgroundPosition = "center";
        }

        // Configure buttons
        confirmBtn.textContent = "ATTACK";
        otherBtn.textContent = "RECRUIT";
        noThanksBtn.textContent = "CANCEL";

        // Show all buttons
        confirmBtn.style.display = "inline-block";
        otherBtn.style.display = "inline-block";
        noThanksBtn.style.display = "inline-block";

        closeBtn.onclick = (e) => {
          e.stopPropagation();
          closeInfoChoicePopup();
          choiceResolve("cancel");
        }

        // Button handlers
        confirmBtn.onclick = (e) => {
          e.stopPropagation();
          closeInfoChoicePopup();
          choiceResolve("attack");
        };

        otherBtn.onclick = (e) => {
          e.stopPropagation();
          closeInfoChoicePopup();
          choiceResolve("recruit");
        };

        noThanksBtn.onclick = (e) => {
          e.stopPropagation();
          closeInfoChoicePopup();
          choiceResolve("cancel");
        };

        // Show popup
        modalOverlay.style.display = "block";
        popup.style.display = "block";
      });

      // If user cancelled or chose recruit, resolve early
      if (choice === "cancel") {
        resolve();
        return;
      }

      if (choice === "recruit") {
        // Call the recruit version
        await shardsToRecruit();
        resolve();
        return;
      }
      // If attack was chosen, continue to the quantity selection
    }

    // Now proceed with the original quantity selection logic
    const popup = document.querySelector(".info-or-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const titleEl = document.querySelector(".info-or-choice-popup-title");
    const instrEl = document.querySelector(
      ".info-or-choice-popup-instructions",
    );
    const previewEl = document.querySelector(".info-or-choice-popup-preview");
    const confirmBtn = document.getElementById("info-or-choice-popup-confirm");
    const otherBtn = document.getElementById(
      "info-or-choice-popup-otherchoice",
    );
    const noThanksBtn = document.getElementById(
      "info-or-choice-popup-nothanks",
    );
    const closeBtn = document.querySelector(
      ".info-or-choice-popup-closebutton",
    );
    closeBtn.onclick = null;
    const minimizeBtn = document.querySelector(
      ".info-or-choice-popup-minimizebutton",
    );

    // Set popup content
    titleEl.textContent = "SHARDS";
    instrEl.innerHTML = `You can spend a Shard to get +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> (returning the Shard to the supply). How many Shards would you like to spend?`;

    // Set card preview background
    if (previewEl) {
      previewEl.style.backgroundImage = `none`;
      previewEl.style.backgroundColor = `transparent`;
      previewEl.style.border = `none`;
      previewEl.style.backgroundSize = "contain";
      previewEl.style.backgroundRepeat = "no-repeat";
      previewEl.style.backgroundPosition = "center";
    }

    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeInfoChoicePopup();
      resolve();
    }

    // PRESET TO 0 QUANTITY
    let chosenQty = Math.ceil(totalPlayerShards / 2);

    // SWAP BUTTON ROLES: noThanks becomes +, other becomes confirm, confirm becomes -
    noThanksBtn.textContent = "+";
    otherBtn.textContent = "CONFIRM";
    confirmBtn.textContent = "-";

    // Show all buttons
    confirmBtn.style.display = "none";
    otherBtn.style.display = "inline-block";
    noThanksBtn.style.display = "none";

    // Create slider HTML - Keep this separate from the instructions text
    const sliderHTML = `
      <div class="slider-container" style="margin: 20px 0;">
        <div class="slider-track-wrapper">
          <div class="slider-track">
            <div class="slider-fill" id="sliderFill"></div>
            <input type="range" id="shardSlider" class="shard-slider" 
                   min="0" max="${totalPlayerShards}" value="${chosenQty}" step="1">
          </div>
          <div class="shard-thumb" id="shardThumb">
            <img src="Visual Assets/Icons/Shards.svg" alt="Shard" class="shard-icon">
            <span class="thumb-value">${chosenQty}</span>
          </div>
        </div>
        <div class="slider-controls">
          <button id="sliderMinusBtn" class="slider-btn">-</button>
          <div class="slider-value-display">
            <span id="sliderValue">${chosenQty}</span> / <span>${totalPlayerShards}</span>
          </div>
          <button id="sliderPlusBtn" class="slider-btn">+</button>
        </div>
      </div>
    `;

    // Create a container for the dynamic quantity text
    const quantityTextHTML = `
      <div id="quantityTextContainer">
        You are choosing to spend ${chosenQty} ${chosenQty === 1 ? 'Shard' : 'Shards'} to get +${chosenQty} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">. 
        This will give you a total of ${totalAttackPoints + chosenQty} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.
      </div>
    `;

    // Set up the full HTML structure
    instrEl.innerHTML = `
      You can spend a Shard to get +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> (returning the Shard to the supply). How many Shards would you like to spend?
      <br><br>
      ${quantityTextHTML}
      <br><br>
      ${sliderHTML}
    `;

    // Get all elements once
    const quantityTextContainer = document.getElementById("quantityTextContainer");
    const shardSlider = document.getElementById("shardSlider");
    const shardThumb = document.getElementById("shardThumb");
    const sliderValue = document.getElementById("sliderValue");
    const sliderMinusBtn = document.getElementById("sliderMinusBtn");
    const sliderPlusBtn = document.getElementById("sliderPlusBtn");
    const sliderFill = document.getElementById("sliderFill");

    // Function to update ONLY the quantity text (not the whole slider)
    function updateQuantityText() {
      const plural = chosenQty === 1 ? "Shard" : "Shards";
      const currentAttack = totalAttackPoints;
      
      if (quantityTextContainer) {
        quantityTextContainer.innerHTML = 
          `You are choosing to spend ${chosenQty} ${plural} to get +${chosenQty} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">. 
          This will give you a total of ${currentAttack + chosenQty} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;
      }
    }

    // Function to update ONLY the slider display
    function updateSliderDisplay() {
      // Update slider value display
      if (sliderValue) sliderValue.textContent = chosenQty;
      
      // Update slider input value
      if (shardSlider) shardSlider.value = chosenQty;
      
      // Update thumb position
      if (shardSlider && shardThumb) {
        const percentage = totalPlayerShards > 0 ? (chosenQty / totalPlayerShards) * 100 : 0;
        // Adjust for thumb width (50px wide, so move back half)
        shardThumb.style.left = `calc(${percentage}%)`;
        
        // Update thumb value
        const thumbValue = shardThumb.querySelector('.thumb-value');
        if (thumbValue) thumbValue.textContent = chosenQty;
      }
      
      // Update fill
      if (sliderFill && totalPlayerShards > 0) {
        const percentage = (chosenQty / totalPlayerShards) * 100;
        sliderFill.style.width = `${percentage}%`;
      }
      
      // Update button states
      if (confirmBtn) confirmBtn.disabled = chosenQty <= 0;
      if (sliderMinusBtn) sliderMinusBtn.disabled = chosenQty <= 0;
      if (sliderPlusBtn) sliderPlusBtn.disabled = chosenQty >= totalPlayerShards;
      if (noThanksBtn) noThanksBtn.disabled = chosenQty >= totalPlayerShards;
      if (otherBtn) otherBtn.disabled = chosenQty === 0;
    }

    // Function to update everything
    function updateAllDisplays() {
      updateQuantityText();
      updateSliderDisplay();
    }

    // Set up event listeners ONCE
    if (shardSlider) {
      shardSlider.addEventListener('input', () => {
        chosenQty = parseInt(shardSlider.value);
        updateAllDisplays();
      });
    }
    
    if (sliderMinusBtn) {
      sliderMinusBtn.addEventListener('click', () => {
        if (chosenQty > 0) {
          chosenQty -= 1;
          updateAllDisplays();
        }
      });
    }
    
    if (sliderPlusBtn) {
      sliderPlusBtn.addEventListener('click', () => {
        if (chosenQty < totalPlayerShards) {
          chosenQty += 1;
          updateAllDisplays();
        }
      });
    }

    // Initial update
    updateAllDisplays();

    otherBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeInfoChoicePopup();
      // Close popup
      popup.style.display = "none";
      modalOverlay.style.display = "none";

      // Exchange shards
      totalPlayerShards -= chosenQty;
      shardSupply += chosenQty;
      onscreenConsole.log(`You spent ${chosenQty} Shard${chosenQty === 1 ? '' : 's'} to get +${chosenQty} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`);
      totalAttackPoints += chosenQty;
      cumulativeAttackPoints += chosenQty;

      // Reset button texts for future use
      noThanksBtn.textContent = "NO THANKS!";
      otherBtn.textContent = "OTHER";
      confirmBtn.textContent = "CONFIRM";

      // Show all buttons
      confirmBtn.style.display = "inline-block";
      otherBtn.style.display = "none";
      noThanksBtn.style.display = "none";
      
      resolve();
      updateGameBoard();
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function shardsToRecruit() {
  return new Promise((resolve) => {
    const popup = document.querySelector(".info-or-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const titleEl = document.querySelector(".info-or-choice-popup-title");
    const instrEl = document.querySelector(
      ".info-or-choice-popup-instructions",
    );
    const previewEl = document.querySelector(".info-or-choice-popup-preview");
    const confirmBtn = document.getElementById("info-or-choice-popup-confirm");
    const otherBtn = document.getElementById(
      "info-or-choice-popup-otherchoice",
    );
    const noThanksBtn = document.getElementById(
      "info-or-choice-popup-nothanks",
    );
    const closeBtn = document.querySelector(
      ".info-or-choice-popup-closebutton",
    );
    closeBtn.onclick = null;

    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeInfoChoicePopup();
      resolve();
    };

    // Set popup content
    titleEl.textContent = "SHARDS";
    instrEl.innerHTML = `You can spend a Shard to get +1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons"> (returning the Shard to the supply). How many Shards would you like to spend?`;

    // Set shard preview
    if (previewEl) {
      previewEl.style.backgroundImage = `url('Visual Assets/Icons/Shards.svg')`;
      previewEl.style.backgroundColor = `transparent`;
      previewEl.style.border = `none`;
      previewEl.style.backgroundSize = "contain";
      previewEl.style.backgroundRepeat = "no-repeat";
      previewEl.style.backgroundPosition = "center";
    }

    // PRESET TO MIDDLE
    let chosenQty = Math.ceil(totalPlayerShards / 2);

    // SWAP BUTTON ROLES: noThanks becomes +, other becomes confirm, confirm becomes -
    noThanksBtn.textContent = "+";
    otherBtn.textContent = "CONFIRM";
    confirmBtn.textContent = "-";

    // Show all buttons
    confirmBtn.style.display = "none";
    otherBtn.style.display = "inline-block";
    noThanksBtn.style.display = "none";

    // Create slider HTML - Keep this separate from the instructions text
    const sliderHTML = `
      <div class="slider-container" style="margin: 20px 0;">
        <div class="slider-track-wrapper">
          <div class="slider-track">
            <div class="slider-fill" id="sliderFill"></div>
            <input type="range" id="shardSlider" class="shard-slider" 
                   min="0" max="${totalPlayerShards}" value="${chosenQty}" step="1">
          </div>
          <div class="shard-thumb" id="shardThumb">
            <img src="Visual Assets/Icons/Shards.svg" alt="Shard" class="shard-icon">
            <span class="thumb-value">${chosenQty}</span>
          </div>
        </div>
        <div class="slider-controls">
          <button id="sliderMinusBtn" class="slider-btn">-</button>
          <div class="slider-value-display">
            <span id="sliderValue">${chosenQty}</span> / <span>${totalPlayerShards}</span>
          </div>
          <button id="sliderPlusBtn" class="slider-btn">+</button>
        </div>
      </div>
    `;

    // Create a container for the dynamic quantity text
    const quantityTextHTML = `
      <div id="quantityTextContainer">
        You are choosing to spend ${chosenQty} ${chosenQty === 1 ? 'Shard' : 'Shards'} to get +${chosenQty} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">. 
        This will give you a total of ${totalRecruitPoints + chosenQty} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.
      </div>
    `;

    // Set up the full HTML structure
    instrEl.innerHTML = `
      You can spend a Shard to get +1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons"> (returning the Shard to the supply). How many Shards would you like to spend?
      <br><br>
      ${quantityTextHTML}
      <br><br>
      ${sliderHTML}
    `;

    // Get all elements once
    const quantityTextContainer = document.getElementById("quantityTextContainer");
    const shardSlider = document.getElementById("shardSlider");
    const shardThumb = document.getElementById("shardThumb");
    const sliderValue = document.getElementById("sliderValue");
    const sliderMinusBtn = document.getElementById("sliderMinusBtn");
    const sliderPlusBtn = document.getElementById("sliderPlusBtn");
    const sliderFill = document.getElementById("sliderFill");

    // Function to update ONLY the quantity text (not the whole slider)
    function updateQuantityText() {
      const plural = chosenQty === 1 ? "Shard" : "Shards";
      const currentRecruit = totalRecruitPoints;
      
      if (quantityTextContainer) {
        quantityTextContainer.innerHTML = 
          `You are choosing to spend ${chosenQty} ${plural} to get +${chosenQty} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">. 
          This will give you a total of ${currentRecruit + chosenQty} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`;
      }
    }

    // Function to update ONLY the slider display
    function updateSliderDisplay() {
      // Update slider value display
      if (sliderValue) sliderValue.textContent = chosenQty;
      
      // Update slider input value
      if (shardSlider) shardSlider.value = chosenQty;
      
      // Update thumb position
      if (shardSlider && shardThumb) {
        const percentage = totalPlayerShards > 0 ? (chosenQty / totalPlayerShards) * 100 : 0;
        // Adjust for thumb width (50px wide, so move back half)
        shardThumb.style.left = `calc(${percentage}%)`;
        
        // Update thumb value
        const thumbValue = shardThumb.querySelector('.thumb-value');
        if (thumbValue) thumbValue.textContent = chosenQty;
      }
      
      // Update fill
      if (sliderFill && totalPlayerShards > 0) {
        const percentage = (chosenQty / totalPlayerShards) * 100;
        sliderFill.style.width = `${percentage}%`;
      }
      
      // Update button states
      if (confirmBtn) confirmBtn.disabled = chosenQty <= 0;
      if (sliderMinusBtn) sliderMinusBtn.disabled = chosenQty <= 0;
      if (sliderPlusBtn) sliderPlusBtn.disabled = chosenQty >= totalPlayerShards;
      if (noThanksBtn) noThanksBtn.disabled = chosenQty >= totalPlayerShards;
      if (otherBtn) otherBtn.disabled = chosenQty === 0;
    }

    // Function to update everything
    function updateAllDisplays() {
      updateQuantityText();
      updateSliderDisplay();
    }

    // Set up event listeners ONCE
    if (shardSlider) {
      shardSlider.addEventListener('input', () => {
        chosenQty = parseInt(shardSlider.value);
        updateAllDisplays();
      });
    }
    
    if (sliderMinusBtn) {
      sliderMinusBtn.addEventListener('click', () => {
        if (chosenQty > 0) {
          chosenQty -= 1;
          updateAllDisplays();
        }
      });
    }
    
    if (sliderPlusBtn) {
      sliderPlusBtn.addEventListener('click', () => {
        if (chosenQty < totalPlayerShards) {
          chosenQty += 1;
          updateAllDisplays();
        }
      });
    }

    // Initial update
    updateAllDisplays();

    otherBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeInfoChoicePopup();
      // Close popup
      popup.style.display = "none";
      modalOverlay.style.display = "none";

      // Exchange shards
      totalPlayerShards -= chosenQty;
      shardSupply += chosenQty;
      totalRecruitPoints += chosenQty; // Add to recruit instead of attack
      cumulativeRecruitPoints += chosenQty;
      
      onscreenConsole.log(`You spent ${chosenQty} Shard${chosenQty === 1 ? '' : 's'} to get +${chosenQty} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`);

      // Reset button texts and visibility for future use
      noThanksBtn.textContent = "NO THANKS!";
      otherBtn.textContent = "OTHER";
      confirmBtn.textContent = "CONFIRM";

      // Hide buttons that shouldn't be visible in normal mode
      confirmBtn.style.display = "inline-block";
      otherBtn.style.display = "none";
      noThanksBtn.style.display = "none";
      
      resolve();
      updateGameBoard();
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}



// Schemes

async function forgeTheInfinityGauntlet() {
  const gemsInPlay = playerArtifacts.filter((card) => card.team === "Infinity Gems").length;
  const gemsInDiscard = playerDiscardPile.filter((card) => card.team === "Infinity Gems").length;
  const gemsInCity = city.filter((card) => card && card.team === "Infinity Gems").length;

  // Phase 1: Handle city gems (always happens if there are any)
  if (gemsInCity > 0) {
    onscreenConsole.log(`Each Infinity Gem in the city gains a Shard.`);
    
    let shardsAdded = 0;
    for (let i = 0; i < city.length; i++) {
      const card = city[i];
      if (card && card.team === "Infinity Gems" && shardSupply > 0) {
        if (typeof card.shards === 'undefined') {
          card.shards = 0;
        }
        playSFX("shards");
        card.shards += 1;
        shardSupply -= 1;
        shardsAdded++;
      }
    }
    
    if (shardsAdded === 0 && shardSupply === 0) {
      onscreenConsole.log(`No Shards available in the supply.`);
    }
  } else {
    onscreenConsole.log(`There are no Infinity Gems in the city to gain a Shard.`);
  }

  // Phase 2: Check if player has any gems
  if (gemsInPlay === 0 && gemsInDiscard === 0) {
    onscreenConsole.log(`You have no Infinity Gems in play or in your discard pile.`);
    return;
  }

  // Phase 3: Player has gems - determine which scenario to execute
  if (gemsInPlay > 0 && gemsInDiscard > 0) {
    await forgeTheInfinityGauntletBoth();
  } else {
    await forgeTheInfinityGauntletSingle();
  }
}

async function forgeTheInfinityGauntletSingle() {
  return new Promise((resolve) => {
    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    
    if (!cardchoicepopup || !modalOverlay) {
      resolve();
      return;
    }

    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "SCHEME TWIST";
    instructionsElement.innerHTML =
      `Select an Infinity Gem you control or from your discard pile to enter the city.`;

    // Hide row labels and row2
    document.querySelector(
      ".card-choice-popup-selectionrow1label",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2label",
    ).style.display = "none";
    document.querySelector(".card-choice-popup-selectionrow2").style.display =
      "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "50%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "28%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "translateY(-50%)";
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    // Initialize scroll gradient detection
    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    const gemsInPlay = playerArtifacts.filter((card) => card.team === "Infinity Gems");
    const gemsInDiscard = playerDiscardPile.filter((card) => card.team === "Infinity Gems");
    
    // Determine which location has gems
    let gemsSource;
    let displayCards;
    
    if (gemsInPlay.length > 0) {
        gemsSource = "play";
        displayCards = gemsInPlay;
    } else {
        gemsSource = "discard";
        displayCards = gemsInDiscard;
    }
    
    if (displayCards.length === 0) {
      closeCardChoicePopup();
      resolve();
      return;
    }

    genericCardSort(displayCards);

    // Create card elements for each eligible card
    displayCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", String(card.id));

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview - but only if no card is selected
        if (selectedCard === null) {
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            if (!selectionRow1.querySelector(":hover") && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const cardId = cardElement.getAttribute("data-card-id");

        if (selectedCard && String(selectedCard.id) === cardId) {
          // Deselect current card
          selectedCard = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview and reset to hover state
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
          `Select an Infinity Gem you control or from your discard pile to enter the city.`;
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous card if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
          selectedCard = card;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview with selected card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will enter the city.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (displayCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (displayCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (displayCards.length > 5) {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "42%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "28%";
    }

    // Drag scrolling functionality
    setupDragScrolling(selectionRow1);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Disable confirm initially and hide unnecessary buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "Confirm";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (selectedCard === null) {
        closeCardChoicePopup();
        return;
      }
      
      closeCardChoicePopup();
      
      setTimeout(async () => {
        if (gemsSource === "play") {
          const cardIndex = playerArtifacts.findIndex(
            (c) => c && c.id === selectedCard.id && c.team === "Infinity Gems"
          );
          
          if (cardIndex !== -1) {
            const chosenGem = playerArtifacts.splice(cardIndex, 1)[0];
            chosenGem.type = "Villain";
            chosenGem.attack = chosenGem.originalAttack;
            villainDeck.push(chosenGem);
            enterCityNotDraw = true;
            await drawVillainCard();
            enterCityNotDraw = false;
            onscreenConsole.log(`${chosenGem.name} enters the city from your control!`);
          }
        } else if (gemsSource === "discard") {
          const cardIndex = playerDiscardPile.findIndex(
            (c) => c && c.id === selectedCard.id && c.team === "Infinity Gems"
          );
          
          if (cardIndex !== -1) {
            const chosenGem = playerDiscardPile.splice(cardIndex, 1)[0];
            chosenGem.type = "Villain";
            chosenGem.attack = chosenGem.originalAttack;
            villainDeck.push(chosenGem);
            enterCityNotDraw = true;
            await drawVillainCard();
            enterCityNotDraw = false;
            onscreenConsole.log(`${chosenGem.name} enters the city from your discard pile!`);
          }
        }
        
        updateGameBoard();
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function forgeTheInfinityGauntletBoth() {
return new Promise((resolve) => {

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const selectionRow2 = document.querySelector(
      ".card-choice-popup-selectionrow2",
    );
    const selectionRow1Label = document.querySelector(
      ".card-choice-popup-selectionrow1label",
    );
    const selectionRow2Label = document.querySelector(
      ".card-choice-popup-selectionrow2label",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "SCHEME TWIST";
    instructionsElement.innerHTML =
      `Select an Infinity Gem you control or from your discard pile to enter the city.`;

    // Show both rows and labels
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "In Play";
    selectionRow2Label.textContent = "Discard Pile";
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Reset container styles to default
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "40%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "0";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    selectionRow2.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedLocation = null; // 'hand' or 'played'
    let selectedCardImage = null;
    let isDragging = false;

    // Initialize scroll gradient detection
    const row1 = selectionRow1;
    const row2Visible = true;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create copies for display only and sort
    const displayArtifactCards = playerArtifacts.filter((card) => card.team === "Infinity Gems");
    const displayDiscardCards = playerDiscardPile.filter((card) => card.team === "Infinity Gems");
    genericCardSort(displayArtifactCards);
    genericCardSort(displayDiscardCards);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML =
          `Select an Infinity Gem you control or from your discard pile to enter the city.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will enter the city.`;
      }
    }

    // Create card element helper function
    function createCardElement(card, location, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", String(card.id));
      cardElement.setAttribute("data-location", location);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview - but only if no card is selected
        if (selectedCard === null) {
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            const isHoveringAnyCard =
              selectionRow1.querySelector(":hover") ||
              selectionRow2.querySelector(":hover");
            if (!isHoveringAnyCard && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (selectedCard && selectedCard.id === card.id && selectedLocation === location) {
          // Deselect current card
          selectedCard = null;
          selectedLocation = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview and reset to hover state
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous card if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
          selectedCard = card;
          selectedLocation = location;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview with selected card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    // Populate row1 with Hand cards
    displayArtifactCards.forEach((card) => {
      createCardElement(card, "control", selectionRow1);
    });

    // Populate row2 with Played Cards
    displayDiscardCards.forEach((card) => {
      createCardElement(card, "discard", selectionRow2);
    });

    // Adjust row heights based on card counts
    if (displayArtifactCards.length > 20 || displayDiscardCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      selectionRow2.classList.add("multi-row");
      selectionRow2.classList.add("three-row");
    } else if (displayArtifactCards.length > 10 || displayDiscardCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      selectionRow2.classList.add("multi-row");
      selectionRow2.classList.remove("three-row");
    } else if (displayArtifactCards.length > 5 || displayDiscardCards.length > 5) {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row");
      selectionRow2.classList.remove("multi-row");
      selectionRow2.classList.remove("three-row");
    } else {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row");
      selectionRow2.classList.remove("multi-row");
      selectionRow2.classList.remove("three-row");
    }

    // Drag scrolling functionality for both rows
    setupDragScrolling(selectionRow1);
    setupDragScrolling(selectionRow2);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Disable confirm initially and hide unnecessary buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "Confirm";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;
      closeCardChoicePopup();
      setTimeout(async () => {
        if (selectedLocation === "control") {
          // Remove from hand
          const indexInHand = playerArtifacts.findIndex(
            (c) => c && c.id === selectedCard.id,
          );
          if (indexInHand !== -1) {
            const chosenCard = playerArtifacts.splice(indexInHand, 1)[0];
            chosenCard.type = "Villain";
            chosenCard.attack = chosenCard.originalAttack;
            villainDeck.push(chosenCard);
            enterCityNotDraw = true;
            await drawVillainCard();
            enterCityNotDraw = false;
            
          } else {
            console.error("Selected card not found in player hand");
            onscreenConsole.log("Error: Selected card not found in hand.");
          }
        } else if (selectedLocation === "discard") {
          // Remove from played cards
          const indexInPlayed = playerDiscardPile.findIndex(
            (c) => c && c.id === selectedCard.id,
          );
          if (indexInPlayed !== -1) {
            const chosenCard = playerDiscardPile.splice(indexInPlayed, 1)[0];
            chosenCard.type = "Villain";
            chosenCard.attack = chosenCard.originalAttack;
            villainDeck.push(chosenCard);
            enterCityNotDraw = true;
            await drawVillainCard();
            enterCityNotDraw = false;
          } else {
            console.error("Selected card not found in played cards");
            onscreenConsole.log("Error: Selected card not found in played cards.");
          }
        }

        updateGameBoard();
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function intergalacticKreeNegaBomb() {
  shuffleDeck(negaBombDeck);

  return new Promise((resolve) => {
    const negaBombCard = negaBombDeck[negaBombDeck.length - 1];

    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `THE RANDOM CARD YOU REVEALED IS <span class="console-highlights">${negaBombCard.name}</span>.`,
        "CONTINUE",
        "CONTINUE"
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "SCHEME TWIST";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage =
          `url('${negaBombCard.image}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      if (negaBombCard.name === "Scheme Twist") {
        denyButton.style.display = "none";
      } else {
        confirmButton.style.display = "none";
      }

      confirmButton.onclick = async () => {
  closeInfoChoicePopup();
  negaBombDeck.splice(-1, 1); // Just remove it, we already have the card in negaBombCard
  onscreenConsole.log(
    `You revealed <span class="console-highlights">${negaBombCard.name}</span>. It will be KO'd. All Heroes in the HQ will be KO'd and you will gain a Wound.`,
  );
  koPile.push(negaBombCard); // Use negaBombCard instead of removedCard[0]
  await KOAllHeroesInHQ();
  await drawWound();
  resolve();
};

denyButton.onclick = async () => {
  closeInfoChoicePopup();
  negaBombDeck.splice(-1, 1); // Just remove it
  victoryPile.push(negaBombCard);
 bystanderBonuses();
  onscreenConsole.log(
    `You revealed <span class="console-highlights">${negaBombCard.name}</span>. They will be rescued now.`,
  );
    await rescueBystanderAbility(negaBombCard);
    updateGameBoard();     
  resolve();
};
    }, 10);
  });


}

async function theKreeSkrullWar() {
    if (
    schemeTwistCount < 8
  ) {
    for (let i = 0; i < city.length; i++) {
    if (city[i] && (city[i].team === "Kree Starforce" || city[i].team === "Skrulls")) {
      await handleVillainEscape(city[i]);
      city[i] = null;
      updateGameBoard();
    }
  } 
  const kreeEscapes = escapedVillainsDeck.filter(
    (card) => card.team === "Kree Starforce",
  ).length;
  const skrullEscapes = escapedVillainsDeck.filter(
    (card) => card.team === "Skrulls",
  ).length;

  if (kreeEscapes === skrullEscapes) {
    onscreenConsole.log("There are an equal number of Kree and Skrull in the Escape Pile. This Scheme Twist will be KO'd.");
    const twistCard = {
    name: "Scheme Twist",
    type: "Scheme Twist",
    image: "Visual Assets/Schemes/Custom Twists/theKreeSkrullWar.webp",
  };
  
  koPile.push(twistCard);

  updateGameBoard();
  
} else if (kreeEscapes > skrullEscapes) {
    onscreenConsole.log(`More Kree have escaped than Skrulls. This Twist will be stacked next to the Mastermind as a Kree Conquest.`);
    stackedTwistNextToMastermind++;
    kreeConquests += 1;

} else {
    onscreenConsole.log(`More Skrulls have escaped than Kree. This Twist will be stacked next to the Mastermind as a Skrull Conquest.`);
    stackedTwistNextToMastermind++;
    skrullConquests += 1;
}

   // Check escape pile - more Skrulls or Kree? Add a conquest or KO card
  } else {
  if (kreeConquests === skrullConquests) {
    onscreenConsole.log("There are an equal number of Kree and Skrull Conquests. This Scheme Twist will be KO'd.");
    const twistCard = {
    name: "Scheme Twist",
    type: "Scheme Twist",
    image: "Visual Assets/Schemes/Custom Twists/theKreeSkrullWar.webp",
  };
  
  koPile.push(twistCard);
  
} else if (kreeConquests > skrullConquests) {
    onscreenConsole.log(`The Kree have more Conquests. This Scheme Twist is stacked as another.`);
    stackedTwistNextToMastermind++;
    kreeConquests += 1;

} else {
    onscreenConsole.log(`The Skrulls have more Conquests. This Scheme Twist is stacked as another.`);
    stackedTwistNextToMastermind++;
    skrullConquests += 1;
}
  }
  updateGameBoard();
}

function uniteTheShards() {
  stackedTwistNextToMastermind++;
  const mastermind = getSelectedMastermind();
    if (typeof mastermind.shards === 'undefined') {
    mastermind.shards = 0;
  }
  playSFX("shards");
  mastermind.shards += stackedTwistNextToMastermind;
  shardSupply -= stackedTwistNextToMastermind;
  onscreenConsole.log(
    `<span class="console-highlights">${mastermind.name}</span> gains ${stackedTwistNextToMastermind} Shard${stackedTwistNextToMastermind === 1 ? "" : "s"}.`,
  );
  updateGameBoard();
}

// Masterminds

async function supremeIntelligenceOfTheKreeStrike() {
  const mastermind = getSelectedMastermind();

  if (typeof mastermind.shards === "undefined") {
    mastermind.shards = 0;
  }

  playSFX("shards");
  mastermind.shards += 1;
  shardSupply -= 1;

  onscreenConsole.log(
    `<span class="console-highlights">${mastermind.name}</span> gains a Shard.`
  );

  updateMastermindOverlay();

  for (let i = playerHand.length - 1; i >= 0; i--) {
    const card = playerHand[i];

    if (card.cost === mastermind.shards || card.cost === mastermind.shards + 1) {
      // Remove card from hand first (authoritative state)
      playerHand.splice(i, 1);

      const { returned } = await checkDiscardForInvulnerability(card);

      // Only re-add if explicitly returned
      if (returned?.length) {
        playerHand.push(...returned);
      }
    }
  }
  updateGameBoard();
}


function supremeIntelligenceOfTheKreeCombinedKnowledgeOfAllKree() {
const mastermind = getSelectedMastermind();
const kreeVillains = escapedVillainsDeck.filter(
      (card) => card.alwaysLeads === true,
    ).length + city.filter(
      (card) => card && card.alwaysLeads === true,
    ).length;
      if (typeof mastermind.shards === 'undefined') {
    mastermind.shards = 0;
  }
if (kreeVillains > 0) {
playSFX("shards");
}  
mastermind.shards += kreeVillains;
shardSupply -= kreeVillains;
onscreenConsole.log(`<span class="bold-spans">The </span><span class="console-highlights">${mastermind.name}</span> gains ${kreeVillains} Shard${kreeVillains === 1 ? '' : 's'} for each ${alwaysLeadsText} Villain card in the city and/or Escape pile.`);
updateGameBoard();
}

function supremeIntelligenceOfTheKreeCosmicOmniscience() {
  const mastermind = getSelectedMastermind();
const masterStrikes = koPile.filter(
      (card) => card.name === "Master Strike",
    ).length;
      if (typeof mastermind.shards === 'undefined') {
    mastermind.shards = 0;
  }
if (masterStrikes > 0) {
playSFX("shards");
}  
mastermind.shards += masterStrikes;
shardSupply -= masterStrikes;
onscreenConsole.log(`<span class="bold-spans">The </span><span class="console-highlights">${mastermind.name}</span> gains ${masterStrikes} Shard${masterStrikes === 1 ? '' : 's'} for each Master Strike in the KO pile.`);
updateGameBoard();
}

function supremeIntelligenceOfTheKreeCountermeasureProtocols() {
    const mastermind = getSelectedMastermind();
const previousTactics = victoryPile.filter(
      (card) => card.type === "Mastermind",
    ).length;
      if (typeof mastermind.shards === 'undefined') {
    mastermind.shards = 0;
  }
if (previousTactics > 0) {
playSFX("shards");
}  
mastermind.shards += previousTactics;
shardSupply -= previousTactics;
onscreenConsole.log(`<span class="bold-spans">The </span><span class="console-highlights">${mastermind.name}</span> gains ${previousTactics} Shard${previousTactics === 1 ? '' : 's'} for each Mastermind Tactic in your Victory Pile.`);
updateGameBoard();
}

function supremeIntelligenceOfTheKreeGuideKreeEvolution() {
      const mastermind = getSelectedMastermind();
  if (typeof mastermind.shards === 'undefined') {
    mastermind.shards = 0;
  }
  playSFX("shards");
mastermind.shards += 1;
shardSupply -= 1;

for (let i = 0; i < city.length; i++) {
  const card = city[i];
  if (card && card.team === "Kree Starforce" && shardSupply > 0) {
      if (typeof card.shards === 'undefined') {
    card.shards = 0;
  }
  playSFX("shards");
    card.shards += 1;  // Using += instead of =+ (which would be assignment)
    shardSupply -= 1;
  }
}

onscreenConsole.log(`<span class="bold-spans">The </span><span class="console-highlights">${mastermind.name}</span> and all Kree Villains in the city gain a Shard.`);
updateGameBoard();
}

async function thanosStrike() {
  return new Promise((resolve) => {
    // Get eligible cards from artifacts, hand, and played cards
    const COLOURS = new Set(["Green", "Yellow", "Black", "Blue", "Red"]);
    
    const eligibleArtifactCards = playerArtifacts.filter(
      (c) => c && c.type === "Hero" && COLOURS.has(String(c.color || "").trim()),
    );
    
    const eligibleHandCards = playerHand.filter(
      (c) => c && COLOURS.has(String(c.color || "").trim()),
    );
    
    const eligiblePlayedCards = cardsPlayedThisTurn.filter(
      (c) => c && COLOURS.has(String(c.color || "").trim()) && !c.isCopied && !c.sidekickToDestroy && !c.markedForDeletion && !c.isSimulation
    );

    if (eligibleArtifactCards.length === 0 && eligibleHandCards.length === 0 && eligiblePlayedCards.length === 0) {
      console.log("No eligible coloured cards in artifacts, hand, or played cards (Green/Yellow/Black/Blue/Red).");
      onscreenConsole.log(`No non-grey Heroes available for <span class="console-highlights">Thanos</span> to capture.`);
      resolve();
      return;
    }

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const selectionRow2 = document.querySelector(
      ".card-choice-popup-selectionrow2",
    );
    const selectionRow1Label = document.querySelector(
      ".card-choice-popup-selectionrow1label",
    );
    const selectionRow2Label = document.querySelector(
      ".card-choice-popup-selectionrow2label",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "MASTER STRIKE";
    instructionsElement.innerHTML =
      `Select a non-grey Hero for <span class="console-highlights">Thanos</span> to capture as a "Bound Soul".`;

    // Show both rows and labels
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "Artifacts & Hand";
    selectionRow2Label.textContent = "Played Cards";
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Reset container styles to default
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "40%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "0";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    selectionRow2.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedLocation = null; // 'artifacts', 'hand', or 'played'
    let selectedCardImage = null;
    let isDragging = false;

    // Initialize scroll gradient detection
    const row1 = selectionRow1;
    const row2Visible = true;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create copies for display only and sort
    const displayArtifactCards = [...eligibleArtifactCards];
    const displayHandCards = [...eligibleHandCards];
    const displayPlayedCards = [...eligiblePlayedCards];
    genericCardSort(displayArtifactCards);
    genericCardSort(displayHandCards);
    genericCardSort(displayPlayedCards);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML =
          `Select a non-grey Hero for <span class="console-highlights">Thanos</span> to capture as a "Bound Soul".`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be placed in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> "Bound Souls" pile.`;
      }
    }

    // Create card element helper function
    function createCardElement(card, location, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", String(card.id));
      cardElement.setAttribute("data-location", location);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview - but only if no card is selected
        if (selectedCard === null) {
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            const isHoveringAnyCard =
              selectionRow1.querySelector(":hover") ||
              selectionRow2.querySelector(":hover");
            if (!isHoveringAnyCard && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (selectedCard && selectedCard.id === card.id && selectedLocation === location) {
          // Deselect current card
          selectedCard = null;
          selectedLocation = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview and reset to hover state
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous card if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
          selectedCard = card;
          selectedLocation = location;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview with selected card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    // Populate row1 with Artifacts first, then Hand cards
    if (displayArtifactCards.length > 0) {
      const artifactLabel = document.createElement("span");
      artifactLabel.textContent = "Artifacts: ";
      artifactLabel.className = "row-divider-text";
      selectionRow1.appendChild(artifactLabel);
    }

    displayArtifactCards.forEach((card) => {
      createCardElement(card, "artifacts", selectionRow1);
    });

    if (displayHandCards.length > 0) {
      const handLabel = document.createElement("span");
      handLabel.textContent = "Hand: ";
      handLabel.className = "row-divider-text";
      selectionRow1.appendChild(handLabel);
    }

    displayHandCards.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Played Cards
    displayPlayedCards.forEach((card) => {
      createCardElement(card, "played", selectionRow2);
    });

    // Adjust row heights based on card counts
    const row1TotalCards = displayArtifactCards.length + displayHandCards.length;
    const row2TotalCards = displayPlayedCards.length;
    
    if (row1TotalCards > 20 || row2TotalCards > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      selectionRow2.classList.add("multi-row");
      selectionRow2.classList.add("three-row");
    } else if (row1TotalCards > 10 || row2TotalCards > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      selectionRow2.classList.add("multi-row");
      selectionRow2.classList.remove("three-row");
    } else if (row1TotalCards > 5 || row2TotalCards > 5) {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row");
      selectionRow2.classList.remove("multi-row");
      selectionRow2.classList.remove("three-row");
    } else {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row");
      selectionRow2.classList.remove("multi-row");
      selectionRow2.classList.remove("three-row");
    }

    // Drag scrolling functionality for both rows
    setupDragScrolling(selectionRow1);
    setupDragScrolling(selectionRow2);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Disable confirm initially and hide unnecessary buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "Confirm";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(async () => {
        if (selectedLocation === "artifacts") {
          // Remove from artifacts
          const indexInArtifacts = playerArtifacts.findIndex(
            (c) => c && c.id === selectedCard.id,
          );
          if (indexInArtifacts !== -1) {
            const chosenCard = playerArtifacts.splice(indexInArtifacts, 1)[0];
            boundSouls.push(chosenCard);
            onscreenConsole.log(
              `<span class="console-highlights">${chosenCard.name}</span> has been placed in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> "Bound Souls" pile.`,
            );
          } else {
            console.error("Selected card not found in artifacts");
            onscreenConsole.log("Error: Selected card not found in artifacts.");
          }
        } else if (selectedLocation === "hand") {
          // Remove from hand
          const indexInHand = playerHand.findIndex(
            (c) => c && c.id === selectedCard.id,
          );
          if (indexInHand !== -1) {
            const chosenCard = playerHand.splice(indexInHand, 1)[0];
            boundSouls.push(chosenCard);
            onscreenConsole.log(
              `<span class="console-highlights">${chosenCard.name}</span> has been placed in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> "Bound Souls" pile.`,
            );
          } else {
            console.error("Selected card not found in player hand");
            onscreenConsole.log("Error: Selected card not found in hand.");
          }
        } else if (selectedLocation === "played") {
          // Remove from played cards
          const indexInPlayed = cardsPlayedThisTurn.findIndex(
            (c) => c && c.id === selectedCard.id,
          );
          if (indexInPlayed !== -1) {
            const chosenCard = cardsPlayedThisTurn.splice(indexInPlayed, 1)[0];
            boundSouls.push(chosenCard);
            onscreenConsole.log(
              `<span class="console-highlights">${chosenCard.name}</span> has been placed in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> "Bound Souls" pile.`,
            );
          } else {
            console.error("Selected card not found in played cards");
            onscreenConsole.log("Error: Selected card not found in played cards.");
          }
        }

        updateGameBoard();
        closeCardChoicePopup();
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function thanosCenturiesOfEnvy() {
  const mastermind = getSelectedMastermind();

  if (playerArtifacts.filter((card) => card.team === "Infinity Gems").length === 0) {
    onscreenConsole.log(`You have no Infinity Gem Artifacts to discard.`);
    return;
  }

    return new Promise((resolve) => {

      const infinityGems = playerArtifacts.filter((card) => card.team === "Infinity Gems");

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "MASTERMIND TACTIC";
    instructionsElement.innerHTML =
      `Select an Infinity Gem Artifact you control. It will be discarded.`;

    // Hide row labels and row2
    document.querySelector(
      ".card-choice-popup-selectionrow1label",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2label",
    ).style.display = "none";
    document.querySelector(".card-choice-popup-selectionrow2").style.display =
      "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "50%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "28%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "translateY(-50%)";
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    // Initialize scroll gradient detection
    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create a copy of eligibleCards to sort for display only
    const displayCards = [...infinityGems];
    genericCardSort(displayCards);

    // Create card elements for each eligible card
    displayCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", String(card.id));

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview - but only if no card is selected
        if (selectedCard === null) {
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            if (!selectionRow1.querySelector(":hover") && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const cardId = cardElement.getAttribute("data-card-id");

        if (selectedCard && String(selectedCard.id) === cardId) {
          // Deselect current card
          selectedCard = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview and reset to hover state
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
            `Select an Infinity Gem Artifact you control. It will be discarded.`;
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous card if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
          selectedCard = card;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview with selected card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be discarded.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (displayCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (displayCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (displayCards.length > 5) {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "42%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles for normal mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "28%";
    }

    // Drag scrolling functionality
    setupDragScrolling(selectionRow1);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Disable confirm initially and hide unnecessary buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "Confirm";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {
        
        // Find the selected card's current index in the *actual* hand
        const indexInHand = playerArtifacts.findIndex(
          (c) => c && c.id === selectedCard.id,
        );
        closeCardChoicePopup();
        if (indexInHand !== -1) {
          // Remove the card from the player's hand
          const chosenCard = playerArtifacts.splice(indexInHand, 1)[0];
          playerDiscardPile.push(chosenCard);
          onscreenConsole.log(
            `<span class="console-highlights">${chosenCard.name}</span> has been discarded.`,
          );
          updateGameBoard();
        } else {
          console.error("Selected card not found in player hand");
          onscreenConsole.log("Error: Selected card not found.");
          closeCardChoicePopup();
        }
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}


async function thanosGodOfDeath() {
    try {
        const allCardsToCheck = [...playerHand, ...playerArtifacts, ...cardsPlayedThisTurn];
        const boundSoulsNames = new Set(boundSouls.map(card => card.name));
        
        let matchCount = 0;
        
        for (const card of allCardsToCheck) {
            if (boundSoulsNames.has(card.name)) {
                matchCount++;
            }
        }

        onscreenConsole.log(`You have ${matchCount} card${matchCount === 1 ? '' : 's'} with the same card name as a card in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile. You gain ${matchCount} Wound${matchCount === 1 ? '' : 's'}.`);

        for (let i = 0; i < matchCount; i++) {
            await drawWound();
        }
        
        return matchCount; // Optional: return the count if useful elsewhere
    } catch (error) {
        console.error("Error in thanosGodOfDeath:", error);
        onscreenConsole.log("An error occurred while processing Thanos' ability.");
        throw error; // Re-throw if you want calling code to handle it
    }
}

async function thanosKeeperOfSouls() {

  return new Promise((resolve) => {
    
    if (boundSouls.length === 0) {
      onscreenConsole.log(`There are no Heroes in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile to gain.`);
      resolve();
      return;
    }

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "MASTERMIND TACTIC";
    instructionsElement.innerHTML =
      `Gain a Hero from <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile. Then each other player puts a non-grey Hero from their discard pile into <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile.`;

    // Hide row labels and row2
    document.querySelector(
      ".card-choice-popup-selectionrow1label",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2label",
    ).style.display = "none";
    document.querySelector(".card-choice-popup-selectionrow2").style.display =
      "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "50%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "28%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "translateY(-50%)";
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    // Initialize scroll gradient detection
    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create a copy of eligibleCards to sort for display only
    const displayCards = [...boundSouls];
    genericCardSort(displayCards);

    // Create card elements for each eligible card
    displayCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", String(card.id));

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview - but only if no card is selected
        if (selectedCard === null) {
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            if (!selectionRow1.querySelector(":hover") && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const cardId = cardElement.getAttribute("data-card-id");

        if (selectedCard && String(selectedCard.id) === cardId) {
          // Deselect current card
          selectedCard = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview and reset to hover state
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
          `Gain a Hero from <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile. Then each other player puts a non-grey Hero from their discard pile into <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile.`;
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous card if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
          selectedCard = card;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview with selected card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gained.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (displayCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (displayCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (displayCards.length > 5) {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "42%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles for normal mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "28%";
    }

    // Drag scrolling functionality
    setupDragScrolling(selectionRow1);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Disable confirm initially and hide unnecessary buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "Confirm";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {

        // Find the selected card's current index in the *actual* hand
        const indexInHand = boundSouls.findIndex(
          (c) => c && c.id === selectedCard.id,
        );
        if (indexInHand !== -1) {
          // Remove the card from the player's hand
          const chosenHero = boundSouls.splice(indexInHand, 1)[0];
          playerDiscardPile.push(chosenHero);
          onscreenConsole.log(
            `<span class="console-highlights">${chosenHero.name}</span> has been gained and placed in your Discard pile.`,
          );
          updateGameBoard();

          // Close popup before proceeding to next phase
          closeCardChoicePopup();

          // Proceed to recruitment phase
          await thanosKeeperOfSoulsSacrifice();
        } else {
          console.error("Selected card not found in player hand");
          onscreenConsole.log("Error: Selected card not found.");
          closeCardChoicePopup();
        }
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function thanosKeeperOfSoulsSacrifice() {
  return new Promise((resolve) => {
    
    const COLOURS = new Set(["Green", "Yellow", "Black", "Blue", "Red"]);
    const eligibleCards = playerDiscardPile.filter(
      (c) => c && COLOURS.has(String(c.color || "").trim()),
    );

    if (eligibleCards.length === 0) {
      onscreenConsole.log(`No non-grey Heroes available to put in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile.`);
      resolve();
      return;
    }

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "MASTERMIND TACTIC";
    instructionsElement.innerHTML =
      `Put a non-grey Hero from your Discard pile into <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile.`;

    // Hide row labels and row2
    document.querySelector(
      ".card-choice-popup-selectionrow1label",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2label",
    ).style.display = "none";
    document.querySelector(".card-choice-popup-selectionrow2").style.display =
      "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "50%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "28%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "translateY(-50%)";
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    // Initialize scroll gradient detection
    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create a copy of eligibleCards to sort for display only
    const displayCards = [...eligibleCards];
    genericCardSort(displayCards);

    // Create card elements for each eligible card
    displayCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", String(card.id));

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview - but only if no card is selected
        if (selectedCard === null) {
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            if (!selectionRow1.querySelector(":hover") && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const cardId = cardElement.getAttribute("data-card-id");

        if (selectedCard && String(selectedCard.id) === cardId) {
          // Deselect current card
          selectedCard = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview and reset to hover state
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
                `Put a non-grey Hero from your Discard pile into <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile.`;
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous card if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
          selectedCard = card;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview with selected card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be put in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (displayCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (displayCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (displayCards.length > 5) {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "42%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles for normal mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "28%";
    }

    // Drag scrolling functionality
    setupDragScrolling(selectionRow1);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Disable confirm initially and hide unnecessary buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "Confirm";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {

        // Find the selected card's current index in the *actual* hand
        const indexInHand = playerDiscardPile.findIndex(
          (c) => c && c.id === selectedCard.id,
        );
        if (indexInHand !== -1) {
          // Remove the card from the player's hand
          const chosenHero = playerDiscardPile.splice(indexInHand, 1)[0];
          boundSouls.push(chosenHero);
          onscreenConsole.log(
            `<span class="console-highlights">${chosenHero.name}</span> has been put in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile.`,
          );
          updateGameBoard();

          // Close popup before proceeding to next phase
          closeCardChoicePopup();

        } else {
          console.error("Selected card not found in player hand");
          onscreenConsole.log("Error: Selected card not found.");
          closeCardChoicePopup();
        }
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function thanosTheMadTitan() {
    try {
        const boundSoulsNames = new Set(boundSouls.map(card => card.name));
        
        // 1) Identify matching cards
        const matchingCards = playerHand.filter(card => boundSoulsNames.has(card.name));
        const matchCount = matchingCards.length;

        if (matchCount === 0) {
            onscreenConsole.log(`No cards in your hand match cards in <span class="console-highlights">Thanos</span><span class="bold-spans">'</span> Bound Souls pile.`);
            return;
        }

        onscreenConsole.log(`You have ${matchCount} matching card${matchCount === 1 ? '' : 's'} to discard.`);

        // 2) Remove ALL matching cards from hand immediately
        // Create a snapshot of cards to process
        const cardsToProcess = [];
        for (let i = playerHand.length - 1; i >= 0; i--) {
            if (boundSoulsNames.has(playerHand[i].name)) {
                cardsToProcess.push(playerHand[i]);
                playerHand.splice(i, 1);
            }
        }

        // 3) Check each removed card for invulnerability
        const returnedCards = [];
        for (const card of cardsToProcess) {
            const { returned } = await checkDiscardForInvulnerability(card);
            if (returned && returned.length) returnedCards.push(...returned);
        }

        // 4) Add any invulnerable cards back to hand
        if (returnedCards.length) {
            playerHand.push(...returnedCards);
        }
    } catch (error) {
        console.error("Error in thanosDiscardMatchingCards:", error);
        onscreenConsole.log("An error occurred while processing Thanos' discard ability.");
        throw error;
    }
}

// Villains

function genericGemFightEffect() {
  //Simply so they have a fight effect that can be negated
}

function mindGemAmbush(gem) {

const shardsToGain = schemeTwistCount;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each Scheme Twist in the KO pile and/or stacked next to the Scheme.`);

  if (typeof gem.shards === 'undefined') {
    gem.shards = 0;
  }
if (shardsToGain > 0) {
playSFX("shards");
}  
gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

async function mindGemArtifact() {
onscreenConsole.log(`You get +2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);

totalRecruitPoints += 2;
cumulativeRecruitPoints += 2;
updateGameBoard();
}

function powerGemAmbush(gem) {
const shardsToGain = koPile.filter((card) => card && card.type === "Master Strike").length + 
                                     koPile.filter((card) => card.name === "Mysterio Mastermind Tactic").length + 
                                     victoryPile.filter((card) => card.name === "Mysterio Mastermind Tactic").length;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each Master Strike in the KO pile and/or stacked next to the Mastermind.`);

  if (typeof gem.shards === 'undefined') {
    gem.shards = 0;
  }
if (shardsToGain > 0) {
playSFX("shards");
}  
gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

async function powerGemArtifact() {
onscreenConsole.log(`You get +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

totalAttackPoints += 2;
cumulativeAttackPoints += 2;
updateGameBoard();
}

function realityGemAmbush(gem) {
const shardsToGain = city.filter((card) => card && card.team === "Infinity Gems").length + 
                                     escapedVillainsDeck.filter((card) => card.team === "Infinity Gems").length;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's, one'} for each Infinity Gem Villain card in the city and/or Escape pile.`);

  if (typeof gem.shards === 'undefined') {
    gem.shards = 0;
  }
if (shardsToGain > 0) {
playSFX("shards");
}  
gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

async function realityGemArtifact() {
onscreenConsole.log(`Before you play a card from the Villain Deck, you may first reveal the top card of the Villain Deck. If it's not a Scheme Twist, you may put it on the bottom of the Villain Deck. If you do, gain a Shard.`);
}

async function realityGemVillainChoice() {
  return new Promise((resolve) => {
    setTimeout(() => {
if (villainDeck.length === 0) {
        onscreenConsole.log("No cards available to be drawn.");
        resolve();
        return;
      }

const topVillainCard = villainDeck[villainDeck.length - 1];

if (topVillainCard.name === "Scheme Twist") {
  onscreenConsole.log("The top card of the Villain Deck is a Scheme Twist and cannot be put on the bottom.");
    resolve();
    return;
}

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `THE TOP CARD OF THE VILLAIN DECK IS: <span class="console-highlights">${topVillainCard.name}</span>. Do you wish to put it on the bottom of the Villain Deck and gain a Shard?`,
        "YES",
        `NO THANKS!`,
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Reality Gem";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('${topVillainCard.image}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

     confirmButton.onclick = async function () {
          closeInfoChoicePopup();
          villainDeck.unshift(villainDeck.pop());
          onscreenConsole.log(`<span class="console-highlights">${topVillainCard.name}</span> has been put on the bottom of the Villain Deck. You gain a Shard.`);
          playSFX("shards");
          totalPlayerShards += 1;
          shardsGainedThisTurn += 1;
          shardSupply -= 1;
          resolve();
          updateGameBoard();
      };

      denyButton.onclick = async function () {
          closeInfoChoicePopup();
          onscreenConsole.log(`You chose to leave <span class="console-highlights">${topVillainCard.name}</span> on top of the Villain Deck. Drawing now...`);
          resolve();
      };
    }, 10);
  });
}

function soulGemAmbush(gem) {
const shardsToGain = city.filter((card) => card && card.type === "Villain").length;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each Villain in the city.`);

  if (typeof gem.shards === 'undefined') {
    gem.shards = 0;
  }
if (shardsToGain > 0) {
playSFX("shards");
}  
gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

async function soulGemArtifact() {
const soulGem = playerArtifacts.find(card => card && card.name === "Soul Gem");
onscreenConsole.log(`You gain +${soulGem.shards} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
totalAttackPoints += soulGem.shards || 0;
cumulativeAttackPoints += soulGem.shards || 0;
updateGameBoard();
}

function spaceGemAmbush(gem) {
const shardsToGain = citySize - city.filter((card) => card && card.type === "Villain").length;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each empty space in the city.`);

  if (typeof gem.shards === 'undefined') {
    gem.shards = 0;
  }
if (shardsToGain > 0) {
playSFX("shards");
}  
gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

async function spaceGemArtifact() {
  return new Promise((resolve) => {
    if (isCityEmpty()) {
      onscreenConsole.log(`No Villains in the city to move.`);
      resolve(); // Resolve immediately if nothing to do
      return;
    }

    // Elements for the popup and overlay
    const popup = document.getElementById("villain-movement-popup");
    const overlay = document.getElementById("modal-overlay");
    const noThanksButton = document.getElementById("no-thanks-villain-movement");
    const confirmButton = document.getElementById("confirm-villain-movement");
    const selectionArrow = document.getElementById("selection-arrow");
    confirmButton.disabled = true; // Disable the confirm button
    document.getElementById("villain-movement-context").innerHTML =
      "You may move a Villain to another city space. If another Villain is already there, swap them. If you move any Villains this way, gain a Shard.";

    // Elements representing the rows in the table
    const villainCells = {
      bridge: document.getElementById("villain-bridge"),
      streets: document.getElementById("villain-streets"),
      rooftops: document.getElementById("villain-rooftops"),
      bank: document.getElementById("villain-bank"),
      sewers: document.getElementById("villain-sewers"),
    };

    let selectedCells = []; // To store the selected cells

    function isCellDestroyed(cellElement) {
      // Check if this cell contains a destroyed space
      const destroyedImage = cellElement.querySelector(".destroyed-space");
      return (
        destroyedImage !== null &&
        destroyedImage.src.includes("Galactus_MasterStrike.webp")
      );
    }

    function selectCell(cellElement) {
      // Don't allow selection of destroyed spaces (but allow Dark Portal spaces)
      if (isCellDestroyed(cellElement)) {
        console.log("Destroyed space selected, no action.");
        return;
      }

      const cellText = cellElement.textContent.trim();

      // The cell is considered to have a villain if it's not empty and not destroyed
      // Dark Portal spaces can have villains, so we don't exclude them
      const hasVillain = cellText !== "Empty" && !isCellDestroyed(cellElement);

      // 0. If the player selects an Empty cell first, nothing happens.
      if (!hasVillain && selectedCells.length === 0) {
        console.log("Empty cell selected first, no action.");
        return; // Do nothing if the first selected cell is empty
      }

      // If the selected cell is already in selectedCells, deselect it and remove from the array
      if (selectedCells.includes(cellElement)) {
        cellElement.classList.remove("selected");
        selectedCells = selectedCells.filter((cell) => cell !== cellElement);

        // Check if we need to hide the arrow after deselection
        if (selectedCells.length < 2) {
          selectionArrow.style.display = "none";
          confirmButton.disabled = true; // Disable the confirm button
          console.log(
            "Deselected cell, less than two selections, disabling confirm button.",
          );
        }
        return; // Exit early since we're just deselecting
      }

      // 1. If the player selects a villain, highlight it and add to selectedCells.
      if (hasVillain && selectedCells.length === 0) {
        cellElement.classList.add("selected");
        selectedCells.push(cellElement);
        console.log("First villain selected, added to selection.");
      }
      // 2a. If the player then selects a second villain, highlight it and add to selectedCells.
      else if (hasVillain && selectedCells.length === 1) {
        cellElement.classList.add("selected");
        selectedCells.push(cellElement);
        console.log("Second villain selected, added to selection.");
      }
      // 2b. If the player selects an Empty space after selecting a villain, highlight it and add to selectedCells.
      else if (
        !hasVillain &&
        selectedCells.length === 1 &&
        selectedCells[0].textContent.trim() !== "Empty"
      ) {
        cellElement.classList.add("selected");
        selectedCells.push(cellElement);
        console.log("Empty space selected after villain, added to selection.");
      }

      // 3a. If the player selects another cell (villain or empty), deselect the first choice and highlight the new one.
      if (selectedCells.length > 2) {
        const firstCell = selectedCells.shift(); // Remove the first selected cell
        firstCell.classList.remove("selected"); // Remove the highlight from the first cell
        console.log("More than two selections, deselected the first.");
      }

      // 3b. If the player selects another villain after an empty, deselect everything and highlight the new villain.
      if (
        selectedCells.length === 2 &&
        selectedCells[0].textContent.trim() === "Empty"
      ) {
        selectedCells.forEach((cell) => cell.classList.remove("selected"));
        selectedCells = [cellElement];
        cellElement.classList.add("selected");
        console.log("Selected another villain after an empty, reset selections.");
      }

      // Handle drawing the arrow based on the current selection
      if (selectedCells.length === 2) {
        drawArrow(selectedCells[0], selectedCells[1]);

        // Enable the confirm button if valid combination is selected
        if (
          (selectedCells[0].textContent.trim() !== "Empty" &&
            selectedCells[1].textContent.trim() === "Empty") ||
          (selectedCells[0].textContent.trim() !== "Empty" &&
            selectedCells[1].textContent.trim() !== "Empty")
        ) {
          confirmButton.disabled = false; // Enable the confirm button
          console.log("Valid selection made, enabling confirm button.");
        } else {
          confirmButton.disabled = true; // Disable the confirm button if not valid
          console.log("Invalid selection, disabling confirm button.");
        }
      } else {
        selectionArrow.style.display = "none";
        confirmButton.disabled = true; // Disable the confirm button
        console.log("Less than two selections, disabling confirm button.");
      }
    }

    function updateCityCellsInPopup() {
      for (let i = 0; i < city.length; i++) {
        const cityCellKey = Object.keys(villainCells)[i];
        const cityCellElement = villainCells[cityCellKey];
        cityCellElement.innerHTML = ""; // Clear existing content
        cityCellElement.classList.remove("destroyed"); // Remove destroyed class if present

        // Check if this space is destroyed (Master Strike)
        if (destroyedSpaces[i]) {
          // Create a container to hold the card image and overlays
          const cardContainer = document.createElement("div");
          cardContainer.classList.add("card-container");
          cityCellElement.appendChild(cardContainer);

          // Create destroyed space image
          const cardImage = document.createElement("img");
          cardImage.src = "Visual Assets/Masterminds/Galactus_MasterStrike.webp";
          cardImage.alt = "Destroyed City Space";
          cardImage.classList.add("destroyed-space");
          cardContainer.appendChild(cardImage);
          cardImage.classList.add("greyed-out");

          cityCellElement.classList.add("destroyed");
          continue; // Skip the rest for destroyed spaces
        }

        // Create a container to hold the card image and overlays
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        cityCellElement.appendChild(cardContainer);

        if (city[i]) {
          // Create an img element for the villain
          const cardImage = document.createElement("img");
          cardImage.src = city[i].image;
          cardImage.classList.add("villain-movement-card-image");
          cardContainer.appendChild(cardImage);

          // Add Dark Portal overlay if this space has a Dark Portal
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }

          // Add the bystander overlay if there are bystanders
          if (city[i].bystander && city[i].bystander.length > 0) {
            const bystanderOverlay = document.createElement("div");
            bystanderOverlay.className = "bystanders-overlay";
            let overlayText = `<span class="bystanderOverlayNumber">${city[i].bystander.length}</span>`;
            let overlayImage = `<img src="${city[i].bystander[0].image}" alt="Captured Hero" class="villain-bystander">`;
            bystanderOverlay.innerHTML = overlayText + overlayImage;
            bystanderOverlay.style.whiteSpace = "pre-line";
            cardContainer.appendChild(bystanderOverlay);
          }

          updateVillainAttackValues(city[i], i);

          const attackFromMastermind = city[i].attackFromMastermind || 0;
          const attackFromScheme = city[i].attackFromScheme || 0;
          const attackFromOwnEffects = city[i].attackFromOwnEffects || 0;
          const attackFromHeroEffects = city[i].attackFromHeroEffects || 0;
          const currentTempBuff = window[`city${i + 1}TempBuff`] || 0;
          const villainShattered = city[i].shattered || 0;
          const totalAttackModifiers =
            attackFromMastermind +
            attackFromScheme +
            attackFromOwnEffects +
            attackFromHeroEffects +
            currentTempBuff -
            villainShattered;

          if (totalAttackModifiers !== 0) {
            const villainOverlayAttack = document.createElement("div");
            villainOverlayAttack.className = "attack-overlay";
            villainOverlayAttack.innerHTML =
              city[i].attack + totalAttackModifiers;
            cardContainer.appendChild(villainOverlayAttack);
          }

          if (city[i].killbot === true) {
            const killbotOverlay = document.createElement("div");
            killbotOverlay.className = "killbot-overlay";
            killbotOverlay.innerHTML = "KILLBOT";
            cardContainer.appendChild(killbotOverlay);
          }

          if (city[i].babyHope === true) {
            const existingOverlay = cardContainer.querySelector(
              ".villain-baby-overlay",
            );
            if (existingOverlay) existingOverlay.remove();

            const babyOverlay = document.createElement("div");
            babyOverlay.className = "villain-baby-overlay";
            babyOverlay.innerHTML = `<img src="Visual Assets/Other/BabyHope.webp" alt="Baby Hope" class="villain-baby">`;
            cardContainer.appendChild(babyOverlay);
          }

          if (city[i].overlayText) {
            const villainOverlay = document.createElement("div");
            villainOverlay.className = "skrull-overlay";
            villainOverlay.innerHTML = `${city[i].overlayText}`;
            cardContainer.appendChild(villainOverlay);
          }

          if (city[i].capturedOverlayText) {
            const capturedVillainOverlay = document.createElement("div");
            capturedVillainOverlay.className = "captured-overlay";
            capturedVillainOverlay.innerHTML = `${city[i].capturedOverlayText}`;
            cardContainer.appendChild(capturedVillainOverlay);
          }

          if (city[i].XCutionerHeroes && city[i].XCutionerHeroes.length > 0) {
            const XCutionerOverlay = document.createElement("div");
            XCutionerOverlay.className = "XCutioner-overlay";

            let XCutionerOverlayImage = `<img src="${city[i].XCutionerHeroes[0].image}" alt="Captured Hero" class="villain-baby">`;
            let XCutionerOverlayText = `<span class="XCutionerOverlayNumber">${city[i].XCutionerHeroes.length}</span>`;
            const selectedScheme = schemes.find(
              (s) =>
                s.name ===
                document.querySelector(
                  "#scheme-section input[type=radio]:checked",
                ).value,
            );

            XCutionerOverlay.innerHTML =
              XCutionerOverlayImage + XCutionerOverlayText;
            XCutionerOverlay.style.whiteSpace = "pre-line";

            const XCutionerExpandedContainer = document.createElement("div");
            XCutionerExpandedContainer.className = "expanded-XCutionerHeroes";
            XCutionerExpandedContainer.style.display = "none";

            city[i].XCutionerHeroes.forEach((hero) => {
              const XCutionerHeroElement = document.createElement("span");
              XCutionerHeroElement.className = "XCutioner-hero-name";
              XCutionerHeroElement.textContent = hero.name;
              XCutionerHeroElement.dataset.image = hero.image;

              XCutionerHeroElement.addEventListener("mouseover", (e) => {
                e.stopPropagation();
                showZoomedImage(hero.image);
                const card = cardLookup[normalizeImagePath(hero.image)];
                if (card) updateRightPanel(card);
              });

              XCutionerHeroElement.addEventListener("mouseout", (e) => {
                e.stopPropagation();
                if (!activeImage) hideZoomedImage();
              });

              XCutionerHeroElement.addEventListener("click", (e) => {
                e.stopPropagation();
                activeImage = activeImage === hero.image ? null : hero.image;
                showZoomedImage(activeImage || "");
              });

              XCutionerExpandedContainer.appendChild(XCutionerHeroElement);
            });

            XCutionerOverlay.addEventListener("click", (e) => {
              e.stopPropagation();
              XCutionerExpandedContainer.style.display =
                XCutionerExpandedContainer.style.display === "none"
                  ? "block"
                  : "none";

              if (XCutionerExpandedContainer.style.display === "block") {
                setTimeout(() => {
                  document.addEventListener(
                    "click",
                    (e) => {
                      if (!XCutionerExpandedContainer.contains(e.target)) {
                        XCutionerExpandedContainer.style.display = "none";
                      }
                    },
                    { once: true },
                  );
                }, 50);
              }
            });

            cardContainer.appendChild(XCutionerOverlay);
            cardContainer.appendChild(XCutionerExpandedContainer);
          }

          if (city[i].plutoniumCaptured) {
            const plutoniumOverlay = document.createElement("div");
            plutoniumOverlay.innerHTML = `<span class="plutonium-count">${city[i].plutoniumCaptured.length}</span><img src="Visual Assets/Other/Plutonium.webp" alt="Plutonium" class="captured-plutonium-image-overlay">`;
            cardContainer.appendChild(plutoniumOverlay);
          }
        } else {
          // If no villain, add a blank card image
          const blankCardImage = document.createElement("img");
          blankCardImage.src = "Visual Assets/BlankCardSpace.webp";
          blankCardImage.classList.add("villain-movement-card-image");
          cardContainer.appendChild(blankCardImage);

          // Add Dark Portal overlay if this space has a Dark Portal (even if empty)
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }
        }

        // Add the temp buff overlay if there is a buff
        const tempBuffVariableName = `city${i + 1}TempBuff`;
        const currentTempBuff = window[tempBuffVariableName];
        if (currentTempBuff !== 0) {
          const tempBuffOverlay = document.createElement("div");
          tempBuffOverlay.className = "temp-buff-overlay-villain-move";
          tempBuffOverlay.innerHTML = `<p>${currentTempBuff} Attack</p>`;
          cardContainer.appendChild(tempBuffOverlay);
        }

        // Add the perm buff overlay if there is a buff
        const permBuffVariableName = `city${i + 1}PermBuff`;
        const currentPermBuff = window[permBuffVariableName];
        if (currentPermBuff !== 0) {
          const permBuffOverlay = document.createElement("div");
          permBuffOverlay.className = "perm-buff-overlay-villain-move";
          permBuffOverlay.innerHTML = `<p>${currentPermBuff} Attack</p>`;
          cardContainer.appendChild(permBuffOverlay);
        }

        // Add click event listener to each cell for selection (only if not destroyed)
        if (!destroyedSpaces[i]) {
          cityCellElement.onclick = () => selectCell(cityCellElement);
        } else {
          cityCellElement.onclick = null; // Remove click handler for destroyed spaces
        }

        // Ensure the cell has the correct class
        cityCellElement.classList.add("city-cell");
      }

      // Add location attack overlays
      const locations = [
        { value: city1LocationAttack, id: "bridge-label" },
        { value: city2LocationAttack, id: "streets-label" },
        { value: city3LocationAttack, id: "rooftops-label" },
        { value: city4LocationAttack, id: "bank-label" },
        { value: city5LocationAttack, id: "sewers-label" },
      ];

      locations.forEach(({ value, id }) => {
        if (value !== 0) {
          const element = document.getElementById(id);
          const existingOverlay = element.querySelector(
            ".location-attack-changes",
          );
          if (existingOverlay) existingOverlay.remove();

          const attackElement = document.createElement("div");
          attackElement.className = "location-attack-changes";
          attackElement.innerHTML = `<p>${value} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'></p>`;
          element.appendChild(attackElement);
        } else {
          const element = document.getElementById(id);
          const existingOverlay = element.querySelector(
            ".location-attack-changes",
          );
          if (existingOverlay) existingOverlay.remove();
        }
      });
    }

    // Function to hide the popup and overlay - MODIFIED to resolve the promise
    function hidePopup() {
      selectedCells.forEach((cell) => cell.classList.remove("selected"));
      selectedCells = [];
      popup.style.display = "none";
      overlay.style.display = "none";
      selectionArrow.style.display = "none"; // Hide the arrow when the popup is closed
      resolve(); // THIS IS KEY: Resolve the promise when popup is closed
    }

    function drawArrow(cell1, cell2) {
      // Get the bounding box of the popup
      const popupRect = document
        .getElementById("villain-movement-popup")
        .getBoundingClientRect();

      // Get the bounding box of the selected cells
      const rect1 = cell1.getBoundingClientRect();
      const rect2 = cell2.getBoundingClientRect();

      // Calculate the bottom center position of each cell relative to the popup
      const posn1 = {
        x: rect1.left - popupRect.left + rect1.width / 2,
        y: rect1.bottom - popupRect.top, // Bottom of the cell
      };
      const posn2 = {
        x: rect2.left - popupRect.left + rect2.width / 2,
        y: rect2.bottom - popupRect.top, // Bottom of the cell
      };

      console.log("Calculated Position 1:", posn1);
      console.log("Calculated Position 2:", posn2);

      // Calculate control points for a curve that goes under the cells
      const controlX = (posn1.x + posn2.x) / 2;
      const controlY = Math.max(posn1.y, posn2.y) + 30; // Adjust the +50 value for more or less curve

      // Create the curved path
      const dStr =
        `M${posn1.x},${posn1.y} ` +
        `C${controlX},${controlY} ${controlX},${controlY} ${posn2.x},${posn2.y}`;

      console.log("Path Data:", dStr);

      const selectionArrow = document.getElementById("selection-arrow");
      selectionArrow.setAttribute("d", dStr);
      selectionArrow.style.display = "block";
    }

    // Update city cells with the current game state in the popup
    updateCityCellsInPopup();

    // Show the popup and overlay
    popup.style.display = "block";
    overlay.style.display = "block";

    noThanksButton.onclick = () => {
      hidePopup();
      onscreenConsole.log(`You chose to not move any Villains.`);
    };

    confirmButton.onclick = () => {
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

        // Debugging: Log the initial state before any operation
        console.log("Initial State:");
        console.log("First Cell:", city[firstIndex]);
        console.log("Second Cell:", city[secondIndex]);

        // Check if the second cell contains the blank card image (i.e., it's empty)
        const secondCellImage = secondCell.querySelector("img"); // Find the image element in the second cell
        if (
          secondCellImage &&
          secondCellImage.src.includes("BlankCardSpace.webp")
        ) {
          // Move the villain to the empty cell
          console.log("Moving villain to empty space");
          onscreenConsole.log(
            `<span class="console-highlights">${city[firstIndex].name}</span> moved to an empty space.`,
          );

          city[secondIndex] = city[firstIndex]; // Move the villain to the new space
          city[firstIndex] = null; // Clear the original space
          playSFX("shards");
          totalPlayerShards += 1;
          shardsGainedThisTurn += 1;
          shardSupply -= 1;
        } else if (city[secondIndex] && city[firstIndex]) {
          // Both cells have villains, perform the swap
          console.log("Swapping villains");
          console.log("Before Swap:", city[firstIndex], city[secondIndex]);
          onscreenConsole.log(
            `<span class="console-highlights">${city[firstIndex].name}</span> swapped places with <span class="console-highlights">${city[secondIndex].name}</span>.`,
          );

          // Perform the swap
          const temp = city[secondIndex];
          city[secondIndex] = city[firstIndex];
          city[firstIndex] = temp;
          playSFX("shards");
          totalPlayerShards += 1;
          shardsGainedThisTurn += 1;
          shardSupply -= 1;

          console.log("After Swap:", city[firstIndex], city[secondIndex]);
        } else {
          console.error("Cannot swap cells: one of the cells is empty.");
          return;
        }

        // Clear selections and update the game board
        selectedCells.forEach((cell) => cell.classList.remove("selected"));
        selectedCells = [];
        selectionArrow.style.display = "none"; // Hide the arrow
        confirmButton.disabled = true; // Disable the confirm button
        popup.style.display = "none";
        overlay.style.display = "none";
        updateGameBoard(); // Update the actual game board with the new state

        // Debugging: Log the final state after the operation
        console.log("Final State:");
        console.log("First Cell:", city[firstIndex]);
        console.log("Second Cell:", city[secondIndex]);
        
        resolve(); // Resolve the promise after everything is done
      }
    };
  });
}

async function timeGemAmbush(gem) {
  const topVillainCard = villainDeck[villainDeck.length - 1];

const shardsToGain = topVillainCard.victoryPoints || 0;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> forces you to play another card from the Villain Deck. You gain ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'}, equal to that card's printed Victory Points.`);

  if (typeof gem.shards === 'undefined') {
    gem.shards = 0;
  }
if (shardsToGain > 0) {
playSFX("shards");
}  
gem.shards += shardsToGain;
shardSupply -= shardsToGain;

await drawVillainCard();

}

async function timeGemArtifact() {
  if (timeGemUsed) {
    onscreenConsole.log(`The <span class="console-highlights">Time Gem</span> can only be used once per game.`);
    return;
  }

  const mastermind = getSelectedMastermind();

if (
    !finalBlowEnabled &&
    mastermind.tactics.length === 0
  ) {
    delayEndGame = true;
    impossibleToDraw = true;
    onscreenConsole.log(
      `You will be able to use the <span class="console-highlights">Time Gem</span> and take one final turn before claiming your victory!`,
    );
    timeGemUsed = true;
    return;
  } else if (
    finalBlowEnabled &&
    mastermind.tactics.length === 0
  ) {
    doomDelayEndGameFinalBlow = true;
    impossibleToDraw = true;
    mastermindDefeatTurn = turnCount;
    onscreenConsole.log(
      `If you deliver the Final Blow this turn, you will be able to use the <span class="console-highlights">Time Gem</span> to take another before claiming your victory!`,
    );
    timeGemUsed = true;
    return;
  } else {
    onscreenConsole.log(`You use the <span class="console-highlights">Time Gem</span> to take another turn after this one.`)
    timeGemUsed = true;
    return;
  }
}

function captainAtlasEscape() {
onscreenConsole.log(`Escape! Each player loses a Shard. Each player that cannot do so gains a Wound.`);
if (totalPlayerShards > 0) {
  totalPlayerShards -= 1;
  shardSupply += 1;
  onscreenConsole.log(`You lose a Shard.`);
} else {
  drawWound();
}
}

async function demonDruidAmbush() {
  onscreenConsole.log(`Ambush! <span class="console-highlights">Demon Druid</span> allows another Villain in the city to gain two Shards.`)
  updateGameBoard();

  return new Promise((resolve) => {
    const popup = document.querySelector(".card-choice-city-hq-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const previewElement = document.querySelector(
      ".card-choice-city-hq-popup-preview",
    );
    const titleElement = document.querySelector(
      ".card-choice-city-hq-popup-title",
    );
    const instructionsElement = document.querySelector(
      ".card-choice-city-hq-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "DEMON DRUID";
    instructionsElement.textContent =
      "SELECT A VILLAIN IN THE CITY TO GAIN 2 SHARDS:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedCell = null;

    // Find Demon Druid to grey them out
    // Check city[4], then city[3], city[2], etc.
    let demonDruidIndex = -1;
    for (let i = 4; i >= 0; i--) {
      if (city[i] && city[i].name === "Demon Druid") {
        demonDruidIndex = i;
        break;
      }
    }

    // Check if there are any villains in city besides Demon Druid
    const eligibleVillainsInCity = city.some(
      (card, index) =>
        card &&
        (card.type === "Villain" || card.type === "Henchman") &&
        !destroyedSpaces[index] &&
        index !== demonDruidIndex
    );

    if (!eligibleVillainsInCity) {
      onscreenConsole.log(
        "There are no eligible Villains in the city to gain Shards.",
      );
      resolve(false);
      return;
    }

    // Function to render city cards
    function renderCityCards() {
      // Process each city slot (0-4)
      for (let i = 0; i < 5; i++) {
        const slot = i + 1;
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );

        const card = city[i];

        // Update label to show city location
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = ["Bridge", "Streets", "Rooftops", "Bank", "Sewers"][i];

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");
        cell.classList.remove("destroyed");

        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        if (explosion) explosion.style.display = "none";
        if (explosionCount) explosionCount.style.display = "none";

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        // Check if this space is destroyed
        if (destroyedSpaces[i]) {
          // For destroyed spaces, use Master Strike image with same styling
          const destroyedImage = document.createElement("img");
          destroyedImage.src =
            "Visual Assets/Masterminds/Galactus_MasterStrike.webp";
          destroyedImage.alt = "Destroyed City Space";
          destroyedImage.className = "city-hq-chosen-card-image";
          destroyedImage.style.cursor = "not-allowed";
          cardContainer.appendChild(destroyedImage);
          destroyedImage.classList.add("greyed-out");

          // Hide the original card image
          cardImage.style.display = "none";

          continue;
        }

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible, but NOT Demon Druid
          const isEligible = (card.type === "Villain" || card.type === "Henchman") && 
                           i !== demonDruidIndex;

          // Apply greyed out styling for ineligible cards
          if (!isEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Add overlays for all cards
          addCardOverlays(cardContainer, card, i, 'city');

          // Add click handler for eligible cards only
          if (isEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedCityIndex === i) {
                // Deselect
                selectedCityIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.textContent =
                  "SELECT A VILLAIN TO GIVE +2 SHARDS:";
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedCityIndex = i;
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain 2 Shards.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedCityIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedCityIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // Empty city slot - show blank card and grey out
          cardImage.src = "Visual Assets/BlankCardSpace.webp";
          cardImage.alt = "Empty City Space";
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);

          // Add Dark Portal overlay if this space has a Dark Portal (even if empty)
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }
        }
      }
    }

    // Initial render
    renderCityCards();

    // Set up button handlers
    const confirmButton = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherChoiceButton = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "CONFIRM";
    
    // Hide the other choice button (no more switching between city/HQ)
    otherChoiceButton.style.display = "none";

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (selectedCityIndex === null) return;

      // Give 2 shards to the selected villain
      const selectedCard = city[selectedCityIndex];
      if (selectedCard) {
          if (typeof selectedCard.shards === 'undefined') {
    selectedCard.shards = 0;
  }
  playSFX("shards");
        selectedCard.shards = (selectedCard.shards || 0) + 2;
        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> gains 2 Shards.`,
        );
        shardSupply -= 2;
      }

      closeHQCityCardChoicePopup();
      modalOverlay.style.display = "none";
      updateGameBoard();
      originalResolve(true);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function drMinervaAmbush() {
  onscreenConsole.log(`Ambush! <span class="console-highlights">Dr. Minerva</span> allows each Kree Villain in the city to gain a Shard.`);
  for (let i = 0; i < city.length; i++) {
  const card = city[i];
  if (card && card.team === "Kree Starforce" && shardSupply > 0) {
      if (typeof card.shards === 'undefined') {
    card.shards = 0;
  }
  playSFX("shards");
    card.shards += 1;  // Using += instead of =+ (which would be assignment)
    shardSupply -= 1;
  }
}
}

async function korathThePursuerAmbush(korath) {
  return new Promise((resolve) => {
    setTimeout(() => {
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

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `WOULD YOU LIKE TO DRAW A CARD? IF YOU DO, <span class="console-highlights">Korath the Pursuer</span> GAINS A SHARD.`,
        "YES",
        `NO THANKS!`,
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Korath The Pursuer";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('Visual Assets/Villains/GotG_KreeStarforce_KorathThePursuer.webp')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

     confirmButton.onclick = async function () {
          closeInfoChoicePopup();
          extraDraw();
          if (typeof korath.shards === 'undefined') {
    korath.shards = 0;
  }
  playSFX("shards");
          korath.shards += 1;
          shardSupply -= 1;
          onscreenConsole.log(`<span class="console-highlights">Korath the Pursuer</span> gains a Shard.`);
          resolve();
          updateGameBoard();
      };

      denyButton.onclick = async function () {
          closeInfoChoicePopup();
          onscreenConsole.log(`You chose not to draw a card. <span class="console-highlights">Korath the Pursuer</span> does not gain a Shard.`);
          resolve();
      };
    }, 10);
  });
}

function korathThePursuerEscape(korath) {
  onscreenConsole.log(`Escape! If <span class="console-highlights">Korath the Pursuer</span> had any Shards, each player gains a Wound.`);
  if (korath.shards && korath.shards > 0) {
  onscreenConsole.log(`<span class="console-highlights">Korath the Pursuer</span> did have Shards.`);
  drawWound();  
  } else {
  onscreenConsole.log(`<span class="console-highlights">Korath the Pursuer</span> did not have any Shards. You escape gaining a Wound.`);
  return;  
  }
  updateGameBoard();
}

function ronanTheAccuserAmbush() {
  onscreenConsole.log(`Ambush! <span class="console-highlights">Ronan the Accuser</span> forces you to accuse yourself.`);
  drawWound();
  updateGameBoard();
}

function ronanTheAccuserEscape() {
  onscreenConsole.log(`Escape! <span class="console-highlights">Ronan the Accuser</span> forces you to accuse yourself.`);
  drawWound();
  updateGameBoard();
}

function shatteraxFight() {
onscreenConsole.log(`Fight! <span class="console-highlights">Shatterax</span> gives each Hero in the HQ a Shard. When you gain a Hero, you gain their Shard. If they leave the HQ some other way, return that Shard to the supply.`);
for (let i = 0; i < hq.length; i++) {
  const card = hq[i];
  if (card && card.type === "Hero" && shardSupply > 0) {
      if (typeof card.shards === 'undefined') {
    card.shards = 0;
  }
  playSFX("shards");
    card.shards += 1;
    shardSupply -= 1;
  }
}
updateGameBoard();
}

function supremorAmbush(supremor) {
  const mastermind = getSelectedMastermind();
  onscreenConsole.log(`Ambush! <span class="console-highlights">Supremor</span> and <span class="console-highlights">${mastermind.name}</span> each gain a Shard.`);
    if (typeof supremor.shards === 'undefined') {
    supremor.shards = 0;
  }
  playSFX("shards");
  supremor.shards += 1;
if (typeof mastermind.shards === 'undefined') {
    mastermind.shards = 0;
  }
  playSFX("shards");
  mastermind.shards += 1;
  shardSupply -= 2;
  updateGameBoard();
}

// Heroes

async function draxTheDestroyerKnivesOfTheHunter() {
onscreenConsole.log(`You get +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
totalAttackPoints += 1;
cumulativeAttackPoints += 1;
}

function draxTheDestroyerInterstellarTracker() {
return new Promise((resolve) => {
  const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const instinctPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Instinct"),
  ).length;
  
  if (instinctPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  }
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

    const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

    topCardPlayerDeck.revealed = true;

    if (instinctPlayed === 0) {
    
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: <span class="bold-spans">${topCardPlayerDeck.name}</span>. Do you wish to discard or put it back?`,
      "Discard",
      "Put It Back",
    );

    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage = `url('${topCardPlayerDeck.image}')`;
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = async function () {
      playerDeck.pop();
      hideHeroAbilityMayPopup();
      const { returned } =
        await checkDiscardForInvulnerability(topCardPlayerDeck);
      if (returned.length) {
        playerHand.push(...returned);
      }
      updateGameBoard();
      resolve();
    };

    denyButton.onclick = function () {
      console.log(
        `You put ${topCardPlayerDeck.name} back on top of your deck.`,
      );
      onscreenConsole.log(
        `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`,
      );
      updateGameBoard();
      hideHeroAbilityMayPopup();
      resolve();
    };
    
  } else {
    
    const { confirmButton, denyButton, extraButton  } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: <span class="bold-spans">${topCardPlayerDeck.name}</span>. You may discard it or put it back. As you have played an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero, you can choose to KO it after discarding.`,
      "Discard",
      "Discard, Then KO",
      "Put it Back",
      true
    );

    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage = `url('${topCardPlayerDeck.image}')`;
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = async function () {
      playerDeck.pop();
      hideHeroAbilityMayPopup();
      const { returned } =
        await checkDiscardForInvulnerability(topCardPlayerDeck);
      if (returned.length) {
        playerHand.push(...returned);
      }
      updateGameBoard();
      resolve();
    };
    
denyButton.onclick = async function () {
  playerDeck.pop();
  hideHeroAbilityMayPopup();
  const { returned } = await checkDiscardForInvulnerability(topCardPlayerDeck);
  
  if (returned.length) {
    koPile.push(...returned);
    onscreenConsole.log(
      `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
    );
    koBonuses();
  } else {
    // Check if the card is in playerDiscardPile and move it to koPile
    const cardIndex = playerDiscardPile.findIndex(card => 
      card === topCardPlayerDeck || card.id === topCardPlayerDeck.id
    );
    
    if (cardIndex !== -1) {
      const [removedCard] = playerDiscardPile.splice(cardIndex, 1);
      koPile.push(removedCard);
      onscreenConsole.log(
        `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd from discard pile.`,
      );
      koBonuses();
    }
  }

  updateGameBoard();
  resolve();
};

    extraButton.onclick = function () {
      console.log(
        `You put ${topCardPlayerDeck.name} back on top of your deck.`,
      );
      onscreenConsole.log(
        `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`,
      );
      updateGameBoard();
      hideHeroAbilityMayPopup();
      resolve();
    };
    
    }
  
  });
}

function draxTheDestroyerTheDestroyer() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const guardiansPlayed = previousCards.filter(
    (item) => item.team && item.team === "Guardians of the Galaxy").length;
  
  if (guardiansPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Guardians of the Galaxy.svg" alt="Guardians of the Galaxy Icon" class="console-card-icons"> Hero played. Superpower Ability not activated - "other player" Hero effects do not apply in Solo play.`,
  );
  }
  if (guardiansPlayed === 0) {
    onscreenConsole.log(
    `No <img src="Visual Assets/Icons/Guardians of the Galaxy.svg" alt="Guardians of the Galaxy Icon" class="console-card-icons"> Heroes played. Superpower Ability not activated - "other player" Hero effects do not apply in Solo play anyway.`,
  );
  }
}

function draxTheDestroyerAvatarOfDestruction() {
const currentAttackPoints = totalAttackPoints;
onscreenConsole.log(`You had ${currentAttackPoints} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. It has doubled to ${totalAttackPoints + currentAttackPoints} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

totalAttackPoints += currentAttackPoints;
cumulativeAttackPoints += currentAttackPoints;
}

function gamoraBountyHunter() {
updateGameBoard();
  
  const selectedScheme = schemes.find(
    (s) =>
      s.name ===
      document.querySelector(
        "#scheme-section input[type=radio]:checked",
      ).value,
  );

  return new Promise((resolve) => {
    const popup = document.querySelector(".card-choice-city-hq-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const previewElement = document.querySelector(
      ".card-choice-city-hq-popup-preview",
    );
    const titleElement = document.querySelector(
      ".card-choice-city-hq-popup-title",
    );
    const instructionsElement = document.querySelector(
      ".card-choice-city-hq-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "GAMORA - BOUNTY HUNTER";
    instructionsElement.textContent =
      "SELECT A VILLAIN TO GAIN A SHARD:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedHQIndex = null;
    let selectedCell = null;
    let viewingHQ = false; // Track whether we're viewing city or HQ

    // Check if any villains exist in city (excluding destroyed spaces)
    const villainsInCity = city.some(
      (card, index) =>
        card &&
        (card.type === "Villain" || card.type === "Henchman") &&
        !destroyedSpaces[index],
    );

    // Check if any villains exist in HQ if scheme is active
    const villainsInHQ = selectedScheme.name === 'Invade the Daily Bugle News HQ' ? 
      hq.some((card, index) => {
        if (card && (card.type === "Villain" || card.type === "Henchman")) {
          const explosionValues = [hqExplosion1, hqExplosion2, hqExplosion3, hqExplosion4, hqExplosion5];
          const isDestroyed = explosionValues[index] >= 6;
          return !isDestroyed;
        }
        return false;
      }) : false;

    if (!villainsInCity && !villainsInHQ) {
      onscreenConsole.log(
        "There are no Villains in the city or HQ to gain a Shard.",
      );
      resolve(false);
      return;
    }

    // Function to render city cards
    function renderCityCards() {
      viewingHQ = false;
      
      // Process each city slot (0-4)
      for (let i = 0; i < 5; i++) {
        const slot = i + 1;
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );

        const card = city[i];

        // Update label to show city location
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = ["Bridge", "Streets", "Rooftops", "Bank", "Sewers"][i];

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");
        cell.classList.remove("destroyed");

        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        if (explosion) explosion.style.display = "none";
        if (explosionCount) explosionCount.style.display = "none";

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        // Check if this space is destroyed
        if (destroyedSpaces[i]) {
          // For destroyed spaces, use Master Strike image with same styling
          const destroyedImage = document.createElement("img");
          destroyedImage.src =
            "Visual Assets/Masterminds/Galactus_MasterStrike.webp";
          destroyedImage.alt = "Destroyed City Space";
          destroyedImage.className = "city-hq-chosen-card-image";
          destroyedImage.style.cursor = "not-allowed";
          cardContainer.appendChild(destroyedImage);
          destroyedImage.classList.add("greyed-out");

          // Hide the original card image
          cardImage.style.display = "none";

          continue;
        }

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible
          const isEligible = card.type === "Villain" || card.type === "Henchman";

          // Apply greyed out styling for ineligible cards (Heroes, etc.)
          if (!isEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain/henchman cards
          if (isEligible) {
            addCardOverlays(cardContainer, card, i, 'city');
          }

          // Add click handler for eligible cards only
          if (isEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedCityIndex === i) {
                // Deselect
                selectedCityIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.textContent =
                  "SELECT A VILLAIN TO GAIN A SHARD:";
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedCityIndex = i;
                selectedHQIndex = null; // Clear HQ selection
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain a Shard.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedCityIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedCityIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // Empty city slot - show blank card and grey out
          cardImage.src = "Visual Assets/BlankCardSpace.webp";
          cardImage.alt = "Empty City Space";
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);

          // Add Dark Portal overlay if this space has a Dark Portal (even if empty)
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }
        }
      }
    }

    // Function to render HQ cards
    function renderHQCards() {
      viewingHQ = true;
      
      // Get HQ slots (1-5) and explosion values
      const hqSlots = [1, 2, 3, 4, 5];
      const explosionValues = [
        hqExplosion1,
        hqExplosion2,
        hqExplosion3,
        hqExplosion4,
        hqExplosion5,
      ];

      // Process each HQ slot
      hqSlots.forEach((slot, index) => {
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );
        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        const card = hq[index];
        const explosionValue = explosionValues[index] || 0;

        // Update explosion indicators
        if (explosionValue > 0) {
          explosion.style.display = "block";
          explosionCount.style.display = "block";
          explosionCount.textContent = explosionValue;

          if (explosionValue >= 6) {
            explosion.classList.add("max-explosions");
            cell.classList.add("destroyed");
          } else {
            explosion.classList.remove("max-explosions");
            cell.classList.remove("destroyed");
          }
        } else {
          if (explosion) explosion.style.display = "none";
          if (explosionCount) explosionCount.style.display = "none";
          cell.classList.remove("destroyed");
        }

        // Update label
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = `HQ-${slot}`;

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible
          const isEligible = card.type === "Villain" || card.type === "Henchman";
          const isDestroyed = explosionValue >= 6;
          const isActuallyEligible = isEligible && !isDestroyed;

          // Apply greyed out styling for ineligible cards
          if (!isActuallyEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain/henchman cards
          if (isEligible && card) {
            addCardOverlays(cardContainer, card, index, 'hq');
          }

          // Add click handler for eligible cards only
          if (isActuallyEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedHQIndex === index) {
                // Deselect
                selectedHQIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.textContent =
                  "SELECT A VILLAIN TO GAIN A SHARD:";
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedHQIndex = index;
                selectedCityIndex = null; // Clear city selection
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain a Shard.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedHQIndex !== null && selectedHQIndex !== index) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedHQIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedHQIndex !== null && selectedHQIndex !== index) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedHQIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // No card in this slot - show card back and grey out
          cardImage.src = "Visual Assets/CardBack.webp";
          cardImage.alt = "Empty HQ Slot";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);
        }
      });
    }

    // Initial render - start with city
    renderCityCards();

    // Set up button handlers
    const confirmButton = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherChoiceButton = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );

    const denyButton = document.getElementById("card-choice-city-hq-popup-nothanks");

    denyButton.style.display = "none";

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "CONFIRM";

    // Set up Other Choice button as toggle between City and HQ
    if (selectedScheme.name === 'Invade the Daily Bugle News HQ' && villainsInHQ) {
      otherChoiceButton.style.display = "inline-block";
      otherChoiceButton.textContent = "SWITCH TO HQ";
      otherChoiceButton.disabled = false;

      otherChoiceButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Clear any selections
        selectedCityIndex = null;
        selectedHQIndex = null;
        if (selectedCell) {
          selectedCell.classList.remove("selected");
          selectedCell = null;
        }
        previewElement.innerHTML = "";
        previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        confirmButton.disabled = true;

        // Toggle between City and HQ views
        if (viewingHQ) {
          renderCityCards();
          otherChoiceButton.textContent = "SWITCH TO HQ";
          instructionsElement.textContent = "SELECT A VILLAIN TO GAIN A SHARD:";
        } else {
          renderHQCards();
          otherChoiceButton.textContent = "SWITCH TO CITY";
          instructionsElement.textContent = "SELECT A VILLAIN TO GAIN A SHARD:";
        }
      };
    } else {
      otherChoiceButton.style.display = "none";
    }

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeHQCityCardChoicePopup();
      
      if (selectedCityIndex === null && selectedHQIndex === null) return;

      shardSupply -= 1;

      if (selectedCityIndex !== null) {
        // Assign the shard to the selected city villain
          if (typeof city[selectedCityIndex].shards === 'undefined') {
    city[selectedCityIndex].shards = 0;
  }
  playSFX("shards");
        city[selectedCityIndex].shards += 1;
        onscreenConsole.log(
          `<span class="console-highlights">${city[selectedCityIndex].name}</span> gained a Shard.`,
        );
      } else if (selectedHQIndex !== null) {
        // Assign the shard to the selected HQ villain
                  if (typeof hq[selectedHQIndex].shards === 'undefined') {
    hq[selectedHQIndex].shards = 0;
  }
  playSFX("shards");
        hq[selectedHQIndex].shards += 1;
        onscreenConsole.log(
          `<span class="console-highlights">${hq[selectedHQIndex].name}</span> gained a Shard.`,
        );
      }
      
      modalOverlay.style.display = "none";
      updateGameBoard();
      originalResolve(true);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function gamoraDeadliestWomanInTheUniverse() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const covertPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Covert"),
  ).length;
  
  if (covertPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
onscreenConsole.log(
    `You gain 3 Shards.`,
  );
  playSFX("shards");
totalPlayerShards += 3;
shardsGainedThisTurn += 3;
shardSupply -= 3;
  } else {
    onscreenConsole.log(
    `You gain 2 Shards.`,
  );
  playSFX("shards");
totalPlayerShards += 2;
shardsGainedThisTurn += 2;
shardSupply -= 2;
    }
}

function gamoraGalacticAssassin() {
updateGameBoard();
  
  const selectedScheme = schemes.find(
    (s) =>
      s.name ===
      document.querySelector(
        "#scheme-section input[type=radio]:checked",
      ).value,
  );

  return new Promise((resolve) => {
    const popup = document.querySelector(".card-choice-city-hq-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const previewElement = document.querySelector(
      ".card-choice-city-hq-popup-preview",
    );
    const titleElement = document.querySelector(
      ".card-choice-city-hq-popup-title",
    );
    const instructionsElement = document.querySelector(
      ".card-choice-city-hq-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "GAMORA - BOUNTY HUNTER";
    instructionsElement.innerHTML =
      `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedHQIndex = null;
    let selectedCell = null;
    let viewingHQ = false; // Track whether we're viewing city or HQ

    // Check if any villains exist in city (excluding destroyed spaces)
    const villainsInCity = city.some(
      (card, index) =>
        card &&
        (card.type === "Villain" || card.type === "Henchman") &&
        !destroyedSpaces[index],
    );

    // Check if any villains exist in HQ if scheme is active
    const villainsInHQ = selectedScheme.name === 'Invade the Daily Bugle News HQ' ? 
      hq.some((card, index) => {
        if (card && (card.type === "Villain" || card.type === "Henchman")) {
          const explosionValues = [hqExplosion1, hqExplosion2, hqExplosion3, hqExplosion4, hqExplosion5];
          const isDestroyed = explosionValues[index] >= 6;
          return !isDestroyed;
        }
        return false;
      }) : false;

    if (!villainsInCity && !villainsInHQ) {
      onscreenConsole.log(
        `There are no Villains to gain no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
      );
      resolve(false);
      return;
    }

    // Function to render city cards
    function renderCityCards() {
      viewingHQ = false;
      
      // Process each city slot (0-4)
      for (let i = 0; i < 5; i++) {
        const slot = i + 1;
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );

        const card = city[i];

        // Update label to show city location
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = ["Bridge", "Streets", "Rooftops", "Bank", "Sewers"][i];

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");
        cell.classList.remove("destroyed");

        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        if (explosion) explosion.style.display = "none";
        if (explosionCount) explosionCount.style.display = "none";

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        // Check if this space is destroyed
        if (destroyedSpaces[i]) {
          // For destroyed spaces, use Master Strike image with same styling
          const destroyedImage = document.createElement("img");
          destroyedImage.src =
            "Visual Assets/Masterminds/Galactus_MasterStrike.webp";
          destroyedImage.alt = "Destroyed City Space";
          destroyedImage.className = "city-hq-chosen-card-image";
          destroyedImage.style.cursor = "not-allowed";
          cardContainer.appendChild(destroyedImage);
          destroyedImage.classList.add("greyed-out");

          // Hide the original card image
          cardImage.style.display = "none";

          continue;
        }

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible
          const isEligible = card.type === "Villain" || card.type === "Henchman";

          // Apply greyed out styling for ineligible cards (Heroes, etc.)
          if (!isEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain/henchman cards
          if (isEligible) {
            addCardOverlays(cardContainer, card, i, 'city');
          }

          // Add click handler for eligible cards only
          if (isEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedCityIndex === i) {
                // Deselect
                selectedCityIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.innerHTML =
                  `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedCityIndex = i;
                selectedHQIndex = null; // Clear HQ selection
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedCityIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedCityIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // Empty city slot - show blank card and grey out
          cardImage.src = "Visual Assets/BlankCardSpace.webp";
          cardImage.alt = "Empty City Space";
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);

          // Add Dark Portal overlay if this space has a Dark Portal (even if empty)
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }
        }
      }
    }

    // Function to render HQ cards
    function renderHQCards() {
      viewingHQ = true;
      
      // Get HQ slots (1-5) and explosion values
      const hqSlots = [1, 2, 3, 4, 5];
      const explosionValues = [
        hqExplosion1,
        hqExplosion2,
        hqExplosion3,
        hqExplosion4,
        hqExplosion5,
      ];

      // Process each HQ slot
      hqSlots.forEach((slot, index) => {
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );
        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        const card = hq[index];
        const explosionValue = explosionValues[index] || 0;

        // Update explosion indicators
        if (explosionValue > 0) {
          explosion.style.display = "block";
          explosionCount.style.display = "block";
          explosionCount.textContent = explosionValue;

          if (explosionValue >= 6) {
            explosion.classList.add("max-explosions");
            cell.classList.add("destroyed");
          } else {
            explosion.classList.remove("max-explosions");
            cell.classList.remove("destroyed");
          }
        } else {
          if (explosion) explosion.style.display = "none";
          if (explosionCount) explosionCount.style.display = "none";
          cell.classList.remove("destroyed");
        }

        // Update label
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = `HQ-${slot}`;

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible
          const isEligible = card.type === "Villain" || card.type === "Henchman";
          const isDestroyed = explosionValue >= 6;
          const isActuallyEligible = isEligible && !isDestroyed;

          // Apply greyed out styling for ineligible cards
          if (!isActuallyEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain/henchman cards
          if (isEligible && card) {
            addCardOverlays(cardContainer, card, index, 'hq');
          }

          // Add click handler for eligible cards only
          if (isActuallyEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedHQIndex === index) {
                // Deselect
                selectedHQIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.textContent =
                  `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedHQIndex = index;
                selectedCityIndex = null; // Clear city selection
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedHQIndex !== null && selectedHQIndex !== index) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedHQIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedHQIndex !== null && selectedHQIndex !== index) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedHQIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // No card in this slot - show card back and grey out
          cardImage.src = "Visual Assets/CardBack.webp";
          cardImage.alt = "Empty HQ Slot";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);
        }
      });
    }

    // Initial render - start with city
    renderCityCards();

    // Set up button handlers
    const confirmButton = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherChoiceButton = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "CONFIRM";

    // Set up Other Choice button as toggle between City and HQ
    if (selectedScheme.name === 'Invade the Daily Bugle News HQ' && villainsInHQ) {
      otherChoiceButton.style.display = "inline-block";
      otherChoiceButton.textContent = "SWITCH TO HQ";
      otherChoiceButton.disabled = false;

      otherChoiceButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Clear any selections
        selectedCityIndex = null;
        selectedHQIndex = null;
        if (selectedCell) {
          selectedCell.classList.remove("selected");
          selectedCell = null;
        }
        previewElement.innerHTML = "";
        previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        confirmButton.disabled = true;

        // Toggle between City and HQ views
        if (viewingHQ) {
          renderCityCards();
          otherChoiceButton.textContent = "SWITCH TO HQ";
          instructionsElement.innerHTML = `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;
        } else {
          renderHQCards();
          otherChoiceButton.textContent = "SWITCH TO CITY";
          instructionsElement.innerHTML = `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;
        }
      };
    } else {
      otherChoiceButton.style.display = "none";
    }

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (selectedCityIndex === null && selectedHQIndex === null) return;

      if (selectedCityIndex !== null) {
        // Assign the shard to the selected city villain
        city[selectedCityIndex].noShardBonus = true;
        onscreenConsole.log(
          `<span class="console-highlights">${city[selectedCityIndex].name}</span> gains no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
        );
      } else if (selectedHQIndex !== null) {
        // Assign the shard to the selected HQ villain
        hq[selectedHQIndex].noShardBonus = true;
        onscreenConsole.log(
          `<span class="console-highlights">${hq[selectedHQIndex].name}</span> gains no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
        );
      }

      closeHQCityCardChoicePopup();
      modalOverlay.style.display = "none";
      updateGameBoard();
      originalResolve(true);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
    
    const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const covertPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Covert"),
  ).length;
  
  const mastermind = getSelectedMastermind();
  
  if (covertPlayed > 1) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`,
  );
  mastermind.noShardBonus = true;
onscreenConsole.log(
    `<span class="console-highlights">${mastermind.name}</span> gains no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
  );
  updateGameBoard();
}});
}

async function gamoraGodslayerBladeOne() {
onscreenConsole.log(
    `You gain 2 Shards.`,
  );
  playSFX("shards");
totalPlayerShards += 2;
shardsGainedThisTurn += 2;
shardSupply -= 2;
gamoraGodslayerOne = true;
}

async function gamoraGodslayerBladeTwo() {
totalPlayerShards -= 5;
shardSupply += 5;
totalAttackPoints += 10;
cumulativeAttackPoints += 10;

onscreenConsole.log(
    `You spent 5 Shards and gained +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );

  gamoraGodslayerTwo = true;
}

async function gamoraGodslayerBladeCopy() {
return new Promise((resolve) => {
    setTimeout(() => {

      totalPlayerShards += 2;
      shardsGainedThisTurn += 2;
      shardSupply -= 2;
      onscreenConsole.log(`You gain 2 Shards.`);

      if (totalPlayerShards < 5) {
      onscreenConsole.log(`You do not have 5 Shards to exchange for +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">, as per <span class="console-highlights">Gamora - Godslayer Blade</span><span class="bold-spans">'s</span> second ability.`);
      resolve();
      return;
      } else {

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `WOULD YOU LIKE TO SPEND 5 SHARDS FOR +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">?`,
        "YES",
        `NO THANKS!`,
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Gamora - Godslayer Blade";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('Visual Assets/Heroes/GotG/GotG_Gamora_GodslayerBlade.webp')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }
        
      // Add click handlers
      confirmButton.onclick = async function () {
          totalPlayerShards -= 5;
          shardSupply += 5;
          totalAttackPoints += 10;
          cumulativeAttackPoints += 10;
          onscreenConsole.log(`You spent 5 Shards to get +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
          updateGameBoard();
          resetPopupButtonStyles();
          closeInfoChoicePopup();
          resolve();
        }

      denyButton.onclick = async function () {
          onscreenConsole.log(`You chose not to spend any Shards.`);
          updateGameBoard();
          resetPopupButtonStyles();
          closeInfoChoicePopup();
          resolve();

        }
      };
      }, 10);
  });
}

async function gamoraGodslayerBlade() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if ALL abilities have been used
      if (gamoraGodslayerOne && gamoraGodslayerTwo) {
        resolve();
        return;
      }

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `WHICH ABILITY WOULD YOU LIKE TO USE?`,
        "GAIN TWO SHARDS",
        `SPEND 5 SHARDS FOR +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">`,
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Gamora - Godslayer Blade";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('Visual Assets/Heroes/GotG/GotG_Gamora_GodslayerBlade.webp')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      const closeButton = document.getElementById("info-or-choice-popup-close-button");
    
    closeButton.onclick = () => {
      closeInfoChoicePopup();
      updateGameBoard();
      resolve();
      return;
      };

      // Disable ONLY the specific button that's already been used
      if (gamoraGodslayerOne) {
        confirmButton.disabled = true;
        confirmButton.style.opacity = "0.5";
        confirmButton.style.cursor = "not-allowed";
        confirmButton.innerHTML = "GAIN TWO SHARDS (Already Used)";
      } else {
        // Ensure first button is enabled and reset
        confirmButton.disabled = false;
        confirmButton.style.opacity = "1";
        confirmButton.style.cursor = "pointer";
        confirmButton.innerHTML = "GAIN TWO SHARDS";
      }

      if (gamoraGodslayerTwo) {
        denyButton.disabled = true;
        denyButton.style.opacity = "0.5";
        denyButton.style.cursor = "not-allowed";
        denyButton.innerHTML = `SPEND 5 SHARDS FOR +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> (Already Used)`;
      } else {
        // Reset second button first
        denyButton.disabled = false;
        denyButton.style.opacity = "1";
        denyButton.style.cursor = "pointer";
        denyButton.innerHTML = `SPEND 5 SHARDS FOR +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">`;
        
        // Check shards for second ability only if it's NOT already used
        if (typeof totalPlayerShards !== 'undefined') {
          if (totalPlayerShards < 5) {
            denyButton.disabled = true;
            denyButton.style.opacity = "0.5";
            denyButton.style.cursor = "not-allowed";
            denyButton.innerHTML = `SPEND 5 SHARDS FOR +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> (Need ${5 - totalPlayerShards} more)`;
          }
        } else {
          denyButton.disabled = true;
          denyButton.style.opacity = "0.5";
          denyButton.style.cursor = "not-allowed";
          denyButton.innerHTML = `SPEND 5 SHARDS FOR +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> (Shards not available)`;
        }
      }

      // Add click handlers
      confirmButton.onclick = async function () {
        if (!gamoraGodslayerOne) {
          // Reset styles before closing
          resetPopupButtonStyles();
          closeInfoChoicePopup();
          // Set the flag for this ability
          gamoraGodslayerOne = true;
          await gamoraGodslayerBladeOne();
          resolve();
        }
      };

      denyButton.onclick = async function () {
        if (!gamoraGodslayerTwo) {
          // Check shards again in onclick handler for safety
          if (typeof totalPlayerShards !== 'undefined' && totalPlayerShards >= 5) {
            // Reset styles before closing
            resetPopupButtonStyles();
            closeInfoChoicePopup();
            // Set the flag for this ability
            gamoraGodslayerTwo = true;
            await gamoraGodslayerBladeTwo();
            resolve();
          }
        }
      };
    }, 10);
  });
}

function grootSurvivingSprig() {
nextTurnsDraw += 1;
onscreenConsole.log(`You will draw an extra card at the end of this turn.`);
}

function grootPruneTheGrowths() {
return new Promise((resolve) => {
   const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const strengthPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Strength"),
  ).length;
  
  if (strengthPlayed === 0) {
    onscreenConsole.log(
    `No <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. No effect.`,
  );
  resolve(false);
  return;
}

  onscreenConsole.log(
      `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
    );

    if (playerHand.length === 0 && playerDiscardPile.length === 0) {
      console.log("No cards in hand to discard.");
      onscreenConsole.log(`No cards available to be KO'd.`);
      updateGameBoard();
      resolve(false);
      return;
    }

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const selectionRow2 = document.querySelector(
      ".card-choice-popup-selectionrow2",
    );
    const selectionRow1Label = document.querySelector(
      ".card-choice-popup-selectionrow1label",
    );
    const selectionRow2Label = document.querySelector(
      ".card-choice-popup-selectionrow2label",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content based on bystander availability
    titleElement.textContent = "Groot - Groot and Branches";
    instructionsElement.innerHTML = `You may KO a card from your hard or discard pile. If you do, gain a Shard.`;

    // Show both rows and labels
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "Hand";
    selectionRow2Label.textContent = "Discard Pile";
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Reset row heights to default
    selectionRow1.style.height = "";
    selectionRow2.style.height = "";

    // Clear existing content
    selectionRow1.innerHTML = "";
    selectionRow2.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let selectedLocation = null;
    let isDragging = false;

    // Create sorted copies for display only
    const sortedDiscardPile = [...playerDiscardPile];
    const sortedHand = [...playerHand];
    genericCardSort(sortedDiscardPile);
    genericCardSort(sortedHand);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML = `You may KO a card from your hard or discard pile. If you do, gain a Shard.`;
      } else {
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
        }
    }

    const row1 = selectionRow1;
    const row2Visible = true;

    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "40%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "0";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "none";

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card element helper function
    function createCardElement(card, location, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-location", location);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = card.image;
        previewImage.alt = card.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if no card is selected
        if (selectedCard === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            const isHoveringAnyCard =
              selectionRow1.querySelector(":hover") ||
              selectionRow2.querySelector(":hover");
            if (!isHoveringAnyCard && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (selectedCard === card && selectedLocation === location) {
          // Deselect
          selectedCard = null;
          selectedCardImage = null;
          selectedLocation = null;
          cardImage.classList.remove("selected");
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedCard = card;
          selectedCardImage = cardImage;
          selectedLocation = location;
          cardImage.classList.add("selected");

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    // Populate row1 with Hand cards (using sorted copy for display)
    sortedHand.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Discard Pile cards (using sorted copy for display)
    sortedDiscardPile.forEach((card) => {
      createCardElement(card, "discard", selectionRow2);
    });

    // Set up drag scrolling for both rows
    setupDragScrolling(selectionRow1);
    setupDragScrolling(selectionRow2);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "CONFIRM";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(async () => {
        // Find the card in the original arrays using object reference
        if (selectedLocation === "discard") {
          const index = playerDiscardPile.indexOf(selectedCard);
          if (index !== -1) playerDiscardPile.splice(index, 1);
        } else {
          const index = playerHand.indexOf(selectedCard);
          if (index !== -1) playerHand.splice(index, 1);
        }
        closeCardChoicePopup();
        koPile.push(selectedCard);
        onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been KO'd. You gain a Shard.`,
          );
        koBonuses();
        playSFX("shards");
          totalPlayerShards += 1;
          shardsGainedThisTurn += 1;        
          shardSupply -= 1;
        updateGameBoard();
        resolve();
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(`No card was KO'd.`);
        onscreenConsole.log(
          `You chose not to KO any cards to gain a Shard.`,
        );
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function grootGrootAndBranches() {
shardsForRecruitEnabled = true;

onscreenConsole.log(
    `You gain 2 Shards.`,
  );
  
  onscreenConsole.log(
    `You may spend Shards to get <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> this turn.`,
  );
playSFX("shards");
totalPlayerShards += 2;
shardsGainedThisTurn += 2;
shardSupply -= 2;

otherPlayerNoEffect();
}

function otherPlayerNoEffect() {
  onscreenConsole.log(
    `Superpower Ability not activated - "other player" Hero effects do not apply in Solo play.`,
  );
  }

function grootIAmGroot() {
grootRecruitBonus = true;

onscreenConsole.log(
    `When you recruit your next Hero this turn, you gain Shards equal to that Hero's cost.`,
  );
}

function grootRecruitShards(hero) {
  onscreenConsole.log(
    `<span class="console-highlights">${hero.name}</span> has a cost of ${hero.cost} <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. <span class="console-highlights">Groot - I Am Groot</span> gives you ${hero.cost} Shards.`,
  );
  if (hero.cost > 0) {
playSFX("shards");
}  
  totalPlayerShards += hero.cost;
  shardsGainedThisTurn += hero.cost;
  shardSupply -= hero.cost;
  
  grootRecruitBonus = false;
  }

function rocketRaccoonGrittyScavenger() {
return new Promise((resolve) => {
    if (playerHand.length === 0) {
      onscreenConsole.log("You have no cards available to discard.");
      resolve();
      return;
    }

    // Sort the hand FIRST, before any processing
    genericCardSort(playerHand);

    updateGameBoard();

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const selectionContainer = document.querySelector(
      ".card-choice-popup-selection-container",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );
    const closeButton = document.querySelector(
      ".card-choice-popup-closebutton",
    );

    // Set popup content
    titleElement.textContent = "Rocket Raccoon - Gritty Scavenger";
    instructionsElement.innerHTML =
      "You may discard a card. If you do, draw a card.";

    // Hide row labels and row2, show close button for "No Thanks"
    document.querySelector(
      ".card-choice-popup-selectionrow1label",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2label",
    ).style.display = "none";
    document.querySelector(".card-choice-popup-selectionrow2").style.display =
      "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "50%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "28%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "translateY(-50%)";
    closeButton.style.display = "block";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedIndex = null;
    let selectedCardImage = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card in hand
    playerHand.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-card-index", index); // Store index for reference

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = card.image;
        previewImage.alt = card.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if no card is selected
        if (selectedCard === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            if (!selectionRow1.querySelector(":hover") && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const thisIndex = Number(cardElement.getAttribute("data-card-index"));

        if (selectedCard === card) {
          // Deselect
          selectedCard = null;
          selectedIndex = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
            "You may discard a card. If you do, draw a card.";
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedCard = card;
          selectedIndex = thisIndex;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be discarded.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (playerHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (playerHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (playerHand.length > 5) {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "42%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles for normal mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "28%";
    }

    // Drag scrolling functionality
    setupDragScrolling(selectionRow1);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Configure buttons
    confirmButton.textContent = "Discard Selected Card";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard || selectedIndex === null) return;
      closeCardChoicePopup();

      // Use the stored index to remove the correct card
      if (
        selectedIndex >= 0 &&
        selectedIndex < playerHand.length &&
        playerHand[selectedIndex] === selectedCard
      ) {
        const discardedCard = playerHand.splice(selectedIndex, 1)[0];

        const { returned } =
          await checkDiscardForInvulnerability(discardedCard);
        if (returned.length) {
          playerHand.push(...returned);
        }
      } else {
        // Fallback: find by ID if index doesn't match (shouldn't happen with proper sorting)
        const index = playerHand.findIndex(
          (card) => card.id === selectedCard.id,
        );
        if (index !== -1) {
          const discardedCard = playerHand.splice(index, 1)[0];
          const { returned } =
            await checkDiscardForInvulnerability(discardedCard);
          if (returned.length) {
            playerHand.push(...returned);
          }
        }
      }
      extraDraw();
      updateGameBoard();
      resolve();
    };

    // Close button handler (No Thanks action)
    closeButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(`You chose not to discard.`);
      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(`You chose not to discard.`);
      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function rocketRaccoonTriggerHappy() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const guardiansPlayed = previousCards.filter(
    (item) => item.team && item.team === "Guardians of the Galaxy").length;
  
  if (guardiansPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Guardians of the Galaxy.svg" alt="Guardians of the Galaxy Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
onscreenConsole.log(
    `You have played ${guardiansPlayed} Hero${guardiansPlayed === 1 ? '' : 'es'} and gain ${guardiansPlayed} Shard${guardiansPlayed === 1 ? '' : 's'}.`,
  );
  if (guardiansPlayed > 0) {
playSFX("shards");
}  
totalPlayerShards += guardiansPlayed;
shardsGainedThisTurn += guardiansPlayed;
shardSupply -= guardiansPlayed;
  } else {
    onscreenConsole.log(
    `No <img src="Visual Assets/Icons/Guardians of the Galaxy.svg" alt="Guardians of the Galaxy Icon" class="console-card-icons"> Heroes played. No effect.`,
  );
return;
    }
}

async function rocketRaccoonIncomingDetector() {
onscreenConsole.log(
    `Whenever a Master Strike or Villain's Ambush ability is completed, you may gain a Shard.`,
  );
}

async function rocketRaccoonIncomingDetectorDecision() {
    return new Promise((resolve) => {

    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO GAIN A SHARD?",
        "Yes",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "ROCKECT RACCOON - INCOMING DETECTOR";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage =
          "url('Visual Assets/Heroes/GotG/GotG_RocketRaccoon_IncomingDetector.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        onscreenConsole.log(
          `You gain a Shard.`,
        );
        playSFX("shards");
        totalPlayerShards += 1;
        shardsGainedThisTurn += 1;
        shardSupply -= 1;
        closeInfoChoicePopup();
        resolve();
      };

      denyButton.onclick = () => {
        onscreenConsole.log(
          `You have chosen not to gain a Shard.`,
        );
        closeInfoChoicePopup();
        resolve();
      };
    }, 10);
  });
}

function rocketRaccoonVengeanceIsRocket() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const techPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Tech"),
  ).length;
  
  const masterStrikeCount = koPile.filter((item) => item.name === "Master Strike").length;
  
  if (techPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
onscreenConsole.log(
    `There are ${masterStrikeCount} Master Strike${masterStrikeCount === 1 ? '' : 's'} in the KO pile and/or stacked next to the Mastermind. You get +${masterStrikeCount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
totalAttackPoints += masterStrikeCount;
cumulativePlayerAttack += masterStrikeCount;
  } else {
        onscreenConsole.log(
    `No <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Heroes played. No effect.`,
  );
  return;
    }
}

async function starLordElementGuns() {
onscreenConsole.log(
    `You gain 1 Shard.`,
  );
  playSFX("shards");
totalPlayerShards += 1;
shardsGainedThisTurn += 1;
shardSupply -= 1;
}

function starLordLegendaryOutlaw() {
  return new Promise((resolve, reject) => {
    try {
      if (playerArtifacts.length === 0) {
        console.log("No Artifacts available to copy.");
        onscreenConsole.log("No Artifacts available to copy.");
        resolve(false);
        return;
      }

      updateGameBoard();

      const cardchoicepopup = document.querySelector(".card-choice-popup");
      const modalOverlay = document.getElementById("modal-overlay");
      const selectionRow1 = document.querySelector(
        ".card-choice-popup-selectionrow1",
      );
      const previewElement = document.querySelector(
        ".card-choice-popup-preview",
      );
      const titleElement = document.querySelector(".card-choice-popup-title");
      const instructionsElement = document.querySelector(
        ".card-choice-popup-instructions",
      );
      const closeButton = document.querySelector(
        ".card-choice-popup-closebutton",
      );

      titleElement.textContent = "Star-Lord - Legendary Outlaw";
      instructionsElement.innerHTML =
        `Choose an Artifact you control with a "once per turn" ability. Play a copy of one of those abilities.`;

      document.querySelector(
        ".card-choice-popup-selectionrow1label",
      ).style.display = "none";
      document.querySelector(
        ".card-choice-popup-selectionrow2label",
      ).style.display = "none";
      document.querySelector(".card-choice-popup-selectionrow2").style.display =
        "none";
      document.querySelector(
        ".card-choice-popup-selectionrow2-container",
      ).style.display = "none";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "28%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.transform = "translateY(-50%)";

      selectionRow1.innerHTML = "";
      previewElement.innerHTML = "";
      previewElement.style.backgroundColor = "var(--panel-backgrounds)";

      let selectedCard = null;
      let selectedCardImage = null;
      let isDragging = false;

      // ✨ Use a sorted copy (don't mutate playerHand)
      const handForUI = [...playerArtifacts];
      genericCardSort(handForUI);

      setupIndependentScrollGradients(selectionRow1, null);

      handForUI.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "popup-card";

        const cardImage = document.createElement("img");
        cardImage.src = card.image;
        cardImage.alt = card.name;
        cardImage.className = "popup-card-image";

        const handleHover = () => {
          if (isDragging) return;
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          if (selectedCard === null)
            previewElement.style.backgroundColor = "var(--accent)";
        };

        const handleHoverOut = () => {
          if (isDragging) return;
          if (selectedCard === null) {
            setTimeout(() => {
              if (!selectionRow1.querySelector(":hover") && !isDragging) {
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor =
                  "var(--panel-backgrounds)";
              }
            }, 50);
          }
        };

        cardElement.addEventListener("mouseover", handleHover);
        cardElement.addEventListener("mouseout", handleHoverOut);

        cardElement.addEventListener("click", (e) => {
          if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }

          if (selectedCard === card) {
            selectedCard = null;
            cardImage.classList.remove("selected");
            selectedCardImage = null;
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            instructionsElement.innerHTML =
              'Choose an Artifact you control with a "once per turn" ability. Play a copy of one of those abilities.';
            document.getElementById("card-choice-popup-confirm").disabled =
              true;
          } else {
            if (selectedCardImage)
              selectedCardImage.classList.remove("selected");
            selectedCard = card;
            selectedCardImage = cardImage;
            cardImage.classList.add("selected");

            previewElement.innerHTML = "";
            const previewImage = document.createElement("img");
            previewImage.src = card.image;
            previewImage.alt = card.name;
            previewImage.className = "popup-card-preview-image";
            previewElement.appendChild(previewImage);
            previewElement.style.backgroundColor = "var(--accent)";

            instructionsElement.innerHTML = `Selected: A copy of <span class="console-highlights">${card.name}</span><span class="bold-spans">'s</span> ability will be played.`;
            document.getElementById("card-choice-popup-confirm").disabled =
              false;
          }
        });

        cardElement.appendChild(cardImage);
        selectionRow1.appendChild(cardElement);
      });

      // existing multi-row sizing logic unchanged …

      setupDragScrolling(selectionRow1);

      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const otherChoiceButton = document.getElementById(
        "card-choice-popup-otherchoice",
      );
      const noThanksButton = document.getElementById(
        "card-choice-popup-nothanks",
      );

      confirmButton.disabled = true;
      otherChoiceButton.style.display = "none";
      noThanksButton.style.display = "none";

      confirmButton.onclick = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!selectedCard) return;

        closeCardChoicePopup();

        onscreenConsole.log(
          `You chose to play a copy of <span class="console-highlights">${selectedCard.name}</span><span class="bold-spans">'s</span> "once per turn" ability.`,
        );

        let abilityPromise = Promise.resolve();
        if (
          selectedCard.unconditionalAbility &&
          selectedCard.unconditionalAbility !== "None"
        ) {
          const abilityFunction = window[selectedCard.unconditionalAbility];
          if (typeof abilityFunction === "function") {
            abilityPromise = new Promise((resolveAbility, rejectAbility) => {
              try {
                const result = abilityFunction(selectedCard);
                if (result instanceof Promise) {
                  result.then(resolveAbility).catch(rejectAbility);
                } else {
                  resolveAbility(result);
                }
              } catch (error) {
                rejectAbility(error);
              }
            });
          } else {
            console.error(
              `Unconditional ability function ${selectedCard.unconditionalAbility} not found`,
            );
          }
        }

        try {
          await abilityPromise;
          resolve(true);
        } catch (error) {
          console.error("Error executing ability:", error);
          reject(error);
        }
      };

      modalOverlay.style.display = "block";
      cardchoicepopup.style.display = "block";
    } catch (error) {
      reject(error);
    }
  });
}

async function starLordImplantedMemoryChip() {
extraDraw();
}

async function starLordSentientStarship() {
onscreenConsole.log(
    `You currently control ${playerArtifacts.length} Artifact${playerArtifacts.length === 1 ? '' : 's'} and gain ${playerArtifacts.length} Shard${playerArtifacts.length === 1 ? '' : 's'}.`,
  );
  if (playerArtifacts.length > 0) {
playSFX("shards");
}  
totalPlayerShards += playerArtifacts.length;
shardsGainedThisTurn += playerArtifacts.length;
shardSupply -= playerArtifacts.length;
}

//Expansion Splash

function initCosmicBackground() {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");

  // Stars configuration
  const stars = [];
  const shootingStars = [];
  let animationId;
  let frame = 0;

  function initCosmicElements() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear existing arrays
    stars.length = 0;
    shootingStars.length = 0;

    // Create stars - more stars for larger screens
    const starCount = Math.min(300, Math.floor((canvas.width * canvas.height) / 5000));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5,
        twinkle: Math.random() * 0.03 + 0.005,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.3 + 0.1
      });
    }

    // Create shooting stars
    for (let i = 0; i < 4; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 50, // Start near top
        speed: 15 + Math.random() * 20,
        length: 40 + Math.random() * 60,
        active: false,
        trail: [],
        angle: Math.PI / 4 + (Math.random() * Math.PI / 6 - Math.PI / 12) // ~45° angle with slight variation
      });
    }
  }

  // Animation loop
  function draw() {
    frame++;
    
    // Clear canvas with cosmic background color
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#0a0e17");
    gradient.addColorStop(0.5, "#1a1f2c");
    gradient.addColorStop(1, "#0a0e17");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add nebula-like effect
    const nebulaGradient = ctx.createRadialGradient(
      canvas.width * 0.7,
      canvas.height * 0.3,
      0,
      canvas.width * 0.7,
      canvas.height * 0.3,
      Math.max(canvas.width, canvas.height) * 0.8
    );
    nebulaGradient.addColorStop(0, "rgba(120, 80, 200, 0.15)");
    nebulaGradient.addColorStop(1, "rgba(26, 31, 44, 0)");
    
    ctx.fillStyle = nebulaGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Animate stars
    stars.forEach((star) => {
      // Twinkle effect using sine wave
      const opacity = Math.sin(frame * star.twinkle) * 0.3 + star.opacity;
      
      // Add subtle movement to some stars
      star.x += Math.sin(frame * 0.01 + star.x) * 0.05;
      star.y += Math.cos(frame * 0.01 + star.y) * 0.05;
      
      // Wrap stars around screen
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;
      
      // Draw star
      ctx.fillStyle = `rgba(229, 222, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow to larger stars
      if (star.size > 1.2) {
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        glow.addColorStop(0, `rgba(229, 222, 255, ${opacity * 0.3})`);
        glow.addColorStop(1, "rgba(229, 222, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Animate shooting stars
    shootingStars.forEach((star) => {
      // Randomly activate shooting stars (lower chance)
      if (!star.active && Math.random() < 0.003) {
        star.active = true;
        star.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.2;
        star.y = -20; // Start just above the screen
        star.trail = [];
        star.angle = Math.PI / 4 + (Math.random() * Math.PI / 6 - Math.PI / 12); // ~45° angle
      }

      if (star.active) {
        // Calculate movement based on angle (top-right to bottom-left)
        const moveX = Math.cos(star.angle) * star.speed;
        const moveY = Math.sin(star.angle) * star.speed;
        
        // Update position
        star.x += moveX;
        star.y += moveY;
        
        // Create trail effect
        star.trail.push({x: star.x, y: star.y});
        if (star.trail.length > 20) {
          star.trail.shift();
        }
        
        // Draw trail with fading gradient
        for (let i = 0; i < star.trail.length; i++) {
          const point = star.trail[i];
          const trailOpacity = i / star.trail.length;
          const trailLength = star.trail.length;
          
          // Draw gradient trail segments
          if (i > 0) {
            const prevPoint = star.trail[i-1];
            
            // Create gradient for each segment
            const segmentGradient = ctx.createLinearGradient(
              prevPoint.x, prevPoint.y,
              point.x, point.y
            );
            
            const startOpacity = (i-1) / trailLength * 0.7;
            const endOpacity = i / trailLength * 0.7;
            
            segmentGradient.addColorStop(0, `rgba(255, 113, 154, ${startOpacity})`);
            segmentGradient.addColorStop(1, `rgba(255, 113, 154, ${endOpacity})`);
            
            ctx.strokeStyle = segmentGradient;
            ctx.lineWidth = 2 * trailOpacity;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
        }
        
        // Draw main shooting star line
        const endX = star.x - Math.cos(star.angle) * star.length;
        const endY = star.y - Math.sin(star.angle) * star.length;
        
        const lineGradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        lineGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        lineGradient.addColorStop(0.5, "rgba(255, 200, 200, 0.7)");
        lineGradient.addColorStop(1, "rgba(255, 113, 154, 0.2)");
        
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Glow at head
        const headGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 8);
        headGlow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        headGlow.addColorStop(0.5, "rgba(255, 200, 200, 0.4)");
        headGlow.addColorStop(1, "rgba(255, 113, 154, 0)");
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Small bright core
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Deactivate if off screen
        if (star.x < -100 || star.x > canvas.width + 100 || 
            star.y < -100 || star.y > canvas.height + 100) {
          star.active = false;
          star.trail = [];
        }
      }
    });

    animationId = requestAnimationFrame(draw);
  }

  function handleResize() {
    cancelAnimationFrame(animationId);
    initCosmicElements();
    draw();
  }

  // Debounced resize handler
  let resizeTimeout;
  function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  }

  // Initialize and start animation
  initCosmicElements();
  draw();
  window.addEventListener("resize", debouncedResize);
}

function initSplash() {
  const splashContent = document.getElementById("splashContent");
  const splashText = document.getElementById("splashText");
  const backgroundElement = document.getElementById(
    "background-for-expansion-popup",
  );
  const popupContainer = document.getElementById("expansion-popup-container");

  // Initialize cosmic background instead of cityscape
  initCosmicBackground();

  // Start as a circle
  setTimeout(() => {
    // Calculate size based on screen dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const size = Math.min(screenWidth, screenHeight) * 0.3;

    splashContent.style.width = size + "px";
    splashContent.style.height = size + "px";
    splashContent.classList.add("visible");

    // After 4 seconds, transform to rectangle
    setTimeout(() => {
      splashContent.classList.remove("circular");
      splashContent.classList.add("rectangular");

      // Set rectangle dimensions based on screen size
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        splashContent.style.width = "70%";
        splashContent.style.height = "auto";
        splashContent.style.minHeight = "40%";
      } else {
        splashContent.style.width = "70%";
        splashContent.style.height = "auto";
        splashContent.style.maxWidth = "600px";
      }

      // Fade in content
      setTimeout(() => {
        splashText.classList.add("visible");
      }, 1000);
    }, 4000);
  }, 2000); // Initial delay
}

// Initialize everything when the window loads
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const restartParam = urlParams.get("restart");

  if (restartParam === "true") {
    skipSplashAndIntro();
    return;
  }
  initSplash();
};