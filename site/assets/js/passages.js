/*
  Demo passages for the landing page.

  Every text is in the public domain. Glosses are written by hand for the demo;
  the extension itself translates on the device with Chrome's built-in models.

  Token format inside a sentence:
    "plain text"                          punctuation and spaces, not selectable
    "word|gloss|part of speech|note|reading"   a selectable word (note and reading optional)
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
          "C'era|there was|verb|ci + era, from essere", " ",
          "una|a, one|article", " ",
          "volta|time|noun, f.|c'era una volta: once upon a time", "…"
        ]
      },
      {
        t: "“A king!” my little readers will say at once.",
        w: [
          "— ", "Un|a|article", " ",
          "re|king|noun, m.|the plural is also re", "! — ",
          "diranno|they will say|verb|dire, future", " ",
          "subito|right away|adverb", " ",
          "i|the|article, m. pl.", " ",
          "miei|my|possessive, m. pl.", " ",
          "piccoli|little, young|adjective, m. pl.", " ",
          "lettori|readers|noun, m. pl.|singular: lettore", "."
        ]
      },
      {
        t: "No, children, you've got it wrong.",
        w: [
          "No|no|adverb", ", ",
          "ragazzi|children, kids|noun, m. pl.|singular: ragazzo", ", ",
          "avete|you have|verb|avere, voi", " ",
          "sbagliato|got it wrong|past participle|sbagliare, to make a mistake", "."
        ]
      },
      {
        t: "Once upon a time there was a piece of wood.",
        w: [
          "C'era|there was|verb|ci + era, from essere", " ",
          "una|a, one|article", " ",
          "volta|time|noun, f.|c'era una volta: once upon a time", " ",
          "un|a|article", " ",
          "pezzo|piece|noun, m.", " ",
          "di|of|preposition", " ",
          "legno|wood|noun, m.", "."
        ]
      },
      {
        t: "It wasn't a fancy piece of wood, just an ordinary log from the woodpile…",
        w: [
          "Non|not|adverb", " ",
          "era|it was|verb|essere, imperfect", " ",
          "un|a|article", " ",
          "legno|wood|noun, m.", " ",
          "di|of|preposition", " ",
          "lusso|luxury|noun, m.|di lusso: fancy, luxurious", ", ",
          "ma|but|conjunction", " ",
          "un|a|article", " ",
          "semplice|plain, ordinary|adjective", " ",
          "pezzo|piece|noun, m.", " ",
          "da|for, from|preposition|pezzo da catasta: a log for the pile", " ",
          "catasta|woodpile|noun, f.", "…"
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
          "En|in|preposition", " ",
          "un|a|article", " ",
          "lugar|place, village|noun, m.", " ",
          "de|of|preposition", " ",
          "la|the|article, f.", " ",
          "Mancha|La Mancha|proper noun|a region of central Spain", ", ",
          "de|of|preposition", " ",
          "cuyo|whose|relative", " ",
          "nombre|name|noun, m.", " ",
          "no|not|adverb", " ",
          "quiero|I want|verb|querer, yo", " ",
          "acordarme|to remember|verb|acordarse, reflexive", ", ",
          "no|not|adverb", " ",
          "ha|it has been|verb|haber; no ha mucho tiempo: not long ago", " ",
          "mucho|much, long|adjective", " ",
          "tiempo|time|noun, m.", " ",
          "que|that|conjunction", " ",
          "vivía|there lived|verb|vivir, imperfect", " ",
          "un|a|article", " ",
          "hidalgo|gentleman, minor nobleman|noun, m.|from hijo de algo, “son of somebody”", " ",
          "de|of|preposition", " ",
          "los|those|article, m. pl.|de los de: of the kind with", " ",
          "de|with|preposition", " ",
          "lanza|lance|noun, f.", " ",
          "en|in|preposition", " ",
          "astillero|lance rack|noun, m.", ", ",
          "adarga|leather shield|noun, f.", " ",
          "antigua|old|adjective, f.", ", ",
          "rocín|nag, worn-out horse|noun, m.", " ",
          "flaco|skinny|adjective", " ",
          "y|and|conjunction", " ",
          "galgo|greyhound|noun, m.", " ",
          "corredor|fast, racing|adjective|from correr, to run", "."
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
          "Longtemps|for a long time|adverb", ", ",
          "je|I|pronoun", " ",
          "me|myself|pronoun|se coucher is reflexive", " ",
          "suis|am|verb|être, forming the passé composé", " ",
          "couché|gone to bed|past participle|se coucher, to go to bed", " ",
          "de|of|preposition|de bonne heure: early", " ",
          "bonne|good|adjective, f.|de bonne heure: early", " ",
          "heure|hour|noun, f.|de bonne heure: early", "."
        ]
      },
      {
        t: "Sometimes, my candle barely out, my eyes would close so quickly that I had no time to tell myself: “I'm falling asleep.”",
        w: [
          "Parfois|sometimes|adverb", ", ",
          "à|at|preposition|à peine: barely", " ",
          "peine|barely|noun, f.|à peine: hardly, scarcely", " ",
          "ma|my|possessive, f.", " ",
          "bougie|candle|noun, f.", " ",
          "éteinte|put out|past participle|éteindre, to put out", ", ",
          "mes|my|possessive, pl.", " ",
          "yeux|eyes|noun, m. pl.|singular: œil", " ",
          "se|themselves|pronoun|se fermer is reflexive", " ",
          "fermaient|would close|verb|fermer, imperfect", " ",
          "si|so|adverb", " ",
          "vite|quickly|adverb", " ",
          "que|that|conjunction", " ",
          "je|I|pronoun", " ",
          "n'avais|didn't have|verb|ne + avoir, imperfect", " ",
          "pas|not|adverb|ne … pas: not", " ",
          "le|the|article, m.", " ",
          "temps|time|noun, m.", " ",
          "de|to|preposition", " ",
          "me|to myself|pronoun", " ",
          "dire|say|verb, infinitive", " : « ",
          "Je|I|pronoun", " ",
          "m'endors|am falling asleep|verb|s'endormir, present", ". »"
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
          "Als|when|conjunction", " Gregor Samsa ",
          "eines|one|article, genitive|eines Morgens: one morning", " ",
          "Morgens|morning|noun, genitive|der Morgen", " ",
          "aus|from, out of|preposition", " ",
          "unruhigen|troubled, uneasy|adjective, dative pl.|unruhig", " ",
          "Träumen|dreams|noun, dative pl.|der Traum", " ",
          "erwachte|woke up|verb|erwachen, past", ", ",
          "fand|found|verb|finden, past", " ",
          "er|he|pronoun", " ",
          "sich|himself|reflexive pronoun", " ",
          "in|in|preposition", " ",
          "seinem|his|possessive, dative", " ",
          "Bett|bed|noun, n.|das Bett", " ",
          "zu|into|preposition|zu etwas verwandelt: turned into something", " ",
          "einem|a|article, dative", " ",
          "ungeheueren|monstrous, enormous|adjective|ungeheuer", " ",
          "Ungeziefer|vermin|noun, n.|das Ungeziefer", " ",
          "verwandelt|transformed|past participle|verwandeln, to transform", "."
        ]
      },
      {
        t: "He lay on his armour-hard back…",
        w: [
          "Er|he|pronoun", " ",
          "lag|lay|verb|liegen, past", " ",
          "auf|on|preposition", " ",
          "seinem|his|possessive, dative", " ",
          "panzerartig|armour-like|adverb|der Panzer: armour, shell", " ",
          "harten|hard|adjective, dative|hart", " ",
          "Rücken|back|noun, m.|der Rücken", "…"
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
          "吾輩|I (grand, old-fashioned)|pronoun|a pompous first person|わがはい",
          "は|(topic marker)|particle|read “wa”",
          "猫|cat|noun||ねこ",
          "で|is|copula|である: “is”, in written style",
          "ある|is|verb|である: “is”, in written style",
          "。"
        ]
      },
      {
        t: "As yet I have no name.",
        w: [
          "名前|name|noun||なまえ",
          "は|(topic marker)|particle|read “wa”",
          "まだ|not yet, still|adverb",
          "無い|there is none|adjective|usually written ない|ない",
          "。"
        ]
      },
      {
        t: "I haven't the faintest idea where I was born.",
        w: [
          "どこ|where|pronoun",
          "で|at, in|particle",
          "生れた|was born|verb|生まれる, past|うまれた",
          "か|(question marker)|particle",
          "とんと|(not) at all|adverb|with a negative: not in the least",
          "見当|idea, guess|noun|見当がつかない: to have no idea|けんとう",
          "が|(subject marker)|particle",
          "つかぬ|can't form|verb|つく + ぬ, an old negative",
          "。"
        ]
      },
      {
        t: "All I remember is that I was mewing in some dim, damp place.",
        w: [
          "何でも|as far as I know|adverb|literally “whatever it is”|なんでも",
          "薄暗い|dim, gloomy|adjective||うすぐらい",
          "じめじめ|damp, clammy|adverb|a sound-symbolic word",
          "した|that was|verb|する, past",
          "所|place|noun||ところ",
          "で|at, in|particle",
          "ニャーニャー|mew mew|onomatopoeia",
          "泣いて|crying|verb|泣く, te-form|ないて",
          "いた|was (doing)|auxiliary|いる, past",
          "事|the fact that|noun||こと",
          "だけ|only|particle",
          "は|(topic marker)|particle|read “wa”",
          "記憶|memory|noun|記憶している: to remember|きおく",
          "して|doing|verb|する, te-form",
          "いる|(ongoing)|auxiliary",
          "。"
        ]
      }
    ]
  }
];
