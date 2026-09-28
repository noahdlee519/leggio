# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and a little vanilla JS. No build step. Hosted on Vercel or Netlify as a static site. This repository holds the marketing site and the privacy policy only; the extension source lives elsewhere.

## Users

Language learners who read in the language they are learning: articles, PDFs, papers, novels, course readers. They are past the absolute-beginner stage and want to read real material instead of graded drills. They are usually at a desk, in desktop Chrome, reading something longer than a paragraph.

## Product Purpose

Leggio is a Chrome extension that keeps a translation within reach while you read a PDF or any page in another language, so that you keep reading in that language instead of switching to a translated copy. Success is a learner finishing a text in the language they are learning and keeping the words they looked up.

The founder's conviction is that reading in the target language is one of the most important ways to learn it. The product exists to make that habit easier to keep.

## Positioning

Leggio translates **on the device**, through Chrome's built-in translation models. Text you translate is not sent to a server. It is built for learning by reading, not for replacing the original with a translation.

## Operating Context

- Desktop Chrome, as a browser extension.
- Works on PDFs and on ordinary web text.
- The learner selects or points at text they don't understand, sees a translation, and keeps reading.
- Words the learner saves go into a vocabulary list stored on their own device.

## Capabilities and Constraints

Confirmed:

- Translation runs on-device using Chrome's built-in AI (Translator and Language Detector APIs). Text does not leave the browser for translation.
- Stores the user's settings locally (chrome.storage on the device).
- Stores the learner's saved words / vocabulary list locally.
- No accounts, no backend server, no analytics.

Open, not yet confirmed (do not invent):

- The exact interaction model (select-to-translate, hover, side panel, etc.) and full feature list. These are in `LEGGIO_BRIEF.md`, which is not in this repository.
- Supported languages and minimum Chrome version.
- Pricing.
- Chrome Web Store URL (the listing does not exist yet).
- Public contact email for the privacy policy (the owner will supply one).

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
