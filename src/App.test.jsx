import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { expect, test, describe } from 'vitest';

describe('App Dashboard Component', () => {
  test('renders header and initial state correctly', () => {
    render(<App />);
    expect(screen.getByText(/Career Tracker/i)).toBeInTheDocument();
    
    // El texto '0 U.C.' del header
    const statsContainer = document.querySelector('.stats-card');
    expect(statsContainer).toHaveTextContent('0 U.C.');
    
    // Basic common semesters must be visible
    expect(screen.getByText('Semestre 1')).toBeInTheDocument();
    expect(screen.getByText('Semestre 10')).toBeInTheDocument();
  });

  test('approving a subject increases total credits', () => {
    render(<App />);
    
    // Click on 'Física General I' which grants 5 U.C.
    const fisica1 = screen.getByText('Física General I').closest('.subject-card');
    fireEvent.click(fisica1);
    
    // Credits should now be 5 U.C.
    const statsContainer = document.querySelector('.stats-card');
    expect(statsContainer).toHaveTextContent('5 U.C.');
    
    // Its badge should read "Aprobada"
    expect(fisica1).toHaveTextContent(/Aprobada/i);
  });

  test('cascading logic: prerequisites unlock subjects', () => {
    render(<App />);
    
    // Cálculo II (0252) requires Cálculo I (0251)
    const calculo2 = screen.getByText('Cálculo II').closest('.subject-card');
    // Initially not available
    expect(calculo2).toHaveTextContent(/No Disponible/i);
    
    // Approve Cálculo I
    const calculo1 = screen.getByText('Cálculo I').closest('.subject-card');
    fireEvent.click(calculo1);
    
    // Now Cálculo II should be Available
    expect(calculo2).toHaveTextContent(/Disponible/i);
  });

  test('specialty dropdown changes available subjects in upper semesters', () => {
    render(<App />);
    
    // Default specialty is 'Potencia', so 'Sistemas de Potencia II' should be listed.
    expect(screen.getByText('Sistemas de Potencia II')).toBeInTheDocument();
    
    // 'Diseño de Equipo Electrónico' should NOT be present initially
    expect(screen.queryByText('Diseño de Equipo Electrónico')).not.toBeInTheDocument();
    
    // Change Specialty via Combobox
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Electrónica y Control' } });
    
    // Now 'Diseño de Equipo Electrónico' is visible
    expect(screen.getByText('Diseño de Equipo Electrónico')).toBeInTheDocument();
    // And the power systems one is gone
    expect(screen.queryByText('Sistemas de Potencia II')).not.toBeInTheDocument();
  });
});
