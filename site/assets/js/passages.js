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
    id: "cs",
    tab: "Čeština",
    lang: "cs",
    title: "Babička",
    author: "Božena Němcová",
    year: "1855",
    chapter: "Obrazy venkovského života",
    folios: ["7", "8"],
    start: "milé",
    saved: ["dobroty", "žehnaly"],
    sentences: [
      {
        t: "It is long, long ago now that I last looked into that dear, gentle face, kissed that pale, wrinkled cheek and gazed into the blue eyes that showed so much kindness and love; long ago that her old hands last blessed me!",
        w: [
          "Dávno|long ago", ", ",
          "dávno|long ago", " ",
          "již|already", " ",
          "tomu|it is (since then)", ", ",
          "co|since, that", " ",
          "jsem|I (did)", " ",
          "posledně|the last time", " ",
          "se|(with dívala) looked", " ",
          "dívala|looked", " ",
          "do|into", " ",
          "té|that", " ",
          "milé|dear", " ",
          "mírné|gentle", " ",
          "tváře|face", ", ",
          "co|since, that", " ",
          "jsem|I (did)", " ",
          "zulíbala|kissed (all over)", " ",
          "to|that", " ",
          "bledé|pale", " ",
          "líce|cheek", ", ",
          "plné|full", " ",
          "vrásků|of wrinkles", ", ",
          "nahlížela|gazed into", " ",
          "do|into", " ",
          "modrého|blue", " ",
          "oka|eye", ", ",
          "v|in", " ",
          "němž|which", " ",
          "se|(with jevilo) showed", " ",
          "jevilo|showed, appeared", " ",
          "tolik|so much", " ",
          "dobroty|kindness, goodness", " ",
          "a|and", " ",
          "lásky|love", "; ",
          "dávno|long ago", " ",
          "tomu|it is (since then)", ", ",
          "co|since, that", " ",
          "mne|me", " ",
          "posledně|the last time", " ",
          "žehnaly|blessed", " ",
          "staré|old", " ",
          "její|her", " ",
          "ruce|hands", "!"
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
    start: "couché",
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
    id: "nl",
    tab: "Nederlands",
    lang: "nl",
    title: "Max Havelaar",
    author: "Multatuli",
    year: "1860",
    chapter: "Eerste hoofdstuk",
    folios: ["5", "6"],
    start: "makelaar",
    saved: ["gewoonte", "bestellen"],
    sentences: [
      {
        t: "I am a coffee broker, and I live at No. 37 Lauriergracht.",
        w: [
          "Ik|I", " ",
          "ben|am", " ",
          "makelaar|broker", " ",
          "in|in", " ",
          "koffi|coffee (old spelling of koffie)", ", ",
          "en|and", " ",
          "woon|live", " ",
          "op|on", " ",
          "de|the", " ",
          "Lauriergracht|Laurier Canal, a street in Amsterdam", ", N° 37."
        ]
      },
      {
        t: "It is not my habit to write novels, or things of that kind, and so it took a long time before I went as far as ordering a couple of extra reams of paper…",
        w: [
          "Het|it", " ",
          "is|is", " ",
          "myn|my (old spelling of mijn)", " ",
          "gewoonte|habit, custom", " ",
          "niet|not", ", ",
          "romans|novels", " ",
          "te|to", " ",
          "schryven|write (old spelling of schrijven)", ", ",
          "of|or", " ",
          "zulke|such", " ",
          "dingen|things", ", ",
          "en|and", " ",
          "het|it", " ",
          "heeft|has", " ",
          "dan|then (dan ook: and so)", " ",
          "ook|also (dan ook: and so)", " ",
          "lang|long", " ",
          "geduurd|lasted, taken", ", ",
          "voor|before", " ",
          "ik|I", " ",
          "er|(er toe: to it)", " ",
          "toe|(er toe: to it)", " ",
          "overging|proceeded, went over", " ",
          "een|a", " ",
          "paar|couple", " ",
          "riem|ream", " ",
          "papier|paper", " ",
          "extra|extra", " ",
          "te|to", " ",
          "bestellen|order", "…"
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
