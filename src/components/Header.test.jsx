import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  const mockSpecialties = ['Option 1', 'Option 2', 'Option 3'];

  test('renders title and total credits correctly', () => {
    render(
      <Header 
        specialtiesList={mockSpecialties}
        selectedSpecialty="Option 1"
        onSpecialtyChange={() => {}}
        totalCredits={120}
      />
    );
    
    expect(screen.getByText(/Career Tracker/i)).toBeInTheDocument();
    
    const statsContainer = screen.getByTestId('stats-card');
    expect(statsContainer).toHaveTextContent('120 U.C.');
  });

  test('renders all specialties in the select dropdown', () => {
    render(
      <Header 
        specialtiesList={mockSpecialties}
        selectedSpecialty="Option 2"
        onSpecialtyChange={() => {}}
        totalCredits={0}
      />
    );
    
    // Check if the current value is correctly selected
    const select = screen.getByLabelText(/Especialidad/i);
    expect(select.value).toBe('Option 2');

    // Check if all options are rendered
    mockSpecialties.forEach(sp => {
      expect(screen.getByRole('option', { name: sp })).toBeInTheDocument();
    });
  });

  test('calls onSpecialtyChange when a new option is selected', () => {
    const handleChange = vi.fn();
    render(
      <Header 
        specialtiesList={mockSpecialties}
        selectedSpecialty="Option 1"
        onSpecialtyChange={handleChange}
        totalCredits={0}
      />
    );
    
    const select = screen.getByLabelText(/Especialidad/i);
    fireEvent.change(select, { target: { value: 'Option 3' } });
    
    expect(handleChange).toHaveBeenCalledWith('Option 3');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
