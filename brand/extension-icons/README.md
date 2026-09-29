# Leggio extension icons

The same mark as the website favicon (`site/assets/img/favicon.svg`): an open book on a lectern, in gilt `#E4C57E` on house green `#1F4E3D`.

| File | Use |
|---|---|
| `icon16.png` | Toolbar icon, favicon for extension pages |
| `icon32.png` | Toolbar icon on high-density screens, Windows |
| `icon48.png` | chrome://extensions page |
| `icon128.png` | Install dialog and Chrome Web Store. It is 96px of artwork with 16px of transparent padding, as the Web Store asks |

The `.svg` files are the sources. The 16px and 32px versions use heavier strokes so the mark stays legible when small.

In the extension's `manifest.json` (Manifest V3):

```json
"icons": {
  "16": "icons/icon16.png",
  "32": "icons/icon32.png",
  "48": "icons/icon48.png",
  "128": "icons/icon128.png"
},
"action": {
  "default_icon": {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png"
  }
}
```

Keep any other keys already in `"action"` (such as `"default_popup"`) and only add or replace `"default_icon"`.
