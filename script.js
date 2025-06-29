console.log('Script loaded');
console.log(window.henchmen);
console.log(window.villains);
console.log(window.heroes);

// Custom on-screen log function
const onscreenConsole = {
  log: function (...args) {
    const consoleLogDiv = document.querySelector('.inner-console-log');
    
    // Create a new log message element
    const newMessage = document.createElement('p');
    
    // Use innerHTML to allow rendering of HTML tags
    const formattedMessage = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg))).join(' ');
    
    newMessage.innerHTML = formattedMessage;  // Use innerHTML instead of textContent
    consoleLogDiv.prepend(newMessage); // Prepend messages since we use column-reverse

    // Always scroll to the bottom (which is top in column-reverse) after adding the new log
    consoleLogDiv.scrollTop = 0;
  }
};


// Detect user scrolling behavior
document.querySelector('.inner-console-log').addEventListener('scroll', function() {
  const consoleLogDiv = document.querySelector('.inner-console-log');
  
  // If the user manually scrolls, nothing will change here. 
  // You can still track the user's scrolling if needed for any other logic.
});

// Usage examples:
onscreenConsole.log('<span style="font-style:italic;">Initializing game...</span>');
onscreenConsole.log(`<span class="console-highlights" style="text-decoration:underline;">Turn 1:</span>`);

// Function to toggle dropdowns when clicking either anchor or anchor2
document.querySelectorAll('.dropdown-check-list').forEach(function(checkList) {
  checkList.querySelectorAll('.anchor, .anchor2').forEach(function(anchor) {
    anchor.onclick = function(evt) {
      // Toggle the clicked dropdown
      if (checkList.classList.contains('visible')) {
        checkList.classList.remove('visible');
      } else {
        document.querySelectorAll('.dropdown-check-list').forEach(function(otherList) {
          otherList.classList.remove('visible'); // Close all other dropdowns
        });
        checkList.classList.add('visible'); // Open the clicked dropdown
      }
      evt.stopPropagation(); // Prevent click from propagating to the document
    };
  });
});

// Function to close the dropdown if clicking outside
document.addEventListener('click', function(evt) {
  document.querySelectorAll('.dropdown-check-list').forEach(function(checkList) {
    if (!checkList.contains(evt.target)) {
      checkList.classList.remove('visible'); // Close dropdown if clicked outside
    }
  });
});

// Function to update selected filter tags for all
function updateSelectedFiltersAll() {
  const selectedFiltersContainer = document.getElementById('all-selected-filters');
  selectedFiltersContainer.innerHTML = ''; // Clear existing tags

  // Get all selected checkboxes in the overall filter dropdown
  const selectedCheckboxes = document.querySelectorAll('#overallsetlist input[type="checkbox"]:checked');
  
  // If there are selected checkboxes, display the container
  if (selectedCheckboxes.length > 0) {
    selectedFiltersContainer.style.display = 'block';
  } else {
    selectedFiltersContainer.style.display = 'none';
  }

  // Create a tag for each selected filter
  selectedCheckboxes.forEach(checkbox => {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    
    // Add the text and close "X" to the filter tag
    filterTag.innerHTML = `${checkbox.getAttribute('data-set')} <span class="close-x">×</span>`;

    // Add event listener to the entire tag to remove the filter
    filterTag.addEventListener('click', function() {
      checkbox.checked = false; // Uncheck the corresponding checkbox
      updateSelectedFiltersAll(); // Update the tags list
      filterAll(); // Re-apply the filters for schemes
    });

    selectedFiltersContainer.appendChild(filterTag); // Add the tag to the container
  });
}


// Function to update selected filter tags for schemes
function updateSelectedFiltersSchemes() {
  const selectedFiltersContainer = document.getElementById('scheme-selected-filters');
  selectedFiltersContainer.innerHTML = ''; // Clear existing tags

  // Get all selected checkboxes in the scheme dropdown
  const selectedCheckboxes = document.querySelectorAll('#schemelist input[type="checkbox"]:checked');
  
  // Create a tag for each selected filter
  selectedCheckboxes.forEach(checkbox => {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    
    // Add the text and close "X" to the filter pill
    filterTag.innerHTML = `${checkbox.getAttribute('data-set')} <span class="close-x">×</span>`;

    // Add event listener to the entire tag to remove the filter
    filterTag.addEventListener('click', function() {
      checkbox.checked = false; // Uncheck the corresponding checkbox
      updateSelectedFiltersSchemes(); // Update the tags list
      filterSchemes(); // Re-apply the filters for schemes
    });

    selectedFiltersContainer.appendChild(filterTag); // Add the tag to the container
  });
}

// Function to update selected filter tags for masterminds
function updateSelectedFiltersMasterminds() {
  const selectedFiltersContainer = document.getElementById('mastermind-selected-filters');
  selectedFiltersContainer.innerHTML = ''; // Clear existing tags

  // Get all selected checkboxes in the mastermind dropdown
  const selectedCheckboxes = document.querySelectorAll('#mastermindlist input[type="checkbox"]:checked');
  
  // Create a tag for each selected filter
  selectedCheckboxes.forEach(checkbox => {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    
    // Add the text and close "X" to the filter pill
    filterTag.innerHTML = `${checkbox.getAttribute('data-set')} <span class="close-x">×</span>`;

    // Add event listener to the entire tag to remove the filter
    filterTag.addEventListener('click', function() {
      checkbox.checked = false; // Uncheck the corresponding checkbox
      updateSelectedFiltersMasterminds(); // Update the tags list
      filterMasterminds(); // Re-apply the filters for masterminds
    });

    selectedFiltersContainer.appendChild(filterTag); // Add the tag to the container
  });
}

// Function to update selected filter tags for villains
function updateSelectedFiltersVillain() {
  const selectedFiltersContainer = document.getElementById('villain-selected-filters');
  selectedFiltersContainer.innerHTML = ''; // Clear existing tags

  // Get all selected checkboxes in the villain dropdown
  const selectedCheckboxes = document.querySelectorAll('#villainlist input[type="checkbox"]:checked');
  
  // Create a tag for each selected filter
  selectedCheckboxes.forEach(checkbox => {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    
    // Add the text and close "X" to the filter pill
    filterTag.innerHTML = `${checkbox.getAttribute('data-set')} <span class="close-x">×</span>`;

    // Add event listener to the entire tag to remove the filter
    filterTag.addEventListener('click', function() {
      checkbox.checked = false; // Uncheck the corresponding checkbox
      updateSelectedFiltersVillain(); // Update the tags list
      filterVillain(); // Re-apply the filters for villains
    });

    selectedFiltersContainer.appendChild(filterTag); // Add the tag to the container
  });
}

// Function to update selected filter tags for henchmen
function updateSelectedFiltersHenchmen() {
  const selectedFiltersContainer = document.getElementById('henchmen-selected-filters');
  selectedFiltersContainer.innerHTML = ''; // Clear existing tags

  // Get all selected checkboxes in the villain dropdown
  const selectedCheckboxes = document.querySelectorAll('#henchmenlist input[type="checkbox"]:checked');
  
  // Create a tag for each selected filter
  selectedCheckboxes.forEach(checkbox => {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    
    // Add the text and close "X" to the filter pill
    filterTag.innerHTML = `${checkbox.getAttribute('data-set')} <span class="close-x">×</span>`;

    // Add event listener to the entire tag to remove the filter
    filterTag.addEventListener('click', function() {
      checkbox.checked = false; // Uncheck the corresponding checkbox
      updateSelectedFiltersHenchmen(); // Update the tags list
      filterHenchmen(); // Re-apply the filters for villains
    });

    selectedFiltersContainer.appendChild(filterTag); // Add the tag to the container
  });
}

// Function to update selected set filter tags for heroes
function updateSelectedSetFiltersHeroes() {
  const selectedFiltersContainer = document.getElementById('hero-selected-set-filters');
  selectedFiltersContainer.innerHTML = ''; // Clear existing tags

  // Get all selected checkboxes in the heroes set dropdown
  const selectedCheckboxes = document.querySelectorAll('#herosetfilter input[type="checkbox"]:checked');
  
  // Create a tag for each selected filter
  selectedCheckboxes.forEach(checkbox => {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    
    // Add the text and close "X" to the filter pill
    filterTag.innerHTML = `${checkbox.getAttribute('data-set')} <span class="close-x">×</span>`;

    // Add event listener to the entire tag to remove the filter
    filterTag.addEventListener('click', function() {
      checkbox.checked = false; // Uncheck the corresponding checkbox
      updateSelectedSetFiltersHeroes(); // Update the tags list
      filterHeroes(); // Re-apply the filters for villains
    });

    selectedFiltersContainer.appendChild(filterTag); // Add the tag to the container
  });
}

// Function to update selected team tags for heros
function updateSelectedTeamFiltersHeroes() {
  const selectedFiltersContainer = document.getElementById('hero-selected-team-filters');
  selectedFiltersContainer.innerHTML = ''; // Clear existing tags

  // Get all selected checkboxes in the heroes team dropdown
  const selectedCheckboxes = document.querySelectorAll('#heroteamfilter input[type="checkbox"]:checked');
  
  // Create a tag for each selected filter
  selectedCheckboxes.forEach(checkbox => {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-team-tag';
    
    // Add the text and close "X" to the filter pill
    filterTag.innerHTML = `${checkbox.getAttribute('data-team')} <span class="close-x">×</span>`;

    // Add event listener to the entire tag to remove the filter
    filterTag.addEventListener('click', function() {
      checkbox.checked = false; // Uncheck the corresponding checkbox
      updateSelectedTeamFiltersHeroes(); // Update the tags list
      filterHeroes(); // Re-apply the filters for villains
    });

    selectedFiltersContainer.appendChild(filterTag); // Add the tag to the container
  });
}

// Listen for changes in the checkboxes to update the selected filters
document.querySelectorAll('#overallsetlist input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateSelectedFiltersAll(); // Update tags for when checkbox is checked/unchecked
    filterAll(); // Apply all filters
  });
});

// Listen for changes in the checkboxes to update the selected filters
document.querySelectorAll('#schemelist input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateSelectedFiltersSchemes(); // Update tags for schemes when checkbox is checked/unchecked
    filterSchemes(); // Re-apply the scheme filters
  });
});

document.querySelectorAll('#mastermindlist input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateSelectedFiltersMasterminds(); // Update tags for masterminds when checkbox is checked/unchecked
    filterMasterminds(); // Re-apply the mastermind filters
  });
});

// Event listeners for villain filters
document.querySelectorAll('#villainlist input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateSelectedFiltersVillain(); // Update tags when checkbox is checked/unchecked
    filterVillain(); // Re-apply the villain filters
  });
});

// Event listeners for henchmen filters
document.querySelectorAll('#henchmenlist input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateSelectedFiltersHenchmen(); // Update tags when checkbox is checked/unchecked
    filterHenchmen(); // Re-apply the villain filters
  });
});

// Event listeners for heroes set filters
document.querySelectorAll('#herosetfilter input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateSelectedSetFiltersHeroes(); // Update tags when checkbox is checked/unchecked
    filterHeroes(); // Re-apply the villain filters
  });
});

// Event listeners for heroes teams filters
document.querySelectorAll('#heroteamfilter input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateSelectedTeamFiltersHeroes(); // Update tags when checkbox is checked/unchecked
    filterHeroes(); // Re-apply the villain filters
  });
});

document.querySelectorAll('.scrollable-list').forEach(function(list) {
    list.addEventListener('scroll', function() {
        const scrollTop = list.scrollTop;
        const clientHeight = list.clientHeight;
        const scrollHeight = list.scrollHeight;

        // If the user is at the very top, only show the bottom gradient
        if (scrollTop === 0) {
            list.style.webkitMaskImage = 'linear-gradient(to bottom, black 70%, transparent 100%)';
            list.style.maskImage = 'linear-gradient(to bottom, black 70%, transparent 100%)';
        }
        // If the user is at the bottom, only show the top gradient
        else if (scrollTop + clientHeight >= scrollHeight - 1) {
            list.style.webkitMaskImage = 'linear-gradient(to top, black 10%, transparent 100%)';
            list.style.maskImage = 'linear-gradient(to top, black 10%, transparent 100%)';

        }
    });
});

let shieldDeck = [...shieldOfficers];
let sidekickDeck = shuffle(sidekicks);
let woundDeck = [...wounds];
let villainDeck = [];
let currentVillainLocation = null;
let heroDeck = [];
let skrullDeck = [];
let hq = [];
let city = ["", "", "", "", ""];
var city1TempBuff = 0;
var city2TempBuff = 0;
var city3TempBuff = 0;
var city4TempBuff = 0;
var city5TempBuff = 0;
var mastermindTempBuff = 0;
var city1PermBuff = 0;
var city2PermBuff = 0;
var city3PermBuff = 0;
var city4PermBuff = 0;
var city5PermBuff = 0;
var mastermindPermBuff = 0;
let playerHand = [];
let playerDeck = [];
let playerDiscardPile = [];
let justAddedToDiscard = [];
let cardsPlayedThisTurn = [];
let koPile = [];
let escapedVillainsDeck = [];
let victoryPile = [];
let attackPoints = 0;
let recruitPoints = 0;
let cumulativeAttackPoints = 0;
let cumulativeRecruitPoints = 0;
let recruitUsedToAttack = false;
let sidekickRecruited = false;
let selectedCards = [];
let totalAttackPoints = 0;
let totalRecruitPoints = 0;
let killbotAttack = 3;
let healingPossible = true;
let finalBlowEnabled = false;
let escapedVillainsCount = 0;
let lastTurn = false;
let mastermindDeck = [];
let alwaysLeads = '';
let totalBystanders = 30;
let extraCardsDrawnThisTurn = 0;
let nextTurnsDraw = 6;
let cardsToBeDrawnNextTurn = [];
let rescueExtraBystanders = 0;
let extraThreeRecruitAvailable = false;
let bystanderDeck = shuffle(bystanders);
let schemeTwistCount = 0;
let turnCount = 1;
let killbotSchemeTwistCount = 0;
let suppressRecruitButtonAutoShow = false;
let autoSuperpowers = true;
let currentTwistChainLength = 0; // Tracks active Scheme Twists in the current chain
let schemeTwistChainDepth = 0;  // Tracks nested Scheme Twists
let pendingHeroKO = false; document.getElementById('autoButton').classList.add('active');


window.victoryPile = [];

document.getElementById('intro-popup-close-button').addEventListener('click', function () {
  document.getElementById('intro-popup-container').style.display = 'none';
});

function getSelectedExpansions() {
            let selectedExpansions = [];
            document.querySelectorAll('#sidekick-selection input[name="sidekick"]:checked').forEach(checkbox => {
                selectedExpansions.push(checkbox.value);
            });
            return selectedExpansions;
        }

        // Function to filter the deck based on selected expansions
        function filterDeckByExpansions(deck, expansions) {
            return deck.filter(card => expansions.includes(card.expansion));
        }



document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', function () {
    const tab = this.getAttribute('data-tab');
    
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tab).classList.add('active');
  });
});

function getSelectedMastermind() {
    const selectedMastermindName = document.querySelector('#mastermind-section input[type=radio]:checked').value;
    return masterminds.find(mastermind => mastermind.name === selectedMastermindName);
}

function generateMastermindDeck(mastermind) {
    mastermind.tactics = shuffle(mastermind.tactics.map(tactic => ({
        ...tactic,
        type: 'Mastermind'
    })));
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function filterAll() {
  // Get all selected checkboxes from the global filter
  const selectedCheckboxes = document.querySelectorAll('#overallsetlist input[type="checkbox"]:checked');

  // For each selected checkbox in the global filter, apply to all sections
  selectedCheckboxes.forEach(globalCheckbox => {
    const setValue = globalCheckbox.getAttribute('data-set');
    
    // Find the matching checkboxes in all sections and check them
    document.querySelectorAll('.dropdown-check-list input[type="checkbox"]').forEach(sectionCheckbox => {
      if (sectionCheckbox.getAttribute('data-set') === setValue) {
        sectionCheckbox.checked = true; // Check the checkbox
      }
    });
  });

  // Call the individual filter functions for each section
updateSelectedFiltersSchemes();
  filterSchemes();      
updateSelectedFiltersMasterminds(); 
  filterMasterminds();   
updateSelectedFiltersVillain();
  filterVillain();  
updateSelectedFiltersHenchmen();   
  filterHenchmen(); 
updateSelectedSetFiltersHeroes();     
filterHeroes();
}


function filterSchemes() {
  // Get the selected filters from the scheme section only
  const selectedFilters = Array.from(document.querySelectorAll('#schemelist input[type="checkbox"]:checked'))
    .map(cb => cb.getAttribute('data-set'));

  // Get all scheme radio buttons
  const schemeRadioButtons = document.querySelectorAll('#scheme-selection input[type="radio"]');

  // If no filters are selected, show all schemes
  if (selectedFilters.length === 0) {
    schemeRadioButtons.forEach(button => button.parentElement.style.display = 'flex');
    return; // Exit if no filters are selected
  }

  // Show/hide radio buttons based on the selected filters
  schemeRadioButtons.forEach(button => {
    const schemeSet = button.getAttribute('data-set');
    if (selectedFilters.includes(schemeSet)) {
      button.parentElement.style.display = 'flex'; // Show schemes that match the filters
    } else {
      button.parentElement.style.display = 'none'; // Hide schemes that don't match
    }
  });
}


function filterMasterminds() {
  // Get the selected filters from the mastermind section only
  const selectedMastermindFilters = Array.from(document.querySelectorAll('#mastermindlist input[type="checkbox"]:checked'))
    .map(cb => cb.getAttribute('data-set'));

  const mastermindRadioButtons = document.querySelectorAll('#mastermind-selection input[type="radio"]');

  // If no filters are selected, show all masterminds
  if (selectedMastermindFilters.length === 0) {
    mastermindRadioButtons.forEach(button => button.parentElement.style.display = 'flex');
    return;
  }

  mastermindRadioButtons.forEach(button => {
    const mastermindSet = button.getAttribute('data-set');
    if (selectedMastermindFilters.includes(mastermindSet)) {
      button.parentElement.style.display = 'flex';
    } else {
      button.parentElement.style.display = 'none';
    }
  });
}

function filterVillain() {
  // Get the selected filters from the villain section only
  const selectedVillainFilters = Array.from(document.querySelectorAll('#villainlist input[type="checkbox"]:checked'))
    .map(cb => cb.getAttribute('data-set'));

  const villainCheckboxes = document.querySelectorAll('#villain-selection input[type="checkbox"]');

  // If no filters are selected, show all villains
  if (selectedVillainFilters.length === 0) {
    villainCheckboxes.forEach(checkbox => checkbox.parentElement.style.display = 'flex');
    return;
  }

  villainCheckboxes.forEach(checkbox => {
    const villainSet = checkbox.getAttribute('data-set');
    if (selectedVillainFilters.includes(villainSet)) {
      checkbox.parentElement.style.display = 'flex';
    } else {
      checkbox.parentElement.style.display = 'none';
    }
  });
}

function filterHenchmen() {
  // Get the selected filters from the henchmen section only
  const selectedHenchmenFilters = Array.from(document.querySelectorAll('#henchmenlist input[type="checkbox"]:checked'))
    .map(cb => cb.getAttribute('data-set'));

  const henchmenCheckboxes = document.querySelectorAll('#henchmen-selection input[type="checkbox"]');

  // If no filters are selected, show all henchmen
  if (selectedHenchmenFilters.length === 0) {
    henchmenCheckboxes.forEach(checkbox => checkbox.parentElement.style.display = 'flex');
    return;
  }

  henchmenCheckboxes.forEach(checkbox => {
    const henchmenSet = checkbox.getAttribute('data-set');
    if (selectedHenchmenFilters.includes(henchmenSet)) {
      checkbox.parentElement.style.display = 'flex';
    } else {
      checkbox.parentElement.style.display = 'none';
    }
  });
}

function filterHeroes() {
  // Get the selected set filters
  const selectedSetFilters = Array.from(document.querySelectorAll('#herosetfilter input[type="checkbox"]:checked'))
    .map(cb => cb.getAttribute('data-set'));
    
  // Get the selected team filters
  const selectedTeamFilters = Array.from(document.querySelectorAll('#heroteamfilter input[type="checkbox"]:checked'))
    .map(cb => cb.getAttribute('data-team'));

  // Get all hero checkboxes
  const heroCheckboxes = document.querySelectorAll('#hero-selection input[type="checkbox"]');

  // If no filters are selected, show all heroes
  if (selectedSetFilters.length === 0 && selectedTeamFilters.length === 0) {
    heroCheckboxes.forEach(checkbox => checkbox.parentElement.style.display = 'flex');
    return;
  }

  // Loop through each hero checkbox to filter based on selected sets and teams
  heroCheckboxes.forEach(checkbox => {
    const heroSet = checkbox.getAttribute('data-set');
    const heroTeam = checkbox.getAttribute('data-team');

    const matchesSet = selectedSetFilters.length === 0 || selectedSetFilters.includes(heroSet);
    const matchesTeam = selectedTeamFilters.length === 0 || selectedTeamFilters.includes(heroTeam);

    if (matchesSet && matchesTeam) {
      checkbox.parentElement.style.display = 'flex';
    } else {
      checkbox.parentElement.style.display = 'none';
    }
  });
}



function updateSchemeImage(selectedSchemeName) {
    // Find the corresponding scheme from the array
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    // Get the image element inside the container
    const schemeImageElement = document.querySelector('#chosen-scheme-image img');

    if (selectedScheme) {
        // Update the image src attribute to the selected scheme's image
        schemeImageElement.src = selectedScheme.image;
        schemeImageElement.alt = selectedScheme.name; // Update alt for accessibility
    } else {
        // If no scheme is found, use the default back-of-card image
        schemeImageElement.src = 'Visual Assets/CardBack.webp';
        schemeImageElement.alt = 'Default Scheme';
    }
}

function updateMastermindImage(selectedMastermindName) {
    // Find the corresponding mastermind from the array
    const selectedMastermind = masterminds.find(mastermind => mastermind.name === selectedMastermindName);

    // Get the image element inside the container
    const mastermindImageElement = document.querySelector('#chosen-mastermind-image img');

    if (selectedMastermind) {
        // Update the image src attribute to the selected mastermind's image
        mastermindImageElement.src = selectedMastermind.image;
        mastermindImageElement.alt = selectedMastermind.name; // Update alt for accessibility
    } else {
        // If no mastermind is found, use the default back-of-card image
        mastermindImageElement.src = 'Visual Assets/CardBack.webp';
        mastermindImageElement.alt = 'Default Mastermind';
    }
}

function updateMastermindImage(selectedMastermindName) {
    // Find the corresponding mastermind from the array
    const selectedMastermind = masterminds.find(mastermind => mastermind.name === selectedMastermindName);

    // Get the image element inside the container
    const mastermindImageElement = document.querySelector('#chosen-mastermind-image img');

    if (selectedMastermind) {
        // Update the image src attribute to the selected mastermind's image
        mastermindImageElement.src = selectedMastermind.image;
        mastermindImageElement.alt = selectedMastermind.name; // Update alt for accessibility
    } else {
        // If no mastermind is found, use the default back-of-card image
        mastermindImageElement.src = 'Visual Assets/CardBack.webp';
        mastermindImageElement.alt = 'Default Mastermind';
    }
}

let selectedVillainGroups = [];  // Store selected villain groups in the order they were selected
let currentVillainGroupIndex = 0; // Index to track which group we are cycling through
let currentVillainIndex = 0;      // Index to track which card in the current group is displayed

function updateVillainImage(selectedVillainName) {
    // Find the corresponding villain group from the array
    const selectedVillainGroup = villains.find(villainGroup => villainGroup.name === selectedVillainName);

    // Get the image element inside the container
    const villainImageElement = document.querySelector('#chosen-villain-image img');

    if (selectedVillainGroup) {
        // Check if the villain group is already in the list
        const existingGroupIndex = selectedVillainGroups.findIndex(group => group.name === selectedVillainName);
        
        // If not in the list, add it to the end of the array (most recently selected)
        if (existingGroupIndex === -1) {
            selectedVillainGroups.push(selectedVillainGroup);
        } else {
            // Move the selected group to the end of the array to make it most recent
            selectedVillainGroups.push(...selectedVillainGroups.splice(existingGroupIndex, 1));
        }

        // Set the first card of the most recently selected group to display
        currentGroupIndex = selectedVillainGroups.length - 1;  // Start from the most recent group
        currentVillainIndex = 0;  // Reset to the first card of this group
        villainImageElement.src = selectedVillainGroups[currentGroupIndex].cards[currentVillainIndex].image;
        villainImageElement.alt = selectedVillainGroups[currentGroupIndex].cards[currentVillainIndex].name;

        // Add event listener to cycle through cards when the image is clicked
        villainImageElement.onclick = function() {
            cycleVillainImages();
        };
    } else {
        // If no villain group is found, use the default back-of-card image
        villainImageElement.src = 'Visual Assets/CardBack.webp';
        villainImageElement.alt = 'Default Villain';
        selectedVillainGroups = [];  // Clear the selected groups
        currentGroupIndex = 0;       // Reset group index
        currentVillainIndex = 0;     // Reset villain index
    }
}

function cycleVillainImages() {
    if (selectedVillainGroups.length > 0) {
        // Increment to the next villain card within the current group
        currentVillainIndex++;

        // If we've reached the end of the current group's cards, move to the next group
        if (currentVillainIndex >= selectedVillainGroups[currentGroupIndex].cards.length) {
            currentVillainIndex = 0;  // Reset to the first card of the next group
            currentGroupIndex = (currentGroupIndex + 1) % selectedVillainGroups.length;  // Cycle to the next group, loop back to the first
        }

        // Update the image and alt text for the current card in the current group
        const villainImageElement = document.querySelector('#chosen-villain-image img');
        villainImageElement.src = selectedVillainGroups[currentGroupIndex].cards[currentVillainIndex].image;
        villainImageElement.alt = selectedVillainGroups[currentGroupIndex].cards[currentVillainIndex].name;
    }
}

let selectedHenchmenGroups = [];  // Store selected henchmen groups in the order they were selected
let currentHenchmenGroupIndex = 0; // Index to track which group we are cycling through
let currentHenchmenIndex = 0;      // Index to track which card in the current group is displayed


// Function to update henchman image based on selected henchman checkbox
function updateHenchmenImage(selectedHenchmenName) {
    const selectedHenchmenGroup = henchmen.find(henchmenGroup => henchmenGroup.name === selectedHenchmenName);
    const henchmenImageElement = document.querySelector('#chosen-henchmen-image img'); // Ensure this ID matches your actual HTML structure

    if (selectedHenchmenGroup) {
        const existingGroupIndex = selectedHenchmenGroups.findIndex(group => group.name === selectedHenchmenName);

        if (existingGroupIndex === -1) {
            selectedHenchmenGroups.push(selectedHenchmenGroup);
        } else {
            // Move the selected group to the end of the array
            selectedHenchmenGroups.push(...selectedHenchmenGroups.splice(existingGroupIndex, 1));
        }

        currentHenchmenGroupIndex = selectedHenchmenGroups.length - 1;
        displayCurrentHenchmenImage();
    } else {
        resetHenchmenImage();
    }
}

// Function to display the current henchman image
function displayCurrentHenchmenImage() {
    if (selectedHenchmenGroups.length > 0) {
        const currentHenchmenGroup = selectedHenchmenGroups[currentHenchmenGroupIndex];

        // Since henchmen have a direct image, we directly access the 'image' property
        const henchmenImageElement = document.querySelector('#chosen-henchmen-image img'); // Ensure this ID matches your actual HTML structure
        henchmenImageElement.src = currentHenchmenGroup.image;
        henchmenImageElement.alt = currentHenchmenGroup.name;

        henchmenImageElement.onclick = function() {
            cycleHenchmenImages();
        };
    } else {
        resetHenchmenImage();
    }
}

// Function to cycle through henchmen images
function cycleHenchmenImages() {
    if (selectedHenchmenGroups.length > 0) {
        currentHenchmenGroupIndex = (currentHenchmenGroupIndex + 1) % selectedHenchmenGroups.length;
        displayCurrentHenchmenImage();
    }
}

// Helper function to reset henchman image to default
function resetHenchmenImage() {
    const henchmenImageElement = document.querySelector('#chosen-henchmen-image img'); // Ensure this ID matches your actual HTML structure
    henchmenImageElement.src = 'Visual Assets/CardBack.webp';
    henchmenImageElement.alt = 'Default Henchman';
    
    selectedHenchmenGroups = [];
    currentHenchmenGroupIndex = 0;

    updateHenchmenFaceDownCards();
}

let selectedHeroGroups = [];  // Store selected hero groups in the order they were selected
let currentHeroGroupIndex = 0; // Index to track which group we are cycling through
let currentHeroIndex = 0;      // Index to track which card in the current group is displayed

function updateHeroImage(selectedHeroName) {
    // Find the corresponding hero group from the array
    const selectedHeroGroup = heroes.find(heroGroup => heroGroup.name === selectedHeroName);

    // Get the image element inside the container
    const heroImageElement = document.querySelector('#chosen-hero-image img');

    if (selectedHeroGroup) {
        // Check if the hero group is already in the list
        const existingGroupIndex = selectedHeroGroups.findIndex(group => group.name === selectedHeroName);
        
        // If not in the list, add it to the end of the array (most recently selected)
        if (existingGroupIndex === -1) {
            selectedHeroGroups.push(selectedHeroGroup);
        } else {
            // Move the selected group to the end of the array to make it most recent
            selectedHeroGroups.push(...selectedHeroGroups.splice(existingGroupIndex, 1));
        }

        // Set the first card of the most recently selected group to display
        currentHeroGroupIndex = selectedHeroGroups.length - 1;  // Start from the most recent group
        currentHeroIndex = 0;  // Reset to the first card of this group
        heroImageElement.src = selectedHeroGroups[currentHeroGroupIndex].cards[currentHeroIndex].image;
        heroImageElement.alt = selectedHeroGroups[currentHeroGroupIndex].cards[currentHeroIndex].name;

        // Add event listener to cycle through cards when the image is clicked
        heroImageElement.onclick = function() {
            cycleHeroImages();
        };
    } else {
        // If no hero group is found, use the default back-of-card image
        heroImageElement.src = 'Visual Assets/CardBack.webp';
        heroImageElement.alt = 'Default Hero';
        selectedHeroGroups = [];  // Clear the selected groups
        currentHeroGroupIndex = 0; // Reset group index
        currentHeroIndex = 0;      // Reset hero index
    }
}

function cycleHeroImages() {
    if (selectedHeroGroups.length > 0) {
        // Increment to the next hero card within the current group
        currentHeroIndex++;

        // If we've reached the end of the current group's cards, move to the next group
        if (currentHeroIndex >= selectedHeroGroups[currentHeroGroupIndex].cards.length) {
            currentHeroIndex = 0;  // Reset to the first card of the next group
            currentHeroGroupIndex = (currentHeroGroupIndex + 1) % selectedHeroGroups.length;  // Cycle to the next group, loop back to the first
        }

        // Update the image and alt text for the current card in the current group
        const heroImageElement = document.querySelector('#chosen-hero-image img');
        heroImageElement.src = selectedHeroGroups[currentHeroGroupIndex].cards[currentHeroIndex].image;
        heroImageElement.alt = selectedHeroGroups[currentHeroGroupIndex].cards[currentHeroIndex].name;
    }
}


// Event listener for user selecting a scheme manually
document.querySelectorAll('#scheme-section input[type=radio]').forEach(radio => {
    radio.addEventListener('change', function() {
        updateSchemeImage(this.value);  // Update the image when the user selects a scheme
    });
});

// Event listener for user selecting a mastermind manually
document.querySelectorAll('#mastermind-section input[type=radio]').forEach(radio => {
    radio.addEventListener('change', function() {
        updateMastermindImage(this.value);  // Update the image when the user selects a mastermind
    });
});

// Event listener for manual villain selection changes
document.querySelectorAll('#villain-selection input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateVillainImage(this.value);
        } else {
            const deselectedVillainName = this.value;
            const indexToRemove = selectedVillainGroups.findIndex(group => group.name === deselectedVillainName);

            if (indexToRemove !== -1) {
                selectedVillainGroups.splice(indexToRemove, 1);

                if (currentVillainGroupIndex >= selectedVillainGroups.length) {
                    currentVillainGroupIndex = 0;
                }

                if (selectedVillainGroups.length > 0) {
                    displayCurrentVillainImage();
                } else {
                    resetVillainImage();
                }
            }
        }

        updateVillainFaceDownCards();
    });
});

function updateVillainFaceDownCards() {
    const faceDownCard1 = document.getElementById('villainfacedowncard1');
    const faceDownCard2 = document.getElementById('villainfacedowncard2');
const cardPile = document.getElementById('chosen-villain-image');
const imageElement = cardPile.querySelector('img');

    if (selectedVillainGroups.length > 0) {
        faceDownCard1.style.display = 'block';
        faceDownCard2.style.display = 'block';
imageElement.style.cursor = 'alias';
    } else {
        faceDownCard1.style.display = 'none';
        faceDownCard2.style.display = 'none';
imageElement.style.cursor = 'default';
    }
}

// Event listener for manual henchman selection changes
document.querySelectorAll('#henchmen-selection input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateHenchmenImage(this.value);  // Update the henchmen image when a group is selected
        } else {
            const deselectedHenchmenName = this.value;
            const indexToRemove = selectedHenchmenGroups.findIndex(group => group.name === deselectedHenchmenName);

            if (indexToRemove !== -1) {
                selectedHenchmenGroups.splice(indexToRemove, 1);  // Remove the group from the array

                // Adjust the current group index to stay within bounds
                if (currentHenchmenGroupIndex >= selectedHenchmenGroups.length) {
                    currentHenchmenGroupIndex = 0;
                }

                // Display the next henchman if there are any left, otherwise reset the image
                if (selectedHenchmenGroups.length > 0) {
                    displayCurrentHenchmenImage();
                } else {
                    resetHenchmenImage();
                }
            }
        }

        updateHenchmenFaceDownCards();
    });
});

function updateHenchmenFaceDownCards() {
    const faceDownCard1 = document.getElementById('henchmenfacedowncard1');
    const faceDownCard2 = document.getElementById('henchmenfacedowncard2');
const cardPile = document.getElementById('chosen-henchmen-image');
const imageElement = cardPile.querySelector('img');

    // If 2 henchmen are selected, show faceDownCard1
    if (selectedHenchmenGroups.length >= 2) {
        faceDownCard1.style.display = 'block';
imageElement.style.cursor = 'alias';

    } else {
        faceDownCard1.style.display = 'none';
imageElement.style.cursor = 'default';
    }

    // If 3 or more henchmen are selected, show faceDownCard2
    if (selectedHenchmenGroups.length >= 3) {
        faceDownCard2.style.display = 'block';
imageElement.style.cursor = 'alias';
    } else {
        faceDownCard2.style.display = 'none';

    }
}

// Event listener for manual hero selection changes
document.querySelectorAll('#hero-selection input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateHeroImage(this.value);  // Update the hero image when a hero group is selected
        } else {
            // If a hero is deselected, remove it from the selectedHeroGroups array
            const deselectedHeroName = this.value;
            const indexToRemove = selectedHeroGroups.findIndex(group => group.name === deselectedHeroName);

            if (indexToRemove !== -1) {
                selectedHeroGroups.splice(indexToRemove, 1);  // Remove the group from the array

                // Adjust currentHeroGroupIndex to stay within bounds
                if (currentHeroGroupIndex >= selectedHeroGroups.length) {
                    currentHeroGroupIndex = 0;  // Reset index if it's out of bounds
                }

                // If any hero groups remain, display the next one
                if (selectedHeroGroups.length > 0) {
                    displayCurrentHeroImage();
                } else {
                    // If no heroes are selected, reset the image to the default back-of-card image
                    resetHeroImage();
                }
            }
        }

        // Update face-down cards visibility based on the number of selected hero groups
        updateHeroFaceDownCards();
    });
});

// Function to update the visibility of face-down cards
function updateHeroFaceDownCards() {
    const faceDownCard1 = document.getElementById('herofacedowncard1');
    const faceDownCard2 = document.getElementById('herofacedowncard2');
const cardPile = document.getElementById('chosen-hero-image');
const imageElement = cardPile.querySelector('img');

    // Show or hide both face-down cards based on whether any heroes are selected
    if (selectedHeroGroups.length > 0) {
        faceDownCard1.style.display = 'block';
        faceDownCard2.style.display = 'block';
imageElement.style.cursor = 'alias';
    } else {
        faceDownCard1.style.display = 'none';
        faceDownCard2.style.display = 'none';
imageElement.style.cursor = 'default';
    }
}

let selectedSidekickGroups = [];  // Store selected sidekick groups in the order they were selected
let currentSidekickGroupIndex = 0; // Index to track which group we are cycling through
let currentSidekickIndex = 0;      // Index to track which card in the current group is displayed

// Initialize sidekick groups (replace with your actual data)
const sidekicksFromStartup = [
   {
        name: "Secret Wars Volume 1",
        cards: [
            { name: "Sidekick 1A", image: "Visual Assets/Sidekicks/Sidekick.webp" }
        ]
    },
    {
        name: "Civil War",
        cards: [
            { name: "Sidekick 2A", image: "Visual Assets/Sidekicks/Hairball.webp" },
            { name: "Sidekick 2B", image: "Visual Assets/Sidekicks/Ms_Lion.webp" },
            { name: "Sidekick 2C", image: "Visual Assets/Sidekicks/Lockheed.webp" },
            { name: "Sidekick 2D", image: "Visual Assets/Sidekicks/Lockjaw.webp" },
            { name: "Sidekick 2E", image: "Visual Assets/Sidekicks/Redwing.webp" },
            { name: "Sidekick 2E", image: "Visual Assets/Sidekicks/Throg.webp" },
            { name: "Sidekick 2E", image: "Visual Assets/Sidekicks/Zabu.webp" }
        ]
    },
    {
        name: "Messiah Complex",
        cards: [
            { name: "Sidekick 3A", image: "Visual Assets/Sidekicks/Layla_Miller.webp" },
            { name: "Sidekick 3B", image: "Visual Assets/Sidekicks/Skids.webp" },
            { name: "Sidekick 3C", image: "Visual Assets/Sidekicks/Rockslide.webp" },
            { name: "Sidekick 3D", image: "Visual Assets/Sidekicks/Darwin.webp" },
            { name: "Sidekick 3E", image: "Visual Assets/Sidekicks/Boom_Boom.webp" },
            { name: "Sidekick 3F", image: "Visual Assets/Sidekicks/Rusty_Firefist_Collins.webp" },
            { name: "Sidekick 3G", image: "Visual Assets/Sidekicks/Prodigy.webp" }
        ]
    }
];

// Function to update the sidekick image based on the selected sidekick group
function updateSidekickImage(selectedSidekickName) {
    // Find the corresponding sidekick group from the array
    const selectedSidekickGroup = sidekicksFromStartup.find(sidekickGroup => sidekickGroup.name === selectedSidekickName);

    // Get the image element inside the container
    const sidekickImageElement = document.querySelector('#chosen-sidekick-image img');

    if (selectedSidekickGroup) {
        // Check if the sidekick group is already in the list
        const existingGroupIndex = selectedSidekickGroups.findIndex(group => group.name === selectedSidekickName);

        // If not in the list, add it to the end of the array (most recently selected)
        if (existingGroupIndex === -1) {
            selectedSidekickGroups.push(selectedSidekickGroup);
        } else {
            // Move the selected group to the end of the array to make it most recent
            selectedSidekickGroups.push(...selectedSidekickGroups.splice(existingGroupIndex, 1));
        }

        // Set the first card of the most recently selected group to display
        currentSidekickGroupIndex = selectedSidekickGroups.length - 1;  // Start from the most recent group
        currentSidekickIndex = 0;  // Reset to the first card of this group
        sidekickImageElement.src = selectedSidekickGroups[currentSidekickGroupIndex].cards[currentSidekickIndex].image;
        sidekickImageElement.alt = selectedSidekickGroups[currentSidekickGroupIndex].cards[currentSidekickIndex].name;

        // Add event listener to cycle through cards when the image is clicked
        sidekickImageElement.onclick = function () {
            cycleSidekickImages();
        };
    } else {
        // If no sidekick group is found, use the default back-of-card image
        sidekickImageElement.src = 'Visual Assets/CardBack.webp';
        sidekickImageElement.alt = 'Default Sidekick';
        selectedSidekickGroups = [];  // Clear the selected groups
        currentSidekickGroupIndex = 0; // Reset group index
        currentSidekickIndex = 0;      // Reset sidekick index
    }

    // Update face-down cards visibility based on the number of selected sidekick groups
    updateSidekickFaceDownCards();
}

// Function to cycle through sidekick images
function cycleSidekickImages() {
    if (selectedSidekickGroups.length > 0) {
        // Increment to the next sidekick card within the current group
        currentSidekickIndex++;

        // If we've reached the end of the current group's cards, move to the next group
        if (currentSidekickIndex >= selectedSidekickGroups[currentSidekickGroupIndex].cards.length) {
            currentSidekickIndex = 0;  // Reset to the first card of the next group
            currentSidekickGroupIndex = (currentSidekickGroupIndex + 1) % selectedSidekickGroups.length;  // Cycle to the next group, loop back to the first
        }

        // Update the image and alt text for the current card in the current group
        const sidekickImageElement = document.querySelector('#chosen-sidekick-image img');
        sidekickImageElement.src = selectedSidekickGroups[currentSidekickGroupIndex].cards[currentSidekickIndex].image;
        sidekickImageElement.alt = selectedSidekickGroups[currentSidekickGroupIndex].cards[currentSidekickIndex].name;
    }
}

// Event listener for sidekick selection changes
document.querySelectorAll('#sidekick-selection input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            updateSidekickImage(this.value);  // Update the sidekick image when a sidekick group is selected
        } else {
            // If a sidekick is deselected, remove it from the selectedSidekickGroups array
            const deselectedSidekickName = this.value;
            const indexToRemove = selectedSidekickGroups.findIndex(group => group.name === deselectedSidekickName);

            if (indexToRemove !== -1) {
                selectedSidekickGroups.splice(indexToRemove, 1);  // Remove the group from the array

                // Adjust currentSidekickGroupIndex to stay within bounds
                if (currentSidekickGroupIndex >= selectedSidekickGroups.length) {
                    currentSidekickGroupIndex = 0;  // Reset index if it's out of bounds
                }

                // If any sidekick groups remain, display the next one
                if (selectedSidekickGroups.length > 0) {
                    displayCurrentSidekickImage();
                } else {
                    // If no sidekicks are selected, reset the image to the default back-of-card image
                    resetSidekickImage();
                }
            }
        }

        // Update face-down cards visibility based on the number of selected sidekick groups
        updateSidekickFaceDownCards();
    });
});

function updateSidekickFaceDownCards() {
    const faceDownCard1 = document.getElementById('sidekickfacedowncard1');
    const faceDownCard2 = document.getElementById('sidekickfacedowncard2');
    const cardPile = document.getElementById('chosen-sidekick-image');
    const imageElement = cardPile.querySelector('img');

    // Special case: If only Secret Wars Volume 1 is selected, hide face-down cards
    if (selectedSidekickGroups.length === 1 && selectedSidekickGroups[0].name === "Secret Wars Volume 1") {
        faceDownCard1.style.display = 'none';
        faceDownCard2.style.display = 'none';
        imageElement.style.cursor = 'default'; // Optional: Change cursor to default since there's no cycling
    } else if (selectedSidekickGroups.length > 0) {
        // Show face-down cards if multiple sidekick groups are selected or if the selected group has multiple cards
        faceDownCard1.style.display = 'block';
        faceDownCard2.style.display = 'block';
        imageElement.style.cursor = 'alias'; // Optional: Change cursor to indicate cycling
    } else {
        // Hide face-down cards if no sidekick groups are selected
        faceDownCard1.style.display = 'none';
        faceDownCard2.style.display = 'none';
        imageElement.style.cursor = 'default'; // Optional: Change cursor to default
    }
}

// Function to display the current sidekick image
function displayCurrentSidekickImage() {
    const sidekickImageElement = document.querySelector('#chosen-sidekick-image img');
    sidekickImageElement.src = selectedSidekickGroups[currentSidekickGroupIndex].cards[currentSidekickIndex].image;
    sidekickImageElement.alt = selectedSidekickGroups[currentSidekickGroupIndex].cards[currentSidekickIndex].name;
}

// Function to reset the sidekick image to the default back-of-card image
function resetSidekickImage() {
    const sidekickImageElement = document.querySelector('#chosen-sidekick-image img');
    sidekickImageElement.src = 'Visual Assets/CardBack.webp';
    sidekickImageElement.alt = 'Default Sidekick';
}

// Initialize sidekick selection on page load
window.addEventListener('load', () => {
    // Trigger the change event for each checkbox to initialize the selected sidekick groups
    document.querySelectorAll('#sidekick-selection input[type=checkbox]').forEach(checkbox => {
        if (checkbox.checked) {
            updateSidekickImage(checkbox.value);
        }
    });
});

function randomizeScheme() {
  // Get the selected filters
  const selectedFilters = Array.from(document.querySelectorAll('#schemelist input[type="checkbox"]:checked'))
    .map(cb => cb.getAttribute('data-set'));

  // Get all scheme radio buttons
  const schemeRadioButtons = Array.from(document.querySelectorAll('#scheme-selection input[type="radio"]'));
  
  // Filter the radio buttons by the selected filters
  const filteredRadioButtons = schemeRadioButtons.filter(button => {
    const schemeSet = button.getAttribute('data-set');
    return selectedFilters.length === 0 || selectedFilters.includes(schemeSet);
  });

  if (filteredRadioButtons.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredRadioButtons.length);
  const selectedRadioButton = filteredRadioButtons[randomIndex];
  selectedRadioButton.checked = true;

  const schemeContainer = document.querySelector('#scheme-section .scrollable-list');
  if (schemeContainer) {
    const schemePosition = selectedRadioButton.offsetTop - schemeContainer.offsetTop;
    schemeContainer.scrollTop = schemePosition - schemeContainer.clientHeight / 2;
  }

  updateSchemeImage(selectedRadioButton.value);
}

function randomizeMastermind() {
  // Get the selected filters
  const selectedFilters = Array.from(document.querySelectorAll('#mastermindlist input[type="checkbox"]:checked'))
    .map(cb => cb.getAttribute('data-set'));

  // Get all mastermind radio buttons
  const mastermindRadioButtons = Array.from(document.querySelectorAll('#mastermind-selection input[type="radio"]'));
  
  // Filter the radio buttons by the selected filters
  const filteredRadioButtons = mastermindRadioButtons.filter(button => {
    const mastermindSet = button.getAttribute('data-set');
    return selectedFilters.length === 0 || selectedFilters.includes(mastermindSet);
  });

  if (filteredRadioButtons.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredRadioButtons.length);
  const selectedRadioButton = filteredRadioButtons[randomIndex];
  selectedRadioButton.checked = true;

  const mastermindContainer = document.querySelector('#mastermind-section .scrollable-list');
  if (mastermindContainer) {
    const mastermindPosition = selectedRadioButton.offsetTop - mastermindContainer.offsetTop;
    mastermindContainer.scrollTop = mastermindPosition - mastermindContainer.clientHeight / 2;
  }

  updateMastermindImage(selectedRadioButton.value);
}


// Function to randomize villain selection
function randomizeVillain() {
    // Clear all current checkbox selections before randomizing
    const villainCheckboxes = document.querySelectorAll('#villain-selection input[type="checkbox"]');
    villainCheckboxes.forEach(checkbox => checkbox.checked = false);

    // Get the selected filters
    const selectedFilters = Array.from(document.querySelectorAll('#villainlist input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-set'));

    // Filter the villain checkboxes by the selected filters
    const filteredCheckboxes = Array.from(villainCheckboxes).filter(checkbox => {
        const villainSet = checkbox.getAttribute('data-set');
        return selectedFilters.length === 0 || selectedFilters.includes(villainSet);
    });

    // If no villains match the filters, reset image and return
    if (filteredCheckboxes.length === 0) {
        resetVillainImage();
        return;
    }

    // Randomly select 1 villain from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredCheckboxes.length);
    const selectedCheckbox = filteredCheckboxes[randomIndex];
    selectedCheckbox.checked = true;

    // Clear the previously selected villain groups
    selectedVillainGroups = [];

    // Add the selected villain group
    const villainGroup = villains.find(villainGroup => villainGroup.name === selectedCheckbox.value);
    selectedVillainGroups.push(villainGroup); // Add selected villain group to the array

    // Set the image to the first villain in the list
    currentVillainGroupIndex = 0;
    currentVillainIndex = 0;
    displayCurrentVillainImage();

    // Scroll to the selected villain checkbox
    const villainContainer = document.querySelector('#villain-section .scrollable-list');
    if (villainContainer) {
        const villainPosition = selectedCheckbox.offsetTop - villainContainer.offsetTop;
        villainContainer.scrollTop = villainPosition - villainContainer.clientHeight / 2;
    }

    // Update face-down cards for the selected villains (if applicable)
    updateVillainFaceDownCards();
}

// Function to update villain image based on selected villain checkbox
function updateVillainImage(selectedVillainName) {
    const selectedVillainGroup = villains.find(villainGroup => villainGroup.name === selectedVillainName);
    const villainImageElement = document.querySelector('#chosen-villain-image img');

    if (selectedVillainGroup) {
        const existingGroupIndex = selectedVillainGroups.findIndex(group => group.name === selectedVillainName);

        if (existingGroupIndex === -1) {
            selectedVillainGroups.push(selectedVillainGroup);
        } else {
            selectedVillainGroups.push(...selectedVillainGroups.splice(existingGroupIndex, 1));
        }

        currentVillainGroupIndex = selectedVillainGroups.length - 1;
        currentVillainIndex = 0;
        displayCurrentVillainImage();
    } else {
        resetVillainImage();
    }
}

// Function to display the current villain image
function displayCurrentVillainImage() {
    if (selectedVillainGroups.length > 0) {
        const currentVillainGroup = selectedVillainGroups[currentVillainGroupIndex];
        const currentVillainCard = currentVillainGroup.cards[currentVillainIndex];

        const villainImageElement = document.querySelector('#chosen-villain-image img');
        villainImageElement.src = currentVillainCard.image;
        villainImageElement.alt = currentVillainCard.name;

        villainImageElement.onclick = function() {
            cycleVillainImages();
        };
    } else {
        resetVillainImage();
    }
}

// Function to cycle through villain images
function cycleVillainImages() {
    if (selectedVillainGroups.length > 0) {
        currentVillainIndex++;

        if (currentVillainIndex >= selectedVillainGroups[currentVillainGroupIndex].cards.length) {
            currentVillainIndex = 0;
            currentVillainGroupIndex = (currentVillainGroupIndex + 1) % selectedVillainGroups.length;
        }

        displayCurrentVillainImage();
    }
}

// Helper function to reset villain image to default
function resetVillainImage() {
    const villainImageElement = document.querySelector('#chosen-villain-image img');
    villainImageElement.src = 'Visual Assets/CardBack.webp';
    villainImageElement.alt = 'Default Villain';
    
    selectedVillainGroups = [];
    currentVillainGroupIndex = 0;
    currentVillainIndex = 0;

    updateVillainFaceDownCards();
}

// Function to randomize henchman selection
function randomizeHenchmen() {
    // Clear all current checkbox selections before randomizing
    const henchmenCheckboxes = document.querySelectorAll('#henchmen-selection input[type="checkbox"]');
    henchmenCheckboxes.forEach(checkbox => checkbox.checked = false);

    // Get the selected filters
    const selectedFilters = Array.from(document.querySelectorAll('#henchmenlist input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-set'));

    // Filter the henchmen checkboxes by the selected filters
    const filteredCheckboxes = Array.from(henchmenCheckboxes).filter(checkbox => {
        const henchmenSet = checkbox.getAttribute('data-set');
        return selectedFilters.length === 0 || selectedFilters.includes(henchmenSet);
    });

    // If no henchmen match the filters, reset image and return
    if (filteredCheckboxes.length === 0) {
        resetHenchmenImage();
        return;
    }

    // Randomly select 1 henchman from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredCheckboxes.length);
    const selectedCheckbox = filteredCheckboxes[randomIndex];
    selectedCheckbox.checked = true;

    // Clear the previously selected henchmen groups
    selectedHenchmenGroups = [];

    // Add the selected henchman group
    const henchmenGroup = henchmen.find(henchmenGroup => henchmenGroup.name === selectedCheckbox.value);
    selectedHenchmenGroups.push(henchmenGroup); // Add selected henchman group to the array

    // Set the image to the selected henchman
    currentHenchmenGroupIndex = 0;
    displayCurrentHenchmenImage();

    // Scroll to the selected henchman checkbox
    const henchmenContainer = document.querySelector('#henchmen-section .scrollable-list');
    if (henchmenContainer) {
        const henchmenPosition = selectedCheckbox.offsetTop - henchmenContainer.offsetTop;
        henchmenContainer.scrollTop = henchmenPosition - henchmenContainer.clientHeight / 2;
    }

    // Update face-down cards for the selected henchmen (if applicable)
    updateHenchmenFaceDownCards();
}


// Function to randomize hero selection
function randomizeHero() {
    // Clear all current checkbox selections before randomizing
    const heroCheckboxes = document.querySelectorAll('#hero-selection input[type="checkbox"]');
    heroCheckboxes.forEach(checkbox => checkbox.checked = false);

    // Get the selected set and team filters
    const selectedSetFilters = Array.from(document.querySelectorAll('#herosetfilter input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-set'));
    const selectedTeamFilters = Array.from(document.querySelectorAll('#heroteamfilter input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-team'));

    // Filter the hero checkboxes by the selected filters
    const filteredCheckboxes = Array.from(heroCheckboxes).filter(checkbox => {
        const heroSet = checkbox.getAttribute('data-set');
        const heroTeam = checkbox.getAttribute('data-team');
        const matchesSet = selectedSetFilters.length === 0 || selectedSetFilters.includes(heroSet);
        const matchesTeam = selectedTeamFilters.length === 0 || selectedTeamFilters.includes(heroTeam);
        return matchesSet && matchesTeam;
    });

    // If no heroes match the filters, reset image and return
    if (filteredCheckboxes.length === 0) {
        resetHeroImage();
        return;
    }

    // Randomly select 3 heroes from the filtered list
    const shuffledCheckboxes = filteredCheckboxes.sort(() => 0.5 - Math.random()); // Shuffle the array
    const selectedCheckboxes = shuffledCheckboxes.slice(0, 3); // Pick the first 3

    // Clear the previously selected hero groups
    selectedHeroGroups = [];

    // Select these heroes by checking their checkboxes and adding them to the selected groups
    selectedCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        const heroGroup = heroes.find(heroGroup => heroGroup.name === checkbox.value);
        selectedHeroGroups.push(heroGroup); // Add selected hero group to the array
    });

    // Sort the selected heroes alphabetically by their value (name)
    selectedHeroGroups.sort((a, b) => a.name.localeCompare(b.name));

    // Set the image to the first hero in the list
    currentHeroGroupIndex = 0;
    currentHeroIndex = 0;
    displayCurrentHeroImage();

    // Scroll to the first selected hero checkbox
    const heroContainer = document.querySelector('#hero-section .scrollable-list');
    if (heroContainer) {
        const heroPosition = selectedCheckboxes[0].offsetTop - heroContainer.offsetTop;
        heroContainer.scrollTop = heroPosition - heroContainer.clientHeight / 2;
    }

    // Update face-down cards for the selected heroes (if applicable)
    updateHeroFaceDownCards();
}

// Function to update hero image based on selected hero checkbox
function updateHeroImage(selectedHeroName) {
    // Find the corresponding hero group from the array
    const selectedHeroGroup = heroes.find(heroGroup => heroGroup.name === selectedHeroName);

    // Get the image element inside the container
    const heroImageElement = document.querySelector('#chosen-hero-image img');

    if (selectedHeroGroup) {
        // Check if the hero group is already in the list
        const existingGroupIndex = selectedHeroGroups.findIndex(group => group.name === selectedHeroName);
        
        // If not in the list, add it to the end of the array (most recently selected)
        if (existingGroupIndex === -1) {
            selectedHeroGroups.push(selectedHeroGroup);
        } else {
            // Move the selected group to the end of the array to make it most recent
            selectedHeroGroups.push(...selectedHeroGroups.splice(existingGroupIndex, 1));
        }

        // Set the first card of the most recently selected group to display
        currentHeroGroupIndex = selectedHeroGroups.length - 1;  // Start from the most recent group
        currentHeroIndex = 0;  // Reset to the first card of this group
        displayCurrentHeroImage();
    } else {
        // If no hero group is found, use the default back-of-card image
        resetHeroImage();
    }
}

// Function to display the current hero image based on currentHeroGroupIndex and currentHeroIndex
function displayCurrentHeroImage() {
    if (selectedHeroGroups.length > 0) {
        const currentHeroGroup = selectedHeroGroups[currentHeroGroupIndex];
        const currentHeroCard = currentHeroGroup.cards[currentHeroIndex];

        const heroImageElement = document.querySelector('#chosen-hero-image img');
        heroImageElement.src = currentHeroCard.image;
        heroImageElement.alt = currentHeroCard.name;

        // Add event listener to allow cycling through the images
        heroImageElement.onclick = function() {
            cycleHeroImages();
        };
    } else {
        resetHeroImage();
    }
}

// Function to cycle through hero images
function cycleHeroImages() {
    if (selectedHeroGroups.length > 0) {
        // Move to the next card in the current group
        currentHeroIndex++;

        // If the current group has no more cards, move to the next group
        if (currentHeroIndex >= selectedHeroGroups[currentHeroGroupIndex].cards.length) {
            currentHeroIndex = 0;  // Reset to the first card of the next group
            currentHeroGroupIndex = (currentHeroGroupIndex + 1) % selectedHeroGroups.length;  // Cycle to the next group, loop back to the first
        }

        // Display the updated hero image
        displayCurrentHeroImage();
    }
}

// Helper function to reset hero image to default
function resetHeroImage() {
    const heroImageElement = document.querySelector('#chosen-hero-image img');
    heroImageElement.src = 'Visual Assets/CardBack.webp';
    heroImageElement.alt = 'Default Hero';
    
    // Also clear any selected hero groups
    selectedHeroGroups = [];
    currentHeroGroupIndex = 0;
    currentHeroIndex = 0;

    // Hide face-down cards if needed
    updateHeroFaceDownCards();
}


// Individual randomize buttons
document.getElementById('randomize-scheme').addEventListener('click', () => {
    randomizeScheme();
});

document.getElementById('randomize-mastermind').addEventListener('click', () => {
    randomizeMastermind();
});

document.getElementById('randomize-villains').addEventListener('click', () => {
    randomizeVillain();
});

document.getElementById('randomize-henchmen').addEventListener('click', () => {
    randomizeHenchmen();
});

document.getElementById('randomize-heroes').addEventListener('click', () => {
    randomizeHero();
});

document.getElementById('randomize-all').addEventListener('click', () => {
    randomizeAll();
});

function randomizeAll() {
    // Step 1: Randomize the scheme first
    randomizeScheme();

    // Get the selected scheme to determine its requirements
    const selectedScheme = document.querySelector('#scheme-section input[type="radio"]:checked');
    const schemeName = selectedScheme.value;
    const scheme = schemes.find(s => s.name === schemeName); // Assuming `schemes` is an array of scheme objects

    if (!scheme) {
        console.error("Selected scheme not found in the schemes list.");
        return;
    }

    // Step 2: Randomize the mastermind
    randomizeMastermind();

    // Step 3: Randomize villains based on the scheme's requirements
    randomizeVillainWithRequirements(scheme);

    // Step 4: Randomize henchmen based on the scheme's requirements
    randomizeHenchmenWithRequirements(scheme);

    // Step 5: Randomize heroes based on the scheme's requirements
    randomizeHeroWithRequirements(scheme);

    // Update images after all randomizations are done
    setTimeout(() => {
        updateSchemeImage(schemeName);
        const selectedMastermindValue = document.querySelector('#mastermind-section input[type="radio"]:checked').value;
        updateMastermindImage(selectedMastermindValue);
    }, 0);
}

function randomizeVillainWithRequirements(scheme) {
    // Clear all current checkbox selections before randomizing
    const villainCheckboxes = document.querySelectorAll('#villain-selection input[type="checkbox"]');
    villainCheckboxes.forEach(checkbox => checkbox.checked = false);

    // Get the selected filters
    const selectedFilters = Array.from(document.querySelectorAll('#villainlist input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-set'));

    // Filter the villain checkboxes by the selected filters
    const filteredCheckboxes = Array.from(villainCheckboxes).filter(checkbox => {
        const villainSet = checkbox.getAttribute('data-set');
        return selectedFilters.length === 0 || selectedFilters.includes(villainSet);
    });

    // If no villains match the filters, reset image and return
    if (filteredCheckboxes.length === 0) {
        resetVillainImage();
        return;
    }

    // Clear the previously selected villain groups
    selectedVillainGroups = [];

    // If the scheme has a specific villain requirement, ensure it's included
    if (scheme.specificVillainRequirement) {
        const requiredVillain = filteredCheckboxes.find(checkbox => checkbox.value === scheme.specificVillainRequirement);
        if (requiredVillain) {
            // Select the required villain
            requiredVillain.checked = true;
            const requiredVillainGroup = villains.find(villainGroup => villainGroup.name === requiredVillain.value);
            selectedVillainGroups.push(requiredVillainGroup);

            // Remove the required villain from the pool of available villains
            const remainingCheckboxes = filteredCheckboxes.filter(checkbox => checkbox !== requiredVillain);

            // Randomly select the remaining villains (if any are needed)
            const remainingSlots = scheme.requiredVillains - 1; // Subtract 1 for the required villain
            if (remainingSlots > 0 && remainingCheckboxes.length > 0) {
                const shuffledCheckboxes = remainingCheckboxes.sort(() => 0.5 - Math.random()); // Shuffle the array
                const selectedCheckboxes = shuffledCheckboxes.slice(0, remainingSlots); // Pick the required number

                // Add the selected villain groups
                selectedCheckboxes.forEach(checkbox => {
                    checkbox.checked = true;
                    const villainGroup = villains.find(villainGroup => villainGroup.name === checkbox.value);
                    selectedVillainGroups.push(villainGroup);
                });
            }
        } else {
            console.error(`Required villain "${scheme.specificVillainRequirement}" not found in the filtered list.`);
        }
    } else {
        // If no specific villain is required, randomly select the required number of villains
        const shuffledCheckboxes = filteredCheckboxes.sort(() => 0.5 - Math.random()); // Shuffle the array
        const selectedCheckboxes = shuffledCheckboxes.slice(0, scheme.requiredVillains); // Pick the required number

        // Add the selected villain groups
        selectedCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            const villainGroup = villains.find(villainGroup => villainGroup.name === checkbox.value);
            selectedVillainGroups.push(villainGroup);
        });
    }

    // Set the image to the first villain in the list
    currentVillainGroupIndex = 0;
    currentVillainIndex = 0;
    displayCurrentVillainImage();

    // Scroll to the first selected villain checkbox
    const villainContainer = document.querySelector('#villain-section .scrollable-list');
    if (villainContainer && selectedVillainGroups.length > 0) {
        // Convert villainCheckboxes to an array to use .find()
        const villainCheckboxesArray = Array.from(villainCheckboxes);
        const firstVillainCheckbox = villainCheckboxesArray.find(checkbox => checkbox.value === selectedVillainGroups[0].name);
        if (firstVillainCheckbox) {
            const villainPosition = firstVillainCheckbox.offsetTop - villainContainer.offsetTop;
            villainContainer.scrollTop = villainPosition - villainContainer.clientHeight / 2;
        }
    }

    // Update face-down cards for the selected villains
    updateVillainFaceDownCards();
}


function randomizeHenchmenWithRequirements(scheme) {
    // Clear all current checkbox selections before randomizing
    const henchmenCheckboxes = document.querySelectorAll('#henchmen-selection input[type="checkbox"]');
    henchmenCheckboxes.forEach(checkbox => checkbox.checked = false);

    // Get the selected filters
    const selectedFilters = Array.from(document.querySelectorAll('#henchmenlist input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-set'));

    // Filter the henchmen checkboxes by the selected filters
    const filteredCheckboxes = Array.from(henchmenCheckboxes).filter(checkbox => {
        const henchmenSet = checkbox.getAttribute('data-set');
        return selectedFilters.length === 0 || selectedFilters.includes(henchmenSet);
    });

    // If no henchmen match the filters, reset image and return
    if (filteredCheckboxes.length === 0) {
        resetHenchmenImage();
        return;
    }

    // Randomly select the required number of henchmen
    const shuffledCheckboxes = filteredCheckboxes.sort(() => 0.5 - Math.random()); // Shuffle the array
    const selectedCheckboxes = shuffledCheckboxes.slice(0, scheme.requiredHenchmen); // Pick the required number

    // Clear the previously selected henchmen groups
    selectedHenchmenGroups = [];

    // Add the selected henchmen groups
    selectedCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        const henchmenGroup = henchmen.find(henchmenGroup => henchmenGroup.name === checkbox.value);
        selectedHenchmenGroups.push(henchmenGroup);
    });

    // Set the image to the first henchman in the list
    currentHenchmenGroupIndex = 0;
    displayCurrentHenchmenImage();

    // Scroll to the first selected henchman checkbox
    const henchmenContainer = document.querySelector('#henchmen-section .scrollable-list');
    if (henchmenContainer) {
        const henchmenPosition = selectedCheckboxes[0].offsetTop - henchmenContainer.offsetTop;
        henchmenContainer.scrollTop = henchmenPosition - henchmenContainer.clientHeight / 2;
    }

    // Update face-down cards for the selected henchmen
    updateHenchmenFaceDownCards();
}

function randomizeHeroWithRequirements(scheme) {
    // Clear all current checkbox selections before randomizing
    const heroCheckboxes = document.querySelectorAll('#hero-selection input[type="checkbox"]');
    heroCheckboxes.forEach(checkbox => checkbox.checked = false);

    // Get the selected set and team filters
    const selectedSetFilters = Array.from(document.querySelectorAll('#herosetfilter input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-set'));
    const selectedTeamFilters = Array.from(document.querySelectorAll('#heroteamfilter input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-team'));

    // Filter the hero checkboxes by the selected filters
    const filteredCheckboxes = Array.from(heroCheckboxes).filter(checkbox => {
        const heroSet = checkbox.getAttribute('data-set');
        const heroTeam = checkbox.getAttribute('data-team');
        const matchesSet = selectedSetFilters.length === 0 || selectedSetFilters.includes(heroSet);
        const matchesTeam = selectedTeamFilters.length === 0 || selectedTeamFilters.includes(heroTeam);
        return matchesSet && matchesTeam;
    });

    // If no heroes match the filters, reset image and return
    if (filteredCheckboxes.length === 0) {
        resetHeroImage();
        return;
    }

    // Randomly select the required number of heroes
    const shuffledCheckboxes = filteredCheckboxes.sort(() => 0.5 - Math.random()); // Shuffle the array
    const selectedCheckboxes = shuffledCheckboxes.slice(0, scheme.requiredHeroes); // Pick the required number

    // Clear the previously selected hero groups
    selectedHeroGroups = [];

    // Add the selected hero groups
    selectedCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        const heroGroup = heroes.find(heroGroup => heroGroup.name === checkbox.value);
        selectedHeroGroups.push(heroGroup);
    });

    // Set the image to the first hero in the list
    currentHeroGroupIndex = 0;
    currentHeroIndex = 0;
    displayCurrentHeroImage();

    // Scroll to the first selected hero checkbox
    const heroContainer = document.querySelector('#hero-section .scrollable-list');
    if (heroContainer) {
        const heroPosition = selectedCheckboxes[0].offsetTop - heroContainer.offsetTop;
        heroContainer.scrollTop = heroPosition - heroContainer.clientHeight / 2;
    }

    // Update face-down cards for the selected heroes
    updateHeroFaceDownCards();
}

function formatList(items) {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
}

function showConfirmChoicesPopup(scheme, mastermind, villains, henchmen, heroes) {


    document.getElementById('chosen-scheme').innerHTML = `Your Chosen Scheme: <span class="bold-spans">${scheme.name}</span>`;
    document.getElementById('chosen-mastermind').innerHTML = `Your Chosen Mastermind: <span class="bold-spans">${mastermind.name}</span>`;

    const villainGroupText = villains.length === 1 ? 'group' : 'groups';
    const heroGroupText = heroes.length === 1 ? 'Hero' : 'Heroes';

    let villainFeedback = '';
    let henchmenFeedback = '';
    let heroFeedback = '';
    let specificVillainRequirementMet = true;

    if (scheme.specificVillainRequirement) {
        specificVillainRequirementMet = villains.some(villain => {
            const normalizedVillainName = villain.trim().toLowerCase();
            const normalizedRequirement = scheme.specificVillainRequirement.trim().toLowerCase();
            return normalizedVillainName === normalizedRequirement;
        });

        if (!specificVillainRequirementMet) {
            villainFeedback += ` <br><span class="error-spans">You must include the ${scheme.specificVillainRequirement} villain group.</span>`;
        }
    }

    if (villains.length < scheme.requiredVillains) {
        villainFeedback += `<br><span class="error-spans">Please select ${scheme.requiredVillains - villains.length > 1 ? 'more villain groups' : 'another villain group'}.</span>`;
    } else if (villains.length > scheme.requiredVillains) {
        villainFeedback += `<br><span class="error-spans">Please select ${villains.length - scheme.requiredVillains > 1 ? 'fewer villain groups' : 'one less villain group'}.</span>`;
    }

       if (heroes.length < scheme.requiredHeroes) {
        heroFeedback += `<br><span class="error-spans">Please select ${scheme.requiredHeroes - heroes.length > 1 ? 'more heroes' : 'another hero'}.</span>`;
    } else if (heroes.length > scheme.requiredHeroes) {
        heroFeedback += `<br><span class="error-spans">Please select ${heroes.length - scheme.requiredHeroes > 1 ? 'fewer heroes' : 'one less hero'}.</span>`;
    }

    const formattedVillains = `<span class="bold-spans">${formatList(villains)}.</span>`;
    const formattedHenchmen = `<span class="bold-spans">${formatList(henchmen)}.</span>`;
    const formattedHeroes = `<span class="bold-spans">${formatList(heroes)}.</span>`;

    document.getElementById('required-villains-count').innerHTML = `<span class="bold-spans">${scheme.requiredVillains} Villain ${villainGroupText}</span>`;
    document.getElementById('villains-list').innerHTML = formattedVillains + villainFeedback;

   
// Check if the number of selected henchmen is incorrect
if (henchmen.length < scheme.requiredHenchmen) {
    // Not enough henchmen selected
    if (henchmen.length === 0) {
        henchmenFeedback = '<br><span class="error-spans">Please select a Henchmen group.</span>';
    } else {
        henchmenFeedback = `<br><span class="error-spans">Please select ${scheme.requiredHenchmen - henchmen.length} more Henchmen ${scheme.requiredHenchmen - henchmen.length > 1 ? 'groups' : 'group'}.</span>`;
    }
} else if (henchmen.length > scheme.requiredHenchmen) {
    // Too many henchmen selected
    henchmenFeedback = `<br><span class="error-spans">Please select ${henchmen.length - scheme.requiredHenchmen} fewer Henchmen ${henchmen.length - scheme.requiredHenchmen > 1 ? 'groups' : 'group'}.</span>`;
}

// Update the UI with the required number of henchmen and feedback
const henchmenGroupText = scheme.requiredHenchmen === 1 ? 'group' : 'groups';
document.getElementById('required-henchmen-count').innerHTML = `<span class="bold-spans">${scheme.requiredHenchmen} Henchmen ${henchmenGroupText}</span>`;

// Display the selected henchmen and feedback
document.getElementById('henchmen-list').innerHTML = henchmen.length > 0 ? formattedHenchmen + henchmenFeedback : henchmenFeedback;

    document.getElementById('required-heroes-count').innerHTML = `<span class="bold-spans">${scheme.requiredHeroes} ${heroGroupText}</span>`;
    document.getElementById('heroes-list').innerHTML = formattedHeroes + heroFeedback;

    const villainsCorrect = villains.length === scheme.requiredVillains && specificVillainRequirementMet;
    const heroesCorrect = heroes.length === scheme.requiredHeroes;
    const henchmenCorrect = henchmen.length === scheme.requiredHenchmen;

    const allRequirementsMet = villainsCorrect && henchmenCorrect && heroesCorrect;

    const beginButton = document.getElementById('begin-game');
    beginButton.disabled = !allRequirementsMet;

    document.getElementById('confirm-start-up-choices').style.display = 'block';
document.getElementById('modal-overlay').style.display = 'block';
}


document.getElementById('return-to-selections').addEventListener('click', function() {
    document.getElementById('confirm-start-up-choices').style.display = 'none';
document.getElementById('modal-overlay').style.display = 'none';
});

document.getElementById('begin-game').addEventListener('click', function() {
    if (!this.disabled) {
        const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
        const selectedMastermind = document.querySelector('#mastermind-section input[type=radio]:checked').value;
        const selectedVillains = Array.from(document.querySelectorAll('#villain-selection input[type=checkbox]:checked')).map(cb => cb.value);
        const selectedHenchmen = Array.from(document.querySelectorAll('#henchmen-selection input[type=checkbox]:checked')).map(cb => cb.value);
        const selectedHeroes = Array.from(document.querySelectorAll('#hero-selection input[type=checkbox]:checked')).map(cb => cb.value);

        finalBlowEnabled = document.getElementById('final-blow-checkbox').checked;

        const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

        // Start the game
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('game-board').style.display = 'block';
	document.getElementById('expand-side-panel').style.display = 'block';
        document.getElementById('side-panel').style.display = 'flex';

        initGame(selectedHeroes, selectedVillains, selectedHenchmen, selectedMastermind, selectedScheme);

        // Close the popup
        document.getElementById('confirm-start-up-choices').style.display = 'none';
document.getElementById('modal-overlay').style.display = 'none';
    }
});

document.getElementById('start-game').addEventListener('click', () => {
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedMastermind = document.querySelector('#mastermind-section input[type=radio]:checked').value;
    const selectedVillains = Array.from(document.querySelectorAll('#villain-selection input[type=checkbox]:checked')).map(cb => cb.value);
    const selectedHenchmen = Array.from(document.querySelectorAll('#henchmen-selection input[type=checkbox]:checked')).map(cb => cb.value);
    const selectedHeroes = Array.from(document.querySelectorAll('#hero-selection input[type=checkbox]:checked')).map(cb => cb.value);

    finalBlowEnabled = document.getElementById('final-blow-checkbox').checked;

    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    // Show the confirmation popup with the selected values
    showConfirmChoicesPopup(
        selectedScheme,
        { name: selectedMastermind },
        selectedVillains,
        selectedHenchmen,
        selectedHeroes
    );
});



function adjustWoundDeckForScheme(scheme) {
    if (scheme.name === 'The Legacy Virus') {
        woundDeck = Array(6).fill({ name: "Wound", type: "Wound", cost: 0, image: "Visual Assets/Other/Wound.webp" });
    } else {
        woundDeck = [...wounds]; // Default setup for the woundDeck
    }
}

function generateHeroDeck(selectedHeroes) {
    let deck = [];
    selectedHeroes.forEach(heroName => {
        const hero = heroes.find(h => h.name === heroName);

        if (hero) {
            hero.cards.forEach(card => {
                let count;
                switch(card.rarity) {
                    case 'Common':
                    case 'Common 2':
                        count = 5;
                        break;
                    case 'Uncommon':
                        count = 3;
                        break;
                    case 'Rare':
                        count = 1;
                        break;
                    default:
                        count = 0;
                }
                for (let i = 0; i < count; i++) {
                    deck.push({ ...card });
                }
            });
        }
    });
    return shuffle(deck);
}

function generateVillainDeck(selectedVillains, selectedHenchmen, scheme, heroDeck) {
    let deck = [];

    // Add villain cards
    selectedVillains.forEach(villainName => {
        const villain = window.villains.find(v => v.name === villainName);
        if (villain) {
            villain.cards.forEach(card => {
                deck.push({ ...card, type: 'Villain' });
                deck.push({ ...card, type: 'Villain' });
            });
        } else {
            console.warn(`Villain with name ${villainName} not found.`);
        }
    });

const selectedSpecialHenchman = selectedHenchmen[Math.floor(Math.random() * selectedHenchmen.length)];
let henchmenToPlaceOnTop = [];


  selectedHenchmen.forEach(henchmanName => {
    const henchman = window.henchmen.find(h => h.name === henchmanName);
    if (henchman) {
        if (henchmanName === selectedSpecialHenchman) {
            // For the selected special henchman:
            // Add 2 copies to the deck
            for (let i = 0; i < 2; i++) {
                deck.push({ ...henchman, subtype: 'Henchman' });
            }
            // Add 2 copies to the "to place on top" array
            for (let i = 0; i < 2; i++) {
                henchmenToPlaceOnTop.push({ ...henchman, subtype: 'Henchman' });
            }
        } else {
            // For the other henchmen:
            // Add 10 copies to the deck
            for (let i = 0; i < 10; i++) {
                deck.push({ ...henchman, subtype: 'Henchman' });
            }
        }
    } else {
        console.warn(`Henchman with name ${henchmanName} not found.`);
    }
});

    // Adjust for the scheme "Secret Invasion of the Skrull Shapeshifters"
    if (scheme.name === 'Secret Invasion of the Skrull Shapeshifters' && heroDeck) {
        const skrulledHeroes = heroDeck.splice(0, 12).map(hero => {
            return {
                ...hero,
                skrulled: true,
                originalAttack: hero.attack,
                cost: hero.cost,
                attack: hero.cost + 2, // Assign the increased cost to attack
                type: 'Villain',
                fightEffect: 'unskrull',
overlayText: `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">SKRULL</span>`,
overlayTextAttack: `${hero.cost + 2}`
        };
        });
        deck.push(...skrulledHeroes);
    } else if (!heroDeck) {
        console.error("Hero deck is undefined or not passed correctly.");
    }

    adjustWoundDeckForScheme(scheme);

    // Add bystanders, master strikes, and scheme twists
    for (let i = 0; i < scheme.bystanderCount; i++) {
        const bystander = bystanderDeck.splice(0, 1)[0];
        if (bystander) {
            deck.push(bystander);
        }
    }

 const schemeImage = document.createElement('img');
const schemePlace = document.getElementById('scheme-place');
    schemeImage.src = scheme.image;
    schemeImage.alt = scheme.name;
    schemeImage.classList.add('card-image');

    // Append the image to the mastermind cell
    schemePlace.appendChild(schemeImage);

   if (scheme.name === "Replace Earth's Leaders with Killbots") {

killbotSchemeTwistCount += 3;
    for (let i = 0; i < 18; i++) {
        // Remove a random bystander from the bystander deck
        if (bystanderDeck.length > 0) {
            const randomIndex = Math.floor(Math.random() * bystanderDeck.length);
            bystanderDeck.splice(randomIndex, 1); // Removes the randomly selected bystander
        }

        // Add a Killbot to the deck
        deck.push({
            type: "Villain",
            name: "Killbot",
            team: "None",
	    originalAttack: 0,
            attack: 0,
            cost: 0,
            victoryPoints: 1,
            killbot: true,
            overlayTextAttack: `${killbotAttack}`,
            image: "Visual Assets/Other/Killbot.webp"
        });
    }
}

    for (let i = 0; i < 5; i++) {
        deck.push({ name: 'Master Strike', type: 'Master Strike', image: "Visual Assets/Other/MasterStrike.webp" });
    }

    for (let i = 0; i < scheme.twistCount; i++) {
        deck.push({ name: 'Scheme Twist', type: 'Scheme Twist', image: "Visual Assets/Other/SchemeTwist.webp" });
    }

    // Shuffle the deck
    deck = shuffle(deck);

    deck = [...deck, ...henchmenToPlaceOnTop];

    // Log the deck to debug
    console.log('Henchmen to place on top:', henchmenToPlaceOnTop);
    console.log('Generated Villain Deck:', deck);

    return deck;
}

function initGame(heroes, villains, henchmen, mastermindName, scheme) {
    console.log('Initializing game with:');
    console.log('Heroes:', heroes);
    console.log('Villains:', villains);
    console.log('Henchmen:', henchmen);
    console.log('Mastermind:', mastermindName);
    console.log('Scheme:', scheme);
    console.log('Final Blow Enabled:', finalBlowEnabled);

let selectedExpansions = getSelectedExpansions();

            // Filter the shuffled deck
            sidekickDeck = filterDeckByExpansions(sidekickDeck, selectedExpansions);

updateDeckCounts();

    const mastermind = getSelectedMastermind();
    mastermind.bystanders = [];
    const mastermindDeck = generateMastermindDeck(mastermind);

const mastermindCell = document.getElementById('mastermind');

    // Create an image element
    const mastermindImage = document.createElement('img');
    mastermindImage.src = mastermind.image; // Use the image property from the mastermind object
    mastermindImage.alt = mastermind.name; // Set alt text as the mastermind name
    mastermindImage.classList.add('card-image'); // Add a class for styling if needed

    // Append the image to the mastermind cell
    mastermindCell.appendChild(mastermindImage);

    console.log('Selected Mastermind:', mastermind);
    console.log('Mastermind Deck:', mastermindDeck);

    const selectedVillains = Array.from(document.querySelectorAll('#villains-section input[type=checkbox]:checked')).map(cb => cb.value);

    if (selectedVillains.length === 1) {
        alwaysLeads = selectedVillains[0];
        console.log(`The Mastermind always leads ${alwaysLeads}`);
    } else if (selectedVillains.length > 1) {
        const randomIndex = Math.floor(Math.random() * selectedVillains.length);
        alwaysLeads = selectedVillains[randomIndex];
        console.log(`The Mastermind always leads ${alwaysLeads}`);
    } else {
        console.log('No villains selected. The Mastermind has no specific group to lead.');
    }

    // Generate the hero deck first
    heroDeck = generateHeroDeck(heroes);
    console.log('Hero Deck:', heroDeck);

    if (!heroDeck || heroDeck.length === 0) {
        console.error("Hero deck was not generated correctly.");
        return; // Stop the game initialization if heroDeck is not valid
    }

    // Now generate the villain deck and pass the hero deck to it
    villainDeck = generateVillainDeck(villains, henchmen, scheme, heroDeck);
    console.log('Villain Deck:', villainDeck);

    // Generate the player deck
    playerDeck = shuffle([...shieldCards]);

    // Initialize the HQ with 5 hero cards
    hq = [];
    for (let i = 0; i < 5; i++) {
        hq.push(heroDeck.pop());
    }

    // Draw the initial player hand
    playerHand = [];
    for (let i = 0; i < 6; i++) {
        drawCard();
    }

    // Update the game board and draw the first villain card
    updateGameBoard();
    drawVillainCard();

    // Hide the confirm selection popup (if this is where you want to close it)
    document.getElementById('confirm-start-up-choices').style.display = 'none';
}

let isFirstTurn = true;

async function drawVillainCard() {
    return new Promise((resolve, reject) => {
        if (villainDeck.length === 0) {
            showDrawPopup();
            resolve();
            return;
        }

        const drawCount = isFirstTurn ? 3 : 1;
        isFirstTurn = false;

        const drawVillainsRecursively = async (drawRemaining) => {
            if (drawRemaining === 0) {
                updateGameBoard();
                resolve(); // Resolve after all villains are drawn and processed
                return;
            }

            if (villainDeck.length === 0) {
                showDrawPopup();
                resolve();
                return;
            }

            const villainCard = villainDeck.pop();
            console.log(`Drew villain card:`, villainCard);

            if (!villainCard || !villainCard.name) {
                console.error('Drew an undefined or malformed card:', villainCard);
                drawVillainsRecursively(drawRemaining - 1);
                return;
            }

            // Handle Master Strike and Scheme Twist before proceeding with any further draws
            if (villainCard.name.includes('Master Strike')) {
                handleMasterStrike(villainCard).then(() => {
                    console.log('Master Strike handled.');
                    drawVillainsRecursively(drawRemaining - 1); // Continue drawing villains after resolving Master Strike
                }).catch((error) => {
                    console.error('Error handling Master Strike:', error);
                    drawVillainsRecursively(drawRemaining - 1); // Proceed even if there's an error
                });
            } else if (villainCard.name.includes('Scheme Twist')) {
    await handleSchemeTwist(villainCard);
    
    // Check if we need to KO a hero after processing all Twists
    if (pendingHeroKO && schemeTwistChainDepth === 0) {
        pendingHeroKO = false;
        await showHeroSelectPopup();
    }
    
    await drawVillainsRecursively(drawRemaining - 1);
} else {
                // Handle Bystanders
                if (villainCard.name === 'Bystander') {
                    handleBystander(villainCard);
                    drawVillainsRecursively(drawRemaining - 1);
                } else {
                    // Villain enters the city and we handle its movements and ambush effects
                    let sewersIndex = city.length - 1;
                    let previousCard = city[sewersIndex];
                    city[sewersIndex] = villainCard;
onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> enters the city.`);

                    let moveVillainsPromise = Promise.resolve();

                    // Move existing villains to the left
                    for (let j = sewersIndex - 1; j >= 0; j--) {
                        moveVillainsPromise = moveVillainsPromise.then(() => {
                            return new Promise((resolveMove) => {
                                if (city[j] === null) {
                                    city[j] = previousCard;
                                    previousCard = null;
                                    resolveMove();
                                    return;
                                } else if (previousCard !== null) {
                                    let temp = city[j];
                                    city[j] = previousCard;
                                    previousCard = temp;

                                    if (j === 0 && previousCard) {
                                        handleVillainEscape(previousCard).then(resolveMove).catch((error) => {
                                            console.error('Error in handleVillainEscape:', error);
                                            resolveMove();
                                        });
                                    } else {
                                        resolveMove();
                                    }
                                } else {
                                    resolveMove();
                                }
                            });
                        });
                    }

                    // Handle Ambush effects after moving villains
                    moveVillainsPromise.then(() => {
                        if (villainCard.ambushEffect && villainCard.ambushEffect !== "None") {
                            const ambushEffectFunction = window[villainCard.ambushEffect];
                            if (typeof ambushEffectFunction === 'function') {
                                let ambushEffectPromise = new Promise((resolveAmbush, rejectAmbush) => {
                                    try {
                                        const result = ambushEffectFunction(villainCard);
                                        if (result instanceof Promise) {
                                            result.then(resolveAmbush).catch(rejectAmbush);
                                        } else {
                                            resolveAmbush(result);
                                        }
                                    } catch (error) {
                                        console.error('Error in ambushEffectFunction:', error);
                                        rejectAmbush(error);
                                    }
                                });
                                ambushEffectPromise.then(() => drawVillainsRecursively(drawRemaining - 1)).catch((error) => {
                                    console.error('Error in ambushEffectPromise:', error);
                                    drawVillainsRecursively(drawRemaining - 1);
                                });
                            } else {
                                console.error(`Ambush effect function ${villainCard.ambushEffect} not found`);
                                drawVillainsRecursively(drawRemaining - 1);
                            }
                        } else {
                            console.log("No Ambush Effect");
                            drawVillainsRecursively(drawRemaining - 1);
                        }
                    }).catch((error) => {
                        console.error('Error in moveVillainsPromise:', error);
                        drawVillainsRecursively(drawRemaining - 1);
                    });
                }
            }
        };

        drawVillainsRecursively(drawCount);
    });
}

function handleBystander(bystanderCard) {
    let sewersIndex = city.length - 1;

    // Check if there's a villain in the sewers
    if (city[sewersIndex]) {
        attachBystanderToVillain(sewersIndex, bystanderCard);
    } else {
        // Find the next closest villain to the villain deck
        let closestVillainIndex = findClosestVillain();
        
        if (closestVillainIndex !== -1) {
            attachBystanderToVillain(closestVillainIndex, bystanderCard);
        } else {
            // If no villains in the city, attach to the mastermind
            attachBystanderToMastermind(bystanderCard);
        }
    }

    updateGameBoard();
}

function attachBystanderToVillain(villainIndex, bystanderCard) {
    if (city[villainIndex].bystander) {
        city[villainIndex].bystander.push(bystanderCard);
    } else {
        city[villainIndex].bystander = [bystanderCard];
    }

    // Access the villain object using the index to get its name
    const villain = city[villainIndex]; 


   // Log the villain's name correctly
    onscreenConsole.log(`Bystander captured by <span class="console-highlights">${villain.name}</span>.`);

}

function findClosestVillain() {
    for (let i = city.length - 1; i >= 0; i--) {
        if (city[i]) {
            return i;
        }
    }
    return -1;
}

function attachBystanderToMastermind(bystanderCard) {
let mastermind = getSelectedMastermind();
    mastermind.bystanders.push(bystanderCard);
    updateMastermindOverlay();

    onscreenConsole.log(`Bystander captured by <span class="console-highlights">${mastermind.name}</span>.`);

}

function updateMastermindOverlay() {
    const mastermindCard = document.getElementById('mastermind');
    const overlay = mastermindCard.querySelector('.overlay');
let mastermind = getSelectedMastermind();
    const bystanderCount = mastermind.bystanders.length;



    if (bystanderCount > 0) {
        overlay.innerText = bystanderCount === 1 ? `1 Bystander` : `${bystanderCount} Bystanders`;
        overlay.classList.add('visible');
    } else {
        overlay.classList.remove('visible');
    }
updateGameBoard();
}

function handleMasterStrike(masterStrikeCard) {
    return new Promise((resolve, reject) => {
        koPile.push(masterStrikeCard); // Move Master Strike to KO Pile
        

        const mastermind = getSelectedMastermind();
        const masterStrikeFunctionName = mastermind.masterStrike;

onscreenConsole.log(`<span class="console-highlights">Master Strike!</span> ${mastermind.masterStrikeConsoleLog}`);

        // Call showPopup and pass a dynamic function based on the mastermind's masterStrike attribute
        showPopup('Master Strike', () => {
            if (typeof window[masterStrikeFunctionName] === 'function') {
                try {
                    window[masterStrikeFunctionName](); // Dynamically call the function
                    resolve();  // Resolve after the Master Strike effect is handled
                } catch (error) {
                    console.error(`Error executing Master Strike function: ${error}`);
                    reject(error);
                }
            } else {
                console.error(`No function named ${masterStrikeFunctionName} found.`);
                resolve();  // Resolve even if no function is found
            }
        });
    });
}

function handleSchemeTwist(schemeTwistCard) {
    return new Promise((resolve) => {
        // Get selected scheme
        const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
        const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

        // Update game state
        koPile.push(schemeTwistCard);
        schemeTwistCount += 1;

        // Log appropriate message
        if (selectedScheme.variableTwist === false) {
            onscreenConsole.log(`<span class="console-highlights">Scheme Twist!</span> Twist ${schemeTwistCount}: ${selectedScheme.twistText}`);
        } else if (selectedScheme[`twistText${schemeTwistCount}`]) {
            onscreenConsole.log(`<span class="console-highlights">Scheme Twist!</span> Twist ${schemeTwistCount}: ${selectedScheme[`twistText${schemeTwistCount}`]}`);
        } else {
            onscreenConsole.log(`<span class="console-highlights">Scheme Twist!</span>`);
        }

        showPopup('Scheme Twist', async () => {
            updateGameBoard();
            
            // Mark that we're in a Scheme Twist chain
            schemeTwistChainDepth++;
            
            // Run the twist effect if it exists
            if (selectedScheme.twistEffect && selectedScheme.twistEffect !== "None") {
                const twistEffectFunction = window[selectedScheme.twistEffect];
                if (typeof twistEffectFunction === 'function') {
                    try {
                        await twistEffectFunction();
                    } catch (error) {
                        console.error('Error in twist effect:', error);
                    }
                }
            }
            
            // Decrement depth and check if we're at the end of the chain
            schemeTwistChainDepth--;
            
            // If this was the last Twist in the chain, trigger KO
            if (schemeTwistChainDepth === 0) {
                pendingHeroKO = true;
            }
            
            resolve();
        });
    });
}

  function defaultWoundDraw() {
  if (woundDeck.length > 0) {
    const gainedWound = woundDeck.pop();
    playerDiscardPile.push(gainedWound);
    onscreenConsole.log("Wound gained.");
    updateGameBoard();
  } else {
    onscreenConsole.log("No wounds left. You've taken enough damage!");
  }
}


function handleVillainEscape(escapedVillain) {
    if (escapedVillain) {
        // If the villain has bystanders attached, move them as well
        if (escapedVillain.bystander && escapedVillain.bystander.length > 0) {
            escapedVillain.bystander.forEach(bystander => {
                escapedVillainsDeck.push(bystander); // Move the bystanders to the escaped villains deck
                onscreenConsole.log(`Bystander escaped with <span class="console-highlights">${escapedVillain.name}</span>.`);
            });
        }

if (escapedVillain.skrulled === true) {
escapedVillain.type = 'Hero';
} 

        // Move the villain itself to the Escaped Villains deck
        escapedVillainsDeck.push(escapedVillain);
        escapedVillainsCount++; // Increment the count of escaped villains

        onscreenConsole.log(`<span class="console-highlights">${escapedVillain.name}</span> has escaped.`);
        updateGameBoard();

        // Call the function to handle KO action and discard action, and return its promise
        return handleVillainEscapeActions(escapedVillain).then(() => {
            // Removed the defeat popup logic
            // Previously handled defeat conditions after 5 villains escape (can be re-added if needed)
        });
    } else {
        return Promise.resolve(); // Return a resolved promise if no villain escaped
    }
}



function handleVillainEscapeActions(escapedVillain) {
    return new Promise((resolve, reject) => {
        const eligibleHeroes = hq.filter(hero => hero && hero.cost <= 6);
        let heroKOPromise = Promise.resolve();
        let discardCardPromise = Promise.resolve();

        // Handle hero KO if there are eligible heroes
        if (eligibleHeroes.length > 0) {
            heroKOPromise = new Promise((resolveHeroKO) => {
                showHeroKOPopup(() => {
                    resolveHeroKO(); // Resolve after the hero KO popup is handled
                });
            });
        }

        // Handle discard if there are bystanders to discard
        heroKOPromise.then(() => {
            if (escapedVillain.bystander && escapedVillain.bystander.length > 0) {
                discardCardPromise = new Promise((resolveDiscard) => {
                    showDiscardCardPopup().then(resolveDiscard);
                });
            }
            return discardCardPromise;
        }).then(() => {
            // Now handle the villain's escape effect
            if (!escapedVillain.escapeEffect || escapedVillain.escapeEffect === "None") {
                console.log("No Escape Effect");
                resolve(); // Resolve the promise since there's no effect to handle
            } else {
                const escapeEffectFunction = window[escapedVillain.escapeEffect];
                if (typeof escapeEffectFunction === 'function') {
                    let escapeEffectPromise = new Promise((resolveEscapeEffect, rejectEscapeEffect) => {
                        try {
                            const result = escapeEffectFunction(escapedVillain);
                            if (result instanceof Promise) {
                                result.then(resolveEscapeEffect).catch(rejectEscapeEffect); // If it returns a promise, chain it
                            } else {
                                resolveEscapeEffect(result);
                            }
                        } catch (error) {
                            rejectEscapeEffect(error);
                        }
                    });
                    escapeEffectPromise.then(resolve).catch(reject);
                } else {
                    console.error(`Escape effect function ${escapedVillain.escapeEffect} not found`);
                    resolve(); // Resolve if the function isn't found
                }
            }
        }).catch(reject);
    });
}

function showHeroSelectPopup() {
    return new Promise((resolve) => {
        const heroSelectPopup = document.getElementById('hero-select-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const heroOptions = document.getElementById('hero-options');
        const heroImage = document.getElementById('hero-select-image');
        const hoverText = document.getElementById('selectHoverText');
        const confirmButton = document.createElement('button'); // Create confirm button dynamically
        confirmButton.id = 'hero-select-confirm';
        confirmButton.textContent = 'CONFIRM';
        confirmButton.style.display = 'inline-block'; // Show button immediately
        confirmButton.disabled = true; // Disabled by default

        heroOptions.innerHTML = ''; // Clear previous options
        let selectedHero = null;
        let activeImage = null;

        // Add confirm button to popup
        heroSelectPopup.appendChild(confirmButton);

        // Filter eligible heroes
        const eligibleHeroes = hq.filter(hero => hero && hero.cost <= 6);

        if (eligibleHeroes.length === 0) {
            onscreenConsole.log('No Heroes available with a cost of 6 or less.');
            resolve();
            return;
        }

        // Populate hero options
        eligibleHeroes.forEach((hero, index) => {
            const heroButton = document.createElement('button');
            heroButton.innerText = hero.name;
            heroButton.classList.add('hero-option');

            // Hover functionality
            heroButton.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = hero.image;
                    heroImage.style.display = 'block';
                    hoverText.style.display = 'none';
                }
            };

            heroButton.onmouseout = () => {
                if (!activeImage) {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    hoverText.style.display = 'block';
                }
            };

            // Selection functionality
            heroButton.onclick = () => {
                if (selectedHero === index) {
                    // Deselect
                    selectedHero = null;
                    heroButton.classList.remove('selected');
                    activeImage = null;
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    hoverText.style.display = 'block';
                    confirmButton.disabled = true;
                } else {
                    // Deselect previous
                    if (selectedHero !== null) {
                        const prevButton = heroOptions.querySelector(`button[data-hero-id="${selectedHero}"]`);
                        if (prevButton) prevButton.classList.remove('selected');
                    }
                    // Select new
                    selectedHero = index;
                    heroButton.classList.add('selected');
                    activeImage = hero.image;
                    heroImage.src = hero.image;
                    heroImage.style.display = 'block';
                    hoverText.style.display = 'none';
                    confirmButton.disabled = false;
                }
            };

            heroButton.setAttribute('data-hero-id', index);
            heroOptions.appendChild(heroButton);
        });

        // Confirm button handler
        confirmButton.onclick = () => {
            if (selectedHero === null) return;

            const hero = eligibleHeroes[selectedHero];
            onscreenConsole.log(`A Scheme Twist has forced you to return <span class="console-highlights">${hero.name}</span> to the bottom of the Hero Deck.`);
            returnHeroToDeck(selectedHero);
            updateGameBoard();
            
            // Clean up
            heroSelectPopup.removeChild(confirmButton);
            heroSelectPopup.style.display = 'none';
            modalOverlay.style.display = 'none';
            resolve();
        };

        // Show popup
        modalOverlay.style.display = 'block';
        heroSelectPopup.style.display = 'block';
    });
}

function returnHeroToDeck(index) {
    const hero = hq[index];
    if (hero) {
        heroDeck.unshift(hero); // Add the Hero to the bottom of the Hero deck
        hq[index] = heroDeck.length > 0 ? heroDeck.pop() : null; // Fill the HQ slot with the top card of the Hero deck
        updateGameBoard();
    }
}

function showPopup(type, confirmCallback) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const confirmBtn = document.getElementById('popup-confirm');
    const modalOverlay = document.getElementById('modal-overlay');
const popupImage = document.getElementById('popup-single-image');

    popupTitle.innerText = type;
    confirmBtn.innerText = getRandomConfirmText();

    modalOverlay.style.display = 'block';
    popup.style.display = 'block';

    // Check and set image based on the type
    if (type === 'Master Strike') {
        popupImage.style.display = 'block';
        popupImage.style.backgroundImage = "url('Visual Assets/Other/MasterStrike.webp')";
    } else if (type === 'Scheme Twist') {
        popupImage.style.display = 'block';
        popupImage.style.backgroundImage = "url('Visual Assets/Other/SchemeTwist.webp')";
    } else {
        popupImage.style.display = 'none'; // Hide image if the type is unknown
    }

    const closePopup = () => {
        popup.style.display = 'none';
popupImage.style.display = 'none';
        modalOverlay.style.display = 'none';
        confirmBtn.removeEventListener('click', onConfirm);
    };

    const onConfirm = () => {
        confirmCallback(); // Execute the passed dynamic function
        closePopup();
    };

    confirmBtn.addEventListener('click', onConfirm);

    const closeBtn = popup.querySelector('.close-btn');
    closeBtn.onclick = closePopup;
}

function getRandomConfirmText() {
    const options = ['Ouch!', 'Oh no!', 'Yikes!', 'Uh-oh!', 'Watch out!'];
    return options[Math.floor(Math.random() * options.length)];
}

function updateDeckCounts() {

const twistCountNumber = document.getElementById('drawnTwistCount');
const masterStrikeCountNumber = document.getElementById('drawnMasterStrikeCount');
const escapePileCountNumber = document.getElementById('escapePileCount');
const koPileCountNumber = document.getElementById('koPileCount');
const woundDeckCountNumber = document.getElementById('woundDeckCount');
const bystanderDeckCountNumber = document.getElementById('bystanderDeckCount');
const sidekickCountNumber = document.getElementById('sidekickCountNumber');
const shieldCountNumber = document.getElementById('shieldCountNumber');
const discardCountNumber = document.getElementById('discardCountNumber');
const playedCardsCountNumber = document.getElementById('playedCardsCountNumber');
const villainDeckCountNumber = document.getElementById('villainDeckCountNumber');
const heroDeckCountNumber = document.getElementById('heroDeckCountNumber');
const playerDeckCountNumber = document.getElementById('playerDeckCountNumber');
const mastermindTacticCountNumber = document.getElementById('mastermindTacticCountNumber');

let mastermind = getSelectedMastermind();

twistCountNumber.innerHTML = `&nbsp;${koPile.filter(card => card.type === 'Scheme Twist').length + killbotSchemeTwistCount}`;
masterStrikeCountNumber.innerHTML = `&nbsp;${koPile.filter(card => card.type === 'Master Strike').length}`;
escapePileCountNumber.innerHTML = `&nbsp;${escapedVillainsDeck.length}`;
koPileCountNumber.innerHTML = `&nbsp;${koPile.length}`;
woundDeckCountNumber.innerHTML = `&nbsp;${woundDeck.length}`;
bystanderDeckCountNumber.innerHTML = `&nbsp;${bystanderDeck.length}`;
sidekickCountNumber.innerHTML = `&nbsp;${sidekickDeck.length}`;
shieldCountNumber.innerHTML = `&nbsp;${shieldDeck.length}`;
discardCountNumber.innerHTML = `&nbsp;${playerDiscardPile.length}`;
playedCardsCountNumber.innerHTML = `&nbsp;${cardsPlayedThisTurn.length}`;
villainDeckCountNumber.innerHTML = `&nbsp;${villainDeck.length}`;
heroDeckCountNumber.innerHTML = `&nbsp;${heroDeck.length}`;
playerDeckCountNumber.innerHTML = `&nbsp;${playerDeck.length}`;
mastermindTacticCountNumber.innerHTML = `&nbsp;${mastermind.tactics.length}`;

const currentVictoryPoints = calculateVictoryPoints(victoryPile);
document.getElementById('currentVictoryPointsTally').innerHTML = `&nbsp;${currentVictoryPoints}`;

}

let isRecruiting = false; // Flag to track if a hero is being recruited

function updateGameBoard() {
    for (let i = 0; i < hq.length; i++) {
        const hqCell = document.querySelector(`#hq-${i + 1}`);
        const recruitButtonContainer = document.querySelector(`#hq${i + 1}-recruit-button-container`);
        const recruitButton = document.querySelector(`#hq${i + 1}-deck-recruit-button`);
        const recruitCostSpan = document.querySelector(`#hq${i + 1}-recruit-cost`);

        // Clear only the hero image, not the entire cell content
        const existingHeroImage = hqCell.querySelector('.card-image');
        if (existingHeroImage) {
            hqCell.removeChild(existingHeroImage);
        }

        if (hq[i]) {
            // Create an image element for the hero
            const heroImage = document.createElement('img');
            heroImage.src = hq[i].image;  // Use the image property from the hero object
            heroImage.alt = hq[i].name;   // Set alt text as the hero's name
            heroImage.classList.add('card-image'); // Add a class for styling if needed

            // Append the image to the HQ cell
            hqCell.appendChild(heroImage);

            // Set the onclick event to show the recruit button
            hqCell.onclick = () => {
                if (!isRecruiting) {
                    showHeroRecruitButton(i + 1, hq[i]);
                }
            };

            // Update the recruit cost dynamically
            if (recruitCostSpan) {
                recruitCostSpan.innerHTML = `${hq[i].cost} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">`;
            }
        } else {
            hqCell.onclick = null; // No action if the cell is empty
            if (recruitButtonContainer) {
                recruitButtonContainer.style.display = 'none'; // Hide the button if no hero is present
            }
        }
    }

    for (let i = 0; i < city.length; i++) {
        const cityCell = document.querySelector(`#city-${i + 1}`);
        cityCell.innerHTML = ''; // Clear the existing content

        const tempBuffOverlay = document.createElement('div');
        const tempBuffVariableName = `city${i + 1}TempBuff`; // Construct the variable name (e.g., "city1TempBuff")
        const currentTempBuff = window[tempBuffVariableName]; // Access the variable using window

        if (currentTempBuff !== 0) {
            tempBuffOverlay.className = 'temp-buff-overlay';
            tempBuffOverlay.id = `city-${i + 1}-temp-buff`; // Assign the ID based on the city cell number
            tempBuffOverlay.innerHTML = `<p>${currentTempBuff} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'></p>`; // Display the actual buff value
            cityCell.appendChild(tempBuffOverlay);
        }

victoryPile.forEach(item => {
    if (item.name === 'Killbot') {
        item.name = 'Bystander'; 
        item.type = 'Bystander';
item.attack = 0;
item.image = "Visual Assets/Other/Bystander.webp"
    }
});

if (woundDeck.length >= 1) {
    const woundPileImage = document.getElementById('wounds-card-back');
    if (woundPileImage) {
        woundPileImage.style.display = 'block'; // Show the overlay
    }
} else {
    const woundPileImage = document.getElementById('wounds-card-back');
    if (woundPileImage) {
        woundPileImage.style.display = 'none';
    }
}

if (bystanderDeck.length >= 1) {
    const bystanderPileImage = document.getElementById('bystanders-card-back');
    if (bystanderPileImage) {
        bystanderPileImage.style.display = 'block'; // Show the overlay
    }
} else {
    const bystanderPileImage = document.getElementById('bystanders-card-back');
    if (bystanderPileImage) {
        bystanderPileImage.style.display = 'none';
    }
}

if (villainDeck.length >= 1) {
    const villainPileImage = document.getElementById('villain-deck-card-back');
    if (villainPileImage) {
        villainPileImage.style.display = 'block'; // Show the overlay
    }
} else {
    const villainPileImage = document.getElementById('villain-deck-card-back');
    if (villainPileImage) {
        villainPileImage.style.display = 'none';
    }
}

if (shieldDeck.length >= 1) {
    const shieldPileImage = document.getElementById('shield-deck-card-back');
    if (shieldPileImage) {
        shieldPileImage.style.display = 'block'; // Show the overlay
    }
} else {
    const shieldPileImage = document.getElementById('shield-deck-card-back');
    if (shieldPileImage) {
        shieldPileImage.style.display = 'none';
    }
}

if (heroDeck.length >= 1) {
    const heroPileImage = document.getElementById('hero-deck-card-back');
    if (heroPileImage) {
        heroPileImage.style.display = 'block'; // Show the overlay
    }
} else {
    const heroPileImage = document.getElementById('hero-deck-card-back');
    if (heroPileImage) {
        heroPileImage.style.display = 'none';
    }
}

if (playerDeck.length >= 1) {
    const playerDeckImage = document.getElementById('player-deck-card-back');
    if (playerDeckImage) {
        playerDeckImage.style.display = 'flex';
    }
} else {
    const playerDeckImage = document.getElementById('player-deck-card-back');
    if (playerDeckImage) {
        playerDeckImage.style.display = 'none';
    }
}

const discardPileImage = document.getElementById('discard-pile-card-back');
if (discardPileImage) {
    if (playerDiscardPile.length >= 1) {
        discardPileImage.style.display = 'flex';
    } else {
        discardPileImage.style.display = 'none';
    }
} else {
    console.warn('discard-pile-card-back element not found');
}

const playedCardsPileImage = document.getElementById('played-cards-deck-pile');
if (playedCardsPileImage) {
    if (cardsPlayedThisTurn.length >= 1) {
        playedCardsPileImage.style.display = 'flex';
    } else {
        playedCardsPileImage.style.display = 'none';
    }
} else {
    console.warn('played-cards-deck-pile element not found');
}

const permBuffOverlay = document.createElement('div');
        const permBuffVariableName = `city${i + 1}PermBuff`; // Construct the variable name (e.g., "city1TempBuff")
        const currentPermBuff = window[permBuffVariableName]; // Access the variable using window

        if (currentPermBuff !== 0) {
            permBuffOverlay.className = 'perm-buff-overlay';
            permBuffOverlay.id = `city-${i + 1}-perm-buff`; // Assign the ID based on the city cell number
            permBuffOverlay.innerHTML = `<p>+${currentPermBuff} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'></p>`; // Display the actual buff value
            cityCell.appendChild(permBuffOverlay);
        }


        const tempBuffOverlayMastermind = document.getElementById('mastermind-temp-buff');

        if (mastermindTempBuff !== 0) {
            tempBuffOverlayMastermind.innerHTML = `${mastermindTempBuff} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>`; // Display the actual buff value
            tempBuffOverlayMastermind.style.display = 'flex'; // Show the overlay
        } else {
            tempBuffOverlayMastermind.style.display = 'none'; // Hide the overlay if the buff is zero
        }

        const permBuffOverlayMastermind = document.getElementById('mastermind-perm-buff');

        if (mastermindPermBuff !== 0) {
            permBuffOverlayMastermind.innerHTML = `+${mastermindPermBuff} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>`; // Display the actual buff value
            permBuffOverlayMastermind.style.display = 'flex'; // Show the overlay
        } else {
            permBuffOverlayMastermind.style.display = 'none'; // Hide the overlay if the buff is zero
        }

if (city[i]) {
    // Create a container to hold the card image and overlays
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container'); // Add a class for styling the container

    // Create an image element
    const cardImage = document.createElement('img');
    cardImage.src = city[i].image; // Use the image property from the card object
    cardImage.alt = city[i].name; // Set alt text as the card name
    cardImage.classList.add('card-image'); // Add a class for styling if needed

    // Append the image to the container
    cardContainer.appendChild(cardImage);

    // Append the container to the city cell
    cityCell.appendChild(cardContainer);

    // If the city[i].name is 'Killbot', set the overlayTextAttack
    if (city[i].name === 'Killbot') {
        city[i].overlayTextAttack = `${killbotAttack}`;
    }

    // Check if the villain has an overlayText (indicating captured hero or attack)
    if (city[i].overlayText) {
        const villainOverlay = document.createElement('div');
        villainOverlay.className = 'skrull-overlay';
        villainOverlay.innerHTML = `${city[i].overlayText}`;

        // Append the overlay directly to the container (over the image)
        cardContainer.appendChild(villainOverlay);
    }

    // Check if the villain has an overlayTextAttack
    if (city[i].overlayTextAttack) {
        const villainOverlayAttack = document.createElement('div');
        villainOverlayAttack.className = 'attack-overlay';
        villainOverlayAttack.innerHTML = city[i].overlayTextAttack;

        // Append the attack overlay directly to the container (over the image)
        cardContainer.appendChild(villainOverlayAttack);
    }

if (city[i].bystander) {
    const overlay = document.createElement('div');
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    overlay.className = 'overlay';
    
    // Create the base overlay text for bystanders
    let overlayText = `${city[i].bystander.length} Bystander${city[i].bystander.length > 1 ? 's' : ''}`;
    
    // Check if the selected scheme is "Midtown Bank Robbery"
    if (selectedScheme.name === 'Midtown Bank Robbery') {

        // Add the attack increase to the overlay text on a new line
        overlayText += `<br>+${city[i].bystander.length} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">`;
    }

    // Set the overlay content and apply style for multiline text
    overlay.innerHTML = overlayText;
    overlay.style.whiteSpace = 'pre-line'; // Ensures the line breaks are respected

    cityCell.appendChild(overlay);
}

if (city[i].shattered > 0) {
    const shatteredOverlay = document.createElement('div');
    shatteredOverlay.className = 'shattered-overlay';
    shatteredOverlay.innerHTML = `Shattered!<br><span>-${city[i].shattered}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"></span>`;
    
    // Clear existing overlay first to avoid duplicates
    const existingOverlay = cityCell.querySelector('.shattered-overlay');
    if (existingOverlay) cityCell.removeChild(existingOverlay);
    
    cityCell.appendChild(shatteredOverlay);
}

updateDeckCounts();

            cityCell.onclick = city[i].type !== 'Bystander' && city[i].type !== 'Attached to Mastermind' ? () => showAttackButton(i) : null;
        } else {
            const emptyText = document.createElement('div');
            emptyText.innerText = "";
            cityCell.appendChild(emptyText);
            cityCell.onclick = null;
        }

        cityCell.classList.add('city-cell');
    }

if (lastTurn) {
    console.log('The Villains have completed their scheme but it is too late! You\'ve already defeated the Mastermind!');
} else {
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    const selectedSchemeEndGame = selectedScheme ? selectedScheme.endGame : null;

    if (!selectedSchemeEndGame) {
        console.log(`Scheme End Game is not defined.`);
    } else {
        // Reusable calculations
        const escapedVillainsCount = escapedVillainsDeck.filter(card => card.type === 'Villain').length;
        const escapedBystanderCount = escapedVillainsDeck.filter(card => card.type === 'Bystander').length;
        const twistCount = koPile.filter(card => card.type === 'Scheme Twist').length;
        const escapedHeroesCount = escapedVillainsDeck.filter(card => card.type === 'Hero').length;
        const escapedKillbotsCount = escapedVillainsDeck.filter(card => card.killbot === true).length;

        switch (selectedSchemeEndGame) {
            case "8BystandersCarriedAway":
                if (escapedBystanderCount >= 8) {
                    showDefeatPopup(); // Trigger the defeat popup
                }
                break;

            case "12VillainsEscape":
                if (escapedVillainsCount >= 12) {
                    showDefeatPopup(); // Trigger the defeat popup
                }
                break;

            case "7Twists":
                if (twistCount >= 7) {
                    showDefeatPopup(); // Trigger the defeat popup
                }
                break;

            case "5Killbots":
                if (escapedKillbotsCount >= 5) {
                    showDefeatPopup(); // Trigger the defeat popup
                }
                break;

            case "6EscapedSkrullHeroes":
                if (escapedHeroesCount >= 6) {
                    showDefeatPopup(); // Trigger the defeat popup
                }
                break;

            case "heroDeckEmpty":
                if (heroDeck.length === 0) {
                    showDefeatPopup(); // Trigger the defeat popup
                }
                break;

            case "woundDeckEmpty":
                if (woundDeck.length === 0) {
                    showDefeatPopup(); // Trigger the defeat popup
                }
                break;

            case "8Twists":
                if (twistCount >= 8) {
                    showDefeatPopup(); // Trigger the defeat popup
                }
                break;

            default:
                console.log(`Scheme End Game "${selectedSchemeEndGame}" is not yet defined.`);
                break;
        }
    }
}

   const playerHandElement = document.getElementById('player-hand-element');

playerHandElement.innerHTML = '';

playerHand.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${selectedCards.includes(index) ? 'selected' : ''}`;

    // Create an image element for the card
    const cardImage = document.createElement('img');
    cardImage.src = card.image; // Assuming 'card.image' holds the image URL
    cardImage.alt = card.name; // Set alt text for accessibility
    cardImage.className = 'card-image'; // Add a class for styling if needed

    // Append the image to the card element
    cardElement.appendChild(cardImage);

    // Add the overlay span
    const overlaySpan = document.createElement('span');
    overlaySpan.className = 'overlay';
    cardElement.appendChild(overlaySpan);

 cardElement.onclick = () => {
    const card = playerHand[index];

    // Check if the card is a Wound
    if (card.name === 'Wound') {
        console.log("Cannot toggle a Wound card.");
        return; // Exit the handler without toggling
    }

    // Call the toggleCard function
    toggleCard(index);
};

playerHandElement.appendChild(cardElement);
});

    document.getElementById('attack-points').innerText = totalAttackPoints;
    document.getElementById('recruit-points').innerText = totalRecruitPoints;

    updateSelectionOrder();

    updateHealWoundsButton();

updateCardSizing();
resetOpacity();

}

document.getElementById('play-all-button').addEventListener('click', () => {

selectedCards = [];

    // Define the names of the cards you want to select
    const shieldNames = ["S.H.I.E.L.D. Officer", "S.H.I.E.L.D. Trooper", "S.H.I.E.L.D. Agent"];

    // Check if all cards with the specified names are already selected
    const allSelected = playerHand.every((card, index) => 
        !shieldNames.includes(card.name) || selectedCards.includes(index));

    if (allSelected) {
        // If all are selected, deselect all
        selectedCards = selectedCards.filter(index => !shieldNames.includes(playerHand[index].name));
    } else {
        // Otherwise, select all cards with the specified names
        playerHand.forEach((card, index) => {
            if (shieldNames.includes(card.name) && !selectedCards.includes(index)) {
                selectedCards.push(index);
            }
        });
    }

    // Update the UI without re-rendering
    document.querySelectorAll('.card').forEach((cardElement, index) => {
        if (selectedCards.includes(index)) {
            cardElement.classList.add('selected'); // Mark as selected
        } else {
            cardElement.classList.remove('selected'); // Deselect
        }
    });

    updateSelectionOrder();
confirmActions();
})



function drawCard() {
    if (playerDeck.length === 0) {
        playerDeck = shuffle(playerDiscardPile);
        playerDiscardPile = [];
    }
    const card = playerDeck.pop();
    playerHand.push(card);
console.log('Card drawn')
    updateGameBoard();
}

function toggleCard(index) {
    const cardIndex = selectedCards.indexOf(index);
    if (cardIndex > -1) {
        selectedCards.splice(cardIndex, 1);
    } else {
        selectedCards.push(index);
    }
    updateGameBoard();
}

function updateSelectionOrder() {
    const cardElements = document.querySelectorAll('.card');

    selectedCards.forEach((cardIndex, order) => {
        if (cardIndex < cardElements.length) {
            const cardElement = cardElements[cardIndex];
            const overlayElement = cardElement.querySelector('.overlay');
            if (overlayElement) {
                overlayElement.innerHTML = `<span style="filter:drop-shadow(0px 0px 0.1vh white);">${order + 1}</span>${getOrdinalSuffix(order + 1)}`;
            } else {
                console.warn(`Overlay element not found for card at index ${cardIndex}`);
            }
        } else {
            console.warn(`Card index ${cardIndex} is out of bounds`);
        }
    });

    let currentAttackPoints = 0;
    let currentRecruitPoints = 0;
    selectedCards.forEach(cardIndex => {
        if (cardIndex < playerHand.length) {
            const card = playerHand[cardIndex];
            currentAttackPoints += card.attack || 0;
            currentRecruitPoints += card.recruit || 0;
        } else {
            console.warn(`Selected card index ${cardIndex} is out of bounds for player hand`);
        }
    });
    document.getElementById('attack-points').innerText = totalAttackPoints + currentAttackPoints;
    document.getElementById('recruit-points').innerText = totalRecruitPoints + currentRecruitPoints;

 document.getElementById('confirm-actions').disabled = selectedCards.length === 0;
}

document.getElementById('confirm-actions').addEventListener('click', confirmActions);

function confirmActions() {
    const cardsToPlay = selectedCards.map(index => playerHand[index]);
    const currentPlayer = getCurrentPlayer();

    cardsToPlay.reduce((promiseChain, card) => {
        return promiseChain.then(() => {
            cardsPlayedThisTurn.push(card);

            const cardIndex = playerHand.indexOf(card);
            if (cardIndex > -1) {
                playerHand.splice(cardIndex, 1);
            }

            totalAttackPoints += card.attack || 0;
            totalRecruitPoints += card.recruit || 0;

            cumulativeAttackPoints += card.attack || 0;
            cumulativeRecruitPoints += card.recruit || 0;

            console.log('Confirm Actions Called:', card, currentPlayer);

          // Handle unconditional ability
            let abilityPromise = Promise.resolve();
            if (card.unconditionalAbility && card.unconditionalAbility !== "None") {
                const abilityFunction = window[card.unconditionalAbility];
                if (typeof abilityFunction === 'function') {
                    // Wrap the result in a Promise if it isn't one
                    abilityPromise = new Promise((resolve, reject) => {
                        try {
                            const result = abilityFunction(currentPlayer, card);
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    });
                } else {
                    console.error(`Unconditional ability function ${card.unconditionalAbility} not found`);
                }
            }

            // Handle conditional ability
            return abilityPromise.then(() => {
                if (card.conditionalAbility && card.conditionalAbility !== "None") {
                    const { conditionType, condition } = card;
                    if (isConditionMet(conditionType, condition)) {
                        if (autoSuperpowers) {
                            const conditionalAbilityFunction = window[card.conditionalAbility];
                            if (typeof conditionalAbilityFunction === 'function') {
                                return new Promise((resolve, reject) => {
                                    try {
                                        const result = conditionalAbilityFunction(currentPlayer, card);
                                        resolve(result);
                                    } catch (error) {
                                        reject(error);
                                    }
                                });
                            } else {
                                console.error(`Conditional ability function ${card.conditionalAbility} not found`);
                            }
                        } else {
                            return new Promise((resolve, reject) => {
                                const { confirmButton, denyButton } = showHeroAbilityMayPopup(
                                    `DO YOU WISH TO ACTIVATE <span class="console-highlights">${card.name}</span><span class="bold-spans">’s</span> superpower?`,
                                    "Yes",
                                    "No"
                                );

                                document.getElementById('heroAbilityHoverText').style.display = 'none';

                                const cardImage = document.getElementById('hero-ability-may-card');
                                cardImage.src = card.image;
                                cardImage.style.display = 'block';

                                confirmButton.onclick = () => {
                                    try {
                                        const conditionalAbilityFunction = window[card.conditionalAbility];
                                        if (typeof conditionalAbilityFunction === 'function') {
                                            const result = conditionalAbilityFunction(currentPlayer, card);
                                            resolve(result);
                                        } else {
                                            console.error(`Conditional ability function ${card.conditionalAbility} not found`);
                                            resolve();
                                        }
                                    } catch (error) {
                                        reject(error);
                                    }
                                    hideHeroAbilityMayPopup();
                                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                                };

                                denyButton.onclick = () => {
                                    onscreenConsole.log(`You have chosen not to activate <span class="console-highlights">${card.name}</span><span class="bold-spans">’s</span> superpower.`);
                                    hideHeroAbilityMayPopup();
                                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                                    resolve();
                                };
                            });
                        }
                    } else {
                        console.log(`Unable to use Superpower Ability.`);
                    }
                }
            });
        });
    }, Promise.resolve()).then(() => {
        // Clear selected cards and update the game board
        selectedCards = [];
        updateGameBoard();
    }).catch(err => {
        console.error('Error during confirm actions:', err);
    });
}

function isConditionMet(conditionType, condition) {
    // Exclude the last card in cardsPlayedThisTurn
    const previousCards = cardsPlayedThisTurn.slice(0, -1);
    console.log('Previous cards excluding the last one:', previousCards);

    switch (conditionType) {
        case 'playedCards':
            return previousCards.some(playedCard => 
                playedCard.class1 === condition || playedCard.class2 === condition || playedCard.team === condition
            );
        case 'unconditional':
            return condition === "None";
        case 'revealCardTeam':
            return playerHand.concat(previousCards).some(card => 
                card.team === condition
            );
        default:
            console.warn(`Unknown condition type: ${conditionType}`);
            return false;
    }
}

function getCurrentPlayer() {
    return { 
        name: "Player 1",
        drawCards: function(count) { 
            console.log(`${this.name} draws ${count} card(s)`); 
            // Logic to draw cards from deck to hand
        }
        // other properties and methods as needed
    };
}

function getOrdinalSuffix(number) {
    if (number > 3 && number < 21) return '<span style="font-size:1.5vh;filter:drop-shadow(0px 0px 0.1vh white)">TH</span>';
    switch (number % 10) {
        case 1: return '<span style="font-size:1.5vh;filter:drop-shadow(0px 0px 0.1vh white)">ST</span>';
        case 2: return '<span style="font-size:1.5vh;filter:drop-shadow(0px 0px 0.1vh white)">ND</span>';
        case 3: return '<span style="font-size:1.5vh;filter:drop-shadow(0px 0px 0.1vh white)">RD</span>';
        default: return '<span style="font-size:1.5vh;filter:drop-shadow(0px 0px 0.1vh white)">TH</span>';
    }
}

function startTurn() {
    console.log('Starting turn...');
    drawVillainCard();
    playHeroCards();
    resolveVillainActions();
    endTurn();
}

function playHeroCards() {
    console.log('Playing hero cards...');
}

function resolveVillainActions() {
    console.log('Resolving villain actions...');
}

function endTurn() {

updateDeckCounts();

onscreenConsole.log("Turn ended.");

turnCount += 1;

onscreenConsole.log(`<span class="console-highlights" style="text-decoration:underline;">Turn&nbsp;</span><span class="console-highlights" style="text-decoration:underline;">${turnCount}</span><span class="console-highlights" style="text-decoration:underline;">:</span>`);

if (lastTurn == true) {
showWinPopup()
} else {

    console.log('Ending turn...');
    
        city.forEach(card => {
        if (card && (card.type === 'Villain' || card.type === 'Henchman') && card.shattered) {
            card.shattered = 0;
        }
    });

cardsPlayedThisTurn.forEach(card => {
        if (card.originalAttributes) {
            Object.assign(card, card.originalAttributes);
            delete card.originalAttributes;
            delete card.isCopied;
        }
    });

  // Iterate through the cardsPlayedThisTurn array
for (let i = cardsPlayedThisTurn.length - 1; i >= 0; i--) {
    const card = cardsPlayedThisTurn[i];

    // Check if the card has the sidekickToDestroy attribute
    if (card.hasOwnProperty('sidekickToDestroy')) {
        // If sidekickToDestroy is true, remove the card from the array
        if (card.sidekickToDestroy === true) {
            cardsPlayedThisTurn.splice(i, 1); // Remove the card at index i
        } else {
            // If sidekickToDestroy is false, push the card to the discard pile
            playerDiscardPile.push(card);
        }
    } else {
        // If the card does not have the sidekickToDestroy attribute, push it to the discard pile
        playerDiscardPile.push(card);
    }
}
    selectedCards = [];
justAddedToDiscard = [];
cardsPlayedThisTurn = [];
    totalAttackPoints = 0;
    totalRecruitPoints = 0;
        cumulativeAttackPoints = 0;
        cumulativeRecruitPoints = 0;
recruitUsedToAttack = false;
const recruitLabel = document.getElementById('recruit-point-label')
recruitLabel.innerHTML = "Recruit: ";
sidekickRecruited = false;
    attackPoints = 0;
    recruitPoints = 0;
extraCardsDrawnThisTurn = 0;
city1TempBuff = 0;
city2TempBuff = 0;
city3TempBuff = 0;
city4TempBuff = 0;
city5TempBuff = 0;
mastermindTempBuff = 0;
rescueExtraBystanders = 0;
rescueExtraBystanders = 0;
secondDocOc = false;
let schemeTwistChainDepth = 0;  // Tracks nested Scheme Twists
let pendingHeroKO = false; 
    playerDiscardPile.push(...playerHand);
    playerHand = [];
for (let i = 0; i < nextTurnsDraw; i++) {
    if (cardsToBeDrawnNextTurn.length > 0) {
        // Draw the next card from the cardsToBeDrawnNextTurn array
        const card = cardsToBeDrawnNextTurn.shift(); // Remove the first card in the array
        playerHand.push(card); // Add the card to the player's hand
        console.log(`Drew ${card.name} from cardsToBeDrawnNextTurn.`);
    } else {
        // Proceed to draw from the deck
        if (playerDeck.length === 0) {
            if (playerDiscardPile.length > 0) {
                console.log('Deck is empty, reshuffling discard pile into deck.');
                playerDeck = shuffle(playerDiscardPile);
                playerDiscardPile = [];
            } else {
                console.log('No cards left to draw.');
                break; // Exit the loop if no more cards can be drawn
            }
        }

        drawCard();
    }

    if (i >= 6) {
        extraCardsDrawnThisTurn++;
    }
}

    healingPossible = true;
    updateGameBoard();
    drawVillainCard();
nextTurnsDraw = 6;
cardsToBeDrawnNextTurn = [];
}
}

function showRecruitPopup() {
    const recruitPopup = document.getElementById('recruit-popup');
    const closeBtn = recruitPopup.querySelector('.close-btn');
    const confirmBtn = document.getElementById('confirm-recruit');
    const modalOverlay = document.getElementById('modal-overlay');

    if (totalRecruitPoints >= 3) {
        recruitPopup.style.display = 'block';
        modalOverlay.style.display = 'block';

        closeBtn.onclick = () => {
            recruitPopup.style.display = 'none';
            modalOverlay.style.display = 'none';
        };

        confirmBtn.onclick = () => {
            recruitOfficer();
            recruitPopup.style.display = 'none';
            modalOverlay.style.display = 'none';
            healingPossible = false;
        };
    } else {
        showMessagePopup(`You need 3<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons"> to recruit a <span class="bold-spans">S.H.I.E.L.D. Officer</span>.`);
    }
}

const endTurnButton = document.getElementById("end-turn");
let holdTimer;
let isHolding = false; // Tracks if the button is being held

function startHold() {
    if (isHolding) return; // Prevent multiple triggers

    isHolding = true;
    endTurnButton.classList.add("holding"); // Start border animation

    holdTimer = setTimeout(() => {
        endTurn();
        resetButton(); // Reset automatically
    }, 1500);
}

function cancelHold() {
    clearTimeout(holdTimer);
    resetButton();
}

function resetButton() {
    isHolding = false;
    endTurnButton.classList.remove("holding"); // Remove border animation
}

// Mouse events (Desktop)
endTurnButton.addEventListener("mousedown", startHold);
endTurnButton.addEventListener("mouseup", cancelHold);
endTurnButton.addEventListener("mouseleave", cancelHold);

// Touch events (Mobile)
endTurnButton.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevents accidental double-taps
    startHold();
});
endTurnButton.addEventListener("touchend", cancelHold);
endTurnButton.addEventListener("touchcancel", cancelHold);


function isVillainConditionMet(villainCard) {
    const { fightCondition, conditionType, condition } = villainCard;
const cardsYouHave = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => 
        card.isCopied !== true && 
        card.sidekickToDestroy !== true
    )
];

    switch (fightCondition) {
        case 'heroYouHave':
            return heroesYouHave.some(heroCard =>
                heroCard[conditionType] === condition
            );
        
        case 'villainInVP':
            return victoryPile.some(villain =>
                villain[conditionType] === condition
            );

        // You can add more cases here for different types of fight conditions
        default:
            console.warn(`Unknown fight condition: ${fightCondition}`);
            return false;
    }
}

function showAttackButton(cityIndex) {
    const villainCard = city[cityIndex];
    const cityCell = document.querySelector(`#city-${cityIndex + 1}`);

    // Calculate the villain's effective attack value
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);
    let villainAttack = recalculateVillainAttack(villainCard, selectedScheme);

    // Ensure villainAttack doesn't drop below 0
    if (villainAttack < 0) {
        villainAttack = 0;
    }

    // Check if the fight condition is met
    if (villainCard.fightCondition && villainCard.fightCondition !== "None" && !isVillainConditionMet(villainCard)) {
        onscreenConsole.log(`You have not met <span class="console-highlights">${villainCard.name}</span><span class="bold-spans">'s</span> fight condition.`);
        return;
    }

    // Check if the player has enough attack points
    let playerAttackPoints = totalAttackPoints;
    if (recruitUsedToAttack === true) {
        playerAttackPoints += totalRecruitPoints;
    }

    if (playerAttackPoints >= villainAttack) {
        // Create or update the attack button
        let attackButton = cityCell.querySelector('.attack-button');
        if (!attackButton) {
            attackButton = document.createElement('button');
            attackButton.classList.add('attack-button');
            cityCell.appendChild(attackButton);
        }

        // Update the button text and style
        attackButton.innerHTML = `<span style="filter: drop-shadow(0vh 0vh 0.3vh black);">ATTACK?<br><span style="white-space: nowrap;">COST: ${villainAttack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"></span></span>`;
        attackButton.style.display = 'block';

        // Handle button click
        attackButton.onclick = () => {
            confirmAttack(cityIndex);
            attackButton.style.display = 'none'; // Hide the button after attack
            healingPossible = false;
            updateGameBoard();
        };

        // Handle clicks outside the button
        const handleClickOutside = (event) => {
            if (!attackButton.contains(event.target)) {
                attackButton.style.display = 'none'; // Hide the button if clicked outside
                document.removeEventListener('click', handleClickOutside);
            }
        };

        // Add a slight delay to avoid immediately hiding the button
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);
    } else {
        onscreenConsole.log(`You need ${villainAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to defeat <span class="console-highlights">${villainCard.name}</span>.`);
    }
}

function recalculateVillainAttack(villainCard, selectedScheme) {
    if (!villainCard || typeof villainCard.attack === 'undefined') {
        console.error('Error: Invalid or undefined villainCard encountered in recalculateVillainAttack.');
        return 0; // Return 0 attack if the card is invalid
    }

    // Recalculate the attack as before (with buffs, etc.)
    let attackValue = villainCard.attack || villainCard.originalAttack;

    // Add any buffs or other conditions if applicable
    const cityIndex = city.indexOf(villainCard);
    const tempBuffVariableName = `city${cityIndex + 1}TempBuff`;
    const tempBuffValue = window[tempBuffVariableName] || 0;
    const permBuffVariableName = `city${cityIndex + 1}PermBuff`;
    const permBuffValue = window[permBuffVariableName] || 0;
    const shatteredAmount = villainCard.shattered || 0;

    attackValue += tempBuffValue + permBuffValue - (villainCard.shattered || 0);

    // Safely handle the "Midtown Bank Robbery" scheme adjustment
    if (selectedScheme && selectedScheme.name === 'Midtown Bank Robbery' && Array.isArray(villainCard.bystander)) {
        attackValue += villainCard.bystander.length;
    }

if (villainCard.name === 'Killbot') {
attackValue += killbotAttack;
}

    return attackValue;
    
}

function confirmAttack(cityIndex) {
    const villainCard = city[cityIndex];
console.log("Villain Card Object:", villainCard);
 const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);


 // Set the currentVillainLocation to the current location of the villain
    currentVillainLocation = cityIndex; // Store the city index (location) of the villain
console.log("Selected Villain's Location: ", currentVillainLocation);

    // Calculate the villain's effective attack value
 let villainAttack = recalculateVillainAttack(villainCard, selectedScheme);

    // Ensure villainAttack doesn't drop below 0
    if (villainAttack < 0) {
        villainAttack = 0;
    }

    if (villainCard.bystander) {
    villainCard.bystander.forEach(bystander => {
        victoryPile.push(bystander); // Add each bystander object to the Victory Pile
    });
}

    city[cityIndex] = null; // Clear the cell in the city array
    victoryPile.push(villainCard);

onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been defeated.`);


    if (recruitUsedToAttack === true) {
        if (totalAttackPoints >= villainAttack) {
            // The player has enough attack points alone
            totalAttackPoints -= villainAttack; // Subtract the villain attack from total attack points
        } else {
            // The player needs to use recruit points as well
            const remainingAttack = villainAttack - totalAttackPoints; // Calculate how much more is needed
            totalAttackPoints = 0; // All attack points are used up
            totalRecruitPoints -= remainingAttack; // Subtract the remaining amount from recruit points
        }
    } else {
        // The attack only uses attack points
        totalAttackPoints -= villainAttack; // Subtract the effective attack value
    }

if (rescueExtraBystanders > 0) {
  for (let i = 0; i < rescueExtraBystanders; i++) {
    rescueBystander();
  }
}

    if (extraThreeRecruitAvailable === true) {
        totalRecruitPoints += 3;
        cumulativeRecruitPoints += 3;
    }

    // Handle fight effect if the villain has one
let fightEffectPromise = Promise.resolve();
if (villainCard.fightEffect && villainCard.fightEffect !== "None") {
    const fightEffectFunction = window[villainCard.fightEffect];
    console.log("Fight effect function found:", fightEffectFunction);
    if (typeof fightEffectFunction === 'function') {
        fightEffectPromise = new Promise((resolve, reject) => {
            try {
                const result = fightEffectFunction(villainCard); // Pass villainCard as an argument here
                console.log("Fight effect executed:", result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    } else {
        console.error(`Fight effect function ${villainCard.fightEffect} not found`);
    }
} else {
    console.log("No fight effect found for this villain.");
}

    fightEffectPromise.then(() => {
        updateGameBoard(); // Update the game board after fight effect is handled
    }).catch(error => {
        console.error(`Error in fight effect: ${error}`);
        updateGameBoard(); // Ensure the game board is updated even if the fight effect fails

// Reset the currentVillainLocation after the attack is resolved
        currentVillainLocation = null;
    }).catch(error => {
        console.error(`Error in fight effect: ${error}`);
        updateGameBoard(); // Ensure the game board is updated even if the fight effect fails

        // Reset the currentVillainLocation even if an error occurs
        currentVillainLocation = null;
    });
}

function showHeroKOPopup(callback) {
    const heroKOPopup = document.getElementById('hero-KO-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const heroOptions = document.getElementById('hero-KO-options');
    const heroImagePlaceholder = document.getElementById('hero-image-placeholder');
    const heroImage = document.getElementById('hero-ko-image'); // Reference to the img element
const hoverText = document.getElementById('KOHoverText');

    heroOptions.innerHTML = ''; // Clear previous options

    let eligibleHeroes = 0;

    hq.forEach((hero, index) => {
        if (hero && hero.cost <= 6) {
            eligibleHeroes++;
            const heroButton = document.createElement('button');
            heroButton.innerText = hero.name;

            // Handle hover to display hero image
            heroButton.onmouseover = () => {
                heroImage.src = hero.image; // Dynamically change the image src
                heroImage.style.display = 'block'; // Show the image
                hoverText.style.display = 'none'; // Show the image
            };

            // Handle mouse out to restore original state
            heroButton.onmouseout = () => {
                heroImage.src = ''; // Clear the image source
                heroImage.style.display = 'none'; // Hide the image
                hoverText.style.display = 'block'; // Show the image
            };

            // Handle click to KO hero
            heroButton.onclick = () => {

                koHeroInHQ(index);
                heroKOPopup.style.display = 'none';
                modalOverlay.style.display = 'none';
                if (callback) callback();
            };

            heroOptions.appendChild(heroButton);
        }
    });

    if (eligibleHeroes === 0) {
        const message = document.createElement('p');
        message.innerText = 'No heroes available with a cost of 6 or less.';
        heroOptions.appendChild(message);

        setTimeout(() => {
            heroKOPopup.style.display = 'none';
            modalOverlay.style.display = 'none';
            if (callback) callback();
        }, 3000); // Close the popup after 3 seconds
    }

    modalOverlay.style.display = 'block';
    heroKOPopup.style.display = 'block';
}



function koHeroInHQ(index) {
    const hero = hq[index];
    if (hero) {
        koPile.push(hero); // Add the Hero to the KO pile
onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd.`);
        hq[index] = heroDeck.length > 0 ? heroDeck.pop() : null; // Fill the HQ slot with the top card of the Hero deck
        updateGameBoard();
    }

        if (!hq[index] && heroDeck.length === 0) {
            showHeroDeckEmptyPopup();
        }
}

function showDiscardCardPopup() {
    return new Promise((resolve, reject) => {
        const discardPopup = document.getElementById('discard-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const discardOptions = document.querySelector('.discard-buttons');
        const discardImagePlaceholder = document.querySelector('.discard-image');
        discardOptions.innerHTML = ''; // Clear previous options

const discardImage = document.getElementById('discard-card-image'); // Reference to the img element
const discardHoverText = document.getElementById('discard-card-popupHoverText');

 


        playerHand.forEach((card, index) => {
            const cardButton = document.createElement('button');
            cardButton.innerText = card.name;
            cardButton.onmouseover = () => {
                discardImage.src = card.image; // Dynamically change the image src
                discardImage.style.display = 'block'; // Show the image
                discardHoverText.style.display = 'none'; // Show the image
            };

            // Handle mouse out to restore original state
            cardButton.onmouseout = () => {
                discardImage.src = ''; // Clear the image source
                discardImage.style.display = 'none'; // Hide the image
                discardHoverText.style.display = 'block'; // Show the image
            };

            cardButton.onclick = () => {
                try {
                    discardCard(index);
                    discardPopup.style.display = 'none';
                    modalOverlay.style.display = 'none';
                    resolve(); // Resolve the promise after the card is discarded
                } catch (error) {
                    reject(error); // Reject the promise if there was an error
                }
            };
            discardOptions.appendChild(cardButton);
        });

        modalOverlay.style.display = 'block';
        discardPopup.style.display = 'block';
    });
}


function discardCard(index) {
    const card = playerHand.splice(index, 1)[0];
    playerDiscardPile.push(card);
onscreenConsole.log(`<span class="console-highlights">${card.name}</span> has been discarded.`);
    updateGameBoard();
}

document.getElementById('healing-button').addEventListener('click', () => {
console.log("Healing Button Clicked");
    healWounds();
    showHealingPopup();
});

function healWounds() {
console.log('Healing Wounds...');
onscreenConsole.log('<span style="font-style:italic;">Healing Wounds...</span>');
    let index = 0;
    while (index < playerHand.length) {
        const card = playerHand[index];
        if (card.name === "Wound") {
            koPile.push(card);
        } else {
            playerDiscardPile.push(card);
        }
        playerHand.splice(index, 1); // Remove the card from hand
    }

    // End the player's turn
    endTurn();
}

function updateHealWoundsButton() {
    const healWoundsButton = document.getElementById('healing-button');
    const hasWounds = playerHand.some(card => card.type === "Wound");
    
    if (hasWounds && healingPossible) {
        healWoundsButton.disabled = false; // Enable the button
console.log('Heal Button Enabled');
    } else {
        healWoundsButton.disabled = true; // Disable the button
console.log('Heal Button Disabled');
    }
}

function showHealingPopup() {
    const healingPopup = document.getElementById('healing-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const healingPopupCard = document.getElementById('healing-popup-card'); // Get the card element

    // Show the popup and overlay
    healingPopup.style.display = 'block';
    modalOverlay.style.display = 'block';

    // Make the healing popup card visible with full opacity
    healingPopupCard.style.opacity = '1';

    console.log('Showing Healing Popup');

    // Gradually fade out the healing popup card over 3 seconds
    setTimeout(() => {
        healingPopupCard.style.opacity = '0'; // Set opacity to 0 to start the fade-out effect
    }, 100); // Slight delay before starting the fade to ensure it starts after showing

    // Hide the popup and overlay after 3 seconds
    setTimeout(() => {
        healingPopup.style.display = 'none';
        modalOverlay.style.display = 'none';
    }, 3000); // Hide the popup after 3 seconds
}

function recalculateMastermindAttack(mastermind) {
    // Fetch buffs for the mastermind
    const mastermindTempBuff = window.mastermindTempBuff || 0; // Assume mastermindTempBuff is defined globally
    const mastermindPermBuff = window.mastermindPermBuff || 0; // Assume mastermindPermBuff is defined globally

    // Start with the mastermind's base attack value
    let mastermindAttack = mastermind.attack + mastermindTempBuff + mastermindPermBuff;

    // Ensure mastermindAttack doesn't drop below 0
    if (mastermindAttack < 0) {
        mastermindAttack = 0;
    }

    return mastermindAttack;
}


// New functions for Mastermind attack mechanics

document.getElementById('mastermind').addEventListener('click', () => {
    let mastermind = getSelectedMastermind();

    // Use the recalculated mastermind attack value
    let mastermindAttack = recalculateMastermindAttack(mastermind);

    let playerAttackPoints = totalAttackPoints;

    if (recruitUsedToAttack === true) {
        playerAttackPoints += totalRecruitPoints; // Add recruit points to attack points if allowed
    }

    if (mastermind.tactics.length === 0) {
    onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> has no remaining tactics and cannot be attacked.`);
} else if (playerAttackPoints >= mastermindAttack) {
    showMastermindAttackButton();
} else {
    onscreenConsole.log(`You need ${mastermindAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to defeat <span class="console-highlights">${mastermind.name}</span>.`);
}
});


function showMastermindAttackButton() {
    let mastermind = getSelectedMastermind();

    const mastermindAttackButtonContainer = document.getElementById('mastermind-attack-button-container');
    const mastermindAttackButton = document.getElementById('mastermind-attack-button');
    const mastermindAttackButtonText = document.getElementById('mastermind-attack-cost');

    if (!mastermindAttackButtonContainer || !mastermindAttackButton || !mastermindAttackButtonText) {
        console.error('Attack button container, button, or text element not found for the mastermind');
        return;
    }

    // Use the recalculated mastermind attack value
    let mastermindAttack = recalculateMastermindAttack(mastermind);

    // Show the button and container
    mastermindAttackButtonContainer.style.display = 'block';
    mastermindAttackButton.style.display = 'block';
    mastermindAttackButtonText.innerHTML = `${mastermindAttack}`;

    // Function to handle clicks outside the button
    const handleClickOutside = (event) => {
        // Check if the click was outside the button and its container
        if (!mastermindAttackButton.contains(event.target) && !mastermindAttackButtonContainer.contains(event.target)) {
            // Hide the button and its container
            mastermindAttackButtonContainer.style.display = 'none';
            mastermindAttackButton.style.display = 'none';

            // Remove the event listener after hiding the button
            document.removeEventListener('click', handleClickOutside);
        }
    };

    // Add the event listener to detect clicks outside the button
    // Use a slight delay to avoid immediately hiding the button
    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 0);

    // Add a click event listener to the attack button
    mastermindAttackButton.onclick = () => {
        isAttacking = true; // Set the flag to true when attacking starts
        confirmMastermindAttack();
        mastermindAttackButtonContainer.style.display = 'none';
        mastermindAttackButton.style.display = 'none';
        healingPossible = false;

        // Remove the event listener after the button is clicked
        document.removeEventListener('click', handleClickOutside);

        // Re-enable the onclick event handler after a short delay
        setTimeout(() => {
            isAttacking = false;
        }, 500); // Adjust the delay as needed
    };
}

function confirmMastermindAttack() {
    
    let mastermind = getSelectedMastermind();
healingPossible = false;

    // Use the recalculated mastermind attack value
    let mastermindAttack = recalculateMastermindAttack(mastermind);

    // Deduct attack points or use recruit points if needed
    if (recruitUsedToAttack === true) {
        if (totalAttackPoints >= mastermindAttack) {
            totalAttackPoints -= mastermindAttack;
        } else {
            const remainingAttack = mastermindAttack - totalAttackPoints;
            totalAttackPoints = 0;
            totalRecruitPoints -= remainingAttack;
        }
    } else {
        totalAttackPoints -= mastermindAttack;
    }

if (rescueExtraBystanders > 0) {
  for (let i = 0; i < rescueExtraBystanders; i++) {
    rescueBystander();
  }
}

    if (extraThreeRecruitAvailable === true) {
        totalRecruitPoints += 3;
        cumulativeRecruitPoints += 3;
    }

    mastermind.bystanders.forEach(bystander => {
        victoryPile.push(bystander);
    });
    mastermind.bystanders = []; // Clear the bystanders

    updateMastermindOverlay();
    updateGameBoard();

    if (mastermind.tactics.length === 0) {
        if (finalBlowEnabled) {
            const finalBlowCard = { name: "Final Blow", type: "Mastermind" };
            victoryPile.push(finalBlowCard);
            checkWinCondition();
        } else {
            checkWinCondition();
        }
    } else {
        revealMastermindTactic(mastermind);
    }
}


function revealMastermindTactic(mastermind) {
    const tacticCard = mastermind.tactics.pop();
    showTacticPopup(tacticCard);

    // Push the tactic to the victory pile
    victoryPile.push(tacticCard);

}

function showTacticPopup(tacticCard) {
    return new Promise((resolve) => {
        const popup = document.getElementById('tactic-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const resolveButton = document.getElementById('resolve-tactic');



        document.getElementById('tactic-effect').innerHTML = tacticCard.effect;
document.getElementById('mastermind-tactic-image').src = tacticCard.image;

        popup.style.display = 'block';
        modalOverlay.style.display = 'block';

        // Remove any previous event listener on the resolve button to avoid accumulation
        resolveButton.replaceWith(resolveButton.cloneNode(true)); 
        const newResolveButton = document.getElementById('resolve-tactic');
        
        // Add the new event listener
        newResolveButton.addEventListener('click', () => {
popup.style.display = 'none';
                modalOverlay.style.display = 'none';
            resolveTacticEffects(tacticCard).then(() => {
                
                resolve(); // Resolve the promise after the tactic effects are resolved
            });
        });
    });
}

function resolveTacticEffects(tacticCard) {
    return new Promise((resolve) => {
        const fightEffectFunction = window[tacticCard.fightEffect]; // Access the function by name from the global scope

        if (typeof fightEffectFunction === 'function') {
            console.log('Executing tactic card effect:', tacticCard.fightEffect);
            
            // Execute the fightEffect function
            let effectResult = fightEffectFunction();

            // If the result is not a promise, wrap it in a resolved promise
            if (!effectResult || typeof effectResult.then !== 'function') {
                effectResult = Promise.resolve(effectResult);
            }

            // Proceed with the promise
            effectResult.then(() => {
                checkMastermindState();
                resolve();
            }).catch(err => {
                console.error('Error executing fightEffect:', err);
                resolve(); // Resolve the promise even if there's an error
            });
        } else {
            console.log('Tactic card effect not found for:', tacticCard.fightEffect);
            checkMastermindState();
            resolve();
        }
    });
}

function checkMastermindState() {
    // Check if there are no more tactics left
    let mastermind = getSelectedMastermind();
    if (mastermind.tactics.length === 0) {
        if (finalBlowEnabled) {
            finalBlowNeededPopup(); // Trigger the Final Blow Needed Popup if no tactics left and Final Blow is enabled
        }
    }
    checkWinCondition();
}




// Add this JavaScript to your script.js
function showMessagePopup(message) {
    const messagePopup = document.getElementById('message-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const messageText = document.getElementById('message-popup-text');

    messageText.innerHTML = message;
    messagePopup.style.display = 'block';
    modalOverlay.style.display = 'block';
}

function closeMessagePopup() {
    const messagePopup = document.getElementById('message-popup');
    const modalOverlay = document.getElementById('modal-overlay');

    messagePopup.style.display = 'none';
    modalOverlay.style.display = 'none';
}

document.getElementById('return-home-button').addEventListener('click', () => {
    closeDrawPopup();
    returnHome();
});

function showDrawPopup() {
    const drawPopup = document.getElementById('draw-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    drawPopup.style.display = 'block';
    modalOverlay.style.display = 'block';
}

function closeDrawPopup() {
    const drawPopup = document.getElementById('draw-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    drawPopup.style.display = 'none';
    modalOverlay.style.display = 'none';
}

function restartGame() {
    // Preserve the current scheme, mastermind, villains, henchmen, and final blow choice
    const selectedScheme = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedMastermind = document.querySelector('#mastermind-section input[type=radio]:checked').value;
    const selectedVillains = Array.from(document.querySelectorAll('#villains-section input[type=checkbox]:checked')).map(cb => cb.value);
    const selectedHenchmen = Array.from(document.querySelectorAll('#henchmen-section input[type=checkbox]:checked')).map(cb => cb.value);
    const selectedHeroes = Array.from(document.querySelectorAll('#heroes-section input[type=checkbox]:checked')).map(cb => cb.value);

    finalBlowEnabled = document.getElementById('final-blow-checkbox').checked;

    // Reset and shuffle decks
    villainDeck = generateVillainDeck(selectedVillains, selectedHenchmen, selectedScheme);
    heroDeck = generateHeroDeck(selectedHeroes);
    playerDeck = shuffle([...shieldCards]);

    resetGameState();

   // Re-initialize the game
    initGame(selectedHeroes, selectedVillains, selectedHenchmen, selectedMastermind, selectedScheme);
}

function resetGameState() {
    shieldDeck = [...shieldOfficers];
woundDeck = [...wounds];
villainDeck = [];
currentVillainLocation = null;
heroDeck = [];
skrullDeck = [];
hq = [];
city = ["", "", "", "", ""];
city1TempBuff = 0;
city2TempBuff = 0;
city3TempBuff = 0;
city4TempBuff = 0;
city5TempBuff = 0;
mastermindTempBuff = 0;
city1PermBuff = 0;
city2PermBuff = 0;
city3PermBuff = 0;
city4PermBuff = 0;
city5PermBuff = 0;
mastermindPermBuff = 0;
playerHand = [];
playerDeck = [];
playerDiscardPile = [];
justAddedToDiscard = [];
cardsPlayedThisTurn = [];
koPile = [];
escapedVillainsDeck = [];
victoryPile = [];
attackPoints = 0;
recruitPoints = 0;
cumulativeAttackPoints = 0;
cumulativeRecruitPoints = 0;
recruitUsedToAttack = false;
selectedCards = [];
totalAttackPoints = 0;
totalRecruitPoints = 0;
killbotAttack = 3;
healingPossible = true;
finalBlowEnabled = false;
escapedVillainsCount = 0;
lastTurn = false;
mastermindDeck = [];
alwaysLeads = '';
totalBystanders = 30;
extraCardsDrawnThisTurn = 0;
nextTurnsDraw = 6;
cardsToBeDrawnNextTurn = [];
rescueExtraBystanders = 0;
extraThreeRecruitAvailable = false;
bystanderDeck = shuffle(bystanders);
let pendingSchemeTwists = []; // Stores all Twists awaiting resolution
let isProcessingTwists = false; // Prevents overlapping chains
   
    // Clear the game board
    updateGameBoard();
}

function returnHome() {
    location.reload();
}

function showHeroDeckEmptyPopup() {
    const heroDeckEmptyPopup = document.getElementById('hero-deck-empty-popup');
    const modalOverlay = document.getElementById('modal-overlay'); // Corrected ID
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    if (selectedScheme.name === 'Super Hero Civil War') { 
        console.log('Defeat popup should display instead of draw.');
    } else {
        heroDeckEmptyPopup.style.display = 'block';
        modalOverlay.style.display = 'block';
    }
}

function closeHeroDeckEmptyPopup() {
    const heroDeckEmptyPopup = document.getElementById('hero-deck-empty-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    heroDeckEmptyPopup.style.display = 'none';
    modalOverlay.style.display = 'none';
}

document.getElementById('return-home-hero-button').addEventListener('click', () => {
    closeHeroDeckEmptyPopup();
    returnHome();
});

function showDefeatPopup() {
    const defeatPopup = document.getElementById('defeat-popup');
const modalOverlay = document.getElementById('modal-overlay');
    defeatPopup.style.display = 'block';
modalOverlay.style.display = 'block';


    document.getElementById('defeat-return-home-button').addEventListener('click', returnHome);
}

document.getElementById('defeat-return-home-button').addEventListener('click', () => {
    closeDefeatPopup();
    returnHome();
});

function closeDefeatPopup() {
    const defeatPopup = document.getElementById('defeat-popup');
const modalOverlay = document.getElementById('modal-overlay');
    defeatPopup.style.display = 'none';
modalOverlay.style.display = 'none';
}

function showFinishTurnPopup() {
    const finishTurnPopup = document.getElementById('finish-turn-popup');
const modalOverlay = document.getElementById('modal-overlay');
    finishTurnPopup.style.display = 'block';
modalOverlay.style.display = 'block';

    lastTurn = true;
}

document.getElementById('finish-turn-button').addEventListener('click', () => {
    closeFinishTurnPopup();

});

function closeFinishTurnPopup() {
    const finishTurnPopup = document.getElementById('finish-turn-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    finishTurnPopup.style.display = 'none';
    modalOverlay.style.display = 'none';

updateGameBoard();
}

function checkWinCondition() {
    const requiredTactics = finalBlowEnabled ? 5 : 4;
    const mastermindTacticsCount = victoryPile.filter(card => card.type === 'Mastermind').length;
    
    console.log('Victory Pile:', victoryPile); // Log the contents of the victory pile
    console.log('Mastermind Tactics Count:', mastermindTacticsCount); // Log the count of mastermind tactics
    
    if (mastermindTacticsCount >= requiredTactics) {
        showFinishTurnPopup();
    }
}

function showWinPopup() {
    const winPopup = document.getElementById('win-popup');
const modalOverlay = document.getElementById('modal-overlay');

const totalVictoryPoints = calculateVictoryPoints(victoryPile);
    document.getElementById('victoryPointsTotal').innerText = totalVictoryPoints;


    winPopup.style.display = 'block';
modalOverlay.style.display = 'block';


}

document.getElementById('win-return-home-button').addEventListener('click', () => {
    returnHome();
});

function getCurrentGameStats() {
    const numEscapedVillains = escapedVillainsDeck.length;
    const numSchemeTwistsInKoDeck = koPile.filter(card => card.type === 'Scheme Twist').length;
const numBystandersInEscapedVillainsDeck = escapedVillainsDeck.filter(card => card.type === 'Bystander').length;

    return {
        villainsInEscapeDeck: numEscapedVillains,
        schemeTwistsInKoDeck: numSchemeTwistsInKoDeck,
capturedBystanders: numBystandersInEscapedVillainsDeck
    };
}

function calculateVictoryPoints(victoryPile) {
    // Calculate base victory points from victory pile
    let totalPoints = victoryPile.reduce((total, card) => total + (card.victoryPoints || 0), 0);

    // Get current game stats
    const { villainsInEscapeDeck, schemeTwistsInKoDeck, capturedBystanders } = getCurrentGameStats();

    // Subtract points for escaped villains
    totalPoints -= (villainsInEscapeDeck - capturedBystanders) * 1;

    // Subtract points for captured bystanders
    totalPoints -= capturedBystanders * 4;

    // Subtract points for scheme twists in KO deck
    totalPoints -= 3 * schemeTwistsInKoDeck;

    // -------- Supreme HYDRA Calculation --------
    // Count the number of 'Supreme HYDRA' cards in the victory pile
    const supremeHydraCount = victoryPile.filter(card => card.name === 'Supreme HYDRA').length;

    // If there are 'Supreme HYDRA' cards, calculate additional points
    if (supremeHydraCount > 0) {
        // Count the number of HYDRA villains in the victory pile (type = Villain and name contains 'HYDRA')
        const hydraVillainCount = victoryPile.filter(card => card.name.includes('HYDRA') && card.type === 'Villain').length;

        // Calculate the bonus points for each 'Supreme HYDRA' card
        const hydraBonusPoints = 3 * hydraVillainCount - 1;

        // Multiply the bonus points by the number of 'Supreme HYDRA' cards
        totalPoints += hydraBonusPoints * supremeHydraCount;
    }

    // -------- Ultron Calculation --------
    // Count the number of 'Ultron' cards in the victory pile
    const ultronCount = victoryPile.filter(card => card.name === 'Ultron').length;

    // If there are 'Ultron' cards, calculate additional points based on Tech cards
    if (ultronCount > 0) {
        // Get the number of Tech cards in all available locations (discard pile, hand, cards played this turn, deck)
        const techCardCount = countTechCards();

        // Add points for each Ultron card based on the number of Tech cards
        totalPoints += ultronCount * techCardCount;
    }

    return totalPoints;
}

function countTechCards() {
    // Assuming these variables contain the cards in their respective locations
    const allCards = [
        ...playerDiscardPile,   // Discard pile
        ...playerHand,          // Hand
        ...cardsPlayedThisTurn, // Cards played this turn
        ...playerDeck           // Deck
    ];

    // Filter the Tech cards
    const techCards = allCards.filter(card => card.class1 === 'Tech' || card.class2 === 'Tech');

    // Return the total number of Tech cards
    return techCards.length;
}



function finalBlowNeededPopup() {
    const finalBlowNeededPopup = document.getElementById('final-blow-popup');
const modalOverlay = document.getElementById('modal-overlay');
   
 finalBlowNeededPopup.style.display = 'block';
modalOverlay.style.display = 'block';
 }

function closeFinalBlowPopup() {
    document.getElementById('final-blow-popup').style.display = 'none';
document.getElementById('modal-overlay').style.display = 'none';
}


function hideHeroAbilityMayPopup() {
  // Hide the pop-up and overlay
  document.getElementById('hero-ability-may-popup').style.display = 'none';
  document.getElementById('modal-overlay').style.display = 'none';
}

function showHeroAbilityMayPopup(promptText, confirmLabel = "Confirm", denyLabel = "Deny", extraLabel = "", showExtraButton = false) {
  // Set the prompt text
  document.querySelector('#hero-ability-may-popup p').innerHTML = promptText;

  // Get the button elements
  const confirmButton = document.getElementById('hero-ability-confirm');
  const denyButton = document.getElementById('hero-ability-deny');
  const extraButton = document.getElementById('hero-ability-extra');

  // Set the button labels
  confirmButton.innerText = confirmLabel;
  denyButton.innerText = denyLabel;

  // Ensure the confirm and deny buttons are visible
  confirmButton.style.display = 'inline-block';
  denyButton.style.display = 'inline-block';

  // Set up the extra button
  if (showExtraButton) {
    extraButton.innerText = extraLabel;
    extraButton.style.display = 'inline-block';
  } else {
    extraButton.style.display = 'none';
  }

  // Show the pop-up and overlay
  document.getElementById('hero-ability-may-popup').style.display = 'block';
  document.getElementById('modal-overlay').style.display = 'block';

  // Ensure previous event listeners are removed by cloning the buttons
  const clonedConfirmButton = confirmButton.cloneNode(true);
  const clonedDenyButton = denyButton.cloneNode(true);
  const clonedExtraButton = extraButton.cloneNode(true);

  // Replace the old buttons with the new cloned ones
  confirmButton.replaceWith(clonedConfirmButton);
  denyButton.replaceWith(clonedDenyButton);
  extraButton.replaceWith(clonedExtraButton);

  // Retrieve the new elements after replacement
  const newConfirmButton = document.getElementById('hero-ability-confirm');
  const newDenyButton = document.getElementById('hero-ability-deny');
  const newExtraButton = document.getElementById('hero-ability-extra');

  // Debugging: Ensure buttons are visible and set correctly
  console.log('Confirm button display:', window.getComputedStyle(newConfirmButton).display);
  console.log('Confirm button text:', newConfirmButton.innerText);
  console.log('Deny button display:', window.getComputedStyle(newDenyButton).display);
  console.log('Deny button text:', newDenyButton.innerText);

  return {
    confirmButton: newConfirmButton,
    denyButton: newDenyButton,
    extraButton: newExtraButton,
  };
}



const zoomedImage = document.getElementById('zoomed-image');
let activeImage = null; // Track the currently locked image

// Combine all card lists into a single array
const allCards = [
    ...(bystanders ?? []),
    ...(shieldCards ?? []),
    ...(shieldOfficers ?? []),
    ...(wounds ?? []),
    ...(schemes ?? []),
    ...(henchmen ?? []),
    ...(sidekicks ?? []),
    ...(masterminds),
    ...[].concat(...(heroes?.map(group => group.cards) ?? [])), 
    ...[].concat(...(villains?.map(group => group.cards) ?? [])) 
];

// Create a lookup table for faster access
const cardLookup = {};
allCards.forEach((card) => {
    const normalizedPath = normalizeImagePath(card.image); // Normalize the image path
    cardLookup[normalizedPath] = card;
});

// Function to show the zoomed image
function showZoomedImage(imageUrl) {
    zoomedImage.src = imageUrl;
    zoomedImage.style.display = 'block';
}

// Function to hide the zoomed image (only if no image is locked)
function hideZoomedImage() {
    if (!activeImage) { 
        zoomedImage.style.display = 'none';
        zoomedImage.src = '';
    }
}

// Function to get the correct image URL from an element
function getImageFromElement(element) {
    if (element.classList.contains('console-highlights')) {
        return getCardImageFromName(element.textContent);
    }
    if (element.tagName === 'IMG') {
        return element.src; // Allow zooming any image
    }
    return null;
}

// Function to normalize the image path
function normalizeImagePath(imageUrl) {
    // Extract the relative path from the full URL
    const url = new URL(imageUrl, window.location.origin);
    let relativePath = url.pathname;

    // Remove leading slash if present
    if (relativePath.startsWith("/")) {
        relativePath = relativePath.slice(1);
    }

    // Decode URI-encoded characters (e.g., %20 -> space)
    relativePath = decodeURIComponent(relativePath);

    // Extract the "Visual Assets/..." part of the path
    const visualAssetsIndex = relativePath.indexOf("Visual Assets/");
    if (visualAssetsIndex !== -1) {
        relativePath = relativePath.slice(visualAssetsIndex);
    }

    return relativePath;
}

// Handle hover (for desktop users)
document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('img, .console-highlights'); // Works on any img
    if (target) {
        const imageUrl = getImageFromElement(target);

        // Show zoomed image (existing functionality)
        if (!activeImage && imageUrl) {
            showZoomedImage(imageUrl);
        } else if (activeImage && imageUrl && imageUrl !== activeImage) {
            // Unlock if hovering over a different image
            activeImage = null;
            showZoomedImage(imageUrl);
        }

        // Fetch and display card data (new functionality)
        if (imageUrl) {
            // Normalize the path
            const relativePath = normalizeImagePath(imageUrl);
            console.log("Normalized path:", relativePath); // Log the normalized path

            // Find the corresponding card
            const card = cardLookup[relativePath];

            if (card) {
                updateRightPanel(card); // Pass the card data to another function
            } else {
                console.log("No card data found for image:", relativePath); // Log if no card data is found
            }
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('img, .console-highlights');
    if (!activeImage && target) {
        hideZoomedImage();

        // Clear the right panel
        const keyword1Display = document.getElementById("keyword1");
        const keyword2Display = document.getElementById("keyword2");
        const keyword3Display = document.getElementById("keyword3");
        keyword1Display.textContent = "";
        keyword2Display.textContent = "";
        keyword3Display.textContent = "";

        // Clear keyword descriptions
        updateKeywordDescriptions(null, "keyword1Description");
        updateKeywordDescriptions(null, "keyword2Description");
        updateKeywordDescriptions(null, "keyword3Description");
    }
});

// Handle click (for mobile & desktop)
document.addEventListener('click', (e) => {
    const target = e.target.closest('img, .console-highlights'); // Works on any img
    if (target) {
        const imageUrl = getImageFromElement(target);

        if (imageUrl) {
            if (activeImage === imageUrl) {
                // If clicking the same image again, unlock it
                activeImage = null;
                hideZoomedImage();
            } else {
                // Lock the image
                activeImage = imageUrl;
                showZoomedImage(imageUrl);
            }
        }
    }
});

// Function to match text with a card's image
function getCardImageFromName(cardName) {
    const matchedCard = allCards.find(card => card.name.trim().toLowerCase() === cardName.trim().toLowerCase());
    return matchedCard ? matchedCard.image : null;
}

function updateRightPanel(card) {
    // Update keyword1 and its description
    const keyword1Display = document.getElementById("keyword1");
    if (card.keyword1 && card.keyword1 !== "None") {
        keyword1Display.textContent = `${card.keyword1}: `; // Add colon after keyword1
        updateKeywordDescriptions(card.keyword1, "keyword1Description"); // Update description
    } else {
        keyword1Display.textContent = ""; // Clear if keyword1 is missing or "None"
        updateKeywordDescriptions(null, "keyword1Description"); // Clear description
    }

    // Update keyword2 and its description
    const keyword2Display = document.getElementById("keyword2");
    if (card.keyword2 && card.keyword2 !== "None") {
        keyword2Display.textContent = `${card.keyword2}: `; // Add colon after keyword2
        updateKeywordDescriptions(card.keyword2, "keyword2Description"); // Update description
    } else {
        keyword2Display.textContent = ""; // Clear if keyword2 is missing or "None"
        updateKeywordDescriptions(null, "keyword2Description"); // Clear description
    }

    // Update keyword3 and its description
    const keyword3Display = document.getElementById("keyword3");
    if (card.keyword3 && card.keyword3 !== "None") {
        keyword3Display.textContent = `${card.keyword3}: `; // Add colon after keyword3
        updateKeywordDescriptions(card.keyword3, "keyword3Description"); // Update description
    } else {
        keyword3Display.textContent = ""; // Clear if keyword3 is missing or "None"
        updateKeywordDescriptions(null, "keyword3Description"); // Clear description
    }

    console.log(`Card hovered: ${card.name}`); // Optional: Log the card name for debugging
}


function updateKeywordDescriptions(keyword, descriptionElementId) {
    const descriptionElement = document.getElementById(descriptionElementId);
    if (keyword && keywordDescriptions[keyword]) {
        descriptionElement.innerHTML = keywordDescriptions[keyword]; // Display the description
    } else {
        descriptionElement.innerHTML = ""; // Clear if no description is found
    }
}

// Function to show the modal overlay
function showModalOverlay() {
    document.getElementById('modal-overlay').style.display = 'block';
}

// Function to hide the modal overlay
function hideModalOverlay() {
    document.getElementById('modal-overlay').style.display = 'none';
}

function openPlayedCardsPopup() {
    // Clear the playedCardsTable content before adding new cards
    const playedCardsTable = document.getElementById('playedCardsTable');
    playedCardsTable.innerHTML = ''; 

    // Populate the playedCardsTable with images
    cardsPlayedThisTurn.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Played card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        playedCardsTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('played-cards-popup').style.display = 'block';
    showModalOverlay();
}

// Function to close the Played Cards popup
function closePlayedCardsPopup() {
    document.getElementById('played-cards-popup').style.display = 'none';
    hideModalOverlay();
}

function openVictoryPilePopup() {
    // Clear the victoryPileTable content before adding new cards
    const victoryPileTable = document.getElementById('victoryPileTable');
    victoryPileTable.innerHTML = ''; 

    // Populate the victoryPileTable with images
    victoryPile.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Victory card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        victoryPileTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('victory-pile-popup').style.display = 'block';
    showModalOverlay();
}

// Function to close the Victory Pile popup
function closeVictoryPilePopup() {
    document.getElementById('victory-pile-popup').style.display = 'none';
    hideModalOverlay();
}

function openKOPilePopup() {
 
    const KOPileTable = document.getElementById('KOPileTable');
    KOPileTable.innerHTML = ''; 

    // Populate the KOPileTable with images
    koPile.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'KOd card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        KOPileTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('ko-pile-popup').style.display = 'block';
    showModalOverlay();
}

function closeKOPilePopup() {
    document.getElementById('ko-pile-popup').style.display = 'none';
    hideModalOverlay();
}

function openEscapedVillainsPopup() {
   
    const escapedVillainsTable = document.getElementById('escapedVillainsTable');
    escapedVillainsTable.innerHTML = ''; 

    
    escapedVillainsDeck.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Escaped Villain card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        escapedVillainsTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('escaped-villains-popup').style.display = 'block';
    showModalOverlay();
}

function closeEscapedVillainsPopup() {
    document.getElementById('escaped-villains-popup').style.display = 'none';
    hideModalOverlay();
}

function openDiscardPilePopup() {
   
    const DiscardPileTable = document.getElementById('DiscardPileTable');
    DiscardPileTable.innerHTML = ''; 

   
    playerDiscardPile.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Discarded card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        DiscardPileTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('discard-pile-popup').style.display = 'block';
    showModalOverlay();
}

function closeDiscardPilePopup() {
    document.getElementById('discard-pile-popup').style.display = 'none';
    hideModalOverlay();
}

// Event listeners for the buttons
document.getElementById('played-cards-deck-pile').addEventListener('click', openPlayedCardsPopup);
document.getElementById('victory-pile-button').addEventListener('click', openVictoryPilePopup);
document.getElementById('escape-pile-button').addEventListener('click', openEscapedVillainsPopup);
document.getElementById('ko-pile-button').addEventListener('click', openKOPilePopup);
document.getElementById('discard-pile-card-back').addEventListener('click', openDiscardPilePopup);

const playerHandElement = document.getElementById('player-hand-element');

function updateCardSizing() {
    let numCards = playerHandElement.children.length + 3; // Add 3 to the number of cards
    const maxCardsToFit = 18;
    const minCardsToFit = 6;
    
    // Ensure the number of cards stays within the limit
    if (numCards <= maxCardsToFit) {
        playerHandElement.style.setProperty('--num-cards', Math.max(numCards, minCardsToFit));
    } else {
        playerHandElement.style.setProperty('--num-cards', maxCardsToFit);
    }
}

// Get all elements with the class 'popup-visibility-btn'
const buttons = document.querySelectorAll('.popup-visibility-btn');

// Loop through each button and add the event listener
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Get all elements with the class 'popup'
        const popups = document.querySelectorAll('.popup');

        // Loop through each popup element
        popups.forEach(popup => {
            // Check the current opacity of the popup
            if (popup.style.opacity === '0.2') {
            
                popup.style.opacity = '1';
            } else {
             
                popup.style.opacity = '0.2';
            }
        });
    });
});

function resetOpacity() {
    // Get all elements with the class 'popup'
    const popups = document.querySelectorAll('.popup');

    // Loop through each popup element and set opacity to 1
    popups.forEach(popup => {
        popup.style.opacity = '1';
    });
}

function recruitSidekick() {
    if (sidekickDeck.length > 0 && totalRecruitPoints >= 2) {
        const sidekick = sidekickDeck.pop();
        playerDiscardPile.push(sidekick);
        totalRecruitPoints -= 2;
        onscreenConsole.log(`Sidekick recruited! <span class="console-highlights">${sidekick.name}</span> has been added to your discard pile.`);
        updateGameBoard();
	sidekickRecruited = true;
        healingPossible = false;
    }
}

function showSidekickRecruitButton() {
    const sidekickRecruitButtonContainer = document.getElementById('sidekick-recruit-button-container');
    const sidekickRecruitButton = document.getElementById('sidekick-recruit-button');

    // Check if a sidekick has already been recruited this turn
    if (sidekickRecruited) {
        onscreenConsole.log('A maximum of one sidekick can be recruited each turn.');
        return; // Exit the function early
    }

    // Check if the player has enough recruit points
    if (totalRecruitPoints >= 2) {
        // Show the button and its container
        sidekickRecruitButtonContainer.style.display = 'block';
        sidekickRecruitButton.style.display = 'block';

        // Function to handle clicks outside the button
        const handleClickOutside = (event) => {
            // Check if the click was outside the button and its container
            if (!sidekickRecruitButton.contains(event.target) && !sidekickRecruitButtonContainer.contains(event.target)) {
                // Hide the button and its container
                sidekickRecruitButtonContainer.style.display = 'none';
                sidekickRecruitButton.style.display = 'none';

                // Remove the event listener after hiding the button
                document.removeEventListener('click', handleClickOutside);
            }
        };

        // Add the event listener to detect clicks outside the button
        // Use a slight delay to avoid immediately hiding the button
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        // Add a click event listener to the recruit button
        sidekickRecruitButton.onclick = () => {
            recruitSidekick();
            sidekickRecruitButtonContainer.style.display = 'none';
            sidekickRecruitButton.style.display = 'none';
            healingPossible = false;

            // Set sidekickRecruited to true after recruiting a sidekick
            sidekickRecruited = true;

            // Remove the event listener after the button is clicked
            document.removeEventListener('click', handleClickOutside);
        };
    } else {
        onscreenConsole.log(`You need 2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit a sidekick.`);
    }
}

document.getElementById('sidekick-deck-card-back').addEventListener('click', showSidekickRecruitButton);

function recruitOfficer() {
    if (shieldDeck.length > 0 && totalRecruitPoints >= 3) {
        const officer = shieldDeck.pop();
        playerDiscardPile.push(officer);
        totalRecruitPoints -= 3;
onscreenConsole.log(`Hero recruited! <span class="console-highlights">S.H.I.E.L.D. Officer</span> has been added to your discard pile.`);
        updateGameBoard();
    }
}

function showSHIELDRecruitButton() {
    const SHIELDRecruitButtonContainer = document.getElementById('shield-recruit-button-container');
    const SHIELDRecruitButton = document.getElementById('shield-deck-recruit-button');

   // Check if the player has enough recruit points
    if (totalRecruitPoints >= 3) {
        // Show the button and its container
        SHIELDRecruitButtonContainer.style.display = 'block';
        SHIELDRecruitButton.style.display = 'block';

        // Function to handle clicks outside the button
        const handleClickOutside = (event) => {
            // Check if the click was outside the button and its container
            if (!SHIELDRecruitButton.contains(event.target) && !SHIELDRecruitButtonContainer.contains(event.target)) {
                // Hide the button and its container
                SHIELDRecruitButtonContainer.style.display = 'none';
                SHIELDRecruitButton.style.display = 'none';

                // Remove the event listener after hiding the button
                document.removeEventListener('click', handleClickOutside);
            }
        };

        // Add the event listener to detect clicks outside the button
        // Use a slight delay to avoid immediately hiding the button
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        // Add a click event listener to the recruit button
        SHIELDRecruitButton.onclick = () => {
            recruitOfficer();
            SHIELDRecruitButtonContainer.style.display = 'none';
            SHIELDRecruitButton.style.display = 'none';
            healingPossible = false;

            // Remove the event listener after the button is clicked
            document.removeEventListener('click', handleClickOutside);
        };
    } else {
        onscreenConsole.log(`You need 3<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit a <span class="console-highlight">SHIELD Officer</span>.`);
    }
}

document.getElementById('shield-deck-card-back').addEventListener('click', showSHIELDRecruitButton);

function showHeroRecruitButton(hqIndex, hero) {
    const recruitButtonContainer = document.querySelector(`#hq${hqIndex}-recruit-button-container`);
    const recruitButton = document.querySelector(`#hq${hqIndex}-deck-recruit-button`);

    if (!recruitButtonContainer || !recruitButton) {
        console.error(`Recruit button container or button not found for HQ index ${hqIndex}`);
        return;
    }

    // Check if the player has enough recruit points
    if (totalRecruitPoints >= hero.cost) {
        // Show the button and its container
        recruitButtonContainer.style.display = 'block';
        recruitButton.style.display = 'block';

        // Function to handle clicks outside the button
        const handleClickOutside = (event) => {
            // Check if the click was outside the button and its container
            if (!recruitButton.contains(event.target) && !recruitButtonContainer.contains(event.target)) {
                // Hide the button and its container
                recruitButtonContainer.style.display = 'none';
                recruitButton.style.display = 'none';

                // Remove the event listener after hiding the button
                document.removeEventListener('click', handleClickOutside);
            }
        };

        // Add the event listener to detect clicks outside the button
        // Use a slight delay to avoid immediately hiding the button
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        // Add a click event listener to the recruit button
        recruitButton.onclick = () => {
            isRecruiting = true; // Set the flag to true when recruiting starts
            recruitHeroConfirmed(hero, hqIndex - 1); // hqIndex is 1-based, convert to 0-based
            recruitButtonContainer.style.display = 'none';
            recruitButton.style.display = 'none';
            healingPossible = false;

            // Remove the event listener after the button is clicked
            document.removeEventListener('click', handleClickOutside);

            // Re-enable the onclick event handler after a short delay
            setTimeout(() => {
                isRecruiting = false;
            }, 500); // Adjust the delay as needed
        };
    } else {
        onscreenConsole.log(`You need ${hero.cost}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit <span class="console-highlights">${hero.name}</span>.`);
    }
}

function recruitHeroConfirmed(hero, hqIndex) {
    playerDiscardPile.push(hero);
    totalRecruitPoints -= hero.cost;
    onscreenConsole.log(`Hero recruited! <span class="console-highlights">${hero.name}</span> has been added to your discard pile.`);
    hq[hqIndex] = heroDeck.length > 0 ? heroDeck.pop() : null;
    healingPossible = false;

    if (!hq[hqIndex]) {
        showHeroDeckEmptyPopup();
    }
    updateGameBoard();
}

document.getElementById('superToggleAuto').onclick = function() {
    document.getElementById('autoButton').classList.add('active');
    document.getElementById('manualButton').classList.remove('active');
autoSuperpowers = true;

};

document.getElementById('superToggleManual').onclick = function() {
    document.getElementById('manualButton').classList.add('active');
    document.getElementById('autoButton').classList.remove('active');
autoSuperpowers = false;
};

document.getElementById('expand-arrows').addEventListener('click', function() {
    const sidePanel = document.getElementById('side-panel');
    const expandArrowsButton = document.getElementById('expand-arrows');

    // Toggle the visibility of the side panel
    if (sidePanel.classList.contains('hidden')) {
        sidePanel.classList.remove('hidden');
        expandArrowsButton.innerHTML = '<b>&#62;<br>&#62;<br>&#62;</b>'; // Arrows for "Minimise"
    } else {
        sidePanel.classList.add('hidden');
        expandArrowsButton.innerHTML = '<b>&#60;<br>&#60;<br>&#60;</b>'; // Arrows for "Maximise"
    }
});

