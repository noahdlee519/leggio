(() => {
  "use strict";

  const cfg = window.LEGGIO_CONFIG || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const narrow = window.matchMedia("(max-width: 639px)");
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Settings from config.js ---------- */

  $$("[data-store-link]").forEach((el) => {
    if (cfg.chromeStoreUrl) {
      el.href = cfg.chromeStoreUrl;
      el.rel = "noopener";
      el.textContent = el.dataset.labelLive || "Add to Chrome";
      el.classList.add("is-live");
    } else {
      el.removeAttribute("href");
      el.textContent = el.dataset.labelPending || "Coming soon";
      el.classList.add("is-pending");
    }
  });

  $$("[data-contact]").forEach((el) => {
    if (!cfg.contactEmail) return;
    el.href = "mailto:" + cfg.contactEmail;
    el.textContent = el.dataset.labelLive || cfg.contactEmail;
    el.classList.remove("is-pending", "doc__pending");
  });

  $$("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- How-it-works plate: pin the slip under its word on wide screens ---------- */

  const mini = $(".minigloss");
  const miniWord = $(".plate__hl");
  const anchorMini = () => {
    if (!mini || !miniWord) return;
    if (narrow.matches) {
      mini.classList.remove("is-anchored");
      mini.style.left = mini.style.top = "";
      return;
    }
    const page = mini.parentElement;
    const pr = page.getBoundingClientRect();
    const wr = miniWord.getClientRects();
    const r = wr[wr.length - 1];
    if (!r) return;
    const left = Math.min(Math.max(r.left - pr.left + r.width / 2 - mini.offsetWidth / 2, 12), pr.width - mini.offsetWidth - 12);
    mini.style.left = Math.round(left) + "px";
    mini.style.top = Math.round(r.bottom - pr.top + 12) + "px";
    mini.classList.add("is-anchored");
  };
  if (mini) {
    anchorMini();
    if ("ResizeObserver" in window) new ResizeObserver(anchorMini).observe(mini.parentElement);
    narrow.addEventListener("change", anchorMini);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(anchorMini);
  }

  /* ---------- The demo book ---------- */

  const passages = window.LEGGIO_PASSAGES;
  const spread = $("#spread");
  if (!passages || !spread) return;

  const passageEl = $("#passage");
  const pageOriginal = $("#page-original");
  const pageFacing = $(".page--facing", spread);
  const dogNext = $("#turn-next");
  const dogPrev = $("#turn-prev");
  const dock = $("#gloss-dock");
  const linenosEl = $("#linenos");
  const notesEl = $("#notes");
  const notesEmpty = $("#notes-empty");
  const notesFull = $("#notes-full");
  const MAX_SAVED = 5; // keeps the facing page to one page per book
  const spinesEl = $("#spines");
  const closingSpines = $("#closing-spines");
  const status = $("#demo-status");
  const gloss = $("#gloss");
  const glossWord = $("#gloss-word");
  const glossMeaning = $("#gloss-meaning");
  const glossContext = $("#gloss-context");
  const glossSave = $("#gloss-save");
  const glossSaveLabel = $("#gloss-save-label");
  const glossSaveHint = $("#gloss-save-hint");
  const glossClose = $("#gloss-close");
  const clothEls = $$("[data-sync-cloth]");
  const themeMeta = $('meta[name="theme-color"]');

  const THEME = { it: "#1F4E3D", es: "#8A1C2B", fr: "#1C3963", de: "#C5962C", ja: "#4A2C5A" };

  let current = null;
  let words = [];
  let active = -1;
  let focusIdx = 0;
  let closeTimer = 0;
  let lineStarts = [];
  const savedBy = new Map(); // passage id -> Map(lowercased word -> word index)

  const parseToken = (raw) => {
    const bar = raw.indexOf("|");
    if (bar < 0) return null;
    return { w: raw.slice(0, bar), gloss: raw.slice(bar + 1) };
  };
  const keyOf = (i) => words[i].tok.w.toLocaleLowerCase(current.lang);
  const animate = () => !reduceMotion.matches;
  const docked = () => narrow.matches;

  const makeSpine = (p) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "spine";
    b.dataset.cloth = p.id;
    const title = document.createElement("span");
    title.className = "spine__title";
    title.lang = p.lang;
    title.textContent = p.tab;
    b.append(title);
    return b;
  };

  /* Spines: the language switcher */
  passages.forEach((p) => {
    const b = makeSpine(p);
    b.id = "spine-" + p.id;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", "false");
    b.setAttribute("aria-controls", "spread");
    b.tabIndex = -1;
    b.addEventListener("click", (e) => select(p.id, { mode: e.detail === 0 ? "swap" : "turn" }));
    spinesEl.append(b);

    // The same shelf at the foot of the page opens a volume in the demo
    if (closingSpines) {
      const c = makeSpine(p);
      c.setAttribute("aria-label", "Open the " + p.tab + " volume in the demo");
      c.addEventListener("click", () => {
        select(p.id, { mode: "swap" });
        spread.scrollIntoView({ behavior: animate() ? "smooth" : "auto", block: "center" });
      });
      closingSpines.append(c);
    }
  });
  spread.setAttribute("role", "tabpanel");

  spinesEl.addEventListener("keydown", (e) => {
    const tabs = $$(".spine", spinesEl);
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    tabs[next].focus();
    select(passages[next].id, { mode: "swap" });
  });

  const indexOf = (p) => passages.indexOf(p);
  const neighbour = (from, dir) => passages[(indexOf(from) + (dir === "next" ? 1 : -1) + passages.length) % passages.length];

  /* Everything outside the book that follows the open volume */
  function applyChrome(p, { announce = true } = {}) {
    $$(".spine", spinesEl).forEach((t) => {
      const on = t.dataset.cloth === p.id;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    if (closingSpines) $$(".spine", closingSpines).forEach((t) => t.classList.toggle("is-current", t.dataset.cloth === p.id));
    spread.setAttribute("aria-labelledby", "spine-" + p.id);
    clothEls.forEach((el) => (el.dataset.cloth = p.id));
    if (themeMeta) themeMeta.content = THEME[p.id] || THEME.it;
    if (dogNext) dogNext.setAttribute("aria-label", "Turn the page to " + neighbour(p, "next").tab);
    if (dogPrev) dogPrev.setAttribute("aria-label", "Turn back to " + neighbour(p, "prev").tab);
    if (announce) status.textContent = p.tab + ": " + p.title + ", " + p.author + ".";
  }

  function showPassage(p) {
    current = p;
    closeGloss(true);
    renderBook();
    layoutLines();
  }

  const openStart = (animated) => openGloss(words.findIndex((w) => w.tok.w === current.start), { animated });

  // mode: "turn" plays the page turn, "swap" is a quick blur-fade (keyboard, reduced motion)
  function select(id, { initial = false, mode = "turn", dir } = {}) {
    const p = passages.find((x) => x.id === id);
    if (!p || p === current || turn) return;

    if (initial) {
      applyChrome(p, { announce: false });
      showPassage(p);
      requestAnimationFrame(() => {
        layoutLines();
        openStart(false);
      });
      return;
    }
    retirePeek(); // they've found another volume; the hint has done its job
    if (mode === "turn" && animate()) {
      playTurn(dir || (indexOf(p) > indexOf(current) ? "next" : "prev"), p);
      return;
    }
    applyChrome(p);
    if (!animate()) {
      showPassage(p);
      requestAnimationFrame(() => openStart(false));
      return;
    }
    spread.classList.add("is-swapping");
    window.setTimeout(() => {
      showPassage(p);
      requestAnimationFrame(() => {
        spread.classList.remove("is-swapping");
        openStart(true);
      });
    }, 170);
  }

  /* ---------- The page turn ----------
     The turning leaf carries a snapshot of the page being lifted on its front and the next
     volume's page on its back, so when it lands it simply becomes the new page. */

  let turn = null;
  const TURN_MS = 820;
  const easeInOut = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const easeOut = (k) => 1 - Math.pow(1 - k, 3);
  const make = (cls) => {
    const d = document.createElement("div");
    d.className = cls;
    return d;
  };

  function snapshot(el, clothId) {
    const c = el.cloneNode(true);
    c.removeAttribute("id");
    $$("[id]", c).forEach((n) => n.removeAttribute("id"));
    $$(".gloss, .gloss-dock", c).forEach((n) => n.remove());
    $$(".is-new", c).forEach((n) => n.classList.remove("is-new"));
    c.dataset.cloth = clothId;
    return c;
  }

  function pageBoxes() {
    const sr = spread.getBoundingClientRect();
    return [pageOriginal, pageFacing]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { el, x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
      })
      .sort((a, b) => a.x - b.x || a.y - b.y);
  }

  const place = (node, b, dx = 0, dy = 0) => {
    node.style.cssText = "position:absolute;margin:0;min-height:0;left:" + (b.x - dx) + "px;top:" + (b.y - dy) + "px;width:" + b.w + "px;height:" + b.h + "px";
    return node;
  };
  const fill = (node) => {
    node.style.cssText = "position:absolute;inset:0;margin:0;min-height:0;width:100%;height:100%";
    return node;
  };

  function beginTurn(dir, to) {
    retirePeek();
    const from = current;
    const prevActive = active;
    closeGloss(true);
    const old = pageBoxes().map((b) => ({ ...b, node: snapshot(b.el, from.id) }));
    const stacked = Math.abs(old[0].x - old[1].x) < 2;

    // The pages under the leaf take the new volume's inks; the boards change when the page lands
    pageOriginal.dataset.cloth = pageFacing.dataset.cloth = to.id;
    showPassage(to);
    const neu = pageBoxes().map((b) => ({ ...b, node: snapshot(b.el, to.id) }));

    const overlay = make("turn turn--" + dir);
    overlay.setAttribute("aria-hidden", "true");
    overlay.inert = true;
    const leaf = make("turn__leaf");
    const front = make("turn__face");
    const frontShade = make("turn__shade turn__shade--front");
    let backShade = null;
    let cast = null;

    if (stacked) {
      // Phones: the whole spread is one leaf that turns away around the spine
      const box = { x: 0, y: 0, w: spread.clientWidth, h: spread.clientHeight };
      place(leaf, box);
      old.forEach((b) => front.append(place(b.node, b)));
      front.append(frontShade);
      leaf.append(front);
      overlay.append(leaf);
    } else {
      const [L, R] = old;
      const [NL, NR] = neu;
      const moving = dir === "next" ? R : L;
      const staying = dir === "next" ? L : R;
      const landing = dir === "next" ? NL : NR;
      const revealed = dir === "next" ? NR : NL;
      const back = make("turn__face turn__face--back");
      backShade = make("turn__shade turn__shade--back");
      cast = place(make("turn__cast"), revealed);
      place(leaf, moving);
      front.append(fill(moving.node), frontShade);
      back.append(fill(landing.node), backShade);
      // If the two volumes' pages differ in height, the back keeps the landing page's own size
      back.style.bottom = "auto";
      back.style.height = landing.h + "px";
      leaf.append(front, back);
      overlay.append(place(staying.node, staying), cast, leaf);
    }
    leaf.style.transformOrigin = dir === "next" ? "0 50%" : "100% 50%";
    spread.append(overlay);
    spread.classList.add("is-turning");
    turn = { dir, from, to, prevActive, overlay, leaf, frontShade, backShade, cast, stacked, p: 0, raf: 0, chrome: false, autoplay: false };
    setTurn(0);
  }

  function setTurn(p, t = turn) {
    t.p = p;
    const sign = t.dir === "next" ? -1 : 1;
    const lift = Math.sin(p * Math.PI);
    if (t.stacked) {
      t.leaf.style.transform = "rotateY(" + sign * 100 * p + "deg)";
      t.frontShade.style.opacity = String(Math.min(1, p * 1.4) * 0.55);
    } else {
      t.leaf.style.transform = "translateZ(" + lift * 28 + "px) rotateY(" + sign * 180 * p + "deg)";
      t.frontShade.style.opacity = String(Math.min(1, p * 2) * 0.5);
      t.backShade.style.opacity = String(Math.min(1, (1 - p) * 2) * 0.45);
      t.cast.style.opacity = String(lift * 0.9);
    }
    // Played turns hand the cloth over as the page passes upright
    if (t.autoplay && !t.chrome && p >= 0.5) {
      applyChrome(t.to);
      t.chrome = true;
    }
  }

  function tweenTurn(to, ms, ease, done) {
    const t = turn;
    const from = t.p;
    const t0 = performance.now();
    cancelAnimationFrame(t.raf);
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      setTurn(from + (to - from) * ease(k));
      if (k < 1) t.raf = requestAnimationFrame(step);
      else done();
    };
    t.raf = requestAnimationFrame(step);
  }

  function endTurn(commit) {
    const t = turn;
    cancelAnimationFrame(t.raf);
    t.overlay.remove();
    spread.classList.remove("is-turning");
    turn = null;
    delete pageOriginal.dataset.cloth;
    delete pageFacing.dataset.cloth;
    if (commit) {
      if (!t.chrome) applyChrome(t.to);
      requestAnimationFrame(() => openStart(true));
    } else {
      showPassage(t.from);
      if (t.prevActive >= 0) openGloss(t.prevActive, { animated: false });
    }
  }

  function playTurn(dir, to) {
    if (turn) return;
    beginTurn(dir, to);
    turn.autoplay = true;
    tweenTurn(1, TURN_MS, easeInOut, () => endTurn(true));
  }

  function turnBy(dir, keyboard) {
    if (turn || !current) return;
    select(neighbour(current, dir).id, { mode: keyboard ? "swap" : "turn", dir });
  }
  if (dogNext) dogNext.addEventListener("click", (e) => turnBy("next", e.detail === 0));
  if (dogPrev) dogPrev.addEventListener("click", (e) => turnBy("prev", e.detail === 0));

  /* Drag or swipe the page. The leaf follows the pointer; a flick is enough to finish the turn,
     and letting go early lays it back down. */
  let drag = null;
  let suppressClickUntil = 0;

  spread.addEventListener("pointerdown", (e) => {
    stopPeek(); // the reader's hand takes over from the hint
    if (!e.isPrimary || e.button !== 0 || turn || drag) return;
    if (e.target.closest(".gloss")) return;
    drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, started: false, samples: [] };
  });

  spread.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x0;
    const dy = e.clientY - drag.y0;
    if (!drag.started) {
      if (Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx)) {
        drag = null; // a vertical scroll, not a page turn
        return;
      }
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
      const dir = dx < 0 ? "next" : "prev";
      suppressClickUntil = performance.now() + 600;
      if (!animate()) {
        drag = null;
        select(neighbour(current, dir).id, { mode: "swap", dir });
        return;
      }
      drag.started = true;
      drag.dir = dir;
      try {
        spread.setPointerCapture(e.pointerId);
      } catch (err) {
        /* capture is best effort */
      }
      beginTurn(dir, neighbour(current, dir));
      drag.travel = turn.stacked ? spread.clientWidth * 0.9 : turn.leaf.offsetWidth * 1.6;
    }
    const now = performance.now();
    drag.samples.push({ t: now, x: e.clientX });
    while (drag.samples.length > 2 && now - drag.samples[0].t > 100) drag.samples.shift();
    const moved = drag.dir === "next" ? -dx : dx;
    setTurn(Math.min(1, Math.max(0, moved / drag.travel)));
  });

  const release = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    if (!d.started || !turn) return;
    suppressClickUntil = performance.now() + 400;
    const a = d.samples[0];
    const b = d.samples[d.samples.length - 1];
    const dt = Math.max(1, b.t - a.t);
    const velocity = ((d.dir === "next" ? -1 : 1) * (b.x - a.x)) / dt; // px per ms, positive = turning onward
    const commit = e.type !== "pointercancel" && (turn.p > 0.5 || velocity > 0.3);
    if (commit && !turn.chrome) {
      applyChrome(turn.to);
      turn.chrome = true;
    }
    const target = commit ? 1 : 0;
    const remaining = Math.abs(target - turn.p);
    const ms = Math.round(Math.min(520, Math.max(180, (remaining * 620) / Math.max(1, Math.abs(velocity)))));
    tweenTurn(target, ms, easeOut, () => endTurn(commit));
  };
  spread.addEventListener("pointerup", release);
  spread.addEventListener("pointercancel", release);
  // A drag must not also count as a click on the word or corner it started on
  spread.addEventListener(
    "click",
    (e) => {
      if (performance.now() < suppressClickUntil) {
        e.stopPropagation();
        e.preventDefault();
        suppressClickUntil = 0;
      }
    },
    true
  );

  /* ---------- The page-turn hint ----------
     The one motion nobody asked for, and a documented exception to the Answer-Only Motion
     Rule: once the book has sat in view, untouched, for a few seconds, the right-hand page
     lifts from its edge by itself, the way a thumb tests a page, and lays back down. It is
     the same leaf a drag lifts, so it shows exactly what dragging does. It plays at most
     twice, stops for good once the reader turns a page, gives way the moment they touch the
     book, and never runs with reduced motion, on stacked (phone) pages or in a hidden tab. */

  const PEEK_IDLE_MS = [3500, 12000]; // stillness before the first hint, then before the second
  // [ms, turn progress, ease]: a small try, a settle, a bolder lift (0.1 is about 18°), a pause,
  // then the page lays itself back down
  const PEEK_KEYS = [
    [420, 0.05, easeOut],
    [300, 0.022, easeInOut],
    [440, 0.1, easeOut],
    [220, 0.1],
    [600, 0, easeInOut],
  ];
  let peek = null;
  let peekTimer = 0;
  let peeksPlayed = 0;
  let bookInView = false;

  function schedulePeek() {
    window.clearTimeout(peekTimer);
    if (peeksPlayed >= PEEK_IDLE_MS.length || !bookInView || !animate() || document.hidden) return;
    peekTimer = window.setTimeout(playPeek, PEEK_IDLE_MS[peeksPlayed]);
  }

  function retirePeek() {
    peeksPlayed = PEEK_IDLE_MS.length;
    window.clearTimeout(peekTimer);
    stopPeek();
  }

  function stopPeek() {
    if (!peek) return;
    cancelAnimationFrame(peek.raf);
    peek.overlay.remove();
    spread.classList.remove("is-peeking");
    peek = null;
  }

  function playPeek() {
    if (peek || turn || drag || !current || spread.classList.contains("is-swapping")) return schedulePeek();
    const [L, R] = pageBoxes();
    // Only a right-hand facing page lifts: not stacked pages, and not the page the gloss is on
    // (vertical Japanese binds on the right, which puts the original there)
    if (Math.abs(L.x - R.x) < 2 || R.el !== pageFacing) return;
    peeksPlayed++;

    const overlay = make("turn turn--next");
    overlay.setAttribute("aria-hidden", "true");
    overlay.inert = true;
    const leaf = place(make("turn__leaf"), R);
    const front = make("turn__face");
    const frontShade = make("turn__shade turn__shade--front");
    const back = make("turn__face turn__face--back");
    const backShade = make("turn__shade turn__shade--back");
    const cast = place(make("turn__cast"), R);
    // The folded corner lifts with its page
    front.append(fill(snapshot(pageFacing, current.id)), make("dogear dogear--next"), frontShade);
    back.append(backShade);
    leaf.append(front, back);
    leaf.style.transformOrigin = "0 50%";
    overlay.append(cast, leaf);
    spread.append(overlay);
    spread.classList.add("is-peeking");
    peek = { dir: "next", overlay, leaf, frontShade, backShade, cast, stacked: false, autoplay: false, chrome: true, p: 0, raf: 0 };

    const t0 = performance.now();
    const step = (now) => {
      if (!peek) return;
      let at = now - t0;
      let from = 0;
      for (const [ms, to, ease] of PEEK_KEYS) {
        if (at < ms) {
          setTurn(from + (to - from) * (ease ? ease(at / ms) : 1), peek);
          peek.raf = requestAnimationFrame(step);
          return;
        }
        at -= ms;
        from = to;
      }
      stopPeek();
      schedulePeek();
    };
    peek.raf = requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        bookInView = entry.intersectionRatio >= 0.6;
        schedulePeek();
      },
      { threshold: [0, 0.6] }
    ).observe(spread);
  }
  // Any input restarts the wait: the hint only plays while the visitor is sitting still
  ["pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach((type) =>
    window.addEventListener(type, () => peeksPlayed < PEEK_IDLE_MS.length && schedulePeek(), { capture: true, passive: true })
  );
  document.addEventListener("visibilitychange", schedulePeek);
  reduceMotion.addEventListener?.("change", () => (animate() ? schedulePeek() : retirePeek()));

  function renderBook() {
    const p = current;
    spread.dataset.vertical = String(!!p.vertical);
    pageOriginal.dataset.vertical = pageFacing.dataset.vertical = String(!!p.vertical);
    $("[data-title]", spread).textContent = p.title;
    $("[data-title]", spread).lang = p.lang;
    $("[data-chapter]", spread).textContent = p.chapter;
    $("[data-chapter]", spread).lang = p.lang;
    $("[data-attribution]", spread).textContent = p.author + ", " + p.year;
    $$("[data-folio]", spread).forEach((f) => (f.textContent = p.folios[Number(f.dataset.folio)]));

    passageEl.textContent = "";
    passageEl.lang = p.lang;
    words = [];
    p.sentences.forEach((s, si) => {
      let lastWord = null;
      s.w.forEach((raw) => {
        const tok = parseToken(raw);
        if (!tok) {
          let text = raw;
          // Keep closing punctuation on the same line as its word (kinsoku for Japanese, too)
          const glue = lastWord && text.match(/^[^ ]+/);
          if (glue) {
            let wrap = lastWord.parentElement;
            if (!wrap.classList.contains("nobr")) {
              wrap = document.createElement("span");
              wrap.className = "nobr";
              lastWord.replaceWith(wrap);
              wrap.append(lastWord);
            }
            wrap.append(glue[0]);
            text = text.slice(glue[0].length);
          }
          if (text) passageEl.append(document.createTextNode(text));
          lastWord = null;
          return;
        }
        const b = document.createElement("button");
        b.type = "button";
        b.className = "w";
        b.textContent = tok.w;
        b.tabIndex = -1;
        b.dataset.i = String(words.length);
        b.setAttribute("aria-expanded", "false");
        b.setAttribute("aria-controls", "gloss");
        words.push({ el: b, tok, sentence: s, line: 1 });
        passageEl.append(b);
        lastWord = b;
      });
      if (!p.vertical && si < p.sentences.length - 1) passageEl.append(document.createTextNode(" "));
    });

    if (!savedBy.has(p.id)) {
      const m = new Map();
      p.saved.forEach((w) => {
        const i = words.findIndex((x) => x.tok.w === w);
        if (i >= 0) m.set(w.toLocaleLowerCase(p.lang), i);
      });
      savedBy.set(p.id, m);
    }
    setFocusIdx(Math.max(0, words.findIndex((w) => w.tok.w === p.start)));
    renderNotes();
  }

  function setFocusIdx(i) {
    if (words[focusIdx]) words[focusIdx].el.tabIndex = -1;
    focusIdx = i;
    if (words[i]) words[i].el.tabIndex = 0;
  }

  /* Line numbers, counted from the rendered layout so they stay true at every width */
  function layoutLines() {
    if (!current || !words.length) return;
    const vertical = !!current.vertical;
    const base = passageEl.getBoundingClientRect();
    const lh = parseFloat(getComputedStyle(passageEl).lineHeight) || 26;
    const keys = words.map((w) => {
      const r = w.el.getClientRects()[0];
      if (!r) return 0;
      return vertical ? base.right - r.right : r.top - base.top;
    });
    const sorted = [...keys].sort((a, b) => a - b);
    lineStarts = [];
    sorted.forEach((k) => {
      if (!lineStarts.length || k - lineStarts[lineStarts.length - 1] > lh * 0.5) lineStarts.push(k);
    });
    let changed = false;
    words.forEach((w, i) => {
      let line = 1;
      lineStarts.forEach((s, n) => {
        if (keys[i] >= s - lh * 0.5) line = n + 1;
      });
      if (w.line !== line) changed = true;
      w.line = line;
    });

    linenosEl.textContent = "";
    const pr = pageOriginal.getBoundingClientRect();
    lineStarts.forEach((s, n) => {
      const num = n + 1;
      if (num % 5 !== 0) return;
      const tag = document.createElement("span");
      tag.textContent = String(num);
      if (vertical) {
        tag.style.left = base.right - pr.left - s - lh / 2 + "px";
        tag.style.top = base.top - pr.top - 22 + "px";
      } else {
        tag.style.top = base.top - pr.top + s + "px";
      }
      linenosEl.append(tag);
    });
    if (changed) renderNotes();
  }

  /* The facing page */
  function renderNotes(fresh) {
    const saved = savedBy.get(current.id);
    notesEl.textContent = "";
    const entries = [...saved.entries()].sort((a, b) => a[1] - b[1]);
    entries.forEach(([key, i]) => {
      const w = words[i];
      const li = document.createElement("li");
      if (key === fresh) li.className = "is-new";
      const ln = document.createElement("span");
      ln.className = "notes__line";
      ln.textContent = "l. " + w.line;
      const hw = document.createElement("span");
      hw.className = "notes__word";
      hw.lang = current.lang;
      hw.textContent = w.tok.w;
      const mean = document.createElement("span");
      mean.className = "notes__meaning";
      mean.textContent = w.tok.gloss;
      li.append(ln, hw, mean);
      notesEl.append(li);
    });
    notesEmpty.hidden = entries.length > 0;
    notesFull.hidden = entries.length < MAX_SAVED;
    words.forEach((w, i) => w.el.classList.toggle("is-saved", saved.get(keyOf(i)) !== undefined));
  }

  /* The gloss slip: floats beside the word on wide screens, docks under the passage on phones */
  function mountGloss() {
    const host = docked() ? dock : spread;
    if (gloss.parentElement !== host) host.append(gloss);
    gloss.classList.toggle("is-docked", docked());
    if (docked()) gloss.style.left = gloss.style.top = "";
  }

  function openGloss(i, { animated = true } = {}) {
    if (i < 0 || !words[i]) return;
    window.clearTimeout(closeTimer);
    const wasOpen = active >= 0 && !gloss.hidden;
    if (active >= 0 && words[active]) {
      words[active].el.classList.remove("is-active");
      words[active].el.setAttribute("aria-expanded", "false");
    }
    active = i;
    setFocusIdx(i);
    const { el, tok, sentence } = words[i];
    el.classList.add("is-active");
    el.setAttribute("aria-expanded", "true");

    glossWord.textContent = tok.w;
    glossWord.lang = current.lang;
    glossMeaning.textContent = tok.gloss;
    glossContext.textContent = sentence.t;
    syncSave();

    mountGloss();
    gloss.hidden = false;
    placeGloss();
    if (wasOpen || !animated || !animate()) {
      gloss.classList.add("no-anim", "is-open");
      requestAnimationFrame(() => gloss.classList.remove("no-anim"));
    } else {
      gloss.classList.remove("is-open");
      void gloss.offsetWidth;
      gloss.classList.add("is-open");
    }
  }

  function closeGloss(instant = false) {
    if (active >= 0 && words[active]) {
      words[active].el.classList.remove("is-active");
      words[active].el.setAttribute("aria-expanded", "false");
    }
    active = -1;
    gloss.classList.remove("is-open");
    window.clearTimeout(closeTimer);
    if (instant || !animate() || docked()) gloss.hidden = true;
    else closeTimer = window.setTimeout(() => (gloss.hidden = true), 140);
  }

  function placeGloss() {
    if (active < 0 || docked()) return;
    const el = words[active].el;
    const sr = spread.getBoundingClientRect();
    const pr = pageOriginal.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const gw = gloss.offsetWidth;
    const gh = gloss.offsetHeight;
    const pad = 10;
    const gap = 10;
    // The slip stays on the original page so the facing page is never covered
    const minX = pr.left - sr.left + pad;
    const maxX = pr.right - sr.left - gw - pad;
    const H = pr.bottom - sr.top;
    const wx = r.left - sr.left;
    const wy = r.top - sr.top;
    const cx = wx + r.width / 2;
    const cy = wy + r.height / 2;
    const clampX = (x) => Math.min(Math.max(x, minX), Math.max(minX, maxX));
    const clampY = (y) => Math.min(Math.max(y, pad), Math.max(pad, H - gh - pad));

    const sides = {
      below: { left: clampX(cx - gw / 2), top: wy + r.height + gap, fits: wy + r.height + gap + gh <= H + 12 },
      above: { left: clampX(cx - gw / 2), top: wy - gap - gh, fits: wy - gap - gh >= pad },
      left: { left: wx - gap - gw, top: clampY(cy - gh / 2), fits: wx - gap - gw >= minX },
      right: { left: wx + r.width + gap, top: clampY(cy - gh / 2), fits: wx + r.width + gap <= maxX }
    };
    // Last resorts: open upward past the page top into the margin above the book, or hang below
    // it in front of the shelf, whichever keeps the word in view
    sides.aboveLoose = { left: sides.above.left, top: sides.above.top, fits: sides.above.top >= -56 };
    const order = current.vertical
      ? ["left", "right", "below", "above", "aboveLoose"]
      : ["below", "above", "right", "left", "aboveLoose"];
    const found = order.find((k) => sides[k].fits) || "below";
    const side = found === "aboveLoose" ? "above" : found;
    const { left, top } = sides[side];
    const origin = {
      below: [cx - left, 0],
      above: [cx - left, gh],
      left: [gw, cy - top],
      right: [0, cy - top]
    }[side];

    gloss.style.left = Math.round(left) + "px";
    gloss.style.top = Math.round(top) + "px";
    gloss.style.transformOrigin = Math.round(origin[0]) + "px " + Math.round(origin[1]) + "px";
  }

  function syncSave() {
    const saved = savedBy.get(current.id);
    const on = saved.get(keyOf(active)) !== undefined;
    const full = !on && saved.size >= MAX_SAVED;
    glossSave.classList.toggle("is-saved", on);
    glossSave.classList.toggle("is-full", full);
    glossSave.setAttribute("aria-disabled", String(full));
    glossSaveLabel.textContent = on ? "Saved" : full ? "Facing page full" : "Save to facing page";
    glossSaveHint.textContent = on ? " (select to remove)" : full ? " (five words per book; remove one to save another)" : "";
  }

  glossSave.addEventListener("click", () => {
    if (active < 0) return;
    const saved = savedBy.get(current.id);
    const key = keyOf(active);
    const word = words[active].tok.w;
    if (!saved.has(key) && saved.size >= MAX_SAVED) {
      status.textContent = "The facing page holds five words. Remove one to save another.";
      return;
    }
    if (saved.has(key)) {
      saved.delete(key);
      renderNotes();
      status.textContent = "Removed " + word + " from the facing page.";
    } else {
      saved.set(key, active);
      renderNotes(key);
      status.textContent = "Saved " + word + " to the facing page, line " + words[active].line + ".";
    }
    syncSave();
  });

  glossClose.addEventListener("click", () => {
    const back = active;
    closeGloss();
    if (words[back]) words[back].el.focus();
  });

  passageEl.addEventListener("click", (e) => {
    const b = e.target.closest(".w");
    if (!b) return;
    const i = Number(b.dataset.i);
    if (i === active && !gloss.hidden) {
      closeGloss();
      return;
    }
    openGloss(i, { animated: e.detail !== 0 });
  });

  passageEl.addEventListener("keydown", (e) => {
    // In vertical Japanese the next column is to the left
    const map = current && current.vertical
      ? { ArrowDown: 1, ArrowLeft: 1, ArrowUp: -1, ArrowRight: -1 }
      : { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = -1;
    if (e.key in map) next = Math.min(Math.max(focusIdx + map[e.key], 0), words.length - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = words.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setFocusIdx(next);
    words[next].el.focus();
    if (active >= 0) openGloss(next, { animated: false });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || active < 0) return;
    const back = active;
    closeGloss();
    if (words[back]) words[back].el.focus();
  });

  document.addEventListener("pointerdown", (e) => {
    if (active < 0 || docked()) return;
    if (gloss.contains(e.target) || e.target.closest(".w") || e.target.closest(".spine")) return;
    closeGloss();
  });

  let raf = 0;
  const relayout = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      layoutLines();
      if (active >= 0) {
        mountGloss();
        placeGloss();
      }
    });
  };
  if ("ResizeObserver" in window) new ResizeObserver(relayout).observe(spread);
  else window.addEventListener("resize", relayout);
  narrow.addEventListener("change", relayout);

  select(passages[0].id, { initial: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
})();
