async function verifyAllRoles() {
  const roles = ['User', 'Admin Organisasi', 'Finance / Billing Admin', 'Super Admin'];
  console.log('=== VERIFIKASI KEAMANAN RBAC BILLING ===\n');

  for (const role of roles) {
    // 1. Switch role
    await fetch('http://localhost:3001/api/billing/dev-switch-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-email': 'bagoesnugrahapw@gmail.com' },
      body: JSON.stringify({ targetRole: role })
    });

    // 2. Overview check
    const ovRes = await fetch('http://localhost:3001/api/billing/overview', {
      headers: { 'x-user-email': 'bagoesnugrahapw@gmail.com' }
    });
    const ovData = await ovRes.json();

    // 3. Direct Invoice Access Check
    const invRes = await fetch('http://localhost:3001/api/billing/invoices', {
      headers: { 'x-user-email': 'bagoesnugrahapw@gmail.com' }
    });

    // 4. Update Payment Method Attempt
    const payRes = await fetch('http://localhost:3001/api/billing/payment-method', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-email': 'bagoesnugrahapw@gmail.com' },
      body: JSON.stringify({ provider: 'BCA', maskedAccount: '**** 8821' })
    });

    console.log(`[ROLE: ${role}]`);
    console.log(`- Can View Plan & Quota: ${ovData.permissions.canViewPlan}`);
    console.log(`- Can Manage Renewal: ${ovData.permissions.canManageRenewal}`);
    console.log(`- Can View Invoices: ${ovData.permissions.canViewInvoices} (Direct endpoint status: ${invRes.status})`);
    console.log(`- Can Manage Payment: ${ovData.permissions.canManagePaymentMethods} (Endpoint status: ${payRes.status})`);
    console.log(`- Invoices exposed in overview: ${ovData.invoices ? ovData.invoices.length : 'TERSEMBUNYI (null)'}`);
    console.log(`- Payment method exposed: ${ovData.paymentMethod ? ovData.paymentMethod.masked_account : 'TERSEMBUNYI (null)'}\n`);
  }

  // Kembalikan ke default role User
  await fetch('http://localhost:3001/api/billing/dev-switch-role', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-user-email': 'bagoesnugrahapw@gmail.com' },
    body: JSON.stringify({ targetRole: 'User' })
  });
  console.log('Reset akun kembali ke role: User.');
}

verifyAllRoles().catch(console.error);
