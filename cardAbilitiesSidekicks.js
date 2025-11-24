// Card Abilities for Sidekicks
//24.11.2025 17.35

function returnToSidekickDeck(card) {
  if (!card) {
    console.error("No card provided to returnToSidekickDeck.");
    return;
  }

  // Clone the card within the `cardsPlayedThisTurn` array
  let clonedCard = { ...card }; // Creates a shallow copy of the card object

  // Move one copy to the bottom of the sidekick deck
  sidekickDeck.unshift(clonedCard);

  // Mark the remaining copy in `cardsPlayedThisTurn` for destruction
  card.sidekickToDestroy = true;
  updateGameBoard();
}

function sidekickExtraDraw() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Sidekick");
  if (!playedSidekick) {
    console.error("No sidekick card found in cardsPlayedThisTurn.");
    return;
  }

  if (autoSuperpowers) {
    // If autoSuperpowers is true, activate the superpower automatically
    onscreenConsole.log(
      `<span class="console-highlights">Sidekick</span> played. Special Ability activated.`,
    );
    extraDraw();
    extraDraw();
    returnToSidekickDeck(playedSidekick);
    updateGameBoard();
  } else {
    // If autoSuperpowers is false, ask the player if they want to activate the superpower
    return new Promise((resolve, reject) => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `DO YOU WISH TO ACTIVATE <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Special Ability?`,
        "Yes",
        "No",
      );

      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('${playedSidekick.image}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        try {
          onscreenConsole.log(`Sidekick played. Special Ability activated.`);
          extraDraw();
          extraDraw();
          returnToSidekickDeck(playedSidekick);
          updateGameBoard();
          resolve();
        } catch (error) {
          reject(error);
        }
        closeInfoChoicePopup();
      };

      denyButton.onclick = () => {
        onscreenConsole.log(
          `You have chosen not to activate <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Special Ability.`,
        );
        closeInfoChoicePopup();
        resolve();
      };
    });
  }
}

function hairballExtraDraw() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Hairball");
  if (!playedSidekick) {
    console.error("No sidekick card found in cardsPlayedThisTurn.");
    return;
  }

  onscreenConsole.log(
    `<span class="console-highlights">Hairball</span> played. Special Ability activated.`,
  );
  extraDraw();
  returnToSidekickDeck(playedSidekick);
  updateGameBoard();
}

async function msLionBystanderAndDraw() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Ms. Lion");
  if (!playedSidekick) {
    console.error("No sidekick card found in cardsPlayedThisTurn.");
    return;
  }

  onscreenConsole.log(
    `<span class="console-highlights">Ms. Lion</span> played. Special Ability activated.`,
  );
  await rescueBystander();
  extraDraw();
  returnToSidekickDeck(playedSidekick);
  updateGameBoard();
}

function lockheedBonusAttack() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Lockheed");
  if (!playedSidekick) {
    console.error("No sidekick card found in cardsPlayedThisTurn.");
    return;
  }

  onscreenConsole.log(
    `<span class="console-highlights">Lockheed</span> played.`,
  );
  if (
    cardsPlayedThisTurn.filter(
      (card) => card.classes && card.classes.includes("Range"),
    ).length > 1
  ) {
    totalAttackPoints += 1;
    cumulativeAttackPoints += 1;
    onscreenConsole.log(
      `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
    );
    onscreenConsole.log(
      `+1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  } else {
    onscreenConsole.log(
      `A <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> hero has not been played. No additional <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  }
  returnToSidekickDeck(playedSidekick);
  updateGameBoard();
}

function darwinAttackOrRecruit() {
  if (cardsPlayedThisTurn.length === 0) {
    console.warn("No cards have been played this turn.");
    return;
  }

  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Darwin");
  if (!playedSidekick) {
    console.error("No sidekick card found in cardsPlayedThisTurn.");
    return;
  }

  // Get the last played card
  let lastPlayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 2];

  if (
    lastPlayedCard.attackIcon === true &&
    lastPlayedCard.recruitIcon === true
  ) {
    totalAttackPoints += 2;
    cumulativeAttackPoints += 2;
    totalRecruitPoints += 2;
    cumulativeRecruitPoints += 2;
    onscreenConsole.log(
      `You last played  <span class="console-highlights">${lastPlayedCard.name}</span>. It had both <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icons. +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and +2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
    );
  } else if (lastPlayedCard.attackIcon === true) {
    totalAttackPoints += 2;
    cumulativeAttackPoints = +2;
    onscreenConsole.log(
      `You last played  <span class="console-highlights">${lastPlayedCard.name}</span>. It had an <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon. +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  } else if (lastPlayedCard.recruitIcon === true) {
    totalRecruitPoints += 2;
    cumulativeRecruitPoints = +2;
    onscreenConsole.log(
      `You last played  <span class="console-highlights">${lastPlayedCard.name}</span>. It had a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon. +2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
    );
  } else {
    onscreenConsole.log(
      `You last played  <span class="console-highlights">${lastPlayedCard.name}</span>. It did not have an <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> or <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon.`,
    );
  }

  // Update the game state
  returnToSidekickDeck(playedSidekick);
  updateGameBoard();
}

function throgHighRecruitReward() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Throg");
  if (!playedSidekick) {
    console.error("No sidekick card found in cardsPlayedThisTurn.");
    return;
  }

  if (cumulativeRecruitPoints >= 6) {
    onscreenConsole.log(
      `You have made at least 6 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> this turn. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
    totalAttackPoints += 2;
    cumulativeAttackPoints += 2;
  }

  returnToSidekickDeck(playedSidekick);
  updateGameBoard();
}

function lockjawPhasing() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Lockjaw");
  if (!playedSidekick) {
    console.error("No Lockjaw card found in cardsPlayedThisTurn.");
    return;
  }

  return new Promise((resolve, reject) => {
    // Show the popup to ask the player if they want to Phase or Play
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `DO YOU WISH TO PHASE OR PLAY <span class="console-highlights">${playedSidekick.name}</span>?`,
      "Phase",
      "Play",
    );

    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage = `url('${playedSidekick.image}')`;
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = () => {
      // Player chose to Phase
      try {
        if (playerDeck.length > 0) {
          // Swap Lockjaw with the top card of the playerDeck
          playSFX("phase");
          const topCard = playerDeck.pop(); // Remove the top card from the deck
          playerHand.push(topCard); // Add the top card to the player's hand
          playerDeck.push(playedSidekick); // Move Lockjaw to the top of the deck

          playedSidekick.revealed = true;

          // Remove Lockjaw from cardsPlayedThisTurn
          const lockjawIndex = cardsPlayedThisTurn.findIndex(
            (card) => card.name === "Lockjaw",
          );
          if (lockjawIndex !== -1) {
            cardsPlayedThisTurn.splice(lockjawIndex, 1);
          }

          // Deduct 2 from totalAttackPoints and cumulativeAttackPoints
          totalAttackPoints -= 2;
          cumulativeAttackPoints -= 2;

          onscreenConsole.log(
            `Phasing activated. ${topCard.name} added to hand, <span class="console-highlights">Lockjaw</span> moved to the top of the deck.`,
          );
        } else if (playerDiscardPile.length > 0) {
          // Shuffle the discard pile into the player deck if the deck is empty
          shuffleArray(discardPile);
          playerDeck = discardPile.slice(); // Copy the shuffled discard pile to the player deck
          discardPile = []; // Clear the discard pile
          onscreenConsole.log("Discard pile shuffled into the player deck.");

          if (playerDeck.length > 0) {
            playSFX("phase");
            const topCard = playerDeck.pop(); // Remove the top card from the deck
            playerHand.push(topCard); // Add the top card to the player's hand
            playerDeck.push(playedSidekick); // Move Lockjaw to the top of the deck

            playedSidekick.revealed = true;

            // Remove Lockjaw from cardsPlayedThisTurn
            const lockjawIndex = cardsPlayedThisTurn.findIndex(
              (card) => card.name === "Lockjaw",
            );
            if (lockjawIndex !== -1) {
              cardsPlayedThisTurn.splice(lockjawIndex, 1);
            }

            // Deduct 2 from totalAttackPoints and cumulativeAttackPoints
            totalAttackPoints -= 2;
            cumulativeAttackPoints -= 2;

            onscreenConsole.log(
              `Phasing activated. <span class="console-highlights">${topCard.name}</span> added to hand, <span class="console-highlights">Lockjaw</span> moved to the top of the deck.`,
            );
          } else {
            onscreenConsole.log(
              "Phasing not possible. No cards available to draw.",
            );
          }
        } else {
          onscreenConsole.log(
            "Phasing not possible. No cards available to draw.",
          );
        }
      } catch (error) {
        reject(error);
      }
      closeInfoChoicePopup();
      updateGameBoard();
      resolve();
    };

    denyButton.onclick = () => {
      // Player chose to Play
      try {
        returnToSidekickDeck(playedSidekick);

        // Do NOT remove Lockjaw from cardsPlayedThisTurn
        onscreenConsole.log(
          `You have chosen to play <span class="console-highlights">${playedSidekick.name}</span>.`,
        );
      } catch (error) {
        reject(error);
      }
      closeInfoChoicePopup();
      updateGameBoard();
      resolve();
    };
  });
}

function zabuKO() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Zabu");
  if (!playedSidekick) {
    console.error("No Zabu card found in cardsPlayedThisTurn.");
    return Promise.resolve(false);
  }

  onscreenConsole.log(
    `<span class="console-highlights">Zabu</span> played. Special Ability activated.`,
  );

  // Execute the KO logic and wait for it to complete
  return zabuKOChoice().then((kocard) => {
    if (kocard) {
      // After the KO logic is complete, return Zabu to the sidekick deck
      returnToSidekickDeck(playedSidekick);
      updateGameBoard();
      return true;
    }
    return false;
  });
}

function zabuKOChoice() {
  return new Promise((resolve) => {
    // Early exit if absolutely nothing to choose
    if (playerDiscardPile.length === 0 && playerHand.length === 0) {
      console.log("There are no cards available to KO.");
      onscreenConsole.log("There are no cards available to KO.");
      resolve(null);
      return;
    }

    // Grab new-popup elements
    const popup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");

    const titleEl = document.querySelector(".card-choice-popup-title");
    const instructionsEl = document.querySelector(
      ".card-choice-popup-instructions",
    );

    const row1Label = document.querySelector(
      ".card-choice-popup-selectionrow1label",
    );
    const row2Label = document.querySelector(
      ".card-choice-popup-selectionrow2label",
    );
    const row1Container = document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    );
    const row2Container = document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    );
    const row1 = document.querySelector(".card-choice-popup-selectionrow1");
    const row2 = document.querySelector(".card-choice-popup-selectionrow2");

    const previewEl = document.querySelector(".card-choice-popup-preview");

    const confirmBtn = document.getElementById("card-choice-popup-confirm");
    const otherChoiceBtn = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksBtn = document.getElementById("card-choice-popup-nothanks");
    const closeX = document.querySelector(".card-choice-popup-closebutton");

    // Configure two-row layout + content
    titleEl.textContent = "KO a Card";
    instructionsEl.textContent =
      "Select a card to KO from your Discard Pile or Hand:";

    // Make sure both rows/labels are visible and properly titled
    row1Label.style.display = "block";
    row2Label.style.display = "block";
    row1Container.style.display = "block";
    row2Container.style.display = "block";
    row2.style.display = "block";
    row1Label.textContent = "Discard Pile";
    row2Label.textContent = "Hand";
    row1Container.classList.remove("card-choice-single-row-design");

    // Show X if you like, but we’ll prefer NO THANKS as cancel
    closeX.style.display = "none";

    // Clear and reset visuals
    row1.innerHTML = "";
    row2.innerHTML = "";
    previewEl.innerHTML = "";
    previewEl.style.backgroundColor = "var(--panel-backgrounds)";

    // Buttons
    confirmBtn.disabled = true;
    confirmBtn.style.display = "inline-block";
    confirmBtn.textContent = "KO CARD";
    otherChoiceBtn.style.display = "none";
    noThanksBtn.style.display = "inline-block";

    // Local state
    let selectedCard = null;
    let selectedLocation = null; // 'discard' | 'hand'
    let selectedImg = null;
    let isDraggingRow1 = false;
    let isDraggingRow2 = false;

    // Helpers
    const enableConfirmIfValid = () => {
      confirmBtn.disabled = !(selectedCard && selectedLocation);
    };

    const setPreview = (card) => {
      previewEl.innerHTML = "";
      if (card) {
        const img = document.createElement("img");
        img.src = card.image;
        img.alt = card.name;
        img.className = "popup-card-preview-image";
        previewEl.appendChild(img);
        previewEl.style.backgroundColor = "var(--accent)";
      } else {
        previewEl.style.backgroundColor = "var(--panel-backgrounds)";
      }
    };

    const deselectCurrent = () => {
      if (selectedImg) selectedImg.classList.remove("selected");
      selectedCard = null;
      selectedLocation = null;
      selectedImg = null;
      setPreview(null);
      enableConfirmIfValid();
    };

    const buildCard = (card, location) => {
      const wrap = document.createElement("div");
      wrap.className = "popup-card";

      const img = document.createElement("img");
      img.src = card.image;
      img.alt = card.name;
      img.className = "popup-card-image";

      // Hover → preview (only when nothing selected; and not while dragging)
      const hoverIn = () => {
        if (
          (location === "discard" && isDraggingRow1) ||
          (location === "hand" && isDraggingRow2)
        )
          return;
        if (!selectedCard) {
          setPreview(card);
        }
      };
      const hoverOut = () => {
        if (!selectedCard) {
          // brief delay in case the pointer moves to another card
          setTimeout(() => {
            const container = location === "discard" ? row1 : row2;
            if (!container.querySelector(":hover")) {
              setPreview(null);
            }
          }, 50);
        }
      };

      wrap.addEventListener("mouseover", hoverIn);
      wrap.addEventListener("mouseout", hoverOut);

      wrap.addEventListener("click", (e) => {
        // Don’t select while dragging
        if (
          (location === "discard" && isDraggingRow1) ||
          (location === "hand" && isDraggingRow2)
        ) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (selectedCard === card && selectedLocation === location) {
          // Deselect
          deselectCurrent();
        } else {
          // Deselect previous
          if (selectedImg) selectedImg.classList.remove("selected");

          // Select new
          selectedCard = card;
          selectedLocation = location;
          selectedImg = img;
          img.classList.add("selected");

          setPreview(card);
          enableConfirmIfValid();
        }
      });

      wrap.appendChild(img);
      return wrap;
    };

    // Populate both rows (preserve original order; no sorting here)
    playerDiscardPile.forEach((card) => {
      row1.appendChild(buildCard(card, "discard"));
    });

    playerHand.forEach((card) => {
      row2.appendChild(buildCard(card, "hand"));
    });

    // Gradients + drag-scrolling
    if (typeof setupIndependentScrollGradients === "function") {
      setupIndependentScrollGradients(row1, row2);
    }
    if (typeof setupDragScrolling === "function") {
      // Wrap to track dragging per row
      const wrapDrag = (el, setFlag) => {
        // Assume your helper toggles internal state; here we mirror a simple guard
        let isDown = false;
        el.addEventListener("mousedown", () => {
          isDown = true;
          setFlag(true);
        });
        el.addEventListener("mouseleave", () => {
          if (isDown) setFlag(false);
          isDown = false;
        });
        el.addEventListener("mouseup", () => {
          setFlag(false);
          isDown = false;
        });
        setupDragScrolling(el);
      };
      wrapDrag(row1, (v) => {
        isDraggingRow1 = v;
      });
      wrapDrag(row2, (v) => {
        isDraggingRow2 = v;
      });
    }

    // Confirm → KO, log, bonuses, update
    confirmBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!selectedCard || !selectedLocation) return;

      let idx = -1;
      if (selectedLocation === "discard") {
        idx = playerDiscardPile.findIndex((c) => c && c.id === selectedCard.id);
        if (idx !== -1) playerDiscardPile.splice(idx, 1);
      } else {
        idx = playerHand.findIndex((c) => c && c.id === selectedCard.id);
        if (idx !== -1) playerHand.splice(idx, 1);
      }

      if (idx !== -1) {
        koPile.push(selectedCard);
        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> KO'd.`,
        );
        if (typeof koBonuses === "function") koBonuses();
        updateGameBoard();
        closeCardChoicePopup();
        resolve(selectedCard);
        return;
      }
      resolve(null);
    };

    // Cancel → close, no changes
    noThanksBtn.onclick = () => {
      onscreenConsole.log(`You chose not to KO a card.`);
      closeCardChoicePopup();
      resolve(null);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function RedwingRevealTopThreeDrawAndReorder() {
  return new Promise((resolve) => {
    const playedSidekick = [...cardsPlayedThisTurn]
      .reverse()
      .find((c) => c && c.name === "Redwing");
    if (!playedSidekick) {
      console.error("No Redwing card found in cardsPlayedThisTurn.");
      resolve();
      return;
    }

    onscreenConsole.log(
      `<span class="console-highlights">Redwing</span> played. Special Ability activated.`,
    );

    redwingDrawAndReturn()
      .then(() => {
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
        resolve();
      })
      .catch((e) => {
        console.error(e);
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
        resolve();
      });
  });
}

async function redwingDrawAndReturn() {
  // Draw up to three cards
  const holdingArray = [];
  for (let i = 0; i < 3; i++) {
    if (playerDeck.length === 0) {
      if (playerDiscardPile.length > 0) {
        playerDeck = shuffle(playerDiscardPile);
        playerDiscardPile = [];
        onscreenConsole.log("Shuffled discard pile into deck.");
      } else {
        onscreenConsole.log("No cards available to reveal.");
        return;
      }
    }
    holdingArray.push(playerDeck.pop());
  }

  if (holdingArray.length < 3) {
    onscreenConsole.log(`Only ${holdingArray.length} card(s) were revealed.`);
  }

  // === STEP 1: Choose card to draw ===
  const chosen = await pickFromCardsSingleRow(holdingArray, {
    title: "Choose Card to Draw",
    instructions: "Select one card to add to your hand:",
    confirmText: "DRAW SELECTED CARD",
  });

  playSFX("card-draw");
  playerHand.push(chosen);
  onscreenConsole.log(
    `<span class="console-highlights">${chosen.name}</span> added to hand.`,
  );

  const remaining = holdingArray.filter((c) => c !== chosen);

  // === STEP 2: Choose return order ===
  if (remaining.length > 0) {
    await chooseReturnOrderSingleRow(remaining, "Return Cards to Deck");
  }
}

function pickFromCardsSingleRow(items, { title, instructions, confirmText }) {
  return new Promise((resolve) => {
    const popup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const titleEl = document.querySelector(".card-choice-popup-title");
    const instructionsEl = document.querySelector(
      ".card-choice-popup-instructions",
    );
    const row1 = document.querySelector(".card-choice-popup-selectionrow1");
    const row1Container = document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    );
    const row2 = document.querySelector(".card-choice-popup-selectionrow2");
    const row2Container = document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    );
    const previewEl = document.querySelector(".card-choice-popup-preview");
    const confirmBtn = document.getElementById("card-choice-popup-confirm");
    const noThanksBtn = document.getElementById("card-choice-popup-nothanks");
    const closeX = document.querySelector(".card-choice-popup-closebutton");

    // Configure single-row layout @50%
    titleEl.textContent = title;
    instructionsEl.innerHTML = instructions;
    row2.style.display = "none";
    row2Container.style.display = "none";
    row1.style.display = "flex";
    row1Container.style.display = "block";
    row1Container.style.height = "50%";

    closeX.style.display = "none";
    noThanksBtn.style.display = "none"; // force choice

    row1.innerHTML = "";
    previewEl.innerHTML = "";
    previewEl.style.backgroundColor = "var(--panel-backgrounds)";

    confirmBtn.disabled = true;
    confirmBtn.textContent = confirmText;
    confirmBtn.style.display = "inline-block";

    let selected = null;
    let selectedImg = null;
    let isDragging = false;

    // Populate cards
    items.forEach((card) => {
      const wrap = document.createElement("div");
      wrap.className = "popup-card";
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = card.name;
      img.className = "popup-card-image";
      wrap.appendChild(img);

      wrap.addEventListener("mouseover", () => {
        if (isDragging) return;
        if (!selected) {
          previewEl.innerHTML = "";
          const p = document.createElement("img");
          p.src = card.image;
          p.alt = card.name;
          p.className = "popup-card-preview-image";
          previewEl.appendChild(p);
          previewEl.style.backgroundColor = "var(--accent)";
        }
      });

      wrap.addEventListener("mouseout", () => {
        if (isDragging) return;
        if (!selected) {
          setTimeout(() => {
            if (!row1.querySelector(":hover")) {
              previewEl.innerHTML = "";
              previewEl.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      });

      wrap.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (selected === card) {
          if (selectedImg) selectedImg.classList.remove("selected");
          selected = null;
          selectedImg = null;
          previewEl.innerHTML = "";
          previewEl.style.backgroundColor = "var(--panel-backgrounds)";
          confirmBtn.disabled = true;
        } else {
          if (selectedImg) selectedImg.classList.remove("selected");
          selected = card;
          selectedImg = img;
          img.classList.add("selected");
          previewEl.innerHTML = "";
          const p = document.createElement("img");
          p.src = card.image;
          p.alt = card.name;
          p.className = "popup-card-preview-image";
          previewEl.appendChild(p);
          previewEl.style.backgroundColor = "var(--accent)";
          confirmBtn.disabled = false;
        }
      });

      row1.appendChild(wrap);
    });

    if (typeof setupIndependentScrollGradients === "function") {
      setupIndependentScrollGradients(row1, null);
    }
    if (typeof setupDragScrolling === "function") {
      let isDown = false;
      row1.addEventListener("mousedown", () => {
        isDown = true;
        isDragging = true;
      });
      row1.addEventListener("mouseleave", () => {
        if (isDown) {
          isDown = false;
          isDragging = false;
        }
      });
      row1.addEventListener("mouseup", () => {
        isDown = false;
        isDragging = false;
      });
      setupDragScrolling(row1);
    }

    confirmBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!selected) return;
      resolve(selected);
    };

    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

async function chooseReturnOrderSingleRow(
  cards,
  title = "Return Cards to Deck",
) {
  const remaining = [...cards];
  const ordered = [];

  while (remaining.length > 0) {
    const firstPass = remaining.length === cards.length;
    const choice = await pickFromCardsSingleRow(remaining, {
      title,
      instructions: firstPass
        ? "Select the first card to return to the deck."
        : "Select the next card to return.",
      confirmText: "CONFIRM SELECTION",
    });

    const idx = remaining.indexOf(choice);
    if (idx !== -1) remaining.splice(idx, 1);
    ordered.push(choice);
  }

  ordered.forEach((card) => playerDeck.push(card));

  // Format console message with correct order wording
  if (ordered.length === 1) {
    onscreenConsole.log(
      `Returned <span class="console-highlights">${ordered[0].name}</span> to deck.`,
    );
  } else if (ordered.length === 2) {
    onscreenConsole.log(
      `Returned <span class="console-highlights">${ordered[0].name}</span> to deck and ` +
        `<span class="console-highlights">${ordered[1].name}</span> placed on top.`,
    );
  }

  closeCardChoicePopup();
  updateGameBoard();
  // Handle stingOfTheSpider trigger for each card added to top
  if (stingOfTheSpider) {
    // Process in reverse order (top card first) since last selected goes on top
    for (let i = ordered.length - 1; i >= 0; i--) {
      await scarletSpiderStingOfTheSpiderDrawChoice(ordered[i]);
    }
  }
}

function RustyRevealTopTwoAndHandle() {
  return new Promise((resolve) => {
    // Find the played Rusty card
    let playedSidekick = [...cardsPlayedThisTurn]
      .reverse()
      .find((card) => card.name === "Rusty 'Firefist' Collins");
    if (!playedSidekick) {
      console.error(
        "No Rusty 'Firefist' Collins card found in cardsPlayedThisTurn.",
      );
      resolve();
      return;
    }

    onscreenConsole.log(
      `<span class="console-highlights">Rusty 'Firefist' Collins</span> played. Special Ability activated.`,
    );
    playSFX("investigate");

    // Draw up to two cards
    let revealedCards = [];
    for (let i = 0; i < 2; i++) {
      if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
          onscreenConsole.log("Shuffled discard pile into deck.");
        } else {
          onscreenConsole.log("No cards available to reveal.");
          returnToSidekickDeck(playedSidekick);
          updateGameBoard();
          resolve();
          return;
        }
      }
      revealedCards.push(playerDeck.pop());
    }

    const [card1, card2] = revealedCards;
    const zeroCostCards = revealedCards.filter((card) => card.cost === 0);

    // Case 1: Two zero-cost cards
    if (zeroCostCards.length === 2) {
      handleTwoZeroCostCards(card1, card2).then(() => {
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
        resolve();
      });
    }
    // Case 2: One zero-cost card
    else if (zeroCostCards.length === 1) {
      handleOneZeroCostCard(
        zeroCostCards[0],
        card1.cost === 0 ? card2 : card1,
      ).then(() => {
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
        resolve();
      });
    }
    // Case 3: No zero-cost cards
    else {
      handleNoZeroCostCards(card1, card2).then(() => {
        returnToSidekickDeck(playedSidekick);
        updateGameBoard();
        resolve();
      });
    }
  });
}

async function handleTwoZeroCostCards(card1, card2) {
  // First choose which card to investigate
  const investigationChoice = await showCardSelectionPopup({
    title: "Investigation Choice",
    instructions:
      "You revealed two cards with cost 0. Which one do you want to investigate?",
    items: [
      { name: card1.name, image: card1.image, card: card1 },
      { name: card2.name, image: card2.image, card: card2 },
    ],
    confirmText: "INVESTIGATE THIS CARD",
  });

  // Handle KO/Discard choice for selected card
  await handleRustyInvestigateChoice(investigationChoice.card)

  // Automatically return the other card
  const otherCard = investigationChoice.card === card1 ? card2 : card1;
  await handleCardPlacement(otherCard);
}

async function handleOneZeroCostCard(zeroCostCard, otherCard) {
  // Handle KO/Discard choice for zero-cost card
  await handleRustyInvestigateChoice(zeroCostCard)

  // Return the other card
  await handleCardPlacement(otherCard);
}

async function handleNoZeroCostCards(card1, card2) {
  // First choose return order
  const returnOrder = await showCardSelectionPopup({
    title: "No Zero Cost Cards",
    instructions: "Select which card to return first:",
    items: [
      { name: `Return ${card1.name} first`, image: card1.image, card: card1 },
      { name: `Return ${card2.name} first`, image: card2.image, card: card2 },
    ],
    confirmText: "CONFIRM ORDER",
  });

  // Return first chosen card
  await handleCardPlacement(returnOrder.card);

  // Return the other card
  const otherCard = returnOrder.card === card1 ? card2 : card1;
  await handleCardPlacement(otherCard);
}

async function handleKoOrDiscardChoice(card) {
  const action = await showCardSelectionPopup({
    title: "INVESTIGATE",
    instructions: `What would you like to do with <span class="console-highlights">${card.name}</span>?`,
    items: [
      { text: "KO", value: "ko", image: card.image },
      { text: "DISCARD", value: "discard", image: card.image },
    ],
    confirmText: "CONFIRM ACTION",
  });

  if (action.value === "ko") {
    koPile.push(card);
    onscreenConsole.log(
      `<span class="console-highlights">${card.name}</span> has been KO'd.`,
    );
    koBonuses();
  } else {
    playerDiscardPile.push(card);
    onscreenConsole.log(
      `<span class="console-highlights">${card.name}</span> has been discarded.`,
    );
  }
}

function boomBoomNicknames() {
  return new Promise((resolve) => {
    const { confirmButton, denyButton, extraButton } = showHeroAbilityMayPopup(
      `Which of <span class="console-highlights">Boom-Boom</span><span class="bold-spans">'s</span> nicknames would you like to choose?`,
      "Time Bomb",
      "Meltdown",
      "Boomer",
      true,
    );

    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage = `url('Visual Assets/Sidekicks/Boom_Boom.webp')`;
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = () => {
      boomboomTimeBomb();
      closeInfoChoicePopup();
      resolve("Time Bomb");
    };

    denyButton.onclick = () => {
      boomboomMeltdown();
      closeInfoChoicePopup();
      resolve("Meltdown");
    };

    extraButton.onclick = () => {
      boomboomBoomer();
      closeInfoChoicePopup();
      resolve("Boomer");
    };
  });
}

function boomboomMeltdown() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find(
      (card) =>
        card.name === "Boom-Boom" ||
        card.originalAttributes?.name === "Boom-Boom",
    );

  if (!playedSidekick) {
    console.error("No Boom-Boom card found.");
    return;
  }

  // Skip card movement if this is a Prodigy copy
  if (playedSidekick.isCopied || playedSidekick.name !== "Boom-Boom") {
    totalAttackPoints += 4;
    cumulativeAttackPoints += 4;
    drawWound();

    return;
  } else {
    totalAttackPoints += 4;
    cumulativeAttackPoints += 4;
    drawWound();

    // Create a shallow copy to leave in `cardsPlayedThisTurn`
    const copy = { ...playedSidekick };
    copy.sidekickToDestroy = true; // Mark for cleanup

    // Replace the original with the copy
    const index = cardsPlayedThisTurn.indexOf(playedSidekick);
    if (index !== -1) {
      cardsPlayedThisTurn[index] = copy; // Keep the copy
      koPile.push(playedSidekick); // Move original to KO pile
      onscreenConsole.log(
        `You chose to play <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Meltdown ability. You have gained +4 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and a Wound. <span class="console-highlights">${playedSidekick.name}</span> has been KO’d.`,
      );
      koBonuses();
    } else {
      console.error("playedSidekick not found in cardsPlayedThisTurn.");
    }
  }
}

function boomboomBoomer() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find(
      (card) =>
        card.name === "Boom-Boom" ||
        card.originalAttributes?.name === "Boom-Boom",
    );

  if (!playedSidekick) {
    console.error("No Boom-Boom card found.");
    return;
  }

  // Skip card movement if this is a Prodigy copy
  if (playedSidekick.isCopied || playedSidekick.name !== "Boom-Boom") {
    totalAttackPoints += 3;
    cumulativeAttackPoints += 3;

    return;
  } else {
    totalAttackPoints += 3;
    cumulativeAttackPoints += 3;

    const copy = { ...playedSidekick };
    copy.sidekickToDestroy = true;

    const index = cardsPlayedThisTurn.indexOf(playedSidekick);
    if (index !== -1) {
      cardsPlayedThisTurn[index] = copy; // Keep the copy
      sidekickDeck.unshift(playedSidekick); // Move original to deck
      onscreenConsole.log(
        `You chose to play <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Boomer ability. You have gained +3 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. <span class="console-highlights">${playedSidekick.name}</span> has been returned to the bottom of the Sidekick deck.`,
      );
    } else {
      console.error("playedSidekick not found in cardsPlayedThisTurn.");
    }
  }
}

async function boomboomTimeBomb() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find(
      (card) =>
        card.name === "Boom-Boom" ||
        card.originalAttributes?.name === "Boom-Boom",
    );

  if (!playedSidekick) {
    console.error("No Boom-Boom card found.");
    return;
  }

  // Skip card movement if this is a Prodigy copy
  if (playedSidekick.isCopied || playedSidekick.name !== "Boom-Boom") {
    totalAttackPoints += 1;
    cumulativeAttackPoints += 1;

    return;
  } else {
    totalAttackPoints += 1;
    cumulativeAttackPoints += 1;

    const copy = { ...playedSidekick };
    copy.sidekickToDestroy = true;

    const index = cardsPlayedThisTurn.indexOf(playedSidekick);
    if (index !== -1) {
      cardsPlayedThisTurn[index] = copy; // Keep the copy
      playerDeck.push(playedSidekick); // Move original to player deck
      playedSidekick.revealed = true;
      onscreenConsole.log(
        `You chose to play <span class="console-highlights">${playedSidekick.name}</span><span class="bold-spans">’s</span> Time Bomb ability. You have gained +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. <span class="console-highlights">${playedSidekick.name}</span> has been returned to the top of your deck.`,
      );
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(playedSidekick);
      }
    } else {
      console.error("playedSidekick not found in cardsPlayedThisTurn.");
    }
  }
}

function skidsRecruitReturn() {
  let playedSidekick = [...cardsPlayedThisTurn]
    .reverse()
    .find((card) => card.name === "Skids");
  if (!playedSidekick) {
    console.error("No sidekick card found in cardsPlayedThisTurn.");
    return;
  }

  onscreenConsole.log(
    `<span class="console-highlights">Skids</span> was played and will now be returned to the bottom of the Sidekick Stack.`,
  );
  returnToSidekickDeck(playedSidekick);
  updateGameBoard();
}

function skidsWoundInvulnerability(card) {
  // 1. First check if we even got a card
  if (!card) {
    console.error("⚠️ No card provided to skidsWoundInvulnerability");
    return;
  }

  // 2. Find ANY Skids card in the hand (since we only care about the name)
  const skidsInHand = playerHand.filter(
    (handCard) => handCard.name === "Skids",
  );

  // 3. If no Skids found, show error
  if (skidsInHand.length === 0) {
    console.error("🚨 No Skids card found in hand. Current hand:", playerHand);
    return;
  }

  // 4. Take THE FIRST Skids card found (even if multiple exist)
  const skidsCard = skidsInHand[0];
  const cardIndex = playerHand.indexOf(skidsCard); // Now we have the exact reference

  // 5. Move it to discard
  playerHand.splice(cardIndex, 1);
  playerDiscardPile.push(skidsCard);

  // 6. Do the rest of the ability
  onscreenConsole.log(
    `<span class="console-highlights">Skids</span><span class="bold-spans">'</span> ability activated! Avoided a Wound.`,
  );
  extraDraw();
  extraDraw();
  updateGameBoard();
}

async function prodigyCopyPowers() {
  return new Promise((resolve) => {
    // 1) Check eligibility (exclude the most recently played card)
    const heroesToCopy = cardsPlayedThisTurn
      .slice(0, -1)
      .filter((card) => card && card.type === "Hero" && card.cost <= 6);

    if (heroesToCopy.length === 0) {
      console.log("No eligible heroes have been played yet (cost 6 or less).");
      onscreenConsole.log(
        "No Heroes with a cost of 6 or less have been played this turn.",
      );
      resolve(false);
      return;
    }

    // 2) Grab new-popup elements
    const popup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const selectionRow1Container = document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    );
    const selectionRow1Label = document.querySelector(
      ".card-choice-popup-selectionrow1label",
    );
    const selectionRow2 = document.querySelector(
      ".card-choice-popup-selectionrow2",
    );
    const selectionRow2Label = document.querySelector(
      ".card-choice-popup-selectionrow2label",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );
    const closeX = document.querySelector(".card-choice-popup-closebutton");

    // Buttons (new IDs)
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // 3) Configure single-row layout + content
    titleElement.textContent = "Prodigy — Copy Powers";
    instructionsElement.textContent =
      "Select a Hero (cost 6 or less) you played earlier this turn for Prodigy to copy:";

    // Hide row labels and row2; centre row1
    selectionRow1Label.style.display = "none";
    selectionRow2Label.style.display = "none";
    selectionRow2.style.display = "none";
    closeX.style.display = "none"; // Use NO THANKS instead

    selectionRow1Container.style.height = "50%";
    selectionRow1Container.style.top = "50%";
    selectionRow1Container.style.transform = "translateY(-50%)";

    // Clear content + reset preview
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    // Buttons: enable Confirm only after a selection; show Cancel (NO THANKS)
    confirmButton.disabled = true;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "inline-block";

    // 4) State
    let selectedIndex = null;
    let selectedCardImg = null;
    let isDragging = false;

    // 5) Gradients + drag scroll on row1
    setupIndependentScrollGradients(selectionRow1, null);
    setupDragScrolling(selectionRow1);

    // 6) Build cards (preserve original order — no sorting)
    heroesToCopy.forEach((hero, idx) => {
      const cardEl = document.createElement("div");
      cardEl.className = "popup-card";
      cardEl.setAttribute("data-played-index", String(idx));

      const img = document.createElement("img");
      img.src = hero.image;
      img.alt = hero.name;
      img.className = "popup-card-image";

      // Hover → preview (don’t override if dragging)
      const handleHover = () => {
        if (isDragging) return;
        previewElement.innerHTML = "";
        const pImg = document.createElement("img");
        pImg.src = hero.image;
        pImg.alt = hero.name;
        pImg.className = "popup-card-preview-image";
        previewElement.appendChild(pImg);
        if (selectedIndex === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;
        // Only clear if nothing is selected and not immediately moving to another card
        if (selectedIndex === null) {
          setTimeout(() => {
            if (!selectionRow1.querySelector(":hover") && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardEl.addEventListener("mouseover", handleHover);
      cardEl.addEventListener("mouseout", handleHoverOut);

      // Click → select/deselect
      cardEl.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const thisIdx = Number(cardEl.getAttribute("data-played-index"));

        if (selectedIndex === thisIdx) {
          // Deselect
          selectedIndex = null;
          if (selectedCardImg) selectedCardImg.classList.remove("selected");
          selectedCardImg = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          confirmButton.disabled = true;
        } else {
          // Deselect previous
          if (selectedCardImg) selectedCardImg.classList.remove("selected");

          // Select new
          selectedIndex = thisIdx;
          selectedCardImg = img;
          img.classList.add("selected");

          // Update preview
          previewElement.innerHTML = "";
          const pImg = document.createElement("img");
          pImg.src = hero.image;
          pImg.alt = hero.name;
          pImg.className = "popup-card-preview-image";
          previewElement.appendChild(pImg);
          previewElement.style.backgroundColor = "var(--accent)";

          confirmButton.disabled = false;
        }
      });

      cardEl.appendChild(img);
      selectionRow1.appendChild(cardEl);
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

    // 7) Confirm → copy attributes, trigger abilities, update state
    confirmButton.onclick = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (selectedIndex === null) return;

      const hero = heroesToCopy[selectedIndex];

      try {
        // Find Prodigy that hasn’t copied yet
        const prodigyIdx = cardsPlayedThisTurn.findIndex(
          (c) => c && c.name === "Prodigy" && !c.isCopied,
        );
        if (prodigyIdx === -1) {
          console.log("Prodigy has already copied a card.");
          closeCardChoicePopup();
          resolve(false);
          return;
        }

        const prodigyCard = cardsPlayedThisTurn[prodigyIdx];

        // Clone Prodigy to sidekick deck (for later destruction handling)
        const clonedProdigy = { ...prodigyCard };
        sidekickDeck.unshift(clonedProdigy);

        // Mark this Prodigy as used
        prodigyCard.isCopied = true;
        prodigyCard.sidekickToDestroy = true;

        // Keep originals for restore
        prodigyCard.originalAttributes = {
          name: prodigyCard.name,
          type: prodigyCard.type,
          rarity: prodigyCard.rarity,
          team: prodigyCard.team,
          classes: prodigyCard.classes,
          color: prodigyCard.color,
          cost: prodigyCard.cost,
          attack: prodigyCard.attack,
          recruit: prodigyCard.recruit,
          attackIcon: prodigyCard.attackIcon,
          recruitIcon: prodigyCard.recruitIcon,
          bonusAttack: prodigyCard.bonusAttack,
          bonusRecruit: prodigyCard.bonusRecruit,
          multiplier: prodigyCard.multiplier,
          multiplierAttribute: prodigyCard.multiplierAttribute,
          mulitplierLocation: prodigyCard.mulitplierLocation,
          unconditionalAbility: prodigyCard.unconditionalAbility,
          conditionalAbility: prodigyCard.conditionalAbility,
          conditionType: prodigyCard.conditionType,
          condition: prodigyCard.condition,
          invulnerability: prodigyCard.invulnerability,
          keywords: prodigyCard.keywords,
          image: prodigyCard.image,
        };

        // Copy selected hero’s attributes (keep Tech)
        Object.assign(prodigyCard, {
          name: hero.name || "None",
          type: hero.type || "None",
          rarity: hero.rarity || "None",
          team: hero.team || "None",
          classes: hero.classes
            ? hero.classes.includes("Tech")
              ? [...hero.classes]
              : ["Tech", ...hero.classes]
            : ["Tech"],
          color: hero.color || "None",
          cost: hero.cost || 0,
          attack: hero.attack || 0,
          recruit: hero.recruit || 0,
          attackIcon: hero.attackIcon || "None",
          recruitIcon: hero.recruitIcon || "None",
          bonusAttack: hero.bonusAttack || 0,
          bonusRecruit: hero.bonusRecruit || 0,
          multiplier: hero.multiplier || "None",
          multiplierAttribute: hero.multiplierAttribute || "None",
          mulitplierLocation: hero.mulitplierLocation || "None",
          unconditionalAbility: hero.unconditionalAbility || "None",
          conditionalAbility: hero.conditionalAbility || "None",
          conditionType: hero.conditionType || "None",
          condition: hero.condition || "None",
          invulnerability: hero.invulnerability || "None",
          keywords: hero.keywords || [],
          image: hero.image || "None",
        });

        console.log(
          `Copying: ${hero.name}. Gained ${prodigyCard.attack} attack and ${prodigyCard.recruit} recruit.`,
        );
        onscreenConsole.log(
          `Copied <span class="console-highlights">${hero.name}</span>. Gained +${prodigyCard.attack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and +${prodigyCard.recruit}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
        );

        // Trigger unconditional ability if present
if (
  hero.unconditionalAbility &&  // Use the ORIGINAL hero's ability
  hero.unconditionalAbility !== "None"
) {
  const abilityFn = window[hero.unconditionalAbility];
  if (typeof abilityFn === "function") {
    // Temporarily swap the last card to be the original hero for the ability execution
    const originalLastCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
    cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1] = hero;
    
    await abilityFn(hero);  // Pass the original hero
    
    // Restore the last card
    cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1] = originalLastCard;
  } else {
    console.error(
      `Ability function ${hero.unconditionalAbility} not found`,
    );
  }
}

        // Apply gains
        totalAttackPoints += prodigyCard.attack;
        totalRecruitPoints += prodigyCard.recruit;
        cumulativeAttackPoints += prodigyCard.attack;
        cumulativeRecruitPoints += prodigyCard.recruit;

        updateGameBoard();
        closeCardChoicePopup();
        resolve(true);
      } catch (err) {
        console.error("Error copying powers:", err);
        closeCardChoicePopup();
        resolve(false);
      }
    };

    // 8) Cancel (NO THANKS) → revert the play and close
    noThanksButton.onclick = () => {
      onscreenConsole.log(
        `You've cancelled <span class="console-highlights">Prodigy</span><span class="bold-spans">'s</span> ability.`,
      );
      const prodigyIdx = cardsPlayedThisTurn.findIndex(
        (c) => c && c.name === "Prodigy" && !c.isCopied,
      );
      if (prodigyIdx !== -1) {
        const prodigyCard = cardsPlayedThisTurn[prodigyIdx];
        cardsPlayedThisTurn.splice(prodigyIdx, 1);
        playerHand.push(prodigyCard);
      }
      closeCardChoicePopup();
      resolve(false);
    };

    // 9) Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function rockslideShatter() {
  return new Promise((resolve) => {
    // Find played Rockslide (most recent first)
    const playedSidekick = [...cardsPlayedThisTurn]
      .reverse()
      .find((c) => c && c.name === "Rockslide");
    if (!playedSidekick) {
      console.error("No Rockslide card found in cardsPlayedThisTurn.");
      resolve(false);
      return;
    }

    // Build eligible targets from city (preserve order)
    const villainsInCity = city
      .map((card, index) =>
        card && (card.type === "Villain" || card.type === "Henchman")
          ? { index, card }
          : null,
      )
      .filter(Boolean);

    if (villainsInCity.length === 0) {
      onscreenConsole.log(
        'There are no Villains in the city to <span class="bold-spans">Shatter</span>.',
      );
      resolve(false);
      return;
    }

    // --- Elements (new popup) ---
    const popup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");

    const titleEl = document.querySelector(".card-choice-popup-title");
    const instructionsEl = document.querySelector(
      ".card-choice-popup-instructions",
    );

    const row1Label = document.querySelector(
      ".card-choice-popup-selectionrow1label",
    );
    const row2Label = document.querySelector(
      ".card-choice-popup-selectionrow2label",
    );
    const row1Container = document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    );
    const row2Container = document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    );
    const row1 = document.querySelector(".card-choice-popup-selectionrow1");
    const row2 = document.querySelector(".card-choice-popup-selectionrow2");

    const previewEl = document.querySelector(".card-choice-popup-preview");
    const closeX = document.querySelector(".card-choice-popup-closebutton");

    const confirmBtn = document.getElementById("card-choice-popup-confirm");
    const otherChoiceBtn = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksBtn = document.getElementById("card-choice-popup-nothanks");

    // --- Configure single-row layout ---
    titleEl.textContent = "Rockslide — Shatter";
    instructionsEl.innerHTML =
      'Select a Villain or Henchman to <span class="bold-spans">Shatter</span>:';

    // Hide labels and row2; ensure row1 visible & centred @ 50%
    row1Label.style.display = "none";
    row2Label.style.display = "none";
    row2.style.display = "none";
    row2Container.style.display = "none";

    row1Container.style.display = "block";
    row1.style.display = "flex";
    row1Container.style.height = "50%";
    row1Container.style.top = "50%";
    row1Container.style.transform = "translateY(-50%)";

    // Prefer NO THANKS as cancel
    closeX.style.display = "none";

    // Reset content
    row1.innerHTML = "";
    previewEl.innerHTML = "";
    previewEl.style.backgroundColor = "var(--panel-backgrounds)";

    // Buttons
    confirmBtn.disabled = true;
    confirmBtn.style.display = "inline-block";
    confirmBtn.textContent = "SHATTER";
    otherChoiceBtn.style.display = "none";
    noThanksBtn.style.display = "inline-block";

    // State
    let selected = null; // { index, card }
    let selectedImg = null;
    let isDragging = false;

    // Helpers
    const enableConfirm = () => {
      confirmBtn.disabled = !selected;
    };

    const setPreview = (card) => {
      previewEl.innerHTML = "";
      if (card) {
        const img = document.createElement("img");
        img.src = card.image;
        img.alt = card.name;
        img.className = "popup-card-preview-image";
        previewEl.appendChild(img);
        previewEl.style.backgroundColor = "var(--accent)";
      } else {
        previewEl.style.backgroundColor = "var(--panel-backgrounds)";
      }
    };

    const buildCard = (entry) => {
      const wrap = document.createElement("div");
      wrap.className = "popup-card";

      const img = document.createElement("img");
      img.src = entry.card.image;
      img.alt = entry.card.name;
      img.className = "popup-card-image";
      wrap.appendChild(img);

      // Hover → preview (skip while dragging)
      wrap.addEventListener("mouseover", () => {
        if (isDragging) return;
        if (!selected) setPreview(entry.card);
      });
      wrap.addEventListener("mouseout", () => {
        if (isDragging) return;
        if (!selected) {
          setTimeout(() => {
            if (!row1.querySelector(":hover")) setPreview(null);
          }, 50);
        }
      });

      // Click → select/deselect
      wrap.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (selected && selected.index === entry.index) {
          // Deselect
          if (selectedImg) selectedImg.classList.remove("selected");
          selected = null;
          selectedImg = null;
          setPreview(null);
          enableConfirm();
        } else {
          if (selectedImg) selectedImg.classList.remove("selected");
          selected = entry;
          selectedImg = img;
          img.classList.add("selected");
          setPreview(entry.card);
          enableConfirm();
        }
      });

      return wrap;
    };

    // Populate row1 (preserve order)
    villainsInCity.forEach((v) => row1.appendChild(buildCard(v)));

    // Gradients + drag scroll
    if (typeof setupIndependentScrollGradients === "function") {
      setupIndependentScrollGradients(row1, null);
    }
    if (typeof setupDragScrolling === "function") {
      // mirror simple dragging guard
      let isDown = false;
      row1.addEventListener("mousedown", () => {
        isDown = true;
        isDragging = true;
      });
      row1.addEventListener("mouseleave", () => {
        if (isDown) {
          isDown = false;
          isDragging = false;
        }
      });
      row1.addEventListener("mouseup", () => {
        isDown = false;
        isDragging = false;
      });
      setupDragScrolling(row1);
    }

    // Confirm → return Rockslide, shatter target, update
    confirmBtn.onclick = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!selected) return;

      try {
        // Close early to prevent double-press
        closeCardChoicePopup();

        // Put Rockslide back
        returnToSidekickDeck(playedSidekick);

        // Shatter chosen city card
        await shatter(city[selected.index]);

        updateGameBoard();
        resolve(true);
      } catch (err) {
        console.error("Error during shatter:", err);
        updateGameBoard();
        resolve(false);
      }
    };

    // Cancel
    noThanksBtn.onclick = () => {
      onscreenConsole.log(
        '<span class="console-highlights">Rockslide</span> did not shatter any Villains.',
      );
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function shatter(card) {
  return new Promise((resolve) => {
    if (!card) {
      console.error("No card provided to shatter");
      resolve();
      return;
    }

    const selectedSchemeName = document.querySelector(
      "#scheme-section input[type=radio]:checked",
    ).value;
    const selectedScheme = schemes.find(
      (scheme) => scheme.name === selectedSchemeName,
    );

    const shatteredVillainAttack = recalculateVillainAttack(card);
    const shatteredValue = Math.floor(shatteredVillainAttack / 2);

    card.shattered = (card.shattered || 0) + shatteredValue;
    playSFX("shatter");
    onscreenConsole.log(
      `Shatter! <span class="console-highlights">${card.name}</span> loses ${shatteredValue}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
    );

    // Make sure updateGameBoard() returns a Promise
    updateGameBoard();
    resolve();
  });
}

function laylaMillerInvestigate() {
  playSFX("investigate");
  return new Promise((resolve) => {
    // 1. Display the popup
    const popup = document.querySelector(".investigate-popup");
    popup.style.display = "block";

    // 2. Set the card image
    const cardImage = document.getElementById("investigate-card-preview");
    cardImage.style.backgroundImage = `url('Visual Assets/Sidekicks/Layla_Miller.webp')`;

    document.getElementById("investigate-team-filter").style.display = "block";

    // 3. Disable confirm button initially
    const confirmBtn = document.getElementById("investigate-confirm");
    confirmBtn.disabled = true;

    // Get team radios
    const teamRadios = document.querySelectorAll(
      'input[name="investigate-team"]',
    );

    // Cleanup function
    function cleanup() {
      // Remove all radio change listeners
      teamRadios.forEach((radio) => {
        radio.onchange = null;
      });
      // Remove confirm button listener
      confirmBtn.onclick = null;
      // Reset UI elements
      popup.style.display = "none";
      document.getElementById("investigate-team-filter").style.display = "none";
      cardImage.style.backgroundImage = "";
    }

    // Enable confirm button when a team is selected
    teamRadios.forEach((radio) => {
      radio.onchange = () => {
        confirmBtn.disabled = false;
        document.getElementById("investigate-anchor").innerHTML =
          `${document.querySelector('input[name="investigate-team"]:checked')?.dataset.team}`;
      };
    });

    // Handle confirm button click
    confirmBtn.onclick = async () => {
      try {
        // Get selected team
        const selectedTeam = document.querySelector(
          'input[name="investigate-team"]:checked',
        )?.dataset.team;
        if (!selectedTeam) return;
        cleanup(); // Clean up event listeners immediately

        // Reset team selection
        teamRadios.forEach((radio) => {
          radio.checked = false;
        });

        document.getElementById("investigate-anchor").innerHTML = `Teams`;

        // Find the played Layla Miller card
        let playedSidekick = [...cardsPlayedThisTurn]
          .reverse()
          .find((card) => card.name === "Layla Miller");
        if (!playedSidekick) {
          console.error("No Layla Miller card found in cardsPlayedThisTurn.");
          resolve();
          return;
        }

        // Return to sidekick deck
        returnToSidekickDeck(playedSidekick);

        // Check top two cards, shuffling if needed
        let revealedCards = [];
        for (let i = 0; i < 2; i++) {
          if (playerDeck.length === 0) {
            if (playerDiscardPile.length > 0) {
              playerDeck = shuffle(playerDiscardPile);
              playerDiscardPile = [];
            } else {
              onscreenConsole.log("No cards available to investigate.");
              updateGameBoard();
              resolve();
              return;
            }
          }
          revealedCards.push(playerDeck.pop());
        }

        const [card1, card2] = revealedCards;

        // Case 1: Both cards match selected team
        if (card1.team === selectedTeam && card2.team === selectedTeam) {
          const choice = await showCardSelectionPopup({
            title: "Investigation Results",
            instructions: `You found two ${selectedTeam} cards. Select one to draw:`,
            items: [
              { name: card1.name, image: card1.image, card: card1 },
              { name: card2.name, image: card2.image, card: card2 },
            ],
            confirmText: "DRAW SELECTED CARD",
          });

          if (choice.card === card1) {
            playerHand.push(card1);
            onscreenConsole.log(
              `You added <span class="console-highlights">${card1.name}</span> to your hand.`,
            );
            await handleCardPlacement(card2);
          } else {
            playerHand.push(card2);
            onscreenConsole.log(
              `You added <span class="console-highlights">${card2.name}</span> to your hand.`,
            );
            await handleCardPlacement(card1);
          }
        }
        // Case 2: One card matches selected team
        else if (card1.team === selectedTeam || card2.team === selectedTeam) {
          const matchingCard = card1.team === selectedTeam ? card1 : card2;
          const otherCard = card1.team === selectedTeam ? card2 : card1;
          playSFX("card-draw");
          playerHand.push(matchingCard);
          onscreenConsole.log(
            `You added <span class="console-highlights">${matchingCard.name}</span> to your hand.`,
          );
          updateGameBoard();

          await handleCardPlacement(otherCard, {
            title: "Investigation Results",
            instructions: `You found and drew <span class="console-highlights">${matchingCard.name}</span>. Where should <span class="console-highlights">${otherCard.name}</span> be returned?`,
            card: otherCard,
          });
        }
        // Case 3: Neither card matches selected team
        else {
          const firstChoice = await showCardSelectionPopup({
            title: "Investigation Failed",
            instructions: `No ${selectedTeam} cards found. Select which card to return first.`,
            items: [
              {
                name: `Return ${card1.name} first`,
                image: card1.image,
                card: card1,
              },
              {
                name: `Return ${card2.name} first`,
                image: card2.image,
                card: card2,
              },
            ],
            confirmText: "CONFIRM ORDER",
          });

          card1.revealed = true;
          card2.revealed = true;

          await handleCardPlacement(firstChoice.card);
          await handleCardPlacement(firstChoice.card === card1 ? card2 : card1);
        }

        updateGameBoard();
        resolve();
      } catch (error) {
        console.error("Error in Layla Miller investigation:", error);
        cleanup();
        resolve();
      }
    };
  });
}

// Reusable card selection popup (add this to your code)
async function showCardSelectionPopup(options) {
  return new Promise((resolve) => {
    // Elements (new popup)
    const popup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");

    const titleEl = document.querySelector(".card-choice-popup-title");
    const instructionsEl = document.querySelector(
      ".card-choice-popup-instructions",
    );

    const row1Label = document.querySelector(
      ".card-choice-popup-selectionrow1label",
    );
    const row2Label = document.querySelector(
      ".card-choice-popup-selectionrow2label",
    );
    const row1Container = document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    );
    const row2Container = document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    );
    const row1 = document.querySelector(".card-choice-popup-selectionrow1");
    const row2 = document.querySelector(".card-choice-popup-selectionrow2");

    const previewEl = document.querySelector(".card-choice-popup-preview");

    const confirmBtn = document.getElementById("card-choice-popup-confirm");
    const otherBtn = document.getElementById("card-choice-popup-otherchoice");
    const noThanksBtn = document.getElementById("card-choice-popup-nothanks");
    const closeX = document.querySelector(".card-choice-popup-closebutton");

    // --- Configure single-row layout (@50%, no top/transform) ---
    titleEl.textContent = options.title || "Make a Selection";
    instructionsEl.innerHTML = options.instructions || "Select an option:";

    if (row1Label) row1Label.style.display = "none";
    if (row2Label) row2Label.style.display = "none";
    row2.style.display = "none";
    row2Container.style.display = "none";

    row1Container.style.display = "block";
    row1.style.display = "flex";
    row1Container.style.height = "50%";
    row1Container.style.marginTop = "0"; // ensure true centring with your CSS

    // Buttons: show only Confirm for this generic picker
    closeX.style.display = "none";
    otherBtn.style.display = "none";
    noThanksBtn.style.display = "none";

    // Reset content
    row1.innerHTML = "";
    previewEl.innerHTML = "";
    previewEl.style.backgroundColor = "var(--panel-backgrounds)";

    confirmBtn.disabled = true;
    confirmBtn.style.display = "inline-block";
    confirmBtn.textContent = options.confirmText || "CONFIRM";

    let selectedIndex = null;
    let selectedImg = null;
    let isDragging = false;

    // Build options as cards
    (options.items || []).forEach((item, index) => {
      const wrap = document.createElement("div");
      wrap.className = "popup-card";

      const hasImage = options.showImages !== false && item.image;

      if (hasImage) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name || item.text || "Option";
        img.className = "popup-card-image";
        wrap.appendChild(img);

        // Hover → preview (skip while dragging, don’t override a selection)
        wrap.addEventListener("mouseover", () => {
          if (isDragging) return;
          if (selectedIndex === null) {
            previewEl.innerHTML = "";
            const p = document.createElement("img");
            p.src = item.image;
            p.alt = item.name || item.text || "Preview";
            p.className = "popup-card-preview-image";
            previewEl.appendChild(p);
            previewEl.style.backgroundColor = "var(--accent)";
          }
        });
        wrap.addEventListener("mouseout", () => {
          if (isDragging) return;
          if (selectedIndex === null) {
            setTimeout(() => {
              if (!row1.querySelector(":hover")) {
                previewEl.innerHTML = "";
                previewEl.style.backgroundColor = "var(--panel-backgrounds)";
              }
            }, 50);
          }
        });
      } else {
        // Text-only tile (for options like TOP/BOTTOM etc.)
        const textBox = document.createElement("div");
        textBox.textContent = item.name || item.text || "Option";
        // keep styling minimal; uses .popup-card box
        textBox.style.display = "grid";
        textBox.style.placeItems = "center";
        textBox.style.height = "100%";
        textBox.style.padding = "1vh 1vw";
        textBox.style.textAlign = "center";
        textBox.style.fontFamily = "Roboto Condensed, sans-serif";
        textBox.style.fontWeight = "600";
        textBox.style.textTransform = "uppercase";
        wrap.appendChild(textBox);
      }

      // Click → select/deselect
      wrap.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (selectedIndex === index) {
          // Deselect
          if (selectedImg) selectedImg.classList.remove("selected");
          selectedIndex = null;
          selectedImg = null;
          previewEl.innerHTML = "";
          previewEl.style.backgroundColor = "var(--panel-backgrounds)";
          confirmBtn.disabled = true;
        } else {
          // Deselect previous
          if (selectedImg) selectedImg.classList.remove("selected");

          // Select new
          selectedIndex = index;
          const imgEl = wrap.querySelector("img");
          if (imgEl) {
            selectedImg = imgEl;
            imgEl.classList.add("selected");
            // Lock preview to selection
            previewEl.innerHTML = "";
            const p = document.createElement("img");
            p.src = imgEl.src;
            p.alt = imgEl.alt;
            p.className = "popup-card-preview-image";
            previewEl.appendChild(p);
            previewEl.style.backgroundColor = "var(--accent)";
          } else {
            selectedImg = null;
            previewEl.innerHTML = "";
            previewEl.style.backgroundColor = "var(--accent)";
          }

          confirmBtn.disabled = false;
        }
      });

      row1.appendChild(wrap);
    });

    // Gradients + drag scroll
    if (typeof setupIndependentScrollGradients === "function") {
      setupIndependentScrollGradients(row1, null);
    }
    if (typeof setupDragScrolling === "function") {
      let isDown = false;
      row1.addEventListener("mousedown", () => {
        isDown = true;
        isDragging = true;
      });
      row1.addEventListener("mouseleave", () => {
        if (isDown) {
          isDown = false;
          isDragging = false;
        }
      });
      row1.addEventListener("mouseup", () => {
        isDown = false;
        isDragging = false;
      });
      setupDragScrolling(row1);
    }

    // Confirm action
    confirmBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (selectedIndex === null) return;
      closeCardChoicePopup(); // your existing closer for this popup
      resolve(options.items[selectedIndex]);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

async function handleRustyInvestigateChoice(card) {
  return new Promise((resolve) => {
    // Elements
    const popup = document.querySelector(".info-or-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const titleEl = document.querySelector(".info-or-choice-popup-title");
    const instructionsEl = document.querySelector(
      ".info-or-choice-popup-instructions",
    );
    const previewEl = document.querySelector(".info-or-choice-popup-preview");
    const confirmBtn = document.getElementById("info-or-choice-popup-confirm"); // KO
    const otherBtn = document.getElementById(
      "info-or-choice-popup-otherchoice",
    ); // DISCARD
    const noThanksBtn = document.getElementById(
      "info-or-choice-popup-nothanks",
    );
    const closeX = document.querySelector(".info-or-choice-popup-closebutton");

    // Prep popup state
    titleEl.textContent = "INVESTIGATE";
    instructionsEl.innerHTML = `Would you like to KO or discard <span class="console-highlights">${card.name}</span>?`;

    // Preview image
    previewEl.innerHTML = "";
    const img = document.createElement("img");
    img.src = card.image;
    img.alt = card.name;
    img.className = "popup-card-preview-image";
    previewEl.appendChild(img);

    // Force a choice: show TOP/BOTTOM buttons; hide cancel/X
    confirmBtn.textContent = "KO";
    confirmBtn.disabled = false;
    confirmBtn.style.display = "inline-block";
    otherBtn.textContent = "DISCARD";
    otherBtn.style.display = "inline-block";
    if (noThanksBtn) noThanksBtn.style.display = "none";
    if (closeX) closeX.style.display = "none";

    // Clear old handlers (defensive)
    confirmBtn.onclick = null;
    otherBtn.onclick = null;
    if (noThanksBtn) noThanksBtn.onclick = null;

    // Handlers
    confirmBtn.onclick = async () => {
      koPile.push(card);
      onscreenConsole.log(
        `You KO'd <span class="console-highlights">${card.name}</span>.`,
      );
      await koBonuses();
      cleanup();
    };

    otherBtn.onclick = async () => {
      const { returned } =
          await checkDiscardForInvulnerability(card);
        if (returned.length) {
          playerHand.push(...returned);
        }
      cleanup();
    };

    function cleanup() {
      // Remove handlers
      confirmBtn.onclick = null;
      otherBtn.onclick = null;
      if (noThanksBtn) noThanksBtn.onclick = null;

      // Reset and hide via your helper
      closeInfoChoicePopup();

      updateGameBoard();
      resolve();
    }

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

async function handleCardPlacement(card, options = {}) {
  return new Promise((resolve) => {
    // Elements
    const popup = document.querySelector(".info-or-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const titleEl = document.querySelector(".info-or-choice-popup-title");
    const instructionsEl = document.querySelector(
      ".info-or-choice-popup-instructions",
    );
    const previewEl = document.querySelector(".info-or-choice-popup-preview");
    const confirmBtn = document.getElementById("info-or-choice-popup-confirm"); // TOP
    const otherBtn = document.getElementById(
      "info-or-choice-popup-otherchoice",
    ); // BOTTOM
    const noThanksBtn = document.getElementById(
      "info-or-choice-popup-nothanks",
    );
    const closeX = document.querySelector(".info-or-choice-popup-closebutton");

    // Prep popup state
    titleEl.textContent = options.title || "Card Placement";
    instructionsEl.innerHTML =
      options.instructions ||
      `Where should <span class="console-highlights">${card.name}</span> go?`;

    // Preview image
    previewEl.innerHTML = "";
    const img = document.createElement("img");
    img.src = card.image;
    img.alt = card.name;
    img.className = "popup-card-preview-image";
    previewEl.appendChild(img);

    // Force a choice: show TOP/BOTTOM buttons; hide cancel/X
    confirmBtn.textContent = "TOP OF DECK";
    confirmBtn.disabled = false;
    confirmBtn.style.display = "inline-block";
    otherBtn.textContent = "BOTTOM OF DECK";
    otherBtn.style.display = "inline-block";
    if (noThanksBtn) noThanksBtn.style.display = "none";
    if (closeX) closeX.style.display = "none";

    // Clear old handlers (defensive)
    confirmBtn.onclick = null;
    otherBtn.onclick = null;
    if (noThanksBtn) noThanksBtn.onclick = null;

    // Handlers
    confirmBtn.onclick = async () => {
      playerDeck.push(card);
      card.revealed = true;
      onscreenConsole.log(
        `You returned <span class="console-highlights">${card.name}</span> to the top of your deck.`,
      );
      cleanup();
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(card);
      }
    };

    otherBtn.onclick = () => {
      playerDeck.unshift(card);
      onscreenConsole.log(
        `You returned <span class="console-highlights">${card.name}</span> to the bottom of your deck.`,
      );
      cleanup();
    };

    function cleanup() {
      // Remove handlers
      confirmBtn.onclick = null;
      otherBtn.onclick = null;
      if (noThanksBtn) noThanksBtn.onclick = null;

      // Reset and hide via your helper
      closeInfoChoicePopup();

      updateGameBoard();
      resolve();
    }

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}
