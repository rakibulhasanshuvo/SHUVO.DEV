/* eslint-disable */
const fs = require('fs');
const content = fs.readFileSync('src/app/contact/__tests__/page.test.tsx', 'utf-8');

const newTests = `
  it('handles submission rejection with custom error message', async () => {
    // Mock global fetch directly
    const fetchMock = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        success: false,
        error: "Custom rejection message.",
      }),
    });
    global.fetch = fetchMock;

    render(<ContactPage />);

    // Wait for suspense and content to load
    await waitFor(() => {
      expect(screen.getByText('Transmission Details')).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/Corporate Email/i);
    const messageInput = screen.getByLabelText(/Your Message/i);

    // Fill form
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
    });

    const submitButton = document.querySelector("button[type='submit']") as HTMLButtonElement;

    // Submit form
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Wait for the error message to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText(/⚠ Custom rejection message./i)).toBeInTheDocument();
    });
  });

  it('handles submission rejection with default error message', async () => {
    // Mock global fetch directly
    const fetchMock = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        success: false,
      }),
    });
    global.fetch = fetchMock;

    render(<ContactPage />);

    // Wait for suspense and content to load
    await waitFor(() => {
      expect(screen.getByText('Transmission Details')).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/Corporate Email/i);
    const messageInput = screen.getByLabelText(/Your Message/i);

    // Fill form
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Hello world' } });
    });

    const submitButton = document.querySelector("button[type='submit']") as HTMLButtonElement;

    // Submit form
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Wait for the error message to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText(/⚠ Submission rejected./i)).toBeInTheDocument();
    });
  });
});
`;

const updatedContent = content.substring(0, content.lastIndexOf("});\n")) + newTests;
fs.writeFileSync('src/app/contact/__tests__/page.test.tsx', updatedContent);
