const assert = require('assert');

async function runIntegrationTest() {
  console.log('Starting Integration Test: Checking Web to API communication...');
  
  // ה-Web פתוח מבחוץ בפורט 3000
  const webUrl = 'http://localhost:3000/';

  try {
    const response = await fetch(webUrl);
    
    if (!response.ok) {
      throw new Error(`Web service returned status code ${response.status}`);
    }

    const htmlContent = await response.text();
    
    // מוודא שהעמוד מכיל את הנתונים שהתקבלו מה-API (ישראל ופלורידה)
    if (htmlContent.includes('Israel') && htmlContent.includes('Florida')) {
      console.log('SUCCESS: Web service successfully fetched data from API service!');
      process.exit(0);
    } else {
      throw new Error('Web response did not contain expected data from API.');
    }
  } catch (err) {
    console.error('FAILURE: Integration test failed ->', err.message);
    process.exit(1);
  }
}

runIntegrationTest();