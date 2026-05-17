# Landing page with Google Form integration

This project contains a simple landing page with a video and a signup form. The JS is prepared to submit directly to a Google Form endpoint, but you must create the Google Form and copy the correct `FORM_ID` and `entry.*` field IDs into `script.js`.

Steps to connect the form to Google Forms and Sheets:

1. Create a Google Form with three fields: Email (Short answer), Interest (Multiple choice or radio with values "yes"/"no"), Additional details (Paragraph).
2. Click Responses → the three-dot menu → "Select response destination" → create a new Google Sheet.
3. Open the form preview (eyeball icon), open your browser DevTools (Network tab), fill the form, and submit.
4. In the Network tab find the request to a URL that contains `/formResponse` — select it and inspect the request payload. Field names look like `entry.123456789`.
5. In `script.js` replace `FORM_ID` in `GOOGLE_FORM_ACTION` and replace `ENTRY_EMAIL`, `ENTRY_INTEREST`, and `ENTRY_DETAILS` with the `entry.*` names you discovered.

Example values in `script.js` after replacing:

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSf.../formResponse';
const ENTRY_EMAIL = 'entry.1111111111';
const ENTRY_INTEREST = 'entry.2222222222';
const ENTRY_DETAILS = 'entry.3333333333';

Notes:
- The script uses `fetch` with `mode: 'no-cors'` because Google Forms rejects cross-origin requests; with `no-cors` the browser will not expose the real response but the submission will still reach Google Forms.
- If you prefer server-side submission (more reliable and observable), create a small backend that posts to the Google Form endpoint or writes directly to Google Sheets via the Sheets API.

Deployment to GitHub Pages
-------------------------

To publish this site on GitHub Pages under the `toacp` account, run the following (replace `landingpage` with your chosen repo name):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/toacp/landingpage.git
git push -u origin main
```

Then go to the repository Settings → Pages and choose to serve from the `main` branch (root). The site will be available at `https://toacp.github.io/landingpage/`.

Notes about video size
- Large videos increase repo size; consider hosting the video externally (Cloudflare, S3, Cloudinary) and update the `src` in `index.html` if you run into repo size or bandwidth issues.


How to capture the entry IDs (quick):

- Open devtools → Network. Filter by "formResponse" or look for a POST request when submitting the form preview.
- Inspect the request's payload: you'll see key/value pairs like `entry.123456789=you@example.com`.
- Copy those `entry.*` keys into `script.js`.

Place your video in `assets/hero.mp4` (replace the placeholder). The assets folder contains a small README.
