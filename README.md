# Wedding Invitation Site

A self-contained, dependency-free wedding invitation page (HTML/CSS/JS only —
no build step, no framework). Open `index.html` in a browser to preview.

## What's included
- Cover / "Open Invitation" gate (also unlocks background music autoplay)
- Countdown timer to the wedding date
- Couple intro section
- Love story timeline
- Ceremony/reception details + mini calendar with the date highlighted
- "Add to Calendar" (.ics download)
- Photo gallery grid
- Google Maps embed (no API key required)
- Gift/tip section with copy-to-clipboard bank details
- RSVP form (front-end only by default)
- Floating background-music toggle

## Where to put your content
| What | Where |
|---|---|
| Names, date, venue, story text | Edit directly in `index.html` — search for "Placeholder" / "Groom" / "Bride" |
| Countdown target | `#countdown[data-wedding-date]` in `index.html` |
| Calendar highlight date | `#mini-calendar[data-highlight-date]` in `index.html` |
| Map location | Replace the `q=...` value in the map `iframe` `src` in `index.html` |
| Bank/gift details | `.gift__card` blocks in `index.html` |
| Photos | Drop files into `assets/photos/` and swap the `.placeholder-photo` divs for `<img>` tags |
| Background music | Drop an MP3 into `assets/audio/music.mp3` (or update the `src` on `#bg-music`) |
| Colors/fonts | CSS variables at the top of `css/style.css` (`:root { ... }`) |

## Making RSVP actually collect responses
Right now the RSVP form just shows a thank-you message and doesn't send
anywhere. To wire it up:
1. Create a free form endpoint (e.g. [Formspree](https://formspree.io)) or a
   Google Apps Script Web App tied to a Sheet.
2. In `js/script.js`, inside `initRsvpForm()`, uncomment/adjust the `fetch(...)`
   example to POST the `FormData` to your endpoint.

## Notes
- No external JS libraries are used — everything (countdown, calendar,
  scroll reveals, copy-to-clipboard, .ics export) is plain JavaScript.
- The map embed works without a Google Maps API key since it uses the
  public `google.com/maps?q=...&output=embed` URL format.
- Autoplay policies in modern browsers require a user gesture before audio
  can play — that's why music starts on the "Open Invitation" click rather
  than on page load.
