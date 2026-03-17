import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   AZARUS TRAINING PLATFORM — ALL-IN-ONE
   Game 1: Les Fondations (Modules 1-4)
   Game 2: L'Exécution (Modules 5-8)
   Game 3: L'Intermédiaire (MTF, OB, Fib, Confluence)
   ═══════════════════════════════════════════════════════════════ */

// ─── TRANSLATIONS ───────────────────────────────────────────────
const L = {
  fr: {
    platform: "AZARUS TRAINING PLATFORM",
    home: "Accueil", lang: "EN", next: "SUIVANT", correct: "Correct!", wrong: "Incorrect",
    complete: "NIVEAU COMPLÉTÉ!", nextLvl: "NIVEAU SUIVANT", backMenu: "← Menu du jeu",
    backHome: "← Accueil", streak: "Série", accuracy: "Précision", correct2: "Bonnes réponses",
    progress: "Progression", restartLvl: "Recommencer", resetAll: "Réinitialiser tout",
    certTitle: "CERTIFICAT DE RÉUSSITE", certSub: "A complété avec succès la formation",
    certBy: "Délivré par AZARUS Trading Academy", getName: "Entre ton nom:",
    namePh: "Ton nom complet", download: "TÉLÉCHARGER LE CERTIFICAT",
    score: "Score", passed: "RÉUSSI", mod: "Module",
    trueL: "VRAI", falseL: "FAUX", scenario: "⚔️ SCÉNARIO",
    shouldTrade: "Ce trade se prend?", yes: "OUI", no: "NON",
    games: [
      { title: "LES FONDATIONS", sub: "Modules 1–4 · Price Action & Structure", icon: "🕯️",
        cert: "LES FONDATIONS DU PRICE ACTION",
        lvl: ["Chandeliers Japonais","Structure de Marché","Momentum & Volume","Sessions & Liquidité"],
        lvlD: ["Lis les bougies comme un pro","Tendances et niveaux clés","Force derrière les mouvements","Timing des sessions"],
        lvlIcons: ["🕯️","📈","⚡","🌍"] },
      { title: "L'EXÉCUTION", sub: "Modules 5–8 · Stratégie, Patterns & Discipline", icon: "🎯",
        cert: "L'EXÉCUTION DU PRICE ACTION",
        lvl: ["Stratégie d'Entrée","Patterns de Prix","Psychologie & Discipline","Routine Quotidienne"],
        lvlD: ["Maîtrise le trade fondamental","Flags, triangles et contexte","Contrôle ton mental","Bâtis ta routine de pro"],
        lvlIcons: ["🎯","📐","🧠","📋"] },
      { title: "L'INTERMÉDIAIRE", sub: "MTF, Order Blocks, Fibonacci & Confluence", icon: "🔍",
        cert: "TRADING INTERMÉDIAIRE — PRICE ACTION AVANCÉ",
        lvl: ["MTF & Order Blocks","Patterns Avancés & Fibonacci","Trade Management & Confluence","Backtesting & Plan"],
        lvlD: ["Analyse multi-timeframe","Double tops, H&S, wedges, Fibonacci","Partiels, breakeven, setups A+","Teste et planifie"],
        lvlIcons: ["🔍","📐","⚙️","📊"] },
    ],
    selectGame: "Choisis ta formation",
    totalProgress: "Progression globale",
  },
  en: {
    platform: "AZARUS TRAINING PLATFORM",
    home: "Home", lang: "FR", next: "NEXT", correct: "Correct!", wrong: "Incorrect",
    complete: "LEVEL COMPLETE!", nextLvl: "NEXT LEVEL", backMenu: "← Game menu",
    backHome: "← Home", streak: "Streak", accuracy: "Accuracy", correct2: "Correct answers",
    progress: "Progress", restartLvl: "Restart", resetAll: "Reset all",
    certTitle: "CERTIFICATE OF COMPLETION", certSub: "Has successfully completed the training",
    certBy: "Issued by AZARUS Trading Academy", getName: "Enter your name:",
    namePh: "Your full name", download: "DOWNLOAD CERTIFICATE",
    score: "Score", passed: "PASSED", mod: "Module",
    trueL: "TRUE", falseL: "FALSE", scenario: "⚔️ SCENARIO",
    shouldTrade: "Should this trade be taken?", yes: "YES", no: "NO",
    games: [
      { title: "THE FOUNDATIONS", sub: "Modules 1–4 · Price Action & Structure", icon: "🕯️",
        cert: "PRICE ACTION FOUNDATIONS",
        lvl: ["Japanese Candlesticks","Market Structure","Momentum & Volume","Sessions & Liquidity"],
        lvlD: ["Read candles like a pro","Trends and key levels","Force behind the moves","Session timing"],
        lvlIcons: ["🕯️","📈","⚡","🌍"] },
      { title: "THE EXECUTION", sub: "Modules 5–8 · Strategy, Patterns & Discipline", icon: "🎯",
        cert: "PRICE ACTION EXECUTION",
        lvl: ["Entry Strategy","Price Patterns","Psychology & Discipline","Daily Routine"],
        lvlD: ["Master the foundational trade","Flags, triangles & context","Control your mindset","Build your pro routine"],
        lvlIcons: ["🎯","📐","🧠","📋"] },
      { title: "THE INTERMEDIATE", sub: "MTF, Order Blocks, Fibonacci & Confluence", icon: "🔍",
        cert: "INTERMEDIATE — ADVANCED PRICE ACTION",
        lvl: ["MTF & Order Blocks","Advanced Patterns & Fibonacci","Trade Management & Confluence","Backtesting & Plan"],
        lvlD: ["Multi-timeframe analysis","Double tops, H&S, wedges, Fibonacci","Partials, breakeven, A+ setups","Test and plan"],
        lvlIcons: ["🔍","📐","⚙️","📊"] },
    ],
    selectGame: "Choose your training",
    totalProgress: "Overall progress",
  },
};

// ─── ALL QUESTIONS ──────────────────────────────────────────────
const ALL_Q = {
  // GAME 1 — Foundations
  0: {
    1: [
      {v:"marubozu",fr:{q:"Quel type de bougie est représenté?",o:["Marubozu haussier","Pin Bar","Doji","Engulfing"],c:0,e:"Marubozu = pas de mèche, conviction extrême."},en:{q:"What candle type is shown?",o:["Bullish Marubozu","Pin Bar","Doji","Engulfing"],c:0,e:"Marubozu = no wicks, extreme conviction."}},
      {v:"pinbar",fr:{q:"Identifie cette bougie:",o:["Marubozu","Pin Bar baissier","Doji","Engulfing"],c:1,e:"Longue mèche + petit corps = Pin Bar."},en:{q:"Identify this candle:",o:["Marubozu","Bearish Pin Bar","Doji","Engulfing"],c:1,e:"Long wick + small body = Pin Bar."}},
      {v:"doji",fr:{q:"Que représente cette bougie?",o:["Pin Bar","Marubozu","Doji","Hammer"],c:2,e:"Corps minuscule + mèches longues = Doji."},en:{q:"What does this candle represent?",o:["Pin Bar","Marubozu","Doji","Hammer"],c:2,e:"Tiny body + long wicks = Doji."}},
      {fr:{q:"Bougie verte signifie:",o:["Clôture > ouverture","Clôture < ouverture","Indécision","Volume élevé"],c:0,e:"Verte = clôture au-dessus de l'ouverture."},en:{q:"Green candle means:",o:["Close > open","Close < open","Indecision","High volume"],c:0,e:"Green = close above open."}},
      {fr:{q:"4 composantes d'un chandelier:",o:["Open, Close, High, Low","Volume, Spread, Range, Body","Support, Résistance, Tendance","Bid, Ask, Spread, Volume"],c:0,e:"O, C, H, L."},en:{q:"4 candlestick components:",o:["Open, Close, High, Low","Volume, Spread, Range, Body","Support, Resistance, Trend","Bid, Ask, Spread, Volume"],c:0,e:"O, C, H, L."}},
      {v:"engulfing",fr:{q:"Cette formation est:",o:["Double Doji","Engulfing haussier","Pin Bar","Bear Flag"],c:1,e:"Grosse verte englobe la rouge = Engulfing."},en:{q:"This formation is:",o:["Double Doji","Bullish Engulfing","Pin Bar","Bear Flag"],c:1,e:"Large green engulfs red = Engulfing."}},
      {fr:{q:"Longue mèche =",o:["Zone testée puis rejetée","Gap","Volume élevé","Erreur"],c:0,e:"Mèche = rejet."},en:{q:"Long wick =",o:["Zone tested then rejected","Gap","High volume","Error"],c:0,e:"Wick = rejection."}},
      {fr:{q:"Marché le plus liquide:",o:["Forex","Crypto","Actions","Commodités"],c:0,e:"Forex = #1."},en:{q:"Most liquid market:",o:["Forex","Crypto","Stocks","Commodities"],c:0,e:"Forex = #1."}},
    ],
    2: [
      {v:"uptrend",fr:{q:"Quelle structure?",o:["Uptrend (HH/HL)","Downtrend (LL/LH)","Range","Reversal"],c:0,e:"HH + HL = uptrend."},en:{q:"What structure?",o:["Uptrend (HH/HL)","Downtrend (LL/LH)","Range","Reversal"],c:0,e:"HH + HL = uptrend."}},
      {v:"downtrend",fr:{q:"Quelle structure?",o:["Uptrend","Downtrend (LL/LH)","Range","Bull Flag"],c:1,e:"LL + LH = downtrend."},en:{q:"What structure?",o:["Uptrend","Downtrend (LL/LH)","Range","Bull Flag"],c:1,e:"LL + LH = downtrend."}},
      {fr:{q:"Touches min trendline valide?",o:["1","2","3","5"],c:2,e:"3 = valide."},en:{q:"Min touches valid trendline?",o:["1","2","3","5"],c:2,e:"3 = valid."}},
      {fr:{q:"Role Reversal =",o:["Support cassé → résistance","Changement TF","Retournement","Gap"],c:0,e:"Très fiable."},en:{q:"Role Reversal =",o:["Broken support → resistance","TF change","Reversal","Gap"],c:0,e:"Very reliable."}},
      {fr:{q:"En range?",o:["Acheter","Vendre","Attendre sortie ou rien","Doubler"],c:2,e:"Attendre."},en:{q:"In range?",o:["Buy","Sell","Wait or nothing","Double"],c:2,e:"Wait."}},
      {fr:{q:"Conseil #1 instruments:",o:["5 instruments","UNE paire","Changer/jour","Bitcoin only"],c:1,e:"Profondeur > largeur."},en:{q:"#1 instrument tip:",o:["5 instruments","ONE pair","Change daily","Bitcoin only"],c:1,e:"Depth > breadth."}},
      {fr:{q:"En uptrend:",o:["Vendre sommet","Acheter pullbacks","Shorter","Range"],c:1,e:"Acheter pullbacks."},en:{q:"In uptrend:",o:["Sell top","Buy pullbacks","Short","Range"],c:1,e:"Buy pullbacks."}},
    ],
    3: [
      {v:"momentum_strong",fr:{q:"Cette lecture:",o:["Momentum fort","Essoufflement","Range","Reversal"],c:0,e:"Grosses bougies = conviction."},en:{q:"This reading:",o:["Strong momentum","Exhaustion","Range","Reversal"],c:0,e:"Large candles = conviction."}},
      {v:"momentum_weak",fr:{q:"Cette lecture:",o:["Momentum fort","Move 'off'","Breakout","Londres"],c:1,e:"Petites bougies = off."},en:{q:"This reading:",o:["Strong momentum","'Off' move","Breakout","London"],c:1,e:"Small candles = off."}},
      {fr:{q:"Volume fort + direction =",o:["Continuation","Faux move","Reversal","Sortir"],c:0,e:"Réel."},en:{q:"Strong vol + direction =",o:["Continuation","False move","Reversal","Exit"],c:0,e:"Real."}},
      {fr:{q:"Volume Forex =",o:["Dollars","Tick volume","Traders","Spread"],c:1,e:"Tick = relatif."},en:{q:"Forex volume =",o:["Dollars","Tick volume","Traders","Spread"],c:1,e:"Tick = relative."}},
      {fr:{q:"Vol bas en conso:",o:["Alarme","Normal","Reversal","Erreur"],c:1,e:"Normal."},en:{q:"Low vol consolidation:",o:["Warning","Normal","Reversal","Error"],c:1,e:"Normal."}},
      {fr:{q:"Rejet + vol fort niveau clé:",o:["Pas important","Solide, défendu","Gap","Changer TF"],c:1,e:"Défendu."},en:{q:"Rejection + vol at key level:",o:["Unimportant","Solid, defended","Gap","Switch TF"],c:1,e:"Defended."}},
      {fr:{q:"Move lent, petites bougies:",o:["Achat","Essoufflement — piège","Conviction","Breakout"],c:1,e:"Piège."},en:{q:"Slow, small candles:",o:["Buy","Exhaustion — trap","Conviction","Breakout"],c:1,e:"Trap."}},
    ],
    4: [
      {fr:{q:"Horaires Londres (EST):",o:["3h–12h","8h–17h","19h–4h","12h–21h"],c:0,e:"3h-12h."},en:{q:"London hours (EST):",o:["3AM–12PM","8AM–5PM","7PM–4AM","12PM–9PM"],c:0,e:"3AM-12PM."}},
      {fr:{q:"Londres prend HIGH asiatique → NY:",o:["Baissier → LOW","Haussier","Pas de biais","Neutre"],c:0,e:"→ NY vise LOW."},en:{q:"London takes Asian HIGH → NY:",o:["Bearish → LOW","Bullish","No bias","Neutral"],c:0,e:"→ NY targets LOW."}},
      {fr:{q:"Haute liquidité:",o:["Au-dessus sommets / sous creux","Ronds only","Milieu","Hauts TF"],c:0,e:"Extrêmes."},en:{q:"High liquidity:",o:["Above highs / below lows","Round only","Mid","Higher TF"],c:0,e:"Extremes."}},
      {fr:{q:"Sweep =",o:["Casse puis revient","Gap","Annonce","Session"],c:0,e:"Stops puis reverse."},en:{q:"Sweep =",o:["Breaks then reverses","Gap","News","Session"],c:0,e:"Stops then reverse."}},
      {fr:{q:"15-20 min début session:",o:["Pièges liquidité","Meilleures entrées","Pas de vol","Scalp"],c:0,e:"Patience = edge."},en:{q:"First 15-20 min:",o:["Liquidity traps","Best entries","Low vol","Scalp"],c:0,e:"Patience = edge."}},
      {fr:{q:"Session asiatique:",o:["Faible vol, range","Forte vol","Meilleurs setups","Vol max"],c:0,e:"Range."},en:{q:"Asian session:",o:["Low vol, range","High vol","Best setups","Max vol"],c:0,e:"Range."}},
      {fr:{q:"Londres + NY même dir:",o:["Suivre","Reversal","Range","Contre"],c:0,e:"Suivre."},en:{q:"London + NY same dir:",o:["Follow","Reversal","Range","Counter"],c:0,e:"Follow."}},
    ],
  },
  // GAME 2 — Execution
  1: {
    1: [
      {fr:{q:"Trade fondamental:",o:["Rebond trendline","Scalping","Breakout","Swing weekly"],c:0,e:"Trendline + rejet."},en:{q:"Foundational trade:",o:["Trendline bounce","Scalping","Breakout","Weekly swing"],c:0,e:"Trendline + rejection."}},
      {fr:{q:"Règle d'or TP:",o:["5-15 pips AVANT zone clé","Sur zone","50 pips après","Sans TP"],c:0,e:"Avant la zone."},en:{q:"TP golden rule:",o:["5-15 pips BEFORE key zone","On zone","50 past","No TP"],c:0,e:"Before the zone."}},
      {fr:{q:"Risque max débutant:",o:["5%","1%","10%","0.1%"],c:1,e:"1% = survie."},en:{q:"Max risk beginner:",o:["5%","1%","10%","0.1%"],c:1,e:"1% = survival."}},
      {fr:{q:"R/R minimum:",o:["1:1","1:2","1:3","2:1"],c:1,e:"1:2 = rentable à 40% WR."},en:{q:"Min R/R:",o:["1:1","1:2","1:3","2:1"],c:1,e:"1:2 = profitable at 40% WR."}},
      {fr:{q:"Rebond trendline = haute proba car:",o:["Confluence","Incassable","Volume","Indicateur"],c:0,e:"Confluence."},en:{q:"Trendline bounce = high prob:",o:["Confluence","Unbreakable","Volume","Indicator"],c:0,e:"Confluence."}},
      {t:"tf",fr:{q:"On peut déplacer son SL dans le mauvais sens.",c:false,e:"JAMAIS."},en:{q:"You can move SL wrong direction.",c:false,e:"NEVER."}},
      {fr:{q:"10k × 1%, SL 20 pips:",o:["100$","200$","50$","1000$"],c:0,e:"100$."},en:{q:"$10K × 1%, SL 20 pips:",o:["$100","$200","$50","$1K"],c:0,e:"$100."}},
      {t:"tf",fr:{q:"Max 1-2 positions simultanées.",c:true,e:"Concentration > dispersion."},en:{q:"Max 1-2 simultaneous positions.",c:true,e:"Concentration > dispersion."}},
    ],
    2: [
      {v:"bull_flag",fr:{q:"Quel pattern?",o:["Bull Flag","Bear Flag","Double Top","H&S"],c:0,e:"Mât + consolidation = Bull Flag."},en:{q:"What pattern?",o:["Bull Flag","Bear Flag","Double Top","H&S"],c:0,e:"Pole + consolidation = Bull Flag."}},
      {v:"bear_flag",fr:{q:"Identifie:",o:["Bull Flag","Bear Flag","Triangle","Cup & Handle"],c:1,e:"Mât baissier = Bear Flag."},en:{q:"Identify:",o:["Bull Flag","Bear Flag","Triangle","Cup & Handle"],c:1,e:"Bearish pole = Bear Flag."}},
      {fr:{q:"Volume pendant flag conso:",o:["Doit diminuer puis augmenter","Constant","Fort","Pas important"],c:0,e:"Bas → fort à la cassure."},en:{q:"Volume during flag:",o:["Decrease then increase","Constant","Strong","Doesn't matter"],c:0,e:"Low → strong at break."}},
      {t:"tf",fr:{q:"Triangle après drop fort = Bear Flag.",c:true,e:"Flag sous autre forme."},en:{q:"Triangle after strong drop = Bear Flag.",c:true,e:"Flag in different form."}},
      {fr:{q:"Objectif prix flag:",o:["Hauteur mât depuis cassure","Double conso","Mèche","Impossible"],c:0,e:"Hauteur mât."},en:{q:"Flag target:",o:["Pole height from breakout","Double conso","Wick","Can't"],c:0,e:"Pole height."}},
      {fr:{q:"Flag qualité:",o:["Tendance + structure + niveau","Forme seule","RSI","Vol constant"],c:0,e:"Contexte = roi."},en:{q:"Quality flag:",o:["Trend + structure + level","Shape only","RSI","Constant vol"],c:0,e:"Context = king."}},
      {t:"tf",fr:{q:"Flag isolé = bon setup.",c:false,e:"Sans contexte = rien."},en:{q:"Isolated flag = good setup.",c:false,e:"Without context = nothing."}},
    ],
    3: [
      {t:"sc",fr:{q:"Tu as manqué un trade parfait. Le prix monte sans toi.",o:["Entrer maintenant","Laisser passer — FOMO","Position double","Changer paire"],c:1,e:"FOMO."},en:{q:"Missed perfect trade. Price flying.",o:["Enter now","Let go — FOMO","Double","Switch"],c:1,e:"FOMO."}},
      {t:"sc",fr:{q:"2 pertes. Un setup moyen apparaît.",o:["Entrer","Plus gros","Fermer — revenge","Demander avis"],c:2,e:"Revenge trading."},en:{q:"2 losses. Mediocre setup.",o:["Enter","Bigger","Close — revenge","Ask friend"],c:2,e:"Revenge trading."}},
      {fr:{q:"Bon journal:",o:["Screenshot, entrée, SL, TP, raison, résultat","Juste pips","Gains only","Hebdo"],c:0,e:"Complet."},en:{q:"Good journal:",o:["Screenshot, entry, SL, TP, reason, result","Just pips","Wins only","Weekly"],c:0,e:"Complete."}},
      {t:"tf",fr:{q:"Après gains, augmenter la taille.",c:false,e:"Règle fixe, pas l'humeur."},en:{q:"After wins, increase size.",c:false,e:"Fixed rule, not mood."}},
      {t:"sc",fr:{q:"Long XAU. Prix approche SL. 'Ça va remonter.'",o:["Déplacer SL","Doubler","Ne rien toucher — SL sacré","Fermer"],c:2,e:"SL sacré."},en:{q:"Long XAU. Price nearing SL. 'It'll come back.'",o:["Move SL","Double","Don't touch — sacred","Close"],c:2,e:"Sacred SL."}},
      {t:"tf",fr:{q:"Ne rien faire = valide.",c:true,e:"Patience = stratégie."},en:{q:"Doing nothing = valid.",c:true,e:"Patience = strategy."}},
      {fr:{q:"Confirmation parfaite, jamais entrer:",o:["FOMO","Revenge","Paralysie d'analyse","Excès confiance"],c:2,e:"Critères = entrer."},en:{q:"Perfect confirmation, never entering:",o:["FOMO","Revenge","Analysis Paralysis","Overconfidence"],c:2,e:"Criteria met = enter."}},
    ],
    4: [
      {fr:{q:"1ère étape pré-marché:",o:["Contexte Daily","Entrer trade","Twitter","5 paires"],c:0,e:"Contexte d'abord."},en:{q:"1st pre-market step:",o:["Daily context","Enter trade","Twitter","5 pairs"],c:0,e:"Context first."}},
      {t:"ck",fr:{q:"Uptrend HH/HL. Trendline 3 touches. Pin Bar. Volume ok. SL logique. TP avant résistance. R/R=1:2.5. Pas forcé. Pas annonce. 0 pertes.",c:true,e:"100% = GO!"},en:{q:"Clear uptrend. 3 touches. Pin Bar. Volume ok. SL logical. TP before resistance. R/R=1:2.5. Not forced. No news. 0 losses.",c:true,e:"100% = GO!"}},
      {t:"ck",fr:{q:"Structure floue. 1 touche. Pas de rejet. Vol faible. R/R=1:1.5. Tu forces. NFP 20 min. 2 pertes.",c:false,e:"NON."},en:{q:"Unclear. 1 touch. No rejection. Low vol. R/R=1:1.5. Forcing. NFP 20 min. 2 losses.",c:false,e:"NO."}},
      {fr:{q:"Après perte, 1er:",o:["Journaliser","Nouveau trade","Augmenter","Changer TF"],c:0,e:"Journal."},en:{q:"After loss, first:",o:["Journal","New trade","Increase","Switch TF"],c:0,e:"Journal."}},
      {t:"tf",fr:{q:"Trader 30 min avant NFP.",c:false,e:"Pas avant/après annonces."},en:{q:"Trade 30 min before NFP.",c:false,e:"Not before/after news."}},
      {fr:{q:"15-20 min début session:",o:["Chasse liquidité","Meilleurs setups","Daily","Ferme positions"],c:0,e:"Observer = edge."},en:{q:"First 15-20 min:",o:["Liquidity hunt","Best setups","Daily","Close positions"],c:0,e:"Observe = edge."}},
      {t:"tf",fr:{q:"Après SL, attendre 5 min.",c:true,e:"Ne pas enchaîner."},en:{q:"After SL, wait 5 min.",c:true,e:"Don't chain."}},
    ],
  },
  // GAME 3 — Intermediate
  2: {
    1: [
      {fr:{q:"Direction dictée par:",o:["HTF","LTF","M1","Volume"],c:0,e:"HTF = direction."},en:{q:"Direction by:",o:["HTF","LTF","M1","Volume"],c:0,e:"HTF = direction."}},
      {fr:{q:"Ordre Top-Down:",o:["Daily→H4→H1","M15→H1→H4","H1→Daily→Weekly","M5→M15→H1"],c:0,e:"Toujours du haut."},en:{q:"Top-Down order:",o:["Daily→H4→H1","M15→H1→H4","H1→Daily→Weekly","M5→M15→H1"],c:0,e:"Always from top."}},
      {fr:{q:"Daily haussier + H4 haussier + H1 achat =",o:["Setup A+","B","C","Ne pas trader"],c:0,e:"3 TF alignés = A+."},en:{q:"Daily bull + H4 bull + H1 buy =",o:["A+ setup","B","C","Don't trade"],c:0,e:"3 TF aligned = A+."}},
      {t:"tf",fr:{q:"Achat M15 ok si Daily baissier.",c:false,e:"JAMAIS contre HTF."},en:{q:"Buy M15 ok if Daily bearish.",c:false,e:"NEVER against HTF."}},
      {fr:{q:"Bullish OB =",o:["Dernière bougie baissière avant move haussier","Support","Bougie verte","Gap"],c:0,e:"Dernière rouge avant le move."},en:{q:"Bullish OB =",o:["Last bearish candle before bullish move","Support","Green candle","Gap"],c:0,e:"Last red before the move."}},
      {fr:{q:"OB valide nécessite:",o:["BOS","Mèche","Doji","Gap"],c:0,e:"Sans BOS = pas OB."},en:{q:"Valid OB requires:",o:["BOS","Wick","Doji","Gap"],c:0,e:"Without BOS = not OB."}},
      {fr:{q:"FVG =",o:["Trou entre bougie 1 et 3","Support","Pattern","Indicateur"],c:0,e:"Gap impulsif."},en:{q:"FVG =",o:["Gap between candle 1 and 3","Support","Pattern","Indicator"],c:0,e:"Impulsive gap."}},
      {t:"tf",fr:{q:"FVG HTF > FVG LTF.",c:true,e:"HTF = plus significatif."},en:{q:"HTF FVG > LTF FVG.",c:true,e:"HTF = more significant."}},
    ],
    2: [
      {fr:{q:"Double Top signale:",o:["Retournement baissier","Continuation","Range","Breakout"],c:0,e:"Épuisement."},en:{q:"Double Top signals:",o:["Bearish reversal","Continuation","Range","Breakout"],c:0,e:"Exhaustion."}},
      {fr:{q:"Confirmation Double Top:",o:["Cassure neckline + volume","Deux sommets","Doji","Session"],c:0,e:"Neckline."},en:{q:"Double Top confirmation:",o:["Neckline break + volume","Two peaks","Doji","Session"],c:0,e:"Neckline."}},
      {fr:{q:"H&S volume:",o:["Diminuer épaule G→D, exploser cassure","Constant","Augmenter","Pas important"],c:0,e:"Décroissant + explosion."},en:{q:"H&S volume:",o:["Decrease L→R shoulder, explode at break","Constant","Increase","Doesn't matter"],c:0,e:"Decreasing + explosion."}},
      {fr:{q:"Rising Wedge =",o:["Baissier (~65%)","Haussier","Neutre","Dépend volume"],c:0,e:"Baissier."},en:{q:"Rising Wedge =",o:["Bearish (~65%)","Bullish","Neutral","Depends vol"],c:0,e:"Bearish."}},
      {fr:{q:"Golden Ratio:",o:["23.6%","38.2%","50%","61.8%"],c:3,e:"61.8% = #1."},en:{q:"Golden Ratio:",o:["23.6%","38.2%","50%","61.8%"],c:3,e:"61.8% = #1."}},
      {fr:{q:"Retracement 23.6% =",o:["Tendance très forte","Faible","Reversal","Range"],c:0,e:"Très forte."},en:{q:"23.6% retrace =",o:["Very strong trend","Weak","Reversal","Range"],c:0,e:"Very strong."}},
      {fr:{q:"Extensions Fibonacci:",o:["Objectifs TP","Entrées","Volume","Spread"],c:0,e:"Objectifs."},en:{q:"Fib extensions:",o:["TP targets","Entries","Volume","Spread"],c:0,e:"Targets."}},
      {fr:{q:"Meilleure combo Fib:",o:["61.8% entrée + 161.8% TP","23.6% + 38.2%","100% + 200%","Pas fiable"],c:0,e:"61.8% → 161.8%."},en:{q:"Best Fib combo:",o:["61.8% entry + 161.8% TP","23.6% + 38.2%","100% + 200%","Not reliable"],c:0,e:"61.8% → 161.8%."}},
    ],
    3: [
      {fr:{q:"Partiels recommandés:",o:["50% à 1:1, 25% à 1:2, 25% runner","Tout à 1:1","Tout courir","90% à 1:1"],c:0,e:"50/25/25."},en:{q:"Recommended partials:",o:["50% at 1:1, 25% at 1:2, 25% runner","All at 1:1","All run","90% at 1:1"],c:0,e:"50/25/25."}},
      {fr:{q:"Quand breakeven?",o:["Après 1:1 R/R","Immédiatement","5 minutes","Jamais"],c:0,e:"1:1 = BE."},en:{q:"When breakeven?",o:["After 1:1 R/R","Immediately","5 minutes","Never"],c:0,e:"1:1 = BE."}},
      {t:"tf",fr:{q:"BE le plus tôt possible.",c:false,e:"Trop tôt = bruit du marché."},en:{q:"BE as early as possible.",c:false,e:"Too early = market noise."}},
      {fr:{q:"Trailing stop:",o:["Sous chaque nouveau HL","Distance fixe","Sous chaque bougie","Pas de trailing"],c:0,e:"Structure du marché."},en:{q:"Trailing stop:",o:["Below each new HL","Fixed distance","Below each candle","No trailing"],c:0,e:"Market structure."}},
      {fr:{q:"Confluence =",o:["Plusieurs facteurs au même endroit","Un indicateur","Volume seul","Sentiment"],c:0,e:"Plus = mieux."},en:{q:"Confluence =",o:["Multiple factors at same spot","One indicator","Volume only","Sentiment"],c:0,e:"More = better."}},
      {fr:{q:"Setup A+ minimum:",o:["2 confluences","3","4+","1 suffit"],c:2,e:"4+ = A+."},en:{q:"A+ setup minimum:",o:["2 confluences","3","4+","1 enough"],c:2,e:"4+ = A+."}},
      {t:"tf",fr:{q:"2-3 trades A+/semaine > 10 trades B/C.",c:true,e:"Qualité > quantité."},en:{q:"2-3 A+ trades/week > 10 B/C trades.",c:true,e:"Quality > quantity."}},
    ],
    4: [
      {fr:{q:"Backtesting sert à:",o:["Vérifier stratégie sur historique","Prédire","Indicateurs","Copier"],c:0,e:"Tester avant de risquer."},en:{q:"Backtesting is for:",o:["Verify strategy on history","Predict","Indicators","Copy"],c:0,e:"Test before risking."}},
      {fr:{q:"Min trades backtest fiable:",o:["5-10","15-20","30-50 minimum","100"],c:2,e:"50-100."},en:{q:"Min trades reliable backtest:",o:["5-10","15-20","30-50 minimum","100"],c:2,e:"50-100."}},
      {fr:{q:"Profit Factor =",o:["Gains / Pertes","WR × R/R","Trades gagnants","Spread"],c:0,e:"> 1.5 = bon."},en:{q:"Profit Factor =",o:["Gains / Losses","WR × R/R","Winning trades","Spread"],c:0,e:"> 1.5 = good."}},
      {fr:{q:"Max Drawdown acceptable:",o:["< 10%","< 30%","< 50%","Pas de limite"],c:0,e:"< 10%."},en:{q:"Acceptable Max Drawdown:",o:["< 10%","< 30%","< 50%","No limit"],c:0,e:"< 10%."}},
      {fr:{q:"Plan de trading inclut:",o:["Instruments, sessions, setup, risque, gestion, psycho, revue","Instruments seuls","Risque seul","Profit mensuel"],c:0,e:"TOUT."},en:{q:"Trading plan includes:",o:["Instruments, sessions, setup, risk, mgmt, psycho, review","Instruments only","Risk only","Monthly profit"],c:0,e:"EVERYTHING."}},
      {t:"tf",fr:{q:"Plan négociable selon l'humeur.",c:false,e:"NON-NÉGOCIABLE."},en:{q:"Plan negotiable by mood.",c:false,e:"NON-NEGOTIABLE."}},
      {fr:{q:"Max instruments intermédiaire:",o:["8-10","2-3","1","Illimité"],c:1,e:"2-3 max."},en:{q:"Max instruments intermediate:",o:["8-10","2-3","1","Unlimited"],c:1,e:"2-3 max."}},
      {fr:{q:"Revue performance:",o:["Chaque trade + dimanche","Jamais","Mensuelle","Quand on perd"],c:0,e:"Trade + hebdo."},en:{q:"Performance review:",o:["Every trade + Sunday","Never","Monthly","When losing"],c:0,e:"Trade + weekly."}},
    ],
  },
};

// ─── VISUAL COMPONENTS ──────────────────────────────────────────
const Scarab=({s=50})=><svg width={s} height={s} viewBox="0 0 80 80" style={{animation:"scarabF 4s ease-in-out infinite",filter:"drop-shadow(0 0 6px rgba(34,197,94,.3))"}}><ellipse cx="40" cy="48" rx="16" ry="20" fill="url(#shA)" stroke="#15803d" strokeWidth="1.5"/><line x1="40" y1="30" x2="40" y2="66" stroke="#15803d" strokeWidth="1" opacity=".5"/><ellipse cx="40" cy="27" rx="11" ry="7" fill="#1a472a" stroke="#22c55e" strokeWidth="1.5"/><circle cx="35" cy="25" r="2" fill="#d4a017"/><circle cx="45" cy="25" r="2" fill="#d4a017"/><path d="M35 20Q31 11 27 7" stroke="#d4a017" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M45 20Q49 11 53 7" stroke="#d4a017" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M26 33Q17 29 11 23" stroke="#22c55e" strokeWidth="1.3" fill="none"/><path d="M54 33Q63 29 69 23" stroke="#22c55e" strokeWidth="1.3" fill="none"/><path d="M24 46Q15 48 9 53" stroke="#22c55e" strokeWidth="1.3" fill="none"/><path d="M56 46Q65 48 71 53" stroke="#22c55e" strokeWidth="1.3" fill="none"/><path d="M26 58Q17 64 11 71" stroke="#22c55e" strokeWidth="1.3" fill="none"/><path d="M54 58Q63 64 69 71" stroke="#22c55e" strokeWidth="1.3" fill="none"/><defs><linearGradient id="shA" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22c55e"/><stop offset="50%" stopColor="#0f5132"/><stop offset="100%" stopColor="#22c55e"/></linearGradient></defs></svg>;
const Ring=({pct,size=60,color="#22c55e"})=>{const r=size/2-4,c=2*Math.PI*r,d=c-(pct/100)*c;return<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(34,197,94,.1)" strokeWidth="4"/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={c} strokeDashoffset={d} strokeLinecap="round" style={{transition:"stroke-dashoffset .8s ease"}}/></svg>;};
const Candle=({type})=>{const S={marubozu:<svg viewBox="0 0 100 160" style={{width:"100%",maxWidth:80}}><defs><linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#16a34a"/></linearGradient></defs><rect x="25" y="8" width="50" height="144" rx="4" fill="url(#mg1)" style={{animation:"cGrow .7s ease-out",transformOrigin:"center bottom"}}/></svg>,pinbar:<svg viewBox="0 0 100 160" style={{width:"100%",maxWidth:80}}><line x1="50" y1="5" x2="50" y2="95" stroke="#ef4444" strokeWidth="3" opacity=".6"/><rect x="32" y="100" width="36" height="36" rx="3" fill="#ef4444" style={{animation:"cGrow .6s ease-out .2s both",transformOrigin:"center bottom"}}/><line x1="50" y1="136" x2="50" y2="152" stroke="#ef4444" strokeWidth="3" opacity=".5"/></svg>,doji:<svg viewBox="0 0 100 160" style={{width:"100%",maxWidth:80}}><line x1="50" y1="8" x2="50" y2="70" stroke="#888" strokeWidth="3"/><rect x="30" y="73" width="40" height="8" rx="3" fill="#d4a017"/><line x1="50" y1="84" x2="50" y2="152" stroke="#888" strokeWidth="3"/></svg>,engulfing:<svg viewBox="0 0 140 160" style={{width:"100%",maxWidth:120}}><rect x="10" y="45" width="28" height="50" rx="2" fill="#ef4444" opacity=".6"/><g style={{animation:"cGrow .7s ease-out .3s both",transformOrigin:"center bottom"}}><rect x="55" y="15" width="42" height="110" rx="3" fill="#22c55e"/></g></svg>,uptrend:<svg viewBox="0 0 240 120" style={{width:"100%"}}><polyline points="5,110 40,85 55,95 90,60 105,72 140,35 155,48 210,10" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" style={{strokeDasharray:400,animation:"drawL 1.5s ease-out forwards"}}/>{[[40,85,"HL"],[90,60,"HL"],[140,35,"HH"],[210,10,"HH"]].map(([x,y,l],i)=><g key={i} style={{animation:`pop .3s ease ${.3+i*.15}s both`}}><circle cx={x} cy={y} r={6} fill="#0a1a0a" stroke="#22c55e" strokeWidth="2"/><text x={x} y={y-10} textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="800">{l}</text></g>)}</svg>,downtrend:<svg viewBox="0 0 240 120" style={{width:"100%"}}><polyline points="5,10 40,30 55,20 90,55 105,42 140,80 155,68 210,108" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" style={{strokeDasharray:400,animation:"drawL 1.5s ease-out forwards"}}/>{[[40,30,"LH"],[90,55,"LH"],[140,80,"LL"],[210,108,"LL"]].map(([x,y,l],i)=><g key={i} style={{animation:`pop .3s ease ${.3+i*.15}s both`}}><circle cx={x} cy={y} r={6} fill="#0a1a0a" stroke="#ef4444" strokeWidth="2"/><text x={x} y={y-10} textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800">{l}</text></g>)}</svg>,momentum_strong:<svg viewBox="0 0 200 120" style={{width:"100%"}}>{[{x:8,o:100,c:65,h:60,l:105},{x:55,o:65,c:30,h:25,l:70},{x:102,o:30,c:8,h:4,l:35}].map((b,i)=><g key={i} style={{animation:`cGrow .4s ease ${i*.15}s both`,transformOrigin:"center bottom"}}><line x1={b.x+20} y1={b.h} x2={b.x+20} y2={b.l} stroke="#22c55e" strokeWidth="2"/><rect x={b.x} y={Math.min(b.o,b.c)} width={40} height={Math.abs(b.o-b.c)} rx={3} fill="#22c55e" opacity=".8"/></g>)}<text x="168" y="50" fill="#22c55e" fontSize="32" fontWeight="900" style={{animation:"pop .4s ease .6s both"}}>↑</text></svg>,momentum_weak:<svg viewBox="0 0 200 120" style={{width:"100%"}}>{[{x:2,o:58,c:53},{x:32,o:53,c:50},{x:62,o:51,c:55},{x:92,o:55,c:51},{x:122,o:52,c:56},{x:152,o:54,c:51}].map((b,i)=><g key={i}><rect x={b.x} y={Math.min(b.o,b.c)} width={20} height={Math.max(5,Math.abs(b.o-b.c))} rx={2} fill={b.c<b.o?"#22c55e":"#ef4444"} opacity=".35"/></g>)}<text x="178" y="56" fill="#ef4444" fontSize="12" fontWeight="900">OFF</text></svg>,bull_flag:<svg viewBox="0 0 240 160" style={{width:"100%"}}><line x1="25" y1="145" x2="80" y2="20" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round"/><rect x="76" y="16" width="113" height="61" rx="5" fill="rgba(239,68,68,.05)"/><text x="132" y="50" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800">FLAG</text><line x1="185" y1="55" x2="225" y2="10" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="5 3"/></svg>,bear_flag:<svg viewBox="0 0 240 160" style={{width:"100%"}}><line x1="25" y1="15" x2="80" y2="140" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round"/><rect x="76" y="83" width="113" height="61" rx="5" fill="rgba(34,197,94,.05)"/><text x="132" y="118" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="800">FLAG</text><line x1="185" y1="105" x2="225" y2="150" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3"/></svg>};return S[type]?<div style={{display:"flex",justifyContent:"center",padding:"12px 0"}}>{S[type]}</div>:null;};

// ─── CERTIFICATE ────────────────────────────────────────────────
const Cert=({name,score,lang,stats,course})=>{const t=L[lang];const ref=useRef(null);const date=new Date().toLocaleDateString(lang==="fr"?"fr-CA":"en-US",{year:"numeric",month:"long",day:"numeric"});const dl=()=>{const cv=ref.current;if(!cv)return;const ctx=cv.getContext("2d");const w=1200,h=850;cv.width=w;cv.height=h;const bg=ctx.createLinearGradient(0,0,w,h);bg.addColorStop(0,"#020d02");bg.addColorStop(.5,"#0d2818");bg.addColorStop(1,"#051a0a");ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);ctx.strokeStyle="#22c55e";ctx.lineWidth=3;ctx.strokeRect(30,30,w-60,h-60);ctx.strokeStyle="rgba(34,197,94,.3)";ctx.lineWidth=1;ctx.strokeRect(40,40,w-80,h-80);ctx.fillStyle="#22c55e";ctx.font="bold 18px sans-serif";ctx.textAlign="center";ctx.fillText("AZARUS",w/2,100);ctx.fillStyle="#2d5a3d";ctx.font="10px sans-serif";ctx.fillText("TRADING ACADEMY",w/2,118);ctx.fillStyle="#d4a017";ctx.font="bold 36px sans-serif";ctx.fillText(t.certTitle,w/2,190);ctx.fillStyle="#6a9a7a";ctx.font="16px sans-serif";ctx.fillText(t.certSub,w/2,240);ctx.fillStyle="#fff";ctx.font="bold 42px sans-serif";ctx.fillText(name||"___",w/2,310);ctx.fillStyle="#22c55e";ctx.font="bold 22px sans-serif";ctx.fillText(course,w/2,380);ctx.fillStyle="#4a7a5a";ctx.font="16px sans-serif";ctx.fillText(`${t.score}: ${score}% | ${stats.c}/${stats.t} ${t.correct2}`,w/2,430);ctx.fillStyle="#6a9a7a";ctx.font="14px sans-serif";ctx.fillText(date,w/2,490);ctx.fillStyle="#2d5a3d";ctx.font="12px sans-serif";ctx.fillText(t.certBy,w/2,530);ctx.strokeStyle="rgba(34,197,94,.2)";ctx.beginPath();ctx.moveTo(w/2-120,600);ctx.lineTo(w/2+120,600);ctx.stroke();ctx.fillStyle="#4a7a5a";ctx.font="12px sans-serif";ctx.fillText("Billy Lacroix — AZARUS",w/2,620);const a=document.createElement("a");a.download=`AZARUS_${(name||"student").replace(/\s/g,"_")}.png`;a.href=cv.toDataURL("image/png");a.click();};return<div><canvas ref={ref} style={{display:"none"}}/><button onClick={dl} className="az-btn" style={{width:"100%",marginTop:16}}>📜 {t.download}</button></div>;};

// ─── MAIN APP ───────────────────────────────────────────────────
export default function AzarusPlatform() {
  const [lang,setLang]=useState("fr");
  const [page,setPage]=useState("home"); // home | menu | game | win | cert
  const [gIdx,setGIdx]=useState(0); // 0,1,2 = game index
  const [lv,setLv]=useState(1);
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [show,setShow]=useState(false);
  const [ok,setOk]=useState(false);
  const [str,setStr]=useState(0);
  const [bStr,setBStr]=useState(0);
  const [lives,setLives]=useState(3);
  const [shake,setShake]=useState(false);
  const [burst,setBurst]=useState(false);
  const [bAmt,setBAmt]=useState(0);
  const [trans,setTrans]=useState(false);
  const [certName,setCertName]=useState("");
  const initProg=()=>({1:{c:0,t:0,done:false},2:{c:0,t:0,done:false},3:{c:0,t:0,done:false},4:{c:0,t:0,done:false}});
  const [progress,setProgress]=useState([initProg(),initProg(),initProg()]);
  const [unlocked,setUnlocked]=useState([[1],[1],[1]]);

  const t=L[lang];const gInfo=t.games[gIdx];
  const qs=(ALL_Q[gIdx]||{})[lv]||[];const q=qs[qi];
  const gProg=progress[gIdx];
  const gTotalC=Object.values(gProg).reduce((a,p)=>a+p.c,0);
  const gTotalQ=Object.values(gProg).reduce((a,p)=>a+p.t,0);
  const gPct=gTotalQ>0?Math.round(gTotalC/gTotalQ*100):0;
  const gAllDone=gProg[1].done&&gProg[2].done&&gProg[3].done&&gProg[4].done;
  const lvlPct=(g,l)=>{const p=progress[g][l];return p.t>0?Math.round(p.c/p.t*100):0;};
  // Global stats
  const globalC=progress.reduce((a,g)=>a+Object.values(g).reduce((b,p)=>b+p.c,0),0);
  const globalT=progress.reduce((a,g)=>a+Object.values(g).reduce((b,p)=>b+p.t,0),0);
  const globalPct=globalT>0?Math.round(globalC/globalT*100):0;
  const globalDone=progress.reduce((a,g)=>a+Object.values(g).filter(p=>p.done).length,0);

  const go=cb=>{setTrans(true);setTimeout(()=>{cb();setTrans(false);},300);};
  const doOk=()=>{const b=str>=4?25:str>=2?15:10;setBAmt(b);setStr(s=>{const n=s+1;if(n>bStr)setBStr(n);return n;});setBurst(true);setTimeout(()=>setBurst(false),900);};
  const doFail=()=>{setStr(0);setLives(l=>Math.max(0,l-1));setShake(true);setTimeout(()=>setShake(false),500);};

  const answer=(i)=>{if(show)return;setSel(i);setShow(true);const c=q[lang].c===i;setOk(c);
    setProgress(p=>{const n=[...p];n[gIdx]={...n[gIdx],[lv]:{...n[gIdx][lv],c:n[gIdx][lv].c+(c?1:0),t:n[gIdx][lv].t+1}};return n;});
    if(c)doOk();else doFail();};
  const answerBool=(v)=>{if(show)return;setSel(v);setShow(true);const c=q[lang].c===v;setOk(c);
    setProgress(p=>{const n=[...p];n[gIdx]={...n[gIdx],[lv]:{...n[gIdx][lv],c:n[gIdx][lv].c+(c?1:0),t:n[gIdx][lv].t+1}};return n;});
    if(c)doOk();else doFail();};

  const next=()=>{if(qi+1>=qs.length){
    setProgress(p=>{const n=[...p];n[gIdx]={...n[gIdx],[lv]:{...n[gIdx][lv],done:true}};return n;});
    if(lv<4){const u=[...unlocked];if(!u[gIdx].includes(lv+1)){u[gIdx]=[...u[gIdx],lv+1];setUnlocked(u);}}
    go(()=>setPage(lv>=4?"cert":"win"));}
    else{setQi(i=>i+1);setSel(null);setShow(false);}};

  const startLvl=l=>{go(()=>{setLv(l);setQi(0);setSel(null);setShow(false);setStr(0);setLives(3);setPage("game");});};
  const openGame=g=>{go(()=>{setGIdx(g);setPage("menu");});};

  return<div style={{minHeight:"100dvh",background:"linear-gradient(170deg,#020d02,#0a1a0a 30%,#0d2818 60%,#051a0a)",color:"#e8e8e8",fontFamily:"system-ui,-apple-system,sans-serif",position:"relative",overflow:"hidden"}}>
    <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}@keyframes floatUp{0%{transform:translateY(0);opacity:.15}100%{transform:translateY(-105vh);opacity:0}}@keyframes scarabF{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes slideL{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}@keyframes pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}@keyframes cGrow{from{opacity:0;transform:scaleY(0)}to{opacity:1;transform:scaleY(1)}}@keyframes drawL{from{stroke-dashoffset:400}to{stroke-dashoffset:0}}@keyframes shakeX{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}@keyframes xpF{0%{opacity:1;transform:translate(-50%,-50%) scale(.6)}40%{transform:translate(-50%,-65%) scale(1.3)}100%{opacity:0;transform:translate(-50%,-90%) scale(.8)}}@keyframes scrF{0%{opacity:1}50%{opacity:0}100%{opacity:1}}@keyframes trophy{0%{transform:scale(0) rotate(-15deg)}60%{transform:scale(1.15) rotate(3deg)}100%{transform:scale(1) rotate(0)}}@keyframes fire{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}.az-btn{border:2px solid #22c55e;background:linear-gradient(135deg,rgba(34,197,94,.12),rgba(34,197,94,.04));color:#22c55e;padding:14px 24px;border-radius:14px;font-weight:800;font-size:14px;cursor:pointer;transition:all .3s;text-transform:uppercase;letter-spacing:2px;width:100%;text-align:center}.az-btn:active{transform:scale(.97);background:#22c55e;color:#020d02}.opt{border:2px solid rgba(34,197,94,.12);background:rgba(34,197,94,.02);color:#bbb;padding:14px 16px;border-radius:14px;cursor:pointer;transition:all .3s;text-align:left;font-size:14px;width:100%;display:flex;align-items:center;gap:12px}.opt:active{background:rgba(34,197,94,.08);transform:scale(.98)}.opt-c{border-color:#22c55e!important;background:rgba(34,197,94,.1)!important;color:#22c55e!important}.opt-w{border-color:#ef4444!important;background:rgba(239,68,68,.08)!important;color:#ef4444!important}.lc{border:2px solid rgba(34,197,94,.1);background:rgba(34,197,94,.015);border-radius:18px;padding:16px;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}.lc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(34,197,94,.2),transparent);background-size:200%;animation:shimmer 4s linear infinite}.lc:active{transform:scale(.98);border-color:#22c55e}.lc.lk{opacity:.3;pointer-events:none}.tf{flex:1;padding:16px;border-radius:14px;cursor:pointer;font-size:16px;font-weight:900;text-align:center;border:2px solid;transition:all .3s}.tf:active{transform:scale(.96)}.scbox{background:linear-gradient(135deg,rgba(34,197,94,.04),rgba(212,160,23,.02));border:1px solid rgba(34,197,94,.1);border-radius:16px;padding:16px;margin-bottom:16px}.gc{border:2px solid rgba(34,197,94,.1);background:linear-gradient(135deg,rgba(34,197,94,.02),rgba(34,197,94,.005));border-radius:20px;padding:20px;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}.gc:active{transform:scale(.98);border-color:#22c55e}.gc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(34,197,94,.3),transparent);background-size:200%;animation:shimmer 3s linear infinite}`}</style>
    {/* Particles */}
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{Array.from({length:25}).map((_,i)=><div key={i} style={{position:"absolute",left:`${(i*4.1)%100}%`,bottom:"-2%",width:1.5+i%4*1.5,height:1.5+i%4*1.5,borderRadius:"50%",background:i%3===0?"#22c55e":i%3===1?"#d4a017":"#15803d",opacity:.05+i%5*.03,animation:`floatUp ${10+i%8*3}s linear infinite`,animationDelay:`${i*.5}s`}}/>)}</div>
    {trans&&<div style={{position:"fixed",inset:0,background:"#020d02",zIndex:998,animation:"scrF .6s ease"}}/>}
    {burst&&<div style={{position:"fixed",top:"40%",left:"50%",pointerEvents:"none",zIndex:999}}><div style={{animation:"xpF .9s ease-out forwards",color:"#4ade80",fontSize:38,fontWeight:900,textShadow:"0 0 30px rgba(34,197,94,.8)"}}>+{bAmt}</div></div>}

    {/* HEADER */}
    <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid rgba(34,197,94,.06)",background:"rgba(2,13,2,.9)",backdropFilter:"blur(16px)",position:"sticky",top:0,zIndex:20}}>
      <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>go(()=>setPage("home"))}>
        <Scarab s={28}/><div><div style={{color:"#22c55e",fontWeight:900,fontSize:14,letterSpacing:3}}>AZARUS</div><div style={{color:"#2d5a3d",fontSize:7,letterSpacing:2}}>TRAINING PLATFORM</div></div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {page==="game"&&<div style={{display:"flex",gap:2}}>{[1,2,3].map(i=><span key={i} style={{fontSize:12,opacity:i<=lives?1:.15}}>{i<=lives?"💚":"🖤"}</span>)}</div>}
        {page==="game"&&<button onClick={()=>startLvl(lv)} title={t.restartLvl} style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.15)",color:"#22c55e",padding:"3px 7px",borderRadius:5,cursor:"pointer",fontSize:12}}>↻</button>}
        <div style={{position:"relative",width:28,height:28}}><Ring pct={globalPct} size={28}/><span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,color:"#22c55e"}}>{globalPct}%</span></div>
        <button onClick={()=>setLang(lang==="fr"?"en":"fr")} style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.15)",color:"#22c55e",padding:"3px 9px",borderRadius:5,cursor:"pointer",fontWeight:800,fontSize:10,letterSpacing:2}}>{t.lang}</button>
      </div>
    </header>

    {/* ═══ HOME ═══ */}
    {page==="home"&&<div style={{padding:"24px 16px 40px",maxWidth:440,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:28,animation:"fadeUp .5s ease"}}><Scarab s={80}/><h1 style={{color:"#22c55e",fontSize:22,fontWeight:900,letterSpacing:4,margin:"16px 0 6px"}}>{t.platform}</h1><p style={{color:"#3a6b4a",fontSize:11,letterSpacing:2}}>{t.selectGame}</p><div style={{width:50,height:2,margin:"12px auto",background:"linear-gradient(90deg,transparent,#22c55e,transparent)"}}/></div>
      {/* Global stats */}
      <div style={{display:"flex",justifyContent:"space-around",padding:14,background:"rgba(34,197,94,.03)",borderRadius:14,border:"1px solid rgba(34,197,94,.06)",marginBottom:20}}>
        <div style={{textAlign:"center"}}><div style={{color:"#22c55e",fontSize:20,fontWeight:900}}>{globalC}</div><div style={{color:"#3a6b4a",fontSize:9}}>{t.correct2}</div></div>
        <div style={{width:1,background:"rgba(34,197,94,.1)"}}/>
        <div style={{textAlign:"center"}}><div style={{color:"#4ade80",fontSize:20,fontWeight:900}}>{globalPct}%</div><div style={{color:"#3a6b4a",fontSize:9}}>{t.accuracy}</div></div>
        <div style={{width:1,background:"rgba(34,197,94,.1)"}}/>
        <div style={{textAlign:"center"}}><div style={{color:"#d4a017",fontSize:20,fontWeight:900}}>{globalDone}/12</div><div style={{color:"#3a6b4a",fontSize:9}}>{t.progress}</div></div>
      </div>
      {/* Game cards */}
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {t.games.map((g,i)=>{const gP=progress[i];const done=Object.values(gP).filter(p=>p.done).length;const tot=Object.values(gP).reduce((a,p)=>a+p.t,0);const cor=Object.values(gP).reduce((a,p)=>a+p.c,0);const pc=tot>0?Math.round(cor/tot*100):0;
          return<div key={i} className="gc" style={{animation:`slideL .4s ease ${i*.1}s both`}} onClick={()=>openGame(i)}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{position:"relative"}}><Ring pct={done===4?100:pc} size={56} color={done===4?"#d4a017":"#22c55e"}/><span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{g.icon}</span></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:800,fontSize:15,color:"#e8e8e8"}}>{g.title}</span>
                  <span style={{color:done===4?"#d4a017":"#4a7a5a",fontSize:11,fontWeight:700}}>{done}/4</span>
                </div>
                <div style={{color:"#4a7a5a",fontSize:11,marginTop:3}}>{g.sub}</div>
                {tot>0&&<div style={{marginTop:6,height:3,background:"rgba(34,197,94,.08)",borderRadius:2,overflow:"hidden"}}><div style={{width:`${pc}%`,height:"100%",background:done===4?"linear-gradient(90deg,#d4a017,#f0c040)":"linear-gradient(90deg,#0f5132,#22c55e)",borderRadius:2,transition:"width .4s"}}/></div>}
              </div>
            </div>
          </div>;})}
      </div>
    </div>}

    {/* ═══ GAME MENU ═══ */}
    {page==="menu"&&<div style={{padding:"20px 16px 40px",maxWidth:440,margin:"0 auto"}}>
      <button onClick={()=>go(()=>setPage("home"))} style={{background:"none",border:"none",color:"#3a6b4a",cursor:"pointer",fontSize:12,marginBottom:12,padding:0}}>{t.backHome}</button>
      <div style={{textAlign:"center",marginBottom:24,animation:"fadeUp .4s ease"}}><h2 style={{color:"#22c55e",fontSize:22,fontWeight:900,letterSpacing:3}}>{gInfo.title}</h2><p style={{color:"#3a6b4a",fontSize:11}}>{gInfo.sub}</p></div>
      <div style={{display:"flex",justifyContent:"space-around",padding:12,background:"rgba(34,197,94,.03)",borderRadius:12,border:"1px solid rgba(34,197,94,.06)",marginBottom:16}}>
        <div style={{textAlign:"center"}}><div style={{color:"#22c55e",fontSize:18,fontWeight:900}}>{gTotalC}</div><div style={{color:"#3a6b4a",fontSize:8}}>{t.correct2}</div></div>
        <div style={{width:1,background:"rgba(34,197,94,.1)"}}/>
        <div style={{textAlign:"center"}}><div style={{color:"#4ade80",fontSize:18,fontWeight:900}}>{gPct}%</div><div style={{color:"#3a6b4a",fontSize:8}}>{t.accuracy}</div></div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[0,1,2,3].map(i=>{const l=i+1;const u=unlocked[gIdx].includes(l);const done=gProg[l].done;const p=lvlPct(gIdx,l);
          return<div key={l} className={`lc ${!u?"lk":""}`} style={{animation:`slideL .4s ease ${i*.08}s both`}} onClick={()=>u&&startLvl(l)}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{position:"relative"}}><Ring pct={done?100:p} size={48} color={done?"#22c55e":"#3a6b4a"}/><span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{u?gInfo.lvlIcons[i]:"🔒"}</span></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:800,fontSize:14,color:u?"#e8e8e8":"#444"}}>{gInfo.lvl[i]}</span>{done&&<span style={{background:"rgba(34,197,94,.15)",color:"#22c55e",padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:800}}>{p}%✓</span>}</div>
                <div style={{color:"#4a7a5a",fontSize:11,marginTop:2}}>{gInfo.lvlD[i]}</div>
              </div>
            </div>
          </div>;})}
      </div>
      {gAllDone&&<button className="az-btn" onClick={()=>go(()=>setPage("cert"))} style={{marginTop:16,borderColor:"#d4a017",color:"#d4a017"}}>📜 {t.certTitle}</button>}
      {gTotalQ>0&&<button onClick={()=>{if(confirm(lang==="fr"?"Réinitialiser?":"Reset?")){setProgress(p=>{const n=[...p];n[gIdx]=initProg();return n;});setUnlocked(u=>{const n=[...u];n[gIdx]=[1];return n;});}}} style={{marginTop:10,background:"none",border:"1px solid rgba(239,68,68,.15)",color:"#ef4444",padding:8,borderRadius:8,cursor:"pointer",fontSize:10,width:"100%",opacity:.5}}>{t.resetAll}</button>}
    </div>}

    {/* ═══ GAME ═══ */}
    {page==="game"&&q&&<div style={{padding:"16px",maxWidth:440,margin:"0 auto",animation:shake?"shakeX .5s ease":"fadeUp .3s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
        <span style={{color:"#3a6b4a",fontSize:10,fontWeight:700,fontFamily:"monospace"}}>{qi+1}/{qs.length}</span>
        <div style={{flex:1,height:4,background:"rgba(34,197,94,.06)",borderRadius:2,overflow:"hidden"}}><div style={{width:`${(qi+1)/qs.length*100}%`,height:"100%",background:"linear-gradient(90deg,#0f5132,#22c55e)",borderRadius:2,transition:"width .4s"}}/></div>
        {str>=2&&<span style={{color:"#4ade80",fontSize:12,fontWeight:900,animation:"fire .5s ease infinite"}}>🔥{str}</span>}
      </div>
      {q.v&&<div style={{background:"rgba(0,0,0,.4)",borderRadius:14,border:"1px solid rgba(34,197,94,.06)",marginBottom:14}}><Candle type={q.v}/></div>}
      {(q.t==="sc"||q.t==="ck")&&<div className="scbox"><div style={{color:"#22c55e",fontWeight:800,fontSize:10,letterSpacing:2,marginBottom:6}}>{q.t==="sc"?t.scenario:t.shouldTrade}</div><p style={{color:"#ddd",fontSize:13,lineHeight:1.5,margin:0}}>{q[lang].q}</p></div>}
      {!q.t&&<h2 style={{fontSize:16,fontWeight:700,lineHeight:1.5,marginBottom:16,color:"#f0f0f0"}}>{q[lang].q}</h2>}
      {q.t==="tf"&&<h2 style={{fontSize:16,fontWeight:700,lineHeight:1.5,marginBottom:16,color:"#f0f0f0"}}>{q[lang].q}</h2>}
      {q[lang].o&&q.t!=="tf"&&<div style={{display:"flex",flexDirection:"column",gap:8}}>{q[lang].o.map((o,i)=>{let c="opt";if(show){if(i===q[lang].c)c+=" opt-c";else if(i===sel)c+=" opt-w";}return<button key={i} className={c} style={{animation:`slideL .3s ease ${.1+i*.06}s both`}} onClick={()=>answer(i)}><span style={{width:26,height:26,borderRadius:8,background:"rgba(34,197,94,.06)",border:"1px solid rgba(34,197,94,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:"#22c55e",flexShrink:0}}>{String.fromCharCode(65+i)}</span><span style={{flex:1}}>{o}</span></button>;})}</div>}
      {q.t==="tf"&&!show&&<div style={{display:"flex",gap:12}}><button className="tf" onClick={()=>answerBool(true)} style={{borderColor:"rgba(34,197,94,.35)",background:"rgba(34,197,94,.05)",color:"#22c55e"}}>{t.trueL}</button><button className="tf" onClick={()=>answerBool(false)} style={{borderColor:"rgba(239,68,68,.35)",background:"rgba(239,68,68,.05)",color:"#ef4444"}}>{t.falseL}</button></div>}
      {q.t==="tf"&&show&&<div style={{display:"flex",gap:12}}><div className="tf" style={{borderColor:q[lang].c===true?"#22c55e":sel===true?"#ef4444":"#333",color:q[lang].c===true?"#22c55e":"#444"}}>{t.trueL}</div><div className="tf" style={{borderColor:q[lang].c===false?"#22c55e":sel===false?"#ef4444":"#333",color:q[lang].c===false?"#22c55e":"#444"}}>{t.falseL}</div></div>}
      {q.t==="ck"&&!show&&<div style={{display:"flex",gap:10,marginTop:12}}><button className="az-btn" onClick={()=>answerBool(true)} style={{flex:1}}>{t.yes}</button><button className="az-btn" onClick={()=>answerBool(false)} style={{flex:1,borderColor:"#ef4444",color:"#ef4444"}}>{t.no}</button></div>}
      {q.t==="ck"&&show&&<div style={{display:"flex",gap:10,marginTop:12}}><div style={{flex:1,padding:12,borderRadius:12,textAlign:"center",fontWeight:700,border:`2px solid ${q[lang].c===true?"#22c55e":sel===true?"#ef4444":"#333"}`,color:q[lang].c===true?"#22c55e":"#444"}}>{t.yes}</div><div style={{flex:1,padding:12,borderRadius:12,textAlign:"center",fontWeight:700,border:`2px solid ${q[lang].c===false?"#22c55e":sel===false?"#ef4444":"#333"}`,color:q[lang].c===false?"#22c55e":"#444"}}>{t.no}</div></div>}
      {show&&<div style={{marginTop:14,padding:14,borderRadius:14,background:ok?"rgba(34,197,94,.06)":"rgba(239,68,68,.06)",border:`1px solid ${ok?"rgba(34,197,94,.15)":"rgba(239,68,68,.15)"}`,animation:"fadeUp .25s ease"}}><div style={{fontWeight:900,fontSize:15,color:ok?"#22c55e":"#ef4444",display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{fontSize:18}}>{ok?"✦":"✗"}</span>{ok?t.correct:t.wrong}{ok&&<span style={{fontSize:11,opacity:.6,marginLeft:"auto"}}>+{bAmt}</span>}</div><p style={{color:"#6a9a7a",fontSize:12,lineHeight:1.5,margin:"0 0 12px"}}>{q[lang].e}</p><button className="az-btn" onClick={next}>{qi+1>=qs.length?t.nextLvl:t.next} →</button></div>}
    </div>}

    {/* ═══ WIN ═══ */}
    {page==="win"&&<div style={{padding:"40px 16px",maxWidth:400,margin:"0 auto",textAlign:"center"}}><div style={{width:80,height:80,borderRadius:"50%",margin:"0 auto 20px",background:"linear-gradient(135deg,#22c55e,#4ade80)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,animation:"trophy .7s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 0 40px rgba(34,197,94,.3)"}}>🏆</div><h2 style={{color:"#22c55e",fontSize:22,fontWeight:900}}>{t.complete}</h2><p style={{color:"#4a7a5a",margin:"6px 0 24px"}}>{gInfo.lvl[lv-1]}</p><div style={{display:"flex",justifyContent:"space-around",padding:20,background:"rgba(0,0,0,.3)",borderRadius:18,marginBottom:24}}><div><div style={{color:"#22c55e",fontSize:28,fontWeight:900}}>{lvlPct(gIdx,lv)}%</div><div style={{color:"#3a6b4a",fontSize:10}}>{t.accuracy}</div></div><div style={{width:1,background:"rgba(34,197,94,.1)"}}/><div><div style={{color:"#4ade80",fontSize:28,fontWeight:900}}>{progress[gIdx][lv].c}/{progress[gIdx][lv].t}</div><div style={{color:"#3a6b4a",fontSize:10}}>{t.correct2}</div></div></div><div style={{display:"flex",flexDirection:"column",gap:10}}>{lv<4&&<button className="az-btn" onClick={()=>startLvl(lv+1)}>{t.nextLvl} →</button>}{gAllDone&&<button className="az-btn" onClick={()=>go(()=>setPage("cert"))} style={{borderColor:"#d4a017",color:"#d4a017"}}>📜 {t.certTitle}</button>}<button onClick={()=>go(()=>setPage("menu"))} style={{background:"none",border:"1px solid rgba(34,197,94,.06)",color:"#3a6b4a",padding:10,borderRadius:10,cursor:"pointer",fontSize:12}}>{t.backMenu}</button></div></div>}

    {/* ═══ CERT ═══ */}
    {page==="cert"&&<div style={{padding:"30px 16px",maxWidth:440,margin:"0 auto",textAlign:"center"}}><Scarab s={60}/><h2 style={{color:"#d4a017",fontSize:20,fontWeight:900,letterSpacing:3,margin:"12px 0"}}>{t.certTitle}</h2><div style={{background:"linear-gradient(135deg,rgba(34,197,94,.04),rgba(212,160,23,.03))",border:"2px solid rgba(34,197,94,.12)",borderRadius:20,padding:20,margin:"16px 0"}}><div style={{color:"#22c55e",fontSize:10,letterSpacing:3,marginBottom:10}}>AZARUS TRADING ACADEMY</div><div style={{color:"#6a9a7a",fontSize:11,marginBottom:4}}>{t.certSub}</div><div style={{color:"#fff",fontSize:22,fontWeight:900,margin:"10px 0"}}>{certName||"..."}</div><div style={{color:"#22c55e",fontSize:13,fontWeight:700,marginBottom:8}}>{gInfo.cert}</div><div style={{display:"flex",justifyContent:"center",gap:14,fontSize:12}}><span style={{color:"#4ade80",fontWeight:800}}>{gPct}%</span><span style={{color:"#3a6b4a"}}>•</span><span style={{color:"#4ade80",fontWeight:800}}>{gTotalC}/{gTotalQ}</span><span style={{color:"#3a6b4a"}}>•</span><span style={{color:"#d4a017",fontWeight:800}}>{t.passed}</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:12}}>{[0,1,2,3].map(i=><div key={i} style={{background:"rgba(0,0,0,.2)",borderRadius:8,padding:6,fontSize:9}}><div style={{color:"#22c55e",fontWeight:700}}>{gInfo.lvlIcons[i]} {gInfo.lvl[i]}</div><div style={{color:"#4a7a5a",marginTop:2}}>{lvlPct(gIdx,i+1)}%</div></div>)}</div></div><div style={{marginBottom:14}}><label style={{color:"#4a7a5a",fontSize:11,display:"block",marginBottom:6}}>{t.getName}</label><input value={certName} onChange={e=>setCertName(e.target.value)} placeholder={t.namePh} style={{width:"100%",padding:12,borderRadius:12,border:"2px solid rgba(34,197,94,.15)",background:"rgba(34,197,94,.03)",color:"#fff",fontSize:16,fontWeight:700,textAlign:"center",outline:"none"}}/></div><Cert name={certName} score={gPct} lang={lang} stats={{c:gTotalC,t:gTotalQ}} course={gInfo.cert}/><button onClick={()=>go(()=>setPage("menu"))} style={{background:"none",border:"1px solid rgba(34,197,94,.06)",color:"#3a6b4a",padding:8,borderRadius:8,cursor:"pointer",fontSize:11,width:"100%",marginTop:10}}>{t.backMenu}</button></div>}

    <div style={{textAlign:"center",padding:"30px 16px 16px"}}><span style={{color:"rgba(34,197,94,.1)",fontSize:8,letterSpacing:3}}>AZARUS © 2025 — azarus.xyz</span></div>
  </div>;
}
