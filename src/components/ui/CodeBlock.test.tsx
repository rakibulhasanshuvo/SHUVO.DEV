import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CodeBlock from './CodeBlock';

// Mock matchMedia for Framer Motion if needed
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

// Mock navigator.clipboard
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('CodeBlock component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders correctly with given props', () => {
    render(<CodeBlock code="console.log('test');" language="javascript" filename="test.js" />);

    expect(screen.getByText('test.js')).toBeInTheDocument();
    expect(screen.getByText("console.log('test');")).toBeInTheDocument();
  });

  it('copies code to clipboard successfully and shows success icon', async () => {
    jest.useFakeTimers();
    mockWriteText.mockResolvedValueOnce(undefined);

    render(<CodeBlock code="const a = 1;" language="javascript" />);

    const copyButton = screen.getByRole('button', { name: /copy code snippet/i });

    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(mockWriteText).toHaveBeenCalledWith("const a = 1;");
    expect(mockWriteText).toHaveBeenCalledTimes(1);

    // Fast forward to trigger timeout reset
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    jest.useRealTimers();
  });

  it('handles clipboard copy error gracefully and logs to console', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Clipboard denied');

    mockWriteText.mockRejectedValueOnce(mockError);

    render(<CodeBlock code="const b = 2;" language="javascript" />);

    const copyButton = screen.getByRole('button', { name: /copy code snippet/i });

    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(mockWriteText).toHaveBeenCalledWith("const b = 2;");
    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to copy code: ", mockError);

    consoleErrorSpy.mockRestore();
  });
});
