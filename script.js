//30.09.2025 20.55

console.log('Script loaded');
console.log(window.henchmen);
console.log(window.villains);
console.log(window.heroes);

window.addEventListener("load", async () => {
  const loader   = document.querySelector('.loading-container');
  const blackout = document.querySelector('.blackout-overlay');

  const minDisplayMs = 2000; // how long to show at least
  const start = performance.now();

  const load1 = document.getElementById('load-last-setup-1');
  const load2 = document.getElementById('load-last-setup-2');
  const saved = localStorage.getItem('legendaryGameSetup');

  if (!saved) {
    load1.disabled = true;
    load2.disabled = true;
  } else {
    load1.disabled = false;
    load2.disabled = false;
  }

  await allowPaint(); // let the loader actually render

  // Calculate if we need to wait longer
  const elapsed   = performance.now() - start;
  const remaining = Math.max(0, minDisplayMs - elapsed);

  setTimeout(() => {
    loader.classList.remove('show');
    blackout.classList.remove('show');
  }, remaining);
});

document.getElementById('donate-call-to-action')
  .addEventListener('click', () => {
    window.open('https://www.paypal.me/benjaminb21', '_blank', 'noopener');
  });

  document.getElementById('donate-call-to-action-in-game')
  .addEventListener('click', () => {
    window.open('https://www.paypal.me/benjaminb21', '_blank', 'noopener');
  });

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

(function () {
  const originalConsoleLog = console.log;
  window._debugLogBuffer = [];

  console.log = function (...args) {
    // Save to buffer
    const msg = args.map(arg =>
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ');
    window._debugLogBuffer.push(msg);

    // Call original
    originalConsoleLog.apply(console, args);
  };
})();

// ============================
// EXPORT CONSOLE LOG FUNCTION
// ============================
function exportConsoleLogs() {
  const now = new Date();
  const timestamp = now.toLocaleString();

  // --- helpers ---
  function imgToPlaceholder(imgHtml) {
    // ALT first
    const altMatch = imgHtml.match(/\balt=(["'])(.*?)\1/i);
    let label = altMatch ? altMatch[2] : '';

    // Fallback: filename from SRC
    if (!label) {
      const srcMatch = imgHtml.match(/\bsrc=(["'])(.*?)\1/i);
      if (srcMatch) {
        const base = srcMatch[2].split('/').pop().replace(/\.\w+$/,'');
        label = base;
      }
    }

    // Normalise: drop "Icon", tidy, uppercase
    label = String(label).replace(/\s*icon\s*/i, '').replace(/[_\-]/g, ' ').trim();
    return `[${label ? label.toUpperCase() : 'ICON'}]`;
  }

  function replaceImgsWithPlaceholders(htmlString) {
    if (!htmlString) return '';
    // Replace every <img ...> with [LABEL]
    const replaced = htmlString.replace(/<img[^>]*>/gi, (img) => imgToPlaceholder(img));
    // Strip any remaining HTML to plain text
    const tmp = document.createElement('div');
    tmp.innerHTML = replaced;
    return tmp.innerText;
  }

  // ---- User-Friendly (from on-screen log) ----
  const onscreenLogContainer = document.querySelector('.inner-console-log');
  const onscreenMessages = Array.from(onscreenLogContainer.querySelectorAll('p'));

  const userFriendlyText = onscreenMessages
    .reverse()
    .map(el => replaceImgsWithPlaceholders(el.innerHTML).trim())
    .join('\n');

  // ---- Debug Copy (captured console.log buffer) ----
  const debugLines = (window._debugLogBuffer || []).map(line =>
    replaceImgsWithPlaceholders(line)
  );
  const debugText = debugLines.join('\n');

  // ---- Build final plain-text export ----
  const exportContent =
`For debugging, please email a copy to legendarysoloplay@gmail.com

CONSOLE LOG EXPORT: ${timestamp}

User-Friendly:
${userFriendlyText}

Debug Copy:
${debugText}`;

  // ---- Create and download .txt file ----
  const blob = new Blob([exportContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `debug-logs-${now.getTime()}.txt`; // Unique filename with timestamp
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
}

// ============================
// CLICK HANDLER
// ============================
document.getElementById('console-log-export').addEventListener('click', exportConsoleLogs);

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
    filterTag.innerHTML = `${checkbox.getAttribute('data-team')}`;

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
let city = [null, null, null, null, null];
let destroyedSpaces = [false, false, false, false, false];
const citySpaceLabels = [
    "The Bridge",
    "The Streets", 
    "The Rooftops",
    "The Bank",
    "The Sewers"
];
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
let mastermindPermBuffDynamicPrev = 0;
var mastermindReserveAttack = 0;
var bridgeReserveAttack = 0;
var streetsReserveAttack = 0;
var rooftopsReserveAttack = 0;
var bankReserveAttack = 0;
var sewersReserveAttack = 0;
var hq1ReserveRecruit = 0;
var hq2ReserveRecruit = 0;
var hq3ReserveRecruit = 0;
var hq4ReserveRecruit = 0;
var hq5ReserveRecruit = 0;
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
let finalTwist = false;
let schemeTwistTuckComplete = false;
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
let thingCrimeStopperRescue = false;
let galactusForceOfEternityDraw = false;
let negativeZoneAttackAndRecruit = false;
let invincibleForceField = 0;
let city1CosmicThreat = 0;
let city2CosmicThreat = 0;
let city3CosmicThreat = 0;
let city4CosmicThreat = 0;
let city5CosmicThreat = 0;
let mastermindCosmicThreat = 0;
let mastermindCosmicThreatResolved = false;
let unseenRescueBystanders = 0;
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

function loadLastGameSetup() {
    const saved = localStorage.getItem('legendaryGameSetup');
    
    if (!saved) {
        alert('No saved game setup found!');
        return;
    }
    
    try {
        const gameSettings = JSON.parse(saved);
        
        // Restore radio buttons (single selection)
        restoreRadioButton('#scheme-section', gameSettings.scheme);
        restoreRadioButton('#mastermind-section', gameSettings.mastermind);
        
        // Restore checkbox groups (multiple selection)
        restoreCheckboxes('#villain-selection', gameSettings.villains);
        restoreCheckboxes('#henchmen-selection', gameSettings.henchmen);
        restoreCheckboxes('#hero-selection', gameSettings.heroes);
        restoreCheckboxes('#bystander-selection', gameSettings.bystanders);
        restoreCheckboxes('#sidekick-selection', gameSettings.sidekicks);
        
        // Restore final blow checkbox
        if (gameSettings.finalBlow !== undefined) {
            document.getElementById('final-blow-checkbox').checked = gameSettings.finalBlow;
        }
        
        // UPDATE IMAGES AND SCROLL - ADD THIS PART!
        updateAllImagesAndScroll(gameSettings);
        
        console.log('Last game setup loaded successfully!');
        
    } catch (error) {
        console.error('Error loading saved setup:', error);
        alert('Error loading saved setup. Please make new selections.');
    }
}

// NEW FUNCTION: Update images and scroll to selections
function updateAllImagesAndScroll(gameSettings) {
    // Update scheme image and scroll
    updateSchemeImage(gameSettings.scheme);
    scrollToRadioSelection('#scheme-section .scrollable-list', gameSettings.scheme, '#scheme-section');
    
    // Update mastermind image and scroll
    updateMastermindImage(gameSettings.mastermind);
    scrollToRadioSelection('#mastermind-section .scrollable-list', gameSettings.mastermind, '#mastermind-section');
    
    // Update villain images and scroll
    if (gameSettings.villains && gameSettings.villains.length > 0) {
        const firstVillainGroup = villains.find(v => v.name === gameSettings.villains[0]);
        if (firstVillainGroup) {
            selectedVillainGroups = gameSettings.villains.map(villainName => 
                villains.find(v => v.name === villainName)
            ).filter(Boolean);
            
            currentVillainGroupIndex = 0;
            currentVillainIndex = 0;
            displayCurrentVillainImage();
            updateVillainFaceDownCards();
            
            scrollToSelection('#villain-section .scrollable-list', gameSettings.villains[0], '#villain-selection');
        }
    }
    
    // Update henchmen images and scroll
    if (gameSettings.henchmen && gameSettings.henchmen.length > 0) {
        const firstHenchmenGroup = henchmen.find(h => h.name === gameSettings.henchmen[0]);
        if (firstHenchmenGroup) {
            selectedHenchmenGroups = gameSettings.henchmen.map(henchmenName => 
                henchmen.find(h => h.name === henchmenName)
            ).filter(Boolean);
            
            currentHenchmenGroupIndex = 0;
            displayCurrentHenchmenImage();
            updateHenchmenFaceDownCards();
            
            scrollToSelection('#henchmen-section .scrollable-list', gameSettings.henchmen[0], '#henchmen-selection');
        }
    }
    
    // Update hero images and scroll
    if (gameSettings.heroes && gameSettings.heroes.length > 0) {
        const firstHeroGroup = heroes.find(h => h.name === gameSettings.heroes[0]);
        if (firstHeroGroup) {
            selectedHeroGroups = gameSettings.heroes.map(heroName => 
                heroes.find(h => h.name === heroName)
            ).filter(Boolean);
            
            currentHeroGroupIndex = 0;
            currentHeroIndex = 0;
            displayCurrentHeroImage();
            updateHeroFaceDownCards();
            
            scrollToSelection('#hero-section .scrollable-list', gameSettings.heroes[0], '#hero-selection');
        }
    }
    
    // Handle Jean Grey special case (if needed)
    const selectedScheme = schemes.find(scheme => scheme.name === gameSettings.scheme);
    const jeanGreyCheckbox = document.querySelector('input[value="Jean Grey"]');
    if (jeanGreyCheckbox && selectedScheme) {
        jeanGreyCheckbox.disabled = selectedScheme.name === 'Transform Citizens Into Demons';
    }
}

// NEW FUNCTION: Scroll to radio button selection
function scrollToRadioSelection(containerSelector, value, sectionSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // Find the radio button with this value
    const radio = document.querySelector(`${sectionSelector} input[type="radio"][value="${value}"]`);
    if (radio) {
        // Wait a tiny bit for the DOM to update
        setTimeout(() => {
            const radioPosition = radio.offsetTop - container.offsetTop;
            container.scrollTop = radioPosition - container.clientHeight / 2;
        }, 50);
    }
}

// Updated existing function for clarity (checkbox version)
function scrollToSelection(containerSelector, value, sectionSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // Find the checkbox with this value
    const checkbox = document.querySelector(`${sectionSelector} input[type="checkbox"][value="${value}"]`);
    if (checkbox) {
        setTimeout(() => {
            const checkboxPosition = checkbox.offsetTop - container.offsetTop;
            container.scrollTop = checkboxPosition - container.clientHeight / 2;
        }, 50);
    }
}

// Helper function for radio buttons
function restoreRadioButton(sectionSelector, value) {
    if (!value) return;
    
    // Uncheck all radios in this section first
    document.querySelectorAll(`${sectionSelector} input[type="radio"]`).forEach(radio => {
        radio.checked = false;
    });
    
    // Check the saved one
    const radioToCheck = document.querySelector(`${sectionSelector} input[value="${value}"]`);
    if (radioToCheck) {
        radioToCheck.checked = true;
    } else {
        console.warn(`Could not find radio button with value: ${value} in ${sectionSelector}`);
    }
}

// Helper function for checkboxes
function restoreCheckboxes(sectionSelector, values) {
    if (!values || !Array.isArray(values)) return;
    
    // Uncheck all checkboxes in this section first
    document.querySelectorAll(`${sectionSelector} input[type="checkbox"]`).forEach(cb => {
        cb.checked = false;
    });
    
    // Check the saved ones
    values.forEach(value => {
        const checkboxToCheck = document.querySelector(`${sectionSelector} input[value="${value}"]`);
        if (checkboxToCheck) {
            checkboxToCheck.checked = true;
        } else {
            console.warn(`Could not find checkbox with value: ${value} in ${sectionSelector}`);
        }
    });
}

document.getElementById('load-last-setup-1').addEventListener('click', loadLastGameSetup);

document.getElementById('load-last-setup-2').addEventListener('click', loadLastGameSetup);
   
document.getElementById('begin-game').addEventListener('pointerdown', onBeginGame);

// Utility: wait for two animation frames so the browser can paint the loader
function allowPaint() {
  return new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

let gameStartTime;

// Function to start the timer
function startGameTimer() {
    gameStartTime = new Date(); // Record the current time when game starts
}

// Function to format time as HH:MM:SS
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Pad with leading zeros
    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');
}

async function onBeginGame(e) {
startGameTimer();

  const loader   = document.querySelector('.loading-container');
  const blackout = document.querySelector('.blackout-overlay');

  // Show overlays immediately
  loader.classList.add('show');
  blackout.classList.add('show');

  const minDisplayMs = 2000; // set your minimum visible time here
  const start = performance.now();

  // Give the browser a chance to actually render the loader before heavy work
  await allowPaint();

  // (Optional) prevent double-clicks on the button that triggered this
  if (e?.currentTarget) e.currentTarget.disabled = true;

  if (window.audioEngine) {
    await window.audioEngine.begin({ musicFadeSeconds: 2.0 });
  }

  if (!this || !this.disabled) {
    // Gather selections
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const selectedMastermind = document.querySelector('#mastermind-section input[type=radio]:checked').value;
    const selectedVillains   = Array.from(document.querySelectorAll('#villain-selection input[type=checkbox]:checked')).map(cb => cb.value);
    const selectedHenchmen   = Array.from(document.querySelectorAll('#henchmen-selection input[type=checkbox]:checked')).map(cb => cb.value);
    const selectedHeroes     = Array.from(document.querySelectorAll('#hero-selection  input[type=checkbox]:checked')).map(cb => cb.value);
    const selectedBystanders = Array.from(document.querySelectorAll('#bystander-selection input[name="bystander"]:checked')).map(cb => cb.value);
    const selectedSidekicks = Array.from(document.querySelectorAll('#sidekick-selection input[name="sidekick"]:checked')).map(cb => cb.value);

    finalBlowEnabled = document.getElementById('final-blow-checkbox').checked;
    const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

    const gameSettings = {
    scheme: selectedSchemeName,
    mastermind: selectedMastermind,
    villains: selectedVillains,
    henchmen: selectedHenchmen,
    heroes: selectedHeroes,
    bystanders: selectedBystanders,
    sidekicks: selectedSidekicks,
    finalBlow: finalBlowEnabled,
    timestamp: new Date().toISOString() // Optional: when was this saved?
};

// Store the entire object
localStorage.setItem('legendaryGameSetup', JSON.stringify(gameSettings));

    // Swap UI
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('expand-side-panel').style.display = 'block';
    document.getElementById('side-panel').style.display = 'flex';

    // FIX: Use await directly instead of Promise.resolve()
    await initGame(selectedHeroes, selectedVillains, selectedHenchmen, selectedMastermind, selectedScheme);

    document.getElementById('confirm-start-up-choices').style.display = 'none';
  }

  // Enforce minimum visible duration
  const elapsed   = performance.now() - start;
  const remaining = Math.max(0, minDisplayMs - elapsed);
  if (remaining > 0) {
    await new Promise(r => setTimeout(r, remaining));
  }

  // Fade out (CSS transition handles the smoothness)
  loader.classList.remove('show');
  blackout.classList.remove('show');

  if (e?.currentTarget) e.currentTarget.disabled = false;
}

document.getElementById('start-expansion').addEventListener('click', () => {
    const expansionPopup = document.getElementById('expansion-popup-container');
const expansionBackground = document.getElementById('background-for-expansion-popup');

    expansionPopup.classList.add('hidden');
    expansionBackground.classList.add('hidden');
document.getElementById('intro-popup-container').style.display = 'flex';
expansionPopup.style.display = 'none';
    
    // Optional: Remove the element from DOM after fade completes
    setTimeout(() => {
        expansionPopup.style.display = 'none';
	expansionBackground.style.display = 'none';
    }, 1000); // Match this timeout with your transition duration
});

document.getElementById('skip-button').addEventListener('click', () => {
    skipSplash();
});
 
function skipSplash() {
   const expansionPopup = document.getElementById('expansion-popup-container');
const expansionBackground = document.getElementById('background-for-expansion-popup');

    expansionPopup.classList.add('hidden');
    expansionBackground.classList.add('hidden');
document.getElementById('intro-popup-container').style.display = 'flex';
expansionPopup.style.display = 'none';
    
    // Optional: Remove the element from DOM after fade completes
    setTimeout(() => {
        expansionPopup.style.display = 'none';
	expansionBackground.style.display = 'none';
    }, 1000); // Match this timeout with your transition duration
}

function skipSplashAndIntro() {
   const expansionPopup = document.getElementById('expansion-popup-container');
const expansionBackground = document.getElementById('background-for-expansion-popup');

    expansionPopup.classList.add('hidden');
    expansionBackground.classList.add('hidden');
expansionPopup.style.display = 'none';
    
    // Optional: Remove the element from DOM after fade completes
    setTimeout(() => {
        expansionPopup.style.display = 'none';
	expansionBackground.style.display = 'none';
    }, 1000); // Match this timeout with your transition duration
}

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
            
            // Check if this villain group is the "always leads" group
            if (villainName === window.alwaysLeadsVillain) {
                modifiedCard.alwaysLeads = "true";
            }
            
            if (mastermind.name === 'Apocalypse' && modifiedCard.alwaysLeads === 'true') {
                modifiedCard = {
                    ...modifiedCard,
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
            if (scheme.name === 'Organized Crime Wave') {
                // Add 8 copies with ambush effect and new image to the deck
                for (let i = 0; i < 8; i++) {
                    deck.push({ ...henchman, subtype: 'Henchman', ambushEffect: 'organizedCrimeAmbush', image: 'Visual Assets/Other/organizedCrimeMaggiaGoons.webp' });
                }
                // Add 2 copies with JUST the new image (no ambush) to the "on top" array
                for (let i = 0; i < 2; i++) {
                    henchmenToPlaceOnTop.push({ ...henchman, subtype: 'Henchman', image: 'Visual Assets/Other/organizedCrimeMaggiaGoons.webp' });
                }
            } else {
                // Normal rules: add 2 normal copies to the deck
                for (let i = 0; i < 2; i++) {
                    deck.push({ ...henchman, subtype: 'Henchman' });
                }
                // Add 2 normal copies to the "on top" array
                for (let i = 0; i < 2; i++) {
                    henchmenToPlaceOnTop.push({ ...henchman, subtype: 'Henchman' });
                }
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
    stackedTwistNextToMastermind++;
    stackedTwistNextToMastermind++;
    stackedTwistNextToMastermind++;
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
			unconditionalAbility: 'None',
			conditionalAbility: 'None',
			multiplier: 'None',
			multiplierAttribute: 'None',
			multiplierLocation: 'None',
			conditionType: 'None',
			condition: 'None',
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
    
    onscreenConsole.log('<span style="font-style:italic;">Initializing game...</span>');

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

if (villains.length === 1) {
    const selectedVillainName = villains[0];
    console.log(`The Mastermind always leads ${selectedVillainName} in this game.`);
    onscreenConsole.log(`The Mastermind always leads ${selectedVillainName} in this game.`);
    
    // Store the alwaysLeads villain name for later use
    window.alwaysLeadsVillain = selectedVillainName;
    
} else if (villains.length > 1) {
    const randomIndex = Math.floor(Math.random() * villains.length);
    const selectedVillainName = villains[randomIndex];
    console.log(`The Mastermind always leads ${selectedVillainName} in this game.`);
    onscreenConsole.log(`The Mastermind always leads ${selectedVillainName} in this game.`);
    
    // Store the alwaysLeads villain name for later use
    window.alwaysLeadsVillain = selectedVillainName;
    
} else {
    console.log('No villains selected. The Mastermind has no specific group to lead.');
    window.alwaysLeadsVillain = null;
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

    // Draw the initial player hand
    playerHand = [];
    for (let i = 0; i < 6; i++) {
        drawCard();
    }

    sortPlayerCards();
    onscreenConsole.log(`<span class="console-highlights" style="text-decoration:underline;">Turn 1:</span>`);

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

// ---------------------------------
// Draw villain card(s) entry point (unchanged logic)
// ---------------------------------
async function drawVillainCard() {

  if (destroyedSpaces[4] === true) {
    onscreenConsole.log(`The city is destroyed. No more Villains can be drawn. You have until the end of this turn before defeat...`)
    return;
  }

  const highCostHeroCount = hq.filter(hero => hero.cost >= 7).length;
  if (isFirstTurn && highCostHeroCount >= 2) {
    await mulliganChoice();
  }

  const drawCount = isFirstTurn ? 3 : 1;
  isFirstTurn = false;

  for (let i = 0; i < drawCount; i++) {
    await processVillainCard();
  }
}

// ---------------------------------
// Regular villain placement & movement (guarded)
// ---------------------------------
async function processRegularVillainCard(villainCard) {
  console.log('processRegularVillainCard called for:', villainCard.name);
  console.log('Current city state before placement:', JSON.stringify(city.map(c => c ? c.name : null)));
  const sewersIndex = city.length - 1;

  // Save the previous occupant of the sewers BEFORE placing the new villain
  const previousSewersCard = city[sewersIndex] || null;

  // Place new villain
  city[sewersIndex] = villainCard;
  onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> enters the city.`);

  const destroyedCount = destroyedSpaces.filter(Boolean).length;

  if (destroyedCount > 0) {
    await processMovementWithDestroyedSpaces(previousSewersCard);
  } else {
    // Standard movement logic
    let previousCard = previousSewersCard;
    for (let j = sewersIndex - 1; j >= 0; j--) {
      if (previousCard !== null && city[j] === null) {
        city[j] = previousCard;
        previousCard = null;
        break;
      } else if (previousCard !== null) {
        const temp = city[j];
        city[j] = previousCard;
        previousCard = temp;

        if (j === 0 && previousCard) {
          await new Promise(resolve => { showPopup('Villain Escape', previousCard, resolve); });
          await handleVillainEscape(previousCard);
          addHRToTopWithInnerHTML();
          previousCard = null;
        }
      }
      // If previousCard is null, continue to finish the loop without mutation
    }
  }

  // Arrival popup if no ambush
  if (!villainCard.ambushEffect || villainCard.ambushEffect === "None") {
    await new Promise(resolve => { showPopup('Villain Arrival', villainCard, resolve); });
    addHRToTopWithInnerHTML();
  }

  // Ambush
  if (villainCard.ambushEffect && villainCard.ambushEffect !== "None") {
    await new Promise(resolve => { showPopup('Villain Ambush', villainCard, resolve); });
    const ambushEffectFunction = window[villainCard.ambushEffect];
    if (typeof ambushEffectFunction === 'function') {
      let negate = false;
      if (typeof promptNegateAmbushEffectWithInvisibleWoman === 'function') {
        negate = await promptNegateAmbushEffectWithInvisibleWoman();
      }
      if (negate) {
        onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span><span class="bold-spans">'s</span> Ambush effect was negated.`);
      } else {
        await ambushEffectFunction(villainCard);
      }
    }
    addHRToTopWithInnerHTML();
  }
}

// ---------------------------------
// Destroyed-space movement (unchanged except early escape guard)
// ---------------------------------
async function processMovementWithDestroyedSpaces(previousCard) {
  const sewersIndex = city.length - 1;

  // Find first non-destroyed slot = new front
  let newFrontIndex = -1;
  for (let i = 0; i < city.length; i++) {
    if (!destroyedSpaces[i]) { newFrontIndex = i; break; }
  }
  if (newFrontIndex === -1) return;

  // Build the movement path: non-destroyed indices to the left of sewers (right->left)
  const path = [];
  for (let i = sewersIndex - 1; i >= newFrontIndex; i--) {
    if (!destroyedSpaces[i]) path.push(i);
  }

  // Edge case: if no non-destroyed slot, the old sewers card escapes immediately
  if (path.length === 0 && previousCard) {
    await new Promise(resolve => { showPopup('Villain Escape', previousCard, resolve); });
    await handleVillainEscape(previousCard);
    addHRToTopWithInnerHTML();
    previousCard = null;
  }

  // Bubble-left along non-destroyed slots
  for (const j of path) {
    if (previousCard == null) break;

    if (city[j] === null) {
      city[j] = previousCard;
      previousCard = null;
      break;
    } else {
      const temp = city[j];
      city[j] = previousCard;
      previousCard = temp;

      // Escape check at the new front
      if (j === newFrontIndex && previousCard) {
        onscreenConsole.log(`<span class="console-highlights">${previousCard.name}</span> escapes from ${citySpaceLabels[newFrontIndex]}!`);
        await new Promise(resolve => { showPopup('Villain Escape', previousCard, resolve); });
        await handleVillainEscape(previousCard);
        addHRToTopWithInnerHTML();
        previousCard = null;
      }
    }
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
    const alwaysLeadsEscapeCount = escapedVillainsDeck ? escapedVillainsDeck.filter(card => card.alwaysLeads === "true").length : 0;

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

let mastermindPermBuffDynamicNow = 0;

if (mastermind.name === 'Mr. Sinister') {
  mastermindPermBuffDynamicNow += bystanderCount;
}

if (mastermind.name === 'Mole Man') {
  mastermindPermBuffDynamicNow += alwaysLeadsEscapeCount;
}

// Adjust the total by the delta only (so other buffs remain intact)
mastermindPermBuff += (mastermindPermBuffDynamicNow - mastermindPermBuffDynamicPrev);

// Remember this value for next render
mastermindPermBuffDynamicPrev = mastermindPermBuffDynamicNow;

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
	playSFX('master-strike');
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
playSFX('scheme-twist');
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
playSFX('scheme-twist');
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
	playSFX('wound');
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
                return showDiscardCardPopup(escapedVillain);
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
            if (pendingHeroKO && schemeTwistChainDepth === 0 && !finalTwist && !schemeTwistTuckComplete) {
                pendingHeroKO = false;
				schemeTwistTuckComplete = true;
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

        // Remove any existing confirm button
        const existingConfirm = document.getElementById('hero-select-confirm');
        if (existingConfirm) heroSelectPopup.removeChild(existingConfirm);

        const confirmButton = document.createElement('button');
        confirmButton.id = 'hero-select-confirm';
        confirmButton.textContent = 'CONFIRM';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;

        heroImage.style.display = 'none';
        hoverText.style.display = 'block';

        heroOptions.innerHTML = '';
        let selectedHQIndex = null;  // <-- store HQ index, not eligible index
        let activeImage = null;

        heroSelectPopup.appendChild(confirmButton);

        // Build a list of { hero, hqIndex } so indices don't shift
        const eligible = hq
            .map((hero, hqIndex) => ({ hero, hqIndex }))
            .filter(x => x.hero && x.hero.type === 'Hero' && x.hero.cost <= 6);

        if (eligible.length === 0) {
            onscreenConsole.log('No Heroes available with a cost of 6 or less.');
            resolve();
            return;
        }

        // Helpers for icons
        const createTeamIconHTML = (value) => {
            if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
                return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
            }
            return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
        };
        const createClassIconHTML = (value) => {
            if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') return '';
            return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
        };

        // Populate options
        eligible.forEach(({ hero, hqIndex }) => {
            const heroButton = document.createElement('button');
            heroButton.classList.add('hero-option');
            heroButton.setAttribute('data-hq-index', String(hqIndex)); // <-- bind HQ index

            const teamIcon = createTeamIconHTML(hero.team);
            const class1Icon = createClassIconHTML(hero.class1);
            const class2Icon = createClassIconHTML(hero.class2);
            const class3Icon = createClassIconHTML(hero.class3);

            heroButton.innerHTML =
                `<span style="white-space: nowrap;">HQ-${hqIndex + 1} | ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${hero.name}</span>`;

            // Hover preview
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

            // Selection
            heroButton.onclick = () => {
                const thisHQIndex = Number(heroButton.getAttribute('data-hq-index'));
                if (selectedHQIndex === thisHQIndex) {
                    // Deselect
                    selectedHQIndex = null;
                    heroButton.classList.remove('selected');
                    activeImage = null;
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    hoverText.style.display = 'block';
                    confirmButton.disabled = true;
                } else {
                    // Deselect previous (by HQ index)
                    if (selectedHQIndex !== null) {
                        const prevButton = heroOptions.querySelector(`button[data-hq-index="${selectedHQIndex}"]`);
                        if (prevButton) prevButton.classList.remove('selected');
                    }
                    // Select new
                    selectedHQIndex = thisHQIndex;
                    heroButton.classList.add('selected');
                    activeImage = hero.image;
                    heroImage.src = hero.image;
                    heroImage.style.display = 'block';
                    hoverText.style.display = 'none';
                    confirmButton.disabled = false;
                }
            };

            heroOptions.appendChild(heroButton);
        });

        // Confirm
        confirmButton.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (selectedHQIndex === null) return;

            setTimeout(() => {
                const hero = hq[selectedHQIndex]; // <-- resolve by HQ index
                if (hero) {
                    onscreenConsole.log(
                        `A Scheme Twist has forced you to return <span class="console-highlights">${hero.name}</span> to the bottom of the Hero Deck.`
                    );
                }
                returnHeroToDeck(selectedHQIndex); // <-- pass HQ index
                updateGameBoard();

                // Clean up
                heroSelectPopup.removeChild(confirmButton);
                heroSelectPopup.style.display = 'none';
                modalOverlay.style.display = 'none';
                resolve();
            }, 100);
        };

        // Show popup
        modalOverlay.style.display = 'block';
        heroSelectPopup.style.display = 'block';
    });
}

function returnHeroToDeck(hqIndex) {
    const hero = hq[hqIndex];
    if (hero) {
        // Bottom = front; drawing uses pop() from end (top)
        heroDeck.unshift(hero);

        // Draw new top card (end of array)
        const newCard = heroDeck.length > 0 ? heroDeck.pop() : null;
        hq[hqIndex] = newCard;

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
    }   else if (type === 'Destroyed City Villain Escape') {
        popupTitle.innerText = `Escape`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `As <span class="console-highlights">Galactus</span> destroys the city <span class="console-highlights">${drawnCard.name}</span> escapes!`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'Raktar Villain Escape') {
        popupTitle.innerText = `Escape`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `The actions of <span class="console-highlights">Ra'ktar the Molan King</span> help <span class="console-highlights">${drawnCard.name}</span> to escape!`;
        popupImage.style.backgroundImage = `url("${drawnCard.image}")`;
    } else if (type === 'Villain Moved') {
        popupTitle.innerText = `Ambush`;
        popupImage.style.display = 'block';
        popupContext.innerHTML = `<span class="console-highlights">Ra'ktar the Molan King</span> forces <span class="console-highlights">${drawnCard.name}</span> further into the city!`;
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
    document.getElementById('played-cards-modal-overlay').style.display = 'none';
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

    

    const specificPopup = document.getElementById('played-cards-popup');
    const wasSpecificPopupMinimized = Array.from(minimizedPopups).some(
        state => state.popup === specificPopup
    );
    
    if (wasSpecificPopupMinimized) {
 document.getElementById('played-cards-modal-overlay').style.display = 'block';
    } else {
document.getElementById('modal-overlay').style.display = 'block';
    }
    
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
    const controls = [];
    const popupId = popup.id;
    
    if (popupId) {
        // Find controls with data-popup-id matching the popup's id
        controls.push(...document.querySelectorAll(`[data-popup-id="${popupId}"]`));
        
        // Add stats and score content for win/draw/defeat popups
        if (popupId === 'win-popup' || popupId === 'draw-popup' || popupId === 'defeat-popup') {
            const statsContent = document.getElementById('stats-content');
            const scoreContent = document.getElementById('score-content');
            
            if (statsContent) controls.push(statsContent);
            if (scoreContent) controls.push(scoreContent);
        }
    }
    
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
        
        // Get the reserved recruit points for this HQ
        let reservedRecruit = 0;
        switch(i + 1) {
            case 1: reservedRecruit = hq1ReserveRecruit; break;
            case 2: reservedRecruit = hq2ReserveRecruit; break;
            case 3: reservedRecruit = hq3ReserveRecruit; break;
            case 4: reservedRecruit = hq4ReserveRecruit; break;
            case 5: reservedRecruit = hq5ReserveRecruit; break;
        }
        
        // Add highlight if player can afford this hero (including reserved points)
        if (totalRecruitPoints + reservedRecruit >= hq[i].cost) {
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
// Create an array of location names in the same order as the city array
const cityLocations = ["Bridge", "Streets", "Rooftops", "Bank", "Sewers"];

// Create an array of reserve attack values in the same order
const cityReserveAttacks = [
    bridgeReserveAttack,
    streetsReserveAttack,
    rooftopsReserveAttack,
    bankReserveAttack,
    sewersReserveAttack,
];

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
            
            // Get reserved attack points for this city slot
            const reservedAttack = cityReserveAttacks[i] || 0;
            
            // Check if attackable with current points (including reserved points)
            const canAttackWithAttackPoints = totalAttackPoints + reservedAttack >= villainAttack;
            const hasBribeKeyword = city[i].keyword1 === "Bribe" || 
                        city[i].keyword2 === "Bribe" || 
                        city[i].keyword3 === "Bribe";
            const canAttackWithRecruitPoints = (recruitUsedToAttack || hasBribeKeyword) && 
                                  (totalAttackPoints + totalRecruitPoints + reservedAttack >= villainAttack);
            
            if (canAttackWithAttackPoints || canAttackWithRecruitPoints) {
                cityCell.classList.add('attackable');
               
                // Add special class if recruit points would be needed
                if (canAttackWithRecruitPoints && !canAttackWithAttackPoints) {
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

const canUseRecruitForAttack = recruitUsedToAttack || hasMastermindBribe;

// Count defeated mastermind cards (tactics + final blow if applicable)
const defeatedMasterminds = victoryPile.filter(card => card.type === "Mastermind");
const maxDefeatsAllowed = finalBlowEnabled ? 5 : 4;

// Determine if mastermind can still be attacked
const canStillBeAttacked = defeatedMasterminds.length < maxDefeatsAllowed;
const hasTacticsRemaining = mastermind.tactics.length > 0;

// Calculate total points available (any combination)
const totalAvailablePoints = totalAttackPoints + totalRecruitPoints + mastermindReserveAttack;

// Check if player can pay forcefield AND attack mastermind
let canAttack = false;

if (invincibleForceField > 0) {
    // Must pay forcefield first from total points, then have enough appropriate points for mastermind
    const pointsAfterForcefield = totalAvailablePoints - invincibleForceField;
    
    if (pointsAfterForcefield >= 0) {
        // Now check if we have enough of the right type of points for the mastermind attack
        if (canUseRecruitForAttack) {
            // Can use any combination of points for mastermind attack
            canAttack = pointsAfterForcefield >= mastermindAttack;
        } else {
            // Can only use attack points for mastermind attack
            // Calculate how many attack points are left after paying forcefield
            // (Forcefield can be paid with any points, but we prioritize using recruit points first)
            const recruitUsedForForcefield = Math.min(invincibleForceField, totalRecruitPoints);
            const attackUsedForForcefield = invincibleForceField - recruitUsedForForcefield;
            const attackPointsLeft = totalAttackPoints - attackUsedForForcefield;
            
            canAttack = attackPointsLeft >= mastermindAttack;
        }
    } else {
        canAttack = false;
    }
} else {
    // No forcefield - normal rules
    if (canUseRecruitForAttack) {
        canAttack = totalAvailablePoints >= mastermindAttack;
    } else {
        canAttack = totalAttackPoints + mastermindReserveAttack >= mastermindAttack;
    }
}

// Mastermind is attackable if:
// 1. Player can attack AND
// 2. Either: a) Has tactics remaining OR b) Final Blow is enabled and at exactly 4 defeats
const canAttackMastermind = canAttack && 
                          (hasTacticsRemaining || 
                           (finalBlowEnabled && defeatedMasterminds.length === 4));

// Update UI
if (canAttackMastermind && canStillBeAttacked) {
    document.getElementById("mastermind").classList.add('attackable');
} else {
    document.getElementById("mastermind").classList.remove('attackable');
}
}

function updateHighlightsNegativeZone() {
    for (let i = 0; i < hq.length; i++) {
        const hqCell = document.querySelector(`#hq-${i + 1}`);
        if (hq[i]) {
            // Remove any existing highlight
            hqCell.classList.remove('affordable');
            
            // Add highlight if player can afford this hero
            if (totalAttackPoints >= hq[i].cost) {
                hqCell.classList.add('affordable');
            }
        }
    }

const sidekickCheckboxes = document.querySelectorAll('#sidekick-selection input[type=checkbox]');
const isAnySidekickChecked = Array.from(sidekickCheckboxes).some(checkbox => checkbox.checked);

 if (totalAttackPoints >= 2 && !sidekickRecruited && isAnySidekickChecked) {
    document.getElementById("sidekick-deck").classList.add('affordable');
} else {
    document.getElementById("sidekick-deck").classList.remove('affordable');
}

 if (sidekickRecruited) {
    document.getElementById("sidekick-deck").classList.remove('affordable');
}
   
    if (totalAttackPoints >= 3) {
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
            const canAttackWithRecruitPoints = totalRecruitPoints >= villainAttack;
            const hasBribeKeyword = city[i].keyword1 === "Bribe" || 
                        city[i].keyword2 === "Bribe" || 
                        city[i].keyword3 === "Bribe";
            const canAttackWithCombo = (hasBribeKeyword || recruitUsedToAttack) && 
                                  (totalAttackPoints + totalRecruitPoints >= villainAttack);
         
            if (canAttackWithRecruitPoints || canAttackWithCombo) {
                cityCell.classList.add('attackable');
               
           
            }
        }
    }
}

let mastermind = getSelectedMastermind();
let mastermindAttack = recalculateMastermindAttack(mastermind);

// Check if Mastermind has Bribe keyword
const hasMastermindBribe = mastermind.keyword1 === "Bribe" || 
                           mastermind.keyword2 === "Bribe" || 
                           mastermind.keyword3 === "Bribe";

const canAttackWithCombo = (hasMastermindBribe || recruitUsedToAttack) && 
                                 (totalAttackPoints + totalRecruitPoints >= mastermindAttack) &&
                                 (totalRecruitPoints < mastermindAttack);

// Count defeated mastermind cards (tactics + final blow if applicable)
const defeatedMasterminds = victoryPile.filter(card => card.type === "Mastermind");
const maxDefeatsAllowed = finalBlowEnabled ? 5 : 4;

// Determine if mastermind can still be attacked
const canStillBeAttacked = defeatedMasterminds.length < maxDefeatsAllowed;
const hasEnoughPoints = totalRecruitPoints >= mastermindAttack || canAttackWithCombo;
const hasTacticsRemaining = mastermind.tactics.length > 0;

const canAttackMastermind = hasEnoughPoints && 
                          (hasTacticsRemaining || 
                           (finalBlowEnabled && defeatedMasterminds.length === 4));

// Update UI
if (canAttackMastermind && canStillBeAttacked) {
    document.getElementById("mastermind").classList.add('attackable');
    if (totalRecruitPoints < mastermindAttack) {
        document.getElementById("mastermind").classList.add('needs-recruit');
    }
} else {
    document.getElementById("mastermind").classList.remove('attackable', 'needs-recruit');
}
}

let isRecruiting = false; // Flag to track if a hero is being recruited

const CARD_BACK_PATH = 'Visual Assets/CardBack.webp';

function updateDeckImage(element, card) {
    if (card?.revealed) {
        element.src = card.image;
        element.classList.remove('card-image-back');
        element.classList.add('revealed-deck-card-image');
    } else {
        element.src = CARD_BACK_PATH;
        element.classList.remove('revealed-deck-card-image');
        element.classList.add('card-image-back'); // Add exclusion when it's the card back
    }
}

function updateReserveAttackAndRecruit() {
    const reserveAttackText = document.getElementById('reserved-attack-points');
    const reserveRecruitText = document.getElementById('reserved-recruit-points');

    // Create arrays of location-value pairs for attack points
    const attackLocations = [
        {name: "Mastermind", value: mastermindReserveAttack},
        {name: "Bridge", value: bridgeReserveAttack},
        {name: "Streets", value: streetsReserveAttack},
        {name: "Rooftops", value: rooftopsReserveAttack},
        {name: "Bank", value: bankReserveAttack},
        {name: "Sewers", value: sewersReserveAttack}
    ];

    // Create arrays of location-value pairs for recruit points
    const recruitLocations = [
        {name: "HQ 1", value: hq1ReserveRecruit},
        {name: "HQ 2", value: hq2ReserveRecruit},
        {name: "HQ 3", value: hq3ReserveRecruit},
        {name: "HQ 4", value: hq4ReserveRecruit},
        {name: "HQ 5", value: hq5ReserveRecruit}
    ];

const attackStrings = attackLocations
    .filter(loc => loc.value > 0)
    .map(loc => `${loc.name}: +${loc.value} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="reserved-card-icons">`);

// Filter and format recruit locations with positive values - WITH SINGLE ICON
const recruitStrings = recruitLocations
    .filter(loc => loc.value > 0)
    .map(loc => `${loc.name}: +${loc.value} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="reserved-card-icons">`);

    // Update visibility and text content
    if (attackStrings.length > 0) {
        document.getElementById('reserveAttackPointDisplay').style.visibility = "visible";
        reserveAttackText.innerHTML = attackStrings.join('<br>'); // Use <br> instead of comma separation
    } else {
        document.getElementById('reserveAttackPointDisplay').style.visibility = "hidden";
        reserveAttackText.innerHTML = "0";
    }

    if (recruitStrings.length > 0) {
        document.getElementById('reserveRecruitPointDisplay').style.visibility = "visible";
        reserveRecruitText.innerHTML = recruitStrings.join('<br>'); // Use <br> instead of comma separation
    } else {
        document.getElementById('reserveRecruitPointDisplay').style.visibility = "hidden";
        reserveRecruitText.innerHTML = "0";
    }
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
         heroImage.dataset.heroId = hq[i].id; // Add hero ID as data attribute
    heroImage.dataset.hqIndex = i; // Add HQ index as data attribute

        // Append the image to the HQ cell
        hqCell.appendChild(heroImage);

            hqCell.dataset.heroId = hq[i].id;
    hqCell.dataset.hqIndex = i;

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
updateReserveAttackAndRecruit();
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
        discardPileImage.style.display = 'flex';
        discardPileImage.classList.remove('card-image-back');
        discardPileImage.classList.add('revealed-deck-card-image');
    } else {
        // Hide the discard pile when empty
        discardPileImage.style.display = 'none';
        discardPileImage.classList.remove('revealed-deck-card-image');
        discardPileImage.classList.add('card-image-back');
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
        playedCardsPileImage.classList.remove('card-image-back');
        playedCardsPileImage.classList.add('revealed-deck-card-image');
    } else {
        playedCardsPileImage.style.display = 'none';
        playedCardsPileImage.classList.remove('revealed-deck-card-image');
        playedCardsPileImage.classList.add('card-image-back');
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

if (destroyedSpaces[i]) {
    // Create a container to hold the card image and overlays
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container'); // Add a class for styling the container
    newCityCell.appendChild(cardContainer);

    // Create an image element
    const cardImage = document.createElement('img');

        cardImage.src = "Visual Assets/Other/MasterStrike.webp";
        cardImage.alt = "Destroyed City Space";
        cardImage.classList.add('destroyed-space');
        cardContainer.appendChild(cardImage);
}

if (city[i]) {
    // Create a container to hold the card image and overlays
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container'); // Add a class for styling the container
    cardContainer.setAttribute('data-city-index', i);
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

if (
    city[i] &&
    typeof city[i].attack !== 'undefined' &&
    typeof city[i].originalAttack !== 'undefined' &&
    city[i].attack !== city[i].originalAttack
) {
    city[i].overlayTextAttack = `${city[i].attack}`;
}

if (
  (city[i].keyword1 === "Cosmic Threat" ||
   city[i].keyword2 === "Cosmic Threat" ||
   city[i].keyword3 === "Cosmic Threat") &&
  !city[i].cosmicThreatResolved
) {
  // Safety: if a previous render left a button in this card, remove it first
  cardContainer.querySelectorAll('.keyword-overlay').forEach(el => el.remove());

  const keywordButton = document.createElement('div');
  const keywordButtonText = document.createElement('span');

  // helper (lowercases the wanted class too)
  const hasClass = (card, wanted) =>
    ['class1','class2','class3'].some(k =>
      String(card?.[k] ?? '').trim().toLowerCase() === String(wanted).trim().toLowerCase()
    );

  const allRevealableCosmicThreatCards = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => !card.isCopied && !card.sidekickToDestroy)
  ];

  keywordButton.className = 'keyword-overlay';
  keywordButtonText.className = 'city-keyword-button-text';

  // === Per-villain setups ===
  if ((city[i].name === "Firelord" || city[i].name === "The Shaper of Worlds") && !city[i].cosmicThreatResolved) {
    keywordButtonText.innerHTML = `Cosmic Threat: <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='cosmic-threat-card-icons'>`;
    const countRange = allRevealableCosmicThreatCards.filter(c => hasClass(c, 'range')).length * 3;

    keywordButton.addEventListener('click', (e) => {
      // 1) set flag BEFORE any redraw to prevent rebuild
      city[i].cosmicThreatResolved = true;
      // 2) remove the actual clicked element instantly
      e.currentTarget.remove();
      // 3) apply effect (this may call updateGameBoard)
      cosmicThreat(city[i], i, countRange, 'Range');
    });
  } else if (city[i].name === "Morg" || city[i].name === "Kubik") {
    keywordButtonText.innerHTML = `Cosmic Threat: <img src='Visual Assets/Icons/Instinct.svg' alt='Instinct Icon' class='cosmic-threat-card-icons'>`;
    const countInstinct = allRevealableCosmicThreatCards.filter(c => hasClass(c, 'instinct')).length * 3;

    keywordButton.addEventListener('click', (e) => {
      city[i].cosmicThreatResolved = true;
      e.currentTarget.remove();
      cosmicThreat(city[i], i, countInstinct, 'Instinct');
    });
  } else if (city[i].name === "Stardust" || city[i].name === "Kosmos") {
    keywordButtonText.innerHTML = `Cosmic Threat: <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='cosmic-threat-card-icons'>`;
    const countCovert = allRevealableCosmicThreatCards.filter(c => hasClass(c, 'covert')).length * 3;

    keywordButton.addEventListener('click', (e) => {
      city[i].cosmicThreatResolved = true;
      e.currentTarget.remove();
      cosmicThreat(city[i], i, countCovert, 'Covert');
    });
  } else if (city[i].name === "Terrax the Tamer") {
    keywordButtonText.innerHTML = `Cosmic Threat: <img src='Visual Assets/Icons/Strength.svg' alt='Strength Icon' class='cosmic-threat-card-icons'>`;
    const countStrength = allRevealableCosmicThreatCards.filter(c => hasClass(c, 'strength')).length * 3;

    keywordButton.addEventListener('click', (e) => {
      city[i].cosmicThreatResolved = true;
      e.currentTarget.remove();
      cosmicThreat(city[i], i, countStrength, 'Strength');
    });
  } else if (city[i].name === "The Mapmakers") {
    keywordButtonText.innerHTML = `Cosmic Threat: <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='cosmic-threat-card-icons'>`;
    const countTech = allRevealableCosmicThreatCards.filter(c => hasClass(c, 'tech')).length * 3;

    keywordButton.addEventListener('click', (e) => {
      city[i].cosmicThreatResolved = true;
      e.currentTarget.remove();
      cosmicThreat(city[i], i, countTech, 'Tech');
    });
  } else if (
    city[i].name === "Arishem, The Judge" ||
    city[i].name === "Exitar, The Exterminator" ||
    city[i].name === "Gammenon, The Gatherer" ||
    city[i].name === "Nezarr, The Calculator" ||
    city[i].name === "Tiamut, The Dreaming Celestial"
  ) {
    // Dual-choice villains – delegate to your chooser
    // (Set the flag and remove instantly; the chooser will call cosmicThreat)
    const dualMap = {
      "Arishem, The Judge": ["Range", "Strength"],
      "Exitar, The Exterminator": ["Tech", "Range"],
      "Gammenon, The Gatherer": ["Strength", "Instinct"],
      "Nezarr, The Calculator": ["Covert", "Tech"],
      "Tiamut, The Dreaming Celestial": ["Instinct", "Covert"],
    };
    const [a, b] = dualMap[city[i].name] || ["Range", "Strength"];
    keywordButtonText.innerHTML =
      `Cosmic Threat: <img src='Visual Assets/Icons/${a}.svg' alt='${a} Icon' class='cosmic-threat-card-icons'> or <img src='Visual Assets/Icons/${b}.svg' alt='${b} Icon' class='cosmic-threat-card-icons'>`;

    keywordButton.addEventListener('click', async (e) => {
      city[i].cosmicThreatResolved = true; // guard first
      e.currentTarget.remove();            // instant disappearance
      await handleCosmicThreatChoice(city[i], i);
    });
  } else {
    keywordButtonText.textContent = 'Undefined';
  }

  keywordButton.appendChild(keywordButtonText);
  cardContainer.appendChild(keywordButton);
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
const mastermindContainer = document.getElementById('mastermind');
const MM_BTN_ID = 'mm-cosmic-threat-btn'; // stable id to prevent duplicates

// Guard: only act if we have a target mastermind and it's not resolved
const isTargetMastermind = mastermind &&
  (mastermind.name === 'Galactus' ||
   mastermind.name === 'The Beyonder' ||
   mastermind.name === 'Epic Beyonder');

if (isTargetMastermind && !mastermindCosmicThreatResolved && mastermindContainer) {
  // If a previous render left a button, remove it first (prevents duplicates)
  const existingBtn = mastermindContainer.querySelector(`#${MM_BTN_ID}`);
  if (existingBtn) existingBtn.remove();

  const keywordButton = document.createElement('div');
  const keywordButtonText = document.createElement('span');
  keywordButton.id = MM_BTN_ID;                       // <- stable id
  keywordButton.className = 'mastermind-keyword-overlay';        // same styling as city
  keywordButtonText.className = 'city-keyword-button-text';

  // shared pools/helpers
  const allRevealable = [
    ...playerHand,
    ...cardsPlayedThisTurn.filter(card => !card.isCopied && !card.sidekickToDestroy)
  ];
  const hasClass = (card, wanted) =>
    ['class1','class2','class3'].some(k =>
      String(card?.[k] ?? '').trim().toLowerCase() === String(wanted).trim().toLowerCase()
    );

if (mastermind.name === 'Galactus') {
  keywordButtonText.innerHTML = `
    <div>Cosmic Threat:</div>
    <div>
      <img src='Visual Assets/Icons/Strength.svg' alt='Strength Icon' class='cosmic-threat-card-icons'>
      <img src='Visual Assets/Icons/Instinct.svg' alt='Instinct Icon' class='cosmic-threat-card-icons'>
      <img src='Visual Assets/Icons/Covert.svg'   alt='Covert Icon'   class='cosmic-threat-card-icons'>
      <img src='Visual Assets/Icons/Tech.svg'     alt='Tech Icon'     class='cosmic-threat-card-icons'>
      <img src='Visual Assets/Icons/Range.svg'    alt='Range Icon'    class='cosmic-threat-card-icons'>
    </div>
  `;

  keywordButton.addEventListener('click', async (e) => {
    // Visually remove to avoid duplicate overlays, but do NOT mark resolved yet
    e.currentTarget.remove();

    const chosenClass = await showGalactusClassChoicePopup(); // returns 'Strength' | ... | null
    if (!chosenClass) {
      // Cancelled: ensure the flag stays false and re-render so button returns
      mastermindCosmicThreatResolved = false;
      updateGameBoard();
      return;
    }

    // Recompute revealables live
    const livePool = [
      ...playerHand,
      ...cardsPlayedThisTurn.filter(c => !c?.isCopied && !c?.sidekickToDestroy)
    ];
    const hasClass = (card, wanted) =>
      ['class1','class2','class3'].some(k =>
        String(card?.[k] ?? '').trim().toLowerCase() === String(wanted).trim().toLowerCase()
      );

    const attackReduction = livePool.filter(c => hasClass(c, chosenClass)).length * 3;

    applyMastermindCosmicThreat(mastermind, attackReduction, chosenClass);
    // Only now mark it resolved
    mastermindCosmicThreatResolved = true;
    updateGameBoard();
  });

} else {
  const threshold = mastermind.name === 'The Beyonder' ? 5 : 6;
  keywordButtonText.innerHTML = `
    <div>Cosmic Threat:</div>
    <div>${threshold}+ <img src='Visual Assets/Icons/Cost.svg' alt='Cost Icon' class='cosmic-threat-card-icons'> Cards</div>
  `;

  keywordButton.addEventListener('click', () => {
    // Recompute revealables live
    const livePool = [
      ...playerHand,
      ...cardsPlayedThisTurn.filter(c => !c?.isCopied && !c?.sidekickToDestroy)
    ];
    const attackReduction = livePool
      .filter(c => typeof c?.cost === 'number' && c.cost >= threshold).length * 3;

    // Remove visual button, apply reduction, then flag as resolved
    const btn = mastermindContainer.querySelector(`#${MM_BTN_ID}`);
    if (btn) btn.remove();

    applyMastermindCosmicThreat(
      mastermind,
      attackReduction,
      `${threshold}+ <img src='Visual Assets/Icons/Cost.svg' alt='Cost Icon' class='cosmic-threat-card-icons'> Cards`
    );

    mastermindCosmicThreatResolved = true;
    updateGameBoard();
  });
}

  keywordButton.appendChild(keywordButtonText);
  mastermindContainer.appendChild(keywordButton);
} else if (mastermindContainer) {
  // If not target or already resolved, ensure no leftover button remains
  const leftover = mastermindContainer.querySelector(`#${MM_BTN_ID}`);
  if (leftover) leftover.remove();
}


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

if (city[i].bystander && city[i].bystander.length > 0) {
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
                    finalTwist = true;
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
                    finalTwist = true;
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
                    finalTwist = true;
                    document.getElementById('defeat-context').innerHTML = `All HQ spaces have been destroyed or the Hero Deck has run out. The Helicarrier erupts in a chain of explosions, plunging into the ocean in a fiery wreck.`;
                    showDefeatPopup();
                }
                break;

            case "babyThreeVillainEscape":
                if (stackedTwistNextToMastermind >= 3) {
                    finalTwist = true;
                    document.getElementById('defeat-context').innerHTML = `Three twists have been stacked next to ${mastermind.name}. Hope Summers has been taken, her future stolen, and the fate of mutantkind has changed forever.`;
                    showDefeatPopup();
                }
                break;

            case "sixNonGreyHeroesKOd":
                if (koPile.filter(card => card.type === 'Hero' && card.color !== 'Grey').length >= 6) {
                    document.getElementById('defeat-context').innerHTML = `The number of non-grey Heroes in the KO pile has reached critical levels. ${mastermind.name}'s cosmic rays have ravaged Earth's defenders, and the planet now lies defenseless.`;
                    showDefeatPopup();
                }
                break;

            case "twentyNonGreyHeroesKOd":
                if (koPile.filter(card => card.type === 'Hero' && card.color !== 'Grey').length >= 20) {
                    document.getElementById('defeat-context').innerHTML = `20 non-grey Heroes have been KO'd. ${mastermind.name}'s flood has drowned the world's defenders and civilization sinks beneath the waves.`;
                    showDefeatPopup();
                }
                break;

            case "ForceField7Twists":
                if (twistCount >= 7) {
                    finalTwist = true;
                    document.getElementById('defeat-context').innerHTML = `The final force field is in place. ${mastermind.name} is untouchable and their reign will last forever.`;
                    showDefeatPopup();
                }
                break;

            case "NegativeZone7Twists":
                if (twistCount >= 7) {
                    finalTwist = true;
                    document.getElementById('defeat-context').innerHTML = `Reality has been dragged into the Negative Zone. ${mastermind.name} rules over a warped antimatter universe and our world is lost forever.`;
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
if (negativeZoneAttackAndRecruit) {
	updateHighlightsNegativeZone();
} else {
	updateHighlights();
}

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

        case "Bathe Earth in Cosmic Rays":
      evilWinsText.innerHTML = `${KOdHeroes + carriedOffHeroes}/6 Non Grey Heroes in KO Pile`;
      break;

        case "Flood the Planet with Melted Glaciers":
      evilWinsText.innerHTML = `${KOdHeroes + carriedOffHeroes}/20 Non Grey Heroes in KO Pile`;
      break;

        case "Invincible Force Field":
      evilWinsText.innerHTML = `${twistCount}/7 Twists`;
      break;

        case "Pull Reality Into the Negative Zone":
      evilWinsText.innerHTML = `${twistCount}/7 Twists`;
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
                        console.log(`Unable to use conditional ability.`);
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
    document.getElementById('end-turn').innerHTML = `<span class="game-board-bottom-row">End Turn</span>`;

    // Check for defeat conditions first
    const isDefeated = await checkDefeat();
    if (isDefeated) {
        showDefeatPopup();
        return;
    }

    updateDeckCounts();
    hideRevealedCards();

    // Check for victory conditions
    if (lastTurn === true) {
        await showWinPopup();
        if (gameIsOver) return;
    } 

    if (heroDeckHasRunOut === true && !delayEndGame) {
        await showDrawPopup();
        if (gameIsOver) return;
    }

    mastermindCosmicThreatResolved = false;
    mastermindCosmicThreat = 0;

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
mastermindReserveAttack = 0;
bridgeReserveAttack = 0;
streetsReserveAttack = 0;
rooftopsReserveAttack = 0;
bankReserveAttack = 0;
sewersReserveAttack = 0;
hq1ReserveRecruit = 0;
hq2ReserveRecruit = 0;
hq3ReserveRecruit = 0;
hq4ReserveRecruit = 0;
hq5ReserveRecruit = 0;
rescueExtraBystanders = 0;
rescueExtraBystanders = 0;
jeanGreyBystanderRecruit = 0;
jeanGreyBystanderDraw = 0;
jeanGreyBystanderAttack = 0;
sewerRooftopDefeats = false;
sewerRooftopBonusRecruit = 0;
thingCrimeStopperRescue = false;
mastermindCosmicThreatResolved = false;
city1CosmicThreat = 0;
city2CosmicThreat = 0;
city3CosmicThreat = 0;
city4CosmicThreat = 0;
city5CosmicThreat = 0;
for (let i = 0; i < 5; i++) {
    if (city[i] && 'cosmicThreatResolved' in city[i]) {
        city[i].cosmicThreatResolved = false;
    }
}
mastermindCosmicThreat = 0;
unseenRescueBystanders = 0;
twoRecruitFromKO = 0;
hasProfessorXMindControl = false;
trueVersatility = false;
secondDocOc = false;
deadpoolRare = false;
schemeTwistChainDepth = 0;  // Tracks nested Scheme Twists
pendingHeroKO = false; 
schemeTwistTuckComplete = false;

playerHand.forEach(card => {
    if (card.temporaryTeleport === true) {
        delete card.temporaryTeleport;
        card.keyword3 = "None";
    }
});

    playerDiscardPile.push(...playerHand);
    playerHand = [];

    const drawOne = () => {
        if (cardsToBeDrawnNextTurn.length > 0) {
            const card = cardsToBeDrawnNextTurn.shift();
            playerHand.push(card);
            console.log(`Drew ${card.name} from cardsToBeDrawnNextTurn.`);
            return true;
        } else {
            if (playerDeck.length === 0) {
                if (playerDiscardPile.length > 0) {
                    console.log('Deck is empty, reshuffling discard pile into deck.');
                    playerDeck = shuffle(playerDiscardPile);
                    playerDiscardPile = [];
                } else {
                    console.log('No cards left to draw.');
                    return false;
                }
            }
            // Assumes drawCard() pulls from playerDeck and pushes into playerHand
            drawCard();
            return true;
        }
    };

    // Normal draw
    for (let i = 0; i < nextTurnsDraw; i++) {
        if (!drawOne()) break;
        if (i >= 6) {
            // Keep your original tracking behaviour
            extraCardsDrawnThisTurn++;
        }
    }

    // Galactus: Force of Eternity — draw 6 more, then require a discard decision
    if (galactusForceOfEternityDraw === true) {
        let extra = 0;
        while (extra < 6) {
            if (!drawOne()) break;
            // These are explicitly "extra" cards, so count all of them
            extraCardsDrawnThisTurn++;
            extra++;
        }

            await galactusForceOfEternityDiscard();

    	galactusForceOfEternityDraw = false;
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
    const cityReserveAttacks = [
    bridgeReserveAttack,
    streetsReserveAttack,
    rooftopsReserveAttack,
    bankReserveAttack,
    sewersReserveAttack
];
const reservedAttack = cityReserveAttacks[cityIndex] || 0;

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

let playerAttackPoints = 0;
   if (!negativeZoneAttackAndRecruit) {
    playerAttackPoints = totalAttackPoints;
   } else {
    playerAttackPoints = totalRecruitPoints;
   }
 
   if (!negativeZoneAttackAndRecruit && recruitUsedToAttack === true) {
        playerAttackPoints += totalRecruitPoints;
    }

    if (villainCard.keyword1 === "Bribe" || villainCard.keyword2 === "Bribe" || villainCard.keyword3 === "Bribe") {
        if (!negativeZoneAttackAndRecruit) {
            playerAttackPoints += totalRecruitPoints;
        } else {
            playerAttackPoints += totalAttackPoints;
        }
    }

    if (playerAttackPoints + reservedAttack >= villainAttack) {
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
        if (!negativeZoneAttackAndRecruit) {
        onscreenConsole.log(`You need ${villainAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to defeat <span class="console-highlights">${villainCard.name}</span>.`);
    } else {
        onscreenConsole.log(`Negative Zone! You need ${villainAttack}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to defeat <span class="console-highlights">${villainCard.name}</span>.`);
    }
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

    if (villainCard.goblinQueen === true) {
        finalAttack = villainCard.cost + demonGoblinDeck.length;
    }

    return Math.max(0, finalAttack);
}

// -------------------------------
// Cosmetic defeat animation helper
// -------------------------------
function animateDefeatFromRect(imgSrc, rect) {
  return new Promise((resolve) => {
    const splitContainer = document.createElement('div');
    splitContainer.className = 'split-container';
    splitContainer.style.position = 'fixed';
    splitContainer.style.left = `${rect.left}px`;
    splitContainer.style.top = `${rect.top}px`;
    splitContainer.style.width = `${rect.width}px`;
    splitContainer.style.height = `${rect.height}px`;
    splitContainer.style.zIndex = '1000';

    const makeHalf = (side) => {
      const half = document.createElement('div');
      half.className = `half-card ${side}-half`;
      half.style.backgroundImage = `url(${imgSrc})`;
      half.style.backgroundSize = 'cover';
      half.style.backgroundPosition = 'center';
      return half;
    };

    const leftHalf = makeHalf('left');
    const rightHalf = makeHalf('right');
    splitContainer.appendChild(leftHalf);
    splitContainer.appendChild(rightHalf);
    document.body.appendChild(splitContainer);

    // Kick the CSS animation
    requestAnimationFrame(() => {
      leftHalf.classList.add('split');
      rightHalf.classList.add('split');
      setTimeout(() => {
        if (splitContainer.parentNode) document.body.removeChild(splitContainer);
        resolve();
      }, 900); // match your CSS split duration
    });
  });
}

// ---------------------------------
// Draw multiple villain cards serially
// ---------------------------------
async function drawVillainCardsSequential(count) {
  for (let i = 0; i < count; i++) {
    await drawVillainCard();
  }
}

// ---------------------------------
// Main: Defeat a villain (serial & deterministic)
// ---------------------------------
async function defeatVillain(cityIndex, isInstantDefeat = false) {
  playSFX('attack');

  // Get fresh references
  const villainCard = city[cityIndex];
  if (!villainCard) {
    console.error('Villain disappeared during attack');
    onscreenConsole.log(`Error: Villain could not be targeted.`);
    return;
  }

  const cityCell = document.querySelector(`[data-city-index="${cityIndex}"]`);
  if (!cityCell) {
    console.error('City cell not found for index:', cityIndex);
    return;
  }

  const cardContainer = document.querySelector(`.card-container[data-city-index="${cityIndex}"]`);
  if (!cardContainer) {
    console.error('Card container not found in city cell:', cityIndex);
    return;
  }

  const cardImage = cardContainer.querySelector('.card-image');
  if (!cardImage) {
    console.error('Card image not found');
    return;
  }

  // Snapshot geometry BEFORE mutating game state; animation is cosmetic-only
  const rect = cardContainer.getBoundingClientRect();
  const animationPromise = animateDefeatFromRect(cardImage.src, rect);

  // ---- GAME STATE CHANGES HAPPEN FIRST ----
  currentVillainLocation = cityIndex;
  const villainCopy = createVillainCopy(villainCard);
  const villainAttack = isInstantDefeat ? 0 : recalculateVillainAttack(villainCard);

  // Clear the city slot now so subsequent draws/movement see a free space
  city[cityIndex] = null;

  // Map city indices to reserve attack variables
  const reserveAttackVars = [
    bridgeReserveAttack,    // 0 - Bridge
    streetsReserveAttack,   // 1 - Streets
    rooftopsReserveAttack,  // 2 - Rooftops
    bankReserveAttack,      // 3 - Bank
    sewersReserveAttack,    // 4 - Sewers
    mastermindReserveAttack // 5 - Mastermind
  ];

  // Handle point deduction (skip for instant defeat)
  if (!isInstantDefeat) {
    try {
      if ((!negativeZoneAttackAndRecruit && recruitUsedToAttack === true) ||
          villainCard.keyword1 === "Bribe" || villainCard.keyword2 === "Bribe" || villainCard.keyword3 === "Bribe") {

        const result = await showCounterPopup(villainCopy, villainAttack);

        let attackNeeded = result.attackUsed || 0;
        let recruitNeeded = result.recruitUsed || 0;

        // Use reserved attack points for this location first
        const reservedAttackAvailable = reserveAttackVars[cityIndex] || 0;
        const reservedAttackUsed = Math.min(attackNeeded, reservedAttackAvailable);

        // Deduct from reserved points
        if (reservedAttackUsed > 0) {
          switch (cityIndex) {
            case 0: bridgeReserveAttack -= reservedAttackUsed; break;
            case 1: streetsReserveAttack -= reservedAttackUsed; break;
            case 2: rooftopsReserveAttack -= reservedAttackUsed; break;
            case 3: bankReserveAttack -= reservedAttackUsed; break;
            case 4: sewersReserveAttack -= reservedAttackUsed; break;
            case 5: mastermindReserveAttack -= reservedAttackUsed; break;
          }
          attackNeeded -= reservedAttackUsed;
        }

        // Deduct remaining points from regular pools
        totalAttackPoints -= attackNeeded;
        totalRecruitPoints -= recruitNeeded;

        onscreenConsole.log(`You chose to use ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points to attack <span class="console-highlights">${villainCopy.name}</span>.`);
      } else {
        if (!negativeZoneAttackAndRecruit) {
          const reservedAttackAvailable = reserveAttackVars[cityIndex] || 0;
          const reservedAttackUsed = Math.min(villainAttack, reservedAttackAvailable);

          if (reservedAttackUsed > 0) {
            switch (cityIndex) {
              case 0: bridgeReserveAttack -= reservedAttackUsed; break;
              case 1: streetsReserveAttack -= reservedAttackUsed; break;
              case 2: rooftopsReserveAttack -= reservedAttackUsed; break;
              case 3: bankReserveAttack -= reservedAttackUsed; break;
              case 4: sewersReserveAttack -= reservedAttackUsed; break;
              case 5: mastermindReserveAttack -= reservedAttackUsed; break;
            }
          }

          totalAttackPoints -= (villainAttack - reservedAttackUsed);
        } else {
          totalRecruitPoints -= villainAttack;
        }
      }
    } catch (error) {
      console.error('Error handling point deduction:', error);
    }
  }

  // Update the reserve display
  updateReserveAttackAndRecruit();

  // Collect and execute operations (bystander rescues and fight effects)
  const operations = await collectDefeatOperations(villainCopy);

  // Let player choose order if there are multiple operations
  if (operations.length > 1) {
    await executeOperationsInPlayerOrder(operations, villainCopy);
  } else if (operations.length === 1) {
    await operations[0].execute();
  }

  // Post-defeat (burrow, bonuses, HYDRA draws, etc.)
  await handlePostDefeat(villainCard, villainCopy, villainAttack, cityIndex, isInstantDefeat);

  // Wait for the cosmetic animation to finish (keeps UI silky)
  await animationPromise;
}

// ---------------------------------
// Helper: deep copy of villain data (unchanged)
// ---------------------------------
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

// ---------------------------------
// Collect operations to run after defeat (unchanged)
// ---------------------------------
async function collectDefeatOperations(villainCopy) {
  const operations = [];

  // Bystander rescues
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

  // Fight effect (optional order)
  if (villainCopy.fightEffect && villainCopy.fightEffect !== "None") {
    const fightEffectFunction = window[villainCopy.fightEffect];
    if (typeof fightEffectFunction === 'function') {
      operations.push({
        name: `Trigger ${villainCopy.name}'s Fight Effect`,
        image: villainCopy.image,
        execute: async () => {
          let negate = false;
          if (typeof promptNegateFightEffectWithMrFantastic === 'function') {
            negate = await promptNegateFightEffectWithMrFantastic();
          }
          if (!negate) {
            await fightEffectFunction(villainCopy);
          }
        }
      });
    }
  }

  return operations;
}

// ---------------------------------
// Let player choose operation order (unchanged)
// ---------------------------------
async function executeOperationsInPlayerOrder(operations, villainCopy) {
  const remainingOperations = [...operations];

  while (remainingOperations.length > 0) {
    const choice = await showOperationSelectionPopup({
      title: 'Choose Order',
      instructions: 'Select next action to resolve:',
      items: remainingOperations,
      confirmText: 'CONFIRM SELECTION'
    });

    if (!choice) {
      for (const op of remainingOperations) {
        await op.execute();
      }
      break;
    }

    const selectedIndex = remainingOperations.findIndex(op => op.name === choice.name);
    const [selectedOperation] = remainingOperations.splice(selectedIndex, 1);
    await selectedOperation.execute();
    updateGameBoard();
  }
}

// ---------------------------------
// Operation selection popup (unchanged)
// ---------------------------------
async function showOperationSelectionPopup(options) {
  return new Promise((resolve) => {
    try {
      const popup = document.getElementById('card-choice-one-location-popup');
      const modalOverlay = document.getElementById('modal-overlay');
      const cardsList = document.getElementById('cards-to-choose-from');
      const confirmButton = document.getElementById('card-choice-confirm-button');
      const popupTitle = popup.querySelector('h2');
      const instructionsDiv = document.getElementById('context');
      const heroImage = document.getElementById('hero-one-location-image');
      const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

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

      const cleanup = () => {
        confirmButton.onclick = null;
        const listItems = cardsList.querySelectorAll('li');
        listItems.forEach(li => {
          li.onmouseover = null;
          li.onmouseout = null;
          li.onclick = null;
        });
      };

      function updateConfirmButton() {
        confirmButton.disabled = selectedOperation === null;
      }

      function updateInstructions() {
        if (selectedOperation === null) {
          instructionsDiv.innerHTML = options.instructions || 'Select next action to resolve:';
        } else {
          instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${selectedOperation.name}</span> will be resolved next.`;
        }
      }

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

      function toggleOperationSelection(operation, listItem) {
        if (selectedOperation === operation) {
          selectedOperation = null;
          listItem.classList.remove('selected');
          updateOperationImage(null);
        } else {
          if (selectedOperation) {
            const prevListItem = document.querySelector('li.selected');
            if (prevListItem) prevListItem.classList.remove('selected');
          }
          selectedOperation = operation;
          listItem.classList.add('selected');
          updateOperationImage(operation);
        }

        updateConfirmButton();
        updateInstructions();
      }

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
        popupTitle.textContent = 'Hero Ability!';
        instructionsDiv.textContent = 'Context';
        cardsList.innerHTML = '';
        confirmButton.style.display = 'none';
        confirmButton.disabled = true;
        heroImage.src = '';
        heroImage.style.display = 'none';
        oneChoiceHoverText.style.display = 'block';
        activeImage = null;
        popup.style.display = 'none';
        modalOverlay.style.display = 'none';
      }

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

// ---------------------------------
// Post-defeat handling (burrow, bonuses, HYDRA draws)
// ---------------------------------
async function handlePostDefeat(villainCard, villainCopy, villainAttack, cityIndex, isInstantDefeat = false) {
  // Handle Baby Hope first
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

  // Plutonium back into deck (shuffle)
  if (villainCard.plutoniumCaptured && villainCard.plutoniumCaptured.length > 0) {
    for (const plutonium of villainCard.plutoniumCaptured) {
      villainDeck.push(plutonium);
    }
    villainCard.plutoniumCaptured = [];
    shuffle(villainDeck);
    onscreenConsole.log(`Plutonium from <span class="console-highlights">${villainCard.name}</span> shuffled back into Villain Deck.`);
  }

  // X-Cutioner Heroes
  if (Array.isArray(villainCard.XCutionerHeroes) && villainCard.XCutionerHeroes.length > 0) {
    for (const hero of villainCard.XCutionerHeroes) {
      playerDiscardPile.push(hero);
      onscreenConsole.log(`You have rescued <span class="console-highlights">${hero.name}</span>. They have been added to your Discard pile.`);
    }
    villainCard.XCutionerHeroes.length = 0;
  }

  // Extra bystanders
  if (rescueExtraBystanders > 0) {
    for (let i = 0; i < rescueExtraBystanders; i++) {
      rescueBystander();
    }
  }

  if (villainCard.name === 'Dracula') {
    villainCard.attack = 3;
    villainCard.cost = 0;
  }

  const burrowingVillain = (
    villainCard.keyword1 === 'Burrow' ||
    villainCard.keyword2 === 'Burrow' ||
    villainCard.keyword3 === 'Burrow'
  );

  const inStreetsNow = cityIndex === 1;
  const streetsFree = ((city[1] === '' || city[1] === null) && destroyedSpaces[1] === false);

  // Burrow logic
  if (burrowingVillain) {
    if (inStreetsNow) {
      victoryPile.push(villainCard);
      onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> is in the Streets and cannot burrow. They have been defeated!`);
    } else if (streetsFree) {
      city[1] = villainCard;
      onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> was defeated but has burrowed to the Streets! You'll have to fight them again!`);
    } else {
      victoryPile.push(villainCard);
      onscreenConsole.log(`The Streets are ${destroyedSpaces[1] === false ? 'occupied' : 'destroyed'} so <span class="console-highlights">${villainCard.name}</span> cannot burrow and has been defeated!`);
    }
  } else {
    if (!villainCard.skrulled) {
        victoryPile.push(villainCard);
        onscreenConsole.log(`<span class="console-highlights">${villainCard.name}</span> has been defeated.`);
    }    
  }

  if (villainCard.killbot === true) {
    bystanderBonuses();
  }
  addHRToTopWithInnerHTML();

  // Note: DO NOT clear city[cityIndex] here — it's already cleared in defeatVillain()

  // Location bonuses
  try {
    if (thingCrimeStopperRescue && cityIndex == 3) {
      onscreenConsole.log(`You defeated <span class="console-highlights">${villainCard.name}</span> in the Bank. Rescuing a Bystander.`);
      await rescueBystander();
    }

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

  // Professor X Mind Control
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
  removeCosmicThreatBuff(cityIndex);

  // Endless Armies of HYDRA: draw TWO villain cards serially (no race conditions)
  if (villainCard.name === "Endless Armies of HYDRA") {
	  onscreenConsole.log(`Fight! <span class="console-highlights">Endless Armies of HYDRA</span> forces you to play the top two cards of the Villain Deck.`);
    await drawVillainCardsSequential(2);
  }

  if (villainCard.wasSkrulled === true) {
    victoryPile.pop(villainCard);
  }

  // One redraw at the end of post-defeat processing
  updateGameBoard();
}

// ---------------------------------
// Professor X Mind Control (unchanged)
// ---------------------------------
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

// Updated original functions to use the combined function
async function confirmAttack(cityIndex) {
    await defeatVillain(cityIndex, false);
}

async function instantDefeatAttack(cityIndex) {
    await defeatVillain(cityIndex, true);
}

function cosmicThreat(card, index, attackReduction, className) {
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
  const cardText = cardCount === 1 ? 'card' : 'cards';
  onscreenConsole.log(`Cosmic Threat! You have revealed ${cardCount} <img src="Visual Assets/Icons/${className}.svg" alt="${className} Icon" class="console-card-icons"> ${cardText}. <span class="console-highlights">${card.name}</span> gets -${attackReduction} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
  updateGameBoard();
}


// Call whenever an attack is completed
function removeCosmicThreatBuff(cityIndex) {
    if (cityIndex === 0 && city1CosmicThreat > 0) {
        city1TempBuff += city1CosmicThreat;
        city1CosmicThreat = 0;
    } 
    else if (cityIndex === 1 && city2CosmicThreat > 0) {
        city2TempBuff += city2CosmicThreat;
        city2CosmicThreat = 0;
    } 
    else if (cityIndex === 2 && city3CosmicThreat > 0) {
        city3TempBuff += city3CosmicThreat;
        city3CosmicThreat = 0;
    } 
    else if (cityIndex === 3 && city4CosmicThreat > 0) {
        city4TempBuff += city4CosmicThreat;
        city4CosmicThreat = 0;
    } 
    else if (cityIndex === 4 && city5CosmicThreat > 0) {
        city5TempBuff += city5CosmicThreat;
        city5CosmicThreat = 0;
    }

    updateGameBoard();
}

function applyMastermindCosmicThreat(mastermindCard, attackReduction, label) {
  // Apply temp buff
  mastermindTempBuff -= attackReduction;
  // Record for later removal
  mastermindCosmicThreat = attackReduction;

  const cardCount = attackReduction / 3;
  const cardText = cardCount === 1 ? 'card' : 'cards';

  onscreenConsole.log(
    `Cosmic Threat! You have revealed ${cardCount} ${label} ${cardText}. `
    + `<span class="console-highlights">${mastermindCard.name}</span> gets `
    + `-${attackReduction} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`
  );

  updateGameBoard();
}

// Call when Mastermind attack finishes resolving (to remove temp reduction)
function removeMastermindCosmicThreatBuff() {
    mastermindTempBuff += mastermindCosmicThreat;
    mastermindCosmicThreat = 0;
    updateGameBoard();
}

async function showGalactusClassChoicePopup() {
  return new Promise((resolve) => {
    const popup = document.getElementById('card-choice-one-location-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const cardsList = document.getElementById('cards-to-choose-from');
    const confirmButton = document.getElementById('card-choice-confirm-button');
    const popupTitle = popup.querySelector('h2');
    const instructionsDiv = document.getElementById('context');
    const heroImage = document.getElementById('hero-one-location-image');
    const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');
    const closeBtn = document.getElementById('close-choice-button'); // <- use this

    // Init UI (same as you had)
    popupTitle.textContent = 'Choose a Class';
    instructionsDiv.textContent = 'Select a class to reveal for Galactus’s Cosmic Threat.';
    cardsList.innerHTML = '';
    confirmButton.style.display = 'inline-block';
    confirmButton.disabled = true;
    confirmButton.textContent = 'Select Class';
    modalOverlay.style.display = 'block';
    popup.style.display = 'block';

    heroImage.src = 'Visual Assets/Masterminds/FantasticFour_Galactus.webp';
    heroImage.style.display = 'block';
    oneChoiceHoverText.style.display = 'none';

    const options = ['Strength','Instinct','Covert','Tech','Range'];
    let selected = null;

    function resetPopupUI() {
      popupTitle.textContent = 'Hero Ability!';
      instructionsDiv.textContent = 'Context';
      confirmButton.textContent = 'Confirm';
      confirmButton.disabled = true;
      heroImage.src = '';
      heroImage.style.display = 'none';
      oneChoiceHoverText.style.display = 'block';
      popup.style.display = 'none';
      modalOverlay.style.display = 'none';
    }

    function finish(result) {
      resetPopupUI();
      resolve(result); // 'Strength' | 'Instinct' | 'Covert' | 'Tech' | 'Range' | null
    }

    options.forEach(opt => {
      const li = document.createElement('li');
      li.innerHTML = `<span style="white-space: nowrap;">
        <img src="Visual Assets/Icons/${opt}.svg" alt="${opt} Icon" class="popup-card-icons"> ${opt}
      </span>`;
      li.onclick = () => {
        Array.from(cardsList.children).forEach(n => n.classList.remove('selected'));
        li.classList.add('selected');
        selected = opt;
        confirmButton.disabled = false;
        instructionsDiv.innerHTML = `Selected: <span class="console-highlights">${opt}</span>`;
      };
      cardsList.appendChild(li);
    });

    confirmButton.onclick = () => {
      if (selected) finish(selected);
    };

    // NEW: cancel path with the provided button
    if (closeBtn) {
      closeBtn.style.display = 'inline-block';
      closeBtn.onclick = () => finish(null);
    }
    // (Optional) overlay click to cancel:
    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) finish(null);
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

        // Remove existing confirm button if present
        const existingConfirm = document.getElementById('hero-KO-confirm');
        if (existingConfirm) heroKOPopup.removeChild(existingConfirm);

        const confirmButton = document.createElement('button');
        confirmButton.id = 'hero-KO-confirm';
        confirmButton.textContent = 'CONFIRM';
        confirmButton.style.display = 'inline-block';
        confirmButton.style.width = '50%';
        confirmButton.style.marginTop = '2vh';
        confirmButton.disabled = true;

        heroImage.style.display = 'none';
        hoverText.style.display = 'block';

        heroOptions.innerHTML = '';
        let selectedHQIndex = null;
        let activeImage = null;

        heroKOPopup.appendChild(confirmButton);

		updateGameBoard();

        // Build list retaining original HQ indices
        const eligible = hq
            .map((hero, hqIndex) => ({ hero, hqIndex }))
            .filter(x => x.hero && x.hero.cost <= 6);

        if (eligible.length === 0) {
            onscreenConsole.log('No Heroes available with a cost of 6 or less.');
            // Ensure UI is closed if it was open
            heroKOPopup.style.display = 'none';
            modalOverlay.style.display = 'none';
            resolve();
            return;
        }

        const createTeamIconHTML = (value) => {
            if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
                return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="popup-card-icons">';
            }
            return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
        };
        const createClassIconHTML = (value) => {
            if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') return '';
            return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="popup-card-icons">`;
        };

        // Populate hero options
        eligible.forEach(({ hero, hqIndex }) => {
            const heroButton = document.createElement('button');
            heroButton.classList.add('hero-option');
            heroButton.setAttribute('data-hq-index', String(hqIndex));

            const teamIcon = createTeamIconHTML(hero.team);
            const class1Icon = createClassIconHTML(hero.class1);
            const class2Icon = createClassIconHTML(hero.class2);
            const class3Icon = createClassIconHTML(hero.class3);

            heroButton.innerHTML = `<span style="white-space: nowrap;">HQ-${hqIndex + 1} | ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${hero.name}</span>`;

            // Hover
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

            // Select
            heroButton.onclick = () => {
                const thisHQIndex = Number(heroButton.getAttribute('data-hq-index'));
                if (selectedHQIndex === thisHQIndex) {
                    // Deselect
                    selectedHQIndex = null;
                    heroButton.classList.remove('selected');
                    activeImage = null;
                    heroImage.src = '';
                    heroImage.style.display = 'none';
                    hoverText.style.display = 'block';
                    confirmButton.disabled = true;
                } else {
                    // Deselect previous by HQ index
                    if (selectedHQIndex !== null) {
                        const prevButton = heroOptions.querySelector(`button[data-hq-index="${selectedHQIndex}"]`);
                        if (prevButton) prevButton.classList.remove('selected');
                    }
                    selectedHQIndex = thisHQIndex;
                    heroButton.classList.add('selected');
                    activeImage = hero.image;
                    heroImage.src = hero.image;
                    heroImage.style.display = 'block';
                    hoverText.style.display = 'none';
                    confirmButton.disabled = false;
                }
            };

            heroOptions.appendChild(heroButton);
        });

        // Confirm
        confirmButton.onclick = () => {
            if (selectedHQIndex === null) return;

            // Optional: log the actual hero being KO’d
            const hero = hq[selectedHQIndex];
            koHeroInHQ(selectedHQIndex); // <-- pass true HQ index

            // Cleanup & close
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

function showDiscardCardPopup(escapedVillain) {

    if (playerHand.length === 0) {
        onscreenConsole.log(`You have no cards available to discard.`);
        return;
    }
    
    return new Promise(async (resolve) => {
        const availableCards = playerHand
            .filter(card => card) 
            .map((card, index) => ({ ...card, uniqueId: `${card.id}-${index}` }));


        const popup = document.getElementById('card-choice-one-location-popup');
        const modalOverlay = document.getElementById('modal-overlay');
        const cardsList = document.getElementById('cards-to-choose-from');
        const confirmButton = document.getElementById('card-choice-confirm-button');
        const popupTitle = popup.querySelector('h2');
        const instructionsDiv = document.getElementById('context');
        const heroImage = document.getElementById('hero-one-location-image');
        const oneChoiceHoverText = document.getElementById('oneChoiceHoverText');

        // Hide the "No Thanks" button
        document.getElementById('close-choice-button').style.display = 'none';

        // Initialize UI
        popupTitle.textContent = 'DISCARD';
        instructionsDiv.innerHTML = `<span class="console-highlights">${escapedVillain.name}</span> escaped with a Bystander! Discard 1 card.`;
        cardsList.innerHTML = '';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = true;
        confirmButton.textContent = 'Discard';
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';

        let selectedCards = [];
        let activeImage = null;

        function updateConfirmButton() {
            confirmButton.disabled = selectedCards.length !== 1;
        }

        function updateInstructions() {
            if (selectedCards.length < 1) {
                instructionsDiv.innerHTML = `<span class="console-highlights">${escapedVillain.name}</span> escaped with a Bystander! Discard 1 card.`;
            } else {
                const namesList = selectedCards.map(card => 
                    `<span class="console-highlights">${card.name}</span>`
                ).join(', ');
                instructionsDiv.innerHTML = `Selected: ${namesList} will be discarded.`;
            }
        }

        function updateCardImage(card) {
            if (card) {
                heroImage.src = card.image;
                heroImage.style.display = 'block';
                oneChoiceHoverText.style.display = 'none';
                activeImage = card.image;
            } else {
                heroImage.src = '';
                heroImage.style.display = 'none';
                oneChoiceHoverText.style.display = 'block';
                activeImage = null;
            }
        }

        function toggleCardSelection(card, listItem) {
            const index = selectedCards.findIndex(c => c.uniqueId === card.uniqueId);
            
            if (index > -1) {
                selectedCards.splice(index, 1);
                listItem.classList.remove('selected');
            } else {
                if (selectedCards.length >= 1) {
                    const firstSelected = document.querySelector(`[data-card-id="${selectedCards[0].uniqueId}"]`);
                    if (firstSelected) firstSelected.classList.remove('selected');
                    selectedCards.shift();
                }
                selectedCards.push(card);
                listItem.classList.add('selected');
            }

            updateCardImage(selectedCards[selectedCards.length - 1] || null);
            updateConfirmButton();
            updateInstructions();
        }
genericCardSort(availableCards);
        // Populate the list with available cards
        availableCards.forEach(card => {
            const li = document.createElement('li');
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
    
    li.innerHTML = `<span style="white-space: nowrap;">| ${teamIcon} | ${class1Icon} ${class2Icon} ${class3Icon} | ${card.name}</span>`;

            li.setAttribute('data-card-id', card.uniqueId);

            li.onmouseover = () => {
                if (!activeImage) {
                    heroImage.src = card.image;
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

            li.onclick = () => toggleCardSelection(card, li);
            cardsList.appendChild(li);
        });

        confirmButton.onclick = async () => {
            if (selectedCards.length === 1) {
                const returnedCards = [];
                for (const card of selectedCards) {
                    const indexInHand = playerHand.findIndex(c => c.id === card.id);
                    if (indexInHand !== -1) {
                        playerHand.splice(indexInHand, 1);
                        const { returned } = await checkDiscardForInvulnerability(card);
                        returnedCards.push(...returned);
                    }
                }
                
                // Add back any invulnerable cards
                if (returnedCards.length > 0) {
                    playerHand.push(...returnedCards);
                }
                
                closePopup();
                updateGameBoard();
                resolve();
            }
        };

        function closePopup() {
            popupTitle.textContent = 'Hero Ability!';
            instructionsDiv.textContent = 'Context';
            confirmButton.textContent = 'Confirm';
            confirmButton.disabled = true;
            heroImage.src = '';
            heroImage.style.display = 'none';
            oneChoiceHoverText.style.display = 'block';
            activeImage = null;

            popup.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
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
    let playerAttackPoints = 0;

    if (!negativeZoneAttackAndRecruit) {
        playerAttackPoints = totalAttackPoints;
    } else {
        playerAttackPoints = totalRecruitPoints;
    }

    // Calculate effective attack points considering recruit usage and Bribe
    if (recruitUsedToAttack === true && !negativeZoneAttackAndRecruit) {
        playerAttackPoints += totalRecruitPoints;
    }

    // Check for Bribe keyword on Mastermind or its tactics
    const hasBribeKeyword = mastermind.keyword1 === "Bribe" || 
                           mastermind.keyword2 === "Bribe" || 
                           mastermind.keyword3 === "Bribe";

    if (hasBribeKeyword && !negativeZoneAttackAndRecruit) {
        playerAttackPoints += totalRecruitPoints;
    }

    if (hasBribeKeyword && negativeZoneAttackAndRecruit) {
        playerAttackPoints += totalAttackPoints;
    }

    // Calculate total available points (any combination)
    const totalAvailablePoints = totalAttackPoints + totalRecruitPoints;

    // Check if player can pay forcefield AND attack mastermind
    let canAttack = false;
    let requiredPoints = mastermindAttack;

    if (invincibleForceField > 0) {
        // Must pay forcefield first from total points, then have enough appropriate points for mastermind
        const pointsAfterForcefield = totalAvailablePoints - invincibleForceField;
        
        if (pointsAfterForcefield >= 0) {
            // Now check if we have enough of the right type of points for the mastermind attack
            if (hasBribeKeyword || recruitUsedToAttack) {
                // Can use any combination of points for mastermind attack
                canAttack = pointsAfterForcefield >= mastermindAttack;
            } else {
                // Can only use attack points for mastermind attack
                // Calculate how many attack points are left after paying forcefield
                // (Forcefield can be paid with any points, but we prioritize using recruit points first)
                const recruitUsedForForcefield = Math.min(invincibleForceField, totalRecruitPoints);
                const attackUsedForForcefield = invincibleForceField - recruitUsedForForcefield;
                const attackPointsLeft = totalAttackPoints - attackUsedForForcefield;
                
                canAttack = attackPointsLeft >= mastermindAttack;
            }
            requiredPoints = mastermindAttack + invincibleForceField;
        }
    } else {
        // No forcefield - normal rules
        if (hasBribeKeyword || recruitUsedToAttack) {
            canAttack = totalAvailablePoints + mastermindReserveAttack >= mastermindAttack;
        } else {
            canAttack = playerAttackPoints + mastermindReserveAttack >= mastermindAttack;
        }
    }

    // Handle different attack scenarios
    if (mastermind.tactics.length === 0) {
        const defeatedMasterminds = victoryPile.filter(card => card.type === "Mastermind");
        
        if (finalBlowEnabled === true && defeatedMasterminds.length < 5) {
            if (canAttack) {
                showMastermindAttackButton();
                onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> has no tactics remaining - deliver the Final Blow!`);
                return;
            } else {
                if (!negativeZoneAttackAndRecruit) {
                    if (invincibleForceField > 0) {
                        onscreenConsole.log(`You need ${requiredPoints}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> (${mastermindAttack} + ${invincibleForceField} forcefield) to deliver the Final Blow to <span class="console-highlights">${mastermind.name}</span>.`);
                    } else {
                        onscreenConsole.log(`You need ${mastermindAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to deliver the Final Blow to <span class="console-highlights">${mastermind.name}</span>.`);
                    }
                } else {
                    if (invincibleForceField > 0) {
                        onscreenConsole.log(`Negative Zone! You need ${requiredPoints}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> (${mastermindAttack} + ${invincibleForceField} forcefield) to deliver the Final Blow to <span class="console-highlights">${mastermind.name}</span>.`);
                    } else {
                        onscreenConsole.log(`Negative Zone! You need ${mastermindAttack}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to deliver the Final Blow to <span class="console-highlights">${mastermind.name}</span>.`);
                    }
                }
            }
        } else {
            onscreenConsole.log(`<span class="console-highlights">${mastermind.name}</span> has been defeated! Finish your turn to win.`);
        }
    } else if (canAttack) {
        showMastermindAttackButton();
        return;
    } else {
        if (!negativeZoneAttackAndRecruit) {
            if (invincibleForceField > 0) {
                onscreenConsole.log(`You need ${invincibleForceField} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> / <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to break through <span class="console-highlights">${mastermind.name}</span><span class="bold-spans">'s</span> force field${invincibleForceField === 1 ? '' : 's'} and ${mastermindAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to defeat them.`);
            } else {
                onscreenConsole.log(`You need ${mastermindAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to defeat <span class="console-highlights">${mastermind.name}</span>.`);
            }
        } else {
            if (invincibleForceField > 0) {
                onscreenConsole.log(`You need ${invincibleForceField} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> / <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to break through <span class="console-highlights">${mastermind.name}</span><span class="bold-spans">'s</span> force field${invincibleForceField === 1 ? '' : 's'} and ${mastermindAttack}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to defeat them.`);
            } else {
                onscreenConsole.log(`Negative Zone! You need ${mastermindAttack}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to defeat <span class="console-highlights">${mastermind.name}</span>.`);
            }
        }
    }
}
// Add the initial listener
document.getElementById('mastermind').addEventListener('click', handleMastermindClick);



function showMastermindAttackButton() {
    let mastermind = getSelectedMastermind();
    const mastermindAttackButton = document.getElementById('mastermind-attack-button');
    let mastermindAttack = recalculateMastermindAttack(mastermind);

    mastermindAttackButton.style.display = 'block';
    
    const handleClickOutside = (event) => {
        // Check if the click is NOT on the attack button itself
        if (!mastermindAttackButton.contains(event.target) && event.target !== mastermindAttackButton) {
            mastermindAttackButton.style.display = 'none';
            document.removeEventListener('click', handleClickOutside);
        }
    };

    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 0);

    // Remove any existing click handler first to prevent duplicates
    mastermindAttackButton.onclick = null;
    
    // Make the click handler async
    mastermindAttackButton.onclick = async (event) => {
        // Stop propagation to prevent handleClickOutside from firing
        event.stopPropagation();
        
        isAttacking = true;
        mastermindAttackButton.style.display = 'none';
        healingPossible = false;
        
        // Remove the outside click listener immediately
        document.removeEventListener('click', handleClickOutside);
        
        try {
            await confirmMastermindAttack();
        } catch (error) {
            console.error("Attack failed:", error);
            onscreenConsole.log(`<span class="console-error">Attack failed: ${error.message}</span>`);
        } finally {
            updateGameBoard();
            isAttacking = false;
        }
    };
}

async function confirmMastermindAttack() {
    playSFX('attack');
    try {
        const mastermind = getSelectedMastermind();
        healingPossible = false;
        const mastermindAttack = recalculateMastermindAttack(mastermind);

        // Handle forcefield cost first
if (invincibleForceField > 0) {
    // Calculate maximum allowed usage for forcefield while leaving enough for mastermind
    let maxAttackForForcefield;
    let maxRecruitForForcefield;
    
    if (canUseRecruitForMastermind()) {
        // Can use any combination for both forcefield and mastermind
        // Only limit is total available points
        maxAttackForForcefield = totalAttackPoints;
        maxRecruitForForcefield = totalRecruitPoints;
    } else {
        // Can only use attack points for mastermind attack
        // Must leave at least mastermindAttack worth of attack points
        maxAttackForForcefield = Math.max(0, totalAttackPoints - mastermindAttack);
        maxRecruitForForcefield = totalRecruitPoints; // Can use all recruit for forcefield
    }
    
    // Also ensure we don't exceed the forcefield cost itself
    maxAttackForForcefield = Math.min(maxAttackForForcefield, invincibleForceField);
    maxRecruitForForcefield = Math.min(maxRecruitForForcefield, invincibleForceField);
    
    const result = await showForcefieldPopup(mastermind, invincibleForceField, maxAttackForForcefield, maxRecruitForForcefield, mastermindAttack);
    
    totalAttackPoints -= result.attackUsed || 0;
    totalRecruitPoints -= result.recruitUsed || 0;
    
    onscreenConsole.log(`You used ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to disable <span class="console-highlights">${mastermind.name}</span><span class="bold-spans">'s</span> force fields.`);
}
        // Handle doom delay logic
        if (doomDelayEndGameFinalBlow) {
            delayEndGame = (mastermindDefeatTurn === turnCount);
        }

        // Create a copy of the mastermind data
        const mastermindCopy = createMastermindCopy(mastermind);

            const hasBribeKeyword = mastermind.keyword1 === "Bribe" || 
                          mastermind.keyword2 === "Bribe" || 
                          mastermind.keyword3 === "Bribe";

    // Handle point deduction
if ((!negativeZoneAttackAndRecruit && recruitUsedToAttack) || hasBribeKeyword) {
    const result = await showCounterPopup(mastermind, mastermindAttack);
    
    let attackNeeded = result.attackUsed;
    let recruitNeeded = result.recruitUsed;
    
    // Use Mastermind's reserved attack points first
    const reservedAttackUsed = Math.min(attackNeeded, mastermindReserveAttack);
    if (reservedAttackUsed > 0) {
        mastermindReserveAttack -= reservedAttackUsed;
        attackNeeded -= reservedAttackUsed;
    }
    
    // Deduct remaining points from regular pools
    totalAttackPoints -= attackNeeded;
    totalRecruitPoints -= recruitNeeded;
    
    onscreenConsole.log(`You used ${result.attackUsed} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${result.recruitUsed} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points to attack.`);
} else {
    if (!negativeZoneAttackAndRecruit) {
        // Use Mastermind's reserved attack points first
        const reservedAttackUsed = Math.min(mastermindAttack, mastermindReserveAttack);
        if (reservedAttackUsed > 0) {
            mastermindReserveAttack -= reservedAttackUsed;
       }
        
        // Deduct remaining from regular attack points
        totalAttackPoints -= (mastermindAttack - reservedAttackUsed);
    } else {
        totalRecruitPoints -= mastermindAttack;
    }
}

// Update the reserve display after modifying reserved points
updateReserveAttackAndRecruit();
removeMastermindCosmicThreatBuff();

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

// Helper function to check if recruit can be used for mastermind attack
function canUseRecruitForMastermind() {
    const mastermind = getSelectedMastermind();
    const hasBribeKeyword = mastermind.keyword1 === "Bribe" || 
                           mastermind.keyword2 === "Bribe" || 
                           mastermind.keyword3 === "Bribe";
    
    return hasBribeKeyword || recruitUsedToAttack;
}

async function showForcefieldPopup(mastermind, forcefieldCost, maxAttack, maxRecruit, mastermindAttack) {
    return new Promise((resolve, reject) => {
        counterResolve = resolve;
        counterReject = reject;
        
        // Store the mastermind attack for validation
        window.mastermindAttackForValidation = mastermindAttack;
        
        // Set up the popup for forcefield
        const cardImage = document.getElementById('bribe-card-image');
        if (cardImage) {
            cardImage.src = mastermind.image;
            cardImage.style.display = 'block';
        }
        
        const popupH2 = document.getElementById('bribe-popup-h2');
        if (popupH2) {
            popupH2.innerHTML = `Break through <span class="console-highlights">${mastermind.name}</span>'s Force Field`;
        }
        
        // Update instructions
        const instructionsEl = document.getElementById('bribe-instructions');
        if (instructionsEl) {
            instructionsEl.innerHTML = 
                `Pay ${forcefieldCost} points to break the force field, but leave at least ${mastermindAttack} ${canUseRecruitForMastermind() ? 'total' : 'attack'} points for the mastermind.`;
        }
        
        // Use the existing counter initialization
        initializeCounters(forcefieldCost, maxAttack, maxRecruit);
        
        // Run initial validation
        validateForcefieldSelection(mastermindAttack);
        
        // Show popup
        document.getElementById('bribe-popup').style.display = 'block';
        document.getElementById('modal-overlay').style.display = 'block';
    });
}

// Add reset function to clean up after popup closes
function resetBribePopup() {
    const cardImage = document.getElementById('bribe-card-image');
    if (cardImage) {
        cardImage.style.display = 'none';
        cardImage.src = '';
    }
    
    const popupH2 = document.getElementById('bribe-popup-h2');
    if (popupH2) {
        popupH2.innerHTML = 'Attack or Recruit?';
    }
    
    const instructionsEl = document.getElementById('bribe-instructions');
    if (instructionsEl) {
        instructionsEl.innerHTML = 'What combination of <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="card-icons"> and <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="card-icons"> points would you like to use?';
    }
    
    // Reset counters
    counterA = 0;
    counterB = 0;
    document.getElementById('counterA').innerText = '0';
    document.getElementById('counterB').innerText = '0';
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
    localStorage.setItem('restartFlag', 'true');
    returnHome();
});

async function showDrawPopup() {
if (delayEndGame) {
     onscreenConsole.log(`You would have drawn with your enemies, but you've already stopped the Mastermind!`);
    return;
}

    const gameEndTime = new Date();
    const timePlayed = gameEndTime - gameStartTime; // Difference in milliseconds
    
    // Format and display the time
    const formattedTime = formatTime(timePlayed);
    document.getElementById('time-total').textContent = formattedTime;

generateStatsScreen();
generateGameScore();

    const drawPopup = document.getElementById('draw-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const drawText = document.getElementById('draw-context');
    const score = document.getElementById('score-content');
    const stats = document.getElementById('stats-content');
    drawPopup.style.display = 'block';
    modalOverlay.style.display = 'block';
    score.style.display = 'block';
    stats.style.display = 'block';
playSFX('game-draw');

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

        case "Bathe Earth in Cosmic Rays":
            drawText.innerHTML = `The cosmic ray bombardment has been halted, but ${mastermind.name} escaped to prepare another strike.`;
            break;

        case "Flood the Planet with Melted Glaciers":
            drawText.innerHTML = `The flooding has been stopped, but ${mastermind.name} escaped to set their sights on a new and even more dangerous plan.`;
            break;

        case "Invincible Force Field":
            drawText.innerHTML = `The force field has been weakened, but ${mastermind.name} remains an active threat!`;
            break;

        case "Pull Reality into the Negative Zone":
            drawText.innerHTML = `You've sealed some dimensional breaches but ${mastermind.name} only keeps creating more.`;
            break;
        
        default:
            drawText.innerHTML = ``;
            break;

        }
    }

gameIsOver = true;
}

function closeDrawPopup() {
    const drawPopup = document.getElementById('draw-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    drawPopup.style.display = 'none';
    modalOverlay.style.display = 'none';
    const score = document.getElementById('score-content');
    const stats = document.getElementById('stats-content');
    score.style.display = 'none';
    stats.style.display = 'none';
}

function generateGameScore() {
    const totalVictoryPoints = calculateVictoryPoints(victoryPile);
    document.getElementById('ENDGAMEvictoryPointsTotal').innerText = totalVictoryPoints;

    const totalTurnsTaken = turnCount;
    document.getElementById('ENDGAMEtotalTurnsTaken').innerText = totalTurnsTaken;
   
const averageVPPerTurn = totalTurnsTaken > 0 
    ? Math.ceil((totalVictoryPoints / totalTurnsTaken) * 10) / 10 
    : 0.0;
document.getElementById('ENDGAMEaverageVPPerTurn').innerText = averageVPPerTurn;

const numberOfEscapes = escapedVillainsDeck.filter(item => item.type !== 'Bystander').length;
document.getElementById('ENDGAMEnumberOfEscapes').innerText = numberOfEscapes;

const minusSchemes = schemeTwistCount * 3;
const minusVillains = escapedVillainsDeck.filter(item => item.type === 'Villain').length;
const minusBystanders = escapedVillainsDeck.filter(item => item.type === 'Bystander').length;;

const traditionalScore = Math.max(0, totalVictoryPoints - minusSchemes - minusVillains - minusBystanders);
document.getElementById('traditional-score').innerText = traditionalScore;
}

function returnHome() {
    window.location.href = 'index.html?restart=true';
}

async function checkDefeat() {
    // Check if defeat should be delayed due to victory conditions
    if (finalBlowEnabled && victoryPile.filter(obj => obj.type === "Mastermind").length === 5) {
        onscreenConsole.log(`You would have been defeated, but you've already stopped the Mastermind!`);
        return false;
    }

    if (!finalBlowEnabled && victoryPile.filter(obj => obj.type === "Mastermind").length === 4) {
        onscreenConsole.log(`You would have been defeated, but you've already stopped the Mastermind!`);
        return false;
    }

    if (delayEndGame) {
        onscreenConsole.log(`You would have been defeated, but you've already stopped the Mastermind!`);
        return false;
    }

    // Check mastermind-specific defeat conditions
    const mastermind = getSelectedMastermind();
    const mastermindEndGame = mastermind ? mastermind.endGame : null;
    
    if (mastermindEndGame) {
        switch (mastermindEndGame) {
            case "fourHorsemen":
                const villainGroups = escapedVillainsDeck.reduce((acc, card) => {
                    if (card.villainId) {
                        if (!acc[card.villainId]) {
                            acc[card.villainId] = new Set();
                        }
                        acc[card.villainId].add(card.name);
                    }
                    return acc;
                }, {});

                const hasFourUniqueFromSameGroup = Object.values(villainGroups).some(
                    uniqueNames => uniqueNames.size >= 4
                );

                if (hasFourUniqueFromSameGroup) {
                    document.getElementById('defeat-context').innerHTML = `<span class="console-highlights">Apocalypse</span><span class="bold-spans">'s</span> Always Leads Villain group have escaped!`;
                    return true;
                }
                break;
                
            case "cityDestroyed":
                const allSpacesDestroyed = destroyedSpaces.every(space => space === true);
                
                if (allSpacesDestroyed) {
                    onscreenConsole.log("The entire city has been destroyed!");
                    return true;
                }
                break;

            default:
                console.log(`Mastermind End Game "${mastermindEndGame}" is not yet defined.`);
                break;
        }
    }

    return false;
}


function showDefeatPopup() {
    const gameEndTime = new Date();
    const timePlayed = gameEndTime - gameStartTime; // Difference in milliseconds
    
    // Format and display the time
    const formattedTime = formatTime(timePlayed);
    document.getElementById('time-total').textContent = formattedTime;

    generateStatsScreen();
    generateGameScore();

    const defeatPopup = document.getElementById('defeat-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const score = document.getElementById('score-content');
    const stats = document.getElementById('stats-content');
    defeatPopup.style.display = 'block';
    modalOverlay.style.display = 'block';
    score.style.display = 'block';
    stats.style.display = 'block';
    playSFX('evil-wins');

    document.getElementById('player-deck-card-back').addEventListener('click', openPlayerDeckPopup);
    document.getElementById('hero-deck-card-back').addEventListener('click', openHeroDeckPopup);
    document.getElementById('villain-deck-card-back').addEventListener('click', openVillainDeckPopup);
    document.getElementById('wound-label').addEventListener('click', openWoundDeckPopup);
    document.getElementById('sidekick-deck-card-back').addEventListener('click', openSidekickDeckPopup);
    document.getElementById('shield-deck-card-back').addEventListener('click', openShieldDeckPopup);
    document.getElementById('bystander-label').addEventListener('click', openBystanderDeckPopup);

    gameIsOver = true;
}

document.getElementById('defeat-return-home-button').addEventListener('click', () => {
    closeDefeatPopup();
    returnHome();
});

function closeDefeatPopup() {
    const defeatPopup = document.getElementById('defeat-popup');
const modalOverlay = document.getElementById('modal-overlay');
    const score = document.getElementById('score-content');
    const stats = document.getElementById('stats-content');
    defeatPopup.style.display = 'none';
modalOverlay.style.display = 'none';
    score.style.display = 'none';
    stats.style.display = 'none';
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
    const gameEndTime = new Date();
    const timePlayed = gameEndTime - gameStartTime; // Difference in milliseconds
    
    // Format and display the time
    const formattedTime = formatTime(timePlayed);
    document.getElementById('time-total').textContent = formattedTime;

    generateStatsScreen();
    generateGameScore();

const winPopup = document.getElementById('win-popup');
const modalOverlay = document.getElementById('modal-overlay');
    const score = document.getElementById('score-content');
    const stats = document.getElementById('stats-content');

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

        case "Secret Invasion of the Skrull Shapeshifters":
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

        case "Bathe Earth in Cosmic Rays":
            winText.innerHTML = `You've stopped ${mastermind.name} from bathing the planet in cosmic rays. Earth's heroes remain unscathed and ready to defend the world. Excellent work!`;
            break;

        case "Flood the Planet with Melted Glaciers":
            winText.innerHTML = `You've stopped ${mastermind.name} from flooding the planet with melted glaciers. The waters recede and the world is safe. Excellent work!`;
            break;

        case "Invincible Force Field":
            winText.innerHTML = `You've shattered ${mastermind.name}'s invincible force field. With their defenses down, the threat is over. Excellent work!`;
            break;

        case "Pull Reality into the Negative Zone":
            winText.innerHTML = `You've stopped ${mastermind.name} from pulling reality into the Negative Zone. The dimensional breach is sealed and the world is safe. Excellent work!`;
            break;
        
        default:
            winText.innerHTML = `You have defeated the Mastermind and prevented their nefarious scheme! Excellent work!`;
            break;

        }
    }

winPopup.style.display = 'block';
modalOverlay.style.display = 'block';
    score.style.display = 'block';
    stats.style.display = 'block';
playSFX('good-wins');

gameIsOver = true;
}

document.getElementById('win-return-home-button').addEventListener('click', () => {
    localStorage.setItem('restartFlag', 'true');
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
const zoomedImageTop = document.getElementById('zoomed-image-top');
let activeImage = null; // Track the currently locked image

const excludedZoomClasses = ['console-card-icons', 'card-image-back', 'card-icons', 'overlay-recruit-icons', 'overlay-attack-icons', 'bribe-card-icons', 'hq-explosions', 'popup-card-icons', 'settingsCog', 'reserved-card-icons', 'cosmic-threat-card-icons', 'overlay-focus-icons', 'popup', 'fullscreen-background', 'hq-wrapper', 'container', 'keywords', 'console-log' ];

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
    zoomedImageTop.src = imageUrl;
    zoomedImageTop.style.display = 'block';
}

// Function to hide the zoomed image (only if no image is locked)
function hideZoomedImage() {
    if (!activeImage) { 
        zoomedImage.style.display = 'none';
        zoomedImage.src = '';
        zoomedImageTop.style.display = 'none';
        zoomedImageTop.src = '';
    }
}

// Function to get the correct image URL from an element
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
    
    // Check for background images - more robust approach
    const style = window.getComputedStyle(element);
    const backgroundImage = style.backgroundImage;
    
    // Check if there's a background image and it's not 'none'
    if (backgroundImage && backgroundImage !== 'none' && backgroundImage !== 'initial' && backgroundImage !== 'inherit') {
        // Extract URL using a more comprehensive regex
        const urlMatch = backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
        
        if (urlMatch && urlMatch[1]) {
            return urlMatch[1];
        }
    }
    
    // Also check inline styles as fallback
    const inlineBackground = element.style.backgroundImage;
    if (inlineBackground && inlineBackground !== 'none') {
        const inlineUrlMatch = inlineBackground.match(/url\(["']?([^"')]+)["']?\)/);
        if (inlineUrlMatch && inlineUrlMatch[1]) {
            return inlineUrlMatch[1];
        }
    }
    
    return null;
}

// Function to check if an element has a background image
function hasBackgroundImage(element) {
    if (element.tagName === 'IMG' || element.classList.contains('console-highlights')) {
        return false; // These are already handled separately
    }
    
    const style = window.getComputedStyle(element);
    const backgroundImage = style.backgroundImage;
    
    return backgroundImage && backgroundImage !== 'none' && backgroundImage !== 'initial' && backgroundImage !== 'inherit';
}

// Helper function to find the appropriate target element
function findImageTarget(startElement) {
    // Check for regular images and console-highlights first
    let target = startElement.closest('img, .console-highlights');
    
    // If not found, check for elements with background images
    if (!target) {
        target = startElement;
        let currentElement = target;
        while (currentElement && currentElement !== document.body) {
            if (hasBackgroundImage(currentElement)) {
                target = currentElement;
                break;
            }
            currentElement = currentElement.parentElement;
        }
        // If we didn't find a background image element, return null
        if (target === startElement && !hasBackgroundImage(target)) {
            return null;
        }
    }
    
    return target;
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
    const target = findImageTarget(e.target);
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
    const target = findImageTarget(e.target);
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
    const target = findImageTarget(e.target);
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
                playSFX('attack');
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
                let playerAttackPoints = 0;
                if (!negativeZoneAttackAndRecruit) {
                    playerAttackPoints = totalAttackPoints;
                } else {
                    playerAttackPoints = totalRecruitPoints;
                }
                
                if ((!negativeZoneAttackAndRecruit && recruitUsedToAttack) || 
                    topCard.keyword1 === "Bribe" || 
                    topCard.keyword2 === "Bribe" || 
                    topCard.keyword3 === "Bribe") {
                    playerAttackPoints += totalRecruitPoints;
                }

                // Toggle attack button visibility
                if (playerAttackPoints >= villainAttack) {
                    attackButton.style.display = attackButton.style.display === 'none' ? 'block' : 'none';
                } else {
                    if (!negativeZoneAttackAndRecruit) {
                    onscreenConsole.log(`You need ${villainAttack}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to fight ${topCard.name}`);
                } else {
                    onscreenConsole.log(`Negative Zone! You need ${villainAttack}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to fight ${topCard.name}`);
                }
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

        if (card.keyword1 === "Focus" || card.keyword2 === "Focus" || card.keyword3 === "Focus") {
    imgElement.classList.add('clickable-card', 'telepathic-probe-active');
    imgElement.style.cursor = 'pointer';
    imgElement.style.border = '3px solid rgb(198 169 104);';
    
// Get focus details using the switch-based function
    const { focusCost, focusFunction } = getFocusDetails(card);


    const focusIndicator = document.createElement('div');
    focusIndicator.className = 'focus-indicator';
    focusIndicator.innerHTML = `
        <span style="filter:drop-shadow(0vh 0vh 0.3vh black);">FOCUS ${focusCost}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"></span>`;
    
    // Create focus button (hidden by default)
    const focusButton = document.createElement('div');
    focusButton.className = 'played-cards-focus-button';
    focusButton.innerHTML = `
        <span style="filter: drop-shadow(0vh 0vh 0.3vh black);">
            <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="overlay-focus-icons">
        </span>`;
    focusButton.style.display = 'none';
    focusIndicator.appendChild(focusButton);

    
    // Indicator click handler
    focusIndicator.addEventListener('click', (e) => {
        e.stopPropagation();

        // Toggle focus button visibility
        if (totalRecruitPoints >= focusCost) {
            focusButton.style.display = focusButton.style.display === 'none' ? 'block' : 'none';
        } else {
            onscreenConsole.log(`You need ${focusCost}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to activate <span class="console-highlights">${card.name}</span><span class="bold-span">'s</span> Focus ability.`);
        }
    });

    // Focus button click handler
    focusButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        if (focusFunction && typeof focusFunction === 'function') {
            try {
                // Execute the focus ability
                await focusFunction(card);
            } catch (error) {
                console.error(`Error executing focus ability for ${card.name}:`, error);
            }
        } else {
            console.error(`Focus ability function not found for ${card.name}`);
        }

		if (totalRecruitPoints < focusCost) {
            focusButton.style.display = 'none'; // Hide button immediately
        }
    });

    cardContainer.appendChild(focusIndicator);
}

        cardContainer.appendChild(imgElement);
        playedCardsTable.appendChild(cardContainer);
    });

    // Show the popup
    popup.style.display = 'block';
    document.getElementById('played-cards-modal-overlay').style.display = 'block';
}

// Function to close the Played Cards popup
function closePlayedCardsPopup() {
    document.getElementById('played-cards-popup').style.display = 'none';
    document.getElementById('played-cards-modal-overlay').style.display = 'none';
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
    if ((!negativeZoneAttackAndRecruit && sidekickDeck.length > 0 && totalRecruitPoints >= 2) || (negativeZoneAttackAndRecruit && sidekickDeck.length > 0 && totalAttackPoints >= 2))
{
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
playSFX('recruit');   

if (!negativeZoneAttackAndRecruit) {
totalRecruitPoints -= 2;
} else {
    totalAttackPoints -= 2;
}
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
    if ((!negativeZoneAttackAndRecruit && totalRecruitPoints >= 2) || (negativeZoneAttackAndRecruit && totalAttackPoints >= 2)) {
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
        if (!negativeZoneAttackAndRecruit) {
        onscreenConsole.log(`You need 2<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit a Sidekick.`);
        } else {
        onscreenConsole.log(`Negative Zone! You need 2<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to recruit a Sidekick.`);    
        }
    }
}

document.getElementById('sidekick-deck-card-back').addEventListener('click', showSidekickRecruitButton);

function recruitOfficer() {
        if ((!negativeZoneAttackAndRecruit && shieldDeck.length > 0 && totalRecruitPoints >= 3) || (negativeZoneAttackAndRecruit && shieldDeck.length > 0 && totalAttackPoints >= 3))
{
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
playSFX('recruit');

if (!negativeZoneAttackAndRecruit) {
totalRecruitPoints -= 3;
} else {
    totalAttackPoints -= 3;
}

        updateGameBoard();
    }
}

function showSHIELDRecruitButton() {
    const SHIELDRecruitButtonContainer = document.getElementById('shield-recruit-button-container');
    const SHIELDRecruitButton = document.getElementById('shield-deck-recruit-button');

   // Check if the player has enough recruit points
    if ((!negativeZoneAttackAndRecruit && totalRecruitPoints >= 3) || (negativeZoneAttackAndRecruit && totalAttackPoints >= 3)) {
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
        if (!negativeZoneAttackAndRecruit) {
        onscreenConsole.log(`You need 3<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`);
        } else {
        onscreenConsole.log(`Negative Zone! You need 3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to recruit a <span class="console-highlights">S.H.I.E.L.D. Officer</span>.`);    
        }
    }
}

document.getElementById('shield-deck-card-back').addEventListener('click', showSHIELDRecruitButton);

function showHeroRecruitButton(hqIndex, hero) {
    const recruitButtonContainer = document.querySelector(`#hq${hqIndex}-recruit-button-container`);
    const recruitButton = document.querySelector(`#hq${hqIndex}-deck-recruit-button`);
    const selectedSchemeName = document.querySelector('#scheme-section input[type=radio]:checked').value;
    const scheme = schemes.find(scheme => scheme.name === selectedSchemeName); 

    if (!recruitButtonContainer || !recruitButton) {
        console.error(`Recruit button container or button not found for HQ index ${hqIndex}`);
        return;
    }

    // Get the reserved recruit points for this HQ
    let hqReservedRecruit = 0;
    switch(hqIndex) {
        case 1: hqReservedRecruit = hq1ReserveRecruit; break;
        case 2: hqReservedRecruit = hq2ReserveRecruit; break;
        case 3: hqReservedRecruit = hq3ReserveRecruit; break;
        case 4: hqReservedRecruit = hq4ReserveRecruit; break;
        case 5: hqReservedRecruit = hq5ReserveRecruit; break;
    }

    // Check if the player has enough recruit points (including reserved points)
    if ((!negativeZoneAttackAndRecruit && (totalRecruitPoints + hqReservedRecruit) >= hero.cost) || 
        (negativeZoneAttackAndRecruit && totalAttackPoints >= hero.cost))
     {
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
        if (!negativeZoneAttackAndRecruit) {
        onscreenConsole.log(`You need ${hero.cost}<img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to ${scheme.name === 'Save Humanity' && hero.type === 'Bystander' ? 'rescue' : 'recruit'} <span class="console-highlights">${hero.name}</span>.`);
        } else {
        onscreenConsole.log(`Negative Zone! You need ${hero.cost}<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to ${scheme.name === 'Save Humanity' && hero.type === 'Bystander' ? 'rescue' : 'recruit'} <span class="console-highlights">${hero.name}</span>.`);    
        }
    }
}

async function animateCardToDestination(cardElement, destinationElement, options = {}) {
    // Check if we have valid elements
    if (!cardElement || !destinationElement) {
        console.error('Animation failed: Invalid card or destination element');
        if (options.onComplete) options.onComplete();
        return Promise.resolve();
    }
    
    // Check if elements are in the DOM
    if (!document.body.contains(cardElement) || !document.body.contains(destinationElement)) {
        console.error('Animation failed: Elements not in DOM');
        if (options.onComplete) options.onComplete();
        return Promise.resolve();
    }
    
    // Rest of the animation code remains the same...
    const {
        duration = 700,
        curveHeight = 100,
        onComplete = null
    } = options;

    // Clone the card for animation
    const flyingCard = cardElement.cloneNode(true);
    flyingCard.classList.add('flying-card');
    
    // Get original card position
    const originalRect = cardElement.getBoundingClientRect();
    flyingCard.style.position = 'fixed';
    flyingCard.style.left = `${originalRect.left}px`;
    flyingCard.style.top = `${originalRect.top}px`;
    flyingCard.style.width = `${originalRect.width}px`;
    flyingCard.style.height = `${originalRect.height}px`;
    flyingCard.style.zIndex = '1000';
    
    // Add to body
    document.body.appendChild(flyingCard);
    
    // Get destination position
    const destinationRect = destinationElement.getBoundingClientRect();
    
    // Calculate animation end position (center of destination)
    const endX = destinationRect.left + destinationRect.width / 2 - originalRect.width / 2;
    const endY = destinationRect.top + destinationRect.height / 2 - originalRect.height / 2;
    
    // Define bezier curve control points
const p0 = { x: originalRect.left, y: originalRect.top };
const p1 = { x: originalRect.left + (endX - originalRect.left) * 0.25, y: originalRect.top - curveHeight };
const p2 = { x: originalRect.left + (endX - originalRect.left) * 0.85, y: endY - curveHeight/2 }; // Changed from 0.75 to 0.85
const p3 = { x: endX, y: endY };
    
    // Start time for animation
    const startTime = performance.now();
    
    // Return a promise that resolves when animation completes
    return new Promise((resolve) => {
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (progress < 1) {
                // Calculate position along bezier curve
                const point = calculateBezierPoint(progress, p0, p1, p2, p3);
                
                // Calculate scale (larger in the middle)
                const scale = 1 + 0.25 * Math.sin(progress * Math.PI);
                
                // Apply transformation
                flyingCard.style.transform = `translate(${point.x - originalRect.left}px, ${point.y - originalRect.top}px) scale(${scale})`;
                
                // Continue animation
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                flyingCard.remove();
                if (onComplete) onComplete();
                resolve();
            }
        }
        
        // Start animation
        requestAnimationFrame(animate);
    });
}

// Add this helper function for bezier curve calculations
function calculateBezierPoint(t, p0, p1, p2, p3) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;
    
    const p = {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
    };
    
    return p;
}

async function recruitHeroConfirmed(hero, hqIndex) {
    playSFX('recruit');

    // Try multiple ways to find the card element
    let cardElement;
    
    // Method 1: Try to find by HQ index
    const hqCell = document.querySelector(`[data-hq-index="${hqIndex}"]`);
    if (hqCell) {
        cardElement = hqCell.querySelector('.card-image') || hqCell.querySelector('.card');
    }
    
    // Method 2: If still not found, try to find by hero ID
    if (!cardElement && hero.id) {
        cardElement = document.querySelector(`[data-hero-id="${hero.id}"]`);
    }
    
    // Method 3: As a last resort, try any card in the HQ area
    if (!cardElement) {
        const hqCells = document.querySelectorAll('[data-hq-index]');
        if (hqCells.length > 0) {
            const randomCell = hqCells[Math.floor(Math.random() * hqCells.length)];
            cardElement = randomCell.querySelector('.card-image') || randomCell.querySelector('.card');
        }
    }

    let destinationElement;
    let destinationId = '';
    
    if (hero.saveHumanityBystander === true) {
        destinationId = 'victory-pile-button';
        victoryPile.push(hero);
        onscreenConsole.log(`<span class="console-highlights">${hero.name}</span> rescued!`);
        bystanderBonuses();
        await rescueBystanderAbility(hero);
    } else if (silentMeditationRecruit === true) {
        destinationId = 'player-card-zone';
        playerHand.push(hero);
        silentMeditationRecruit = false;
        onscreenConsole.log(`Hero recruited! <span class="console-highlights">${hero.name}</span> has been added to your hand.`);
    } else if (backflipRecruit === true) {
        destinationId = 'player-deck-cell';
        playerDeck.push(hero);
        hero.revealed = true;
        onscreenConsole.log(`Hero recruited! <span class="console-highlights">${hero.name}</span> has been added to the top of your deck.`);
        backflipRecruit = false;
    } else {
        destinationId = 'discard-pile-cell';
        playerDiscardPile.push(hero);
        onscreenConsole.log(`Hero recruited! <span class="console-highlights">${hero.name}</span> has been added to your discard pile.`);
    }

    // Try to find the destination element
    destinationElement = document.getElementById(destinationId);
          
        // If still not found, use the body as fallback (animation will still run but to a default position)
        if (!destinationElement) {
            destinationElement = document.body;
            console.warn(`Destination element ${destinationId} not found, using body as fallback`);
        }
    

    // Animate the card to its destination if we found a card element
    if (cardElement) {
animateCardToDestination(cardElement, destinationElement, {
            duration: 700,
            curveHeight: 150,
            onComplete: () => {
                // Update the game board after animation completes
                updateGameBoard();
            }
        }).then(() => {
            // Any code that needs to run after animation completes
        }).catch((error) => {
            console.error('Animation error:', error);
            updateGameBoard(); // Still update the board even if animation fails
        });
    } else {
        // If we couldn't find a card element, just update the game board
        console.warn('Card element not found for animation, updating board directly');
        updateGameBoard();
    }

    if (!negativeZoneAttackAndRecruit) {
        // Get the reserved recruit points for this HQ
        let hqReservedRecruit = 0;
        switch(hqIndex) {
            case 0: hqReservedRecruit = hq1ReserveRecruit; break;
            case 1: hqReservedRecruit = hq2ReserveRecruit; break;
            case 2: hqReservedRecruit = hq3ReserveRecruit; break;
            case 3: hqReservedRecruit = hq4ReserveRecruit; break;
            case 4: hqReservedRecruit = hq5ReserveRecruit; break;
        }
        
        // Use reserved recruit points first
        const reservedRecruitUsed = Math.min(hero.cost, hqReservedRecruit);
        if (reservedRecruitUsed > 0) {
            // Deduct from the appropriate HQ reserve
            switch(hqIndex) {
                case 0: hq1ReserveRecruit -= reservedRecruitUsed; break;
                case 1: hq2ReserveRecruit -= reservedRecruitUsed; break;
                case 2: hq3ReserveRecruit -= reservedRecruitUsed; break;
                case 3: hq4ReserveRecruit -= reservedRecruitUsed; break;
                case 4: hq5ReserveRecruit -= reservedRecruitUsed; break;
            }
            onscreenConsole.log(`Used ${reservedRecruitUsed} reserved <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points from HQ ${hqIndex}.`);
        }
        
        // Deduct remaining cost from regular recruit points
        totalRecruitPoints -= (hero.cost - reservedRecruitUsed);
    } else {
        totalAttackPoints -= hero.cost;
    }
    
    // Update the reserve display after modifying reserved points
    updateReserveAttackAndRecruit();
    
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
    
    // ADD THIS LINE: Validate forcefield selection if applicable
    if (window.mastermindAttackForValidation) {
        validateForcefieldSelection(window.mastermindAttackForValidation);
    }
}

function validateForcefieldSelection(mastermindAttack) {
    // Calculate if player leaves enough attack points for mastermind
    const attackPointsLeft = totalAttackPoints - counterA;
    const hasEnoughForMastermind = canUseRecruitForMastermind() ? true : attackPointsLeft >= mastermindAttack;
    
    // Disable confirm button if not enough attack points are left
    document.getElementById('bribe-confirm-button').disabled = !hasEnoughForMastermind;
    
    // Add visual feedback
    const confirmButton = document.getElementById('bribe-confirm-button');
    if (!hasEnoughForMastermind) {
        confirmButton.title = `Need at least ${mastermindAttack} attack points left for mastermind`;
        confirmButton.style.opacity = "0.5";
    } else {
        confirmButton.title = "";
        confirmButton.style.opacity = "1";
    }
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
    // Capture the values BEFORE resetting
    const attackUsed = counterA;
    const recruitUsed = counterB;
    
    // Hide the popup
    document.getElementById('bribe-popup').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
    
    // Clean up the validation variable
    window.mastermindAttackForValidation = null;
    
    // Reset the popup to its original state
    resetBribePopup();
    
    if (counterResolve) {
        counterResolve({
            attackUsed: attackUsed,
            recruitUsed: recruitUsed
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

// ==== AUDIO ENGINE (live sliders + per-channel mutes + file:// safe) ========
(() => {
  const AUDIO_BASE_PATH = "./Audio Assets";

  const SOUND_KEYS = [
    "attack","card-draw","evil-wins","game-draw","good-wins",
    "hand-dealt","ko","master-strike","recruit","rescue","scheme-twist","wound",
  ];
  const MUSIC_KEY = "background-music";

  const isFileProtocol = () => location.protocol === "file:";
  const enc = (p) => encodeURI(p);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function getSupportedExts() {
  const probe = document.createElement("audio");
  const candidates = [
    { ext: "m4a", type: 'audio/mp4; codecs="mp4a.40.2"' },
    { ext: "mp3", type: "audio/mpeg" },
  ];
  const scored = candidates
    .map(c => {
      const res = probe.canPlayType(c.type);
      const score = res === "probably" ? 2 : res === "maybe" ? 1 : 0;
      return { ...c, score };
    })
    .filter(c => c.score > 0)
    .sort((a,b) => b.score - a.score);
  return scored.length ? scored.map(s => s.ext) : ["mp3"];
}

  class AudioEngine {
    constructor() {
      this.backend = isFileProtocol() ? "html" : "webaudio";
      this.extCandidates = getSupportedExts();

      // Persisted volumes
      const storedMaster = localStorage.getItem("game_masterVolume");
      const storedMusic  = localStorage.getItem("game_musicVolume");
      const storedSfx    = localStorage.getItem("game_sfxVolume");
      this.masterVolume = storedMaster !== null ? Number(storedMaster) : 0.7;
      this.musicVolume  = storedMusic  !== null ? Number(storedMusic)  : this.masterVolume;
      this.sfxVolume    = storedSfx    !== null ? Number(storedSfx)    : this.masterVolume;

      // Persisted mutes
      this.musicMuted = localStorage.getItem("game_musicMuted") === "1";
      this.sfxMuted   = localStorage.getItem("game_sfxMuted")   === "1";

      // Queue
      this._sfxQueue = [];
      this._sfxPlaying = false;

      // WebAudio
      this.ctx = null;
      this.masterGain = null;
      this.sfxGain = null;
      this.musicGain = null;
      this.buffers = {};
      this.musicSource = null;

      // HTMLAudio
      this.mediaEls = {};
      this.mediaMusicEl = null;

      this.loaded = false;
      this.unlocked = false;
    }

    // Effective volumes after mute & master
    _effMusic() { return Math.max(0, Math.min(1, (this.musicMuted ? 0 : this.musicVolume) * this.masterVolume)); }
    _effSfx()   { return Math.max(0, Math.min(1, (this.sfxMuted   ? 0 : this.sfxVolume)   * this.masterVolume)); }

    // Apply current settings to backend immediately
    _applyEffectiveGains() {
      if (this.backend === "webaudio" && this.ctx) {
        const now = this.ctx.currentTime || 0;
        const effSfx   = this._effSfx();
        const effMusic = this.unlocked ? this._effMusic() : 0; // keep music at 0 pre-unlock
        if (this.sfxGain)   this.sfxGain.gain.setValueAtTime(effSfx, now);
        if (this.musicGain) this.musicGain.gain.setValueAtTime(effMusic, now);
      } else {
        for (const [key, el] of Object.entries(this.mediaEls)) {
          const isMusic = key === MUSIC_KEY;
          const chVol = isMusic ? (this.musicMuted ? 0 : this.musicVolume)
                                : (this.sfxMuted   ? 0 : this.sfxVolume);
          el.volume = Math.max(0, Math.min(1, chVol * this.masterVolume));
        }
      }
    }

    // ---------- load all ----------
    async loadAll() {
      if (this.backend === "webaudio") {
        try {
          await this._waInit();
          await Promise.all([ this._waLoad(MUSIC_KEY), ...SOUND_KEYS.map(k => this._waLoad(k)) ]);
          this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime); // silent until begin()
        } catch (e) {
          console.warn("WebAudio load failed; falling back to HTMLAudio.", e);
          this.backend = "html";
          await this._htmlLoad(MUSIC_KEY);
          await Promise.all(SOUND_KEYS.map(k => this._htmlLoad(k)));
          this._setAllHtmlMuted(true);
          this._applyHtmlVolumes();
        }
      } else {
        await this._htmlLoad(MUSIC_KEY);
        await Promise.all(SOUND_KEYS.map(k => this._htmlLoad(k)));
        this._setAllHtmlMuted(true);
        this._applyHtmlVolumes();
      }

      // Ensure any early UI changes take effect as soon as we’re ready
      this._applyEffectiveGains();
      this.loaded = true;
      window.audio = this;
      window.dispatchEvent(new Event('audio-ready'));
    }

    // ---------- begin / unlock ----------
    async begin({ musicFadeSeconds = 2.0 } = {}) {
      if (!this.loaded || this.unlocked) return;

      if (this.backend === "webaudio") {
        if (this.ctx.state !== "running") {
          try { await this.ctx.resume(); } catch (e) { console.warn("AudioContext resume failed", e); }
        }
        this.unlocked = true;

        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(1.0, now);
        this.sfxGain.gain.setValueAtTime(this._effSfx(), now);
        await this._waStartMusic(musicFadeSeconds);
      } else {
        this._setAllHtmlMuted(false);
        this._applyHtmlVolumes();
        this.unlocked = true;
        await this._htmlStartMusic(musicFadeSeconds);
      }
    }

    // ---------- public API ----------
    setMasterVolume(v) {
      this.masterVolume = Math.max(0, Math.min(1, Number(v) || 0));
      localStorage.setItem("game_masterVolume", String(this.masterVolume));
      this._applyEffectiveGains();
    }

    setMusicVolume(v) {
      this.musicVolume = Math.max(0, Math.min(1, Number(v) || 0));
      localStorage.setItem("game_musicVolume", String(this.musicVolume));
      this._applyEffectiveGains();
    }

    setSfxVolume(v) {
      this.sfxVolume = Math.max(0, Math.min(1, Number(v) || 0));
      localStorage.setItem("game_sfxVolume", String(this.sfxVolume));
      this._applyEffectiveGains();
    }

    setMusicMuted(muted) {
      this.musicMuted = !!muted;
      localStorage.setItem("game_musicMuted", this.musicMuted ? "1" : "0");
      this._applyEffectiveGains();
    }

    setSfxMuted(muted) {
      this.sfxMuted = !!muted;
      localStorage.setItem("game_sfxMuted", this.sfxMuted ? "1" : "0");
      this._applyEffectiveGains();
    }

    playSFX(key) {
      if (!this.loaded) return;
      if (!SOUND_KEYS.includes(key)) {
        console.warn(`SFX "${key}" not in SOUND_KEYS`);
        return;
      }
      this._sfxQueue.push(key);
      if (!this._sfxPlaying) this._dequeueAndPlay();
    }

    stopMusic() {
      if (this.backend === "webaudio") {
        if (this.musicSource) {
          try { this.musicSource.stop(); } catch {}
          this.musicSource.disconnect();
          this.musicSource = null;
        }
      } else if (this.mediaMusicEl) {
        this.mediaMusicEl.pause();
        this.mediaMusicEl.currentTime = 0;
      }
    }

    // ---------- SFX queue ----------
    async _dequeueAndPlay() {
      if (this._sfxPlaying) return;
      this._sfxPlaying = true;

      while (this._sfxQueue.length) {
        const key = this._sfxQueue.shift();
        try {
          const duration = (this.backend === "webaudio")
            ? await this._waPlayOnce(key)
            : await this._htmlPlayOnce(key);
          await wait(Math.max(20, duration * 1000));
        } catch (e) {
          console.warn("SFX play error", e);
        }
      }
      this._sfxPlaying = false;
    }

    // ---------- WebAudio ----------
    async _waInit() {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new Ctx({ latencyHint: "interactive" });

      this.masterGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();

      this.sfxGain.gain.value = this._effSfx();
      this.musicGain.gain.value = 0; // fades up on begin

      this.sfxGain.connect(this.masterGain);
      this.musicGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    async _waLoad(key) {
      let lastErr = null;
      for (const ext of this.extCandidates) {
        try {
          const url = enc(`${AUDIO_BASE_PATH}/${key}.${ext}`);
          const res = await fetch(url); // http/https only
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          const arr = await res.arrayBuffer();
          const buf = await this.ctx.decodeAudioData(arr);
          this.buffers[key] = buf;
          return;
        } catch (e) { lastErr = e; }
      }
      throw new Error(`No decodable source for "${key}" (${this.extCandidates.join(", ")}) :: ${lastErr}`);
    }

    async _waPlayOnce(key) {
      const buf = this.buffers[key];
      if (!buf) throw new Error(`Missing buffer for ${key}`);
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.connect(this.sfxGain);
      src.start();
      return buf.duration;
    }

    async _waStartMusic(fadeSeconds) {
      if (this.musicSource) {
        try { this.musicSource.stop(); } catch {}
        this.musicSource.disconnect();
        this.musicSource = null;
      }
      const buf = this.buffers[MUSIC_KEY];
      if (!buf) return;

      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      src.connect(this.musicGain);
      src.start();

      const target = this._effMusic();
      this.musicGain.gain.cancelScheduledValues(now);
      this.musicGain.gain.setValueAtTime(0, now);
      this.musicGain.gain.linearRampToValueAtTime(target, now + fadeSeconds);

      this.musicSource = src;
    }

    // ---------- HTMLAudio (file:// safe) ----------
    async _htmlLoad(key) {
      for (const ext of this.extCandidates) {
        const url = enc(`${AUDIO_BASE_PATH}/${key}.${ext}`);
        const el = new Audio();
        el.preload = "auto";
        el.loop = (key === MUSIC_KEY);
        if (location.protocol.startsWith("http")) el.crossOrigin = "anonymous";
        el.playsInline = true;
        el.src = url;

        const ok = await new Promise((resolve) => {
          let settled = false;
          const done = (v) => { if (!settled) { settled = true; resolve(v); } };
          el.addEventListener("canplaythrough", () => done(true), { once: true });
          el.addEventListener("loadeddata",     () => done(true), { once: true });
          el.addEventListener("error",          () => done(false), { once: true });
          setTimeout(() => done(el.readyState >= 2), 1500);
        });

        if (ok) {
          this.mediaEls[key] = el;
          if (key === MUSIC_KEY) this.mediaMusicEl = el;
          return;
        }
      }
      console.warn(`No playable source for "${key}" among: ${this.extCandidates.join(", ")}`);
    }

    _setAllHtmlMuted(muted) {
      for (const el of Object.values(this.mediaEls)) el.muted = muted;
    }

    _applyHtmlVolumes() {
      for (const [key, el] of Object.entries(this.mediaEls)) {
        const ch = (key === MUSIC_KEY) ? this.musicVolume : this.sfxVolume;
        const muted = (key === MUSIC_KEY) ? this.musicMuted : this.sfxMuted;
        const eff = Math.max(0, Math.min(1, (muted ? 0 : ch) * this.masterVolume));
        el.volume = eff;
      }
    }

    async _htmlPlayOnce(key) {
      const base = this.mediaEls[key];
      if (!base) throw new Error(`Missing media element for ${key}`);
      const el = base.cloneNode(true);
      el.muted = false;
      el.volume = this._effSfx();
      document.body.appendChild(el);
      try { await el.play(); } catch (e) { console.warn("HTMLAudio play failed", e); }
      const dur = isFinite(el.duration) && el.duration > 0 ? el.duration : base.duration || 0.3;
      el.addEventListener("ended", () => { try { el.remove(); } catch {} }, { once: true });
      return dur;
    }

    async _htmlStartMusic(fadeSeconds) {
      const el = this.mediaMusicEl;
      if (!el) return;
      el.currentTime = 0;
      el.loop = true;
      el.volume = 0;
      try { await el.play(); } catch (e) { console.warn("Music play failed", e); }
      const target = this._effMusic();
      const steps = Math.max(1, Math.floor(fadeSeconds * 30));
      for (let i = 1; i <= steps; i++) {
        el.volume = (target * i) / steps;
        await wait(1000 / 30);
      }
      el.volume = target;
    }
  }

  // Create and load on page load
  const engine = new AudioEngine();
  engine.loadAll().catch((e) => console.error("Audio load failed", e));

  // Helpers for your game:
  window.playSFX = (key) => engine.playSFX(key);
  window.audioEngine = engine;
})();

// ==== UI GLUE ================================================================

function getEng() { return window.audioEngine || window.audio || null; }

// Read the UI and apply immediately.
// If engine isn't ready yet, we still persist to localStorage so it'll apply on 'audio-ready'.
function applySettingsFromUI() {
  const eng = getEng();

  const music = document.getElementById('music-volume');
  const sfx   = document.getElementById('sfx-volume');
  const mMute = document.getElementById('music-mute');
  const sMute = document.getElementById('sfx-mute');
  const master = document.getElementById('volume'); // optional legacy single slider

  if (music && !isNaN(+music.value)) localStorage.setItem("game_musicVolume", String(+music.value));
  if (sfx   && !isNaN(+sfx.value))   localStorage.setItem("game_sfxVolume",   String(+sfx.value));
  if (master && !isNaN(+master.value)) localStorage.setItem("game_masterVolume", String(+master.value));
  if (mMute) localStorage.setItem("game_musicMuted", mMute.checked ? "1" : "0");
  if (sMute) localStorage.setItem("game_sfxMuted",   sMute.checked ? "1" : "0");

  if (!eng) return;

  if (music && !isNaN(+music.value)) eng.setMusicVolume(+music.value);
  if (sfx   && !isNaN(+sfx.value))   eng.setSfxVolume(+sfx.value);
  if (master && !isNaN(+master.value)) eng.setMasterVolume(+master.value);
  if (mMute) eng.setMusicMuted(!!mMute.checked);
  if (sMute) eng.setSfxMuted(!!sMute.checked);
}

// Sync the UI from the engine (call on open and on ready)
function syncUIFromEngine() {
  const eng = getEng();
  if (!eng) return;
  const music = document.getElementById('music-volume');
  const sfx   = document.getElementById('sfx-volume');
  const mMute = document.getElementById('music-mute');
  const sMute = document.getElementById('sfx-mute');
  const master = document.getElementById('volume');

  if (music) music.value = String(eng.musicVolume ?? 0.7);
  if (sfx)   sfx.value   = String(eng.sfxVolume   ?? 0.7);
  if (mMute) mMute.checked = !!eng.musicMuted;
  if (sMute) sMute.checked = !!eng.sfxMuted;
  if (master) master.value = String(eng.masterVolume ?? 0.7);
}

// Close button — applies (again) and hides
function saveSettings() {
  applySettingsFromUI();
  document.getElementById('settings-popup').style.display = 'none';
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.style.display = 'none';
}

// First sync on load (in case values are restored)
window.addEventListener('DOMContentLoaded', syncUIFromEngine);
// Sync once the engine signals it's fully ready
window.addEventListener('audio-ready', syncUIFromEngine);

// Optional helper if you programmatically open the popup
function openSettingsPopup() {
  syncUIFromEngine();
  document.getElementById('settings-popup').style.display = 'block';
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.style.display = 'block';
}

function initFontSelector() {
  const fontSelector = document.getElementById('font-selector');
  const body = document.body;

  if (!fontSelector) {
    console.log('Font selector not found');
    return;
  }

  const ALL_FONT_CLASSES = ['font-Core', 'font-DarkCity', 'font-FantasticFour'];

  // Normalise a selector value to an actual font key we know how to apply
  const normaliseFont = (val) => {
    if (!val || val === 'default') return 'Core';
    return ['Core', 'DarkCity', 'FantasticFour'].includes(val) ? val : 'Core';
  };

  const applyFont = (fontName) => {
    // Remove all known font classes, add the one we want
    body.classList.remove(...ALL_FONT_CLASSES);
    body.classList.add(`font-${fontName}`);

    // Update CSS variables for different elements
    updateFontVariables(fontName);

    // Keep the selector in sync if it exists
    if (fontSelector) fontSelector.value = fontName;
  };

  // Change handler
  fontSelector.addEventListener('change', function () {
    const chosen = normaliseFont(this.value);
    applyFont(chosen);
    localStorage.setItem('selectedFont', chosen);
    console.log(`Font changed to: ${chosen}`);
  });

  // Initial load: use saved font or fall back to Core
  const savedFontRaw = localStorage.getItem('selectedFont');
  const initialFont = normaliseFont(savedFontRaw);
  applyFont(initialFont);

  console.log('Font selector initialized');
}

function updateFontVariables(fontName) {
  const root = document.documentElement;

  // Define font mappings for different elements
  const fontMappings = {
    Core: {
      '--heading-font': "'Percolator', Arial, sans-serif",
      '--heading-size': 'var(--core-heading-size)',
      '--smaller-heading-size': 'var(--core-smaller-heading-size)',
      '--letter-spacing': 'var(--core-letter-spacing)',
      '--text-transform': 'var(--core-text-transform)',
      '--title-banner-size': 'var(--core-title-banner-size)',
    },
    DarkCity: {
      '--heading-font': "'DarkCity', Arial, sans-serif",
      '--heading-size': 'var(--darkcity-heading-size)',
      '--smaller-heading-size': 'var(--darkcity-smaller-heading-size)',
      '--letter-spacing': 'var(--darkcity-letter-spacing)',
      '--text-transform': 'var(--darkcity-text-transform)',
      '--title-banner-size': 'var(--darkcity-title-banner-size)',
    },
    FantasticFour: {
      '--heading-font': "'FantasticFour', Arial, sans-serif",
      '--heading-size': 'var(--fantasticfour-heading-size)',
      '--smaller-heading-size': 'var(--fantasticfour-smaller-heading-size)',
      '--letter-spacing': 'var(--fantasticfour-letter-spacing)',
      '--text-transform': 'var(--fantasticfour-text-transform)',
      '--title-banner-size': 'var(--fantasticfour-title-banner-size)',
    },
  };

  // Fallback to Core if we get anything unexpected
  const key = fontMappings[fontName] ? fontName : 'Core';
  const vars = fontMappings[key];

  for (const [variable, value] of Object.entries(vars)) {
    root.style.setProperty(variable, value);
  }
}

// Initialize both theme switcher and font selector
function initThemeSwitcher() {
  // Your existing theme switcher code here
  const themeButtons = document.querySelectorAll('.theme-button');
  const body = document.body;
  
  if (themeButtons.length === 0) {
    console.log('No theme buttons found');
    return;
  }
  
  // Add click event to each theme button
  themeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      
      // Remove selected class from all buttons
      themeButtons.forEach(btn => btn.classList.remove('selected'));
      
      // Add selected class to clicked button
      this.classList.add('selected');
      
      // Update body class to apply theme
      body.className = theme;
      updateThemeImages(theme);
                                    
      // Save theme preference to localStorage
      localStorage.setItem('selectedTheme', theme);
      
      console.log(`Theme changed to: ${theme}`);
    });
  });
  
  // Load saved theme on page load
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    body.className = savedTheme;
    
    // Find and select the button with the matching data-theme attribute
    themeButtons.forEach(button => {
      if (button.getAttribute('data-theme') === savedTheme) {
        button.classList.add('selected');
      }
    });
    
    // Update theme images on page load
    updateThemeImages(savedTheme);
  }
  
  console.log('Theme switcher initialized');
}

function updateThemeImages(themeName) {
  // Update settings cog
  const settingsCog = document.getElementById('settingsCogImage');
  if (settingsCog) {
    settingsCog.src = `Visual Assets/Icons/settingsCog_${themeName}.svg`;
  }

  const gameboardSettingsCog = document.getElementById('gameboardSettingsCog');
  if (gameboardSettingsCog) {
    gameboardSettingsCog.src = `Visual Assets/Icons/settingsCog_${themeName}.svg`;
  }
  
}

// Call both initialization functions
initThemeSwitcher();

initFontSelector();

// Remote-scroll #keyword-content only when side panel is visible and the hovered target can't scroll.
(function routeWheelFallbackToKeyword() {
  const keyword   = document.getElementById('keyword-content');
  const sidePanel = document.getElementById('side-panel');

  if (!keyword || !sidePanel) {
    console.warn('routeWheelFallbackToKeyword: missing #keyword-content or #side-panel');
    return;
  }

  const isVisible = (el) => {
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden';
  };

  const isScrollable = (el, axis) => {
    if (!el) return false;
    const cs = getComputedStyle(el);
    const ov  = axis === 'y' ? cs.overflowY : cs.overflowX;
    if (!/(auto|scroll|overlay)/i.test(ov)) return false;
    return axis === 'y'
      ? el.scrollHeight > el.clientHeight
      : el.scrollWidth  > el.clientWidth;
  };

  const buildChain = (node) => {
    const chain = [];
    while (node) {
      if (node.nodeType === 1) chain.push(node);
      node = node.parentElement;
    }
    return chain;
  };

  // Does the event's target or any ancestor (or the page) *have* a scroll box on this axis?
  const hasScrollableAnywhere = (e, axis) => {
    const path = e.composedPath ? e.composedPath() : buildChain(e.target);
    for (const n of path) {
      if (n && n.nodeType === 1 && isScrollable(n, axis)) return true;
      if (n === document || n === window) break;
    }
    // Also treat the page itself as a scroll container
    const page = document.scrollingElement || document.documentElement;
    return isScrollable(page, axis);
  };

  document.addEventListener('wheel', (e) => {
    // Only apply this behaviour while side panel is visible.
    if (!isVisible(sidePanel)) return;

    // Let other widgets handle zoom/gesture combos.
    if (e.ctrlKey) return;
    if (e.defaultPrevented) return;

    const axis = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? 'y' : 'x';

    // If *anything* under the pointer (or the page) is a scroll container, let it behave normally.
    if (hasScrollableAnywhere(e, axis)) return;

    // Otherwise, route the wheel to #keyword-content without breaking other scrollers.
    e.preventDefault();  // stop the body/page from scrolling
    if (axis === 'y') {
      keyword.scrollTop  += (e.deltaY || 0);
    } else {
      const dx = e.deltaX || e.deltaY || 0; // support Shift+wheel trackpad gestures
      keyword.scrollLeft += dx;
    }
  }, { passive: false, capture: true }); // capture so our check runs early without blocking defaults
})();

// Helpers for icons
const createTeamIconHTML = (value) => {
    if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') {
        return '<img src="Visual Assets/Icons/Unaffiliated.svg" alt="Unaffiliated Icon" class="stats-card-icons">';
    }
    return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="stats-card-icons">`;
};

const createClassIconHTML = (value) => {
    if (!value || value === 'none' || value === 'null' || value === 'undefined' || value === 'None') return '';
    return `<img src="Visual Assets/Icons/${value}.svg" alt="${value} Icon" class="stats-card-icons">`;
};

function generateStatsScreen() {
    // Combine all arrays
    const combinedCards = [...playerDeck, ...cardsPlayedThisTurn, ...playerDiscardPile, ...playerHand];
    
    // Categorize cards
    const categories = {
        heroes: {},
        shield: [],
        wounds: [],
        other: []
    };

    combinedCards.forEach(card => {
        // Check for SHIELD cards
        if (card.name === "SHIELD Agent" || card.name === "SHIELD Officer" || card.name === "SHIELD Trooper") {
            categories.shield.push(card);
        }
        // Check for Wounds
        else if (card.type === "Wound") {
            categories.wounds.push(card);
        }
        // Check for Heroes
        else if (card.heroName) {
            if (!categories.heroes[card.heroName]) {
                categories.heroes[card.heroName] = {};
            }
            if (!categories.heroes[card.heroName][card.name]) {
                categories.heroes[card.heroName][card.name] = [];
            }
            categories.heroes[card.heroName][card.name].push(card);
        }
        // Everything else
        else {
            categories.other.push(card);
        }
    });

    // Calculate MVP(s)
    const heroTotals = {};
    Object.keys(categories.heroes).forEach(heroName => {
        heroTotals[heroName] = Object.values(categories.heroes[heroName]).reduce((total, cards) => total + cards.length, 0);
    });
    
    const maxCards = Math.max(...Object.values(heroTotals));
    const mvpHeroes = Object.keys(heroTotals).filter(heroName => heroTotals[heroName] === maxCards);
    
    // Set the hero image based on MVP
    if (mvpHeroes.length > 0) {
        // Use the first MVP hero for the image (or you could choose randomly)
        setEndGameHeroImage(mvpHeroes[0]);
    } else if (Object.keys(categories.heroes).length > 0) {
        // If no MVP but there are heroes, use the first one alphabetically
        const firstHero = Object.keys(categories.heroes).sort()[0];
        setEndGameHeroImage(firstHero);
    } else {
        // No heroes found, set a default image
        setEndGameHeroImage('default');
    }
    
    // Rest of your existing HTML building code...
    let html = '';

    html += `<div class="end-game-your-cards-header">YOUR CARDS:</div>`;

    // Heroes (alphabetically)
    const heroNames = Object.keys(categories.heroes).sort();
    heroNames.forEach(heroName => {
        const heroCards = categories.heroes[heroName];
        const totalHeroCards = heroTotals[heroName];
        const isMVP = mvpHeroes.includes(heroName);
        const mvpText = isMVP ? (mvpHeroes.length > 1 ? " - Tied MVP" : " - MVP") : "";
        
        html += `<div class="category-section">`;
        html += `<div class="hero-header">`;
        html += `<span class="hero-name-container">`;
        html += createTeamIconHTML(heroCards[Object.keys(heroCards)[0]][0].team);
        html += `<span class="hero-name-text">${heroName}${mvpText}</span>`;
        html += `</span>`;
        html += `<span class="hero-count">&nbsp;x${totalHeroCards}</span>`;
        html += `</div>`;
        html += `<hr>`;
        
        // Sort card names alphabetically within hero
        const cardNames = Object.keys(heroCards).sort();
        cardNames.forEach(cardName => {
            const cards = heroCards[cardName];
            const card = cards[0];
            
            html += `<div class="card-line">`;
            
            if (card.class1) html += createClassIconHTML(card.class1);
            if (card.class2) html += createClassIconHTML(card.class2);
            if (card.class3) html += createClassIconHTML(card.class3);
            
            html += `<span class="card-name">${cardName}</span>`;
            html += `<span class="card-count">&nbsp;x${cards.length}</span>`;
            html += `</div>`;
        });
        
        html += `</div>`;
    });

    // SHIELD Cards
    if (categories.shield.length > 0) {
        html += `<div class="category-section">`;
        html += `<div class="category-header">`;
        html += `<span class="hero-name-container">`;
        html += createTeamIconHTML("SHIELD");
        html += `<span class="hero-name-text">SHIELD</span>`;
        html += `</span>`;
        html += `<span class="hero-count">&nbsp;x${categories.shield.length}</span>`;
        html += `</div>`;
        html += `<hr>`;
        
        // Group SHIELD cards by name
        const shieldGroups = {};
        categories.shield.forEach(card => {
            if (!shieldGroups[card.name]) shieldGroups[card.name] = [];
            shieldGroups[card.name].push(card);
        });
        
        Object.keys(shieldGroups).sort().forEach(cardName => {
            const cards = shieldGroups[cardName];
            const card = cards[0];
            
            html += `<div class="card-line">`;
            
            // Class icons for SHIELD cards
            if (card.class1) html += createClassIconHTML(card.class1);
            if (card.class2) html += createClassIconHTML(card.class2);
            if (card.class3) html += createClassIconHTML(card.class3);
            
            html += `<span class="card-name">${cardName}</span>`;
            html += `<span class="card-count">&nbsp;x${cards.length}</span>`;
            html += `</div>`;
        });
        
        html += `</div>`;
    }

        // Other cards
    if (categories.other.length > 0) {
        html += `<div class="category-section">`;
        html += `<div class="category-header">`;
        html += `<span class="hero-name-container">`;
        html += `<span class="hero-name-text">OTHER</span>`;
        html += `</span>`;
        html += `<span class="hero-count">&nbsp;x${categories.other.length}</span>`;  // <-- Move count here
        html += `</div>`;
        html += `<hr>`;
        
        const otherGroups = {};
        categories.other.forEach(card => {
            if (!otherGroups[card.name]) otherGroups[card.name] = [];
            otherGroups[card.name].push(card);
        });
        
        Object.keys(otherGroups).sort().forEach(cardName => {
            const cards = otherGroups[cardName];
            const card = cards[0];
            
            html += `<div class="card-line">`;
            
            // Class icons for other cards
            if (card.class1) html += createClassIconHTML(card.class1);
            if (card.class2) html += createClassIconHTML(card.class2);
            if (card.class3) html += createClassIconHTML(card.class3);
            
            html += `<span class="card-name">${cardName}</span>`;
            html += `<span class="card-count">&nbsp;x${cards.length}</span>`;
            html += `</div>`;
        });
        
        html += `</div>`;
    }

        // Wounds
    if (categories.wounds.length > 0) {
        html += `<div class="category-section">`;
        html += `<div class="category-header">`;
        html += `<span class="hero-name-container">`;
        html += `<span class="hero-name-text">WOUNDS</span>`;
        html += `</span>`;
        html += `<span class="hero-count">&nbsp;x${categories.wounds.length}</span>`;
        html += `</div>`;
        html += `</div>`; // No individual wound lines, just the header with count
        html += `<hr>`;
    }

    document.getElementById('stats-content').innerHTML = html;
}

function setEndGameHeroImage(heroName, customImagePath = '') {
    const heroImageElement = document.getElementById('endGameHeroImage');
    if (!heroImageElement) return;
    
    let imagePath = customImagePath;
    
    // If no custom path provided, use the mapping
    if (!imagePath) {
        const heroImageMap = {
            'black widow': 'Visual Assets/Heroes/Reskinned Core/Core_BlackWidow_DangerousRescue.webp',
            'captain america': 'Visual Assets/Heroes/Reskinned Core/Core_CaptainAmerica_ADayUnlikeAnyOther.webp',
            'cyclops': 'Visual Assets/Heroes/Reskinned Core/Core_Cyclops_OpticBlast.webp',
            'deadpool': 'Visual Assets/Heroes/Reskinned Core/Core_Deadpool_HereHoldThisForASecond.webp',
            'emma frost': 'Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_ShadowedThoughts.webp',
            'gambit': 'Visual Assets/Heroes/Reskinned Core/Core_Gambit_CardShark.webp',
            'hawkeye': 'Visual Assets/Heroes/Reskinned Core/Core_Hawkeye_QuickDraw.webp',
            'hulk': 'Visual Assets/Heroes/Reskinned Core/Core_Hulk_HulkSmash.webp',
            'iron man': 'Visual Assets/Heroes/Reskinned Core/Core_IronMan_ArcReactor.webp',
            'nick fury': 'Visual Assets/Heroes/Reskinned Core/Core_NickFury_LegendaryCommander.webp',
            'rogue': 'Visual Assets/Heroes/Reskinned Core/Core_Rogue_StealAbilities.webp',
            'spider-man': 'Visual Assets/Heroes/Reskinned Core/Core_SpiderMan_WebShooters.webp',
            'storm': 'Visual Assets/Heroes/Reskinned Core/Core_Storm_TidalWave.webp',
            'thor': 'Visual Assets/Heroes/Reskinned Core/Core_Thor_GodOfThunder.webp',
            'wolverine': 'Visual Assets/Heroes/Reskinned Core/Core_Wolverine_FrenziedSlashing.webp',
            'angel': 'Visual Assets/Heroes/Dark City/DarkCity_Angel_DropOffAFriend.webp',
            'bishop': 'Visual Assets/Heroes/Dark City/DarkCity_Bishop_FirepowerFromTheFuture.webp',
            'blade': 'Visual Assets/Heroes/Dark City/DarkCity_Blade_StalkThePrey.webp',
            'cable': 'Visual Assets/Heroes/Dark City/DarkCity_Cable_RapidResponseForce.webp',
            'colossus': 'Visual Assets/Heroes/Dark City/DarkCity_Colossus_Invulnerability.webp',
            'daredevil': 'Visual Assets/Heroes/Dark City/DarkCity_Daredevil_RadarSense.webp',
            'domino': 'Visual Assets/Heroes/Dark City/DarkCity_Domino_LuckyBreak.webp',
            'elektra': 'Visual Assets/Heroes/Dark City/DarkCity_Elektra_Ninjitsu.webp',
            'forge': 'Visual Assets/Heroes/Dark City/DarkCity_Forge_DirtyWork.webp',
            'ghost rider': 'Visual Assets/Heroes/Dark City/DarkCity_GhostRider_HellOnWheels.webp',
            'iceman': 'Visual Assets/Heroes/Dark City/DarkCity_Iceman_IceSlide.webp',
            'iron fist': 'Visual Assets/Heroes/Dark City/DarkCity_IronFist_WieldTheIronFist.webp',
            'jean grey': 'Visual Assets/Heroes/Dark City/DarkCity_JeanGrey_TelekineticMastery.webp',
            'nightcrawler': 'Visual Assets/Heroes/Dark City/DarkCity_Nightcrawler_AlongForTheRide.webp',
            'professor x': 'Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_TelepathicProbe.webp',
            'punisher': 'Visual Assets/Heroes/Dark City/DarkCity_Punisher_HostileInterrogation.webp',
            'x-force wolverine': 'Visual Assets/Heroes/Dark City/DarkCity_X-ForceWolverine_SuddenAmbush.webp',
            'human torch': 'Visual Assets/Heroes/Fantastic Four/FantasticFour_HumanTorch_FlameOn.webp',
            'invisible woman': 'Visual Assets/Heroes/Fantastic Four/FantasticFour_InvisibleWoman_InvisibleBarrier.webp',
            'mr. fantastic': 'Visual Assets/Heroes/Fantastic Four/FantasticFour_MrFantastic_TwistingEquations.webp',
            'silver surfer': 'Visual Assets/Heroes/Fantastic Four/FantasticFour_SilverSurfer_WarpSpeed.webp',
            'thing': 'Visual Assets/Heroes/Fantastic Four/FantasticFour_Thing_ItsClobberinTime.webp'
        };
        
        imagePath = heroImageMap[heroName.toLowerCase()] || 'Visual Assets/CardBack.webp';
    }
    
    heroImageElement.style.backgroundImage = `url('${imagePath}')`;
}