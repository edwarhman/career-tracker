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

  test('calls onClick with subject code when clicked if available', () => {
    const handleClick = vi.fn();
    render(<SubjectCard subject={mockSubject} approved={false} available={true} onClick={handleClick} />);
    
    // Test click interaction
    const card = screen.getByTestId('subject-card-0331');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledWith('0331');
  });

  test('does not call onClick and adds shake class when unavailable', () => {
    const handleClick = vi.fn();
    render(<SubjectCard subject={mockSubject} approved={false} available={false} missing={['Algo']} onClick={handleClick} />);
    
    const card = screen.getByTestId('subject-card-0331');
    fireEvent.click(card);
    
    expect(handleClick).not.toHaveBeenCalled();
    expect(card).toHaveClass('shake');
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
    const missingBoth = ['Aprobar Fake Req', 'Tener 100 U.C.'];
    render(<SubjectCard subject={mockSubject} approved={false} available={false} missing={missingBoth} onClick={() => {}} />);
    
    expect(screen.getByText('No Disponible')).toBeInTheDocument();
    expect(screen.getByTestId('missing-alert')).toBeInTheDocument();
    expect(screen.getByText('- Aprobar Fake Req')).toBeInTheDocument();
  });

  test('conditionally renders missing reqs tooltip if missing prereqs without missing credits', () => {
    const missingReq = ['Aprobar Fake Req'];
    render(<SubjectCard subject={mockSubject} approved={false} available={false} missing={missingReq} onClick={() => {}} />);
    
    expect(screen.getByText('No Disponible')).toBeInTheDocument();
    expect(screen.getByTestId('missing-alert')).toBeInTheDocument();
    expect(screen.getByText('- Aprobar Fake Req')).toBeInTheDocument();
    expect(screen.queryByText(/U\.C\./i)).not.toBeInTheDocument();
  });

  test('conditionally renders missing credits tooltip if missing credits without missing prereqs', () => {
    const missingCr = ['Tener 100 U.C.'];
    render(<SubjectCard subject={mockSubject} approved={false} available={false} missing={missingCr} onClick={() => {}} />);
    
    expect(screen.getByText('No Disponible')).toBeInTheDocument();
    expect(screen.getByTestId('missing-alert')).toBeInTheDocument();
    expect(screen.getByText('- Tener 100 U.C.')).toBeInTheDocument();
  });

  test('renders elective selector when electiveOptions are provided', () => {
    const opts = [{ code: 'EL1', name: 'Electiva A' }, { code: 'EL2', name: 'Electiva B' }];
    const handleElectiveChange = vi.fn();
    render(
      <SubjectCard 
        subject={{...mockSubject, name: 'Electiva Técnica I'}} 
        approved={false} 
        available={true} 
        electiveOptions={opts}
        onElectiveChange={handleElectiveChange}
        onClick={() => {}} 
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Electiva A')).toBeInTheDocument();
    
    fireEvent.change(select, { target: { value: 'EL1' } });
    expect(handleElectiveChange).toHaveBeenCalledWith('EL1');
  });

  test('displays chosenElective name as the subject title', () => {
    render(
      <SubjectCard 
        subject={{...mockSubject, name: 'Electiva Técnica I'}} 
        approved={true} 
        available={false} 
        electiveOptions={[{ code: 'IA1', name: 'Fundamentos de IA' }]}
        chosenElectiveName="Fundamentos de IA"
        chosenElectiveCode="IA1"
        onClick={() => {}} 
      />
    );

    expect(screen.getByText('Fundamentos de IA')).toBeInTheDocument();
    expect(screen.queryByText('Electiva Técnica I')).not.toBeInTheDocument();
  });
});
