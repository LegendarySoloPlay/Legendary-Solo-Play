// Fantastic Four Expansion
//12.11.2025 15.15

//Keywords

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

// Helper function for Cosmic Threat card selection
async function handleCosmicThreatCardSelection(
  villain,
  villainIndex,
  className,
) {
  const allRevealableCards = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  const hasClass = (card, wanted) => {
    if (!card?.classes) return false;
    const wantedClass = String(wanted).trim().toLowerCase();
    return card.classes.some((classType) => {
      const actualClass = String(classType ?? "")
        .trim()
        .toLowerCase();
      return actualClass === wantedClass;
    });
  };

  const cardsOfClass = allRevealableCards.filter((c) => hasClass(c, className));
  const maxCards = cardsOfClass.length;

  // If only 1 card available, trigger cosmicThreat instantly
  if (maxCards <= 1) {
    const count = maxCards * 3;
    cosmicThreat(villain, villainIndex, count, className.toLowerCase());
    return;
  }

  // If multiple cards available, show popup for selection
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
    closeBtn.style.display = "none";
    const minimizeBtn = document.querySelector(
      ".info-or-choice-popup-minimizebutton",
    );

    // Set popup content
    titleEl.textContent = "COSMIC THREAT";
    instrEl.innerHTML = `How many <img src="Visual Assets/Icons/${className}.svg" alt="${className} Icon" class="cosmic-threat-card-icons"> cards to reveal? For each revealed card, <span class="console-highlights">${villain.name}</span> gets -3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;

    // Set card preview background
    if (villain.image) {
      previewEl.style.backgroundImage = `url('${villain.image}')`;
      previewEl.style.backgroundSize = "contain";
      previewEl.style.backgroundRepeat = "no-repeat";
      previewEl.style.backgroundPosition = "center";
    }

    // PRESET TO MAXIMUM QUANTITY
    let chosenQty = maxCards;

    // SWAP BUTTON ROLES: noThanks becomes +, other becomes confirm, confirm becomes -
    noThanksBtn.textContent = "+";
    otherBtn.textContent = "CONFIRM";
    confirmBtn.textContent = "-";

    // Show all buttons
    confirmBtn.style.display = "inline-block";
    otherBtn.style.display = "inline-block";
    noThanksBtn.style.display = "inline-block";

    function updateQuantityText() {
      const plural = chosenQty === 1 ? "card" : "cards";
      const maxPlural = maxCards === 1 ? "card" : "cards";
      instrEl.innerHTML =
        `Chosen: <span class="console-highlights">${chosenQty}</span> ${plural} (max ${maxCards} ${maxPlural}). ` +
        `For each revealed card, <span class="console-highlights">${villain.name}</span> gets -3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;
    }

    // Button handlers
    confirmBtn.onclick = (e) => {
      e.stopPropagation();
      if (chosenQty > 0) {
        chosenQty -= 1;
        updateQuantityText();
      }
    };

    noThanksBtn.onclick = (e) => {
      e.stopPropagation();
      if (chosenQty < maxCards) {
        chosenQty += 1;
        updateQuantityText();
      }
    };

    otherBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeInfoChoicePopup();
      // Close popup
      popup.style.display = "none";
      modalOverlay.style.display = "none";

      // Trigger cosmicThreat with selected quantity
      const count = chosenQty * 3;
      cosmicThreat(villain, villainIndex, count, className.toLowerCase());
      noThanksBtn.textContent = "NO THANKS!";
      otherBtn.textContent = "OTHER";
      confirmBtn.textContent = "CONFIRM";

      // Show all buttons
      confirmBtn.style.display = "inline-block";
      otherBtn.style.display = "none";
      noThanksBtn.style.display = "none";
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
    updateQuantityText();
  });
}

// Helper function for Galactus Cosmic Threat card selection
async function handleGalactusCosmicThreatCardSelection(chosenClass) {
  const allRevealableCards = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  const hasClass = (card, wanted) =>
    card?.classes?.some(
      (classType) =>
        String(classType ?? "")
          .trim()
          .toLowerCase() === String(wanted).trim().toLowerCase(),
    ) || false;

  const cardsOfClass = allRevealableCards.filter((c) =>
    hasClass(c, chosenClass),
  );
  const maxCards = cardsOfClass.length;

  // If only 1 card available, return instantly
  if (maxCards <= 1) {
    return { attackReduction: maxCards * 3, chosenClass };
  }

  // If multiple cards available, show popup for selection
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
    const minimizeBtn = document.querySelector(
      ".info-or-choice-popup-minimizebutton",
    );

    // Set popup content
    titleEl.textContent = "GALACTUS COSMIC THREAT";
    instrEl.innerHTML = `How many <img src="Visual Assets/Icons/${chosenClass}.svg" alt="${chosenClass} Icon" class="cosmic-threat-card-icons"> cards to reveal? For each revealed card, <span class="console-highlights">Galactus</span> gets -3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;

    // Set Galactus preview
    const mastermind = getSelectedMastermind();
    if (mastermind?.image) {
      previewEl.style.backgroundImage = `url('${mastermind.image}')`;
      previewEl.style.backgroundSize = "contain";
      previewEl.style.backgroundRepeat = "no-repeat";
      previewEl.style.backgroundPosition = "center";
    }

    // PRESET TO MAXIMUM QUANTITY
    let chosenQty = maxCards;

    // SWAP BUTTON ROLES: noThanks becomes +, other becomes confirm, confirm becomes -
    noThanksBtn.textContent = "+";
    otherBtn.textContent = "CONFIRM";
    confirmBtn.textContent = "-";

    // Show all buttons
    confirmBtn.style.display = "inline-block";
    otherBtn.style.display = "inline-block";
    noThanksBtn.style.display = "inline-block";

    function updateQuantityText() {
      const plural = chosenQty === 1 ? "card" : "cards";
      const maxPlural = maxCards === 1 ? "card" : "cards";
      instrEl.innerHTML =
        `Chosen: <span class="console-highlights">${chosenQty}</span> ${plural} (max ${maxCards} ${maxPlural}). ` +
        `For each revealed card, <span class="console-highlights">Galactus</span> gets -3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;
    }

    // Button handlers
    confirmBtn.onclick = (e) => {
      e.stopPropagation();
      if (chosenQty > 0) {
        chosenQty -= 1;
        updateQuantityText();
      }
    };

    noThanksBtn.onclick = (e) => {
      e.stopPropagation();
      if (chosenQty < maxCards) {
        chosenQty += 1;
        updateQuantityText();
      }
    };

    otherBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeInfoChoicePopup();

      // Close popup
      popup.style.display = "none";
      modalOverlay.style.display = "none";

      // Return the selected quantity
      resolve({ attackReduction: chosenQty * 3, chosenClass });
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
    updateQuantityText();
  });
}

// Helper function for Beyonder Cosmic Threat card selection
async function handleBeyonderCosmicThreatCardSelection(threshold) {
  const allRevealableCards = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  const highCostCards = allRevealableCards.filter(
    (c) => typeof c?.cost === "number" && c.cost >= threshold,
  );
  const maxCards = highCostCards.length;

  // If only 1 card available, return instantly
  if (maxCards <= 1) {
    return { attackReduction: maxCards * 3 };
  }

  // If multiple cards available, show popup for selection
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
    const minimizeBtn = document.querySelector(
      ".info-or-choice-popup-minimizebutton",
    );

    // Set popup content
    titleEl.textContent = "COSMIC THREAT";
    instrEl.innerHTML = `How many cards with <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="cosmic-threat-card-icons"> ${threshold}+ to reveal? For each revealed card, <span class="console-highlights">The Beyonder</span> gets -3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;

    // Set mastermind preview
    const mastermind = getSelectedMastermind();
    if (mastermind?.image) {
      previewEl.style.backgroundImage = `url('${mastermind.image}')`;
      previewEl.style.backgroundSize = "contain";
      previewEl.style.backgroundRepeat = "no-repeat";
      previewEl.style.backgroundPosition = "center";
    }

    // PRESET TO MAXIMUM QUANTITY
    let chosenQty = maxCards;

    // SWAP BUTTON ROLES: noThanks becomes +, other becomes confirm, confirm becomes -
    noThanksBtn.textContent = "+";
    otherBtn.textContent = "CONFIRM";
    confirmBtn.textContent = "-";

    // Show all buttons
    confirmBtn.style.display = "inline-block";
    otherBtn.style.display = "inline-block";
    noThanksBtn.style.display = "inline-block";

    function updateQuantityText() {
      const plural = chosenQty === 1 ? "card" : "cards";
      const maxPlural = maxCards === 1 ? "card" : "cards";
      instrEl.innerHTML =
        `Chosen: <span class="console-highlights">${chosenQty}</span> ${plural} (max ${maxCards} ${maxPlural}). ` +
        `For each revealed card, <span class="console-highlights">The Beyonder</span> gets -3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;
    }

    // Button handlers
    confirmBtn.onclick = (e) => {
      e.stopPropagation();
      if (chosenQty > 0) {
        chosenQty -= 1;
        updateQuantityText();
      }
    };

    noThanksBtn.onclick = (e) => {
      e.stopPropagation();
      if (chosenQty < maxCards) {
        chosenQty += 1;
        updateQuantityText();
      }
    };

    otherBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // Close popup
      popup.style.display = "none";
      modalOverlay.style.display = "none";

      // Return the selected quantity
      resolve({ attackReduction: chosenQty * 3 });
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
    updateQuantityText();
  });
}

async function handleCosmicThreatChoice(card, index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allRevealableCards = [
        ...playerHand,
        ...cardsPlayedThisTurn.filter(
          (card) => !card.isCopied && !card.sidekickToDestroy,
        ),
      ];

      // Updated hasClass function to check classes array
      const hasClass = (card, wanted) =>
        card?.classes?.some(
          (classType) =>
            String(classType ?? "")
              .trim()
              .toLowerCase() === String(wanted).trim().toLowerCase(),
        ) || false;

      let className1, className2, imagePath, attackPerCard;

      switch (card.name) {
        case "Arishem, The Judge":
          className1 = "Range";
          className2 = "Strength";
          imagePath =
            "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp";
          attackPerCard = 3;
          break;

        case "Exitar, The Exterminator":
          className1 = "Tech";
          className2 = "Range";
          imagePath =
            "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp";
          attackPerCard = 3;
          break;

        case "Gammenon, The Gatherer":
          className1 = "Strength";
          className2 = "Instinct";
          imagePath =
            "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp";
          attackPerCard = 3;
          break;

        case "Nezarr, The Calculator":
          className1 = "Covert";
          className2 = "Tech";
          imagePath =
            "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp";
          attackPerCard = 3;
          break;

        case "Tiamut, The Dreaming Celestial":
          className1 = "Instinct";
          className2 = "Covert";
          imagePath =
            "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp";
          attackPerCard = 3;
          break;

        default:
          className1 = "Class1";
          className2 = "Class2";
          imagePath = "Visual Assets/Other/cardback.webp";
          attackPerCard = 3;
      }

      // Count cards with each class using the updated hasClass function
      const countClass1 = allRevealableCards.filter((c) =>
        hasClass(c, className1),
      ).length;

      const countClass2 = allRevealableCards.filter((c) =>
        hasClass(c, className2),
      ).length;

      // Calculate attack reduction values
      const valueClass1 = countClass1 * attackPerCard;
      const valueClass2 = countClass2 * attackPerCard;

      // Create button texts with icons
      const confirmText = `<img src="Visual Assets/Icons/${className1}.svg" alt="${className1} Icon" class="console-card-icons"> - ${countClass1} card${countClass1 !== 1 ? "s" : ""}`;
      const denyText = `<img src="Visual Assets/Icons/${className2}.svg" alt="${className2} Icon" class="console-card-icons"> - ${countClass2} card${countClass2 !== 1 ? "s" : ""}`;

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `CHOOSE A CLASS TO REVEAL:`,
        confirmText,
        denyText,
      );

      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('${imagePath}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        cosmicThreat(card, index, valueClass1, className1);
        hideHeroAbilityMayPopup();
        cardImage.style.display = "none";
        resolve();
      };

      denyButton.onclick = () => {
        cosmicThreat(card, index, valueClass2, className2);
        hideHeroAbilityMayPopup();
        cardImage.style.display = "none";
        resolve();
      };
    }, 10);
  });
}

function cosmicThreat(card, index, attackReduction, className) {
  playSFX("cosmic-threat");
  // Capitalize the first character of className
  const capitalizedClassName = className.charAt(0).toUpperCase() + className.slice(1);
  
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
  const cardText = cardCount === 1 ? "card" : "cards";
  onscreenConsole.log(
    `Cosmic Threat! You have revealed ${cardCount} <img src="Visual Assets/Icons/${className}.svg" alt="${capitalizedClassName} Icon" class="console-card-icons"> ${cardText}. <span class="console-highlights">${card.name}</span> gets -${attackReduction} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
  updateGameBoard();
}

// Call whenever an attack is completed
function removeCosmicThreatBuff(cityIndex) {
  if (cityIndex === 0 && city1CosmicThreat > 0) {
    city1TempBuff += city1CosmicThreat;
    city1CosmicThreat = 0;
  } else if (cityIndex === 1 && city2CosmicThreat > 0) {
    city2TempBuff += city2CosmicThreat;
    city2CosmicThreat = 0;
  } else if (cityIndex === 2 && city3CosmicThreat > 0) {
    city3TempBuff += city3CosmicThreat;
    city3CosmicThreat = 0;
  } else if (cityIndex === 3 && city4CosmicThreat > 0) {
    city4TempBuff += city4CosmicThreat;
    city4CosmicThreat = 0;
  } else if (cityIndex === 4 && city5CosmicThreat > 0) {
    city5TempBuff += city5CosmicThreat;
    city5CosmicThreat = 0;
  }

  updateGameBoard();
}

//Schemes

async function risingWatersTwist() {
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

      // Remove from HQ and replace with new card
      const hqIndex = hq.indexOf(hero);
      if (hqIndex !== -1) {
        hq[hqIndex] = null;

        const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
        hq[hqIndex] = newCard; // Use hqIndex instead of index

        if (newCard) {
          // Log the KO
          onscreenConsole.log(
            `KO'd <span class="console-highlights">${hero.name}</span> (Cost: ${hero.cost}) from HQ.`,
          );
          onscreenConsole.log(
            `<span class="console-highlights">${newCard.name}</span> has entered the HQ.`,
          );
        } else {
          onscreenConsole.log(
            `KO'd <span class="console-highlights">${hero.name}</span> (Cost: ${hero.cost}) from HQ.`,
          );
        }
      }

      updateGameBoard();

      if (!hq[hqIndex] && heroDeck.length === 0) {
        // Use hqIndex instead of index
        showDrawPopup();
      }
    }
  }

  // Log results
  if (heroesKOd === 0) {
    onscreenConsole.log(
      `No Heroes in HQ cost less than or equal to the Rising Waters stack (${schemeTwistCount}).`,
    );
  } else {
    onscreenConsole.log(
      `Rising Waters KO'd ${heroesKOd} Hero${heroesKOd !== 1 ? "es" : ""} from the HQ.`,
    );
  }

  updateGameBoard();
}

async function pullRealityIntoTheNegativeZoneTwist() {
  if (
    schemeTwistCount === 2 ||
    schemeTwistCount === 4 ||
    schemeTwistCount === 6
  ) {
    negativeZoneAttackAndRecruit = true;
  } else {
    negativeZoneAttackAndRecruit = false;
  }
  updateGameBoard();
}

async function invincibleForceFieldTwist() {
  stackedTwistNextToMastermind++;
  const mastermind = getSelectedMastermind();
  invincibleForceField++;
  onscreenConsole.log(
    `<span class="console-highlights">${mastermind.name}</span> now has ${invincibleForceField} Force Field${invincibleForceField === 1 ? "" : "s"}.`,
  );
  updateGameBoard();
}

async function batheEarthInCosmicRaysTwist() {
  return new Promise((resolve) => {
    // Build an array of eligible (non-grey) heroes you can access later
    const COLOURS = new Set(["Green", "Yellow", "Black", "Blue", "Red"]);
    const eligibleCards = playerHand.filter(
      (c) => c && COLOURS.has(String(c.color || "").trim()),
    );

    if (eligibleCards.length === 0) {
      console.log(
        "No eligible coloured cards in hand (Green/Yellow/Black/Blue/Red).",
      );
      onscreenConsole.log("No non-grey Heroes available to KO.");
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
    titleElement.textContent = "SCHEME TWIST";
    instructionsElement.innerHTML =
      "Select a non-grey Hero to KO from your hand. You will then be able to choose a Hero from the HQ with the same or lower cost and put it into your hand.";

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
            "Select a non-grey Hero to KO from your hand. You will then be able to choose a Hero from the HQ with the same or lower cost and put it into your hand.";
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
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be KO'd.`;
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
    confirmButton.textContent = "Confirm KO";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {
        console.log("Card KO'd:", selectedCard);

        // Find the selected card's current index in the *actual* hand
        const indexInHand = playerHand.findIndex(
          (c) => c && c.id === selectedCard.id,
        );
        if (indexInHand !== -1) {
          // Remove the card from the player's hand
          const koedCard = playerHand.splice(indexInHand, 1)[0];
          koPile.push(koedCard);
          onscreenConsole.log(
            `<span class="console-highlights">${koedCard.name}</span> has been KO'd.`,
          );
          koBonuses();
          updateGameBoard();

          // Close popup before proceeding to next phase
          closeCardChoicePopup();

          // Proceed to recruitment phase
          await cosmicRaysRecruit(selectedCard.cost);
        } else {
          console.error("Selected card not found in player hand");
          onscreenConsole.log("Error: Selected card not found in hand.");
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

async function cosmicRaysRecruit(maxCost) {
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
    titleElement.textContent = "Scheme Twist";
    instructionsElement.textContent = `Choose a Hero from the HQ with ${maxCost} or less cost to put into your hand.`;

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedHQIndex = null;
    let selectedCell = null;

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

      const hero = hq[index];
      const explosionValue = explosionValues[index] || 0;

      // Update explosion indicators
      if (explosion && explosionCount) {
        // Add this null check
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
          explosion.style.display = "none";
          explosionCount.style.display = "none";
          explosion.classList.remove("max-explosions");
          cell.classList.remove("destroyed");
        }
      }

      // Update label
      document.getElementById(
        `hq-city-table-city-hq-${slot}-label`,
      ).textContent = `HQ-${slot}`;

      // Remove any existing selection classes from cell
      cell.classList.remove("selected");

      if (hero) {
        // Set the actual hero image
        cardImage.src = hero.image;
        cardImage.alt = hero.name;

        // Determine eligibility - Hero type and cost <= maxCost (not destroyed)
        const isHeroType = hero.type === "Hero";
        const isEligibleCost = hero.cost <= maxCost;
        const isDestroyed = explosionValue >= 6;
        const isEligible = isHeroType && isEligibleCost && !isDestroyed;

        // Apply greyed out styling for ineligible cards
        if (!isEligible) {
          cardImage.classList.add("greyed-out");
        } else {
          cardImage.classList.remove("greyed-out");
        }

        // Add click handler for eligible cards only
        if (isEligible) {
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

              // Update instructions and confirm button state
              instructionsElement.textContent = `Choose a Hero from the HQ with ${maxCost} or less cost to put into your hand.`;
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
              selectedCell = cell;
              cell.classList.add("selected");

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = hero.image;
              previewImage.alt = hero.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);
              previewElement.style.backgroundColor = "var(--accent)";

              // Update instructions and confirm button state
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be gained and put in your hand.`;
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
            previewImage.src = hero.image;
            previewImage.alt = hero.name;
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
        // No hero in this slot - reset to card back and grey out
        cardImage.src = "Visual Assets/CardBack.webp";
        cardImage.alt = "Empty HQ Slot";
        cardImage.classList.add("greyed-out");
        cardImage.style.cursor = "not-allowed";
        cardImage.onclick = null;
        cardImage.onmouseover = null;
        cardImage.onmouseout = null;
      }
    });

    // Check if any eligible heroes exist - same logic as original
    const eligibleHeroes = hq.filter((hero, index) => {
      const explosionValue = explosionValues[index] || 0;
      return (
        hero &&
        hero.type === "Hero" &&
        hero.cost <= maxCost &&
        explosionValue < 6
      ); // Not destroyed
    });

    if (eligibleHeroes.length === 0) {
      onscreenConsole.log(`No Heroes in the HQ with ${maxCost} or less cost.`);
      resolve();
      return;
    }

    // Set up button handlers
    const confirmButton = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherChoiceButton = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-city-hq-popup-nothanks",
    );

    // Disable confirm initially and set button text
    confirmButton.disabled = true;
    confirmButton.textContent = "Gain";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(async () => {
        const hero = hq[selectedHQIndex];

        // Remove from HQ and replace with new card from deck
        const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
        hq[selectedHQIndex] = newCard;

        if (newCard) {
          onscreenConsole.log(
            `<span class="console-highlights">${newCard.name}</span> has entered the HQ.`,
          );
        }

        addHRToTopWithInnerHTML();

        if (!hq[selectedHQIndex] && heroDeck.length === 0) {
          heroDeckHasRunOut = true;
        }

        // Add to hand
        playerHand.push(hero);
        playSFX("recruit");
        onscreenConsole.log(
          `<span class="console-highlights">${hero.name}</span> gained and put in your hand.`,
        );

        updateGameBoard();
        closeHQCityCardChoicePopup();
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

//Masterminds

function galactusMasterStrike() {
  // Find the first non-destroyed space starting from the front
  for (let i = 0; i < destroyedSpaces.length; i++) {
    if (!destroyedSpaces[i]) {
      // Destroy this space
      destroyedSpaces[i] = true;
      onscreenConsole.log(
        `<span class="console-destruction">${citySpaceLabels[i]} is destroyed!</span>`,
      );

      const allSpacesDestroyed = destroyedSpaces.every(
        (space) => space === true,
      );

      if (allSpacesDestroyed) {
        onscreenConsole.log("The entire city has been destroyed!");
      }

      galactusDestroyedCityDelay = true;

      // Any villain at this space immediately escapes
      if (city[i] !== null) {
        const escapedVillain = city[i];
        city[i] = null;
        removeCosmicThreatBuff(i);

        // Show escape popup
        setTimeout(async () => {
          await new Promise((resolve) => {
            showPopup("Destroyed City Villain Escape", escapedVillain, resolve);
          });
          await handleVillainEscape(escapedVillain);
          addHRToTopWithInnerHTML();
          
          // MOVE THIS INSIDE the setTimeout after escape handling is complete
          galactusDestroyedCityDelay = false;
          updateGameBoard();
        }, 200);
      } else {
        // If no villain to escape, set delay to false immediately
        galactusDestroyedCityDelay = false;
        updateGameBoard();
      }

      return; // Exit after destroying one space
    }
  }
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
  const CLASSES = ["Strength", "Instinct", "Covert", "Tech", "Range"];

  // Build the same pool & counts as your original
  const cardsPool = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter((c) => !c?.isCopied && !c?.sidekickToDestroy),
  ];

  const cardHasClass = (card, cls) =>
    !!card && card.classes && card.classes.includes(cls);

  const countsByClass = {};
  for (const cls of CLASSES) {
    countsByClass[cls] = cardsPool.reduce(
      (acc, c) => acc + (cardHasClass(c, cls) ? 1 : 0),
      0,
    );
  }

  return new Promise((resolve) => {
    // Core elements
    const popup = document.querySelector(".card-choice-city-hq-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const titleEl = document.querySelector(".card-choice-city-hq-popup-title");
    const instrEl = document.querySelector(
      ".card-choice-city-hq-popup-instructions",
    );
    const confirmBtn = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherBtn = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );
    const noThanksBtn = document.getElementById(
      "card-choice-city-hq-popup-nothanks",
    );

    // Layout tweaks for THIS popup only
    const previewContainer = document.querySelector(
      ".card-choice-city-hq-popup-preview-container",
    );
    const selectionContainer = document.querySelector(
      ".card-choice-city-hq-popup-selection-container",
    );
    if (previewContainer) previewContainer.style.display = "none";
    if (selectionContainer) selectionContainer.style.width = "95%";

    // Hide mastermind cell/label just in case
    const mastermindImage = document.getElementById(
      "hq-city-table-mastermind-image",
    );
    const mastermindLabel = document.getElementById("hq-city-table-mastermind");
    if (mastermindImage) mastermindImage.style.display = "none";
    if (mastermindLabel) mastermindLabel.style.display = "none";

    // Init UI
    titleEl.textContent = "MASTERMIND TACTIC";
    instrEl.textContent =
      "Select a class. You may reveal any number of cards of that class, then draw that many cards.";
    confirmBtn.disabled = true;
    confirmBtn.textContent = "CONFIRM CLASS";
    otherBtn.style.display = "none";
    noThanksBtn.style.display = "none";

    modalOverlay.style.display = "block";
    popup.style.display = "block";

    // State
    let phase = "chooseClass"; // or 'chooseQuantity'
    let selectedIndex = null;
    let selectedCell = null;
    let selectedClass = null;
    let maxQty = 0;
    let chosenQty = 0;

    // Render class choices into the five cells
    function renderClassGrid() {
      phase = "chooseClass";
      selectedIndex = null;
      selectedCell = null;
      selectedClass = null;
      maxQty = 0;
      chosenQty = 0;

      confirmBtn.disabled = true;
      confirmBtn.textContent = "CONFIRM CLASS";
      otherBtn.style.display = "none";
      noThanksBtn.style.display = "none";

      instrEl.textContent =
        "Select a class. You may reveal any number of cards of that class, then draw that many cards.";

      CLASSES.forEach((cls, idx) => {
        const slot = idx + 1;
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const img = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );
        const labelEl = document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        );
        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        if (!cell || !img || !labelEl) return;

        // Neutralise any explosion UI
        if (explosion) {
          explosion.style.display = "none";
          explosion.classList.remove("max-explosions");
        }
        if (explosionCount) explosionCount.style.display = "none";

        // Class icon
        img.src = `Visual Assets/Icons/${cls}.svg`;
        img.alt = `${cls} Icon`;
        img.classList.remove("greyed-out", "destroyed-space");
        img.style.display = "block";
        img.style.cursor = "pointer";

        // Label with live count
        const count = countsByClass[cls] || 0;
        const plural = count === 1 ? "CARD" : "CARDS";
        labelEl.textContent = `${cls.toUpperCase()} - ${count} ${plural}`;

        // Reset selection styling & handlers
        cell.classList.remove("selected");
        img.onclick = null;

        // All classes remain selectable (even when count = 0)
        img.onclick = (e) => {
          e.stopPropagation();

          if (selectedIndex === idx) {
            // deselect
            selectedIndex = null;
            selectedCell?.classList.remove("selected");
            selectedCell = null;
            selectedClass = null;
            maxQty = 0;
            chosenQty = 0;
            confirmBtn.disabled = true;
            instrEl.textContent =
              "Select a class. You may reveal any number of cards of that class, then draw that many cards.";
          } else {
            // new selection
            selectedCell?.classList.remove("selected");
            selectedIndex = idx;
            selectedCell = cell;
            cell.classList.add("selected");
            selectedClass = cls;
            maxQty = countsByClass[cls] || 0;
            chosenQty = Math.min(chosenQty, maxQty); // in case of reselection
            confirmBtn.disabled = false;

            const msgPlural = maxQty === 1 ? "card" : "cards";
            instrEl.innerHTML = `Selected: <span class="console-highlights">${cls}</span>. You can reveal up to ${maxQty} ${msgPlural}. Press <span class="bold-spans">Confirm</span> to set the quantity.`;
          }
        };
      });
    }

    // Render quantity controls (repurpose the bottom buttons as – / +)
    function renderQuantityPicker() {
      phase = "chooseQuantity";

      // PRESET TO MAXIMUM QUANTITY
      chosenQty = maxQty;

      // SWAP BUTTON ROLES: noThanks becomes +, other becomes confirm, confirm becomes -
      noThanksBtn.textContent = "+";
      otherBtn.textContent = "CONFIRM";
      confirmBtn.textContent = "-";

      otherBtn.style.display = "inline-block";
      noThanksBtn.style.display = "inline-block";

      function updateQuantityText() {
        const plural = chosenQty === 1 ? "card" : "cards";
        const maxPlural = maxQty === 1 ? "card" : "cards";
        titleEl.innerHTML = `How many <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards to reveal?`;
        instrEl.innerHTML = `Chosen: <span class="console-highlights">${chosenQty}</span> (max ${maxQty} ${maxPlural}). Reveal that many, then draw that many cards.`;
      }

      // NEW BUTTON BEHAVIORS:
      // Confirm button (now -) decreases quantity
      confirmBtn.onclick = (e) => {
        e.stopPropagation();
        if (chosenQty > 0) {
          chosenQty -= 1;
          updateQuantityText();
        }
      };

      // No Thanks button (now +) increases quantity
      noThanksBtn.onclick = (e) => {
        e.stopPropagation();
        if (chosenQty < maxQty) {
          chosenQty += 1;
          updateQuantityText();
        }
      };

      // Other button (now CONFIRM) confirms the selection
      otherBtn.onclick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Close/reset via your centralised closer
        if (typeof closeHQCityCardChoicePopup === "function")
          closeHQCityCardChoicePopup();

        // Execute draws
        for (let i = 0; i < chosenQty; i++) {
          if (typeof extraDraw === "function") extraDraw();
        }

        // Update board & resolve
        updateGameBoard?.();
        resolve();
      };

      updateQuantityText();
    }

    // Original confirm button behavior (for class selection phase)
    confirmBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (phase === "chooseClass") {
        if (selectedClass == null) return;
        renderQuantityPicker();
        return;
      }
    };

    // Optional: overlay click cancels
    modalOverlay.onclick = (e) => {
      if (e.target !== modalOverlay) return;
      if (typeof closeHQCityCardChoicePopup === "function")
        closeHQCityCardChoicePopup();
      resolve();
    };

    // Initial render
    renderClassGrid();
  });
}

async function galactusPanickedMobs() {
  const CLASSES = ["Strength", "Instinct", "Covert", "Tech", "Range"];

  // Build the pool & counts (same logic you use elsewhere)
  const cardsPool = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter((c) => !c?.isCopied && !c?.sidekickToDestroy),
  ];
  const cardHasClass = (card, cls) =>
    !!card && card.classes && card.classes.includes(cls);
  const countsByClass = {};
  for (const cls of CLASSES) {
    countsByClass[cls] = cardsPool.reduce(
      (acc, c) => acc + (cardHasClass(c, cls) ? 1 : 0),
      0,
    );
  }

  return new Promise((resolve) => {
    // Core elements
    const popup = document.querySelector(".card-choice-city-hq-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const titleEl = document.querySelector(".card-choice-city-hq-popup-title");
    const instrEl = document.querySelector(
      ".card-choice-city-hq-popup-instructions",
    );
    const confirmBtn = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherBtn = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );
    const noThanksBtn = document.getElementById(
      "card-choice-city-hq-popup-nothanks",
    );

    // This-popup-only layout tweaks
    const previewContainer = document.querySelector(
      ".card-choice-city-hq-popup-preview-container",
    );
    const selectionContainer = document.querySelector(
      ".card-choice-city-hq-popup-selection-container",
    );
    if (previewContainer) previewContainer.style.display = "none";
    if (selectionContainer) selectionContainer.style.width = "95%";

    // Hide mastermind cell/label just in case
    const mastermindImage = document.getElementById(
      "hq-city-table-mastermind-image",
    );
    const mastermindLabel = document.getElementById("hq-city-table-mastermind");
    if (mastermindImage) mastermindImage.style.display = "none";
    if (mastermindLabel) mastermindLabel.style.display = "none";

    // Init UI
    titleEl.textContent = "MASTERMIND TACTIC";
    instrEl.textContent =
      "Select a class. You may reveal any number of cards of that class, then rescue that many Bystanders.";
    confirmBtn.disabled = true;
    confirmBtn.textContent = "CONFIRM CLASS";
    otherBtn.style.display = "none";
    noThanksBtn.style.display = "none";

    modalOverlay.style.display = "block";
    popup.style.display = "block";

    // State
    let phase = "chooseClass";
    let selectedIndex = null;
    let selectedCell = null;
    let selectedClass = null;
    let maxQty = 0;
    let chosenQty = 0;

    // Render the 5 class cells
    function renderClassGrid() {
      phase = "chooseClass";
      selectedIndex = null;
      selectedCell = null;
      selectedClass = null;
      maxQty = 0;
      chosenQty = 0;

      confirmBtn.disabled = true;
      confirmBtn.textContent = "CONFIRM CLASS";
      otherBtn.style.display = "none";
      noThanksBtn.style.display = "none";

      instrEl.textContent =
        "Select a class. You may reveal any number of cards of that class, then rescue that many Bystanders.";

      CLASSES.forEach((cls, idx) => {
        const slot = idx + 1;
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const img = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );
        const labelEl = document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        );
        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        if (!cell || !img || !labelEl) return;

        // Neutralise any explosion UI
        if (explosion) {
          explosion.style.display = "none";
          explosion.classList.remove("max-explosions");
        }
        if (explosionCount) explosionCount.style.display = "none";

        // Class icon
        img.src = `Visual Assets/Icons/${cls}.svg`;
        img.alt = `${cls} Icon`;
        img.classList.remove("greyed-out", "destroyed-space");
        img.style.display = "block";
        img.style.cursor = "pointer";

        // Label with live count
        const count = countsByClass[cls] || 0;
        const plural = count === 1 ? "CARD" : "CARDS";
        labelEl.textContent = `${cls.toUpperCase()} - ${count} ${plural}`;

        // Reset selection styling & handlers
        cell.classList.remove("selected");
        img.onclick = null;

        // All classes selectable (even at 0)
        img.onclick = (e) => {
          e.stopPropagation();

          if (selectedIndex === idx) {
            // Deselect
            selectedIndex = null;
            selectedCell?.classList.remove("selected");
            selectedCell = null;
            selectedClass = null;
            maxQty = 0;
            chosenQty = 0;
            confirmBtn.disabled = true;
            instrEl.textContent =
              "Select a class. You may reveal any number of cards of that class, then rescue that many Bystanders.";
          } else {
            // Select
            selectedCell?.classList.remove("selected");
            selectedIndex = idx;
            selectedCell = cell;
            cell.classList.add("selected");
            selectedClass = cls;
            maxQty = countsByClass[cls] || 0;
            chosenQty = Math.min(chosenQty, maxQty);
            confirmBtn.disabled = false;

            const msgPlural = maxQty === 1 ? "card" : "cards";
            instrEl.innerHTML =
              `Selected: <span class="console-highlights">${cls}</span>. You can reveal up to ${maxQty} ${msgPlural}. ` +
              `Press <span class="bold-spans">Confirm</span> to set the quantity.`;
          }
        };
      });
    }

    // Quantity picker using – / + on the bottom buttons
    function renderQuantityPicker() {
      phase = "chooseQuantity";

      // PRESET TO MAXIMUM QUANTITY
      chosenQty = maxQty;

      // SWAP BUTTON ROLES: noThanks becomes –, other becomes confirm, confirm becomes +
      noThanksBtn.textContent = "+";
      otherBtn.textContent = "CONFIRM";
      confirmBtn.textContent = "-";

      otherBtn.style.display = "inline-block";
      noThanksBtn.style.display = "inline-block";

      function updateQuantityText() {
        const plural = chosenQty === 1 ? "card" : "cards";
        const maxPlural = maxQty === 1 ? "card" : "cards";
        titleEl.innerHTML = `How many <img src="Visual Assets/Icons/${selectedClass}.svg" alt="${selectedClass} Icon" class="console-card-icons"> cards to reveal?`;
        instrEl.innerHTML = `Chosen: <span class="console-highlights">${chosenQty}</span> (max ${maxQty} ${maxPlural}). Reveal that many, then rescue the same number of Bystanders.`;
      }

      // NEW BUTTON BEHAVIORS:
      // No Thanks button (now –) decreases quantity
      confirmBtn.onclick = (e) => {
        e.stopPropagation();
        if (chosenQty > 0) {
          chosenQty -= 1;
          updateQuantityText();
        }
      };

      // Confirm button (now +) increases quantity
      noThanksBtn.onclick = (e) => {
        e.stopPropagation();
        if (chosenQty < maxQty) {
          chosenQty += 1;
          updateQuantityText();
        }
      };

      // Other button (now CONFIRM) confirms the selection
      otherBtn.onclick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Close/reset via your centralised closer
        if (typeof closeHQCityCardChoicePopup === "function")
          closeHQCityCardChoicePopup();

        // Rescue that many Bystanders
        for (let i = 0; i < chosenQty; i++) {
          if (typeof rescueBystander === "function") {
            // rescueBystander appears async in your code
            // eslint-disable-next-line no-await-in-loop
            await rescueBystander();
          }
        }

        updateGameBoard?.();
        resolve();
      };

      updateQuantityText();
    }

    // Original confirm button behavior (for class selection phase)
    confirmBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (phase === "chooseClass") {
        if (selectedClass == null) return;
        renderQuantityPicker();
        return;
      }
    };

    // Overlay click cancels
    modalOverlay.onclick = (e) => {
      if (e.target !== modalOverlay) return;
      if (typeof closeHQCityCardChoicePopup === "function")
        closeHQCityCardChoicePopup();
      resolve();
    };

    // Initial render
    renderClassGrid();
  });
}

function galactusForceOfEternity() {
  galactusForceOfEternityDraw = true;
}

function galactusForceOfEternityDiscard() {
  updateGameBoard();
  onscreenConsole.log(
    `<span class="console-highlights">Galactus</span> has made you draw six additional cards. Now discard six cards.`,
  );

  return new Promise(async (resolve) => {
    // Build a mapping of UI items -> actual hand references
    const selectables = playerHand
      .filter(Boolean)
      .map((ref, index) => ({ ref, uniqueId: `${ref.id}-${index}` }));

    if (selectables.length === 0) {
      onscreenConsole.log("No cards in hand to discard.");
      resolve();
      return;
    }

    // ===== Case 1: 6 or fewer in hand — discard ALL (snapshot & clear) =====
    if (selectables.length <= 6) {
      const handSnapshot = [...playerHand]; // exact refs
      playerHand.length = 0; // clear now

      const { returned } = await checkDiscardForInvulnerability(handSnapshot);
      if (returned?.length) playerHand.push(...returned);

      updateGameBoard();
      onscreenConsole.log(
        `Discarded ${handSnapshot.length} card${handSnapshot.length !== 1 ? "s" : ""}.`,
      );
      resolve();
      return;
    }

    // ===== Case 2: More than 6 — let user pick exactly 6 =====
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
    titleElement.textContent = "Mastermind Tactic!";
    instructionsElement.innerHTML = "Select six cards to discard.";

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

    // Build a UI list with the same uniqueIds, but using *display copies* for sorting/rendering
    const availableCards = selectables.map((x) => ({
      ...x.ref,
      uniqueId: x.uniqueId,
    }));
    const displayCards = [...availableCards];
    genericCardSort(displayCards); // your existing sorter

    let selected = []; // array of these display objects (with uniqueId)
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card count
    function updateInstructions() {
      if (selected.length < 6) {
        instructionsElement.innerHTML = `Select ${6 - selected.length} more card${selected.length === 5 ? "" : "s"} to discard.`;
      } else {
        const names = selected
          .map((c) => `<span class="console-highlights">${c.name}</span>`)
          .join(", ");
        instructionsElement.innerHTML = `Selected: ${names} will be discarded.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selected.length !== 6;
    }

    // Create card elements for each card in hand
    displayCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.uniqueId);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      const isSelected = selected.some((c) => c.uniqueId === card.uniqueId);
      if (isSelected) {
        cardImage.classList.add("selected");
      }

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

        // Only change background if less than 6 cards are selected
        if (selected.length < 6) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if less than 6 cards are selected AND we're not hovering over another card
        if (selected.length < 6) {
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

      // Selection click handler - multiple selection allowed (up to 6)
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const index = selected.findIndex((c) => c.uniqueId === card.uniqueId);
        if (index > -1) {
          // Deselect
          selected.splice(index, 1);
          cardImage.classList.remove("selected");
        } else {
          if (selected.length >= 6) {
            // Remove the first selected card (FIFO)
            const firstSelectedId = selected[0].uniqueId;
            selected.shift();

            // Update the visual state of the first selected card
            const firstSelectedElement = document.querySelector(
              `[data-card-id="${firstSelectedId}"] img`,
            );
            if (firstSelectedElement) {
              firstSelectedElement.classList.remove("selected");
            }
          }

          // Select new card
          selected.push(card);
          cardImage.classList.add("selected");
        }

        // Update preview to show last selected card, or clear if none selected
        previewElement.innerHTML = "";
        if (selected.length > 0) {
          const lastSelected = selected[selected.length - 1];
          const previewImage = document.createElement("img");
          previewImage.src = lastSelected.image;
          previewImage.alt = lastSelected.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        } else {
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        }

        updateInstructions();
        updateConfirmButton();
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

    // Set up drag scrolling for the row
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
    confirmButton.disabled = true;
    confirmButton.textContent = "DISCARD";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selected.length !== 6) return;
      closeCardChoicePopup();
      setTimeout(async () => {
        confirmButton.disabled = true;

        // Map selections back to their exact hand refs
        const idToRef = new Map(selectables.map((x) => [x.uniqueId, x.ref]));
        const toDiscard = selected
          .map((s) => idToRef.get(s.uniqueId))
          .filter(Boolean);

        // Remove all selected refs from hand up-front
        for (const card of toDiscard) {
          const idx = playerHand.indexOf(card);
          if (idx !== -1) playerHand.splice(idx, 1);
        }

        // Discard with immediate triggers; return any invulnerable cards to hand
        const { returned } = await checkDiscardForInvulnerability(toDiscard);
        if (returned?.length) playerHand.push(...returned);

        updateGameBoard();
        onscreenConsole.log(`Discarded 6 cards.`);

        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";

    // Initial UI update
    updateInstructions();
  });
}

function galactusSunderTheEarth() {
  return new Promise((resolve) => {
    // Find all cards in discard pile that match names in HQ
    const cardsToKO = playerDiscardPile.filter((card) =>
      hq.some((hqCard) => hqCard.name === card.name),
    );

    // If no matches found, log and exit
    if (cardsToKO.length === 0) {
      console.log("No matching cards found between discard pile and HQ.");
      onscreenConsole.log(
        "Mastermind Tactic! No cards in your discard pile have the same name as a Hero in the HQ!",
      );
      resolve();
      return;
    }

    // Group cards by name for logging
    const cardCounts = {};
    cardsToKO.forEach((card) => {
      cardCounts[card.name] = (cardCounts[card.name] || 0) + 1;
    });

    const cardNames = Object.keys(cardCounts);
    const totalCount = cardsToKO.length;

    // Format card names with highlights
    const highlightedCardNames = cardNames
      .map((name) => `<span class="console-highlights">${name}</span>`)
      .join(", ");

    // Log matches found
    onscreenConsole.log(
      `Mastermind Tactic! ${totalCount} card${totalCount === 1 ? "" : "s"} in your discard pile have the same name as a Hero in the HQ: ${highlightedCardNames}.`,
    );

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
      .map(
        ([name, count]) =>
          `${count} <span class="console-highlights">${name}</span>${count > 1 ? "s" : ""}`,
      )
      .join(", ");

    onscreenConsole.log(`KO'd ${countMessages} from discard pile.`);

    updateGameBoard();
    resolve();
  });
}

async function moleManMasterStrike() {
  let subterraneaVillainsEscaped = false;

  for (let i = 0; i < city.length; i++) {
    if (city[i] && city[i].alwaysLeads === true) {
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
  updateGameBoard();

  const subterraneaInVP = victoryPile.filter(
    (card) => card.alwaysLeads === true,
  );

  if (subterraneaInVP.length === 0) {
    onscreenConsole.log(
      `Mastermind Tactic! <span class="console-highlights">Mole Man</span> always leads your chosen Adversary group; however, there are no suitable Villain cards available in your Victory Pile.`,
    );
    return false;
  }

  if (subterraneaInVP.length === 1) {
    // Only one Subterranean - automatically escape it
    const subterranean = subterraneaInVP[0];
    const index = victoryPile.findIndex((card) => card.id === subterranean.id);
    if (index !== -1) {
      onscreenConsole.log(
        `<span class="console-highlights">Mole Man</span> always leads your chosen Adversary group: <span class="console-highlights">${subterranean.name}</span> was the only suitable Villain in your Victory Pile. Placing in the Escape Pile now.`,
      );
      victoryPile.splice(index, 1);
      escapedVillainsDeck.push(subterranean);
      return true;
    }
    return false;
  }

  // Multiple Subterraneans - show selection popup
  return new Promise((resolve) => {
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
    titleElement.textContent = "TACTIC";
    instructionsElement.innerHTML =
      '<span class="console-highlights">Mole Man</span> always leads your chosen Adversary group: select a Villain from your Victory Pile to move to the Escaped Villains pile.';

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
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card name
    function updateInstructions() {
      if (selectedCard === null) {
        instructionsElement.innerHTML =
          '<span class="console-highlights">Mole Man</span> always leads your chosen Adversary group: select a Villain from your Victory Pile to move to the Escaped Villains pile.';
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be moved to the Escaped Villains pile.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;
    }

    // Create card elements for each subterranean villain in victory pile
    subterraneaInVP.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      if (selectedCard && selectedCard.id === card.id) {
        cardImage.classList.add("selected");
      }

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
        previewElement.style.backgroundColor = "var(--accent)";
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        setTimeout(() => {
          if (!selectionRow1.querySelector(":hover") && !isDragging) {
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          }
        }, 50);
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler - single selection
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (selectedCard === card) {
          // Deselect
          selectedCard = null;
          cardImage.classList.remove("selected");
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous
          if (selectedCard) {
            const prevSelectedElement = document.querySelector(
              `[data-card-id="${selectedCard.id}"] img`,
            );
            if (prevSelectedElement) {
              prevSelectedElement.classList.remove("selected");
            }
          }

          // Select new card
          selectedCard = card;
          cardImage.classList.add("selected");

          // Update preview to show selected card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        updateInstructions();
        updateConfirmButton();
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (subterraneaInVP.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (subterraneaInVP.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (subterraneaInVP.length > 5) {
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

    // Set up drag scrolling for the row
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
    confirmButton.disabled = true;
    confirmButton.textContent = "CONFIRM";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(() => {
        // Remove from victory pile and add to escaped villains deck
        const indexInVP = victoryPile.findIndex(
          (card) => card.id === selectedCard.id,
        );
        if (indexInVP !== -1) {
          // Remove bystander property if it exists
          if (selectedCard.bystander) {
            delete selectedCard.bystander;
          }

          onscreenConsole.log(
            `Moving <span class="console-highlights">${selectedCard.name}</span> to the Escaped Villains pile.`,
          );
          victoryPile.splice(indexInVP, 1);
          escapedVillainsDeck.push(selectedCard);
        }

        updateGameBoard();
        closeCardChoicePopup();
        resolve(true);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function moleManMasterOfMonsters() {
  const mastermind = getSelectedMastermind();

  if (mastermind.tactics.length === 0) {
    onscreenConsole.log(`This is the final Tactic. No effect.`);
    return;
  }

  onscreenConsole.log(`This is not the final Tactic.`);

  // Reveal up to 6 from the top (end) of the deck
  const revealedCards = [];
  for (let i = 0; i < 6 && villainDeck.length > 0; i++) {
    revealedCards.push(villainDeck.pop());
  }

  if (revealedCards.length === 0) {
    onscreenConsole.log("No cards left in the Villain deck to reveal!");
    return;
  }

  const cardNames = revealedCards
    .map((c) => `<span class="console-highlights">${c.name}</span>`)
    .join(", ");
  onscreenConsole.log(
    `You revealed the top ${revealedCards.length} card${revealedCards.length !== 1 ? "s" : ""} of the Villain deck: ${cardNames}.`,
  );

  const isSubterraneaVillain = (card) => {
    const leads = card.alwaysLeads === true || card.alwaysLeads === "true";

    return leads; // current behaviour matches your original intent
  };

  // Partition exactly once to avoid duplication bugs
  const subterraneaVillains = [];
  const otherCards = [];
  for (const c of revealedCards) {
    if (isSubterraneaVillain(c)) subterraneaVillains.push(c);
    else otherCards.push(c);
  }

  // Play Subterranea villains from the top in reveal order
  if (subterraneaVillains.length > 0) {
    const villainNames = subterraneaVillains
      .map((c) => `<span class="console-highlights">${c.name}</span>`)
      .join(", ");
    onscreenConsole.log(
      `Playing ${alwaysLeadsText} Villain${subterraneaVillains.length !== 1 ? "s" : ""}: ${villainNames}.`,
    );

    for (const villain of subterraneaVillains) {
      // Place on top (end) of deck, then draw normally
      villainDeck.push(villain);
      await drawVillainCard(); // this should consume from the top
    }
  }

  // Shuffle remaining (non-Subterranea) cards and place them on the bottom
  if (otherCards.length > 0) {
    shuffleArray(otherCards);
    onscreenConsole.log(
      `Shuffling the other cards and placing them on the bottom of the Villain deck.`,
    );
    villainDeck.unshift(...otherCards);
  } else if (subterraneaVillains.length === 0) {
    // Backticks so ${...} interpolates correctly
    onscreenConsole.log(
      `No ${alwaysLeadsText} Villains were revealed. All revealed cards have been shuffled and placed at the bottom of the Villain deck.`,
    );
  }

  updateGameBoard();
}

function moleManSecretTunnel() {
  onscreenConsole.log(
    `You gain +6 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> usable only against Villains in the Streets.`,
  );
  streetsReserveAttack += 6;
  updateGameBoard();
}

function moleManUndergroundRiches() {
  onscreenConsole.log(
    `You gain +6 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> usable only to recruit Heroes in the HQ space under the Streets.`,
  );
  hq2ReserveRecruit += 6;
  updateGameBoard();
}

//Villains

function gigantoFight() {
  onscreenConsole.log(
    `Fight! When you draw a new hand of cards at the end of this turn, draw two extra cards.`,
  );
  nextTurnsDraw++;
  nextTurnsDraw++;
  updateGameBoard();
}

async function megataurAmbush(megataur) {
  if (bystanderDeck.length === 0) {
    onscreenConsole.log(
      `Ambush! There are no Bystanders left for <span class="console-highlights">Megatuar</span> to capture.`,
    );
    return;
  }

  if (bystanderDeck.length === 1) {
    onscreenConsole.log(
      `Ambush! There is one Bystander left for <span class="console-highlights">Megatuar</span> to capture.`,
    );
    const bystander = bystanderDeck.pop();
    const megataurIndex = city.findIndex((c) => c === megataur);
    await villainEffectAttachBystanderToVillain(megataurIndex, bystander);
    return;
  }

  if (bystanderDeck.length > 1) {
    onscreenConsole.log(
      `Ambush! <span class="console-highlights">Megatuar</span> captures two Bystanders.`,
    );
    const bystander = bystanderDeck.pop();
    const megataurIndex = city.findIndex((c) => c === megataur);
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
    const handHeroes = playerHand.filter((card) => card.type === "Hero");
    const playedHeroes = cardsPlayedThisTurn.filter(
      (card) =>
        card.type === "Hero" && !card.isCopied && !card.sidekickToDestroy,
    );

    const combinedCards = [...handHeroes, ...playedHeroes];

    // Check if there are any heroes in the combined list
    if (combinedCards.length === 0) {
      console.log("No heroes in hand or played to KO.");
      onscreenConsole.log(
        `<span class="console-highlights">Sentinel's</span> Fight effect negated. No Heroes available to KO.`,
      );
      resolve(); // Resolve immediately if there are no heroes to KO
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
    titleElement.textContent = "Moloids";
    instructionsElement.textContent = "Select a hero to KO.";

    // Show both rows and labels
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "Hand";
    selectionRow2Label.textContent = "Played Cards";
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
    let isDragging = false;

    // Separate cards by location for display
    const handCards = combinedCards.filter((card) => playerHand.includes(card));
    const playedCards = combinedCards.filter((card) =>
      cardsPlayedThisTurn.includes(card),
    );

    // Sort the arrays for display
    genericCardSort(handCards);
    genericCardSort(playedCards);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.textContent = "Select a hero to KO.";
      } else {
        const location = playerHand.includes(selectedCard)
          ? "(from Hand)"
          : "(from Played Cards)";
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> ${location} will be KO'd.`;
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
    function createCardElement(card, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute(
        "data-location",
        playerHand.includes(card) ? "hand" : "played",
      );

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

        if (selectedCard === card) {
          // Deselect
          selectedCard = null;
          selectedCardImage = null;
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

    // Populate row1 with Hand heroes
    handCards.forEach((card) => {
      createCardElement(card, selectionRow1);
    });

    // Populate row2 with Played Cards heroes
    playedCards.forEach((card) => {
      createCardElement(card, selectionRow2);
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
    confirmButton.textContent = "KO HERO";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!"; // Added exclamation mark

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(() => {
        console.log(`${selectedCard.name} has been KO'd.`);
        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`,
        );
        koBonuses();

        // Remove the card from the correct array (hand or played)
        let removedFromHand = false;

        // Try to remove from hand first
        const handIndex = playerHand.findIndex((c) => c.id === selectedCard.id);
        if (handIndex !== -1) {
          playerHand.splice(handIndex, 1);
          removedFromHand = true;
        }

        // If not found in hand, try to remove from played cards
        if (!removedFromHand) {
          selectedCard.markedToDestroy = true;
        }

        // Add the card to the KO pile
        koPile.push(selectedCard);

        updateGameBoard();
        closeCardChoicePopup();
        resolve();
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(`No hero was KO'd.`);
      closeCardChoicePopup();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function moveVillainFromCity1ToCity0() {
  // Check if there's a card in city[1]
  if (city[1] !== null) {
    const cardToMove = city[1];

    // If city[0] is destroyed (when fighting Galactus), card escapes immediately
    if (destroyedSpaces[0] === true) {
      onscreenConsole.log(
        `<span class="console-highlights">${cardToMove.name}</span> escapes from the Streets!`,
      );
      await new Promise((resolve) => {
        showPopup("Raktar Villain Escape", cardToMove, resolve);
      });
      await handleVillainEscape(cardToMove);
      city[1] = null;
      addHRToTopWithInnerHTML();
      return;
    }

    // Show popup for the moved card
    await new Promise((resolve) => {
      showPopup("Villain Moved", cardToMove, resolve);
    });
    addHRToTopWithInnerHTML();

    const cardAtCity0 = city[0];

    // Move card from city[1] to city[0]
    city[0] = cardToMove;
    city[1] = null;

    onscreenConsole.log(
      `<span class="console-highlights">${cardToMove.name}</span> moves from the Streets to the Bridge.`,
    );

    // If there was a card at city[0], handle it based on game state
    if (cardAtCity0 !== null) {
      // When fighting Galactus, try to push to next available space
      if (mastermind.name === "Galactus") {
        // Try to find next available space
        let moved = false;
        for (let i = 1; i < city.length; i++) {
          if (city[i] === null && !destroyedSpaces[i]) {
            city[i] = cardAtCity0;
            onscreenConsole.log(
              `<span class="console-highlights">${cardAtCity0.name}</span> is pushed to ${citySpaceLabels[i]}.`,
            );
            moved = true;
            break;
          }
        }

        // If no space found, villain escapes
        if (!moved) {
          await new Promise((resolve) => {
            showPopup("Raktar Villain Escape", cardAtCity0, resolve);
          });
          await handleVillainEscape(cardAtCity0);
          addHRToTopWithInnerHTML();
        }
      } else {
        // Standard behavior - push to escape
        await new Promise((resolve) => {
          showPopup("Raktar Villain Escape", cardAtCity0, resolve);
        });
        await handleVillainEscape(cardAtCity0);
        addHRToTopWithInnerHTML();
      }
    }
  } else {
    onscreenConsole.log(`There is no Villain in the Streets to be moved.`);
  }
}

// Your raktarAmbush function
async function raktarAmbush() {
  if (destroyedSpaces[1] === true) {
    onscreenConsole.log(
      `Ambush! <span class="console-highlights">Ra'ktar the Molan King</span> would usually push a Villin in the Streets to the Bridge but these city spaces are already destroyed!`,
    );
    return;
  } else {
    onscreenConsole.log(
      `Ambush! Any Villain in the Streets moves to the Bridge, pushing any Villain already there to escape.`,
    );
  }

  // Use the enhanced moveVillainFromCity1ToCity0 function
  await moveVillainFromCity1ToCity0();
}

async function firelordFight() {
  onscreenConsole.log(
    'Fight! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.',
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  await FirelordRevealRangeOrWound();
}

async function firelordEscape() {
  onscreenConsole.log(
    'Escape! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.',
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  await FirelordRevealRangeOrWound();
}

function FirelordRevealRangeOrWound() {
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  if (
    cardsYouHave.filter(
      (item) => item.classes && item.classes.includes("Range"),
    ).length === 0
  ) {
    onscreenConsole.log(
      'You are unable to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero.',
    );
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?',
          "Reveal Hero",
          "Gain Wound",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "FIRELORD";

        // Hide close button
        document.querySelector(
          ".info-or-choice-popup-closebutton",
        ).style.display = "none";

        // Use preview area for image
        const previewArea = document.querySelector(
          ".info-or-choice-popup-preview",
        );
        if (previewArea) {
          previewArea.style.backgroundImage =
            "url('Visual Assets/Villains/FantasticFour_HeraldsOfGalactus_Firelord.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        const cleanup = () => {
          closeInfoChoicePopup();
          resolve();
        };

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You are able to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          cleanup();
        };
      }, 10);
    });
  }
}

function morgAmbush() {
  onscreenConsole.log(
    `Ambush! Put each non-<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero from the HQ on the bottom of the Hero Deck.`,
  );
  let heroesMovedCounter = 0;

  // Process each HQ slot one by one
  for (let i = 0; i < 5; i++) {
    if (hq[i] && hq[i].type === "Hero") {
      const hero = hq[i];
      const hasInstinct = hero.classes && hero.classes.includes("Instinct");

      if (!hasInstinct) {
        // Move non-Instinct hero to bottom of deck
        heroDeck.unshift(hq[i]);
        hq[i] = null; // Clear the HQ slot
        heroesMovedCounter++;
      }
    }
  }

  // Now fill any empty HQ slots with new heroes from top of deck
  for (let i = 0; i < 5; i++) {
    if (hq[i] === null && heroDeck.length > 0) {
      hq[i] = heroDeck.pop();
    }
  }

  if (heroesMovedCounter > 0) {
    const cardText = heroesMovedCounter === 1 ? "Hero" : "Heroes";
    onscreenConsole.log(
      `Moved ${heroesMovedCounter} non-<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> ${cardText} to the bottom of hero deck.`,
    );
  } else {
    onscreenConsole.log(
      'No non-<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Heroes found in the HQ.',
    );
  }

  updateGameBoard(); // Update game board after changes
}

function stardustFight() {
  onscreenConsole.log(
    `Fight! Choose one of your <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Heroes to add to next turn's draw as a seventh card.`,
  );
  return new Promise((resolve) => {
    const cardsYouHave = [
      ...playerHand,
      ...cardsPlayedThisTurn.filter(
        (card) => !card.isCopied && !card.sidekickToDestroy,
      ),
    ];

    const CovertCardsYouHave = cardsYouHave.filter(
      (item) =>
        item.type === "Hero" && item.classes && item.classes.includes("Covert"),
    );

    if (CovertCardsYouHave.length === 0) {
      console.log("No available Covert Heroes.");
      onscreenConsole.log(
        `You do not have any <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='console-card-icons'> Heroes to add to next turn's draw.`,
      );
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

    // Set popup content
    titleElement.textContent = "Stardust";
    instructionsElement.innerHTML = `Choose one of your <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='card-icons'> Heroes to add to next turn's draw.`;

    // Show both rows and labels
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "Hand";
    selectionRow2Label.textContent = "Played Cards";
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
    let isDragging = false;

    // Separate cards by location for display
    const handCovertCards = CovertCardsYouHave.filter((card) =>
      playerHand.includes(card),
    );
    const playedCovertCards = CovertCardsYouHave.filter((card) =>
      cardsPlayedThisTurn.includes(card),
    );

    // Sort the arrays for display
    genericCardSort(handCovertCards);
    genericCardSort(playedCovertCards);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML = `Choose one of your <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='card-icons'> Heroes to add to next turn's draw.`;
      } else {
        const location = playerHand.includes(selectedCard)
          ? "(from Hand)"
          : "(from Played Cards)";
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> ${location} will be added to next turn's draw.`;
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
    function createCardElement(card, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute(
        "data-location",
        playerHand.includes(card) ? "hand" : "played",
      );

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

        if (selectedCard === card) {
          // Deselect
          selectedCard = null;
          selectedCardImage = null;
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

    // Populate row1 with Hand Covert cards
    handCovertCards.forEach((card) => {
      createCardElement(card, selectionRow1);
    });

    // Populate row2 with Played Cards Covert cards
    playedCovertCards.forEach((card) => {
      createCardElement(card, selectionRow2);
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
    confirmButton.textContent = "SELECT HERO";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!"; // Added exclamation mark

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(() => {
        const cardCopy = { ...selectedCard };
        cardsToBeDrawnNextTurn.push(cardCopy);
        nextTurnsDraw++;

        // Mark the original card to be destroyed later
        selectedCard.markedToDrawNextTurn = true;

        console.log(`${selectedCard.name} has been reserved for next turn.`);
        onscreenConsole.log(
          `You have selected <span class="console-highlights">${selectedCard.name}</span> to be added to your next draw as a seventh card.`,
        );

        updateGameBoard();
        closeCardChoicePopup();
        resolve(true);
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(
        `No <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='console-card-icons'> Hero was selected.`,
      );
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function terraxTheTamerAmbush(terrax) {
  onscreenConsole.log(
    `Ambush! For each <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero in the HQ, <span class="console-highlight">Terrax the Tamer</span> captures a Bystander.`,
  );

  const strengthCardsInHQCount = hq.filter(
    (card) => card && card.classes && card.classes.includes("Strength"),
  ).length;

  let strengthHQText = "Heroes";
  if (strengthCardsInHQCount === 1) {
    strengthHQText = "Hero";
  }

  onscreenConsole.log(
    `The HQ contains ${strengthCardsInHQCount} <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> ${strengthHQText}. <span class="console-highlight">Terrax the Tamer</span> will capture that many Bystanders.`,
  );

  const terraxIndex = city.findIndex((c) => c === terrax);
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
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  if (bystandersCaptured > 0) {
    const bystanderText = bystandersCaptured === 1 ? "Bystander" : "Bystanders";
    onscreenConsole.log(
      `<span class="console-highlight">Terrax the Tamer</span> captured ${bystandersCaptured} ${bystanderText}!`,
    );
  } else {
    onscreenConsole.log(`No Bystanders were captured.`);
  }
}

//Heroes - Variables Done

function humanTorchCallForBackup() {
  return new Promise((resolve) => {
    // Get wounds from both locations
    const discardPile = playerDiscardPile.filter(
      (card) => card.type === "Wound",
    );
    const hand = playerHand.filter((card) => card.type === "Wound");

    // If no wounds are found, log and resolve
    if (discardPile.length === 0 && hand.length === 0) {
      onscreenConsole.log("No Wounds available to KO.");
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

    // Set popup content
    titleElement.textContent = "Human Torch - Call for Backup";
    instructionsElement.innerHTML = `Select a Wound to KO and gain +1<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'>.`;

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

    // Set default preview image
    const defaultImage =
      "Visual Assets/Heroes/Fantastic Four/FantasticFour_HumanTorch_CallForBackup.webp";
    const previewImage = document.createElement("img");
    previewImage.src = defaultImage;
    previewImage.alt = "Human Torch - Call for Backup";
    previewImage.className = "popup-card-preview-image";
    previewElement.appendChild(previewImage);
    previewElement.style.backgroundColor = "var(--accent)";

    let selectedCard = null;
    let selectedCardImage = null;
    let selectedLocation = null;
    let isDragging = false;

    // Sort the arrays for display
    genericCardSort(hand);
    genericCardSort(discardPile);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML = `Select a Wound to KO and gain +1<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'>.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd from your ${selectedLocation} to gain +1<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'>.`;
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
        const hoverPreviewImage = document.createElement("img");
        hoverPreviewImage.src = card.image;
        hoverPreviewImage.alt = card.name;
        hoverPreviewImage.className = "popup-card-preview-image";
        previewElement.appendChild(hoverPreviewImage);
        previewElement.style.backgroundColor = "var(--accent)";
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only revert to default image if no card is selected
        if (selectedCard === null) {
          setTimeout(() => {
            const isHoveringAnyCard =
              selectionRow1.querySelector(":hover") ||
              selectionRow2.querySelector(":hover");
            if (!isHoveringAnyCard && !isDragging) {
              previewElement.innerHTML = "";
              const defaultPreviewImage = document.createElement("img");
              defaultPreviewImage.src = defaultImage;
              defaultPreviewImage.alt = "Human Torch - Call for Backup";
              defaultPreviewImage.className = "popup-card-preview-image";
              previewElement.appendChild(defaultPreviewImage);
              previewElement.style.backgroundColor = "var(--accent)";
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

          // Revert to default image
          previewElement.innerHTML = "";
          const defaultPreviewImage = document.createElement("img");
          defaultPreviewImage.src = defaultImage;
          defaultPreviewImage.alt = "Human Torch - Call for Backup";
          defaultPreviewImage.className = "popup-card-preview-image";
          previewElement.appendChild(defaultPreviewImage);
          previewElement.style.backgroundColor = "var(--accent)";
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

    // Populate row1 with Hand wounds
    hand.forEach((card) => {
      createCardElement(card, "Hand", selectionRow1);
    });

    // Populate row2 with Discard Pile wounds
    discardPile.forEach((card) => {
      createCardElement(card, "Discard Pile", selectionRow2);
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
    confirmButton.textContent = "KO WOUND";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        // Remove wound from its location
        if (selectedLocation === "Discard Pile") {
          const index = playerDiscardPile.findIndex(
            (wound) => wound.id === selectedCard.id,
          );
          if (index !== -1) {
            const removedWound = playerDiscardPile.splice(index, 1)[0];
            koPile.push(removedWound);
          }
        } else {
          const index = playerHand.findIndex(
            (wound) => wound.id === selectedCard.id,
          );
          if (index !== -1) {
            const removedWound = playerHand.splice(index, 1)[0];
            koPile.push(removedWound);
          }
        }

        // Add to KO pile and gain recruit
        totalRecruitPoints += 1;
        cumulativeRecruitPoints += 1;

        onscreenConsole.log(
          `You KO'd a <span class="console-highlights">${selectedCard.name}</span> from your ${selectedLocation}. +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
        );
        koBonuses();

        updateGameBoard();
        closeCardChoicePopup();
        resolve(true);
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(`No wound was KO'd.`);
      onscreenConsole.log(`You chose not to KO any Wounds.`);
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function humanTorchHothead() {
  drawWound();
}

function humanTorchNovaFlame() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );

  let villainsInCityCount = 0;

  city.forEach((card, index) => {
    if (card && card.type === "Villain") {
      villainsInCityCount++;
    }
  });

  totalAttackPoints += villainsInCityCount;
  cumulativeAttackPoints += villainsInCityCount;

  onscreenConsole.log(
    `There ${villainsInCityCount === 1 ? "is" : "are"} ${villainsInCityCount} Villain${villainsInCityCount === 1 ? "" : "s"} in the city. ${villainsInCityCount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  villainsInCityCount = 0;

  updateGameBoard();
}

function humanTorchFlameOn() {
  onscreenConsole.log(
    `Focus! You have spent 6 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain 4 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );

  totalRecruitPoints -= 6;
  totalAttackPoints += 4;
  cumulativeAttackPoints += 4;

  updateGameBoard();
}

function invisibleWomanDisappearingAct() {
  if (playerHand.length === 0 && playerDiscardPile.length === 0) {
    onscreenConsole.log(`Focus! No cards available to KO.`);
    return;
  }

  onscreenConsole.log(
    `Focus! Spend 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to KO a card from your hand or discard pile.`,
  );

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
    titleElement.textContent = "Invisible Woman - Disappearing Act";
    instructionsElement.innerHTML = `You may KO a card from your hand or discard pile.`;

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

    // Sort the arrays before displaying
    genericCardSort(playerDiscardPile);
    genericCardSort(playerHand);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML = `You may KO a card from your hand or discard pile.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd from your ${selectedLocation}.`;
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

    // Populate row1 with Hand cards
    playerHand.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Discard Pile cards
    playerDiscardPile.forEach((card) => {
      createCardElement(card, "discard pile", selectionRow2);
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
    confirmButton.textContent = "KO CARD";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!";

    // Confirm button handler - costs 2 Recruit
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        let koIndex;
        if (selectedLocation === "discard pile") {
          // Find by ID instead of relying on array position
          koIndex = playerDiscardPile.findIndex(
            (c) => c.id === selectedCard.id,
          );
          if (koIndex !== -1) {
            const removedCard = playerDiscardPile.splice(koIndex, 1)[0];
            koPile.push(removedCard);
          }
        } else {
          // Find by ID instead of relying on array position
          koIndex = playerHand.findIndex((c) => c.id === selectedCard.id);
          if (koIndex !== -1) {
            const removedCard = playerHand.splice(koIndex, 1)[0];
            koPile.push(removedCard);
          }
        }

        if (koIndex !== -1) {
          // Deduct 2 Recruit points as cost
          totalRecruitPoints -= 2;

          onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been KO'd from your ${selectedLocation}.`,
          );
          koBonuses();

          updateGameBoard();
          closeCardChoicePopup();
          resolve(true);
          return;
        }
        resolve(false);
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(`No card was KO'd.`);
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function invisibleWomanFourOfAKind() {
  let fourCostCount = 0;
  const playedCards = cardsPlayedThisTurn.slice(0, -1);
  let fourCostText = "Heroes";

  playedCards.forEach((card) => {
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
    onscreenConsole.log(
      `Special Ability: You have played ${fourCostCount} ${fourCostText} that cost <b>4</b> <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  } else {
    onscreenConsole.log(
      `Special Ability: You have not played any other Heroes that cost <b>4</b> <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. No <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  }
  updateGameBoard();
}

async function invisibleWomanUnseenRescue() {
  if (unseenRescueBystanders >= 4) {
    onscreenConsole.log(
      `Focus! You have already used this ability four times.`,
    );
    return;
  }

  onscreenConsole.log(
    `Focus! You have spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to rescue a Bystander.`,
  );
  totalRecruitPoints -= 2;
  await rescueBystander();
  unseenRescueBystanders++;

  updateGameBoard();
}

function invisibleWomanInvisibleBarrier() {
  onscreenConsole.log(
    `You revealed <span class="console-highlights">Invisible Woman - Invisible Barrier</span>, preventing an ambush and allowing you to draw two cards!`,
  );
  extraDraw();
  extraDraw();
  updateGameBoard();
}

function canRevealInvisibleWomanInvisibleBarrier() {
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];
  return cardsYouHave.some(
    (c) => c && c.name === "Invisible Woman - Invisible Barrier",
  );
}

// --- Popup flow to optionally negate a villain's Ambush effect
async function promptNegateAmbushEffectWithInvisibleWoman() {
  const INVISIBLE_WOMAN_IMAGE =
    "Visual Assets/Heroes/Fantastic Four/FantasticFour_InvisibleWoman_InvisibleBarrier.webp";

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
        "No",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Invisible Woman - Invisible Barrier";

      // Use preview area for card image
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea && INVISIBLE_WOMAN_IMAGE) {
        previewArea.style.backgroundImage = `url('${INVISIBLE_WOMAN_IMAGE}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        invisibleWomanInvisibleBarrier();
        closeInfoChoicePopup();
        resolve(true); // negate
      };

      denyButton.onclick = () => {
        onscreenConsole.log(
          "You chose not to cancel an Ambush using <span class='console-highlights'>Invisible Woman – Invisible Barrier</span>.",
        );
        closeInfoChoicePopup();
        resolve(false); // do not negate
      };
    }, 10);
  });
}

function mrFantasticTwistingEquations() {
  onscreenConsole.log(
    `Focus! You have spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to draw an extra card next turn.`,
  );
  totalRecruitPoints -= 2;
  nextTurnsDraw++;
  updateGameBoard();
}

function mrFantasticUnstableMolecules() {
  extraDraw();
  extraDraw();
}

function mrFantasticOneGiganticHand() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `You have ${playerHand.length} card${playerHand.length === 1 ? "" : "s"} in your hand. +${playerHand.length}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  totalAttackPoints += playerHand.length;
  cumulativeAttackPoints += playerHand.length;

  updateGameBoard();
}

function mrFantasticUltimateNullifier() {
  onscreenConsole.log(
    `Focus! You have spent 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, giving you +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> usable only against the Mastermind.`,
  );
  totalRecruitPoints -= 1;
  mastermindReserveAttack++;
  updateGameBoard();
}

function canRevealMrFantasticUltimateNullifier() {
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];
  return cardsYouHave.some(
    (c) => c && c.name === "Mr. Fantastic - Ultimate Nullifier",
  );
}

async function promptNegateFightEffectWithMrFantastic() {
  const MR_FANTASTIC_IMAGE =
    "Visual Assets/Heroes/Fantastic Four/FantasticFour_MrFantastic_UltimateNullifier.webp";

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
        "No",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Mr. Fantastic - Ultimate Nullifier";

      // Use preview area for card image
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea && MR_FANTASTIC_IMAGE) {
        previewArea.style.backgroundImage = `url('${MR_FANTASTIC_IMAGE}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        onscreenConsole.log(
          `You used <span class="console-highlights">Mr. Fantastic – Ultimate Nullifier</span> to cancel a fight effect.`,
        );
        closeInfoChoicePopup();
        resolve(true); // negate
      };

      denyButton.onclick = () => {
        onscreenConsole.log(
          `You chose not to cancel a fight effect using <span class="console-highlights">Mr. Fantastic – Ultimate Nullifier</span>.`,
        );
        closeInfoChoicePopup();
        resolve(false); // do not negate
      };
    }, 10);
  });
}

function thingItStartedOnYancyStreet() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
  );
  totalRecruitPoints += 2;
  cumulativeRecruitPoints += 2;
  updateGameBoard();
}

function thingKnuckleSandwich() {
  onscreenConsole.log(
    `Focus! You have spent 3 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain 2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
  totalRecruitPoints -= 3;
  totalAttackPoints += 2;
  cumulativeAttackPoints += 2;
  updateGameBoard();
}

function thingCrimeStopper() {
  onscreenConsole.log(
    `Whenever you defeat a Villain in the Bank this turn, rescue a Bystander.`,
  );
  thingCrimeStopperRescue = true;
  updateGameBoard();
}

function thingCrimeStopperFocus() {
  document.getElementById("played-cards-popup").style.display = "none";
  onscreenConsole.log(
    `Focus! You have spent 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to move a Villain to an adjacent city space.`,
  );
  totalRecruitPoints -= 1;
  if (isCityEmpty()) {
    onscreenConsole.log(`No Villains in the city to move.`);
    return;
  }

  // Elements for the popup and overlay
  const popup = document.getElementById("villain-movement-popup");
  const overlay = document.getElementById("modal-overlay");
  const noThanksButton = document.getElementById("no-thanks-villain-movement");
  document.getElementById("villain-movement-context").innerHTML =
    "You may move a Villain to an adjacent city space. If another Villain is already there, swap them.";
  const confirmButton = document.getElementById("confirm-villain-movement");
  const selectionArrow = document.getElementById("selection-arrow");
  confirmButton.disabled = true; // Disable the confirm button

  // Elements representing the rows in the table
  const villainCells = {
    bridge: document.getElementById("villain-bridge"),
    streets: document.getElementById("villain-streets"),
    rooftops: document.getElementById("villain-rooftops"),
    bank: document.getElementById("villain-bank"),
    sewers: document.getElementById("villain-sewers"),
  };

  let selectedCells = []; // To store the selected cells
  let firstSelectedIndex = null; // To store the index of the first selected cell

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

    const currentIndex = Object.values(villainCells).indexOf(cellElement);

    // If the player selects an Empty cell first, nothing happens
    if (!hasVillain && selectedCells.length === 0) {
      console.log("Empty cell selected first, no action.");
      return;
    }

    // If the selected cell is already in selectedCells, deselect it and reset
    if (selectedCells.includes(cellElement)) {
      cellElement.classList.remove("selected");
      selectedCells = [];
      firstSelectedIndex = null;
      selectionArrow.style.display = "none";
      confirmButton.disabled = true;
      console.log("Deselected cell, resetting selections.");
      return;
    }

    // If the player selects a villain first, highlight it
    if (hasVillain && selectedCells.length === 0) {
      cellElement.classList.add("selected");
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
        cellElement.classList.add("selected");
        selectedCells.push(cellElement);
        console.log("Adjacent cell selected at index", currentIndex);

        // Enable confirm button since we have a valid adjacent selection
        confirmButton.disabled = false;
        drawArrow(selectedCells[0], selectedCells[1]);
      } else {
        console.log("Non-adjacent cell selected, ignoring.");
        onscreenConsole.log(
          `You may only move a Villain to an adjacent city space.`,
        );
      }
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
        destroyedImage.classList.add("greyed-out");

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

  function hidePopup() {
    selectedCells.forEach((cell) => cell.classList.remove("selected"));
    selectedCells = [];
    firstSelectedIndex = null;
    popup.style.display = "none";
    overlay.style.display = "none";
    document.getElementById("villain-movement-context").innerHTML =
      "You may move a Villain to a new city space (swapping two if needed). Rescue any Bystanders captured by that Villain.";
    selectionArrow.style.display = "none";
  }

  function drawArrow(cell1, cell2) {
    const popupRect = document
      .getElementById("villain-movement-popup")
      .getBoundingClientRect();
    const rect1 = cell1.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();

    const posn1 = {
      x: rect1.left - popupRect.left + rect1.width / 2,
      y: rect1.bottom - popupRect.top,
    };
    const posn2 = {
      x: rect2.left - popupRect.left + rect2.width / 2,
      y: rect2.bottom - popupRect.top,
    };

    const controlX = (posn1.x + posn2.x) / 2;
    const controlY = Math.max(posn1.y, posn2.y) + 30;

    const dStr = `M${posn1.x},${posn1.y} C${controlX},${controlY} ${controlX},${controlY} ${posn2.x},${posn2.y}`;

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
    document.getElementById("played-cards-popup").style.display = "block";
    onscreenConsole.log(`You chose to not move any Villains.`);
  };

  confirmButton.onclick = async () => {
    document.getElementById("played-cards-popup").style.display = "block";
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
      const secondCellImage = secondCell.querySelector("img");
      if (
        secondCellImage &&
        secondCellImage.src.includes("BlankCardSpace.webp")
      ) {
        // Move the villain to the empty cell
        console.log("Moving villain to empty space");
        onscreenConsole.log(
          `<span class="console-highlights">${city[firstIndex].name}</span> moved to empty space.`,
        );

        city[secondIndex] = city[firstIndex]; // Move the villain to the new space
        city[firstIndex] = null; // Clear the original space
      } else if (city[secondIndex] && city[firstIndex]) {
        // Both cells have villains, perform the swap
        console.log("Swapping villains");
        onscreenConsole.log(
          `<span class="console-highlights">${city[firstIndex].name}</span> swapped places with <span class="console-highlights">${city[secondIndex].name}</span>.`,
        );

        // Perform the swap
        const temp = city[secondIndex];
        city[secondIndex] = city[firstIndex];
        city[firstIndex] = temp;
      } else {
        console.error("Cannot swap cells: one of the cells is empty.");
        return;
      }

      // Clear selections and update the game board
      selectedCells.forEach((cell) => cell.classList.remove("selected"));
      selectedCells = [];
      firstSelectedIndex = null;
      selectionArrow.style.display = "none";
      confirmButton.disabled = true;
      popup.style.display = "none";
      document.getElementById("villain-movement-context").innerHTML =
        "You may move a Villain to a new city space (swapping two if needed). Rescue any Bystanders captured by that Villain.";
      overlay.style.display = "none";
      updateGameBoard();
    }
  };
}

function thingItsClobberinTime() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  const previousCards = cardsPlayedThisTurn.slice(0, -1);

  // Filter for cards that have "Strength" in any class attribute
  const StrengthCount = previousCards.filter(
    (item) => item.classes && item.classes.includes("Strength"),
  ).length;

  let StrengthText = "Heroes"; // Use let to allow reassignment

  if (StrengthCount === 1) {
    StrengthText = "Hero"; // Singular for one
  }

  onscreenConsole.log(
    `You have played ${StrengthCount} <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> ${StrengthText}. +${StrengthCount * 3}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
  updateGameBoard();
}

function silverSurferWarpSpeed() {
  onscreenConsole.log(
    `Focus! You have spent 2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to draw a card.`,
  );
  totalRecruitPoints -= 2;
  extraDraw();
  updateGameBoard();
}

function silverSurferEpicDestiny() {
  onscreenConsole.log(
    `Focus! You have spent 6 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">, allowing you to defeat a Villain with 5 or 6 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
  totalRecruitPoints -= 6;
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
    titleElement.textContent = "DEFEAT VILLAIN";
    instructionsElement.textContent =
      "SELECT A VILLAIN WITH 5-6 ATTACK TO DEFEAT:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedCell = null;
    let telepathicProbeVillain = null;
    let telepathicProbeSelected = false; // Moved to outer scope

    // Check for eligible villains in city
    const eligibleVillainsInCity = city.some((card, index) => {
      if (card && card.type === "Villain" && !destroyedSpaces[index]) {
        const villainAttack = recalculateVillainAttack(card);
        return villainAttack === 5 || villainAttack === 6;
      }
      return false;
    });

    // Check for Professor X - Telepathic Probe revealed villain
    const telepathicProbeCard = cardsPlayedThisTurn.find(
      (card) =>
        card.name === "Professor X - Telepathic Probe" &&
        card.villain &&
        villainDeck.length > 0 &&
        villainDeck[villainDeck.length - 1]?.name === card.villain.name &&
        villainDeck.length === card.villain.deckLength,
    );

    if (telepathicProbeCard && villainDeck.length > 0) {
      const topVillainCard = villainDeck[villainDeck.length - 1];
      const villainAttack = recalculateVillainAttack(topVillainCard);

      if (villainAttack === 5 || villainAttack === 6) {
        telepathicProbeVillain = {
          ...topVillainCard,
          telepathicProbe: true,
          telepathicProbeCard: telepathicProbeCard,
        };
      }
    }

    // If no eligible villains at all
    if (!eligibleVillainsInCity && !telepathicProbeVillain) {
      onscreenConsole.log("There are no Villains available to defeat.");
      totalRecruitPoints += 6;
      updateGameBoard();
      resolve();
      return;
    }

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

        // Determine eligibility - Villains with 5-6 attack
        const isVillain = card.type === "Villain";
        const villainAttack = isVillain ? recalculateVillainAttack(card) : 0;
        const isEligible =
          isVillain && (villainAttack === 5 || villainAttack === 6);

        // Apply greyed out styling for ineligible cards
        if (!isEligible) {
          cardImage.classList.add("greyed-out");
        } else {
          cardImage.classList.remove("greyed-out");
        }

        // Add all relevant overlays
        addCardOverlays(cardContainer, card, i);

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
                "SELECT A VILLAIN WITH 5-6 ATTACK TO DEFEAT:";
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

              // Deselect Telepathic Probe if it was selected
              if (telepathicProbeSelected) {
                telepathicProbeSelected = false;
                otherChoiceButton.style.backgroundColor =
                  "var(--panel-backgrounds)";
                otherChoiceButton.style.transform = `none`;
                otherChoiceButton.style.boxShadow = `none`;
                otherChoiceButton.style.animation = `none`;
              }

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);
              previewElement.style.backgroundColor = "var(--accent)";

              // Update instructions and confirm button
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be defeated.`;
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
        cardImage.classList.add("greyed-out");
        cardImage.style.cursor = "not-allowed";
        cardImage.onclick = null;
        cardImage.onmouseover = null;
        cardImage.onmouseout = null;
        cardContainer.appendChild(cardImage);
      }
    }

    // Set up button handlers
    const confirmButton = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherChoiceButton = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-city-hq-popup-nothanks",
    );

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "DEFEAT SELECTED VILLAIN";

    // Set up Other Choice button for Telepathic Probe villain
    if (telepathicProbeVillain) {
      otherChoiceButton.style.display = "inline-block";
      otherChoiceButton.textContent = `DEFEAT ${telepathicProbeVillain.name} (TELEPATHIC PROBE)`;
      otherChoiceButton.style.backgroundColor = "var(--panel-backgrounds)"; // Different color to distinguish
      otherChoiceButton.style.border = `0.5vh solid var(--accent)`;
      otherChoiceButton.style.color = "#282828";
      otherChoiceButton.disabled = false;

      // Other Choice button handler for Telepathic Probe villain
      otherChoiceButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (telepathicProbeSelected) {
          // Deselect Telepathic Probe
          telepathicProbeSelected = false;
          otherChoiceButton.style.backgroundColor = "var(--panel-backgrounds)";
          otherChoiceButton.style.transform = `none`;
          otherChoiceButton.style.boxShadow = `none`;
          otherChoiceButton.style.animation = `none`;
          selectedCityIndex = null;
          if (selectedCell) {
            selectedCell.classList.remove("selected");
            selectedCell = null;
          }
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          instructionsElement.textContent =
            "SELECT A VILLAIN WITH 5-6 ATTACK TO DEFEAT:";
          confirmButton.disabled = true;
        } else {
          // Select Telepathic Probe
          telepathicProbeSelected = true;
          otherChoiceButton.style.backgroundColor = "#ccc";
          otherChoiceButton.style.color = "#282828";
          otherChoiceButton.style.transform = `scale(1.02)`;
          otherChoiceButton.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.3)`;
          otherChoiceButton.style.animation = `filter-animation 1s infinite`;

          // Deselect any city selection
          selectedCityIndex = null;
          if (selectedCell) {
            selectedCell.classList.remove("selected");
            selectedCell = null;
          }

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = telepathicProbeVillain.image;
          previewImage.alt = telepathicProbeVillain.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${telepathicProbeVillain.name}</span> (Telepathic Probe) will be defeated.`;
          confirmButton.disabled = false;
        }
      };
    } else {
      otherChoiceButton.style.display = "none";
    }

    noThanksButton.style.display = "none";

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (selectedCityIndex === null && !telepathicProbeSelected) return;

      closeHQCityCardChoicePopup();
      modalOverlay.style.display = "none";
      updateGameBoard();

      if (telepathicProbeSelected) {
        // Handle telepathic probe villain defeat
        onscreenConsole.log(
          `You have defeated <span class="console-highlights">${telepathicProbeVillain.name}</span> for free using Telepathic Probe.`,
        );
        await freeTelepathicVillainDefeat(
          telepathicProbeVillain,
          telepathicProbeVillain.telepathicProbeCard,
        );
      } else {
        // Handle regular city villain defeat
        onscreenConsole.log(
          `You have defeated <span class="console-highlights">${city[selectedCityIndex].name}</span> for free.`,
        );
        await instantDefeatAttack(selectedCityIndex);
      }

      originalResolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";

    // Helper function for free telepathic probe villain defeat
    async function freeTelepathicVillainDefeat(
      villainCard,
      telepathicProbeCard,
    ) {
      if (telepathicProbeCard) {
        telepathicProbeCard.villain = null; // Clear the reference after fighting
      }

      // Remove villain from deck and add to victory pile (NO point deduction)
      villainDeck.pop();
      victoryPile.push(villainCard);

      // Handle rescue of extra bystanders
      if (rescueExtraBystanders > 0) {
        for (let i = 0; i < rescueExtraBystanders; i++) {
          await rescueBystander();
        }
      }

      defeatBonuses();

      // Handle fight effect if the villain has one
      let fightEffectPromise = Promise.resolve();
      if (villainCard.fightEffect && villainCard.fightEffect !== "None") {
        const fightEffectFunction = window[villainCard.fightEffect];
        console.log("Fight effect function found:", fightEffectFunction);
        if (typeof fightEffectFunction === "function") {
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
          console.error(
            `Fight effect function ${villainCard.fightEffect} not found`,
          );
        }
      } else {
        console.log("No fight effect found for this villain.");
      }

      // Handle fight effect promise
      await fightEffectPromise
        .then(() => {
          updateGameBoard(); // Update the game board after fight effect is handled
        })
        .catch((error) => {
          console.error(`Error in fight effect: ${error}`);
          updateGameBoard(); // Ensure the game board is updated even if the fight effect fails
        });

      if (hasProfessorXMindControl) {
        await professorXMindControlGainVillain(villainCard);
      }

      // Reset the currentVillainLocation after the attack is resolved
      currentVillainLocation = null;
      updateGameBoard();
    }
  });
}

function silverSurferThePowerCosmic() {
  onscreenConsole.log(
    `Focus! You have spent 9 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to gain +9 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );

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

  onscreenConsole.log(
    `You had ${originalRecruit} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">. It has been doubled and you now have ${totalRecruitPoints} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
  );

  updateGameBoard();
}

//Expansion Popup
