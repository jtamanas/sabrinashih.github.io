# Sabrina Shih, LCSW — Professional Portfolio

A single-page portfolio website for Sabrina Shih, LCSW — Clinical Social Worker and Director of the Adolescent Program at Mount Sinai Hospital's Eating and Weight Disorders Program (UWS, NYC).

## Design

Inspired by the TIBAY+ colorful card-grid template. Seven rounded-rectangle cards arranged in a responsive grid, each with a decorative SVG illustration on the front that flips on click to reveal content on the back.

**Cards:** Sabrina Shih (bio) · Resume · Outreach · Past Talks · Contact · Advocacy · DEI

**Color palette:** Muted Denim Blue · Pale Ice Blue · Soft Peach · Light Sage Green · Muted Slate Green on a warm cream background.

## Tech Stack

Plain HTML, CSS, and JavaScript — no frameworks, no build step. Works on any static host (GitHub Pages, Netlify, Vercel, etc.).

## File Structure

```
SabSite/
├── index.html      # Main page
├── style.css       # Layout, cards, flip animation, responsive breakpoints
├── script.js       # Card flip toggle
├── README.md
└── docs/
    └── Sabrina_Shih_CV.pdf
```

## Running Locally

Open `index.html` in a browser, or serve it with any static server:

```sh
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

## Responsive Breakpoints

| Width       | Layout                    | Header   |
|-------------|---------------------------|----------|
| > 1024px    | 4 columns                 | Static   |
| 601–1024px  | 3 columns                 | Sticky   |
| 381–600px   | 2 columns                 | Sticky   |
| ≤ 380px     | 1 column                  | Sticky   |
