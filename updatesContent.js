// updatesContent.js
//30.09.2025 20.55
const updatesHTML = `
<h3>✨ <i>Version 3.0.1</i> - Fantastic Fixes<img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="popup-card-icons"></h3>
<p>Latest patch to fix early Fantastic Four issue and add some new game features.</p>
<p>Thanks for the feedback around this expansion so far!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<p>🎮 <span style="text-decoration:underline;"><strong>UPDATES:</strong></span></p>
<ul>
<li><strong>Cosmic Threat -</strong> Galactus is proving a mighty foe after all - hopefully all issues with his Cosmic Threat button have been resolved now.
<li><strong>End Game Stats -</strong> New additions to the end game popups will now give you your game stats, including game length and traditional score, as well as a panel with all your cards to track which Heroes you use the most. 
<li><strong>Stand your ground -</strong> A new floating menu on the main screen will stay present as you scroll, allowing you to start the game at any point.
<li><strong>Just a tip -</strong> If you play on a mobile device, try adding the site to your homescreen - this removes the Safari menu ribbon, allowing fullscreen much easier!
</ul>
<hr>
<h3>✨ <i>Version 3.0.0</i> - Fantastic Four <img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="popup-card-icons"></h3>
<p>Welcome to our next expansion! This update brings you the <strong>Fantastic Four</strong> at their finest - all new cards and mechanics! There have also been some major patches and changes under the hood.</p>
<p>Another massive thank you to this incredible community! Keep the feedback coming!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<p><img src="Visual Assets/Icons/Fantastic Four.svg" alt="Fantastic Four Icon" class="popup-card-icons"> <span style="text-decoration:underline;"><strong>FANTASTIC FOUR:</strong></span></p>
<ul>
<li><strong>New Heroes -</strong> 5 new Superheroes to recruit and play from Marvel's First Family, plus the Silver Surfer.
<li><strong>New Threats -</strong> 4 new Schemes, 2 Masterminds and 2 Villain groups to take down. 
<li><strong>New Keywords -</strong> Be sure to have fun playing with <i>Focus</i>, <i>Burrow</i> and <i>Cosmic Threat</i>. The rules for each will show in the Keywords panel. Focus abilities can be accessed multiple times via the Played Cards popup.
</ul>
<p>🖼️ <span style="text-decoration:underline;"><strong>USER INTERFACE:</strong></span></p>
<ul>
<li><strong>I think something just moved!</strong> Our game now features animations when attacking Villains or recruiting Heroes. 
<li><strong>Night Vision! </strong> You can now customize your preferred color scheme and font via the Settings menu, accessed by the cog on the Game Setup screen or in the top right corner of the gameboard. 
<li><strong>What's your name? </strong> The card preview panel now zooms on both the card's text as well as its name.
</ul>
<p>🎮 <span style="text-decoration:underline;"><strong>GAMEPLAY:</strong></span></p>
<ul>
<li><strong>Location, location!</strong> Some previous card effects and new cards in Fantastic Four provide Attack or Recruit only applicable to certain City or HQ spaces. When relevant, these will now appear separately as 'Reserved' Attack or Recruit and tell you where it can be spent.
<li><strong>Not quite a restart... </strong> At end game, you can now click <i>Restart</i> which will return you to the Game Setup screen, skipping the Expansion and Intro popups. There is also a <i>Load Last Setup</i> button that allows you to reselect your last set of selections.
</ul>
<p>I hope you enjoy this new foray into the cosmos!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<hr>
<h3>🌃 <i>Version 2.0.2</i> - Dark City Bug Squashing 🌃</h3>
<p>Thanks again for all the feedback! Still squashing Dark City bugs but hopefully this resolves most issues and I'll move on to our next expansion. Let me know what else you find!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<p>🔁 <span style="text-decoration:underline;"><strong>GAME SETUP:</strong></span></p>
<ul>
<li><strong>She's a little busy -</strong> If the <i>Transform Citizens Into Demons</i> Scheme is randomly chosen, it will automatically avoid selecting Jean Grey as a Hero since she will be used in the Villain deck. This can be manually overridden if you do wish to select her.
<li><strong>Come back later -</strong> The starting game HQ Mulligan has been introduced - if you begin the game with two or more Heroes with a cost of 7 or more, then you will have the option to shuffle them back into the Hero deck and replace with Heroes that cost less than 7.
</ul>
<p>🖼️ <span style="text-decoration:underline;"><strong>USER INTERFACE:</strong></span></p>
<ul>
<li><strong>Don't make me sing!</strong> The game now includes background music and sound effects. The volume for these can be controlled using the settings menu, accessed by the cog on the Game Setup screen or in the top right corner of the gameboard. 
<li><strong>At a glance -</strong> Heroes listed in popups now include their team and class icons for reference.
<li><strong>Let's get logical -</strong> In relevant places, the list of Heroes in popups will now be sorted by the same logic as your hand cards. 
<li><strong>Lost the flavour -</strong> Last update's flavour text did not roll out to the Evil Wins popups. This has been corrected. 
<li><strong>How many have I played -</strong> The Played Cards pile will now also be sorted automatically so it is easier to count how many cards you've played of particular colors.
<li><strong>Are demons meant to be attractive?</strong> When playing the <i>Transform Citizens Into Demons</i> Scheme, your Jean Grey cards will now be replaced with Snatchcat's custom Goblin Queen tokens. 
</ul>
<p>🎮 <span style="text-decoration:underline;"><strong>GAMEPLAY:</strong></span></p>
<ul>
<li><strong>When does it stop?</strong> A new Villain card will no longer be drawn when the game ends.
<li><strong>What was coming?</strong> At end game, you can now minimise the final popup and open any deck to inspect what cards were remaining.
<li><strong>Strike first, ask later!</strong> If you fight a Villain with Bribe, you will now choose the balance of Attack and Recruit points before any fight effects are carried out. Fight choices have also been aligned with the <i>What If..?</i> rules, allowing you to select the order in which you rescue any captured cards and when you trigger the Villain's fight effect.
<li><strong>Who's next?</strong> The close button on Villain popups now works correctly, allowing any further actions or cards to carry out.
</ul>
<p>📋 <span style="text-decoration:underline;"><strong>SCHEMES:</strong></span></p>
<ul>
<li><strong>Capture Baby Hope -</strong> When Hope is rescued, she will now appear as Snatchcat's token in your Victory Pile. 
<li><strong>Massive Earthquake Generator -</strong> When able to reveal a card for this Scheme, the image is no longer broken.
<li><strong>Steal the Weaponized Plutonium -</strong> If a Scheme Twist triggers another Scheme Twists it will now correctly draw the required additional Villain card.
<li><strong>X-Cutioner's Song -</strong> Errors with Attack calculation have been addressed.
</ul>
<p>🧛 <span style="text-decoration:underline;"><strong>MASTERMINDS:</strong></span></p>
<ul>
<li><strong>Apocalypse -</strong> An issue with games against Apocalypse not ending has been fixed.
<li><strong>Mr. Sinister -</strong> Previous issue with Attack calculation has been corrected. When a Master Strike occurs, cards appeared as if remaining in the player's hand. They are now properly removed. 
<li><strong>Red Skull -</strong> The <i>Ruthless Dictator</i> Tactic would previously quit if you had less that three cards available to reveal. It will now correctly do "as much as possible".
<li><strong>Stryfe -</strong> The <i>Psychic Torment</i> Tactic was accidentally duplicating whichever card was added to the player's hand. It will now correctly discard the other four revealed cards.
</ul>
<p>🥷 <span style="text-decoration:underline;"><strong>HENCHMEN:</strong></span>
<ul>
<li><strong>Maggia Goons –</strong> Game would break if you minimized the Maggia Goons popup and then maximized again. Now fixed.
<li><strong>Phalanx –</strong> Issue fixed with Phalanx staying in the city after being defeated.
</ul>
<p>🦹 <span style="text-decoration:underline;"><strong>VILLAINS:</strong></span></p>
<ul>
<li><strong>Azazel -</strong> If there are no Heroes to gain Teleport upon Azazel's defeat, that will now trigger a console message explaining this. 
<li><strong>Dracula -</strong> There was an issue with Dracula's attack not calculating correctly, especially during certain schemes. Now fixed.
<li><strong>Scalphunter -</strong> No longer triggers the popup saying the Bystander will be captured by the Villain closest to the Villain deck.
</ul>
<p>👤 <span style="text-decoration:underline;"><strong>SIDEKICKS:</strong></span></p>
<ul>
<li><strong>Boom-Boom -</strong> Will now appear face-up when revealed after Time Bomb is played.
<li><strong>No need for help -</strong> If you choose to include no Sidekicks in your game setup then the Sidekick Stack will no longer appear on the gameboard, this will also prevent it from being highlighted when you have enough Recruit points.
</ul>
<p>🦸 <span style="text-decoration:underline;"><strong>HEROES:</strong></span></p>
<ul>
<li><strong>Bishop - Absorb Energies -</strong> Was still not stacking correctly - should be resolved now.
<li><strong>Colossus -</strong> Now correctly labelled as an X-Force Hero in the Game Setup screen.
<li><strong>Forge - B.F.G. -</strong> Will now correctly play even if it is the Mastermind's final Tactic or Final Blow.
<li><strong>Ghost Rider - Infernal Chains -</strong> Can now target Demon Goblins if in play and can also defeat the top card of the Villain deck if Professor X's Telepathic Probe has revealed a Villain with 3 or less Attack.
<li><strong>Jean Grey -</strong> Effects that trigger on Bystander rescues now correctly apply when a Killbot is defeated.
<li><strong>Rogue - Copy Powers -</strong> When played, you must choose a Hero to copy if one is available.
</ul>
<p>I hope these changes improve your Marvel Legendary Solo Play experience. Look out for more updates soon!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<hr>
<h3>🌃 <i>Version 2.0.1</i> - Dark City Fixes 🌃</h3>
<p>Thanks again for all the feedback! Thanks to you I've found and fixed a lot of initial Dark City bugs. Keep the reports coming!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<p>🖼️ <span style="text-decoration:underline;"><strong>USER INTERFACE:</strong></span></p>
<ul>
<li><strong>I thought we were finished?</strong> The Mastermind was staying highlighted after being fully defeated. Now they will no longer appear attackable once you have finished. 
</ul>
<p>🎮 <span style="text-decoration:underline;"><strong>GAMEPLAY:</strong></span></p>
<ul>
<li><strong>Short term memory -</strong> Cards you reveal or return to the top of a deck will now appear face up so that a quick glance will remind you.
<li><strong>Be specific!</strong> Details have been added to the End Game popups whether you win, lose or draw. Flavour text suited to your chosen Mastermind and Scheme will describe the outcome of your game.
<li><strong>Eeny, meeny, miny, moe!</strong> When attacking a Villain or Mastermind with multiple Bystanders, you will now be able to select the order in which they are rescued before any Fight effects or Tactics are carried out.
<li><strong>Can I get a countdown?</strong> The gameboard now features an 'Evil Wins' tracker beneath the Scheme, letting you know just how much danger you're in.
<li><strong>You can't sit with us!</strong> Any Villains gained as Heroes (by way of Professor X) will now be sorted together within your hand.
<li><strong>But no-one is left!</strong> If a Villain escaped with a Bystander and forced you to discard, the game would softlock if you had no cards to discard. Now fixed.
</ul>
<p>📋 <span style="text-decoration:underline;"><strong>SCHEMES:</strong></span></p>
<ul>
<li><strong>Negative Zone Prison Breakout -</strong> An extra card was being drawn sometimes - now corrected.
<li><strong>Replace Earth's Leaders with Killbots -</strong> Was accidentally adding one additional non-Killbot Bystander to the Villain Deck. Now removed.
<li><strong>Save Humanity -</strong> If able to reveal a card on a Scheme Twist, the reveal popup will now trigger first and the image is no longer broken.
<li><strong>Secret Invasion of the Skrull Shapeshifters -</strong> Heroes gained from the city now possess their correct abilities. 
<li><strong>Steal the Weaponized Plutonium -</strong> Scheme Twists kept adding confirm buttons.
<li><strong>Transform Citizens Into Demons -</strong> The Demon Goblin stack now features the token images. 
<li><strong>X-Cutioner's Song -</strong> Heroes played from the Villain deck now generate popups upon being drawn. Scheme Twists will now draw an extra card correctly.
</ul>
<p>🧛 <span style="text-decoration:underline;"><strong>MASTERMINDS:</strong></span></p>
<ul>
<li><strong>Apocalypse -</strong> Apocalypse Wins and Always Leads effects apply to your chosen Adversary group whether they are Four Horsemen or not.
<li><strong>Apocalypse -</strong> Master Strike will now take into account Villains gained as Heroes since their attack becomes their cost.
<li><strong>Apocalypse -</strong> <i>The End of All Things</i> Tactic now lets you select the order to return cards when necessary, rather than randomizing.
<li><strong>Kingpin -</strong> The <i>Mob War</i> Tactic was forcing you to play all Henchmen in your Victory Pile - it will now only make you select one.
<li><strong>Magento -</strong> The <i>Electromagnetic Bubble</i> Tactic no longer removes your chosen card from play - it can still be selected by other cards and effects but will be added to your next draw regardless.
<li><strong>Magento -</strong> Corrected the occassional appearance of an additional button when playing with Nightcrawler.
<li><strong>Stryfe -</strong> The <i>Furious Wrath</i> Tactic was acting as if a Scheme Twist was played - fixed now.
<li><strong>Stryfe -</strong> The <i>Tide of Retribution</i> Tactic had an image error - fixed now.
</ul>
<p>🦹 <span style="text-decoration:underline;"><strong>VILLAINS:</strong></span></p>
<ul>
<li><strong>Chimera -</strong> If Chimera is played as a result of Kingpin's <i>Criminal Empire</i> Tactic, her Ambush no longer counts the cards revealed at the same time as her. They are now returned to the top of the Villain deck after her Ambush.
<li><strong>Supreme HYDRA -</strong> Victory Points were not correctly identified when Punisher - Hail of Bullets was played. Now corrected.
</ul>
<p>👤 <span style="text-decoration:underline;"><strong>BYSTANDERS + SIDEKICKS:</strong></span></p>
<ul>
<li><strong>Radiation Scientist -</strong> Card image now appears when the popup opens so you know it is that effect being triggered. Also corrected the list title from 'Hand' to 'Cards You Have'.
<li><strong>Zabu -</strong> Previously had Cancel and Close buttons - they have been removed so that if you play Zabu, you must KO a card.
</ul>
<p>🦸 <span style="text-decoration:underline;"><strong>HEROES:</strong></span></p>
<ul>
<li><strong>Angel - Diving Catch -</strong> Completes the Bystander rescue, including any effects, before the two cards are drawn.
<li><strong>Bishop - Absorb Energies -</strong> Now correctly increments if you play more than one.
<li><strong>Blade - Night Hunter -</strong> Now correctly increments if you play more than one.
<li><strong>Cyclops - Unending Energy -</strong> Issues when having multiple copies to discard have been fixed. A specific issue with Vertigo completing deleting Unending Energy has been fixed.
<li><strong>Deadpool - Here, Hold This for a Second -</strong> No longer triggers the popup saying the Bystander will be captured by the Villain closest to the Villain deck. Bystanders can also be attached to Jean Grey Goblin Queens now.
<li><strong>Deadpool - Random Acts of Unkindness -</strong> Wounds are correctly gained to your hand now.
<li><strong>Emma Frost - Diamond Form -</strong> Will now correctly add +3 Recruit for defeated Demon Goblins in the <i>Transform Citizens into Demons</i> Schemes.
<li><strong>Iron Fist - Living Weapon -</strong> Was not comparing or drawing cards correctly but now fixed.
<li><strong>Jean Grey -</strong> Various effects now increment correctly if playing more than one card.
<li><strong>Professor X - Class Dismissed -</strong> Will no longer allow you to send a Bystander to the bottom of the Hero deck if playing the <i>Save Humanity</i> Scheme. Also corrected an issue where card selection wouldn't work if a HQ space has been destroyed during the <i>Detonate the Helicarrier</i> Scheme.
<li><strong>Punisher - Hail of Bullets -</strong> Occasional issues in adding attack have been corrected.
</ul>
<p>I hope these changes improve your Marvel Legendary Solo Play experience. Look out for more updates soon!</p>
<p>📧 For any bugs, issues, feedback, or suggestions, please email us at legendarysoloplay@gmail.com - We appreciate your input!</p>
<hr>
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
<p>🦹 <span style="text-decoration:underline;"><strong>VILLAINS:</strong></span></p>
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