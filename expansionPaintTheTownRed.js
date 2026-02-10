// Paint the Town Red Expansion
//10.02.26 20:45

//Schemes

async function invadeTheDailyBugleNewsHQTwist() {
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

const villainsInCity = city.filter((card) => card && card.type === "Villain");

// Set popup content
titleElement.textContent = "SCHEME TWIST";
instructionsElement.innerHTML =
  'SELECT A HERO IN THE HQ TO KO.' + 
  (villainsInCity.length === 0 
    ? ` THANKFULLY, THERE ARE NO VILLAINS IN THE CITY TO INVADE AT THIS TIME.`
    : ` THEY WILL BE REPLACED BY THE HIGHEST-<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> VILLAIN IN THE CITY.`);

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

        // Determine eligibility - same logic as original: Hero type and cost <= 6
        const isHeroType = hero.type === "Hero";
        const isEligibleCost = hero.cost <= 12;
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
              instructionsElement.innerHTML =
                'SELECT A HERO IN THE HQ TO KO. THEY WILL BE REPLACED BY THE HIGHEST-<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> VILLAIN IN THE CITY.';
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be KO'd.`;
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
        hero && hero.type === "Hero" && hero.cost <= 12 && explosionValue < 6
      ); // Not destroyed
    });

    if (eligibleHeroes.length === 0) {
      onscreenConsole.log("No Heroes available to KO.");
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
    confirmButton.textContent = "KO HERO";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      // Add async here too
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      setTimeout(async () => {
        // Add async here for the setTimeout callback
        const hero = hq[selectedHQIndex];
        koPile.push(hero);
        onscreenConsole.log(
          `<span class="console-highlights">${hero.name}</span> has been KO'd.`,
        );
        hq[selectedHQIndex] = "";
        closeHQCityCardChoicePopup();
        await dailyBugleVillainToHQ(selectedHQIndex);
        resolve();
      }, 100);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

async function dailyBugleVillainToHQ(selectedHQIndex) {
  // Identify the villains in the city
  const villainsInCity = city.filter((card) => card && card.type === "Villain");

  if (villainsInCity.length === 0) {
    onscreenConsole.log(`No Villains invade at this time!`);
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
  updateGameBoard();
    return;
  }

  // Find the highest recalculated attack among the villains
  const maxAttack = Math.max(
    ...villainsInCity.map((villain) => recalculateVillainAttack(villain)),
  );

  // Filter villains with the highest recalculated attack
  const highestAttackVillains = villainsInCity.filter(
    (villain) => recalculateVillainAttack(villain) === maxAttack,
  );

  if (highestAttackVillains.length === 1) {
    const villainToRemove = highestAttackVillains[0];
    const villainIndex = city.findIndex((card) => card === villainToRemove);

    // FIXED: Use assignment, not push
    hq[selectedHQIndex] = villainToRemove;
    onscreenConsole.log(
      `<span class="console-highlights">${villainToRemove.name}</span> is the highest-<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> Villain and enters the HQ.`,
    );
    city[villainIndex] = null;
    updateGameBoard();
  } else if (highestAttackVillains.length > 1) {
    // If there are multiple villains with the same highest attack, prompt the player to choose
    await dailyBugleSelectHighAttackVillain(
      highestAttackVillains,
      selectedHQIndex,
    );
  } else {
    onscreenConsole.log("No Villains available to enter HQ.");
  }
}

async function dailyBugleSelectHighAttackVillain(
  highestAttackVillains,
  selectedHQIndex,
) {
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
    titleElement.textContent = "SCHEME TWIST";
    instructionsElement.innerHTML =
      'There are multiple Villains with the highest <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Select one to enter the HQ.';

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedVillain = null;
    let selectedCell = null;

    // Check if any of the highest attack villains are still available
    const availableVillains = highestAttackVillains.filter(
      (villain) => city.includes(villain), // Make sure villain is still in city
    );

    if (availableVillains.length === 0) {
      onscreenConsole.log("No eligible Villains available to enter HQ.");
      resolve(false);
      return;
    }

    // Process each city slot (0-4) - SHOW ALL CARDS, BUT GREY OUT NON-ELIGIBLE ONES
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

        // FIXED: Show all cards, but determine eligibility based on whether it's in highestAttackVillains
        const isEligible = highestAttackVillains.includes(card);

        // Apply greyed out styling for ineligible cards (non-highest attack villains, heroes, etc.)
        if (!isEligible) {
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
        } else {
          cardImage.classList.remove("greyed-out");
          cardImage.style.cursor = "pointer";

          // Click handler for eligible villains only
          cardImage.onclick = (e) => {
            e.stopPropagation();

            if (selectedVillain === card) {
              // Deselect
              selectedVillain = null;
              cell.classList.remove("selected");
              selectedCell = null;
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";

              instructionsElement.innerHTML =
                'There are multiple Villains with the highest <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. Select one to enter the HQ.';
              document.getElementById(
                "card-choice-city-hq-popup-confirm",
              ).disabled = true;
            } else {
              // Deselect previous
              if (selectedCell) {
                selectedCell.classList.remove("selected");
              }

              // Select new
              selectedVillain = card;
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

              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will enter the HQ.`;
              document.getElementById(
                "card-choice-city-hq-popup-confirm",
              ).disabled = false;
            }
          };

          // Hover effects for eligible cards only
          cardImage.onmouseover = () => {
            if (selectedVillain !== null && selectedVillain !== card) return;

            previewElement.innerHTML = "";
            const previewImage = document.createElement("img");
            previewImage.src = card.image;
            previewImage.alt = card.name;
            previewImage.className = "popup-card-preview-image";
            previewElement.appendChild(previewImage);

            if (selectedVillain === null) {
              previewElement.style.backgroundColor = "var(--accent)";
            }
          };

          cardImage.onmouseout = () => {
            if (selectedVillain !== null && selectedVillain !== card) return;

            if (selectedVillain === null) {
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
        }

        // Add all relevant overlays (for all cards, regardless of eligibility)
        addCardOverlays(cardContainer, card, i);
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
    confirmButton.textContent = "CONFIRM";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedVillain === null) return;

      // FIXED: Use assignment, not push
      hq[selectedHQIndex] = selectedVillain;
      onscreenConsole.log(
        `<span class="console-highlights">${selectedVillain.name}</span> enters the HQ.`,
      );

      // Remove from city
      const villainIndex = city.findIndex((card) => card === selectedVillain);
      if (villainIndex !== -1) {
        city[villainIndex] = null;
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

async function weaveAWebOfLiesBystanderRescue() {
  return new Promise((resolve) => {
    if (totalRecruitPoints === 0) {
      onscreenConsole.log(
        `Weave a Web of Lies: Not enough <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='console-card-icons'> points to rescue a Bystander.`,
      );
      resolve(); // Fixed: added parentheses
      return;
    }

    setTimeout(async () => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO PAY 1 <img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'> TO RESCUE A BYSTANDER?",
        "Yes",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "WEAVE A WEB OF LIES";

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
          "url('Visual Assets/Schemes/PtTR_weaveAWebOfLies.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = async () => {
        onscreenConsole.log(
          `Weave a Web of Lies: 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> paid to rescue a Bystander.`,
        );
        totalRecruitPoints -= 1;
        closeInfoChoicePopup();
        await rescueBystander(); // Fixed: added await
        resolve(); // Fixed: added parentheses
      };

      denyButton.onclick = () => {
        onscreenConsole.log(
          `Weave a Web of Lies: You have chosen not to rescue a Bystander.`,
        );
        closeInfoChoicePopup();
        resolve(); // Fixed: added parentheses
      };
    }, 10);
  });
}

async function spliceHumansWithSpiderDNATwist() {
  updateGameBoard();

  // Filter victory pile for sinisterSix cards
  const sinisterSixInVP = victoryPile.filter(
    (card) => card.team === "Sinister Six",
  );

  if (sinisterSixInVP.length === 0) {
    onscreenConsole.log("No Sinister Six Villains available in Victory Pile. A Villain card is still drawn.");
    await drawVillainCard();
    return false;
  }

  if (sinisterSixInVP.length === 1) {
    // Only one sinisterSix - automatically return it to villain deck
    const sinisterVillain = sinisterSixInVP[0];
    const index = victoryPile.findIndex(
      (card) => card.id === sinisterVillain.id,
    );
    if (index !== -1) {
      onscreenConsole.log(
        `<span class="console-highlights">${sinisterVillain.name}</span> was the only Sinister Six Villain in your Victory Pile. Playing now.`,
      );
      victoryPile.splice(index, 1);
      villainDeck.push(sinisterVillain);
      await drawVillainCard(); // Trigger villain card draw
      return true;
    }
    return false;
  }

  // Multiple sinisterSix - show selection popup
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
    titleElement.textContent = "SCHEME TWIST";
    instructionsElement.innerHTML =
      "Select a Sinister Six Villain from your Victory Pile to play.";

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
          "Select a Sinister Six Villain from your Victory Pile to play.";
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

    // Create card elements for each sinisterSix in victory pile
    sinisterSixInVP.forEach((card) => {
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

    if (sinisterSixInVP.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (sinisterSixInVP.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (sinisterSixInVP.length > 5) {
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

async function weaveAWebOfLiesTwist() {
  stackedTwistNextToMastermind++;
  const mastermind = getSelectedMastermind();
  updateGameBoard();
}

async function theCloneSagaTwist() {
  const cardsYouHave = [
    ...playerHand,
    ...playerArtifacts,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true && !card.markedForDeletion && !card.isSimulation
    ),
  ];

  // Get all non-grey Hero cards
  const nonGreyHeroes = cardsYouHave.filter(
    (item) => item.type === "Hero" && item.color !== "Grey"
  );

  // Check for duplicates more reliably
  const nameCounts = {};
  nonGreyHeroes.forEach(card => {
    nameCounts[card.name] = (nameCounts[card.name] || 0) + 1;
  });

  const hasDuplicate = Object.values(nameCounts).some(count => count >= 2);

  if (!hasDuplicate) {
    onscreenConsole.log(
      `You are unable to reveal two non-grey Heroes with the same card name.`,
    );
    await theCloneSagaDiscard();
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
          "DO YOU WISH TO REVEAL TWO NON-GREY HEROES WITH MATCHING CARD NAMES TO AVOID DISCARDING?",
          "Reveal Heroes",
          "Discard",
        );

        // Update title
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "SCHEME TWIST";

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
            "url('Visual Assets/Schemes/PtTR_theCloneSaga.webp')";
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
            `You are able to reveal two non-grey Heroes with the same card name and have escaped discarding!`,
          );
          cleanup();
        };

        denyButton.onclick = async () => {
          onscreenConsole.log(
            `You have chosen not to reveal two non-grey Heroes with the same card name.`,
          );
          cleanup();
          await theCloneSagaDiscard();
        };
      }, 10);
    });
  }
}

async function theCloneSagaDiscard() {
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
    titleElement.textContent = "Scheme Twist";
    instructionsElement.innerHTML =
      "Select cards to discard until you have 3 cards remaining.";

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
    const requiredRemaining = 3;
    const cardsToDiscard = playerHand.length - requiredRemaining;

    if (cardsToDiscard <= 0) {
      onscreenConsole.log(
        "You already have 3 or fewer cards in hand. No cards to discard.",
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
        instructionsElement.innerHTML = `Select ${cardsToDiscard} cards to discard (leaving 3 in hand).`;
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
      if (selectedCards.length !== cardsToDiscard) return;
      closeCardChoicePopup();

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
            `Discarded ${formattedNames} to satisfy Scheme Twist.`,
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

//Keywords

async function wallCrawlRecruit(card) {
  return new Promise((resolve) => {
    const drawChoicePopup = document.querySelector(".draw-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const drawChoicePopupTitle = document.querySelector(".draw-choice-popup-title");
    const drawChoicePopupInstructions = document.querySelector(".draw-choice-popup-instructions");
    const cardNameElement = document.getElementById("draw-choice-card-name");
    const previewElement = document.querySelector(".draw-choice-popup-preview");
    const confirmButton = document.getElementById("draw-choice-popup-confirm");
    const noThanksButton = document.getElementById("draw-choice-popup-nothanks");

    // Track modal overlay's original state
    const wasModalOverlayVisible = modalOverlay && modalOverlay.style.display === "block";

    drawChoicePopupTitle.innerHTML = `WALL-CRAWL`;
    drawChoicePopupInstructions.innerHTML = `Wall-Crawl allows you to put this card on top of your deck. Where do you wish to recruit to?`;
    confirmButton.innerHTML = `TOP OF DECK`;
    noThanksButton.innerHTML = `DISCARD PILE`;

    // Populate popup content
    if (cardNameElement) {
      cardNameElement.textContent = card.name;
    }

    if (previewElement) {
      previewElement.style.backgroundImage = `url('${card.image}')`;
      previewElement.style.backgroundSize = "contain";
      previewElement.style.backgroundRepeat = "no-repeat";
      previewElement.style.backgroundPosition = "center";
    }

    // Set up button handlers
    const onConfirm = async () => {
      playSFX("wall-crawl");
      onscreenConsole.log(
        `<span class="console-highlights">${card.name}</span> has been put on top of your deck.`,
      );
      closeDrawChoicePopup(wasModalOverlayVisible);
      
      // Clean up event listeners
      confirmButton.removeEventListener('click', onConfirm);
      noThanksButton.removeEventListener('click', onNoThanks);
      
      // Handle stingOfTheSpider BEFORE resolving
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(card);
      }
      
      // Return both destinationId and location
      resolve({
        destinationId: "player-deck-cell",
        location: "deck"
      });
    };

    const onNoThanks = () => {
      onscreenConsole.log(
        `<span class="console-highlights">${card.name}</span> has been added to your discard pile.`,
      );
      closeDrawChoicePopup(wasModalOverlayVisible);
      
      // Clean up event listeners
      confirmButton.removeEventListener('click', onConfirm);
      noThanksButton.removeEventListener('click', onNoThanks);
      
      resolve({
        destinationId: "discard-pile-cell",
        location: "discard"
      });
    };

    // Use addEventListener instead of onclick to avoid overwriting
    confirmButton.addEventListener('click', onConfirm);
    noThanksButton.addEventListener('click', onNoThanks);

    // Show the popup
    if (modalOverlay && !wasModalOverlayVisible) {
      modalOverlay.style.display = "block";
    }

    if (drawChoicePopup) {
      drawChoicePopup.style.display = "block";
    }
  });
}

//Villains

async function carrionFeast() {
  if (playerDeck.length === 0) {
    if (playerDiscardPile.length > 0) {
      playerDeck = shuffle(playerDiscardPile);
      playerDiscardPile = [];
    } else {
      onscreenConsole.log(
        `No cards available for <span class="console-highlights">Carrion</span> to feast upon.`,
      );
      return;
    }
  }
  const topCard = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCard);
  playSFX("feast");
  onscreenConsole.log(
    `<span class="console-highlights">Carrion</span> feasted upon <span class="console-highlights">${topCard.name}</span>, KOing them.`,
  );
  koBonuses();
  updateGameBoard();
  if (topCard.type === "Hero" && topCard.cost > 0) {
    carrionHeroFeast = true;
  }
}

function demogoblinAmbush(demogoblin) {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Demogoblin</span> captures a Bystander!`,
  );
  if (bystanderDeck.length === 0) {
    onscreenConsole.log(`There are no Bystanders left to be captured.`);
    return;
  }

  // If only 1 bystander, automatically capture it
  if (bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
    const demogoblinIndex = city.findIndex((c) => c === demogoblin);
    attachBystanderToVillain(demogoblinIndex, card);
    updateGameBoard();
  }
}

async function demogoblinFeast() {
  if (playerDeck.length === 0) {
    if (playerDiscardPile.length > 0) {
      playerDeck = shuffle(playerDiscardPile);
      playerDiscardPile = [];
    } else {
      onscreenConsole.log(
        `No cards available for <span class="console-highlights">Demogoblin</span> to feast upon.`,
      );
      return;
    }
  }
  const topCard = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCard);
  playSFX("feast");
  onscreenConsole.log(
    `<span class="console-highlights">Demogoblin</span> feasted upon <span class="console-highlights">${topCard.name}</span>, KOing them.`,
  );
  koBonuses();
  updateGameBoard();
}

async function doppelgangerFeast() {
  if (playerDeck.length === 0) {
    if (playerDiscardPile.length > 0) {
      playerDeck = shuffle(playerDiscardPile);
      playerDiscardPile = [];
    } else {
      onscreenConsole.log(
        `No cards available for <span class="console-highlights">Doppelganger</span> to feast upon.`,
      );
      return;
    }
  }
  const topCard = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCard);
  playSFX("feast");
  onscreenConsole.log(
    `<span class="console-highlights">Doppelganger</span> feasted upon <span class="console-highlights">${topCard.name}</span>, KOing them.`,
  );
  koBonuses();
  updateGameBoard();
}

async function shriekFeast() {
  if (playerDeck.length === 0) {
    if (playerDiscardPile.length > 0) {
      playerDeck = shuffle(playerDiscardPile);
      playerDiscardPile = [];
    } else {
      onscreenConsole.log(
        `No cards available for <span class="console-highlights">Shriek</span> to feast upon.`,
      );
      return;
    }
  }
  const topCard = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCard);
  playSFX("feast");
  onscreenConsole.log(
    `<span class="console-highlights">Shriek</span> feasted upon <span class="console-highlights">${topCard.name}</span>, KOing them.`,
  );
  koBonuses();

  if (topCard.cost === 0) {
    onscreenConsole.log(
      `<span class="console-highlights">${topCard.name}</span> cost 0, so <span class="console-highlights">Shriek</span> forces you to gain a Wound!`,
    );
    await drawWound();
  } else {
    onscreenConsole.log(
      `Thankfully, <span class="console-highlights">${topCard.name}</span> did not cost 0 and you have escaped gaining a Wound.`,
    );
  }

  updateGameBoard();
}

async function shriekEscape() {
  onscreenConsole.log(
    `Escape! <span class="console-highlights">Shriek</span> escapes, forcing you to gain a Wound!`,
  );
  await drawWound();
  updateGameBoard();
}

async function chameleonFight(card) {
  return new Promise((resolve) => {
    // Create a clean copy of the card
    const cardCopy = JSON.parse(JSON.stringify(card));
    
    // Remove any transformation properties from the copy
    delete cardCopy.originalAttributes;
    delete cardCopy.isCopied;
    delete cardCopy.markedToDestroy;
    
    // Mark for cleanup and add to played cards
    cardCopy.markedForDeletion = true;
    cardCopy.isSimulation = true;
    cardsPlayedThisTurn.push(cardCopy);

    // Apply the card's stats
    totalAttackPoints += cardCopy.attack || 0;
    totalRecruitPoints += cardCopy.recruit || 0;
    cumulativeAttackPoints += cardCopy.attack || 0;
    cumulativeRecruitPoints += cardCopy.recruit || 0;

    console.log("Chameleon Copy Called:", cardCopy.name);

    // Execute abilities using the helper - NO POPUP, auto-execute
    executeAbilityWithSpecialCases(cardCopy, "chameleon", {
      skipStats: true, // Stats already added above
      autoActivate: true // Always auto-activate for Chameleon
    })
      .then(() => {
        updateGameBoard();
        addHRToTopWithInnerHTML();
        resolve();
      })
      .catch((error) => {
        console.error("Error in chameleonFight:", error);
        updateGameBoard();
        addHRToTopWithInnerHTML();
        resolve();
      });
  });
}

async function hobgoblinAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Hobgoblin</span> helps each Sinister Six Villain capture a Bystander!`,
  );
  if (bystanderDeck.length === 0) {
    onscreenConsole.log(`There are no Bystanders left to be captured.`);
    return;
  }

  if (city[4] && city[4].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
    const index = 4;
    await attachBystanderToVillain(index, card);
    updateGameBoard();
  }

  if (city[3] && city[3].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
    const index = 3;
    await attachBystanderToVillain(index, card);
    updateGameBoard();
  }

  if (city[2] && city[2].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
    const index = 2;
    await attachBystanderToVillain(index, card);
    updateGameBoard();
  }

  if (city[1] && city[1].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
    const index = 1;
    await attachBystanderToVillain(index, card);
    updateGameBoard();
  }

  if (city[0] && city[0].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
    const index = 0;
    await attachBystanderToVillain(index, card);
    updateGameBoard();
  }
}

let kravenEscapeRunning = false;

async function kravenTheHunterEscape() {
  if (kravenEscapeRunning) return; // guard
  kravenEscapeRunning = true;
  try {
    onscreenConsole.log(
      `Escape! <span class="console-highlights">Kraven the Hunter</span> also KOs the highest cost Hero in the HQ.`,
    );

    const heroesInHQ = hq.filter((c) => c && c.type === "Hero");
    if (heroesInHQ.length === 0) {
      onscreenConsole.log("No Heroes available in the HQ.");
      return;
    }

    const maxCost = Math.max(...heroesInHQ.map((h) => h.cost ?? -Infinity));
    const highestCostHeroes = heroesInHQ.filter((h) => h.cost === maxCost);

    if (highestCostHeroes.length === 1) {
      koHeroKraven(highestCostHeroes[0]);
    } else {
      await showHeroSelectionPopupKO(highestCostHeroes, koHeroKraven);
    }
  } finally {
    kravenEscapeRunning = false;
  }
}

function koHeroKraven(hero) {
  // Find the index of the hero in HQ
  const heroIndex = hq.indexOf(hero);

  if (heroIndex === -1) {
    console.log("Hero not found in HQ.");
    return;
  }

  // Move the hero to KO pile
  koPile.push(hero);

  // Replace the hero's HQ space with the top card from the hero deck, if available
  hq[heroIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;

  // Check if the HQ space is empty after drawing
  if (!hq[heroIndex]) {
    showHeroDeckEmptyPopup();
  }

  onscreenConsole.log(
    `<span class="console-highlights">Kraven the Hunter</span> also KO'd <span class="console-highlights">${hero.name}</span>.`,
  );

  // Trigger KO bonuses and update game board
  koBonuses();
  updateGameBoard();
}

function koHero(hero) {
  // Find the index of the hero in HQ
  const heroIndex = hq.indexOf(hero);

  if (heroIndex === -1) {
    console.log("Hero not found in HQ.");
    return;
  }

  // Move the hero to KO pile
  koPile.push(hero);

  // Replace the hero's HQ space with the top card from the hero deck, if available
  hq[heroIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;

  // Check if the HQ space is empty after drawing
  if (!hq[heroIndex]) {
    showHeroDeckEmptyPopup();
  }

  onscreenConsole.log(
    `<span class="console-highlights">Carrion</span> feasted upon <span class="console-highlights">${hero.name}</span>, KOing them.`,
  );

  // Trigger KO bonuses and update game board
  koBonuses();
  updateGameBoard();
}

function showHeroSelectionPopupKO(heroes, onHeroSelected) {
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
    titleElement.innerHTML = `KRAVEN THE HUNTER`;
    instructionsElement.innerHTML =
      "There are multiple heroes with the same cost to KO. Select one.";

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
                "There are multiple heroes with the same cost to KO. Select one.";
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
              instructionsElement.innerHTML = `Selected: <span class="console-highlights">${hero.name}</span> will be KO'd.`;
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
      onscreenConsole.log("No eligible Heroes available to KO.");
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
          console.log("Selected Hero to KO:", hero.name);
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

async function sandmanEscape() {
  onscreenConsole.log(
    `Escape! <span class="console-highlights">Sandman</span> requires you to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero or gain a Wound!`,
  );

  const cardsYouHave = [
    ...playerHand,
    ...playerArtifacts,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true && !card.markedForDeletion && !card.isSimulation
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
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "SANDMAN";

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
            "url('Visual Assets/Villains/PtTR_SinisterSix_Sandman.webp')";
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

async function vultureEscape() {
  onscreenConsole.log(
    `Escape! <span class="console-highlights">Vulture</span> requires you to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero or gain a Wound!`,
  );

  const cardsYouHave = [
    ...playerHand,
    ...playerArtifacts,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true && !card.markedForDeletion && !card.isSimulation
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
        document.querySelector(".info-or-choice-popup-title").innerHTML =
          "VULTURE";

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
            "url('Visual Assets/Villains/Vulture.webp')";
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

async function shockerAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Shocker</span> forces you to reveal an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero or discard!`,
  );

  const cardsYouHave = [
    ...playerHand,
    ...playerArtifacts,
    ...cardsPlayedThisTurn.filter(
      (card) => card.isCopied !== true && card.sidekickToDestroy !== true && !card.markedForDeletion && !card.isSimulation
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
          "SHOCKER";

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
            "url('Visual Assets/Villains/PtTR_SinisterSix_Shocker.webp')";
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

async function vultureAmbush() {
  onscreenConsole.log(
    `Ambush! <span class="console-highlights">Vulture</span> may move deeper into the city.`,
  );

  const villainAtZero = city[0];
  const villainAtTwo = city[2];
  const villainAtFour = city[4];

  // Scenario 1: Both city[0] and city[2] are empty
  if (!villainAtZero && !villainAtTwo) {
    onscreenConsole.log(
      `No villains on the Rooftops or Bridge to swap <span class="console-highlights">Vulture</span> with.`,
    );
    return Promise.resolve(false);
  }

  // Scenario 2: Only one of city[0] or city[2] is occupied
  if ((villainAtZero && !villainAtTwo) || (!villainAtZero && villainAtTwo)) {
    const sourceIndex = villainAtZero ? 0 : 2;
    const sourceName = villainAtZero ? "Bridge" : "Rooftops";

    // Perform the swap
    if (villainAtFour) {
      onscreenConsole.log(
        `<span class="console-highlights">${city[sourceIndex].name}</span> from ${sourceName} swapped places with <span class="console-highlights">${city[4].name}</span>.`,
      );
    } else {
      onscreenConsole.log(
        `<span class="console-highlights">${city[sourceIndex].name}</span> moved from ${sourceName} to the Sewers.`,
      );
    }

    // Swap the villains
    const temp = city[sourceIndex];
    city[sourceIndex] = city[4];
    city[4] = temp;

    updateGameBoard();
    return Promise.resolve(true);
  }

  // Scenario 3: Both city[0] and city[2] contain villains - show selection popup
  return new Promise((resolve) => {
    // Elements for the popup and overlay
    const popup = document.getElementById("villain-movement-popup");
    const overlay = document.getElementById("modal-overlay");
    const noThanksButton = document.getElementById(
      "no-thanks-villain-movement",
    );
    noThanksButton.style.display = "none";
    document.getElementById("villain-movement-context").innerHTML =
      'Swap <span class="console-highlights">Vulture</span> with the Villain on the Rootops or Bridge.';
    const confirmButton = document.getElementById("confirm-villain-movement");
    const selectionArrow = document.getElementById("selection-arrow");
    confirmButton.disabled = true;

    // Elements representing the rows in the table
    const villainCells = {
      bridge: document.getElementById("villain-bridge"),
      streets: document.getElementById("villain-streets"),
      rooftops: document.getElementById("villain-rooftops"),
      bank: document.getElementById("villain-bank"),
      sewers: document.getElementById("villain-sewers"),
    };

    let selectedCell = null;

    function isCellDestroyed(cellElement) {
      const destroyedImage = cellElement.querySelector(".destroyed-space");
      return (
        destroyedImage !== null &&
        destroyedImage.src.includes("Galactus_MasterStrike.webp")
      );
    }

    function selectCell(cellElement) {
      // Don't allow selection of destroyed spaces
      if (isCellDestroyed(cellElement)) {
        console.log("Destroyed space selected, no action.");
        return;
      }

      const cellKey = Object.keys(villainCells).find(
        (key) => villainCells[key] === cellElement,
      );

      // Only allow selection of Bridge (index 0) or Rooftops (index 2)
      if (cellKey !== "bridge" && cellKey !== "rooftops") {
        console.log("Only Bridge or Rooftops can be selected for this swap.");
        return;
      }

      const cellIndex = cellKey === "bridge" ? 0 : 2;

      // If clicking the same cell, deselect it
      if (selectedCell === cellElement) {
        cellElement.classList.remove("selected");
        selectedCell = null;
        selectionArrow.style.display = "none";
        confirmButton.disabled = true;
        console.log("Deselected cell");
        return;
      }

      // Select the new cell
      if (selectedCell) {
        selectedCell.classList.remove("selected");
      }

      cellElement.classList.add("selected");
      selectedCell = cellElement;
      confirmButton.disabled = false;

      // Draw arrow from selected cell to sewers (city[4])
      drawArrow(selectedCell, villainCells.sewers);
      console.log(`Selected ${cellKey} for swap`);
    }

    function updateCityCellsInPopup() {
      for (let i = 0; i < city.length; i++) {
        const cityCellKey = Object.keys(villainCells)[i];
        const cityCellElement = villainCells[cityCellKey];
        cityCellElement.innerHTML = "";
        cityCellElement.classList.remove("destroyed");
        cityCellElement.classList.remove("greyed-out"); // Remove any existing greyed-out class

        // Check if this space is destroyed
        if (destroyedSpaces[i]) {
          const cardContainer = document.createElement("div");
          cardContainer.classList.add("card-container");
          cityCellElement.appendChild(cardContainer);

          const cardImage = document.createElement("img");
          cardImage.src =
            "Visual Assets/Masterminds/Galactus_MasterStrike.webp";
          cardImage.alt = "Destroyed City Space";
          cardImage.classList.add("destroyed-space");
          cardContainer.appendChild(cardImage);

          cityCellElement.classList.add("destroyed");
          continue;
        }

        // Create card container
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        cityCellElement.appendChild(cardContainer);

        if (city[i]) {
          // Create villain card image
          const cardImage = document.createElement("img");
          cardImage.src = city[i].image;
          cardImage.classList.add("villain-movement-card-image");
          cardContainer.appendChild(cardImage);

          // Add Dark Portal overlay if present
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }

          // Add bystander overlay if present
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

          // Add other overlays as needed (killbot, babyHope, etc.)
          // ... include other overlay logic from your original function as needed
        } else {
          // Add blank card for empty space
          const blankCardImage = document.createElement("img");
          blankCardImage.src = "Visual Assets/BlankCardSpace.webp";
          blankCardImage.classList.add("villain-movement-card-image");
          cardContainer.appendChild(blankCardImage);

          // Add Dark Portal overlay if present
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }
        }

        // Grey out and disable non-rooftop/bridge cells (Streets, Bank, Sewers)
        if (i !== 0 && i !== 2) {
          cityCellElement.classList.add("greyed-out");
          cityCellElement.onclick = null;
        } else {
          // Add click event listeners only for Bridge and Rooftops
          if (!destroyedSpaces[i]) {
            cityCellElement.onclick = () => selectCell(cityCellElement);
          } else {
            cityCellElement.onclick = null;
          }
        }

        cityCellElement.classList.add("city-cell");
      }
    }

    function hidePopup() {
      if (selectedCell) {
        selectedCell.classList.remove("selected");
        selectedCell = null;
      }
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

    // Update city cells and show popup
    updateCityCellsInPopup();
    popup.style.display = "block";
    overlay.style.display = "block";

    confirmButton.onclick = () => {
      if (selectedCell) {
        const cellKey = Object.keys(villainCells).find(
          (key) => villainCells[key] === selectedCell,
        );
        const sourceIndex = cellKey === "bridge" ? 0 : 2;
        const sourceName = cellKey === "bridge" ? "Bridge" : "Rooftops";

        // Perform the swap
        if (city[4]) {
          onscreenConsole.log(
            `<span class="console-highlights">${city[sourceIndex].name}</span> from ${sourceName} swapped with <span class="console-highlights">${city[4].name}</span>.`,
          );
        } else {
          onscreenConsole.log(
            `<span class="console-highlights">${city[sourceIndex].name}</span> moved.`,
          );
        }

        const temp = city[sourceIndex];
        city[sourceIndex] = city[4];
        city[4] = temp;

        hidePopup();
        updateGameBoard();
        resolve(true);
      } else {
        resolve(false);
      }
    };
  });
}

//Heroes

function blackCatPickpocket() {
  if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
    return;
  }

  if (playerDeck.length === 0 && playerDiscardPile.length > 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];
  topCardPlayerDeck.revealed = true;
  const topCardPlayerDeckAttackAndRecruit =
    topCardPlayerDeck.attack + topCardPlayerDeck.recruit;

  totalAttackPoints += topCardPlayerDeckAttackAndRecruit;
  cumulativeAttackPoints += topCardPlayerDeckAttackAndRecruit;

  onscreenConsole.log(
    `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. They have ${topCardPlayerDeck.attack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${topCardPlayerDeck.recruit} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">. You get +${topCardPlayerDeckAttackAndRecruit} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
  updateGameBoard();
}

function blackCatCasualBankRobbery() {
  hq4ReserveRecruit++;
  onscreenConsole.log(
    `You gain 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> usable only to recruit the Hero in the HQ Space under the Bank.`,
  );
  updateGameBoard();
}

function blackCatJinx() {
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

    const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

    topCardPlayerDeck.revealed = true;

    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: <span class="bold-spans">${topCardPlayerDeck.name}</span>. Do you wish to discard or return to deck?`,
      "Discard",
      "Return to Deck",
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

      console.log(`You discarded ${topCardPlayerDeck.name}.`);
      onscreenConsole.log(
        `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been discarded.`,
      );
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
  });
}

function blackCatCatBurglarNonEffect() {
  onscreenConsole.log(
    `Special Ability not activated - "each other player" Hero effects do not apply in Solo play.`,
  );
}

function blackCatCatBurglar() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Spider Friends.svg" alt="Spider Friends Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );

  const count = Number(bystandersRescuedThisTurn) || 0;
  const plural = count === 1 ? "" : "s";

  onscreenConsole.log(
    `You've rescued ${count} Bystander${plural} this turn. +${count} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`,
  );

  totalAttackPoints += count;
  cumulativeAttackPoints += count;
  updateGameBoard();
}

function moonKnightClimbingClaws() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `You get +1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
  );

  totalRecruitPoints += 1;
  cumulativeRecruitPoints += 1;
  updateGameBoard();
}

function moonKnightLunarCommunion() {
  onscreenConsole.log(
    `Whenever you defeat a Villain on the Rooftops this turn, you may KO one of your cards or a card from your discard pile.`,
  );

  moonKnightLunarCommunionKO += 1;
  updateGameBoard();
}

function moonKnightLunarCommunionKOChoice() {
  return new Promise((resolve) => {
    // Combine cards from artifacts, hand, and played cards with source tracking
    const artifactCards = playerArtifacts
      .filter((card) => card.type === "Hero") // Only include Hero artifacts
      .map((card) => ({ card, source: "artifacts" }));
    
    const handCards = playerHand.map((card) => ({ card, source: "hand" }));
    
    const playedCards = cardsPlayedThisTurn
      .filter((card) => !card.isCopied && !card.sidekickToDestroy && !card.markedToDestroy && !card.markedForDeletion && !card.isSimulation)
      .map((card) => ({ card, source: "played" }));

    // Combine all cards for "Your Cards" section
    const yourCards = [...artifactCards, ...handCards, ...playedCards];

    // Check if we have any cards available
    if (yourCards.length === 0 && playerDiscardPile.length === 0) {
      onscreenConsole.log(`No cards available to KO.`);
      resolve(false);
      return;
    }

    // Sort the arrays
    genericCardSort(yourCards, "card");
    genericCardSort(playerDiscardPile);

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
    titleElement.textContent = "Moon Knight - Lunar Communion";
    instructionsElement.innerHTML = `You may KO ${moonKnightLunarCommunionKO === 1 ? moonKnightLunarCommunionKO : 'up to ' + moonKnightLunarCommunionKO} of your cards or ${moonKnightLunarCommunionKO === 1 ? 'a card' : moonKnightLunarCommunionKO + ' cards'} from your discard pile.`;

    // Show both rows and labels
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "Your Cards";
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

    let selectedCards = []; // Array to track multiple selected cards
    let selectedCardImages = []; // Array to track selected card images
    let selectedLocations = []; // Array to track locations of selected cards
    let selectedSources = []; // Array to track sources of selected cards
    let isDragging = false;

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const selectedCount = selectedCards.length;
      
      confirmButton.disabled = selectedCount === 0;

      if (selectedCount === 0) {
        instructionsElement.innerHTML = `You may KO ${moonKnightLunarCommunionKO === 1 ? moonKnightLunarCommunionKO : 'up to ' + moonKnightLunarCommunionKO} of your cards or ${moonKnightLunarCommunionKO === 1 ? 'a card' : moonKnightLunarCommunionKO + ' cards'} from your discard pile.`;
      } else {
        const cardNames = selectedCards.map(card => `<span class="console-highlights">${card.name}</span>`).join(', ');
        instructionsElement.innerHTML = `Selected ${selectedCount} of ${moonKnightLunarCommunionKO} cards: ${cardNames} will be KO'd.`;
      }

      // Update confirm button text
      confirmButton.textContent = selectedCount > 0 ? `KO ${selectedCount} CARD${selectedCount > 1 ? 'S' : ''}` : "KO CARD";
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

    // Helper function to get card data consistently
    function getCardData(cardItem, location) {
      return location === "discard" ? cardItem : cardItem.card;
    }

    // Helper function to get card image consistently
    function getCardImage(cardItem, location) {
      const cardData = getCardData(cardItem, location);
      return cardData.image;
    }

    // Helper function to get card name consistently
    function getCardName(cardItem, location) {
      const cardData = getCardData(cardItem, location);
      return cardData.name;
    }

    // Helper function to get card ID consistently
    function getCardId(cardItem, location) {
      const cardData = getCardData(cardItem, location);
      return cardData.id;
    }

    // Create card element helper function
    function createCardElement(cardItem, location, source, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      
      // Use helper function to get consistent card ID
      const cardId = getCardId(cardItem, location);
      cardElement.setAttribute("data-card-id", cardId);
      cardElement.setAttribute("data-location", location);
      cardElement.setAttribute("data-source", source);

      // Create card image using helper function
      const cardImage = document.createElement("img");
      cardImage.src = getCardImage(cardItem, location);
      cardImage.alt = getCardName(cardItem, location);
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = getCardImage(cardItem, location);
        previewImage.alt = getCardName(cardItem, location);
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if no card is selected
        if (selectedCards.length === 0) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no cards are selected AND we're not hovering over another card
        if (selectedCards.length === 0) {
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

        // Use helper functions to get consistent card data
        const cardData = getCardData(cardItem, location);
        const cardId = getCardId(cardItem, location);
        const cardName = getCardName(cardItem, location);

        // Check if card is already selected
        const existingIndex = selectedCards.findIndex(card => card.id === cardId);

        if (existingIndex !== -1) {
          // Deselect card
          selectedCards.splice(existingIndex, 1);
          selectedCardImages.splice(existingIndex, 1);
          selectedLocations.splice(existingIndex, 1);
          selectedSources.splice(existingIndex, 1);
          cardImage.classList.remove("selected");
        } else {
          // Check if we've reached the limit
          if (selectedCards.length >= moonKnightLunarCommunionKO) {
            // FIFO deselection - remove the first selected card
            const removedCardImage = selectedCardImages.shift();
            if (removedCardImage) {
              removedCardImage.classList.remove("selected");
            }
            selectedCards.shift();
            selectedLocations.shift();
            selectedSources.shift();
          }

          // Select new card
          selectedCards.push(cardData);
          selectedCardImages.push(cardImage);
          selectedLocations.push(location);
          selectedSources.push(source);
          cardImage.classList.add("selected");
        }

        // Update preview to show the most recently selected card
        previewElement.innerHTML = "";
        if (selectedCards.length > 0) {
          const lastSelectedCard = selectedCards[selectedCards.length - 1];
          const previewImage = document.createElement("img");
          previewImage.src = lastSelectedCard.image;
          previewImage.alt = lastSelectedCard.name;
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

    // Populate row1 with Your Cards (Artifacts first, then Played Cards, then Hand)
    let hasAddedSection = false;
    
    // Add Artifacts section if any
    const artifactCardItems = yourCards.filter((item) => item.source === "artifacts");
    if (artifactCardItems.length > 0) {
      selectionRow1.appendChild(createSectionLabel("Artifacts"));
      hasAddedSection = true;
      artifactCardItems.forEach((cardItem) => {
        createCardElement(cardItem, "your-cards", "artifacts", selectionRow1);
      });
    }
    
    // Add Played Cards section if any
    const playedCardItems = yourCards.filter((item) => item.source === "played");
    if (playedCardItems.length > 0) {
      if (hasAddedSection) {
        selectionRow1.appendChild(createSectionLabel("Played Cards"));
      } else {
        selectionRow1.appendChild(createSectionLabel("Played Cards"));
        hasAddedSection = true;
      }
      playedCardItems.forEach((cardItem) => {
        createCardElement(cardItem, "your-cards", "played", selectionRow1);
      });
    }
    
    // Add Hand section if any
    const handCardItems = yourCards.filter((item) => item.source === "hand");
    if (handCardItems.length > 0) {
      if (hasAddedSection) {
        selectionRow1.appendChild(createSectionLabel("Hand"));
      } else {
        selectionRow1.appendChild(createSectionLabel("Hand"));
      }
      handCardItems.forEach((cardItem) => {
        createCardElement(cardItem, "your-cards", "hand", selectionRow1);
      });
    }

    // Populate row2 with Discard Pile cards
    if (playerDiscardPile.length > 0) {
      playerDiscardPile.forEach((card) => {
        createCardElement(card, "discard", "discard", selectionRow2);
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
    confirmButton.textContent = "KO CARD";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCards.length === 0) return;

      setTimeout(() => {
        let koCount = 0;

        // Process all selected cards
        selectedCards.forEach((selectedCard, index) => {
          const location = selectedLocations[index];
          const source = selectedSources[index];
          let koIndex = -1;

          if (location === "your-cards") {
            // Handle cards from artifacts, hand, or played cards
            if (source === "artifacts") {
              // Remove from artifacts
              koIndex = playerArtifacts.findIndex((c) => c.id === selectedCard.id);
              if (koIndex !== -1) {
                const koedCard = playerArtifacts.splice(koIndex, 1)[0];
                koPile.push(koedCard);
                koCount++;
              }
            } else if (source === "hand") {
              // Remove from hand
              koIndex = playerHand.findIndex((c) => c.id === selectedCard.id);
              if (koIndex !== -1) {
                const koedCard = playerHand.splice(koIndex, 1)[0];
                koPile.push(koedCard);
                koCount++;
              }
            } else if (source === "played") {
              // Mark played card for destruction
              selectedCard.markedToDestroy = true;
              koPile.push(selectedCard);
              koCount++;
            }
          } else if (location === "discard") {
            // Remove from discard pile
            koIndex = playerDiscardPile.findIndex(
              (c) => c.id === selectedCard.id,
            );
            if (koIndex !== -1) {
              const koedCard = playerDiscardPile.splice(koIndex, 1)[0];
              koPile.push(koedCard);
              koCount++;
            }
          }
        });

        if (koCount > 0) {
          const cardNames = selectedCards.map(card => card.name).join(', ');
          onscreenConsole.log(
            `<span class="console-highlights">${cardNames}</span> ${koCount === 1 ? 'has' : 'have'} been KO'd.`,
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
      onscreenConsole.log(`No cards were KO'd.`);
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function moonKnightCrescentMoonDarts() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (
    topCardPlayerDeck.classes &&
    (topCardPlayerDeck.classes.includes("Instinct") ||
      topCardPlayerDeck.classes.includes("Tech"))
  ) {
    playSFX("card-draw");
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It has been drawn.`,
    );
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It is not a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> or <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and has been returned to the top of your deck.`,
    );
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function moonKnightGoldenAnkhOfKhonshu() {
  onscreenConsole.log(
    `Whenever you defeat a Villain on the Rooftops this turn, rescue Bystanders equal to that Villain's printed Victory Points.`,
  );

  moonKnightGoldenAnkhOfKhonshuBystanders = true;
  updateGameBoard();
}

function moonKnightGoldenAnkhOfKhonshuBystanderCalculation(villainCard) {
  return new Promise(async (resolve) => {
    const numberToRescue = villainCard.victoryPoints;

    if (numberToRescue.length === 0) {
      onscreenConsole.log(
        "The defeated Villain has no Victory Points. No Bystanders rescued.",
      );
      resolve(false);
      return;
    }

    if (bystanderDeck.length === 0) {
      onscreenConsole.log("There are no Bystanders left to be rescued.");
      resolve(false);
      return;
    }

    const bystanderCount = bystanderDeck.length;

    if (numberToRescue > bystanderCount) {
      onscreenConsole.log(
        `<span class="console-highlights">${villainCard.name}</span> has ${numberToRescue} Victory Point${numberToRescue === 1 ? "" : "s"}; however, you do not have that many Bystanders remaining. All that remain will be rescued.`,
      );

      // Capture all remaining Bystanders
      while (bystanderDeck.length > 0) {
        await rescueBystander();
      }
    } else {
      onscreenConsole.log(
        `<span class="console-highlights">${villainCard.name}</span> has ${numberToRescue} Victory Points. Rescuing ${numberToRescue === 1 ? "a Bystander" : "that many Bystanders"} now.`,
      );

      // Capture exactly numberToRescue number of Bystanders
      for (let i = 0; i < numberToRescue; i++) {
        if (bystanderDeck.length > 0) {
          await rescueBystander();
        }
      }
    }

    updateGameBoard();
    resolve(true);
  });
}

function moonKnightGoldenAnkhOfKhonshuTech() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );

  if (isCityEmpty()) {
    onscreenConsole.log(`No Villains in the city to move.`);
    return Promise.resolve(false);
  }

  // Elements for the popup and overlay
  const popup = document.getElementById("villain-movement-popup");
  const overlay = document.getElementById("modal-overlay");
  const noThanksButton = document.getElementById("no-thanks-villain-movement");
  document.getElementById("villain-movement-context").innerHTML =
    "You may move a Villain to the Rooftops. If another Villain is already there, swap them.";
  const confirmButton = document.getElementById("confirm-villain-movement");
  const selectionArrow = document.getElementById("selection-arrow");
  confirmButton.disabled = true; // Disable the confirm button initially

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
    // Don't allow selection of destroyed spaces
    if (isCellDestroyed(cellElement)) {
      console.log("Destroyed space selected, no action.");
      return;
    }

    const cellText = cellElement.textContent.trim();
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

      // Check if Rooftops is a valid target
      const rooftopsCell = villainCells.rooftops;
      const rooftopsIndex = Object.values(villainCells).indexOf(rooftopsCell);

      // If first selected villain is already at Rooftops, don't allow selection
      if (firstSelectedIndex === rooftopsIndex) {
        onscreenConsole.log(
          `The selected Villain is already at the Rooftops. Please select a different Villain.`,
        );
        cellElement.classList.remove("selected");
        selectedCells = [];
        firstSelectedIndex = null;
        return;
      }

      // Enable confirm button since we have a valid selection for Rooftops
      confirmButton.disabled = false;
      drawArrow(selectedCells[0], villainCells.rooftops);
      return;
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

            if (city[i].shards && city[i].shards > 0) {
      const shardsOverlay = document.createElement("div");
      shardsOverlay.classList.add("villain-shards-class");
      shardsOverlay.innerHTML = `<span class="villain-shards-count">${city[i].shards}</span><img src="Visual Assets/Icons/Shards.svg" alt="Shards" class="villain-shards-overlay">`;
      cardContainer.appendChild(shardsOverlay);
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

  return new Promise((resolve) => {
    // Update city cells with the current game state in the popup
    updateCityCellsInPopup();

    // Show the popup and overlay
    popup.style.display = "block";
    overlay.style.display = "block";

    noThanksButton.onclick = () => {
      hidePopup();
      onscreenConsole.log(`You chose to not move any Villains.`);
      resolve(false);
    };

    confirmButton.onclick = async () => {
      if (selectedCells.length === 1) {
        const firstCell = selectedCells[0];
        const rooftopsCell = villainCells.rooftops;

        // Find the index of the first cell and rooftops in the city array
        const firstIndex = Object.values(villainCells).indexOf(firstCell);
        const rooftopsIndex = Object.values(villainCells).indexOf(rooftopsCell);

        if (firstIndex === -1 || rooftopsIndex === -1) {
          console.error("Could not find the index of the selected cells.");
          resolve(false);
          return;
        }

        // Check if the Rooftops is empty or has a villain
        const rooftopsImage = rooftopsCell.querySelector("img");
        const isRooftopsEmpty =
          rooftopsImage && rooftopsImage.src.includes("BlankCardSpace.webp");

        if (isRooftopsEmpty) {
          // Move the villain to the empty Rooftops
          console.log("Moving villain to empty Rooftops");
          onscreenConsole.log(
            `<span class="console-highlights">${city[firstIndex].name}</span> moved to the Rooftops.`,
          );

          city[rooftopsIndex] = city[firstIndex]; // Move the villain to Rooftops
          city[firstIndex] = null; // Clear the original space
        } else if (city[rooftopsIndex] && city[firstIndex]) {
          // Both cells have villains, perform the swap
          console.log("Swapping villains with Rooftops");
          onscreenConsole.log(
            `<span class="console-highlights">${city[firstIndex].name}</span> swapped places with <span class="console-highlights">${city[rooftopsIndex].name}</span> at the Rooftops.`,
          );

          // Perform the swap
          const temp = city[rooftopsIndex];
          city[rooftopsIndex] = city[firstIndex];
          city[firstIndex] = temp;
        } else {
          console.error("Cannot move to Rooftops: invalid state.");
          resolve(false);
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
        resolve(true);
      } else {
        resolve(false);
      }
    };
  });
}

function scarletSpiderFlipOut() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Spider Friends.svg" alt="Spider Friends Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );

  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to draw.`);
    return;
  }

  extraDraw();
}

function scarletSpiderPerfectHunter() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to draw.`);
    return;
  }

  extraDraw();
}

function scarletSpiderLeapFromAbove() {
  onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  onscreenConsole.log(
    `You get +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );

  totalAttackPoints += 2;
  cumulativeAttackPoints += 2;
  updateGameBoard();
}

function scarletSpiderStingOfTheSpider() {
  onscreenConsole.log(
    `Whenever you put a card on top of your deck this turn, you may draw that card.`,
  );
  stingOfTheSpider = true;
  updateGameBoard();
}

function scarletSpiderStingOfTheSpiderDrawChoice(card) {
  return new Promise(async (resolve) => {
    const drawChoicePopup = document.querySelector(".draw-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const cardNameElement = document.getElementById("draw-choice-card-name");
    const previewElement = document.querySelector(".draw-choice-popup-preview");
    const confirmButton = document.getElementById("draw-choice-popup-confirm");
    const noThanksButton = document.getElementById(
      "draw-choice-popup-nothanks",
    );

    // Track modal overlay's original state
    const wasModalOverlayVisible =
      modalOverlay && modalOverlay.style.display === "block";

    // Safety check - ensure card exists and is still in playerDeck
    if (!card) {
      console.warn("Sting of the Spider: No card provided");
      resolve();
      return;
    }

    // Verify the card is still in playerDeck
    const cardInDeck = playerDeck.includes(card);
    if (!cardInDeck) {
      console.warn(
        `Sting of the Spider: Card ${card.name} not found in player deck`,
      );
      resolve();
      return;
    }

    // Populate popup content
    if (cardNameElement) {
      cardNameElement.textContent = card.name;
    }

    if (previewElement) {
      previewElement.style.backgroundImage = `url('${card.image}')`;
      previewElement.style.backgroundSize = "contain";
      previewElement.style.backgroundRepeat = "no-repeat";
      previewElement.style.backgroundPosition = "center";
    }

    // Set up button handlers
    confirmButton.onclick = async () => {
      // Remove card from deck and add to hand
      const deckIndex = playerDeck.indexOf(card);
      if (deckIndex !== -1) {
        playerDeck.splice(deckIndex, 1);
        playerHand.push(card);

        // Log the draw
        onscreenConsole.log(
          `Drew <span class="console-highlights">${card.name}</span> from deck.`,
        );
        updateGameBoard();
      }

      closeDrawChoicePopup(wasModalOverlayVisible);
      resolve();
    };

    noThanksButton.onclick = () => {
      closeDrawChoicePopup(wasModalOverlayVisible);
      resolve();
    };

    // Show the popup - only show modal overlay if it's not already visible
    if (modalOverlay && !wasModalOverlayVisible) {
      modalOverlay.style.display = "block";
    }

    if (drawChoicePopup) drawChoicePopup.style.display = "block";
  });
}

function closeDrawChoicePopup(wasModalOverlayVisible) {
  const drawChoicePopup = document.querySelector(".draw-choice-popup");
  const modalOverlay = document.getElementById("modal-overlay");
  const cardNameElement = document.getElementById("draw-choice-card-name");
  const previewElement = document.querySelector(".draw-choice-popup-preview");
  const confirmButton = document.getElementById("draw-choice-popup-confirm");
  const noThanksButton = document.getElementById("draw-choice-popup-nothanks");
  const drawChoicePopupTitle = document.querySelector(
    ".draw-choice-popup-title",
  );
  const drawChoicePopupInstructions = document.querySelector(
    ".draw-choice-popup-instructions",
  );

  drawChoicePopupTitle.innerHTML = `DRAW`;
  drawChoicePopupInstructions.innerHTML = `<span class="console-highlights">Scarlet Spider - Sting of the Spider</span> allows you to draw the card just placed on your deck. Would you like to draw <span id="draw-choice-card-name" class="console-highlights"></span>?`;
  confirmButton.innerHTML = `YES`;
  noThanksButton.innerHTML = `NO THANKS!`;

  // Nullify onclick handlers to prevent memory leaks and duplicate triggers
  if (confirmButton) confirmButton.onclick = null;
  if (noThanksButton) noThanksButton.onclick = null;

  // Reset popup content
  if (drawChoicePopup) drawChoicePopup.style.display = "none";
  if (cardNameElement) cardNameElement.textContent = "";
  if (previewElement) {
    previewElement.style.backgroundImage = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";
  }

  // Only hide modal overlay if we're the ones who showed it
  if (modalOverlay && !wasModalOverlayVisible) {
    modalOverlay.style.display = "none";
  }
}

async function spiderWomanRadioactiveSpider() {
  return new Promise((resolve) => {
    // Check if there are any cards to place on deck
    if (playerHand.length === 0) {
      console.log("No cards in Hand. You are unable to play this card.");
      const unplayedCard = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1];
      playerHand.push(unplayedCard);
      cardsPlayedThisTurn.pop(unplayedCard);
      totalAttackPoints -= unplayedCard.attack;
      totalRecruitPoints -= unplayedCard.recruit;
      cumulativeAttackPoints -= unplayedCard.attack;
      cumulativeRecruitPoints -= unplayedCard.recruit;
      updateGameBoard();
      onscreenConsole.log(
        "No cards in Hand to put on your deck. You are unable to play this card.",
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
    titleElement.textContent = "Spider-Woman - Radioactive Spider";
    instructionsElement.innerHTML =
      'Select a card to put on top of your deck in order to play <span class="console-highlights">Spider-Woman - Radioactive Spider</span>.';

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
            'Select a card to put on top of your deck in order to play <span class="console-highlights">Spider-Woman - Radioactive Spider</span>.';
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
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be put on top of your deck.`;
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
    confirmButton.textContent = "Confirm";
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
        const chosenCard = playerHand.splice(index, 1)[0];

        onscreenConsole.log(
          `You have put <span class="console-highlights">${chosenCard.name}</span> on top of your deck, allowing you to play <span class="console-highlights">Spider-Woman - Radioactive Spider</span>.`,
        );

        closeCardChoicePopup();

        playerDeck.push(chosenCard);
        chosenCard.revealed = true;
      }
      if (stingOfTheSpider) {
        await scarletSpiderStingOfTheSpiderDrawChoice(chosenCard);
      }
      updateGameBoard();
      resolve(true);
    };

    // Close button handler (Cancel action)
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      console.log("Card cannot be played since no card was selected.");
      onscreenConsole.log(
        `You have chosen not to put a card on top of your deck, preventing you from playing <span class="console-highlights">Spider-Woman - Radioactive Spider</span>.`,
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

function spiderWomanBioelectricShock() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (
    topCardPlayerDeck.attackIcon === "true" ||
    topCardPlayerDeck.attackIcon === true
  ) {
    playSFX("card-draw");
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> which has a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon. It has been drawn.`,
    );
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It does not have a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon and has been returned to the top of your deck.`,
    );
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function spiderWomanVenomBlast() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (
    topCardPlayerDeck.recruitIcon === "true" ||
    topCardPlayerDeck.recruitIcon === true
  ) {
    playSFX("card-draw");
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> which has a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon. It has been drawn.`,
    );
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It does not have a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon and has been returned to the top of your deck.`,
    );
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function spiderWomanArachnoPheromones() {
  updateGameBoard();
  return new Promise(async (resolve) => {
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
    titleElement.textContent = "Spider-Woman - Arachno-Pheromones";
    instructionsElement.innerHTML = `Recruit a Hero from the HQ for free. If you've played a <img src="Visual Assets/Icons/Spider Friends.svg" alt="Spider Friends Icon" class="card-icons"> Hero this turn, your selected card will be put on top of your deck.`;

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

        // Apply greyed out styling for ineligible cards
        // Determine eligibility – only true Heroes, and not destroyed
        const isHero = !!hero && hero.type === "Hero";
        const isDestroyed = explosionValue >= 6;
        const isEligible = isHero && !isDestroyed;

        // Grey-out if not eligible
        if (!isEligible) {
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
        } else {
          cardImage.classList.remove("greyed-out");
          cardImage.style.cursor = "pointer";
          // ... keep your existing click/hover handlers here ...
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
              instructionsElement.innerHTML = `Recruit a Hero from the HQ for free. If you've played a <img src="Visual Assets/Icons/Spider Friends.svg" alt="Spider Friends Icon" class="card-icons"> Hero this turn, your selected card will be put on top of your deck.`;
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

    // Check if any eligible heroes exist - updated to remove X-Men requirement
    const eligibleHeroesForRecruit = hq.filter((hero, index) => {
      const explosionValue = explosionValues[index] || 0;
      return hero && explosionValue < 6; // Not destroyed (removed team requirement)
    });

    if (eligibleHeroesForRecruit.length === 0) {
      console.log("No available Heroes to recruit.");
      onscreenConsole.log(`No available Heroes to recruit.`);
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
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedHQIndex === null) return;

      const hero = hq[selectedHQIndex];

      closeHQCityCardChoicePopup();

      spiderWomanArachnoRecruit = true;

      // Recruit the hero using the original function
      recruitHeroConfirmed(hero, selectedHQIndex);

      resolve(true);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}

function symbioteSpiderManDarkStrength() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.cost === 1 || topCardPlayerDeck.cost === 2) {
    totalAttackPoints += 2;
    cumulativeAttackPoints += 2;
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> which has a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of ${topCardPlayerDeck.cost}. You get +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
    );
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  } else {
    onscreenConsole.log(
      `You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It does not have a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of 1 or 2.`,
    );
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function symbioteSpiderManSpiderSenseTingling() {
  return new Promise(async (resolve) => {
    // Draw up to three cards
    let holdingArray = [];
    for (let i = 0; i < 2; i++) {
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
    await handleCardReturnOrder(holdingArray);
    updateGameBoard();
    resolve();
  });
}

function symbioteSpiderManShadowedSpider() {
  const lowCostPlayedHeroes = cardsPlayedThisTurn
    .slice(0, -1) // Exclude the last item
    .filter(
      (card) =>
        (card.cost === 1 || card.cost === 2) &&
        !card.isCopied &&
        !card.sidekickToDestroy &&
        !card.markedToDestroy && !card.markedForDeletion && !card.isSimulation
    );

  if (lowCostPlayedHeroes.length === 0) {
    onscreenConsole.log(
      `You haven't played any Heroes with a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of 1 or 2 this turn.`,
    );
    updateGameBoard();
  } else {
    onscreenConsole.log(
      `You have played ${lowCostPlayedHeroes.length} Hero${lowCostPlayedHeroes.length === 1 ? "es" : ""} with a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of 1 or 2 this turn. You get +${lowCostPlayedHeroes.length} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
    );
    totalAttackPoints += lowCostPlayedHeroes.length;
    cumulativeAttackPoints += lowCostPlayedHeroes.length;
    updateGameBoard();
  }
}

function symbioteSpiderManThwip() {
  return new Promise((resolve) => {
    // Check if there are at least two cards to place on deck
    if (playerHand.length < 2) {
      console.log(
        "Not enough cards in Hand. You need at least 2 cards to play this card.",
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
        "Not enough cards in Hand to put on your deck. You need at least 2 cards to play this card.",
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
    titleElement.textContent = "Symbiote Spider-Man - Thwip!";
    instructionsElement.innerHTML =
      'Select 2 cards to put on top of your deck in order to play <span class="console-highlights">Symbiote Spider-Man - Thwip!</span>. The first card selected will be placed on your deck first, then the second card on top.';

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

    let selectedCards = [];
    let selectedCardImages = [];
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

        const cardIndex = selectedCards.indexOf(card);

        if (cardIndex !== -1) {
          // Deselect card
          selectedCards.splice(cardIndex, 1);
          selectedCardImages.splice(cardIndex, 1);
          cardImage.classList.remove("selected");

          // Update instructions and confirm button
          updateInstructions();
          document.getElementById("card-choice-popup-confirm").disabled =
            selectedCards.length !== 2;
        } else {
          if (selectedCards.length < 2) {
            // Select new card
            selectedCards.push(card);
            selectedCardImages.push(cardImage);
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
            updateInstructions();
            document.getElementById("card-choice-popup-confirm").disabled =
              selectedCards.length !== 2;
          }
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    // Helper function to update instructions based on selection state
    function updateInstructions() {
      if (selectedCards.length === 0) {
        instructionsElement.innerHTML =
          'Select 2 cards to put on top of your deck in order to play <span class="console-highlights">Symbiote Spider-Man - Thwip!</span>. The first card selected will be placed on your deck first, then the second card on top.';
      } else if (selectedCards.length === 1) {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCards[0].name}</span> will be placed on your deck first. Select one more card to place on top.`;
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCards[0].name}</span> will be placed on your deck first, then <span class="console-highlights">${selectedCards[1].name}</span> on top.`;
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

    // Configure buttons
    confirmButton.textContent = "Confirm";
    confirmButton.disabled = true; // Initially disabled until 2 cards are selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "flex";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCards.length !== 2) return;

      // Remove both cards from playerHand and add to playerDeck in reverse order
      // (so the second selected card ends up on top)
      selectedCards.forEach((card) => {
        const index = playerHand.indexOf(card);
        card.revealed = true;
        if (index !== -1) {
          playerHand.splice(index, 1);
        }
      });

      // Add cards to deck in the order they were selected (first selected goes on bottom)
      playerDeck.push(...selectedCards);

      onscreenConsole.log(
        `You have put <span class="console-highlights">${selectedCards[0].name}</span> and <span class="console-highlights">${selectedCards[1].name}</span> on top of your deck (in that order), allowing you to play <span class="console-highlights">Symbiote Spider-Man - Thwip!</span>.`,
      );

      closeCardChoicePopup();
      updateGameBoard();

      // Handle stingOfTheSpider trigger for each card added to top
      if (stingOfTheSpider) {
        // Process in the order they appear on deck (last card added is on top)
        // So we start with the last card in the array and work backwards
        for (let i = selectedCards.length - 1; i >= 0; i--) {
          await scarletSpiderStingOfTheSpiderDrawChoice(selectedCards[i]);
        }
      }

      resolve(true);
    };

    // Close button handler (Cancel action)
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      console.log("Card cannot be played since 2 cards were not selected.");
      onscreenConsole.log(
        `You have chosen not to put 2 cards on top of your deck, preventing you from playing <span class="console-highlights">Symbiote Spider-Man - Thwip!</span>.`,
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

//Masterminds

async function carnageMasterStrike() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  playSFX("feast");
  onscreenConsole.log(
    `<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
  );
  koBonuses();
  updateGameBoard();

  if (topCardPlayerDeck.cost === 0) {
    onscreenConsole.log(
      `Since <span class="console-highlights">${topCardPlayerDeck.name}</span> is a zero-cost card, you gain a Wound.`,
    );
    await drawWound();
    updateGameBoard();
  }
}

async function carnageDroolingJaws() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  playSFX("feast");
  onscreenConsole.log(
    `You are the only player to choose. <span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
  );
  koBonuses();
  updateGameBoard();
}

async function carnageEndlessHunger(isRecursiveCall = false) {
  // Only show the initial message for the first call, not recursive calls
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];
  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  playSFX("feast");

  // Single consolidated log message
  if (isRecursiveCall) {
    onscreenConsole.log(
      `Feasting continues... <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
    );
  } else {
    onscreenConsole.log(
      `<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
    );
  }

  koBonuses();
  updateGameBoard();

  if (topCardPlayerDeck.cost === 0) {
    onscreenConsole.log(
      `Since <span class="console-highlights">${topCardPlayerDeck.name}</span> is a zero-cost card, <span class="console-highlights">Carnage</span> feasts again.`,
    );
    await carnageEndlessHunger(true); // Pass true to indicate recursive call
  }
}

async function carnageFeedMe() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  playSFX("feast");
  onscreenConsole.log(
    `<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
  );
  koBonuses();
  updateGameBoard();

  onscreenConsole.log(
    `<span class="console-highlights">${topCardPlayerDeck.name}</span> had a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of ${topCardPlayerDeck.cost}. You get +${topCardPlayerDeck.cost} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
  );
  totalRecruitPoints += topCardPlayerDeck.cost;
  cumulativeRecruitPoints += topCardPlayerDeck.cost;
  updateGameBoard();
}

async function carnageOmNomNom() {
  if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
    return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  playSFX("feast");
  onscreenConsole.log(
    `<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
  );
  koBonuses();
  updateGameBoard();

  if (topCardPlayerDeck.cost === 0) {
    onscreenConsole.log(
      `Since <span class="console-highlights">${topCardPlayerDeck.name}</span> is a zero-cost card, you must KO a Bystander from your Victory Pile.`,
    );
    if (victoryPile.filter((card) => card.type === "Bystander").length === 0) {
      onscreenConsole.log(`No Bystanders available in the Victory Pile to KO.`);
      return;
    } else {
      await chooseBystanderKOFromVPSingle();
    }
  }

  updateGameBoard();
}

function chooseBystanderKOFromVPSingle() {
  updateGameBoard();
  return new Promise((resolve) => {
    const bystandersInVP = victoryPile
      .map((card, index) =>
        card && card.type === "Bystander"
          ? { ...card, id: `vp-${index}`, index }
          : null,
      )
      .filter((card) => card !== null);

    // Handle cases with 0-1 bystanders immediately
    if (bystandersInVP.length === 0) {
      onscreenConsole.log(
        "There are no Bystanders in your Victory Pile to KO.",
      );
      resolve();
      return;
    }

    if (bystandersInVP.length === 1) {
      const card = bystandersInVP[0];
      victoryPile.splice(card.index, 1);
      koPile.push(card);
      onscreenConsole.log(
        `<span class="console-highlights">${card.name}</span> has been KO'd.`,
      );
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
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "KO Bystander";
    instructionsElement.innerHTML =
      "Select one Bystander to KO from your Victory Pile.";

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
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Update instructions with selection status
    function updateInstructions() {
      if (!selectedBystander) {
        instructionsElement.innerHTML =
          "Select one Bystander to KO from your Victory Pile.";
      } else {
        instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedBystander.name}</span>`;
      }
    }

    // Update confirm button state and text
    function updateConfirmButton() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const hasSelection = selectedBystander !== null;
      confirmButton.disabled = !hasSelection;

      if (hasSelection) {
        confirmButton.textContent = "KO BYSTANDER";
      } else {
        confirmButton.textContent = "SELECT A BYSTANDER";
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
      const isSelected = selectedBystander && selectedBystander.id === card.id;
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

        // Only change background if no card is selected
        if (!selectedBystander) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (!selectedBystander) {
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

      // Selection click handler - single selection only
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        // If this card is already selected, deselect it
        if (selectedBystander && selectedBystander.id === card.id) {
          selectedBystander = null;
          cardImage.classList.remove("selected");
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect any previously selected card
          if (selectedBystander) {
            const previousSelectedElement = document.querySelector(
              `[data-card-id="${selectedBystander.id}"] img`,
            );
            if (previousSelectedElement) {
              previousSelectedElement.classList.remove("selected");
            }
          }

          // Select new bystander
          selectedBystander = card;
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

    if (bystandersInVP.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (bystandersInVP.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row");
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (bystandersInVP.length > 5) {
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
    confirmButton.textContent = "SELECT A BYSTANDER";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "none";

    // Confirm button handler
    confirmButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedBystander) return;

      setTimeout(() => {
        victoryPile.splice(selectedBystander.index, 1);
        koPile.push(selectedBystander);
        onscreenConsole.log(
          `<span class="console-highlights">${selectedBystander.name}</span> KO'd from Victory Pile.`,
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

    // Initial UI update
    updateConfirmButton();
  });
}

function mysterioMasterStrike() {
  currentMasterStrike = koPile.pop();

  currentMasterStrike.victoryPoints = 6;
  currentMasterStrike.mastermindId = 13;
  currentMasterStrike.name = "Mysterio Mastermind Tactic";
  currentMasterStrike.type = "Mastermind";
  currentMasterStrike.effect = `This Mastermind Tactic was a previous Master Strike. No effect!`;

  const mastermind = getSelectedMastermind();

  mastermind.tactics.splice(
    Math.floor(Math.random() * (mastermind.tactics.length + 1)),
    0,
    currentMasterStrike,
  );
  onMastermindTacticsChanged(getSelectedMastermind());
  updateMastermindOverlay();
  checkMastermindState();
  updateGameBoard();
}

function mysterioBlurringImages() {
  const mastermind = getSelectedMastermind();
  const tacticsLeft = mastermind.tactics.length;

  onscreenConsole.log(
    `<span class="console-highlights">Mysterio</span> has ${tacticsLeft} Tactic${tacticsLeft.length === 1 ? "" : "s"} remaining. You get +${tacticsLeft} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`,
  );
  totalRecruitPoints += tacticsLeft;
  cumulativeRecruitPoints += tacticsLeft;
  updateGameBoard();
}

async function mysterioCaptiveAudience() {
  const mastermind = getSelectedMastermind();
  const tacticsLeft = mastermind.tactics.length;

  if (tacticsLeft === 0) {
    onscreenConsole.log(
      `<span class="console-highlights">Mysterio</span> has ${tacticsLeft} Tactics remaining. No effect.`,
    );
  } else {
    onscreenConsole.log(
      `<span class="console-highlights">Mysterio</span> has ${tacticsLeft} Tactic${tacticsLeft.length === 1 ? "" : "s"} remaining. Rescuing ${tacticsLeft} Bystander${tacticsLeft.length === 1 ? "" : "s"}.`,
    );
  }

  for (let i = 0; i < tacticsLeft; i++) {
    await rescueBystander();
  }

  updateGameBoard();
}

function mysterioMasterOfIllusions() {
  const mastermind = getSelectedMastermind();
  const tacticsLeft = mastermind.tactics.length;

  if (tacticsLeft === 0) {
    onscreenConsole.log(`This is the final Tactic. No effect.`);
    return;
  }

  const mysterioTactics = victoryPile.filter(
    (card) => card.name === "Mysterio Mastermind Tactic",
  );

  if (mysterioTactics.length === 0) {
    onscreenConsole.log("No Master Strikes found in Victory Pile.");
    return;
  }

  // Randomly select one Mysterio tactic
  const randomIndex = Math.floor(Math.random() * mysterioTactics.length);
  const selectedTactic = mysterioTactics[randomIndex];

  // Remove it from player victory pile
  const cardIndex = victoryPile.findIndex((card) => card === selectedTactic);
  if (cardIndex > -1) {
    victoryPile.splice(cardIndex, 1);
  }

  // Add it to mastermind tactics at random position
  const insertIndex = Math.floor(
    Math.random() * (mastermind.tactics.length + 1),
  );
  mastermind.tactics.splice(insertIndex, 0, selectedTactic);

  onscreenConsole.log(
    `A Master Strike from your Victory Pile has been shuffled back into <span class="console-highlights">Mysterio</span><span class="bold-spans">'s</span> Tactics.`,
  );
  updateGameBoard();
}

async function mysterioMistsOfDeception() {
  const mastermind = getSelectedMastermind();

  if (mastermind.tactics.length !== 0) {
    onscreenConsole.log(`This is not the final Tactic.`);

    // Create a temporary holding array for revealed cards
    const revealedCards = [];
    const cardsToRemoveFromDeck = Math.min(5, villainDeck.length);
    
    // Move cards to holding array
    for (let i = 0; i < cardsToRemoveFromDeck; i++) {
      revealedCards.push(villainDeck.pop());
    }

    if (revealedCards.length === 0) {
      onscreenConsole.log("No cards left in the Villain deck to reveal!");
      return;
    }

    // Log revealed cards
    const cardNames = revealedCards
      .map((card) => `<span class="console-highlights">${card.name}</span>`)
      .join(", ");
    onscreenConsole.log(
      `You revealed the top ${revealedCards.length} card${revealedCards.length !== 1 ? "s" : ""} of the Villain deck: ${cardNames}.`,
    );

    // Separate master strikes from other cards
    const masterStrikes = revealedCards.filter((card) => {
      return (
        card.name === "Master Strike" ||
        card.name === "Mysterio Mastermind Tactic"
      );
    });
    const otherCards = revealedCards.filter((card) => {
      return (
        card.name !== "Master Strike" &&
        card.name !== "Mysterio Mastermind Tactic"
      );
    });

    // Play master strikes first
    if (masterStrikes.length > 0) {
      onscreenConsole.log(
        `Playing ${masterStrikes.length} Master Strike${masterStrikes.length !== 1 ? "s" : ""} now.`,
      );

      // Play each master strike
      for (const strike of masterStrikes) {
        // Add to top of deck first
        villainDeck.push(strike);
        // Then draw it properly
        enterCityNotDraw = true;
        await drawVillainCard();
        enterCityNotDraw = false;
      }
    }

    // Handle remaining cards
    if (otherCards.length > 0) {
      shuffleArray(otherCards);
      onscreenConsole.log(
        `Shuffling the other cards and placing them on the bottom of the Villain deck.`,
      );

      // Add to bottom of deck
      villainDeck.unshift(...otherCards);
    }

    // Update game state
    updateGameBoard();
    
  } else {
    onscreenConsole.log(`This is the final Tactic. No effect.`);
  }
}
