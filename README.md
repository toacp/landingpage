# Landing page with Google Sheets integration

This project contains a simple landing page with a video and a signup form. The form now submits directly to Google Sheets through a Google Apps Script web app, which is easier than managing Google Form entry IDs.

Steps to connect the form to Google Sheets:

1. Create a Google Sheet for storing responses.
2. In the Sheet, go to Extensions → Apps Script.
3. Replace the script with the code in `google-sheets-app-script.gs`.
4. Deploy it as a Web App: Deploy → New deployment → Type: Web app.
5. Set "Execute as" to your account and "Who has access" to Anyone.
6. Copy the Web App URL and replace `YOUR_DEPLOYMENT_ID` in `script.js`.

What the web app does:
- Accepts `email`, `interest`, `details`, `pageUrl`, and `submittedAt`.
- Appends a new row to the connected Google Sheet.
- Lets the landing page update the sheet live with every submission.

Example values in `script.js` after replacing:

const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycb.../exec';

Notes:
- The script uses `fetch` with `mode: 'no-cors'` so the browser can send the request to the Apps Script web app without CORS errors.
- If you still want to route through Google Forms, I can switch this back and wire the entry IDs instead.

Apps Script code
----------------

Create a file named `google-sheets-app-script.gs` in the repo with this code, then paste it into the Google Apps Script editor:

```javascript
function doPost(e) {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
	const data = e.parameter;

	sheet.appendRow([
		new Date(),
		data.email || '',
		data.interest || '',
		data.details || '',
		data.pageUrl || '',
		data.submittedAt || ''
	]);

	return ContentService
		.createTextOutput(JSON.stringify({ ok: true }))
		.setMimeType(ContentService.MimeType.JSON);
}
```

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


Video notes
-----------

- The landing page now points at the video already in the repo: `WhatsApp Video 2026-05-17 at 1.25.33 PM.mp4`.
- If you want a cleaner filename later, rename that file to `assets/hero.mp4` and update the `<source>` path in `index.html`.
- The page still keeps `assets/hero.mp4` as a fallback source.
