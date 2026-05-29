🧪 [Testing Improvement] Contact Form Error Handling on Network Failure

🎯 **What:** The testing gap addressed
The contact form page had missing test coverage for handling form submission rejections (e.g., successful fetch but with `data.success = false`). We have introduced tests to ensure correct error messages (both default and custom `data.error`) are appropriately displayed in the DOM. The `Network compilation timeout` case was already covered via `jest.fn().mockRejectedValueOnce`, but these new assertions significantly fortify the fallback scenarios.

📊 **Coverage:** What scenarios are now tested
- Validated that if a successful API response arrives with `success: false` and a specific custom error string (e.g. `data.error`), the DOM updates with `⚠ {custom error string}`.
- Validated that if a successful API response arrives with `success: false` and no custom error string provided, the DOM updates gracefully using the default fallback message `⚠ Submission rejected.`.

✨ **Result:** The improvement in test coverage
Test coverage for `src/app/contact/page.tsx` has been significantly augmented, ensuring the user interface always properly communicates failure states accurately. This safety net allows for confident refactoring inside the React form handling logic without breaking UI feedback.
