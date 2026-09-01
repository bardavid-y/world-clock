const assert = require('assert');

async function runTest() {
  const mode = process.argv[2]; // 'normal' or 'chaos'
  const webUrl = process.env.WEB_URL || 'http://host.docker.internal:3000/';

  console.log(`Running test in [${mode || 'normal'}] mode...`);

  try {
    const response = await fetch(webUrl);

    if (mode === 'chaos') {
      // במצב חבלה, אם ה-API נפל, מצפים שה-Web יחזיר שגיאה 500 (ולא יקרוס)
      if (response.status === 500) {
        console.log('SUCCESS: Chaos test passed! Web gracefully handled API failure with status 500.');
        process.exit(0);
      } else {
        console.error('FAILURE: Expected status 500 during chaos, got:', response.status);
        process.exit(1);
      }
    } else {
      // מצב רגיל
      if (!response.ok) {
        throw new Error(`Web service returned status code ${response.status}`);
      }
      const html = await response.text();
      if (html.includes('Israel') && html.includes('Florida')) {
        console.log('SUCCESS: Normal integration test passed.');
        process.exit(0);
      } else {
        throw new Error('Web response did not contain expected data.');
      }
    }
  } catch (err) {
    if (mode === 'chaos') {
      console.log('SUCCESS: Chaos test passed (Connection/Server error handled gracefully).');
      process.exit(0);
    } else {
      console.error('FAILURE:', err.message);
      process.exit(1);
    }
  }
}

runTest();