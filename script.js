// Configuration: replace FORM_ID and ENTRY_* placeholders with real values
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/FORM_ID/formResponse';
const ENTRY_EMAIL = 'entry.ENTER_EMAIL_ID';
const ENTRY_INTEREST = 'entry.ENTER_INTEREST_ID';
const ENTRY_DETAILS = 'entry.ENTER_DETAILS_ID';

const form = document.getElementById('landingForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Submitting…';

  const data = new FormData();
  data.append(ENTRY_EMAIL, form.email.value);
  const interest = form.interest.value || '';
  data.append(ENTRY_INTEREST, interest);
  data.append(ENTRY_DETAILS, form.details.value);

  try {
    // POST to Google Forms endpoint. This uses the classic "formResponse" endpoint.
    const res = await fetch(GOOGLE_FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      body: data,
    });
    // When using no-cors, fetch won't give a usable response — assume success if no exception
    status.textContent = 'Thanks! Your response was submitted.';
    form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = 'Submission failed. See console for details.';
  }
});

// Helper: open the live Google Form (constructed from FORM_ID)
function openGoogleFormPreview() {
  const preview = GOOGLE_FORM_ACTION.replace('/formResponse','');
  window.open(preview, '_blank');
}
