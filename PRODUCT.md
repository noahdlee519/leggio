# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and a little vanilla JS. No build step. Hosted on Vercel or Netlify as a static site. This repository holds the marketing site and the privacy policy only; the extension source lives elsewhere. The site (not the extension) counts visits with Vercel Web Analytics, which is cookie-free and disclosed in the privacy policy.

## Users

Language learners who read in the language they are learning: articles, PDFs, papers, novels, course readers. They are past the absolute-beginner stage and want to read real material instead of graded drills. They are usually at a desk, in desktop Chrome, reading something longer than a paragraph.

## Product Purpose

Leggio is a Chrome extension that keeps a translation within reach while you read a PDF or any page in another language, so that you keep reading in that language instead of switching to a translated copy. Success is a learner finishing a text in the language they are learning and keeping the words they looked up.

The founder's conviction is that reading in the target language is one of the most important ways to learn it. The product exists to make that habit easier to keep.

## Positioning

Leggio translates **on the device** by default, through Chrome's built-in translation models: text you translate is not sent to a server. Learners who prefer DeepL or Google Cloud Translation can add their own key, and then their lookups go to that service. It is built for learning by reading, not for replacing the original with a translation.

## Operating Context

- Desktop Chrome, as a browser extension.
- Works on PDFs and on ordinary web text.
- The learner selects or points at text they don't understand, sees a translation, and keeps reading.
- Words the learner saves go into a vocabulary list stored on their own device.

## Capabilities and Constraints

Confirmed:

- Translation runs on-device by default, using Chrome's built-in AI (Translator and Language Detector APIs); text does not leave the browser for translation. As an option, the learner can add their own DeepL or Google Cloud Translation API key, and then the text they look up goes to that service.
- Free.
- Interaction: select a word or phrase (on a web page, or in Leggio's own PDF reader) and press a key (T by default) to see its meaning in that sentence beside the sentence's translation; S saves it. In Chrome's own PDF viewer, copy the text and press Option+T / Alt+T.
- Features: meaning in context; idioms recognised and explained in Italian, Spanish, French, German, Portuguese and Czech (from Wiktionary); read aloud with the computer's voices; scanned PDFs read with OCR in the browser; a word list with CSV export (for Anki, Excel or Google Sheets).
- Stores the user's settings locally (chrome.storage on the device).
- Stores the learner's saved words / vocabulary list locally.
- No accounts, no backend server, no analytics in the extension.
- Minimum Chrome version: 138 (desktop).
- Public contact email: noahlee519@gmail.com (the owner's), used in the footer, the privacy policy and the comparison's "tell us" link.

Open, not yet confirmed (do not invent):

- Supported languages (they follow Chrome's built-in translator, or the service whose key the learner adds).
- Chrome Web Store URL (the listing does not exist yet).

## Brand Commitments

- Name: **Leggio**. Italian for a reading stand or lectern, from *leggere*, "to read".
- Voice: a fellow learner who believes in reading as a method. Plain, warm, specific. No hype.

## Evidence on Hand

- No testimonials, user counts, reviews, press or screenshots exist yet. Do not fabricate any.
- No logo asset has been supplied.

## Product Principles

1. Keep the learner in the original text. The translation is a support, never a replacement.
2. Private by construction: on-device translation, local storage, nothing to sign up for.
3. Reading is the method. Every feature should make it easier to read one more page in the language being learned.
4. Stay out of the way. Help appears when asked for and leaves when it isn't needed.

## Accessibility & Inclusion

The audience reads many languages and scripts, so the site should handle non-Latin text gracefully and meet WCAG 2.2 AA.
