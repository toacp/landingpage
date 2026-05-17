// Replace this with your deployed Google Apps Script Web App URL.
// The script in google-sheets-app-script.gs appends submissions directly to Google Sheets.
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyoGRWu6mhWc1iPg8oDccoMc-q4MidY8bbpYjEOkr_taNmgDcFIVJcZuiYH4T5TxAGoag/exec';

const form = document.getElementById('landingForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Submitting…';

  const data = new FormData();
  data.append('email', form.email.value);
  data.append('interest', form.interest.value || '');
  data.append('details', form.details.value);
  data.append('pageUrl', window.location.href);
  data.append('submittedAt', new Date().toISOString());

  try {
    // POST to Google Apps Script endpoint. no-cors is used so the browser will send
    // the request even when the web app is hosted on Google domains.
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: data,
    });
    // With no-cors, the browser won't expose the response. No exception means the
    // request was sent, and the Apps Script web app will append the row to Sheets.
    status.textContent = 'Thanks! Your response was submitted to Google Sheets.';
    form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = 'Submission failed. See console for details.';
  }
});
