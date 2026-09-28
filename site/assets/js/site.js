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
  const dock = $("#gloss-dock");
  const linenosEl = $("#linenos");
  const notesEl = $("#notes");
  const notesEmpty = $("#notes-empty");
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
    b.addEventListener("click", () => select(p.id));
    spinesEl.append(b);

    // The same shelf at the foot of the page opens a volume in the demo
    if (closingSpines) {
      const c = makeSpine(p);
      c.setAttribute("aria-label", "Open the " + p.tab + " volume in the demo");
      c.addEventListener("click", () => {
        select(p.id);
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
    select(passages[next].id);
  });

  function select(id, { initial = false } = {}) {
    const p = passages.find((x) => x.id === id);
    if (!p || p === current) return;

    $$(".spine", spinesEl).forEach((t) => {
      const on = t.dataset.cloth === id;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    if (closingSpines) $$(".spine", closingSpines).forEach((t) => t.classList.toggle("is-current", t.dataset.cloth === id));
    spread.setAttribute("aria-labelledby", "spine-" + id);
    clothEls.forEach((el) => (el.dataset.cloth = id));
    if (themeMeta) themeMeta.content = THEME[id] || THEME.it;

    const swap = () => {
      current = p;
      closeGloss(true);
      renderBook();
      requestAnimationFrame(() => {
        layoutLines();
        openGloss(words.findIndex((w) => w.tok.w === p.start), { animated: !initial });
      });
    };

    if (initial || !animate()) {
      swap();
      return;
    }
    spread.classList.add("is-swapping");
    window.setTimeout(() => {
      swap();
      requestAnimationFrame(() => spread.classList.remove("is-swapping"));
    }, 170);
  }

  function renderBook() {
    const p = current;
    spread.dataset.vertical = String(!!p.vertical);
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
    const order = current.vertical ? ["left", "right", "below", "above"] : ["below", "above", "right", "left"];
    const side = order.find((k) => sides[k].fits) || "below";
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
    const on = savedBy.get(current.id).get(keyOf(active)) !== undefined;
    glossSave.classList.toggle("is-saved", on);
    glossSaveLabel.textContent = on ? "Saved" : "Save to facing page";
    glossSaveHint.textContent = on ? " (select to remove)" : "";
  }

  glossSave.addEventListener("click", () => {
    if (active < 0) return;
    const saved = savedBy.get(current.id);
    const key = keyOf(active);
    const word = words[active].tok.w;
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
