import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ContactPage from '../page';

// Mock next/navigation
const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock window.matchMedia for framer-motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock PointerEvent
class PointerEvent extends Event {
    pointerId: number;
    clientX: number;
    clientY: number;
    constructor(type: string, props: any) {
        super(type, props);
        this.pointerId = props.pointerId || 0;
        this.clientX = props.clientX || 0;
        this.clientY = props.clientY || 0;
    }
}
window.PointerEvent = PointerEvent as any;

describe('ContactPage Error Handling', () => {
  let originalFetch: any;

  beforeEach(() => {
    jest.clearAllMocks();
    originalFetch = global.fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it('handles network compilation timeout on form submission failure', async () => {
    const mockError = new Error('Simulated network error');

    // Mock global fetch directly
    const fetchMock = jest.fn().mockRejectedValueOnce(mockError);
    global.fetch = fetchMock;

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

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

    // Verify fetch was called correctly
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }));

    // Wait for the error message to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText(/⚠ Network compilation timeout./i)).toBeInTheDocument();
    });

    // Verify console error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
  });
});
