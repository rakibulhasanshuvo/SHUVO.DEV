import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GlowingInput } from './GlowingInput';

describe('GlowingInput component', () => {
  let originalGetBoundingClientRect: () => DOMRect;

  beforeEach(() => {
    jest.clearAllMocks();
    originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('updates spotlight coordinates correctly on mouse move', () => {
    // Mock getBoundingClientRect
    const mockGetBoundingClientRect = jest.fn(() => ({
      left: 100,
      top: 200,
      width: 300,
      height: 40,
      right: 400,
      bottom: 240,
      x: 100,
      y: 200,
      toJSON: () => {},
    }));

    Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;

    // Mock requestAnimationFrame and cancelAnimationFrame
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      cb(performance.now());
      return 1;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { container } = render(<GlowingInput label="Test Input" id="test-input" />);

    const wrapper = container.firstChild as HTMLElement;

    // Trigger mouse enter to calculate bounding rect and set isHovered
    fireEvent.mouseEnter(wrapper);

    expect(mockGetBoundingClientRect).toHaveBeenCalled();

    // Trigger mouse move to calculate new coords
    fireEvent.mouseMove(wrapper, {
      clientX: 150,
      clientY: 220,
    });

    const spotlight = container.querySelector('.z-0');
    expect(spotlight).toBeInTheDocument();

    expect(spotlight).toHaveStyle({
      background: 'radial-gradient(120px circle at 50px 20px, rgba(0, 240, 255, 0.08), transparent 70%)'
    });
  });
});
