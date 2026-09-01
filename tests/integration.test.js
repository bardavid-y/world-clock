const assert = require('assert');

async function runIntegrationTest() {
  console.log('Starting Integration Test: Checking Web to API communication...');
  
  // שימוש ב-host.docker.internal כדי שג'נקינס יוכל לגשת לשירות הרץ ב-Docker
  const webUrl = process.env.WEB_URL || 'http://host.docker.internal:3000/';

  try {
    const response = await fetch(webUrl);
    
    if (!response.ok) {
      throw new Error(`Web service returned status code ${response.status}`);
    }

    const htmlContent = await response.text();
    
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