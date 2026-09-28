/*
  Demo passages for the landing page.

  Every text is in the public domain. Glosses are written by hand for the demo;
  the extension itself translates on the device with Chrome's built-in models.

  Each sentence has "t", its English translation (shown in the demo under the
  word's translation), and "w", its tokens:
    "plain text"         punctuation and spaces, not selectable
    "word|translation"   a selectable word and its translation in context
*/
window.LEGGIO_PASSAGES = [
  {
    id: "it",
    tab: "Italiano",
    lang: "it",
    title: "Le avventure di Pinocchio",
    author: "Carlo Collodi",
    year: "1883",
    chapter: "Capitolo primo",
    folios: ["3", "4"],
    start: "lettori",
    saved: ["ragazzi", "legno"],
    sentences: [
      {
        t: "Once upon a time there was…",
        w: [
          "C'era|there was", " ",
          "una|a, one", " ",
          "volta|time", "…"
        ]
      },
      {
        t: "“A king!” my little readers will say at once.",
        w: [
          "— ", "Un|a", " ",
          "re|king", "! — ",
          "diranno|they will say", " ",
          "subito|right away", " ",
          "i|the", " ",
          "miei|my", " ",
          "piccoli|little, young", " ",
          "lettori|readers", "."
        ]
      },
      {
        t: "No, children, you've got it wrong.",
        w: [
          "No|no", ", ",
          "ragazzi|children, kids", ", ",
          "avete|you have", " ",
          "sbagliato|got it wrong", "."
        ]
      },
      {
        t: "Once upon a time there was a piece of wood.",
        w: [
          "C'era|there was", " ",
          "una|a, one", " ",
          "volta|time", " ",
          "un|a", " ",
          "pezzo|piece", " ",
          "di|of", " ",
          "legno|wood", "."
        ]
      },
      {
        t: "It wasn't a fancy piece of wood, just an ordinary log from the woodpile…",
        w: [
          "Non|not", " ",
          "era|it was", " ",
          "un|a", " ",
          "legno|wood", " ",
          "di|of", " ",
          "lusso|luxury", ", ",
          "ma|but", " ",
          "un|a", " ",
          "semplice|plain, ordinary", " ",
          "pezzo|piece", " ",
          "da|for, from", " ",
          "catasta|woodpile", "…"
        ]
      }
    ]
  },
  {
    id: "es",
    tab: "Español",
    lang: "es",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    year: "1605",
    chapter: "Capítulo primero",
    folios: ["11", "12"],
    start: "acordarme",
    saved: ["hidalgo", "flaco"],
    sentences: [
      {
        t: "In a village in La Mancha, whose name I'd rather not recall, there lived not long ago a gentleman of the kind with a lance in the rack, an old shield, a skinny nag and a racing greyhound.",
        w: [
          "En|in", " ",
          "un|a", " ",
          "lugar|place, village", " ",
          "de|of", " ",
          "la|the", " ",
          "Mancha|La Mancha", ", ",
          "de|of", " ",
          "cuyo|whose", " ",
          "nombre|name", " ",
          "no|not", " ",
          "quiero|I want", " ",
          "acordarme|to remember", ", ",
          "no|not", " ",
          "ha|it has been", " ",
          "mucho|much, long", " ",
          "tiempo|time", " ",
          "que|that", " ",
          "vivía|there lived", " ",
          "un|a", " ",
          "hidalgo|gentleman, minor nobleman", " ",
          "de|of", " ",
          "los|those", " ",
          "de|with", " ",
          "lanza|lance", " ",
          "en|in", " ",
          "astillero|lance rack", ", ",
          "adarga|leather shield", " ",
          "antigua|old", ", ",
          "rocín|nag, worn-out horse", " ",
          "flaco|skinny", " ",
          "y|and", " ",
          "galgo|greyhound", " ",
          "corredor|fast, racing", "."
        ]
      }
    ]
  },
  {
    id: "fr",
    tab: "Français",
    lang: "fr",
    title: "Du côté de chez Swann",
    author: "Marcel Proust",
    year: "1913",
    chapter: "Combray",
    folios: ["1", "2"],
    start: "bougie",
    saved: ["Longtemps", "vite"],
    sentences: [
      {
        t: "For a long time, I went to bed early.",
        w: [
          "Longtemps|for a long time", ", ",
          "je|I", " ",
          "me|myself", " ",
          "suis|am", " ",
          "couché|gone to bed", " ",
          "de|of", " ",
          "bonne|good", " ",
          "heure|hour", "."
        ]
      },
      {
        t: "Sometimes, my candle barely out, my eyes would close so quickly that I had no time to tell myself: “I'm falling asleep.”",
        w: [
          "Parfois|sometimes", ", ",
          "à|at", " ",
          "peine|barely", " ",
          "ma|my", " ",
          "bougie|candle", " ",
          "éteinte|put out", ", ",
          "mes|my", " ",
          "yeux|eyes", " ",
          "se|themselves", " ",
          "fermaient|would close", " ",
          "si|so", " ",
          "vite|quickly", " ",
          "que|that", " ",
          "je|I", " ",
          "n'avais|didn't have", " ",
          "pas|not", " ",
          "le|the", " ",
          "temps|time", " ",
          "de|to", " ",
          "me|to myself", " ",
          "dire|say", " : « ",
          "Je|I", " ",
          "m'endors|am falling asleep", ". »"
        ]
      }
    ]
  },
  {
    id: "de",
    tab: "Deutsch",
    lang: "de",
    title: "Die Verwandlung",
    author: "Franz Kafka",
    year: "1915",
    chapter: "I",
    folios: ["7", "8"],
    start: "Träumen",
    saved: ["Ungeziefer", "Rücken"],
    sentences: [
      {
        t: "When Gregor Samsa woke one morning from troubled dreams, he found himself transformed in his bed into a monstrous vermin.",
        w: [
          "Als|when", " Gregor Samsa ",
          "eines|one", " ",
          "Morgens|morning", " ",
          "aus|from, out of", " ",
          "unruhigen|troubled, uneasy", " ",
          "Träumen|dreams", " ",
          "erwachte|woke up", ", ",
          "fand|found", " ",
          "er|he", " ",
          "sich|himself", " ",
          "in|in", " ",
          "seinem|his", " ",
          "Bett|bed", " ",
          "zu|into", " ",
          "einem|a", " ",
          "ungeheueren|monstrous, enormous", " ",
          "Ungeziefer|vermin", " ",
          "verwandelt|transformed", "."
        ]
      },
      {
        t: "He lay on his armour-hard back…",
        w: [
          "Er|he", " ",
          "lag|lay", " ",
          "auf|on", " ",
          "seinem|his", " ",
          "panzerartig|armour-like", " ",
          "harten|hard", " ",
          "Rücken|back", "…"
        ]
      }
    ]
  },
  {
    id: "ja",
    tab: "日本語",
    lang: "ja",
    title: "吾輩は猫である",
    author: "Natsume Sōseki",
    year: "1905",
    chapter: "一",
    folios: ["5", "6"],
    vertical: true,
    start: "猫",
    saved: ["見当"],
    sentences: [
      {
        t: "I am a cat.",
        w: [
          "吾輩|I (grand, old-fashioned)",
          "は|(topic marker)",
          "猫|cat",
          "で|is",
          "ある|is",
          "。"
        ]
      },
      {
        t: "As yet I have no name.",
        w: [
          "名前|name",
          "は|(topic marker)",
          "まだ|not yet, still",
          "無い|there is none",
          "。"
        ]
      },
      {
        t: "I haven't the faintest idea where I was born.",
        w: [
          "どこ|where",
          "で|at, in",
          "生れた|was born",
          "か|(question marker)",
          "とんと|(not) at all",
          "見当|idea, guess",
          "が|(subject marker)",
          "つかぬ|can't form",
          "。"
        ]
      },
      {
        t: "All I remember is that I was mewing in some dim, damp place.",
        w: [
          "何でも|as far as I know",
          "薄暗い|dim, gloomy",
          "じめじめ|damp, clammy",
          "した|that was",
          "所|place",
          "で|at, in",
          "ニャーニャー|mew mew",
          "泣いて|crying",
          "いた|was (doing)",
          "事|the fact that",
          "だけ|only",
          "は|(topic marker)",
          "記憶|memory",
          "して|doing",
          "いる|(ongoing)",
          "。"
        ]
      }
    ]
  }
];
