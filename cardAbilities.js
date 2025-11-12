// cardAbilities.js
//12.11.2025 15.15

function koBonuses() {
  playSFX("ko");
  if (twoRecruitFromKO > 0) {
    totalRecruitPoints += twoRecruitFromKO;
    cumulativeRecruitPoints += twoRecruitFromKO;
    onscreenConsole.log(
      `A card you owned was KO'd. +${twoRecruitFromKO}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
    );
    updateGameBoard();
  }
}

function defeatBonuses() {
  if (extraThreeRecruitAvailable === true) {
    totalRecruitPoints += 3;
    cumulativeRecruitPoints += 3;
    onscreenConsole.log(
      `You defeated a Villain or Mastermind. +3 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
    );
  }
}

function bystanderBonuses() {
  playSFX("rescue");
  bystandersRescuedThisTurn++;

  if (jeanGreyBystanderRecruit > 0) {
    totalRecruitPoints += jeanGreyBystanderRecruit;
    cumulativeRecruitPoints += jeanGreyBystanderRecruit;
    onscreenConsole.log(
      `<span style='padding-left: 40px'>+${jeanGreyBystanderRecruit} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained from rescuing ${jeanGreyBystanderRecruit === 1 ? "a Bystander" : "Bystanders"}.</span>`,
    );
  }

  if (jeanGreyBystanderDraw > 0) {
    onscreenConsole.log(
      `<span style='padding-left: 40px'>Rescued Bystander. Drawing ${jeanGreyBystanderDraw} extra card${jeanGreyBystanderDraw > 1 ? "s" : ""}.</span>`,
    );
    for (let i = 0; i < jeanGreyBystanderDraw; i++) {
      extraDraw();
    }
  }

  if (jeanGreyBystanderAttack > 0) {
    totalAttackPoints += jeanGreyBystanderAttack;
    cumulativeAttackPoints += jeanGreyBystanderAttack;
    onscreenConsole.log(
      `<span style='padding-left: 40px'>+${jeanGreyBystanderAttack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained from rescuing ${jeanGreyBystanderAttack === 1 ? "a Bystander" : "Bystanders"}.</span>`,
    );
  }
}

function extraDraw(hero) {
  // Check if both playerDeck and playerDiscardPile are empty
  if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
    console.log("No cards available to draw.");
    onscreenConsole.log("No cards available to draw.");
    return false; // Indicate failure
  }

  // If playerDeck is empty but playerDiscardPile has cards, reshuffle discard pile into deck
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  // Draw a card and add it to the player's hand
  playSFX("card-draw");
  const card = playerDeck.pop();
  playerHand.push(card);
  extraCardsDrawnThisTurn++;
  console.log(
    "Card drawn. Total cards drawn this turn: ",
    extraCardsDrawnThisTurn,
  );
  if (hero && hero.name === "Angel - Diving Catch") {
    onscreenConsole.log(
      `<span style='padding-left: 40px'>Extra card drawn: <span class="console-highlights">${card.name}</span>.</span>`,
    );
  } else {
    onscreenConsole.log(
      `Extra card drawn: <span class="console-highlights">${card.name}</span>.`,
    );
  }

  // Update the game board to reflect the new state
  updateGameBoard();

  return true; // Indicate success
}

function WolverineExtraDraw() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  extraDraw();
}

function EmmaFrostExtraDraw() {
  return new Promise((resolve) => {
    const previousCards = cardsPlayedThisTurn.slice(0, -1);
    const cardsYouHave = [
      ...playerHand,
      ...previousCards.filter(
        (card) => !card.isCopied && !card.sidekickToDestroy,
      ),
    ];

    const XMenCount = cardsYouHave.filter(
      (item) => item.team === "X-Men",
    ).length;

    if (XMenCount === 0) {
      onscreenConsole.log(
        `You are unable to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`,
      );
      resolve();
      return;
    }

    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO REVEAL AN <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> HERO TO DRAW A CARD?",
        "Reveal Hero",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Emma Frost - Psychic Link";

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
          "url('Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        onscreenConsole.log(
          `<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero revealed.`,
        );
        extraDraw();
        closeInfoChoicePopup();
        resolve();
      };

      denyButton.onclick = () => {
        onscreenConsole.log(
          `You have chosen not to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`,
        );
        closeInfoChoicePopup();
        resolve();
      };
    }, 10);
  });
}

function StormExtraDraw() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  extraDraw();
}

function IronManExtraDraw() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  extraDraw();
}

function WolverineBonusAttackPerExtraCard() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  const extraCardsDrawn = extraCardsDrawnThisTurn;
  const extraDrawBonusAttack = 1 * extraCardsDrawn;
  onscreenConsole.log(
    `You have drawn ${extraCardsDrawn} extra cards this turn. +${extraDrawBonusAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  totalAttackPoints += extraDrawBonusAttack;
  cumulativeAttackPoints += extraDrawBonusAttack;

  updateGameBoard();
}

async function SpiderManRevealTopCardToDrawAndBystander() {
  // Rescue a bystander if available
  if (bystanderDeck.length > 0) {
    const rescuedBystander = bystanderDeck.pop();
    victoryPile.push(rescuedBystander);
    bystanderBonuses();

    console.log("Bystander rescued:", rescuedBystander);
    console.log("Current Victory Pile:", victoryPile);
    onscreenConsole.log(
      `<span class="console-highlights">${rescuedBystander.name}</span> rescued.`,
    );
    await rescueBystanderAbility(rescuedBystander);
    updateGameBoard();
  } else {
    console.log("No bystanders left in the deck to rescue.");
    onscreenConsole.log("No Bystanders left to rescue.");
  }

  // Shuffle discard pile into deck if deck is empty
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.cost <= 2) {
    playSFX("card-draw");
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> and it cost 2 or less. It has been added to your hand.`,
    );
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> and it cost more than 2. It has been returned to the top of your deck.`,
    );
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function SpiderManRevealTopCardToDraw() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.cost <= 2) {
    playSFX("card-draw");
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> and it cost 2 or less. It has been added to your Hand.`,
    );
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> and it cost more than 2. It has been returned to the top of your Deck.`,
    );
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

async function drawWound() {
  // Find all invulnerable cards and track their location
  const invulnerableCards = [
    ...playerHand
      .filter((card) => card.invulnerability === "discardWound")
      .map((card) => ({ ...card, location: "Hand" })),
    ...playerHand
      .filter((card) => card.invulnerability === "revealWound")
      .map((card) => ({ ...card, location: "Hand" })),
    ...cardsPlayedThisTurn
      .filter((card) => card.invulnerability === "revealWound")
      .map((card) => ({ ...card, location: "Already Played" })),
  ];

  if (invulnerableCards.length === 0) {
    defaultWoundDraw();
    return;
  }

  await showInvulnerabilityChoicePopup(invulnerableCards);
}

function showInvulnerabilityChoicePopup(invulnerableCards) {
  updateGameBoard();
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
    titleElement.textContent = "Avoid Wound";
    instructionsElement.innerHTML = "Select a card to avoid gaining a Wound.";

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

    // Sort the invulnerable cards
    genericCardSort(invulnerableCards);

    let selectedCard = null;
    let selectedCardElement = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card name
    function updateInstructions() {
      if (selectedCard === null) {
        instructionsElement.innerHTML =
          "Select a card to avoid gaining a Wound.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be used to avoid gaining a Wound.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;
    }

    // Create card elements for each invulnerable card
    invulnerableCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);

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
        previewElement.style.backgroundColor = "var(--accent)";
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        setTimeout(() => {
          if (!selectionRow1.querySelector(":hover") && !isDragging) {
            // Only clear preview if no card is selected
            if (selectedCard === null) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
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
          // Deselect current card
          selectedCard = null;
          if (selectedCardElement) {
            selectedCardElement
              .querySelector("img")
              .classList.remove("selected");
            selectedCardElement = null;
          }
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous card if any
          if (selectedCardElement) {
            selectedCardElement
              .querySelector("img")
              .classList.remove("selected");
          }

          // Select new card
          selectedCard = card;
          selectedCardElement = cardElement;
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

    if (invulnerableCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (invulnerableCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (invulnerableCards.length > 5) {
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
    confirmButton.textContent = "AVOID WOUND";
    otherChoiceButton.style.display = "none";
    noThanksButton.textContent = "GAIN WOUND INSTEAD";
    noThanksButton.style.display = "inline-block";
    noThanksButton.disabled = false;

    // Handle avoid wound (confirm button)
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {
        await triggerInvulnerabilityEffect(selectedCard);
        updateGameBoard();
        closeCardChoicePopup();
        resolve(true);
      }, 100);
    };

    // Handle gain wound (no thanks button)
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      setTimeout(() => {
        defaultWoundDraw();
        updateGameBoard();
        closeCardChoicePopup();
        resolve(false);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

// Helper function to find the original card object
function getOriginalCard(cardWithLocation) {
  if (cardWithLocation.location === "Hand") {
    return playerHand.find((c) => c.name === cardWithLocation.name);
  } else {
    return cardsPlayedThisTurn.find((c) => c.name === cardWithLocation.name);
  }
}

function triggerInvulnerabilityEffect(card) {
  switch (card.name) {
    case "Captain America - Diving Block":
      drawInsteadOfWound();
      break;
    case "Skids":
      skidsWoundInvulnerability(card); // Now properly passes the card reference
      break;
    case "Colossus - Invulnerability":
      colossusInvulnerability(card); // Now properly passes the card reference
      break;
    default:
      console.warn(
        `No effect defined for ${card.name}'s Wound invulnerability.`,
      );
      defaultWoundDraw();
  }
}

async function EscapeDrawWound() {
  onscreenConsole.log(`Escape! You gain a Wound.`);
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  drawWound();
}

function drawTwo() {
  extraDraw();
  extraDraw();
}

function IronManDrawTwo() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  drawTwo();
}

function WolverineDrawTwo() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  drawTwo();
}

function WolverineDrawThree() {
  drawThree();
}

function FightDrawThree() {
  onscreenConsole.log(`Fight! Draw three cards.`);
  drawThree();
}

function drawThree() {
  extraDraw();
  extraDraw();
  extraDraw();
}

async function rescueBystander(hero) {
  if (bystanderDeck.length > 0) {
    const rescuedBystander = bystanderDeck.pop();
    victoryPile.push(rescuedBystander);

    if (hero && hero.name === "Angel - Diving Catch") {
      onscreenConsole.log(
        `<span style='padding-left: 40px'><span class="console-highlights">${rescuedBystander.name}</span> rescued.</span>`,
      );
    } else {
      onscreenConsole.log(
        `<span class="console-highlights">${rescuedBystander.name}</span> rescued.`,
      );
    }

    bystanderBonuses();

    // CRITICAL: await until any popup/flow (e.g. Radiation Scientist) is done
    await rescueBystanderAbility(rescuedBystander);

    updateGameBoard();
    return rescuedBystander; // optional but handy
  } else {
    onscreenConsole.log("No Bystanders left to rescue.");
  }
}

async function BlackWidowRescueBystander() {
  if (bystanderDeck.length > 0) {
    const rescuedBystander = bystanderDeck.pop();
    victoryPile.push(rescuedBystander);
    bystanderBonuses();
    onscreenConsole.log(
      `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
    );
    onscreenConsole.log(
      `<span class="console-highlights">${rescuedBystander.name}</span> rescued.`,
    );
    await rescueBystanderAbility(rescuedBystander);
    updateGameBoard();
  } else {
    console.log("No bystanders left in the deck to rescue.");
    onscreenConsole.log("No Bystanders left to rescue.");
  }
}

function BlackWidowRescueBystanderByKO() {
  return new Promise((resolve) => {
    onscreenConsole.log(
      `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
    );

    // Check if there are any bystanders available
    const hasBystanders = bystanderDeck.length > 0;

    if (!hasBystanders) {
      console.log("There are no Bystanders available to be rescued.");
      onscreenConsole.log("There are no Bystanders available to be rescued.");
    }

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
    titleElement.textContent = "Black Widow - Dangerous Rescue";
    if (hasBystanders) {
      instructionsElement.innerHTML = `Select a card to KO and rescue a <span class="bold-spans">Bystander</span>`;
    } else {
      instructionsElement.innerHTML = `There are no Bystanders available, but would you like to KO a card?`;
    }

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
        if (hasBystanders) {
          instructionsElement.innerHTML = `Select a card to KO and rescue a <span class="bold-spans">Bystander</span>`;
        } else {
          instructionsElement.innerHTML = `There are no Bystanders available, but would you like to KO a card?`;
        }
      } else {
        if (hasBystanders) {
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd to rescue a Bystander.`;
        } else {
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
        }
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

        koPile.push(selectedCard);

        // Only rescue bystander if available
        if (hasBystanders) {
          const bystanderCard = bystanderDeck.pop();
          victoryPile.push(bystanderCard);
          onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been KO'd. <span class="console-highlights">${bystanderCard.name}</span> rescued.`,
          );
          bystanderBonuses();
          await rescueBystanderAbility(bystanderCard);
        } else {
          onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`,
          );
        }

        koBonuses();

        updateGameBoard();
        closeCardChoicePopup();
        resolve();
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(`No card was KO'd.`);
      if (hasBystanders) {
        onscreenConsole.log(
          `You chose not to KO any cards to rescue a Bystander.`,
        );
      } else {
        onscreenConsole.log(`You chose not to KO any cards.`);
      }
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function bonusAttack() {
  const previousCards = cardsPlayedThisTurn.slice(0, -1);
  const lastCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
  const { multiplierLocation, multiplier, multiplierAttribute, bonusAttack } =
    lastCard;

  if (
    multiplierLocation === "None" ||
    multiplier === "None" ||
    multiplierAttribute === "None"
  ) {
    const totalBonusAttack = bonusAttack || 0;
    totalAttackPoints += totalBonusAttack;
    cumulativeAttackPoints += totalBonusAttack;

    console.log("Multiplier is 'None', directly adding bonusAttack.");
    updateGameBoard();
    return;
  }

  if (!multiplierLocation || !multiplier || !multiplierAttribute) {
    console.error("Required attributes missing in the last card.");
    return;
  }

  const locations = {
    victoryPile: victoryPile,
    discardPile: playerDiscardPile,
    villainDeck: villainDeck,
    heroDeck: heroDeck,
    hq: hq,
    city: city,
    playerHand: playerHand,
    playerDeck: playerDeck,
    playedCards: previousCards,
    koPile: koPile,
    escapedVillainsDeck: escapedVillainsDeck,
    mastermindDeck: mastermindDeck,
  };

  const locationCards = locations[multiplierLocation];

  if (!Array.isArray(locationCards)) {
    console.error(
      `Invalid or missing array for multiplierLocation: ${multiplierLocation}`,
    );
    return;
  }

  let multiplierCount = 0;
  locationCards.forEach((card) => {
    if (card[multiplierAttribute.toLowerCase()] === multiplier) {
      multiplierCount++;
    }
  });

  const totalBonusAttack = (bonusAttack || 0) * multiplierCount;

  totalAttackPoints += totalBonusAttack;
  cumulativeAttackPoints += totalBonusAttack;

  updateGameBoard();
}

function ThorBonusAttack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function RogueBonusAttack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function NickFuryBonusAttack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function NickFuryCommanderBonusAttack() {
  const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const SHELDCount = previousCards.filter(
    (item) => item.team === "S.H.I.E.L.D.",
  ).length;
  let SHIELDText = "Heroes"; // Use let to allow reassignment

  if (SHELDCount === 1) {
    SHIELDText = "Hero"; // Singular for one bystander
  }

  onscreenConsole.log(
    `You have played ${SHELDCount} <img src="Visual Assets/Icons/S.H.I.E.L.D..svg" alt="SHIELD Icon" class="console-card-icons"> ${SHIELDText}. +${SHELDCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
}

function HulkGrowingAngerBonusAttack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function HulkSmashBonusAttack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+5<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function BlackWidowBonusAttack() {
  const bystanderVPCount = victoryPile.filter(
    (item) => item.type === "Bystander",
  ).length;
  let bystanderText = "Bystanders"; // Use let to allow reassignment

  if (bystanderVPCount === 1) {
    bystanderText = "Bystander"; // Singular for one bystander
  }

  onscreenConsole.log(
    `You have ${bystanderVPCount} ${bystanderText} in your Victory Pile. +${bystanderVPCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
}

function IronManBonusAttack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
}

function IronManArcReactorBonusAttack() {
  const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const techCount = previousCards.filter(
    (item) => item.classes && item.classes.includes("Tech"),
  ).length;
  let techText = "Heroes"; // Use let to allow reassignment

  if (techCount === 1) {
    techText = "Hero";
  }

  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `You have played ${techCount} ${techText}. +${techCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
}

function HawkeyeBonusAttack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Avengers.svg" alt="Avengers Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
}

function CaptainAmericaBonusAttack() {
  const AvengersCount = cardsPlayedThisTurn
    .slice(0, -1)
    .filter((item) => item.team === "Avengers").length;
  let AvengersText = "Heroes"; // Use let since we might reassign this value
  const AvengersAttack = AvengersCount * 3;

  if (AvengersCount === 1) {
    AvengersText = "Hero"; // Reassign to singular if only one Avenger
  }

  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Avengers.svg" alt="Avengers Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `You have played ${AvengersCount} <img src="Visual Assets/Icons/Avengers.svg" alt="Avengers Icon" class="console-card-icons"> ${AvengersText}. +${AvengersAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
}

function CyclopsBonusAttack() {
  const XMenCount = cardsPlayedThisTurn
    .slice(0, -1)
    .filter((item) => item.team === "X-Men").length;
  let XMenText = "Heroes";
  const XMenAttack = XMenCount * 2;

  if (XMenCount === 1) {
    XMenText = "Hero";
  }

  onscreenConsole.log(
    `<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `You have played ${XMenCount} <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> ${XMenText}. +${XMenAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
}

function bonusRecruit() {
  const lastCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
  const { multiplierLocation, multiplier, multiplierAttribute, bonusRecruit } =
    lastCard;

  if (
    multiplierLocation === "None" ||
    multiplier === "None" ||
    multiplierAttribute === "None"
  ) {
    const totalBonusRecruit = bonusRecruit || 0;
    totalRecruitPoints += totalBonusRecruit;
    cumulativeRecruitPoints += totalBonusRecruit;

    console.log("Multiplier is 'None', directly adding bonusRecruit.");
    updateGameBoard();
    return;
  }

  if (!multiplierLocation || !multiplier || !multiplierAttribute) {
    console.error("Required attributes missing in the last card.");
    return;
  }

  const locations = {
    victoryPile: victoryPile,
    discardPile: playerDiscardPile,
    villainDeck: villainDeck,
    heroDeck: heroDeck,
    hq: hq,
    city: city,
    playerHand: playerHand,
    playerDeck: playerDeck,
    playedCards: cardsPlayedThisTurn.slice(0, -1),
    koPile: koPile,
    escapedVillainsDeck: escapedVillainsDeck,
    mastermindDeck: mastermindDeck,
  };

  const locationCards = locations[multiplierLocation];

  if (!Array.isArray(locationCards)) {
    console.error(
      `Invalid or missing array for multiplierLocation: ${multiplierLocation}`,
    );
    return;
  }

  let multiplierCount = 0;
  locationCards.forEach((card) => {
    if (card[multiplierAttribute.toLowerCase()] === multiplier) {
      multiplierCount++;
    }
  });

  const totalBonusRecruit = (bonusRecruit || 0) * multiplierCount;

  totalRecruitPoints += totalBonusRecruit;
  cumulativeRecruitPoints += totalBonusRecruit;

  updateGameBoard();
}

function ThorBonusRecruit() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
  );
  bonusRecruit();
}

function GambitRevealTopCardForAttack() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0 && playerDiscardPile === 0) {
    onscreenConsole.log(`No cards are available to be revealed.`);
    return;
  }

  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];
  const topCardCost = topCardPlayerDeck.cost;

  topCardPlayerDeck.revealed = true;

  totalAttackPoints += topCardCost;
  cumulativeAttackPoints += topCardCost;

  console.log(
    `You revealed ${topCardPlayerDeck.name}. Its cost of ${topCardPlayerDeck.cost} has been added to your attack points.`,
  );
  onscreenConsole.log(
    `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It has a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of ${topCardPlayerDeck.cost}. +${topCardPlayerDeck.cost}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  updateGameBoard();
}

function GambitRevealXTopCardToDraw() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
    onscreenConsole.log(`No cards are available to be revealed.`);
    return;
  }

  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  topCardPlayerDeck.revealed = true;

  if (topCardPlayerDeck.team === "X-Men") {
    playSFX("card-draw");
    playerDeck.pop();
    playerHand.push(topCardPlayerDeck);
    extraCardsDrawnThisTurn++;
    console.log(
      `You revealed ${topCardPlayerDeck.name}. It has been added to your hand.`,
    );
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. They are an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have been added to your hand.`,
    );
    updateGameBoard();
  } else {
    console.log(
      `You revealed ${topCardPlayerDeck.name}. They are not a member of the X-Men and have been returned to the top of the deck.`,
    );
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. They are not an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have been returned to the top of your deck.`,
    );
    updateGameBoard();
  }
}

function ThorHighRecruitReward() {
  if (cumulativeRecruitPoints >= 8) {
    onscreenConsole.log(
      `You have made at least 8 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> this turn. +3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
    totalAttackPoints += 3;
    cumulativeAttackPoints += 3;
    updateGameBoard();
  }
}

function DeadpoolApplyOddCostBonus() {
  let oddCostCount = 0;
  const playedCards = cardsPlayedThisTurn.slice(0, -1);
  let oddCostText = "Heroes";

  playedCards.forEach((card) => {
    if (card.cost % 2 !== 0) {
      oddCostCount++;
    }
  });

  if (oddCostCount === 1) {
    oddCostText = "Hero";
  } else {
    oddCostText = "Heroes";
  }

  totalAttackPoints += oddCostCount;
  cumulativeAttackPoints += oddCostCount;

  console.log(`Number of odd cost cards: ${oddCostCount}`);
  console.log(`${oddCostCount} added to Attack points.`);

  onscreenConsole.log(
    `Special Ability: You have played ${oddCostCount} ${oddCostText} with an odd-numbered <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${oddCostCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  updateGameBoard();
}

function CaptainAmericaCountUniqueColorsAndAddAttack() {
  const allCards = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  const uniqueColors = new Set();

  allCards.forEach((card) => {
    // Skip if no color or color is "None" (case-insensitive)
    if (
      card.color &&
      typeof card.color === "string" &&
      card.color.trim().toLowerCase() !== "none"
    ) {
      uniqueColors.add(card.color.trim().toLowerCase()); // Normalize case
    }
  });

  const uniqueColorCount = uniqueColors.size;
  totalAttackPoints += uniqueColorCount;
  cumulativeAttackPoints += uniqueColorCount;
  updateGameBoard();
  onscreenConsole.log(
    `Special Ability: You have ${uniqueColorCount} unique colors. +${uniqueColorCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
}

function CaptainAmericaCountUniqueColorsAndAddRecruit() {
  const allCards = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  const uniqueColors = new Set();

  allCards.forEach((card) => {
    // Skip if no color or color is "None" (case-insensitive)
    if (
      card.color &&
      typeof card.color === "string" &&
      card.color.trim().toLowerCase() !== "none"
    ) {
      uniqueColors.add(card.color.trim().toLowerCase()); // Normalize case
    }
  });

  const uniqueColorCount = uniqueColors.size;
  totalRecruitPoints += uniqueColorCount;
  cumulativeRecruitPoints += uniqueColorCount;
  updateGameBoard();
  onscreenConsole.log(
    `Special Ability: You have ${uniqueColorCount} unique colors. +${uniqueColorCount} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
  );
}

function DeadpoolReDraw() {
  if (cardsPlayedThisTurn.length !== 1) {
    onscreenConsole.log(
      `<span class="console-highlights">Deadpool - Hey, Can I Get a Do-Over?</span> is not the first card you have played this turn.`,
    );
    return;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO DISCARD THE REMAINDER OF YOUR HAND AND DRAW FOUR CARDS?",
        "Discard & Draw",
        "Keep Hand",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Deadpool - Hey, Can I Get A Do-Over?";

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
          "url('Visual Assets/Heroes/Reskinned Core/Core_Deadpool_HeyCanIGetADoOver.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      // Clear previous listeners by cloning (handled by showHeroAbilityMayPopup)

      denyButton.onclick = function () {
        onscreenConsole.log("Original hand preserved.");
        closeInfoChoicePopup();
        resolve();
      };

      confirmButton.onclick = async function () {
        closeInfoChoicePopup();

        // 1) Snapshot & clear hand up front
        const handSnapshot = [...playerHand];
        playerHand.length = 0;

        // 2) Discard all snapshot cards with immediate triggers
        const returnedCards = [];
        for (const card of handSnapshot) {
          const { returned } = await checkDiscardForInvulnerability(card);
          if (returned && returned.length) returnedCards.push(...returned);
        }

        // 3) Add any invulnerable cards back to hand
        if (returnedCards.length) playerHand.push(...returnedCards);

        // 4) Draw four new cards
        for (let i = 0; i < 4; i++) {
          await extraDraw();
        }

        onscreenConsole.log(
          "You discarded your remaining hand and drew four cards.",
        );
        updateGameBoard();

        resolve();
      };
    }, 10);
  });
}

function EmmaFrostVoluntaryVillainForAttack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `DO YOU WISH TO PLAY AN EXTRA VILLAIN CARD FOR +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">?`,
        "Play Villain",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Emma Frost - Shadowed Thoughts";

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
          "url('Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_ShadowedThoughts.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = function () {
        console.log("Extra villain card played. +2 attack granted.");
        onscreenConsole.log(
          `Extra Villain card played. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
        );
        drawVillainCard();
        totalAttackPoints += 2;
        cumulativeAttackPoints += 2;
        updateGameBoard();
        closeInfoChoicePopup();
        resolve();
      };

      denyButton.onclick = function () {
        console.log("No extra villain card played.");
        onscreenConsole.log("No extra Villain card has been played.");
        closeInfoChoicePopup();
        resolve();
      };
    }, 10);
  });
}

function hideHeroAbilityMayPopup() {
  document.getElementById("hero-ability-may-popup").style.display = "none";
  document.getElementById("modal-overlay").style.display = "none";
  document.getElementById("hero-ability-may-h2").innerHTML = "Hero Ability!";
  const cardImage = document.getElementById("hero-ability-may-card");
  cardImage.style.display = "none";
  updateGameBoard();
}

function drawInsteadOfWound() {
  onscreenConsole.log(`Special Ability: You have avoided gaining a Wound.`);
  extraDraw(); // Logic for drawing the extra card
}

function DeadpoolChooseToGainWound() {
  return new Promise(async (resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO GAIN A WOUND?",
        "Gain Wound",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Deadpool - Random Acts of Unkindness";

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
          "url('Visual Assets/Other/Wound.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      // Confirm button handling
      confirmButton.onclick = async function () {
        deadpoolRare = true;
        await drawWound(); // Let drawWound handle all the logic
        closeInfoChoicePopup();
        resolve();
      };

      // Deny button handling
      denyButton.onclick = function () {
        console.log("No Wound gained.");
        onscreenConsole.log("No Wound gained.");
        closeInfoChoicePopup();
        resolve();
      };
    }, 10);
  });
}

async function GambitTopCardDiscardOrPutBack() {
  return new Promise((resolve) => {
    setTimeout(() => {
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

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `YOU REVEALED <span class="bold-spans">${topCardPlayerDeck.name}</span> FROM YOUR DECK. DO YOU WISH TO DISCARD IT OR RETURN IT?`,
        "Discard Card",
        "Return to Deck",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Gambit - Hypnotic Charm";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('${topCardPlayerDeck.image}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = async function () {
        closeInfoChoicePopup();
        playerDeck.pop();

        const { returned } =
          await checkDiscardForInvulnerability(topCardPlayerDeck);
        if (returned.length) {
          playerHand.push(...returned);
        }

        console.log(`You discarded ${topCardPlayerDeck.name}.`);
        onscreenConsole.log(
          `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been discarded.`,
        );
        updateGameBoard();

        resolve();
      };

      denyButton.onclick = async function () {
        console.log(
          `You put ${topCardPlayerDeck.name} back on top of your deck.`,
        );
        onscreenConsole.log(
          `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`,
        );
        updateGameBoard();
        closeInfoChoicePopup();
        if (stingOfTheSpider) {
          await scarletSpiderStingOfTheSpiderDrawChoice(topCardPlayerDeck);
        }
        resolve();
      };
    }, 10);
  });
}

function topCardKOOrPutBack() {
  onscreenConsole.log(
    `Fight! Reveal the top card of your deck and choose to KO it or put it back.`,
  );

  return new Promise((resolve) => {
    if (playerDeck.length === 0) {
      playerDeck = shuffle(playerDiscardPile);
      playerDiscardPile = [];
    }

    const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `You revealed the top card of your deck: <span class="console-highlights">${topCardPlayerDeck.name}</span>. Do you wish to KO it or put it back?`,
        "KO Card",
        "Put Back",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "MELTER";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for image
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('${topCardPlayerDeck.image}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      const cleanup = () => {
        closeInfoChoicePopup();
        resolve();
      };

      confirmButton.onclick = function () {
        playerDeck.pop();
        koPile.push(topCardPlayerDeck);
        onscreenConsole.log(
          `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
        );
        koBonuses();
        updateGameBoard();
        cleanup();
      };

      denyButton.onclick = async function () {
        onscreenConsole.log(
          `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`,
        );
        topCardPlayerDeck.revealed = true;
        updateGameBoard();
        cleanup();
        if (stingOfTheSpider) {
          await scarletSpiderStingOfTheSpiderDrawChoice(selectedCard);
        }
      };
    }, 10);
  });
}

function Gambit2ndTopCardDiscardOrPutBack() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability not activated - "each other player" Hero effects do not apply in Solo play.`,
  );
}

function HawkeyeDontDrawOrDiscard() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability not activated - "each other player" Hero effects do not apply in Solo play.`,
  );
}

function rescueThreeBystanders() {
  rescueExtraBystanders += 3;
  console.log(
    "Whenever you defeat a villain or mastermind this turn, you will rescue 3 bystanders.",
  );
  onscreenConsole.log(
    "Whenever you defeat a Villain or Mastermind this turn, you will rescue three Bystanders.",
  );
}

function EmmaFrostExtraThreeRecruit() {
  extraThreeRecruitAvailable = true;

  console.log(
    "Whenever you defeat a villain or mastermind this turn, you will gain 3 Recruit points.",
  );
  onscreenConsole.log(
    'Whenever you defeat a Villain or Mastermind this turn, you will rescue gain +3 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.',
  );
}

function WolverineKoWoundToDraw() {
  return new Promise((resolve) => {
    // Get wounds from both locations
    const discardPileWounds = playerDiscardPile.filter(
      (card) => card.type === "Wound",
    );
    const handWounds = playerHand.filter((card) => card.type === "Wound");

    // If no wounds are found, log and resolve
    if (discardPileWounds.length === 0 && handWounds.length === 0) {
      console.log("No Wounds");
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
    titleElement.textContent = "Wolverine - Healing Factor";
    instructionsElement.textContent = "Select a Wound to KO and draw a card";

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

    // Sort the arrays for display
    genericCardSort(handWounds);
    genericCardSort(discardPileWounds);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.textContent =
          "Select a Wound to KO and draw a card";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd from your ${selectedLocation} to draw a card.`;
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

    // Populate row1 with Hand wounds
    handWounds.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Discard Pile wounds
    discardPileWounds.forEach((card) => {
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
        if (selectedLocation === "discard pile") {
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

        // Add to KO pile and draw card
        extraDraw();

        onscreenConsole.log(
          `You KO'd <span class="console-highlights">${selectedCard.name}</span> from your ${selectedLocation} and drew a card.`,
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

function HulkKoWoundToGainAttack() {
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
    titleElement.textContent = "Hulk - Unstoppable Hulk";
    instructionsElement.innerHTML = `Select a Wound to KO and gain +2<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'>.`;

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
      "Visual Assets/Heroes/Reskinned Core/Core_Hulk_UnstoppableHulk.webp";
    const previewImage = document.createElement("img");
    previewImage.src = defaultImage;
    previewImage.alt = "Hulk - Unstoppable Hulk";
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
        instructionsElement.innerHTML = `Select a Wound to KO and gain +2<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'>.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd from your ${selectedLocation} to gain +2<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'>.`;
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
              defaultPreviewImage.alt = "Hulk - Unstoppable Hulk";
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
          defaultPreviewImage.alt = "Hulk - Unstoppable Hulk";
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
// Replace the confirm button handler with this:

confirmButton.onclick = (e) => {
  e.stopPropagation();
  e.preventDefault();
  if (selectedCard === null || selectedLocation === null) return;

  setTimeout(() => {
    let removedWound = null;
    
    // Remove wound from its location using the actual card reference
    if (selectedLocation === "Discard Pile") {
      const index = playerDiscardPile.indexOf(selectedCard); // Use direct reference
      if (index !== -1) {
        removedWound = playerDiscardPile.splice(index, 1)[0];
        koPile.push(removedWound);
      }
    } else {
      const index = playerHand.indexOf(selectedCard); // Use direct reference
      if (index !== -1) {
        removedWound = playerHand.splice(index, 1)[0];
        koPile.push(removedWound);
      }
    }

    if (removedWound) {
      // Add to KO pile and gain attack
      totalAttackPoints += 2;
      cumulativeAttackPoints += 2;

      onscreenConsole.log(
        `You KO'd a <span class="console-highlights">${removedWound.name}</span> from your ${selectedLocation}. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
      );
      koBonuses();

      updateGameBoard();
      closeCardChoicePopup();
      resolve(true);
    } else {
      console.error("Failed to find and remove the selected wound");
      closeCardChoicePopup();
      resolve(false);
    }
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

function SpiderManRevealTopThreeAndReorder() {
  return new Promise(async (resolve) => {
    // Draw up to three cards
    let holdingArray = [];
    for (let i = 0; i < 3; i++) {
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
          onscreenConsole.log("Shuffled discard pile into deck.");
        } else {
          onscreenConsole.log("No cards available to reveal.");
          break;
        }
      }
      holdingArray.push(playerDeck.pop());
    }

    // Process cards with cost <= 2
    holdingArray = holdingArray.filter((card) => {
      if (card.cost <= 2) {
        playerHand.push(card);
        extraCardsDrawnThisTurn++;
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> (Cost: ${card.cost}) added to hand.`,
        );
        return false;
      }
      return true;
    });

    // Handle remaining cards
    if (holdingArray.length === 0) {
      onscreenConsole.log(
        "All revealed cards cost 2 or less and have been added to your hand.",
      );
      updateGameBoard();
      resolve();
      return;
    }

    if (holdingArray.length === 1) {
      const card = holdingArray[0];
      playerDeck.push(card);
      onscreenConsole.log(
        `<span class="console-highlights">${card.name}</span> cost more than 2 and was returned to the deck.`,
      );
      card.revealed = true;
      updateGameBoard();
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(card);
      }
      resolve();
      return;
    }

    // Use toggle-and-confirm for multiple cards
    handleCardReturnOrder(holdingArray).then(() => {
      updateGameBoard();
      resolve();
    });
  });
}

async function handleCardReturnOrder(cards) {
  const remainingCards = [...cards];
  const returnedOrder = [];

  while (remainingCards.length > 0) {
    const choice = await showSequentialCardSelectionPopup({
      title: "Return Cards to Deck",
      instructions:
        remainingCards.length === cards.length
          ? "Select the first card to place back on the deck."
          : "Select the next card to return.",
      cards: remainingCards,
      confirmText: "CONFIRM SELECTION",
    });

    if (!choice) {
      // Handle cancellation if needed
      break;
    }

    // Move selected card from remaining to returned
    const selectedIndex = remainingCards.findIndex((c) => c === choice);
    if (selectedIndex !== -1) {
      remainingCards.splice(selectedIndex, 1);
      returnedOrder.push(choice); // Add to end - first selected goes to bottom

      // Add card to deck immediately
      playerDeck.push(choice);
      choice.revealed = true;

      // Log the card return immediately
      onscreenConsole.log(
        `Returned <span class="console-highlights">${choice.name}</span> to deck.`,
      );
      updateGameBoard(); // Update to show the card moved to deck

      // Trigger sting immediately after placing each card
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(choice);
      }
    }
  }

  // Remove the batch console message since we're logging individually now
  closeCardChoicePopup();
  updateGameBoard();
}

// New helper function to handle sequential selection with the new popup structure
function showSequentialCardSelectionPopup({
  title,
  instructions,
  cards,
  confirmText,
}) {
  return new Promise((resolve) => {
    // Setup UI elements for new popup structure
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

    // Set popup content
    titleElement.textContent = title;
    instructionsElement.textContent = instructions;

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

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card
    cards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-index", String(index));

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
        previewElement.style.backgroundColor = "var(--accent)";
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if we're not hovering over another card
        setTimeout(() => {
          if (
            !selectionRow1.querySelector(":hover") &&
            !isDragging &&
            !selectedCardImage
          ) {
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          }
        }, 50);
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

        // Clear previous selection if any
        if (selectedCardImage) {
          selectedCardImage.classList.remove("selected");
        }

        // Select new card
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

        // Enable confirm button
        document.getElementById("card-choice-popup-confirm").disabled = false;
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (cards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (cards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (cards.length > 5) {
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

    // Disable confirm initially and hide other buttons
    confirmButton.disabled = true;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Update confirm button text
    confirmButton.textContent = confirmText;

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard) return;

      setTimeout(() => {
        closeCardChoicePopup();
        resolve(selectedCard);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function RogueCopyTopCardEffect() {
  return new Promise((resolve) => {
    // Check if the player deck is empty and needs reshuffling
    if (playerDeck.length === 0) {
      if (playerDiscardPile.length > 0) {
        playerDeck = shuffle(playerDiscardPile);
        playerDiscardPile = [];
      } else {
        console.log("No cards left in deck or discard pile.");
        onscreenConsole.log("No cards available to draw and discard.");
        resolve();
        return;
      }
    }

    // Draw the top card and immediately send it to the discard pile
    playSFX("card-draw");
    const topCard = playerDeck.pop();
    playerDiscardPile.push(topCard);

    // Simulate the play of the card by adding its full details to cardsPlayedThisTurn
    const simulatedCard = { ...topCard };
    cardsPlayedThisTurn.push(simulatedCard);

    // Extract card details for simulation
    const cardName = simulatedCard.name;
    const cardAttack = simulatedCard.attack || 0;
    const cardRecruit = simulatedCard.recruit || 0;
    const cardUnconditionalAbility =
      simulatedCard.unconditionalAbility || "None";
    const cardConditionalAbility = simulatedCard.conditionalAbility || "None";
    const cardConditionType = simulatedCard.conditionType || null;
    const cardCondition = simulatedCard.condition || null;

    if (
      simulatedCard.name !== "Rogue - Copy Powers" &&
      simulatedCard.name !== "Prodigy"
    ) {
      simulatedCard.isCopied = true;
    }

    console.log(
      `You reveal the top card of your deck: ${cardName}. It has ${cardAttack} attack and ${cardRecruit} recruit points.`,
    );
    onscreenConsole.log(
      `You revealed the top card of your deck: <span class="console-highlights">${cardName}</span>. It has been discarded so that <span class="console-highlights">Rogue</span> can copy it.`,
    );
    onscreenConsole.log(
      `You have gained +${cardAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> attack and +${cardRecruit} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
    );

    // Simulate attack and recruit points
    totalAttackPoints += cardAttack;
    totalRecruitPoints += cardRecruit;
    cumulativeAttackPoints += cardAttack;
    cumulativeRecruitPoints += cardRecruit;

    // Handle unconditional ability
    let abilityPromise = Promise.resolve();
    if (cardUnconditionalAbility && cardUnconditionalAbility !== "None") {
      const abilityFunction = window[cardUnconditionalAbility];
      if (typeof abilityFunction === "function") {
        // Wrap the result in a Promise if it isn't one
        abilityPromise = new Promise((resolve, reject) => {
          try {
            const result = abilityFunction(simulatedCard);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        console.error(
          `Unconditional ability function ${cardUnconditionalAbility} not found`,
        );
      }
    }

    // Handle conditional ability
    abilityPromise
      .then(() => {
        if (cardConditionalAbility && cardConditionalAbility !== "None") {
          if (isConditionMet(cardConditionType, cardCondition)) {
            const conditionalAbilityFunction = window[cardConditionalAbility];
            if (typeof conditionalAbilityFunction === "function") {
              // Wrap the result in a Promise if it isn't one
              return new Promise((resolve, reject) => {
                try {
                  const result = conditionalAbilityFunction(simulatedCard);
                  resolve(result);
                } catch (error) {
                  reject(error);
                }
              });
            } else {
              console.error(
                `Conditional ability function ${cardConditionalAbility} not found`,
              );
            }
          } else {
            console.log(`Condition not met for: ${cardConditionalAbility}`);
          }
        }
      })
      .then(() => {
        // Update game state/UI
        updateGameBoard();
        resolve();
      })
      .catch((err) => {
        console.error("Error during copy effect simulation:", err);
        resolve();
      });
  });
}

function findCardsWithBystanders() {
  const cardsWithBystanders = [];

  // Check city for villains with bystanders
  city.forEach((card, index) => {
    if (card && card.bystander && card.bystander.length > 0) {
      cardsWithBystanders.push({
        ...card,
        type: "Villain",
        cityIndex: index, // Store the actual city index
      });
    }
  });

  // Check mastermind
  const mastermind = getSelectedMastermind();
  if (mastermind && mastermind.bystanders && mastermind.bystanders.length > 0) {
    cardsWithBystanders.push({
      ...mastermind,
      type: "Mastermind",
      bystander: mastermind.bystanders,
    });
  }

  return cardsWithBystanders;
}

function BlackWidowShowBystanderRescueOptions() {
  updateGameBoard();
  return new Promise((resolve) => {
    const cardsWithBystanders = findCardsWithBystanders();
    if (cardsWithBystanders.length === 0) {
      onscreenConsole.log("No targets with Bystanders to rescue.");
      resolve();
      return;
    }

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
    titleElement.textContent = "SILENT SNIPER";
    instructionsElement.textContent =
      "SELECT A VILLAIN WITH A BYSTANDER TO DEFEAT:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedCell = null;
    let mastermindSelected = false;

    // Check if mastermind has bystanders
    const mastermind = getSelectedMastermind();
    const mastermindHasBystanders =
      mastermind && mastermind.bystanders && mastermind.bystanders.length > 0;

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

        // Determine eligibility - Villains with bystanders
        const isVillain = card.type === "Villain";
        const hasBystanders = card.bystander && card.bystander.length > 0;
        const isEligible = isVillain && hasBystanders;

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
                "SELECT A VILLAIN WITH A BYSTANDER TO DEFEAT:";
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

              // Deselect mastermind if it was selected
              if (mastermindSelected) {
                mastermindSelected = false;
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
            if (selectedCityIndex === null && !mastermindSelected) {
              previewElement.style.backgroundColor = "var(--accent)";
            }
          };

          cardImage.onmouseout = () => {
            if (selectedCityIndex !== null && selectedCityIndex !== i) return;

            // Only clear preview if no card is selected AND we're not hovering over another eligible card
            if (selectedCityIndex === null && !mastermindSelected) {
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
    confirmButton.textContent = "DEFEAT SELECTED TARGET";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Set up Other Choice button for Mastermind
    if (mastermindHasBystanders) {
      otherChoiceButton.style.display = "inline-block";
      otherChoiceButton.textContent = `DEFEAT ${mastermind.name} (MASTERMIND)`;
      otherChoiceButton.style.backgroundColor = "var(--panel-backgrounds)";
      otherChoiceButton.style.border = `0.5vh solid var(--accent)`;
      otherChoiceButton.style.color = "#282828";
      otherChoiceButton.disabled = false;

      // Other Choice button handler for Mastermind
      otherChoiceButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (mastermindSelected) {
          // Deselect Mastermind
          mastermindSelected = false;
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
            "SELECT A VILLAIN WITH A BYSTANDER TO DEFEAT:";
          confirmButton.disabled = true;
        } else {
          // Select Mastermind
          mastermindSelected = true;
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
          previewImage.src = mastermind.image;
          previewImage.alt = mastermind.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${mastermind.name}</span> (Mastermind) will be defeated.`;
          confirmButton.disabled = false;
        }
      };
    }

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (selectedCityIndex === null && !mastermindSelected) return;

      closeHQCityCardChoicePopup();
      modalOverlay.style.display = "none";
      updateGameBoard();

      let result;
      try {
        if (mastermindSelected) {
          result = await confirmInstantMastermindAttack();
        } else {
          result = await instantDefeatAttack(selectedCityIndex);
        }

        originalResolve(result);
      } catch (error) {
        console.error("Error during rescue operation:", error);
        onscreenConsole.log(
          `<span class="console-error">Error: ${error.message}</span>`,
        );
        originalResolve(false);
      }
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function CyclopsOpticBlastDiscardToPlay() {
  return new Promise((resolve) => {
    // Check if there are any cards to discard
    if (playerHand.length === 0) {
      console.log(
        "No cards in Hand to discard. You are unable to play this card.",
      );
      const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
      playerHand.push(unplayedCard);
      cardsPlayedThisTurn.pop(unplayedCard);
      totalAttackPoints -= unplayedCard.attack;
      totalRecruitPoints -= unplayedCard.recruit;
      cumulativeAttackPoints -= unplayedCard.attack;
      cumulativeRecruitPoints -= unplayedCard.recruit;
      updateGameBoard();
      onscreenConsole.log(
        "No cards in Hand to discard. You are unable to play this card.",
      );
      resolve(false);
      return;
    }

    // Create a sorted copy for display, don't sort the original array
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

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
    titleElement.textContent = "Cyclops - Optic Blast";
    instructionsElement.innerHTML =
      "Select a card to discard in order to play Cyclops - Optic Blast.";

    // Hide row labels and row2, show close button for "Cancel"
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

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card in the sorted hand
    sortedHand.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);

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

        if (selectedCard === card) {
          // Deselect
          selectedCard = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
            "Select a card to discard in order to play Cyclops - Optic Blast.";
          document.getElementById("card-choice-popup-confirm").disabled = true;
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

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be discarded.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (sortedHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedHand.length > 5) {
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
    confirmButton.textContent = "Discard Card";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "flex";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard) return;

      // Find the card in the original playerHand using object reference
      const index = playerHand.indexOf(selectedCard);
      if (index !== -1) {
        const discardedCard = playerHand.splice(index, 1)[0];

        onscreenConsole.log(
          `You have discarded <span class="console-highlights">${discardedCard.name}</span>, allowing you to play <span class="console-highlights">Cyclops - Optic Blast</span>.`,
        );

        closeCardChoicePopup();

        // Handle the discard logic
        const { returned } =
          await checkDiscardForInvulnerability(discardedCard);
        if (returned.length) {
          playerHand.push(...returned);
        }

        updateGameBoard();
        resolve(true);
      }
    };

    // Close button handler (Cancel action)
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      console.log("Card cannot be played since no card was discarded.");
      onscreenConsole.log(
        `You have chosen not to discard, preventing you from playing <span class="console-highlights">Cyclops - Optic Blast</span>.`,
      );

      const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
      playerHand.push(unplayedCard);
      cardsPlayedThisTurn.pop(unplayedCard);
      totalAttackPoints -= unplayedCard.attack;
      totalRecruitPoints -= unplayedCard.recruit;
      cumulativeAttackPoints -= unplayedCard.attack;
      cumulativeRecruitPoints -= unplayedCard.recruit;

      closeCardChoicePopup();
      updateGameBoard();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function checkDiscardForInvulnerability(cards) {
  const cardsArray = Array.isArray(cards) ? [...cards] : [cards];
  const actuallyDiscarded = [];
  const returnedCards = [];

  console.group(`[checkDiscard] Processing ${cardsArray.length} card(s)`);

  for (const card of cardsArray) {
    try {
      console.log(
        `Processing card: ${card.name}, Invulnerability: ${card.invulnerability}`,
      );

      if (!card.invulnerability || card.invulnerability === "None") {
        playerDiscardPile.push(card);
        actuallyDiscarded.push(card);
        console.log(`→ ${card.name} discarded normally`);
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> has been discarded.`,
        );
        continue;
      }

      if (card.invulnerability === "Discard") {
        // Only process specific cards we have cases for
        switch (card.name) {
          case "Cyclops - Unending Energy": {
            console.log(`→ Triggering Cyclops effect`);
            const shouldReturn = await cyclopsDiscardInvulnerability(card);
            if (shouldReturn) {
              returnedCards.push(card);
              console.log(`→ ${card.name} will be returned to hand`);
            } else {
              playerDiscardPile.push(card);
              actuallyDiscarded.push(card);
              console.log(`→ ${card.name} discarded after effect`);
              onscreenConsole.log(
                `<span class="console-highlights">${card.name}</span> has been discarded.`,
              );
            }
            break;
          }

          case "Angel - Diving Catch": {
            console.log(`→ Triggering Angel Diving Catch`);
            playerDiscardPile.push(card);
            actuallyDiscarded.push(card);
            onscreenConsole.log(
              `<span class="console-highlights">${card.name}</span> has been discarded.`,
            );
            addHRToTopWithInnerHTML();
            await angelDivingCatch(card);
            addHRToTopWithInnerHTML();
            break;
          }

          // Add other specific cases here as needed

          default: {
            // For any other card with "Discard" invulnerability but no specific case,
            // just discard it normally without special processing
            playerDiscardPile.push(card);
            actuallyDiscarded.push(card);
            console.log(`→ ${card.name} discarded (no special effect defined)`);
            onscreenConsole.log(
              `<span class="console-highlights">${card.name}</span> has been discarded.`,
            );
            break;
          }
        }
      } else {
        // Handle other invulnerability types (like "discardWound") by discarding normally
        playerDiscardPile.push(card);
        actuallyDiscarded.push(card);
        console.log(`→ ${card.name} discarded (invulnerability: ${card.invulnerability} - not "Discard")`);
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> has been discarded.`,
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error processing ${card.name}:`, error);
      playerDiscardPile.push(card);
      actuallyDiscarded.push(card);
    }
  }

  console.groupEnd();
  return { discarded: actuallyDiscarded, returned: returnedCards };
}

async function cyclopsDiscardInvulnerability(card) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `Would you like to return <span style="font-weight:600;">${card.name}</span> to your hand?`,
        "Yes",
        "No - Discard",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Cyclops - Unending Energy";

      // Use preview area for card image
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea && card.image) {
        previewArea.style.backgroundImage = `url('${card.image}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        console.log(`${card.name} will be returned to hand`);
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> will be returned to your hand.`,
        );
        closeInfoChoicePopup();
        resolve(true); // Just return the decision
      };

      denyButton.onclick = () => {
        console.log(`${card.name} will be discarded`);
        closeInfoChoicePopup();
        resolve(false);
      };
    }, 10);
  });
}

function CyclopsDeterminationDiscardToPlay() {
  return new Promise((resolve) => {
    // Check if there are any cards to discard
    if (playerHand.length === 0) {
      console.log(
        "No cards in Hand to discard. You are unable to play this card.",
      );
      const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
      playerHand.push(unplayedCard);
      cardsPlayedThisTurn.pop(unplayedCard);
      totalAttackPoints -= unplayedCard.attack;
      totalRecruitPoints -= unplayedCard.recruit;
      cumulativeAttackPoints -= unplayedCard.attack;
      cumulativeRecruitPoints -= unplayedCard.recruit;
      updateGameBoard();
      onscreenConsole.log(
        "No cards in Hand to discard. You are unable to play this card.",
      );
      resolve(false);
      return;
    }

    // Create a sorted copy for display, don't sort the original array
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

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
    titleElement.textContent = "Cyclops - Determination";
    instructionsElement.innerHTML =
      'Select a card to discard in order to play <span class="console-highlights">Cyclops - Determination</span>.';

    // Hide row labels and row2, show close button for "Cancel"
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
    closeButton.textContent = "Cancel";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card in the sorted hand
    sortedHand.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);

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

        if (selectedCard === card) {
          // Deselect
          selectedCard = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
            'Select a card to discard in order to play <span class="console-highlights">Cyclops - Determination</span>.';
          document.getElementById("card-choice-popup-confirm").disabled = true;
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

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be discarded.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (sortedHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedHand.length > 5) {
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
    confirmButton.textContent = "Discard Card";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard) return;

      // Find the card in the original playerHand using object reference
      const index = playerHand.indexOf(selectedCard);
      if (index !== -1) {
        const discardedCard = playerHand.splice(index, 1)[0];

        onscreenConsole.log(
          `You have discarded <span class="console-highlights">${discardedCard.name}</span>, allowing you to play <span class="console-highlights">Cyclops - Determination</span>.`,
        );

        closeCardChoicePopup();

        // Handle the discard logic
        const { returned } =
          await checkDiscardForInvulnerability(discardedCard);
        if (returned.length) {
          playerHand.push(...returned);
        }

        updateGameBoard();
        resolve(true);
      }
    };

    // Close button handler (Cancel action)
    closeButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      console.log("Card cannot be played since no card was discarded.");
      onscreenConsole.log(
        `You have chosen not to discard, preventing you from playing <span class="console-highlights">Cyclops - Determination</span>.`,
      );

      const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
      playerHand.push(unplayedCard);
      cardsPlayedThisTurn.pop(unplayedCard);
      totalAttackPoints -= unplayedCard.attack;
      totalRecruitPoints -= unplayedCard.recruit;
      cumulativeAttackPoints -= unplayedCard.attack;
      cumulativeRecruitPoints -= unplayedCard.recruit;

      closeCardChoicePopup();
      updateGameBoard();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function DeadpoolAssignBystanderToVillain() {
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
    titleElement.textContent = "CAPTURE BYSTANDER";
    instructionsElement.textContent =
      "SELECT A VILLAIN TO CAPTURE A BYSTANDER:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedCell = null;

    // Check if there are any bystanders available
    if (bystanderDeck.length === 0) {
      onscreenConsole.log("There are no Bystanders available to be captured.");
      resolve(false);
      return;
    }

    // Check if any villains exist in city (excluding destroyed spaces)
    const villainsInCity = city.some(
      (card, index) =>
        card &&
        (card.type === "Villain" || card.type === "Henchman") &&
        !destroyedSpaces[index],
    );

    if (!villainsInCity) {
      onscreenConsole.log(
        "There are no Villains in the city to capture a Bystander.",
      );
      resolve(false);
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
        // Create a new image element for the destroyed space
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
        cardImage.style.display = "block"; // Ensure it's visible
        cardContainer.appendChild(cardImage);

        // Determine eligibility - Villains and Henchmen are eligible
        const isEligible = card.type === "Villain" || card.type === "Henchman";

        // Apply greyed out styling for ineligible cards (Heroes, etc.)
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
                "SELECT A VILLAIN TO CAPTURE A BYSTANDER:";
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will capture a Bystander.`;
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

    // Disable confirm initially and configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "CAPTURE BYSTANDER";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCityIndex === null) return;

      // Remove the bystander from the bystander deck
      const bystander = bystanderDeck.pop();

      // Assign the bystander to the selected villain
      villainEffectAttachBystanderToVillain(selectedCityIndex, bystander);

      onscreenConsole.log(
        `Bystander captured by <span class="console-highlights">${city[selectedCityIndex].name}</span>.`,
      );

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

async function GambitDrawTwoPutOneBack() {
  return new Promise((resolve) => {
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

    // Create a sorted copy for display, don't sort the original array
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

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
    titleElement.textContent = "Gambit - Stack the Deck";
    instructionsElement.innerHTML =
      "Select one card to return to the top of your deck.";

    // Hide row labels, row2, and close button (no cancellation option)
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
    closeButton.style.display = "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card in the sorted hand
    sortedHand.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);

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

        if (selectedCard === card) {
          // Deselect
          selectedCard = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
            "Select one card to return to the top of your deck.";
          document.getElementById("card-choice-popup-confirm").disabled = true;
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

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be returned to your deck.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (sortedHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedHand.length > 5) {
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

    // Configure buttons - hide all except confirm, which is required
    confirmButton.textContent = "Return Card";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard) return;

      console.log("Card returned to the top of the deck:", selectedCard);

      // Find the card in the original playerHand using object reference
      const index = playerHand.indexOf(selectedCard);
      if (index !== -1) {
        // Remove the card from the player's hand
        playerHand.splice(index, 1);

        // Add the card to the top of the deck
        playerDeck.push(selectedCard);

        selectedCard.revealed = true;

        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> has been returned to the top of your deck.`,
        );

        closeCardChoicePopup();
        if (stingOfTheSpider) {
          await scarletSpiderStingOfTheSpiderDrawChoice(selectedCard);
        }
        updateGameBoard();
        resolve();
      }
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function doomAdditionalTurn() {
  if (
    !finalBlowEnabled &&
    victoryPile.filter((obj) => obj.type === "Mastermind").length === 4
  ) {
    delayEndGame = true;
    impossibleToDraw = true;
    onscreenConsole.log(
      `You will be able to take one final turn before claiming your victory!`,
    );
    return;
  } else if (
    finalBlowEnabled &&
    victoryPile.filter((obj) => obj.type === "Mastermind").length === 4
  ) {
    doomDelayEndGameFinalBlow = true;
    impossibleToDraw = true;
    mastermindDefeatTurn = turnCount;
    onscreenConsole.log(
      `If you deliver the Final Blow this turn, you will be able to take another before claiming your victory!`,
    );
    return;
  } else {
    return;
  }
}

function DoomDrawOrDiscard() {
  updateGameBoard();
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
    titleElement.textContent = "MASTERMIND TACTIC!";
    instructionsElement.innerHTML =
      "Select a card to discard, or choose to draw instead.";

    // Set background image in preview area
    previewElement.style.backgroundImage =
      "url('Visual Assets/Masterminds/DrDoom_5.webp')";
    previewElement.style.backgroundSize = "contain";
    previewElement.style.backgroundRepeat = "no-repeat";
    previewElement.style.backgroundPosition = "center";
    previewElement.style.display = "block";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

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

    // Clear existing content
    selectionRow1.innerHTML = "";

    // Create a sorted copy for display
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

    let selectedCard = null;
    let isDragging = false;

    if (sortedHand.length === 0) {
      onscreenConsole.log("No cards in hand to discard.");
      // Auto-resolve to draw if no cards to discard
      handleDrawChoice();
      return;
    }

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card name
    function updateInstructions() {
      if (selectedCard === null) {
        instructionsElement.innerHTML =
          "Select a card to discard, or choose to draw instead.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be discarded.`;
      }
    }

    // Create card elements for each card in hand
    sortedHand.forEach((card) => {
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

        // Update preview to show card image instead of background
        previewElement.style.backgroundImage = "none";
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
            // Restore background image when no card is hovered and no selection
            if (!selectedCard) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundImage =
                "url('Visual Assets/Masterminds/DrDoom_5.webp')";
              previewElement.style.backgroundSize = "contain";
              previewElement.style.backgroundRepeat = "no-repeat";
              previewElement.style.backgroundPosition = "center";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
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

          // Restore background image
          previewElement.innerHTML = "";
          previewElement.style.backgroundImage =
            "url('Visual Assets/Masterminds/DrDoom_5.webp')";
          previewElement.style.backgroundSize = "contain";
          previewElement.style.backgroundRepeat = "no-repeat";
          previewElement.style.backgroundPosition = "center";
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
          previewElement.style.backgroundImage = "none";
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

    if (sortedHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedHand.length > 5) {
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
    confirmButton.textContent = "DISCARD CARD";
    otherChoiceButton.textContent = "DRAW CARD";
    otherChoiceButton.style.display = "inline-block";
    noThanksButton.style.display = "none"; // No "No Thanks" option for mandatory choice

    // Update confirm button state
    function updateConfirmButton() {
      confirmButton.disabled = selectedCard === null;
    }

    // Handle discard choice
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;
      closeCardChoicePopup();
      setTimeout(async () => {
        // Check for discard avoidance first
        await discardAvoidance();
        if (hasDiscardAvoidance) {
          onscreenConsole.log(
            `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided discarding.`,
          );
          hasDiscardAvoidance = false;
          closeCardChoicePopup();
          resolve(true);
          return;
        }

        // Find the card in the original playerHand using object reference
        const index = playerHand.indexOf(selectedCard);
        if (index !== -1) {
          const discardedCard = playerHand.splice(index, 1)[0];
          console.log("Card discarded:", discardedCard);

          updateGameBoard();

          const { returned } =
            await checkDiscardForInvulnerability(discardedCard);
          if (returned.length) {
            playerHand.push(...returned);
          }
          updateGameBoard();

          resolve(true);
        }
      }, 100);
    };

    // Handle draw choice (OTHER CHOICE button)
    otherChoiceButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();

      setTimeout(async () => {
        await handleDrawChoice();
      }, 100);
    };

    // Draw choice handler
    async function handleDrawChoice() {
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
        } else {
          console.log("No cards left in deck or discard pile.");
          onscreenConsole.log(`No cards available to be drawn.`);
          closeCardChoicePopup();
          updateGameBoard();
          resolve(false);
          return;
        }
      }

      await extraDraw();
      closeCardChoicePopup();
      resolve(true);
    }

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function NickFuryFindEligibleVillains() {
  return new Promise((resolve) => {
    const eligibleVillains = [];
    const SHIELDInKO = [];
    let KOdSHIELDNumber = 0;

    // Step 1: Find all SHIELD heroes in the KO pile
    koPile.forEach((card) => {
      if (card && card.team === "S.H.I.E.L.D.") {
        SHIELDInKO.push(card);
        KOdSHIELDNumber = SHIELDInKO.length;
      }
    });

    if (SHIELDInKO.length === 0) {
      onscreenConsole.log(
        'There are no <img src="Visual Assets/Icons/S.H.I.E.L.D..svg" alt="SHIELD Icon" class="console-card-icons"> Heroes in the KO Pile.',
      );
      resolve(false);
      return;
    }

    // Step 2: Check each city space for eligible villains
    city.forEach((card, index) => {
      if (card) {
        const villainAttack = recalculateVillainAttack(card);
        if (villainAttack < KOdSHIELDNumber) {
          eligibleVillains.push({
            ...card,
            type: "Villain",
            cityIndex: index,
          });
        }
      }
    });

    // Step 3: Check the mastermind if eligible for attack
    const mastermind = getSelectedMastermind();
    if (mastermind) {
      const mastermindAttack = recalculateMastermindAttack(mastermind);
      if (mastermindAttack < KOdSHIELDNumber) {
        eligibleVillains.push({
          ...mastermind,
          type: "Mastermind",
        });
      }
    }

    // Step 4: Display the eligible villains options with confirm button
    showEligibleVillainsOptions(eligibleVillains).then(resolve);
  });
}

function showEligibleVillainsOptions(eligibleVillains) {
  updateGameBoard();
  return new Promise((resolve) => {
    if (eligibleVillains.length === 0) {
      onscreenConsole.log(
        'There are not enough <img src="Visual Assets/Icons/S.H.I.E.L.D..svg" alt="SHIELD Icon" class="console-card-icons"> Heroes in the KO Pile for you to defeat any Villain or the Mastermind.',
      );
      resolve(false);
      return;
    }

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
    titleElement.textContent = "NICK FURY - PURE FURY";
    instructionsElement.textContent =
      "SELECT A VILLAIN WITH LESS ATTACK THAN SHIELD HEROES IN KO:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedCell = null;
    let mastermindSelected = false;

    // Separate villains from mastermind
    const eligibleVillainsInCity = eligibleVillains.filter(
      (card) => card.type === "Villain",
    );
    const eligibleMastermind = eligibleVillains.find(
      (card) => card.type === "Mastermind",
    );

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

        // Determine eligibility - check if this villain is in eligible list
        const isVillain = card.type === "Villain";
        const isEligible = eligibleVillainsInCity.some(
          (eligible) => eligible.cityIndex === i,
        );

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
                "SELECT A VILLAIN WITH LESS ATTACK THAN SHIELD HEROES IN KO:";
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

              // Deselect mastermind if it was selected
              if (mastermindSelected) {
                mastermindSelected = false;
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
            if (selectedCityIndex === null && !mastermindSelected) {
              previewElement.style.backgroundColor = "var(--accent)";
            }
          };

          cardImage.onmouseout = () => {
            if (selectedCityIndex !== null && selectedCityIndex !== i) return;

            // Only clear preview if no card is selected AND we're not hovering over another eligible card
            if (selectedCityIndex === null && !mastermindSelected) {
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
    confirmButton.textContent = "DEFEAT SELECTED TARGET";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Set up Other Choice button for Mastermind
    if (eligibleMastermind) {
      otherChoiceButton.style.display = "inline-block";
      otherChoiceButton.textContent = `DEFEAT ${eligibleMastermind.name} (MASTERMIND)`;
      otherChoiceButton.style.backgroundColor = "var(--panel-backgrounds)";
      otherChoiceButton.style.border = `0.5vh solid var(--accent)`;
      otherChoiceButton.style.color = "#282828";
      otherChoiceButton.disabled = false;

      // Other Choice button handler for Mastermind
      otherChoiceButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (mastermindSelected) {
          // Deselect Mastermind
          mastermindSelected = false;
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
            "SELECT A VILLAIN WITH LESS ATTACK THAN SHIELD HEROES IN KO:";
          confirmButton.disabled = true;
        } else {
          // Select Mastermind
          mastermindSelected = true;
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
          previewImage.src = eligibleMastermind.image;
          previewImage.alt = eligibleMastermind.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${eligibleMastermind.name}</span> (Mastermind) will be defeated.`;
          confirmButton.disabled = false;
        }
      };
    }

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (selectedCityIndex === null && !mastermindSelected) return;

      closeHQCityCardChoicePopup();
      modalOverlay.style.display = "none";
      updateGameBoard();

      try {
        if (mastermindSelected) {
          onscreenConsole.log(
            `You have chosen to defeat <span class="console-highlights">${eligibleMastermind.name}</span>.`,
          );
          await confirmInstantMastermindAttack();
        } else {
          onscreenConsole.log(
            `You have chosen to defeat <span class="console-highlights">${city[selectedCityIndex].name}</span>.`,
          );
          await instantDefeatAttack(selectedCityIndex);
        }

        originalResolve(true);
      } catch (error) {
        console.error("Error during defeat:", error);
        onscreenConsole.log(
          `<span class="console-error">Error defeating target: ${error.message}</span>`,
        );
        originalResolve(false);
      }
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function NickFuryRecruitShieldOfficerByKO() {
  return new Promise((resolve) => {
    // Get SHIELD cards from both locations (create copies for sorting)
    const discardPile = playerDiscardPile.filter(
      (card) => card.team === "S.H.I.E.L.D.",
    );
    const hand = playerHand.filter((card) => card.team === "S.H.I.E.L.D.");

    // Create sorted copies for display
    const sortedDiscardPile = [...discardPile];
    const sortedHand = [...hand];
    genericCardSort(sortedDiscardPile);
    genericCardSort(sortedHand);

    // Check if there are any SHIELD cards to KO
    if (discardPile.length === 0 && hand.length === 0) {
      onscreenConsole.log(
        `No <img src='Visual Assets/Icons/S.H.I.E.L.D..svg' alt='SHIELD Icon' class='console-card-icons'> Heroes available to KO.`,
      );
      resolve(false);
      return;
    }

    // Check if there are any SHIELD Officers left to recruit
    if (shieldOfficers.length === 0) {
      onscreenConsole.log(
        `No <span class="console-highlights">S.H.I.E.L.D. Officers</span> left to gain.`,
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
    titleElement.textContent = "Nick Fury - Battlefield Promotion";
    instructionsElement.innerHTML = `Select a <img src='Visual Assets/Icons/S.H.I.E.L.D..svg' alt='SHIELD Icon' class='card-icons'> Hero to KO and if you wish to gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`;

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

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const otherChoiceButton = document.getElementById(
        "card-choice-popup-otherchoice",
      );

      confirmButton.disabled = selectedCard === null;
      otherChoiceButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML = `Select a <img src='Visual Assets/Icons/S.H.I.E.L.D..svg' alt='SHIELD Icon' class='card-icons'> Hero to KO and if you wish to gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`;
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

    // Populate row1 with Hand SHIELD cards (using sorted copy for display)
    sortedHand.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Discard Pile SHIELD cards (using sorted copy for display)
    sortedDiscardPile.forEach((card) => {
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

    // Configure buttons - TWO confirm options
    confirmButton.disabled = true;
    confirmButton.textContent = "KO + GAIN OFFICER";
    otherChoiceButton.disabled = true;
    otherChoiceButton.style.display = "block";
    otherChoiceButton.textContent = "KO ONLY";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!";

    // First confirm button handler - KO + Gain SHIELD Officer
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        // Remove card from its location using object reference
        if (selectedLocation === "discard pile") {
          const index = playerDiscardPile.indexOf(selectedCard);
          if (index !== -1) playerDiscardPile.splice(index, 1);
        } else {
          const index = playerHand.indexOf(selectedCard);
          if (index !== -1) playerHand.splice(index, 1);
        }

        // Add to KO pile
        koPile.push(selectedCard);

        // Recruit SHIELD Officer
        moveShieldOfficerToHand();

        onscreenConsole.log(
          `You KO'd <span class="console-highlights">${selectedCard.name}</span> from your ${selectedLocation} to gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`,
        );

        koBonuses();

        updateGameBoard();
        closeCardChoicePopup();
        resolve(true);
      }, 100);
    };

    // Second confirm button handler - KO Only (no SHIELD Officer)
    otherChoiceButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        // Remove card from its location using object reference
        if (selectedLocation === "discard pile") {
          const index = playerDiscardPile.indexOf(selectedCard);
          if (index !== -1) playerDiscardPile.splice(index, 1);
        } else {
          const index = playerHand.indexOf(selectedCard);
          if (index !== -1) playerHand.splice(index, 1);
        }

        // Add to KO pile
        koPile.push(selectedCard);

        onscreenConsole.log(
          `You KO'd <span class="console-highlights">${selectedCard.name}</span> from your ${selectedLocation} and chose not to gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`,
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
      onscreenConsole.log(
        `You chose not to KO a <img src='Visual Assets/Icons/S.H.I.E.L.D..svg' alt='SHIELD Icon' class='console-card-icons'> Hero.`,
      );
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function moveShieldOfficerToHand() {
  if (shieldOfficers.length > 0) {
    const shieldOfficer = shieldOfficers.pop();
    playerHand.push(shieldOfficer);
    extraCardsDrawnThisTurn++;
    console.log("Shield Officer recruited and added to hand.");
  } else {
    console.log("No Shield Officers left to recruit.");
    onscreenConsole.log(
      'There are no <span class="console-highlights">S.H.I.E.L.D. Officers</span> left to recruit.',
    );
  }
}

function RogueKOHandOrDiscardForRecruit() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );

  if (playerHand.length === 0 && playerDiscardPile.length === 0) {
    console.log(
      "No cards in hand to discard. You are unable to play this card.",
    );
    onscreenConsole.log(`No cards available to KO.`);
    return;
  }

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
    titleElement.textContent = "Rogue - Energy Drain";
    instructionsElement.innerHTML = `Select a card to KO and gain +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`;

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

    // Create sorted copies for display
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
        instructionsElement.innerHTML = `Select a card to KO and gain +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd from your ${selectedLocation} to gain +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`;
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

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        // Use object reference instead of ID lookup for better reliability
        let koIndex;
        if (selectedLocation === "discard pile") {
          koIndex = playerDiscardPile.indexOf(selectedCard);
          if (koIndex !== -1) {
            const removedCard = playerDiscardPile.splice(koIndex, 1)[0];
            koPile.push(removedCard);
          }
        } else {
          koIndex = playerHand.indexOf(selectedCard);
          if (koIndex !== -1) {
            const removedCard = playerHand.splice(koIndex, 1)[0];
            koPile.push(removedCard);
          }
        }

        if (koIndex !== -1) {
          // Add to KO pile and gain recruit
          totalRecruitPoints += 1;
          cumulativeRecruitPoints += 1;

          onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been KO'd from your ${selectedLocation}. +1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
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

function RogueCopyPowers() {
  return new Promise((resolve) => {
    // Check if any cards have been played this turn
    if (cardsPlayedThisTurn.length === 1) {
      console.log("No heroes have been played yet.");
      onscreenConsole.log(
        "No Heroes have been played this turn. There are no powers to copy.",
      );
      resolve(false);
      return;
    }

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
    titleElement.textContent = "Rogue - Copy Powers";
    instructionsElement.innerHTML = "Select a Hero to copy:";

    // Hide row labels and row2, hide close button (no cancellation option)
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
    closeButton.style.display = "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    // Filter eligible heroes (excluding last played card)
    const heroesToCopy = cardsPlayedThisTurn.slice(0, -1);
    genericCardSort(heroesToCopy);

    let selectedHero = null;
    let selectedCardImage = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each eligible hero
    heroesToCopy.forEach((hero) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", hero.id);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = hero.image;
      cardImage.alt = hero.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = hero.image;
        previewImage.alt = hero.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if no card is selected
        if (selectedHero === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedHero === null) {
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

        if (selectedHero === hero) {
          // Deselect
          selectedHero = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML = "Select a Hero to copy:";
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedHero = hero;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = hero.image;
          previewImage.alt = hero.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be copied.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (heroesToCopy.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (heroesToCopy.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (heroesToCopy.length > 5) {
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

    // Configure buttons - hide all except confirm, which is required
    confirmButton.textContent = "Confirm";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedHero) return;

      closeCardChoicePopup();

      try {
        // Find Rogue card
        const rogueCardIndex = cardsPlayedThisTurn.findIndex(
          (c) => c.name === "Rogue - Copy Powers" && !c.isCopied,
        );
        if (rogueCardIndex === -1) {
          console.log("Rogue has already copied a card.");
          resolve(false);
          return;
        }

        const rogueCard = cardsPlayedThisTurn[rogueCardIndex];

        // Mark Rogue as copied
        rogueCard.isCopied = true;

        // Store original attributes
        rogueCard.originalAttributes = {
          name: rogueCard.name,
          type: rogueCard.type,
          rarity: rogueCard.rarity,
          team: rogueCard.team,
          classes: rogueCard.classes,
          color: rogueCard.color,
          cost: rogueCard.cost,
          attack: rogueCard.attack,
          recruit: rogueCard.recruit,
          attackIcon: rogueCard.attackIcon,
          recruitIcon: rogueCard.recruitIcon,
          bonusAttack: rogueCard.bonusAttack,
          bonusRecruit: rogueCard.bonusRecruit,
          multiplier: rogueCard.multiplier,
          multiplierAttribute: rogueCard.multiplierAttribute,
          mulitplierLocation: rogueCard.mulitplierLocation,
          unconditionalAbility: rogueCard.unconditionalAbility,
          conditionalAbility: rogueCard.conditionalAbility,
          conditionType: rogueCard.conditionType,
          condition: rogueCard.condition,
          invulnerability: rogueCard.invulnerability,
          keywords: rogueCard.kewyords,
          image: rogueCard.image,
        };

        // Copy selected hero's attributes (keeping Covert)
        Object.assign(rogueCard, {
          name: selectedHero.name || "None",
          type: selectedHero.type || "None",
          rarity: selectedHero.rarity || "None",
          team: selectedHero.team || "None",
          classes: selectedHero.classes
            ? selectedHero.classes.includes("Covert")
              ? [...selectedHero.classes]
              : ["Covert", ...selectedHero.classes]
            : ["Covert"],
          color: selectedHero.color || "None",
          cost: selectedHero.cost || 0,
          attack: selectedHero.attack || 0,
          recruit: selectedHero.recruit || 0,
          attackIcon: selectedHero.attackIcon || "None",
          recruitIcon: selectedHero.recruitIcon || "None",
          bonusAttack: selectedHero.bonusAttack || 0,
          bonusRecruit: selectedHero.bonusRecruit || 0,
          multiplier: selectedHero.multiplier || "None",
          multiplierAttribute: selectedHero.multiplierAttribute || "None",
          mulitplierLocation: selectedHero.mulitplierLocation || "None",
          unconditionalAbility: selectedHero.unconditionalAbility || "None",
          conditionalAbility: selectedHero.conditionalAbility || "None",
          conditionType: selectedHero.conditionType || "None",
          condition: selectedHero.condition || "None",
          invulnerability: selectedHero.invulnerability || "None",
          keywords: selectedHero.keywords || [],
          image: selectedHero.image || "None",
        });

        console.log(
          `Copied: ${selectedHero.name}. Gained ${rogueCard.attack} attack and ${rogueCard.recruit} recruit.`,
        );
        onscreenConsole.log(
          `Copied <span class="console-highlights">${selectedHero.name}</span>. Gained +${rogueCard.attack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and +${rogueCard.recruit}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
        );

        // Handle unconditional ability if it exists
if (
  selectedHero.unconditionalAbility &&  // Use the ORIGINAL hero's ability
  selectedHero.unconditionalAbility !== "None"
) {
  const abilityFn = window[selectedHero.unconditionalAbility];
  if (typeof abilityFn === "function") {
    // Temporarily swap the last card to be the original hero for the ability execution
    const originalLastCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
    cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1] = selectedHero;
    
    await abilityFn(selectedHero);  // Pass the original hero
    
    // Restore the last card
    cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1] = originalLastCard;
  } else {
    console.error(
      `Ability function ${selectedHero.unconditionalAbility} not found`,
    );
  }
}

        // Update game state
        totalAttackPoints += rogueCard.attack;
        totalRecruitPoints += rogueCard.recruit;
        cumulativeAttackPoints += rogueCard.attack;
        cumulativeRecruitPoints += rogueCard.recruit;

        updateGameBoard();
        resolve(true);
      } catch (error) {
        console.error("Error copying powers:", error);
        resolve(false);
      }
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function StormMinus2ToRooftops() {
  city3LocationAttack--;
  city3LocationAttack--;
  onscreenConsole.log(
    `Any Villain you fight on the Rooftops this turn gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
  updateGameBoard();
}

function StormMinus2ToBridge() {
  city1LocationAttack--;
  city1LocationAttack--;
  console.log("Any villain on the bridge loses 2 Attack this turn.");
  onscreenConsole.log(
    `Any Villain you fight on the Bridge this turn gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );

  updateGameBoard();
}

function StormMinus2ToMastermind() {
  mastermindTempBuff--;
  mastermindTempBuff--;
  console.log("The Mastermind loses 2 Attack this turn.");
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated. The Mastermind gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> this turn.`,
  );
  updateGameBoard();
}

function StormMoveVillain() {
  if (isCityEmpty()) {
    onscreenConsole.log(`No Villains in the city to move.`);
    return;
  }

  // Elements for the popup and overlay
  const popup = document.getElementById("villain-movement-popup");
  const overlay = document.getElementById("modal-overlay");
  const noThanksButton = document.getElementById("no-thanks-villain-movement");
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

  // Function to hide the popup and overlay
  function hidePopup() {
    selectedCells.forEach((cell) => cell.classList.remove("selected"));
    selectedCells = [];
    popup.style.display = "none";
    overlay.style.display = "none";
    selectionArrow.style.display = "none"; // Hide the arrow when the popup is closed
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

      // Debugging: Log the initial state before any operation
      console.log("Initial State:");
      console.log("First Cell:", city[firstIndex]);
      console.log("Second Cell:", city[secondIndex]);

      let bystanderText = "Bystander";

      // Rescue bystanders if any are attached to the first villain
      if (
        city[firstIndex] &&
        city[firstIndex].bystander &&
        city[firstIndex].bystander.length > 0
      ) {
        // Update the bystander text based on how many there are
        bystanderText =
          city[firstIndex].bystander.length > 1 ? "Bystanders" : "Bystander";

        // Add bystanders to the player's victory pile
        victoryPile.push(...city[firstIndex].bystander);
        onscreenConsole.log(
          `${city[firstIndex].bystander.length} ${bystanderText} added to Victory Pile.`,
        );
        bystanderBonuses();

        await rescueBystanderAbility(...city[firstIndex].bystander);

        // Clear bystanders from the villain
        city[firstIndex].bystander = null;

        // Recalculate the villain's attack value after removing bystanders
        const selectedSchemeName = document.querySelector(
          "#scheme-section input[type=radio]:checked",
        ).value;
        const selectedScheme = schemes.find(
          (scheme) => scheme.name === selectedSchemeName,
        );
        city[firstIndex].attack = recalculateVillainAttack(city[firstIndex]);
      }

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
    }
  };
}

function ThorRecruitPointsCanAttack() {
  const recruitLabel = document.getElementById("recruit-point-label");
  recruitLabel.innerHTML = "RECRUIT OR ATTACK: ";
  recruitUsedToAttack = true;
  onscreenConsole.log(
    `<span class="console-highlights">Thor - God of Thunder's</span> Special Ability: You can use <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> as <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> this turn.`,
  );
}

function add1Recruit() {
  totalRecruitPoints += 1;
  cumulativeRecruitPoints += 1;
  onscreenConsole.log(
    '+1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.',
  );
  updateGameBoard();
}

function HenchmenKOHeroYouHave() {
  updateGameBoard();
  return new Promise((resolve) => {
    // Get heroes from hand and played cards separately
    const handHeroes = playerHand.filter((card) => card.type === "Hero");
    const playedHeroes = cardsPlayedThisTurn.filter(
      (card) =>
        card.type === "Hero" && !card.isCopied && !card.sidekickToDestroy,
    );

    // Check if there are any heroes available
    if (handHeroes.length === 0 && playedHeroes.length === 0) {
      console.log("No heroes in hand or played to KO.");
      onscreenConsole.log(
        `<span class="console-highlights">Sentinel's</span> Fight effect negated. No Heroes available to KO.`,
      );
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
    titleElement.textContent = "FIGHT EFFECT";
    instructionsElement.textContent = "Select a hero to KO:";

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
    let selectedLocation = null; // 'hand' or 'played'
    let selectedCardImage = null;
    let isDragging = false;

    // Sort the arrays for display
    genericCardSort(handHeroes);
    genericCardSort(playedHeroes);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.textContent = "Select a hero to KO:";
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
          selectedLocation = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedCard = card;
          selectedLocation = location;
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
    handHeroes.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Played Cards heroes
    playedHeroes.forEach((card) => {
      createCardElement(card, "played", selectionRow2);
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
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        // Remove card from the correct location using ID lookup
        if (selectedLocation === "hand") {
          const index = playerHand.findIndex(
            (card) => card.id === selectedCard.id,
          );
          if (index !== -1) {
            playerHand.splice(index, 1);
          }
        } else if (selectedLocation === "played") {
          selectedCard.markedToDestroy = true;
        }

        // Add the card to the KO pile
        koPile.push(selectedCard);

        console.log(`${selectedCard.name} has been KO'd.`);
        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`,
        );
        koBonuses();

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

function FightKOHeroYouHave() {
  onscreenConsole.log(`Fight! KO one of your Heroes.`);
  return new Promise((resolve, reject) => {
    // Combine heroes from the player's hand and cards played this turn
    const handHeroes = playerHand.filter((card) => card.type === "Hero");
    const playedHeroes = cardsPlayedThisTurn.filter(
      (card) =>
        card.type === "Hero" &&
        card.isCopied !== true &&
        card.sidekickToDestroy !== true,
    );

    const combinedCards = [...handHeroes, ...playedHeroes];

    // Check if there are any heroes in the combined list
    if (combinedCards.length === 0) {
      onscreenConsole.log(`No Heroes available to KO.`);
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
    titleElement.textContent = "Super-Skrull";
    instructionsElement.textContent = "Select a Hero to KO.";

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

    // Sort the arrays for display
    genericCardSort(handHeroes);
    genericCardSort(playedHeroes);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.textContent = "Select a Hero to KO.";
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
    handHeroes.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Played Cards heroes
    playedHeroes.forEach((card) => {
      createCardElement(card, "played", selectionRow2);
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
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(() => {
        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`,
        );
        koBonuses();

        // Remove the card from the correct array (hand or played)
        if (playerHand.includes(selectedCard)) {
          const handIndex = playerHand.findIndex((c) => c === selectedCard);
          if (handIndex !== -1) {
            playerHand.splice(handIndex, 1);
          }
        } else {
          // Mark the card to be destroyed at the end of the turn
          selectedCard.markedToDestroy = true;
        }

        // Add the card to the KO pile
        koPile.push(selectedCard);

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

function addToNextDraw1() {
  nextTurnsDraw++;
  onscreenConsole.log("An extra card will be drawn next turn.");
}

function addToNextDraw2() {
  nextTurnsDraw++;
  nextTurnsDraw++;
  onscreenConsole.log("Two extra cards will be drawn next turn.");
}

function addToNextDraw3() {
  nextTurnsDraw++;
  nextTurnsDraw++;
  nextTurnsDraw++;
  onscreenConsole.log("Three extra cards will be drawn next turn.");
}

function DrOctopusNextDraw2() {
  if (secondDocOc === true) {
    // Renamed variable
    onscreenConsole.log(
      'You\'ve already defeated <span class="console-highlights">Doctor Octopus</span> this turn. You will still draw eight cards instead of six next turn.',
    );
    return;
  }

  nextTurnsDraw += 2; // Adding two cards to next turn's draw
  onscreenConsole.log(
    "Fight! At the end of your next turn, you will draw eight cards instead of six.",
  );

  secondDocOc = true; // Set the flag to true after first defeat
}

function topTwoCardsKOChoice() {
  updateGameBoard();
  return new Promise((resolve) => {
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

    // Set popup content
    titleElement.textContent = "Doombot Legion - Fight Effect";
    instructionsElement.textContent =
      "Select a card to KO (other returns to deck):";

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

    let holdingArray = [];
    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    // Draw up to 2 cards with reshuffle if needed
    for (let i = 0; i < 2; i++) {
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
        } else {
          console.log("No cards left in deck or discard pile.");
          onscreenConsole.log(
            `<span class="console-highlights">Doombot Legion</span> Fight effect negated. No cards available to look at or KO.`,
          );
          resolve(false);
          return;
        }
      }

      const topCard = playerDeck.pop();
      if (topCard) holdingArray.push(topCard);
    }

    // Handle cases with fewer than 2 cards
    if (holdingArray.length < 2) {
      if (holdingArray.length === 1) {
        const singleCard = holdingArray[0];
        koPile.push(singleCard);
        onscreenConsole.log(
          `<span class="console-highlights">Doombot Legion</span> Fight effect carried out: Only 1 card was available. <span class="console-highlights">${singleCard.name}</span> has been KO'd.`,
        );
        koBonuses();
        updateGameBoard();
        resolve(true);
      } else {
        resolve(false);
      }
      return;
    }

    const [card1, card2] = holdingArray;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for both cards
    holdingArray.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-index", String(index));

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

        const thisCardIndex = Number(
          cardElement.getAttribute("data-card-index"),
        );
        const thisCard = holdingArray[thisCardIndex];

        if (selectedCard === thisCard) {
          // Deselect
          selectedCard = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.textContent =
            "Select a card to KO (other returns to deck):";
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedCard = thisCard;
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

          // Update instructions
          const otherCard = selectedCard === card1 ? card2 : card1;
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd. <span class="console-highlights">${otherCard.name}</span> will return to deck.`;

          // Update confirm button state
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (holdingArray.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (holdingArray.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (holdingArray.length > 5) {
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
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {
        const cardToKO = selectedCard;
        const cardToReturn = selectedCard === card1 ? card2 : card1;

        koPile.push(cardToKO);
        playerDeck.push(cardToReturn);
        cardToReturn.revealed = true;

        onscreenConsole.log(
          `<span class="console-highlights">Doombot Legion</span> Fight effect: KO'd <span class="console-highlights">${cardToKO.name}</span>, returned <span class="console-highlights">${cardToReturn.name}</span> to deck.`,
        );
        koBonuses();

        updateGameBoard();
        closeCardChoicePopup();
        if (stingOfTheSpider) {
          await scarletSpiderStingOfTheSpiderDrawChoice(cardToReturn);
        }
        resolve(true);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function doomStrike() {
  return new Promise((resolve, reject) => {
    // Add a small delay to allow the modalOverlay to re-render
    setTimeout(() => {
      // Check if the player has exactly 6 cards in their hand
      if (playerHand.length !== 6) {
        console.log(
          "Player does not have exactly 6 cards in hand. No action required.",
        );
        onscreenConsole.log(
          "You do not have exactly 6 cards in your hand. Master Strike avoided!",
        );
        resolve(); // Resolve immediately since no action is required
        return;
      }

      const hasTech =
        playerHand.some(
          (card) => card.classes && card.classes.includes("Tech"),
        ) ||
        cardsPlayedThisTurn.some(
          (card) =>
            card.classes &&
            card.classes.includes("Tech") &&
            card.isCopied !== true &&
            card.sidekickToDestroy !== true,
        );

      if (!hasTech) {
        console.log(
          "No Tech card found. Player must return 2 cards to the top of their deck.",
        );
        onscreenConsole.log(
          `You are unable to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`,
        );

        // Ensure modalOverlay is visible before showing the next popup
        document.getElementById("modal-overlay").style.display = "block";
        handleNoTechRevealed(resolve);
      } else {
        // Ensure modalOverlay is visible before showing the next popup
        document.getElementById("modal-overlay").style.display = "block";
        handleTechRevealed(resolve);
      }
    }, 10); // 10ms delay
  });
}

async function handleNoTechRevealed(resolve) {
  updateGameBoard();
  return new Promise((resolve) => {
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

    // Set popup content
    titleElement.textContent = "MASTER STRIKE";
    instructionsElement.innerHTML = "Select 2 cards to return to your deck.";

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

    // Create a sorted copy for display
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

    let selectedCards = []; // Store card objects
    let isDragging = false;

    if (sortedHand.length === 0) {
      onscreenConsole.log("No cards in hand to return to deck.");
      resolve();
      return;
    }

    // Create a map to track card elements by unique identifier
    const cardElementMap = new Map();
    
    // Generate unique identifier for each card
    function getCardUID(card) {
      return `${card.id}-${sortedHand.indexOf(card)}`; // More reliable unique identifier
    }

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card names
    function updateInstructions() {
      if (selectedCards.length === 0) {
        instructionsElement.innerHTML =
          "Select 2 cards to return to your deck.";
      } else {
        const names = selectedCards
          .map((card, index) => 
            `<span class="console-highlights">${index + 1}. ${card.name}</span>`
          )
          .join(", ");

        if (selectedCards.length === 1) {
          instructionsElement.innerHTML = `Selected: ${names}. Select 1 more card.`;
        } else {
          instructionsElement.innerHTML = `Selected order: ${names}`;
        }
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCards.length !== 2;
    }

    // Create card elements for each card in hand
    sortedHand.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      const cardUID = getCardUID(card);
      cardElement.setAttribute("data-card-uid", cardUID);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Store in map for easy lookup
      cardElementMap.set(cardUID, { element: cardElement, image: cardImage, card: card });

      // Check if this card is currently selected
      const isSelected = selectedCards.some(selectedCard => getCardUID(selectedCard) === cardUID);
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

        // Only change background if less than 2 cards are selected
        if (selectedCards.length < 2) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if less than 2 cards are selected AND we're not hovering over another card
        if (selectedCards.length < 2) {
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

      // Selection click handler - multiple selection allowed (up to 2)
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const cardUID = e.currentTarget.getAttribute("data-card-uid");
        const cardData = cardElementMap.get(cardUID);
        
        if (!cardData) return;

        const existingIndex = selectedCards.findIndex(
          selectedCard => getCardUID(selectedCard) === cardUID
        );

        if (existingIndex > -1) {
          // Deselect
          selectedCards.splice(existingIndex, 1);
          cardData.image.classList.remove("selected");
        } else {
          if (selectedCards.length >= 2) {
            // Remove the first selected card (FIFO) using UID for reliable removal
            const firstSelectedUID = getCardUID(selectedCards[0]);
            const firstSelectedData = cardElementMap.get(firstSelectedUID);
            
            if (firstSelectedData) {
              firstSelectedData.image.classList.remove("selected");
            }
            selectedCards.shift();
          }

          // Select new card
          selectedCards.push(cardData.card);
          cardData.image.classList.add("selected");
        }

        // Update preview to show last selected card, or clear if none selected
        previewElement.innerHTML = "";
        if (selectedCards.length > 0) {
          const lastSelected = selectedCards[selectedCards.length - 1];
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

    if (sortedHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedHand.length > 5) {
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
      if (selectedCards.length !== 2) return;

      closeCardChoicePopup();

      setTimeout(async () => {
        // Order matters: selectedCards[0] is TOP of deck, selectedCards[1] is under it
        const firstCard = selectedCards[0]; // top of deck
        const secondCard = selectedCards[1];

        // Use the original card references from playerHand for reliable removal
        const findOriginalCard = (selectedCard) => {
          return playerHand.find(card => 
            card.id === selectedCard.id && 
            card.name === selectedCard.name
          );
        };

        const originalFirstCard = findOriginalCard(firstCard);
        const originalSecondCard = findOriginalCard(secondCard);

        if (!originalFirstCard || !originalSecondCard) {
          console.warn("One or both selected cards were not found in hand.", {
            originalFirstCard, originalSecondCard
          });
          // Fallback: use the selected cards directly
          playerHand.splice(playerHand.indexOf(firstCard), 1);
          playerHand.splice(playerHand.indexOf(secondCard), 1);
        } else {
          // Remove the original cards from hand
          playerHand.splice(playerHand.indexOf(originalFirstCard), 1);
          playerHand.splice(playerHand.indexOf(originalSecondCard), 1);
        }

        // --- Put back on deck in the correct order WITHOUT duplicating ---
        // We want secondCard below, firstCard on top.
        // Push second first, then maybe trigger effect, then push first.
        playerDeck.push(secondCard);
        secondCard.revealed = true;

        if (stingOfTheSpider) {
          await scarletSpiderStingOfTheSpiderDrawChoice(secondCard);
        }

        playerDeck.push(firstCard); // now first goes on top (last pushed)
        firstCard.revealed = true;

        if (stingOfTheSpider) {
          await scarletSpiderStingOfTheSpiderDrawChoice(firstCard);
        }

        onscreenConsole.log(
          `Returned to deck: <span class="console-highlights">${secondCard.name}</span> ` +
            `then <span class="console-highlights">${firstCard.name}</span> on top.`,
        );

        updateGameBoard();
        resolve(); // this is the resolve from the outer Promise scope
      }, 100);
    };
    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function handleTechRevealed(resolve) {
  setTimeout(() => {
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> HERO TO ESCAPE <span class="console-highlights">DR. DOOM</span><span class="bold-spans">'S</span> MASTER STRIKE?`,
      "Reveal Hero",
      "Return Cards",
    );

    // Update the popup title
    document.querySelector(".info-or-choice-popup-title").innerHTML =
      "MASTER STRIKE!";

    // Hide the close button
    document.querySelector(".info-or-choice-popup-closebutton").style.display =
      "none";

    // Set background image in preview area
    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage =
        "url('Visual Assets/Masterminds/DrDoom_1.webp')";
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = () => {
      onscreenConsole.log(
        `You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped <span class="console-highlights">Dr. Doom</span><span class="bold-spans">'s</span> Master Strike!`,
      );
      closeInfoChoicePopup();
      resolve();
    };

    denyButton.onclick = () => {
      onscreenConsole.log(
        `You have chosen not to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`,
      );
      closeInfoChoicePopup();

      // Ensure modalOverlay is visible before showing the next popup
      document.getElementById("modal-overlay").style.display = "block";
      handleNoTechRevealed(resolve);
    };
  }, 10);
}

function magnetoStrike() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if the player has an X-Men card in hand or played this turn
      const hasXMen =
        playerHand.some((card) => card.team === "X-Men") ||
        cardsPlayedThisTurn.some(
          (card) =>
            card.team === "X-Men" && !card.isCopied && !card.sidekickToDestroy,
        );

      if (!hasXMen) {
        onscreenConsole.log(
          `You are unable to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero. you must discard until 4 cards remain.`,
        );
        handleNoXMenRevealed(resolve);
      } else {
        handleXMenRevealed(resolve);
      }
    }, 10); // 10ms delay
  });
}

function handleNoXMenRevealed(resolve) {
  updateGameBoard();
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
    titleElement.textContent = "Master Strike";
    instructionsElement.innerHTML =
      "Select cards to discard until you have 4 cards remaining.";

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

    // Create a sorted copy for display
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

    let selectedCards = []; // Store card objects
    let isDragging = false;
    const requiredRemaining = 4;
    const cardsToDiscard = playerHand.length - requiredRemaining;

    if (cardsToDiscard <= 0) {
      onscreenConsole.log(
        "You already have 4 or fewer cards in hand. No cards to discard.",
      );
      resolve();
      return;
    }

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions and button state
    function updateUI() {
      const remainingToSelect = cardsToDiscard - selectedCards.length;

      if (selectedCards.length === 0) {
        instructionsElement.innerHTML = `Select ${cardsToDiscard} cards to discard (leaving 4 in hand).`;
      } else {
        const names = selectedCards
          .map((card) => `<span class="console-highlights">${card.name}</span>`)
          .join(", ");

        instructionsElement.innerHTML = `
                    Selected: ${names}.
                    ${
                      remainingToSelect > 0
                        ? `Select ${remainingToSelect} more card${remainingToSelect > 1 ? "s" : ""}.`
                        : "Ready to confirm discard."
                    }
                `;
      }

      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCards.length !== cardsToDiscard;

      if (selectedCards.length === cardsToDiscard) {
        confirmButton.textContent = `DISCARD ${cardsToDiscard} CARDS`;
      } else {
        confirmButton.textContent = `SELECT ${remainingToSelect} MORE`;
      }
    }

    // Create card elements for each card in hand
    sortedHand.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      const isSelected = selectedCards.some((c) => c.id === card.id);
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

        // Only change background if we haven't reached the discard limit
        if (selectedCards.length < cardsToDiscard) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if we haven't reached the discard limit AND we're not hovering over another card
        if (selectedCards.length < cardsToDiscard) {
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

      // Selection click handler - multiple selection with FIFO logic
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const index = selectedCards.findIndex((c) => c.id === card.id);
        if (index > -1) {
          // Deselect
          selectedCards.splice(index, 1);
          cardImage.classList.remove("selected");
        } else {
          if (selectedCards.length >= cardsToDiscard) {
            // FIFO logic: remove the first selected card (oldest)
            const firstSelected = selectedCards.shift();

            // Update the visual state of the first selected card
            const firstSelectedElement = document.querySelector(
              `[data-card-id="${firstSelected.id}"] img`,
            );
            if (firstSelectedElement) {
              firstSelectedElement.classList.remove("selected");
            }
          }

          // Select new card
          selectedCards.push(card);
          cardImage.classList.add("selected");
        }

        // Update preview to show last selected card, or clear if none selected
        previewElement.innerHTML = "";
        if (selectedCards.length > 0) {
          const lastSelected = selectedCards[selectedCards.length - 1];
          const previewImage = document.createElement("img");
          previewImage.src = lastSelected.image;
          previewImage.alt = lastSelected.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        } else {
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (sortedHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedHand.length > 5) {
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
    confirmButton.textContent = `SELECT ${cardsToDiscard} MORE`;
    confirmButton.disabled = true;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeCardChoicePopup();
      if (selectedCards.length !== cardsToDiscard) return;
      setTimeout(async () => {
        const discardedCardNames = [];

        // Remove selected cards from playerHand using object references
        for (const card of selectedCards) {
          const index = playerHand.indexOf(card);
          if (index !== -1) {
            playerHand.splice(index, 1);
            discardedCardNames.push(card.name);

            const { returned } = await checkDiscardForInvulnerability(card);
            if (returned.length) {
              playerHand.push(...returned);
            }
          }
        }

        if (discardedCardNames.length > 0) {
          const formattedNames =
            discardedCardNames.length > 1
              ? `${discardedCardNames
                  .slice(0, -1)
                  .map(
                    (name) => `<span class="console-highlights">${name}</span>`,
                  )
                  .join(
                    ", ",
                  )} and <span class="console-highlights">${discardedCardNames.slice(-1)[0]}</span>`
              : `<span class="console-highlights">${discardedCardNames[0]}</span>`;
          onscreenConsole.log(
            `Discarded ${formattedNames} to satisfy Master Strike.`,
          );
        }

        updateGameBoard();
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";

    // Initial UI update
    updateUI();
  });
}

function handleXMenRevealed(resolve) {
  setTimeout(() => {
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> HERO TO AVOID DISCARDING?`,
      "Reveal Hero",
      "Discard",
    );

    // Update the popup title
    document.querySelector(".info-or-choice-popup-title").innerHTML =
      "MASTER STRIKE!";

    // Hide the close button
    document.querySelector(".info-or-choice-popup-closebutton").style.display =
      "none";

    // Set background image in preview area
    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage =
        "url('Visual Assets/Masterminds/Magneto_1.webp')";
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = () => {
      onscreenConsole.log(
        `You are able to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have escaped needing to discard!`,
      );
      closeInfoChoicePopup();
      resolve();
    };

    denyButton.onclick = () => {
      onscreenConsole.log(
        `You have chosen not to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`,
      );
      closeInfoChoicePopup();
      handleNoXMenRevealed(resolve);
    };
  }, 10);
}

function RedSkullKOHandHero() {
  updateGameBoard();
  return new Promise((resolve) => {
    // Create combined array but track original locations
    const handCards = playerHand.map((card) => ({
      ...card,
      source: "hand",
      originalIndex: playerHand.indexOf(card),
    }));
    const playedCards = cardsPlayedThisTurn.map((card) => ({
      ...card,
      source: "played",
      originalIndex: cardsPlayedThisTurn.indexOf(card),
    }));
    const combinedCards = [...handCards, ...playedCards].filter(
      (card) => card?.type === "Hero",
    );

    if (combinedCards.length === 0) {
      onscreenConsole.log("You have no Heroes available to KO.");
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
    titleElement.textContent = "Master Strike";
    instructionsElement.innerHTML = "Select a hero to KO.";

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

    // Sort the cards (this is fine now that we track source)
    genericCardSort(combinedCards);

    let selectedCard = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update UI based on selection
    function updateUI() {
      if (selectedCard) {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span>`;
      } else {
        instructionsElement.innerHTML = "Select a hero to KO.";
      }

      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;
    }

    // Create card elements for each hero in combined cards
    combinedCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-source", card.source);
      cardElement.setAttribute("data-original-index", card.originalIndex);

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

        updateUI();
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (combinedCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (combinedCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (combinedCards.length > 5) {
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
    confirmButton.textContent = "KO HERO";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm KO action
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard) return;

      setTimeout(() => {
        console.log(`${selectedCard.name} has been KO'd.`);
        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`,
        );
        koBonuses();

        // Remove from correct array using original index
        if (selectedCard.source === "hand") {
          playerHand.splice(selectedCard.originalIndex, 1);
        } else {
          cardsPlayedThisTurn.splice(selectedCard.originalIndex, 1);
        }

        koPile.push(selectedCard);

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

function revealStrengthOrWound() {
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  if (
    cardsYouHave.filter(
      (item) => item.classes && item.classes.includes("Strength"),
    ).length === 0
  ) {
    onscreenConsole.log(
      `You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`,
    );
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?',
          "Reveal Hero",
          "Gain Wound",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "ZZZAX";

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
            "url('Visual Assets/Villains/Radiation_Zzzax.webp')";
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
            `You are able to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          cleanup();
        };
      }, 10);
    });
  }
}

async function EscapeRevealStrengthOrWound() {
  onscreenConsole.log(
    `Escape! Reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero or gain a Wound.`,
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  revealStrengthOrWound();
}

async function FightRevealStrengthOrWound() {
  onscreenConsole.log(
    `Fight! Reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero or gain a Wound.`,
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  revealStrengthOrWound();
}

async function LokiRevealStrengthOrWound() {
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }

  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  const hasStrengthCards =
    cardsYouHave.filter(
      (item) => item.classes && item.classes.includes("Strength"),
    ).length > 0;

  if (!hasStrengthCards) {
    onscreenConsole.log(
      'You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.',
    );
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          `DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?`,
          "Reveal Hero",
          "Gain Wound",
        );

        // Update the popup title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "MASTER STRIKE!";

        // Hide the close button
        document.querySelector(
          ".info-or-choice-popup-closebutton",
        ).style.display = "none";

        // Set background image in preview area
        const previewArea = document.querySelector(
          ".info-or-choice-popup-preview",
        );
        if (previewArea) {
          previewArea.style.backgroundImage =
            "url('Visual Assets/Masterminds/Loki_1.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You are able to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`,
          );
          closeInfoChoicePopup();
          resolve();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          closeInfoChoicePopup();
          resolve();
        };
      }, 10); // 10ms delay
    });
  }
}

function HYDRAVPOrWound() {
  if (victoryPile.filter((item) => item.team === "HYDRA").length === 0) {
    onscreenConsole.log(
      `You are unable to reveal a HYDRA Villain in your Victory Pile.`,
    );
    drawWound();
  } else {
    onscreenConsole.log(
      `You are able to reveal a HYDRA Villain in your Victory Pile and have escaped gaining a Wound.`,
    );
    return;
  }
}

async function FightHYDRAVPOrWound() {
  onscreenConsole.log(
    `Fight! Reveal another HYDRA Villain in your Victory Pile or gain a Wound.`,
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  HYDRAVPOrWound();
}

async function EscapeHYDRAVPOrWound() {
  onscreenConsole.log(
    `Escape! Reveal another HYDRA Villain in your Victory Pile or gain a Wound.`,
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  HYDRAVPOrWound();
}

async function revealTechOrWound() {
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  const hasTechCards =
    cardsYouHave.filter((item) => item.classes && item.classes.includes("Tech"))
      .length > 0;

  if (!hasTechCards) {
    onscreenConsole.log("You are unable to reveal a Tech hero.");
    drawWound();
    return; // Resolve immediately if no Tech cards
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          "DO YOU WISH TO REVEAL A TECH HERO TO AVOID GAINING A WOUND?",
          "Reveal Hero",
          "Gain Wound",
        );

        // Update the popup title for scheme twist
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "SCHEME TWIST!";

        document.querySelector(
          ".info-or-choice-popup-closebutton",
        ).style.display = "none";

        // Set background image in preview area
        const previewArea = document.querySelector(
          ".info-or-choice-popup-preview",
        );
        if (previewArea) {
          previewArea.style.backgroundImage =
            "url('Visual Assets/Schemes/legacyvirus.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`,
          );
          closeInfoChoicePopup();
          resolve(); // Resolve when player confirms
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          closeInfoChoicePopup();
          resolve(); // Resolve when player denies
        };
      }, 10); // 10ms delay
    });
  }
}

async function EscapeRevealTechOrWound() {
  onscreenConsole.log(
    'Escape! Reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero or gain a Wound.',
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }

  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  if (
    cardsYouHave.filter((item) => item.classes && item.classes.includes("Tech"))
      .length === 0
  ) {
    onscreenConsole.log("You are unable to reveal a Tech hero.");
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?',
          "Reveal Hero",
          "Gain Wound",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "ULTRON";

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
            "url('Visual Assets/Villains/MastersOfEvil_Ultron.webp')";
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
            `You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          cleanup();
        };
      }, 10);
    });
  }
}

function revealRangeOrWound() {
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
          "FROST GIANT";

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
            "url('Visual Assets/Villains/EnemiesOfAsgard_FrostGiant.webp')";
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

async function EscapeRevealRangeOrWound() {
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
  revealRangeOrWound();
}

async function AmbushRevealRangeOrWound() {
  onscreenConsole.log(
    'Ambush! Reveal a <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero or gain a Wound.',
  );

  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }

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
          "YMIR, FROST GIANT KING";

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
            "url('Visual Assets/Villains/EnemiesOfAsgard_Ymir.webp')";
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

async function FightRevealRangeOrWound() {
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
  revealRangeOrWound();
}

function doomHeroRecruit() {
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
    titleElement.textContent = "Recruit a Hero";
    instructionsElement.innerHTML = `Select a <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='card-icons'> Hero to recruit for free.`;

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

        // Determine eligibility - must be Tech or Range class AND not destroyed
        const isTechOrRange =
          hero.classes &&
          (hero.classes.includes("Tech") || hero.classes.includes("Range"));
        const isDestroyed = explosionValue >= 6;
        const isEligible = isTechOrRange && !isDestroyed;

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
              instructionsElement.innerHTML = `Select a <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='card-icons'> Hero to recruit for free.`;
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be recruited for free.`;
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
    const eligibleHeroesForDoomRecruit = hq.filter((hero, index) => {
      const explosionValue = explosionValues[index] || 0;
      return (
        hero &&
        hero.classes &&
        (hero.classes.includes("Tech") || hero.classes.includes("Range")) &&
        explosionValue < 6
      ); // Not destroyed
    });

    if (eligibleHeroesForDoomRecruit.length === 0) {
      console.log("No available Tech or Range Heroes to recruit.");
      onscreenConsole.log(
        `No available <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='console-card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='console-card-icons'> Heroes to recruit.`,
      );
      resolve(false);
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
    confirmButton.textContent = "Recruit Hero";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(() => {
        const hero = hq[selectedHQIndex];

        // Recruit the hero using the original function
        recruitHeroConfirmed(hero, selectedHQIndex);

        if (!negativeZoneAttackAndRecruit) {
          totalRecruitPoints += hero.cost;
        } else {
          totalAttackPoints += hero.cost;
        }

        console.log(`${hero.name} has been recruited.`);
        onscreenConsole.log(
          `You have recruited <span class="console-highlights">${hero.name}</span> for free.`,
        );
        playSFX("recruit");

        updateGameBoard();
        closeHQCityCardChoicePopup();
        resolve(true);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function instantVillainDefeat() {
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
    instructionsElement.textContent = "SELECT A VILLAIN OR HENCHMAN TO DEFEAT:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedCell = null;

    // Check if any villains exist in city
    const villainsInCity = city.some(
      (card, index) =>
        card &&
        (card.type === "Villain" || card.type === "Henchman") &&
        !destroyedSpaces[index],
    );

    if (!villainsInCity) {
      onscreenConsole.log("There are no Villains available to defeat.");
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
        // Create a new image element for the destroyed space
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
        cardImage.style.display = "block"; // Ensure it's visible
        cardContainer.appendChild(cardImage); // <-- THIS IS THE KEY LINE

        // Determine eligibility - Villains and Henchmen are eligible
        const isEligible = card.type === "Villain" || card.type === "Henchman";

        // Apply greyed out styling for ineligible cards (Heroes, etc.)
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
                "SELECT A VILLAIN OR HENCHMAN TO DEFEAT:";
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
        cardImage.className = "city-hq-chosen-card-image";
        cardImage.classList.add("greyed-out");
        cardImage.style.cursor = "not-allowed";
        cardImage.onclick = null;
        cardImage.onmouseover = null;
        cardImage.onmouseout = null;
        cardContainer.appendChild(cardImage); // <-- MOVE INTO CONTAINER

        // Add Dark Portal overlay if this space has a Dark Portal (even if empty)
        if (darkPortalSpaces[i]) {
          const darkPortalOverlay = document.createElement("div");
          darkPortalOverlay.className = "dark-portal-overlay";
          darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
          cardContainer.appendChild(darkPortalOverlay);
        }
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

    // Disable confirm initially and configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "DEFEAT SELECTED VILLAIN";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCityIndex === null) return;

      closeHQCityCardChoicePopup();
      modalOverlay.style.display = "none";
      updateGameBoard();
      originalResolve();
      await instantDefeatAttack(selectedCityIndex);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

// Enhanced helper function to add card overlays with attack values and killbot
function addCardOverlays(cardContainer, card, cityIndex) {
  // Add Dark Portal overlay if this space has a Dark Portal
  if (darkPortalSpaces[cityIndex]) {
    const darkPortalOverlay = document.createElement("div");
    darkPortalOverlay.className = "dark-portal-overlay";
    darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
    cardContainer.appendChild(darkPortalOverlay);
  }

  // Add bystander overlay if there are bystanders
  if (card.bystander && card.bystander.length > 0) {
    const bystanderOverlay = document.createElement("div");
    bystanderOverlay.className = "bystanders-overlay";
    let overlayText = `<span class="bystanderOverlayNumber">${card.bystander.length}</span>`;
    let overlayImage = `<img src="${card.bystander[0].image}" alt="Captured Hero" class="villain-bystander">`;
    bystanderOverlay.innerHTML = overlayText + overlayImage;
    bystanderOverlay.style.whiteSpace = "pre-line";
    cardContainer.appendChild(bystanderOverlay);
  }

  updateVillainAttackValues(city[cityIndex], cityIndex);

  const attackFromMastermind = city[cityIndex].attackFromMastermind || 0;
  const attackFromScheme = city[cityIndex].attackFromScheme || 0;
  const attackFromOwnEffects = city[cityIndex].attackFromOwnEffects || 0;
  const attackFromHeroEffects = city[cityIndex].attackFromHeroEffects || 0;
  const currentTempBuff = window[`city${cityIndex + 1}TempBuff`] || 0;
  const villainShattered = city[cityIndex].shattered || 0;
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
      city[cityIndex].attack + totalAttackModifiers;
    cardContainer.appendChild(villainOverlayAttack);
  }

  // Add killbot overlay
  if (card.killbot === true) {
    const killbotOverlay = document.createElement("div");
    killbotOverlay.className = "killbot-overlay";
    killbotOverlay.innerHTML = "KILLBOT";
    cardContainer.appendChild(killbotOverlay);
  }

  // Add babyHope overlay
  if (card.babyHope === true) {
    const babyOverlay = document.createElement("div");
    babyOverlay.className = "villain-baby-overlay";
    babyOverlay.innerHTML = `<img src="Visual Assets/Other/BabyHope.webp" alt="Baby Hope" class="villain-baby">`;
    cardContainer.appendChild(babyOverlay);
  }

  // Add custom text overlay
  if (card.overlayText) {
    const textOverlay = document.createElement("div");
    textOverlay.className = "skrull-overlay";
    textOverlay.innerHTML = `${card.overlayText}`;
    cardContainer.appendChild(textOverlay);
  }

  // Add captured overlay
  if (card.capturedOverlayText) {
    const capturedOverlay = document.createElement("div");
    capturedOverlay.className = "captured-overlay";
    capturedOverlay.innerHTML = `${card.capturedOverlayText}`;
    cardContainer.appendChild(capturedOverlay);
  }

  // Add temp buff overlay if exists
  if (currentTempBuff !== 0) {
    const tempBuffOverlay = document.createElement("div");
    tempBuffOverlay.className = "temp-buff-overlay-villain-move";
    tempBuffOverlay.innerHTML = `<p>${currentTempBuff > 0 ? "+" : ""}${currentTempBuff} Attack</p>`;
    cardContainer.appendChild(tempBuffOverlay);
  }

  const permBuffVariableName = `city${cityIndex + 1}PermBuff`;
  const currentPermBuff = window[permBuffVariableName];
  // Add perm buff overlay if exists
  if (currentPermBuff !== 0) {
    const permBuffOverlay = document.createElement("div");
    permBuffOverlay.className = "perm-buff-overlay-villain-move";
    permBuffOverlay.innerHTML = `<p>${currentPermBuff > 0 ? "+" : ""}${currentPermBuff} Attack</p>`;
    cardContainer.appendChild(permBuffOverlay);
  }

  // Add XCutioner overlay if applicable
  if (card.XCutionerHeroes && card.XCutionerHeroes.length > 0) {
    const xcutionerOverlay = document.createElement("div");
    xcutionerOverlay.className = "XCutioner-overlay";

    let xcutionerOverlayImage = `<img src="${card.XCutionerHeroes[0].image}" alt="Captured Hero" class="villain-baby">`;
    let xcutionerOverlayText = `<span class="XCutionerOverlayNumber">${card.XCutionerHeroes.length}</span>`;

    xcutionerOverlay.innerHTML = xcutionerOverlayImage + xcutionerOverlayText;
    xcutionerOverlay.style.whiteSpace = "pre-line";
    cardContainer.appendChild(xcutionerOverlay);

    // Add expanded XCutioner container for interactivity
    const xcutionerExpandedContainer = document.createElement("div");
    xcutionerExpandedContainer.className = "expanded-XCutionerHeroes";
    xcutionerExpandedContainer.style.display = "none";

    card.XCutionerHeroes.forEach((hero) => {
      const xcutionerHeroElement = document.createElement("span");
      xcutionerHeroElement.className = "XCutioner-hero-name";
      xcutionerHeroElement.textContent = hero.name;
      xcutionerHeroElement.dataset.image = hero.image;

      xcutionerHeroElement.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        showZoomedImage(hero.image);
        const card = cardLookup[normalizeImagePath(hero.image)];
        if (card) updateRightPanel(card);
      });

      xcutionerHeroElement.addEventListener("mouseout", (e) => {
        e.stopPropagation();
        if (!activeImage) hideZoomedImage();
      });

      xcutionerHeroElement.addEventListener("click", (e) => {
        e.stopPropagation();
        activeImage = activeImage === hero.image ? null : hero.image;
        showZoomedImage(activeImage || "");
      });

      xcutionerExpandedContainer.appendChild(xcutionerHeroElement);
    });

    xcutionerOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      xcutionerExpandedContainer.style.display =
        xcutionerExpandedContainer.style.display === "none" ? "block" : "none";

      if (xcutionerExpandedContainer.style.display === "block") {
        setTimeout(() => {
          document.addEventListener(
            "click",
            (e) => {
              if (!xcutionerExpandedContainer.contains(e.target)) {
                xcutionerExpandedContainer.style.display = "none";
              }
            },
            { once: true },
          );
        }, 50);
      }
    });

    cardContainer.appendChild(xcutionerExpandedContainer);
  }

  // Add plutonium overlay if applicable
  if (card.plutoniumCaptured) {
    const plutoniumOverlay = document.createElement("div");
    plutoniumOverlay.innerHTML = `<span class="plutonium-count">${card.plutoniumCaptured.length}</span><img src="Visual Assets/Other/Plutonium.webp" alt="Plutonium" class="captured-plutonium-image-overlay">`;
    cardContainer.appendChild(plutoniumOverlay);
  }

  // Add location attack overlays if applicable
  const locationAttacks = [
    { value: city1LocationAttack, index: 0 },
    { value: city2LocationAttack, index: 1 },
    { value: city3LocationAttack, index: 2 },
    { value: city4LocationAttack, index: 3 },
    { value: city5LocationAttack, index: 4 },
  ];

  const locationAttack = locationAttacks.find((loc) => loc.index === cityIndex);
  if (locationAttack && locationAttack.value !== 0) {
    const locationElement = document.querySelector(
      `#${["bridge-label", "streets-label", "rooftops-label", "bank-label", "sewers-label"][cityIndex]}`,
    );
    if (locationElement) {
      const existingOverlay = locationElement.querySelector(
        ".location-attack-changes",
      );
      if (existingOverlay) existingOverlay.remove();

      const attackElement = document.createElement("div");
      attackElement.className = "location-attack-changes";
      attackElement.innerHTML = `<p>${locationAttack.value} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'></p>`;
      locationElement.appendChild(attackElement);
    }
  }
}

// Helper function to add mastermind overlays with the same styling as villain overlays
function addMastermindOverlays(cardContainer, mastermind, isPopup = true) {
  // Add Dark Portal overlay if mastermind has Dark Portal
  if (darkPortalMastermind) {
    const darkPortalOverlay = document.createElement("div");
    darkPortalOverlay.className = "dark-portal-overlay";
    darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
    cardContainer.appendChild(darkPortalOverlay);
  }

  // Add bystander overlay if there are bystanders
  if (mastermind.bystanders && mastermind.bystanders.length > 0) {
    const bystanderOverlay = document.createElement("div");
    bystanderOverlay.className = "bystanders-overlay";
    let overlayText = `<span class="bystanderOverlayNumber">${mastermind.bystanders.length}</span>`;
    let overlayImage = `<img src="${mastermind.bystanders[0].image}" alt="Captured Hero" class="villain-bystander">`;
    bystanderOverlay.innerHTML = overlayText + overlayImage;
    bystanderOverlay.style.whiteSpace = "pre-line";
    cardContainer.appendChild(bystanderOverlay);
  }

  // Add attack overlay if mastermind has modified attack
  const mastermindAttack = recalculateMastermindAttack(mastermind);
  if (mastermindAttack !== mastermind.attack) {
    const attackOverlay = document.createElement("div");
    attackOverlay.className = "attack-overlay";
    attackOverlay.innerHTML = mastermindAttack;
    cardContainer.appendChild(attackOverlay);
  }

  // Add XCutioner overlay if applicable
  if (mastermind.XCutionerHeroes && mastermind.XCutionerHeroes.length > 0) {
    const xcutionerOverlay = document.createElement("div");
    xcutionerOverlay.className = "XCutioner-overlay";

    let xcutionerOverlayImage = `<img src="${mastermind.XCutionerHeroes[0].image}" alt="Captured Hero" class="villain-baby">`;
    let xcutionerOverlayText = `<span class="XCutionerOverlayNumber">${mastermind.XCutionerHeroes.length}</span>`;

    xcutionerOverlay.innerHTML = xcutionerOverlayImage + xcutionerOverlayText;
    xcutionerOverlay.style.whiteSpace = "pre-line";
    cardContainer.appendChild(xcutionerOverlay);

    // Add expanded XCutioner container for interactivity (only in popups)
    if (isPopup) {
      const xcutionerExpandedContainer = document.createElement("div");
      xcutionerExpandedContainer.className = "expanded-XCutionerHeroes";
      xcutionerExpandedContainer.style.display = "none";

      mastermind.XCutionerHeroes.forEach((hero) => {
        const xcutionerHeroElement = document.createElement("span");
        xcutionerHeroElement.className = "XCutioner-hero-name";
        xcutionerHeroElement.textContent = hero.name;
        xcutionerHeroElement.dataset.image = hero.image;

        xcutionerHeroElement.addEventListener("mouseover", (e) => {
          e.stopPropagation();
          showZoomedImage(hero.image);
          const card = cardLookup[normalizeImagePath(hero.image)];
          if (card) updateRightPanel(card);
        });

        xcutionerHeroElement.addEventListener("mouseout", (e) => {
          e.stopPropagation();
          if (!activeImage) hideZoomedImage();
        });

        xcutionerHeroElement.addEventListener("click", (e) => {
          e.stopPropagation();
          activeImage = activeImage === hero.image ? null : hero.image;
          showZoomedImage(activeImage || "");
        });

        xcutionerExpandedContainer.appendChild(xcutionerHeroElement);
      });

      xcutionerOverlay.addEventListener("click", (e) => {
        e.stopPropagation();
        xcutionerExpandedContainer.style.display =
          xcutionerExpandedContainer.style.display === "none"
            ? "block"
            : "none";

        if (xcutionerExpandedContainer.style.display === "block") {
          setTimeout(() => {
            document.addEventListener(
              "click",
              (e) => {
                if (!xcutionerExpandedContainer.contains(e.target)) {
                  xcutionerExpandedContainer.style.display = "none";
                }
              },
              { once: true },
            );
          }, 50);
        }
      });

      cardContainer.appendChild(xcutionerExpandedContainer);
    }
  }

  // Add plutonium overlay if applicable
  if (mastermind.plutoniumCaptured) {
    const plutoniumOverlay = document.createElement("div");
    plutoniumOverlay.innerHTML = `<span class="plutonium-count">${mastermind.plutoniumCaptured.length}</span><img src="Visual Assets/Other/Plutonium.webp" alt="Plutonium" class="captured-plutonium-image-overlay">`;
    cardContainer.appendChild(plutoniumOverlay);
  }
}

function KO1To4FromDiscard() {
  updateGameBoard();
  return new Promise((resolve) => {
    if (playerDiscardPile.length === 0) {
      console.log("No cards in the Discard Pile to KO.");
      onscreenConsole.log(
        "Your discard pile is currently empty. Unable to KO any cards.",
      );
      resolve();
      return;
    }

    // Create a working copy with original indices tracked
    const discardCardsWithIndex = playerDiscardPile.map((card, index) => ({
      ...card,
      originalIndex: index,
    }));

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
    titleElement.textContent = "KO Cards";
    instructionsElement.innerHTML =
      "You may select up to four cards from your discard pile to KO.";

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

    // Sort the working copy instead of the original array
    genericCardSort(discardCardsWithIndex);

    let selectedCards = [];
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with selected cards
    function updateInstructions() {
      if (selectedCards.length === 0) {
        instructionsElement.innerHTML =
          "You may select up to four cards from your discard pile to KO.";
      } else {
        const names = selectedCards
          .map((card) => `<span class="console-highlights">${card.name}</span>`)
          .join(", ");
        instructionsElement.innerHTML = `Selected: ${names} (${selectedCards.length}/4)`;
      }
    }

    // Update button text and state
    function updateButtons() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const noThanksButton = document.getElementById(
        "card-choice-popup-nothanks",
      );

      if (selectedCards.length > 0) {
        confirmButton.textContent = `KO ${selectedCards.length} CARD${selectedCards.length !== 1 ? "S" : ""}`;
        confirmButton.disabled = false;
      } else {
        confirmButton.textContent = "KO CARDS";
        confirmButton.disabled = true;
      }

      noThanksButton.textContent = "NO THANKS";
      noThanksButton.disabled = false;
    }

    // Create card elements for each card in discard pile
    discardCardsWithIndex.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", `discard-${card.originalIndex}`);
      cardElement.setAttribute("data-original-index", card.originalIndex);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      const isSelected = selectedCards.some(
        (c) => c.originalIndex === card.originalIndex,
      );
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

      // Selection click handler - multiple selection allowed (up to 4) with FIFO logic
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const index = selectedCards.findIndex(
          (c) => c.originalIndex === card.originalIndex,
        );
        if (index > -1) {
          // Deselect
          selectedCards.splice(index, 1);
          cardImage.classList.remove("selected");
        } else {
          if (selectedCards.length >= 4) {
            // FIFO logic: remove the first selected card (oldest)
            const firstSelected = selectedCards.shift();

            // Update the visual state of the first selected card
            const firstSelectedElement = document.querySelector(
              `[data-original-index="${firstSelected.originalIndex}"] img`,
            );
            if (firstSelectedElement) {
              firstSelectedElement.classList.remove("selected");
            }
          }

          // Select new card
          selectedCards.push(card);
          cardImage.classList.add("selected");
        }

        // Update preview to show last selected card, or clear if none selected
        previewElement.innerHTML = "";
        if (selectedCards.length > 0) {
          const lastSelected = selectedCards[selectedCards.length - 1];
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
        updateButtons();
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (discardCardsWithIndex.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (discardCardsWithIndex.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (discardCardsWithIndex.length > 5) {
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
    confirmButton.textContent = "KO CARDS";
    confirmButton.disabled = true;
    otherChoiceButton.style.display = "none";
    noThanksButton.textContent = "NO THANKS";
    noThanksButton.style.display = "inline-block";

    // Confirm button handler - KO selected cards
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCards.length === 0) return;

      setTimeout(() => {
        // Sort selected cards by originalIndex in descending order to avoid index shifting issues
        selectedCards.sort((a, b) => b.originalIndex - a.originalIndex);

        selectedCards.forEach((card) => {
          // Remove using the original index
          if (card.originalIndex < playerDiscardPile.length) {
            const removedCard = playerDiscardPile.splice(
              card.originalIndex,
              1,
            )[0];
            koPile.push(removedCard);
            console.log(`${removedCard.name} KO'd from discard pile.`);
            onscreenConsole.log(
              `<span class="console-highlights">${removedCard.name}</span> has been KO'd.`,
            );
            koBonuses();
          }
        });

        updateGameBoard();
        closeCardChoicePopup();
        resolve();
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      setTimeout(() => {
        console.log("No cards selected for KO.");
        onscreenConsole.log("You chose not to KO any cards.");

        updateGameBoard();
        closeCardChoicePopup();
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";

    // Initial UI update
    updateButtons();
  });
}

function chooseVillainKOFromVP() {
  updateGameBoard();
  return new Promise((resolve) => {
    const villainsInVP = victoryPile
      .map((card, index) =>
        card && (card.type === "Villain" || card.type === "Henchman")
          ? { ...card, id: `vp-${index}`, index }
          : null,
      )
      .filter((card) => card !== null);

    if (villainsInVP.length === 0) {
      onscreenConsole.log("There are no Villains in your Victory Pile to KO.");
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
    titleElement.textContent = "KO a Villain";
    instructionsElement.innerHTML =
      "Select a Villain or Henchman to KO from your Victory Pile.";

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

    let selectedVillain = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with selected card
    function updateInstructions() {
      if (selectedVillain === null) {
        instructionsElement.innerHTML =
          "Select a Villain or Henchman to KO from your Victory Pile.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedVillain.name}</span> will be KO'd.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedVillain === null;
    }

    // Create card elements for each villain/henchman in victory pile
    villainsInVP.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-original-index", card.index);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      if (selectedVillain && selectedVillain.id === card.id) {
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

        if (selectedVillain === card) {
          // Deselect
          selectedVillain = null;
          cardImage.classList.remove("selected");
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous
          if (selectedVillain) {
            const prevSelectedElement = document.querySelector(
              `[data-card-id="${selectedVillain.id}"] img`,
            );
            if (prevSelectedElement) {
              prevSelectedElement.classList.remove("selected");
            }
          }

          // Select new villain
          selectedVillain = card;
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

    if (villainsInVP.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (villainsInVP.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (villainsInVP.length > 5) {
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
    confirmButton.textContent = "KO SELECTED VILLAIN";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedVillain === null) return;

      setTimeout(() => {
        // Remove from victory pile using the stored index
        victoryPile.splice(selectedVillain.index, 1);
        koPile.push(selectedVillain);

        console.log(`${selectedVillain.name} KO'd from Victory Pile.`);
        onscreenConsole.log(
          `<span class="console-highlights">${selectedVillain.name}</span> has been KO'd from your Victory Pile.`,
        );
        koBonuses();

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

function chooseBystanderKOFromVP() {
  updateGameBoard();
  return new Promise((resolve) => {
    const bystandersInVP = victoryPile
      .map((card, index) =>
        card && card.type === "Bystander"
          ? { ...card, id: `vp-${index}`, index }
          : null,
      )
      .filter((card) => card !== null);

    // Handle cases with 0-2 bystanders immediately
    if (bystandersInVP.length === 0) {
      onscreenConsole.log(
        "There are no Bystanders in your Victory Pile to KO.",
      );
      resolve();
      return;
    }

    if (bystandersInVP.length <= 2) {
      bystandersInVP.forEach((card) => {
        victoryPile.splice(card.index, 1);
        koPile.push(card);
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> has been KO'd.`,
        );
        koBonuses();
      });
      updateGameBoard();
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
    titleElement.textContent = "KO Bystanders";
    instructionsElement.innerHTML =
      "Select exactly two Bystanders to KO from your Victory Pile.";

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

    let selectedBystanders = [];
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with selection status
    function updateInstructions() {
      const count = selectedBystanders.length;
      if (count === 0) {
        instructionsElement.innerHTML =
          "Select exactly two Bystanders to KO from your Victory Pile.";
      } else {
        const names = selectedBystanders
          .map((b) => `<span class="console-highlights">${b.name}</span>`)
          .join(", ");
        instructionsElement.innerHTML = `Selected: ${names} (${count}/2)`;
      }
    }

    // Update confirm button state and text
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const count = selectedBystanders.length;
      confirmButton.disabled = count !== 2;

      if (count === 2) {
        confirmButton.textContent = "KO 2 BYSTANDERS";
      } else {
        confirmButton.textContent = `SELECT ${2 - count} MORE`;
      }
    }

    // Create card elements for each bystander in victory pile
    bystandersInVP.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-original-index", card.index);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      const isSelected = selectedBystanders.some((b) => b.id === card.id);
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

        // Only change background if less than 2 cards are selected
        if (selectedBystanders.length < 2) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if less than 2 cards are selected AND we're not hovering over another card
        if (selectedBystanders.length < 2) {
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

      // Selection click handler - multiple selection allowed (up to 2) with FIFO logic
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const index = selectedBystanders.findIndex((b) => b.id === card.id);
        if (index > -1) {
          // Deselect
          selectedBystanders.splice(index, 1);
          cardImage.classList.remove("selected");
        } else {
          if (selectedBystanders.length >= 2) {
            // FIFO logic: remove the first selected bystander (oldest)
            const firstSelected = selectedBystanders.shift();

            // Update the visual state of the first selected bystander
            const firstSelectedElement = document.querySelector(
              `[data-card-id="${firstSelected.id}"] img`,
            );
            if (firstSelectedElement) {
              firstSelectedElement.classList.remove("selected");
            }
          }

          // Select new bystander
          selectedBystanders.push(card);
          cardImage.classList.add("selected");
        }

        // Update preview to show last selected card, or clear if none selected
        previewElement.innerHTML = "";
        if (selectedBystanders.length > 0) {
          const lastSelected =
            selectedBystanders[selectedBystanders.length - 1];
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

    if (bystandersInVP.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (bystandersInVP.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (bystandersInVP.length > 5) {
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
    confirmButton.textContent = "SELECT 2 MORE";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedBystanders.length !== 2) return;

      setTimeout(() => {
        selectedBystanders.forEach((card) => {
          victoryPile.splice(card.index, 1);
          koPile.push(card);
          onscreenConsole.log(
            `<span class="console-highlights">${card.name}</span> KO'd from Victory Pile.`,
          );
          koBonuses();
        });

        updateGameBoard();
        closeCardChoicePopup();
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";

    // Initial UI update
    updateConfirmButton();
  });
}

function updateHealWoundsButton() {
  const healWoundsButton = document.getElementById("healing-possible");
  const hasWounds = playerHand.some((card) => card.name === "Wound");
  if (hasWounds && healingPossible) {
    healWoundsButton.style.display = "block"; // Show the button
  } else {
    healWoundsButton.style.display = "none"; // Hide the button
  }
}

function recruitXMen() {
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
    titleElement.textContent = "Recruit a Hero";
    instructionsElement.innerHTML = `Select an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Hero from the HQ to recruit for free.`;

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

        // Determine eligibility - must be X-Men team AND not destroyed
        const isXMen = hero.team === "X-Men";
        const isDestroyed = explosionValue >= 6;
        const isEligible = isXMen && !isDestroyed;

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
              instructionsElement.innerHTML = `Select an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Hero from the HQ to recruit for free.`;
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be recruited for free.`;
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
    const eligibleHeroesForXMenRecruit = hq.filter((hero, index) => {
      const explosionValue = explosionValues[index] || 0;
      return hero && hero.team === "X-Men" && explosionValue < 6; // Not destroyed
    });

    if (eligibleHeroesForXMenRecruit.length === 0) {
      console.log("No available X-Men Heroes to recruit.");
      onscreenConsole.log(
        `No available <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes to recruit.`,
      );
      resolve(false);
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
    confirmButton.textContent = "Recruit Hero";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(() => {
        const hero = hq[selectedHQIndex];

        // Recruit the hero using the original function
        recruitHeroConfirmed(hero, selectedHQIndex);

        if (!negativeZoneAttackAndRecruit) {
          totalRecruitPoints += hero.cost;
        } else {
          totalAttackPoints += hero.cost;
        }

        console.log(`${hero.name} has been recruited.`);
        onscreenConsole.log(
          `You have recruited <span class="console-highlights">${hero.name}</span> for free.`,
        );
        playSFX("recruit");

        updateGameBoard();
        closeHQCityCardChoicePopup();
        resolve(true);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

async function MagnetoRevealXMenOrWound() {
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }

  const cardsYouHave = [
    ...playerHand, // Include all cards in hand (unchanged)
    ...cardsPlayedThisTurn.filter(
      (card) =>
        !card.isCopied && // Exclude copied cards
        !card.sidekickToDestroy, // Exclude sidekicks marked for destruction
    ),
  ];

  const hasXMen =
    cardsYouHave.filter((item) => item.team === "X-Men").length > 0;

  if (!hasXMen) {
    console.log("You are unable to reveal an X-Men hero.");
    onscreenConsole.log(
      `You are unable to reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero.`,
    );
    await drawWound();
    await drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          `DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> HERO TO AVOID GAINING WOUNDS?`,
          "Reveal Hero",
          "Gain Wounds",
        );

        // Update the popup title for mastermind tactic
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "MASTERMIND TACTIC!";

        // Hide the close button
        document.querySelector(
          ".info-or-choice-popup-closebutton",
        ).style.display = "none";

        // Set background image in preview area
        const previewArea = document.querySelector(
          ".info-or-choice-popup-preview",
        );
        if (previewArea) {
          previewArea.style.backgroundImage =
            "url('Visual Assets/Masterminds/Magneto_3.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You are able to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have escaped gaining Wounds!`,
          );
          closeInfoChoicePopup();
          resolve();
        };

        denyButton.onclick = async () => {
          onscreenConsole.log(
            `You have chosen not to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`,
          );
          await drawWound();
          await drawWound();
          closeInfoChoicePopup();
          resolve();
        };
      }, 10); // 10ms delay
    });
  }
}

function revealXMenOrWound() {
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  if (cardsYouHave.filter((item) => item.team === "X-Men").length === 0) {
    onscreenConsole.log(
      `You are unable to reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero.`,
    );
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?',
          "Reveal Hero",
          "Gain Wound",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "SABRETOOTH";

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
            "url('Visual Assets/Villains/Brotherhood_Sabretooth.webp')";
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
            `You are able to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal an <img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          cleanup();
        };
      }, 10);
    });
  }
}

async function EscapeRevealXMenOrWound() {
  onscreenConsole.log(
    `Escape! Reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero or gain a Wound.`,
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  revealXMenOrWound();
}

async function FightRevealXMenOrWound() {
  onscreenConsole.log(
    `Fight! Reveal an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero or gain a Wound.`,
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  revealXMenOrWound();
}

async function XMenToBystanders() {
  const cardsYouHave = [
    ...playerHand, // Include all cards in hand (unchanged)
    ...cardsPlayedThisTurn.filter(
      (card) =>
        !card.isCopied && // Exclude copied cards
        !card.sidekickToDestroy, // Exclude sidekicks marked for destruction
    ),
  ];

  const XMenCardsYouHave = cardsYouHave.filter((item) => item.team === "X-Men");

  if (XMenCardsYouHave.length === 0) {
    console.log("You do not currently have any X-Men heroes.");
    onscreenConsole.log(
      `You do not currently have any <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes and are unable to rescue any Bystanders.`,
    );
  } else {
    const bystanderText =
      XMenCardsYouHave.length === 1 ? "Bystander" : "Bystanders";
    console.log(
      `You have rescued ${XMenCardsYouHave.length} ${bystanderText}.`,
    );
    onscreenConsole.log(
      `You have ${XMenCardsYouHave.length} <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes. You are able to rescue ${XMenCardsYouHave.length} ${bystanderText}.`,
    );
    for (let i = 0; i < XMenCardsYouHave.length; i++) {
      await rescueBystander();
    }
    updateGameBoard();
  }
}

async function AvengersToBystanders() {
  onscreenConsole.log(
    `Fight! For each of your <img src='Visual Assets/Icons/Avengers.svg' alt='Avengers Icon' class='console-card-icons'> Heroes, rescue a Bystander.`,
  );
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];
  const AvengersCardsYouHave = cardsYouHave.filter(
    (item) => item.team === "Avengers",
  );

  if (AvengersCardsYouHave.length === 0) {
    onscreenConsole.log(
      `You do not currently have any <img src='Visual Assets/Icons/Avengers.svg' alt='Avengers Icon' class='console-card-icons'> Heroes.`,
    );
  } else {
    const bystanderText =
      AvengersCardsYouHave.length === 1 ? "Bystander" : "Bystanders";
    const HeroText = AvengersCardsYouHave.length === 1 ? "Hero" : "Heroes";
    onscreenConsole.log(
      `You currently have ${AvengersCardsYouHave.length} <img src='Visual Assets/Icons/Avengers.svg' alt='Avengers Icon' class='console-card-icons'> ${HeroText}. You have rescued ${AvengersCardsYouHave.length} ${bystanderText}.`,
    );
    for (let i = 0; i < AvengersCardsYouHave.length; i++) {
      await rescueBystander();
    }
  }
}

function XMen7thDraw() {
  return new Promise((resolve) => {
    // Track source and original index for each card
    const handCards = playerHand.map((card, index) => ({
      ...card,
      source: "hand",
      originalIndex: index,
      location: "(Hand)",
    }));

    const playedCards = cardsPlayedThisTurn
      .filter((card) => !card.isCopied && !card.sidekickToDestroy)
      .map((card, index) => ({
        ...card,
        source: "played",
        originalIndex: index,
        location: "(Played Cards)",
      }));

    const XMenCardsYouHave = [...handCards, ...playedCards].filter(
      (item) => item.team === "X-Men",
    );

    if (XMenCardsYouHave.length === 0) {
      console.log("No available X-Men Heroes.");
      onscreenConsole.log(
        `You do not have any <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Heroes to add to next turn's draw.`,
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
    titleElement.textContent = "Magneto - Electromagnetic Bubble";
    instructionsElement.innerHTML = `Choose one of your <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Heroes to add to next turn's draw.`;

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

    // Separate cards by source for display
    const handXMenCards = XMenCardsYouHave.filter(
      (card) => card.source === "hand",
    );
    const playedXMenCards = XMenCardsYouHave.filter(
      (card) => card.source === "played",
    );

    // Sort the arrays for display
    genericCardSort(handXMenCards);
    genericCardSort(playedXMenCards);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML = `Choose one of your <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Heroes to add to next turn's draw.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> ${selectedCard.location} will be added to next turn's draw.`;
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
      cardElement.setAttribute("data-source", card.source);

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

    // Populate row1 with Hand X-Men cards
    handXMenCards.forEach((card) => {
      createCardElement(card, selectionRow1);
    });

    // Populate row2 with Played Cards X-Men cards
    playedXMenCards.forEach((card) => {
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
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(() => {
        const cardCopy = { ...selectedCard };
        cardsToBeDrawnNextTurn.push(cardCopy);
        nextTurnsDraw++;

        // Mark the original card to be destroyed later using the tracked source and index
        if (selectedCard.source === "hand") {
          playerHand[selectedCard.originalIndex].markedToDrawNextTurn = true;
        } else {
          cardsPlayedThisTurn[selectedCard.originalIndex].markedToDrawNextTurn =
            true;
        }

        console.log(`${selectedCard.name} has been reserved for next turn.`);
        onscreenConsole.log(
          `You have selected <span class="console-highlights">${selectedCard.name}</span> to be added to your next draw as a seventh card.`,
        );

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

function add4Recruit() {
  totalRecruitPoints += 4;
  cumulativeRecruitPoints += 4;
  onscreenConsole.log(
    `+4 <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'> gained.`,
  );
  updateGameBoard();
}

function add3Attack() {
  totalAttackPoints += 3;
  cumulativeAttackPoints += 3;
  onscreenConsole.log(
    `+3 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> gained.`,
  );
  updateGameBoard();
}

function redSkullDrawing() {
  // Draw two extra cards
  extraDraw();
  extraDraw();

  // Count Villains with alwaysLeads in victory pile
  const alwaysLeadsInVP = victoryPile.filter(
    (item) => item.alwaysLeads === true,
  ).length;

  // Determine whether to use singular or plural form
  const cardText = alwaysLeadsInVP === 1 ? "card" : "cards";
  const villainText = alwaysLeadsInVP === 1 ? "Villain" : "Villains";

  // Log the result, correcting the usage of alwaysLeadsInVP
  onscreenConsole.log(
    `Solo Play rules enable your chosen Villain group to be used instead of HYDRA. As such, with ${alwaysLeadsInVP} ${villainText} in your Victory Pile, you can draw ${alwaysLeadsInVP} additional ${cardText}.`,
  );

  // Draw additional cards based on the number of Villains
  for (let i = 0; i < alwaysLeadsInVP; i++) {
    extraDraw();
  }
}

function revealTop3AndChooseActions() {
  updateGameBoard();
  return new Promise(async (resolve) => {
    // Calculate total available cards
    const totalAvailableCards = playerDeck.length + playerDiscardPile.length;

    if (totalAvailableCards === 0) {
      onscreenConsole.log("No cards available to reveal and resolve.");
      console.log("No cards available to reveal and resolve.");
      resolve(false);
      return;
    }

    // Draw available cards (up to 3), shuffling if needed
    function drawCards(num) {
      const drawnCards = [];
      for (let i = 0; i < num; i++) {
        if (playerDeck.length === 0) {
          if (playerDiscardPile.length > 0) {
            playerDeck = shuffle(playerDiscardPile);
            playerDiscardPile = [];
          } else {
            break;
          }
        }
        drawnCards.push(playerDeck.pop());
      }
      return drawnCards;
    }

    const availableCards = drawCards(Math.min(3, totalAvailableCards));
    const cardCount = availableCards.length;

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
    titleElement.textContent = "MASTERMIND TACTIC!";
    instructionsElement.innerHTML = `Select a card and choose an action (1/${cardCount}).`;

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

    let remainingCards = [...availableCards];
    let actionsCompleted = 0;
    let selectedCard = null;
    let isDragging = false;

    // Track which actions are still available
    let availableActions = ["KO", "DISCARD", "RETURN TO DECK"];

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update UI based on current state
    function updateUI() {
      selectionRow1.innerHTML = "";
      selectedCard = null;
      previewElement.innerHTML = "";
      previewElement.style.backgroundColor = "var(--panel-backgrounds)";

      // Create a sorted copy for display only, but keep original order for processing
      const displayCards = [...remainingCards];
      genericCardSort(displayCards);

      // Update instructions
      instructionsElement.innerHTML = `Select a card and choose an action (${actionsCompleted + 1}/${cardCount}).`;

      // Update button labels based on available actions
      updateButtonLabels();

      displayCards.forEach((card) => {
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

          updateButtonStates();
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

      // Update button states
      updateButtonStates();
    }

    // Update button labels based on available actions
    function updateButtonLabels() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const otherChoiceButton = document.getElementById(
        "card-choice-popup-otherchoice",
      );
      const noThanksButton = document.getElementById(
        "card-choice-popup-nothanks",
      );

      // Assign actions to buttons based on what's available
      if (availableActions.length >= 1) {
        confirmButton.textContent = availableActions[0];
        confirmButton.style.display = "inline-block";
      }

      if (availableActions.length >= 2) {
        otherChoiceButton.textContent = availableActions[1];
        otherChoiceButton.style.display = "inline-block";
      } else {
        otherChoiceButton.style.display = "none";
      }

      if (availableActions.length >= 3) {
        noThanksButton.textContent = availableActions[2];
        noThanksButton.style.display = "inline-block";
      } else {
        noThanksButton.style.display = "none";
      }
    }

    // Update button enabled/disabled states
    function updateButtonStates() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const otherChoiceButton = document.getElementById(
        "card-choice-popup-otherchoice",
      );
      const noThanksButton = document.getElementById(
        "card-choice-popup-nothanks",
      );

      // Buttons are only enabled when a card is selected
      const hasSelection = selectedCard !== null;

      confirmButton.disabled = !hasSelection;
      if (otherChoiceButton.style.display !== "none") {
        otherChoiceButton.disabled = !hasSelection;
      }
      if (noThanksButton.style.display !== "none") {
        noThanksButton.disabled = !hasSelection;
      }
    }

    // Process the selected action
    async function processAction(action) {
      if (!selectedCard) return;

      const card = selectedCard;

      switch (action) {
        case "KO":
          koPile.push(card);
          onscreenConsole.log(
            `<span class="console-highlights">${card.name}</span> has been KO'd.`,
          );
          koBonuses();
          break;
        case "DISCARD":
          await discardAvoidance();

          if (hasDiscardAvoidance) {
            onscreenConsole.log(
              `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided discarding.`,
            );
            hasDiscardAvoidance = false;
          } else {
            const { returned } = await checkDiscardForInvulnerability(card);
            if (returned.length) {
              playerHand.push(...returned);
            }
          }
          break;
        case "RETURN TO DECK":
          playerDeck.push(card);
          card.revealed = true;
          onscreenConsole.log(
            `<span class="console-highlights">${card.name}</span> has been returned to your deck.`,
          );
          if (stingOfTheSpider) {
            await scarletSpiderStingOfTheSpiderDrawChoice(card);
          }
          break;
      }

      // Remove the used action from available options
      availableActions = availableActions.filter((a) => a !== action);

      // Remove processed card from available selections
      remainingCards = remainingCards.filter((c) => c !== card);
      actionsCompleted++;

      // Check if all actions are completed
      if (actionsCompleted >= cardCount) {
        updateGameBoard();
        closeCardChoicePopup();
        resolve(true);
        return;
      }

      // Reset selection and update UI for next action
      selectedCard = null;
      updateUI();
    }

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Configure initial button states
    confirmButton.disabled = true;
    otherChoiceButton.disabled = true;
    noThanksButton.disabled = true;

    // Button handlers - each button processes a different action
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      const action = confirmButton.textContent;
      await processAction(action);
    };

    otherChoiceButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      const action = otherChoiceButton.textContent;
      await processAction(action);
    };

    noThanksButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      const action = noThanksButton.textContent;
      await processAction(action);
    };

    // Initialize the UI
    updateUI();

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function EscapeChooseHeroesToKO() {
  onscreenConsole.log("Escape! You must KO two Heroes.");
  chooseHeroesToKO();
}

function EscapeChooseHandHeroesToKO() {
  onscreenConsole.log("Escape! You must KO two Heroes from your hand.");
  return new Promise((resolve, reject) => {
    const availableHeroes = [
      ...playerHand.filter((card) => card && card.type === "Hero"),
    ].map((card, index) => ({ ...card, uniqueId: `${card.id}-${index}` }));

    if (availableHeroes.length === 0) {
      onscreenConsole.log("No Heroes available to KO.");
      resolve();
      return;
    }

    if (availableHeroes.length <= 2) {
      availableHeroes.forEach((card) => {
        const indexInHand = playerHand.findIndex((c) => c.id === card.id);

        if (indexInHand !== -1) {
          playerHand.splice(indexInHand, 1);
        }

        koPile.push(card);
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> has been automatically chosen and KO'd.`,
        );
        koBonuses();
      });
      updateGameBoard();
      resolve();
      return;
    }

    // Setup UI elements for new popup structure
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

    // Set popup content
    titleElement.textContent = "Juggernaut - Escape!";
    instructionsElement.textContent = "Select two Heroes to KO.";

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

    let selectedHeroes = [];
    let selectedCardImages = [];
    let isDragging = false;
    let startX, startY, scrollLeft, startTime;

    // Create a sorted copy for display only, but keep original array for processing
    const displayHeroes = [...availableHeroes];
    genericCardSort(displayHeroes);

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each eligible hero
    displayHeroes.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.uniqueId);

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

        // Only change background if no cards are selected
        if (selectedHeroes.length === 0) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no cards are selected AND we're not hovering over another card
        if (selectedHeroes.length === 0) {
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
        const cardIndex = selectedHeroes.findIndex(
          (hero) => hero.uniqueId === cardId,
        );

        if (cardIndex !== -1) {
          // Deselect
          selectedHeroes.splice(cardIndex, 1);
          selectedCardImages.splice(cardIndex, 1);
          cardImage.classList.remove("selected");

          // Update preview and instructions
          updatePreviewAndInstructions();
        } else {
          if (selectedHeroes.length >= 2) {
            // Remove the first selected card if we're at limit
            const firstCardId = selectedHeroes[0].uniqueId;
            const firstCardElement = selectionRow1.querySelector(
              `[data-card-id="${firstCardId}"]`,
            );
            if (firstCardElement) {
              const firstCardImage =
                firstCardElement.querySelector(".popup-card-image");
              firstCardImage.classList.remove("selected");
            }
            selectedHeroes.shift();
            selectedCardImages.shift();
          }

          // Select new card
          selectedHeroes.push(card);
          selectedCardImages.push(cardImage);
          cardImage.classList.add("selected");

          // Update preview and instructions
          updatePreviewAndInstructions();
        }

        // Update confirm button state
        document.getElementById("card-choice-popup-confirm").disabled =
          selectedHeroes.length !== 2;
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    function updatePreviewAndInstructions() {
      // Update preview with the last selected card
      previewElement.innerHTML = "";
      if (selectedHeroes.length > 0) {
        const lastCard = selectedHeroes[selectedHeroes.length - 1];
        const previewImage = document.createElement("img");
        previewImage.src = lastCard.image;
        previewImage.alt = lastCard.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);
        previewElement.style.backgroundColor = "var(--accent)";
      } else {
        previewElement.style.backgroundColor = "var(--panel-backgrounds)";
      }

      // Update instructions
      if (selectedHeroes.length < 2) {
        instructionsElement.textContent = `Select ${2 - selectedHeroes.length} more Hero${selectedHeroes.length === 0 ? "es" : ""} to KO.`;
      } else {
        const namesList =
          selectedHeroes.length === 2
            ? `<span class="console-highlights">${selectedHeroes[0].name}</span> and <span class="console-highlights">${selectedHeroes[1].name}</span>`
            : `<span class="console-highlights">${selectedHeroes[0].name}</span>`;
        instructionsElement.innerHTML = `Selected: ${namesList} will be KO'd.`;
      }
    }

    if (displayHeroes.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (displayHeroes.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (displayHeroes.length > 5) {
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

    // Disable confirm initially and hide other buttons
    confirmButton.disabled = true;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Update confirm button text to match original
    confirmButton.textContent = "Confirm";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHeroes.length !== 2) return;

      setTimeout(() => {
        selectedHeroes.forEach((card) => {
          // Find the original card in availableHeroes to ensure we have the correct reference
          const originalCard = availableHeroes.find(
            (c) => c.uniqueId === card.uniqueId,
          );
          if (!originalCard) return;

          const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(
            (c) => c.id === originalCard.id,
          );
          const indexInHand = playerHand.findIndex(
            (c) => c.id === originalCard.id,
          );

          if (indexInCardsPlayed !== -1) {
            cardsPlayedThisTurn.splice(indexInCardsPlayed, 1);
          } else if (indexInHand !== -1) {
            playerHand.splice(indexInHand, 1);
          }

          koPile.push(originalCard);
          onscreenConsole.log(
            `<span class="console-highlights">${originalCard.name}</span> has been KO'd.`,
          );
          koBonuses();
        });

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

function chooseHeroesToKO() {
  return new Promise((resolve, reject) => {
    const availableHeroes = [
      ...playerHand.filter((card) => card && card.type === "Hero"),
      ...cardsPlayedThisTurn.filter(
        (card) =>
          card &&
          card.type === "Hero" &&
          !card.isCopied &&
          !card.sidekickToDestroy,
      ),
    ].map((card, index) => ({ ...card, uniqueId: `${card.id}-${index}` }));

    if (availableHeroes.length === 0) {
      onscreenConsole.log("No Heroes available to KO.");
      resolve();
      return;
    }

    if (availableHeroes.length <= 2) {
      availableHeroes.forEach((card) => {
        const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(
          (c) => c.id === card.id,
        );
        const indexInHand = playerHand.findIndex((c) => c.id === card.id);

        if (indexInCardsPlayed !== -1) {
          cardsPlayedThisTurn.splice(indexInCardsPlayed, 1);
        } else if (indexInHand !== -1) {
          playerHand.splice(indexInHand, 1);
        }

        koPile.push(card);
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> has been automatically chosen and KO'd.`,
        );
        koBonuses();
      });
      updateGameBoard();
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
    titleElement.textContent = "Hero KO";
    instructionsElement.textContent = "Select two Heroes to KO.";

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

    let selectedHeroes = [];
    let isDragging = false;

    // Separate cards by location for display
    const handHeroes = availableHeroes.filter((card) =>
      playerHand.some((c) => c.id === card.id),
    );
    const playedHeroes = availableHeroes.filter((card) =>
      cardsPlayedThisTurn.some((c) => c.id === card.id),
    );

    // Sort the arrays for display
    genericCardSort(handHeroes);
    genericCardSort(playedHeroes);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedHeroes.length !== 2;

      if (selectedHeroes.length < 2) {
        instructionsElement.textContent = `Select ${2 - selectedHeroes.length} more Hero${selectedHeroes.length === 0 ? "s" : ""} to KO.`;
      } else {
        const namesList =
          selectedHeroes.length === 2
            ? `<span class="console-highlights">${selectedHeroes[0].name}</span> and <span class="console-highlights">${selectedHeroes[1].name}</span>`
            : `<span class="console-highlights">${selectedHeroes[0].name}</span>`;
        instructionsElement.innerHTML = `Selected: ${namesList} will be KO'd.`;
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
      cardElement.setAttribute("data-card-id", card.uniqueId);
      cardElement.setAttribute("data-location", location);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      const isSelected = selectedHeroes.some(
        (h) => h.uniqueId === card.uniqueId,
      );
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

        // Only change background if less than 2 cards are selected
        if (selectedHeroes.length < 2) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if less than 2 cards are selected AND we're not hovering over another card
        if (selectedHeroes.length < 2) {
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

      // Selection click handler - multiple selection allowed (up to 2)
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const index = selectedHeroes.findIndex(
          (h) => h.uniqueId === card.uniqueId,
        );
        if (index > -1) {
          // Deselect
          selectedHeroes.splice(index, 1);
          cardImage.classList.remove("selected");
        } else {
          if (selectedHeroes.length >= 2) {
            // Remove the first selected card (FIFO)
            const firstSelectedId = selectedHeroes[0].uniqueId;
            selectedHeroes.shift();

            // Update the visual state of the first selected card
            const firstSelectedElement = document.querySelector(
              `[data-card-id="${firstSelectedId}"] img`,
            );
            if (firstSelectedElement) {
              firstSelectedElement.classList.remove("selected");
            }
          }

          // Select new card
          selectedHeroes.push(card);
          cardImage.classList.add("selected");
        }

        // Update preview to show last selected card, or clear if none selected
        previewElement.innerHTML = "";
        if (selectedHeroes.length > 0) {
          const lastSelected = selectedHeroes[selectedHeroes.length - 1];
          const previewImage = document.createElement("img");
          previewImage.src = lastSelected.image;
          previewImage.alt = lastSelected.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        } else {
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    // Populate row1 with Hand heroes
    handHeroes.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Played Cards heroes
    playedHeroes.forEach((card) => {
      createCardElement(card, "played", selectionRow2);
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
    confirmButton.textContent = "KO 2 HEROES";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHeroes.length !== 2) return;

      setTimeout(() => {
        selectedHeroes.forEach((card) => {
          // Find the original card to ensure we have the correct reference
          const originalCard = availableHeroes.find(
            (c) => c.uniqueId === card.uniqueId,
          );
          if (!originalCard) return;

          const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(
            (c) => c.id === originalCard.id,
          );
          const indexInHand = playerHand.findIndex(
            (c) => c.id === originalCard.id,
          );

          if (indexInCardsPlayed !== -1) {
            originalCard.markedToDestroy = true;
          } else if (indexInHand !== -1) {
            playerHand.splice(indexInHand, 1);
          }

          koPile.push(originalCard);
          onscreenConsole.log(
            `<span class="console-highlights">${originalCard.name}</span> has been KO'd.`,
          );
          koBonuses();
        });

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

function handleMystiqueEscape() {
  return new Promise((resolve, reject) => {
    // Search for Mystique in the escape pile
    const mystiqueIndex = escapedVillainsDeck.findIndex(
      (card) => card.name === "Mystique",
    );

    if (mystiqueIndex !== -1) {
      // Splice Mystique from the escape pile
      const mystiqueCard = escapedVillainsDeck.splice(mystiqueIndex, 1)[0];

      // Change the card's properties
      mystiqueCard.name = "Scheme Twist";
      mystiqueCard.type = "Scheme Twist";

      // Place it on top of the villain deck
      villainDeck.unshift(mystiqueCard);

      onscreenConsole.log(
        `Escape! <span class="console-highlights">Mystique</span> has transformed into a Scheme Twist.`,
      );

      // Draw the top card of the villain deck
      drawVillainCard()
        .then(() => {
          resolve(); // Resolve the promise after the card is drawn
        })
        .catch((error) => {
          reject(error); // Reject the promise if drawing the card fails
        });
    } else {
      console.log("Mystique was not found in the Escape Pile.");
      resolve(); // Resolve immediately if Mystique is not found
    }
  });
}

function ambushBystander() {
  let sewersIndex = city.length - 1;

  if (bystanderDeck.length === 0) {
    console.log("No bystanders left in the deck to rescue.");
    onscreenConsole.log(
      'Ambush! No Bystanders available for <span class="console-highlights">Green Goblin</span> to capture.',
    );
  } else {
    const ambushedBystander = bystanderDeck.pop();

    if (city[sewersIndex].bystander) {
      city[sewersIndex].bystander.push(ambushedBystander);
    } else {
      city[sewersIndex].bystander = [ambushedBystander];
    }

    const villain = city[sewersIndex];

    onscreenConsole.log(
      `Ambush! Bystander captured by <span class="console-highlights">${villain.name}</span>.`,
    );

    updateGameBoard();
  }
}

async function extraVillainDraw() {
  let sewersIndex = city.length - 1;
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">${city[sewersIndex].name}</span> forces you to play the top card of the Villain Deck.`,
  );

  await drawVillainCard();
}

function chooseHeroesToKOFromDiscardPile() {
  onscreenConsole.log(`Ambush! You must KO two Heroes from your discard pile.`);
  return new Promise((resolve) => {
    const availableHeroes = playerDiscardPile.filter(
      (card) => card && card.type === "Hero",
    );

    // Handle cases with 0-2 heroes immediately
    if (availableHeroes.length === 0) {
      onscreenConsole.log("No Heroes available to KO in the discard pile.");
      resolve();
      return;
    }

    if (availableHeroes.length <= 2) {
      availableHeroes.forEach((card) => {
        // More robust way to find the card in discard pile
        const index = playerDiscardPile.findIndex(
          (discardCard) =>
            discardCard.id === card.id && discardCard.name === card.name,
        );
        if (index !== -1) {
          const koedCard = playerDiscardPile.splice(index, 1)[0];
          koPile.push(koedCard);
          onscreenConsole.log(
            `<span class="console-highlights">${card.name}</span> automatically KO'd from discard.`,
          );
        }
      });
      koBonuses();
      updateGameBoard();
      resolve();
      return;
    }

    // Setup UI elements for new popup structure
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

    // Set popup content
    titleElement.textContent = "Juggernaut - Ambush!";
    instructionsElement.textContent = "Select two Heroes to KO from discard.";

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

    let selectedHeroes = [];
    let selectedCardImages = [];
    let isDragging = false;
    let startX, startY, scrollLeft, startTime;

    // Sort the available heroes for display
    genericCardSort(availableHeroes);

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each eligible hero
    availableHeroes.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);

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

        // Only change background if no cards are selected
        if (selectedHeroes.length === 0) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no cards are selected AND we're not hovering over another card
        if (selectedHeroes.length === 0) {
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
        const cardIndex = selectedHeroes.findIndex(
          (hero) => hero.id === cardId,
        );

        if (cardIndex !== -1) {
          // Deselect
          selectedHeroes.splice(cardIndex, 1);
          selectedCardImages.splice(cardIndex, 1);
          cardImage.classList.remove("selected");

          // Update preview and instructions
          updatePreviewAndInstructions();
        } else {
          if (selectedHeroes.length >= 2) {
            // Remove the first selected card if we're at limit
            const firstCardId = selectedHeroes[0].id;
            const firstCardElement = selectionRow1.querySelector(
              `[data-card-id="${firstCardId}"]`,
            );
            if (firstCardElement) {
              const firstCardImage =
                firstCardElement.querySelector(".popup-card-image");
              firstCardImage.classList.remove("selected");
            }
            selectedHeroes.shift();
            selectedCardImages.shift();
          }

          // Select new card
          selectedHeroes.push(card);
          selectedCardImages.push(cardImage);
          cardImage.classList.add("selected");

          // Update preview and instructions
          updatePreviewAndInstructions();
        }

        // Update confirm button state
        document.getElementById("card-choice-popup-confirm").disabled =
          selectedHeroes.length !== 2;
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    function updatePreviewAndInstructions() {
      // Update preview with the last selected card
      previewElement.innerHTML = "";
      if (selectedHeroes.length > 0) {
        const lastCard = selectedHeroes[selectedHeroes.length - 1];
        const previewImage = document.createElement("img");
        previewImage.src = lastCard.image;
        previewImage.alt = lastCard.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);
        previewElement.style.backgroundColor = "var(--accent)";
      } else {
        previewElement.style.backgroundColor = "var(--panel-backgrounds)";
      }

      // Update instructions
      if (selectedHeroes.length === 0) {
        instructionsElement.textContent =
          "Select two Heroes to KO from discard.";
      } else {
        const names = selectedHeroes.map((h) => h.name).join(", ");
        instructionsElement.textContent = `Selected: ${names}. ${
          selectedHeroes.length < 2
            ? `Select ${2 - selectedHeroes.length} more Hero${selectedHeroes.length === 1 ? "" : "es"}`
            : "Ready to confirm KO."
        }`;
      }
    }

    if (availableHeroes.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (availableHeroes.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (availableHeroes.length > 5) {
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

    // Disable confirm initially and hide other buttons
    confirmButton.disabled = true;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHeroes.length !== 2) return;

      setTimeout(() => {
        selectedHeroes.forEach((card) => {
          // More robust way to find the card in discard pile
          const index = playerDiscardPile.findIndex(
            (discardCard) =>
              discardCard.id === card.id && discardCard.name === card.name,
          );
          if (index !== -1) {
            const koedCard = playerDiscardPile.splice(index, 1)[0];
            koPile.push(koedCard);
            koBonuses();
            onscreenConsole.log(
              `<span class="console-highlights">${card.name}</span> KO'd from discard.`,
            );
          }
        });

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

function AmbushRightHeroSkrull() {
  onscreenConsole.log(
    `Ambush! The rightmost Hero from the HQ is captured by <span class="console-highlights">Skrull Shapeshifters</span>.`,
  );

  // Identify the rightmost HQ space (index 4 since HQ usually has 5 spaces, 0-4)
  const hqIndex = hq.length - 1;
  const hero = hq[hqIndex];

  // Check if there's a hero in the rightmost HQ space
  if (!hero) {
    onscreenConsole.log(
      "There is no Hero available in the rightmost HQ space.",
    );
    return;
  }

  // Identify the villain in the rightmost city space (index 4 assuming 5 city spaces, 0-4)
  const cityIndex = city.length - 1;
  const skrullShapeshifters = city[cityIndex];

  // Check if there's a villain in the rightmost city space
  if (!skrullShapeshifters) {
    onscreenConsole.log("No Villain in the rightmost city space.");
    return;
  }

  // Create a timestamp-based code for both the hero and the Skrull Shapeshifters
  const captureCode = Date.now(); // This timestamp is unique for each capture event

  // Assign the captureCode to both the hero and the villain
  skrullShapeshifters.captureCode = captureCode;
  hero.captureCode = captureCode;

  // Set the villain's attack equal to the hero's cost
  skrullShapeshifters.heroAttack = hero.cost;

  // Move the hero to the Skrull deck (or equivalent storage) and tag it with the captureCode
  capturedCardsDeck.push({ ...hero, captured: captureCode }); // Store the hero with its captureCode

  // Attach an overlay to the villain
  skrullShapeshifters.overlayText = `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">SKRULL</span><img src="${hero.image}" alt="${hero.name}" class="hero-image-overlay">`;

  onscreenConsole.log(
    `<span class="console-highlights">Skrull Shapeshifters</span> has captured <span class="console-highlights">${hero.name}</span>. This Villain now has ${hero.cost} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Fight this Villain to gain the captured Hero.`,
  );

  // Replace the rightmost HQ space with the top card from the hero deck, if available
  hq[hqIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;

  // Check if the HQ space is empty after drawing
  if (!hq[hqIndex]) {
    showHeroDeckEmptyPopup();
  }

  // Update the game board to reflect the changes
  updateGameBoard();
}

function highestCostHeroSkrullQueen() {
  onscreenConsole.log(
    `Ambush! The highest-cost Hero from the HQ is captured by <span class="console-highlights">Skrull Queen Veranke</span>.`,
  );

  // Identify the heroes in HQ
  const heroesInHQ = hq.filter((card) => card && card.type === "Hero");

  // Find the highest cost among the heroes
  const maxCost = Math.max(...heroesInHQ.map((hero) => hero.cost));

  // Filter heroes with the highest cost
  const highestCostHeroes = heroesInHQ.filter((hero) => hero.cost === maxCost);

  // If there's only one hero with the highest cost, capture it automatically
  if (highestCostHeroes.length === 1) {
    captureHeroBySkrullQueen(highestCostHeroes[0]);
  } else if (highestCostHeroes.length > 1) {
    // If there are multiple heroes with the same highest cost, prompt the player to choose
    showHeroSelectionPopup(highestCostHeroes, captureHeroBySkrullQueen);
  } else {
    onscreenConsole.log("No Heroes available in the HQ.");
  }
}

function captureHeroBySkrullQueen(hero) {
  // Identify the Skrull Queen in the city (assuming she's in the rightmost position)
  const cityIndex = city.length - 1;
  const skrullQueen = city[cityIndex];

  if (!skrullQueen) {
    console.log("No Villain in the rightmost city space.");
    return;
  }

  // Create a unique captureCode using the timestamp
  const captureCode = Date.now();

  // Assign the captureCode to both the villain and the hero
  skrullQueen.captureCode = captureCode;
  hero.captureCode = captureCode;

  // Set the Skrull Queen's attack equal to the hero's cost
  skrullQueen.heroAttack = hero.cost;

  // Move the hero to the Skrull deck and tag it with the captureCode
  capturedCardsDeck.push({ ...hero, captured: captureCode });

  // Replace the hero's HQ space with the top card from the hero deck, if available
  const heroIndex = hq.indexOf(hero);
  hq[heroIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;

  // Check if the HQ space is empty after drawing
  if (!hq[heroIndex]) {
    showHeroDeckEmptyPopup();
  }

  // Attach an overlay to the villain
  skrullQueen.overlayText = `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">SKRULL</span><img src="${hero.image}" alt="${hero.name}" class="hero-image-overlay">`;

  onscreenConsole.log(
    `<span class="console-highlights">Skrull Queen Veranke</span> has captured <span class="console-highlights">${hero.name}</span>. This Villain now has ${hero.cost} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Fight this Villain to gain the captured Hero.`,
  );

  // Update the game board to reflect the changes
  updateGameBoard();
}

function showHeroSelectionPopup(heroes, onHeroSelected) {
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
    titleElement.innerHTML = `AMBUSH!`;
    instructionsElement.innerHTML =
      'There are multiple heroes with the same cost for <span class="console-highlights">Skrull Queen Veranke</span> to capture. Select one.';

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedHQIndex = null;
    let selectedCell = null;

    // Find the highest cost among the provided heroes
    const highestCost = Math.max(...heroes.map((hero) => hero.cost));

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

        // Determine eligibility - must be in the provided heroes array AND have the highest cost AND not be destroyed
        const isInProvidedHeroes = heroes.some(
          (h) => (h.id ?? h.uniqueId) === (hero.id ?? hero.uniqueId),
        );
        const hasHighestCost = hero.cost === highestCost;
        const isDestroyed = explosionValue >= 6;
        const isEligible = isInProvidedHeroes && hasHighestCost && !isDestroyed;

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
              instructionsElement.innerHTML =
                'There are multiple heroes with the same cost for <span class="console-highlights">Skrull Queen Veranke</span> to capture. Select one.';
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be captured by <span class="console-highlights">Skrull Queen Veranke</span>.`;
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

    // Check if any eligible heroes exist (heroes with highest cost that aren't destroyed)
    const eligibleHeroes = hq.filter((hero, index) => {
      const explosionValue = explosionValues[index] || 0;
      const isInProvidedHeroes = heroes.some(
        (h) => (h.id ?? h.uniqueId) === (hero.id ?? hero.uniqueId),
      );
      return (
        hero &&
        isInProvidedHeroes &&
        hero.cost === highestCost &&
        explosionValue < 6
      ); // Not destroyed
    });

    if (eligibleHeroes.length === 0) {
      onscreenConsole.log("No eligible Heroes available for capture.");
      resolve(null);
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
    confirmButton.textContent = "Confirm";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(() => {
        const hero = hq[selectedHQIndex];
        if (hero) {
          console.log("Selected Hero for capture:", hero.name);
        }
        onHeroSelected(hero);
        closeHQCityCardChoicePopup();
        resolve(hero);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function fightSkrullQueen(villainCard) {
  onscreenConsole.log(`Fight! Gain the captured Hero.`);

  // Find the hero in the Skrull deck with the same captureCode as the villain being fought
  const heroIndex = capturedCardsDeck.findIndex(
    (hero) => hero.captured === villainCard.captureCode,
  );

  if (heroIndex === -1) {
    console.log("Error. Unable to rescue any Heroes.");
    return;
  }

  // Remove the hero from the Skrull deck
  const hero = capturedCardsDeck.splice(heroIndex, 1)[0];

  // Remove the skrull attribute (captureCode)
  delete hero.captured;
  villainCard.heroAttack = 0;

  // Add the hero to the player's discard pile
  playerDiscardPile.push(hero);

  onscreenConsole.log(
    `<span class="console-highlights">${hero.name}</span> has been rescued from <span class="console-highlights">Skrull Queen Veranke</span> and added to your discard pile.`,
  );

  // Update the game board to reflect the changes
  updateGameBoard();
}

function escapeSkrullQueen(escapedVillain) {
  onscreenConsole.log(
    `Escape! <span class="console-highlights">Skrull Queen Veranke</span> has escaped with her captured Hero.`,
  );

  // Find the hero in the Skrull deck with the same captureCode as the escaping villain
  const heroIndex = capturedCardsDeck.findIndex(
    (hero) => hero.captured === escapedVillain.captureCode,
  );

  if (heroIndex === -1) {
    console.log("Error. Unable to find the captured hero during escape.");
    return;
  }

  // Remove the hero from the Skrull deck and move it to the escaped villains deck
  const hero = capturedCardsDeck.splice(heroIndex, 1)[0];
  escapedVillainsDeck.push(hero); // You could push this to a deck for escaped villains

  escapedVillain.overlayTextAttack = "";
  escapedVillain.heroAttack = 0;

  // Update the game board to reflect the changes
  updateGameBoard();
}

function fightSkrullShapeshifters(villainCard) {
  onscreenConsole.log(`Fight! Gain the captured Hero.`);

  // Find the hero in the Skrull deck with the same captureCode as the villain being fought
  const heroIndex = capturedCardsDeck.findIndex(
    (hero) => hero.captured === villainCard.captureCode,
  );

  villainCard.overlayTextAttack = "";
  villainCard.heroAttack = 0;

  if (heroIndex === -1) {
    onscreenConsole.log("No captured Hero to rescue.");
    return;
  }

  // Remove the hero from the Skrull deck
  const hero = capturedCardsDeck.splice(heroIndex, 1)[0];

  // Remove the skrull attribute (captureCode) from the hero (no longer captured)
  delete hero.captured;

  // Add the hero to the player's discard pile
  playerDiscardPile.push(hero);

  onscreenConsole.log(
    `<span class="console-highlights">${hero.name}</span> has been rescued from <span class="console-highlights">Skrull Shapeshifters</span> and added to your discard pile.`,
  );

  // Update the game board to reflect the changes
  updateGameBoard();
}

function escapeSkrullShapeshifter(escapedVillain) {
  onscreenConsole.log(
    `Escape! <span class="console-highlights">Skrull Shapeshifters</span> have escaped with their captured Hero.`,
  );

  // Find the hero in the Skrull deck with the same captureCode as the escaping villain
  const heroIndex = capturedCardsDeck.findIndex(
    (hero) => hero.captured === escapedVillain.captureCode,
  );

  if (heroIndex === -1) {
    onscreenConsole.log(
      "Error. Unable to find the captured hero during escape.",
    );
    return;
  }

  // Remove the hero from the Skrull deck and move it to the escaped villains deck
  const hero = capturedCardsDeck.splice(heroIndex, 1)[0];
  escapedVillainsDeck.push(hero);
  escapedVillain.overlayTextAttack = "";
  escapedVillain.heroAttack = 0;

  // Update the game board to reflect the changes
  updateGameBoard();
}

function freeHeroGain() {
  updateGameBoard();
  onscreenConsole.log(`Fight! Choose a Hero in the HQ to gain.`);

  return new Promise((resolve, reject) => {
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
    titleElement.textContent = "Gain a Hero";
    instructionsElement.textContent = "Choose a Hero in the HQ and gain it.";

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

        // Determine eligibility - must be a Hero (has classes defined) AND not destroyed
        const isHero =
          hero.classes !== undefined &&
          hero.classes !== null &&
          hero.classes.length > 0;
        const isDestroyed = explosionValue >= 6;
        const isEligible = isHero && !isDestroyed;

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
              instructionsElement.textContent =
                "Choose a Hero in the HQ and gain it.";
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be gained.`;
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
        hero.classes !== undefined &&
        hero.classes !== null &&
        hero.classes.length > 0 &&
        explosionValue < 6
      ); // Not destroyed
    });

    if (eligibleHeroes.length === 0) {
      onscreenConsole.log("No available Heroes to gain.");
      resolve(); // Resolve immediately if there are no heroes to recruit
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
    confirmButton.textContent = "Gain Hero";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(() => {
        const hero = hq[selectedHQIndex];

        // Recruit the hero using the original function
        recruitHeroConfirmed(hero, selectedHQIndex);
        totalRecruitPoints += hero.cost;

        console.log("Selected Hero for recruit:", hero.name);

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

function chooseToGainSHIELDOfficer() {
  onscreenConsole.log(
    `Fight! You may gain a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`,
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `Do you wish to gain a <span class="bold-spans">S.H.I.E.L.D. Officer</span>?`,
        "Gain Officer",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "HYDRA KIDNAPPERS";

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
          "url('Visual Assets/Heroes/SHIELD/shieldofficer.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      const cleanup = () => {
        closeInfoChoicePopup();
        resolve();
      };

      confirmButton.onclick = function () {
        drawSHIELDOfficer();
        cleanup();
      };

      denyButton.onclick = function () {
        onscreenConsole.log(
          `No <span class="console-highlights">S.H.I.E.L.D. Officer</span> gained.`,
        );
        cleanup();
      };
    }, 10);
  });
}

function drawSHIELDOfficer() {
  if (shieldOfficers.length > 0) {
    const shieldOfficer = shieldOfficers.pop();
    playerDiscardPile.push(shieldOfficer);
    console.log(
      `<span class="console-highlights">S.H.I.E.L.D. Officer</span> gained.`,
    );
    updateGameBoard();
  } else {
    console.log("No S.H.I.E.L.D. Officers left to recruit.");
  }
}

async function sewersWound() {
  if (currentVillainLocation === 4) {
    onscreenConsole.log(
      'Fight! You defeated <span class="console-highlights">The Lizard</span> in the Sewers.',
    );
    await woundAvoidance();
    if (hasWoundAvoidance) {
      onscreenConsole.log(
        `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
      );
      hasWoundAvoidance = false;
      return;
    }
    drawWound();
  } else {
    onscreenConsole.log(
      'Fight! You defeated <span class="console-highlights">The Lizard</span> outside of the Sewers and avoid gaining a Wound.',
    );
  }
}

async function streetsOrBridgeBystanders() {
  if (currentVillainLocation === 0 || currentVillainLocation === 1) {
    onscreenConsole.log(
      `Fight! You fought <span class="console-highlights">Abomination</span> on the Streets or Bridge.`,
    );
    await rescueBystander();
    await rescueBystander();
    await rescueBystander();
  } else {
    onscreenConsole.log(
      `Fight! You fought <span class="console-highlights">Abomination</span> outside of the Streets or Bridge. No Bystanders rescued.`,
    );
  }
}

function KOAllSHIELD() {
  onscreenConsole.log(
    `Fight! KO all your <img src="Visual Assets/Icons/S.H.I.E.L.D..svg" alt="SHIELD Icon" class="console-card-icons"> Heroes.`,
  );

  let shieldKOCounter = 0; // Counter to track how many S.H.I.E.L.D. cards are KO'd

  // KO S.H.I.E.L.D. cards from player's hand
  for (let i = playerHand.length - 1; i >= 0; i--) {
    if (playerHand[i].team === "S.H.I.E.L.D.") {
      // Move the card to the KO pile
      koPile.push(playerHand.splice(i, 1)[0]);
      shieldKOCounter++; // Increment the counter
      koBonuses();
    }
  }

  // KO S.H.I.E.L.D. cards from cards played this turn
  for (let i = cardsPlayedThisTurn.length - 1; i >= 0; i--) {
    if (
      cardsPlayedThisTurn[i].team === "S.H.I.E.L.D." &&
      !cardsPlayedThisTurn[i].markedToDestroy
    ) {
      // Get reference to original card
      const originalCard = cardsPlayedThisTurn[i];

      // Create marked duplicate
      const markedDuplicate = { ...originalCard, markedToDestroy: true };

      // Replace original with marked duplicate in cardsPlayedThisTurn
      cardsPlayedThisTurn[i] = markedDuplicate;

      // Move original to KO pile
      koPile.push(originalCard);

      shieldKOCounter++; // Increment the counter
      koBonuses();
    }
  }

  if (shieldKOCounter > 0) {
    const cardText = shieldKOCounter === 1 ? "card" : "cards"; // Determine singular or plural
    onscreenConsole.log(
      `KO'd ${shieldKOCounter} <img src="Visual Assets/Icons/S.H.I.E.L.D..svg" alt="SHIELD Icon" class="console-card-icons"> ${cardText}.`,
    );
  } else {
    onscreenConsole.log(
      'No <img src="Visual Assets/Icons/S.H.I.E.L.D..svg" alt="SHIELD Icon" class="console-card-icons"> cards available to KO.',
    );
  }

  updateGameBoard();
}

function rooftopsOrBridgeKOs() {
  if (currentVillainLocation === 0 || currentVillainLocation === 2) {
    onscreenConsole.log(
      `Fight! You fought <span class="console-highlights">Whirlwind</span> on the Rooftops or Bridge. KO two of your Heroes.`,
    );
    chooseHeroesToKO();
  } else {
    onscreenConsole.log(
      `Fight! You fought <span class="console-highlights">Whirlwind</span> outside of the Rooftops or Bridge. No Heroes are KO'd.`,
    );
  }
}

function strengthHeroesNumberToKO() {
  onscreenConsole.log(
    'Fight! For each of your <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Heroes, KO one of your Heroes.',
  );
  return new Promise((resolve, reject) => {
    // Get references to the actual card objects from the game arrays
    const availableHeroes = [...cardsPlayedThisTurn, ...playerHand].filter(
      (card) =>
        card &&
        card.type === "Hero" &&
        (card.fromHand || (!card.isCopied && !card.sidekickToDestroy)),
    );

    if (availableHeroes.length === 0) {
      onscreenConsole.log("No Heroes available to KO.");
      resolve();
      return;
    }

    // Find all Strength Heroes
    const strengthHeroes = [...cardsPlayedThisTurn, ...playerHand].filter(
      (card) => card && card.classes && card.classes.includes("Strength"),
    );

    const numberToKO = strengthHeroes.length;

    if (numberToKO === 0) {
      onscreenConsole.log(
        'No <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Heroes found. No cards need to be KO\'d.',
      );
      resolve();
      return;
    }

    onscreenConsole.log(
      `You have ${numberToKO} <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero${numberToKO > 1 ? "es" : ""}. You must KO ${numberToKO} card${numberToKO > 1 ? "s" : ""}.`,
    );

    if (availableHeroes.length <= numberToKO) {
      availableHeroes.forEach((card) => {
        // More robust card finding using unique identifier
        const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(
          (c) => c.id === card.id && c.name === card.name,
        );
        const indexInHand = playerHand.findIndex(
          (c) => c.id === card.id && c.name === card.name,
        );

        if (indexInCardsPlayed !== -1) {
          card.markedToDestroy = true;
        } else if (indexInHand !== -1) {
          const koedCard = playerHand.splice(indexInHand, 1)[0];
          koPile.push(koedCard);
        }

        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> has been KO'd.`,
        );
        koBonuses();
      });
      updateGameBoard();
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
    titleElement.textContent = "Maestro";
    instructionsElement.innerHTML = `Select ${numberToKO} Hero${numberToKO > 1 ? "es" : ""} to KO.`;

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

    let selectedHeroes = [];
    let isDragging = false;

    // Separate cards by location for display
    const handHeroes = availableHeroes.filter((card) =>
      playerHand.some((c) => c.id === card.id),
    );
    const playedHeroes = availableHeroes.filter((card) =>
      cardsPlayedThisTurn.some((c) => c.id === card.id),
    );

    // Sort the arrays for display
    genericCardSort(handHeroes);
    genericCardSort(playedHeroes);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedHeroes.length !== numberToKO;

      if (selectedHeroes.length < numberToKO) {
        const remaining = numberToKO - selectedHeroes.length;
        instructionsElement.innerHTML = `Select ${remaining} more Hero${remaining > 1 ? "es" : ""} to KO.`;
      } else {
        // Format the list of names with proper English conjunctions
        let namesList;
        if (selectedHeroes.length === 1) {
          namesList = `<span class="console-highlights">${selectedHeroes[0].name}</span>`;
        } else if (selectedHeroes.length === 2) {
          namesList = `<span class="console-highlights">${selectedHeroes[0].name}</span> and <span class="console-highlights">${selectedHeroes[1].name}</span>`;
        } else {
          // For 3+ items, use Oxford comma style
          const allButLast = selectedHeroes
            .slice(0, -1)
            .map(
              (hero) => `<span class="console-highlights">${hero.name}</span>`,
            )
            .join(", ");
          const last = `<span class="console-highlights">${selectedHeroes[selectedHeroes.length - 1].name}</span>`;
          namesList = `${allButLast}, and ${last}`;
        }
        instructionsElement.innerHTML = `Selected: ${namesList} will be KO'd.`;
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

      // Check if this card is currently selected
      const isSelected = selectedHeroes.some((h) => h.id === card.id);
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

        // Only change background if not all required cards are selected
        if (selectedHeroes.length < numberToKO) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if not all required cards are selected AND we're not hovering over another card
        if (selectedHeroes.length < numberToKO) {
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

      // Selection click handler - multiple selection allowed (up to numberToKO)
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const index = selectedHeroes.findIndex((h) => h.id === card.id);
        if (index > -1) {
          // Deselect
          selectedHeroes.splice(index, 1);
          cardImage.classList.remove("selected");
        } else {
          if (selectedHeroes.length >= numberToKO) {
            // Remove the first selected card (FIFO)
            const firstSelectedId = selectedHeroes[0].id;
            selectedHeroes.shift();

            // Update the visual state of the first selected card
            const firstSelectedElement = document.querySelector(
              `[data-card-id="${firstSelectedId}"] img`,
            );
            if (firstSelectedElement) {
              firstSelectedElement.classList.remove("selected");
            }
          }

          // Select new card
          selectedHeroes.push(card);
          cardImage.classList.add("selected");
        }

        // Update preview to show last selected card, or clear if none selected
        previewElement.innerHTML = "";
        if (selectedHeroes.length > 0) {
          const lastSelected = selectedHeroes[selectedHeroes.length - 1];
          const previewImage = document.createElement("img");
          previewImage.src = lastSelected.image;
          previewImage.alt = lastSelected.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        } else {
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    // Populate row1 with Hand heroes
    handHeroes.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Played Cards heroes
    playedHeroes.forEach((card) => {
      createCardElement(card, "played", selectionRow2);
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
    confirmButton.textContent = `KO ${numberToKO} HERO${numberToKO > 1 ? "ES" : ""}`;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHeroes.length !== numberToKO) return;

      setTimeout(() => {
        selectedHeroes.forEach((card) => {
          // More robust card finding using multiple properties
          const indexInCardsPlayed = cardsPlayedThisTurn.findIndex(
            (c) => c.id === card.id && c.name === card.name,
          );
          const indexInHand = playerHand.findIndex(
            (c) => c.id === card.id && c.name === card.name,
          );

          if (indexInCardsPlayed !== -1) {
            const koedCard = cardsPlayedThisTurn.splice(
              indexInCardsPlayed,
              1,
            )[0];
            koPile.push(koedCard);
          } else if (indexInHand !== -1) {
            const koedCard = playerHand.splice(indexInHand, 1)[0];
            koPile.push(koedCard);
          }

          onscreenConsole.log(
            `<span class="console-highlights">${card.name}</span> has been KO'd.`,
          );
          koBonuses();
        });

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

function koAnyNumberOfWounds() {
  onscreenConsole.log(
    `Fight! KO any number of Wounds from your hand or discard pile.`,
  );

  return new Promise((resolve) => {
    const handWounds = playerHand.filter(card => card.type === "Wound");
    const discardWounds = playerDiscardPile.filter(card => card.type === "Wound");

    const combinedWounds = [
      ...handWounds.map((card) => ({ card, source: "hand" })),
      ...discardWounds.map((card) => ({ card, source: "discard" }))
    ];

    if (combinedWounds.length === 0) {
      onscreenConsole.log("No Wounds in your hand or discard pile to KO.");
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
    titleElement.textContent = "Ymir, Frost Giant King";
    instructionsElement.textContent =
      "Select any number of Wounds from your hand and/or discard pile to KO.";

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

    // Use a Map to track selections by unique identifier since IDs are undefined
    let selectedCards = new Map(); // key: unique identifier, value: { card, element, source }
    let isDragging = false;

    // Create a unique identifier for each card since IDs are undefined
    function getCardKey(card, source, index) {
      // Use combination of source, index, and card name to create unique key
      return `${source}-${index}-${card.name}`;
    }

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const selectedCount = selectedCards.size;
      
      confirmButton.disabled = selectedCount === 0;

      if (selectedCount === 0) {
        instructionsElement.textContent =
          "Select any number of Wounds from your hand and/or discard pile to KO.";
      } else {
        const woundNames = Array.from(selectedCards.values()).map(selection => 
          `<span class="console-highlights">${selection.card.name}</span>`
        ).join(', ');
        instructionsElement.innerHTML = `Selected ${selectedCount} Wound(s): ${woundNames} will be KO'd.`;
      }

      confirmButton.textContent = selectedCount > 0 ? 
        `KO ${selectedCount} WOUND${selectedCount > 1 ? 'S' : ''}` : 
        "KO WOUNDS";
    }

    // Create card element helper function
    function createCardElement(card, source, row, index) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      const cardKey = getCardKey(card, source, index);
      cardElement.setAttribute("data-card-key", cardKey);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = card.image;
        previewImage.alt = card.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);
        if (selectedCards.size === 0) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;
        if (selectedCards.size === 0) {
          setTimeout(() => {
            const isHoveringAnyCard = selectionRow1.querySelector(":hover") || selectionRow2.querySelector(":hover");
            if (!isHoveringAnyCard && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Click handler using unique keys
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (selectedCards.has(cardKey)) {
          // Deselect
          const selection = selectedCards.get(cardKey);
          selection.element.classList.remove("selected");
          selectedCards.delete(cardKey);
        } else {
          // Select
          selectedCards.set(cardKey, { card, element: cardImage, source });
          cardImage.classList.add("selected");
        }

        updateUI();

        // Update preview
        previewElement.innerHTML = "";
        if (selectedCards.size > 0) {
          const lastSelected = Array.from(selectedCards.values()).pop();
          const previewImage = document.createElement("img");
          previewImage.src = lastSelected.card.image;
          previewImage.alt = lastSelected.card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        } else {
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        }
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    // Populate rows
    const sortedHand = [...handWounds];
    const sortedDiscard = [...discardWounds];
    genericCardSort(sortedHand);
    genericCardSort(sortedDiscard);

    sortedHand.forEach((card, index) => {
      createCardElement(card, "hand", selectionRow1, index);
    });

    sortedDiscard.forEach((card, index) => {
      createCardElement(card, "discard", selectionRow2, index);
    });

    // Set up drag scrolling
    setupDragScrolling(selectionRow1);
    setupDragScrolling(selectionRow2);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById("card-choice-popup-otherchoice");
    const noThanksButton = document.getElementById("card-choice-popup-nothanks");

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "KO WOUNDS";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (selectedCards.size === 0) return;

      setTimeout(() => {
        let koCount = 0;
        const selectedArray = Array.from(selectedCards.values());

        selectedArray.forEach((selection) => {
          const { card, source } = selection;
          
          if (source === "hand") {
            // Find the exact card reference in playerHand
            const handIndex = playerHand.findIndex(c => 
              c.type === "Wound" && c.name === card.name
            );
            if (handIndex !== -1) {
              const koedCard = playerHand.splice(handIndex, 1)[0];
              koPile.push(koedCard);
              koCount++;
            }
          } else if (source === "discard") {
            // Find the exact card reference in playerDiscardPile
            const discardIndex = playerDiscardPile.findIndex(c => 
              c.type === "Wound" && c.name === card.name
            );
            if (discardIndex !== -1) {
              const koedCard = playerDiscardPile.splice(discardIndex, 1)[0];
              koPile.push(koedCard);
              koCount++;
            }
          }
        });

        if (koCount > 0) {
          const woundNames = selectedArray.map(selection => selection.card.name).join(', ');
          onscreenConsole.log(`<span class="console-highlights">${woundNames}</span> ${koCount === 1 ? 'has' : 'have'} been KO'd.`);
          koBonuses();
        }

        updateGameBoard();
        closeCardChoicePopup();
        resolve();
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log("No Wounds were KO'd.");
      closeCardChoicePopup();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function doubleVillainDraw() {
  onscreenConsole.log(
    `<span style="font-style:italic">Playing the top two cards of the Villain Deck...</span>`,
  );
  // Process cards one at a time, fully completing each before moving to next
  await processVillainCard();
  await processVillainCard();
}

async function bankRobbery() {
  const cityIndex = 3; // Specifically targeting city index 3

  return new Promise((resolve, reject) => {
    try {
      // Check if there is a villain at the specified city index
      if (city[cityIndex] && city[cityIndex].type === "Villain") {
        // Check if there are any bystanders left in the deck
        if (bystanderDeck.length === 0) {
          onscreenConsole.log("No Bystanders left to capture.");
          resolve(); // Resolve the promise to continue after logging
          return;
        }

        // Attach the first bystander if available
        const firstBystander = bystanderDeck.pop();
        attachBystanderToVillain(cityIndex, firstBystander);
        console.log(
          `Bystander assigned to ${city[cityIndex].name} at index ${cityIndex}.`,
        );

        // Attach the second bystander if available
        if (bystanderDeck.length > 0) {
          const secondBystander = bystanderDeck.pop();
          attachBystanderToVillain(cityIndex, secondBystander);
          console.log(
            `Second bystander assigned to ${city[cityIndex].name} at index ${cityIndex}.`,
          );
        } else {
          onscreenConsole.log("Only one Bystander was available to capture.");
        }

        // Update the game state/UI as needed
        updateGameBoard();
        resolve(); // Resolve the promise after the board is updated
      } else {
        console.log(
          `No villain found at city index ${cityIndex}. Bystanders not assigned.`,
        );
        resolve(); // Resolve even if no villain is found
      }
    } catch (error) {
      console.error("Error in bankRobbery function:", error);
      reject(error); // Reject the promise if an error occurs
    }
  })
    .then(() => {
      // Draw the next villain card after everything is done
      drawVillainCard();
    })
    .catch((error) => {
      // Handle any errors that occurred
      console.error("Error during bankRobbery process:", error);
    });
}

function drawMultipleVillainCards(count) {
  let promiseChain = Promise.resolve();

  for (let i = 0; i < count; i++) {
    promiseChain = promiseChain.then(() => drawVillainCard());
  }

  return promiseChain;
}

async function darkPortal() {
  const twistCount = koPile.filter(
    (item) => item.type === "Scheme Twist",
  ).length;

  switch (twistCount) {
    case 1:
      console.log(
        "A dark portal opens beneath the Mastermind. They gain 1 Attack.",
      );
      mastermindPermBuff++;
      darkPortalMastermind = true;
      break;
    case 2:
      console.log(
        "A dark portal opens beneath the Bridge. Villains on the Bridge gain 1 Attack.",
      );
      city1PermBuff++;
      darkPortalSpaces[0] = true;
      break;
    case 3:
      console.log(
        "A dark portal opens beneath the Streets. Villains on the Streets gain 1 Attack.",
      );
      city2PermBuff++;
      darkPortalSpaces[1] = true;
      break;
    case 4:
      console.log(
        "A dark portal opens above the Rooftops. Villains on the Rooftops gain 1 Attack.",
      );
      city3PermBuff++;
      darkPortalSpaces[2] = true;
      break;
    case 5:
      console.log(
        "A dark portal opens within the Bank. Villains in the Bank gain 1 Attack.",
      );
      city4PermBuff++;
      darkPortalSpaces[3] = true;
      break;
    case 6:
      console.log(
        "A dark portal opens within the Sewers. Villains within the Sewers gain 1 Attack.",
      );
      city5PermBuff++;
      darkPortalSpaces[4] = true;
      break;
    case 7:
      console.log("Dark portals have opened across the entire city!");
      break;
    default:
      console.log("No Scheme Twist effect at this time.");
      break;
  }

  updateGameBoard(); // Assuming this function updates the game board or UI
}

async function cosmicCube() {
  const twistCount = koPile.filter(
    (item) => item.type === "Scheme Twist",
  ).length;

  if (twistCount < 5) {
    console.log("Nothing happens at this time.");
  } else if (twistCount <= 6) {
    console.log("Scheme Twist!");
    drawWound();
  } else if (twistCount === 7) {
    console.log("Scheme Twist!");
    drawWound();
    drawWound();
    drawWound();
  } else {
    console.log("No other Scheme Twist effects.");
  }

  updateGameBoard(); // Update game board after changes
}

async function KOAllHeroesInHQ() {
  let heroesKOCounter = 0;

  for (let i = hq.length - 1; i >= 0; i--) {
    if (hq[i] && hq[i].type === "Hero") {
      koPile.push(hq.splice(i, 1)[0]);
      heroesKOCounter++;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (!hq[i] && heroDeck.length > 0) {
      hq[i] = heroDeck.pop();
    }
  }

  if (heroesKOCounter > 0) {
    const cardText = heroesKOCounter === 1 ? "Hero" : "Heroes";
    console.log(`KO'd ${heroesKOCounter} ${cardText} from the HQ.`);
  } else {
    console.log("No Heroes found in the HQ to KO.");
  }

  updateGameBoard(); // Update game board after changes
}

async function killbotAttackIncrease() {
  stackedTwistNextToMastermind++;
  killbotAttack++;
  console.log(`Killbot attack increased to ${killbotAttack}`);
  updateGameBoard(); // Optional, if this should update the UI
}

async function highestCostHeroSkrulled() {
  // Identify the heroes in HQ
  const heroesInHQ = hq.filter((card) => card && card.type === "Hero");

  // Find the highest cost among the heroes
  const maxCost = Math.max(...heroesInHQ.map((hero) => hero.cost));

  // Filter heroes with the highest cost
  const highestCostHeroes = heroesInHQ.filter((hero) => hero.cost === maxCost);

  // If there's only one hero with the highest cost, capture it automatically
  if (highestCostHeroes.length === 1) {
    heroSkrulled(highestCostHeroes[0]);
  } else if (highestCostHeroes.length > 1) {
    // If there are multiple heroes with the same highest cost, prompt the player to choose
    const selectedHero = await showHeroSelectionSkrullPopup(highestCostHeroes);
    heroSkrulled(selectedHero);
  } else {
    console.log("No heroes available in HQ.");
  }
}

function heroSkrulled(hero) {
  hero.skrulled = true;
  hero.originalAttack = hero.attack;
  hero.attack = 0;
  hero.type = "Villain";
  hero.fightEffect = "unskrull";

  // Move the hero to the Villain deck
  villainDeck.push(hero);

  // Replace the hero's HQ space with the top card from the hero deck, if available
  const heroIndex = hq.indexOf(hero);
  hq[heroIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;

  // Check if the HQ space is empty after drawing
  if (!hq[heroIndex]) {
    showHeroDeckEmptyPopup();
  }

  drawVillainCard();

  // Attach an overlay to the villain
  hero.overlayText = `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">SKRULL</span>`;

  // Update the game board to reflect the changes
  updateGameBoard();
}

function showHeroSelectionSkrullPopup(heroes) {
  updateGameBoard();
  return new Promise((resolve, reject) => {
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
    titleElement.textContent = "Skrull Hero";
    instructionsElement.textContent =
      "Choose a Hero from the HQ to enter the city as a Skrull.";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedHQIndex = null;
    let selectedCell = null;

    // Find the highest cost among the provided heroes
    const highestCost = Math.max(...heroes.map((hero) => hero.cost));

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

        // Determine eligibility - must be in the provided heroes array AND have the highest cost AND not be destroyed
        const isInProvidedHeroes = heroes.some(
          (h) => (h.id ?? h.uniqueId) === (hero.id ?? hero.uniqueId),
        );
        const hasHighestCost = hero.cost === highestCost;
        const isDestroyed = explosionValue >= 6;
        const isEligible = isInProvidedHeroes && hasHighestCost && !isDestroyed;

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
              instructionsElement.textContent =
                "Choose a Hero from the HQ to enter the city as a Skrull.";
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will enter as a Skrull.`;
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

    // Check if any eligible heroes exist (heroes with highest cost that aren't destroyed)
    const eligibleHeroes = hq.filter((hero, index) => {
      const explosionValue = explosionValues[index] || 0;
      const isInProvidedHeroes = heroes.some(
        (h) => (h.id ?? h.uniqueId) === (hero.id ?? hero.uniqueId),
      );
      return (
        hero &&
        isInProvidedHeroes &&
        hero.cost === highestCost &&
        explosionValue < 6
      ); // Not destroyed
    });

    if (eligibleHeroes.length === 0) {
      onscreenConsole.log("No eligible Heroes available for Skrull selection.");
      reject("No eligible heroes");
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
    confirmButton.textContent = "Select Hero";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(() => {
        const hero = hq[selectedHQIndex];
        if (hero) {
          console.log("Selected Hero for Skrull:", hero.name);
        }
        closeHQCityCardChoicePopup();
        resolve(hero);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function unskrull(villainCard) {
  if (!villainCard) return;

  // Transform back to hero
  villainCard.attack = villainCard.originalAttack;
  villainCard.skrulled = false;
  villainCard.wasSkrulled = true;
  villainCard.fightEffect = "";
  villainCard.type = "Hero";
  villainCard.overlayTextAttack = "";

  // Since we never added it to victory pile, just add to discard
  playerDiscardPile.push(villainCard);

  onscreenConsole.log(
    `<span class="console-highlights">${villainCard.name}</span> has been rescued from the Skrulls and added to your discard pile.`,
  );
  updateGameBoard();
}

async function discardAvoidance() {
  const allPlayerCards = [...playerHand, ...cardsPlayedThisTurn];

  if (
    allPlayerCards.filter(
      (card) => card.name === "Iceman - Impenetrable Ice Wall",
    ).length === 0
  ) {
    return false; // No Iceman, resolve immediately with false
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          "DO YOU WISH TO REVEAL THIS CARD TO AVOID DISCARDING A CARD?",
          "Yes",
          "No",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "Iceman - Impenetrable Ice Wall";

        // Use preview area for card image
        const previewArea = document.querySelector(
          ".info-or-choice-popup-preview",
        );
        const ICEMAN_IMAGE =
          "Visual Assets/Heroes/Dark City/DarkCity_Iceman_ImpenetrableIceWall.webp";
        if (previewArea && ICEMAN_IMAGE) {
          previewArea.style.backgroundImage = `url('${ICEMAN_IMAGE}')`;
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          hasDiscardAvoidance = true;
          closeInfoChoicePopup();
          resolve(true); // Resolve with true if confirmed
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal <span class="console-highlights">Iceman - Impenetrable Ice Wall</span>.`,
          );
          closeInfoChoicePopup();
          resolve(false); // Resolve with false if denied
        };
      }, 10);
    });
  }
}

async function woundAvoidance() {
  const allPlayerCards = [...playerHand, ...cardsPlayedThisTurn];

  if (
    allPlayerCards.filter(
      (card) => card.name === "Iceman - Impenetrable Ice Wall",
    ).length === 0
  ) {
    return false; // No Iceman, return false immediately
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          "DO YOU WISH TO REVEAL THIS CARD TO AVOID GAINING A WOUND?",
          "Yes",
          "No",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "Iceman - Impenetrable Ice Wall";

        // Use preview area for card image
        const previewArea = document.querySelector(
          ".info-or-choice-popup-preview",
        );
        const ICEMAN_IMAGE =
          "Visual Assets/Heroes/Dark City/DarkCity_Iceman_ImpenetrableIceWall.webp";
        if (previewArea && ICEMAN_IMAGE) {
          previewArea.style.backgroundImage = `url('${ICEMAN_IMAGE}')`;
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          hasWoundAvoidance = true;
          closeInfoChoicePopup();
          resolve(true); // Resolve with true when confirmed
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal <span class="console-highlights">Iceman - Impenetrable Ice Wall</span>.`,
          );
          closeInfoChoicePopup();
          resolve(false); // Resolve with false when denied
        };
      }, 10);
    });
  }
}

async function genericDiscardChoice() {
  await discardAvoidance();
  if (hasDiscardAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided discarding.`,
    );
    hasDiscardAvoidance = false;
    return false;
  }

  if (playerHand.length === 0) {
    console.log("No cards in hand to discard.");
    onscreenConsole.log(`No cards available to be discarded.`);
    updateGameBoard();
    return false;
  }

  return new Promise(async (resolve) => {
    // Setup UI elements for new popup structure
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

    // Set popup content
    titleElement.textContent = "DISCARD!";
    instructionsElement.textContent = "Select a card to discard.";

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
    let startX, startY, scrollLeft, startTime;

    // Create a sorted copy for display only
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card in hand
    sortedHand.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview only if no card is selected
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

        if (selectedCard && selectedCard.id === cardId) {
          // Deselect if same card clicked
          selectedCard = null;
          selectedCardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Clear previous selection if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
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

        // Update confirm button state and instructions
        document.getElementById("card-choice-popup-confirm").disabled =
          selectedCard === null;
        updateInstructions();
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    function updateInstructions() {
      if (selectedCard === null) {
        instructionsElement.textContent = "Select a card to discard.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be discarded.`;
      }
    }

    if (sortedHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedHand.length > 5) {
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

    // Disable confirm initially and hide other buttons
    confirmButton.disabled = true;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Update confirm button text to match original
    confirmButton.textContent = "Discard Card";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeCardChoicePopup();
      if (!selectedCard) return;

      setTimeout(async () => {
        // Find the actual index in the original playerHand array
        const actualIndex = playerHand.indexOf(selectedCard);
        if (actualIndex !== -1) {
          const discardedCard = playerHand.splice(actualIndex, 1)[0];
          console.log("Card discarded:", discardedCard);

          const { returned } =
            await checkDiscardForInvulnerability(discardedCard);
          if (returned.length) {
            playerHand.push(...returned);
          }

          updateGameBoard();
          closeCardChoicePopup();
          resolve(true);
        } else {
          console.error("Selected card not found in playerHand");

          resolve(false);
        }
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}