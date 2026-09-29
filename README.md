# Leggio website

The marketing site and privacy policy for **Leggio**, a Chrome extension that helps language learners read in the original.

It's plain HTML, CSS and a little JavaScript, with no build step. Everything the site loads, fonts included, is served from the site itself, so it makes no third-party requests. That matches what the privacy policy says about the website.

```
site/                    ← the folder you deploy
  index.html             landing page
  privacy/index.html     privacy policy  →  https://getleggio.com/privacy/
  404.html
  assets/
    css/site.css
    js/config.js         ← the two settings you edit
    js/site.js           demo + settings
    js/passages.js       demo texts (public domain) and their glosses
    fonts/               Alegreya, Alegreya SC, Alegreya Sans, Noto Serif JP subset (SIL OFL)
    img/                 favicon, touch icon, social preview
vercel.json / netlify.toml   hosting config (publish dir + security headers)
PRODUCT.md, DESIGN.md        product and design notes (not deployed)
```

## The two settings

Open `site/assets/js/config.js`:

```js
window.LEGGIO_CONFIG = {
  chromeStoreUrl: "",   // paste the Chrome Web Store listing URL
  contactEmail: "noahlee519@gmail.com"
};
```

- While `chromeStoreUrl` is empty, every install button says **Coming soon to the Chrome Web Store** and isn't clickable. Once you paste the URL, they turn into **Add to Chrome** links.
- `contactEmail` is set to noahlee519@gmail.com. The address is also written into the HTML (the footer links and the Contact section of the privacy policy), so it shows even without JavaScript. To change it later, update `config.js` and search the `.html` files for the old address.

## Preview locally

```sh
npx http-server site -p 8080
# then open http://localhost:8080
```

Opening `index.html` directly from disk won't work because the site uses root-relative paths (`/assets/...`). Use a local server.

## Deploy

**Vercel:** import the repository. `vercel.json` sets the output directory to `site`. Leave the framework preset as "Other" and the build command empty.

**Netlify:** import the repository. `netlify.toml` sets the publish directory to `site`. The build command stays empty.

Both configs add a strict Content-Security-Policy (`'self'` only) and long cache headers for the fonts.

The site lives at **https://getleggio.com**. For the Chrome Web Store listing, the privacy policy URL is `https://getleggio.com/privacy/`. The canonical and social-preview tags in the HTML, `robots.txt` and `sitemap.xml` all use this domain, so update them if it ever changes.

## Before you publish: check the privacy policy against the extension

The policy is written only from these facts: translation runs on-device with Chrome's built-in Translator and Language Detector APIs; settings and saved words are stored locally; there are no accounts, servers, analytics or Chrome sync. Once you've checked the extension, you may want to say more:

1. **Saved words** (What Leggio stores): if you keep more than the word, such as its translation, the source sentence or the page title, list it.
2. **Permissions**: the paragraph points to the Web Store listing. You can list your `manifest.json` permissions and what each one is for.
3. **Deleting your data**: this says uninstalling removes everything. If Leggio stores anything outside its own extension storage, update it.
4. **Effective date**: 28 September 2026. Change it whenever the policy changes.

The landing page's demo shows a "select a word, see its translation and the sentence's translation, save it" flow and says Leggio works on web pages and PDFs. If the extension's interaction is different (a side panel, hover, etc.), adjust the copy in `index.html` so the site describes it truthfully.

## The demo

The book in the hero is a working demo: pick a volume from the shelf (each language has its own cloth colour, like a series of bilingual editions), select any word, and save it to the facing page. The translations are written by hand for the demo, and the texts are credited in the footer. Each book's facing page holds up to five saved words. The texts are public domain:

- Carlo Collodi, *Le avventure di Pinocchio* (1883)
- Miguel de Cervantes, *Don Quijote* (1605)
- Marcel Proust, *Du côté de chez Swann* (1913)
- Franz Kafka, *Die Verwandlung* (1915)
- Natsume Sōseki, *吾輩は猫である* (1905), set vertically as in a Japanese book

To add or edit a passage, see the format notes at the top of `passages.js`. If you add Japanese characters that aren't already on the site, regenerate the Noto Serif JP subset in `assets/fonts/` to include them.
