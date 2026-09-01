const assert = require('assert');

async function runIntegrationTest() {
  console.log('Running integration test...');
  try {
    const res = await fetch('http://localhost:3000/');
    if (res.ok) {
      console.log('Integration Test Passed: Web successfully communicated with API.');
    } else {
      console.error('Integration Test Failed: Web returned status', res.status);
      process.exit(1);
    }
  } catch (err) {
    console.error('Integration Test Failed with error:', err.message);
    process.exit(1);
  }
}

runIntegrationTest();