// updatesContent.js
const updatesHTML = `
<h3>🌃 <i>Version 2.0.0</i> - Dark City 🌃</h3>
<p>Welcome to our first expansion! This update brings you full <strong>Dark City</strong> functionality - all new cards and mechanics! There have also been some patches to bugs in the Core game so see notes below.</p>
<p>I just want to give a massive thanks to the players who've supported the game with donations, feedback, or just by being part of the community. This update is for you! Particular thanks go to Bageltop Games who has answered every one of my never-ending questions.</p>
<p>Especially with a new expansion, I'm sure there are things I've missed so please keep your feedback coming.</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<p>🌆 <span style="text-decoration:underline;"><strong>DARK CITY:</strong></span></p>
<ul>
<li><strong>New Heroes -</strong> 17 new Superheroes to recruit and play from X-Force, Marvel Knights and X-Men. 
<li><strong>'Critical Hit' Superpowers -</strong> These abilities show two icons instead of one and require you to have played cards with both icons earlier in your turn.
<li><strong>New Keywords -</strong> Be sure to have fun playing with <i>Teleport</i>, <i>Bribe</i> and <i>Versatile</i>. The rules for each will show in the Keywords panel.
<li><strong>Unique Bystanders -</strong> You are now able to rescue News Reporters, Radiation Scientists and Paramedics, granting you special rewards upon rescue.
<li><strong>New Schemes -</strong> 8 new schemes to dive into and try your best to survive.
</ul>
<p>🔁 <span style="text-decoration:underline;"><strong>GAME SETUP:</strong></span></p>
<ul>
<li><strong>Too many choices -</strong> Drop down filters are ready for Dark City. They can be applied in individual sections or overall if you'd like to randomize an entire Dark City game.
<li><strong>Who to save?</strong> You will now find a new Bystander section on the Game Setup screen, allowing you to select which expansions' Bystanders are included in your game. By default, all are enabled.
<li><strong>Am I seeing double?</strong> Those Villain groups with different numbers of each Villain (Enemies of Asgard, HYDRA and Skrulls) have now been accounted for when the game is initiated.
</ul>
<p>🖼️ <span style="text-decoration:underline;"><strong>USER INTERFACE:</strong></span></p>
<ul>
<li><strong>Umm, actually...</strong> Offical errata have been added for all relevant cards and will display in the Keywords panel. 
<li><strong>Who is that? </strong> You are now able to click on a Villain or Mastermind's overlays to see a list of captured Bystanders or other cards. Now you can be strategic about which Bystanders are worth saving first.
<li><strong>Does anyone actually read these notes? </strong> If they did, they'd know you need to hold down the <i>End Turn</i> button. Luckily for newbies, the button now says 'Hold to End Turn' for your first turn.
<li><strong>Slow down -</strong> The Heal Wounds popup will now complete before the turn is ended and the next Villain is drawn.
<li><strong>For clarity -</strong> The 'Mastermind' count on the gameboard has been relabelled as 'Remaining Tactics'.
</ul>
<p>🎮 <span style="text-decoration:underline;"><strong>GAMEPLAY:</strong></span></p>
<ul>
<li><strong>What just happened?</strong> Like Scheme Twists and Master Strikes, you will now see a popup for every Villain deck draw, alerting you to Escapes, Ambushes, Villains entering the city and Bystanders being captured.
<li><strong>What exactly does that mean?</strong> Popups for Scheme Twists and Master Strikes now include the relevant card text.
<li><strong>I swear I'm stronger!</strong> Issues with Attack points being incorrectly deducted have been resolved.
<li><strong>Can we skip to the good part?</strong> Upon winning, the Victory popup should now show before a new turn begins and a Villain is drawn.
<li><strong>But you said...</strong> The highlights that show you Villains elligible for attack are now conditional and corrected for Blob and Venom.
<li><strong>Be precise now!</strong> There was a small error with the calculation and rounding of Victory Points - now corrected.
<li><strong>Sort it out -</strong> The sorting of cards in your hand has been corrected - they are now sorted by color, then hero name, cost and card name.
<li><strong>The bane of my existence -</strong> Once again, I hope I have fixed the issue of avoiding multiple Hero tucks after multiple Scheme Twists. We'll see!
<li><strong>Sneak attack!</strong> All abilities and card effects that allow you to defeat a Villain for free have been checked to ensure they activate relevant fight effects.
</ul>
<p>🦹 <span style="text-decoration:underline;"><strong>MASTERMINDS:</strong></span></p>
<ul>
<li><strong>Dr Doom -</strong> His Master Strike popup now correctly says 'Return to the top of your deck' instead of 'Discard'.
<li><strong>Loki -</strong> The <i>Cruel Ruler</i> Tactic now triggers Villain fight effects when they are defeated and no longer messes up your Attack points.
<li><strong>Loki -</strong> The <i>Maniacal Tyrant</i> Tactic popup had an unnecessary second button - it has been removed.
<li><strong>Magneto -</strong> If you had a card to reveal and avoid gaining a Wound from the <i>Crushing Shockwave</i> Tactic, it only worked for the first Wound. It will now work for both.
<li><strong>Red Skull -</strong> The <i>Ruthless Dictator</i> Tactic was returning cards to the wrong place in the deck - now corrected.
</ul>
<p>🥷 <span style="text-decoration:underline;"><strong>VILLAINS:</strong></span></p>
<ul>
<li><strong>Paibok the Power Skrull -</strong> No longer says 'Recruit'.
</ul>
<p>👤 <span style="text-decoration:underline;"><strong>SIDEKICKS:</strong></span></p>
<ul>
<li><strong>Prodigy -</strong> Will now return to your hand if you press Cancel or Close on his ability.
</ul>
<p>🦸 <span style="text-decoration:underline;"><strong>HEROES:</strong></span></p>
<ul>
<li><strong>Captain America -</strong> <i>Avengers Assemble!</i> and <i>Perfect Teamwork</i> no longer count Wounds as a separate color.
<li><strong>Nick Fury - Pure Fury -</strong> Popup now says 'defeat' instead of 'attack'.
<li><strong>Storm - Spinning Cyclone -</strong> If there are no Villains in the city, the popup no longer opens.
<li><strong>Rogue - Steal Abilities -</strong> If she copied a 'Rogue - Copy Powers' or 'Prodigy' card, you were unable to then copy a Hero you had played. This has been corrected.
</ul>
<p>I hope these changes improve your Marvel Legendary Solo Play experience. Look out for more updates soon!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<hr>
<h3><i>Version 1.1.2</i> - UI Upgrade</h3>
<p>Welcome to the latest patch of the digital <strong>Marvel Legendary</strong> Solo experience! This patch brings you an upgraded UI experience and greater mobile responsiveness. See all patch notes below.</p>
<p>Thank you for all of the feedback and bug reports so far! Please keep them coming.</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<p style="text-decoration:underline;"><strong>USER INTERFACE:</strong></p>
<ul>
<li><strong>Under the hood -</strong> Popup minimization has changed - you can now fully minimize popups, hover over cards on the game board and check various decks without affecting game play. Use the triangle in the top left corner of each popup. 
<li><strong>Shiny and new -</strong> Popups have been redesigned to be more mobile responsive and friendly. Let me know if any cause issues or display incorrectly.
<li><strong>Target acquired –</strong> The HQ, S.H.I.E.L.D. Deck, Sidekick Stack, City and Mastermind will now be highlighted when you have enough points to Recruit or Attack. When you click a card, it now features a simpler Attack or Recruit icon to confirm your choice.
<li><strong>Begin at the beginning –</strong> The game setup screen now features duplicate <i>Randomize All</i> and <i>Start Game</i> buttons at the top, no longer requiring you to scroll.
<li><strong>Limited time only -</strong> When viewing the Discard or Played Cards piles, any cards that are temporary (copied cards, played Sidekicks) now have reduced opacity to mark them as such.
<li><strong>Sort it out -</strong> Every time a new hand is drawn, it is automatically sorted by colour first and then by name. When you draw extra cards, they will be added to the end of the hand but can be sorted manually using the <i>Sort Hand</i> button at the bottom of the game board. 
</ul>
<p style="text-decoration:underline;"><strong>GAMEPLAY:</strong></p>
<ul>
<li><strong>Move it!</strong> UI + Gameplay - you can now play cards in your Hand, attack and recruit simply by clicking a card twice. The <i>Play Selected</i> button isn't even needed anymore but has been left for those who don't read these notes!
<li><strong>Finish him!</strong> If playing with Final Blow, the Mastermind card will now appear properly in the Victory Pile when defeated. Victory Point calculation has also been fixed and you can no longer attack the Mastermind again after delivering the final blow.
<li><strong>Let me finish –</strong> If the Hero deck runs out, you now have until the end of your turn to win or maximise VP, rather than seeing the Draw popup instantly.
</ul>
<p style="text-decoration:underline;"><strong>SCHEMES:</strong></p>
<ul>
<li><strong>Midtown Bank Robbery -</strong> Fixed issue with Scheme Twists causing multiple hero tucks. Keep an eye on this one for me. 
</ul>
<p style="text-decoration:underline;"><strong>MASTERMINDS:</strong></p>
<ul>
<li><strong>Dr Doom –</strong> The <i>Secrets of Time Travel</i> Tactic didn't actually award an additional turn if drawn last. If it is your final tactic, you will now have an extra turn to gain more Victory Points before the game ends.
</ul>
<p style="text-decoration:underline;"><strong>SIDEKICKS:</strong></p>
<ul>
<li><strong>All Sidekicks –</strong> Fixed wording of Superpowers versus Special Abilities.
<li><strong>Boom-Boom –</strong> Error in handling Wounds addressed - will now work properly with Skids.
<li><strong>Lockjaw –</strong> Removed unnecessary console log.
<li><strong>Skids –</strong> Removed reference to 'playing' Skids when actually discarding.
<li><strong>Throg –</strong> Fixed an issue with Throg not returning to the Sidekick Stack properly.
</ul>
<p style="text-decoration:underline;"><strong>HEROES:</strong></p>
<ul>
<li><strong>Black Widow – Dangerous Rescue –</strong> This ability was triggering even when no cards were available to KO. Fixed now.
<li><strong>Nick Fury – Battlefield Promotion –</strong> Changed wording from Recruit to Gain.
<li><strong>Nick Fury – Pure Fury –</strong> Previously allowed you to close or cancel the popup - now requires you to make a choice.
<li><strong>Rogue – Energy Drain –</strong> Same as Black Widow - will not trigger anymore if you have no cards available to KO.
<li><strong>Thor – God of Thunder –</strong> This ability now triggers a brand new Attack popup that lets the player choose how many Attack and Recruit points to use - was good preparation for the <i>Bribe</i> keyword 😉.
</ul>
<p>I hope these changes improve your Marvel Legendary Solo Play experience. Look out for another update soon to improve popup layout and visuals. Enjoy!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<hr>
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
<li><strong>Slight misnomers -</strong> <i>Play All S.H.I.E.L.D.</i> has been changed to <i>Play All Greys</i> to avoid confusion with other S.H.I.E.L.D. cards like Nick Fury. Also, Escape Pile corrected form Escaped Pile.
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
