//30.09.2025 20.55

const bystanders = [
{ id: 1, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 2, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 3, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 4, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 5, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 6, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 7, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 8, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 9, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 10, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 11, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 12, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 13, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 14, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 15, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 16, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 17, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 18, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 19, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 20, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 21, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 22, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 23, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 24, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 25, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 26, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 27, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 28, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 29, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" },
{ id: 30, name: 'Bystander', type: 'Bystander', victoryPoints: 1, image: "Visual Assets/Other/Bystander.webp" }
]


const expansionBystanders = {
    "Dark City": [
        {name: 'News Reporter', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderNewsReporter', image: "Visual Assets/Other/Bystanders/newsReporter.webp" },
        {name: 'News Reporter', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderNewsReporter', image: "Visual Assets/Other/Bystanders/newsReporter.webp" },
        {name: 'News Reporter', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderNewsReporter', image: "Visual Assets/Other/Bystanders/newsReporter.webp" },
        {name: 'News Reporter', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderNewsReporter', image: "Visual Assets/Other/Bystanders/newsReporter.webp" },
        {name: 'Radiation Scientist', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderRadiationScientist', image: "Visual Assets/Other/Bystanders/radiationScientist.webp" },
        {name: 'Radiation Scientist', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderRadiationScientist', image: "Visual Assets/Other/Bystanders/radiationScientist.webp" },
        {name: 'Radiation Scientist', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderRadiationScientist', image: "Visual Assets/Other/Bystanders/radiationScientist.webp" },
        {name: 'Radiation Scientist', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderRadiationScientist', image: "Visual Assets/Other/Bystanders/radiationScientist.webp" },
        {name: 'Paramedic', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderParamedic', image: "Visual Assets/Other/Bystanders/paramedic.webp" },
        {name: 'Paramedic', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderParamedic', image: "Visual Assets/Other/Bystanders/paramedic.webp" },
        {name: 'Paramedic', type: 'Bystander', expansion: 'Dark City', victoryPoints: 1, bystanderUnconditionalAbility: 'bystanderParamedic', image: "Visual Assets/Other/Bystanders/paramedic.webp" }
    ]
};

const bystanderKillbots = [
{ name: 'Bystander - Killbot', image: "Visual Assets/Other/Bystander.webp" },
{ name: 'News Reporter - Killbot', image: "Visual Assets/Other/Bystanders/newsReporter.webp" },
{ name: 'Radiation Scientist - Killbot', image: "Visual Assets/Other/Bystanders/radiationScientist.webp" },
{ name: 'Paramedic - Killbot', image: "Visual Assets/Other/Bystanders/paramedic.webp" }
]

const wounds = [
{ id: 1, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 2, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 3, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 4, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 5, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 6, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 7, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 8, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 9, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 10, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 11, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 12, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 13, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 14, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 15, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 16, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 17, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 18, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 19, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 20, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 21, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 22, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 23, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 24, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 25, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 26, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 27, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 28, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 29, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" },
{ id: 30, name: 'Wound', type: 'Wound', victoryPoints: 0, cost: 0, attack: 0, recruit: 0, class1: "None", color: "None", team: "none", image: "Visual Assets/Other/Wound.webp" }
]

const shieldCards = [
    { id: 'SHIELD1', type: "Hero", name: "S.H.I.E.L.D. Trooper", team: "S.H.I.E.L.D.", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldtrooper.webp" },
    { id: 'SHIELD2', type: "Hero", name: "S.H.I.E.L.D. Trooper", team: "S.H.I.E.L.D.", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldtrooper.webp"  },
    { id: 'SHIELD3', type: "Hero", name: "S.H.I.E.L.D. Trooper", team: "S.H.I.E.L.D.", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldtrooper.webp"  },
    { id: 'SHIELD4', type: "Hero", name: "S.H.I.E.L.D. Trooper", team: "S.H.I.E.L.D.", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldtrooper.webp"  },
    { id: 'SHIELD5', type: "Hero", name: "S.H.I.E.L.D. Agent", team: "S.H.I.E.L.D.", attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldagent.webp"  },
    { id: 'SHIELD6', type: "Hero", name: "S.H.I.E.L.D. Agent", team: "S.H.I.E.L.D.", attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldagent.webp"  },
    { id: 'SHIELD7', type: "Hero", name: "S.H.I.E.L.D. Agent", team: "S.H.I.E.L.D.", attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldagent.webp"  },
    { id: 'SHIELD8', type: "Hero", name: "S.H.I.E.L.D. Agent", team: "S.H.I.E.L.D.", attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldagent.webp"  },
    { id: 'SHIELD9', type: "Hero", name: "S.H.I.E.L.D. Agent", team: "S.H.I.E.L.D.", attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldagent.webp"  },
    { id: 'SHIELD10', type: "Hero", name: "S.H.I.E.L.D. Agent", team: "S.H.I.E.L.D.", attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldagent.webp"  },
    { id: 'SHIELD11', type: "Hero", name: "S.H.I.E.L.D. Agent", team: "S.H.I.E.L.D.", attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldagent.webp"  },
    { id: 'SHIELD12', type: "Hero", name: "S.H.I.E.L.D. Agent", team: "S.H.I.E.L.D.", attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, cost: 0, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldagent.webp"  }
]

const shieldOfficers = [
    { id: 'SHIELD13', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD14', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD15', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD16', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD17', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD18', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD19', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD20', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD21', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD22', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD23', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD24', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD25', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD26', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD27', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD28', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD29', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD30', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD31', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
    { id: 'SHIELD32', type: "Hero", name: "S.H.I.E.L.D. Officer", team: "S.H.I.E.L.D.", attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, cost: 3, class1: "None", color: "Grey", unconditionalAbility: "None", image: "Visual Assets/Heroes/SHIELD/shieldofficer.webp" },
]

const schemes = [
    {
        id: 1,
        name: "Midtown Bank Robbery",
        bystanderCount: 12,
        twistCount: 8,
        endGame: "8BystandersCarriedAway",
        twistEffect: "bankRobbery",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3, 
variableTwist: false,
twistText: "Any Villain in the Bank captures 2 Bystanders. Then play the top card of the Villain Deck.",
image: "Visual Assets/Schemes/bankrobbery.webp"

    },
    {
        id: 2,
        name: "Negative Zone Prison Breakout",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "12VillainsEscape",
        twistEffect: "doubleVillainDraw",
requiredVillains: 1,
requiredHenchmen: 2,
requiredHeroes: 3,  
variableTwist: false,
twistText: "Play the top two cards of the Villain Deck.",
image: "Visual Assets/Schemes/negativezone.webp"
    },
    {
        id: 3,
        name: "Portals to the Dark Dimension",
        bystanderCount: 1,
        twistCount: 7,
        endGame: "7Twists",
        twistEffect: "darkPortal",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3,  
variableTwist: true,
twistText1: "A Dark Portal opens above the Mastermind. The Mastermind gains +1 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.",
twistText2: "A Dark Portal opens above the Bridge. Villains in this city space gain +1 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.",
twistText3: "A Dark Portal opens above the Streets. Villains in this city space gain +1 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.",
twistText4: "A Dark Portal opens above the Rooftops. Villains in this city space gain +1 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.",
twistText5: "A Dark Portal opens above the Bank. Villains in this city space gain +1 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.",
twistText6: "A Dark Portal opens above the Sewers. Villains in this city space gain +1 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.",
twistText7: "Evil Wins!",
twistText8: "Extra Twist. No effect.",
twistText9: "Extra Twist. No effect.",
twistText10: "Extra Twist. No effect.",
image: "Visual Assets/Schemes/darkdimension.webp"
    },
    {
        id: 4,
        name: "Replace Earth's Leaders with Killbots",
        bystanderCount: 0,
        twistCount: 5,
        endGame: "5Killbots",
        twistEffect: "killbotAttackIncrease",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3,  
variableTwist: false,
twistText: "Killbots gain +1 <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>.",
image: "Visual Assets/Schemes/killbots.webp"
    },
    {
        id: 5,
        name: "Secret Invasion of the Skrull Shapeshifters",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "6EscapedSkrullHeroes",
        twistEffect: "highestCostHeroSkrulled",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 6, 
variableTwist: false,
twistText: "The highest-cost Hero from the HQ moves into the Sewers as a Skrull Villain.",
specificVillainRequirement: "Skrulls", 
image: "Visual Assets/Schemes/secretinvasion.webp"
    },
    {
        id: 6,
        name: "Superhero Civil War",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "heroDeckEmpty",
        twistEffect: "KOAllHeroesInHQ",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 4, 
variableTwist: false, 
twistText: "KO all the Heroes in the HQ.",
image: "Visual Assets/Schemes/superherocivilwar.webp"
    },
    {
        id: 7,
        name: "The Legacy Virus",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "woundDeckEmpty",
        twistEffect: "revealTechOrWound",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3,  
variableTwist: false,
twistText: "Reveal a <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='console-card-icons'> Hero or gain a Wound.",
image: "Visual Assets/Schemes/legacyvirus.webp"
    },
    {
        id: 8,
        name: "Unleash the Power of the Cosmic Cube",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "8Twists",
        twistEffect: "cosmicCube",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3,  
variableTwist: true,
twistText1: "Nothing happens yet...",
twistText2: "Nothing happens yet...",
twistText3: "Nothing happens yet...",
twistText4: "Nothing happens yet...",
twistText5: "You gain a Wound.",
twistText6: "You gain a Wound.",
twistText7: "You gain three Wounds.",
twistText8: "Evil Wins!",
twistText9: "Extra Twist. No effect.",
twistText10: "Extra Twist. No effect.",
image: "Visual Assets/Schemes/cosmiccube.webp"
    },
    {
        id: 9,
        name: "Capture Baby Hope",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "babyThreeVillainEscape",
        twistEffect: "babyKidnap",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: false,
        twistText: " If a Villain has the baby, that Villain escapes. Otherwise, the baby is captured by the closest Villain to the Villain Deck. (If there are no Villains, do nothing.)",
        image: "Visual Assets/Schemes/DarkCity_captureBabyHope.webp"
    },
    {
        id: 10,
        name: "Detonate the Helicarrier",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "hqDetonated",
        twistEffect: "explosionKO",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 6,
        variableTwist: false,
        twistText: "Stack this Twist next to the Scheme. Then for each Twist in that stack, KO the leftmost Hero in the HQ and immediately refill that space.",
        image: "Visual Assets/Schemes/DarkCity_detonateTheHelicarrier.webp"
    },
    {
        id: 11,
        name: "Massive Earthquake Generator",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "KOHeroesEqualThree",
        twistEffect: "strengthOrKOTop",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: false,
        twistText: "Each player reveals a <img src='Visual Assets/Icons/Strength.svg' alt='Strength Icon' class='console-card-icons'> Hero or KOs the top card of their deck.",
        image: "Visual Assets/Schemes/DarkCity_massiveEarthquakeGenerator.webp"
    },
    {
        id: 12,
        name: "Organized Crime Wave",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "FiveGoonsEscape",
        twistEffect: "GoonsEscape",
        requiredVillains: 1,
        requiredHenchmen: 1,
        specificHenchmenRequirement: "Maggia Goons",
        requiredHeroes: 3,
        variableTwist: false,
        twistText: `Each <span class="console-highlights">Maggia Goons</span> in the city escapes. Shuffle all <span class="console-highlights">Maggia Goons</span> from each players' Victory Piles into the Villain Deck.`,
        image: "Visual Assets/Schemes/DarkCity_organizedCrimeWave.webp"
    },
    {
        id: 13,
        name: "Save Humanity",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "FourBystandersKOdOrEscaped",
        twistEffect: "KOAllHQBystanders",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: false,
        twistText: "KO all Bystanders in the HQ. Then each player reveals an <img src='Visual Assets/Icons/Instinct.svg' alt='Instinct Icon' class='console-card-icons'> Hero or KOs a Bystander from their Victory Pile.",
        image: "Visual Assets/Schemes/DarkCity_saveHumanity.webp"
    },
    {
        id: 14,
        name: "Steal the Weaponized Plutonium",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "FourPlutoniumEscape",
        twistEffect: "plutoniumCaptured",
        requiredVillains: 2,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: false,
        twistText: "This Plutonium is captured by the closest Villain to the Villain Deck. If there are no Villains in the city, KO this Plutonium. Either way, play another card from the Villain Deck.",
        image: "Visual Assets/Schemes/DarkCity_stealTheWeaponizedPlutonium.webp"
    },
    {
        id: 15,
        name: "Transform Citizens Into Demons",
        bystanderCount: 0,
        twistCount: 8,
        endGame: "FourGoblinQueenEscape",
        twistEffect: "BystanderstToDemonGoblins",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: false,
        twistText: `Stack 5 Bystanders face down next to the Scheme. Bystanders stacked here are "Demon Goblin" Villains. They have 2<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'>. Players can fight these Demon Goblins to rescue them as Bystanders.`,
        image: "Visual Assets/Schemes/DarkCity_transformCitizensIntoDemons.webp"
    },
    {
        id: 16,
        name: "X-Cutioner's Song",
        bystanderCount: 0,
        twistCount: 8,
        endGame: "NineHeroesKOdOrEscaped",
        twistEffect: "KOCapturedHeroes",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: false,
        twistText: "KO all Heroes captured by enemies. Then play another card from the Villain Deck.",
        image: "Visual Assets/Schemes/DarkCity_xcutionersSong.webp"
    },
    {
    id: 17,
        name: "Bathe Earth in Cosmic Rays",
        bystanderCount: 1,
        twistCount: 6,
        endGame: "sixNonGreyHeroesKOd",
        twistEffect: "batheEarthInCosmicRaysTwist",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3,  
variableTwist: false,
twistText: "Reveal your hand. KO one of your non-grey Heroes. Choose a Hero from the HQ with the same or lower cost and put it into your hand.",
image: "Visual Assets/Schemes/FantasticFour_batheEarthInCosmicRays.webp"
    },
    {
        id: 18,
        name: "Flood the Planet with Melted Glaciers",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "twentyNonGreyHeroesKOd",
        twistEffect: "risingWatersTwist",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: false,
        twistText: `Stack this Twist next to the Scheme as "Rising Waters." Then KO each Hero from the HQ whose cost is less than or equal to the number of Rising Waters in that stack.`,
        image: "Visual Assets/Schemes/FantasticFour_floodthePlanetWithMeltedGlaciers.webp"
    },
    {
        id: 19,
        name: "Invincible Force Field",
        bystanderCount: 1,
        twistCount: 7,
        endGame: "ForceField7Twists",
        twistEffect: "invincibleForceFieldTwist",
requiredVillains: 1,
requiredHenchmen: 1,
requiredHeroes: 3,  
variableTwist: false,
twistText: `Stack this Twist next to the Mastermind as a "Force Field."`,
image: "Visual Assets/Schemes/FantasticFour_invincibleForceField.webp"
    },
    {
        id: 20,
        name: "Pull Reality Into the Negative Zone",
        bystanderCount: 1,
        twistCount: 8,
        endGame: "NegativeZone7Twists",
        twistEffect: "pullRealityIntoTheNegativeZoneTwist",
        requiredVillains: 1,
        requiredHenchmen: 1,
        requiredHeroes: 3,
        variableTwist: true,
twistText1: "Nothing happens yet...",
twistText2: `Until the next Twist, Enemies cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to recruit.`,
twistText3: `Reality is temporarily stabilised! Enemies once again cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit.`,
twistText4: `Until the next Twist, Enemies cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to recruit.`,
twistText5: `Reality is temporarily stabilised! Enemies once again cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to recruit.`,
twistText6: `Until the next Twist, Enemies cost <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> to fight and Heroes cost <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> to recruit.`,
twistText7: "Evil Wins!",
twistText8: "Extra Twist. No effect.",
twistText9: "Extra Twist. No effect.",
twistText10: "Extra Twist. No effect.",
 image: "Visual Assets/Schemes/FantasticFour_pullRealityIntoTheNegativeZone.webp"
    }
];


const masterminds = [
    {
        id: 1,
        name: "Dr. Doom",
        attack: 9,
        bonusAttack: 3,
        fightCondition: "None",
        victoryPoints: 5,
masterStrike: "doomStrike",
masterStrikeConsoleLog: "Each player with exactly six cards in hand reveals a <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='console-card-icons'> Hero or puts two cards from their hand on top of their deck.", 
image: "Visual Assets/Masterminds/DrDoom_1.webp",
        tactics: [
            { id: 1, mastermindId: 1, fightEffect: "addToNextDraw3", victoryPoints: 5, name: "Treasures of Latveria", type: "Mastermind", effect: "When you draw a new hand of cards at the end of this turn, draw three extra cards.", image: "Visual Assets/Masterminds/DrDoom_2.webp" },
            { id: 2, mastermindId: 1, fightEffect: "doomHeroRecruit", victoryPoints: 5, name: "Dark Technology", type: "Mastermind", effect: "You may recruit a <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='card-icons'> Hero from the HQ for free.", image: "Visual Assets/Masterminds/DrDoom_3.webp" },
            { id: 3, mastermindId: 1, fightEffect: "doomAdditionalTurn", victoryPoints: 5, name: "Secrets of Time Travel", type: "Mastermind", effect: "Take another turn after this one.", image: "Visual Assets/Masterminds/DrDoom_4.webp"  },
            { id: 4, mastermindId: 1, fightEffect: "DoomDrawOrDiscard", victoryPoints: 5, name: "Monarch's Decree", type: "Mastermind", effect: "Choose one: each other player draws a card or each other player discards a card.", image: "Visual Assets/Masterminds/DrDoom_5.webp" }
        ]
    },
    {
        id: 2,
        name: "Loki",
        attack: 10,
        bonusAttack: 2,
        fightCondition: "None",
        victoryPoints: 5,
masterStrike: "LokiRevealStrengthOrWound",
masterStrikeConsoleLog: "Each player reveals a <img src='Visual Assets/Icons/Strength.svg' alt='Strength Icon' class='console-card-icons'> Hero or gains a Wound.", 
image: "Visual Assets/Masterminds/Loki_1.webp",
        tactics: [
            { id: 5, mastermindId: 2, fightEffect: "instantVillainDefeat", victoryPoints: 5, name: "Cruel Ruler", type: "Mastermind", effect: "Defeat a Villain in the City for free.", image: "Visual Assets/Masterminds/Loki_2.webp" },
            { id: 6, mastermindId: 2, fightEffect: "KO1To4FromDiscard", victoryPoints: 5, name: "Maniacal Tyrant", type: "Mastermind", effect: "KO up to four cards from your discard pile.", image: "Visual Assets/Masterminds/Loki_3.webp" },
            { id: 7, mastermindId: 2, fightEffect: "chooseVillainKOFromVP", victoryPoints: 5, name: "Vanishing Illusions", type: "Mastermind", effect: "Each other player KOs a Villain from their Victory Pile.", image: "Visual Assets/Masterminds/Loki_4.webp" },
            { id: 8, mastermindId: 2, fightEffect: "chooseBystanderKOFromVP", victoryPoints: 5, name: "Whispers and Lies", type: "Mastermind", effect: "Each other player KOs two Bystanders from their Victory Pile.", image: "Visual Assets/Masterminds/Loki_5.webp" }
        ]
    },
    {
        id: 3,
        name: "Red Skull",
        attack: 7,
        bonusAttack: 1,
        fightCondition: "None",
        victoryPoints: 5,
masterStrike: "RedSkullKOHandHero",
masterStrikeConsoleLog: "Each player KOs a Hero from their hand.", 
image: "Visual Assets/Masterminds/RedSkull_1.webp",
        tactics: [
            { id: 9, mastermindId: 3, fightEffect: "revealTop3AndChooseActions", victoryPoints: 5, name: "Ruthless Dictator", type: "Mastermind", effect: "Look at the top three cards of your deck. KO one, discard one and put one back on top of your deck.", image: "Visual Assets/Masterminds/RedSkull_2.webp" },
            { id: 10, mastermindId: 3, fightEffect: "add4Recruit", victoryPoints: 5, name: "Endless Resources", type: "Mastermind", effect: "You gain +4<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'>.", image: "Visual Assets/Masterminds/RedSkull_3.webp" },
            { id: 11, mastermindId: 3, fightEffect: "add3Attack", victoryPoints: 5, name: "Negablast Grenades", type: "Mastermind", effect: "You gain +3<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'>.", image: "Visual Assets/Masterminds/RedSkull_4.webp" },
            { id: 12, mastermindId: 3, fightEffect: "redSkullDrawing", victoryPoints: 5, name: "HYDRA Conspiracy", type: "Mastermind", effect: "Draw two cards. Then draw another card for each HYDRA Villain in your Victory Pile.", image: "Visual Assets/Masterminds/RedSkull_5.webp" }
        ]
    },
    {
        id: 4,
        name: "Magneto",
        attack: 8,
        bonusAttack: 2,
        fightCondition: "None",
        victoryPoints: 5,
masterStrike: "magnetoStrike",
masterStrikeConsoleLog: "Each player reveals an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='console-card-icons'> Hero or discards down to four cards.", 
image: "Visual Assets/Masterminds/Magneto_1.webp",

        tactics: [
            { id: 13, mastermindId: 4, fightEffect: "recruitXMen", victoryPoints: 5, name: "Bitter Captor", type: "Mastermind", effect: "Recruit an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Hero from the HQ for free.", image: "Visual Assets/Masterminds/Magneto_2.webp" },
            { id: 14, mastermindId: 4, fightEffect: "MagnetoRevealXMenOrWound", victoryPoints: 5, name: "Crushing Shockwave", type: "Mastermind", effect: "Each other player reveals an <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Hero or gains two Wounds.", image: "Visual Assets/Masterminds/Magneto_3.webp" },
            { id: 15, mastermindId: 4, fightEffect: "XMen7thDraw", victoryPoints: 5, name: "Electromagnetic Bubble", type: "Mastermind", effect: "Choose one of your <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Heroes. When you draw a new hand of cards at the end of this turn, add that Hero to your hand as a seventh card.", image: "Visual Assets/Masterminds/Magneto_4.webp" },
            { id: 16, mastermindId: 4, fightEffect: "XMenToBystanders", victoryPoints: 5, name: "Xavier's Nemesis", type: "Mastermind", effect: "For each of your <img src='Visual Assets/Icons/X-Men.svg' alt='X-Men Icon' class='card-icons'> Heroes, rescue a Bystander.", image: "Visual Assets/Masterminds/Magneto_5.webp" }
        ]
    },
    {
        id: 5,
        name: "Apocalypse",
        attack: 12,
        bonusAttack: 0,
        fightCondition: "None",
        victoryPoints: 6,
masterStrike: "apocalypseStrike",
masterStrikeConsoleLog: "Each player reveals their hand and puts all their Heroes that cost 1 <img src='Visual Assets/Icons/Cost.svg' alt='Cost Icon' class='console-card-icons'> or more on top of their deck.",
endGame: "fourHorsemen", 
image: "Visual Assets/Masterminds/DarkCity_Apocalypse.webp",

        tactics: [
            { id: 13, mastermindId: 5, fightEffect: "apocalypseApocalypticDestruction", victoryPoints: 6, name: "Apocalyptic Destruction", type: "Mastermind", effect: "Each other player KOs two Heroes from their discard pile that each cost 1 <img src='Visual Assets/Icons/Cost.svg' alt='Cost Icon' class='card-icons'> or more.", image: "Visual Assets/Masterminds/DarkCity_Apocalypse_ApocalypticDestruction.webp" },
            { id: 14, mastermindId: 5, fightEffect: "apocalypseHorsemenAreDrawingNearer", victoryPoints: 6, name: "Horsemen Are Drawing Nearer", type: "Mastermind", effect: `Each other player plays a <span class="bold-spans">Four Horsemen</span> Villain from their Victory Pile as if playing it from the Villain Deck.`, image: "Visual Assets/Masterminds/DarkCity_Apocalypse_HorsemenAreDrawingNearer.webp" },
            { id: 15, mastermindId: 5, fightEffect: "apocalypseImmortalAndUndefeated", victoryPoints: 6, name: "Immortal and Undefeated", type: "Mastermind", effect: "If this is not the final Tactic, rescue six Bystanders and shuffle this Tactic back into the other Tactics.", image: "Visual Assets/Masterminds/DarkCity_Apocalypse_ImmortalAndUndefeated.webp" },
            { id: 16, mastermindId: 5, fightEffect: "apocalypseTheEndOfAllThings", victoryPoints: 6, name: "The End Of All Things", type: "Mastermind", effect: "Each other player reveals the top three cards of their deck, KOs each one of those cards that cost 1 <img src='Visual Assets/Icons/Cost.svg' alt='Cost Icon' class='card-icons'> or more, and puts the rest back in any order.", image: "Visual Assets/Masterminds/DarkCity_Apocalypse_TheEndOfAllThings.webp" }
        ]
    },
    {
        id: 6,
        name: "Kingpin",
        attack: 13,
        bonusAttack: 0,
        fightCondition: "None",
        victoryPoints: 6,
masterStrike: "kingpinStrike",
masterStrikeConsoleLog: "Each player reveals a <img src='Visual Assets/Icons/Marvel Knights.svg' alt='Marvel Knights Icon' class='console-card-icons'> Hero or discards their hand and draws 5 cards.", 
keyword1: "Bribe", 
image: "Visual Assets/Masterminds/DarkCity_Kingpin.webp",

        tactics: [
            { id: 17, mastermindId: 6, fightEffect: "kingpinCallAHit", victoryPoints: 6, name: "Call A Hit", type: "Mastermind", effect: "Choose a Hero from each player's discard pile and KO it.", image: "Visual Assets/Masterminds/DarkCity_Kingpin_CallAHit.webp" },
            { id: 18, mastermindId: 6, fightEffect: "kingpinCriminalEmpire", victoryPoints: 6, name: "Criminal Empire", type: "Mastermind", effect: "If this is not the final Tactic, reveal the top three cards of the Villain Deck. Play all the Villains you revealed. Put the rest back in random order.", image: "Visual Assets/Masterminds/DarkCity_Kingpin_CriminalEmpire.webp" },
            { id: 19, mastermindId: 6, fightEffect: "kingpinDirtyCops", victoryPoints: 6, name: "Dirty Cops", type: "Mastermind", effect: "Put a 0 <img src='Visual Assets/Icons/Cost.svg' alt='Cost Icon' class='card-icons'> Hero from the KO pile on top of each other player's deck.", image: "Visual Assets/Masterminds/DarkCity_Kingpin_DirtyCops.webp" },
            { id: 20, mastermindId: 6, fightEffect: "kingpinMobWar", victoryPoints: 6, name: "Mob War", type: "Mastermind", effect: "Each other player plays a Henchman Villain from their Victory Pile as if playing it from the Villain Deck.", image: "Visual Assets/Masterminds/DarkCity_Kingpin_MobWar.webp" }
        ]
    },
    {
        id: 7,
        name: "Mephisto",
        attack: 10,
        bonusAttack: 0,
        fightCondition: "None",
        victoryPoints: 6,
masterStrike: "mephistoStrike",
masterStrikeConsoleLog: "Each player reveals a <img src='Visual Assets/Icons/Marvel Knights.svg' alt='Marvel Knights Icon' class='console-card-icons'> Hero or gains a Wound.",
image: "Visual Assets/Masterminds/DarkCity_Mephisto.webp",

        tactics: [
            { id: 21, mastermindId: 7, fightEffect: "mephistoDamnedIfYouDo", victoryPoints: 6, name: "Damned If You Do...", type: "Mastermind", effect: "Each other player KOs a Bystander from their Victory Pile or gains a Wound.", image: "Visual Assets/Masterminds/DarkCity_Mephisto_DamnedIfYouDo.webp" },
            { id: 22, mastermindId: 7, fightEffect: "mephistoDevilishTorment", victoryPoints: 6, name: "Devilish Torment", type: "Mastermind", effect: "Each other player puts all 0 <img src='Visual Assets/Icons/Cost.svg' alt='Cost Icon' class='card-icons'> cards from their discard pile on top of their deck in any order.", image: "Visual Assets/Masterminds/DarkCity_Mephisto_DevilishTorment.webp" },
            { id: 23, mastermindId: 7, fightEffect: "mephistoPainBegetsPain", victoryPoints: 6, name: "Pain Begets Pain", type: "Mastermind", effect: "Choose any number of Wounds from your hand and discard pile. The player to your right gains them.", image: "Visual Assets/Masterminds/DarkCity_Mephisto_PainBegetsPain.webp" },
            { id: 24, mastermindId: 7, fightEffect: "mephistoThePriceOfFailure", victoryPoints: 6, name: "The Price of Failure", type: "Mastermind", effect: "Each other player without a Mastermind Tactic in their Victory Pile gains a Wound.", image: "Visual Assets/Masterminds/DarkCity_Mephisto_ThePriceOfFailure.webp" }
        ]
    },
    {
        id: 8,
        name: "Mr. Sinister",
        attack: 8,
        bonusAttack: 0,
        fightCondition: "None",
        victoryPoints: 6,
masterStrike: "mrSinisterStrike",
masterStrikeConsoleLog: `<span class="console-highlights">Mr. Sinister</span> captures a Bystander. Then each player with exactly 6 cards reveals a <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='console-card-icons'> Hero or discards cards equal to the number of Bystanders <span class="console-highlights">Mr. Sinister</span> has.`,
image: "Visual Assets/Masterminds/DarkCity_MrSinister.webp",

        tactics: [
            { id: 25, mastermindId: 8, fightEffect: "mrSinisterHumanExperimentation", victoryPoints: 6, name: "Human Experimentation", type: "Mastermind", effect: `<span class="console-highlights">Mr. Sinister</span> captures Bystanders equal to the number of Villains in the city.`, image: "Visual Assets/Masterminds/DarkCity_MrSinister_HumanExperimentation.webp" },
            { id: 26, mastermindId: 8, fightEffect: "mrSinisterMasterGeneticist", victoryPoints: 6, name: "Master Geneticist", type: "Mastermind", effect: `Reveal the top seven cards of the Villain Deck. <span class="console-highlights">Mr. Sinister</span> captures all of the Bystanders you revealed. Put the rest back in random order.`, image: "Visual Assets/Masterminds/DarkCity_MrSinister_MasterGeneticist.webp" },
            { id: 27, mastermindId: 8, fightEffect: "mrSinisterPlansWithinPlans", victoryPoints: 6, name: "Plans Within Plans", type: "Mastermind", effect: `<span class="console-highlights">Mr. Sinister</span> captures a Bystander for each <span class="console-highlights">Mr. Sinister</span> Tactic in players' Victory Piles, including this Tactic.`, image: "Visual Assets/Masterminds/DarkCity_MrSinister_PlansWithinPlans.webp" },
            { id: 28, mastermindId: 8, fightEffect: "mrSinisterTelepathicManipulation", victoryPoints: 6, name: "Telepathic Manipulation", type: "Mastermind", effect: `<span class="console-highlights">Mr. Sinister</span> captures a Bystander from each other player's Victory Pile.`, image: "Visual Assets/Masterminds/DarkCity_MrSinister_TelepathicManipulation.webp" }
        ]
    },
    {
        id: 9,
        name: "Stryfe",
        attack: 7,
        bonusAttack: 0,
        fightCondition: "None",
        victoryPoints: 6,
masterStrike: "stryfeStrike",
masterStrikeConsoleLog: `Stack this Master Strike next to <span class="console-highlights">Stryfe</span>. <span class="console-highlights">Stryfe</span> gets +1<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'> for each Master Strike stacked next to him. Each player reveals a <img src='Visual Assets/Icons/X-Force.svg' alt='X-Force Icon' class='console-card-icons'> Hero or discards a card at random.`,
image: "Visual Assets/Masterminds/DarkCity_Stryfe.webp",

        tactics: [
            { id: 29, mastermindId: 9, fightEffect: "stryfeFuriousWrath", victoryPoints: 6, name: "Furious Wrath", type: "Mastermind", effect: "Reveal the top six cards of the Villain Deck. Play all the Master Strikes you revealed. Put the rest back in random order.", image: "Visual Assets/Masterminds/DarkCity_Stryfe_FuriousWrath.webp" },
            { id: 30, mastermindId: 9, fightEffect: "stryfePsychicTorment", victoryPoints: 6, name: "Psychic Torment", type: "Mastermind", effect: "Look at the top five cards of your deck. Put one into your hand and discard the rest.", image: "Visual Assets/Masterminds/DarkCity_Stryfe_PsychicTorment.webp" },
            { id: 31, mastermindId: 9, fightEffect: "stryfeSwiftVengeance", victoryPoints: 6, name: "Swift Vengeance", type: "Mastermind", effect: "A Wound from the Wound Stack becomes a Master Strike that takes effect immediately.", image: "Visual Assets/Masterminds/DarkCity_Stryfe_SwiftVengeance.webp" },
            { id: 32, mastermindId: 9, fightEffect: "stryfeTideOfRetribution", victoryPoints: 6, name: "Tide of Retribution", type: "Mastermind", effect: "Each other player reveals an <img src='Visual Assets/Icons/X-Force.svg' alt='X-Force Icon' class='card-icons'> Hero or gains a Wound.", image: "Visual Assets/Masterminds/DarkCity_Stryfe_TideOfRetribution.webp" }
        ]
    },
    {
        id: 10,
        name: "Galactus",
        attack: 20,
        bonusAttack: 0,
        fightCondition: "None",
        victoryPoints: 7,
        endGame: "cityDestroyed",
masterStrike: "galactusMasterStrike",
masterStrikeConsoleLog: `Destroy the city space closest to Galactus. Any Villain there escapes. Put this Master Strike there.`,
keyword1: "Cosmic Threat",
image: "Visual Assets/Masterminds/FantasticFour_Galactus.webp",

        tactics: [
            { id: 29, mastermindId: 10, fightEffect: "galactusCosmicEntity", victoryPoints: 7, name: "Cosmic Entity", type: "Mastermind", effect: `Choose <img src='Visual Assets/Icons/Strength.svg' alt='Strength Icon' class='card-icons'>, <img src='Visual Assets/Icons/Instinct.svg' alt='Instinct Icon' class='card-icons'>, <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='card-icons'>, <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='card-icons'>. Each player reveals any number of cards of that class, then draws that many cards.`, image: "Visual Assets/Masterminds/FantasticFour_Galactus_CosmicEntity.webp" },
            { id: 30, mastermindId: 10, fightEffect: "galactusForceOfEternity", victoryPoints: 7, name: "Force of Eternity", type: "Mastermind", effect: "When you draw a new hand of cards at the end of this turn, draw six extra cards, then discard six cards.", image: "Visual Assets/Masterminds/FantasticFour_Galactus_ForceOfEternity.webp" },
            { id: 31, mastermindId: 10, fightEffect: "galactusPanickedMobs", victoryPoints: 7, name: "Panicked Mobs", type: "Mastermind", effect: `Choose <img src='Visual Assets/Icons/Strength.svg' alt='Strength Icon' class='card-icons'>, <img src='Visual Assets/Icons/Instinct.svg' alt='Instinct Icon' class='card-icons'>, <img src='Visual Assets/Icons/Covert.svg' alt='Covert Icon' class='card-icons'>, <img src='Visual Assets/Icons/Tech.svg' alt='Tech Icon' class='card-icons'> or <img src='Visual Assets/Icons/Range.svg' alt='Range Icon' class='card-icons'>. Each player reveals any number of cards of that class, then rescues that many Bystanders.`, image: "Visual Assets/Masterminds/FantasticFour_Galactus_PanickedMobs.webp" },
            { id: 32, mastermindId: 10, fightEffect: "galactusSunderTheEarth", victoryPoints: 7, name: "Sunder the Earth", type: "Mastermind", effect: "Each other player KOs all Heroes from their discard pile with the same card name as a Hero in the HQ.", image: "Visual Assets/Masterminds/FantasticFour_Galactus_SunderTheEarth.webp" }
        ]
    },
{
        id: 11,
        name: "Mole Man",
        attack: 7,
        bonusAttack: 0,
        fightCondition: "None",
        victoryPoints: 6,
masterStrike: "moleManMasterStrike",
masterStrikeConsoleLog: `All Subterranea Villains in the city escape. If any Villains escaped this way, each player gains a Wound.`,
image: "Visual Assets/Masterminds/FantasticFour_MoleMan.webp",

        tactics: [
            { id: 29, mastermindId: 11, fightEffect: "moleManDigToFreedom", victoryPoints: 6, name: "Dig to Freedom", type: "Mastermind", effect: "Each other player chooses a Subterranea Villain in their Victory Pile and puts it into the Escaped Villains pile.", image: "Visual Assets/Masterminds/FantasticFour_MoleMan_DigToFreedom.webp" },
            { id: 30, mastermindId: 11, fightEffect: "moleManMasterOfMonsters", victoryPoints: 6, name: "Master of Monsters", type: "Mastermind", effect: "If this is not the final Tactic, reveal the top six cards of the Villain Deck. Play all the Subterranea Villains you revealed. Put the rest on the bottom of the Villain Deck in random order.", image: "Visual Assets/Masterminds/FantasticFour_MoleMan_MasterOfMonsters.webp" },
            { id: 31, mastermindId: 11, fightEffect: "moleManSecretTunnel", victoryPoints: 6, name: "Secret Tunnel", type: "Mastermind", effect: "You get +6<img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='card-icons'> usable only against Villains in the Streets.", image: "Visual Assets/Masterminds/FantasticFour_MoleMan_SecretTunnel.webp" },
            { id: 32, mastermindId: 11, fightEffect: "moleManUndergroundRiches", victoryPoints: 6, name: "Underground Riches", type: "Mastermind", effect: "You get +6<img src='Visual Assets/Icons/Recruit.svg' alt='Recruit Icon' class='card-icons'> usable only to recruit Heroes in the HQ space under the Streets.", image: "Visual Assets/Masterminds/FantasticFour_MoleMan_UndergroundRiches.webp" }
        ]
    }

];

const henchmen = [
    {
        id: 1,
        name: "Doombot Legion",
team: "Doombot Legion",
type: "Villain",
henchmen: true,
        attack: 3,
originalAttack: 3,
        victoryPoints: 1,
fightEffect: "topTwoCardsKOChoice", 
image: "Visual Assets/Henchmen/doombot.webp"    
},
    {
        id: 2,
        name: "Hand Ninjas",
team: "Hand Ninjas",
type: "Villain",
henchmen: true,
        attack: 3,
originalAttack: 3,
        victoryPoints: 1,
fightEffect: "add1Recruit", 
image: "Visual Assets/Henchmen/handninjas.webp"
    },
    {
        id: 3,
        name: "Savage Land Mutates",
team: "Savage Land Mutates",
type: "Villain",
henchmen: true,
        attack: 3,
originalAttack: 3,
        victoryPoints: 1,
fightEffect: "addToNextDraw1", 
image: "Visual Assets/Henchmen/savagelandmutates.webp"
    },
    {
        id: 4,
        name: "Sentinel",
team: "Sentinel",
type: "Villain",
henchmen: true,
        attack: 3,
originalAttack: 3,
        victoryPoints: 1,
fightEffect: "HenchmenKOHeroYouHave", 
image: "Visual Assets/Henchmen/sentinel.webp"  
  },
    {
        id: 5,
        name: "Maggia Goons",
team: "Maggia Goons",
type: "Villain",
henchmen: true,
        attack: 4,
originalAttack: 4,
        victoryPoints: 1,
fightEffect: "HenchmenKOHeroYouHave", 
keyword1: "Bribe",
image: "Visual Assets/Henchmen/DarkCity_maggiaGoons.webp"  
  },
    {
        id: 6,
        name: "Phalanx",
team: "Phalanx",
type: "Villain",
henchmen: true,
        attack: 3,
originalAttack: 3,
        victoryPoints: 1,
fightEffect: "PhalanxTechOrKOAttack", 
image: "Visual Assets/Henchmen/DarkCity_phalanx.webp"  
  }
];

const villains = [
    {
        id: 1,
        name: "Brotherhood",
        cards: [
            { id: 1, villainId: 1, team: "Brotherhood", name: "Blob", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "None", fightEffect: "None", escapeEffect: "None", fightCondition: "heroYouHave", conditionType: "team", condition: "X-Men", alwaysLeads: "false", image: "Visual Assets/Villains/Brotherhood_Blob.webp" },
            { id: 2, villainId: 1, team: "Brotherhood", name: "Juggernaut", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "chooseHeroesToKOFromDiscardPile", fightEffect: "None", escapeEffect: "EscapeChooseHandHeroesToKO", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Brotherhood_Juggernaut.webp" },
            { id: 3, villainId: 1, team: "Brotherhood", name: "Mystique", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "None", escapeEffect: "handleMystiqueEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Brotherhood_Mystique.webp" },
            { id: 4, villainId: 1, team: "Brotherhood", name: "Sabretooth", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "FightRevealXMenOrWound", escapeEffect: "EscapeRevealXMenOrWound", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Brotherhood_Sabretooth.webp" }
        ]
    },
    {
        id: 2,
        name: "Enemies of Asgard",
        cards: [
            { id: 5, villainId: 2, team: "Enemies of Asgard", name: "Frost Giant", type: "Villain", quantity: 3, attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "None", fightEffect: "FightRevealRangeOrWound", escapeEffect: "EscapeRevealRangeOrWound", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/EnemiesOfAsgard_FrostGiant.webp" },
            { id: 6, villainId: 2, team: "Enemies of Asgard", name: "Destroyer", type: "Villain", quantity: 1, attack: 7, originalAttack: 7, victoryPoints: 5, ambushEffect: "None", fightEffect: "KOAllSHIELD", escapeEffect: "EscapeChooseHeroesToKO", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/EnemiesOfAsgard_Destroyer.webp" },
            { id: 7, villainId: 2, team: "Enemies of Asgard", name: "Enchantress", type: "Villain", quantity: 2, attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "None", fightEffect: "FightDrawThree", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/EnemiesOfAsgard_Enchantress.webp" },
            { id: 8, villainId: 2, team: "Enemies of Asgard", name: "Ymir, Frost Giant King", type: "Villain", quantity: 2, attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "AmbushRevealRangeOrWound", fightEffect: "koAnyNumberOfWounds", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/EnemiesOfAsgard_Ymir.webp" }
        ]
    },
    {
        id: 3,
        name: "HYDRA",
        cards: [
            { id: 9, villainGroupName: "HYDRA", villainId: 3, team: "HYDRA", name: "Viper", type: "Villain", quantity: 1, attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "FightHYDRAVPOrWound", escapeEffect: "EscapeHYDRAVPOrWound", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/HYDRA_Viper.webp" },
            { id: 10, villainGroupName: "HYDRA", villainId: 3, team: "HYDRA", name: "Supreme HYDRA", type: "Villain", quantity: 1, attack: 6, originalAttack: 6, victoryPoints: 3, ambushEffect: "None", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/HYDRA_SupremeHYDRA.webp" },
            { id: 11, villainGroupName: "HYDRA", villainId: 3, team: "HYDRA", name: "Endless Armies of HYDRA", type: "Villain", quantity: 3, attack: 4, originalAttack: 4, victoryPoints: 3, ambushEffect: "None", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/HYDRA_EndlessArmies.webp" },
            { id: 12, villainGroupName: "HYDRA", villainId: 3, team: "HYDRA", name: "HYDRA Kidnappers", type: "Villain", quantity: 3, attack: 3, originalAttack: 3, victoryPoints: 1, ambushEffect: "None", fightEffect: "chooseToGainSHIELDOfficer", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/HYDRA_HYDRAKidnappers.webp" }
        ]
    },
    {
        id: 4,
        name: "Masters of Evil",
        cards: [
            { id: 13, villainId: 4, team: "Masters of Evil", name: "Ultron", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 2, ambushEffect: "None", fightEffect: "None", escapeEffect: "EscapeRevealTechOrWound", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/MastersOfEvil_Ultron.webp" },
            { id: 14, villainId: 4, team: "Masters of Evil", name: "Whirlwind", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "None", fightEffect: "rooftopsOrBridgeKOs", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/MastersOfEvil_Whirlwind.webp" },
            { id: 15, villainId: 4, team: "Masters of Evil", name: "Baron Zemo", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "None", fightEffect: "AvengersToBystanders", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/MastersOfEvil_BaronZemo.webp" },
            { id: 16, villainId: 4, team: "Masters of Evil", name: "Melter", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "topCardKOOrPutBack", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/MastersOfEvil_Melter.webp" }
        ]
    },
    {
        id: 5,
        name: "Radiation",
        cards: [
            { id: 17, villainId: 5, team: "Radiation", name: "Abomination", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "streetsOrBridgeBystanders", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Radiation_Abomination.webp" },
            { id: 18, villainId: 5, team: "Radiation", name: "The Leader", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "extraVillainDraw", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Radiation_TheLeader.webp" },
            { id: 19, villainId: 5, team: "Radiation", name: "Maestro", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "None", fightEffect: "strengthHeroesNumberToKO", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Radiation_Maestro.webp" },
            { id: 20, villainId: 5, team: "Radiation", name: "Zzzax", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "FightRevealStrengthOrWound", escapeEffect: "EscapeRevealStrengthOrWound", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Radiation_Zzzax.webp" }
        ]
    },
    {
        id: 6,
        name: "Skrulls",
        cards: [
            { id: 21, villainId: 6, team: "Skrulls", name: "Super-Skrull", type: "Villain", quantity: 3, attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "None", fightEffect: "FightKOHeroYouHave", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Skrulls_SuperSkrull.webp" },
            { id: 22, villainId: 6, team: "Skrulls", name: "Skrull Shapeshifters", type: "Villain", quantity: 3, attack: 0, originalAttack: 0, victoryPoints: 2, ambushEffect: "AmbushRightHeroSkrull", fightEffect: "fightSkrullShapeshifters", escapeEffect: "escapeSkrullShapeshifter", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Skrulls_SkrullShapeshifters.webp" },
            { id: 23, villainId: 6, team: "Skrulls", name: "Skrull Queen Veranke", type: "Villain", quantity: 1, attack: 0, originalAttack: 0, victoryPoints: 4, ambushEffect: "highestCostHeroSkrullQueen", fightEffect: "fightSkrullQueen", escapeEffect: "escapeSkrullQueen", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Skrulls_SkrullQueen.webp" },
            { id: 24, villainId: 6, team: "Skrulls", name: "Paibok the Power Skrull", type: "Villain", quantity: 1, attack: 8, originalAttack: 8, victoryPoints: 3, ambushEffect: "None", fightEffect: "freeHeroGain", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/Skrulls_Paibok.webp" }
        ]
    },
    {
        id: 7,
        name: "Spider-Foes",
        cards: [
            { id: 25, villainId: 7, team: "Spider-Foes", name: "Venom", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "None", escapeEffect: "EscapeDrawWound", fightCondition: "heroYouHave", conditionType: "class1", condition: "Covert", alwaysLeads: "false", image: "Visual Assets/Villains/SpiderFoes_Venom.webp" },
            { id: 26, villainId: 7, team: "Spider-Foes", name: "Green Goblin", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "ambushBystander", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/SpiderFoes_GreenGoblin.webp" },
            { id: 27, villainId: 7, team: "Spider-Foes", name: "The Lizard", type: "Villain", attack: 3, originalAttack: 3, victoryPoints: 2, ambushEffect: "None", fightEffect: "sewersWound", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/SpiderFoes_TheLizard.webp" },
            { id: 28, villainId: 7, team: "Spider-Foes", name: "Doctor Octopus", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "None", fightEffect: "DrOctopusNextDraw2", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/SpiderFoes_DrOctopus.webp" }
        ]
    },
    {
        id: 8,
        name: "Emissaries of Evil",
        cards: [
            { id: 29, villainId: 8, team: "Emissaries of Evil", name: "Rhino", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "rhinoAmbush", fightEffect: "None", escapeEffect: "rhinoEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_EmissariesOfEvil_Rhino.webp" },
            { id: 30, villainId: 8, team: "Emissaries of Evil", name: "Electro", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "electroAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_EmissariesOfEvil_Electro.webp" },
            { id: 31, villainId: 8, team: "Emissaries of Evil", name: "Egghead", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "eggheadAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_EmissariesOfEvil_Egghead.webp" },
            { id: 32, villainId: 8, team: "Emissaries of Evil", name: "Gladiator", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "gladiatorAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_EmissariesOfEvil_Gladiator.webp" }
        ]
    },
    {
        id: 9,
        name: "Four Horsemen",
        cards: [
            { id: 33, villainId: 9, team: "Four Horsemen", name: "War", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "None", fightEffect: "warFight", escapeEffect: "warEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_FourHorsemen_War.webp" },
            { id: 34, villainId: 9, team: "Four Horsemen", name: "Famine", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "None", fightEffect: "famineFight", escapeEffect: "famineEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_FourHorsemen_Famine.webp" },
            { id: 35, villainId: 9, team: "Four Horsemen", name: "Pestilence", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "pestilenceFight", escapeEffect: "pestilenceEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_FourHorsemen_Pestilence.webp" },
            { id: 36, villainId: 9, team: "Four Horsemen", name: "Death", type: "Villain", attack: 7, originalAttack: 7, victoryPoints: 5, ambushEffect: "None", fightEffect: "deathFight", escapeEffect: "deathEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_FourHorsemen_Death.webp" }
        ]
    },
    {
        id: 10,
        name: "Marauders",
        cards: [
            { id: 37, villainId: 10, team: "Marauders", name: "Scalphunter", type: "Villain", attack: 4, originalAttack: 4, bonusBystanderAttack: 1, victoryPoints: 2, ambushEffect: "scalphunterAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_Marauders_Scalphunter.webp" },
            { id: 38, villainId: 10, team: "Marauders", name: "Chimera", type: "Villain", attack: 3, originalAttack: 3, bonusBystanderAttack: 3, victoryPoints: 3, ambushEffect: "chimeraAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_Marauders_Chimera.webp" },
            { id: 39, villainId: 10, team: "Marauders", name: "Blockbuster", type: "Villain", attack: 4, originalAttack: 4, bonusBystanderAttack: 2, victoryPoints: 2, ambushEffect: "blockbusterAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_Marauders_Blockbuster.webp" },
            { id: 40, villainId: 10, team: "Marauders", name: "Vertigo", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "vertigoFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", errata: "Vertigo - Errata", image: "Visual Assets/Villains/DarkCity_Marauders_Vertigo.webp" }
        ]
    },
    {
        id: 11,
        name: "Mutant Liberation Front",
        cards: [
            { id: 41, villainId: 11, team: "Mutant Liberation Front", name: "Zero", type: "Villain", attack: 0, originalAttack: 0, victoryPoints: 2, ambushEffect: "None", fightEffect: "zeroFight", escapeEffect: "None", fightCondition: "zeroCostCards", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_MLF_Zero.webp" },
            { id: 42, villainId: 11, team: "Mutant Liberation Front", name: "Wildside", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "wildsideFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_MLF_Wildside.webp" },
            { id: 43, villainId: 11, team: "Mutant Liberation Front", name: "Forearm", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 4, ambushEffect: "None", fightEffect: "None", escapeEffect: "None", fightCondition: "fourDifferentNames", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_MLF_Forearm.webp" },
            { id: 44, villainId: 11, team: "Mutant Liberation Front", name: "Reignfire", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "None", fightEffect: "None", escapeEffect: "reignfireEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_MLF_Reignfire.webp" }
        ]
    },
    {
        id: 12,
        name: "Streets of New York",
        cards: [
            { id: 45, villainId: 12, team: "Streets of New York", name: "Bullseye", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "None", fightEffect: "bullseyeFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_StreetsOfNewYork_Bullseye.webp" },
            { id: 46, villainId: 12, team: "Streets of New York", name: "Jigsaw", type: "Villain", attack: 11, originalAttack: 11, victoryPoints: 5, ambushEffect: "jigsawAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Bribe", image: "Visual Assets/Villains/DarkCity_StreetsOfNewYork_Jigsaw.webp" },
            { id: 47, villainId: 12, team: "Streets of New York", name: "Hammerhead", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 2, ambushEffect: "None", fightEffect: "hammerheadFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Bribe", image: "Visual Assets/Villains/DarkCity_StreetsOfNewYork_Hammerhead.webp" },
            { id: 48, villainId: 12, team: "Streets of New York", name: "Tombstone", type: "Villain", attack: 8, originalAttack: 8, victoryPoints: 4, ambushEffect: "None", fightEffect: "None", escapeEffect: "tombstoneEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Bribe", image: "Visual Assets/Villains/DarkCity_StreetsOfNewYork_Tombstone.webp" }
        ]
    },
    {
        id: 13,
        name: "Underworld",
        cards: [
            { id: 49, villainId: 13, team: "Underworld", name: "Blackheart", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "blackheartAmbush", fightEffect: "blackheartFight", escapeEffect: "blackheartEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_Underworld_Blackheart.webp" },
            { id: 50, villainId: 13, team: "Underworld", name: "Dracula", type: "Villain", attack: 3, originalAttack: 3, victoryPoints: 4, ambushEffect: "draculaAmbush", fightEffect: "draculaFight", escapeEffect: "draculaEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_Underworld_Dracula.webp" },
            { id: 51, villainId: 13, team: "Underworld", name: "Azazel", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "None", fightEffect: "azazelFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_Underworld_Azazel.webp" },
            { id: 52, villainId: 13, team: "Underworld", name: "Lilith, Daughter of Dracula", type: "Villain", attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "None", fightEffect: "None", escapeEffect: "lilithEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", image: "Visual Assets/Villains/DarkCity_Underworld_LilithDaughterOfDracula.webp" }
        ]
    },
    {
        id: 14,
        name: "Heralds of Galactus",
        cards: [
            { id: 53, villainId: 14, team: "Heralds of Galactus", name: "Firelord", type: "Villain", attack: 9, originalAttack: 9, victoryPoints: 4, ambushEffect: "None", fightEffect: "firelordFight", escapeEffect: "firelordEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Cosmic Threat", image: "Visual Assets/Villains/FantasticFour_HeraldsOfGalactus_Firelord.webp" },
            { id: 54, villainId: 14, team: "Heralds of Galactus", name: "Morg", type: "Villain", attack: 12, originalAttack: 12, victoryPoints: 6, ambushEffect: "morgAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Cosmic Threat", image: "Visual Assets/Villains/FantasticFour_HeraldsOfGalactus_Morg.webp" },
            { id: 55, villainId: 14, team: "Heralds of Galactus", name: "Stardust", type: "Villain", attack: 10, originalAttack: 10, victoryPoints: 5, ambushEffect: "None", fightEffect: "stardustFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Cosmic Threat", image: "Visual Assets/Villains/FantasticFour_HeraldsOfGalactus_Stardust.webp" },
            { id: 56, villainId: 14, team: "Heralds of Galactus", name: "Terrax the Tamer", type: "Villain", attack: 11, originalAttack: 11, victoryPoints: 5, ambushEffect: "terraxTheTamerAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Cosmic Threat", image: "Visual Assets/Villains/FantasticFour_HeraldsOfGalactus_TerraxTheTamer.webp" }
        ]
    },
{
        id: 15,
        name: "Subterranea",
        cards: [
            { id: 57, villainId: 15, team: "Subterranea", name: "Giganto", type: "Villain", attack: 7, originalAttack: 7, victoryPoints: 4, ambushEffect: "None", fightEffect: "gigantoFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Burrow", image: "Visual Assets/Villains/FantasticFour_Subterranea_Giganto.webp" },
            { id: 58, villainId: 15, team: "Subterranea", name: "Megataur", type: "Villain", attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "megataurAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Burrow", image: "Visual Assets/Villains/FantasticFour_Subterranea_Megataur.webp" },
            { id: 59, villainId: 15, team: "Subterranea", name: "Moloids", type: "Villain", attack: 3, originalAttack: 3, victoryPoints: 2, ambushEffect: "None", fightEffect: "moloidsFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Burrow", image: "Visual Assets/Villains/FantasticFour_Subterranea_Moloids.webp" },
            { id: 60, villainId: 15, team: "Subterranea", name: "Ra'ktar the Molan King", type: "Villain", attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "raktarAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keyword1: "Burrow", image: "Visual Assets/Villains/FantasticFour_Subterranea_RaktarTheMolanKing.webp" }
        ]
    }
];

const transformedGoblinQueenCards = [
{name: "Goblin Queen (Jean Grey - Read Your Thoughts)", image: "Visual Assets/Other/Transform Citizens Into Demons/goblinQueen5.webp"},
{name: "Goblin Queen (Jean Grey - Psychic Search)", image: "Visual Assets/Other/Transform Citizens Into Demons/goblinQueen3.webp"},
{name: "Goblin Queen (Jean Grey - Mind Over Matter)", image: "Visual Assets/Other/Transform Citizens Into Demons/goblinQueen6.webp"},
{name: "Goblin Queen (Jean Grey - Telekinetic Mastery)", image: "Visual Assets/Other/Transform Citizens Into Demons/goblinQueen7.webp"}
]

const sidekicks = [
    { id: 1, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 2, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 3, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 4, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 5, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 6, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 7, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 8, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 9, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 10, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 11, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 12, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 13, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 14, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 15, name: "Sidekick", expansion: "Secret Wars Volume 1", team: "None", class1: "None", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Grey", cost: 2, unconditionalAbility: "sidekickExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Sidekick.webp" },
    { id: 16, name: "Hairball", expansion: "Civil War", team: "Avengers", class1: "Covert", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, color: "Red", cost: 2, unconditionalAbility: "hairballExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Hairball.webp" },
    { id: 17, name: "Hairball", expansion: "Civil War", team: "Avengers", class1: "Covert", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, color: "Red", cost: 2, unconditionalAbility: "hairballExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Hairball.webp" },
    { id: 18, name: "Hairball", expansion: "Civil War", team: "Avengers", class1: "Covert", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, color: "Red", cost: 2, unconditionalAbility: "hairballExtraDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Hairball.webp" },
    { id: 19, name: "Ms. Lion", expansion: "Civil War", team: "Avengers", class1: "Covert", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Red", cost: 2, unconditionalAbility: "msLionBystanderAndDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Ms_Lion.webp" },
    { id: 20, name: "Ms. Lion", expansion: "Civil War", team: "Avengers", class1: "Covert", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Red", cost: 2, unconditionalAbility: "msLionBystanderAndDraw", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Ms_Lion.webp" },
    { id: 21, name: "Lockheed", expansion: "Civil War", team: "Avengers", class1: "Range", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, color: "Blue", cost: 2, unconditionalAbility: "lockheedBonusAttack", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Lockheed.webp" },
    { id: 22, name: "Lockheed", expansion: "Civil War", team: "Avengers", class1: "Range", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, color: "Blue", cost: 2, unconditionalAbility: "lockheedBonusAttack", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Lockheed.webp" },
    { id: 23, name: "Lockjaw", expansion: "Civil War", team: "Avengers", class1: "Range", keyword1: "Phasing", type: "Hero", secondaryType: "Sidekick", attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, color: "Blue", cost: 2, unconditionalAbility: "lockjawPhasing", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Lockjaw.webp" },
    { id: 24, name: "Lockjaw", expansion: "Civil War", team: "Avengers", class1: "Range", keyword1: "Phasing", type: "Hero", secondaryType: "Sidekick", attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, color: "Blue", cost: 2, unconditionalAbility: "lockjawPhasing", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Lockjaw.webp" },
    { id: 25, name: "Redwing", expansion: "Civil War", team: "Avengers", class1: "Instinct", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Yellow", cost: 2, unconditionalAbility: "RedwingRevealTopThreeDrawAndReorder", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Redwing.webp" },
    { id: 26, name: "Redwing", expansion: "Civil War", team: "Avengers", class1: "Instinct", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Yellow", cost: 2, unconditionalAbility: "RedwingRevealTopThreeDrawAndReorder", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Redwing.webp" },
    { id: 27, name: "Throg", expansion: "Civil War", team: "Avengers", class1: "Strength", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 2, attackIcon: true, recruitIcon: true, color: "Green", cost: 2, unconditionalAbility: "throgHighRecruitReward", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Throg.webp" },
    { id: 28, name: "Throg", expansion: "Civil War", team: "Avengers", class1: "Strength", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 2, attackIcon: true, recruitIcon: true, color: "Green", cost: 2, unconditionalAbility: "throgHighRecruitReward", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Throg.webp" },
    { id: 29, name: "Zabu", expansion: "Civil War", team: "Avengers", class1: "Instinct", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Yellow", cost: 2, unconditionalAbility: "zabuKO", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Zabu.webp" },
    { id: 30, name: "Zabu", expansion: "Civil War", team: "Avengers", class1: "Instinct", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Yellow", cost: 2, unconditionalAbility: "zabuKO", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Zabu.webp" },
    { id: 31, name: "Layla Miller", expansion: "Messiah Complex", team: "X-Factor", class1: "Tech", keyword1: "Investigate", type: "Hero", secondaryType: "Sidekick", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, color: "Black", cost: 2, unconditionalAbility: "laylaMillerInvestigate", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Layla_Miller.webp" },
    { id: 32, name: "Layla Miller", expansion: "Messiah Complex", team: "X-Factor", class1: "Tech", keyword1: "Investigate", type: "Hero", secondaryType: "Sidekick", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, color: "Black", cost: 2, unconditionalAbility: "laylaMillerInvestigate", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Layla_Miller.webp" },
    { id: 33, name: "Darwin", expansion: "Messiah Complex", team: "X-Factor", class1: "Instinct", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: true, recruitIcon: true, color: "Yellow", cost: 2, unconditionalAbility: "darwinAttackOrRecruit", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Darwin.webp" },
    { id: 34, name: "Darwin", expansion: "Messiah Complex", team: "X-Factor", class1: "Instinct", keyword1: "Investigate", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: true, recruitIcon: true, color: "Yellow", cost: 2, unconditionalAbility: "darwinAttackOrRecruit", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Darwin.webp" },
    { id: 35, name: "Boom-Boom", expansion: "Messiah Complex", team: "X-Force", class1: "Range", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: true, recruitIcon: false, color: "Blue", cost: 2, unconditionalAbility: "boomBoomNicknames", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Boom_Boom.webp" },
    { id: 36, name: "Boom-Boom", expansion: "Messiah Complex", team: "X-Force", class1: "Range", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: true, recruitIcon: false, color: "Blue", cost: 2, unconditionalAbility: "boomBoomNicknames", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Boom_Boom.webp" },
    { id: 37, name: "Prodigy", expansion: "Messiah Complex", team: "X-Men", class1: "Tech", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Black", cost: 2, unconditionalAbility: "prodigyCopyPowers", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Prodigy.webp" },
    { id: 38, name: "Prodigy", expansion: "Messiah Complex", team: "X-Men", class1: "Tech", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Black", cost: 2, unconditionalAbility: "prodigyCopyPowers", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Prodigy.webp" },
    { id: 39, name: "Rockslide", expansion: "Messiah Complex", team: "X-Men", class1: "Strength", keyword1: "Shatter", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Green", cost: 2, unconditionalAbility: "rockslideShatter", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Rockslide.webp" },
    { id: 40, name: "Rockslide", expansion: "Messiah Complex", team: "X-Men", class1: "Strength", keyword1: "Shatter", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, color: "Green", cost: 2, unconditionalAbility: "rockslideShatter", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Rockslide.webp" },
    { id: 41, name: "Rusty 'Firefist' Collins", expansion: "Messiah Complex", team: "X-Men", class1: "Range", keyword1: "Investigate", type: "Hero", secondaryType: "Sidekick", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, color: "Blue", cost: 2, unconditionalAbility: "RustyRevealTopTwoAndHandle", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Rusty_Firefist_Collins.webp" },
    { id: 42, name: "Rusty 'Firefist' Collins", expansion: "Messiah Complex", team: "X-Men", class1: "Range", keyword1: "Investigate", type: "Hero", secondaryType: "Sidekick", attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, color: "Blue", cost: 2, unconditionalAbility: "RustyRevealTopTwoAndHandle", sidekickToDestroy: false, image: "Visual Assets/Sidekicks/Rusty_Firefist_Collins.webp" },
    { id: 43, name: "Skids", expansion: "Messiah Complex", team: "X-Men", class1: "Covert", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 3, attackIcon: false, recruitIcon: true, color: "Red", cost: 2, unconditionalAbility: "skidsRecruitReturn", sidekickToDestroy: false, invulnerability: "discardWound", image: "Visual Assets/Sidekicks/Skids.webp" },
    { id: 44, name: "Skids", expansion: "Messiah Complex", team: "X-Men", class1: "Covert", keyword1: "None", type: "Hero", secondaryType: "Sidekick", attack: 0, recruit: 3, attackIcon: false, recruitIcon: true, color: "Red", cost: 2, unconditionalAbility: "skidsRecruitReturn", sidekickToDestroy: false, invulnerability: "discardWound", image: "Visual Assets/Sidekicks/Skids.webp" }
];

const heroes = [
    {
        id: 1,
        name: "Black Widow",
        cards: [
{id:1, heroName: "Black Widow", name: "Black Widow - Mission Accomplished", type: "Hero", rarity: "Common", team: "Avengers", class1: "Tech", class2: "None", color: "Black", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "BlackWidowRescueBystander", conditionType: "playedCards", condition: "Tech", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_BlackWidow_MissionAccomplished.webp"},
{id:2, heroName: "Black Widow", name: "Black Widow - Dangerous Rescue", type: "Hero", rarity: "Common 2", team: "Avengers", class1: "Covert", class2: "None", color: "Red", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "BlackWidowRescueBystanderByKO", conditionType: "playedCards", condition: "Covert", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_BlackWidow_DangerousRescue.webp"},
{id:3, heroName: "Black Widow", name: "Black Widow - Covert Operation", type: "Hero", rarity: "Uncommon", team: "Avengers", class1: "Covert", class2: "None", color: "Red", cost: 4, attack: 0, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "Bystander", multiplierAttribute: "type", multiplierLocation: "victoryPile", unconditionalAbility: "BlackWidowBonusAttack", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_BlackWidow_CovertOperation.webp"},
{id:4, heroName: "Black Widow", name: "Black Widow - Silent Sniper", type: "Hero", rarity: "Rare", team: "Avengers", class1: "Covert", class2: "None", color: "Red", cost: 7, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "BlackWidowShowBystanderRescueOptions", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_BlackWidow_SilentSniper.webp"},
        ]
    },
    {
        id: 2,
        name: "Captain America",
        cards: [
{id:5, heroName: "Captain America", name: "Captain America - Avengers Assemble!", type: "Hero", rarity: "Common", team: "Avengers", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 0, recruit: 0, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "Colours in Turn", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "CaptainAmericaCountUniqueColorsAndAddRecruit", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_CaptainAmerica_AvengersAssemble.webp"},
{id:6, heroName: "Captain America", name: "Captain America - Perfect Teamwork", type: "Hero", rarity: "Common 2", team: "Avengers", class1: "Strength", class2: "None", color: "Green", cost: 4, attack: 0, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "Colours in Turn", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "CaptainAmericaCountUniqueColorsAndAddAttack", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_CaptainAmerica_PerfectTeamwork.webp"},
{id:7, heroName: "Captain America", name: "Captain America - Diving Block", type: "Hero", rarity: "Uncommon", team: "Avengers", class1: "Tech", class2: "None", color: "Black", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "revealWound", image: "Visual Assets/Heroes/Reskinned Core/Core_CaptainAmerica_DivingBlock.webp"},
{id:8, heroName: "Captain America", name: "Captain America - A Day Unlike Any Other", type: "Hero", rarity: "Rare", team: "Avengers", class1: "Covert", class2: "None", color: "Red", cost: 7, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 3, bonusRecruit: 0, multiplier: "Avengers", multiplierAttribute: "team", multiplierLocation: "playedCards", unconditionalAbility: "None", conditionalAbility: "CaptainAmericaBonusAttack", conditionType: "playedCards", condition: "Avengers", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_CaptainAmerica_ADayUnlikeAnyOther.webp"}
        ]
    },
    {
        id: 3,
        name: "Cyclops",
        cards: [
{id:9, heroName: "Cyclops", name: "Cyclops - Optic Blast", type: "Hero", rarity: "Common", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 3, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "CyclopsOpticBlastDiscardToPlay", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Cyclops_OpticBlast.webp"},
{id:10, heroName: "Cyclops", name: "Cyclops - Determination", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Strength", class2: "None", color: "Green", cost: 2, attack: 0, recruit: 3, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "CyclopsDeterminationDiscardToPlay", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Cyclops_Determination.webp"},
{id:11, heroName: "Cyclops", name: "Cyclops - Unending Energy", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "Discard", image: "Visual Assets/Heroes/Reskinned Core/Core_Cyclops_UnendingEnergy.webp"},
{id:12, heroName: "Cyclops", name: "Cyclops - X-Men United", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 8, attack: 6, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 2, bonusRecruit: 0, multiplier: "X-Men", multiplierAttribute: "team", multiplierLocation: "playedCards", unconditionalAbility: "None", conditionalAbility: "CyclopsBonusAttack", conditionType: "playedCards", condition: "X-Men", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Cyclops_XMenUnited.webp"}
        ]
    },
    {
        id: 4,
        name: "Deadpool",
        cards: [
{id:13, heroName: "Deadpool", name: "Deadpool - Here, Hold This For a Second", type: "Hero", rarity: "Common", team: "None", class1: "Tech", class2: "None", color: "Black", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "DeadpoolAssignBystanderToVillain", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Deadpool_HereHoldThisForASecond.webp"},
{id:14, heroName: "Deadpool", name: "Deadpool - Oddball", type: "Hero", rarity: "Common 2", team: "None", class1: "Covert", class2: "None", color: "Red", cost: 5, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "DeadpoolApplyOddCostBonus", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Deadpool_Oddball.webp"},
{id:15, heroName: "Deadpool", name: "Deadpool - Hey, Can I Get a Do-Over?", type: "Hero", rarity: "Uncommon", team: "None", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "DeadpoolReDraw", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Deadpool_HeyCanIGetADoOver.webp"},
{id:16, heroName: "Deadpool", name: "Deadpool - Random Acts of Unkindness", type: "Hero", rarity: "Rare", team: "None", class1: "Instinct", class2: "None", color: "Yellow", cost: 7, attack: 6, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "DeadpoolChooseToGainWound", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Deadpool_RandomActsOfUnkindness.webp"}
        ]
    },
    {
        id: 5,
        name: "Emma Frost",
        cards: [
{id:17, heroName: "Emma Frost", name: "Emma Frost - Mental Discipline", type: "Hero", rarity: "Common", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 3, attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_MentalDiscipline.webp"},
{id:18, heroName: "Emma Frost", name: "Emma Frost - Shadowed Thoughts", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 2, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "EmmaFrostVoluntaryVillainForAttack", conditionType: "playedCards", condition: "Covert", errata: "Emma Frost - Shadowed Thoughts Errata", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_ShadowedThoughts.webp"},
{id:19, heroName: "Emma Frost", name: "Emma Frost - Psychic Link", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 5, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "EmmaFrostExtraDraw", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_PsychicLink.webp"},
{id:20, heroName: "Emma Frost", name: "Emma Frost - Diamond Form", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Strength", class2: "None", color: "Green", cost: 7, attack: 5, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "EmmaFrostExtraThreeRecruit", conditionalAbility: "None", conditionType: "None", condition: "None", errata: "Emma Frost - Diamond Form Errata", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_EmmaFrost_DiamondForm.webp"}
        ]
    },
    {
        id: 6,
        name: "Gambit",
        cards: [
{id:21, heroName: "Gambit", name: "Gambit - Stack the Deck", type: "Hero", rarity: "Common", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "GambitDrawTwoPutOneBack", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Gambit_StackTheDeck.webp"},
{id:22, heroName: "Gambit", name: "Gambit - Card Shark", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "GambitRevealXTopCardToDraw", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Gambit_CardShark.webp"},
{id:23, heroName: "Gambit", name: "Gambit - Hypnotic Charm", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "GambitTopCardDiscardOrPutBack", conditionalAbility: "Gambit2ndTopCardDiscardOrPutBack", conditionType: "playedCards", condition: "Instinct", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Gambit_HypnoticCharm.webp"},
{id:24, heroName: "Gambit", name: "Gambit - High Stakes Jackpot", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 7, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "GambitRevealTopCardForAttack", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Gambit_HighStakesJackpot.webp"}
        ]
    },
{
        id: 7,
        name: "Hawkeye",
        cards: [
{id:25, heroName: "Hawkeye", name: "Hawkeye - Quick Draw", type: "Hero", rarity: "Common", team: "Avengers", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Hawkeye_QuickDraw.webp"},
{id:26, heroName: "Hawkeye", name: "Hawkeye - Team Player", type: "Hero", rarity: "Common 2", team: "Avengers", class1: "Tech", class2: "None", color: "Black", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "HawkeyeBonusAttack", conditionType: "playedCards", condition: "Avengers", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Hawkeye_TeamPlayer.webp"},
{id:27, heroName: "Hawkeye", name: "Hawkeye - Covering Fire", type: "Hero", rarity: "Uncommon", team: "Avengers", class1: "Tech", class2: "None", color: "Black", cost: 5, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "HawkeyeDontDrawOrDiscard", conditionType: "playedCards", condition: "Tech", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Hawkeye_CoveringFire.webp"},
{id:28, heroName: "Hawkeye", name: "Hawkeye - Impossible Trick Shot", type: "Hero", rarity: "Rare", team: "Avengers", class1: "Tech", class2: "None", color: "Black", cost: 7, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "rescueThreeBystanders", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Hawkeye_ImpossibleTrickShot.webp"}
        ]
    },
{
        id: 8,
        name: "Hulk",
        cards: [
{id:29, heroName: "Hulk", name: "Hulk - Unstoppable Hulk", type: "Hero", rarity: "Common", team: "Avengers", class1: "Instinct", class2: "None", color: "Yellow", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "HulkKoWoundToGainAttack", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Hulk_UnstoppableHulk.webp"},
{id:30, heroName: "Hulk", name: "Hulk - Growing Anger", type: "Hero", rarity: "Common 2", team: "Avengers", class1: "Strength", class2: "None", color: "Green", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "HulkGrowingAngerBonusAttack", conditionType: "playedCards", condition: "Strength", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Hulk_GrowingAnger.webp"},
{id:31, heroName: "Hulk", name: "Hulk - Crazed Rampage", type: "Hero", rarity: "Uncommon", team: "Avengers", class1: "Strength", class2: "None", color: "Green", cost: 5, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "drawWound", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Hulk_CrazedRampage.webp"},
{id:32, heroName: "Hulk", name: "Hulk - Hulk Smash!", type: "Hero", rarity: "Rare", team: "Avengers", class1: "Strength", class2: "None", color: "Green", cost: 8, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 5, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "HulkSmashBonusAttack", conditionType: "playedCards", condition: "Strength", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Hulk_HulkSmash.webp"}
        ]
    },
{

        id: 9,
        name: "Iron Man",
        cards: [
{id:33, heroName: "Iron Man", name: "Iron Man - Endless Invention", type: "Hero", rarity: "Common", team: "Avengers", class1: "Tech", class2: "None", color: "Black", cost: 3, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "IronManExtraDraw", conditionType: "playedCards", condition: "Tech", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_IronMan_EndlessInvention.webp"},
{id:34, heroName: "Iron Man", name: "Iron Man - Repulsor Rays", type: "Hero", rarity: "Common 2", team: "Avengers", class1: "Range", class2: "None", color: "Blue", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "IronManBonusAttack", conditionType: "playedCards", condition: "Range", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_IronMan_RepulsorRays.webp"},
{id:35, heroName: "Iron Man", name: "Iron Man - Arc Reactor", type: "Hero", rarity: "Uncommon", team: "Avengers", class1: "Tech", class2: "None", color: "Black", cost: 5, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "Black", multiplierAttribute: "color", multiplierLocation: "playedCards", unconditionalAbility: "None", conditionalAbility: "IronManArcReactorBonusAttack", conditionType: "playedCards", condition: "Tech", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_IronMan_ArcReactor.webp"},
{id:36, heroName: "Iron Man", name: "Iron Man - Quantum Breakthrough", type: "Hero", rarity: "Rare", team: "Avengers", class1: "Tech", class2: "None", color: "Black", cost: 7, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "drawTwo", conditionalAbility: "IronManDrawTwo", conditionType: "playedCards", condition: "Tech", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_IronMan_QuantumBreakthrough.webp"}
        ]
    },
{

        id: 10,
        name: "Nick Fury",
        cards: [
{id:37, heroName: "Nick Fury", name: "Nick Fury - Battlefield Promotion", type: "Hero", rarity: "Common", team: "S.H.I.E.L.D.", class1: "Covert", class2: "None", color: "Red", cost: 4, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "NickFuryRecruitShieldOfficerByKO", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_NickFury_BattlefieldPromotion.webp"},
{id:38, heroName: "Nick Fury", name: "Nick Fury - High-Tech Weaponry", type: "Hero", rarity: "Common 2", team: "S.H.I.E.L.D.", class1: "Tech", class2: "None", color: "Black", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "NickFuryBonusAttack", conditionType: "playedCards", condition: "Tech", errata: "Nick Fury - High Tech Weaponry Errata", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_NickFury_HighTechWeaponry.webp"},
{id:39, heroName: "Nick Fury", name: "Nick Fury - Legendary Commander", type: "Hero", rarity: "Uncommon", team: "S.H.I.E.L.D.", class1: "Strength", class2: "None", color: "Green", cost: 6, attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "S.H.I.E.L.D.", multiplierAttribute: "team", multiplierLocation: "playedCards", unconditionalAbility: "NickFuryCommanderBonusAttack", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_NickFury_LegendaryCommander.webp"},
{id:40, heroName: "Nick Fury", name: "Nick Fury - Pure Fury", type: "Hero", rarity: "Rare", team: "S.H.I.E.L.D.", class1: "Tech", class2: "None", color: "Black", cost: 8, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "NickFuryFindEligibleVillains", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_NickFury_PureFury.webp"}
        ]
    },
{
        id: 11,
        name: "Rogue",
        cards: [
{id:41, heroName: "Rogue", name: "Rogue - Energy Drain", type: "Hero", rarity: "Common", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 1, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "RogueKOHandOrDiscardForRecruit", conditionType: "playedCards", condition: "Covert", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Rogue_EnergyDrain.webp"},
{id:42, heroName: "Rogue", name: "Rogue - Borrowed Brawn", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Strength", class2: "None", color: "Green", cost: 4, attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 3, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "RogueBonusAttack", conditionType: "playedCards", condition: "Strength", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Rogue_BorrowedBrawn.webp"},
{id:43, heroName: "Rogue", name: "Rogue - Copy Powers", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 5, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "RogueCopyPowers", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Rogue_CopyPowers.webp"},
{id:44, heroName: "Rogue", name: "Rogue - Steal Abilities", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Strength", class2: "None", color: "Green", cost: 8, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "RogueCopyTopCardEffect", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Rogue_StealAbilities.webp"}
        ]
    },
{

        id: 12,
        name: "Spider-Man",
        cards: [
{id:45, heroName: "Spider-Man", name: "Spider-Man - Astonishing Strength", type: "Hero", rarity: "Common", team: "Spider Friends", class1: "Strength", class2: "None", color: "Green", cost: 2, attack: 0, recruit: 1, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "SpiderManRevealTopCardToDraw", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_SpiderMan_AstonishingStrength.webp"},
{id:46, heroName: "Spider-Man", name: "Spider-Man - Great Responsibility", type: "Hero", rarity: "Common 2", team: "Spider Friends", class1: "Instinct", class2: "None", color: "Yellow", cost: 2, attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "SpiderManRevealTopCardToDraw", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_SpiderMan_GreatResponsibility.webp"},
{id:47, heroName: "Spider-Man", name: "Spider-Man - Web-Shooters", type: "Hero", rarity: "Uncommon", team: "Spider Friends", class1: "Tech", class2: "None", color: "Black", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "SpiderManRevealTopCardToDrawAndBystander", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_SpiderMan_WebShooters.webp"},
{id:48, heroName: "Spider-Man", name: "Spider-Man - The Amazing Spider-Man", type: "Hero", rarity: "Rare", team: "Spider Friends", class1: "Covert", class2: "None", color: "Red", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "SpiderManRevealTopThreeAndReorder", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_SpiderMan_TheAmazingSpiderMan.webp"}
        ]
    },
{

        id: 13,
        name: "Storm",
        cards: [
{id:49, heroName: "Storm", name: "Storm - Lightning Bolt", type: "Hero", rarity: "Common", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "StormMinus2ToRooftops", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Storm_LightningBolt.webp"},
{id:50, heroName: "Storm", name: "Storm - Gathering Stormclouds", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "StormExtraDraw", conditionType: "playedCards", condition: "Range", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Storm_GatheringStormclouds.webp"},
{id:51, heroName: "Storm", name: "Storm - Spinning Cyclone", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "StormMoveVillain", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Storm_SpinningCyclone.webp"},
{id:52, heroName: "Storm", name: "Storm - Tidal Wave", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 7, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "StormMinus2ToBridge", conditionalAbility: "StormMinus2ToMastermind", conditionType: "playedCards", condition: "Range", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Storm_TidalWave.webp"}
        ]
     },
{

        id: 14,
        name: "Thor",
        cards: [
{id:53, heroName: "Thor", name: "Thor - Surge of Power", type: "Hero", rarity: "Common", team: "Avengers", class1: "Range", class2: "None", color: "Blue", cost: 4, attack: 0, recruit: 2, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "ThorHighRecruitReward", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Thor_SurgeOfPower.webp"},
{id:54, heroName: "Thor", name: "Thor - Odinson", type: "Hero", rarity: "Common 2", team: "Avengers", class1: "Strength", class2: "None", color: "Green", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 2, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "ThorBonusRecruit", conditionType: "playedCards", condition: "Strength", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Thor_Odinson.webp"},
{id:55, heroName: "Thor", name: "Thor - Call Lightning", type: "Hero", rarity: "Uncommon", team: "Avengers", class1: "Range", class2: "None", color: "Blue", cost: 6, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 3, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "ThorBonusAttack", conditionType: "playedCards", condition: "Range", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Thor_CallLightning.webp"},
{id:56, heroName: "Thor", name: "Thor - God of Thunder", type: "Hero", rarity: "Rare", team: "Avengers", class1: "Range", class2: "None", color: "Blue", cost: 8, attack: 0, recruit: 5, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "ThorRecruitPointsCanAttack", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Thor_GodOfThunder.webp"}
        ]
    },
{

        id: 15,
        name: "Wolverine",
        cards: [
{id:57, heroName: "Wolverine", name: "Wolverine - Healing Factor", type: "Hero", rarity: "Common", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "WolverineKoWoundToDraw", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Wolverine_HealingFactor.webp"},
{id:58, heroName: "Wolverine", name: "Wolverine - Keen Senses", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 2, attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "WolverineExtraDraw", conditionType: "playedCards", condition: "Instinct", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Wolverine_KeenSenses.webp"},
{id:59, heroName: "Wolverine", name: "Wolverine - Frenzied Slashing", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 5, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "WolverineDrawTwo", conditionType: "playedCards", condition: "Instinct", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Wolverine_FrenziedSlashing.webp"},
{id:60, heroName: "Wolverine", name: "Wolverine - Berserker Rage", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 8, attack: 0, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "Extra Cards Drawn", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "WolverineDrawThree", conditionalAbility: "WolverineBonusAttackPerExtraCard", conditionType: "playedCards", condition: "Instinct", invulnerability: "None", image: "Visual Assets/Heroes/Reskinned Core/Core_Wolverine_BerserkerRage.webp"}
        ]
    },
{

        id: 16,
        name: "Angel",
        cards: [
{id:61, heroName: "Angel", name: "Angel - Diving Catch", type: "Hero", rarity: "Common", team: "X-Men", class1: "Strength", class2: "None", color: "Green", cost: 4, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "Discard", image: "Visual Assets/Heroes/Dark City/DarkCity_Angel_DivingCatch.webp"},
{id:62, heroName: "Angel", name: "Angel - High-Speed Chase", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 3, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "angelHighSpeedChase", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Angel_High-SpeedChase.webp"},
{id:63, heroName: "Angel", name: "Angel - Drop Off A Friend", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 5, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "angelDropOffAFriend", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Angel_DropOffAFriend.webp"},
{id:64, heroName: "Angel", name: "Angel - Strength of Spirit", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Strength", class2: "None", color: "Green", cost: 7, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "angelStrengthOfSpirit", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Angel_StrengthOfSpirit.webp"}
        ]
    },
{

        id: 17,
        name: "Bishop",
        cards: [
{id:65, heroName: "Bishop", name: "Bishop - Absorb Energies", type: "Hero", rarity: "Common", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "bishopAbsorbEnergies", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Bishop_AbsorbEnergies.webp"},
{id:66, heroName: "Bishop", name: "Bishop - Whatever the Cost", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "bishopWhateverTheCost", conditionType: "playedCards", condition: "Covert", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Bishop_WhateverTheCost.webp"},
{id:67, heroName: "Bishop", name: "Bishop - Concussive Blast", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 5, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 3, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "bishopConcussiveBlast", conditionType: "playedCards", condition: "Range&Range", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Bishop_ConcussiveBlast.webp"},
{id:68, heroName: "Bishop", name: "Bishop - Firepower From the Future", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Tech", class2: "None", color: "Black", cost: 7, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "bishopFirepowerFromTheFuture", conditionalAbility: "None", conditionType: "playedCards", condition: "X-Men", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Bishop_FirepowerFromTheFuture.webp"}
        ]
    },
{

        id: 18,
        name: "Blade",
        cards: [
{id:69, heroName: "Blade", name: "Blade - Stalk the Prey", type: "Hero", rarity: "Common", team: "Marvel Knights", class1: "Covert", class2: "None", color: "Red", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "bladeStalkThePrey", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Blade_StalkThePrey.webp"},
{id:70, heroName: "Blade", name: "Blade - Night Hunter", type: "Hero", rarity: "Common 2", team: "Marvel Knights", class1: "Strength", class2: "None", color: "Green", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "bladeNightHunter", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Blade_NightHunter.webp"},
{id:71, heroName: "Blade", name: "Blade - Nowhere To Hide", type: "Hero", rarity: "Uncommon", team: "Marvel Knights", class1: "Tech", class2: "None", color: "Black", cost: 6, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "bladeNowhereToHide", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Blade_NowhereToHide.webp"},
{id:72, heroName: "Blade", name: "Blade - Vampiric Surge", type: "Hero", rarity: "Rare", team: "Marvel Knights", class1: "Instinct", class2: "None", color: "Yellow", cost: 7, attack: 0, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "bladeVampiricSurge", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Blade_VampiricSurge.webp"}
        ]
    },
{

        id: 19,
        name: "Cable",
        cards: [
{id:73, heroName: "Cable", name: "Cable - Strike at the Heart of Evil", type: "Hero", rarity: "Common", team: "X-Force", class1: "Range", class2: "None", color: "Blue", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "cableStrike", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Cable_StrikeAtTheHeartOfEvil.webp"},
{id:74, heroName: "Cable", name: "Cable - Disaster Survivalist", type: "Hero", rarity: "Common 2", team: "X-Force", class1: "Tech", class2: "None", color: "Black", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Cable_DisasterSurvivalist.webp"},
{id:75, heroName: "Cable", name: "Cable - Rapid Response Force", type: "Hero", rarity: "Uncommon", team: "X-Force", class1: "Covert", class2: "None", color: "Red", cost: 6, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "X-Force", multiplierAttribute: "team", multiplierLocation: "playedCards", keyword1: "Teleport", unconditionalAbility: "None", conditionalAbility: "cableRapidResponseForce", conditionType: "playedCards", condition: "X-Force", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Cable_RapidResponseForce.webp"},
{id:76, heroName: "Cable", name: "Cable - Army of One", type: "Hero", rarity: "Rare", team: "X-Force", class1: "Range", class2: "None", color: "Blue", cost: 8, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 1, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "cableArmyOfOne", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Cable_ArmyOfOne.webp"}
        ]
    },
{

        id: 20,
        name: "Colossus",
        cards: [
{id:77, heroName: "Colossus", name: "Colossus - Draw Their Fire", type: "Hero", rarity: "Common", team: "X-Force", class1: "Strength", class2: "None", color: "Green", cost: 1, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "drawWound", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Colossus_DrawTheirFire.webp"},
{id:78, heroName: "Colossus", name: "Colossus - Invulnerability", type: "Hero", rarity: "Common 2", team: "X-Force", class1: "Strength", class2: "None", color: "Green", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "discardWound", image: "Visual Assets/Heroes/Dark City/DarkCity_Colossus_Invulnerability.webp"},
{id:79, heroName: "Colossus", name: "Colossus - Silent Statue", type: "Hero", rarity: "Uncommon", team: "X-Force", class1: "Covert", class2: "None", color: "Red", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 2, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "colossusSilentStatue", conditionType: "playedCards", condition: "Strength", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Colossus_SilentStatue.webp"},
{id:80, heroName: "Colossus", name: "Colossus - Russian Heavy Tank", type: "Hero", rarity: "Rare", team: "X-Force", class1: "Strength", class2: "None", color: "Green", cost: 8, attack: 6, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Colossus_RussianHeavyTank.webp"}
        ]
    },
{

        id: 21,
        name: "Daredevil",
        cards: [
{id:81, heroName: "Daredevil", name: "Daredevil - Backflip", type: "Hero", rarity: "Common", team: "Marvel Knights", class1: "Strength", class2: "None", color: "Green", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "daredevilBackflip", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Daredevil_Backflip.webp"},
{id:82, heroName: "Daredevil", name: "Daredevil - Radar Sense", type: "Hero", rarity: "Common 2", team: "Marvel Knights", class1: "Instinct", class2: "None", color: "Yellow", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "daredevilRadarSense", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Daredevil_RadarSense.webp"},
{id:83, heroName: "Daredevil", name: "Daredevil - Blind Justice", type: "Hero", rarity: "Uncommon", team: "Marvel Knights", class1: "Covert", class2: "None", color: "Red", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "daredevilBlindJustice", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Daredevil_BlindJustice.webp"},
{id:84, heroName: "Daredevil", name: "Daredevil - The Man Without Fear", type: "Hero", rarity: "Rare", team: "Marvel Knights", class1: "Instinct", class2: "None", color: "Yellow", cost: 8, attack: 7, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "daredevilTheManWithoutFear", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Daredevil_TheManWithoutFear.webp"}
        ]
    },
{

        id: 22,
        name: "Domino",
        cards: [
{id:85, heroName: "Domino", name: "Domino - Lucky Break", type: "Hero", rarity: "Common", team: "X-Force", class1: "Tech", class2: "None", color: "Black", cost: 1, attack: 0, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", keyword1: "Versatile", errata: "Domino - Lucky Break Errata", unconditionalAbility: "extraDraw", conditionalAbility: "dominoLuckyBreak", conditionType: "playedCards", condition: "X-Force", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Domino_LuckyBreak.webp"},
{id:86, heroName: "Domino", name: "Domino - Ready For Anything", type: "Hero", rarity: "Common 2", team: "X-Force", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 0, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", keyword1: "Versatile", unconditionalAbility: "dominoReadyForAnything", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Domino_ReadyForAnything.webp"},
{id:87, heroName: "Domino", name: "Domino - Specialized Ammunition", type: "Hero", rarity: "Uncommon", team: "X-Force", class1: "Tech", class2: "None", color: "Black", cost: 5, attack: 0, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "dominoSpecializedAmmunition", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Domino_SpecializedAmmunition.webp"},
{id:88, heroName: "Domino", name: "Domino - Against All Odds", type: "Hero", rarity: "Rare", team: "X-Force", class1: "Covert", class2: "None", color: "Red", cost: 7, attack: 0, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", keyword1: "Versatile", unconditionalAbility: "dominoAgainstAllOdds", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Domino_AgainstAllOdds.webp"}
        ]
    },
{

        id: 23,
        name: "Elektra",
        cards: [
{id:89, heroName: "Elektra", name: "Elektra - First Strike", type: "Hero", rarity: "Common", team: "Marvel Knights", class1: "Covert", class2: "None", color: "Red", cost: 1, attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "elektraFirstStrike", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Elektra_FirstStrike.webp"},
{id:90, heroName: "Elektra", name: "Elektra - Ninjitsu", type: "Hero", rarity: "Common 2", team: "Marvel Knights", class1: "Instinct", class2: "None", color: "Yellow", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 2, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "elektraNinjitsu", conditionType: "playedCards", condition: "Covert", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Elektra_Ninjitsu.webp"},
{id:91, heroName: "Elektra", name: "Elektra - Sai Blades", type: "Hero", rarity: "Uncommon", team: "Marvel Knights", class1: "Instinct", class2: "None", color: "Yellow", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "elektraSaiBlades", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Elektra_SaiBlades.webp"},
{id:92, heroName: "Elektra", name: "Elektra - Silent Meditation", type: "Hero", rarity: "Rare", team: "Marvel Knights", class1: "Instinct", class2: "None", color: "Yellow", cost: 7, attack: 0, recruit: 5, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 2, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "elektraSilentMeditation", conditionalAbility: "elektraSilentMeditationRecruit", conditionType: "playedCards", condition: "Marvel Knights", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Elektra_SilentMeditation.webp"}
        ]
    },
{

        id: 24,
        name: "Forge",
        cards: [
{id:93, heroName: "Forge", name: "Forge - Reboot", type: "Hero", rarity: "Common", team: "X-Force", class1: "Tech", class2: "None", color: "Black", cost: 4, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "forgeReboot", conditionType: "playedCards", condition: "Tech", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Forge_Reboot.webp"},
{id:94, heroName: "Forge", name: "Forge - Dirty Work", type: "Hero", rarity: "Common 2", team: "X-Force", class1: "Tech", class2: "None", color: "Black", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "forgeDirtyWork", conditionType: "playedCards", condition: "Tech", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Forge_DirtyWork.webp"},
{id:95, heroName: "Forge", name: "Forge - Overdrive", type: "Hero", rarity: "Uncommon", team: "X-Force", class1: "Tech", class2: "None", color: "Black", cost: 5, attack: 0, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", keyword1: "Versatile", unconditionalAbility: "forgeOverdrive", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Forge_Overdrive.webp"},
{id:96, heroName: "Forge", name: "Forge - B.F.G.", type: "Hero", rarity: "Rare", team: "X-Force", class1: "Tech", class2: "None", color: "Black", cost: 7, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "forgeBFG", conditionType: "playedCards", condition: "Tech&Tech", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Forge_BFG.webp"}
        ]
    },
{

        id: 25,
        name: "Ghost Rider",
        cards: [
{id:97, heroName: "Ghost Rider", name: "Ghost Rider - Hell On Wheels", type: "Hero", rarity: "Common", team: "Marvel Knights", class1: "Tech", class2: "None", color: "Black", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 2, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "ghostRiderHellOnWheels", conditionType: "playedCards", condition: "Marvel Knights", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_GhostRider_HellOnWheels.webp"},
{id:98, heroName: "Ghost Rider", name: "Ghost Rider - Blazing Hellfire", type: "Hero", rarity: "Common 2", team: "Marvel Knights", class1: "Range", class2: "None", color: "Blue", cost: 5, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 2, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "ghostRiderBlazingHellfire", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_GhostRider_BlazingHellfire.webp"},
{id:99, heroName: "Ghost Rider", name: "Ghost Rider - Infernal Chains", type: "Hero", rarity: "Uncommon", team: "Marvel Knights", class1: "Strength", class2: "None", color: "Green", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "ghostRiderInfernalChains", conditionType: "playedCards", condition: "Strength", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_GhostRider_InfernalChains.webp"},
{id:100, heroName: "Ghost Rider", name: "Ghost Rider - Penance Stare", type: "Hero", rarity: "Rare", team: "Marvel Knights", class1: "Range", class2: "None", color: "Blue", cost: 8, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "ghostRiderPenanceStare", conditionalAbility: "ghostRiderPenanceStareConditional", conditionType: "playedCards", condition: "Marvel Knights", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_GhostRider_PenanceStare.webp"}
        ]
    },
{

        id: 26,
        name: "Iceman",
        cards: [
{id:101, heroName: "Iceman", name: "Iceman - Ice Slide", type: "Hero", rarity: "Common", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "icemanIceSlide", conditionType: "playedCards", condition: "Range", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Iceman_IceSlide.webp"},
{id:102, heroName: "Iceman", name: "Iceman - Deep Freeze", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "icemanDeepFreeze", conditionType: "playedCards", condition: "Range", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Iceman_DeepFreeze.webp"},
{id:103, heroName: "Iceman", name: "Iceman - Frost Spike Armor", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Strength", class2: "None", color: "Green", cost: 5, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "icemanFrostSpikeArmor", conditionType: "playedCards", condition: "Range", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Iceman_FrostSpikeArmor.webp"},
{id:104, heroName: "Iceman", name: "Iceman - Impenetrable Ice Wall", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 8, attack: 7, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "discardAndWound", image: "Visual Assets/Heroes/Dark City/DarkCity_Iceman_ImpenetrableIceWall.webp"}
        ]
    },
{

        id: 27,
        name: "Iron Fist",
        cards: [
{id:105, heroName: "Iron Fist", name: "Iron Fist - Focus Chi", type: "Hero", rarity: "Common", team: "Marvel Knights", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 0, recruit: 0, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "ironfistFocusChi", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_IronFist_FocusChi.webp"},
{id:106, heroName: "Iron Fist", name: "Iron Fist - Wield the Iron Fist", type: "Hero", rarity: "Common 2", team: "Marvel Knights", class1: "Strength", class2: "None", color: "Green", cost: 4, attack: 0, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "ironfistWieldTheIronFist", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_IronFist_WieldTheIronFist.webp"},
{id:107, heroName: "Iron Fist", name: "Iron Fist - Ancient Legacy", type: "Hero", rarity: "Uncommon", team: "Marvel Knights", class1: "Strength", class2: "None", color: "Green", cost: 1, attack: 0, recruit: 0, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", keyword1: "Versatile", unconditionalAbility: "extraDraw", conditionalAbility: "ironfistAncientLegacy", conditionType: "playedCards", condition: "Strength&Strength", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_IronFist_AncientLegacy.webp"},
{id:108, heroName: "Iron Fist", name: "Iron Fist - Living Weapon", type: "Hero", rarity: "Rare", team: "Marvel Knights", class1: "Strength", class2: "None", color: "Green", cost: 9, attack: 8, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "ironfistLivingWeapon", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_IronFist_LivingWeapon.webp"}
        ]
    },
{

        id: 28,
        name: "Jean Grey",
        cards: [
{id:109, heroName: "Jean Grey", name: "Jean Grey - Read Your Thoughts", type: "Hero", rarity: "Common", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 5, attack: 0, recruit: 3, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "jeangreyReadYourThoughts", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_JeanGrey_ReadYourThoughts.webp"},
{id:110, heroName: "Jean Grey", name: "Jean Grey - Psychic Search", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 3, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "jeangreyPsychicSearch", conditionType: "playedCards", condition: "X-Men", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_JeanGrey_PsychicSearch.webp"},
{id:111, heroName: "Jean Grey", name: "Jean Grey - Mind Over Matter", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "jeangreyMindOverMatter", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_JeanGrey_MindOverMatter.webp"},
{id:112, heroName: "Jean Grey", name: "Jean Grey - Telekinetic Mastery", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 7, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "jeangreyTelekineticMastery", conditionalAbility: "jeanGreyXMenBystanders", conditionType: "playedCards", condition: "X-Men", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_JeanGrey_TelekineticMastery.webp"}
        ]
    },
{

        id: 29,
        name: "Nightcrawler",
        cards: [
{id:113, heroName: "Nightcrawler", name: "Nightcrawler - Bamf!", type: "Hero", rarity: "Common", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", keyword1: "Teleport", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Nightcrawler_Bamf.webp"},
{id:114, heroName: "Nightcrawler", name: "Nightcrawler - Blend Into Shadows", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", keyword1: "Teleport", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Nightcrawler_BlendIntoShadows.webp"},
{id:115, heroName: "Nightcrawler", name: "Nightcrawler - Swashbuckler", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 5, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 3, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "nightcrawlerSwashbuckler", conditionType: "playedCards", condition: "Instinct&Covert", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Nightcrawler_Swashbuckler.webp"},
{id:116, heroName: "Nightcrawler", name: "Nightcrawler - Along for the Ride", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 7, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", keyword1: "Teleport", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Nightcrawler_AlongForTheRide.webp"}
        ]
    },
{

        id: 30,
        name: "Professor X",
        cards: [
{id:117, heroName: "Professor X", name: "Professor X - Class Dismissed", type: "Hero", rarity: "Common", team: "X-Men", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "professorXClassDismissed", conditionalAbility: "professorXClassDismissedKO", conditionType: "playedCards", condition: "Instinct", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_ClassDismissed.webp"},
{id:118, heroName: "Professor X", name: "Professor X - Psionic Astral Form", type: "Hero", rarity: "Common 2", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 2, attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 2, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "professorXPsionicAstralForm", conditionType: "playedCards", condition: "X-Men", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_PsionicAstralForm.webp"},
{id:119, heroName: "Professor X", name: "Professor X - Telepathic Probe", type: "Hero", rarity: "Uncommon", team: "X-Men", class1: "Range", class2: "None", color: "Blue", cost: 5, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "professorXTelepathicProbe", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_TelepathicProbe.webp"},
{id:120, heroName: "Professor X", name: "Professor X - Mind Control", type: "Hero", rarity: "Rare", team: "X-Men", class1: "Covert", class2: "None", color: "Red", cost: 8, attack: 6, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "professorXMindControl", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_ProfessorX_MindControl.webp"}
        ]
    },
{

        id: 31,
        name: "Punisher",
        cards: [
{id:121, heroName: "Punisher", name: "Punisher - Boom Goes the Dynamite", type: "Hero", rarity: "Common", team: "Marvel Knights", class1: "Tech", class2: "None", color: "Black", cost: 2, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "punisherBoomGoesTheDynamite", conditionalAbility: "punisherBoomGoesTheDynamiteConditional", conditionType: "playedCards", condition: "Tech", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Punisher_BoomGoesTheDynamite.webp"},
{id:122, heroName: "Punisher", name: "Punisher - Hail of Bullets", type: "Hero", rarity: "Common 2", team: "Marvel Knights", class1: "Tech", class2: "None", color: "Black", cost: 5, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "punisherHailOfBullets", conditionalAbility: "punisherHailOfBulletsDefeat", conditionType: "playedCards", condition: "Tech&Tech", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Punisher_HailOfBullets.webp"},
{id:123, heroName: "Punisher", name: "Punisher - Hostile Interrogation", type: "Hero", rarity: "Uncommon", team: "Marvel Knights", class1: "Strength", class2: "None", color: "Green", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "punisherHostileInterrogation", conditionType: "playedCards", condition: "Strength", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Punisher_HostileInterrogation.webp"},
{id:124, heroName: "Punisher", name: "Punisher - The Punisher", type: "Hero", rarity: "Rare", team: "Marvel Knights", class1: "Tech", class2: "None", color: "Black", cost: 8, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "punisherThePunisher", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_Punisher_ThePunisher.webp"}
        ]
    },
{

        id: 32,
        name: "X-Force Wolverine",
        cards: [
{id:125, heroName: "X-Force Wolverine", name: "X-Force Wolverine - Sudden Ambush", type: "Hero", rarity: "Common", team: "X-Force", class1: "Covert", class2: "None", color: "Red", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "xforcewolverineSuddenAmbush", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_X-ForceWolverine_SuddenAmbush.webp"},
{id:126, heroName: "X-Force Wolverine", name: "X-Force Wolverine - Animal Instincts", type: "Hero", rarity: "Common 2", team: "X-Force", class1: "Instinct", class2: "None", color: "Yellow", cost: 2, attack: 0, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 2, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "extraDraw", conditionalAbility: "xforcewolverineAnimalInstincts", conditionType: "playedCards", condition: "Instinct", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_X-ForceWolverine_AnimalInstincts.webp"},
{id:127, heroName: "X-Force Wolverine", name: "X-Force Wolverine - No Mercy", type: "Hero", rarity: "Uncommon", team: "X-Force", class1: "Strength", class2: "None", color: "Green", cost: 4, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "xforcewolverineNoMercy", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_X-ForceWolverine_NoMercy.webp"},
{id:128, heroName: "X-Force Wolverine", name: "X-Force Wolverine - Reckless Abandon", type: "Hero", rarity: "Rare", team: "X-Force", class1: "Covert", class2: "None", color: "Red", cost: 7, attack: 3, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "xforcewolverineRecklessAbandon", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Dark City/DarkCity_X-ForceWolverine_RecklessAbandon.webp"}
        ]
    },
{
        id: 33,
        name: "Human Torch",
        cards: [
{id:129, heroName: "Human Torch", name: "Human Torch - Call for Backup", type: "Hero", rarity: "Common", team: "Fantastic Four", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "humanTorchCallForBackup", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_HumanTorch_CallForBackup.webp"},
{id:130, heroName: "Human Torch", name: "Human Torch - Hothead", type: "Hero", rarity: "Common 2", team: "Fantastic Four", class1: "Range", class2: "None", color: "Blue", cost: 4, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "humanTorchHothead", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_HumanTorch_Hothead.webp"},
{id:131, heroName: "Human Torch", name: "Human Torch - Flame On!", type: "Hero", rarity: "Uncommon", team: "Fantastic Four", class1: "Range", class2: "None", color: "Blue", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_HumanTorch_FlameOn.webp"},
{id:132, heroName: "Human Torch", name: "Human Torch - Nova Flame", type: "Hero", rarity: "Rare", team: "Fantastic Four", class1: "Range", class2: "None", color: "Blue", cost: 8, attack: 6, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "humanTorchNovaFlame", conditionType: "playedCards", condition: "Fantastic Four", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_HumanTorch_NovaFlame.webp"}
        ]
    },
    {
        id: 34,
        name: "Invisible Woman",
        cards: [
{id:133, heroName: "Invisible Woman", name: "Invisible Woman - Disappearing Act", type: "Hero", rarity: "Common", team: "Fantastic Four", class1: "Covert", class2: "None", color: "Red", cost: 4, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_InvisibleWoman_DisappearingAct.webp"},
{id:134, heroName: "Invisible Woman", name: "Invisible Woman - Four of a Kind", type: "Hero", rarity: "Common 2", team: "Fantastic Four", class1: "Range", class2: "None", color: "Blue", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "invisibleWomanFourOfAKind", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_InvisibleWoman_FourOfAKind.webp"},
{id:135, heroName: "Invisible Woman", name: "Invisible Woman - Unseen Rescue", type: "Hero", rarity: "Uncommon", team: "Fantastic Four", class1: "Covert", class2: "None", color: "Red", cost: 4, attack: 2, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_InvisibleWoman_UnseenRescue.webp"},
{id:136, heroName: "Invisible Woman", name: "Invisible Woman - Invisible Barrier", type: "Hero", rarity: "Rare", team: "Fantastic Four", class1: "Covert", class2: "None", color: "Red", cost: 7, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_InvisibleWoman_InvisibleBarrier.webp"}
        ]
    },
    {
        id: 35,
        name: "Mr. Fantastic",
        cards: [
{id:137, heroName: "Mr. Fantastic", name: "Mr. Fantastic - Twisting Equations", type: "Hero", rarity: "Common", team: "Fantastic Four", class1: "Tech", class2: "None", color: "Black", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_MrFantastic_TwistingEquations.webp"},
{id:138, heroName: "Mr. Fantastic", name: "Mr. Fantastic - Unstable Molecules", type: "Hero", rarity: "Common 2", team: "Fantastic Four", class1: "Tech", class2: "None", color: "Black", cost: 5, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "mrFantasticUnstableMolecules", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_MrFantastic_UnstableMolecules.webp"},
{id:139, heroName: "Mr. Fantastic", name: "Mr. Fantastic - One Gigantic Hand", type: "Hero", rarity: "Uncommon", team: "Fantastic Four", class1: "Instinct", class2: "None", color: "Yellow", cost: 5, attack: 1, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "mrFantasticOneGiganticHand", conditionType: "playedCards", condition: "Fantastic Four", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_MrFantastic_OneGiganticHand.webp"},
{id:140, heroName: "Mr. Fantastic", name: "Mr. Fantastic - Ultimate Nullifier", type: "Hero", rarity: "Rare", team: "Fantastic Four", class1: "Tech", class2: "None", color: "Black", cost: 7, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_MrFantastic_UltimateNullifier.webp"}
        ]
    },
    {
        id: 36,
        name: "Silver Surfer",
        cards: [
{id:141, heroName: "Silver Surfer", name: "Silver Surfer - Warp Speed", type: "Hero", rarity: "Common", team: "None", class1: "Covert", class2: "None", color: "Red", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_SilverSurfer_WarpSpeed.webp"},
{id:142, heroName: "Silver Surfer", name: "Silver Surfer - Epic Destiny", type: "Hero", rarity: "Common 2", team: "None", class1: "Strength", class2: "None", color: "Green", cost: 4, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_SilverSurfer_EpicDestiny.webp"},
{id:143, heroName: "Silver Surfer", name: "Silver Surfer - The Power Cosmic", type: "Hero", rarity: "Uncommon", team: "None", class1: "Range", class2: "None", color: "Blue", cost: 6, attack: 0, recruit: 3, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_SilverSurfer_ThePowerCosmic.webp"},
{id:144, heroName: "Silver Surfer", name: "Silver Surfer - Energy Surge", type: "Hero", rarity: "Rare", team: "None", class1: "Range", class2: "None", color: "Blue", cost: 7, attack: 0, recruit: 0, attackIcon: false, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "silverSurferEnergySurge", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_SilverSurfer_EnergySurge.webp"}
        ]
    },
    {
        id: 37,
        name: "Thing",
        cards: [
{id:145, heroName: "Thing", name: "Thing - It Started on Yancy Street", type: "Hero", rarity: "Common", team: "Fantastic Four", class1: "Instinct", class2: "None", color: "Yellow", cost: 3, attack: 0, recruit: 2, attackIcon: false, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "thingItStartedOnYancyStreet", conditionType: "playedCards", condition: "Fantastic Four", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_Thing_ItStartedOnYancyStreet.webp"},
{id:146, heroName: "Thing", name: "Thing - Knuckle Sandwich", type: "Hero", rarity: "Common 2", team: "Fantastic Four", class1: "Strength", class2: "None", color: "Green", cost: 5, attack: 0, recruit: 3, attackIcon: true, recruitIcon: true, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "None", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_Thing_KnuckleSandwich.webp"},
{id:147, heroName: "Thing", name: "Thing - Crime Stopper", type: "Hero", rarity: "Uncommon", team: "Fantastic Four", class1: "Strength", class2: "None", color: "Green", cost: 6, attack: 4, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 0, bonusRecruit: 0, multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", unconditionalAbility: "thingCrimeStopper", conditionalAbility: "None", conditionType: "None", condition: "None", invulnerability: "None", keyword1: "Focus", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_Thing_CrimeStopper.webp"},
{id:148, heroName: "Thing", name: "Thing - It's Clobberin' Time!", type: "Hero", rarity: "Rare", team: "Fantastic Four", class1: "Strength", class2: "None", color: "Green", cost: 8, attack: 5, recruit: 0, attackIcon: true, recruitIcon: false, bonusAttack: 3, bonusRecruit: 0, multiplier: "Green", multiplierAttribute: "color", multiplierLocation: "playedCards", unconditionalAbility: "None", conditionalAbility: "thingItsClobberinTime", conditionType: "playedCards", condition: "Strength", invulnerability: "None", image: "Visual Assets/Heroes/Fantastic Four/FantasticFour_Thing_ItsClobberinTime.webp"}
        ]
    }

];





const keywordDescriptions = {
    "Focus": `When you play a card with a Focus ability, you can pay the cost on the left side of the arrow to get the effect on the right side of the arrow. You can use that Focus ability as many times as you want for the rest of the turn. Access Focus abilities in the Played Cards popup.`,
    "Burrow": `Fight: If the Streets were empty, put this Villain back into the Streets.`,
    "Cosmic Threat": `Once per turn, you can reveal any number of cards that match the specified class (or one of the possible classes). For each revealed card, this Enemy gets -3<img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> this turn. If you try to fight a Mastermind with Cosmic Threat a second time in the same turn, it will return to its full <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
    "Investigate": `Look at the top two cards of your deck. If you find the right card, draw it. Put the rest of the cards back on the top and/or bottom of your deck in any order.`,
    "Phasing": `You may swap this card with the top card of your deck. This is not counted as playing or drawing a card.`,
    "Shatter": `Halve that enemy's current <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> (rounding up to the nearest whole number) until the end of this turn.`,
    "Teleport": `Instead of playing this card, you may set it aside. At the end of this turn, add it to your new hand as an extra card.`,
    "Versatile": `Choose to use the specified amount as <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> or <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">`,
    "Bribe": `You can fight Villains and Masterminds with this keyword by spending any combination of <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and/or <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> points.`,
"Domino - Lucky Break Errata": `There should be a printed <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon behind the top "0+" on the side of the card.`,
"Emma Frost - Diamond Form Errata": `There should be a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon on this card that reads "0+.`,
"Emma Frost - Shadowed Thoughts Errata": `This card's <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> should read "2+" instead of "2".`,
"Nick Fury - High Tech Weaponry Errata": `This card's <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> should read "2+" instead of "2".`,
"Vertigo - Errata": `The text on this card is a Fight effect.`
};


window.henchmen = henchmen;
window.villains = villains;


window.heroes = heroes;
