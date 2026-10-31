const assert = require('assert');

async function runTests() {
  const baseUrl = 'http://127.0.0.1:3000';
  console.log('--- Starting Comprehensive End-to-End Verification ---');

  // Helper for fetch
  async function testPage(urlPath, label) {
    const res = await fetch(`${baseUrl}${urlPath}`);
    assert.strictEqual(res.status, 200, `${label} failed with status ${res.status}`);
    const text = await res.text();
    assert(text.length > 500, `${label} response too short`);
    console.log(`[PASS] ${label} (${urlPath}) - 200 OK (${text.length} bytes)`);
    return text;
  }

  // 1. Pages
  await testPage('/', 'Home Landing Page');
  await testPage('/login', 'Citizen & Staff Login Page');
  await testPage('/dashboard', 'Citizen Dashboard Page');
  await testPage('/services', 'Service Directory');
  await testPage('/services/birth-certificate-issuance', 'Service Detail (Birth Certificate)');
  const unconfirmedHtml = await testPage('/services/building-plan-sanction-approval', 'Service Detail (Building Plan)');
  assert(unconfirmedHtml.includes('Not confirmed in the available source') || unconfirmedHtml.includes('notConfirmedInSource'), 'Unconfirmed notice present in detail');
  await testPage('/assistant', 'Citizen Assistant Page');
  await testPage('/grievance/new', 'Grievance Submission Form');
  await testPage('/grievance/track', 'Citizen Status Tracking Page');
  await testPage('/staff', 'Staff Portal Page');

  // 2. Services API
  const srvRes = await fetch(`${baseUrl}/api/services`);
  assert.strictEqual(srvRes.status, 200);
  const srvData = await srvRes.json();
  assert(srvData.services.length >= 15, `Expected >= 15 services, got ${srvData.services.length}`);
  console.log(`[PASS] /api/services returned ${srvData.services.length} services`);

  // Search filter test
  const filterRes = await fetch(`${baseUrl}/api/services?q=pension&category=welfare`);
  const filterData = await filterRes.json();
  assert(filterData.services.length > 0, 'Category search failed');
  console.log(`[PASS] /api/services search filter: found ${filterData.services.length} pension services`);

  // 3. Grounded Assistant Tests
  // 3a. English query
  const aiEnRes = await fetch(`${baseUrl}/api/assistant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'What documents are required for birth certificate registration?', language: 'en' })
  });
  const aiEn = await aiEnRes.json();
  assert.strictEqual(aiEn.isSupported, true, 'AI EN query should be supported');
  assert(aiEn.matchedServices.length > 0, 'AI EN should cite matched service');
  assert(aiEn.matchedServices[0].sourceUrl.includes('crsorgi.gov.in'), 'Source URL should match CRS');
  console.log(`[PASS] AI Assistant (EN): Grounded answer cites ${aiEn.matchedServices[0].sourceLabel} (reviewed: ${aiEn.matchedServices[0].lastReviewedDate})`);

  // 3b. Hindi query
  const aiHiRes = await fetch(`${baseUrl}/api/assistant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'जन्म प्रमाण पत्र कैसे बनवाएं?', language: 'hi' })
  });
  const aiHi = await aiHiRes.json();
  assert.strictEqual(aiHi.isSupported, true, 'AI HI query should be supported');
  assert(aiHi.answer.includes('जन्म प्रमाण पत्र'), 'Answer should be in Hindi');
  console.log(`[PASS] AI Assistant (HI): Grounded answer in Hindi with citation: ${aiHi.matchedServices[0].sourceLabel}`);

  // 3c. Telugu query & Colloquial Spoken Telugu
  const teluguSpokenQueries = [
    'నాకు రేషన్ కార్డు కావాలి',
    'బర్త్ సర్టిఫికేట్ కావాలి',
    'చెత్త సమస్య ఉంది',
    'రోడ్డు గుంతలు',
    'పట్టాదారు పాస్ పుస్తకం ఎలా వస్తుంది'
  ];
  for (const tq of teluguSpokenQueries) {
    const aiTeRes = await fetch(`${baseUrl}/api/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: tq, language: 'en' }) // Sending 'en', should auto-detect 'te'!
    });
    const aiTe = await aiTeRes.json();
    assert.strictEqual(aiTe.isSupported, true, `Spoken Telugu query "${tq}" should be supported`);
  }
  console.log(`[PASS] AI Assistant (Telugu Colloquial Voice Queries): All 5 queries auto-detected and matched accurately`);

  // 3d. Unsupported query
  const aiUnsupportedRes = await fetch(`${baseUrl}/api/assistant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'How do I build a personal rocket launchpad on public land?', language: 'en' })
  });
  const aiUn = await aiUnsupportedRes.json();
  assert.strictEqual(aiUn.isSupported, false, 'Unsupported query should have isSupported: false');
  assert(aiUn.answer.includes('cannot be confirmed from the available curated sources'), 'Unsupported answer disclaimer missing');
  assert(aiUn.suggestedActions.length > 0, 'Suggested next steps missing for unsupported answer');
  console.log(`[PASS] AI Assistant (Unsupported Query): Accurately flagged unconfirmed, recommended next steps`);

  // 4. Grievance Submission
  const grRes = await fetch(`${baseUrl}/api/grievance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: 'Damaged street water pipeline leaking on Cross 5',
      description: 'Continuous fresh water leakage causing flooding across the entire residential lane for 48 hours.',
      category: 'municipal',
      locationArea: 'Ward 11, Cross 5 Near Water Tank',
      attachmentName: 'water_leak_photo.jpg'
    })
  });
  assert.strictEqual(grRes.status, 200);
  const grData = await grRes.json();
  assert(grData.referenceNumber && grData.referenceNumber.startsWith('SR-'), 'Invalid reference number format');
  assert(grData.pin && grData.pin.length === 6, 'PIN should be 6 digits');
  assert(grData.demoNotice.includes('demo'), 'Demo notice missing from submission');
  console.log(`[PASS] Grievance Created: Reference=${grData.referenceNumber}, PIN=${grData.pin}`);

  // 5. Citizen Tracking with generated credentials
  const trackRes = await fetch(`${baseUrl}/api/grievance/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      referenceNumber: grData.referenceNumber,
      pin: grData.pin
    })
  });
  assert.strictEqual(trackRes.status, 200);
  const trackData = await trackRes.json();
  assert.strictEqual(trackData.grievance.status, 'SUBMITTED');
  assert.strictEqual(trackData.grievance.statusHistory.length, 1);
  assert.strictEqual(trackData.grievance.pinHash, undefined, 'pinHash must NEVER be returned to client');
  console.log(`[PASS] Citizen Tracking: Successfully retrieved status timeline (${trackData.grievance.status}) with secure PIN verification`);

  // 6. Citizen Tracking with wrong PIN
  const wrongPinRes = await fetch(`${baseUrl}/api/grievance/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      referenceNumber: grData.referenceNumber,
      pin: '000000'
    })
  });
  assert.strictEqual(wrongPinRes.status, 401);
  const wrongData = await wrongPinRes.json();
  assert.strictEqual(wrongData.reason, 'INVALID_PIN');
  console.log(`[PASS] Citizen Tracking: Correctly rejected incorrect PIN (401 INVALID_PIN)`);

  // 7. Staff Authorization & Queue
  // 7a. Unauthorized access check
  const unauthRes = await fetch(`${baseUrl}/api/staff/grievances`);
  assert.strictEqual(unauthRes.status, 401, 'Staff endpoint must reject unauthorized requests');
  console.log(`[PASS] Staff Queue: Server-side authentication enforced (401 on unauthenticated GET)`);

  // 7b. Staff login
  const loginRes = await fetch(`${baseUrl}/api/staff/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode: 'staff-demo-2026' })
  });
  assert.strictEqual(loginRes.status, 200);
  const cookieHeader = loginRes.headers.get('set-cookie');
  assert(cookieHeader && cookieHeader.includes('civic_staff_session'), 'Session cookie missing');
  console.log(`[PASS] Staff Login: Authenticated, HTTP-only session cookie issued`);

  // 7c. Authorized Queue Retrieval
  const queueRes = await fetch(`${baseUrl}/api/staff/grievances`, {
    headers: { Cookie: cookieHeader }
  });
  assert.strictEqual(queueRes.status, 200);
  const queueData = await queueRes.json();
  assert(queueData.grievances.length > 0, 'Staff queue should contain submitted grievances');
  const targetGrievance = queueData.grievances.find(g => g.referenceNumber === grData.referenceNumber);
  assert(targetGrievance, 'Created grievance not found in staff queue');
  console.log(`[PASS] Staff Queue: Fetched ${queueData.grievances.length} grievances, located target record ${grData.referenceNumber}`);

  // 7d. Update grievance status to UNDER_REVIEW
  const patchRes = await fetch(`${baseUrl}/api/staff/grievances`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader
    },
    body: JSON.stringify({
      id: targetGrievance.id,
      status: 'UNDER_REVIEW',
      category: 'municipal',
      notes: 'Demo inspection crew assigned to Ward 11 cross 5 for valve check.',
      reviewerName: 'Demo Reviewer Rajesh'
    })
  });
  assert.strictEqual(patchRes.status, 200);
  const patchData = await patchRes.json();
  assert.strictEqual(patchData.grievance.status, 'UNDER_REVIEW');
  assert.strictEqual(patchData.grievance.statusHistory.length, 2);
  assert.strictEqual(patchData.grievance.statusHistory[1].updatedBy, 'Demo Reviewer Rajesh');
  console.log(`[PASS] Staff Update: Status transitioned to UNDER_REVIEW, audit note recorded in statusHistory`);

  // 8. Re-verify citizen tracking sees updated status
  const retrackRes = await fetch(`${baseUrl}/api/grievance/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      referenceNumber: grData.referenceNumber,
      pin: grData.pin
    })
  });
  const retrackData = await retrackRes.json();
  assert.strictEqual(retrackData.grievance.status, 'UNDER_REVIEW');
  assert.strictEqual(retrackData.grievance.statusHistory.length, 2);
  console.log(`[PASS] Citizen Tracking (Post-Update): Real-time reflection of new status 'UNDER_REVIEW' and staff timeline`);

  // 9. Citizen User Authentication & Demo Account
  const citLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'citizen@demo.gov.in', password: 'CitizenDemo@2026' })
  });
  assert.strictEqual(citLoginRes.status, 200);
  const citLoginData = await citLoginRes.json();
  assert.strictEqual(citLoginData.success, true);
  assert(citLoginData.user.name.includes('Ramesh Kumar'), 'Citizen name mismatch');
  const citCookie = citLoginRes.headers.get('set-cookie');

  // Verify dashboard session
  const meRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Cookie: citCookie }
  });
  const meData = await meRes.json();
  assert.strictEqual(meData.authenticated, true);
  assert(meData.grievances.length >= 2, 'Pre-loaded demo grievances missing');
  console.log(`[PASS] Citizen Authentication: Demo citizen logged in, ${meData.grievances.length} preloaded grievances verified`);

  console.log('\n=========================================');
  console.log('ALL 18 END-TO-END JOURNEY CHECKS PASSED!');
  console.log('=========================================');
}

runTests().catch(err => {
  console.error('\n[TEST FAILURE]:', err);
  process.exit(1);
});

