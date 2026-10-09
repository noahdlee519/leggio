# Leggio website

The marketing site and privacy policy for **Leggio**, a Chrome extension that helps language learners read in the original.

It's plain HTML, CSS and a little JavaScript, with no build step. Everything the site loads, fonts included, is served from the site itself, so it makes no third-party requests. The one outside service is Vercel Web Analytics, whose script and endpoint also live on the site's own domain (see [Analytics](#analytics)). The privacy policy describes both.

```
site/                    ← the folder you deploy
  index.html             landing page
  privacy/index.html     privacy policy  →  https://<your-domain>/privacy/
  404.html
  assets/
    css/site.css
    js/config.js         ← the two settings you edit
    js/site.js           demo + settings
    js/passages.js       demo texts (public domain) and hand-written glosses
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

**Netlify:** import the repository. `netlify.toml` sets the publish directory to `site`. The build command stays empty. Analytics only works on Vercel, so on Netlify remove the analytics script and its privacy policy text (see [Analytics](#analytics)).

Both configs add a strict Content-Security-Policy (`'self'` only) and long cache headers for the fonts.

For the Chrome Web Store listing, the privacy policy URL is `https://<your-domain>/privacy/`.

## Analytics

The site counts visits with [Vercel Web Analytics](https://vercel.com/docs/analytics): no cookies, an anonymous visitor ID that resets daily, and free on the Hobby plan up to 50,000 events a month. The extension itself has no analytics.

1. In the Vercel dashboard, open the project, go to **Analytics** and click **Enable**.
2. Redeploy (push any commit, or use **Redeploy** in the dashboard). Vercel only serves the analytics script after analytics is enabled and the site has been redeployed.
3. Check it: open the live site, open Chrome DevTools → **Network**, reload, and look for `script.js` and `view` requests under `/_vercel/insights/` with status 200. Visits show up in the **Analytics** tab within a few minutes.

Every page loads it with one line in its `<head>`:

```html
<script src="/_vercel/insights/script.js" defer></script>
```

It's in `index.html`, `privacy/index.html` and `404.html`. Add the same line to any new page. Vercel's guide also shows an inline `window.va` snippet. Leave it out: it's only needed for custom events, and the Content-Security-Policy blocks inline scripts.

The script only exists on Vercel deployments, so it shows as a 404 in local preview (and on Netlify). That's expected and harmless.

If you ever remove analytics, delete that line from every page and put back the "no analytics" wording on the site: the privacy policy (the short version and "This website"), and the Tracking fact on the landing page.

## Keeping the privacy policy accurate

The privacy policy is the URL the Chrome Web Store listing points to, and reviewers check it against what the extension does and against the listing's privacy practices. It was checked against the extension's code at version 1.0.1 (the `leggio-extension` repo). It covers: on-device translation by default; the optional DeepL and Google Cloud engines, which receive the words and their sentences; the script on web pages; PDFs downloaded into Leggio's reader; OCR language data from cdn.jsdelivr.net; the clipboard shortcut; read-aloud through Chrome's voices, some of them online; what's stored (settings synced by Chrome sync, a local word list with each page's title and address, local API keys, an OCR cache); each permission; and this website's analytics.

The extension repo has its own copy in `store/privacy-policy.html`. When the extension changes what it stores, sends or asks permission for, update both, and change the effective date (now 9 October 2026).

The landing page's demo shows a "select a word, see its translation and the sentence's translation, save it" flow and says Leggio works on web pages and PDFs. If the extension's interaction is different (a side panel, hover, etc.), adjust the copy in `index.html` so the site describes it truthfully.

## The demo

The book in the hero is a working demo: pick a volume from the shelf (each language has its own cloth colour, like a series of bilingual editions), select any word, and save it to the facing page. The translations are written by hand for the demo, and the page says so. The texts are public domain:

- Carlo Collodi, *Le avventure di Pinocchio* (1883)
- Miguel de Cervantes, *Don Quijote* (1605)
- Marcel Proust, *Du côté de chez Swann* (1913)
- Franz Kafka, *Die Verwandlung* (1915)
- Natsume Sōseki, *吾輩は猫である* (1905), set vertically as in a Japanese book

To add or edit a passage, see the format notes at the top of `passages.js`. If you add Japanese characters that aren't already on the site, regenerate the Noto Serif JP subset in `assets/fonts/` to include them.
