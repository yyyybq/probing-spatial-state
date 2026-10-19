# Project page: Probing Spatial State

Interactive project page for *Probing Spatial State Representations in Visual Foundation Models*.
Everything runs client-side: a small raycaster renders the toy apartment live in the browser.

| File | Role |
| --- | --- |
| `page.html` | Source of truth. Body-only HTML (no `<html>/<head>`), also published as the Claude artifact preview |
| `index.html` | Standalone page generated from `page.html` by `build.sh`; this is what you host |
| `assets/` | `promo.mp4` (720p cut of the 3-minute video), `poster.jpg`, `teaser.jpg` (paper Fig. 1), `promo.en.vtt` |
| `build.sh` | `bash build.sh` regenerates `index.html` after editing `page.html` |
| `serve.js` | Local preview with video byte ranges: `node serve.js . 8765`, then open http://127.0.0.1:8765 |

Captions for the video are embedded in `page.html` (`#capdata`) and attached in script, so the page
needs no `.vtt` request; `assets/promo.en.vtt` is kept for uploading the video elsewhere.

## Sections

1. Hero: live first-person view; drag to turn, the plan keeps dashed outlines of what left the view.
2. Memory test: the visitor points to a hidden object; their error is compared with the ten models.
3. Four levels (L1 to L4) with live demos: depth / instance views, memory arrows, expected next view,
   pick-the-better-move; plus the paper's Fig. 1 and the causal-prefix protocol strip.
4. Results: rank-shaded main table (sortable), per-model profile, five findings.
5. Layers and prefix: peak block per task (V-JEPA 2, VideoMAE); p24 vs p8 sign grid (82%).
6. Robot errand: one task, four key operations (localize, turn back to the mug, plan the trip,
   carry it). Each backbone replays its measured numbers; the ideal state shows a success.
7. Controls: copy vs learned prediction, motion and history effects with 95% intervals,
   reading V-JEPA 2's own predictions, goal shuffle.
8. Video, takeaway, abstract, BibTeX.

All numbers come from the paper (same values as `../video_3b1b/results_data.py`). The apartment,
robot and errand are illustrations; the page says so where they appear.

## Before going public

- Replace "Anonymous authors" and the meta line in the hero, the footer and the BibTeX entry.
- Add paper and code links to the hero button row (`.btnrow` under `.verdict`).
- To host on GitHub Pages: copy `index.html` and `assets/` to the site root.
