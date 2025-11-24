// Card Abilities for Dark City
//24.11.2025 17.35

async function angelDivingCatch(card) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      // Run the rescue (this will await Radiation Scientist if drawn)
      await rescueBystander(card);

      // Only after the bystander ability is fully done, do Angel's draws
      extraDraw(card);
      extraDraw(card);

      updateGameBoard();
      resolve();
    }, 10);
  });
}

function angelHighSpeedChase() {
  return new Promise((resolve, reject) => {
    try {
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

      extraDraw();
      extraDraw();
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

      titleElement.textContent = "Angel - High-Speed Chase";
      instructionsElement.textContent = "Select one card to discard.";

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

      selectionRow1.innerHTML = "";
      previewElement.innerHTML = "";
      previewElement.style.backgroundColor = "var(--panel-backgrounds)";

      if (playerHand.length === 0) {
        onscreenConsole.log("No cards in hand to discard.");
        resolve();
        return;
      }

      let selectedCard = null;
      let selectedCardImage = null;
      let isDragging = false;

      // ✨ Use a sorted copy for display
      const handForUI = [...playerHand];
      genericCardSort(handForUI);

      setupIndependentScrollGradients(selectionRow1, null);

      handForUI.forEach((card) => {
        const wrap = document.createElement("div");
        wrap.className = "popup-card";

        const img = document.createElement("img");
        img.src = card.image;
        img.alt = card.name;
        img.className = "popup-card-image";

        const hoverIn = () => {
          if (isDragging) return;
          previewElement.innerHTML = "";
          const p = document.createElement("img");
          p.src = card.image;
          p.alt = card.name;
          p.className = "popup-card-preview-image";
          previewElement.appendChild(p);
          if (!selectedCard)
            previewElement.style.backgroundColor = "var(--accent)";
        };
        const hoverOut = () => {
          if (isDragging) return;
          if (!selectedCard) {
            setTimeout(() => {
              if (!selectionRow1.querySelector(":hover") && !isDragging) {
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor =
                  "var(--panel-backgrounds)";
              }
            }, 50);
          }
        };

        wrap.addEventListener("mouseover", hoverIn);
        wrap.addEventListener("mouseout", hoverOut);

        wrap.addEventListener("click", (e) => {
          if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }

          if (selectedCard === card) {
            selectedCard = null;
            img.classList.remove("selected");
            selectedCardImage = null;
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            instructionsElement.textContent = "Select one card to discard.";
            document.getElementById("card-choice-popup-confirm").disabled =
              true;
          } else {
            if (selectedCardImage)
              selectedCardImage.classList.remove("selected");
            selectedCard = card;
            selectedCardImage = img;
            img.classList.add("selected");

            previewElement.innerHTML = "";
            const p = document.createElement("img");
            p.src = card.image;
            p.alt = card.name;
            p.className = "popup-card-preview-image";
            previewElement.appendChild(p);
            previewElement.style.backgroundColor = "var(--accent)";

            instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be discarded.`;
            document.getElementById("card-choice-popup-confirm").disabled =
              false;
          }
        });

        wrap.appendChild(img);
        selectionRow1.appendChild(wrap);
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

        try {
          const idx = playerHand.indexOf(selectedCard);
          if (idx !== -1) {
            const [discardedCard] = playerHand.splice(idx, 1);

            // 🔒 Close picker first
            closeCardChoicePopup();

            const { returned } =
              await checkDiscardForInvulnerability(discardedCard);
            if (returned.length) {
              playerHand.push(...returned);
            }
          }

          updateGameBoard();
          resolve();
        } catch (error) {
          closeCardChoicePopup();
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

function angelDropOffAFriend() {
  return new Promise((resolve, reject) => {
    try {
      if (playerHand.length === 0) {
        console.log(
          "No cards in hand to discard. You are unable to play this card.",
        );
        onscreenConsole.log(
          "No cards in hand to discard. You are unable to use this ability.",
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

      titleElement.textContent = "Angel - Drop Off A Friend";
      instructionsElement.innerHTML =
        'Select a card to discard in order to gain +<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> equal to the selected card\'s cost.';

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

      selectionRow1.innerHTML = "";
      previewElement.innerHTML = "";
      previewElement.style.backgroundColor = "var(--panel-backgrounds)";

      let selectedCard = null;
      let selectedCardImage = null;
      let isDragging = false;

      // ✨ Use a sorted copy (don’t mutate playerHand)
      const handForUI = [...playerHand];
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
              'Select a card to discard in order to gain +<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> equal to the selected card\'s cost.';
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

            instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be discarded.`;
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

        try {
          // Find by object reference (safe because we never cloned card objects)
          const idx = playerHand.indexOf(selectedCard);
          if (idx === -1) throw new Error("Selected card not found in hand");

          const [discardedCard] = playerHand.splice(idx, 1);

          // 🔒 Close THIS popup BEFORE opening the “May” popup
          closeCardChoicePopup();

          // Ask about invulnerability now that the UI is clear
          const { returned, discarded } =
            await checkDiscardForInvulnerability(discardedCard);

          // Only grant attack if it actually stayed discarded
          const actuallyDiscarded =
            discarded && discarded.length ? discarded[0] : null;
          if (actuallyDiscarded) {
            console.log(
              `${actuallyDiscarded.name} discarded during checkDiscardForInvulnerability.`,
            );
          } else if (returned && returned.length) {
            // Card came back to hand; no attack gain.
            playerHand.push(...returned);
          }
          onscreenConsole.log(
            `You gain +${selectedCard.cost}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
          totalAttackPoints += selectedCard.cost;
          cumulativeAttackPoints += selectedCard.cost;

          updateGameBoard();
          resolve(true);
        } catch (error) {
          closeCardChoicePopup();
          reject(error);
        }
      };

      closeButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onscreenConsole.log(
          `You have chosen not to discard, preventing you from activating this ability.`,
        );
        closeCardChoicePopup();
        updateGameBoard();
        resolve(false);
      };

      modalOverlay.style.display = "block";
      cardchoicepopup.style.display = "block";
    } catch (error) {
      reject(error);
    }
  });
}

function angelStrengthOfSpirit() {
  return new Promise(async (resolve) => {
    // Create a copy of the current hand with unique IDs
    const availableCards = playerHand.map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`,
    }));

    // Handle case where there are no cards available
    if (availableCards.length === 0) {
      onscreenConsole.log("No cards available to discard.");
      resolve();
      return;
    }

    // Sort the cards BEFORE setting up the UI
    genericCardSort(availableCards);

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
    titleElement.textContent = "Angel - Strength of Spirit";
    instructionsElement.textContent =
      "Discard any number of cards. Draw that many cards.";

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

    let selectedCards = [];
    let selectedCardImages = new Map();
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card in hand
    availableCards.forEach((card) => {
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
        if (selectedCards.length === 0) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no cards are selected AND we're not hovering over another card
        if (selectedCards.length === 0) {
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

        const thisCardId = cardElement.getAttribute("data-card-id");
        const index = selectedCards.findIndex((c) => c.uniqueId === thisCardId);

        if (index > -1) {
          // Deselect
          selectedCards.splice(index, 1);
          cardImage.classList.remove("selected");
          selectedCardImages.delete(thisCardId);

          // Update preview to show last selected card or clear if none
          if (selectedCards.length > 0) {
            const lastCard = selectedCards[selectedCards.length - 1];
            previewElement.innerHTML = "";
            const previewImage = document.createElement("img");
            previewImage.src = lastCard.image;
            previewImage.alt = lastCard.name;
            previewImage.className = "popup-card-preview-image";
            previewElement.appendChild(previewImage);
            previewElement.style.backgroundColor = "var(--accent)";
          } else {
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          }
        } else {
          // Select new card
          selectedCards.push(card);
          cardImage.classList.add("selected");
          selectedCardImages.set(thisCardId, cardImage);

          // Update preview to show this card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        // Update instructions
        if (selectedCards.length === 0) {
          instructionsElement.textContent =
            "Discard any number of cards. Draw that many cards.";
        } else {
          const namesList = selectedCards
            .map(
              (card) => `<span class="console-highlights">${card.name}</span>`,
            )
            .join(", ");
          instructionsElement.innerHTML = `Selected ${selectedCards.length} card${selectedCards.length !== 1 ? "s" : ""}: ${namesList} will be discarded.`;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (availableCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (availableCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (availableCards.length > 5) {
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

    // Enable confirm initially (can confirm with 0 selections) and hide unnecessary buttons
    confirmButton.disabled = false;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const numToDraw = selectedCards.length;

      if (selectedCards.length === 0) {
        onscreenConsole.log(`You chose not to discard any cards.`);
      }

      // Discard selected cards - use the original card objects from playerHand
      const cardsToDiscard = [];
      for (const selectedCard of selectedCards) {
        // Find the actual card in playerHand by ID (not index)
        const cardIndex = playerHand.findIndex((c) => c.id === selectedCard.id);
        if (cardIndex !== -1) {
          const [discardedCard] = playerHand.splice(cardIndex, 1);
          cardsToDiscard.push(discardedCard);
        }
      }

      closeCardChoicePopup();
      updateGameBoard();

      // Process discard effects for all discarded cards
      for (const card of cardsToDiscard) {
        const { returned } = await checkDiscardForInvulnerability(card);
        if (returned.length) {
          playerHand.push(...returned);
        }
      }

      updateGameBoard();

      // Draw new cards
      for (let i = 0; i < numToDraw; i++) {
        await extraDraw();
      }

      resolve();
    };

    // Close button handler (No Thanks action)
    closeButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      closeCardChoicePopup();
      onscreenConsole.log(`You chose not to discard any cards.`);
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function xforcewolverineSuddenAmbush() {
  if (extraCardsDrawnThisTurn > 0) {
    onscreenConsole.log(
      `You have drawn extra cards this turn. +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
    totalAttackPoints += 2;
    cumulativeAttackPoints += 2;
    updateGameBoard();
  } else {
    onscreenConsole.log(
      `You haven't drawn any extra cards this turn. No <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  }
}

function xforcewolverineAnimalInstincts() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function xforcewolverineNoMercy() {
  extraDraw();
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
    titleElement.textContent = "X-Force Wolverine - No Mercy";
    instructionsElement.innerHTML = `Do you wish to KO a card from your hand or discard pile?`;

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
        instructionsElement.innerHTML = `Do you wish to KO a card from your hand or discard pile?`;
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

    // Confirm button handler - use ID-based removal
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        let cardRemoved = false;

        if (selectedLocation === "discard pile") {
          // Find by ID in the original array
          const index = playerDiscardPile.findIndex(
            (c) => c.id === selectedCard.id,
          );
          if (index !== -1) {
            const [removedCard] = playerDiscardPile.splice(index, 1);
            koPile.push(removedCard);
            cardRemoved = true;
          }
        } else {
          // Find by ID in the original array
          const index = playerHand.findIndex((c) => c.id === selectedCard.id);
          if (index !== -1) {
            const [removedCard] = playerHand.splice(index, 1);
            koPile.push(removedCard);
            cardRemoved = true;
          }
        }

        if (cardRemoved) {
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

function xforcewolverineRecklessAbandon() {
  // Store initial value before any drawing occurs
  const cardsToDraw = extraCardsDrawnThisTurn;

  if (cardsToDraw <= 0) {
    onscreenConsole.log(`You haven't drawn any extra cards this turn.`);
    return;
  }

  const plural = cardsToDraw > 1 ? "s" : "";
  onscreenConsole.log(`Drawing ${cardsToDraw} extra card${plural}...`);

  // Draw exactly the initial amount, regardless of future increments
  for (let i = 0; i < cardsToDraw; i++) {
    if (playerDeck.length === 0) {
      if (playerDiscardPile.length === 0) {
        onscreenConsole.log(`Stopped early - no more cards to draw!`);
        break;
      }
      // Reshuffle discard into deck if needed
      playerDeck = shuffle(playerDiscardPile);
      playerDiscardPile = [];
    }

    extraDraw(); // This may increment extraCardsDrawnThisTurn, but we're using cardsToDraw
  }

  // Optional: Log how many were actually drawn
  const actuallyDrawn = Math.min(
    cardsToDraw,
    cardsToDraw + (playerDeck.length + playerDiscardPile.length),
  );
  if (actuallyDrawn < cardsToDraw) {
    onscreenConsole.log(
      `Successfully drew ${actuallyDrawn} of ${cardsToDraw} attempted card${plural}`,
    );
  }
}

function jeangreyReadYourThoughts() {
  jeanGreyBystanderRecruit += 1;
  onscreenConsole.log(
    'Whenever you rescue a Bystander this turn, you get +1<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.',
  );
}

function jeangreyMindOverMatter() {
  jeanGreyBystanderDraw += 1;
  onscreenConsole.log(
    "Whenever you rescue a Bystander this turn, draw a card.",
  );
}

function jeangreyTelekineticMastery() {
  jeanGreyBystanderAttack += 1;
  onscreenConsole.log(
    'Whenever you rescue a Bystander this turn, you get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.',
  );
}

async function jeanGreyXMenBystanders() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  const previousCards = cardsPlayedThisTurn.slice(0, -1);
  for (
    let i = 0;
    i < previousCards.filter((item) => item.team === "X-Men").length;
    i++
  ) {
    if (previousCards.filter((item) => item.team === "X-Men").length > 0) {
      await rescueBystander();
    } else {
      return;
    }
  }
}

async function jeangreyPsychicSearch() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  await rescueBystander();
}

function icemanIceSlide() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  const previousCards = cardsPlayedThisTurn.slice(0, -1);
  let rangeCardsPlayedThisTurn = previousCards.filter(
    (card) => card.classes && card.classes.includes("Range"),
  ).length;

  totalAttackPoints += rangeCardsPlayedThisTurn;
  cumulativeAttackPoints += rangeCardsPlayedThisTurn;

  onscreenConsole.log(
    `${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero${rangeCardsPlayedThisTurn > 1 ? "es have" : " has"} been played. +${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
}

function icemanDeepFreeze() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  const previousCards = cardsPlayedThisTurn.slice(0, -1);
  let rangeCardsPlayedThisTurn = previousCards.filter(
    (card) => card.classes && card.classes.includes("Range"),
  ).length;

  totalRecruitPoints += rangeCardsPlayedThisTurn;
  cumulativeRecruitPoints += rangeCardsPlayedThisTurn;

  onscreenConsole.log(
    `${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero${rangeCardsPlayedThisTurn > 1 ? "es have" : " has"} been played. +${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
  );
}

function icemanFrostSpikeArmor() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  const previousCards = cardsPlayedThisTurn.slice(0, -1);
  let rangeCardsPlayedThisTurn = previousCards.filter(
    (card) => card.classes && card.classes.includes("Range"),
  ).length;

  onscreenConsole.log(
    `${rangeCardsPlayedThisTurn} <img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Hero${rangeCardsPlayedThisTurn > 1 ? "es have" : " has"} been played. If available, ${rangeCardsPlayedThisTurn} card${rangeCardsPlayedThisTurn > 1 ? "s" : ""} will be drawn.`,
  );

  for (let i = 0; i < rangeCardsPlayedThisTurn; i++) {
    extraDraw();
  }
}

function elektraFirstStrike() {
  if (cardsPlayedThisTurn.length === 1) {
    totalAttackPoints += 1;
    cumulativeAttackPoints += 1;
    onscreenConsole.log(
      `<span class="console-highlights">Elektra - First Strike</span> is the first card you have played this turn. +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
    updateGameBoard();
  } else {
    onscreenConsole.log(
      `<span class="console-highlights">Elektra - First Strike</span> was not the first card you played this turn. No <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  }
}

function elektraNinjitsu() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
  );
  bonusRecruit();
}

function elektraSaiBlades() {
  let minimalCostCount = 0;
  const playedCards = cardsPlayedThisTurn.slice(0, -1);
  let minimalCostText = "Heroes";

  playedCards.forEach((card) => {
    if (card.cost === 1 || card.cost === 2) {
      minimalCostCount++;
    }
  });

  if (minimalCostCount === 1) {
    minimalCostText = "Hero";
  } else {
    minimalCostText = "Heroes";
  }

  totalAttackPoints += minimalCostCount;
  cumulativeAttackPoints += minimalCostCount;

  console.log(`Number of odd cost cards: ${minimalCostCount}`);
  console.log(`${minimalCostCount} added to Attack points.`);

  onscreenConsole.log(
    `Special Ability: You have played ${minimalCostCount} ${minimalCostText} that cost <b>1</b> or <b>2</b> <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${minimalCostCount}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  updateGameBoard();
}

function elektraSilentMeditationRecruit() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
  );
  bonusRecruit();
}

function elektraSilentMeditation() {
  silentMeditationRecruit = true;
  onscreenConsole.log(
    `The next Hero you recruit this turn will go into your hand.`,
  );
}

function colossusInvulnerability(card) {
  // 1. First check if we even got a card
  if (!card) {
    console.error(`⚠️ No card provided to colossusInvulnerability`);
    return;
  }

  // 2. Find ANY Colossus - Invulnerability card in the hand (since we only care about the name)
  const colossusInHand = playerHand.filter(
    (handCard) => handCard.name === "Colossus - Invulnerability",
  );

  // 3. If no Colossus - Invulnerability found, show error
  if (colossusInHand.length === 0) {
    console.error(
      "🚨 No Colossus - Invulnerability card found in hand. Current hand:",
      playerHand,
    );
    return;
  }

  // 4. Take THE FIRST Colossus - Invulnerability card found (even if multiple exist)
  const colossusCard = colossusInHand[0];
  const cardIndex = playerHand.indexOf(colossusCard); // Now we have the exact reference

  // 5. Move it to discard
  playerHand.splice(cardIndex, 1);
  playerDiscardPile.push(colossusCard);

  // 6. Do the rest of the ability
  onscreenConsole.log(
    `<span class="console-highlights">Colossus - Invulnerability</span><span class="bold-spans">'s</span> ability activated! You avoided gaining a Wound.`,
  );
  extraDraw();
  extraDraw();
  updateGameBoard();
}

function colossusSilentStatue() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function ghostRiderHellOnWheels() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
  );
  bonusRecruit();
}

function ghostRiderBlazingHellfire() {
  return new Promise((resolve) => {
    const villainsInVP = victoryPile
      .map((card, index) =>
        card && card.type === "Villain"
          ? { ...card, id: `vp-${index}`, index }
          : null,
      )
      .filter((card) => card !== null);

    if (villainsInVP.length === 0) {
      onscreenConsole.log("There are no Villains in your Victory Pile to KO.");
      resolve();
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
    titleElement.textContent = "Ghost Rider - Blazing Hellfire";
    instructionsElement.innerHTML =
      'You may KO a Villain from your Victory Pile. If you do, you get +3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.';

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

    let selectedVillain = null;
    let selectedIndex = null;
    let selectedCardImage = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each villain in victory pile
    villainsInVP.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-card-index", card.index);

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
        if (selectedVillain === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedVillain === null) {
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

        if (selectedVillain === card) {
          // Deselect
          selectedVillain = null;
          selectedIndex = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
            'You may KO a Villain from your Victory Pile. If you do, you get +3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.';
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedVillain = card;
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
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be KO'd.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
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
    confirmButton.textContent = "KO Selected Villain";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedVillain) return;

      // KO the selected villain from victory pile
      victoryPile.splice(selectedIndex, 1);
      koPile.push(selectedVillain);
      totalAttackPoints += 3;
      cumulativeAttackPoints += 3;

      console.log(`${selectedVillain.name} KO'd from Victory Pile.`);
      onscreenConsole.log(
        `<span class="console-highlights">${selectedVillain.name}</span> has been KO'd from your Victory Pile. You gain +3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
      );

      koBonuses();
      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    // Close button handler (No Thanks action)
    closeButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function ghostRiderInfernalChains() {
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
      "SELECT A VILLAIN WITH LESS THAN 4 ATTACK TO DEFEAT:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedHQIndex = null;
    let selectedCell = null;
    let telepathicProbeVillain = null;
    let telepathicProbeSelected = false;
    let demonGoblinSelected = false;
    let viewingHQ = false; // Track whether we're viewing city or HQ

    const selectedScheme = schemes.find(
      (s) =>
        s.name ===
        document.querySelector(
          "#scheme-section input[type=radio]:checked",
        ).value,
    );

    // Check for eligible villains in city
    const eligibleVillainsInCity = city.some((card, index) => {
      if (card && card.type === "Villain" && !destroyedSpaces[index]) {
        const villainAttack = recalculateVillainAttack(card);
        return villainAttack < 4;
      }
      return false;
    });

    // Check for eligible villains in HQ if scheme is active
    const eligibleVillainsInHQ = selectedScheme.name === 'Invade the Daily Bugle News HQ' ? 
      hq.some((card, index) => {
        if (card && card.type === "Villain") {
          const villainAttack = recalculateHQVillainAttack(card);
          return villainAttack < 4;
        }
        return false;
      }) : false;

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

      if (villainAttack < 4) {
        telepathicProbeVillain = {
          ...topVillainCard,
          telepathicProbe: true,
          telepathicProbeCard: telepathicProbeCard,
        };
      }
    }

    // Check for Demon Goblin
    const hasDemonGoblin = demonGoblinDeck.length > 0;

    // If no eligible villains at all
    if (!eligibleVillainsInCity && !telepathicProbeVillain && !hasDemonGoblin && !eligibleVillainsInHQ) {
      onscreenConsole.log("There are no Villains available to defeat.");
      resolve();
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

          // Determine eligibility - Villains with less than 4 attack
          const isVillain = card.type === "Villain";
          const villainAttack = isVillain ? recalculateVillainAttack(card) : 0;
          const isEligible = isVillain && villainAttack < 4;

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
                  "SELECT A VILLAIN WITH LESS THAN 4 ATTACK TO DEFEAT:";
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

                // Deselect Telepathic Probe and Demon Goblin if they were selected
                if (telepathicProbeSelected) {
                  telepathicProbeSelected = false;
                  choice1.style.backgroundColor = "rgb(204, 204, 204)";
                  choice1.style.transform = `none`;
                  choice1.style.boxShadow = `none`;
                  choice1.style.animation = `none`;
                  choice1.style.outline = "none";
                  choice1.style.outlineStyle = "none";
                }
                if (demonGoblinSelected) {
                  demonGoblinSelected = false;
                  choice2.style.backgroundColor = "rgb(204, 204, 204)";
                  choice2.style.transform = `none`;
                  choice2.style.boxShadow = `none`;
                  choice2.style.animation = `none`;
                  choice2.style.outline = "none";
                  choice2.style.outlineStyle = "none";
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

          // Determine eligibility - Villains with less than 4 attack
          const isVillain = card.type === "Villain";
          const villainAttack = isVillain ? recalculateHQVillainAttack(card) : 0;
          const isDestroyed = explosionValue >= 6;
          const isEligible = isVillain && villainAttack < 4 && !isDestroyed;

          // Apply greyed out styling for ineligible cards
          if (!isEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain cards to avoid the city-specific attack calculation error
          if (isVillain && card) {
            addCardOverlays(cardContainer, card, index, 'hq');
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

                // Update instructions and confirm button
                instructionsElement.textContent =
                  "SELECT A VILLAIN WITH LESS THAN 4 ATTACK TO DEFEAT:";
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

                // Deselect Telepathic Probe and Demon Goblin if they were selected
                if (telepathicProbeSelected) {
                  telepathicProbeSelected = false;
                  choice1.style.backgroundColor = "rgb(204, 204, 204)";
                  choice1.style.transform = `none`;
                  choice1.style.boxShadow = `none`;
                  choice1.style.animation = `none`;
                  choice1.style.outline = "none";
                  choice1.style.outlineStyle = "none";
                }
                if (demonGoblinSelected) {
                  demonGoblinSelected = false;
                  choice2.style.backgroundColor = "rgb(204, 204, 204)";
                  choice2.style.transform = `none`;
                  choice2.style.boxShadow = `none`;
                  choice2.style.animation = `none`;
                  choice2.style.outline = "none";
                  choice2.style.outlineStyle = "none";
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
    const choice1 = document.getElementById(
      "card-choice-city-hq-popup-choice1",
    );
    const choice2 = document.getElementById(
      "card-choice-city-hq-popup-choice2",
    );
    const otherChoiceButton = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "DEFEAT SELECTED VILLAIN";

    // Set up Choice1 button for Telepathic Probe villain
    if (telepathicProbeVillain) {
      choice1.style.display = "inline-block";
      choice1.textContent = `DEFEAT ${telepathicProbeVillain.name} (TELEPATHIC PROBE)`;
      choice1.style.backgroundColor = "rgb(204, 204, 204)";
      choice1.style.border = `0.5vh solid var(--accent)`;
      choice1.style.color = "#282828";
      choice1.disabled = false;

      // Choice1 button handler for Telepathic Probe villain
      choice1.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (telepathicProbeSelected) {
          // Deselect Telepathic Probe
          telepathicProbeSelected = false;
          choice1.style.backgroundColor = "rgb(204, 204, 204)";
          choice1.style.transform = `none`;
          choice1.style.boxShadow = `none`;
          choice1.style.animation = `none`;
          choice1.style.outline = "none";
          choice1.style.outlineStyle = "none";
          
          selectedCityIndex = null;
          selectedHQIndex = null;
          if (selectedCell) {
            selectedCell.classList.remove("selected");
            selectedCell = null;
          }
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          instructionsElement.textContent =
            "SELECT A VILLAIN WITH LESS THAN 4 ATTACK TO DEFEAT:";
          confirmButton.disabled = true;
        } else {
          // Select Telepathic Probe
          telepathicProbeSelected = true;
          choice1.style.backgroundColor = "rgb(204, 204, 204)";
          choice1.style.color = "#282828";
          choice1.style.transform = `scale(1.02)`;
          choice1.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.3)`;
          choice1.style.animation = `filter-animation 1s infinite`;
          choice1.style.outline = "var(--selectedButton)";
          choice1.style.outlineStyle = "solid";

          // Deselect any city/HQ selection and Demon Goblin
          selectedCityIndex = null;
          selectedHQIndex = null;
          if (selectedCell) {
            selectedCell.classList.remove("selected");
            selectedCell = null;
          }
          if (demonGoblinSelected) {
            demonGoblinSelected = false;
            choice2.style.backgroundColor = "rgb(204, 204, 204)";
            choice2.style.transform = `none`;
            choice2.style.boxShadow = `none`;
            choice2.style.animation = `none`;
            choice2.style.outline = "none";
            choice2.style.outlineStyle = "none";
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
      choice1.style.display = "none";
    }

    // Set up Choice2 button for Demon Goblin
    if (hasDemonGoblin) {
      choice2.style.display = "inline-block";
      choice2.textContent = `DEFEAT DEMON GOBLIN`;
      choice2.style.backgroundColor = "rgb(204, 204, 204)";
      choice2.style.border = `0.5vh solid var(--accent)`;
      choice2.style.color = "#282828";
      choice2.disabled = false;

      // Choice2 button handler for Demon Goblin
      choice2.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (demonGoblinSelected) {
          // Deselect Demon Goblin
          demonGoblinSelected = false;
          choice2.style.backgroundColor = "rgb(204, 204, 204)";
          choice2.style.transform = `none`;
          choice2.style.boxShadow = `none`;
          choice2.style.animation = `none`;
          choice2.style.outline = "none";
          choice2.style.outlineStyle = "none";
          selectedCityIndex = null;
          selectedHQIndex = null;
          if (selectedCell) {
            selectedCell.classList.remove("selected");
            selectedCell = null;
          }
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          instructionsElement.textContent =
            "SELECT A VILLAIN WITH LESS THAN 4 ATTACK TO DEFEAT:";
          confirmButton.disabled = true;
        } else {
          // Select Demon Goblin
          demonGoblinSelected = true;
          choice2.style.backgroundColor = "rgb(204, 204, 204)";
          choice2.style.color = "#282828";
          choice2.style.transform = `scale(1.02)`;
          choice2.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.3)`;
          choice2.style.animation = `filter-animation 1s infinite`;
          choice2.textContent = "DEFEAT DEMON GOBLIN";
          choice2.style.outline = "var(--selectedButton)";
          choice2.style.outlineStyle = "solid";

          // Deselect any city/HQ selection and Telepathic Probe
          selectedCityIndex = null;
          selectedHQIndex = null;
          if (selectedCell) {
            selectedCell.classList.remove("selected");
            selectedCell = null;
          }
          if (telepathicProbeSelected) {
            telepathicProbeSelected = false;
            choice1.style.backgroundColor = "rgb(204, 204, 204)";
            choice1.style.transform = `none`;
            choice1.style.boxShadow = `none`;
            choice1.style.animation = `none`;
            choice1.style.outline = "none";
            choice1.style.outlineStyle = "none";
          }

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src =
            "Visual Assets/Other/Transform Citizens Into Demons/demonGoblin.webp";
          previewImage.alt = "Demon Goblin";
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">Demon Goblin</span> will be defeated.`;
          confirmButton.disabled = false;
        }
      };
    } else {
      choice2.style.display = "none";
    }

    // Set up Other Choice button as toggle between City and HQ
    if (selectedScheme.name === 'Invade the Daily Bugle News HQ' && eligibleVillainsInHQ) {
      otherChoiceButton.style.display = "inline-block";
      otherChoiceButton.textContent = "SWITCH TO HQ";
      otherChoiceButton.disabled = false;

      otherChoiceButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Clear any selections
        selectedCityIndex = null;
        selectedHQIndex = null;
        telepathicProbeSelected = false;
        demonGoblinSelected = false;
        if (selectedCell) {
          selectedCell.classList.remove("selected");
          selectedCell = null;
        }
        previewElement.innerHTML = "";
        previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        confirmButton.disabled = true;

        // Reset choice buttons if they were selected
        if (telepathicProbeVillain) {
          choice1.style.backgroundColor = "rgb(204, 204, 204)";
          choice1.style.transform = `none`;
          choice1.style.boxShadow = `none`;
          choice1.style.animation = `none`;
          choice1.style.outline = "none";
          choice1.style.outlineStyle = "none";
        }
        if (hasDemonGoblin) {
          choice2.style.backgroundColor = "rgb(204, 204, 204)";
          choice2.style.transform = `none`;
          choice2.style.boxShadow = `none`;
          choice2.style.animation = `none`;
          choice2.style.outline = "none";
          choice2.style.outlineStyle = "none";
        }

        // Toggle between City and HQ views
        if (viewingHQ) {
          renderCityCards();
          otherChoiceButton.textContent = "SWITCH TO HQ";
          instructionsElement.textContent = "SELECT A VILLAIN WITH LESS THAN 4 ATTACK TO DEFEAT:";
        } else {
          renderHQCards();
          otherChoiceButton.textContent = "SWITCH TO CITY";
          instructionsElement.textContent = "SELECT A VILLAIN WITH LESS THAN 4 ATTACK TO DEFEAT:";
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

      if (
        selectedCityIndex === null &&
        selectedHQIndex === null &&
        !telepathicProbeSelected &&
        !demonGoblinSelected
      )
        return;

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
      } else if (demonGoblinSelected) {
        // Handle Demon Goblin defeat
        const demonBystander = demonGoblinDeck.pop();
        victoryPile.push(demonBystander);

        onscreenConsole.log(
          `<span class="console-highlights">${demonBystander.name}</span> has been rescued for free.`,
        );

        defeatBonuses();
        bystanderBonuses();
        await rescueBystanderAbility(demonBystander);
      } else if (selectedCityIndex !== null) {
        // Handle regular city villain defeat
        onscreenConsole.log(
          `You have defeated <span class="console-highlights">${city[selectedCityIndex].name}</span> for free.`,
        );
        await instantDefeatAttack(selectedCityIndex);
      } else if (selectedHQIndex !== null) {
        // Handle HQ villain defeat
        const hqVillain = hq[selectedHQIndex];
        onscreenConsole.log(
          `You have defeated <span class="console-highlights">${hqVillain.name}</span> in HQ for free.`,
        );
        await instantDefeatHQVillain(selectedHQIndex);
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

      onscreenConsole.log(
        `Defeating <span class="console-highlights">${villainCard.name}</span> for free using <span class="console-highlights">Professor X - Telepathic Probe</span>.`,
      );

      // Remove villain from deck and add to victory pile (NO point deduction)
      villainDeck.pop();
      victoryPile.push(villainCard);

      onscreenConsole.log(
        `<span class="console-highlights">${villainCard.name}</span> has been defeated for free.`,
      );

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


function ghostRiderPenanceStare() {
  return new Promise((resolve) => {
    const previousCards = cardsPlayedThisTurn.slice(0, -1);

    if (
      previousCards.filter((item) => item.team === "Marvel Knights").length > 0
    ) {
      onscreenConsole.log(
        `<img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
      );
      onscreenConsole.log(
        `Any Villain KO'd would be returned to your Victory Pile. 1+<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
      );
      totalAttackPoints += 1;
      cumulativeAttackPoints += 1;
      updateGameBoard();
      resolve();
      return;
    }

    const villainsInVP = victoryPile
      .map((card, index) =>
        card && card.type === "Villain"
          ? { ...card, id: `vp-${index}`, index }
          : null,
      )
      .filter((card) => card !== null);

    if (villainsInVP.length === 0) {
      onscreenConsole.log("There are no Villains in your Victory Pile to KO.");
      resolve();
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
    titleElement.textContent = "Ghost Rider - Penance Stare";
    instructionsElement.innerHTML =
      'Select a Villain from your Victory Pile to KO. You get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.';

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
    closeButton.style.display = "none";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedVillain = null;
    let selectedIndex = null;
    let selectedCardImage = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each villain in victory pile
    villainsInVP.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-card-index", card.index);

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
        if (selectedVillain === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedVillain === null) {
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

        if (selectedVillain === card) {
          // Deselect
          selectedVillain = null;
          selectedIndex = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
            'Select a Villain from your Victory Pile to KO. You get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.';
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedVillain = card;
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
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be KO'd.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    // Adjust layout based on number of cards
    if (villainsInVP.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (villainsInVP.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (villainsInVP.length > 5) {
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

    // Configure buttons
    confirmButton.textContent = "KO Selected Villain";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedVillain) return;
      closeCardChoicePopup();

      // KO the selected villain from victory pile
      victoryPile.splice(selectedIndex, 1);
      koPile.push(selectedVillain);
      totalAttackPoints += 1;
      cumulativeAttackPoints += 1;

      console.log(`${selectedVillain.name} KO'd from Victory Pile.`);
      onscreenConsole.log(
        `<span class="console-highlights">${selectedVillain.name}</span> has been KO'd from your Victory Pile. You gain +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
      );

      koBonuses();
      updateGameBoard();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";

    function closeCardChoicePopup() {
      // Reset UI
      titleElement.textContent = "Hero Ability!";
      instructionsElement.textContent = "Context";
      confirmButton.textContent = "Confirm";
      confirmButton.disabled = true;
      previewElement.innerHTML = "";
      previewElement.style.backgroundColor = "var(--panel-backgrounds)";

      // Hide popup
      cardchoicepopup.style.display = "none";
      modalOverlay.style.display = "none";
    }
  });
}

function ironfistFocusChi() {
  const allCards = [
    ...playerHand, // Include all cards from hand
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  console.log("Combined allCards:", allCards);

  const uniqueCosts = new Set();

  allCards.forEach((card) => {
    // Treat undefined/null cost as 0, and include 0 costs
    const cost = card.cost !== undefined && card.cost !== null ? card.cost : 0;
    uniqueCosts.add(cost);
    console.log(`Card cost added: ${cost}`);
  });

  const uniqueCostCount = uniqueCosts.size;
  console.log("Unique costs found:", uniqueCostCount);

  const recruitPointsToAdd = uniqueCostCount;
  totalRecruitPoints += recruitPointsToAdd;
  cumulativeRecruitPoints += recruitPointsToAdd;
  console.log("Updated totalRecruitPoints:", totalRecruitPoints);
  console.log("Updated cumulativeRecruitPoints:", cumulativeRecruitPoints);

  updateGameBoard();
  console.log(
    `You have ${uniqueCostCount} cards with different costs. ${recruitPointsToAdd} Recruit points have been added.`,
  );
  onscreenConsole.log(
    `Special Ability: You have ${uniqueCostCount} card${uniqueCostCount > 1 ? "s" : ""} with a different <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${uniqueCostCount} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
  );
}

function ironfistWieldTheIronFist() {
  const allCards = [
    ...playerHand, // Include all cards from hand
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  console.log("Combined allCards:", allCards);

  const uniqueCosts = new Set();

  allCards.forEach((card) => {
    // Treat undefined/null cost as 0, and include 0 costs
    const cost = card.cost !== undefined && card.cost !== null ? card.cost : 0;
    uniqueCosts.add(cost);
    console.log(`Card cost added: ${cost}`);
  });

  const uniqueCostCount = uniqueCosts.size;
  console.log("Unique costs found:", uniqueCostCount);

  const attackPointsToAdd = uniqueCostCount;
  totalAttackPoints += attackPointsToAdd;
  cumulativeAttackPoints += attackPointsToAdd;
  console.log("Updated totalAttackPoints:", totalAttackPoints);
  console.log("Updated cumulativeAttackPoints:", cumulativeAttackPoints);

  updateGameBoard();
  console.log(
    `You have ${uniqueCostCount} cards with different costs. ${attackPointsToAdd} Attack points have been added.`,
  );
  onscreenConsole.log(
    `Special Ability: You have ${uniqueCostCount} card${uniqueCostCount > 1 ? "s" : ""} with a different <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. +${uniqueCostCount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
}

function ironfistAncientLegacy() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"><img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`,
  );
  const cardImage =
    "Visual Assets/Heroes/Dark City/DarkCity_IronFist_AncientLegacy.webp";
  const amount = 2;
  versatile(amount, cardImage);
}

async function versatile(amount, cardImage) {
  playSFX("versatile");
  return new Promise((resolve) => {
    if (trueVersatility) {
      onscreenConsole.log(
        `Thanks to <span class="console-highlights">Domino - Against All Odds</span>, you gain both ${amount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> <span class="bold-spans">and</span> <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">.`,
      );
      totalAttackPoints += amount;
      cumulativeAttackPoints += amount;
      totalRecruitPoints += amount;
      cumulativeRecruitPoints += amount;
      updateGameBoard();
      resolve(); // Resolve immediately for trueVersatility case
      return;
    }

    // Get popup elements
    const popup = document.querySelector(".info-or-choice-popup");
    const title = document.querySelector(".info-or-choice-popup-title");
    const instructions = document.querySelector(
      ".info-or-choice-popup-instructions",
    );
    const preview = document.querySelector(".info-or-choice-popup-preview");
    const confirmBtn = document.getElementById("info-or-choice-popup-confirm");
    const otherChoiceBtn = document.getElementById(
      "info-or-choice-popup-otherchoice",
    );
    const noThanksBtn = document.getElementById(
      "info-or-choice-popup-nothanks",
    );
    const modalOverlay = document.getElementById("modal-overlay");
    document.querySelector(".info-or-choice-popup-closebutton").style.display =
      "none";

    // Configure popup
    title.textContent = "VERSATILE";
    instructions.innerHTML = `DO YOU WISH TO GAIN ${amount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> or <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons">?`;

    // Set up card preview using background image
    preview.style.backgroundImage = `url('${cardImage}')`;
    preview.style.backgroundSize = "contain";
    preview.style.backgroundRepeat = "no-repeat";
    preview.style.backgroundPosition = "center";
    preview.innerHTML = ""; // Clear any existing content

    // Configure buttons
    confirmBtn.textContent = `ATTACK`;
    confirmBtn.style.display = "block";

    otherChoiceBtn.textContent = `RECRUIT`;
    otherChoiceBtn.style.display = "block";

    noThanksBtn.style.display = "none"; // Not needed for this choice

    // Show popup and overlay
    popup.style.display = "block";
    if (modalOverlay) modalOverlay.style.display = "block";

    // Set up button event handlers
    const cleanup = () => {
      closeInfoChoicePopup();
      updateGameBoard();
    };

    const complete = () => {
      cleanup();
      resolve(); // Resolve the Promise when done
    };

    confirmBtn.onclick = () => {
      onscreenConsole.log(
        `You gain +${amount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
      );
      totalAttackPoints += amount;
      cumulativeAttackPoints += amount;
      complete();
    };

    otherChoiceBtn.onclick = () => {
      onscreenConsole.log(
        `You gain +${amount} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
      );
      totalRecruitPoints += amount;
      cumulativeRecruitPoints += amount;
      complete();
    };
  });
}

function ironfistLivingWeapon() {
  let revealedCards = [];
  let seenCosts = new Set();
  let duplicateFound = false;
  let totalCardsAvailable =
    playerDeck.length + (playerDiscardPile?.length || 0);

  if (totalCardsAvailable === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
    return;
  }

  while (!duplicateFound && revealedCards.length < totalCardsAvailable) {
    // Reshuffle discard pile if deck is empty
    if (playerDeck.length === 0) {
      if (playerDiscardPile?.length > 0) {
        playerDeck = shuffle([...playerDiscardPile]);
        playerDiscardPile = [];
      } else {
        break;
      }
    }

    const currentCard = playerDeck.pop(); // Take from top of deck

    // Check for duplicate cost
    if (seenCosts.has(currentCard.cost)) {
      duplicateFound = true;
      revealedCards.push(currentCard); // Include the matching card
      break;
    }

    seenCosts.add(currentCard.cost);
    revealedCards.push(currentCard);
  }

  // Put revealed cards back on TOP of deck (in reverse order)
  playerDeck.push(...revealedCards.reverse());

  if (duplicateFound) {
    onscreenConsole.log(
      `${revealedCards.length} cards were revealed until a matching <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> was found. These cards will now be drawn.`,
    );
  } else {
    onscreenConsole.log(
      `All available cards were revealed without finding a matching <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. All cards will now be drawn.`,
    );
  }

  // Draw the revealed cards
  for (let i = 0; i < revealedCards.length; i++) {
    extraDraw(); // Will now draw from the cards we put back on top
  }

  revealedCards = [];
}

function punisherThePunisher() {
  if (heroDeck.length === 0) {
    onscreenConsole.log(`Hero deck is empty - no cards available to reveal.`);
    return;
  }

  let revealedCards = [];
  let seenCosts = new Set();
  let duplicateFound = false;

  for (let i = 0; i < heroDeck.length && !duplicateFound; i++) {
    const currentCard = heroDeck[i];
    revealedCards.push(currentCard);

    onscreenConsole.log(
      `Revealed: <span class="console-highlights">${currentCard.name}</span>. <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> = ${currentCard.cost}.`,
    );

    if (seenCosts.has(currentCard.cost)) {
      duplicateFound = true;
    } else {
      seenCosts.add(currentCard.cost);
    }
  }

  const attackGained = revealedCards.length;
  totalAttackPoints += attackGained;
  cumulativeAttackPoints += attackGained;

  if (duplicateFound) {
    onscreenConsole.log(
      `${revealedCards.length} cards were revealed until a matching <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> was found. +${attackGained}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  } else {
    onscreenConsole.log(
      `All available cards were revealed without finding a matching <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">.  +${attackGained}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );
  }

  heroDeck.splice(0, revealedCards.length);

  if (revealedCards.length > 0) {
    const shuffledRevealed = shuffle([...revealedCards]);

    heroDeck.push(...shuffledRevealed);
    onscreenConsole.log(
      `All revealed Heroes have been shuffled and added to the bottom of the Hero deck.`,
    );
  }
}

function punisherBoomGoesTheDynamiteConditional() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  extraDraw();
}

function punisherBoomGoesTheDynamite() {
  // Check if both playerDeck and playerDiscardPile are empty
  if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
    console.log("No cards available to draw.");
    onscreenConsole.log("No cards available to reveal.");
    return;
  }

  // If playerDeck is empty but playerDiscardPile has cards, reshuffle discard pile into deck
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.cost === 0) {
    playerDeck.pop();
    koPile.push(topCardPlayerDeck);
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> with a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of 0. They have been KO'd.`,
    );
    koBonuses();
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> with a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of ${topCardPlayerDeck.cost}. They have not been KO'd.`,
    );
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function punisherHailOfBullets() {
  if (villainDeck.length === 0) {
    onscreenConsole.log(`No cards in the Villain deck to reveal.`);
    return;
  }

  const topCardVillainDeck = villainDeck[villainDeck.length - 1];
  topCardVillainDeck.revealed = true;
  const victoryPoints = Number.isInteger(topCardVillainDeck.victoryPoints)
    ? topCardVillainDeck.victoryPoints
    : 0;

  if (topCardVillainDeck.type === "Villain") {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardVillainDeck.name}</span>, worth ${victoryPoints}. +${victoryPoints} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
    );

    totalAttackPoints += victoryPoints;
    cumulativeAttackPoints += victoryPoints;
    updateGameBoard();
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardVillainDeck.name}</span>. This card is not a Villain.`,
    );
  }
}

async function punisherHailOfBulletsDefeat() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"><img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`,
  );

  if (villainDeck.length === 0) {
    onscreenConsole.log(`No cards in the Villain deck to reveal.`);
    return;
  }

  const topCardVillainDeck = villainDeck[villainDeck.length - 1];

  if (topCardVillainDeck.type !== "Villain") {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardVillainDeck.name}</span>. This card is not a Villain.`,
    );
    return;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `DO YOU WISH TO DEFEAT <span class="bold-spans">${topCardVillainDeck.name}</span> FOR FREE?`,
        "Defeat Villain",
        "No Thanks!",
      );

      // Update title for first popup
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Punisher - Hail of Bullets";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for villain card image
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('${topCardVillainDeck.image}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      // Moved denyButton event handler outside of confirmButton handler
      denyButton.onclick = () => {
        onscreenConsole.log(
          `You have chosen not to defeat <span class="console-highlights">${topCardVillainDeck.name}</span>.`,
        );
        closeInfoChoicePopup();
        updateGameBoard();
        resolve();
      };

      confirmButton.onclick = async () => {
        onscreenConsole.log(
          `You have chosen to defeat <span class="console-highlights">${topCardVillainDeck.name}</span> for free.`,
        );

        closeInfoChoicePopup();
        villainDeck.pop(topCardVillainDeck);
        victoryPile.push(topCardVillainDeck);
        updateGameBoard();

        if (hasProfessorXMindControl) {
          await professorXMindControlGainVillain(villainCard);
        }
        if (rescueExtraBystanders > 0) {
          for (let i = 0; i < rescueExtraBystanders; i++) {
            await rescueBystander();
          }
        }
        defeatBonuses();

        // Handle fight effect if the villain has one
        let fightEffectPromise = Promise.resolve();
        if (
          topCardVillainDeck.fightEffect &&
          topCardVillainDeck.fightEffect !== "None"
        ) {
          const fightEffectFunction = window[topCardVillainDeck.fightEffect];
          console.log("Fight effect function found:", fightEffectFunction);
          if (typeof fightEffectFunction === "function") {
            fightEffectPromise = new Promise((fightResolve, reject) => {
              try {
                const result = fightEffectFunction(topCardVillainDeck); // Pass villainCard as an argument here
                console.log("Fight effect executed:", result);
                fightResolve(result);
              } catch (error) {
                reject(error);
              }
            });
          } else {
            console.error(
              `Fight effect function ${topCardVillainDeck.fightEffect} not found`,
            );
          }
        } else {
          console.log("No fight effect found for this villain.");
        }

        fightEffectPromise
          .then(() => {
            updateGameBoard(); // Update the game board after fight effect is handled
            resolve();
          })
          .catch((error) => {
            console.error(`Error in fight effect: ${error}`);
            updateGameBoard(); // Ensure the game board is updated even if the fight effect fails
            resolve();
          });
      };
    }, 10);
  });
}

function punisherHostileInterrogation() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability not activated - "each other player" Hero effects do not apply in Solo play.`,
  );
}

function bladeVampiricSurge() {
  const villainsInVP = victoryPile
    .map((card, index) =>
      card && card.type === "Villain"
        ? { ...card, id: `vp-${index}`, index }
        : null,
    )
    .filter((card) => card !== null);

  if (villainsInVP.length === 0) {
    onscreenConsole.log("There are no Villains in your Victory Pile.");
    return;
  }

  totalAttackPoints += villainsInVP.length;
  cumulativeAttackPoints += villainsInVP.length;

  onscreenConsole.log(
    `You have ${villainsInVP.length} Villain${villainsInVP.length > 1 ? "s" : ""} in your Victory Pile. +${villainsInVP.length}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  updateGameBoard();
}

function bladeNowhereToHide() {
  sewerRooftopDefeats += 2;
  onscreenConsole.log(
    `Whenever you defeat a Villain in the Sewers or Rooftops this turn, you will draw two cards.`,
  );
}

function bladeNightHunter() {
  sewerRooftopBonusRecruit += 2;
  onscreenConsole.log(
    `Whenever you defeat a Villain in the Sewers or Rooftops this turn, you get +2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
  );
}

function bladeStalkThePrey() {
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

function nightcrawlerSwashbuckler() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"><img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

async function teleport(card) {
  const index = playerHand.indexOf(card);
  cardsToBeDrawnNextTurn.push(card);

  // Only remove Teleport if it was temporarily added
  if (card.temporaryTeleport === true) {
    delete card.temporaryTeleport;
    // Remove "Teleport" from keywords array, but only if we added it temporarily
    if (card.keywords) {
      card.keywords = card.keywords.filter((keyword) => keyword !== "Teleport");
    }
  }

  playerHand.splice(index, 1);
  nextTurnsDraw++;
  updateGameBoard();

  if (card.name.trim().toUpperCase() === "NIGHTCRAWLER - ALONG FOR THE RIDE") {
    await nightcrawlerAlongForTheRide();
  }
}

function playOrTeleport(card) {
  return new Promise((resolve) => {
    const popup = document.querySelector(".info-or-choice-popup");
    const title = document.querySelector(".info-or-choice-popup-title");
    const instructions = document.querySelector(
      ".info-or-choice-popup-instructions",
    );
    const preview = document.querySelector(".info-or-choice-popup-preview");
    const confirmBtn = document.getElementById("info-or-choice-popup-confirm");
    const otherChoiceBtn = document.getElementById(
      "info-or-choice-popup-otherchoice",
    );
    const noThanksBtn = document.getElementById(
      "info-or-choice-popup-nothanks",
    );
    const modalOverlay = document.getElementById("modal-overlay");
    document.querySelector(".info-or-choice-popup-closebutton").style.display =
      "none";

    // Configure popup
    title.textContent = "TELEPORT";
    instructions.innerHTML = `DO YOU WISH TO TELEPORT OR PLAY <span class="console-highlights">${card.name}</span>?`;

    // Set up card preview using background image
    preview.style.backgroundImage = `url('${card.image}')`;

    // Configure buttons
    confirmBtn.textContent = `TELEPORT`;
    confirmBtn.style.display = "block";

    otherChoiceBtn.textContent = `PLAY`;
    otherChoiceBtn.style.display = "block";

    noThanksBtn.style.display = "none"; // Not needed for this choice

    // Show popup and overlay
    popup.style.display = "block";
    if (modalOverlay) modalOverlay.style.display = "block";

    // Set up button event handlers
    const cleanup = () => {
      closeInfoChoicePopup();
      updateGameBoard();
    };

    if (card.type === "Wound") {
      otherChoiceBtn.disabled = true;
      otherChoiceBtn.style.opacity = "0.5";
      otherChoiceBtn.style.cursor = "not-allowed";
    }

    confirmBtn.onclick = () => {
      playSFX("teleport");
      onscreenConsole.log(
        `<span class="console-highlights">${card.name}</span> has teleported and will be drawn as an extra card next turn.`,
      );
      teleport(card);
      cleanup();
      resolve();
    };

    otherChoiceBtn.onclick = async () => {
      // If disabled, do nothing
      if (otherChoiceBtn.disabled) return;
      cleanup();
      onscreenConsole.log(
        `You have chosen to play <span class="console-highlights">${card.name}</span>.`,
      );

      // Remove card from hand and add to played cards
      const cardIndex = playerHand.indexOf(card);
      if (cardIndex > -1) {
        playerHand.splice(cardIndex, 1);
      }
      cardsPlayedThisTurn.push(card);

      // Update points
      totalAttackPoints += card.attack || 0;
      totalRecruitPoints += card.recruit || 0;
      cumulativeAttackPoints += card.attack || 0;
      cumulativeRecruitPoints += card.recruit || 0;

      updateGameBoard();

      // Special case for Nightcrawler
      if (
        card.name.trim().toUpperCase() === "NIGHTCRAWLER - ALONG FOR THE RIDE"
      ) {
        await nightcrawlerAlongForTheRide();
      }

      // Handle abilities
      try {
        // Unconditional
        if (card.unconditionalAbility && card.unconditionalAbility !== "None") {
          const abilityFunction = window[card.unconditionalAbility];
          if (typeof abilityFunction === "function") {
            await Promise.resolve(abilityFunction(card));
          } else {
            console.error(
              `Unconditional ability function ${card.unconditionalAbility} not found`,
            );
          }
        }

        // Conditional
        if (card.conditionalAbility && card.conditionalAbility !== "None") {
          const { conditionType, condition } = card;
          if (isConditionMet(conditionType, condition)) {
            if (autoSuperpowers) {
              const conditionalAbilityFunction =
                window[card.conditionalAbility];
              if (typeof conditionalAbilityFunction === "function") {
                await Promise.resolve(conditionalAbilityFunction(card));
              } else {
                console.error(
                  `Conditional ability function ${card.conditionalAbility} not found`,
                );
              }
            } else {
              await new Promise((abilityResolve) => {
                const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                  `DO YOU WISH TO ACTIVATE <span class="console-highlights">${card.name}</span><span class="bold-spans">'s</span> ability?`,
                  "Yes",
                  "No",
                );

                document.querySelector(
                  ".info-or-choice-popup-preview",
                ).style.backgroundImage = `url('${card.image}')`;

                confirmButton.onclick = async () => {
                  try {
                    // Hide the “may” popup FIRST so the next popup can show
                    hideHeroAbilityMayPopup();

                    const fn = window[card.conditionalAbility];
                    if (typeof fn === "function") {
                      await Promise.resolve(fn(card));
                    } else {
                      console.error(
                        `Conditional ability function ${card.conditionalAbility} not found`,
                      );
                    }
                  } catch (error) {
                    console.error(error);
                  } finally {
                    abilityResolve();
                  }
                };

                denyButton.onclick = () => {
                  onscreenConsole.log(
                    `You have chosen not to activate <span class="console-highlights">${card.name}</span><span class="bold-spans">'s</span> ability.`,
                  );
                  hideHeroAbilityMayPopup();
                  abilityResolve();
                };
              });
            }
          }
        }
      } catch (error) {
        console.error("Error processing card abilities:", error);
      } finally {
        resolve();
      }
    };
  });
}

async function nightcrawlerAlongForTheRide() {
  return new Promise((resolve) => {
    // Debug logging
    console.log("[Nightcrawler] Ability activated");

    // Validate player hand
    if (!playerHand || playerHand.length === 0) {
      onscreenConsole.log("No cards available to teleport.");
      return resolve();
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

    // Set popup content
    titleElement.textContent = "Nightcrawler - Along for the Ride";
    instructionsElement.innerHTML =
      "Select up to 3 cards to teleport to next turn";

    // Hide row labels and row2, show close button for action
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

    let selectedCards = [];
    let selectedCardImages = new Map();
    let isDragging = false;

    // Create sorted copy for display only
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

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

        // Only change background if no cards are selected
        if (selectedCards.length === 0) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no cards are selected AND we're not hovering over another card
        if (selectedCards.length === 0) {
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

        const thisCardId = cardElement.getAttribute("data-card-id");
        const index = selectedCards.findIndex(
          (selected) => selected.id === thisCardId,
        );

        if (index > -1) {
          // Deselect
          selectedCards.splice(index, 1);
          cardImage.classList.remove("selected");
          selectedCardImages.delete(thisCardId);

          // Update preview to show last selected card or clear if none
          if (selectedCards.length > 0) {
            const lastCard = selectedCards[selectedCards.length - 1];
            previewElement.innerHTML = "";
            const previewImage = document.createElement("img");
            previewImage.src = lastCard.image;
            previewImage.alt = lastCard.name;
            previewImage.className = "popup-card-preview-image";
            previewElement.appendChild(previewImage);
            previewElement.style.backgroundColor = "var(--accent)";
          } else {
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          }
        } else if (selectedCards.length < 3) {
          // Select
          selectedCards.push(card);
          cardImage.classList.add("selected");
          selectedCardImages.set(thisCardId, cardImage);

          // Update preview to show this card
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

    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Update UI state
    const updateUI = () => {
      confirmButton.textContent =
        selectedCards.length > 0
          ? `TELEPORT ${selectedCards.length} CARD${selectedCards.length !== 1 ? "S" : ""}`
          : "NO THANKS";

      instructionsElement.innerHTML =
        selectedCards.length > 0
          ? `Selected: ${selectedCards.map((c) => `<span class="console-highlights">${c.name}</span>`).join(", ")}`
          : "Select up to 3 cards to teleport to next turn";

      confirmButton.disabled = false;
    };

    // Close button handler (Teleport/No Thanks action)
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      playSFX("teleport");
      if (selectedCards.length > 0) {
        selectedCards.forEach((card) => {
          // Find by ID in the original playerHand array
          const index = playerHand.findIndex((c) => c.id === card.id);
          if (index !== -1) {
            const [removedCard] = playerHand.splice(index, 1);
            cardsToBeDrawnNextTurn.push(removedCard);
            nextTurnsDraw++;
            onscreenConsole.log(
              `<span class="console-highlights">${removedCard.name}</span> teleported to next turn.`,
            );
          }
        });
        updateGameBoard();
      } else {
        onscreenConsole.log(`No cards were teleported.`);
      }

      closeCardChoicePopup();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
    updateUI();
  });
}

async function dominoLuckyBreak() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  const cardImage =
    "Visual Assets/Heroes/Dark City/DarkCity_Domino_LuckyBreak.webp";
  const amount = 1;
  await versatile(amount, cardImage);
}

function dominoReadyForAnything() {
  const cardImage =
    "Visual Assets/Heroes/Dark City/DarkCity_Domino_ReadyForAnything.webp";
  const amount = 2;
  versatile(amount, cardImage);
}

function dominoAgainstAllOdds() {
  const previousCards = cardsPlayedThisTurn.slice(0, -1);
  if (previousCards.filter((item) => item.team === "X-Force").length > 0) {
    onscreenConsole.log(
      `<img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
    );
    onscreenConsole.log(
      `This card and each other Versatile ability you use this turn produce both <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> and <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
    );
    trueVersatility = true;
  }
  const cardImage =
    "Visual Assets/Heroes/Dark City/DarkCity_Domino_AgainstAllOdds.webp";
  const amount = 5;
  versatile(amount, cardImage);
}

function dominoSpecializedAmmunition() {
  return new Promise((resolve) => {
    if (playerHand.length === 0) {
      onscreenConsole.log("You have no cards available to discard.");
      resolve();
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
    titleElement.textContent = "Domino - Specialized Focus";
    instructionsElement.innerHTML =
      'You may discard a card from your hand. If that card has a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon, you get +4<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">. If that card has a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon, you get +4<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.';

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

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let isDragging = false;

    // Create sorted copy for display only
    const sortedHand = [...playerHand];
    genericCardSort(sortedHand);

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
            'You may discard a card from your hand. If that card has a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon, you get +4<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">. If that card has a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon, you get +4<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.';
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
    confirmButton.textContent = "CONFIRM";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "flex";
    noThanksButton.textContent = "NO THANKS!";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard) return;

      // Apply bonuses based on card icons
      if (selectedCard.attackIcon === true) {
        totalAttackPoints += 4;
        cumulativeAttackPoints += 4;
      }
      if (selectedCard.recruitIcon === true) {
        totalRecruitPoints += 4;
        cumulativeRecruitPoints += 4;
      }
      updateGameBoard();

      // Log appropriate message based on icon
      if (selectedCard.attackIcon === true) {
        onscreenConsole.log(
          `They have a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon. +4<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
        );
      }
      if (selectedCard.recruitIcon === true) {
        onscreenConsole.log(
          `They have a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon. +4<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
        );
      }

      // Find by ID in the original playerHand array
      const index = playerHand.findIndex((card) => card.id === selectedCard.id);
      let discardedCard = null;
      if (index !== -1) {
        [discardedCard] = playerHand.splice(index, 1);
      }

      closeCardChoicePopup();
      updateGameBoard();

      if (discardedCard) {
        const { returned } =
          await checkDiscardForInvulnerability(discardedCard);
        if (returned.length) {
          playerHand.push(...returned);
          updateGameBoard();
        }
      }

      resolve();
    };

    // Close button handler (No Thanks action)
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      onscreenConsole.log(`You have chosen not to discard any cards.`);
      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function cableStrike() {
  mastermindReserveAttack++;
  mastermindReserveAttack++;
  onscreenConsole.log(
    `You get +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> when fighting the Mastermind this turn.`,
  );
  updateGameBoard();
}

function cableRapidResponseForce() {
  // Add parameters here
  const XForceCount = cardsPlayedThisTurn
    .slice(0, -1)
    .filter((item) => item.team === "X-Force").length;
  let XForceText = "Heroes"; // Use let since we might reassign this value
  const XForceAttack = XForceCount;

  if (XForceCount === 1) {
    XForceText = "Hero"; // Reassign to singular if only one XForce
  }

  onscreenConsole.log(
    `<img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `You have played ${XForceCount} <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> ${XForceText}. +${XForceAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  bonusAttack();
}

function cableArmyOfOne() {
  return new Promise((resolve) => {
    if (playerHand.length === 0) {
      console.log("No cards available to KO.");
      onscreenConsole.log(
        "Your hand is currently empty. Unable to KO any cards.",
      );
      resolve();
      return;
    }

    // Create a copy with unique IDs like the working function
    const cardsWithUniqueIds = playerHand.map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`,
    }));

    // Sort the cards BEFORE setting up the UI
    genericCardSort(cardsWithUniqueIds);

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
    titleElement.textContent = "Cable - Army of One";
    instructionsElement.innerHTML = `KO any number of cards from your hand. You get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> for each card KO'd this way.`;

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

    let selectedCards = [];
    let selectedCardImages = new Map();
    let isDragging = false;

    // Set up button handlers EARLIER so updateCloseButton can use them
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    confirmButton.style.display = "block";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";
    confirmButton.disabled = false;

    // Update close button text and state
    function updateCloseButton() {
      if (selectedCards.length > 0) {
        confirmButton.textContent = `KO ${selectedCards.length} Selected Card${selectedCards.length !== 1 ? "s" : ""}`;
      } else {
        confirmButton.textContent = "No Thanks!";
      }
    }

    // Update instructions with selected cards
    function updateInstructions() {
      if (selectedCards.length === 0) {
        instructionsElement.innerHTML = `KO any number of cards from your hand. You get +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> for each card KO'd this way.`;
      } else {
        const namesList = selectedCards
          .map((card) => `<span class="console-highlights">${card.name}</span>`)
          .join(", ");
        instructionsElement.innerHTML = `Selected ${selectedCards.length} card${selectedCards.length !== 1 ? "s" : ""}: ${namesList} will be KO'd.`;
      }
    }

    // Initialize button text
    updateCloseButton();

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements using unique IDs
    cardsWithUniqueIds.forEach((card) => {
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
        if (selectedCards.length === 0) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no cards are selected AND we're not hovering over another card
        if (selectedCards.length === 0) {
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

        const thisCardId = cardElement.getAttribute("data-card-id");
        const index = selectedCards.findIndex((c) => c.uniqueId === thisCardId);

        if (index > -1) {
          // Deselect
          selectedCards.splice(index, 1);
          cardImage.classList.remove("selected");
          selectedCardImages.delete(thisCardId);

          // Update preview to show last selected card or clear if none
          if (selectedCards.length > 0) {
            const lastCard = selectedCards[selectedCards.length - 1];
            previewElement.innerHTML = "";
            const previewImage = document.createElement("img");
            previewImage.src = lastCard.image;
            previewImage.alt = lastCard.name;
            previewImage.className = "popup-card-preview-image";
            previewElement.appendChild(previewImage);
            previewElement.style.backgroundColor = "var(--accent)";
          } else {
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          }
        } else {
          // Select new card
          selectedCards.push(card);
          cardImage.classList.add("selected");
          selectedCardImages.set(thisCardId, cardImage);

          // Update preview to show this card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        // Update instructions AND close button
        updateInstructions();
        updateCloseButton();
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (playerHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (playerHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (playerHand.length > 5) {
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

    // Close button handler (KO action) - FIXED: uses findIndex with card.id
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (selectedCards.length > 0) {
        selectedCards.forEach((card) => {
          // Find card in playerHand by original ID (not object reference)
          const cardIndex = playerHand.findIndex((c) => c.id === card.id);
          if (cardIndex !== -1) {
            const [koCard] = playerHand.splice(cardIndex, 1);
            koPile.push(koCard);
            totalAttackPoints += 1;
            cumulativeAttackPoints += 1;
            console.log(`${koCard.name} KO'd from hand.`);
            onscreenConsole.log(
              `<span class="console-highlights">${koCard.name}</span> has been KO'd. +1<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> gained.`,
            );
            koBonuses();
            updateGameBoard();
          }
        });
      } else {
        console.log("No cards selected for KO.");
        onscreenConsole.log("You chose not to KO any cards.");
      }

      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    // Close button handler (No Thanks action)
    closeButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      closeCardChoicePopup();
      onscreenConsole.log("You chose not to KO any cards.");
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function daredevilBackflip() {
  backflipRecruit = true;
  onscreenConsole.log(
    `The next Hero you recruit this turn goes on top of your deck.`,
  );
}

function daredevilRadarSense() {
  return new Promise((resolve) => {
    // 1. Display the popup
    const popup = document.querySelector(".investigate-popup");
    popup.style.display = "block";

    const modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "block";

    // 2. Set the card image in the preview area
    const cardPreview = document.getElementById("investigate-card-preview");
    cardPreview.innerHTML = `<img src="Visual Assets/Heroes/Dark City/DarkCity_Daredevil_RadarSense.webp" style="display:block; max-height: 100%; max-width: 100%;">`;

    // 3. Modify the popup content for number selection
    const popupTitle = document.querySelector(".investigate-popup-title");
    popupTitle.textContent = "CHOOSE A NUMBER";

    const popupInstructions = document.querySelector(
      ".investigate-popup-instructions",
    );
    popupInstructions.innerHTML = `Choose a number. If the first card in your deck has the same cost, you get +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">.`;

    // 4. Hide team selection and replace with number dropdown
    const teamFilter = document.getElementById("investigate-team-filter");
    teamFilter.style.display = "none";

    // Create number dropdown
    const numberDropdown = document.createElement("select");
    numberDropdown.id = "number-selection-dropdown";
    numberDropdown.style.width = "60%";
    numberDropdown.style.margin = "2vh auto";
    numberDropdown.style.display = "block";
    numberDropdown.style.padding = "1vh";
    numberDropdown.style.fontSize = "2vh";
    numberDropdown.innerHTML =
      '<option value="">Choose a number</option>' +
      Array.from({ length: 11 }, (_, i) => i) // Creates array [0, 1, 2, ..., 10]
        .map((num) => `<option value="${num}">${num}</option>`)
        .join("");

    // Insert the dropdown before the confirm button
    const confirmBtn = document.getElementById("investigate-confirm");
    popup.insertBefore(numberDropdown, confirmBtn);

    // 5. Disable confirm button initially
    confirmBtn.disabled = true;

    numberDropdown.onchange = () => {
      const hasSelection = numberDropdown.value !== ""; // This is the simplest check
      confirmBtn.disabled = !hasSelection;
      console.log(
        "Dropdown value:",
        numberDropdown.value,
        "Disabled:",
        confirmBtn.disabled,
      ); // Debug
    };

    // Handle confirm button click
    confirmBtn.onclick = () => {
      try {
        const selectedNumber = parseInt(numberDropdown.value);
        if (isNaN(selectedNumber)) return;

        // Hide popup immediately
        popup.style.display = "none";
        modalOverlay.style.display = "none";

        // Check deck status - shuffle discard pile into deck if empty
        if (playerDeck.length === 0) {
          if (playerDiscardPile.length > 0) {
            playerDeck = shuffle(playerDiscardPile);
            playerDiscardPile = [];
          } else {
            onscreenConsole.log(
              "Your deck and discard pile are empty. No cards available to reveal.",
            );
            cleanupPopup();
            updateGameBoard();
            resolve();
            return;
          }
        }

        const topCard = playerDeck[playerDeck.length - 1];
        topCard.revealed = true;
        if (topCard.cost === selectedNumber) {
          totalAttackPoints += 2;
          cumulativeAttackPoints += 2;
          updateGameBoard();
          onscreenConsole.log(
            `You revealed <span class="console-highlights">${topCard.name}</span>. They have the same cost as your chosen number! You gain +2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
          );
        } else {
          onscreenConsole.log(
            `You revealed <span class="console-highlights">${topCard.name}</span>. They do not have the same cost as your chosen number. No <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> gained.`,
          );
        }

        // Clean up and resolve
        cleanupPopup();
        updateGameBoard();
        resolve();
      } catch (error) {
        console.error("Error in number selection function:", error);
        cleanupPopup();
        resolve();
      }
    };

    function cleanupPopup() {
      // Reset popup to original state
      popup.style.display = "none";
      modalOverlay.style.display = "none";

      const popupTitle = document.querySelector(".investigate-popup-title");
      popupTitle.textContent = "INVESTIGATE";

      const popupInstructions = document.querySelector(
        ".investigate-popup-instructions",
      );
      popupInstructions.textContent =
        "Choose a team. Investigate for a card of that team.";

      const teamFilter = document.getElementById("investigate-team-filter");
      teamFilter.style.display = "block";

      const cardPreview = document.getElementById("investigate-card-preview");
      cardPreview.innerHTML = "";

      // Remove number dropdown if it exists
      const dropdown = document.getElementById("number-selection-dropdown");
      if (dropdown) dropdown.remove();

      // Reset confirm button
      const confirmBtn = document.getElementById("investigate-confirm");
      confirmBtn.disabled = true;
    }
  });
}

function daredevilBlindJustice() {
  return new Promise((resolve) => {
    // 1. Display the popup
    const popup = document.querySelector(".investigate-popup");
    popup.style.display = "block";

    const modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "block";

    // 2. Set the card image in the preview area
    const cardPreview = document.getElementById("investigate-card-preview");
    cardPreview.innerHTML = `<img src="Visual Assets/Heroes/Dark City/DarkCity_Daredevil_BlindJustice.webp" style="display:block; max-height: 100%; max-width: 100%;">`;

    // 3. Modify the popup content for number selection
    const popupTitle = document.querySelector(".investigate-popup-title");
    popupTitle.textContent = "CHOOSE A NUMBER";

    const popupInstructions = document.querySelector(
      ".investigate-popup-instructions",
    );
    popupInstructions.textContent =
      "Choose a number. If the first card in your deck has the same cost, draw it.";

    // 4. Hide team selection and replace with number dropdown
    const teamFilter = document.getElementById("investigate-team-filter");
    teamFilter.style.display = "none";

    // Create number dropdown
    const numberDropdown = document.createElement("select");
    numberDropdown.id = "number-selection-dropdown";
    numberDropdown.style.width = "60%";
    numberDropdown.style.margin = "2vh auto";
    numberDropdown.style.display = "block";
    numberDropdown.style.padding = "1vh";
    numberDropdown.style.fontSize = "2vh";
    numberDropdown.innerHTML =
      '<option value="">Choose a number</option>' +
      Array.from({ length: 11 }, (_, i) => i) // Creates array [0, 1, 2, ..., 10]
        .map((num) => `<option value="${num}">${num}</option>`)
        .join("");

    // Insert the dropdown before the confirm button
    const confirmBtn = document.getElementById("investigate-confirm");
    popup.insertBefore(numberDropdown, confirmBtn);

    // 5. Disable confirm button initially
    confirmBtn.disabled = true;

    numberDropdown.onchange = () => {
      const hasSelection = numberDropdown.value !== "";
      confirmBtn.disabled = !hasSelection;
    };

    // Handle confirm button click
    confirmBtn.onclick = () => {
      try {
        const selectedNumber = parseInt(numberDropdown.value);
        if (isNaN(selectedNumber)) return;

        // Hide popup immediately
        popup.style.display = "none";
        modalOverlay.style.display = "none";

        // Check deck status - shuffle discard pile into deck if empty
        if (playerDeck.length === 0) {
          if (playerDiscardPile.length > 0) {
            playerDeck = shuffle(playerDiscardPile);
            playerDiscardPile = [];
            onscreenConsole.log("Shuffled discard pile into deck.");
          } else {
            onscreenConsole.log(
              "Your deck and discard pile are empty. No cards available to reveal.",
            );
            cleanupPopup();
            updateGameBoard();
            resolve();
            return;
          }
        }

        const topCard = playerDeck[playerDeck.length - 1];
        if (topCard.cost === selectedNumber) {
          onscreenConsole.log(
            `You revealed <span class="console-highlights">${topCard.name}</span>. They have the same cost as your chosen number! Now drawing...`,
          );
          extraDraw();
        } else {
          onscreenConsole.log(
            `You revealed <span class="console-highlights">${topCard.name}</span>. They do not have the same cost as your chosen number.`,
          );
          topCard.revealed = true;
        }

        // Clean up and resolve
        cleanupPopup();
        updateGameBoard();
        resolve();
      } catch (error) {
        console.error("Error in number selection function:", error);
        cleanupPopup();
        resolve();
      }
    };

    function cleanupPopup() {
      // Reset popup to original state
      popup.style.display = "none";
      modalOverlay.style.display = "none";

      const popupTitle = document.querySelector(".investigate-popup-title");
      popupTitle.textContent = "INVESTIGATE";

      const popupInstructions = document.querySelector(
        ".investigate-popup-instructions",
      );
      popupInstructions.textContent =
        "Choose a team. Investigate for a card of that team.";

      const teamFilter = document.getElementById("investigate-team-filter");
      teamFilter.style.display = "block";

      const cardPreview = document.getElementById("investigate-card-preview");
      cardPreview.innerHTML = "";

      // Remove number dropdown if it exists
      const dropdown = document.getElementById("number-selection-dropdown");
      if (dropdown) dropdown.remove();

      // Reset confirm button
      const confirmBtn = document.getElementById("investigate-confirm");
      confirmBtn.disabled = true;
    }
  });
}

function daredevilTheManWithoutFear() {
  return new Promise((resolve) => {
    // This will handle the recursive attempts
    const attemptSelection = () => {
      // 1. Display the popup
      const popup = document.querySelector(".investigate-popup");
      popup.style.display = "block";
      const modalOverlay = document.getElementById("modal-overlay");
      modalOverlay.style.display = "block";

      // 2. Set the card image in the preview area
      const cardPreview = document.getElementById("investigate-card-preview");
      cardPreview.innerHTML = `<img src="Visual Assets/Heroes/Dark City/DarkCity_Daredevil_TheManWithoutFear.webp" style="display:block; max-height: 100%; max-width: 100%;">`;

      // 3. Modify the popup content for number selection
      const popupTitle = document.querySelector(".investigate-popup-title");
      popupTitle.textContent = "CHOOSE A NUMBER";

      const popupInstructions = document.querySelector(
        ".investigate-popup-instructions",
      );
      popupInstructions.textContent =
        "Choose a number. If the first card in your deck has the same cost, draw it and repeat this process";

      // 4. Hide team selection and replace with number dropdown
      const teamFilter = document.getElementById("investigate-team-filter");
      teamFilter.style.display = "none";

      // Create number dropdown
      const numberDropdown = document.createElement("select");
      numberDropdown.id = "number-selection-dropdown";
      numberDropdown.style.width = "60%";
      numberDropdown.style.margin = "2vh auto";
      numberDropdown.style.display = "block";
      numberDropdown.style.padding = "1vh";
      numberDropdown.style.fontSize = "2vh";
      numberDropdown.innerHTML =
        '<option value="">Choose a number</option>' +
        Array.from({ length: 11 }, (_, i) => i) // Creates array [0, 1, 2, ..., 10]
          .map((num) => `<option value="${num}">${num}</option>`)
          .join("");

      // Insert the dropdown before the confirm button
      const confirmBtn = document.getElementById("investigate-confirm");
      popup.insertBefore(numberDropdown, confirmBtn);

      // 5. Disable confirm button initially
      confirmBtn.disabled = true;

      numberDropdown.onchange = () => {
        const hasSelection = numberDropdown.value !== "";
        confirmBtn.disabled = !hasSelection;
      };

      // Handle confirm button click
      confirmBtn.onclick = () => {
        try {
          const selectedNumber = parseInt(numberDropdown.value);
          if (isNaN(selectedNumber)) return;

          // Hide popup immediately
          popup.style.display = "none";
          modalOverlay.style.display = "none";

          // Check deck status - shuffle discard pile into deck if empty
          if (playerDeck.length === 0) {
            if (playerDiscardPile.length > 0) {
              playerDeck = shuffle(playerDiscardPile);
              playerDiscardPile = [];
              onscreenConsole.log("Shuffled discard pile into deck.");
            } else {
              onscreenConsole.log(
                "Your deck and discard pile are empty. No cards available to reveal.",
              );
              cleanupPopup();
              updateGameBoard();
              resolve();
              return;
            }
          }

          // Check first card in playerDeck
          const topCard = playerDeck[playerDeck.length - 1];
          if (topCard.cost === selectedNumber) {
            onscreenConsole.log(
              `You revealed <span class="console-highlights">${topCard.name}</span>. They have the same cost as your chosen number! Drawing now...`,
            );
            extraDraw();
            onscreenConsole.log(
              `Repeat the process and choose a number again.`,
            );
            // Clean up current popup
            cleanupPopup();

            // If we got a match, try again
            attemptSelection();
          } else {
            onscreenConsole.log(
              `You revealed <span class="console-highlights">${topCard.name}</span>. They do not have the same cost as your chosen number.`,
            );
            topCard.revealed = true;
            cleanupPopup();
            updateGameBoard();
            resolve();
          }
        } catch (error) {
          console.error("Error in Daredevil's The Man Without Fear:", error);
          cleanupPopup();
          resolve();
        }
      };

      function cleanupPopup() {
        // Reset popup to original state
        popup.style.display = "none";
        modalOverlay.style.display = "none";

        const popupTitle = document.querySelector(".investigate-popup-title");
        popupTitle.textContent = "INVESTIGATE";

        const popupInstructions = document.querySelector(
          ".investigate-popup-instructions",
        );
        popupInstructions.textContent =
          "Choose a team. Investigate for a card of that team.";

        const teamFilter = document.getElementById("investigate-team-filter");
        teamFilter.style.display = "block";

        const cardPreview = document.getElementById("investigate-card-preview");
        cardPreview.innerHTML = "";

        // Remove number dropdown if it exists
        const dropdown = document.getElementById("number-selection-dropdown");
        if (dropdown) dropdown.remove();

        // Reset confirm button
        const confirmBtn = document.getElementById("investigate-confirm");
        confirmBtn.disabled = true;
      }
    };

    // Start the first attempt
    attemptSelection();
  });
}

function forgeDirtyWork() {
  city5LocationAttack--;
  city5LocationAttack--;
  onscreenConsole.log(
    `Any Villain you fight in the Sewers this turn gets -2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
  updateGameBoard();
}

function forgeReboot() {
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
    titleElement.textContent = "Forge - Reboot";
    instructionsElement.innerHTML =
      "You may discard a card from your hand to draw two more.";

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
            "You may discard a card from your hand to draw two more.";
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
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard || selectedIndex === null) return;
      closeCardChoicePopup();
      // Draw two cards first
      extraDraw();
      extraDraw();

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

      updateGameBoard();
      resolve();
    };

    // Close button handler (No Thanks action)
    closeButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function forgeOverdrive() {
  const cardImage =
    "Visual Assets/Heroes/Dark City/DarkCity_Forge_Overdrive.webp";
  const amount = 3;
  versatile(amount, cardImage);
}

async function forgeBFG() {
  let mastermind = getSelectedMastermind();
  const finalBlowNow = isFinalBlowRequired(mastermind); // Use proper Final Blow detection

  if (mastermind.tactics.length === 0 && !finalBlowNow) {
    // Mastermind is truly defeated (no tactics and no Final Blow needed)
    onscreenConsole.log(
      `<span class="console-highlights">${mastermind.name}</span> has been defeated! Finish your turn to win.`,
    );
    return;
  }

  // If we get here, either:
  // 1. There are tactics remaining, OR
  // 2. It's Final Blow time (no tactics but Final Blow is required)
  onscreenConsole.log(`Defeating the Mastermind!`);
  await confirmInstantMastermindAttack();
  updateGameBoard();
}

function bishopConcussiveBlast() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"><img src="Visual Assets/Icons/Range.svg" alt="Range Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function bishopWhateverTheCost() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );

  if (playerHand.length === 0 && playerDiscardPile.length === 0) {
    onscreenConsole.log(`No cards available to KO.`);
    return;
  }

  return new Promise((resolve) => {
    // Sort both arrays FIRST, before any processing
    genericCardSort(playerDiscardPile);
    genericCardSort(playerHand);

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
    titleElement.textContent = "Bishop - Whatever the Cost";
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

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        let koIndex = -1;
        let sourceArray =
          selectedLocation === "hand" ? playerHand : playerDiscardPile;

        // Find card by ID
        koIndex = sourceArray.findIndex((c) => c.id === selectedCard.id);

        if (koIndex !== -1) {
          const koedCard = sourceArray.splice(koIndex, 1)[0];
          koPile.push(koedCard);
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

function professorXPsionicAstralForm() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `+2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );
  bonusAttack();
}

function professorXClassDismissedKO() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );

  if (playerHand.length === 0 && playerDiscardPile.length === 0) {
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
    titleElement.textContent = "Professor X - Class Dismissed";
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
        let koIndex;
        // Use the original arrays (not the sorted copies) for removal
        if (selectedLocation === "discard pile") {
          koIndex = playerDiscardPile.findIndex(
            (c) => c.id === selectedCard.id,
          );
          if (koIndex !== -1) {
            const koedCard = playerDiscardPile.splice(koIndex, 1)[0];
            koPile.push(koedCard);
          }
        } else {
          koIndex = playerHand.findIndex((c) => c.id === selectedCard.id);
          if (koIndex !== -1) {
            const koedCard = playerHand.splice(koIndex, 1)[0];
            koPile.push(koedCard);
          }
        }

        if (koIndex !== -1) {
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

function professorXClassDismissed() {
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
    titleElement.textContent = "Class Dismissed";
    instructionsElement.textContent =
      "You may choose a Hero in the HQ to return to the bottom of the Hero Deck.";

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

        // Determine eligibility - must be Hero type AND cost ≤ 10 AND not destroyed
        const isHeroType = hero.type === "Hero";
        const isEligibleCost = hero.cost <= 10;
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
              instructionsElement.textContent =
                "You may choose a Hero in the HQ to return to the bottom of the Hero Deck.";
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be returned to the bottom of the Hero Deck.`;
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
        hero && hero.type === "Hero" && hero.cost <= 10 && explosionValue < 6
      ); // Not destroyed
    });

    if (eligibleHeroes.length === 0) {
      onscreenConsole.log("No eligible Heroes in the HQ (cost 10 or less).");
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
    confirmButton.textContent = "CONFIRM";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "inline-block"; // Show "No Thanks" button
    noThanksButton.textContent = "No Thanks";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(() => {
        const hero = hq[selectedHQIndex];
        if (hero) {
          onscreenConsole.log(
            `You have chosen to return <span class="console-highlights">${hero.name}</span> to the bottom of the Hero Deck.`,
          );
        }
        returnHeroToDeck(selectedHQIndex);
        updateGameBoard();
        closeHQCityCardChoicePopup();
        resolve();
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      setTimeout(() => {
        onscreenConsole.log(
          "You chose not to return a Hero to the bottom of the Hero Deck.",
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

async function bishopFirepowerFromTheFuture() {
  // Check if we need to shuffle discard into deck
  if (playerDeck.length < 4) {
    if (playerDiscardPile.length > 0) {
      // Shuffle discard pile into deck
      shuffle(playerDiscardPile);
      playerDeck = [...playerDeck, ...playerDiscardPile];
      playerDiscardPile = [];
    } else if (playerDeck.length === 0) {
      onscreenConsole.log("No cards available to discard.");
      return;
    }
  }

  // Take up to 4 cards from the top of the deck
  const cardsToProcess = playerDeck.splice(-4);
  const originalCardsToProcess = [...cardsToProcess]; // Keep a copy for potential KO selection

  // Calculate attack points
  const attackPoints = cardsToProcess.reduce(
    (sum, card) => sum + (card.attack || 0),
    0,
  );
  totalAttackPoints += attackPoints;
  cumulativeAttackPoints += attackPoints;

  updateGameBoard();

  // Process discard with invulnerability checks
  for (const card of cardsToProcess) {
    const { returned } = await checkDiscardForInvulnerability(card);
    if (returned.length) {
      playerHand.push(...returned);
    }

    onscreenConsole.log(
      `They gave you +${card.attack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
    );
    // Note: checkDiscardForInvulnerability handles the actual discarding
  }

  onscreenConsole.log(
    `You gained a total of +${attackPoints}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from the cards on top of your deck.`,
  );

  const previousCards = cardsPlayedThisTurn.slice(0, -1);

  // Check for X-Men hero in cards played this turn
  const hasXMenHero = previousCards.some(
    (card) => card.team && card.team.includes("X-Men"),
  );

  if (hasXMenHero && originalCardsToProcess.length > 0) {
    // Filter to only include cards that are actually in the discard pile
    const availableCardsToKO = originalCardsToProcess.filter((card) =>
      playerDiscardPile.includes(card),
    );

    if (availableCardsToKO.length > 0) {
      onscreenConsole.log(
        `<img src="Visual Assets/Icons/X-Men.svg" alt="X-Men Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
      );
      await showXMenKOPopup(availableCardsToKO);
    }
  }

  updateGameBoard();
}

async function showXMenKOPopup(availableCards) {
  return new Promise((resolve) => {
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
    titleElement.textContent = "Bishop - Firepower from the Future";
    instructionsElement.textContent = "Choose any number of these cards to KO.";

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

    let selectedCards = [];
    let selectedCardImages = new Map();
    let isDragging = false;

    // Create a copy with unique IDs like the working function
    const cardsWithUniqueIds = availableCards.map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`,
    }));

    // Sort the cards BEFORE setting up the UI (like working function)
    genericCardSort(cardsWithUniqueIds);

    if (cardsWithUniqueIds.length === 0) {
      onscreenConsole.log("No cards available to KO.");
      resolve();
      return;
    }

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Enable confirm initially and hide unnecessary buttons - like working function
    confirmButton.disabled = false;
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Update confirm button text
    function updateConfirmButton() {
      if (selectedCards.length > 0) {
        confirmButton.textContent = `KO ${selectedCards.length} Selected Card${selectedCards.length !== 1 ? "s" : ""}`;
      } else {
        confirmButton.textContent = "No Thanks!";
      }
    }

    // Update instructions with selected cards
    function updateInstructions() {
      if (selectedCards.length === 0) {
        instructionsElement.textContent =
          "Choose any number of these cards to KO.";
      } else {
        const namesList = selectedCards
          .map((card) => `<span class="console-highlights">${card.name}</span>`)
          .join(", ");
        instructionsElement.innerHTML = `Selected ${selectedCards.length} card${selectedCards.length !== 1 ? "s" : ""}: ${namesList} will be KO'd.`;
      }
    }

    // Initialize button text
    updateConfirmButton();

    // Create card elements for each available card - using the working function's pattern
    cardsWithUniqueIds.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.uniqueId); // Use uniqueId like working function

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects - exactly like working function
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
        if (selectedCards.length === 0) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no cards are selected AND we're not hovering over another card
        if (selectedCards.length === 0) {
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

      // Selection click handler - exactly like working function
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const thisCardId = cardElement.getAttribute("data-card-id");
        const index = selectedCards.findIndex((c) => c.uniqueId === thisCardId); // Use uniqueId like working function

        if (index > -1) {
          // Deselect
          selectedCards.splice(index, 1);
          cardImage.classList.remove("selected");
          selectedCardImages.delete(thisCardId);

          // Update preview to show last selected card or clear if none
          if (selectedCards.length > 0) {
            const lastCard = selectedCards[selectedCards.length - 1];
            previewElement.innerHTML = "";
            const previewImage = document.createElement("img");
            previewImage.src = lastCard.image;
            previewImage.alt = lastCard.name;
            previewImage.className = "popup-card-preview-image";
            previewElement.appendChild(previewImage);
            previewElement.style.backgroundColor = "var(--accent)";
          } else {
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
          }
        } else {
          // Select new card
          selectedCards.push(card);
          cardImage.classList.add("selected");
          selectedCardImages.set(thisCardId, cardImage);

          // Update preview to show this card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        // Update instructions AND confirm button - FIXED: Added updateConfirmButton call
        updateInstructions();
        updateConfirmButton();
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    // Layout logic - exactly like working function
    if (cardsWithUniqueIds.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (cardsWithUniqueIds.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (cardsWithUniqueIds.length > 5) {
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

    // Confirm button handler (KO action)
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (selectedCards.length > 0) {
        selectedCards.forEach((card) => {
          // Find card in discard pile by original ID (not uniqueId)
          const discardIndex = playerDiscardPile.findIndex(
            (c) => c.id === card.id,
          );
          if (discardIndex !== -1) {
            const [koCard] = playerDiscardPile.splice(discardIndex, 1);
            // Add to KO pile
            koPile.push(koCard);
            console.log(`${koCard.name} KO'd from discard.`);
            onscreenConsole.log(
              `<span class="console-highlights">${koCard.name}</span> has been KO'd.`,
            );
            koBonuses();
          }
        });
      } else {
        console.log("No cards selected for KO.");
        onscreenConsole.log("You chose not to KO any cards.");
      }

      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    // Close button handler (No Thanks action) - like working function
    closeButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      closeCardChoicePopup();
      onscreenConsole.log("You chose not to KO any cards.");
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function bishopAbsorbEnergies() {
  onscreenConsole.log(
    `Whenever a card you own is KO'd this turn, you get +2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
  );
  twoRecruitFromKO += 2;
}

function professorXMindControl() {
  onscreenConsole.log(
    `Whenever you defeat a Villain this turn, you may gain it. It becomes a grey Hero with no text that gives +<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> equal to its <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. (You still get its Victory Points.)`,
  );
  hasProfessorXMindControl = true;
}

async function professorXTelepathicProbe() {
  if (villainDeck.length === 0) {
    onscreenConsole.log("Villain deck is empty.");
    return;
  }

  const topCard = villainDeck[villainDeck.length - 1];
  topCard.revealed = true;

  switch (topCard.type) {
    case "Bystander":
      onscreenConsole.log(
        `You revealed the top card of the Villain deck. It is a <span class="console-highlights">${topCard.type}</span>.`,
      );
      await professorXHandleBystanderCard(topCard);
      break;
    case "Scheme Twist":
    case "Master Strike":
      onscreenConsole.log(
        `You revealed the top card of the Villain deck. It is a <span class="console-highlights">${topCard.type}</span>.`,
      );
      break;
    case "Villain":
      onscreenConsole.log(
        `You revealed the top card of the Villain deck - <span class="console-highlights">${topCard.name}</span>. As it is a <span class="console-highlights">${topCard.type}</span>, you may fight it this turn by clicking <span class="console-highlights">Professor X - Telepathic Probe</span> in your Played Cards pile.`,
      );
      const telepathicProbeCard =
        cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
      telepathicProbeCard.villain = {
        name: topCard.name,
        deckLength: villainDeck.length, // Store the deck length when the probe was used
      };
      break;
    default:
      console.log(`Unknown card type: ${topCard.type}`);
  }
}

async function professorXHandleBystanderCard(bystanderCard) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO RESCUE THIS BYSTANDER?",
        "Rescue Bystander",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Professor X - Telepathic Probe";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for bystander card image
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        const imagePath =
          bystanderCard.image || "Visual Assets/Cards/Bystander.webp";
        previewArea.style.backgroundImage = `url('${imagePath}')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = async () => {
        // Remove from villain deck and add to victory pile
        villainDeck.pop();
        victoryPile.push(bystanderCard);

        onscreenConsole.log(
          `You rescued <span class="console-highlights">${bystanderCard.name}</span>!`,
        );
        bystanderBonuses();
        updateGameBoard();
        closeInfoChoicePopup();

        await rescueBystanderAbility(bystanderCard);

        resolve();
      };

      denyButton.onclick = () => {
        onscreenConsole.log(
          `You left <span class="console-highlights">${bystanderCard.name}</span> on top of the Villain deck.`,
        );
        closeInfoChoicePopup();
        resolve();
      };
    }, 10);
  });
}

async function initiateTelepathicVillainFight(
  villainCard,
  telepathicProbeCard,
) {
  playSFX("attack");

  if (telepathicProbeCard) {
    telepathicProbeCard.villain = null; // Clear the reference after fighting
  }

  onscreenConsole.log(
    `Preparing to fight <span class="console-highlights">${villainCard.name}</span> using <span class="console-highlights">Professor X - Telepathic Probe</span>.`,
  );

  const selectedSchemeName = document.querySelector(
    "#scheme-section input[type=radio]:checked",
  ).value;
  const selectedScheme = schemes.find(
    (scheme) => scheme.name === selectedSchemeName,
  );

  // Calculate the villain's effective attack value
  let villainAttack = recalculateVillainAttack(villainCard);

  // Ensure villainAttack doesn't drop below 0
  if (villainAttack < 0) {
    villainAttack = 0;
  }

  villainDeck.pop(villainCard);
  victoryPile.push(villainCard);

  onscreenConsole.log(
    `<span class="console-highlights">${villainCard.name}</span> has been defeated.`,
  );

  // ---- POINT DEDUCTION LOGIC (SAME AS defeatVillain) ----
  if (villainAttack > 0) {
    try {
      if (
        (!negativeZoneAttackAndRecruit && recruitUsedToAttack === true) ||
        (villainCard.keywords && villainCard.keywords.includes("Bribe"))
      ) {
        const result = await showCounterPopup(villainCard, villainAttack);

        let attackNeeded = result.attackUsed || 0;
        let recruitNeeded = result.recruitUsed || 0;

        // Note: Telepathic villain fight doesn't use location-based reserve attacks
        // since it's not tied to a specific city location

        // Deduct points from regular pools
        totalAttackPoints -= attackNeeded;
        totalRecruitPoints -= recruitNeeded;

        onscreenConsole.log(
          `You chose to use ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points to attack <span class="console-highlights">${villainCard.name}</span>.`,
        );
      } else {
        if (!negativeZoneAttackAndRecruit) {
          // Regular attack point deduction
          totalAttackPoints -= villainAttack;
        } else {
          // Negative zone uses recruit points
          totalRecruitPoints -= villainAttack;
        }
      }
    } catch (error) {
      console.error("Error handling point deduction:", error);
    }
  }

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

// Card Abilities for Dark City Henchmen

async function PhalanxTechOrKOAttack() {
  return new Promise((resolve) => {
    // Remove reject since it's not used
    // Remove the setTimeout - it's not needed and can cause issues
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
      onscreenConsole.log(
        `You are unable to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`,
      );
      document.getElementById("modal-overlay").style.display = "block";
      // Properly chain the Promise
      handlePhalanxNoTechRevealed().then(resolve);
    } else {
      document.getElementById("modal-overlay").style.display = "block";
      // Properly chain the Promise
      handlePhalanxTechRevealed().then(resolve);
    }
  });
}

function handlePhalanxNoTechRevealed() {
  updateGameBoard();
  return new Promise((resolve) => {
    // Get Attack cards from hand and played cards separately
    const handAttackCards = playerHand.filter(
      (card) => card.attackIcon === true,
    );
    const playedAttackCards = cardsPlayedThisTurn.filter(
      (card) =>
        card.attackIcon === true && !card.isCopied && !card.sidekickToDestroy,
    );

    // Check if there are any Attack cards available
    if (handAttackCards.length === 0 && playedAttackCards.length === 0) {
      console.log("No available Heroes with Attack icons.");
      onscreenConsole.log(
        `You do not have any Heroes with a <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> icon.`,
      );
      resolve(true);
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
    titleElement.textContent = "PHALANX - FIGHT EFFECT";
    instructionsElement.innerHTML = `Choose one of your Heroes with a <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'> icon to KO.`;

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
    genericCardSort(handAttackCards);
    genericCardSort(playedAttackCards);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML = `Choose one of your Heroes with a <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'> icon to KO.`;
      } else {
        const location =
          selectedLocation === "hand" ? "(from Hand)" : "(from Played Cards)";
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

    // Populate row1 with Hand Attack cards
    handAttackCards.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Played Cards Attack cards
    playedAttackCards.forEach((card) => {
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

        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`,
        );
        koBonuses();

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

function handlePhalanxTechRevealed() {
  return new Promise((resolve) => {
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      "DO YOU WISH TO REVEAL A CARD?",
      "Yes",
      "No",
    );

    document.getElementById("modal-overlay").style.display = "block";

    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage = `url('Visual Assets/Henchmen/DarkCity_phalanx.webp')`;
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = () => {
      onscreenConsole.log(
        `You are able to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and have escaped <span class="console-highlights">Phalanx</span><span class="bold-spans">'s</span> fight effect!`,
      );
      hideHeroAbilityMayPopup();
      resolve(true); // Explicitly resolve
    };

    denyButton.onclick = () => {
      onscreenConsole.log(
        `You have chosen not to reveal a <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero.`,
      );
      hideHeroAbilityMayPopup();
      document.getElementById("modal-overlay").style.display = "block";
      // Chain to the next handler and resolve when it completes
      handlePhalanxNoTechRevealed().then(resolve);
    };
  });
}

// Card Abilities for Dark City Bystanders

async function rescueBystanderAbility(bystander) {
  // No-op default so callers can always await safely
  if (!bystander) return;

  // Handle unconditional ability
  if (
    bystander.bystanderUnconditionalAbility &&
    bystander.bystanderUnconditionalAbility !== "None"
  ) {
    const fn = window[bystander.bystanderUnconditionalAbility];
    if (typeof fn === "function") {
      // Ensure we await even if fn is non-async
      await Promise.resolve(fn(bystander));
    } else {
      console.error(
        `Unconditional ability function ${bystander.bystanderUnconditionalAbility} not found`,
      );
    }
  }
}

function bystanderNewsReporter() {
  onscreenConsole.log(
    `<span class="console-highlights">News Reporter</span><span class="bold-spans">'s</span> ability activated!`,
  );
  extraDraw();
}

function bystanderRadiationScientist() {
  onscreenConsole.log(
    `<span class="console-highlights">Radiation Scientist</span><span class="bold-spans">'s</span> ability activated!`,
  );
  return new Promise((resolve) => {
    // Get only Hero cards from each location
    const handHeroes = playerHand.filter((card) => card.type === "Hero");
    const discardHeroes = playerDiscardPile.filter(
      (card) => card.type === "Hero",
    );
    const playedHeroes = cardsPlayedThisTurn.filter(
      (card) =>
        card.type === "Hero" && !card.isCopied && !card.sidekickToDestroy,
    );

    if (
      handHeroes.length === 0 &&
      discardHeroes.length === 0 &&
      playedHeroes.length === 0
    ) {
      onscreenConsole.log(`No Heroes available to be KO'd.`);
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
    const selectionContainer = document.querySelector(
      ".card-choice-popup-selection-container",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "RADIATION SCIENTIST";
    instructionsElement.innerHTML = `<span class="console-highlights">Radiation Scientist</span> - You may KO one of your Heroes or a Hero from your discard pile.`;

    // Show both rows and labels
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "Played Cards & Hand";
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

    // Set Radiation Scientist image in preview
    const previewImage = document.createElement("img");
    previewImage.src = "Visual Assets/Other/Bystanders/radiationScientist.webp";
    previewImage.alt = "Radiation Scientist";
    previewImage.className = "popup-card-preview-image";
    previewElement.appendChild(previewImage);
    previewElement.style.backgroundColor = "var(--accent)";

    let selectedCard = null;
    let selectedLocation = null; // 'hand', 'played', or 'discard'
    let selectedCardImage = null;
    let isDragging = false;

    // Sort the arrays for display
    genericCardSort(handHeroes);
    genericCardSort(playedHeroes);
    genericCardSort(discardHeroes);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        instructionsElement.innerHTML = `<span class="console-highlights">Radiation Scientist</span> - You may KO one of your Heroes or a Hero from your discard pile.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
      }
    }

    const row1 = selectionRow1; // row1 is selectionRow1
    const row2Visible = true; // Since we're hiding row2 in this popup

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

        // Update preview to show card image
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

        // If no card is selected, return to Radiation Scientist image
        if (selectedCard === null) {
          setTimeout(() => {
            if (
              !selectionRow1.querySelector(":hover") &&
              !selectionRow2.querySelector(":hover") &&
              !isDragging
            ) {
              previewElement.innerHTML = "";
              const scientistImage = document.createElement("img");
              scientistImage.src =
                "Visual Assets/Other/Bystanders/radiationScientist.webp";
              scientistImage.alt = "Radiation Scientist";
              scientistImage.className = "popup-card-preview-image";
              previewElement.appendChild(scientistImage);
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
          selectedLocation = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;

          // Return to Radiation Scientist image
          previewElement.innerHTML = "";
          const scientistImage = document.createElement("img");
          scientistImage.src =
            "Visual Assets/Other/Bystanders/radiationScientist.webp";
          scientistImage.alt = "Radiation Scientist";
          scientistImage.className = "popup-card-preview-image";
          previewElement.appendChild(scientistImage);
          previewElement.style.backgroundColor = "var(--accent)";
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

          // Update preview to show selected card
          previewElement.innerHTML = "";
          const selectedPreviewImage = document.createElement("img");
          selectedPreviewImage.src = card.image;
          selectedPreviewImage.alt = card.name;
          selectedPreviewImage.className = "popup-card-preview-image";
          previewElement.appendChild(selectedPreviewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    if (playedHeroes.length > 0) {
      const playedLabel = document.createElement("span");
      playedLabel.textContent = "Played Cards: ";
      playedLabel.className = "row-divider-text";
      selectionRow1.appendChild(playedLabel);
    }

    // Populate row1 with Played Cards and Hand
    playedHeroes.forEach((card) => {
      createCardElement(card, "played", selectionRow1);
    });

    if (handHeroes.length > 0) {
      const handLabel = document.createElement("span");
      handLabel.textContent = "Hand: ";
      handLabel.className = "row-divider-text";
      selectionRow1.appendChild(handLabel);
    }

    handHeroes.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Discard Pile
    discardHeroes.forEach((card) => {
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
    confirmButton.textContent = "KO HERO";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "inline-block";
    noThanksButton.textContent = "NO THANKS";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(() => {
        // Perform the KO from the correct location using ID lookup
        if (selectedLocation === "discard") {
          const index = playerDiscardPile.findIndex(
            (card) => card.id === selectedCard.id,
          );
          if (index !== -1) playerDiscardPile.splice(index, 1);
        } else if (selectedLocation === "hand") {
          const index = playerHand.findIndex(
            (card) => card.id === selectedCard.id,
          );
          if (index !== -1) playerHand.splice(index, 1);
        } else if (selectedLocation === "played") {
          selectedCard.markedToDestroy = true;
        }

        koPile.push(selectedCard);
        onscreenConsole.log(
          `<span class="console-highlights">Radiation Scientist</span> - you KO'd <span class="console-highlights">${selectedCard.name}</span>.`,
        );

        koBonuses();
        closeCardChoicePopup();
        updateGameBoard();
        resolve(true);
      }, 100);
    };

    // No thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(
        `<span class="console-highlights">Radiation Scientist</span> - You chose not to KO any cards.`,
      );
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function bystanderParamedic() {
  return new Promise((resolve) => {
    onscreenConsole.log(
      `<span class="console-highlights">Paramedic</span><span class="bold-spans">'s</span> ability activated!`,
    );

    // Get wounds from both locations
    const discardPile = playerDiscardPile.filter(
      (card) => card.type === "Wound",
    );
    const hand = playerHand.filter((card) => card.type === "Wound");

    // If no wounds are found, log and resolve
    if (discardPile.length === 0 && hand.length === 0) {
      onscreenConsole.log(
        '<span class="console-highlights">Paramedic</span> - No Wounds available to KO.',
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
    const selectionContainer = document.querySelector(
      ".card-choice-popup-selection-container",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "PARAMEDIC";
    instructionsElement.innerHTML = `<span class="console-highlights">Paramedic</span> - You may KO a Wound from your hand or discard pile.`;

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

    // Set Paramedic image in preview
    const previewImage = document.createElement("img");
    previewImage.src = "Visual Assets/Other/Bystanders/paramedic.webp";
    previewImage.alt = "Paramedic";
    previewImage.className = "popup-card-preview-image";
    previewElement.appendChild(previewImage);
    previewElement.style.backgroundColor = "var(--accent)";

    let selectedWound = null;
    let selectedLocation = null; // 'Hand' or 'Discard Pile'
    let selectedCardImage = null;
    let isDragging = false;

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedWound === null;

      if (selectedWound === null) {
        instructionsElement.innerHTML = `<span class="console-highlights">Paramedic</span> - You may KO a Wound from your hand or discard pile.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedWound.name}</span> will be KO'd from your ${selectedLocation}.`;
      }
    }

    const row1 = selectionRow1; // row1 is selectionRow1
    const row2Visible = true; // Since we're hiding row2 in this popup

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card element helper function
    function createCardElement(wound, location, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", wound.id);
      cardElement.setAttribute("data-location", location);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = wound.image;
      cardImage.alt = wound.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview to show wound image
        previewElement.innerHTML = "";
        const hoverPreviewImage = document.createElement("img");
        hoverPreviewImage.src = wound.image;
        hoverPreviewImage.alt = wound.name;
        hoverPreviewImage.className = "popup-card-preview-image";
        previewElement.appendChild(hoverPreviewImage);
        previewElement.style.backgroundColor = "var(--accent)";
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // If no card is selected, return to Paramedic image
        if (selectedWound === null) {
          setTimeout(() => {
            if (
              !selectionRow1.querySelector(":hover") &&
              !selectionRow2.querySelector(":hover") &&
              !isDragging
            ) {
              previewElement.innerHTML = "";
              const paramedicImage = document.createElement("img");
              paramedicImage.src =
                "Visual Assets/Other/Bystanders/paramedic.webp";
              paramedicImage.alt = "Paramedic";
              paramedicImage.className = "popup-card-preview-image";
              previewElement.appendChild(paramedicImage);
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

        if (selectedWound === wound && selectedLocation === location) {
          // Deselect
          selectedWound = null;
          selectedLocation = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;

          // Return to Paramedic image
          previewElement.innerHTML = "";
          const paramedicImage = document.createElement("img");
          paramedicImage.src = "Visual Assets/Other/Bystanders/paramedic.webp";
          paramedicImage.alt = "Paramedic";
          paramedicImage.className = "popup-card-preview-image";
          previewElement.appendChild(paramedicImage);
          previewElement.style.backgroundColor = "var(--accent)";
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedWound = wound;
          selectedLocation = location;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview to show selected wound
          previewElement.innerHTML = "";
          const selectedPreviewImage = document.createElement("img");
          selectedPreviewImage.src = wound.image;
          selectedPreviewImage.alt = wound.name;
          selectedPreviewImage.className = "popup-card-preview-image";
          previewElement.appendChild(selectedPreviewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    // Populate hand wounds (row1)
    hand.forEach((wound) => {
      createCardElement(wound, "Hand", selectionRow1);
    });

    // Populate discard pile wounds (row2)
    discardPile.forEach((wound) => {
      createCardElement(wound, "Discard Pile", selectionRow2);
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
    noThanksButton.style.display = "inline-block";
    noThanksButton.textContent = "NO THANKS";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedWound === null || selectedLocation === null) return;

      setTimeout(() => {
        // Remove wound from its location
        if (selectedLocation === "Discard Pile") {
          const index = playerDiscardPile.indexOf(selectedWound);
          if (index !== -1) playerDiscardPile.splice(index, 1);
        } else {
          const index = playerHand.indexOf(selectedWound);
          if (index !== -1) playerHand.splice(index, 1);
        }

        // Add to KO pile and gain attack
        koPile.push(selectedWound);
        onscreenConsole.log(
          `<span class="console-highlights">Paramedic</span> - You KO'd a <span class="console-highlights">${selectedWound.name}</span> from your ${selectedLocation}.`,
        );
        koBonuses();

        closeCardChoicePopup();
        updateGameBoard();
        resolve(true);
      }, 100);
    };

    // No thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(
        `<span class="console-highlights">Paramedic</span> - You chose not to KO any Wounds.`,
      );
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

//Card Abilities for Dark City Villains

function rhinoAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Rhino</span> makes you reveal the top card of the Villain deck.`,
  );

  const topCardOfVillainDeck = villainDeck[villainDeck.length - 1];

  if (villainDeck.length === 0) {
    onscreenConsole.log(`The Villain deck is empty. No cards to reveal.`);
    return;
  }

  if (topCardOfVillainDeck.type === "Master Strike") {
    onscreenConsole.log(
      `You revealed a <span class="console-highlights">Master Strike</span> and gain a Wound.`,
    );
    topCardOfVillainDeck.revealed = true;
    drawWound();
    updateGameBoard();
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It is not a Master Strike and you have avoided gaining a Wound.`,
    );
    topCardOfVillainDeck.revealed = true;
    updateGameBoard();
    return;
  }
}

function rhinoEscape() {
  onscreenConsole.log(
    `Escape! <span class="console-highlights">Rhino</span> causes you to gain a Wound.`,
  );
  drawWound();
}

function electroAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Electro</span> makes you reveal the top card of the Villain deck.`,
  );
  const topCardOfVillainDeck = villainDeck[villainDeck.length - 1];

  if (villainDeck.length === 0) {
    onscreenConsole.log(`The Villain deck is empty. No cards to reveal.`);
    return;
  }

  if (topCardOfVillainDeck.type === "Scheme Twist") {
    onscreenConsole.log(
      `You revealed a <span class="console-highlights">Scheme Twist</span>. It will now be played.`,
    );
    drawVillainCard();
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It is not a Scheme Twist and does not need to be played.`,
    );
    topCardOfVillainDeck.revealed = true;
    updateGameBoard();
    return;
  }
}

function eggheadAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Egghead</span> makes you reveal the top card of the Villain deck.`,
  );

  const topCardOfVillainDeck = villainDeck[villainDeck.length - 1];

  if (villainDeck.length === 0) {
    onscreenConsole.log(`The Villain deck is empty. No cards to reveal.`);
    return;
  }

  if (topCardOfVillainDeck.type === "Villain") {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It will now be played.`,
    );
    drawVillainCard();
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It is not a Villain and does not need to be played.`,
    );
    topCardOfVillainDeck.revealed = true;
    updateGameBoard();
    return;
  }
}

function gladiatorAmbush(gladiatorCard) {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Gladiator</span> makes you reveal the top card of the Villain deck.`,
  );

  // Verify the gladiatorCard is actually in the city
  const gladiatorIndex = city.findIndex((card) => card === gladiatorCard);
  if (
    gladiatorIndex === -1 ||
    !(gladiatorCard.type === "Villain" || gladiatorCard.type === "Henchman")
  ) {
    onscreenConsole.log(
      `No valid Gladiator found in the city to capture the Bystander.`,
    );
    return;
  }

  if (villainDeck.length === 0) {
    onscreenConsole.log(`The Villain deck is empty. No cards to reveal.`);
    return;
  }

  const topCardOfVillainDeck = villainDeck[villainDeck.length - 1];

  if (topCardOfVillainDeck.type === "Bystander") {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>.`,
    );

    // Attach the bystander to the specific Gladiator that triggered this
    attachBystanderToVillain(gladiatorIndex, topCardOfVillainDeck);

    updateGameBoard();
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardOfVillainDeck.name}</span>. It is not a Bystander and is not captured by <span class="console-highlights">Gladiator</span>.`,
    );
    topCardOfVillainDeck.revealed = true;
    updateGameBoard();
  }
}

function warFight() {
  onscreenConsole.log(
    `<span class="console-highlights">War</span> - fight effect!`,
  );

  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  if (
    cardsYouHave.filter(
      (item) => item.classes && item.classes.includes("Instinct"),
    ).length === 0
  ) {
    onscreenConsole.log(
      `You are unable to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
    );
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?',
          "Reveal Hero",
          "Gain Wound",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML = "WAR";

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
            "url('Visual Assets/Villains/DarkCity_FourHorsemen_War.webp')";
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
            `You are able to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have escaped gaining a Wound!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          cleanup();
        };
      }, 10);
    });
  }
}

function warEscape() {
  onscreenConsole.log(
    `<span class="console-highlights">War</span> has escaped!`,
  );

  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  if (
    cardsYouHave.filter(
      (item) => item.classes && item.classes.includes("Instinct"),
    ).length === 0
  ) {
    onscreenConsole.log(
      `You are unable to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
    );
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?',
          "Reveal Hero",
          "Gain Wound",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML = "WAR";

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
            "url('Visual Assets/Villains/DarkCity_FourHorsemen_War.webp')";
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
            `You are able to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          cleanup();
        };
      }, 10);
    });
  }
}

function famineFight() {
  onscreenConsole.log(
    `<span class="console-highlights">Famine</span> - fight effect!`,
  );

  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  if (
    cardsYouHave.filter(
      (item) => item.classes && item.classes.includes("Instinct"),
    ).length === 0
  ) {
    onscreenConsole.log(
      `You are unable to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
    );
    genericDiscardChoice();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> HERO TO AVOID DISCARDING A CARD?',
          "Reveal Hero",
          "Discard Card",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "FAMINE";

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
            "url('Visual Assets/Villains/DarkCity_FourHorsemen_Famine.webp')";
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
            `You are able to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have escaped discarding!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
          );
          genericDiscardChoice();
          cleanup();
        };
      }, 10);
    });
  }
}

function famineEscape() {
  onscreenConsole.log(
    `<span class="console-highlights">Famine</span> has escaped!`,
  );

  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  if (
    cardsYouHave.filter(
      (item) => item.classes && item.classes.includes("Instinct"),
    ).length === 0
  ) {
    onscreenConsole.log(
      `You are unable to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
    );
    genericDiscardChoice();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> HERO TO AVOID DISCARDING A CARD?',
          "Reveal Hero",
          "Discard Card",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "FAMINE";

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
            "url('Visual Assets/Villains/DarkCity_FourHorsemen_Famine.webp')";
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
            `You are able to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have escaped gaining a wound!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
          );
          genericDiscardChoice();
          cleanup();
        };
      }, 10);
    });
  }
}

function pestilenceFight() {
  onscreenConsole.log(
    `<span class="console-highlights">Pestilence</span> - fight effect!`,
  );
  return new Promise(async (resolve) => {
    // Reveal up to 3
    const revealedCards = [];
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
      revealedCards.push(playerDeck.pop());
    }

    const cardsToDiscard = revealedCards.filter((c) => (c?.cost ?? 0) >= 1);
    const cardsToReturn = revealedCards.filter((c) => (c?.cost ?? 0) < 1);

    // — NEW: cost summary + central discard handler —
    const formatCardCosts = (cards) =>
      cards
        .map(
          (c) =>
            `<span class="console-highlights">${c.name}</span> (Cost: ${c.cost ?? 0})`,
        )
        .join(", ");

    if (cardsToDiscard.length) {
      onscreenConsole.log(`Discarding: ${formatCardCosts(cardsToDiscard)}.`);
      const { returned } = await checkDiscardForInvulnerability(cardsToDiscard);
      if (returned?.length) playerHand.push(...returned);
    }

    if (cardsToReturn.length === 0) {
      onscreenConsole.log(
        "All revealed cards cost 1 or more and have been discarded.",
      );
      updateGameBoard();
      resolve();
      return;
    }

    if (cardsToReturn.length === 1) {
      playerDeck.push(cardsToReturn[0]);
      cardsToReturn[0].revealed = true;
      onscreenConsole.log(
        `<span class="console-highlights">${cardsToReturn[0].name}</span> returned to deck.`,
      );
      updateGameBoard();
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(cardsToReturn[0]);
      }
      resolve();
      return;
    }

    // Multiple returns – keep your existing order UI/logic
    handleCardReturnOrder(cardsToReturn).then(() => {
      updateGameBoard();
      resolve();
    });
  });
}

function pestilenceEscape() {
  onscreenConsole.log(
    `<span class="console-highlights">Pestilence</span> has escaped!`,
  );
  return new Promise(async (resolve) => {
    // Reveal up to 3
    const revealedCards = [];
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
      revealedCards.push(playerDeck.pop());
    }

    const cardsToDiscard = revealedCards.filter((c) => (c?.cost ?? 0) >= 1);
    const cardsToReturn = revealedCards.filter((c) => (c?.cost ?? 0) < 1);

    // — NEW: cost summary + central discard handler —
    const formatCardCosts = (cards) =>
      cards
        .map(
          (c) =>
            `<span class="console-highlights">${c.name}</span> (Cost: ${c.cost ?? 0})`,
        )
        .join(", ");

    if (cardsToDiscard.length) {
      onscreenConsole.log(`Discarding: ${formatCardCosts(cardsToDiscard)}.`);
      const { returned } = await checkDiscardForInvulnerability(cardsToDiscard);
      if (returned?.length) playerHand.push(...returned);
    }

    if (cardsToReturn.length === 0) {
      onscreenConsole.log(
        "All revealed cards cost 1 or more and have been discarded.",
      );
      updateGameBoard();
      resolve();
      return;
    }

    if (cardsToReturn.length === 1) {
      playerDeck.push(cardsToReturn[0]);
      cardsToReturn[0].revealed = true;
      onscreenConsole.log(
        `<span class="console-highlights">${cardsToReturn[0].name}</span> returned to deck.`,
      );
      updateGameBoard();
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(cardsToReturn[0]);
      }

      resolve();
      return;
    }

    // Multiple returns – keep your existing order UI/logic
    handleCardReturnOrder(cardsToReturn).then(() => {
      updateGameBoard();
      resolve();
    });
  });
}

function deathFight() {
  onscreenConsole.log(
    `<span class="console-highlights">Death</span> - fight effect!`,
  );
  return new Promise((resolve, reject) => {
    // Combine heroes from the player's hand and cards played this turn
    // Exclude cards that are already marked for destruction
    const handHeroes = playerHand
      .map((card, index) => ({ card, originalIndex: index, location: "hand" }))
      .filter((item) => item.card.cost >= 1 && !item.card.markedToDestroy);
    
    const playedHeroes = cardsPlayedThisTurn
      .map((card, index) => ({ card, originalIndex: index, location: "played" }))
      .filter((item) => 
        item.card.isCopied !== true && 
        item.card.sidekickToDestroy !== true && 
        item.card.cost >= 1 && 
        !item.card.markedToDestroy
      );

    // Combine both arrays
    const heroesThatCostMoreThanOne = [...handHeroes, ...playedHeroes];

    // Check if there are any heroes in the combined list
    if (heroesThatCostMoreThanOne.length === 0) {
      onscreenConsole.log(`No Heroes available to KO.`);
      resolve(); // Resolve immediately if there are no heroes to KO
      return;
    }

    // Setup UI elements for new popup structure
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
    const selectionContainer = document.querySelector(
      ".card-choice-popup-selection-container",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "Death - Fight!";
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

    // Reset container styles for two-row layout
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
    let selectedCardImage = null;
    let isDragging = false;
    let startX, startY, scrollLeft, startTime;

    // Sort the arrays for display
    const handHeroesSorted = handHeroes.sort((a, b) => genericCardSort([a.card, b.card]));
    const playedHeroesSorted = playedHeroes.sort((a, b) => genericCardSort([a.card, b.card]));

    const row1 = selectionRow1;
    const row2Visible = true;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card element helper function
    function createCardElement(cardItem, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-original-index", String(cardItem.originalIndex));
      cardElement.setAttribute("data-location", cardItem.location);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = cardItem.card.image;
      cardImage.alt = cardItem.card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview only if no card is selected
        if (selectedCard === null) {
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = cardItem.card.image;
          previewImage.alt = cardItem.card.name;
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

        if (selectedCard && selectedCard.cardItem === cardItem) {
          // Deselect if clicking the same card
          selectedCard = null;
          selectedCardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous selection if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
          selectedCard = {
            cardItem: cardItem,
            card: cardItem.card,
            originalIndex: cardItem.originalIndex,
            location: cardItem.location
          };
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = cardItem.card.image;
          previewImage.alt = cardItem.card.name;
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
      row.appendChild(cardElement);
    }

    // Populate row1 with Hand heroes
    handHeroesSorted.forEach((cardItem) => {
      createCardElement(cardItem, selectionRow1);
    });

    // Populate row2 with Played Cards heroes
    playedHeroesSorted.forEach((cardItem) => {
      createCardElement(cardItem, selectionRow2);
    });

    function updateInstructions() {
      if (selectedCard === null) {
        instructionsElement.textContent = "Select a Hero to KO.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.card.name}</span> will be KO'd.`;
      }
    }

    // Adjust layout based on number of cards
    const totalCards = heroesThatCostMoreThanOne.length;
    const handCardsCount = handHeroesSorted.length;
    const playedCardsCount = playedHeroesSorted.length;

    if (totalCards > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      selectionRow2.classList.add("multi-row");
      selectionRow2.classList.add("three-row");
    } else if (totalCards > 10 || handCardsCount > 5 || playedCardsCount > 5) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      selectionRow2.classList.add("multi-row");
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
      if (!selectedCard) return;

      setTimeout(() => {
        const { card, location, originalIndex } = selectedCard;
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> has been KO'd.`,
        );
        koBonuses();

        // Remove the card from the correct location
        if (location === "hand") {
          // Remove from playerHand using the original index
          playerHand.splice(originalIndex, 1);
        } else {
          // Mark the played card to be destroyed at the end of the turn
          card.markedToDestroy = true;
        }

        // Add the card to the KO pile
        koPile.push(card);

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

function deathEscape() {
  onscreenConsole.log(
    `<span class="console-highlights">Death</span> has escaped!`,
  );
  return new Promise((resolve, reject) => {
    // Combine heroes from the player's hand and cards played this turn
    // Exclude cards that are already marked for destruction
    const handHeroes = playerHand
      .map((card, index) => ({ card, originalIndex: index, location: "hand" }))
      .filter((item) => item.card.cost >= 1 && !item.card.markedToDestroy);
    
    const playedHeroes = cardsPlayedThisTurn
      .map((card, index) => ({ card, originalIndex: index, location: "played" }))
      .filter((item) => 
        item.card.isCopied !== true && 
        item.card.sidekickToDestroy !== true && 
        item.card.cost >= 1 && 
        !item.card.markedToDestroy
      );

    // Combine both arrays
    const heroesThatCostMoreThanOne = [...handHeroes, ...playedHeroes];

    // Check if there are any heroes in the combined list
    if (heroesThatCostMoreThanOne.length === 0) {
      onscreenConsole.log(`No Heroes available to KO.`);
      resolve(); // Resolve immediately if there are no heroes to KO
      return;
    }

    // Setup UI elements for new popup structure
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
    const selectionContainer = document.querySelector(
      ".card-choice-popup-selection-container",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "Death - Escape!";
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

    // Reset container styles for two-row layout
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
    let selectedCardImage = null;
    let isDragging = false;
    let startX, startY, scrollLeft, startTime;

    // Sort the arrays for display
    const handHeroesSorted = handHeroes.sort((a, b) => genericCardSort([a.card, b.card]));
    const playedHeroesSorted = playedHeroes.sort((a, b) => genericCardSort([a.card, b.card]));

    const row1 = selectionRow1;
    const row2Visible = true;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card element helper function
    function createCardElement(cardItem, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-original-index", String(cardItem.originalIndex));
      cardElement.setAttribute("data-location", cardItem.location);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = cardItem.card.image;
      cardImage.alt = cardItem.card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview only if no card is selected
        if (selectedCard === null) {
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = cardItem.card.image;
          previewImage.alt = cardItem.card.name;
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

        if (selectedCard && selectedCard.cardItem === cardItem) {
          // Deselect if clicking the same card
          selectedCard = null;
          selectedCardImage.classList.remove("selected");
          selectedCardImage = null;

          // Clear preview
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous selection if any
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new card
          selectedCard = {
            cardItem: cardItem,
            card: cardItem.card,
            originalIndex: cardItem.originalIndex,
            location: cardItem.location
          };
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = cardItem.card.image;
          previewImage.alt = cardItem.card.name;
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
      row.appendChild(cardElement);
    }

    // Populate row1 with Hand heroes
    handHeroesSorted.forEach((cardItem) => {
      createCardElement(cardItem, selectionRow1);
    });

    // Populate row2 with Played Cards heroes
    playedHeroesSorted.forEach((cardItem) => {
      createCardElement(cardItem, selectionRow2);
    });

    function updateInstructions() {
      if (selectedCard === null) {
        instructionsElement.textContent = "Select a Hero to KO.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.card.name}</span> will be KO'd.`;
      }
    }

    // Adjust layout based on number of cards
    const totalCards = heroesThatCostMoreThanOne.length;
    const handCardsCount = handHeroesSorted.length;
    const playedCardsCount = playedHeroesSorted.length;

    if (totalCards > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      selectionRow2.classList.add("multi-row");
      selectionRow2.classList.add("three-row");
    } else if (totalCards > 10 || handCardsCount > 5 || playedCardsCount > 5) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      selectionRow2.classList.add("multi-row");
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
      if (!selectedCard) return;

      setTimeout(() => {
        const { card, location, originalIndex } = selectedCard;
        onscreenConsole.log(
          `<span class="console-highlights">${card.name}</span> has been KO'd.`,
        );
        koBonuses();

        // Remove the card from the correct location
        if (location === "hand") {
          // Remove from playerHand using the original index
          playerHand.splice(originalIndex, 1);
        } else {
          // Mark the played card to be destroyed at the end of the turn
          card.markedToDestroy = true;
        }

        // Add the card to the KO pile
        koPile.push(card);

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

async function vertigoFight() {
  onscreenConsole.log(
    `<span class="console-highlights">Vertigo</span> - fight effect!`,
  );

  const numberToDraw = playerHand.length;

  // 1) Snapshot & clear the hand up front
  const handSnapshot = [...playerHand]; // exact refs
  playerHand.length = 0; // clear without replacing the array object

  // 2) Discard the snapshot (immediate triggers resolve here; new draws go safely into the empty hand)
  const { returned } = await checkDiscardForInvulnerability(handSnapshot);
  if (returned?.length) playerHand.push(...returned);

  // 3) Draw the replacement hand
  for (let i = 0; i < numberToDraw; i++) {
    extraDraw();
  }

  onscreenConsole.log(`Hand discarded and redrawn (${numberToDraw}).`);
  updateGameBoard();
}

function scalphunterAmbush(scalphunter) {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Scalphunter</span> captures a Bystander from your Victory Pile.`,
  );
  return new Promise((resolve) => {
    const bystandersInVP = victoryPile
      .map((card, index) =>
        card && card.type === "Bystander"
          ? { ...card, id: `vp-${index}`, index }
          : null,
      )
      .filter((card) => card !== null);

    // Handle cases with 0 bystanders immediately
    if (bystandersInVP.length === 0) {
      onscreenConsole.log(
        'There are no Bystanders in your Victory Pile for <span class="console-highlights">Scalphunter</span> to capture.',
      );
      updateGameBoard();
      resolve();
      return;
    }

    // If only 1 bystander, automatically capture it
    if (bystandersInVP.length === 1) {
      const card = bystandersInVP[0];
      victoryPile.splice(card.index, 1);
      const scalphunterIndex = city.findIndex((c) => c === scalphunter);
      attachBystanderToVillain(scalphunterIndex, card);
      onscreenConsole.log(
        `You only had one Bystander in your Victory Pile: <span class="console-highlights">${card.name}</span> has been captured by <span class="console-highlights">Scalphunter</span>.`,
      );
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
    titleElement.textContent = "Scalphunter";
    instructionsElement.innerHTML =
      "Select one Bystander to capture with Scalphunter from your Victory Pile.";

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

    let selectedBystander = null;
    let selectedCardImage = null;
    let isDragging = false;
    let startX, startY, scrollLeft, startTime;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each bystander
    bystandersInVP.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-card-index", String(card.index));

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
        if (selectedBystander === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedBystander === null) {
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
        const cardIndex = Number(cardElement.getAttribute("data-card-index"));

        if (selectedBystander && selectedBystander.id === cardId) {
          // Deselect if same card clicked
          selectedBystander = null;
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
          selectedBystander = {
            ...card,
            id: cardId,
            index: cardIndex,
          };
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
          selectedBystander === null;
        updateInstructions();
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    function updateInstructions() {
      if (!selectedBystander) {
        instructionsElement.textContent =
          "Select one Bystander from your Victory Pile to be captured.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedBystander.name}</span>`;
      }
    }

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
    confirmButton.textContent = "Capture Selected Bystander";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedBystander) return;

      setTimeout(() => {
        victoryPile.splice(selectedBystander.index, 1);
        const scalphunterIndex = city.findIndex((c) => c === scalphunter);

        // Create a copy instead of using the original reference
        const bystanderCopy = { ...selectedBystander };
        villainEffectAttachBystanderToVillain(scalphunterIndex, bystanderCopy);

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

function chimeraAmbush(chimera) {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Chimera</span> reveals the top three cards of the Villain Deck.`,
  );

  return new Promise((resolve) => {
    // Reveal top 3 cards (using pop since top is last in array)
    const revealedCards = [];
    for (let i = 0; i < 3 && villainDeck.length > 0; i++) {
      revealedCards.unshift(villainDeck.pop()); // pop removes from end, unshift adds to front
    }

    // Log revealed cards
    if (revealedCards.length === 0) {
      onscreenConsole.log(
        "The Villain deck is empty - no cards can be revealed.",
      );
      resolve();
      return;
    }

    onscreenConsole.log("Revealed from Villain deck:");
    revealedCards.forEach((card) => {
      onscreenConsole.log(
        `- <span class="console-highlights">${card.name}</span>`,
      );
    });

    // Filter out bystanders
    const bystanders = revealedCards.filter(
      (card) => card.type === "Bystander",
    );
    const nonBystanders = revealedCards.filter(
      (card) => card.type !== "Bystander",
    );

    // Capture bystanders with Chimera
    if (bystanders.length > 0) {
      const chimeraIndex = city.findIndex((card) => card === chimera);
      bystanders.forEach((bystander) => {
        // No need to remove from villain deck - we already popped them
        attachBystanderToVillain(chimeraIndex, bystander);
        onscreenConsole.log(
          `<span class="console-highlights">${bystander.name}</span> captured by <span class="console-highlights">Chimera</span>!`,
        );
      });
    } else {
      onscreenConsole.log("No Bystanders were revealed.");
    }

    if (nonBystanders.length === 1) {
      nonBystanders[0].revealed = true;
    }

    // Shuffle non-bystanders and put back on top
    if (nonBystanders.length > 0) {
      // Shuffle them
      const shuffled = [...nonBystanders].sort(() => Math.random() - 0.5);

      // Put back on top (end of array)
      villainDeck.push(...shuffled);
      onscreenConsole.log(
        "Remaining cards shuffled back on top of the Villain deck.",
      );
    } else {
      onscreenConsole.log("No cards to shuffle back onto the Villain deck.");
    }

    updateGameBoard();
    resolve();
  });
}

function blockbusterAmbush(blockbuster) {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Blockbuster</span> may capture a Bystander.`,
  );
  const bankIndex = 3; // Bank is at city index 3
  const bankVillain = city[bankIndex];

  return new Promise((resolve) => {
    try {
      // Check if there's a villain in the bank
      if (bankVillain && bankVillain.type === "Villain") {
        const isBlockbusterInBank = bankVillain === blockbuster;
        let totalCaptured = 0;

        // Handle bystander capture for bank villain
        if (bystanderDeck.length > 0) {
          const bystander = bystanderDeck.pop();
          attachBystanderToVillain(bankIndex, bystander);
          onscreenConsole.log(
            `<span class="console-highlights">${bankVillain.name}</span> is in the Bank and captures <span class="console-highlights">${bystander.name}</span>.`,
          );
          totalCaptured++;
        }

        // Handle Blockbuster (if different from bank villain)
        if (!isBlockbusterInBank) {
          const blockbusterIndex = city.findIndex(
            (card) => card === blockbuster,
          );
          if (blockbusterIndex !== -1 && bystanderDeck.length > 0) {
            const bystander = bystanderDeck.pop();
            attachBystanderToVillain(blockbusterIndex, bystander);
            onscreenConsole.log(
              `<span class="console-highlights">Blockbuster</span> captures <span class="console-highlights">${bystander.name}</span>.`,
            );
            totalCaptured++;
          }
        } else if (bystanderDeck.length > 0) {
          // Special case: Blockbuster is in bank - capture second bystander
          const secondBystander = bystanderDeck.pop();
          attachBystanderToVillain(bankIndex, secondBystander);
          onscreenConsole.log(
            `<span class="console-highlights">Blockbuster</span> is in the Bank and captures a second Bystander`,
          );
          totalCaptured++;
        }

        if (totalCaptured === 0) {
          onscreenConsole.log("No Bystanders available to capture.");
        }
      } else {
        onscreenConsole.log(
          "There is no Villain in the Bank. No Bystanders are captured.",
        );
      }

      updateGameBoard();
      resolve();
    } catch (error) {
      onscreenConsole.log("Error - no Bystanders captured.");
      resolve(); // Still resolve to prevent game hang
    }
  });
}

function reignfireEscape() {
  return new Promise((resolve, reject) => {
    // Search for Reignfire in the escape pile
    const reignfireIndex = escapedVillainsDeck.findIndex(
      (card) => card.name === "Reignfire",
    );

    if (reignfireIndex !== -1) {
      // Splice Reignfire from the escape pile
      const reignfireCard = escapedVillainsDeck.splice(reignfireIndex, 1)[0];

      // Change the card's properties
      reignfireCard.name = "Master Strike";
      reignfireCard.type = "Master Strike";

      // Place it on top of the villain deck
      villainDeck.push(reignfireCard);

      onscreenConsole.log(
        `Escape! <span class="console-highlights">Reignfire</span> has transformed into a Master Strike.`,
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
      console.log("Reignfire was not found in the Escape Pile.");
      resolve(); // Resolve immediately if Reignfire is not found
    }
  });
}

function wildsideFight(wildside) {
  if (currentVillainLocation === 3 || currentVillainLocation === 4) {
    onscreenConsole.log(
      `Fight! You fought <span class="console-highlights">${wildside.name}</span> in the Sewers or Bank. KO two of your Heroes.`,
    );
    chooseHeroesToKO();
  } else {
    onscreenConsole.log(
      `Fight! You fought <span class="console-highlights">${wildside.name}</span> outside of the Sewers or Bank. No Heroes are KO'd.`,
    );
  }
}

// Global variable to track active popup state
let activePopupState = null;

function zeroFight() {
  return new Promise(async (resolve) => {
    // Create array with original indices from playerHand
    const zeroCardsInHand = playerHand
      .map((card, index) => ({ card, originalIndex: index }))
      .filter((item) => item.card.cost === 0);

    // Handle cases with 0-3 zero-cost cards immediately
    if (zeroCardsInHand.length === 0) {
      onscreenConsole.log("You have no cards with a cost of 0.");
      updateGameBoard();
      resolve();
      return;
    }

    if (zeroCardsInHand.length <= 3) {
      // Sort by original index in descending order to avoid index shifting issues
      const cardsToRemove = zeroCardsInHand.sort(
        (a, b) => b.originalIndex - a.originalIndex,
      );

      for (const cardItem of cardsToRemove) {
        // Remove using the original index
        playerHand.splice(cardItem.originalIndex, 1);

        const { returned } = await checkDiscardForInvulnerability(
          cardItem.card,
        );
        if (returned.length) {
          playerHand.push(...returned);
        }
      }
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
    titleElement.textContent = "Zero";
    instructionsElement.innerHTML =
      'Select three cards that cost <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> to discard.';

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

    let selectedZeroCards = []; // Store card items with original indices
    let selectedCardImages = [];
    let isDragging = false;
    let startX, startY, scrollLeft, startTime;

    // Sort the array (now it will sort by card but preserve originalIndex)
    genericCardSort(zeroCardsInHand, (item) => item.card);

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each zero-cost card
    zeroCardsInHand.forEach((cardItem) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute(
        "data-original-index",
        String(cardItem.originalIndex),
      );

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = cardItem.card.image;
      cardImage.alt = cardItem.card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = cardItem.card.image;
        previewImage.alt = cardItem.card.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if fewer than 3 cards are selected
        if (selectedZeroCards.length < 3) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if we're not hovering over another card AND fewer than 3 cards are selected
        if (selectedZeroCards.length < 3) {
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

        const originalIndex = Number(
          cardElement.getAttribute("data-original-index"),
        );
        const existingIndex = selectedZeroCards.findIndex(
          (item) => item.originalIndex === originalIndex,
        );

        if (existingIndex > -1) {
          // Deselect
          selectedZeroCards.splice(existingIndex, 1);
          selectedCardImages.splice(existingIndex, 1);
          cardImage.classList.remove("selected");

          // Update preview and instructions
          updatePreviewAndInstructions();
        } else if (selectedZeroCards.length < 3) {
          // Select
          selectedZeroCards.push(cardItem);
          selectedCardImages.push(cardImage);
          cardImage.classList.add("selected");

          // Update preview and instructions
          updatePreviewAndInstructions();
        }

        // Update confirm button state
        document.getElementById("card-choice-popup-confirm").disabled =
          selectedZeroCards.length !== 3;
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    function updatePreviewAndInstructions() {
      // Update preview with the last selected card
      previewElement.innerHTML = "";
      if (selectedZeroCards.length > 0) {
        const lastCard = selectedZeroCards[selectedZeroCards.length - 1].card;
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
      const count = selectedZeroCards.length;
      if (count === 0) {
        instructionsElement.innerHTML =
          'Select three cards that cost <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> to discard.';
      } else {
        const names = selectedZeroCards
          .map(
            (item) =>
              `<span class="console-highlights">${item.card.name}</span>`,
          )
          .join(", ");
        instructionsElement.innerHTML = `Selected: ${names} (${count}/3)`;
      }
    }

    if (zeroCardsInHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (zeroCardsInHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (zeroCardsInHand.length > 5) {
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
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedZeroCards.length !== 3) return;
      closeCardChoicePopup();
      setTimeout(async () => {
        // Sort by original index in descending order to avoid index shifting issues
        const cardsToRemove = selectedZeroCards.sort(
          (a, b) => b.originalIndex - a.originalIndex,
        );

        for (const cardItem of cardsToRemove) {
          // Remove using the original index
          playerHand.splice(cardItem.originalIndex, 1);

          const { returned } = await checkDiscardForInvulnerability(
            cardItem.card,
          );
          if (returned.length) {
            playerHand.push(...returned);
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

function tombstoneEscape() {
  onscreenConsole.log(
    `<span class="console-highlights">Tombstone</span> has escaped!`,
  );

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
          "TOMBSTONE ESCAPED!";

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
            "url('Visual Assets/Villains/DarkCity_StreetsOfNewYork_Tombstone.webp')";
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

function hammerheadFight() {
  onscreenConsole.log(
    `Fight! <span class="console-highlights">Hammerhead</span> forces you to KO one of your Heroes with a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon.`,
  );
  return new Promise((resolve, reject) => {
    // Combine heroes from the player's hand and cards played this turn
    // Exclude cards that are already marked for destruction
    const handHeroes = playerHand.filter(
      (card) => card.recruitIcon === true && !card.markedToDestroy,
    );
    const playedHeroes = cardsPlayedThisTurn.filter(
      (card) =>
        card.isCopied !== true &&
        card.sidekickToDestroy !== true &&
        card.recruitIcon === true &&
        !card.markedToDestroy, // Exclude already marked cards
    );

    // Check if there are any heroes in the combined list
    if (handHeroes.length === 0 && playedHeroes.length === 0) {
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
    titleElement.textContent = "Hammerhead";
    instructionsElement.innerHTML =
      'Select a Hero with a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons"> icon to KO.';

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
        instructionsElement.innerHTML =
          'Select a Hero with a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons"> icon to KO.';
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

    // Populate row1 with Hand heroes with recruit icons
    handHeroes.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Played Cards heroes with recruit icons
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
    noThanksButton.textContent = "NO THANKS!"; // Added exclamation mark

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
          const handIndex = playerHand.findIndex(
            (handCard) => handCard === selectedCard,
          );
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

function jigsawAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Jigsaw</span> forces you to discard and draw.`,
  );

  return new Promise(async (resolve) => {
    // Build selectable entries that keep exact references + stable unique ids
    const availableCards = playerHand
      .filter(Boolean)
      .map((card, originalIndex) => ({
        card,
        originalIndex,
        uniqueId: `${card.id}-${originalIndex}`,
      }));

    // No cards
    if (availableCards.length === 0) {
      onscreenConsole.log("No cards in hand to discard.");
      resolve();
      return;
    }

    // ===== Case A: 3 or fewer in hand — discard ALL (snapshot & clear) =====
    if (availableCards.length <= 3) {
      const handSnapshot = [...playerHand]; // exact refs
      playerHand.length = 0; // clear without replacing array object

      const { returned } = await checkDiscardForInvulnerability(handSnapshot);
      if (returned.length) playerHand.push(...returned);

      // Draw 2 after all discard triggers resolve
      extraDraw();
      extraDraw();

      updateGameBoard();
      onscreenConsole.log(
        `Discarded ${handSnapshot.length} card${handSnapshot.length !== 1 ? "s" : ""}.`,
      );
      resolve();
      return;
    }

    // ===== Case B: More than 3 — pick exactly 3 =====
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
    titleElement.textContent = "Jigsaw";
    instructionsElement.textContent = "Select three cards to discard.";

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

    let selectedCards = []; // array of { card, originalIndex, uniqueId }
    let selectedCardImages = [];
    let isDragging = false;
    let startX, startY, scrollLeft, startTime;

    // Sort for display (your sorter can accept the 'card' property)
    genericCardSort(availableCards, "card");

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each available card
    availableCards.forEach((entry) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-unique-id", entry.uniqueId);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = entry.card.image;
      cardImage.alt = entry.card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = entry.card.image;
        previewImage.alt = entry.card.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if fewer than 3 cards are selected
        if (selectedCards.length < 3) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if we're not hovering over another card AND fewer than 3 cards are selected
        if (selectedCards.length < 3) {
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

        const uniqueId = cardElement.getAttribute("data-unique-id");
        const existingIndex = selectedCards.findIndex(
          (item) => item.uniqueId === uniqueId,
        );

        if (existingIndex > -1) {
          // Deselect
          selectedCards.splice(existingIndex, 1);
          selectedCardImages.splice(existingIndex, 1);
          cardImage.classList.remove("selected");

          // Update preview and instructions
          updatePreviewAndInstructions();
        } else {
          if (selectedCards.length >= 3) {
            // Remove the first selected card if we're at limit
            const firstUniqueId = selectedCards[0].uniqueId;
            const firstCardElement = selectionRow1.querySelector(
              `[data-unique-id="${firstUniqueId}"]`,
            );
            if (firstCardElement) {
              const firstCardImage =
                firstCardElement.querySelector(".popup-card-image");
              firstCardImage.classList.remove("selected");
            }
            selectedCards.shift();
            selectedCardImages.shift();
          }

          // Select new card
          selectedCards.push(entry);
          selectedCardImages.push(cardImage);
          cardImage.classList.add("selected");

          // Update preview and instructions
          updatePreviewAndInstructions();
        }

        // Update confirm button state
        document.getElementById("card-choice-popup-confirm").disabled =
          selectedCards.length !== 3;
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    function updatePreviewAndInstructions() {
      // Update preview with the last selected card
      previewElement.innerHTML = "";
      if (selectedCards.length > 0) {
        const lastCard = selectedCards[selectedCards.length - 1].card;
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
      if (selectedCards.length < 3) {
        instructionsElement.textContent = `Select ${3 - selectedCards.length} more card${selectedCards.length === 2 ? "" : "s"} to discard.`;
      } else {
        const namesList = selectedCards
          .map((o) => `<span class="console-highlights">${o.card.name}</span>`)
          .join(", ");
        instructionsElement.innerHTML = `Selected: ${namesList} will be discarded.`;
      }
    }

    if (availableCards.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (availableCards.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (availableCards.length > 5) {
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
    confirmButton.textContent = "Discard";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCards.length !== 3) return;

      setTimeout(async () => {
        confirmButton.disabled = true;
        closeCardChoicePopup();
        // Map selections to exact refs and remove them from hand by reference
        const toDiscard = selectedCards.map((s) => s.card);
        for (const ref of toDiscard) {
          const idx = playerHand.indexOf(ref);
          if (idx !== -1) playerHand.splice(idx, 1);
        }

        // Run discard triggers once, in batch
        const { returned } = await checkDiscardForInvulnerability(toDiscard);
        if (returned.length) playerHand.push(...returned);

        updateGameBoard();

        // Draw 2 after discards resolve
        extraDraw();
        extraDraw();

        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function bullseyeFight() {
  return new Promise((resolve) => {
    // Combine cards from hand and played cards with source tracking
    const combinedCards = [
      ...playerHand.map((card) => ({ card, source: "hand" })),
      ...cardsPlayedThisTurn
        .filter((card) => !card.isCopied && !card.sidekickToDestroy)
        .map((card) => ({ card, source: "played" })),
    ];

    // Filter cards with recruit and attack icons
    const recruitCards = combinedCards.filter(
      (item) => item.card.recruitIcon === true,
    );
    const attackCards = combinedCards.filter(
      (item) => item.card.attackIcon === true,
    );

    // Check if we have at least one card in at least one list
    if (recruitCards.length === 0 && attackCards.length === 0) {
      onscreenConsole.log(
        "No Heroes with <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'> or <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> icons available to KO.",
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
    titleElement.textContent = "Bullseye";
    instructionsElement.innerHTML = `KO one Hero with a <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'> icon and one with a <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'> icon.`;

    // Show both rows and labels - we'll customize these further
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "Attack Heroes";
    selectionRow2Label.textContent = "Recruit Heroes";
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

    let selectedRecruitCard = null;
    let selectedAttackCard = null;
    let selectedRecruitCardImage = null;
    let selectedAttackCardImage = null;
    let isDragging = false;

    // Sort the cards
    genericCardSort(recruitCards, "card");
    genericCardSort(attackCards, "card");

    // Separate by source for display
    const attackHandCards = attackCards.filter(
      (item) => item.source === "hand",
    );
    const attackPlayedCards = attackCards.filter(
      (item) => item.source === "played",
    );
    const recruitHandCards = recruitCards.filter(
      (item) => item.source === "hand",
    );
    const recruitPlayedCards = recruitCards.filter(
      (item) => item.source === "played",
    );

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const hasRecruit = recruitCards.length > 0;
      const hasAttack = attackCards.length > 0;

      if (hasRecruit && hasAttack) {
        // Need one of each
        confirmButton.disabled = !(selectedRecruitCard && selectedAttackCard);
        confirmButton.textContent =
          selectedRecruitCard && selectedAttackCard
            ? "CONFIRM KO"
            : `SELECT ${!selectedRecruitCard ? "RECRUIT" : "ATTACK"} HERO`;

        if (selectedRecruitCard && selectedAttackCard) {
          instructionsElement.innerHTML = `
                        Ready to KO: 
                        <span class="console-highlights">${selectedRecruitCard.card.name}</span> (Recruit) and 
                        <span class="console-highlights">${selectedAttackCard.card.name}</span> (Attack)
                    `;
        } else if (selectedRecruitCard) {
          instructionsElement.innerHTML = `
                        Selected: <span class="console-highlights">${selectedRecruitCard.card.name}</span> (Recruit)<br>
                        Still need to select an Attack Hero
                    `;
        } else if (selectedAttackCard) {
          instructionsElement.innerHTML = `
                        Selected: <span class="console-highlights">${selectedAttackCard.card.name}</span> (Attack)<br>
                        Still need to select a Recruit Hero
                    `;
        } else {
          instructionsElement.innerHTML = `
                        KO one Hero with <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'> 
                        and one with <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'>
                    `;
        }
      } else {
        // Only need one from whichever list has cards
        confirmButton.disabled = !(selectedRecruitCard || selectedAttackCard);
        confirmButton.textContent =
          selectedRecruitCard || selectedAttackCard
            ? "CONFIRM KO"
            : "SELECT HERO";

        if (hasRecruit) {
          instructionsElement.innerHTML = selectedRecruitCard
            ? `Selected: <span class="console-highlights">${selectedRecruitCard.card.name}</span> (Recruit)`
            : `KO one Hero with <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'>`;
        } else if (hasAttack) {
          instructionsElement.innerHTML = selectedAttackCard
            ? `Selected: <span class="console-highlights">${selectedAttackCard.card.name}</span> (Attack)`
            : `KO one Hero with <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'>`;
        }
      }
    }

    // Create section label helper function
    function createSectionLabel(text) {
      const label = document.createElement("div");
      label.className = "card-choice-section-label";
      label.textContent = text;
      label.style.cssText = `
                width: 100%;
                text-align: center;
                font-weight: bold;
                margin: 10px 0 5px 0;
                color: var(--accent);
                border-bottom: 1px solid var(--accent);
                padding-bottom: 5px;
            `;
      return label;
    }

    // Create card element helper function
    function createCardElement(cardItem, type, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", cardItem.card.id);
      cardElement.setAttribute("data-type", type);
      cardElement.setAttribute("data-source", cardItem.source);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = cardItem.card.image;
      cardImage.alt = cardItem.card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected in the other list
      const isSelectedInOtherList =
        (type === "recruit" && selectedAttackCard === cardItem) ||
        (type === "attack" && selectedRecruitCard === cardItem);

      if (isSelectedInOtherList) {
        cardImage.classList.add("selected");
      }

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = cardItem.card.image;
        previewImage.alt = cardItem.card.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if no cards are selected
        if (selectedRecruitCard === null && selectedAttackCard === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no cards are selected AND we're not hovering over another card
        if (selectedRecruitCard === null && selectedAttackCard === null) {
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

        if (type === "recruit") {
          if (selectedRecruitCard === cardItem) {
            // Deselect
            selectedRecruitCard = null;
            selectedRecruitCardImage = null;
            cardImage.classList.remove("selected");
          } else {
            // Deselect previous
            if (selectedRecruitCardImage) {
              selectedRecruitCardImage.classList.remove("selected");
            }

            // Select new
            selectedRecruitCard = cardItem;
            selectedRecruitCardImage = cardImage;
            cardImage.classList.add("selected");

            // If this card was selected in attack list, deselect it there
            if (selectedAttackCard === cardItem) {
              selectedAttackCard = null;
              selectedAttackCardImage = null;
              const attackCardElement = selectionRow1.querySelector(
                `[data-card-id="${cardItem.card.id}"] img`,
              );
              if (attackCardElement)
                attackCardElement.classList.remove("selected");
            }
          }
        } else {
          // type === 'attack'
          if (selectedAttackCard === cardItem) {
            // Deselect
            selectedAttackCard = null;
            selectedAttackCardImage = null;
            cardImage.classList.remove("selected");
          } else {
            // Deselect previous
            if (selectedAttackCardImage) {
              selectedAttackCardImage.classList.remove("selected");
            }

            // Select new
            selectedAttackCard = cardItem;
            selectedAttackCardImage = cardImage;
            cardImage.classList.add("selected");

            // If this card was selected in recruit list, deselect it there
            if (selectedRecruitCard === cardItem) {
              selectedRecruitCard = null;
              selectedRecruitCardImage = null;
              const recruitCardElement = selectionRow2.querySelector(
                `[data-card-id="${cardItem.card.id}"] img`,
              );
              if (recruitCardElement)
                recruitCardElement.classList.remove("selected");
            }
          }
        }

        // Update preview to show last selected card
        previewElement.innerHTML = "";
        const lastSelected = selectedAttackCard || selectedRecruitCard;
        if (lastSelected) {
          const previewImage = document.createElement("img");
          previewImage.src = lastSelected.card.image;
          previewImage.alt = lastSelected.card.name;
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

    // Populate row1 with Attack Heroes (Played Cards then Hand)
    if (attackPlayedCards.length > 0) {
      selectionRow1.appendChild(createSectionLabel("Played Cards"));
      attackPlayedCards.forEach((cardItem) => {
        createCardElement(cardItem, "attack", selectionRow1);
      });
    }
    if (attackHandCards.length > 0) {
      if (attackPlayedCards.length > 0) {
        selectionRow1.appendChild(createSectionLabel("Hand"));
      }
      attackHandCards.forEach((cardItem) => {
        createCardElement(cardItem, "attack", selectionRow1);
      });
    }

    // Populate row2 with Recruit Heroes (Played Cards then Hand)
    if (recruitPlayedCards.length > 0) {
      selectionRow2.appendChild(createSectionLabel("Played Cards"));
      recruitPlayedCards.forEach((cardItem) => {
        createCardElement(cardItem, "recruit", selectionRow2);
      });
    }
    if (recruitHandCards.length > 0) {
      if (recruitPlayedCards.length > 0) {
        selectionRow2.appendChild(createSectionLabel("Hand"));
      }
      recruitHandCards.forEach((cardItem) => {
        createCardElement(cardItem, "recruit", selectionRow2);
      });
    }

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

      const hasRecruit = recruitCards.length > 0;
      const hasAttack = attackCards.length > 0;
      const canConfirm =
        hasRecruit && hasAttack
          ? selectedRecruitCard && selectedAttackCard
          : selectedRecruitCard || selectedAttackCard;

      if (!canConfirm) return;

      setTimeout(() => {
        const koedCards = [];

        if (selectedRecruitCard) {
          koedCards.push(selectedRecruitCard.card);
          // Remove from original location using source tracking
          if (selectedRecruitCard.source === "hand") {
            const index = playerHand.findIndex(
              (c) => c.id === selectedRecruitCard.card.id,
            );
            if (index !== -1) {
              playerHand.splice(index, 1);
            }
          } else {
            selectedRecruitCard.card.markedToDestroy = true;
          }
          koPile.push(selectedRecruitCard.card);
          onscreenConsole.log(
            `<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'> Choice: <span class="console-highlights">${selectedRecruitCard.card.name}</span> has been KO'd.`,
          );
          koBonuses();
        }

        if (selectedAttackCard) {
          koedCards.push(selectedAttackCard.card);
          // Remove from original location using source tracking
          if (selectedAttackCard.source === "hand") {
            const index = playerHand.findIndex(
              (c) => c.id === selectedAttackCard.card.id,
            );
            if (index !== -1) {
              playerHand.splice(index, 1);
            }
          } else {
            selectedAttackCard.card.markedToDestroy = true;
          }
          koPile.push(selectedAttackCard.card);
          onscreenConsole.log(
            `<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> Choice: <span class="console-highlights">${selectedAttackCard.card.name}</span> has been KO'd.`,
          );
          koBonuses();
        }

        updateGameBoard();
        closeCardChoicePopup();
        resolve(koedCards.length > 0);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function lilithEscape() {
  onscreenConsole.log(
    `<span class="console-highlights">Lilith, Daughter of Dracula</span> has escaped!`,
  );
  await woundAvoidance();
  if (hasWoundAvoidance) {
    onscreenConsole.log(
      `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided gaining a Wound.`,
    );
    hasWoundAvoidance = false;
    return;
  }
  lilithWound();
}

function lilithWound() {
  if (victoryPile.filter((item) => item.name === "Dracula").length === 0) {
    onscreenConsole.log(
      `You do not have <span class="console-highlights">Dracula</span> in your Victory Pile.`,
    );
    drawWound();
  } else {
    onscreenConsole.log(
      `You have <span class="console-highlights">Dracula</span> in your Victory Pile and have escaped gaining a Wound.`,
    );
    return;
  }
}

async function blackheartAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Blackheart</span> may force you to gain a Wound!`,
  );
  await blackheartFunctions();
}

async function blackheartFight() {
  onscreenConsole.log(
    `<span class="console-highlights">Blackheart</span> - fight effect!`,
  );
  await blackheartFunctions();
}

async function blackheartEscape() {
  onscreenConsole.log(
    `<span class="console-highlights">Blackheart</span> has escaped!`,
  );
  await blackheartFunctions();
}

async function blackheartFunctions() {
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

  if (
    cardsYouHave.filter((item) => item.team === "Marvel Knights").length === 0
  ) {
    console.log("You are unable to reveal a Marvel Knights hero.");
    onscreenConsole.log(
      `You are unable to reveal a <img src='Visual Assets/Icons/Marvel Knights.svg' alt='Marvel Knights Icon' class='console-card-icons'> Hero.`,
    );
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          'DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?',
          "Reveal Hero",
          "Gain Wound",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "BLACKHEART";

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
            "url('Visual Assets/Villains/DarkCity_Underworld_Blackheart.webp')";
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
            `You are able to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero and have escaped gaining a Wound!`,
          );
          cleanup();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          cleanup();
        };
      }, 10);
    });
  }
}

// Ensure a global registry exists
window.captureRegistry = window.captureRegistry || {};

// Helper to make a robust unique code (avoids millisecond collisions)
function makeCaptureCode() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function draculaAmbush(draculaCard) {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Dracula</span> captures the top card of the Hero deck.`,
  );

  if (heroDeck.length === 0) {
    onscreenConsole.log(`The Hero deck is empty and no card is captured.`);
    return;
  }

const lastCard = heroDeck[heroDeck.length - 1];

// Check if the card exists and has the expected properties
if (!lastCard) {
  onscreenConsole.log("The last card in the Hero deck is undefined.");
  return;
}

if (lastCard.type !== "Hero") {
  onscreenConsole.log(`<span class="console-highlights">${lastCard.name || 'Unknown card'}</span> is not a Hero and cannot be captured.`);
  if (lastCard) {
    lastCard.revealed = true;
  }
  return;
}

  const hero = heroDeck.pop();
  const draculaIndex = city.findIndex((c) => c === draculaCard);

  if (draculaIndex === -1) {
    onscreenConsole.log(
      'Cannot locate <span class="console-highlights">Dracula</span> in the city.',
    );
    return;
  }

  const dracula = city[draculaIndex];

  // Unique, per-capture identifier
  const captureCode = makeCaptureCode();

  // Attach to both
  dracula.captureCode = captureCode;
  hero.captureCode = captureCode;

  // Key by the ACTUAL persistent Dracula instance if available
  if (dracula.persistentId != null) {
    window.captureRegistry[dracula.persistentId] = captureCode;
  }

  console.log("CAPTURING - Dracula code:", captureCode, "Hero:", hero.name);

  // Track attack change (preserve original only once)
  if (typeof dracula.originalAttack !== "number") {
    dracula.originalAttack = dracula.attack;
  }
  dracula.heroAttack = hero.cost;  

  // Store hero in captured pile with code
  capturedCardsDeck.push({ ...hero, captured: captureCode });

  // Overlay (keep your classnames/styles)
  dracula.capturedOverlayText = `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">CAPTURED</span><img src="${hero.image}" alt="${hero.name}" class="captured-hero-image-overlay">`;

  onscreenConsole.log(
    `<span class="console-highlights">Dracula</span> has captured <span class="console-highlights">${hero.name}</span>. This Villain now has ${dracula.attack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Fight this Villain to gain the captured Hero.`,
  );

  updateGameBoard();
}

function draculaFight(villainLike) {
  // DO NOT re-find Dracula in city; city slot has already been cleared.
  const code = villainLike?.captureCode;

  console.log("DEBUG - Dracula fight (by code only):", {
    name: villainLike?.name,
    code,
  });

  if (!code) {
    onscreenConsole.log(`Error. Dracula has no captured hero.`);
    return;
  }

  const heroIndex = capturedCardsDeck.findIndex((h) => h.captured === code);
  if (heroIndex === -1) {
    onscreenConsole.log(`Error. Dracula has no captured hero.`);
    return;
  }

  const hero = capturedCardsDeck.splice(heroIndex, 1)[0];
  if (!hero) {
    onscreenConsole.log("Error. Captured Hero not found.");
    return;
  }

  delete hero.captured;
  playerDiscardPile.push(hero);

  onscreenConsole.log(
    `<span class="console-highlights">${hero.name}</span> has been rescued from <span class="console-highlights">Dracula</span> and added to your discard pile.`,
  );

  // Dracula is already removed from city, so no overlay/attack to clear here.
  updateGameBoard();
}

function draculaEscape(escapedVillain) {
  const actualVillain = findActualVillainInstance(escapedVillain);
  if (!actualVillain) {
    onscreenConsole.log(`Error. Dracula not found.`);
    return;
  }

  // Resolve the code like in fight()
  const registryCode =
    actualVillain.persistentId != null
      ? window.captureRegistry[actualVillain.persistentId]
      : undefined;
  const captureCode = registryCode || actualVillain.captureCode;

  onscreenConsole.log(
    `<span class="console-highlights">Dracula</span> has escaped with his captured Hero!`,
  );

  const heroIndex = capturedCardsDeck.findIndex(
    (hero) => hero.captured === captureCode,
  );

  // Clean overlays/attack on the actual instance
  actualVillain.capturedOverlayText = "";
  actualVillain.attack = actualVillain.originalAttack || 0;
  actualVillain.attackFromOwnEffects = 0;
  delete actualVillain.captureCode;
  delete actualVillain.heroAttack;

  if (heroIndex === -1) {
    console.error("Escape Failed - Villain:", {
      name: actualVillain?.name,
      id: actualVillain?.persistentId,
      code: captureCode,
    });
    onscreenConsole.log("Error. No hero was captured by this Dracula.");
    if (
      actualVillain.persistentId != null &&
      window.captureRegistry[actualVillain.persistentId]
    ) {
      delete window.captureRegistry[actualVillain.persistentId];
    }
    updateGameBoard();
    return;
  }

  const hero = capturedCardsDeck.splice(heroIndex, 1)[0];
  if (!hero) {
    onscreenConsole.log("Error. Hero data corrupted during escape.");
    updateGameBoard();
    return;
  }

  delete hero.captured;
  escapedVillainsDeck.push(hero);

  if (
    actualVillain.persistentId != null &&
    window.captureRegistry[actualVillain.persistentId]
  ) {
    delete window.captureRegistry[actualVillain.persistentId];
  }

  updateGameBoard();
}

function findActualVillainInstance(candidate) {
  // Try to find the actual in-city instance. Guard nulls!
  const match = city.find(
    (c) =>
      c &&
      ((candidate.captureCode && c.captureCode === candidate.captureCode) ||
        (candidate.persistentId && c.persistentId === candidate.persistentId) ||
        (candidate.id != null && c.id === candidate.id) ||
        c.name === candidate.name),
  );
  return match || candidate; // fall back to the passed-in copy
}

function azazelFight() {
  onscreenConsole.log(
    `<span class="console-highlights">Azazel</span> - fight effect!`,
  );

  // SORT FIRST - before any card processing
  genericCardSort(playerHand);

  return new Promise((resolve) => {
    // Check if there are any cards to select
    if (playerHand.length === 0) {
      onscreenConsole.log("No cards in Hand to gain Teleport.");
      resolve(false);
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
    titleElement.textContent = "Azazel";
    instructionsElement.innerHTML = "Select a card to gain Teleport this turn.";

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

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card in hand (already sorted)
    playerHand.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-card-index", String(index));

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
        instructionsElement.innerHTML =
          "Select a card to gain Teleport this turn.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will gain Teleport this turn.`;
      }
    }

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
      closeCardChoicePopup();
      if (!selectedCard) return;

      setTimeout(() => {
        if (!selectedCard.keywords) {
          selectedCard.keywords = [];
        }

        // Check if the card already has Teleport naturally
        const alreadyHasTeleport = selectedCard.keywords.includes("Teleport");

        if (!alreadyHasTeleport) {
          // Only add Teleport and mark as temporary if it doesn't already have it
          selectedCard.keywords.push("Teleport");
          selectedCard.temporaryTeleport = true;
        }

        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> has gained Teleport for this turn.`,
        );

        updateGameBoard();
        resolve(true);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

// Dark City Mastermind Abilities

async function apocalypseStrike() {
  const cardsAboveOneCost = [...playerHand.filter((card) => card.cost > 0)];
  if (cardsAboveOneCost.length === 0) {
    onscreenConsole.log(`No cards need to be returned to your deck.`);
    return;
  }

  for (const card of cardsAboveOneCost) {
    const index = playerHand.indexOf(card);
    if (index > -1) {
      playerHand.splice(index, 1);
      playerDeck.push(card);
      onscreenConsole.log(
        `<span class="console-highlights">${card.name}</span> costs more than 1 and has been returned to the top of your deck.`,
      );
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(card);
      }
    }
  }
}

async function kingpinStrike() {
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  const hasMarvelKnights = cardsYouHave.some(
    (card) => card.team === "Marvel Knights",
  );

  if (!hasMarvelKnights) {
    console.log("You are unable to reveal a Marvel Knights hero.");
    onscreenConsole.log(
      `You are unable to reveal a <img src='Visual Assets/Icons/Marvel Knights.svg' alt='Marvel Knights Icon' class='console-card-icons'> Hero.`,
    );

    // --- Snapshot & clear hand up front ---
    const handSnapshot = [...playerHand];
    playerHand.length = 0;

    // Process all discards over the snapshot
    const returnedCards = [];
    for (const card of handSnapshot) {
      const { returned } = await checkDiscardForInvulnerability(card); // immediate triggers
      if (returned?.length) returnedCards.push(...returned);
    }

    // Return any invulnerable cards to hand
    if (returnedCards.length) playerHand.push(...returnedCards);

    // Kingpin effect: draw 5 AFTER all discard triggers have fully resolved
    for (let i = 0; i < 5; i++) {
      await extraDraw();
    }

    hideRevealedCards();
    updateGameBoard();
    return;
  }

  // Reveal flow
  return new Promise((resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> HERO TO AVOID DISCARDING?`,
        "Reveal Hero",
        "Discard",
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
          "url('Visual Assets/Masterminds/DarkCity_Kingpin.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      const cleanup = () => {
        closeInfoChoicePopup();
        updateGameBoard();
        resolve();
      };

      confirmButton.onclick = async () => {
        onscreenConsole.log(
          `You revealed a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero and escaped discarding your hand!`,
        );
        cleanup();
      };

      denyButton.onclick = async () => {
        onscreenConsole.log(
          `You chose not to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero.`,
        );

        // --- Snapshot & clear hand up front ---
        const handSnapshot = [...playerHand];
        playerHand.length = 0;

        // Process all discards over the snapshot
        const returnedCards = [];
        for (const card of handSnapshot) {
          const { returned } = await checkDiscardForInvulnerability(card); // immediate triggers
          if (returned?.length) returnedCards.push(...returned);
        }

        // Return any invulnerable cards to hand
        if (returnedCards.length) playerHand.push(...returnedCards);

        // Kingpin effect: draw 5 AFTER all discard triggers have fully resolved
        for (let i = 0; i < 5; i++) {
          await extraDraw();
        }

        hideRevealedCards();
        cleanup();
      };
    }, 10);
  });
}

async function mephistoStrike() {
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

  const hasMarvelKnights =
    cardsYouHave.filter((item) => item.team === "Marvel Knights").length > 0;

  if (!hasMarvelKnights) {
    console.log("You are unable to reveal a Marvel Knights hero.");
    onscreenConsole.log(
      `You are unable to reveal a <img src='Visual Assets/Icons/Marvel Knights.svg' alt='Marvel Knights Icon' class='console-card-icons'> Hero.`,
    );
    drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          `DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?`,
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
            "url('Visual Assets/Masterminds/DarkCity_Mephisto.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You are able to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero and have escaped gaining a Wound!`,
          );
          closeInfoChoicePopup();
          resolve();
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Marvel Knights.svg" alt="Marvel Knights Icon" class="console-card-icons"> Hero.`,
          );
          drawWound();
          closeInfoChoicePopup();
          resolve();
        };
      }, 10); // 10ms delay
    });
  }
}

async function mrSinisterStrike() {
  // 1. Take top card from bystander deck and attach to mastermind
  const bystanderCard = bystanderDeck.pop();
  if (bystanderCard) {
    attachBystanderToMastermind(bystanderCard);
  } else {
    onscreenConsole.log("No Bystanders left to capture!");
  }

  // 2. Check if player has exactly 6 cards
  if (playerHand.length !== 6) {
    onscreenConsole.log(
      `You do not have 6 cards. <span class="console-highlights">Mr. Sinister</span><span class="bold-spans">'s</span> Master Strike ends here.`,
    );
    return;
  }

  // 3. Check for Covert cards
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => !card.isCopied && !card.sidekickToDestroy,
    ),
  ];

  const hasCovert = cardsYouHave.some(
    (card) => card.classes && card.classes.includes("Covert"),
  );

  if (hasCovert) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          `DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> HERO TO AVOID DISCARDING?`,
          "Reveal Hero",
          "Don't Reveal",
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
            "url('Visual Assets/Masterminds/DarkCity_MrSinister.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You revealed a <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero. <span class="console-highlights">Mr. Sinister</span><span class="bold-spans">'s</span> Master Strike ends here.`,
          );
          closeInfoChoicePopup();
          resolve();
        };

        denyButton.onclick = async () => {
          closeInfoChoicePopup();
          onscreenConsole.log(
            `You chose not to reveal a <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero.`,
          );
          await mrSinisterProcessDiscardPhase();
          resolve();
        };
      }, 10);
    });
  } else {
    // No Covert cards - proceed to discard phase
    onscreenConsole.log(
      `You are unable to reveal a <img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero.`,
    );
    await mrSinisterProcessDiscardPhase();
  }
}

async function mrSinisterProcessDiscardPhase() {
  updateGameBoard();

  const mastermind = getSelectedMastermind();
  const bystanderCount = mastermind.bystanders.length;

  // Sort display order first
  genericCardSort(playerHand);

  const cardsToDiscard = Math.min(bystanderCount, playerHand.length);
  if (cardsToDiscard === 0) {
    onscreenConsole.log(
      `<span class="console-highlights">Mr. Sinister</span> has no captured Bystanders; you discard nothing.`,
    );
    return;
  }

  // ===== Case A: Discard all or only 1 card -> snapshot & clear to avoid re-discarding fresh draws =====
  if (cardsToDiscard === playerHand.length || playerHand.length === 1) {
    onscreenConsole.log(
      `<span class="console-highlights">Mr. Sinister</span> has ${bystanderCount} captured Bystander${bystanderCount !== 1 ? "s" : ""} forcing you to discard ${cardsToDiscard} card${cardsToDiscard !== 1 ? "s" : ""}.`,
    );

    const handSnapshot = [...playerHand]; // exact refs
    playerHand.length = 0; // clear hand up front

    // Discard exactly the snapshot (all, or the single card)
    const toDiscard = handSnapshot.slice(0, cardsToDiscard);
    const { returned } = await checkDiscardForInvulnerability(toDiscard);
    if (returned?.length) playerHand.push(...returned);

    updateGameBoard();
    return;
  }

  // ===== Case B: Player must choose some (but not all) =====
  return new Promise(async (resolve) => {
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
    instructionsElement.innerHTML = `<span class="console-highlights">Mr. Sinister</span> has ${bystanderCount} captured Bystander${bystanderCount !== 1 ? "s" : ""}. Select ${cardsToDiscard} card${cardsToDiscard !== 1 ? "s" : ""} to discard.`;

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

    // Build selectable entries that keep exact references + stable unique ids
    const selectables = playerHand.map((ref, idx) => ({
      ref,
      uid: `${ref.id}-${idx}`,
    }));

    let selected = []; // array of entries {ref, uid}
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions and button state
    function updateUI() {
      if (selected.length < cardsToDiscard) {
        instructionsElement.innerHTML = `Select ${cardsToDiscard - selected.length} more card${selected.length === cardsToDiscard - 1 ? "" : "s"} to discard.`;
      } else {
        const names = selected
          .map((e) => `<span class="console-highlights">${e.ref.name}</span>`)
          .join(", ");
        instructionsElement.innerHTML = `Selected: ${names} will be discarded.`;
      }

      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selected.length !== cardsToDiscard;

      if (selected.length === cardsToDiscard) {
        confirmButton.textContent = `DISCARD ${cardsToDiscard} CARDS`;
      } else {
        confirmButton.textContent = `SELECT ${cardsToDiscard - selected.length} MORE`;
      }
    }

    // Render list (sorted for display, but keep refs intact)
    const display = selectables.map((x) => ({ ...x.ref, uid: x.uid }));
    genericCardSort(display);
    const cardElementByUid = new Map();

    // Create card elements for each card in hand
    display.forEach((entryLikeCard) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-uid", entryLikeCard.uid);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = entryLikeCard.image;
      cardImage.alt = entryLikeCard.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      const isSelected = selected.some((s) => s.uid === entryLikeCard.uid);
      if (isSelected) {
        cardImage.classList.add("selected");
      }

      // Find the real entry with this uid (to keep the exact ref)
      const realEntry = selectables.find((s) => s.uid === entryLikeCard.uid);

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = realEntry.ref.image;
        previewImage.alt = realEntry.ref.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if we haven't reached the discard limit
        if (selected.length < cardsToDiscard) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if we haven't reached the discard limit AND we're not hovering over another card
        if (selected.length < cardsToDiscard) {
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

        const index = selected.findIndex((s) => s.uid === realEntry.uid);
        if (index > -1) {
          // Deselect
          selected.splice(index, 1);
          cardImage.classList.remove("selected");
        } else {
          if (selected.length >= cardsToDiscard) {
            // FIFO logic: remove the first selected card (oldest)
            const firstSelected = selected.shift();

            // Update the visual state of the first selected card
            const firstSelectedElement = cardElementByUid.get(
              firstSelected.uid,
            );
            if (firstSelectedElement) {
              const firstSelectedImage =
                firstSelectedElement.querySelector("img");
              if (firstSelectedImage) {
                firstSelectedImage.classList.remove("selected");
              }
            }
          }

          // Select new card
          selected.push(realEntry);
          cardImage.classList.add("selected");
        }

        // Update preview to show last selected card, or clear if none selected
        previewElement.innerHTML = "";
        if (selected.length > 0) {
          const lastSelected = selected[selected.length - 1];
          const previewImage = document.createElement("img");
          previewImage.src = lastSelected.ref.image;
          previewImage.alt = lastSelected.ref.name;
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
      cardElementByUid.set(entryLikeCard.uid, cardElement);
    });

    if (display.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (display.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (display.length > 5) {
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
      if (selected.length !== cardsToDiscard) return;
      closeCardChoicePopup();
      setTimeout(async () => {
        confirmButton.disabled = true;

        // Remove the chosen refs from hand up front (by reference)
        const toDiscard = selected.map((s) => s.ref);
        for (const ref of toDiscard) {
          const idx = playerHand.indexOf(ref);
          if (idx !== -1) playerHand.splice(idx, 1);
        }

        // Run discard triggers; add any "returned" back to hand
        const { returned } = await checkDiscardForInvulnerability(toDiscard);
        if (returned?.length) playerHand.push(...returned);

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

async function stryfeStrike() {
  mastermindPermBuff += 1;
  updateMastermindOverlay();

  // 2. Handle player choice (reveal X-Force or discard random)
  await handleStryfePlayerChoice();

  async function handleStryfePlayerChoice() {
    // Check for X-Force heroes in hand or played cards this turn
    const xForceHeroes = [
      ...playerHand,
      ...cardsPlayedThisTurn.filter(
        (card) => !card.isCopied && !card.sidekickToDestroy,
      ),
    ].filter((card) => card.team === "X-Force");

    if (xForceHeroes.length > 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            `DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/X-Force.svg" class="console-card-icons"> HERO TO AVOID RANDOMLY DISCARDING?`,
            "Reveal Hero",
            "Discard",
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
              "url('Visual Assets/Masterminds/DarkCity_Stryfe.webp')";
            previewArea.style.backgroundSize = "contain";
            previewArea.style.backgroundRepeat = "no-repeat";
            previewArea.style.backgroundPosition = "center";
            previewArea.style.display = "block";
          }

          confirmButton.onclick = () => {
            const randomXForce =
              xForceHeroes[Math.floor(Math.random() * xForceHeroes.length)];
            onscreenConsole.log(
              `You revealed <span class="console-highlights">${randomXForce.name}</span> as an <img src="Visual Assets/Icons/X-Force.svg" class="console-card-icons"> Hero.`,
            );
            closeInfoChoicePopup();
            resolve();
          };

          denyButton.onclick = async () => {
            closeInfoChoicePopup();
            if (playerHand.length > 0) {
              const randomCard = playerHand.splice(
                Math.floor(Math.random() * playerHand.length),
                1,
              )[0];
              onscreenConsole.log(
                `<span class="console-highlights">${randomCard.name}</span> was chosen at random to be discarded.`,
              );

              const { returned } =
                await checkDiscardForInvulnerability(randomCard);
              if (returned.length) {
                playerHand.push(...returned);
              }

              updateGameBoard();
            } else {
              onscreenConsole.log("No cards to discard!");
            }

            resolve();
          };
        }, 10);
      });
    } else {
      // Auto discard if no X-Force
      if (playerHand.length > 0) {
        const randomCard = playerHand.splice(
          Math.floor(Math.random() * playerHand.length),
          1,
        )[0];
        onscreenConsole.log(
          `No <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Heroes - <span class="console-highlights">${randomCard.name}</span> was chosen at random to be discarded.`,
        );

        const { returned } = await checkDiscardForInvulnerability(randomCard);
        if (returned.length) {
          playerHand.push(...returned);
        }

        updateGameBoard();
      } else {
        onscreenConsole.log(
          `No <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Heroes to reveal and no cards to discard.`,
        );
      }
    }
  }
}

async function apocalypseImmortalAndUndefeated() {
  const mastermind = getSelectedMastermind();

  if (mastermind.tactics.length !== 0) {
    onscreenConsole.log(`This is not the final Tactic.`);

    // Rescue six Bystanders
    for (let i = 0; i < 6; i++) {
      await rescueBystander();
    }

    // Find and shuffle this Tactic back into mastermind.tactics
    const tacticIndex = victoryPile.findIndex(
      (tactic) => tactic.name === "Immortal and Undefeated",
    );
    if (tacticIndex !== -1) {
      const [tactic] = victoryPile.splice(tacticIndex, 1);

      // Insert at random position in mastermind.tactics

      const randomPos = Math.floor(Math.random() * mastermind.tactics.length);

      mastermind.tactics.splice(randomPos, 0, tactic);

      onscreenConsole.log(
        `Shuffled <span class="console-highlights">Immortal and Undefeated</span> back into Mastermind Tactics.`,
      );
    } else {
      onscreenConsole.log(
        `Could not find <span class="console-highlights">Immortal and Undefeated</span> in your Victory Pile.`,
      );
    }
  } else {
    onscreenConsole.log(`This is the final Tactic - no effect.`);
  }
}

async function kingpinCriminalEmpire() {
  try {
    const mastermind = getSelectedMastermind();

    if (mastermind.tactics.length !== 0) {
      onscreenConsole.log(`This is not the final Tactic.`);

      // Get top 3 cards from villain deck
      const revealedCards = [];
      for (let i = 0; i < 3 && villainDeck.length > 0; i++) {
        revealedCards.push(villainDeck.pop());
      }

      // Log revealed cards
      if (revealedCards.length > 0) {
        const cardNames = revealedCards
          .map((card) => `<span class="console-highlights">${card.name}</span>`)
          .join(", ");
        onscreenConsole.log(
          `You revealed the top ${revealedCards.length} card${revealedCards.length !== 1 ? "s" : ""} of the Villain deck: ${cardNames}.`,
        );
      } else {
        onscreenConsole.log("No cards left in Villain deck to reveal!");
        updateGameBoard();
        return; // This should return a resolved promise
      }

      // Separate villains from non-villains
      const villains = revealedCards.filter((card) => card.type === "Villain");
      const nonVillains = revealedCards.filter(
        (card) => card.type !== "Villain",
      );

      // Handle different cases
      if (villains.length === 3) {
        villainDeck.push(...revealedCards.reverse());
        onscreenConsole.log(`Three Villains revealed. Playing them now.`);
        for (let i = 0; i < 3; i++) {
          await drawVillainCard();
          await new Promise((resolve) => setTimeout(resolve, 100)); // Ensure UI updates
        }
      } else if (villains.length === 2) {
        villainDeck.push(...villains.reverse());
        onscreenConsole.log(`Two Villains revealed. Playing them now.`);
        for (let i = 0; i < 2; i++) {
          await drawVillainCard();
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (nonVillains.length > 0) {
          villainDeck.push(nonVillains[0]);
          nonVillains[0].revealed = true;
        }
      } else if (villains.length === 1) {
        villainDeck.push(villains[0]);
        onscreenConsole.log(
          `One Villain revealed. It will be played now. The other revealed cards will be shuffled and returned to the top of the Villain deck.`,
        );
        await drawVillainCard();
        shuffleArray(nonVillains);
        villainDeck.push(...nonVillains);
      } else {
        shuffleArray(revealedCards);
        villainDeck.push(...revealedCards);
        onscreenConsole.log(
          `No Villains were revealed. The revealed cards have been shuffled and returned to the top of the Villain deck.`,
        );
      }

      updateGameBoard();
    } else {
      onscreenConsole.log(`This is the final Tactic. No effect.`);
    }
  } catch (error) {
    console.error("Error in kingpinCriminalEmpire:", error);
    onscreenConsole.log(`Error processing Kingpin effect: ${error.message}`);
  }

  // Ensure we return a resolved promise if we reach the end
  return Promise.resolve();
}

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function mephistoPainBegetsPain() {
  onscreenConsole.log(
    `In Solo play, you are the player to your right. No action required.`,
  );
}

function stryfeSwiftVengeance() {
  if (woundDeck.length === 0) {
    onscreenConsole.log(`No Wounds available to become a Master Strike.`);
    return;
  }

  const topWound = woundDeck.pop();
  topWound.name = "Master Strike";
  topWound.type = "Master Strike";

  onscreenConsole.log(
    `A Wound from the Wound Stack is becoming a Master Strike to take effect immediately.`,
  );
  villainDeck.push(topWound);
  drawVillainCard();
}

function mephistoThePriceOfFailure() {
  if (victoryPile.filter((card) => card.type === "Mastermind").length > 1) {
    onscreenConsole.log(
      `You have a Mastermind Tactic in your Victory Pile. No Wound gained.`,
    );
  } else {
    onscreenConsole.log(
      `In Solo Play, "each other player" refers to you and you just gained <span class="console-highlights">The Price of Failure</span> to your Victory Pile. No Wound gained.`,
    );
  }
}

async function apocalypseTheEndOfAllThings() {
  // Edge Case 1: Completely empty deck and discard
  if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
    onscreenConsole.log(
      "Your deck and discard pile are empty - no cards to reveal.",
    );
    return;
  }

  // Edge Case 2: Need to reshuffle discard into deck
  if (playerDeck.length < 3) {
    updateDeck = shuffleArray([...playerDiscardPile]);
    playerDiscardPile = [];
    playerDeck = [...playerDeck, ...updateDeck];
  }

  const cardsToProcess = Math.min(3, playerDeck.length);
  const revealedCards = playerDeck.splice(-cardsToProcess);

  // Log revealed cards
  const cardNames = revealedCards
    .map((card) => `<span class="console-highlights">${card.name}</span>`)
    .join(", ");
  onscreenConsole.log(`You revealed ${cardNames || "no cards"}.`);

  // Process cards
  const cardsToKO = [];
  const cardsToReturn = [];

  for (const card of revealedCards) {
    if (card.cost >= 1) {
      cardsToKO.push(card);
      onscreenConsole.log(
        `<span class="console-highlights">${card.name}</span> cost ${card.cost} <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> and has been KO'd.`,
      );
      koBonuses();
    } else {
      cardsToReturn.push(card);
    }
  }

  // KO eligible cards
  if (cardsToKO.length > 0) {
    koPile.push(...cardsToKO);
    updateGameBoard();
  } else if (revealedCards.length > 0) {
    onscreenConsole.log(
      `No revealed cards were KO'd as they all cost less than 1 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">.`,
    );
  }

  // Return remaining cards to deck with player choice of order
  if (cardsToReturn.length === 0) {
    return;
  }

  if (cardsToReturn.length === 1) {
    // Only one card to return - just put it back
    playerDeck.push(cardsToReturn[0]);
    onscreenConsole.log(
      `<span class="console-highlights">${cardsToReturn[0].name}</span> returned to top of deck.`,
    );
    cardsToReturn[0].revealed = true;
    updateGameBoard();
    if (stingOfTheSpider) {
      await scarletSpiderStingOfTheSpiderDrawChoice(cardsToReturn[0]);
    }

    return;
  }

  // Multiple cards to return - let player choose order
  await handleCardReturnOrder(cardsToReturn);
  updateGameBoard();
}

async function kingpinCallAHit() {
  updateGameBoard();

  // First check if discard pile is empty
  if (playerDiscardPile.length === 0) {
    onscreenConsole.log(`Your discard pile is empty - no Heroes to KO!`);
    return;
  }

  // Filter for only Heroes in discard
  const heroesInDiscard = playerDiscardPile.filter(
    (card) => card.type === "Hero",
  );

  // Check if no heroes in discard
  if (heroesInDiscard.length === 0) {
    onscreenConsole.log(`No Heroes in your discard pile to KO.`);
    return;
  }

  // If only 1 Hero in discard, auto-KO it
  if (heroesInDiscard.length === 1) {
    const cardIndex = playerDiscardPile.findIndex(
      (c) => c.id === heroesInDiscard[0].id,
    );
    const [card] = playerDiscardPile.splice(cardIndex, 1);
    koPile.push(card);
    onscreenConsole.log(
      `You only have one Hero in your discard pile. <span class="console-highlights">${card.name}</span> has been automatically KO'd.`,
    );

    koBonuses();

    updateGameBoard();
    return;
  }

  // Setup UI for selection when multiple Heroes available
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
    titleElement.textContent = "TACTIC!";
    instructionsElement.innerHTML = "Select a Hero from your discard to KO.";

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

    // Create a copy for sorting without affecting the original array
    const sortedHeroesInDiscard = [...heroesInDiscard];
    genericCardSort(sortedHeroesInDiscard);

    let selectedCard = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card name
    function updateInstructions() {
      if (selectedCard === null) {
        instructionsElement.innerHTML =
          "Select a Hero from your discard to KO.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;
    }

    // Create card elements for each hero in discard
    sortedHeroesInDiscard.forEach((card) => {
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

    if (sortedHeroesInDiscard.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedHeroesInDiscard.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedHeroesInDiscard.length > 5) {
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
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {
        // Find the card in the original playerDiscardPile by ID
        const cardIndex = playerDiscardPile.findIndex(
          (c) => c.id === selectedCard.id,
        );
        if (cardIndex !== -1) {
          const [card] = playerDiscardPile.splice(cardIndex, 1);
          koPile.push(card);
          onscreenConsole.log(
            `<span class="console-highlights">${card.name}</span> has been KO'd from your discard.`,
          );

          koBonuses();
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

async function stryfeTideOfRetribution() {
  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  const hasXForce =
    cardsYouHave.filter((item) => item.team === "X-Force").length > 0;

  if (!hasXForce) {
    onscreenConsole.log(
      `You are unable to reveal a <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero.`,
    );
    await drawWound();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          `DO YOU WISH TO REVEAL AN <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> HERO TO AVOID GAINING A WOUND?`,
          "Reveal Hero",
          "Gain Wound",
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
            "url('Visual Assets/Masterminds/DarkCity_Stryfe_TideOfRetribution.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You are able to reveal a <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero and have escaped gaining a Wound!`,
          );
          closeInfoChoicePopup();
          resolve();
        };

        denyButton.onclick = async () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/X-Force.svg" alt="X-Force Icon" class="console-card-icons"> Hero.`,
          );
          await drawWound();
          closeInfoChoicePopup();
          resolve();
        };
      }, 10); // 10ms delay
    });
  }
}

async function stryfeFuriousWrath() {
  // Get top 6 cards from villain deck
  const revealedCards = [];
  for (let i = 0; i < 6 && villainDeck.length > 0; i++) {
    revealedCards.push(villainDeck.pop());
  }

  // Log revealed cards
  if (revealedCards.length > 0) {
    const cardNames = revealedCards
      .map((card) => `<span class="console-highlights">${card.name}</span>`)
      .join(", ");
    onscreenConsole.log(
      `You revealed the top ${revealedCards.length} card${revealedCards.length !== 1 ? "s" : ""} of the Villain deck: ${cardNames}.`,
    );
  } else {
    onscreenConsole.log("No cards left in Villain deck to reveal!");
    return;
  }

  // Separate Master Strikes from other cards
  const masterStrikes = revealedCards.filter(
    (card) => card.type === "Master Strike",
  );
  const otherCards = revealedCards.filter(
    (card) => card.type !== "Master Strike",
  );

  // Put Master Strikes back on top of deck (in original order)
  if (masterStrikes.length > 0) {
    villainDeck.push(...masterStrikes.reverse()); // Reverse to maintain original order
    onscreenConsole.log(
      `${masterStrikes.length} Master Strike${masterStrikes.length !== 1 ? "s" : ""} revealed. Playing now.`,
    );

    // Play each Master Strike
    for (let i = 0; i < masterStrikes.length; i++) {
      await drawVillainCard();
    }
  } else {
    onscreenConsole.log("No Master Strikes were revealed.");
  }

  if (otherCards.length === 1) {
    otherCards[0].revealed = true;
  }

  // Shuffle other cards and put them back on top of the deck
  if (otherCards.length > 0) {
    shuffleArray(otherCards);
    villainDeck.push(...otherCards);
    onscreenConsole.log(
      `The remaining revealed cards have been shuffled and returned to the top of the Villain deck.`,
    );
  }

  updateGameBoard();
}

async function mrSinisterMasterGeneticist() {
  // Get top 7 cards from villain deck
  const revealedCards = [];
  for (let i = 0; i < 7 && villainDeck.length > 0; i++) {
    revealedCards.push(villainDeck.pop());
  }

  // Log revealed cards
  if (revealedCards.length > 0) {
    const cardNames = revealedCards
      .map((card) => `<span class="console-highlights">${card.name}</span>`)
      .join(", ");
    onscreenConsole.log(
      `Revealed top ${revealedCards.length} card${revealedCards.length !== 1 ? "s" : ""} of the Villain deck: ${cardNames}.`,
    );
  } else {
    onscreenConsole.log("Villain deck is empty!");
    return;
  }

  // Separate Bystanders from other cards
  const bystanders = revealedCards.filter((card) => card.type === "Bystander");
  const otherCards = revealedCards.filter((card) => card.type !== "Bystander");

  // Attach each Bystander to Mastermind
  if (bystanders.length > 0) {
    onscreenConsole.log(
      `Found ${bystanders.length} Bystander${bystanders.length !== 1 ? "s" : ""}! <span class="console-highlights">Mr. Sinister</span> captures them!`,
    );
    for (const bystander of bystanders) {
      attachBystanderToMastermind(bystander);
    }
  } else {
    onscreenConsole.log(
      `No Bystanders were revealed for <span class="console-highlights">Mr. Sinister</span> to capture.`,
    );
  }

  if (otherCards.length === 1) {
    otherCards[0].revealed = true;
  }

  // Shuffle remaining cards and return to top of deck
  if (otherCards.length > 0) {
    shuffleArray(otherCards);
    villainDeck.push(...otherCards);
    onscreenConsole.log(
      `${otherCards.length !== 1 ? "Shuffled" : "Placed"} the ${otherCards.length} other card${otherCards.length !== 1 ? "s" : ""} back on top of the Villain deck.`,
    );
  }

  updateGameBoard();
}

async function stryfePsychicTorment() {
  updateGameBoard();
  return new Promise(async (resolve) => {
    // 1) Quick availability check
    const totalAvailableCards = playerDeck.length + playerDiscardPile.length;
    if (totalAvailableCards === 0) {
      onscreenConsole.log("No cards available to reveal.");
      resolve(false);
      return;
    }

    // 2) Draw up to 5, shuffling discard if needed
    function drawCards(num) {
      const drawn = [];
      for (let i = 0; i < num; i++) {
        if (playerDeck.length === 0) {
          if (playerDiscardPile.length > 0) {
            playerDeck = shuffle(playerDiscardPile);
            playerDiscardPile = [];
          } else {
            break;
          }
        }
        drawn.push(playerDeck.pop()); // pop = top-of-deck
      }
      return drawn;
    }

    // Keep exact references to revealed cards
    const revealed = drawCards(5).map((ref, i) => ({
      ref,
      uid: `${Date.now()}-${i}`,
    }));
    if (revealed.length === 0) {
      onscreenConsole.log("Unable to reveal any cards.");
      resolve(false);
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
    titleElement.textContent = "CHOOSE A CARD!";
    instructionsElement.innerHTML = `Select 1 of the ${revealed.length} revealed cards to add to your hand. The rest will be discarded.`;

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

    let selected = null; // { ref, uid }
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card name
    function updateInstructions() {
      if (!selected) {
        instructionsElement.innerHTML = `Select 1 of the ${revealed.length} revealed cards to add to your hand. The rest will be discarded.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selected.ref.name}</span> will be added to your hand.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = !selected;
    }

    // Display list (sorted for UI only)
    const display = [...revealed]; // shallow copy
    // Sort by your existing sorter; it expects plain cards, so map temporarily
    const displayForSort = display.map((x) => x.ref);
    genericCardSort(displayForSort);
    // Re-stitch the sorted refs back to their uid entries
    const sorted = displayForSort.map((ref) =>
      display.find((x) => x.ref === ref),
    );

    // Create card elements for each revealed card
    sorted.forEach((entry) => {
      const card = entry.ref;
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", entry.uid);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Check if this card is currently selected
      if (selected && selected.uid === entry.uid) {
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

        // Clear previous selection
        if (selected) {
          const prevSelectedElement = document.querySelector(
            `[data-card-id="${selected.uid}"] img`,
          );
          if (prevSelectedElement) {
            prevSelectedElement.classList.remove("selected");
          }
        }

        if (selected && selected.uid === entry.uid) {
          // Deselect if same card clicked
          selected = null;
          cardImage.classList.remove("selected");
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Select new card
          selected = entry;
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

    if (sorted.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sorted.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sorted.length > 5) {
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
    confirmButton.textContent = "KEEP SELECTED CARD";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selected) return;
      closeCardChoicePopup();
      setTimeout(async () => {
        confirmButton.disabled = true;

        // Add chosen card to hand
        playSFX("card-draw");
        playerHand.push(selected.ref);
        onscreenConsole.log(
          `<span class="console-highlights">${selected.ref.name}</span> added to hand.`,
        );

        // Compute the "rest"
        const rest = revealed
          .filter((x) => x.uid !== selected.uid)
          .map((x) => x.ref);

        // Optional pre-check: some effects flip a flag before we discard
        await discardAvoidance();

        if (hasDiscardAvoidance) {
          // Avoid discarding: put the rest back on top in original order.
          // Because we popped (top) into revealed[0], to preserve order we push BACKWARDS.
          for (let i = rest.length - 1; i >= 0; i--) {
            playerDeck.push(rest[i]);
          }
          onscreenConsole.log(
            `You have revealed <span class="console-highlights">Iceman - Impenetrable Ice Wall</span> and avoided discarding.`,
          );
          hasDiscardAvoidance = false;

          updateGameBoard();
          resolve(true);
          return;
        }

        // Discard the rest with normal on-discard triggers
        const { returned } = await checkDiscardForInvulnerability(rest);
        if (returned?.length) playerHand.push(...returned);

        updateGameBoard();

        resolve(true);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function mephistoDamnedIfYouDo() {
  updateGameBoard();
  return new Promise(async (resolve) => {
    // Check available options
    const hasBystanders = victoryPile.some((card) => card.type === "Bystander");
    const hasWounds = woundDeck.length > 0;

    // Edge cases where only one option is available
    if (!hasBystanders && !hasWounds) {
      onscreenConsole.log("No Bystanders in VP and no Wounds available.");
      resolve(false);
      return;
    }

    if (!hasBystanders && hasWounds) {
      // Automatically take wound
      onscreenConsole.log(
        `No Bystanders in VP. You automatically gain a Wound.`,
      );
      await drawWound();
      resolve(true);
      return;
    }

    if (hasBystanders && !hasWounds) {
      // Automatically proceed to KO bystander
      await mephistoKoBystanderFromVP();
      resolve(true);
      return;
    }

    // Both options available - show unified popup
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
    titleElement.textContent = "TACTIC!";
    instructionsElement.innerHTML =
      "Select a Bystander to KO, or choose to gain a Wound instead.";

    // Set background image in preview area
    previewElement.style.backgroundImage =
      "url('Visual Assets/Masterminds/DarkCity_Mephisto_DamnedIfYouDo.webp')";
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
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Clear existing content
    selectionRow1.innerHTML = "";

    const bystanders = victoryPile
      .map((card, index) =>
        card && card.type === "Bystander"
          ? { ...card, id: `vp-${index}`, index }
          : null,
      )
      .filter((card) => card !== null);

    let selectedBystander = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card name
    function updateInstructions() {
      if (selectedBystander === null) {
        instructionsElement.innerHTML =
          "Select a Bystander to KO, or choose to gain a Wound instead.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedBystander.name}</span> will be KO'd.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedBystander === null;
    }

    // Create card elements for each bystander in victory pile
    bystanders.forEach((card) => {
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
      if (selectedBystander && selectedBystander.id === card.id) {
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
            if (!selectedBystander) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundImage =
                "url('Visual Assets/Masterminds/DarkCity_Mephisto_DamnedIfYouDo.webp')";
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

        if (selectedBystander === card) {
          // Deselect
          selectedBystander = null;
          cardImage.classList.remove("selected");

          // Restore background image
          previewElement.innerHTML = "";
          previewElement.style.backgroundImage =
            "url('Visual Assets/Masterminds/DarkCity_Mephisto_DamnedIfYouDo.webp')";
          previewElement.style.backgroundSize = "contain";
          previewElement.style.backgroundRepeat = "no-repeat";
          previewElement.style.backgroundPosition = "center";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous
          if (selectedBystander) {
            const prevSelectedElement = document.querySelector(
              `[data-card-id="${selectedBystander.id}"] img`,
            );
            if (prevSelectedElement) {
              prevSelectedElement.classList.remove("selected");
            }
          }

          // Select new bystander
          selectedBystander = card;
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

    if (bystanders.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (bystanders.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (bystanders.length > 5) {
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
    confirmButton.textContent = "KO BYSTANDER";
    otherChoiceButton.textContent = "GAIN WOUND";
    otherChoiceButton.style.display = "inline-block";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory choice

    // Handle KO bystander choice (confirm button)
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedBystander === null) return;

      setTimeout(async () => {
        // Use the stored original index to remove from victory pile
        const indexInVP = selectedBystander.index;
        if (indexInVP < victoryPile.length) {
          const koedCard = victoryPile.splice(indexInVP, 1)[0];
          koPile.push(koedCard);
          onscreenConsole.log(
            `<span class="console-highlights">${koedCard.name}</span> was KO'd.`,
          );
          koBonuses();
        }

        updateGameBoard();
        closeCardChoicePopup();
        resolve(true);
      }, 100);
    };

    // Handle gain wound choice (other choice button)
    otherChoiceButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();

      setTimeout(async () => {
        await drawWound();
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

function mrSinisterPlansWithinPlans() {
  if (bystanderDeck.length === 0) {
    onscreenConsole.log(`No Bystanders available to attach to the Mastermind.`);
  }

  const tacticsInVP = victoryPile.filter(
    (card) => card.type === "Mastermind",
  ).length;
  const bystandersInDeck = bystanderDeck.length;

  if (tacticsInVP > bystandersInDeck && bystandersInDeck !== 0) {
    onscreenConsole.log(
      `You have ${tacticsInVP} Tactic${tacticsInVP !== 1 ? "s" : ""} in your Victory Pile. There are not enough Bystanders to account for that. Processing as many as possible.`,
    );
  } else if (tacticsInVP <= bystandersInDeck) {
    onscreenConsole.log(
      `You have ${tacticsInVP} Tactic${tacticsInVP !== 1 ? "s" : ""} in your Victory Pile. Processing that number of Bystanders now.`,
    );
  }

  // Get as many bystanders as tactics or as close as possible
  const bystandersToProcess = Math.min(tacticsInVP, bystanderDeck.length);
  const bystanderCards = bystanderDeck.splice(0, bystandersToProcess);

  for (const card of bystanderCards) {
    attachBystanderToMastermind(card);
  }

  updateGameBoard();
}

function mrSinisterTelepathicManipulation() {
  // Filter only Bystanders from victory pile
  const bystanders = victoryPile.filter((card) => card.type === "Bystander");

  if (bystanders.length === 0) {
    onscreenConsole.log(
      `No Bystanders in your Victory Pile for <span class="console-highlights">Mr. Sinister</span> to capture.`,
    );
    return;
  }

  // Select a random Bystander
  const randomIndex = Math.floor(Math.random() * bystanders.length);
  const selectedBystander = bystanders[randomIndex];

  // Remove from victory pile and attach to Mastermind
  const indexInVP = victoryPile.findIndex(
    (card) => card.id === selectedBystander.id,
  );
  if (indexInVP !== -1) {
    victoryPile.splice(indexInVP, 1);
  }

  let mastermind = getSelectedMastermind();
  mastermind.bystanders.push(selectedBystander);
  onscreenConsole.log(
    `<span class="console-highlights">${selectedBystander.name}</span> was chosen at random from your Victory Pile and captured by <span class="console-highlights">Mr. Sinister</span>.`,
  );
  updateGameBoard();
}

function mrSinisterHumanExperimentation() {
  // Get all Villains in the city with their positions
  const villainsInCity = city
    .map((card, index) =>
      card && card.type === "Villain"
        ? { ...card, id: `city-${index}`, index }
        : null,
    )
    .filter((card) => card !== null);

  if (villainsInCity.length === 0) {
    onscreenConsole.log("There are no Villains in the city. No effect.");
    return;
  }

  if (bystanderDeck.length === 0) {
    onscreenConsole.log(
      'There are no Bystanders left to be captured by <span class="console-highlights">Mr. Sinister</span>.',
    );
    return;
  }

  const mastermind = getSelectedMastermind();
  const villainCount = villainsInCity.length;
  const bystanderCount = bystanderDeck.length;

  if (villainCount > bystanderCount) {
    onscreenConsole.log(
      `There are ${villainCount} Villain${villainCount !== 1 ? "s" : ""} in the city; however, you do not have that many Bystanders remaining. <span class="console-highlights">Mr. Sinister</span> will capture all that are left.`,
    );

    // Capture all remaining Bystanders
    while (bystanderDeck.length > 0) {
      const bystander = bystanderDeck.pop();
      mastermind.bystanders.push(bystander);
    }
  } else {
    onscreenConsole.log(
      `There are ${villainCount} Villain${villainCount !== 1 ? "s" : ""} in the city. <span class="console-highlights">Mr. Sinister</span> will now capture that many Bystanders.`,
    );

    // Capture exactly villainCount number of Bystanders
    for (let i = 0; i < villainCount; i++) {
      if (bystanderDeck.length > 0) {
        const bystander = bystanderDeck.pop();
        mastermind.bystanders.push(bystander);
      }
    }
  }

  updateGameBoard();
}

async function kingpinDirtyCops() {
  updateGameBoard();

  // Filter KO pile for zero-cost Hero cards
  const zeroCostHeroes = koPile.filter(
    (card) => card.cost === 0 && card.type === "Hero",
  );

  if (zeroCostHeroes.length === 0) {
    console.log("No zero-cost Hero cards in KO pile.");
    onscreenConsole.log(
      `No 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> Hero cards available in the KO pile.`,
    );
    return false;
  }

  if (zeroCostHeroes.length === 1) {
    // Only one eligible card - automatically add it to player deck
    const hero = zeroCostHeroes[0];
    hero.revealed = true;
    const index = koPile.findIndex((card) => card.id === hero.id);
    if (index !== -1) {
      koPile.splice(index, 1);
      playerDeck.push(hero);
      onscreenConsole.log(
        `<span class="console-highlights">${hero.name}</span> is the only 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> Hero in the KO Pile and has been automatically added to the top of your deck.`,
      );
      updateGameBoard();
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(hero);
      }

      return true;
    }
    return false;
  }

  // Multiple eligible cards - show selection popup
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
      'Select a 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> Hero to add to your deck.';

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

    // Create a copy for sorting without affecting the original array
    const sortedZeroCostHeroes = [...zeroCostHeroes];
    genericCardSort(sortedZeroCostHeroes);

    let selectedCard = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with card name
    function updateInstructions() {
      if (selectedCard === null) {
        instructionsElement.innerHTML =
          'Select a 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> Hero to add to your deck.';
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be added to your deck.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;
    }

    // Create card elements for each zero-cost hero in KO pile
    sortedZeroCostHeroes.forEach((card) => {
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

    if (sortedZeroCostHeroes.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sortedZeroCostHeroes.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sortedZeroCostHeroes.length > 5) {
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
    confirmButton.textContent = "SELECT HERO";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {
        selectedCard.revealed = true;
        // Remove from KO pile and add to player deck - find by ID
        const indexInKOPile = koPile.findIndex(
          (card) => card.id === selectedCard.id,
        );
        if (indexInKOPile !== -1) {
          koPile.splice(indexInKOPile, 1);
          playerDeck.push(selectedCard);
          onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been added to your deck from the KO pile.`,
          );
        }

        updateGameBoard();
        closeCardChoicePopup();
        if (stingOfTheSpider) {
          await scarletSpiderStingOfTheSpiderDrawChoice(selectedCard);
        }
        resolve(true);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function kingpinMobWar() {
  updateGameBoard();

  // Filter victory pile for Henchmen cards
  const henchmenInVP = victoryPile.filter((card) => card.henchmen === true);

  if (henchmenInVP.length === 0) {
    onscreenConsole.log("No Henchmen cards available in Victory Pile.");
    return false;
  }

  if (henchmenInVP.length === 1) {
    // Only one Henchmen - automatically return it to villain deck
    const henchman = henchmenInVP[0];
    const index = victoryPile.findIndex((card) => card.id === henchman.id);
    if (index !== -1) {
      onscreenConsole.log(
        `<span class="console-highlights">${henchman.name}</span> was the only Henchmen in your Victory Pile. Playing now.`,
      );
      victoryPile.splice(index, 1);
      villainDeck.push(henchman);
      await drawVillainCard(); // Trigger villain card draw
      return true;
    }
    return false;
  }

  // Multiple Henchmen - show selection popup
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
      "Select a Henchmen from your Victory Pile to play.";

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
          "Select a Henchmen from your Victory Pile to play.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be played.`;
      }
    }

    // Update confirm button state
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;
    }

    // Create card elements for each henchmen in victory pile
    henchmenInVP.forEach((card) => {
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

    if (henchmenInVP.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (henchmenInVP.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (henchmenInVP.length > 5) {
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
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null) return;

      setTimeout(async () => {
        // Remove from victory pile and add to villain deck
        const indexInVP = victoryPile.findIndex(
          (card) => card.id === selectedCard.id,
        );
        if (indexInVP !== -1) {
          onscreenConsole.log(
            `Playing <span class="console-highlights">${selectedCard.name}</span> now.`,
          );
          victoryPile.splice(indexInVP, 1);
          villainDeck.push(selectedCard);

          updateGameBoard();
          closeCardChoicePopup();
          await drawVillainCard(); // Trigger villain card draw
        }

        resolve(true);
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

async function apocalypseHorsemenAreDrawingNearer() {
  // Filter victory pile for Horsemen cards
  const horsemenInVP = victoryPile.filter((card) => card.alwaysLeads === true);

  if (horsemenInVP.length === 0) {
    onscreenConsole.log(
      `<span class="console-highlights">Apocalypse</span> always leads your chosen Adversary group; however, there are no suitable Villain cards available in your Victory Pile.`,
    );
    return false;
  }

  if (horsemenInVP.length === 1) {
    // Only one Horsemen - automatically return it to villain deck
    const horsemen = horsemenInVP[0];
    const index = victoryPile.findIndex((card) => card.id === horsemen.id);
    if (index !== -1) {
      onscreenConsole.log(
        `<span class="console-highlights">Apocalypse</span> always leads your chosen Adversary group: <span class="console-highlights">${horsemen.name}</span> was the only suitable Villain in your Victory Pile. Playing now.`,
      );
      victoryPile.splice(index, 1);
      villainDeck.push(horsemen);
      await drawVillainCard(); // Trigger villain card draw
      return true;
    }
    return false;
  }

  // Multiple Horsemen - show selection popup
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
      '<span class="console-highlights">Apocalypse</span> always leads your chosen Adversary group: select a Villain from your Victory Pile to play.';

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

    // Create card elements for each eligible horsemen
    horsemenInVP.forEach((card) => {
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
            '<span class="console-highlights">Apocalypse</span> always leads your chosen Adversary group: select a Villain from your Victory Pile to play.';
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
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be played.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (horsemenInVP.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (horsemenInVP.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (horsemenInVP.length > 5) {
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
        // Remove from victory pile and add to villain deck
        const indexInVP = victoryPile.findIndex(
          (card) => card.id === selectedCard.id,
        );
        if (selectedCard.bystander) {
          delete selectedCard.bystander;
        }

        if (indexInVP !== -1) {
          onscreenConsole.log(
            `Playing <span class="console-highlights">${selectedCard.name}</span> now.`,
          );
          victoryPile.splice(indexInVP, 1);
          villainDeck.push(selectedCard);
          updateGameBoard();
          closeCardChoicePopup();
          await drawVillainCard(); // Trigger villain card draw

          resolve(true);
        } else {
          closeCardChoicePopup();
          resolve(false);
        }
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function apocalypseApocalypticDestruction() {
  return new Promise((resolve) => {
    const availableHeroes = playerDiscardPile
      .filter((card) => card && card.type === "Hero" && card.cost >= 1)
      .map((card, index) => ({ ...card, uniqueId: `${card.id}-${index}` }));

    if (availableHeroes.length === 0) {
      onscreenConsole.log(
        "No eligible Heroes (cost ≥ 1) in the discard pile to KO.",
      );
      resolve();
      return;
    }

    if (availableHeroes.length <= 2) {
      onscreenConsole.log(
        `Based on limited availability, ${availableHeroes.length !== 1 ? "cards have" : "a card has"} been chosen for you and will be KO'd.`,
      );
      availableHeroes.forEach((card) => {
        const index = playerDiscardPile.findIndex(
          (discardCard) =>
            discardCard &&
            discardCard.id === card.id &&
            discardCard.name === card.name,
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
    titleElement.textContent = "Apocalypse - Apocalyptic Destruction";
    instructionsElement.innerHTML =
      'Select two Heroes that cost 1 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> or more to KO from your discard.';

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

    // Reset content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedHeroes = [];
    let isDragging = false;

    // Sort the array for display
    genericCardSort(availableHeroes);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedHeroes.length !== 2;

      if (selectedHeroes.length === 0) {
        instructionsElement.innerHTML =
          'Select two Heroes that cost 1 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> or more to KO from your discard.';
      } else if (selectedHeroes.length === 1) {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedHeroes[0].name}</span>. Select one more Hero to KO.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedHeroes[0].name}</span> and <span class="console-highlights">${selectedHeroes[1].name}</span> will be KO'd.`;
      }
    }

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card element helper function
    function createCardElement(card, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.uniqueId);
      cardElement.setAttribute("data-location", "discard");

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

    // Populate row1 with discard heroes
    availableHeroes.forEach((card) => {
      createCardElement(card, selectionRow1);
    });

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

    // Confirm button handler - USING THE WORKING APPROACH
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

          // Find and remove from discard pile
          const indexInDiscard = playerDiscardPile.findIndex(
            (c) => c.id === originalCard.id,
          );
          if (indexInDiscard !== -1) {
            playerDiscardPile.splice(indexInDiscard, 1);
          }

          koPile.push(originalCard);
          onscreenConsole.log(
            `<span class="console-highlights">${originalCard.name}</span> has been KO'd from discard.`,
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
    updateUI();
  });
}

async function mephistoDevilishTorment() {
  updateGameBoard();

  // Filter zero-cost cards from discard pile
  let remainingCards = [...playerDiscardPile.filter((card) => card.cost === 0)];

  if (remainingCards.length === 0) {
    onscreenConsole.log(
      `No 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> cards available to place on top of your deck.`,
    );
    return false;
  }

  const selectedCards = [];

  return new Promise(async (resolve) => {
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
    instructionsElement.innerHTML = `These 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> cards must be placed on top of your deck. Choose which one to return next:`;

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

    let currentSelection = null;
    let isDragging = false;

    // Function to update the card list display
    const updateCardList = () => {
      selectionRow1.innerHTML = "";
      previewElement.innerHTML = "";
      previewElement.style.backgroundColor = "var(--panel-backgrounds)";

      // Create a sorted copy for display only
      const sortedRemainingCards = [...remainingCards];
      genericCardSort(sortedRemainingCards);

      // Update instructions
      const cardsLeft = remainingCards.length;
      const cardsSelected = selectedCards.length;
      instructionsElement.innerHTML = `Choose next card to place on deck (${cardsSelected} selected, ${cardsLeft} remaining):`;

      const row1 = selectionRow1;
      const row2Visible = false;
      setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

      // Create card elements for remaining cards using sorted order
      sortedRemainingCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "popup-card";
        cardElement.setAttribute("data-card-id", card.id);

        // Create card image
        const cardImage = document.createElement("img");
        cardImage.src = card.image;
        cardImage.alt = card.name;
        cardImage.className = "popup-card-image";

        // Add selected class if this is the current selection
        if (currentSelection && card.id === currentSelection.id) {
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

        // Click handler - selects this card
        cardElement.addEventListener("click", (e) => {
          if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }

          // Remove selection from all cards
          document.querySelectorAll(".popup-card img").forEach((img) => {
            img.classList.remove("selected");
          });

          // Set new selection
          currentSelection = card;
          cardImage.classList.add("selected");

          // Update preview to show selected card
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Enable confirm button
          const confirmButton = document.getElementById(
            "card-choice-popup-confirm",
          );
          confirmButton.disabled = false;
        });

        cardElement.appendChild(cardImage);
        selectionRow1.appendChild(cardElement);
      });

      if (sortedRemainingCards.length > 20) {
        selectionRow1.classList.add("multi-row");
        selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
        document.querySelector(
          ".card-choice-popup-selectionrow1-container",
        ).style.height = "75%";
        document.querySelector(
          ".card-choice-popup-selectionrow1-container",
        ).style.top = "40%";
        selectionRow1.style.gap = "0.3vw";
      } else if (sortedRemainingCards.length > 10) {
        selectionRow1.classList.add("multi-row");
        selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
        // Reset container styles when in multi-row mode
        document.querySelector(
          ".card-choice-popup-selectionrow1-container",
        ).style.height = "50%";
        document.querySelector(
          ".card-choice-popup-selectionrow1-container",
        ).style.top = "25%";
      } else if (sortedRemainingCards.length > 5) {
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
    };

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
    confirmButton.textContent = "SELECT NEXT CARD";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none"; // No cancellation allowed for mandatory selection

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (currentSelection === null) return;

      setTimeout(() => {
        // Move card from remaining to selected - find by ID to avoid index issues
        const index = remainingCards.findIndex(
          (c) => c.id === currentSelection.id,
        );
        if (index !== -1) {
          const [selectedCard] = remainingCards.splice(index, 1);
          selectedCards.unshift(selectedCard); // Add to beginning (we'll reverse later)
          selectedCard.revealed = true;
          currentSelection = null;

          if (remainingCards.length > 0) {
            // More cards to select - update display
            updateCardList();
            confirmButton.disabled = true;
          } else {
            // All cards selected - process the results
            processFinalSelection();
          }
        }
      }, 100);
    };

    const processFinalSelection = async () => {
      if (selectedCards.length > 0) {
        closeCardChoicePopup();
        // Remove all zero-cost cards from discard by filtering
        playerDiscardPile = playerDiscardPile.filter((card) => card.cost !== 0);

        // Add selected cards to deck in correct order
        const correctlyOrderedCards = [...selectedCards].reverse();
        playerDeck.push(...correctlyOrderedCards);

        onscreenConsole.log(
          `Arranged ${selectedCards.length} 0 <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="card-icons"> card${selectedCards.length !== 1 ? "s" : ""} on top of deck.`,
        );

        // Handle stingOfTheSpider trigger for each card added to top
        if (stingOfTheSpider) {
          // Process in the order they appear on deck (top card first)
          // correctlyOrderedCards[0] is the top card, correctlyOrderedCards[1] is next, etc.
          for (const card of correctlyOrderedCards) {
            await scarletSpiderStingOfTheSpiderDrawChoice(card);
          }
        }
      }

      updateGameBoard();

      resolve(selectedCards.length > 0);
    };

    // Initial card list display
    updateCardList();

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

// Dark City Scheme Effects

async function strengthOrKOTop() {
  return new Promise((resolve) => {
    const cardsYouHave = [
      ...playerHand,
      ...cardsPlayedThisTurn.filter(
        (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
      ),
    ];

    const hasStrengthCards =
      cardsYouHave.filter(
        (item) => item.classes && item.classes.includes("Strength"),
      ).length > 0;

    if (!hasStrengthCards) {
      onscreenConsole.log(
        `You are unable to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`,
      );

      if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
        onscreenConsole.log("No cards available to KO.");
        resolve();
        return;
      }

      // If playerDeck is empty but playerDiscardPile has cards, reshuffle discard pile into deck
      if (playerDeck.length === 0) {
        playerDeck = shuffle(playerDiscardPile);
        playerDiscardPile = [];
      }

      const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

      playerDeck.splice(playerDeck.length - 1, 1);
      koPile.push(topCardPlayerDeck);
      onscreenConsole.log(
        `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd from the top of your deck.`,
      );
      koBonuses();
      resolve();
    } else {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          `DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> HERO TO AVOID KO'ING A CARD FROM YOUR DECK?`,
          "Reveal Hero",
          "KO Card",
        );

        // Update the popup title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "SCHEME TWIST!";

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
            "url('Visual Assets/Schemes/DarkCity_massiveEarthquakeGenerator.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You are able to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero and have escaped KO'ing a card!`,
          );
          closeInfoChoicePopup();
          resolve(); // Resolve the Promise when done
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero.`,
          );

          if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
            onscreenConsole.log("No cards available to KO.");
            closeInfoChoicePopup();
            resolve();
            return;
          }

          // If playerDeck is empty but playerDiscardPile has cards, reshuffle discard pile into deck
          if (playerDeck.length === 0) {
            playerDeck = shuffle(playerDiscardPile);
            playerDiscardPile = [];
          }

          const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

          playerDeck.splice(playerDeck.length - 1, 1);
          koPile.push(topCardPlayerDeck);
          onscreenConsole.log(
            `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd from the top of your deck.`,
          );
          koBonuses();

          closeInfoChoicePopup();
          resolve(); // Resolve the Promise when done
        };
      }, 10); // 10ms delay
    }
  });
}

async function GoonsEscape() {
  for (let i = 0; i < city.length; i++) {
    if (city[i] && city[i].name === "Maggia Goons") {
      await handleVillainEscape(city[i]);
      city[i] = null;
      updateGameBoard();
    }
  }

  const goons = victoryPile.filter(
    (card) => card && card.name === "Maggia Goons",
  );

  // Remove goons from victory pile
  victoryPile = victoryPile.filter(
    (card) => !card || card.name !== "Maggia Goons",
  );

  // Add goons to villain deck
  villainDeck.push(...goons);

  // Shuffle the villain deck
  shuffle(villainDeck);

  // Update game board if needed
  updateGameBoard();

  // Log action to console
  if (goons.length > 0) {
    onscreenConsole.log(
      `${goons.length} <span class="console-highlights">Maggia Goons</span> have escaped your Victory Pile and have been shuffled back into the Villain deck.`,
    );
  } else {
    onscreenConsole.log(
      `There are no <span class="console-highlights">Maggia Goons</span> in your Victory Pile to shuffle back into the Villain deck.`,
    );
  }
}

async function organizedCrimeAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Maggia Goons</span> forces you to play another card from the Villain deck.`,
  );
  await drawVillainCard();
}

async function KOAllHQBystanders() {
  // First collect all indices where Bystanders are found
  const bystanderIndices = [];

  for (let i = 0; i < hq.length; i++) {
    if (hq[i] && hq[i].type === "Bystander") {
      bystanderIndices.push(i);
    }
  }

  // If no bystanders found, exit early
  if (bystanderIndices.length === 0) {
    onscreenConsole.log("No Bystanders found in HQ.");
  }

  // Process each bystander position
  for (const index of bystanderIndices) {
    // KO the bystander (add to KO pile if needed)
    const koedBystander = hq[index];
    koPile.push(koedBystander);

    // Draw new card from hero deck (if available)
    const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
    hq[index] = newCard;

    // Log the changes
    if (koedBystander && newCard) {
      onscreenConsole.log(
        `<span class="console-highlights">${koedBystander.name}</span> was KO'd and replaced by <span class="console-highlights">${newCard.name}</span>.`,
      );
    } else if (koedBystander) {
      onscreenConsole.log(
        `<span class="console-highlights">${koedBystander.name}</span> was KO'd (no replacement available).`,
      );
    }
  }

  // Update the game board
  updateGameBoard();

  // Check if hero deck ran out
  if (heroDeck.length === 0) {
    heroDeckHasRunOut = true;
  }

  if (victoryPile.filter((card) => card.type === "Bystander").length === 0) {
    onscreenConsole.log(`No Bystanders in your Victory Pile to KO.`);
    return;
  }

  const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true,
    ),
  ];

  const hasInstinctCards =
    cardsYouHave.filter(
      (item) => item.classes && item.classes.includes("Instinct"),
    ).length > 0;

  if (!hasInstinctCards) {
    onscreenConsole.log(
      `You are unable to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
    );
    await saveHumanityInstinctKO();
  } else {
    // Create a promise that resolves when the user makes a choice
    const userChoice = await new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          `DO YOU WISH TO REVEAL A <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> HERO TO AVOID KO'ING A BYSTANDER FROM YOUR VICTORY PILE?`,
          "Reveal Hero",
          "KO Bystander",
        );

        // Update the popup title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "SCHEME TWIST!";

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
            "url('Visual Assets/Schemes/DarkCity_saveHumanity.webp')";
          previewArea.style.backgroundSize = "contain";
          previewArea.style.backgroundRepeat = "no-repeat";
          previewArea.style.backgroundPosition = "center";
          previewArea.style.display = "block";
        }

        confirmButton.onclick = () => {
          onscreenConsole.log(
            `You are able to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero and have avoided KO'ing a Bystander from your Victory Pile!`,
          );
          closeInfoChoicePopup();
          resolve(false); // No KO needed
        };

        denyButton.onclick = () => {
          onscreenConsole.log(
            `You have chosen not to reveal a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero.`,
          );
          closeInfoChoicePopup();
          resolve(true); // KO needed
        };
      }, 10);
    });

    if (userChoice) {
      await saveHumanityInstinctKO();
    }
  }
}

async function saveHumanityInstinctKO() {
  const bystanders = victoryPile.filter((card) => card.type === "Bystander");

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
  titleElement.textContent = "Scheme Twist!";
  instructionsElement.textContent =
    "Select a Bystander to KO from your Victory Pile.";

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

  const row1 = selectionRow1;
  const row2Visible = false;

  // Initialize scroll gradient detection on the container
  setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

  // Create card elements for each bystander
  bystanders.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "popup-card";
    cardElement.setAttribute("data-card-id", card.id);
    cardElement.setAttribute("data-card-index", String(index));

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
      instructionsElement.textContent =
        "Select a Bystander to KO from your Victory Pile.";
    } else {
      instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
    }
  }

  if (bystanders.length > 20) {
    selectionRow1.classList.add("multi-row");
    selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "75%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "40%";
    selectionRow1.style.gap = "0.3vw";
  } else if (bystanders.length > 10) {
    selectionRow1.classList.add("multi-row");
    selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
    // Reset container styles when in multi-row mode
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "50%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "25%";
  } else if (bystanders.length > 5) {
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
  const noThanksButton = document.getElementById("card-choice-popup-nothanks");

  // Disable confirm initially and hide other buttons
  confirmButton.disabled = true;
  otherChoiceButton.style.display = "none";
  noThanksButton.style.display = "none";

  // Update confirm button text to match original
  confirmButton.textContent = "Confirm";

  // Return a promise that resolves when the user confirms
  return new Promise((resolve) => {
    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard) return;

      setTimeout(() => {
        // Remove from victory pile and add to KO pile
        const indexInVP = victoryPile.findIndex(
          (card) => card.id === selectedCard.id,
        );
        if (indexInVP !== -1) {
          const koedCard = victoryPile.splice(indexInVP, 1)[0];
          koPile.push(koedCard);
          onscreenConsole.log(
            `<span class="console-highlights">${koedCard.name}</span> was KO'd.`,
          );
          koBonuses();
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

async function plutoniumCaptured(twistCard) {
  const sewersIndex = city.length - 1;

  // If villain in sewers, attach there
  if (city[sewersIndex]) {
    await attachPlutoniumToVillain(sewersIndex, twistCard);
  }
  // Otherwise, find the closest villain
  else {
    const closestVillainIndex = findClosestVillain();
    if (closestVillainIndex !== -1) {
      await attachPlutoniumToVillain(closestVillainIndex, twistCard);
    }
    // If no villains, KO the plutonium
    else {
      koPile.push(twistCard);
      onscreenConsole.log(`No Villains in city. Plutonium KO'd.`);
    }
  }

  updateGameBoard();
  // **Note:** The villain draw happens in `handlePlutoniumSchemeTwist`, not here!
}

async function attachPlutoniumToVillain(villainIndex, twistCard) {
  if (!city[villainIndex].plutoniumCaptured) {
    city[villainIndex].plutoniumCaptured = [];
  }
  city[villainIndex].plutoniumCaptured.push(twistCard);

  const villain = city[villainIndex];
  onscreenConsole.log(
    `<span class="console-highlights">${villain.name}</span> captured Plutonium.`,
  );
  updateGameBoard();
}

async function BystanderstToDemonGoblins() {
  if (bystanderDeck.length === 0) {
    onscreenConsole.log(
      'There are no Bystanders available to become "Demon Goblin" Villains.',
    );
    return;
  }

  // Determine how many cards we can take (up to 5)
  const count = Math.min(5, bystanderDeck.length);

  // Move the cards from bystanderDeck to demonGoblinDeck
  for (let i = 0; i < count; i++) {
    demonGoblinDeck.push(bystanderDeck.pop());
  }

  // Optional: Log how many were converted
  onscreenConsole.log(
    `${count} Bystander${count !== 1 ? 's have become "Demon Goblin" Villains.' : ' has become a "Demon Goblin" Villain.'}`,
  );
}

async function rescueDemonGoblin() {
  const demonBystander = demonGoblinDeck[demonGoblinDeck.length - 1];

  try {
    if (recruitUsedToAttack === true) {
      const result = await showCounterPopup(demonBystander, 2);
      totalAttackPoints -= result.attackUsed || 0;
      totalRecruitPoints -= result.recruitUsed || 0;
      onscreenConsole.log(
        `You chose to use ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points.`,
      );
    } else {
      totalAttackPoints -= 2;
    }
  } catch (error) {
    console.error("Error handling point deduction:", error);
  }

  demonGoblinDeck.pop();
  victoryPile.push(demonBystander);
  onscreenConsole.log(
    `<span class="console-highlights">${demonBystander.name}</span> has been rescued.`,
  );

  defeatBonuses();
  bystanderBonuses();

  const attackButton = document.querySelector(
    "#demon-goblin-deck .attack-button",
  );
  if (attackButton) {
    attackButton.style.display = "none";
  }

  await rescueBystanderAbility(demonBystander);
  updateGameBoard();
}

function showDemonGoblinAttackButton() {
  let playerAttackPoints = totalAttackPoints;
  if (recruitUsedToAttack === true) {
    playerAttackPoints += totalRecruitPoints;
  }

  const demonDeck = document.getElementById("demon-goblin-deck");
  if (!demonDeck) return;

  if (playerAttackPoints >= 2 && demonGoblinDeck.length > 0) {
    let attackButton = demonDeck.querySelector(".attack-button");
    if (!attackButton) {
      attackButton = document.createElement("div");
      attackButton.classList.add("attack-button");
      demonDeck.appendChild(attackButton);
    }

    attackButton.innerHTML = `<span style="filter: drop-shadow(0vh 0vh 0.3vh black);"><img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="overlay-attack-icons"></span>`;
    attackButton.style.display = "block";

    // Store the handler so we can remove it later
    let handleClickOutside;

    attackButton.onclick = async function () {
      attackButton.style.pointerEvents = "none";
      try {
        await rescueDemonGoblin();
        attackButton.style.display = "none";
      } catch (error) {
        console.error("Attack failed:", error);
      } finally {
        attackButton.style.pointerEvents = "auto";
        document.removeEventListener("click", handleClickOutside);
        updateGameBoard();
      }
    };

    handleClickOutside = (event) => {
      if (!attackButton.contains(event.target)) {
        attackButton.style.display = "none";
        document.removeEventListener("click", handleClickOutside);
      }
    };

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);
  }
}

function handleXCutionerHero(villainCard) {
  let sewersIndex = city.length - 1;

  // Check if there's a villain in the sewers
  if (city[sewersIndex]) {
    attachXCutionerHeroToVillain(sewersIndex, villainCard);
  } else {
    // Find the next closest villain to the villain deck
    let closestVillainIndex = findClosestVillain();

    if (closestVillainIndex !== -1) {
      attachXCutionerHeroToVillain(closestVillainIndex, villainCard);
    } else {
      // If no villains in the city, attach to the mastermind
      attachXCutionerHeroToMastermind(villainCard);
    }
  }
  updateGameBoard();
}

async function attachXCutionerHeroToVillain(villainIndex, villainCard) {
  await new Promise((resolve) => {
    showPopup("X-Cutioner Hero to Villain", villainCard, () => {
      resolve();
    });
  });
  if (city[villainIndex].XCutionerHeroes) {
    city[villainIndex].XCutionerHeroes.push(villainCard);
  } else {
    city[villainIndex].XCutionerHeroes = [villainCard];
  }

  // Access the villain object using the index to get its name
  const villain = city[villainIndex];

  // Log the villain's name correctly
  onscreenConsole.log(
    `<span class="console-highlights">${villainCard.name}</span> has been captured by <span class="console-highlights">${villain.name}</span>.`,
  );
  addHRToTopWithInnerHTML();

  updateGameBoard();
}

async function attachXCutionerHeroToMastermind(villainCard) {
  await new Promise((resolve) => {
    showPopup("X-Cutioner Hero to Mastermind", villainCard, () => {
      resolve();
    });
  });
  let mastermind = getSelectedMastermind();

  if (mastermind.XCutionerHeroes) {
    mastermind.XCutionerHeroes.push(villainCard);
  } else {
    mastermind.XCutionerHeroes = [villainCard];
  }

  updateMastermindOverlay();

  updateGameBoard();

  onscreenConsole.log(
    `<span class="console-highlights">${villainCard.name}</span> has been captured by <span class="console-highlights">${mastermind.name}</span>.`,
  );
  addHRToTopWithInnerHTML();
}

async function KOCapturedHeroes() {
  const mastermind = getSelectedMastermind();

  // 1. Handle XCutioner's captured heroes (original logic - already has null check)
  if (mastermind.XCutionerHeroes && mastermind.XCutionerHeroes.length > 0) {
    for (const hero of mastermind.XCutionerHeroes) {
      koPile.push(hero);
      onscreenConsole.log(
        `<span class="console-highlights">${hero.name}</span> has been KO'd.`,
      );
    }
    mastermind.XCutionerHeroes = [];
  }

  // 2. Handle city spaces' XCutionerHeroes (FIXED VERSION)
  for (let i = city.length - 1; i >= 0; i--) {
    if (
      city[i] &&
      city[i].XCutionerHeroes &&
      city[i].XCutionerHeroes.length > 0
    ) {
      for (const hero of city[i].XCutionerHeroes) {
        koPile.push(hero);
        onscreenConsole.log(
          `<span class="console-highlights">${hero.name}</span> has been KO'd.`,
        );
      }
      city[i].XCutionerHeroes = [];
    }
  }

  // 3. KO ALL captured heroes (Skrull/other captures) - unchanged
  for (const hero of capturedCardsDeck) {
    koPile.push(hero);
    onscreenConsole.log(
      `<span class="console-highlights">${hero.name}</span> has been KO'd.`,
    );
  }
  capturedCardsDeck = []; // Clear the captured deck

  // 4. Reset any villains that had captured heroes (FIXED VERSION)
  for (const villain of city) {
    if (villain && villain.captureCode) {
      // Added null check here too
      // Remove capture-related properties
      delete villain.captureCode;
      delete villain.overlayText;
      delete villain.overlayTextAttack;
      delete villain.capturedOverlayText;
      villain.attack = villain.originalAttack;
      delete villain.XCutionerHeroes;
    }
  }

  // 5. Also reset mastermind if it had capture abilities - unchanged
  if (mastermind.captureCode) {
    delete mastermind.captureCode;
    // Remove any overlays, reset attack, etc.
  }

  onscreenConsole.log(
    `All Heroes captured by enemies have been KO'd. Now playing another card from the Villain Deck...`,
  );
  await drawVillainCard();

  updateGameBoard(); // Refresh UI
}

async function explosionKO() {
  let twistsRemaining = schemeTwistCount;
  let currentHQIndex = 0; // Start with left-most HQ (index 0 = HQ1)

  while (twistsRemaining > 0 && currentHQIndex < 5) {
    const explosionCounts = [
      hqExplosion1,
      hqExplosion2,
      hqExplosion3,
      hqExplosion4,
      hqExplosion5,
    ];

    // Skip destroyed HQs (explosion >= 6)
    while (currentHQIndex < 5 && explosionCounts[currentHQIndex] >= 6) {
      currentHQIndex++;
    }

    if (currentHQIndex >= 5) break; // All HQs destroyed

    // Process KO
    const originalCount = explosionCounts[currentHQIndex];
    koHeroInHQ(currentHQIndex); // Uses existing Helicarrier logic

    // Check if this KO destroyed the HQ
    const newCount = [
      hqExplosion1,
      hqExplosion2,
      hqExplosion3,
      hqExplosion4,
      hqExplosion5,
    ][currentHQIndex];
    if (originalCount < 6 && newCount >= 6) {
      onscreenConsole.log(`HQ ${currentHQIndex + 1} has been destroyed!`);
      currentHQIndex++; // Move to next HQ only after destruction
    }

    twistsRemaining--;
  }

  if (twistsRemaining > 0) {
    onscreenConsole.log(
      `${twistsRemaining} scheme twists had no valid targets!`,
    );
  }

  updateGameBoard();
}

async function babyKidnap() {
  // Find villain with babyHope
  const babyVillainIndex = city.findIndex(
    (card) => card?.type === "Villain" && card.babyHope === true,
  );

  if (babyVillainIndex !== -1) {
    // Case 1: Villain with baby exists
    const babyVillain = city[babyVillainIndex];

    // PROPERLY clear the city cell (set to empty string, not undefined)

    // Process escape
    delete babyVillain.babyHope;
    babyVillain.attack = babyVillain.originalAttack;
    document.getElementById("scheme-token").style.display = "flex";
    stackedTwistNextToMastermind += 1;

    city[babyVillainIndex] = null;

    // Force immediate UI update BEFORE escape handling
    updateGameBoard();

    await handleVillainEscape(babyVillain);
  } else {
    // Case 2: No villain with baby - find closest to villain deck
    const closestVillainIndex = city.findLastIndex(
      (card) => card?.type === "Villain",
    );
    if (closestVillainIndex !== -1) {
      city[closestVillainIndex].babyHope = true;
      document.getElementById("scheme-token").style.display = "none";
      victoryPile = victoryPile.filter((card) => card?.type !== "Baby");
      updateGameBoard();
    }
  }
}

function isCityEmpty() {
  return !city.some((card) => card != null);
}

async function instantDefeatAttack(cityIndex) {
  playSFX("attack");
  // Get fresh references
  const villainCard = city[cityIndex];
  if (!villainCard) {
    console.error("Villain disappeared during attack.");
    onscreenConsole.log(`Error: Villain could not be targeted.`);
    return;
  }

  // Set the currentVillainLocation to the current location of the villain
  currentVillainLocation = cityIndex; // Store the city index (location) of the villain
  console.log("Selected Villain's Location: ", currentVillainLocation);

  // Make a copy of critical data before any async operations
  const villainCopy = {
    name: villainCard.name,
    attack: villainCard.attack,
    originalAttack: villainCard.originalAttack,
    bystander: [...(villainCard.bystander || [])],
    fightEffect: villainCard.fightEffect,
    shattered: villainCard.shattered,
    fightCondition: villainCard.fightCondition,
    image: villainCard.image,
    captureCode: villainCard.captureCode,
  };

  // Calculate attack synchronously
  const selectedScheme = getSelectedScheme();
  const villainAttack = recalculateVillainAttack(villainCard);

  // Replace the forEach with a for...of loop which properly handles async/await
  if (Array.isArray(villainCard.bystander)) {
    for (const bystander of villainCard.bystander) {
      if (bystander) {
        victoryPile.push(bystander);
        bystanderBonuses();
        await rescueBystanderAbility(bystander);
      }
    }
  }

  if (villainCard.babyHope === true) {
    delete villainCard.babyHope;
    villainCard.attack = villainCard.originalAttack;
    const BabyHopeCard = {
      name: "Baby Hope",
      type: "Baby",
      victoryPoints: 6,
      image: "Visual Assets/Other/babyHope.webp",
    };
    victoryPile.push(BabyHopeCard);
    updateGameBoard();
  }

  // Rest of the post-defeat handling remains the same
  if (
    villainCard.plutoniumCaptured &&
    villainCard.plutoniumCaptured.length > 0
  ) {
    for (const plutonium of villainCard.plutoniumCaptured) {
      villainDeck.push(plutonium);
    }
    villainCard.plutoniumCaptured = [];
    shuffle(villainDeck);
    onscreenConsole.log(
      `Plutonium from <span class="console-highlights">${villainCard.name}</span> shuffled back into Villain Deck.`,
    );
  }

  // Handle X-Cutioner Heroes
  if (
    Array.isArray(villainCard.XCutionerHeroes) &&
    villainCard.XCutionerHeroes.length > 0
  ) {
    for (const hero of villainCard.XCutionerHeroes) {
      playerDiscardPile.push(hero);
      onscreenConsole.log(
        `You have rescued <span class="console-highlights">${hero.name}</span>. They have been added to your Discard pile.`,
      );
    }
    villainCard.XCutionerHeroes.length = 0; // clear in-place
  }

  // Handle extra bystanders
  if (rescueExtraBystanders > 0) {
    for (let i = 0; i < rescueExtraBystanders; i++) {
      await rescueBystander();
    }
  }

  if (villainCard.name === "Dracula") {
    villainCard.attack = 3;
    villainCard.cost = 0;
  }

  victoryPile.push(villainCard);

  onscreenConsole.log(
    `<span class="console-highlights">${villainCard.name}</span> has been defeated.`,
  );

  // Handle location-based bonuses
  try {
    if (sewerRooftopDefeats && (cityIndex === 2 || cityIndex === 4)) {
      onscreenConsole.log(
        `You defeated <span class="console-highlights">${villainCard.name}</span> ${cityIndex === 4 ? "in the Sewers" : "on the Rooftops"}. Drawing two cards.`,
      );
      extraDraw();
      extraDraw();
    }

    if (sewerRooftopBonusRecruit > 0 && (cityIndex === 2 || cityIndex === 4)) {
      onscreenConsole.log(
        `You defeated <span class="console-highlights">${villainCard.name}</span> ${cityIndex === 4 ? "in the Sewers" : "on the Rooftops"}. +${sewerRooftopBonusRecruit}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`,
      );
      totalRecruitPoints += sewerRooftopBonusRecruit;
      cumulativeRecruitPoints += sewerRooftopBonusRecruit;
    }
  } catch (error) {
    console.error("Error processing location bonuses:", error);
  }

  // Clear the city slot and add to victory pile
  city[cityIndex] = null;

  defeatBonuses();

  // Handle Professor X Mind Control
  if (hasProfessorXMindControl) {
    await professorXMindControlGainVillain(villainCard);
  }

  // Handle fight effects
  try {
    if (villainCopy.fightEffect && villainCopy.fightEffect !== "None") {
      const fightEffectFunction = window[villainCopy.fightEffect];
      if (typeof fightEffectFunction === "function") {
        await fightEffectFunction(villainCopy);
      }
    }
  } catch (error) {
    console.error(`Error in fight effect: ${error}`);
  } finally {
    currentVillainLocation = null;
    updateGameBoard();
  }
}

async function professorXMindControlGainVillain(villainCard) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `DO YOU WISH TO GAIN <span class="bold-spans">${villainCard.name}</span> AS A HERO?`,
        "Gain as Hero",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Professor X - Mind Control";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for Professor X image
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage =
          "url('Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_MindControl.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        // Create and modify the copy
        const cardCopy = JSON.parse(JSON.stringify(villainCard));
        cardCopy.type = "Hero";
        cardCopy.color = "Grey";
        cardCopy.cost = villainCard.attack;
        cardCopy.keywords = [];

        if (cardCopy.goblinQueen === true) {
          cardCopy.attack = cardCopy.goblinToHeroAttackValue;
        }

        playerDiscardPile.push(cardCopy);

        onscreenConsole.log(
          `You have chosen to add <span class="console-highlights">${villainCard.name}</span> to your discard pile as a grey Hero.`,
        );
        updateGameBoard();

        closeInfoChoicePopup();
        resolve(true); // Resolve with true indicating the player chose to copy
      };

      denyButton.onclick = () => {
        onscreenConsole.log(`You declined to copy ${villainCard.name}.`);
        closeInfoChoicePopup();
        resolve(false); // Resolve with false indicating the player declined
      };
    }, 10);
  });
}

async function confirmInstantMastermindAttack() {
  playSFX("attack");
  try {
    const mastermind = getSelectedMastermind();
    const finalBlowNow = isFinalBlowRequired(mastermind); // Check for Final Blow
    healingPossible = false;

    // Handle doom delay logic
    if (doomDelayEndGameFinalBlow) {
      delayEndGame = mastermindDefeatTurn === turnCount;
    }

    // Create a copy of the mastermind data for operations
    const mastermindCopy = createMastermindCopy(mastermind);

    // Collect all possible operations (bystanders, XCutioner heroes, etc.)
    const operations = await collectMastermindRescueOperations(mastermindCopy);

    // Execute operations in player-chosen order if needed
    if (operations.length > 1) {
      await executeOperationsInPlayerOrder(operations, mastermindCopy);
    } else if (operations.length === 1) {
      await operations[0].execute();
    }

    // Handle extra bystanders from other effects
    if (rescueExtraBystanders > 0) {
      for (let i = 0; i < rescueExtraBystanders; i++) {
        await rescueBystander();
      }
    }

    // Apply defeat bonuses
    defeatBonuses();
    updateMastermindOverlay();
    updateGameBoard();

    onscreenConsole.log(
      `You attacked <span class="console-highlights">${mastermind.name}</span> with an instant defeat!`,
    );

    // Handle Final Blow logic
    if (finalBlowNow) {
      finalBlowDelivered = true;
      
      const finalBlowCard = {
        name: "Final Blow",
        type: "Mastermind",
        victoryPoints: mastermind.victoryPoints,
        image: mastermind.image,
      };
      victoryPile.push(finalBlowCard);
      updateGameBoard();

      onscreenConsole.log(
        `You delivered the Final Blow to <span class="console-highlights">${mastermind.name}</span>!`,
      );
      checkWinCondition();
    } else if (mastermind.tactics.length === 0) {
      // Regular defeat without Final Blow
      checkWinCondition();
    } else {
      // Reveal next tactic
      revealMastermindTactic(mastermind);
    }

await handleMastermindPostDefeat(mastermind, mastermindCopy, 0);

  } catch (error) {
    console.error("Instant Mastermind attack error:", error);
    throw error;
  }
}