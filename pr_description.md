🧪 Testing Improvement: Test Honeypot Detection in Contact API

🎯 **What:**
Added unit tests for the honeypot detection feature inside the Contact API route (`src/app/api/contact/route.ts`). This ensures that submissions containing a value in the `confirm_corporate_website` honeypot field are accurately detected as bot spam and rejected securely.

📊 **Coverage:**
- Mocked the Next.js standard `Request` object in a Node testing environment.
- Verified that bot submissions are discarded with a `200 OK` status and a `silent_dropped` payload so bots aren't tipped off.
- Ensured `console.warn` side-effects are suppressed securely inside the test suite to keep execution clean.

✨ **Result:**
By locking down the honeypot feature with a dedicated test, we enhance test coverage and prevent future regressions to the contact form's anti-spam security mechanism.
