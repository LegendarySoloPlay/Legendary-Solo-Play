// updatesContent.js
const updatesHTML = `
<h3><i>Version 1.1.1</i> - Squashing Bugs</h3>
<p>Welcome to the latest patch of the digital <strong>Marvel Legendary</strong> Solo experience! See all patch notes below.</p>
<p>Thank you for all of the feedback and bug reports so far! Please keep them coming.</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<p style="text-decoration:underline;"><strong>GAMEPLAY:</strong></p>
<ul>
<li><strong>Hurry up!</strong> The time you need to hold the <i>End Turn</i> button has now been reduced.
<li><strong>One last punch –</strong> Final Blow was broken and has now been restored.
<li><strong>Who do they KO?</strong> You will now be able to toggle and confirm your selection on the Villain Escape popup. 
<li><strong>That hurts –</strong> Popup and game state management has improved around cards that allow you to avoid gaining a Wound. 
<li><strong>Did I do good?</strong> VP calculation has been changed to league and tournament style. No points are subtracted at End Game. Whether you win, lose or draw, you will now see your stats: Total Victory Points, Total Turns Taken, Average VP Per Turn and Number of Escapes. 
</ul>
<p style="text-decoration:underline;"><strong>USER INTERFACE:</strong></p>
<ul>
<li><strong>What's that called?</strong> Incorrect popup titles have been corrected. 
<li><strong>Slight misnomers</strong> <i>Play All S.H.I.E.L.D.</i> has been changed to <i>Play All Greys</i> to avoid confusion with other S.H.I.E.L.D. cards like Nick Fury. Also, Escape Pile corrected form Escaped Pile.
<li><strong>At a glance –</strong> The Discard pile and Played Cards pile are now face up and will display the last card added to them. Not enough room on the gameboard to add this for Escapes, KOs or VP.
<li><strong>Eyes on the prize –</strong> An optional toggle has been added to the side panel so that it can be minimised when you want to concentrate on the gameboard.
<li><strong>Who just arrived?</strong> The console now logs when a new Hero enters the HQ.
<li><strong>That was last time - </strong> Scheme Twist and Villain Escape popups were displaying the card image from the previous iteration of the popup. Fixed now. 
<li><strong>Powered or not?</strong> Minor corrections to wording in popups and the console log to differentiate between Hero <i>Special Abilities</i> that can be played immediately and <i>Superpower Abilities</i> that require something to activate.
</ul>
<p style="text-decoration:underline;"><strong>SCHEMES:</strong></p>
<ul>
<li><strong>Secret Invasion of the Skrull Shapeshifters -</strong> Fixed issue with Skrull Heroes entering both the Discard and Victory Piles when defeated. 
</ul>
<p style="text-decoration:underline;"><strong>MASTERMINDS:</strong></p>
<ul>
<li><strong>Magneto –</strong> The <i>Electromagnetic Bubble</i> Tactic didn't differentiate between cards you have already played and cards in your hand. The popup now shows you where cards are located and will resere your chosen card at the end of your turn, allowing you to still play it if it is in your Hand.
<li><strong>All Masterminds –</strong> All Tactics have been refactored for mobile responsiveness - you will now be able to toggle and select cards before confirming, and will no longer see any double confirm buttons.
</ul>
<p style="text-decoration:underline;"><strong>HENCHMEN:</strong></p>
<ul>
<li><strong>Sentinel –</strong> Corrected an issue with button labelling in popup.
</ul>
<p style="text-decoration:underline;"><strong>VILLAINS:</strong></p>
<ul>
<li><strong>Blob –</strong> Unable to fight even with an X-Men Hero has been resolved.
<li><strong>Venom –</strong> Unable to fight even with a Covert Hero has been resolved.
<li><strong>Super-Skrull –</strong> Corrected an issue with button labelling in popup.
<li><strong>Destroyer –</strong> When all S.H.I.E.L.D. cards are KO'd, any that have been played will still appear in the Played Cards pile until the end of your turn. This allows for other card effects that may count or check played cards.
</ul>
<p style="text-decoration:underline;"><strong>SIDEKICKS:</strong></p>
<ul>
<li><strong>Hairball –</strong> Missing +1 Attack fixed and now corrected to only draw one card instead of two.
<li><strong>Darwin –</strong> Incorrectly displayed the <i>Investigate</i> keyword - now removed.
<li><strong>Skids –</strong> Issue using Skids ability to avoid a Wound has been corrected.
</ul>
<p style="text-decoration:underline;"><strong>HEROES:</strong></p>
<ul>
<li><strong>Black Widow – Dangerous Rescue –</strong> The option not to KO had stopped working - now corrected.
<li><strong>Cyclops – Optic Blast and Determination –</strong> Previously would let you play them with no cards in your Hand - now corrected.
<li><strong>Cyclops – Unending Energy –</strong> Issues with it being returned to Hand after being discarded - now corrected.
<li><strong>Emma Frost – Psychic Link –</strong> Previously did not allow the player to choose - now you <i>"may reveal"</i> as intended.
<li><strong>Gambit – Hypnotic Charm –</strong> Recorrected so that the Special Ability triggers, but not the Superpower Ability since <i>"each other player"</i> effects on Hero cards do not apply in Solo play. Weird issue with popup title has also been fixed.
<li><strong>Hawkeye – Covering Fire –</strong> As with Gambit, this Superpower Ability has been removed since <i>"each other player"</i> effects on Hero cards do not apply in Solo play. Console logs have been added to remind players of this during the game.
<li><strong>Hulk – Unstoppable Hulk –</strong> The option not to KO a Wound had stopped working - now corrected. Refinements to popup allowing you to select a Wound.
<li><strong>Nick Fury – Battlefield Promotion – </strong>Previously assumed that the player would KO a card AND gain a S.H.I.E.L.D. Officer. The popup now allows you to do KO with or without gaining the second card.
<li><strong>Wolverine – Healing Factor –</strong> The option not to KO a Wound had stopped working - now corrected. Refinements to popup allowing you to select a Wound.
</ul>
<p>I hope these changes improve your Marvel Legendary Solo Play experience. Look out for another update soon to improve popup layout and visuals. Enjoy!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<hr>
<h3><i>Version 1.1.0</i> - Mark II</h3>
<p>🎉 Welcome to the first major update of the digital <strong>Marvel Legendary</strong> Solo experience! See all patch notes below.</p>
<p>Thank you for all of the feedback and bug reports so far! Please keep them coming.</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<p style="text-decoration:underline;"><strong>GAMEPLAY:</strong></p>
<ul>
<li><strong>Sidekicks reporting for duty!</strong> All Sidekicks from various expansions have been added to the game. On the game setup screen, you can customise which expansions’ sidekicks you want to play with. Default is all of them.
<li><strong>Stay in the shadows –</strong> Revealing a card is now optional. If a card effect allows you to reveal a card, it now triggers a popup asking whether you want to.
<li><strong>Which comes first?</strong> Changes made to the resolution of Scheme Twists so that selecting a Hero in the HQ to place on the bottom of the deck takes place once the Scheme Twist is completed (including any subsequent Escape and Ambush effects). 
<li><strong>Messy wounds –</strong> Wounds can no longer be selected within your hand and do not count as played cards. They also now count properly as zero cost cards and can no longer be healed after attacking the Mastermind. 
<li><strong>Can we skip to the good part?</strong> You will now find a <i>Play All S.H.I.E.L.D.</i> button at the bottom of the gameboard, allowing you to automatically select and confirm all S.H.I.E.L.D. Agents, Troopers and Officers in your hand.
<li><strong>Super prepared –</strong> You also now have access to a toggle between Auto and Manual Superpowers. By default, Auto is selected and means Hero abilities will trigger if their conditions have been met. Turn Manual on when you wish to play more strategically - confirming a Hero card will trigger a popup that allows you to choose whether or not to activate that Hero's abilities.
<li><strong>Can I take that back?</strong> No more accidentally hitting <i>End Turn</i> – you now need to hold it down to confirm you’re finished your turn.
</ul>
<p style="text-decoration:underline;"><strong>GAME SETUP:</strong></p>
<ul>
<li><strong>I don’t know what to pick!</strong> Randomization is now based upon Schemes. Selecting <i>Randomize All</i> will ensure all Scheme requirements are met. This includes a fix for multiple henchmen groups that are now added to the Villain deck correctly.
</ul>
<p style="text-decoration:underline;"><strong>USER INTERFACE:</strong></p>
<ul>
<li><strong>Can’t keep track –</strong> Counts have been added to all decks so that you can see how many cards are remaining as well as a running Victory Point total. 
<li><strong>Where are we up to?</strong> Have added a turn count to the console log.
<li><strong>Easy on the eyes –</strong> I’ve changed the card art to popular reskins. All card images have also been changed to <i>.webp</i> format to minimise size and reduce lag/loading time. The selection effect in the player’s hand has also been reduced to be less disruptive.
<li><strong>Eyes on the prize –</strong> An optional toggle has been added to the side panel so that it can be minimised when you want to concentrate on the gameboard.
<li><strong>What does that mean again?</strong> The Keywords panel has been activated and works for any cards with a listed keyword (only Sidekicks at this stage). When hovered or selected, a card with a keyword will have it described in the keyword console. Additionally, card names in the console can also be hovered or tapped to display the card image and keywords too.
<li><strong>Get out of the way!</strong> Popups now have a minimise button that will lower their opacity so that you can inspect the gameboard before making key decisions. 
<li><strong>Higher, further, faster –</strong> Recruiting and Attacking is now handled much faster with overlays instead of popups. Now you can click a card and immediately click again if you want to recruit or attack (as long as you have the points for it).
<li><strong>Mobile responsive –</strong> All popups have been recoded so that everything now has a confirm button. This avoids reliance on hover effects and means that mobile players will be able to select options in a popup in order to see the target card before confirming their selection.
</ul>
<p style="text-decoration:underline;"><strong>SCHEMES:</strong></p>
<ul>
<li><strong>Replace Earth’s Leaders with Killbots –</strong> Previously had no way of knowing how much attack Killbots had. Killbot cards have an overlay and the number of drawn scheme twists is now shown on the gameboard.
<li><strong>Secret Invasion of the Skrull Shapeshifters -</strong> Fixed issue with the calculation of Attack Points when Heroes become Skrull Villains.
</ul>
<p style="text-decoration:underline;"><strong>MASTERMINDS:</strong></p>
<ul>
<li><strong>Dr Doom –</strong> Fixed an issue where his Master Strike was adding cards to the bottom of the deck rather than the top.
<li><strong>Red Skull –</strong> Fixed an issue where his Master Strike allowed you to KO a Wound instead of a Hero.
</ul>
<p style="text-decoration:underline;"><strong>VILLAINS:</strong></p>
<ul>
<li><strong>Melter –</strong> Issue with revealing the top card has been resolved.
</ul>
<p style="text-decoration:underline;"><strong>HEROES:</strong></p>
<ul>
<li><strong>Black Widow – Dangerous Rescue –</strong> Fixed an issue where you were unable to KO the last card added to the Discard Pile.
<li><strong>Cyclops – Unending Energy –</strong> Multiple issues when piggybacking Cyclops cards off of one another. Seems to be resolved for now but may need further playtesting.
<li><strong>Gambit – Hypnotic Charm –</strong> Now correctly triggers a second time if an Instinct card has been played (since “each other player’s” applies to the player in solo play).
<li><strong>Hawkeye – Covering Fire –</strong> Was not working consistently but has been fixed.
<li><strong>Hawkeye – Impossible Trick Shot – </strong>This effect was not stacking if the card was copied by Rogue or another effect. Has been fixed now. 
<li><strong>Rogue – Copy Powers –</strong> Had some issues copying particular cards, including Cyclops – Optic Blast. Seems to be resolved now.
<li><strong>Thor - Odinson -</strong> Incorrect stacking of Recruit Points fixed.
</ul>
<p>I hope these changes improve your Marvel Legendary Solo Play experience. Enjoy!</p>
<hr>
<h3><i>Version 1.0.0</i> - Initial Release</h3>
<ul>
  <li>🎉 First release of the digital <strong>Marvel Legendary</strong> Solo experience!</li>
  <li>Includes the core game with all base set heroes, villains, masterminds, and schemes.</li>
  <li>Implements the latest <i>"What If...?"</i> solo rules building upon Advanced Solo mode for an optimised single-player experience.</li>
  <li>Features a fully functional game board, card interactions, automated game start up and deck management.</li>
</ul>

<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
`;


  function loadUpdatesContent() {
  const updatesContainer = document.getElementById('updates');
  if (updatesContainer) {
    updatesContainer.innerHTML = updatesHTML;
  }
}
