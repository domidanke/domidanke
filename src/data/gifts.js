export const GIFTS = [
  { id: 'trophy',   emoji: '🏆', name: 'Goldener Pokal',      desc: 'Für den absoluten Champion' },
  { id: 'hug',      emoji: '🤗', name: 'Virtuelle Umarmung',   desc: 'Wärmer als jede Heizung' },
  { id: 'crown',    emoji: '👑', name: 'Dankeschön-Krone',     desc: 'Für den König von allem' },
  { id: 'confetti', emoji: '🎊', name: 'Konfetti-Regen',       desc: 'Party für Domi!' },
  { id: 'rocket',   emoji: '🚀', name: 'Raketen-Boost',        desc: 'Ab zum Mond!' },
  { id: 'pizza',    emoji: '🍕', name: 'Endlos Pizza',         desc: 'Unendlicher Vorrat' },
  { id: 'muscle',   emoji: '💪', name: 'Power-Up',             desc: '+1000 Stärke für Domi' },
  { id: 'diamond',  emoji: '💎', name: 'Diamant-Status',       desc: 'Nur das Beste vom Besten' },
  { id: 'beer',     emoji: '🍺', name: 'Ein kühles Bier',      desc: 'Prost, Domi!' },
  { id: 'star',     emoji: '⭐', name: 'Goldener Stern',       desc: 'Du bist ein Star!' },
  { id: 'fire',     emoji: '🔥', name: 'Feuer-Modus',          desc: 'Domi ist on fire!' },
  { id: 'unicorn',  emoji: '🦄', name: 'Magisches Einhorn',    desc: 'Für den besonderen Zauber' },
];

export const SUCCESS_MESSAGES = [
  (sender, gift) => `${sender} hat Domi "${gift}" geschenkt! Domi ist sprachlos (fast)!`,
  (sender, gift) => `BOOM! ${sender} schickt "${gift}" — Domi tanzt vor Freude!`,
  (sender, gift) => `${sender} sagt DANKE mit "${gift}" — Domi's Tag ist gerettet!`,
  (sender, gift) => `"${gift}" von ${sender}! Domi weint vor Glück (happy tears only)!`,
  (sender, gift) => `${sender} ist ein wahrer Held! "${gift}" wurde erfolgreich an Domi überreicht!`,
];
