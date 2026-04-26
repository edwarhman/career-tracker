import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SliderButton from './SliderButton';

describe('SliderButton Component', () => {
  test('renders left button correctly and handles clicks', () => {
    const handleClick = vi.fn();
    render(<SliderButton direction="left" onClick={handleClick} />);
    
    const button = screen.getByTestId('slider-left');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Desplazar a la izquierda');
    expect(button).toHaveClass('slider-zone', 'left');
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders right button correctly', () => {
    const handleClick = vi.fn();
    render(<SliderButton direction="right" onClick={handleClick} />);
    
    const button = screen.getByTestId('slider-right');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Desplazar a la derecha');
    expect(button).toHaveClass('slider-zone', 'right');
  });
});
