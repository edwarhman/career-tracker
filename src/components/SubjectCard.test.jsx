import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import SubjectCard from './SubjectCard';

describe('SubjectCard Component', () => {
  const mockSubject = {
    code: '0331',
    name: 'Física General I',
    uc: 5,
    reqs: ['0111'],
    reqCr: 100
  };

  test('calls onClick with subject code when clicked', () => {
    const handleClick = vi.fn();
    render(<SubjectCard subject={mockSubject} approved={false} available={true} onClick={handleClick} />);
    
    // Test click interaction
    const card = screen.getByTestId('subject-card-0331');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledWith('0331');
  });

  test('renders "Aprobada" text when approved is true and no warnings rendered', () => {
    render(<SubjectCard subject={mockSubject} approved={true} available={false} onClick={() => {}} />);
    
    expect(screen.getByText('Aprobada')).toBeInTheDocument();
    expect(screen.queryByText(/Faltan requisitos/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Faltan créditos/i)).not.toBeInTheDocument();
  });

  test('renders "Disponible" text when available is true and no warnings rendered', () => {
    render(<SubjectCard subject={mockSubject} approved={false} available={true} onClick={() => {}} />);
    
    expect(screen.getByText('Disponible')).toBeInTheDocument();
    expect(screen.queryByText(/Faltan requisitos/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Faltan créditos/i)).not.toBeInTheDocument();
  });

  test('renders "No Disponible" and warnings when missing both prereqs and credits', () => {
    render(<SubjectCard subject={mockSubject} approved={false} available={false} onClick={() => {}} />);
    
    expect(screen.getByText('No Disponible')).toBeInTheDocument();
    expect(screen.getByText(/Faltan requisitos/i)).toBeInTheDocument();
    expect(screen.getByText(/Faltan créditos/i)).toBeInTheDocument();
  });

  test('conditionally renders missing reqs tooltip if missing prereqs without missing credits', () => {
    const subjectNoCredits = { ...mockSubject, reqCr: 0 };
    render(<SubjectCard subject={subjectNoCredits} approved={false} available={false} onClick={() => {}} />);
    
    expect(screen.getByText('No Disponible')).toBeInTheDocument();
    expect(screen.getByText(/Faltan requisitos/i)).toBeInTheDocument();
    expect(screen.queryByText(/Faltan créditos/i)).not.toBeInTheDocument();
  });

  test('conditionally renders missing credits tooltip if missing credits without missing prereqs', () => {
    const subjectNoReqs = { ...mockSubject, reqs: [] };
    render(<SubjectCard subject={subjectNoReqs} approved={false} available={false} onClick={() => {}} />);
    
    expect(screen.getByText('No Disponible')).toBeInTheDocument();
    expect(screen.queryByText(/Faltan requisitos/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Faltan créditos/i)).toBeInTheDocument();
  });
});
