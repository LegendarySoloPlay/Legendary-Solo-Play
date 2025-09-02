//02.09.2025 15.13

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
    
    newMessage.innerHTML = formattedMessage;
    consoleLogDiv.prepend(newMessage);

    // Use setTimeout to ensure rendering is complete before scrolling
    setTimeout(() => {
      consoleLogDiv.scrollTop = 0;
    }, 10);
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


window.addEventListener('load', loadAllSounds);

const bgMusic = document.getElementById('bgMusic');

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
let capturedCardsDeck = [];
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
let schemeTwistCount = 0;
let turnCount = 1;
let killbotSchemeTwistCount = 0;
let suppressRecruitButtonAutoShow = false;
let autoSuperpowers = true;
let currentTwistChainLength = 0; // Tracks active Scheme Twists in the current chain
let schemeTwistChainDepth = 0;  // Tracks nested Scheme Twists
let pendingHeroKO = false; document.getElementById('autoButton').classList.add('active');
let heroDeckHasRunOut = false;
let delayEndGame = false;
let delayedWin = false;
let doomDelayEndGameFinalBlow = false;
let mastermindDefeatTurn = null;
let impossibleToDraw = false;
let counterA = 0;
let counterB = 0;
let counterResolve;
let counterReject;
let lastTurnMessageShown = false;
let jeanGreyBystanderRecruit = 0;
let jeanGreyBystanderDraw = 0;
let jeanGreyBystanderAttack = 0;
let hasDiscardAvoidance = false;
let hasWoundAvoidance = false;
let silentMeditationRecruit = false;
let backflipRecruit = false;
let sewerRooftopDefeats = false;
let sewerRooftopBonusRecruit = 0;
let twoRecruitFromKO = 0;
let trueVersatility = false;
let hasProfessorXMindControl = false;
let demonGoblinDeck = [];
let demonGoblinDeckInitialized = false;
let hqExplosion1 = 0;
let hqExplosion2 = 0;
let hqExplosion3 = 0;
let hqExplosion4 = 0;
let hqExplosion5 = 0;
let stackedTwistNextToMastermind = 0;
let popupMinimized = false;
let deadpoolRare = false;
let gameIsOver = false;
let audioContextInitialized = false;
let sfxEnabled = false;
let isLocalFile = window.location.protocol === 'file:';

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

const bystandersFromStartup = [
   {
        name: "Dark City",
        cards: [
            { name: "News Reporter", image: "Visual Assets/Other/Bystanders/newsReporter.webp" },
{ name: "Radiation Scientist", image: "Visual Assets/Other/Bystanders/radiationScientist.webp" },
{ name: "Paramedic", image: "Visual Assets/Other/Bystanders/paramedic.webp" }
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

// State variables - PLACE WITH OTHER GAME STATE VARIABLES
let bystanderDeck = [];
let selectedBystanderGroups = [];
let currentBystanderGroupIndex = 0;
let currentBystanderIndex = 0;

// Build the full bystander deck
function buildBystanderDeck() {
    let deck = [...bystanders];
    const selectedExpansions = getSelectedBystanderExpansions();
    
    selectedExpansions.forEach(expansion => {
        if (expansionBystanders[expansion]) {
            deck.push(...expansionBystanders[expansion]);
        }
    });
    
    console.log("Built bystander deck with", deck.length, "cards");
    return shuffle(deck);
}

// Get selected expansions from checkboxes
function getSelectedBystanderExpansions() {
    let selected = [];
    document.querySelectorAll('#bystander-selection input[name="bystander"]:checked').forEach(checkbox => {
        selected.push(checkbox.value);
    });
    return selected;
}

// Update displayed bystander image
function updateBystanderImage(selectedBystanderName) {
    const imgElement = document.querySelector('#chosen-bystander-image img');
    
    if (selectedBystanderName && expansionBystanders[selectedBystanderName]) {
        // Get unique cards by filtering duplicates
        const uniqueCards = [];
        const seenImages = new Set();
        
        for (const card of expansionBystanders[selectedBystanderName]) {
            if (!seenImages.has(card.image)) {
                seenImages.add(card.image);
                uniqueCards.push(card);
            }
        }
        
        const selectedGroup = {
            name: selectedBystanderName,
            cards: uniqueCards // Store only unique cards
        };
        
        const existingIndex = selectedBystanderGroups.findIndex(g => g.name === selectedBystanderName);
        
        if (existingIndex === -1) {
            selectedBystanderGroups.push(selectedGroup);
        } else {
            selectedBystanderGroups.push(...selectedBystanderGroups.splice(existingIndex, 1));
        }
        
        currentBystanderGroupIndex = selectedBystanderGroups.length - 1;
        currentBystanderIndex = 0;
        imgElement.src = selectedBystanderGroups[currentBystanderGroupIndex].cards[currentBystanderIndex].image;
        imgElement.alt = selectedBystanderGroups[currentBystanderGroupIndex].cards[currentBystanderIndex].name;
        imgElement.onclick = cycleBystanderImages;
    } else {
        resetBystanderImage();
    }
    
    updateBystanderFaceDownCards();
}

// Cycle through bystander images
function cycleBystanderImages() {
    if (selectedBystanderGroups.length > 0) {
        currentBystanderIndex++;
        
        if (currentBystanderIndex >= selectedBystanderGroups[currentBystanderGroupIndex].cards.length) {
            currentBystanderIndex = 0;
            currentBystanderGroupIndex = (currentBystanderGroupIndex + 1) % selectedBystanderGroups.length;
        }
        
        const imgElement = document.querySelector('#chosen-bystander-image img');
        imgElement.src = selectedBystanderGroups[currentBystanderGroupIndex].cards[currentBystanderIndex].image;
        imgElement.alt = selectedBystanderGroups[currentBystanderGroupIndex].cards[currentBystanderIndex].name;
    }
}

// Update face-down card display
function updateBystanderFaceDownCards() {
    const faceDownCards = [
        document.getElementById('bystanderfacedowncard1'),
        document.getElementById('bystanderfacedowncard2')
    ];
    const imgElement = document.querySelector('#chosen-bystander-image img');

    const shouldShow = selectedBystanderGroups.some(group => group.cards.length > 1);
    
    faceDownCards.forEach(card => {
        card.style.display = shouldShow ? 'block' : 'none';
    });
    imgElement.style.cursor = shouldShow ? 'alias' : 'default';
}

// Reset bystander image
function resetBystanderImage() {
    const imgElement = document.querySelector('#chosen-bystander-image img');
    imgElement.src = 'Visual Assets/Other/Bystander.webp';
    imgElement.alt = 'Default Bystander';
    imgElement.onclick = null;
}

// Remove bystander group
function removeBystanderGroup(groupName) {
    const index = selectedBystanderGroups.findIndex(g => g.name === groupName);
    if (index !== -1) {
        selectedBystanderGroups.splice(index, 1);
        if (selectedBystanderGroups.length > 0) {
            currentBystanderGroupIndex = currentBystanderGroupIndex % selectedBystanderGroups.length;
            displayCurrentBystanderImage();
        } else {
            resetBystanderImage();
        }
    }
    updateBystanderFaceDownCards();
}

document.querySelectorAll('#bystander-selection input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            updateBystanderImage(this.value);
        } else {
            removeBystanderGroup(this.value);
        }
    });
    
    // Initialize display for pre-checked boxes
    if (checkbox.checked) {
        updateBystanderImage(checkbox.value);
    }
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


function randomizeHero() {
    // Clear all current checkbox selections before randomizing
    const heroCheckboxes = document.querySelectorAll('#hero-selection input[type="checkbox"]');
    heroCheckboxes.forEach(checkbox => checkbox.checked = false);

 const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);
    
    
const jeanGreyCheckbox = document.querySelector('input[value="Jean Grey"]');
    
if (jeanGreyCheckbox) {
        // Always re-enable first, then disable only if the current scheme requires it
        jeanGreyCheckbox.disabled = false; // Reset disabled state
        jeanGreyCheckbox.disabled = selectedScheme.name === 'Transform Citizens Into Demons';
    }

    // Get the selected set and team filters
    const selectedSetFilters = Array.from(document.querySelectorAll('#herosetfilter input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-set'));
    const selectedTeamFilters = Array.from(document.querySelectorAll('#heroteamfilter input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-team'));

   // Filter the hero checkboxes by the selected filters
const filteredCheckboxes = Array.from(heroCheckboxes).filter(checkbox => {
    // Exclude disabled checkboxes from being selected
    if (checkbox.disabled) return false;
    
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

document.getElementById('randomize-all2').addEventListener('click', () => {
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

    // Clear the previously selected henchmen groups
    selectedHenchmenGroups = [];

    // If the scheme has a specific henchmen requirement, ensure it's included
    if (scheme.specificHenchmenRequirement) {
        const requiredHenchmen = filteredCheckboxes.find(checkbox => checkbox.value === scheme.specificHenchmenRequirement);
        if (requiredHenchmen) {
            // Select the required henchmen
            requiredHenchmen.checked = true;
            const requiredHenchmenGroup = henchmen.find(henchmenGroup => henchmenGroup.name === requiredHenchmen.value);
            selectedHenchmenGroups.push(requiredHenchmenGroup);

            // Remove the required henchmen from the pool of available henchmen
            const remainingCheckboxes = filteredCheckboxes.filter(checkbox => checkbox !== requiredHenchmen);

            // Randomly select the remaining henchmen (if any are needed)
            const remainingSlots = scheme.requiredHenchmen - 1; // Subtract 1 for the required henchmen
            if (remainingSlots > 0 && remainingCheckboxes.length > 0) {
                const shuffledCheckboxes = remainingCheckboxes.sort(() => 0.5 - Math.random()); // Shuffle the array
                const selectedCheckboxes = shuffledCheckboxes.slice(0, remainingSlots); // Pick the required number

                // Add the selected henchmen groups
                selectedCheckboxes.forEach(checkbox => {
                    checkbox.checked = true;
                    const henchmenGroup = henchmen.find(henchmenGroup => henchmenGroup.name === checkbox.value);
                    selectedHenchmenGroups.push(henchmenGroup);
                });
            }
        } else {
            console.error(`Required henchmen "${scheme.specificHenchmenRequirement}" not found in the filtered list.`);
        }
    } else {
        // If no specific henchmen is required, randomly select the required number of henchmen
        const shuffledCheckboxes = filteredCheckboxes.sort(() => 0.5 - Math.random()); // Shuffle the array
        const selectedCheckboxes = shuffledCheckboxes.slice(0, scheme.requiredHenchmen); // Pick the required number

        // Add the selected henchmen groups
        selectedCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            const henchmenGroup = henchmen.find(henchmenGroup => henchmenGroup.name === checkbox.value);
            selectedHenchmenGroups.push(henchmenGroup);
        });
    }

    // Set the image to the first henchman in the list
    currentHenchmenGroupIndex = 0;
    displayCurrentHenchmenImage();

    // Scroll to the first selected henchman checkbox
    const henchmenContainer = document.querySelector('#henchmen-section .scrollable-list');
    if (henchmenContainer && selectedHenchmenGroups.length > 0) {
        // Convert henchmenCheckboxes to an array to use .find()
        const henchmenCheckboxesArray = Array.from(henchmenCheckboxes);
        const firstHenchmenCheckbox = henchmenCheckboxesArray.find(checkbox => checkbox.value === selectedHenchmenGroups[0].name);
        if (firstHenchmenCheckbox) {
            const henchmenPosition = firstHenchmenCheckbox.offsetTop - henchmenContainer.offsetTop;
            henchmenContainer.scrollTop = henchmenPosition - henchmenContainer.clientHeight / 2;
        }
    }

    // Update face-down cards for the selected henchmen
    updateHenchmenFaceDownCards();
}

function randomizeHeroWithRequirements(scheme) {
    // Clear all current checkbox selections before randomizing
    const heroCheckboxes = document.querySelectorAll('#hero-selection input[type="checkbox"]');
    heroCheckboxes.forEach(checkbox => checkbox.checked = false);

 const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);
    
    
const jeanGreyCheckbox = document.querySelector('input[value="Jean Grey"]');
    
if (jeanGreyCheckbox) {
        // Always re-enable first, then disable only if the current scheme requires it
        jeanGreyCheckbox.disabled = false; // Reset disabled state
        jeanGreyCheckbox.disabled = selectedScheme.name === 'Transform Citizens Into Demons';
    }

    // Get the selected set and team filters
    const selectedSetFilters = Array.from(document.querySelectorAll('#herosetfilter input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-set'));
    const selectedTeamFilters = Array.from(document.querySelectorAll('#heroteamfilter input[type="checkbox"]:checked'))
        .map(cb => cb.getAttribute('data-team'));

    // Filter the hero checkboxes by the selected filters
    const filteredCheckboxes = Array.from(heroCheckboxes).filter(checkbox => {
if (checkbox.disabled) return false;
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
    let specificHenchmenRequirementMet = true;

    // Check specific villain requirement
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

    // Check specific henchmen requirement
    if (scheme.specificHenchmenRequirement) {
        specificHenchmenRequirementMet = henchmen.some(henchman => {
            const normalizedHenchmanName = henchman.trim().toLowerCase();
            const normalizedRequirement = scheme.specificHenchmenRequirement.trim().toLowerCase();
            return normalizedHenchmanName === normalizedRequirement;
        });

        if (!specificHenchmenRequirementMet) {
            henchmenFeedback += ` <br><span class="error-spans">You must include the ${scheme.specificHenchmenRequirement} henchmen group.</span>`;
        }
    }

    // Villain count validation
    if (villains.length < scheme.requiredVillains) {
        villainFeedback += `<br><span class="error-spans">Please select ${scheme.requiredVillains - villains.length > 1 ? 'more villain groups' : 'another villain group'}.</span>`;
    } else if (villains.length > scheme.requiredVillains) {
        villainFeedback += `<br><span class="error-spans">Please select ${villains.length - scheme.requiredVillains > 1 ? 'fewer villain groups' : 'one less villain group'}.</span>`;
    }

    // Hero count validation
    if (heroes.length < scheme.requiredHeroes) {
        heroFeedback += `<br><span class="error-spans">Please select ${scheme.requiredHeroes - heroes.length > 1 ? 'more heroes' : 'another hero'}.</span>`;
    } else if (heroes.length > scheme.requiredHeroes) {
        heroFeedback += `<br><span class="error-spans">Please select ${heroes.length - scheme.requiredHeroes > 1 ? 'fewer heroes' : 'one less hero'}.</span>`;
    }

    // Henchmen count validation
    if (henchmen.length < scheme.requiredHenchmen) {
        if (henchmen.length === 0) {
            henchmenFeedback = '<br><span class="error-spans">Please select a Henchmen group.</span>';
        } else {
            henchmenFeedback = `<br><span class="error-spans">Please select ${scheme.requiredHenchmen - henchmen.length} more Henchmen ${scheme.requiredHenchmen - henchmen.length > 1 ? 'groups' : 'group'}.</span>`;
        }
    } else if (henchmen.length > scheme.requiredHenchmen) {
        henchmenFeedback = `<br><span class="error-spans">Please select ${henchmen.length - scheme.requiredHenchmen} fewer Henchmen ${henchmen.length - scheme.requiredHenchmen > 1 ? 'groups' : 'group'}.</span>`;
    }

    const formattedVillains = `<span class="bold-spans">${formatList(villains)}.</span>`;
    const formattedHenchmen = `<span class="bold-spans">${formatList(henchmen)}.</span>`;
    const formattedHeroes = `<span class="bold-spans">${formatList(heroes)}.</span>`;

    document.getElementById('required-villains-count').innerHTML = `<span class="bold-spans">${scheme.requiredVillains} Villain ${villainGroupText}</span>`;
    document.getElementById('villains-list').innerHTML = formattedVillains + villainFeedback;

    const henchmenGroupText = scheme.requiredHenchmen === 1 ? 'group' : 'groups';
    document.getElementById('required-henchmen-count').innerHTML = `<span class="bold-spans">${scheme.requiredHenchmen} Henchmen ${henchmenGroupText}</span>`;
    document.getElementById('henchmen-list').innerHTML = henchmen.length > 0 ? formattedHenchmen + henchmenFeedback : henchmenFeedback;

    document.getElementById('required-heroes-count').innerHTML = `<span class="bold-spans">${scheme.requiredHeroes} ${heroGroupText}</span>`;
    document.getElementById('heroes-list').innerHTML = formattedHeroes + heroFeedback;

    const villainsCorrect = villains.length === scheme.requiredVillains && specificVillainRequirementMet;
    const henchmenCorrect = henchmen.length === scheme.requiredHenchmen && specificHenchmenRequirementMet;
    const heroesCorrect = heroes.length === scheme.requiredHeroes;

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

document.getElementById('confirm-startup-close-x').addEventListener('click', function() {
    document.getElementById('confirm-start-up-choices').style.display = 'none';
document.getElementById('modal-overlay').style.display = 'none';
});

document.getElementById('begin-game').addEventListener('pointerdown', onBeginGame);

async function onBeginGame() {
if (!audioContextInitialized) {
        initAudio();
        audioContextInitialized = true;
    }
    
    loadAudioSettings();
    const targetVolume = bgMusic.volume;
    
    bgMusic.currentTime = 0;
    
    if (targetVolume === 0) {
        bgMusic.volume = 0;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        hasFadedIn = true;
    } else if (!hasFadedIn) {
        bgMusic.volume = 0;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        
        const fadeIn = setInterval(() => {
            if (bgMusic.volume < targetVolume) {
                bgMusic.volume += 0.05;
            } else {
                clearInterval(fadeIn);
                hasFadedIn = true;
            }
        }, 100);
    } else {
        bgMusic.volume = targetVolume;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Enable SFX after user interaction AND load sounds
    sfxEnabled = true;
    loadAllSounds();  

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

    }
}

function initAudio() {
    // Create background music element if it doesn't exist
    if (!bgMusic) {
        bgMusic = new Audio();
        bgMusic.loop = true;
        bgMusic.src = 'Audio Assets/background-music.ogg'; // Update with your actual file
    }
}

document.getElementById('start-expansion').addEventListener('click', () => {
    const expansionPopup = document.getElementById('expansion-popup-container');
const expansionBackground = document.getElementById('background-for-expansion-popup');

    expansionPopup.classList.add('hidden');
    expansionBackground.classList.add('hidden');
document.getElementById('intro-popup-container').style.display = 'flex';
    
    // Optional: Remove the element from DOM after fade completes
    setTimeout(() => {
        expansionPopup.style.display = 'none';
	expansionBackground.style.display = 'none';
    }, 1500); // Match this timeout with your transition duration
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

document.getElementById('start-game2').addEventListener('click', () => {
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
    
    // Original hero deck generation
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

const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
const selectedSchemeForHeroDeck = schemes.find(scheme => scheme.name === selectedSchemeName);

// Add bystanders for specific scheme
if (selectedSchemeForHeroDeck.name === "Save Humanity") {
    const bystandersToAdd = Math.min(12, bystanderDeck.length); // Don't exceed available bystanders
    for (let i = 0; i < bystandersToAdd; i++) {
        const bystander = bystanderDeck.shift(); // Remove from bystander deck
        if (bystander) {
            bystander.cost = 2;
            bystander.saveHumanityBystander = true;
           
            deck.push(bystander);
        }
    }
}

return shuffle(deck);
}

function generateVillainDeck(selectedVillains, selectedHenchmen, scheme, heroDeck) {

    let deck = [];

const mastermind = getSelectedMastermind();

    // Add villain cards
selectedVillains.forEach(villainName => {
    const villain = window.villains.find(v => v.name === villainName);
    if (villain) {
        villain.cards.forEach(card => {
let modifiedCard = { ...card };
                
                if (mastermind.name === 'Apocalypse' && card.alwaysLeads === 'true') {
                    modifiedCard = {
                        ...card,
                        attack: card.attack + 2,
                        overlayTextAttack: `${card.attack + 2}`
                    };
                }
                
                // Add the card to the deck the specified number of times
                for (let i = 0; i < (modifiedCard.quantity || 2); i++) {
                    deck.push({ ...modifiedCard, type: 'Villain' });
                }
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
            if (scheme.name === 'Organized Crime Wave') {
                for (let i = 0; i < 8; i++) {
                deck.push({ ...henchman, subtype: 'Henchman', ambushEffect: 'organizedCrimeAmbush' });
            }
            } else {
            for (let i = 0; i < 2; i++) {
                deck.push({ ...henchman, subtype: 'Henchman' });
            }
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

if (scheme.name === 'Secret Invasion of the Skrull Shapeshifters' && heroDeck) {
    const skrulledHeroes = heroDeck.splice(0, 12).map(hero => {
        // Create a complete copy of all hero attributes
        const skrull = {
            // Copy all original properties
            id: hero.id,
            name: hero.name,
            type: 'Villain', // Changed to Villain
            rarity: hero.rarity,
            team: hero.team,
            class1: hero.class1,
            class2: hero.class2,
            color: hero.color,
            cost: hero.cost,
            attack: hero.cost + 2, // Modified attack
            recruit: hero.recruit,
            attackIcon: hero.attackIcon,
            recruitIcon: hero.recruitIcon,
            bonusAttack: hero.bonusAttack,
            bonusRecruit: hero.bonusRecruit,
            multiplier: hero.multiplier,
            multiplierAttribute: hero.multiplierAttribute,
            multiplierLocation: hero.multiplierLocation,
            unconditionalAbility: hero.unconditionalAbility,
            conditionalAbility: hero.conditionalAbility,
            conditionType: hero.conditionType,
            condition: hero.condition,
            invulnerability: hero.invulnerability,
            image: hero.image,
            
            // Add Skrull-specific properties
            skrulled: true,
            originalAttack: hero.attack,
            originalType: hero.type,
            fightEffect: 'unskrull',
            overlayText: `<span style="filter:drop-shadow(0vh 0vh 0.3vh black);">SKRULL</span>`,
            overlayTextAttack: `${hero.cost + 2}`
        };
        
        return skrull;
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
        if (bystanderDeck.length > 0) {
            const randomIndex = Math.floor(Math.random() * bystanderDeck.length);
            const originalBystander = bystanderDeck[randomIndex];
            
            // Create killbot with original bystander's image
            const killbot = {
                type: "Villain",
                name: `${originalBystander.name} - Killbot`,
                team: "None",
                originalAttack: 0,
                attack: 0,
                cost: 0,
                victoryPoints: 1,
                killbot: true,
                overlayTextAttack: `${killbotAttack}`,
                // Use original bystander's image but with killbot overlay/effect
                image: originalBystander.image,
                // Store original bystander data
                originalBystanderData: {
                    ...originalBystander,
                    // Preserve the image for when we revert
                    image: originalBystander.image
                },
                // Convert bystander ability to fight effect
                fightEffect: originalBystander.bystanderUnconditionalAbility || "None"
            };
            
            bystanderDeck.splice(randomIndex, 1);
            deck.push(killbot);
        }
    }
}

if (scheme.name === "Transform Citizens Into Demons") {
    const jeanGreyHero = heroes.find(h => h.name === 'Jean Grey');
    
if (jeanGreyHero) {
        jeanGreyHero.cards.forEach(card => {
            let count;
            let transformedImage; // Variable for the new image path
		let transformedName;
            
            switch(card.rarity) {
                case 'Common':
		count = 5;
		transformedImage = 'Visual Assets/Other/Transform Citizens Into Demons/goblinQueen5.webp';
		transformedName = 'Goblin Queen (Jean Grey - Read Your Thoughts)';
		break;
                case 'Common 2':
                    count = 5;
                    transformedImage = 'Visual Assets/Other/Transform Citizens Into Demons/goblinQueen3.webp';
		transformedName = 'Goblin Queen (Jean Grey - Psychic Search)';
                    break;
                case 'Uncommon':
                    count = 3;
                    transformedImage = 'Visual Assets/Other/Transform Citizens Into Demons/goblinQueen6.webp';
		transformedName = 'Goblin Queen (Jean Grey - Mind Over Matter)';
                    break;
                case 'Rare':
                    count = 1;
                    transformedImage = 'Visual Assets/Other/Transform Citizens Into Demons/goblinQueen7.webp';
		transformedName = 'Goblin Queen (Jean Grey - Telekinetic Mastery)';
                    break;
                default:
                    count = 0;
                    transformedImage = card.image; // Fallback to original image
            }
            
            for (let i = 0; i < count; i++) {
                // Create a modified copy with additional attributes
                const modifiedCard = { 
                    ...card,
			name: transformedName,
                    type: 'Villain',
                    goblinQueen: true,
                    victoryPoints: 4,
		image: transformedImage,
                };
                deck.push(modifiedCard);
            }
        });
    } 
} 

if (scheme.name === "X-Cutioner's Song") {
    console.log("Processing X-Cutioner's Song scheme");
    
    // Debug: Log all heroes first
    console.log("All heroes:", heroes.map(h => h.name));
    
    // Get selected hero names - with better error handling
    const heroCheckboxes = document.querySelectorAll('#hero-selection input[type=checkbox]:checked');
    console.log("Found checkboxes:", heroCheckboxes.length);
    
    const selectedHeroNames = Array.from(heroCheckboxes).map(cb => {
        console.log("Checkbox value:", cb.value);
        return cb.value;
    });
    console.log("Selected heroes:", selectedHeroNames);
    
    // Filter available heroes - add strict equality check
    const availableHeroes = heroes.filter(hero => {
        const isAvailable = !selectedHeroNames.some(name => name === hero.name);
        console.log(`Hero ${hero.name} available?`, isAvailable);
        return isAvailable;
    });
    console.log("Available heroes:", availableHeroes.map(h => h.name));

    if (availableHeroes.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableHeroes.length);
        const randomHero = availableHeroes[randomIndex];
        console.log("Selected random hero:", randomHero.name);
        
        randomHero.cards.forEach(card => {
            let copiesToAdd;
            switch(card.rarity) {
                case 'Common':
                case 'Common 2':
                    copiesToAdd = 5;
                    break;
                case 'Uncommon':
                    copiesToAdd = 3;
                    break;
                case 'Rare':
                    copiesToAdd = 1;
                    break;
                default:
                    copiesToAdd = 0;
            }

            console.log(`Adding ${copiesToAdd} copies of ${card.name} (${card.rarity})`);
            
            for (let i = 0; i < copiesToAdd; i++) {
                deck.push({
                    ...card,
                    type: 'Hero',
                    capturedHero: true,
                    capturedHeroAbility: "gainedByPlayer",
                    originalHero: randomHero.name
                });
            }
        });

    } else {
        console.warn("No available heroes to add to Villain Deck");
        // Fallback - add a default hero if none available?
        // Example: const defaultHero = heroes.find(h => h.name === 'Wolverine');
    }
}

    for (let i = 0; i < 5; i++) {
        deck.push({ name: 'Master Strike', type: 'Master Strike', image: "Visual Assets/Other/MasterStrike.webp" });
    }

for (let i = 0; i < scheme.twistCount; i++) {
    const twistCard = { 
        name: 'Scheme Twist', 
        type: 'Scheme Twist', 
        image: "Visual Assets/Other/SchemeTwist.webp",
        // Add plutonium attribute conditionally
        ...(scheme.name === "Steal the Weaponized Plutonium" && { plutonium: true })
    };
    deck.push(twistCard);
}

    // Shuffle the deck
    deck = shuffle(deck);

    deck = [...deck, ...henchmenToPlaceOnTop];

    // Log the deck to debug
    console.log('Henchmen to place on top:', henchmenToPlaceOnTop);
    console.log('Generated Villain Deck:', deck);

    return deck;
}

function initializeDemonGoblinDeck() {
    if (demonGoblinDeckInitialized) return;
    
    const demonDeck = document.getElementById('demon-goblin-deck');
    if (demonDeck) {
        demonDeck.addEventListener('click', (e) => {
            e.stopPropagation();
            showDemonGoblinAttackButton();
        });
        demonGoblinDeckInitialized = true;
    }
}


async function initGame(heroes, villains, henchmen, mastermindName, scheme) {
    console.log('Initializing game with:');
    console.log('Heroes:', heroes);
    console.log('Villains:', villains);
    console.log('Henchmen:', henchmen);
    console.log('Mastermind:', mastermindName);
    console.log('Scheme:', scheme);
    console.log('Final Blow Enabled:', finalBlowEnabled);

     bystanderDeck = buildBystanderDeck();

let selectedExpansions = getSelectedExpansions();

if (scheme.name === 'Capture Baby Hope') {
    document.getElementById('scheme-token').style.display = 'flex';
}

initializeDemonGoblinDeck();

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

updateGameBoard();

const highCostHeroCount = hq.filter(hero => hero.cost >= 7).length;

if (highCostHeroCount >= 2) {
await mulliganChoice();
}

    // Draw the initial player hand
    playerHand = [];
    for (let i = 0; i < 6; i++) {
        drawCard();
    }

    sortPlayerCards();

        // Update the game board and draw the first villain card
    updateGameBoard();
    drawVillainCard();

    // Hide the confirm selection popup (if this is where you want to close it)
    document.getElementById('confirm-start-up-choices').style.display = 'none';
}

// Mulligan choice function
async function mulliganChoice() {
    // Show the popup and overlay
    document.getElementById('mulligan-popup').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
    
    // Create a promise to handle the user's choice
    return new Promise((resolve) => {
        // Yes button handler
        document.getElementById('mulligan-confirm').onclick = async () => {
            // Hide the popup and overlay
            document.getElementById('mulligan-popup').style.display = 'none';
            document.getElementById('modal-overlay').style.display = 'none';
            
            // Process the mulligan
            await processMulligan();
            
            // Resolve the promise
            resolve(true);
        };
        
        // No button handler
        document.getElementById('mulligan-deny').onclick = () => {
            // Hide the popup and overlay
            document.getElementById('mulligan-popup').style.display = 'none';
            document.getElementById('modal-overlay').style.display = 'none';
            
            // Resolve the promise without doing anything
            resolve(false);
        };
    });
}

// Process the mulligan when user selects "Yes"
async function processMulligan() {
    // Get high-cost heroes (cost >= 7)
    const highCostHeroes = hq.filter(hero => hero.cost >= 7);
    
    // Remove high-cost heroes from HQ
    hq = hq.filter(hero => hero.cost < 7);
    
    // Shuffle the high-cost heroes back into the hero deck
    highCostHeroes.forEach(hero => {
        heroDeck.push(hero);
    });
    
    // Shuffle the hero deck
    shuffleDeck(heroDeck);
    
    // Draw new cards until HQ has 5 cards again
    while (hq.length < 5 && heroDeck.length > 0) {
        const newCard = heroDeck.pop();
        
        // Only add cards with cost less than 7
        if (newCard.cost < 7) {
            hq.push(newCard);
        } else {
            // If card is high cost, put it back in a random position
            const randomPosition = Math.floor(Math.random() * heroDeck.length);
            heroDeck.splice(randomPosition, 0, newCard);
        }
    }

}

// Helper function to shuffle a deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

let isFirstTurn = true;

async function drawVillainCard() {
    const drawCount = isFirstTurn ? 3 : 1;
    isFirstTurn = false;

    for (let i = 0; i < drawCount; i++) {
        await processVillainCard();
    }
}

async function processRegularVillainCard(villainCard) {
    let sewersIndex = city.length - 1;
    let previousCard = city[sewersIndex];
    city[sewersIndex] = villainCard;
    onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> enters the city.`);

    // Move existing villains to the left
    for (let j = sewersIndex - 1; j >= 0; j--) {
        if (city[j] === null) {
            city[j] = previousCard;
            previousCard = null;
            break;
        } else if (previousCard !== null) {
            let temp = city[j];
            city[j] = previousCard;
            previousCard = temp;

            if (j === 0 && previousCard) {
                await new Promise(resolve => {
                    showPopup('Villain Escape', previousCard, resolve);
                });
                await handleVillainEscape(previousCard);
	addHRToTopWithInnerHTML();
            }
        }
    }

    // Show arrival popup if no ambush
    if (!villainCard.ambushEffect || villainCard.ambushEffect === "None") {
        await new Promise(resolve => {
            showPopup('Villain Arrival', villainCard, resolve);
        });
	addHRToTopWithInnerHTML();
    }

    // Handle Ambush effects
    if (villainCard.ambushEffect && villainCard.ambushEffect !== "None") {
        await new Promise(resolve => {
            showPopup('Villain Ambush', villainCard, resolve);
        });
        const ambushEffectFunction = window[villainCard.ambushEffect];
        if (typeof ambushEffectFunction === 'function') {
            await ambushEffectFunction(villainCard);
        }
	addHRToTopWithInnerHTML();
    }
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
            attachBystanderToMastermindFromVillainDeck(bystanderCard);
        }
    }
    updateGameBoard();
}

async function attachBystanderToVillain(villainIndex, bystanderCard) {
        await new Promise((resolve) => {
        showPopup('Bystander to Villain', bystanderCard, () => {
            resolve();
        });
    });
    if (city[villainIndex].bystander) {
        city[villainIndex].bystander.push(bystanderCard);
    } else {
        city[villainIndex].bystander = [bystanderCard];
    }

    // Access the villain object using the index to get its name
    const villain = city[villainIndex]; 

updateGameBoard();

   // Log the villain's name correctly
    onscreenConsole.log(`<span class="console-highlights">${bystanderCard.name}</span> captured by <span class="console-highlights">${villain.name}</span>.`);
addHRToTopWithInnerHTML();

}

async function villainEffectAttachBystanderToVillain(villainIndex, bystanderCard) {
    if (city[villainIndex].bystander) {
        city[villainIndex].bystander.push(bystanderCard);
    } else {
        city[villainIndex].bystander = [bystanderCard];
    }

    // Access the villain object using the index to get its name
    const villain = city[villainIndex]; 

updateGameBoard();

   // Log the villain's name correctly
    onscreenConsole.log(`<span class="console-highlights">${bystanderCard.name}</span> captured by <span class="console-highlights">${villain.name}</span>.`);
addHRToTopWithInnerHTML();

}

function findClosestVillain() {
    for (let i = city.length - 1; i >= 0; i--) {
        if (city[i]) {
            return i;
        }
    }
    return -1;
}

async function attachBystanderToMastermindFromVillainDeck(bystanderCard) {
    await new Promise((resolve) => {
        showPopup('Bystander to Mastermind', bystanderCard, () => {
            resolve();
        });
    });
let mastermind = getSelectedMastermind();
    mastermind.bystanders.push(bystanderCard);
    updateMastermindOverlay();

    onscreenConsole.log(`<span class="console-highlights">${bystanderCard.name}</span> captured by <span class="console-highlights">${mastermind.name}</span>.`);
addHRToTopWithInnerHTML();

}

async function attachBystanderToMastermind(bystanderCard) {

let mastermind = getSelectedMastermind();
    mastermind.bystanders.push(bystanderCard);
    updateMastermindOverlay();

    onscreenConsole.log(`<span class="console-highlights">${bystanderCard.name}</span> captured by <span class="console-highlights">${mastermind.name}</span>.`);
addHRToTopWithInnerHTML();

}

function updateMastermindOverlay() {
    const mastermindCard = document.getElementById('mastermind');
    const overlay = mastermindCard.querySelector('.overlay');
    let mastermind = getSelectedMastermind();
    const bystanderCount = mastermind.bystanders ? mastermind.bystanders.length : 0;

    // Clear any existing bystander overlays
    const existingBystanderOverlay = mastermindCard.querySelector('.bystander-overlay');
    const existingBystanderExpanded = mastermindCard.querySelector('.expanded-bystanders');
    if (existingBystanderOverlay) existingBystanderOverlay.remove();
    if (existingBystanderExpanded) existingBystanderExpanded.remove();

    // Clear any existing XCutioner overlays
    const existingXCutionerOverlay = mastermindCard.querySelector('.XCutioner-overlay');
    const existingXCutionerExpanded = mastermindCard.querySelector('.expanded-XCutionerHeroes');
    if (existingXCutionerOverlay) existingXCutionerOverlay.remove();
    if (existingXCutionerExpanded) existingXCutionerExpanded.remove();

    // Update mastermindPermBuff for Mr. Sinister
    if (mastermind.name === 'Mr. Sinister') {
        mastermindPermBuff = bystanderCount;
    }

    // XCutioner Heroes section
    if (mastermind.XCutionerHeroes && mastermind.XCutionerHeroes.length > 0) {
        const XCutionerOverlay = document.createElement('div');
        XCutionerOverlay.className = 'XCutioner-overlay';
        
        let XCutionerOverlayText = `${mastermind.XCutionerHeroes.length} Hero${mastermind.XCutionerHeroes.length > 1 ? 'es' : ''}`;
        XCutionerOverlay.innerHTML = XCutionerOverlayText;
        XCutionerOverlay.style.whiteSpace = 'pre-line';

        const XCutionerExpandedContainer = document.createElement('div');
        XCutionerExpandedContainer.className = 'expanded-XCutionerHeroes';
        XCutionerExpandedContainer.style.display = 'none';
        
        mastermind.XCutionerHeroes.forEach(hero => {
            const XCutionerHeroElement = document.createElement('span');
            XCutionerHeroElement.className = 'XCutioner-hero-name';
            XCutionerHeroElement.textContent = hero.name;
            XCutionerHeroElement.dataset.image = hero.image;
            
            XCutionerHeroElement.addEventListener('mouseover', (e) => {
                e.stopPropagation();
                showZoomedImage(hero.image);
                const card = cardLookup[normalizeImagePath(hero.image)];
                if (card) updateRightPanel(card);
            });
            
            XCutionerHeroElement.addEventListener('mouseout', (e) => {
                e.stopPropagation();
                if (!activeImage) hideZoomedImage();
            });
            
            XCutionerHeroElement.addEventListener('click', (e) => {
                e.stopPropagation();
                activeImage = activeImage === hero.image ? null : hero.image;
                showZoomedImage(activeImage || '');
            });
            
            XCutionerExpandedContainer.appendChild(XCutionerHeroElement);
        });

        XCutionerOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            XCutionerExpandedContainer.style.display = XCutionerExpandedContainer.style.display === 'none' ? 'block' : 'none';
            
            if (XCutionerExpandedContainer.style.display === 'block') {
                setTimeout(() => {
                    document.addEventListener('click', (e) => {
                        if (!XCutionerExpandedContainer.contains(e.target)) {
                            XCutionerExpandedContainer.style.display = 'none';
                        }
                    }, { once: true });
                }, 50);
            }
        });

        mastermindCard.appendChild(XCutionerOverlay);
        mastermindCard.appendChild(XCutionerExpandedContainer);
    }

    // Bystanders section
    if (bystanderCount > 0) {
        const bystanderOverlay = document.createElement('div');
        bystanderOverlay.className = 'bystander-overlay';
        
        let bystanderOverlayText = `${bystanderCount} Bystander${bystanderCount > 1 ? 's' : ''}`;
        bystanderOverlay.innerHTML = bystanderOverlayText;
        bystanderOverlay.style.whiteSpace = 'pre-line';

        const bystanderExpandedContainer = document.createElement('div');
        bystanderExpandedContainer.className = 'expanded-bystanders';
        bystanderExpandedContainer.style.display = 'none';
        
        mastermind.bystanders.forEach(bystander => {
            const bystanderElement = document.createElement('span');
            bystanderElement.className = 'bystander-name';
            bystanderElement.textContent = bystander.name;
            bystanderElement.dataset.image = bystander.image;
            
            bystanderElement.addEventListener('mouseover', (e) => {
                e.stopPropagation();
                showZoomedImage(bystander.image);
                const card = cardLookup[normalizeImagePath(bystander.image)];
                if (card) updateRightPanel(card);
            });
            
            bystanderElement.addEventListener('mouseout', (e) => {
                e.stopPropagation();
                if (!activeImage) hideZoomedImage();
            });
            
            bystanderElement.addEventListener('click', (e) => {
                e.stopPropagation();
                activeImage = activeImage === bystander.image ? null : bystander.image;
                showZoomedImage(activeImage || '');
            });
            
            bystanderExpandedContainer.appendChild(bystanderElement);
        });

        bystanderOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            bystanderExpandedContainer.style.display = bystanderExpandedContainer.style.display === 'none' ? 'block' : 'none';
            
            if (bystanderExpandedContainer.style.display === 'block') {
                setTimeout(() => {
                    document.addEventListener('click', (e) => {
                        if (!bystanderExpandedContainer.contains(e.target)) {
                            bystanderExpandedContainer.style.display = 'none';
                        }
                    }, { once: true });
                }, 50);
            }
        });

        mastermindCard.appendChild(bystanderOverlay);
        mastermindCard.appendChild(bystanderExpandedContainer);
    } else {
        overlay.classList.remove('visible');
    }
}


function handleMasterStrike(masterStrikeCard) {
    updateGameBoard();
    
    return new Promise(async (resolve) => {
        // First handle Cable cards if any exist
        const cableCards = playerHand.filter(card => card.name === 'Cable - Disaster Survivalist');
        
        if (cableCards.length > 0) {
            await processCableCards(cableCards);
        }
        
        // Then always handle the Master Strike effect
        await handleMasterStrikeEffect(masterStrikeCard);
        
        resolve();

    });

}

async function processCableCards(cableCards) {
    for (const card of cableCards) {
        const choice = await askToDiscardCable(card);
        if (choice) {
            const cardIndex = playerHand.findIndex(c => c === card);
            if (cardIndex !== -1) {
                playerHand.splice(cardIndex, 1);
                nextTurnsDraw += 3;
                
                const { returned } = await checkDiscardForInvulnerability(card);
                        if (returned.length) {
                        playerHand.push(...returned);
                        }

                onscreenConsole.log(`Draw three extra cards at the end of this turn.`);
		addHRToTopWithInnerHTML();
            }
        }
        updateGameBoard();
    }
}

function askToDiscardCable(card) {
    return new Promise((resolve) => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            `A Master Strike is about to be played. Would you like to discard <span style="console-highlights">${card.name}</span> to draw 3 extra cards next turn?`,
            "Yes",
            "No"
        );

        const cardImage = document.getElementById('hero-ability-may-card');
        cardImage.src = card.image;
        cardImage.style.display = 'block';
        document.getElementById('heroAbilityHoverText').style.display = 'none';

        confirmButton.onclick = function() {
            cleanup();
            resolve(true);
        };

        denyButton.onclick = function() {
            cleanup();
            resolve(false);
        };

        function cleanup() {
            hideHeroAbilityMayPopup();
            cardImage.src = '';
            cardImage.style.display = 'none';
            document.getElementById('heroAbilityHoverText').style.display = 'block';
        }
    });
}

async function handleMasterStrikeEffect(masterStrikeCard) {
	playMasterStrikeSound();
    koPile.push(masterStrikeCard);
    const mastermind = getSelectedMastermind();
    const masterStrikeFunctionName = mastermind.masterStrike;

    onscreenConsole.log(`<span class="console-highlights">Master Strike!</span> ${mastermind.masterStrikeConsoleLog}`);

    await new Promise((resolve) => {
        showPopup('Master Strike', masterStrikeCard, async () => { // Make this callback async
            if (typeof window[masterStrikeFunctionName] === 'function') {
                try {
                    // Wait for the Master Strike function to complete
                    await window[masterStrikeFunctionName]();
                    // Now add HR after the function finishes
                    addHRToTopWithInnerHTML();
                } catch (error) {
                    console.error(`Error executing Master Strike function: ${error}`);
                    // Still add HR even if there's an error
                    addHRToTopWithInnerHTML();
                }
            } else {
                console.error(`No function named ${masterStrikeFunctionName} found.`);
                // Add HR even if function not found
                addHRToTopWithInnerHTML();
            }

            resolve();
        });
    });
}

function handleSchemeTwist(schemeTwistCard) {
playSchemeTwistSound();
    updateGameBoard();
    return new Promise(async (resolve) => {
        const selectedScheme = getSelectedScheme();
        koPile.push(schemeTwistCard);
        schemeTwistCount += 1;

        // Log appropriate message
        if (selectedScheme.variableTwist === false) {
            onscreenConsole.log(`<span class="console-highlights">Scheme Twist!</span> Twist ${schemeTwistCount}: ${selectedScheme.twistText}`);
        } else if (selectedScheme[`twistText${schemeTwistCount}`]) {
            onscreenConsole.log(`<span class="console-highlights">Scheme Twist!</span> Twist ${schemeTwistCount}: ${selectedScheme[`twistText${schemeTwistCount}`]}`);
        }

        await new Promise(popupResolve => {
            showPopup('Scheme Twist', schemeTwistCard, popupResolve);
        });
        
        updateGameBoard();
        schemeTwistChainDepth++;
        
        try {
            if (selectedScheme.twistEffect && selectedScheme.twistEffect !== "None") {
                const twistEffectFunction = window[selectedScheme.twistEffect];
                if (typeof twistEffectFunction === 'function') {
                    // IMPORTANT: Await the twist effect which might trigger more draws
                    await twistEffectFunction();
                }
            }
        } catch (error) {
            console.error('Error in twist effect:', error);
        }

addHRToTopWithInnerHTML();
        
        schemeTwistChainDepth--;
        
        if (schemeTwistChainDepth === 0) {
            pendingHeroKO = true;
        }
       
        resolve();
    });
}

async function handlePlutoniumSchemeTwist(villainCard) {
playSchemeTwistSound();
    updateGameBoard();
    const selectedScheme = getSelectedScheme();
    schemeTwistCount += 1;

    // Log twist message
    if (selectedScheme.variableTwist === false) {
        onscreenConsole.log(`<span class="console-highlight">Scheme Twist!</span> Twist ${schemeTwistCount}: ${selectedScheme.twistText}`);
    } else if (selectedScheme[`twistText${schemeTwistCount}`]) {
        onscreenConsole.log(`<span class="console-highlight">Scheme Twist!</span> Twist ${schemeTwistCount}: ${selectedScheme[`twistText${schemeTwistCount}`]}`);
    }

    await new Promise(resolve => showPopup('Scheme Twist', villainCard, resolve));
    updateGameBoard();

    schemeTwistChainDepth++;  // Mark that we're in a twist chain

    try {
        if (selectedScheme.twistEffect && selectedScheme.twistEffect !== "None") {
            const twistEffectFunction = window[selectedScheme.twistEffect];
            if (typeof twistEffectFunction === 'function') {
                await twistEffectFunction(villainCard);  // This will handle plutonium attachment/KO
            }
        }
        
        // **Force a new villain draw here** (before resolving the twist)
        await drawVillainCard();  // If this is another twist, it will recursively process
    } catch (error) {
        console.error('Error in twist effect:', error);
    }

addHRToTopWithInnerHTML();

    schemeTwistChainDepth--;

    // If this was the last twist in the chain, trigger pending KO
    if (schemeTwistChainDepth === 0) {
        pendingHeroKO = true;
    }
}



  function defaultWoundDraw() {
  if (woundDeck.length > 0) {
	playWoundSound();
    const gainedWound = woundDeck.pop();
    const mastermind = getSelectedMastermind();

if (deadpoolRare === true) {
playerHand.push(gainedWound);
	onscreenConsole.log("Wound gained and put in your hand.");
    deadpoolRare = false;
  } else if (mastermind.name === 'Mephisto') {
        playerDeck.push(gainedWound);
	gainedWound.revealed = true;
        onscreenConsole.log("Wound gained and put on top of your deck.");
    } else {
        playerDiscardPile.push(gainedWound);
        onscreenConsole.log("Wound gained.");
    }
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
                escapedVillainsDeck.push(bystander);
                onscreenConsole.log(`Bystander escaped with <span class="console-highlights">${escapedVillain.name}</span>.`);
            });
        }

        // If the villain has captured plutonium, move it as well
        if (escapedVillain.plutoniumCaptured && escapedVillain.plutoniumCaptured.length > 0) {
            escapedVillain.plutoniumCaptured.forEach(plutonium => {
                escapedVillainsDeck.push(plutonium);
                onscreenConsole.log(`Plutonium escaped with <span class="console-highlights">${escapedVillain.name}</span>.`);
            });
        }

        if (escapedVillain.XCutionerHeroes && escapedVillain.XCutionerHeroes.length > 0) {
            escapedVillain.XCutionerHeroes.forEach(hero => {
                escapedVillainsDeck.push(hero);
                onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> was carried off by <span class="console-highlights">${escapedVillain.name}</span>.`);
            });
        }

        // Handle Skrull transformation if needed
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
        
        // 1. First handle hero KO
        const handleKO = () => {
            if (eligibleHeroes.length === 0) {
                return Promise.resolve();
            }
            return new Promise(koResolve => {
                const cleanup = () => {
                    document.removeEventListener('heroKOComplete', cleanup);
                    koResolve();
                };
                document.addEventListener('heroKOComplete', cleanup);
                
                showHeroKOPopup().then(() => {
                    document.dispatchEvent(new Event('heroKOComplete'));
                });
            });
        };

        // 2. Then handle discard
        const handleDiscard = () => {
            if (escapedVillain.bystander?.length > 0) {
                return showDiscardCardPopup();
            }
            return Promise.resolve();
        };

        // 3. Then handle escape effect
        const handleEffect = () => {
            if (!escapedVillain.escapeEffect || escapedVillain.escapeEffect === "None") {
                return Promise.resolve();
            }
            const effectFn = window[escapedVillain.escapeEffect];
            return typeof effectFn === 'function' 
                ? effectFn(escapedVillain) 
                : Promise.resolve();
        };

        // Execute in sequence
        handleKO()
            .then(handleDiscard)
            .then(handleEffect)
            .then(resolve)
            .catch(reject);
    });
}

async function processVillainCard() {
    if (villainDeck.length === 0 && !impossibleToDraw) {
        showDrawPopup();
        return;
    }
    
    const villainCard = villainDeck.pop();
    if (!villainCard) return;
    
    // Create a new promise that will resolve when this card's entire processing is complete
    return new Promise(async (resolve) => {
        console.log(`Processing villain card:`, villainCard.name);
        
        try {
            if (villainCard.name.includes('Master Strike')) {
                await handleMasterStrike(villainCard);
            } else if (villainCard.name.includes('Scheme Twist')) {
                if (villainCard.plutonium === true) {
                    await handlePlutoniumSchemeTwist(villainCard);
                } else {
                    await handleSchemeTwist(villainCard);
                }
            } else if (villainCard.type === 'Bystander') {
                await handleBystander(villainCard);
            } else if (villainCard.type === 'Hero' && getSelectedScheme().name === `X-Cutioner's Song`) {
                await handleXCutionerHero(villainCard);
            } else {
                // Handle regular villain card
                await processRegularVillainCard(villainCard);
            }
            
            // Moved to the very end, after all other processing
            if (pendingHeroKO && schemeTwistChainDepth === 0) {
                pendingHeroKO = false;
                await showHeroSelectPopup();
            }
        } catch (error) {
            console.error('Error processing card:', error);
        } finally {
            updateGameBoard();
            resolve();
        }
    });
}

function showHeroSelectPopup() {
    updateGameBoard();
    return new Promise((resolve) => {
        const heroSelectPopup = document.getElementById('hero-select-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const heroOptions = document.getElementById('hero-options');
        const heroImage = document.getElementById('hero-select-image');
        const hoverText = document.getElementById('selectHoverText');
        
        // Check if confirm button already exists and remove it first
        const existingConfirm = document.getElementById('hero-select-confirm');
        if (existingConfirm) {
            heroSelectPopup.removeChild(existingConfirm);
        }
        
        const confirmButton = document.createElement('button');
        confirmButton.id = 'hero-select-confirm';
        confirmButton.textContent = 'CONFIRM';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;

        heroImage.style.display = 'none';
        hoverText.style.display = 'block';

        heroOptions.innerHTML = ''; // Clear previous options
        let selectedHero = null;
        let activeImage = null;

        // Add confirm button to popup
        heroSelectPopup.appendChild(confirmButton);

        // Filter eligible heroes - now checks for null/undefined first
        const eligibleHeroes = hq.filter(hero => 
            hero && hero.type === 'Hero' && hero.cost <= 6
        );

        if (eligibleHeroes.length === 0) {
            onscreenConsole.log('No Heroes available with a cost of 6 or less.');
            resolve();
            return;
        }

        // Populate hero options
        eligibleHeroes.forEach((hero, index) => {
            const heroButton = document.createElement('button');
    const hqPosition = hq.indexOf(hero) + 1;
    
    // Helper function to create icon HTML only if the value exists and is not 'none'
    const createTeamIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
    };

    const createClassIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
    };
    
    const teamIcon = createTeamIconHTML(hero.team);
    const class1Icon = createClassIconHTML(hero.class1);
    const class2Icon = createClassIconHTML(hero.class2);
    const class3Icon = createClassIconHTML(hero.class3);
    
    // Combine all icons
    const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
    
    heroButton.innerHTML = `<span style="white-space: nowrap;">HQ-${hqPosition} | ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${hero.name}</span>`;
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
        confirmButton.onclick = (e) => {
            e.stopPropagation(); // Stop event bubbling
            e.preventDefault();  // Prevent default behavior
            
            if (selectedHero === null) return;

            // Add a small delay before closing to block ghost clicks
            setTimeout(() => {
                const hero = eligibleHeroes[selectedHero];
                onscreenConsole.log(`A Scheme Twist has forced you to return <span class="console-highlights">${hero.name}</span> to the bottom of the Hero Deck.`);
                returnHeroToDeck(selectedHero);
                updateGameBoard();
                
                // Clean up
                heroSelectPopup.removeChild(confirmButton);
                heroSelectPopup.style.display = 'none';
                modalOverlay.style.display = 'none';
                resolve();
            }, 100); // 100ms delay blocks ghost clicks
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
        
        // Get the new card before placing it in HQ
        const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
        hq[index] = newCard; // Fill the HQ slot with the top card of the Hero deck
        
        if (newCard) {
            onscreenConsole.log(`<span class="console-highlights">${newCard.name}</span> has entered the HQ.`);
        } else {
            onscreenConsole.log(`HQ Update: No new card available.`);
        }

addHRToTopWithInnerHTML();
       
        updateGameBoard();
    }
}

function showPopup(type, drawnCard, confirmCallback) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContext = document.getElementById('popup-context');
    const confirmBtn = document.getElementById('popup-confirm');
    const modalOverlay = document.getElementById('modal-overlay');
modalOverlay.style.display = 'block';
const popupImage = document.getElementById('popup-single-image');
const closeButton = document.getElementById('close-x');
    confirmBtn.innerText = getRandomConfirmText();

    const mastermind = getSelectedMastermind();

     const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
        const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

 
    popup.style.display = 'block';


    // Check and set image based on the type
     if (type === 'Master Strike') {
        popupTitle.innerText = `Master Strike`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = mastermind.masterStrikeConsoleLog;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'Scheme Twist') {
        popupTitle.innerText = `Scheme Twist`;
        popupImage.style.display = 'block';
        if (selectedScheme.variableTwist === false) {
             popupContext.innerHTML = `<span class="console-highlights">Twist ${schemeTwistCount}:</span> ${selectedScheme.twistText}`;
        } else if (selectedScheme[`twistText${schemeTwistCount}`]) {
             popupContext.innerHTML = `<span class="console-highlights">Twist ${schemeTwistCount}:</span> ${selectedScheme[`twistText${schemeTwistCount}`]}`;
        } else {
             popupContext.innerHTML = ``;
        }
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'Bystander to Mastermind') {
        popupTitle.innerText = `Bystander`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `No Villains in the city. <span class="console-highlights">${drawnCard.name}</span> will be captured by <span class="console-highlights">${mastermind.name}</span>.`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'Bystander to Villain') {
        popupTitle.innerText = `Bystander`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `<span class="console-highlights">${drawnCard.name}</span> will be captured by the Villain closest to the Villain deck.`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'Villain Escape') {
        popupTitle.innerText = `Escape`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `A new Villain in the city means <span class="console-highlights">${drawnCard.name}</span> escapes!`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'Villain Ambush') {
        popupTitle.innerText = `Ambush`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `<span class="console-highlights">${drawnCard.name}</span> enters the city with an ambush!`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'Villain Arrival') {
        popupTitle.innerText = `Villain`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `<span class="console-highlights">${drawnCard.name}</span> enters the city.`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'X-Cutioner Hero to Villain') {
        popupTitle.innerText = `Hero`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `<span class="console-highlights">${drawnCard.name}</span> will be captured by the Villain closest to the Villain deck.`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'X-Cutioner Hero to Mastermind') {
        popupTitle.innerText = `Hero`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `No Villains in the city. <span class="console-highlights">${drawnCard.name}</span> will be captured by <span class="console-highlights">${mastermind.name}</span>.`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else {
        popupImage.style.display = 'none'; // Hide image if the type is unknown
    }

    const closePopup = () => {
        popup.style.display = 'none';
popupImage.style.display = 'none';
popupContext.innerHTML = ``;
        modalOverlay.style.display = 'none';
        confirmBtn.removeEventListener('click', onConfirm);
    };

    const onConfirm = () => {
        confirmCallback(); // Execute the passed dynamic function
        closePopup();
    };

    confirmBtn.addEventListener('click', onConfirm);

    const closeBtn = popup.querySelector('.close-triangle-btn');
    closeBtn.onclick = onConfirm;
}

// Global state to track minimized popups
const minimizedPopups = new Set();

// Initialize minimize/maximize system
function setupMinimizeSystem() {
    // Set up event delegation for all minimize/maximize buttons
    document.body.addEventListener('click', (e) => {
        // Handle minimize buttons
        if (e.target.closest('.minimize-triangle-btn')) {
            const popup = e.target.closest('.popup');
            if (popup) minimizePopup(popup);
        }
        
        // Handle maximize buttons
        if (e.target.closest('.reopen-popup-btn')) {
            maximizeAllPopups();
        }
    });
}

// Minimize a specific popup
function minimizePopup(popup) {
    popupMinimized = true;
    for (let i = 0; i < hq.length; i++) {
        const hqCell = document.querySelector(`#hq-${i + 1}`);
        if (hqCell && hqCell.clickHandler) {
            hqCell.removeEventListener('click', hqCell.clickHandler);
            hqCell.clickHandler = null;
        }
    }

    // Remove City click handlers
    for (let i = 0; i < city.length; i++) {
        const cityCell = document.querySelector(`#city-${i + 1}`);
        if (cityCell && cityCell.clickHandler) {
            cityCell.removeEventListener('click', cityCell.clickHandler);
            cityCell.clickHandler = null;
        }
    }

        if (demonGoblinDeck.length > 0) {
        const demonDeck = document.getElementById('demon-goblin-deck');
        demonDeck.removeEventListener('click', demonDeck.clickHandler);
        demonDeck.clickHandler = null;
    }

    // Remove Player Hand click handlers
    const playerHandElements = document.querySelectorAll('#player-hand-element .card');
    playerHandElements.forEach(cardElement => {
        if (cardElement._clickHandler) {
            cardElement.removeEventListener('click', cardElement._clickHandler);
            delete cardElement._clickHandler;
        }
    });

    
    document.getElementById('mastermind').removeEventListener('click', handleMastermindClick);
    document.getElementById('sidekick-deck-card-back').removeEventListener('click', showSidekickRecruitButton);
    document.getElementById('shield-deck-card-back').removeEventListener('click', showSHIELDRecruitButton);
    

    // Store the popup's current state
    const state = {
        popup,
        wasVisible: popup.style.display !== 'none',
        associatedControls: getAssociatedControls(popup)
    };
    
    // Hide the popup and its controls
    popup.style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
    state.associatedControls.forEach(control => {
        control.dataset.originalDisplay = control.style.display;
        control.style.display = 'none';
    });
    
    // Add to minimized set
    minimizedPopups.add(state);

    document.getElementById('healing-button').style.display = 'none';
    document.getElementById('superpowersToggle').style.display = 'none';
    document.getElementById('sort-player-cards').style.display = 'none';
    document.getElementById('confirm-actions').style.display = 'none';
    document.getElementById('play-all-button').style.display = 'none';
    document.getElementById('end-turn').style.display = 'none'; 
    
    // Show maximize button(s)
    document.querySelectorAll('.reopen-popup-btn').forEach(btn => {
        btn.style.display = 'block';
    });
}

// Maximize all minimized popups
function maximizeAllPopups() {
    popupMinimized = false;
    // Re-enable HQ click handlers
    for (let i = 0; i < hq.length; i++) {
        const hqCell = document.querySelector(`#hq-${i + 1}`);
        if (hqCell && hq[i]) {  // Check if cell exists and has a hero
            hqCell.clickHandler = () => {
                if (!isRecruiting) {
                    showHeroRecruitButton(i + 1, hq[i]);
                }
            };
            hqCell.addEventListener('click', hqCell.clickHandler);
        }
    }

    // Re-enable City click handlers
    for (let i = 0; i < city.length; i++) {
        const cityCell = document.querySelector(`#city-${i + 1}`);
        if (cityCell && city[i]) {  // Check if cell exists and has content
            if (city[i].type !== 'Bystander' && city[i].type !== 'Attached to Mastermind') {
                cityCell.clickHandler = () => showAttackButton(i);
                cityCell.addEventListener('click', cityCell.clickHandler);
            }
        }
    }

    if (demonGoblinDeck.length > 0) {
        const demonDeck = document.getElementById('demon-goblin-deck');
        demonDeck.clickHandler = () => showDemonGoblinAttackButton();
                demonDeck.addEventListener('click', demonDeck.clickHandler);
    }

    // Re-enable Player Hand click handlers
    const playerHandElement = document.getElementById('player-hand-element');
    const cardElements = playerHandElement.querySelectorAll('.card');
    
    cardElements.forEach((cardElement, index) => {
        if (index < playerHand.length) {  // Ensure we don't exceed array bounds
            const card = playerHand[index];
            const clickHandler = (e) => {
                e.stopPropagation();
                if (card.name === 'Wound') {
                    console.log("Cannot toggle a Wound card.");
                    return;
                }
                toggleCard(index);
            };
            
            cardElement._clickHandler = clickHandler;
            cardElement.addEventListener('click', clickHandler);
        }
    });

    
    document.getElementById('mastermind').addEventListener('click', handleMastermindClick);
    document.getElementById('sidekick-deck-card-back').addEventListener('click', showSidekickRecruitButton);
    document.getElementById('shield-deck-card-back').addEventListener('click', showSHIELDRecruitButton);
    

    minimizedPopups.forEach(state => {
        // Restore popup
        if (state.wasVisible) {
            state.popup.style.display = 'block';
        }
        
        // Restore associated controls
        state.associatedControls.forEach(control => {
            control.style.display = control.dataset.originalDisplay || '';
        });
    });

    document.getElementById('modal-overlay').style.display = 'block';
    
    // Clear minimized state
    minimizedPopups.clear();
    
    // Hide maximize button(s)
    document.querySelectorAll('.reopen-popup-btn').forEach(btn => {
        btn.style.display = 'none';
    });

    document.getElementById('healing-button').style.display = 'block';
    document.getElementById('superpowersToggle').style.display = 'block';
    document.getElementById('sort-player-cards').style.display = 'block';
    document.getElementById('confirm-actions').style.display = 'block';
    document.getElementById('play-all-button').style.display = 'block';
    document.getElementById('end-turn').style.display = 'block';

}

// Helper to find controls associated with a popup
function getAssociatedControls(popup) {
    // You can customize this based on your popup-control relationships
    const controls = [];
    
    // Example: Find controls with data-popup-id matching the popup's id
    const popupId = popup.id;
    if (popupId) {
        controls.push(...document.querySelectorAll(`[data-popup-id="${popupId}"]`));
    }
    
    // Add any other control selection logic here
    return controls.filter(control => !!control);
}

// Initialize the system when the game loads
setupMinimizeSystem();

function getRandomConfirmText() {
    const options = ['Ouch!', 'Oh no!', 'Yikes!', 'Uh-oh!', 'Watch out!'];
    return options[Math.floor(Math.random() * options.length)];
}

function updateDeckCounts() {

const sidekickCheckboxes = document.querySelectorAll('#sidekick-selection input[type=checkbox]');
const isAnySidekickChecked = Array.from(sidekickCheckboxes).some(checkbox => checkbox.checked);

if (!isAnySidekickChecked) {
    document.getElementById('sidekick-deck-card-back').style.display = 'none';
} 

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

twistCountNumber.innerHTML = `${koPile.filter(card => card.type === 'Scheme Twist').length + killbotSchemeTwistCount}`;
masterStrikeCountNumber.innerHTML = `${koPile.filter(card => card.type === 'Master Strike').length}`;
escapePileCountNumber.innerHTML = `${escapedVillainsDeck.length}`;
koPileCountNumber.innerHTML = `${koPile.length}`;
woundDeckCountNumber.innerHTML = `${woundDeck.length}`;
bystanderDeckCountNumber.innerHTML = `${bystanderDeck.length}`;
sidekickCountNumber.innerHTML = `${sidekickDeck.length}`;
shieldCountNumber.innerHTML = `${shieldDeck.length}`;
discardCountNumber.innerHTML = `${playerDiscardPile.length}`;
playedCardsCountNumber.innerHTML = `${cardsPlayedThisTurn.length}`;
villainDeckCountNumber.innerHTML = `${villainDeck.length}`;
heroDeckCountNumber.innerHTML = `${heroDeck.length}`;
playerDeckCountNumber.innerHTML = `${playerDeck.length}`;
mastermindTacticCountNumber.innerHTML = `${mastermind.tactics.length}`;

const currentVictoryPoints = calculateVictoryPoints(victoryPile);
document.getElementById('currentVictoryPointsTally').innerHTML = `${currentVictoryPoints}`;

}

function updateHighlights() {
    for (let i = 0; i < hq.length; i++) {
        const hqCell = document.querySelector(`#hq-${i + 1}`);
        if (hq[i]) {
            // Remove any existing highlight
            hqCell.classList.remove('affordable');
            
            // Add highlight if player can afford this hero
            if (totalRecruitPoints >= hq[i].cost) {
                hqCell.classList.add('affordable');
            }
        }
    }

const sidekickCheckboxes = document.querySelectorAll('#sidekick-selection input[type=checkbox]');
const isAnySidekickChecked = Array.from(sidekickCheckboxes).some(checkbox => checkbox.checked);

 if (totalRecruitPoints >= 2 && !sidekickRecruited && isAnySidekickChecked) {
    document.getElementById("sidekick-deck").classList.add('affordable');
} else {
    document.getElementById("sidekick-deck").classList.remove('affordable');
}

 if (sidekickRecruited) {
    document.getElementById("sidekick-deck").classList.remove('affordable');
}
   
    if (totalRecruitPoints >= 3) {
        document.getElementById("shield-deck").classList.add('affordable');
    } else {
        document.getElementById("shield-deck").classList.remove('affordable');
    }

    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked')?.value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    // Highlight villains in city
for (let i = 0; i < city.length; i++) {
    const cityCell = document.querySelector(`#city-${i + 1}`);
    cityCell.classList.remove('attackable');
    cityCell.classList.remove('needs-recruit');
    
    if (city[i]) {
        // First check if fight condition is met (if it exists)
        const hasFightCondition = city[i].fightCondition && city[i].fightCondition !== "None";
        const conditionMet = !hasFightCondition || isVillainConditionMet(city[i]);
        
        if (conditionMet) {
            // Calculate effective attack value
            const villainAttack = recalculateVillainAttack(city[i]);
            
            // Check if attackable with current points
            const canAttackWithAttackPoints = totalAttackPoints >= villainAttack;
            const hasBribeKeyword = city[i].keyword1 === "Bribe" || 
                        city[i].keyword2 === "Bribe" || 
                        city[i].keyword3 === "Bribe";
            const canAttackWithRecruitPoints = (recruitUsedToAttack || hasBribeKeyword) && 
                                  (totalAttackPoints + totalRecruitPoints >= villainAttack);
            
            if (canAttackWithAttackPoints || canAttackWithRecruitPoints) {
                cityCell.classList.add('attackable');
               
                // Add special class if recruit points would be needed
                if (canAttackWithRecruitPoints) {
                    cityCell.classList.add('needs-recruit');
                }
            }
        }
    }
}

if (demonGoblinDeck.length > 0) {
    const demonGoblinAttackCost = 2;
    const demonDeck = document.getElementById('demon-goblin-deck');
    
    if (demonDeck) {
        // Calculate available attack power
        const availableAttack = recruitUsedToAttack 
            ? totalAttackPoints + totalRecruitPoints 
            : totalAttackPoints;
        
        // Check if attackable
        const isAttackable = availableAttack >= demonGoblinAttackCost;
        
        // Toggle the 'attackable' class
        if (isAttackable) {
            demonDeck.classList.add('attackable');
        } else {
            demonDeck.classList.remove('attackable');
        }
    }
}

let mastermind = getSelectedMastermind();
let mastermindAttack = recalculateMastermindAttack(mastermind);

// Check if Mastermind has Bribe keyword
const hasMastermindBribe = mastermind.keyword1 === "Bribe" || 
                           mastermind.keyword2 === "Bribe" || 
                           mastermind.keyword3 === "Bribe";

const canAttackWithRecruitPoints = (recruitUsedToAttack || hasMastermindBribe) && 
                                 (totalAttackPoints + totalRecruitPoints >= mastermindAttack) &&
                                 (totalAttackPoints < mastermindAttack);

// Count defeated mastermind cards (tactics + final blow if applicable)
const defeatedMasterminds = victoryPile.filter(card => card.type === "Mastermind");
const maxDefeatsAllowed = finalBlowEnabled ? 5 : 4;

// Determine if mastermind can still be attacked
const canStillBeAttacked = defeatedMasterminds.length < maxDefeatsAllowed;
const hasEnoughPoints = totalAttackPoints >= mastermindAttack || canAttackWithRecruitPoints;
const hasTacticsRemaining = mastermind.tactics.length > 0;

// Mastermind is attackable if:
// 1. Player has enough points AND
// 2. Either: a) Has tactics remaining OR b) Final Blow is enabled and at exactly 4 defeats
const canAttackMastermind = hasEnoughPoints && 
                          (hasTacticsRemaining || 
                           (finalBlowEnabled && defeatedMasterminds.length === 4));

// Update UI
if (canAttackMastermind && canStillBeAttacked) {
    document.getElementById("mastermind").classList.add('attackable');
    if (totalAttackPoints < mastermindAttack) {
        document.getElementById("mastermind").classList.add('needs-recruit');
    }
} else {
    document.getElementById("mastermind").classList.remove('attackable', 'needs-recruit');
}
}

let isRecruiting = false; // Flag to track if a hero is being recruited

const CARD_BACK_PATH = 'Visual Assets/CardBack.webp';

function updateDeckImage(element, card) {
    element.src = card?.revealed ? card.image : CARD_BACK_PATH;
}

function showRevealedCards() {
    updateDeckImage(document.getElementById('player-deck-card-back'), playerDeck.at(-1));
    updateDeckImage(document.getElementById('hero-deck-card-back'), heroDeck.at(-1));
    updateDeckImage(document.getElementById('villain-deck-card-back'), villainDeck.at(-1));
updateDeckImage(document.getElementById('shield-deck-card-back'), shieldDeck.at(-1));
updateDeckImage(document.getElementById('sidekick-deck-card-back'), sidekickDeck.at(-1));
}

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

    // Remove any existing click event listeners first to avoid duplicates
    hqCell.removeEventListener('click', hqCell.clickHandler);

    if (hq[i]) {
        // Create an image element for the hero
        const heroImage = document.createElement('img');
        heroImage.src = hq[i].image;  // Use the image property from the hero object
        heroImage.alt = hq[i].name;   // Set alt text as the hero's name
        heroImage.classList.add('card-image'); // Add a class for styling if needed

        // Append the image to the HQ cell
        hqCell.appendChild(heroImage);

        // Create a named function for the click handler
        hqCell.clickHandler = () => {
            if (!isRecruiting) {
                showHeroRecruitButton(i + 1, hq[i]);
            }
        };

        // Add the event listener
        hqCell.addEventListener('click', hqCell.clickHandler);

        // Update the recruit cost dynamically
        if (recruitCostSpan) {
            recruitCostSpan.innerHTML = `<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">`;
        }
    } else {
        // No action if the cell is empty
        hqCell.clickHandler = null;
        if (recruitButtonContainer) {
            recruitButtonContainer.style.display = 'none'; // Hide the button if no hero is present
        }
    }
}

const stackedCardsByMastermind = document.getElementById('stacked-mastermind-cards');
const stackedCardsByMastermindCount = document.getElementById('stacked-mastermind-cards-count');

if (stackedTwistNextToMastermind > 0) {
stackedCardsByMastermind.style.display = 'flex';
stackedCardsByMastermindCount.style.display = 'block';
stackedCardsByMastermindCount.textContent = stackedTwistNextToMastermind;
} else {
stackedCardsByMastermind.style.display = 'none';
stackedCardsByMastermindCount.style.display = 'none'; 
}

// Define explosion values (modify if your variables are named differently)
const explosionValues = [hqExplosion1, hqExplosion2, hqExplosion3, hqExplosion4, hqExplosion5];

for (let i = 1; i <= 5; i++) {
    const explosionIcon = document.getElementById(`hq-${i}-explosion`);
    const explosionCount = document.getElementById(`hq-${i}-explosion-count`);
    const value = explosionValues[i - 1] || 0; // Fallback to 0 if undefined

    if (value > 0) {
        // Always show icon/count if > 0
        explosionIcon.style.display = 'block';
        explosionCount.style.display = 'block';
        explosionCount.textContent = value;

        // Special styling when >= 6 explosions
        if (value >= 6) {
            explosionIcon.style.height = '100%';
            explosionIcon.style.opacity = '1';
            explosionIcon.style.filter = 'drop-shadow(0 0 8px red)';
            explosionIcon.classList.add('max-explosions'); // Optional CSS class
        } else {
            // Reset to defaults if < 6
            explosionIcon.style.height = '';
            explosionIcon.style.opacity = '';
            explosionIcon.style.filter = '';
            explosionIcon.classList.remove('max-explosions');
        }
    } else {
        // Hide if no explosions
        explosionIcon.style.display = 'none';
        explosionCount.style.display = 'none';
    }
}

updateDeckCounts();
showRevealedCards();

        for (let i = 0; i < city.length; i++) {
        const cityCell = document.querySelector(`#city-${i + 1}`);
        cityCell.innerHTML = ''; // Clear the existing content

        cityCell.innerHTML = '';
        const newCityCell = cityCell.cloneNode(false);
        cityCell.parentNode.replaceChild(newCityCell, cityCell);

victoryPile.forEach(item => {
    if (item.killbot && item.originalBystanderData) {
        // Restore original bystander with all properties
        const original = item.originalBystanderData;
        Object.keys(original).forEach(key => {
            item[key] = original[key];
        });
        
        // Clear killbot-specific properties
        item.killbot = false;
        item.overlayTextAttack = null;
        item.fightEffect = "None"; // Reset fight effect
        
        // Ensure type is properly reset
        item.type = "Bystander";
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
        // Show the discard pile and set the image to the last discarded card
        discardPileImage.style.display = 'flex';
        discardPileImage.src = playerDiscardPile[playerDiscardPile.length - 1].image;
    } else {
        // Hide the discard pile when empty
        discardPileImage.style.display = 'none';
        // Optional: Clear the image source when empty
        discardPileImage.src = '';
    }
} else {
    console.warn('discard-pile-card-back element not found');
}

const playedCardsPileImage = document.getElementById('played-cards-deck-pile');
if (playedCardsPileImage) {
    if (cardsPlayedThisTurn.length >= 1) {
        playedCardsPileImage.style.display = 'flex';
        playedCardsPileImage.src = cardsPlayedThisTurn[cardsPlayedThisTurn.length - 1].image;
    } else {
        playedCardsPileImage.style.display = 'none';
    }
} else {
    console.warn('played-cards-deck-pile element not found');
}

const demonGoblinDeckImage = document.getElementById('demon-goblin-deck');
const demonGoblinCount = document.getElementById('demon-goblin-count');
if (demonGoblinDeckImage) {
    if (demonGoblinDeck.length > 0) {
        demonGoblinDeckImage.style.display = 'flex';
        demonGoblinCount.innerHTML = `${demonGoblinDeck.length}`;
    } else {
        demonGoblinDeckImage.style.display = 'none';
        demonGoblinCount.innerHTML = ``;
    }
} else {
    console.warn('demon-goblin-deck element not found');
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
    newCityCell.appendChild(cardContainer);

    // Create an image element
    const cardImage = document.createElement('img');
    cardImage.src = city[i].image; // Use the image property from the card object
    cardImage.alt = city[i].name; // Set alt text as the card name
    cardImage.classList.add('card-image'); // Add a class for styling if needed
    cardContainer.appendChild(cardImage);

                // Add buff overlays
            const currentTempBuff = window[`city${i + 1}TempBuff`];
            if (currentTempBuff !== 0) {
                const tempBuffOverlay = document.createElement('div');
                tempBuffOverlay.className = 'temp-buff-overlay';
                tempBuffOverlay.innerHTML = `<p>${currentTempBuff} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'></p>`;
                cardContainer.appendChild(tempBuffOverlay);
            }

            const currentPermBuff = window[`city${i + 1}PermBuff`];
            if (currentPermBuff !== 0) {
                const permBuffOverlay = document.createElement('div');
                permBuffOverlay.className = 'perm-buff-overlay';
                permBuffOverlay.innerHTML = `<p>+${currentPermBuff} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'></p>`;
                cardContainer.appendChild(permBuffOverlay);
            }


    // If the city[i].name is 'Killbot', set the overlayTextAttack
    if (city[i].killbot === true) {
        city[i].overlayTextAttack = `${killbotAttack}`;

        const killbotOverlay = document.createElement('div');
        killbotOverlay.className = 'killbot-overlay';
        killbotOverlay.innerHTML = 'KILLBOT';

        // Append the attack overlay directly to the container (over the image)
        cardContainer.appendChild(killbotOverlay);
    }

    if (city[i].goblinQueen === true) {
        city[i].attack = city[i].cost + demonGoblinDeck.length;
        city[i].overlayTextAttack = `${city[i].attack}`;
    }

if (city[i].babyHope === true && !city[i].babyBonusApplied) {
    city[i].attack += 4;
    city[i].babyBonusApplied = true; // Mark as processed
}

// Always re-add overlay if babyHope is true (even if bonus was already applied)
if (city[i].babyHope === true) {
    // Clear existing overlay to avoid duplicates
    const existingOverlay = cardContainer.querySelector('.villain-baby-overlay');
    if (existingOverlay) existingOverlay.remove();

    // Create and append new overlay
    const babyOverlay = document.createElement('div');
    babyOverlay.className = 'villain-baby-overlay';
    babyOverlay.innerHTML = `Baby<br>Hope`;
  
    cardContainer.appendChild(babyOverlay);
}

updateMastermindOverlay();

const mastermind = getSelectedMastermind();

if (city[i].alwaysLeads === 'true' && mastermind.name === 'Apocalypse') {
    city[i].overlayTextAttack = `${city[i].attack}`;
}


    // Check if the villain has an overlayText (indicating captured hero or attack)
    if (city[i].overlayText) {
        const villainOverlay = document.createElement('div');
        villainOverlay.className = 'skrull-overlay';
        villainOverlay.innerHTML = `${city[i].overlayText}`;
        cardContainer.appendChild(villainOverlay);
    }

        if (city[i].capturedOverlayText) {
        const capturedVillainOverlay = document.createElement('div');
        capturedVillainOverlay.className = 'captured-overlay';
        capturedVillainOverlay.innerHTML = `${city[i].capturedOverlayText}`;
        cardContainer.appendChild(capturedVillainOverlay);
    }

    // Check if the villain has an overlayTextAttack
    if (city[i].overlayTextAttack) {
        const villainOverlayAttack = document.createElement('div');
        villainOverlayAttack.className = 'attack-overlay';
        villainOverlayAttack.innerHTML = city[i].overlayTextAttack;
        cardContainer.appendChild(villainOverlayAttack);
    }

if (city[i].bystander) {
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                
                // Create overlay text
                let overlayText = `${city[i].bystander.length} Bystander${city[i].bystander.length > 1 ? 's' : ''}`;
                const selectedScheme = schemes.find(s => s.name === document.querySelector('#scheme-section input[type=radio]:checked').value);
                
                if (selectedScheme.name === 'Midtown Bank Robbery') {
                    overlayText += `<br>+${city[i].bystander.length} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">`;
                }
                
                if (city[i].bonusBystanderAttack > 0) {
                    overlayText += `<br>+${city[i].bonusBystanderAttack * city[i].bystander.length} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">`;
                }

                overlay.innerHTML = overlayText;
                overlay.style.whiteSpace = 'pre-line';

                // Expanded container
                const expandedContainer = document.createElement('div');
                expandedContainer.className = 'expanded-bystanders';
                expandedContainer.style.display = 'none';
                
                city[i].bystander.forEach(bystander => {
                    const bystanderElement = document.createElement('span');
                    bystanderElement.className = 'bystander-name';
                    bystanderElement.textContent = bystander.name;
                    bystanderElement.dataset.image = bystander.image;
                    
                    bystanderElement.addEventListener('mouseover', (e) => {
                        e.stopPropagation();
                        showZoomedImage(bystander.image);
                        const card = cardLookup[normalizeImagePath(bystander.image)];
                        if (card) updateRightPanel(card);
                    });
                    
                    bystanderElement.addEventListener('mouseout', (e) => {
                        e.stopPropagation();
                        if (!activeImage) hideZoomedImage();
                    });
                    
                    bystanderElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                        activeImage = activeImage === bystander.image ? null : bystander.image;
                        showZoomedImage(activeImage || '');
                    });
                    
                    expandedContainer.appendChild(bystanderElement);
                });

                // Overlay click handler
                overlay.addEventListener('click', (e) => {
                    e.stopPropagation();
                    expandedContainer.style.display = expandedContainer.style.display === 'none' ? 'block' : 'none';
                    
                    if (expandedContainer.style.display === 'block') {
                        setTimeout(() => {
                            document.addEventListener('click', (e) => {
                                if (!expandedContainer.contains(e.target)) {
                                    expandedContainer.style.display = 'none';
                                }
                            }, { once: true });
                        }, 50);
                    }
                });

                cardContainer.appendChild(overlay);
                cardContainer.appendChild(expandedContainer);
            }

if (city[i].XCutionerHeroes && city[i].XCutionerHeroes.length > 0) {
                const XCutionerOverlay = document.createElement('div');
                XCutionerOverlay.className = 'XCutioner-overlay';
                
                // Create overlay text
                let XCutionerOverlayText = `${city[i].XCutionerHeroes.length} Hero${city[i].XCutionerHeroes.length > 1 ? 'es' : ''}`;
                const selectedScheme = schemes.find(s => s.name === document.querySelector('#scheme-section input[type=radio]:checked').value);
                
                if (selectedScheme.name === `X-Cutioner's Song`) {
                    XCutionerOverlayText += `<br>+${city[i].XCutionerHeroes.length * 2} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">`;
                }
                
                XCutionerOverlay.innerHTML = XCutionerOverlayText;
                XCutionerOverlay.style.whiteSpace = 'pre-line';

                // Expanded container
                const XCutionerExpandedContainer = document.createElement('div');
                XCutionerExpandedContainer.className = 'expanded-XCutionerHeroes';
                XCutionerExpandedContainer.style.display = 'none';
                
                city[i].XCutionerHeroes.forEach(hero => {
                    const XCutionerHeroElement = document.createElement('span');
                    XCutionerHeroElement.className = 'XCutioner-hero-name';
                    XCutionerHeroElement.textContent = hero.name;
                    XCutionerHeroElement.dataset.image = hero.image;
                    
                    XCutionerHeroElement.addEventListener('mouseover', (e) => {
                        e.stopPropagation();
                        showZoomedImage(hero.image);
                        const card = cardLookup[normalizeImagePath(hero.image)];
                        if (card) updateRightPanel(card);
                    });
                    
                    XCutionerHeroElement.addEventListener('mouseout', (e) => {
                        e.stopPropagation();
                        if (!activeImage) hideZoomedImage();
                    });
                    
                    XCutionerHeroElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                        activeImage = activeImage === hero.image ? null : hero.image;
                        showZoomedImage(activeImage || '');
                    });
                    
                    XCutionerExpandedContainer.appendChild(XCutionerHeroElement);
                });

                // Overlay click handler
                XCutionerOverlay.addEventListener('click', (e) => {
                    e.stopPropagation();
                    XCutionerExpandedContainer.style.display = XCutionerExpandedContainer.style.display === 'none' ? 'block' : 'none';
                    
                    if (XCutionerExpandedContainer.style.display === 'block') {
                        setTimeout(() => {
                            document.addEventListener('click', (e) => {
                                if (!XCutionerExpandedContainer.contains(e.target)) {
                                    XCutionerExpandedContainer.style.display = 'none';
                                }
                            }, { once: true });
                        }, 50);
                    }
                });

                cardContainer.appendChild(XCutionerOverlay);
                cardContainer.appendChild(XCutionerExpandedContainer);
            }

if (city[i].plutoniumCaptured) {
    const plutoniumOverlay = document.createElement('div');
    plutoniumOverlay.className = 'overlay plutonium-overlay';
    
    // Create overlay text
    let overlayText = `${city[i].plutoniumCaptured.length} Plutonium`;
    
    // Add attack bonus (always +1 per plutonium)
    overlayText += `<br>+${city[i].plutoniumCaptured.length} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons">`;
    
    plutoniumOverlay.innerHTML = overlayText;

    // Corrected style properties (using camelCase)
    plutoniumOverlay.style.whiteSpace = 'nowrap';
    plutoniumOverlay.style.backgroundColor = '#90ee90b8';
    plutoniumOverlay.style.color = '#202b20';
    plutoniumOverlay.style.top = '50px';
    plutoniumOverlay.style.fontSize = '12px';
       
    // Add to the card
    cardContainer.appendChild(plutoniumOverlay);
}

if (city[i].shattered > 0) {
    const shatteredOverlay = document.createElement('div');
    shatteredOverlay.className = 'shattered-overlay';
    shatteredOverlay.innerHTML = `Shattered!<br><span>-${city[i].shattered}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"></span>`;
    
    // Clear existing overlay first to avoid duplicates
    const existingOverlay = cardContainer.querySelector('.shattered-overlay');
    if (existingOverlay) cardContainer.removeChild(existingOverlay);
    
    cardContainer.appendChild(shatteredOverlay);
}

if (city[i].type !== 'Bystander' && city[i].type !== 'Attached to Mastermind') {
                cardImage.addEventListener('click', (e) => {
                    if (!popupMinimized) {
                        e.stopPropagation();
                    showAttackButton(i);
                    }
                });

                const attackOverlay = cardContainer.querySelector('.attack-overlay');
                if (attackOverlay) {
                    attackOverlay.addEventListener('click', (e) => {
                        if (!popupMinimized) {
                        e.stopPropagation();
                        showAttackButton(i);
                        }
                    });
                }
            }
        }

newCityCell.classList.add('city-cell');
}

updateEvilWinsTracker();

if (lastTurn && !lastTurnMessageShown) {
    console.log('The Villains have completed their scheme but it is too late! You\'ve already defeated the Mastermind!');
    lastTurnMessageShown = true; // Prevent future logs
} else {
    // Check Scheme end game conditions
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);
    const selectedSchemeEndGame = selectedScheme ? selectedScheme.endGame : null;

    // Check Mastermind end game conditions
    const mastermind = getSelectedMastermind();
    const mastermindEndGame = mastermind ? mastermind.endGame : null;

    // Reusable calculations
    const escapedVillainsCount = escapedVillainsDeck.filter(card => card.type === 'Villain').length;
    const escapedBystanderCount = escapedVillainsDeck.filter(card => card.type === 'Bystander').length;
    const twistCount = koPile.filter(card => card.type === 'Scheme Twist').length;
    const escapedHeroesCount = escapedVillainsDeck.filter(card => card.type === 'Hero').length;
    const escapedKillbotsCount = escapedVillainsDeck.filter(card => card.killbot === true).length;
    const mastermindEscapesCount = escapedVillainsDeck.filter(card => card.mastermind === true).length;
    const KOdBystanders = koPile.filter(card => card.type === 'Bystander').length;
    const escapedBystanders = escapedVillainsDeck.filter(card => card.type === 'Bystander').length;
    const KOdHeroes = koPile.filter(card => card.type === 'Hero' && card.color !== 'Grey').length;
    const carriedOffHeroes = escapedVillainsDeck.filter(card => card.type === 'Hero' && card.color !== 'Grey').length;

    // Check Mastermind end game conditions first (if any)
    if (mastermindEndGame) {
    switch (mastermindEndGame) {
        case "fourHorsemen":
            // Get all villainIds from escaped villains
            const villainGroups = escapedVillainsDeck.reduce((acc, card) => {
                if (card.villainId) {
                    if (!acc[card.villainId]) {
                        acc[card.villainId] = new Set(); // Using Set to track unique names
                    }
                    acc[card.villainId].add(card.name);
                }
                return acc;
            }, {});

            // Check if any villain group has at least 4 unique members
            const hasFourUniqueFromSameGroup = Object.values(villainGroups).some(
                uniqueNames => uniqueNames.size >= 4
            );

            if (hasFourUniqueFromSameGroup) {
                document.getElementById('defeat-context').innerHTML = `<span class="console-highlights">Apocalypse</span><span class="bold-spans">'s</span> chosen Villain group have escaped!`;
                showDefeatPopup();
                break;
            }
    break;

            default:
                console.log(`Mastermind End Game "${mastermindEndGame}" is not yet defined.`);
                break;
        }
    }

    // Then check Scheme end game conditions (if Mastermind conditions weren't met)
    if (selectedSchemeEndGame) {
        switch (selectedSchemeEndGame) {
            case "8BystandersCarriedAway":
                if (escapedBystanderCount >= 8) {
                    document.getElementById('defeat-context').innerHTML = `8 Bystanders have been carried away by escaping Villains. ${mastermind.name} has vanished into the city with the loot!`;
                    showDefeatPopup();
                }
                break;

            case "12VillainsEscape":
                if (escapedVillainsCount >= 12) {
                    document.getElementById('defeat-context').innerHTML = `12 Villains have escaped from the Negative Zone prison. ${mastermind.name} now commands an army of freed inmates, ready to strike at Earth. All hope is lost.`;
                    showDefeatPopup();
                }
                break;

            case "7Twists":
                if (twistCount >= 7) {
                    document.getElementById('defeat-context').innerHTML = `The final Dark Portal has opened. ${mastermind.name} stands triumphant as the Dark Dimension's power seeps into our world. All hope is lost.`;
                    showDefeatPopup();
                }
                break;

            case "5Killbots":
                if (escapedKillbotsCount >= 5) {
                    document.getElementById('defeat-context').innerHTML = `5 Killbots have escaped. Earth's leaders have been replaced with merciless automata, plunging the planet into a new age of tyranny.`;
                    showDefeatPopup();
                }
                break;

            case "6EscapedSkrullHeroes":
                if (escapedHeroesCount >= 6) {
                    document.getElementById('defeat-context').innerHTML = `6 Heroes have entered the escape pile. Earth's champions have been replaced by Skrull infiltrators and no one knows who to trust. All hope is lost.`;
                    showDefeatPopup();
                }
                break;

            case "heroDeckEmpty":
                if (heroDeck.length === 0) {
                    document.getElementById('defeat-context').innerHTML = `The Hero Deck has run out. The superhero community lies fractured beyond repair, and ${mastermind.name} stands triumphant in the chaos.`;
                    showDefeatPopup();
                }
                break;

            case "woundDeckEmpty":
                if (woundDeck.length === 0) {
                    document.getElementById('defeat-context').innerHTML = `The Wound stack has run out. Too many have fallen to the Legacy Virus, and mutantkind faces extinction. ${mastermind.name} has won.`;
                    showDefeatPopup();
                }
                break;

            case "8Twists":
                if (twistCount >= 8) {
                    document.getElementById('defeat-context').innerHTML = `The Cosmic Cube is fully charged. With a single thought, ${mastermind.name} reshapes all of existence and the universe will never be the same.`;
                    showDefeatPopup();
                }
                break;

            case "KOHeroesEqualThree":
                if (koPile.filter(card => card.type === 'Hero' && card.color !== 'Grey').length >= 3) {
                    document.getElementById('defeat-context').innerHTML = `The number of non-grey Heroes in the KO pile has reached critical levels. ${mastermind.name}'s earthquake has leveled entire cities, leaving nothing but rubble and ruin. Civilization may never recover.`;
                    showDefeatPopup();
                }
                break;

            case "FiveGoonsEscape":
                if (escapedVillainsDeck.filter(card => card.name === 'Maggia Goons').length >= 5) {
                    document.getElementById('defeat-context').innerHTML = `5 Maggia Goons have escaped. ${mastermind.name}'s crime empire spreads through the city and no one is beyond their reach.`;
                    showDefeatPopup();
                }
                break;
                
            case "FourBystandersKOdOrEscaped":
                if (KOdBystanders + escapedBystanders >= 4) {
                    document.getElementById('defeat-context').innerHTML = `The number of Bystanders KO'd or carried off has reached critical levels. ${mastermind.name}'s plan succeeds and humanity faces extinction. The world now belongs to ${mastermind.name}.`;
                    showDefeatPopup();
                }
                break;

            case "FourPlutoniumEscape":
                if (escapedVillainsDeck.filter(card => card.plutonium === true).length >= 4) {
                    document.getElementById('defeat-context').innerHTML = `4 Plutonium have been carried off by Villains. ${mastermind.name} now holds the power to unleash nuclear devastation and the world trembles under the threat.`;
                    showDefeatPopup();
                }
                break;
                
            case "FourGoblinQueenEscape":
                if (escapedVillainsDeck.filter(card => card.goblinQueen === true).length >= 4) {
                    document.getElementById('defeat-context').innerHTML = `4 Goblin Queens have escaped. ${mastermind.name}'s army of demons overrun the city and darkness grips the world. Humanity's final days have begun.`;
                    showDefeatPopup();
                }
                break;

            case "NineHeroesKOdOrEscaped":
                if (KOdHeroes + carriedOffHeroes >= 9) {
                    document.getElementById('defeat-context').innerHTML = `9 non-grey Heroes have been KO'd or carried off. ${mastermind.name}'s plan has shattered the ranks of the world's defenders and mutantkind's future hangs by a thread. The age of heroes is over.`;
                    showDefeatPopup();
                }
                break;

            case "hqDetonated":
                if ((hqExplosion1 >= 6 && hqExplosion2 >= 6 && hqExplosion3 >= 6 && 
                    hqExplosion4 >= 6 && hqExplosion5 >= 6) || heroDeck.length === 0) {
                    document.getElementById('defeat-context').innerHTML = `All HQ spaces have been destroyed or the Hero Deck has run out. The Helicarrier erupts in a chain of explosions, plunging into the ocean in a fiery wreck.`;
                    showDefeatPopup();
                }
                break;

            case "babyThreeVillainEscape":
                if (stackedTwistNextToMastermind >= 3) {
                    document.getElementById('defeat-context').innerHTML = `Three twists have been stacked next to ${mastermind.name}. Hope Summers has been taken, her future stolen, and the fate of mutantkind has changed forever.`;
                    showDefeatPopup();
                }
                break;

            default:
                console.log(`Scheme End Game "${selectedSchemeEndGame}" is not yet defined.`);
                break;
        }
    } else if (!mastermindEndGame) {
        console.log(`Neither Scheme nor Mastermind End Game is defined.`);
    }
}

const playerHandElement = document.getElementById('player-hand-element');

// Add/remove 'has-selection' class to the hand container
if (selectedCards.length > 0) {
    playerHandElement.classList.add('has-selection');
} else {
    playerHandElement.classList.remove('has-selection');
}

playerHandElement.innerHTML = '';

playerHand.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${selectedCards.includes(index) ? 'selected' : ''}`;
    
    // Create an image element for the card
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.alt = card.name;
    cardImage.className = 'card-image';

    // Append the image to the card element
    cardElement.appendChild(cardImage);

    // Add the overlay span
    const overlaySpan = document.createElement('span');
    overlaySpan.className = 'overlay';
    cardElement.appendChild(overlaySpan);

    // Create named click handler function
    const clickHandler = (e) => {
        e.stopPropagation(); // Prevent this click from reaching the document handler
        const card = playerHand[index];
        if (card.name === 'Wound') {
            console.log("Cannot toggle a Wound card.");
            return;
        }
        toggleCard(index);
    };

    // Store the handler on the element for later removal
    cardElement._clickHandler = clickHandler;
    
    // Add event listener
    cardElement.addEventListener('click', clickHandler);

    playerHandElement.appendChild(cardElement);
});

document.getElementById('attack-points').innerText = totalAttackPoints;
document.getElementById('recruit-points').innerText = totalRecruitPoints;

updateSelectionOrder();

    updateHealWoundsButton();

updateCardSizing();
resetOpacity();
updateHighlights();

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

document.addEventListener('click', function(event) {
    // Check if we clicked outside any card
    if (!event.target.closest('.card') && selectedCards.length > 0) {
        selectedCards = [];
        updateGameBoard();
    }
});

function updateEvilWinsTracker() {
    const evilWinsText = document.getElementById('evilWinsTracker');
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked')?.value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

        // Check Mastermind end game conditions
    const mastermind = getSelectedMastermind();
    const mastermindEndGame = mastermind ? mastermind.endGame : null;

    // Reusable calculations
    const escapedVillainsCount = escapedVillainsDeck.filter(card => card.type === 'Villain').length;
    const escapedBystanderCount = escapedVillainsDeck.filter(card => card.type === 'Bystander').length;
    const twistCount = koPile.filter(card => card.type === 'Scheme Twist').length;
    const escapedHeroesCount = escapedVillainsDeck.filter(card => card.type === 'Hero').length;
    const escapedKillbotsCount = escapedVillainsDeck.filter(card => card.killbot === true).length;
    const mastermindEscapesCount = escapedVillainsDeck.filter(card => card.mastermind === true).length;
    const KOdBystanders = koPile.filter(card => card.type === 'Bystander').length;
    const escapedBystanders = escapedVillainsDeck.filter(card => card.type === 'Bystander').length;
    const KOdHeroes = koPile.filter(card => card.type === 'Hero' && card.color !== 'Grey').length;
    const carriedOffHeroes = escapedVillainsDeck.filter(card => card.type === 'Hero' && card.color !== 'Grey').length;

    switch (selectedScheme.name) {
        case "Midtown Bank Robbery":
      evilWinsText.innerHTML = `${escapedBystanderCount}/8 Bystanders Carried Away`;
      break;

        case "Negative Zone Prison Breakout":
      evilWinsText.innerHTML = `${escapedVillainsCount}/12 Escaped Villains`;
      break;

        case "Portals to the Dark Dimension":
      evilWinsText.innerHTML = `${twistCount}/7 Portals Opened`;
      break;

        case "Replace Earth's Leaders with Killbots":
      evilWinsText.innerHTML = `${escapedKillbotsCount}/5 Escaped Killbots`;
      break;

        case "Secret Invasion of the Skrull Shapeshifters":
      evilWinsText.innerHTML = `${escapedHeroesCount}/6 Escaped Skrull Heroes `;
      break;

        case "Superhero Civil War":
      evilWinsText.innerHTML = `${heroDeck.length} ${heroDeck.length === 1 ? 'Hero Remains' : 'Heroes Remain'}`;
      break;

        case "The Legacy Virus":
      evilWinsText.innerHTML = `${woundDeck.length} ${woundDeck.length === 1 ? 'Wound Remains' : 'Wounds Remain'}`;
      break;

        case "Unleash the Power of the Cosmic Cube":
      evilWinsText.innerHTML = `${twistCount}/8 Twists`;
      break;

        case "Capture Baby Hope":
      evilWinsText.innerHTML = `${stackedTwistNextToMastermind}/3 Stacked Twists`;
      break;

        case "Detonate the Helicarrier":
        const explodedSpaces = [
        hqExplosion1 >= 6,
        hqExplosion2 >= 6,
        hqExplosion3 >= 6,
        hqExplosion4 >= 6,
        hqExplosion5 >= 6
        ].filter(Boolean).length; // Count how many are true (exploded)
        const remainingHqSpaces = 5 - explodedSpaces;
    evilWinsText.innerHTML = `${remainingHqSpaces} HQ Space${remainingHqSpaces !== 1 ? 's' : ''} and ${heroDeck.length} ${heroDeck.length === 1 ? 'Hero Remains' : 'Heroes Remain'}`;
    break;
   
        case "Massive Earthquake Generator":
      evilWinsText.innerHTML = `${koPile.filter(card => card.type === 'Hero' && card.color !== 'Grey').length}/3 Non Grey Heroes KO'd`;
      break;

        case "Organized Crime Wave":
      evilWinsText.innerHTML = `${escapedVillainsDeck.filter(card => card.name === 'Maggia Goons').length}/5 Escaped Goons`;
      break;

        case "Save Humanity":
      evilWinsText.innerHTML = `${KOdBystanders + escapedBystanders}/4 Bystanders KO'd or Carried Off`;
      break;

        case "Steal the Weaponized Plutonium":
      evilWinsText.innerHTML = `${escapedVillainsDeck.filter(card => card.plutonium === true).length}/4 Plutonium Carried Off`;
      break;

        case "Transform Citizens Into Demons":
      evilWinsText.innerHTML = `${escapedVillainsDeck.filter(card => card.goblinQueen === true).length}/4 Escaped Goblin Queens`;
      break;

        case "X-Cutioner's Song":
      evilWinsText.innerHTML = `${KOdHeroes + carriedOffHeroes}/9 Non Grey Heroes KO'd or Carried Off`;
      break;

        default:
      evilWinsText.innerHTML = `See Scheme`;
  }


}

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
    // If clicking a card that's already selected, confirm the action
    if (selectedCards.includes(index)) {
        confirmActions();
        return;
    }
    
    // Otherwise, select only this card (clear previous selection)
    selectedCards = [index];
    updateGameBoard();
}

function updateSelectionOrder() {
    const cardElements = document.querySelectorAll('.card');
    
    // Clear all overlays first
    cardElements.forEach(cardElement => {
        const overlayElement = cardElement.querySelector('.overlay');
        if (overlayElement) {
            overlayElement.innerHTML = '';
        }
    });
    
    // If we have a selected card, update its overlay
    if (selectedCards.length > 0) {
        const cardIndex = selectedCards[0];
        if (cardIndex < cardElements.length) {
            const cardElement = cardElements[cardIndex];
            const overlayElement = cardElement.querySelector('.overlay');
            if (overlayElement) {
                overlayElement.innerHTML = '<span style="filter:drop-shadow(0px 0px 0.1vh white);">Selected</span>';
            }
        }
    }
    
    // Rest of your point calculation logic can remain the same
    let currentAttackPoints = 0;
    let currentRecruitPoints = 0;
    selectedCards.forEach(cardIndex => {
        if (cardIndex < playerHand.length) {
            const card = playerHand[cardIndex];
            currentAttackPoints += card.attack || 0;
            currentRecruitPoints += card.recruit || 0;
        }
    });
    document.getElementById('attack-points').innerText = totalAttackPoints + currentAttackPoints;
    document.getElementById('recruit-points').innerText = totalRecruitPoints + currentRecruitPoints;
}

document.getElementById('sort-player-cards').addEventListener('click', sortPlayerCards);

function sortPlayerCards() {
  if (!playerHand || playerHand.length < 2) return;

  const colorOrder = {
    'Grey': 1,
    'GreyVillain': 2,  // New category for grey villain heroes
    'Green': 3,
    'Yellow': 4,
    'Red': 5,
    'Black': 6,
    'Blue': 7
  };

  playerHand.sort((a, b) => {
    // Determine color category (modified for grey villains)
    const getColorCategory = (card) => {
      const color = card.color || '';
      if (color === 'Grey' && card.wasAVillain === true) {
        return 'GreyVillain';
      }
      return color;
    };

    // 1. Sort by modified color order
    const aColorCat = getColorCategory(a);
    const bColorCat = getColorCategory(b);
    const aColorRank = colorOrder[aColorCat] || 8;  // Increased from 7 to 8
    const bColorRank = colorOrder[bColorCat] || 8;
    if (aColorRank !== bColorRank) return aColorRank - bColorRank;

    // 2. Sort by hero name (part before " - ")
    const getHeroName = (name) => {
      const fullName = name || '';
      const separatorIndex = fullName.indexOf(' - ');
      return separatorIndex === -1 ? fullName : fullName.substring(0, separatorIndex);
    };
    const aHero = getHeroName(a.name);
    const bHero = getHeroName(b.name);
    const heroCompare = aHero.localeCompare(bHero);
    if (heroCompare !== 0) return heroCompare;

    // 3. Sort by cost (numerical)
    const aCost = a.cost || 0;
    const bCost = b.cost || 0;
    if (aCost !== bCost) return aCost - bCost;

    // 4. Final tiebreaker: full card name
    return (a.name || '').localeCompare(b.name || '');
  });

  updateGameBoard();
}

function genericCardSort(cardsArray) {
  if (!cardsArray || cardsArray.length < 2) return;

  const colorOrder = {
    'Grey': 1,
    'GreyVillain': 2,
    'Green': 3,
    'Yellow': 4,
    'Red': 5,
    'Black': 6,
    'Blue': 7
  };

  cardsArray.sort((a, b) => {
    // Determine color category
    const getColorCategory = (card) => {
      const color = card.color || '';
      if (color === 'Grey' && card.wasAVillain === true) {
        return 'GreyVillain';
      }
      return color;
    };

    // 1. Sort by modified color order
    const aColorCat = getColorCategory(a);
    const bColorCat = getColorCategory(b);
    const aColorRank = colorOrder[aColorCat] || 8;
    const bColorRank = colorOrder[bColorCat] || 8;
    if (aColorRank !== bColorRank) return aColorRank - bColorRank;

    // 2. Sort by hero name (part before " - ")
    const getHeroName = (name) => {
      const fullName = name || '';
      const separatorIndex = fullName.indexOf(' - ');
      return separatorIndex === -1 ? fullName : fullName.substring(0, separatorIndex);
    };
    const aHero = getHeroName(a.name);
    const bHero = getHeroName(b.name);
    const heroCompare = aHero.localeCompare(bHero);
    if (heroCompare !== 0) return heroCompare;

    // 3. Sort by cost (numerical)
    const aCost = a.cost || 0;
    const bCost = b.cost || 0;
    if (aCost !== bCost) return aCost - bCost;

    // 4. Final tiebreaker: full card name
    return (a.name || '').localeCompare(b.name || '');
  });
}

function sortPlayedCards() {
  if (!cardsPlayedThisTurn || cardsPlayedThisTurn.length < 2) return;

  const colorOrder = {
    'Grey': 1,
    'GreyVillain': 2,  // New category for grey villain heroes
    'Green': 3,
    'Yellow': 4,
    'Red': 5,
    'Black': 6,
    'Blue': 7
  };

  cardsPlayedThisTurn.sort((a, b) => {
    // Determine color category (modified for grey villains)
    const getColorCategory = (card) => {
      const color = card.color || '';
      if (color === 'Grey' && card.wasAVillain === true) {
        return 'GreyVillain';
      }
      return color;
    };

    // 1. Sort by modified color order
    const aColorCat = getColorCategory(a);
    const bColorCat = getColorCategory(b);
    const aColorRank = colorOrder[aColorCat] || 8;  // Increased from 7 to 8
    const bColorRank = colorOrder[bColorCat] || 8;
    if (aColorRank !== bColorRank) return aColorRank - bColorRank;

    // 2. Sort by hero name (part before " - ")
    const getHeroName = (name) => {
      const fullName = name || '';
      const separatorIndex = fullName.indexOf(' - ');
      return separatorIndex === -1 ? fullName : fullName.substring(0, separatorIndex);
    };
    const aHero = getHeroName(a.name);
    const bHero = getHeroName(b.name);
    const heroCompare = aHero.localeCompare(bHero);
    if (heroCompare !== 0) return heroCompare;

    // 3. Sort by cost (numerical)
    const aCost = a.cost || 0;
    const bCost = b.cost || 0;
    if (aCost !== bCost) return aCost - bCost;

    // 4. Final tiebreaker: full card name
    return (a.name || '').localeCompare(b.name || '');
  });

  updateGameBoard();
}


document.getElementById('confirm-actions').addEventListener('click', confirmActions);

function confirmActions() {
    const cardsToPlay = selectedCards.map(index => playerHand[index]);
    cardsToPlay.reduce((promiseChain, card) => {
        return promiseChain.then(() => {
            if (card.keyword1 === 'Teleport' || card.keyword2 === 'Teleport' || card.keyword3 === 'Teleport') {
                playOrTeleport(card);
                addHRToTopWithInnerHTML(); // HR for Teleport
                return;
            }

            cardsPlayedThisTurn.push(card);

            const cardIndex = playerHand.indexOf(card);
            if (cardIndex > -1) {
                playerHand.splice(cardIndex, 1);
            }

            totalAttackPoints += card.attack || 0;
            totalRecruitPoints += card.recruit || 0;

            cumulativeAttackPoints += card.attack || 0;
            cumulativeRecruitPoints += card.recruit || 0;

            console.log('Confirm Actions Called:', card);

            // Handle unconditional ability
            let abilityPromise = Promise.resolve();
            if (card.unconditionalAbility && card.unconditionalAbility !== "None") {
                const abilityFunction = window[card.unconditionalAbility];
                if (typeof abilityFunction === 'function') {
                    // Wrap the result in a Promise if it isn't one
                    abilityPromise = new Promise((resolve, reject) => {
                        try {
                            const result = abilityFunction(card);
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
                                        const result = conditionalAbilityFunction(card);
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
                                    `DO YOU WISH TO ACTIVATE <span class="console-highlights">${card.name}</span><span class="bold-spans">'s</span> ability?`,
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
                                            const result = conditionalAbilityFunction(card);
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
                                    onscreenConsole.log(`You have chosen not to activate <span class="console-highlights">${card.name}</span><span class="bold-spans">'s</span> ability.`);
                                    hideHeroAbilityMayPopup();
                                    document.getElementById('heroAbilityHoverText').style.display = 'block';
                                    resolve();
                                };
                            });
                        }
                    } else {
                        console.log(`Unable to use ability.`);
                    }
                }
            }).then(() => {
                // ADD HR AFTER EACH CARD'S ABILITIES COMPLETE (both unconditional and conditional)
                addHRToTopWithInnerHTML();
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
const requiredTypes = condition.split('&');
const typeCounts = [];
requiredTypes.forEach(type => {typeCounts[type] = (typeCounts[type] || 0) + 1;
});

return Object.entries(typeCounts).every(([type, requiredCount]) => {
const actualCount = previousCards.filter(playedCard => 
playedCard.class1 === type || playedCard.class2 === type || playedCard.team === type
).length;
return actualCount >= requiredCount;
});
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

function hideRevealedCards() {
    const deckNames = [
        'playerDeck', 'heroDeck', 'villainDeck', 'shieldDeck', 'woundDeck',
        'victoryPile', 'playerDiscardPile', 'cardsPlayedThisTurn', 'playerHand',
        'escapedVillainsDeck', 'koPile', 'capturedCardsDeck', 'hq', 'city',
        'demonGoblinDeck', 'mastermindDeck', 'bystanderDeck', 'sidekickDeck'
    ];
    
    deckNames.forEach(deckName => {
        if (Array.isArray(this[deckName])) {
            this[deckName].forEach(card => {
                if (card && card.revealed === true) {
                    card.revealed = false;
                }
            });
        }
    });
}

async function endTurn() {

document.getElementById('end-turn').innerHTML = `<span class="game-board-bottom-row">END TURN</span>`;

updateDeckCounts();

hideRevealedCards();

if (lastTurn === true) {
await showWinPopup()
if (gameIsOver) return;
} 

if (heroDeckHasRunOut === true && !delayEndGame) {
    await showDrawPopup();
    if (gameIsOver) return;
}

onscreenConsole.log("Turn ended.");
turnCount += 1;

onscreenConsole.log(`<span class="console-highlights" style="text-decoration:underline;">Turn&nbsp;</span><span class="console-highlights" style="text-decoration:underline;">${turnCount}</span><span class="console-highlights" style="text-decoration:underline;">:</span>`);

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

    // If the card is marked to destroy, remove it
    if (card.markedToDestroy === true || card.markedToDrawNextTurn === true) {
        cardsPlayedThisTurn.splice(i, 1);
        console.log(`${card.name} was destroyed (markedToDestroy).`);
        continue; // Skip any further logic for this card
    }

        if (card.temporaryTeleport === true) {
        delete card.temporaryTeleport;
        card.keyword3 = "None";
    }

    // Handle sidekickToDestroy logic
    if (card.hasOwnProperty('sidekickToDestroy')) {
        if (card.sidekickToDestroy === true) {
            cardsPlayedThisTurn.splice(i, 1);
            console.log(`${card.name} was destroyed (sidekickToDestroy).`);
        } else {
            playerDiscardPile.push(card);
        }
    } else {
        playerDiscardPile.push(card);
    }
}

for (let i = playerDiscardPile.length - 1; i >= 0; i--) {
    const card = playerDiscardPile[i];

    // If the card is marked to destroy, remove it
    if (card.markedToDrawNextTurn === true) {
        playerDiscardPile.splice(i, 1);
        console.log(`${card.name} was destroyed (markedToDestroy).`);
    }
}

for (let i = koPile.length - 1; i >= 0; i--) {
    const card = koPile[i];

    // If the card is marked to destroy, remove it
    if (card.markedToDrawNextTurn === true) {
        koPile.splice(i, 1);
        console.log(`${card.name} was destroyed (markedToDestroy).`);
    }
}

for (let i = victoryPile.length - 1; i >= 0; i--) {
    const card = victoryPile[i];

    // If the card is marked to destroy, remove it
    if (card.markedToDrawNextTurn === true) {
        victoryPile.splice(i, 1);
        console.log(`${card.name} was destroyed (markedToDestroy).`);
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
jeanGreyBystanderRecruit = 0;
jeanGreyBystanderDraw = 0;
jeanGreyBystanderAttack = 0;
sewerRooftopDefeats = false;
sewerRooftopBonusRecruit = 0;
twoRecruitFromKO = 0;
hasProfessorXMindControl = false;
trueVersatility = false;
secondDocOc = false;
deadpoolRare = false;
schemeTwistChainDepth = 0;  // Tracks nested Scheme Twists
pendingHeroKO = false; 

playerHand.forEach(card => {
    if (card.temporaryTeleport === true) {
        delete card.temporaryTeleport;
        card.keyword3 = "None";
    }
});

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

sortPlayerCards();

    healingPossible = true;
    updateGameBoard();
    drawVillainCard();
nextTurnsDraw = 6;
cardsToBeDrawnNextTurn = [];
delayEndGame = false;
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
    }, 600);
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
            return cardsYouHave.some(heroCard =>
                heroCard[conditionType] === condition
            );
        
        case 'villainInVP':
            return victoryPile.some(villain =>
                villain[conditionType] === condition
            );

        case 'fourDifferentNames': {
            const uniqueNames = new Set();
            for (const card of cardsYouHave) {
                if (card?.name) {
                    uniqueNames.add(card.name);
                    if (uniqueNames.size >= 4) return true;
                }
            }
            return uniqueNames.size >= 4;
        }

        case 'zeroCostCards': {
            // Count how many cards have cost === 0
            const zeroCostCount = playerHand.reduce((count, card) => {
                return count + (card.cost === 0 ? 1 : 0);
            }, 0);
            
            return zeroCostCount >= 3;
        }

        default:
            console.warn(`Unknown fight condition: ${fightCondition}`);
            return false;
    }
}

function showAttackButton(cityIndex) {
    const villainCard = city[cityIndex];
    if (!villainCard) {
        return;
    }

    const cityCell = document.querySelector(`#city-${cityIndex + 1}`);
    if (!cityCell) return;

    // Calculate attack synchronously first
    const selectedScheme = getSelectedScheme(); // Extract this to a function
    const villainAttack = recalculateVillainAttack(villainCard);

     if (villainAttack < 0) {
        villainAttack = 0;
    }

    // Check fight condition synchronously
    if (villainCard.fightCondition && 
        villainCard.fightCondition !== "None" && 
        !isVillainConditionMet(villainCard)) {
        onscreenConsole.log(`Fight condition not met for <span class="console-highlights">${villainCard.name}</span>.`);
        return;
    }

       // Check if the player has enough attack points
    let playerAttackPoints = totalAttackPoints;
    if (recruitUsedToAttack === true) {
        playerAttackPoints += totalRecruitPoints;
    }

    if (villainCard.keyword1 === "Bribe" || villainCard.keyword2 === "Bribe" || villainCard.keyword3 === "Bribe") {
        playerAttackPoints += totalRecruitPoints;
    }

    if (playerAttackPoints >= villainAttack) {
        // Create or update the attack button
        let attackButton = cityCell.querySelector('.attack-button');
        if (!attackButton) {
            attackButton = document.createElement('div');
            attackButton.classList.add('attack-button');
            cityCell.appendChild(attackButton);
        }

        // Update the button text and style
        attackButton.innerHTML = `<span style="filter: drop-shadow(0vh 0vh 0.3vh black);"><img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="overlay-attack-icons"</span>`;
        attackButton.style.display = 'block';

        // Handle button click with proper async/await and error handling
        attackButton.onclick = async function() {
            attackButton.style.display = 'none'; // Hide the button after attack
            healingPossible = false;
            
            try {
                confirmAttack(cityIndex);
            } catch (error) {
                console.error("Attack failed:", error);
                // Optional: Show error message to player
                // onscreenConsole.log(`Attack failed: ${error.message}`);
            } finally {
                updateGameBoard();
            }
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
        if (recruitUsedToAttack === "true" || villainCard.keyword1 === "Bribe" || villainCard.keyword2 === "Bribe" || villainCard.keyword3 === "Bribe") {
            onscreenConsole.log(`You need ${villainAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and/or <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to defeat <span class="console-highlights">${villainCard.name}</span>.`);
    } else {
        onscreenConsole.log(`You need ${villainAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to defeat <span class="console-highlights">${villainCard.name}</span>.`);
    }
}
}

function recalculateVillainAttack(villainCard) {
    // Extreme defensive checks
    if (!villainCard || 
        typeof villainCard !== 'object' || 
        villainCard === null || 
        Array.isArray(villainCard)) {
        console.warn('Invalid villainCard in recalculateVillainAttack:', villainCard);
        return 0;
    }

    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked')?.value;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    // Safely get attack value with multiple fallbacks
    const attackValue = ('attack' in villainCard) ? villainCard.attack :
                      ('originalAttack' in villainCard) ? villainCard.originalAttack :
                      0;

    let finalAttack = attackValue;

    // Only calculate buffs if we can verify the card is in city
    try {
        const cityIndex = city.findIndex(card => card === villainCard);
        if (cityIndex !== -1) {
            const tempBuff = window[`city${cityIndex + 1}TempBuff`] || 0;
            const permBuff = window[`city${cityIndex + 1}PermBuff`] || 0;
            const shattered = villainCard.shattered || 0;
            finalAttack += tempBuff + permBuff - shattered;
        }
    } catch (e) {
        console.warn('Buff calculation error:', e);
    }

    // Midtown Bank Robbery - safe property access
    try {
        if (selectedScheme?.name === 'Midtown Bank Robbery' && 
            Array.isArray(villainCard?.bystander)) {
            finalAttack += villainCard.bystander.length;
        }
    } catch (e) {
        console.warn('Scheme bonus error:', e);
    }

    try {
        if (selectedScheme?.name === `X-Cutioner's Song` && 
            Array.isArray(villainCard?.XCutionerHeroes)) {
            finalAttack += villainCard.XCutionerHeroes.length * 2;
        }
    } catch (e) {
        console.warn('Scheme bonus error:', e);
    }

    try {
        if (selectedScheme?.name === 'Steal the Weaponized Plutonium' && 
            Array.isArray(villainCard?.plutoniumCaptured)) {
            finalAttack += villainCard.plutoniumCaptured.length;
        }
    } catch (e) {
        console.warn('Scheme bonus error:', e);
    }

    if (villainCard.bonusBystanderAttack > 0 && 
            Array.isArray(villainCard?.bystander)) {
        finalAttack += villainCard.bonusBystanderAttack * villainCard.bystander.length;
    }

    // Killbot special case
    if (villainCard.killbot === true && typeof killbotAttack === 'number') {
        finalAttack += killbotAttack;
    }

    return Math.max(0, finalAttack);
}

async function confirmAttack(cityIndex) {
playAttackSound();
    // Get fresh references
    const villainCard = city[cityIndex];
    if (!villainCard) {
        console.error('Villain disappeared during attack');
        onscreenConsole.log(`Error: Villain could not be targeted.`);
        return;
    }

    // Store location and make copy
    currentVillainLocation = cityIndex;
    const villainCopy = createVillainCopy(villainCard);
    const villainAttack = recalculateVillainAttack(villainCard);

// Handle point deduction
    try {
        if (recruitUsedToAttack === true || villainCard.keyword1 === "Bribe" || villainCard.keyword2 === "Bribe" || villainCard.keyword3 === "Bribe") {
            const result = await showCounterPopup(villainCopy, villainAttack);
            totalAttackPoints -= result.attackUsed || 0;
            totalRecruitPoints -= result.recruitUsed || 0;
            onscreenConsole.log(`You chose to use ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points to attack <span class="console-highlights">${villainCopy.name}</span>.`);
        } else {
            totalAttackPoints -= villainAttack;
        }
    } catch (error) {
        console.error('Error handling point deduction:', error);
    }

     const operations = await collectDefeatOperations(villainCopy);

    // Let player choose order if there are multiple operations
    if (operations.length > 1) {
        await executeOperationsInPlayerOrder(operations, villainCopy);
    } else if (operations.length === 1) {
        await operations[0].execute();
    }
    
    // Continue with post-defeat logic
    await handlePostDefeat(villainCard, villainCopy, villainAttack, cityIndex);
}

// Helper function to create a deep copy of villain data
function createVillainCopy(villainCard) {
    return {
        id: villainCard.id,
            name: villainCard.name,
            type: villainCard.type,
            rarity: villainCard.rarity,
            team: villainCard.team,
            class1: villainCard.class1,
            class2: villainCard.class2,
            color: villainCard.color,
            cost: villainCard.cost,
            attack: villainCard.attack,
            recruit: villainCard.recruit,
            attackIcon: villainCard.attackIcon,
            recruitIcon: villainCard.recruitIcon,
            bonusAttack: villainCard.bonusAttack,
            bonusRecruit: villainCard.bonusRecruit,
            multiplier: villainCard.multiplier,
            multiplierAttribute: villainCard.multiplierAttribute,
            multiplierLocation: villainCard.multiplierLocation,
            unconditionalAbility: villainCard.unconditionalAbility,
            conditionalAbility: villainCard.conditionalAbility,
            conditionType: villainCard.conditionType,
            condition: villainCard.condition,
            invulnerability: villainCard.invulnerability,
            image: villainCard.image,

        
        originalAttack: villainCard.originalAttack,
        bystander: [...(villainCard.bystander || [])],
        fightEffect: villainCard.fightEffect,
        shattered: villainCard.shattered,
        fightCondition: villainCard.fightCondition,
        captureCode: villainCard.captureCode,
		alwaysLeads: villainCard.alwaysLeads
    };
}

async function collectDefeatOperations(villainCopy) {
    const operations = [];

    // Add bystander rescues as individual operations
    if (Array.isArray(villainCopy.bystander)) {
        villainCopy.bystander.forEach(bystander => {
            if (bystander) {
                operations.push({
                    name: `Rescue ${bystander.name}`,
                    image: bystander.image,
                    execute: async () => {
			onscreenConsole.log(`<span class="console-highlights">${bystander.name}</span> rescued.`);
                        victoryPile.push(bystander);
                        bystanderBonuses();
                        await rescueBystanderAbility(bystander);
                    }
                });
            }
        });
    }

    // Add fight effect if present (player can choose when this happens)
    if (villainCopy.fightEffect && villainCopy.fightEffect !== "None") {
        const fightEffectFunction = window[villainCopy.fightEffect];
        if (typeof fightEffectFunction === 'function') {
            operations.push({
                name: `Trigger ${villainCopy.name}'s Fight Effect`,
                image: villainCopy.image,
                execute: async () => {
                    await fightEffectFunction(villainCopy);
                }
            });
        }
    }

    return operations;
}


async function executeOperationsInPlayerOrder(operations, villainCopy) {
    const remainingOperations = [...operations];
    
    while (remainingOperations.length > 0) {
        // For single operation left, just execute it
        if (remainingOperations.length === 1) {
            await remainingOperations[0].execute();
            break;
        }

        // Show popup for player to choose next rescue
        const choice = await showOperationSelectionPopup({
            title: 'Choose Order',
            instructions: 'Select next action to resolve:',
            items: remainingOperations,
            confirmText: 'CONFIRM SELECTION'
        });

        if (!choice) {
            // If player cancels, execute remaining in default order
            for (const op of remainingOperations) {
                await op.execute();
            }
            break;
        }

        // Execute selected rescue and remove from remaining
        const selectedIndex = remainingOperations.findIndex(op => op.name === choice.name);
        const [selectedOperation] = remainingOperations.splice(selectedIndex, 1);
        await selectedOperation.execute();
        updateGameBoard();
    }
}


async function showOperationSelectionPopup(options) {
    return new Promise((resolve) => {
        try {
            // Get the popup elements (reusing your existing popup structure)
            const popup = document.getElementById('card-choice-one-location-popup');
            const modalOverlay = document.getElementById('modal-overlay');
            const cardsList = document.getElementById('cards-to-choose-from');
            const confirmButton = document.getElementById('card-choice-confirm-button');
            const popupTitle = popup.querySelector('h2');
            const instructionsDiv = document.getElementById('context');
            const heroImage = document.getElementById('hero-one-location-image');
            const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

            // Initialize UI
            popupTitle.textContent = options.title || 'Choose Order';
            instructionsDiv.innerHTML = options.instructions || 'Select next action to resolve:';
            cardsList.innerHTML = '';
            confirmButton.style.display = 'inline-block';
            confirmButton.disabled = true;
            confirmButton.textContent = options.confirmText || 'CONFIRM';
            modalOverlay.style.display = 'block';
            popup.style.display = 'block';

            let selectedOperation = null;
            let activeImage = null;

            // Cleanup function
            const cleanup = () => {
                confirmButton.onclick = null;
                const listItems = cardsList.querySelectorAll('li');
                listItems.forEach(li => {
                    li.onmouseover = null;
                    li.onmouseout = null;
                    li.onclick = null;
                });
            };

            // Update the confirm button state
            function updateConfirmButton() {
                confirmButton.disabled = selectedOperation === null;
            }

            // Update instructions with styled selection
            function updateInstructions() {
                if (selectedOperation === null) {
                    instructionsDiv.innerHTML = options.instructions || 'Select next action to resolve:';
                } else {
                    instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedOperation.name}</span> will be resolved next.`;
                }
            }

            // Show operation image
            function updateOperationImage(operation) {
                if (operation) {
                    heroImage.src = operation.image;
                    heroImage.style.display = 'block';
                    oneChoiceHoverText.style.display = 'none';
                    activeImage = operation.image;
                } else {
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    oneChoiceHoverText.style.display = 'block';
                    activeImage = null;
                }
            }

            // Toggle operation selection
            function toggleOperationSelection(operation, listItem) {
                if (selectedOperation === operation) {
                    // Deselect if same operation clicked
                    selectedOperation = null;
                    listItem.classList.remove('selected');
                    updateOperationImage(null);
                } else {
                    // Clear previous selection if any
                    if (selectedOperation) {
                        const prevListItem = document.querySelector('li.selected');
                        if (prevListItem) prevListItem.classList.remove('selected');
                    }
                    // Select new operation
                    selectedOperation = operation;
                    listItem.classList.add('selected');
                    updateOperationImage(operation);
                }

                updateConfirmButton();
                updateInstructions();
            }

            // Populate the list with available operations
            options.items.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = item.name;
                li.setAttribute('data-operation-id', index);

                li.onmouseover = () => {
                    if (!activeImage) {
                        heroImage.src = item.image;
                        heroImage.style.display = 'block';
                        oneChoiceHoverText.style.display = 'none';
                    }
                };

                li.onmouseout = () => {
                    if (!activeImage) {
                        heroImage.src = '';
                        heroImage.style.display = 'none';
                        oneChoiceHoverText.style.display = 'block';
                    }
                };

                li.onclick = () => toggleOperationSelection(item, li);

                cardsList.appendChild(li);
            });

            // Handle confirmation
            confirmButton.onclick = async () => {
                if (selectedOperation) {
                    try {
                        closePopup();
                        cleanup();
                        resolve(selectedOperation);
                    } catch (error) {
                        cleanup();
                        throw error;
                    }
                }
            };

            function closePopup() {
                // Reset UI
                popupTitle.textContent = 'Hero Ability!';
                instructionsDiv.textContent = 'Context';
                cardsList.innerHTML = '';
                confirmButton.style.display = 'none';
                confirmButton.disabled = true;
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;

                // Hide popup
                popup.style.display = 'none';
                modalOverlay.style.display = 'none';
            }

            // Close popup when clicking outside (optional)
            modalOverlay.onclick = () => {
                closePopup();
                cleanup();
                resolve(null);
            };

        } catch (error) {
            console.error('Error in operation selection popup:', error);
            resolve(null);
        }
    });
}

async function handlePostDefeat(villainCard, villainCopy, villainAttack, cityIndex) {
    // Handle Baby Hope first (moved back here from operations)
    if (villainCard.babyHope === true) {
        delete villainCard.babyHope;
        villainCard.attack = villainCard.originalAttack;
        const BabyHopeCard = { 
            name: "Baby Hope", 
            type: "Baby", 
            victoryPoints: 6, 
            image: 'Visual Assets/Other/babyHope.webp'
        };
        victoryPile.push(BabyHopeCard);
        updateGameBoard();
    }

    // Rest of the post-defeat handling remains the same
    if (villainCard.plutoniumCaptured && villainCard.plutoniumCaptured.length > 0) {
        for (const plutonium of villainCard.plutoniumCaptured) {
            villainDeck.push(plutonium);
        }
        villainCard.plutoniumCaptured = [];
        shuffle(villainDeck);
        onscreenConsole.log(`Plutonium from <span class="console-highlights">${villainCard.name}</span> shuffled back into Villain Deck.`);
    }

    // Handle XCutioner Heroes
    if (villainCard.XCutionerHeroes && villainCard.XCutionerHeroes.length > 0) {
        for (const hero of villainCard.XCutionerHeroes) {
            playerDiscardPile.push(hero);
        }
        villainCard.XCutionerHeroes = [];
        onscreenConsole.log(`You have rescued <span class="console-highlights">${hero.name}</span>. They have been added to your Discard pile.`);
    }

    // Handle extra bystanders
    if (rescueExtraBystanders > 0) {
        for (let i = 0; i < rescueExtraBystanders; i++) {
            rescueBystander();
        }
    }

    // Add villain to victory pile
    victoryPile.push(villainCard);
   onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been defeated.`);
if (villainCard.killbot === true) {
bystanderBonuses();
}
addHRToTopWithInnerHTML();
 
    city[cityIndex] = null;

    // Handle location bonuses
    try {
        if (sewerRooftopDefeats && (cityIndex === 2 || cityIndex === 4)) {
            onscreenConsole.log(`You defeated <span class="console-highlights">${villainCard.name}</span> ${cityIndex === 4 ? 'in the Sewers' : 'on the Rooftops'}. Drawing two cards.`);
            extraDraw();
            extraDraw();
        }

        if (sewerRooftopBonusRecruit > 0 && (cityIndex === 2 || cityIndex === 4)) {
            onscreenConsole.log(`You defeated <span class="console-highlights">${villainCard.name}</span> ${cityIndex === 4 ? 'in the Sewers' : 'on the Rooftops'}. +${sewerRooftopBonusRecruit}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> gained.`);
            totalRecruitPoints += sewerRooftopBonusRecruit;
            cumulativeRecruitPoints += sewerRooftopBonusRecruit;
        }
    } catch (error) {
        console.error('Error processing location bonuses:', error);
    }

    // Handle Professor X Mind Control
    if (hasProfessorXMindControl) {
        try {
            await handleMindControlOption(villainCard);
        } catch (error) {
            console.error('Error in mind control popup:', error);
        }
    }

    // Final cleanup
    defeatBonuses();
    currentVillainLocation = null;
    updateGameBoard();
}


// Handle Professor X Mind Control option
async function handleMindControlOption(villainCard) {
    return new Promise((resolve) => {
        const { confirmButton, denyButton } = showHeroAbilityMayPopup(
            "DO YOU WISH TO GAIN THIS VILLAIN?",
            "GAIN AS A HERO",
            "NO THANKS!"
        );

        document.getElementById('heroAbilityHoverText').style.display = 'none';

        const cardImage = document.getElementById('hero-ability-may-card');
        cardImage.src = 'Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_MindControl.webp';
        cardImage.style.display = 'block';

        confirmButton.onclick = () => {
            const cardCopy = JSON.parse(JSON.stringify(villainCard));
            cardCopy.type = "Hero";
            cardCopy.color = "Grey";
            cardCopy.cost = villainCard.attack;
            cardCopy.keyword1 = "None";
            cardCopy.keyword2 = "None";
            cardCopy.keyword3 = "None";
            cardCopy.wasAVillain = true;
            
            playerDiscardPile.push(cardCopy);
            
            onscreenConsole.log(`You have chosen to add <span class="console-highlights">${villainCard.name}</span> to your discard pile as a grey Hero.`);
            updateGameBoard();
            
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            resolve(true);
        };

        denyButton.onclick = () => {
            onscreenConsole.log(`You declined to copy ${villainCard.name}.`);
            hideHeroAbilityMayPopup();
            document.getElementById('heroAbilityHoverText').style.display = 'block';
            resolve(false);
        };
    });
}


// Helper function
function getSelectedScheme() {
    const schemeName = document.querySelector('#scheme-section input[type=radio]:checked')?.value;
    return schemes.find(s => s.name === schemeName);
}

function showHeroKOPopup() {
    return new Promise((resolve) => {
        const heroKOPopup = document.getElementById('hero-KO-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const heroOptions = document.getElementById('hero-KO-options');
        const heroImage = document.getElementById('hero-ko-image');
        const hoverText = document.getElementById('KOHoverText');
        const confirmButton = document.createElement('button'); // Create confirm button dynamically
        confirmButton.id = 'hero-KO-confirm';
        confirmButton.textContent = 'CONFIRM';
        confirmButton.style.display = 'inline-block'; // Show button immediately
        confirmButton.style.width = '50%';
        confirmButton.style.marginTop = '2vh';  // Fixed: margin-top becomes marginTop
        confirmButton.disabled = true; // Disabled by default
        heroImage.style.display = 'none';
        hoverText.style.display = 'block';

        heroOptions.innerHTML = ''; // Clear previous options
        let selectedHero = null;
        let activeImage = null;

        // Add confirm button to popup
        heroKOPopup.appendChild(confirmButton);

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
	const hqPosition = hq.indexOf(hero) + 1;
    
                const createTeamIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
    };

    const createClassIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
    };
    
    const teamIcon = createTeamIconHTML(hero.team);
    const class1Icon = createClassIconHTML(hero.class1);
    const class2Icon = createClassIconHTML(hero.class2);
    const class3Icon = createClassIconHTML(hero.class3);
    
    // Combine all icons
    const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
    
    heroButton.innerHTML = `<span style="white-space: nowrap;">HQ-${hqPosition} | ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${hero.name}</span>`;
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
            koHeroInHQ(selectedHero);
            
            // Cleanup
            heroKOPopup.removeChild(confirmButton);
            heroKOPopup.style.display = 'none';
            modalOverlay.style.display = 'none';
            
            requestAnimationFrame(() => {
                updateGameBoard();
                resolve();
            });
        };

        // Show popup
        modalOverlay.style.display = 'block';
        heroKOPopup.style.display = 'block';
    });
}


function koHeroInHQ(index) {
    const hero = hq[index];
    if (!hero) return;

    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const scheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    if (scheme.name === 'Detonate the Helicarrier') {
        // Special handling for Detonate the Helicarrier
        deleteHeroFromHQ(index);
        
        // Update the correct explosion counter
        switch(index) {
            case 0: hqExplosion1++; break;
            case 1: hqExplosion2++; break;
            case 2: hqExplosion3++; break;
            case 3: hqExplosion4++; break;
            case 4: hqExplosion5++; break;
        }
        
        // Get current explosion count
        const currentExplosions = [hqExplosion1, hqExplosion2, hqExplosion3, hqExplosion4, hqExplosion5][index];
        
        // Only refill if we haven't reached 6 explosions
        if (currentExplosions < 6) {
            const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
            hq[index] = newCard;
            
        if (newCard) {
                onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd during a Helicarrier explosion.`);
                onscreenConsole.log(`<span class="console-highlights">${newCard.name}</span> has entered the HQ.`);
            } else {
                onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd during a Helicarrier explosion.`);
            }
        } else {
            onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd during a Helicarrier explosion. This HQ space has been Destroyed.`);
            hq[index] = null; // Ensure the slot is empty
        }
        
    } else {
        // Normal KO handling (unchanged)
        koPile.push(hero);
        const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
        hq[index] = newCard;
        
        if (newCard) {
            onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd.`);
            onscreenConsole.log(`<span class="console-highlights">${newCard.name}</span> has entered the HQ.`);
        } else {
            onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> has been KO'd.`);
        }
    }
    
    updateGameBoard();

    if (!hq[index] && heroDeck.length === 0) {
        showDrawPopup();
    }
}

// Helper function to properly remove a hero from HQ
function deleteHeroFromHQ(index) {
    // This might need to be more sophisticated depending on your game's architecture
    hq[index] = null;
    // Add any other cleanup needed for your specific game implementation
}

function showDiscardCardPopup() {

    if (playerHand.length === 0) {
        onscreenConsole.log(`You have no cards available to discard.`);
        return;
    }
    
    return new Promise((resolve, reject) => {
        const discardPopup = document.getElementById('discard-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const discardOptions = document.querySelector('.discard-buttons');
        const discardImagePlaceholder = document.querySelector('.discard-image');
        discardOptions.innerHTML = ''; // Clear previous options

const discardImage = document.getElementById('discard-card-image'); // Reference to the img element
const discardHoverText = document.getElementById('discard-card-popupHoverText');

 
genericCardSort(playerHand);

        playerHand.forEach((card, index) => {
            const cardButton = document.createElement('button');
                const createTeamIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
    };

    const createClassIconHTML = (value) => {
        if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
            return '';
        }
        return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
    };
    
    const teamIcon = createTeamIconHTML(card.team);
    const class1Icon = createClassIconHTML(card.class1);
    const class2Icon = createClassIconHTML(card.class2);
    const class3Icon = createClassIconHTML(card.class3);
    
    // Combine all icons
    const allIcons = teamIcon + class1Icon + class2Icon + class3Icon;
    
    cardButton.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;
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

document.getElementById('healing-button').addEventListener('click', async () => {
console.log("Healing Button Clicked");
    await showHealingPopup();
    healWounds();
});

function healWounds() {
console.log('Healing Wounds...');
onscreenConsole.log('<span style="font-style:italic;">Healing Wounds...</span>');
    let index = 0;
    while (index < playerHand.length) {
        const card = playerHand[index];
        if (card.name === "Wound") {
            koPile.push(card);
            koBonuses();
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

    } else {
        healWoundsButton.disabled = true; // Disable the button

    }
}

function showHealingPopup() {
    return new Promise((resolve) => {
        const healingPopup = document.getElementById('healing-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const healingPopupCard = document.getElementById('healing-popup-card');

        // Show the popup and overlay
        healingPopup.style.display = 'block';
        modalOverlay.style.display = 'block';
        healingPopupCard.style.opacity = '1';

        console.log('Showing Healing Popup');

        // Start fade out after 100ms
        setTimeout(() => {
            healingPopupCard.style.opacity = '0';
        }, 100);

        // Hide popup and resolve promise after 2000ms
        setTimeout(() => {
            healingPopup.style.display = 'none';
            modalOverlay.style.display = 'none';
            resolve(); // This tells the await that we're done
        }, 2000);
    });
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

const handleMastermindClick = () => {
    let mastermind = getSelectedMastermind();
    let mastermindAttack = recalculateMastermindAttack(mastermind);
    let playerAttackPoints = totalAttackPoints;

    // Calculate effective attack points considering recruit usage and Bribe
    if (recruitUsedToAttack === true) {
        playerAttackPoints += totalRecruitPoints;
    }

    // Check for Bribe keyword on Mastermind or its tactics
    const hasBribeKeyword = mastermind.keyword1 === "Bribe" || 
                           mastermind.keyword2 === "Bribe" || 
                           mastermind.keyword3 === "Bribe";

    if (hasBribeKeyword) {
        playerAttackPoints += totalRecruitPoints;
    }

    // Handle different attack scenarios
    if (mastermind.tactics.length === 0) {
        const defeatedMasterminds = victoryPile.filter(card => card.type === "Mastermind");
        
       if (finalBlowEnabled === true && defeatedMasterminds.length < 5) {
    if (playerAttackPoints >= mastermindAttack) {
        showMastermindAttackButton();
        onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> has no tactics remaining - deliver the Final Blow!`);
    } else {
        onscreenConsole.log(`You need ${mastermindAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to deliver the Final Blow to <span class="console-highlights">${mastermind.name}</span>.`);
    }
} else {
    onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> has been defeated! Finish your turn to win.`);
}
} else if (playerAttackPoints >= mastermindAttack) {
    showMastermindAttackButton();
} else {
    onscreenConsole.log(`You need ${mastermindAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to defeat <span class="console-highlights">${mastermind.name}</span>.`);
}
};
// Add the initial listener
document.getElementById('mastermind').addEventListener('click', handleMastermindClick);



function showMastermindAttackButton() {
    let mastermind = getSelectedMastermind();
    const mastermindAttackButton = document.getElementById('mastermind-attack-button');
    let mastermindAttack = recalculateMastermindAttack(mastermind);

    mastermindAttackButton.style.display = 'block';
    
    const handleClickOutside = (event) => {
        if (!mastermindAttackButton.contains(event.target)) {
            mastermindAttackButton.style.display = 'none';
            document.removeEventListener('click', handleClickOutside);
        }
    };

    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 0);

    // Make the click handler async
    mastermindAttackButton.onclick = async () => {
        isAttacking = true;
        mastermindAttackButton.style.display = 'none';
        healingPossible = false;
        
        try {
            confirmMastermindAttack();
        } catch (error) {
            console.error("Attack failed:", error);
            // Show error message to player if needed
            onscreenConsole.log(`<span class="console-error">Attack failed: ${error.message}</span>`);
        } finally {
            updateGameBoard();
            isAttacking = false;
            document.removeEventListener('click', handleClickOutside);
        }
    };
}

async function confirmMastermindAttack() {
playAttackSound();
    try {
        const mastermind = getSelectedMastermind();
        healingPossible = false;
        const mastermindAttack = recalculateMastermindAttack(mastermind);

        // Handle doom delay logic
        if (doomDelayEndGameFinalBlow) {
            delayEndGame = (mastermindDefeatTurn === turnCount);
        }

        // Create a copy of the mastermind data
        const mastermindCopy = createMastermindCopy(mastermind);

        // Collect all possible operations
        const operations = await collectMastermindRescueOperations(mastermindCopy);

        // Execute operations in player-chosen order if needed
        if (operations.length > 1) {
            await executeOperationsInPlayerOrder(operations, mastermindCopy);
        } else if (operations.length === 1) {
            await operations[0].execute();
        }

        // Handle common post-defeat logic
        await handleMastermindPostDefeat(mastermind, mastermindCopy, mastermindAttack);
    } catch (error) {
        console.error("Mastermind attack error:", error);
        throw error;
    }
}

function createMastermindCopy(mastermind) {
    return {
        ...mastermind,
        bystanders: [...(mastermind.bystanders || [])],
        XCutionerHeroes: [...(mastermind.XCutionerHeroes || [])]
    };
}

async function collectMastermindRescueOperations(mastermindCopy) {
    const operations = [];

    // Add bystander rescues as individual operations
    if (Array.isArray(mastermindCopy.bystanders)) {
        mastermindCopy.bystanders.forEach(bystander => {
            if (bystander) {
                operations.push({
                    name: `Rescue ${bystander.name}`,
                    image: bystander.image,
                    execute: async () => {
                        victoryPile.push(bystander);
                        bystanderBonuses();
                        await rescueBystanderAbility(bystander);
                    }
                });
            }
        });
    }

    // Add XCutioner heroes rescue as one operation
    if (mastermindCopy.XCutionerHeroes && mastermindCopy.XCutionerHeroes.length > 0) {
        operations.push({
            name: `Rescue XCutioner Heroes`,
            image: 'Visual Assets/Icons/Recruit.svg', // Or use a specific image
            execute: async () => {
                for (const hero of mastermindCopy.XCutionerHeroes) {
                    playerDiscardPile.push(hero);
                    onscreenConsole.log(`You have rescued <span class="console-highlights">${hero.name}</span>. They have been added to your Discard pile.`);
                }
                mastermindCopy.XCutionerHeroes = [];
            }
        });
    }

    return operations;
}

async function handleMastermindPostDefeat(mastermind, mastermindCopy, mastermindAttack) {
    const hasBribeKeyword = mastermind.keyword1 === "Bribe" || 
                          mastermind.keyword2 === "Bribe" || 
                          mastermind.keyword3 === "Bribe";

    // Handle point deduction
    if (recruitUsedToAttack || hasBribeKeyword) {
        const result = await showCounterPopup(mastermind, mastermindAttack);
        totalAttackPoints -= result.attackUsed;
        totalRecruitPoints -= result.recruitUsed;
        onscreenConsole.log(`You chose to use ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points`);
    } else {
        totalAttackPoints -= mastermindAttack;
    }

    // Handle extra bystanders
    if (rescueExtraBystanders > 0) {
        for (let i = 0; i < rescueExtraBystanders; i++) {
            rescueBystander();
        }
    }

    // Clear bystanders (they were already handled in operations)
    mastermind.bystanders = [];
    mastermind.XCutionerHeroes = [];

    // Apply defeat bonuses
    defeatBonuses();
    updateMastermindOverlay();
    updateGameBoard();

    onscreenConsole.log(`You attacked <span class="console-highlights">${mastermind.name}</span>. Revealing tactic now!`);

    // Check win condition
    if (mastermind.tactics.length === 0) {
        if (finalBlowEnabled) {
            const finalBlowCard = { 
                name: "Final Blow", 
                type: "Mastermind", 
                victoryPoints: mastermind.victoryPoints, 
                image: mastermind.image
            };
            victoryPile.push(finalBlowCard);
            updateGameBoard();
        }
        checkWinCondition();
    } else {
        revealMastermindTactic(mastermind);
    }
}


function revealMastermindTactic(mastermind) {
    const tacticCard = mastermind.tactics.pop();
    

    // Push the tactic to the victory pile
    victoryPile.push(tacticCard);
showTacticPopup(tacticCard);
updateGameBoard();

}

function showTacticPopup(tacticCard) {
    return new Promise((resolve) => {
        const popup = document.getElementById('tactic-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const resolveButton = document.getElementById('resolve-tactic');

const mastermind = getSelectedMastermind();

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
                onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> has ${mastermind.tactics.length} tactics remaining!`);
		addHRToTopWithInnerHTML(); 
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

async function showDrawPopup() {
if (delayEndGame) {
     onscreenConsole.log(`You would have drawn with your enemies, but you've already stopped the Mastermind. Finish your turn to finalise your victory!`);
    return;
}

    const drawPopup = document.getElementById('draw-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const drawText = document.getElementById('draw-context');
    drawPopup.style.display = 'block';
    modalOverlay.style.display = 'block';
playGameDrawSound();

    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

const mastermind = getSelectedMastermind();

document.getElementById('player-deck-card-back').addEventListener('click', openPlayerDeckPopup);
document.getElementById('hero-deck-card-back').addEventListener('click', openHeroDeckPopup);
document.getElementById('villain-deck-card-back').addEventListener('click', openVillainDeckPopup);
document.getElementById('wound-label').addEventListener('click', openWoundDeckPopup);
document.getElementById('sidekick-deck-card-back').addEventListener('click', openSidekickDeckPopup);
document.getElementById('shield-deck-card-back').addEventListener('click', openShieldDeckPopup);
document.getElementById('bystander-label').addEventListener('click', openBystanderDeckPopup);

// Then check Scheme end game conditions (if Mastermind conditions weren't met)
if (selectedScheme) {
    switch (selectedScheme.name) {
        case "Midtown Bank Robbery":
            drawText.innerHTML = `You've stopped the robbery at Midtown Bank, but ${mastermind.name} escaped before being caught.`;
            break;

        case "Negative Zone Prison Breakout":
            drawText.innerHTML = `You've stopped ${mastermind.name} from freeing more inmates, but they slipped away into the antimatter realm.`;
            break;

        case "Replace Earth's Leaders with Killbots":
            drawText.innerHTML = `The Killbot takeover has been stopped, but ${mastermind.name} escaped to plot their next attack.`;
            break;

        case "Secret Invasion of the Skrull Shapeshifters":
            drawText.innerHTML = `You've stopped more Heroes from being replaced, but ${mastermind.name} escaped with some Skrull agents still in hiding.`;
            break;

        case "Super Hero Civil War":
            drawText.innerHTML = `The civil war among Heroes has ended, but ${mastermind.name} escaped to stir division another day.`;
            break;

        case "The Legacy Virus":
            drawText.innerHTML = `You've stopped the Legacy Virus, but ${mastermind.name} escaped before justice could be served.`;
            break;

        case "Capture Baby Hope":
            drawText.innerHTML = `You've kept Hope out of ${mastermind.name}'s grasp for now, but they escaped to try again another day.`;
            break;

        case "Massive Earthquake Generator":
            drawText.innerHTML = `The earthquake generator has been shut down, but ${mastermind.name} escaped to rebuild their device.`;
            break;

        case "Organized Crime Wave":
            drawText.innerHTML = `The crime wave has been broken, but ${mastermind.name} escaped to rebuild their network.`;
            break;

        case "Save Humanity":
            drawText.innerHTML = `The plan to destroy humanity has been stopped, but ${mastermind.name} escaped to try again.`;
            break;

        case "Steal the Weaponized Plutonium":
            drawText.innerHTML = `The last of the stolen plutonium has been recovered, but ${mastermind.name} escaped with the plans to strike again.`;
            break;

        case "Transform Citizens Into Demons":
            drawText.innerHTML = `The demonic transformation has been halted, but ${mastermind.name} escaped to spread their corruption another day.`;
            break;

        case "X-Cutioner's Song":
            drawText.innerHTML = `The X-Cutioner's Song has been silenced, but ${mastermind.name} escaped with allies still loyal to their cause.`;
            break;
        
        default:
            drawText.innerHTML = ``;
            break;

        }
    }

    const totalVictoryPoints = calculateVictoryPoints(victoryPile);
    document.getElementById('villainDRAWvictoryPointsTotal').innerText = totalVictoryPoints;

    const totalTurnsTaken = turnCount;
    document.getElementById('villainDRAWtotalTurnsTaken').innerText = totalTurnsTaken;
   
const averageVPPerTurn = totalTurnsTaken > 0 
    ? Math.ceil((totalVictoryPoints / totalTurnsTaken) * 10) / 10 
    : 0.0;
document.getElementById('villainDRAWaverageVPPerTurn').innerText = averageVPPerTurn;

const numberOfEscapes = escapedVillainsDeck.filter(item => item.type !== 'Bystander').length;
document.getElementById('villainDRAWnumberOfEscapes').innerText = numberOfEscapes;

gameIsOver = true;
}

function closeDrawPopup() {
    const drawPopup = document.getElementById('draw-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    drawPopup.style.display = 'none';
    modalOverlay.style.display = 'none';
}

function returnHome() {
    location.reload();
}

function showDefeatPopup() {
if (finalBlowEnabled && victoryPile.filter(obj => obj.type === "Mastermind").length === 5) {
    onscreenConsole.log(`You would have been defeated, but you've already stopped the Mastermind. Finish your turn to finalise your victory!`);
    return;
}

if (!finalBlowEnabled && victoryPile.filter(obj => obj.type === "Mastermind").length === 4) {
    onscreenConsole.log(`You would have been defeated, but you've already stopped the Mastermind. Finish your turn to finalise your victory!`);
    return;
}

if (delayEndGame) {
     onscreenConsole.log(`You would have been defeated, but you've already stopped the Mastermind. Finish your turn to finalise your victory!`);
    return;
}

    const defeatPopup = document.getElementById('defeat-popup');
const modalOverlay = document.getElementById('modal-overlay');
    defeatPopup.style.display = 'block';
modalOverlay.style.display = 'block';
playLoseSound();

const totalVictoryPoints = calculateVictoryPoints(victoryPile);
    document.getElementById('LOSSvictoryPointsTotal').innerText = totalVictoryPoints;

    const totalTurnsTaken = turnCount;
    document.getElementById('LOSStotalTurnsTaken').innerText = totalTurnsTaken;
   
    const averageVPPerTurn = totalTurnsTaken > 0 
    ? (totalVictoryPoints / totalTurnsTaken).toFixed(1) 
    : "0.0"; // Handle division by zero case
document.getElementById('LOSSaverageVPPerTurn').innerText = averageVPPerTurn;

const numberOfEscapes = escapedVillainsDeck.filter(item => item.type !== 'Bystander').length;
document.getElementById('LOSSnumberOfEscapes').innerText = numberOfEscapes;

document.getElementById('player-deck-card-back').addEventListener('click', openPlayerDeckPopup);
document.getElementById('hero-deck-card-back').addEventListener('click', openHeroDeckPopup);
document.getElementById('villain-deck-card-back').addEventListener('click', openVillainDeckPopup);
document.getElementById('wound-label').addEventListener('click', openWoundDeckPopup);
document.getElementById('sidekick-deck-card-back').addEventListener('click', openSidekickDeckPopup);
document.getElementById('shield-deck-card-back').addEventListener('click', openShieldDeckPopup);
document.getElementById('bystander-label').addEventListener('click', openBystanderDeckPopup);


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

async function showWinPopup() {
if (delayEndGame) {
     onscreenConsole.log(`You've defeated the Mastermind but <span class="console-highlights">Dr Doom</span><span class="bold-spans">'s</span> final tactic gives you one last turn.`);
    delayedWin = true;
    return;
}

const winPopup = document.getElementById('win-popup');
const modalOverlay = document.getElementById('modal-overlay');

const winText = document.getElementById('win-context');

    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

const mastermind = getSelectedMastermind();

document.getElementById('player-deck-card-back').addEventListener('click', openPlayerDeckPopup);
document.getElementById('hero-deck-card-back').addEventListener('click', openHeroDeckPopup);
document.getElementById('villain-deck-card-back').addEventListener('click', openVillainDeckPopup);
document.getElementById('wound-label').addEventListener('click', openWoundDeckPopup);
document.getElementById('sidekick-deck-card-back').addEventListener('click', openSidekickDeckPopup);
document.getElementById('shield-deck-card-back').addEventListener('click', openShieldDeckPopup);
document.getElementById('bystander-label').addEventListener('click', openBystanderDeckPopup);

// Then check Scheme end game conditions (if Mastermind conditions weren't met)
if (selectedScheme) {
    switch (selectedScheme.name) {
        case "Midtown Bank Robbery":
            winText.innerHTML = `You've defeated ${mastermind.name} and recovered every last dollar stolen from Midtown Bank. The city is safe. Excellent work!`;
            break;

        case "Negative Zone Prison Breakout":
            winText.innerHTML = `You've stopped ${mastermind.name} from breaking prisoners out of the Negative Zone. All escaped inmates have been returned to their cells. Excellent work!`;
            break;

        case "Portals to the Dark Dimension":
            winText.innerHTML = `You've stopped ${mastermind.name} from opening any more gateways to the Dark Dimension. All Dark Portals have been sealed. Excellent work!`;
            break;

        case "Replace Earth's Leaders with Killbots":
            winText.innerHTML = `You've stopped ${mastermind.name} from unleashing Killbots on Earth's leadership. The threat is contained and global order is intact. Excellent work!`;
            break;

        case "Secret Invasion of the Skrull SHapeshifters":
            winText.innerHTML = `You've stopped ${mastermind.name} from replacing Earth's heroes with Skrull imposters. All abducted heroes have been freed and returned to the fight. Excellent work!`;
            break;

        case "Superhero Civil War":
            winText.innerHTML = `You've stopped ${mastermind.name} from tearing the superhero community apart. Earth's heroes stand united once more. Excellent work!`;
            break;

        case "The Legacy Virus":
            winText.innerHTML = `You've defeated ${mastermind.name} and eradicated the last traces of the Legacy Virus. Mutantkind lives on. Excellent work!`;
            break;

        case "Unleash the Power of the Cosmic Cube":
            winText.innerHTML = `You've stopped ${mastermind.name} from harnessing the power of the Cosmic Cube. Its reality-warping energy is secured once more. Excellent work!`;
            break;

        case "Capture Baby Hope":
            winText.innerHTML = `You've stopped ${mastermind.name} from taking Hope Summers. She is safe from harm and free to fulfill her destiny. Excellent work!`;
            break;

        case "Detonate the Helicarrier":
            winText.innerHTML = `You've stopped ${mastermind.name} from destroying the Helicarrier. The explosions are contained and the ship remains operational. Excellent work!`;
            break;

        case "Massive Earthquake Generator":
            winText.innerHTML = `You've stopped ${mastermind.name} from activating the massive earthquake generator. The tremors subside and the cities are safe. Excellent work!`;
            break;

        case "Organized Crime Wave":
            winText.innerHTML = `You've stopped ${mastermind.name} from unleashing a wave of organized crime. The Maggia Goons are behind bars and the streets are safe. Excellent work!`;
            break;

        case "Save Humanity":
            winText.innerHTML = `You've stopped ${mastermind.name} from wiping out humanity. Every bystander is safe from harm. Excellent work!`;
            break;

        case "Steal the Weaponized Plutonium":
            winText.innerHTML = `You've stopped ${mastermind.name} from stealing the weaponized plutonium. Every ounce is out of enemy hands and secured. Excellent work!`;
            break;

        case "Transform Citizens Into Demons":
            winText.innerHTML = `You've stopped ${mastermind.name} from transforming citizens into Demon Goblins. All who were taken have been freed from their curse. Excellent work!`;
            break;

        case "X-Cutioner's Song":
            winText.innerHTML = `You've stopped ${mastermind.name} from carrying out the X-Cutioner's Song. All captured heroes have been freed from their captors. Excellent work!`;
            break;
        
        default:
            winText.innerHTML = `You have defeated the Mastermind and prevented their nefarious scheme! Excellent work!`;
            break;

        }
    }

const totalVictoryPoints = calculateVictoryPoints(victoryPile);
    document.getElementById('WINvictoryPointsTotal').innerText = totalVictoryPoints;

    const totalTurnsTaken = turnCount;
    document.getElementById('WINtotalTurnsTaken').innerText = totalTurnsTaken;
   
    const averageVPPerTurn = totalTurnsTaken > 0 
    ? (totalVictoryPoints / totalTurnsTaken).toFixed(1) 
    : "0.0"; // Handle division by zero case
document.getElementById('WINaverageVPPerTurn').innerText = averageVPPerTurn;

const numberOfEscapes = escapedVillainsDeck.filter(item => item.type !== 'Bystander').length;
document.getElementById('WINnumberOfEscapes').innerText = numberOfEscapes;

    winPopup.style.display = 'block';
modalOverlay.style.display = 'block';
playVictorySound();

gameIsOver = true;
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
  document.getElementById('heroAbilityHoverText').style.display = 'block';
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

const excludedZoomClasses = ['console-card-icons', 'card-image-back', 'card-icons', 'overlay-recruit-icons', 'overlay-attack-icons', 'bribe-card-icons', 'hq-explosions', 'popup-card-icons', 'settingsCog' ];

// Combine all card lists into a single array
const allCards = [
    ...(bystanders ?? []),
    ...(bystanderKillbots ?? []),
    ...(shieldCards ?? []),
    ...(shieldOfficers ?? []),
    ...(wounds ?? []),
    ...(schemes ?? []),
    ...(henchmen ?? []),
    ...(sidekicks ?? []),
    ...(masterminds),
    ...[].concat(...(heroes?.map(group => group.cards) ?? [])), 
    ...[].concat(...(villains?.map(group => group.cards) ?? [])),
    // Add expansion bystanders by flattening the object values
    ...[].concat(...Object.values(expansionBystanders ?? {})),
	...(transformedGoblinQueenCards ?? []),
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
    if (excludedZoomClasses.some(className => element.classList.contains(className))) {
        return null;
    }
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
           
            // Find the corresponding card
            const card = cardLookup[relativePath];

            if (card) {
                updateRightPanel(card); // Pass the card data to another function
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
	const errataDisplay = document.getElementById("errata");
        keyword1Display.textContent = "";
        keyword2Display.textContent = "";
        keyword3Display.textContent = "";
	errataDisplay.textContent = "";

        // Clear keyword descriptions
        updateKeywordDescriptions(null, "keyword1Description");
        updateKeywordDescriptions(null, "keyword2Description");
        updateKeywordDescriptions(null, "keyword3Description");
	updateKeywordDescriptions(null, "errataDescription");
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

 // Update errata and its description
    const errataDisplay = document.getElementById("errata");
    if (card.errata && card.errata !== "None") {
        errataDisplay.textContent = `${card.errata}: `; // Add colon after keyword3
        updateKeywordDescriptions(card.errata, "errataDescription"); // Update description
    } else {
        errataDisplay.textContent = ""; // Clear if errata is missing or "None"
        updateKeywordDescriptions(null, "errataDescription"); // Clear description
    }


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
	sortPlayedCards();
    const playedCardsTable = document.getElementById('playedCardsTable');
    playedCardsTable.innerHTML = '';

    // Close popup when clicking outside
    const popup = document.getElementById('played-cards-popup');
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePlayedCardsPopup();
        }
    });

    cardsPlayedThisTurn.forEach((card) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'played-card-container';
        
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = card.name;
        imgElement.classList.add('pile-card-image');
        
        // Apply visual effects for special states
        if (card.markedToDestroy || card.sidekickToDestroy || card.isCopied) {
            imgElement.style.opacity = '0.5';
        }

        const topCard = villainDeck[villainDeck.length - 1];
        
        // Handle Telepathic Probe with matching villain on top
if (card.name === "Professor X - Telepathic Probe" && 
    card.villain && 
    topCard?.name === card.villain.name && 
    villainDeck.length === card.villain.deckLength) {
            imgElement.classList.add('clickable-card', 'telepathic-probe-active');
            imgElement.style.cursor = 'pointer';
            imgElement.style.border = '3px solid rgb(235 43 58 / 100%)';
                     
            // Add visual indicator
            const indicator = document.createElement('div');
            indicator.className = 'villain-indicator';
            indicator.innerHTML = `
                <span style="filter:drop-shadow(0vh 0vh 0.3vh black);">FIGHT</span>
                <img src="${topCard.image}" alt="${topCard.name}" class="villain-image-overlay">
            `;
            
            // Create attack button (hidden by default)
            const attackButton = document.createElement('div');
            attackButton.className = 'played-cards-attack-button';
            attackButton.innerHTML = `
                <span style="filter: drop-shadow(0vh 0vh 0.3vh black);">
                    <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="overlay-attack-icons">
                </span>
            `;
            attackButton.style.display = 'none';
            indicator.appendChild(attackButton);

            // Indicator click handler
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                playAttackSound();
                const selectedScheme = getSelectedScheme();
                let villainAttack = recalculateVillainAttack(topCard);
                villainAttack = Math.max(0, villainAttack);

                // Check fight condition
                if (topCard.fightCondition && topCard.fightCondition !== "None" && 
                    !isVillainConditionMet(topCard)) {
                    onscreenConsole.log(`Fight condition not met for <span class="console-highlights">${topCard.name}</span>.`);
                    return;
                }

                // Calculate available attack points
                let playerAttackPoints = totalAttackPoints;
                if (recruitUsedToAttack || 
                    topCard.keyword1 === "Bribe" || 
                    topCard.keyword2 === "Bribe" || 
                    topCard.keyword3 === "Bribe") {
                    playerAttackPoints += totalRecruitPoints;
                }

                // Toggle attack button visibility
                if (playerAttackPoints >= villainAttack) {
                    attackButton.style.display = attackButton.style.display === 'none' ? 'block' : 'none';
                } else {
                    onscreenConsole.log(`You need ${villainAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to fight ${topCard.name}`);
                }
            });

            // Attack button click handler
            attackButton.addEventListener('click', async (e) => {
                e.stopPropagation();
                attackButton.style.display = 'none'; // Hide button immediately
                
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

        cardContainer.appendChild(imgElement);
        playedCardsTable.appendChild(cardContainer);
    });

    // Show the popup
    popup.style.display = 'block';
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

function openPlayerDeckPopup() {
   
    const PlayerDeckTable = document.getElementById('PlayerDeckTable');
    PlayerDeckTable.innerHTML = ''; 

   
    playerDeck.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Player Deck card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        PlayerDeckTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('playerDeck-popup').style.display = 'block';
    showModalOverlay();
}

function openHeroDeckPopup() {
   
    const HeroDeckTable = document.getElementById('HeroDeckTable');
    HeroDeckTable.innerHTML = ''; 

   
    heroDeck.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Hero Deck card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        HeroDeckTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('heroDeck-popup').style.display = 'block';
    showModalOverlay();
}

function openVillainDeckPopup() {
   
    const VillainDeckTable = document.getElementById('VillainDeckTable');
    VillainDeckTable.innerHTML = ''; 

   
    villainDeck.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Villain Deck card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        VillainDeckTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('villainDeck-popup').style.display = 'block';
    showModalOverlay();
}

function openWoundDeckPopup() {
   
    const WoundDeckTable = document.getElementById('WoundDeckTable');
    WoundDeckTable.innerHTML = ''; 

   
    woundDeck.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Wound Deck card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        WoundDeckTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('woundDeck-popup').style.display = 'block';
    showModalOverlay();
}

function openSidekickDeckPopup() {
   
    const SidekickDeckTable = document.getElementById('SidekickDeckTable');
    SidekickDeckTable.innerHTML = ''; 

   
    sidekickDeck.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Sidekick Deck card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        SidekickDeckTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('sidekickDeck-popup').style.display = 'block';
    showModalOverlay();
}

function openShieldDeckPopup() {
   
    const ShieldDeckTable = document.getElementById('ShieldDeckTable');
    ShieldDeckTable.innerHTML = ''; 

   
    shieldDeck.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Shield Deck card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        ShieldDeckTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('shieldDeck-popup').style.display = 'block';
    showModalOverlay();
}

function openBystanderDeckPopup() {
   
    const BystanderDeckTable = document.getElementById('BystanderDeckTable');
    BystanderDeckTable.innerHTML = ''; 

   
    bystanderDeck.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Bystander Deck card';
        imgElement.classList.add('pile-card-image'); // Add a class for styling
        BystanderDeckTable.appendChild(imgElement);
    });

    // Show the popup and modal overlay
    document.getElementById('bystanderDeck-popup').style.display = 'block';
    showModalOverlay();
}

function closeDiscardPilePopup() {
    document.getElementById('discard-pile-popup').style.display = 'none';
    hideModalOverlay();
}

function closePlayerDeckPopup() {
    document.getElementById('playerDeck-popup').style.display = 'none';
    hideModalOverlay();
}

function closeHeroDeckPopup() {
    document.getElementById('heroDeck-popup').style.display = 'none';
    hideModalOverlay();
}

function closeVillainDeckPopup() {
    document.getElementById('villainDeck-popup').style.display = 'none';
    hideModalOverlay();
}

function closeWoundDeckPopup() {
    document.getElementById('woundDeck-popup').style.display = 'none';
    hideModalOverlay();
}

function closeSidekickDeckPopup() {
    document.getElementById('sidekickDeck-popup').style.display = 'none';
    hideModalOverlay();
}

function closeShieldDeckPopup() {
    document.getElementById('shieldDeck-popup').style.display = 'none';
    hideModalOverlay();
}

function closeBystanderDeckPopup() {
    document.getElementById('bystanderDeck-popup').style.display = 'none';
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
	if (silentMeditationRecruit === true) {
 	playerHand.push(sidekick);
	silentMeditationRecruit = false;
onscreenConsole.log(`Sidekick recruited! <span class="console-highlights">${sidekick.name}</span> has been added to your hand.`);
} else if (backflipRecruit === true) {
playerDeck.push(sidekick);
sidekick.revealed = true;
onscreenConsole.log(`Sidekick recruited! <span class="console-highlights">${sidekick.name}</span> has been added to the top of your deck.`);
backflipRecruit = false;
} else {
playerDiscardPile.push(sidekick);
onscreenConsole.log(`Sidekick recruited! <span class="console-highlights">${sidekick.name}</span> has been added to your discard pile.`);
}    
addHRToTopWithInnerHTML(); 
playRecruitSound();   
        totalRecruitPoints -= 2;
        sidekickRecruited = true;
        healingPossible = false;
        updateGameBoard();
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
        onscreenConsole.log(`You need 2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit a Sidekick.`);
    }
}

document.getElementById('sidekick-deck-card-back').addEventListener('click', showSidekickRecruitButton);

function recruitOfficer() {
    if (shieldDeck.length > 0 && totalRecruitPoints >= 3) {
        const officer = shieldDeck.pop();
       	if (silentMeditationRecruit === true) {
 	playerHand.push(officer);
	silentMeditationRecruit = false;
onscreenConsole.log(`Hero recruited! <span class="console-highlights">${officer.name}</span> has been added to your hand.`);
} else if (backflipRecruit === true) {
playerDeck.push(officer);
officer.revealed = true;
onscreenConsole.log(`Hero recruited! <span class="console-highlights">${officer.name}</span> has been added to the top of your deck.`);
backflipRecruit = false;
} else {
playerDiscardPile.push(officer);
onscreenConsole.log(`Hero recruited! <span class="console-highlights">${officer.name}</span> has been added to your discard pile.`);
}      
addHRToTopWithInnerHTML();
playRecruitSound();
        totalRecruitPoints -= 3;
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

async function recruitHeroConfirmed(hero, hqIndex) {
playRecruitSound();

if (hero.saveHumanityBystander === true) {
victoryPile.push(hero);
await rescueBystanderAbility(hero);
} else if (silentMeditationRecruit === true) {
 	playerHand.push(hero);
	silentMeditationRecruit = false;
onscreenConsole.log(`Hero recruited! <span class="console-highlights">${hero.name}</span> has been added to your hand.`);
} else if (backflipRecruit === true) {
playerDeck.push(hero);
hero.revealed = true;
onscreenConsole.log(`Hero recruited! <span class="console-highlights">${hero.name}</span> has been added to the top of your deck.`);
backflipRecruit = false;
} else {
playerDiscardPile.push(hero);
onscreenConsole.log(`Hero recruited! <span class="console-highlights">${hero.name}</span> has been added to your discard pile.`);
}      

    totalRecruitPoints -= hero.cost;
    
    // Get the new card before placing it in HQ
    const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
    hq[hqIndex] = newCard;
    
    if (newCard) {
        onscreenConsole.log(`<span class="console-highlights">${newCard.name}</span> has entered the HQ.`);
    } 

addHRToTopWithInnerHTML();
    
    healingPossible = false;

    if (!hq[hqIndex] && heroDeck.length === 0) {
        heroDeckHasRunOut = true;
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

function initializeCounters(total, aMax, bMax) {
    // Start with maximum possible attack points
    counterA = Math.min(total, aMax);
    counterB = total - counterA;
    
    // Ensure recruit points don't exceed maximum
    if (counterB > bMax) {
        counterB = bMax;
        counterA = total - counterB;
    }
    
    updateCounterDisplay();
}

function updateCounterDisplay() {
    document.getElementById('counterA').textContent = counterA;
    document.getElementById('counterB').textContent = counterB;
    
    // Update button states
    document.getElementById('decreaseA').disabled = counterA <= 0;
    document.getElementById('increaseA').disabled = 
        counterB <= 0 || counterA >= totalAttackPoints;
    document.getElementById('decreaseB').disabled = counterB <= 0;
    document.getElementById('increaseB').disabled = 
        counterA <= 0 || counterB >= totalRecruitPoints;
}

// Button handlers
document.getElementById('increaseA').addEventListener('click', () => {
    if (counterB > 0 && counterA < totalAttackPoints) {
        counterA++;
        counterB--;
        updateCounterDisplay();
    }
});

document.getElementById('decreaseA').addEventListener('click', () => {
    if (counterA > 0 && counterB < totalRecruitPoints) {
        counterA--;
        counterB++;
        updateCounterDisplay();
    }
});

document.getElementById('increaseB').addEventListener('click', () => {
    if (counterA > 0 && counterB < totalRecruitPoints) {
        counterB++;
        counterA--;
        updateCounterDisplay();
    }
});

document.getElementById('decreaseB').addEventListener('click', () => {
    if (counterB > 0 && counterA < totalAttackPoints) {
        counterB--;
        counterA++;
        updateCounterDisplay();
    }
});

// Popup control
async function showCounterPopup(villainCard, villainAttack) {
    return new Promise((resolve, reject) => {
        counterResolve = resolve;
        counterReject = reject;
        
        // Set up the popup
        document.getElementById('bribe-card-image').src = villainCard.image;
        document.getElementById('bribe-card-image').style.display = 'block';
        document.getElementById('bribe-popup-h2').innerHTML = `Defeat <span class="console-highlights">${villainCard.name}</span>`;
        
        // Initialize counters
        initializeCounters(villainAttack, totalAttackPoints, totalRecruitPoints);
        
        // Show popup
        document.getElementById('bribe-popup').style.display = 'block';
	document.getElementById('modal-overlay').style.display = 'block';
    });
}

// Button handlers for popup
document.getElementById('bribe-confirm-button').addEventListener('click', () => {
    document.getElementById('bribe-popup').style.display = 'none';
document.getElementById('modal-overlay').style.display = 'none';
    if (counterResolve) {
        counterResolve({
            attackUsed: counterA,
            recruitUsed: counterB
        });
    }
});

function addHRToTopWithInnerHTML() {
    const consoleContainer = document.querySelector('.inner-console-log');
    if (!consoleContainer || consoleContainer.children.length === 0) return;
    
    const firstChild = consoleContainer.firstElementChild;
    if (firstChild.innerHTML.includes('console-log-hrs')) {
        return; // First entry is already HR
    }
    
    // Add HR to top
    const hrElement = document.createElement('p');
    hrElement.innerHTML = `<hr class="console-log-hrs">`;
    consoleContainer.insertBefore(hrElement, firstChild);

updateGameBoard();
}

function openSettings() {
    document.getElementById('settings-popup').style.display = 'block';
document.getElementById('modal-overlay').style.display = 'block';
}

function initAudio() {
    // Set up background music with multiple formats
    bgMusic.loop = true;
    // For background music, use multiple source elements or use a similar approach
    // Since bgMusic is a single audio element, we'll handle it differently
    const bgMusicSources = [
        'Audio Assets/background-music.m4a',
        'Audio Assets/background-music.mp3',
        'Audio Assets/background-music.ogg'  // Keep original as fallback
    ];
    
    // Find the first supported format
    const audio = new Audio();
    for (const src of bgMusicSources) {
        const canPlay = audio.canPlayType('audio/' + src.split('.').pop());
        if (canPlay === 'probably' || canPlay === 'maybe') {
            bgMusic.src = src;
            break;
        }
    }
}

// Load all sounds with user interaction context
async function loadAllSounds() {
    // If running from local file system, skip preloading
    if (isLocalFile) {
        console.warn("Running from local file system - sounds will be loaded on demand");
        return;
    }
    
    // Mobile browsers require this to happen in response to user interaction
    const soundPromises = [];
    
    // Each sound now loads multiple formats
    soundPromises.push(loadSound('attack', ['Audio Assets/attack-sound.m4a', 'Audio Assets/attack-sound.mp3', 'Audio Assets/attack-sound.webm']));
    soundPromises.push(loadSound('draw', ['Audio Assets/card-draw-sound.m4a', 'Audio Assets/card-draw-sound.mp3', 'Audio Assets/card-draw-sound.webm']));
    soundPromises.push(loadSound('lose', ['Audio Assets/evil-wins-sound.m4a', 'Audio Assets/evil-wins-sound.mp3', 'Audio Assets/evil-wins-sound.webm']));
    soundPromises.push(loadSound('gameDraw', ['Audio Assets/game-draw-sound.m4a', 'Audio Assets/game-draw-sound.mp3', 'Audio Assets/game-draw-sound.webm']));
    soundPromises.push(loadSound('victory', ['Audio Assets/good-wins-sound.m4a', 'Audio Assets/good-wins-sound.mp3', 'Audio Assets/good-wins-sound.webm']));
    soundPromises.push(loadSound('deal', ['Audio Assets/hand-dealt-sound.m4a', 'Audio Assets/hand-dealt-sound.mp3', 'Audio Assets/hand-dealt-sound.webm']));
    soundPromises.push(loadSound('ko', ['Audio Assets/ko-sound.m4a', 'Audio Assets/ko-sound.mp3', 'Audio Assets/ko-sound.webm']));
    soundPromises.push(loadSound('masterStrike', ['Audio Assets/master-strike-sound.m4a', 'Audio Assets/master-strike-sound.mp3', 'Audio Assets/master-strike-sound.webm']));
    soundPromises.push(loadSound('recruit', ['Audio Assets/recruit-sound.m4a', 'Audio Assets/recruit-sound.mp3', 'Audio Assets/recruit-sound.webm']));
    soundPromises.push(loadSound('rescue', ['Audio Assets/rescue-bystander-sound.m4a', 'Audio Assets/rescue-bystander-sound.mp3', 'Audio Assets/rescue-bystander-sound.webm']));
    soundPromises.push(loadSound('schemeTwist', ['Audio Assets/scheme-twist-sound.m4a', 'Audio Assets/scheme-twist-sound.mp3', 'Audio Assets/scheme-twist-sound.webm']));
    soundPromises.push(loadSound('wound', ['Audio Assets/wound-sound.m4a', 'Audio Assets/wound-sound.mp3', 'Audio Assets/wound-sound.webm']));
    
    try {
        await Promise.all(soundPromises);
        console.log('All sounds loaded!');
        
        // On mobile, we need to "prime" the audio elements by playing them silently
        // and immediately pausing, all within the user interaction context
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            primeAudioElements();
        }
    } catch (error) {
        console.error('Error loading sounds:', error);
    }
}

// Enhanced loadSound function for multiple formats
function loadSound(name, urls) {
    return new Promise((resolve) => {
        const audio = new Audio();
        
        // Mobile-specific handling
        audio.setAttribute('preload', 'auto');
        audio.setAttribute('webkit-playsinline', '');
        audio.setAttribute('playsinline', '');
        
        audio.addEventListener('canplaythrough', () => {
            sounds[name] = audio;
            resolve();
        }, { once: true });
        
        audio.addEventListener('error', (e) => {
            console.error(`Error loading sound ${name}:`, e);
            // Try the next format if available
            if (urls.length > 1) {
                console.log(`Trying next format for ${name}`);
                loadSound(name, urls.slice(1)).then(resolve);
            } else {
                sounds[name] = null; // Mark as failed to load
                resolve(); // Still resolve to prevent blocking other sounds
            }
        });
        
        // Set the source to the first URL
        audio.src = urls[0];
        audio.load();
    });
}

// Function for on-demand loading with multiple formats
function loadSoundOnDemand(name, urls) {
    const audio = new Audio();
    
    audio.addEventListener('canplaythrough', () => {
        sounds[name] = audio;
        // Now play the sound since it's loaded
        try {
            audio.volume = sfxGlobalVolume;
            audio.currentTime = 0;
            audio.play().catch(e => console.log(`Could not play ${name} sound:`, e));
        } catch (e) {
            console.log(`Error playing ${name} sound:`, e);
        }
    }, { once: true });
    
    audio.addEventListener('error', (e) => {
        console.error(`Error loading sound ${name}:`, e);
        // Try the next format if available
        if (urls.length > 1) {
            console.log(`Trying next format for ${name}`);
            loadSoundOnDemand(name, urls.slice(1));
        } else {
            sounds[name] = null;
        }
    });
    
    audio.src = urls[0];
    audio.load();
}

// Prime audio elements for mobile
function primeAudioElements() {
    if (isLocalFile) return; // Skip priming for local files
    
    for (const name in sounds) {
        if (sounds[name]) {
            try {
                // Play and immediately pause to "prime" the audio element
                sounds[name].play().then(() => {
                    sounds[name].pause();
                    sounds[name].currentTime = 0;
                }).catch(e => {
                    console.log(`Could not prime ${name} sound:`, e);
                });
            } catch (e) {
                console.log(`Error priming ${name} sound:`, e);
            }
        }
    }
}

// SFX functions with mobile handling
function playAttackSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.attack) {
        loadSoundOnDemand('attack', ['Audio Assets/attack-sound.m4a', 'Audio Assets/attack-sound.mp3', 'Audio Assets/attack-sound.webm']);
        return;
    }
    
    if (sounds.attack) {
        try {
            const sound = sounds.attack.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Attack sound play failed:", error);
                    try {
                        sounds.attack.volume = sfxGlobalVolume;
                        sounds.attack.currentTime = 0;
                        sounds.attack.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing attack sound:", e);
        }
    } else {
        console.warn('Attack sound not loaded yet');
    }
}

function playDrawSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.draw) {
        loadSoundOnDemand('draw', ['Audio Assets/card-draw-sound.m4a', 'Audio Assets/card-draw-sound.mp3', 'Audio Assets/card-draw-sound.webm']);
        return;
    }
    
    if (!sounds.draw) {
        console.warn('Draw sound not loaded yet');
        return;
    }
    
    const now = Date.now();
    const timeSinceLast = now - (playDrawSound.lastPlayTime || 0);
    const delay = timeSinceLast < 300 ? 300 - timeSinceLast : 0;
    
    setTimeout(() => {
        try {
            const sound = sounds.draw.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Draw sound play failed:", error);
                    // Try to play the original as fallback
                    try {
                        sounds.draw.volume = sfxGlobalVolume;
                        sounds.draw.currentTime = 0;
                        sounds.draw.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing draw sound:", e);
        }
    }, delay);
    
    playDrawSound.lastPlayTime = now + delay;
}

function playLoseSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.lose) {
        loadSoundOnDemand('lose', ['Audio Assets/evil-wins-sound.m4a', 'Audio Assets/evil-wins-sound.mp3', 'Audio Assets/evil-wins-sound.webm']);
        return;
    }
    
    if (sounds.lose) {
        try {
            const sound = sounds.lose.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Lose sound play failed:", error);
                    try {
                        sounds.lose.volume = sfxGlobalVolume;
                        sounds.lose.currentTime = 0;
                        sounds.lose.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing lose sound:", e);
        }
    } else {
        console.warn('Lose sound not loaded yet');
    }
}

function playGameDrawSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.gameDraw) {
        loadSoundOnDemand('gameDraw', ['Audio Assets/game-draw-sound.m4a', 'Audio Assets/game-draw-sound.mp3', 'Audio Assets/game-draw-sound.webm']);
        return;
    }
    
    if (sounds.gameDraw) {
        try {
            const sound = sounds.gameDraw.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Game draw sound play failed:", error);
                    try {
                        sounds.gameDraw.volume = sfxGlobalVolume;
                        sounds.gameDraw.currentTime = 0;
                        sounds.gameDraw.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing game draw sound:", e);
        }
    } else {
        console.warn('Game draw sound not loaded yet');
    }
}

function playVictorySound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.victory) {
        loadSoundOnDemand('victory', ['Audio Assets/good-wins-sound.m4a', 'Audio Assets/good-wins-sound.mp3', 'Audio Assets/good-wins-sound.webm']);
        return;
    }
    
    if (sounds.victory) {
        try {
            const sound = sounds.victory.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Victory sound play failed:", error);
                    try {
                        sounds.victory.volume = sfxGlobalVolume;
                        sounds.victory.currentTime = 0;
                        sounds.victory.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing victory sound:", e);
        }
    } else {
        console.warn('Victory sound not loaded yet');
    }
}

function playDealSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.deal) {
        loadSoundOnDemand('deal', ['Audio Assets/hand-dealt-sound.m4a', 'Audio Assets/hand-dealt-sound.mp3', 'Audio Assets/hand-dealt-sound.webm']);
        return;
    }
    
    if (sounds.deal) {
        try {
            const sound = sounds.deal.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Deal sound play failed:", error);
                    try {
                        sounds.deal.volume = sfxGlobalVolume;
                        sounds.deal.currentTime = 0;
                        sounds.deal.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing deal sound:", e);
        }
    } else {
        console.warn('Deal sound not loaded yet');
    }
}

function playKOSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.ko) {
        loadSoundOnDemand('ko', ['Audio Assets/ko-sound.m4a', 'Audio Assets/ko-sound.mp3', 'Audio Assets/ko-sound.webm']);
        return;
    }
    
    if (!sounds.ko) {
        console.warn('KO sound not loaded yet');
        return;
    }
    
    const now = Date.now();
    const timeSinceLast = now - (playKOSound.lastPlayTime || 0);
    const delay = timeSinceLast < 300 ? 300 - timeSinceLast : 0;
    
    setTimeout(() => {
        try {
            const sound = sounds.ko.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("KO sound play failed:", error);
                    try {
                        sounds.ko.volume = sfxGlobalVolume;
                        sounds.ko.currentTime = 0;
                        sounds.ko.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing KO sound:", e);
        }
    }, delay);
    
    playKOSound.lastPlayTime = now + delay;
}

function playMasterStrikeSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.masterStrike) {
        loadSoundOnDemand('masterStrike', ['Audio Assets/master-strike-sound.m4a', 'Audio Assets/master-strike-sound.mp3', 'Audio Assets/master-strike-sound.webm']);
        return;
    }
    
    if (sounds.masterStrike) {
        try {
            const sound = sounds.masterStrike.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Master strike sound play failed:", error);
                    try {
                        sounds.masterStrike.volume = sfxGlobalVolume;
                        sounds.masterStrike.currentTime = 0;
                        sounds.masterStrike.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing master strike sound:", e);
        }
    } else {
        console.warn('Master strike sound not loaded yet');
    }
}

function playRecruitSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.recruit) {
        loadSoundOnDemand('recruit', ['Audio Assets/recruit-sound.m4a', 'Audio Assets/recruit-sound.mp3', 'Audio Assets/recruit-sound.webm']);
        return;
    }
    
    if (sounds.recruit) {
        try {
            const sound = sounds.recruit.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Recruit sound play failed:", error);
                    try {
                        sounds.recruit.volume = sfxGlobalVolume;
                        sounds.recruit.currentTime = 0;
                        sounds.recruit.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing recruit sound:", e);
        }
    } else {
        console.warn('Recruit sound not loaded yet');
    }
}

function playRescueSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.rescue) {
        loadSoundOnDemand('rescue', ['Audio Assets/rescue-bystander-sound.m4a', 'Audio Assets/rescue-bystander-sound.mp3', 'Audio Assets/rescue-bystander-sound.webm']);
        return;
    }
    
    if (!sounds.rescue) {
        console.warn('Rescue sound not loaded yet');
        return;
    }
    
    const now = Date.now();
    const timeSinceLast = now - (playRescueSound.lastPlayTime || 0);
    const delay = timeSinceLast < 300 ? 300 - timeSinceLast : 0;
    
    setTimeout(() => {
        try {
            const sound = sounds.rescue.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Rescue sound play failed:", error);
                    try {
                        sounds.rescue.volume = sfxGlobalVolume;
                        sounds.rescue.currentTime = 0;
                        sounds.rescue.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing rescue sound:", e);
        }
    }, delay);
    
    playRescueSound.lastPlayTime = now + delay;
}

function playSchemeTwistSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.schemeTwist) {
        loadSoundOnDemand('schemeTwist', ['Audio Assets/scheme-twist-sound.m4a', 'Audio Assets/scheme-twist-sound.mp3', 'Audio Assets/scheme-twist-sound.webm']);
        return;
    }
    
    if (sounds.schemeTwist) {
        try {
            const sound = sounds.schemeTwist.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Scheme twist sound play failed:", error);
                    try {
                        sounds.schemeTwist.volume = sfxGlobalVolume;
                        sounds.schemeTwist.currentTime = 0;
                        sounds.schemeTwist.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing scheme twist sound:", e);
        }
    } else {
        console.warn('Scheme twist sound not loaded yet');
    }
}

function playWoundSound() {
    if (!sfxEnabled) return;
    
    // For local files, load on demand
    if (isLocalFile && !sounds.wound) {
        loadSoundOnDemand('wound', ['Audio Assets/wound-sound.m4a', 'Audio Assets/wound-sound.mp3', 'Audio Assets/wound-sound.webm']);
        return;
    }
    
    if (!sounds.wound) {
        console.warn('Wound sound not loaded yet');
        return;
    }
    
    const now = Date.now();
    const timeSinceLast = now - (playWoundSound.lastPlayTime || 0);
    const delay = timeSinceLast < 300 ? 300 - timeSinceLast : 0;
    
    setTimeout(() => {
        try {
            const sound = sounds.wound.cloneNode();
            sound.volume = sfxGlobalVolume;
            sound.currentTime = 0;
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Wound sound play failed:", error);
                    try {
                        sounds.wound.volume = sfxGlobalVolume;
                        sounds.wound.currentTime = 0;
                        sounds.wound.play();
                    } catch (e) {
                        console.log("Fallback also failed:", e);
                    }
                });
            }
        } catch (e) {
            console.log("Error playing wound sound:", e);
        }
    }, delay);
    
    playWoundSound.lastPlayTime = now + delay;
}

let sfxGlobalVolume = 0.8;
let hasFadedIn = false;

const sounds = {};

function updateMusicVolume(volume) {
    if (bgMusic) {
        bgMusic.volume = volume;
    }
    localStorage.setItem('musicVolume', volume);
}

function updateSFXVolume(volume) {
    sfxGlobalVolume = volume;
    localStorage.setItem('sfxVolume', volume);
}

function loadAudioSettings() {
    const savedMusicVol = localStorage.getItem('musicVolume');
    const savedSFXVol = localStorage.getItem('sfxVolume');
    
    const musicVolume = savedMusicVol !== null ? parseFloat(savedMusicVol) : 0.7;
    const sfxVolume = savedSFXVol !== null ? parseFloat(savedSFXVol) : 0.8;
    
    if (bgMusic) {
        bgMusic.volume = musicVolume;
    }
    sfxGlobalVolume = sfxVolume;
    
    document.getElementById('musicVolume').value = musicVolume;
    document.getElementById('sfxVolume').value = sfxVolume;
    
    if (savedMusicVol === null) localStorage.setItem('musicVolume', musicVolume);
    if (savedSFXVol === null) localStorage.setItem('sfxVolume', sfxVolume);
}

document.getElementById('musicVolume').addEventListener('input', (e) => {
    updateMusicVolume(parseFloat(e.target.value));
});

document.getElementById('sfxVolume').addEventListener('input', (e) => {
    updateSFXVolume(parseFloat(e.target.value));
});

function saveSettings() {
    const musicVolume = parseFloat(document.getElementById('musicVolume').value);
    const sfxVolume = parseFloat(document.getElementById('sfxVolume').value);
    
    updateMusicVolume(musicVolume);
    updateSFXVolume(sfxVolume);
    
    document.getElementById('settings-popup').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

loadAudioSettings();
