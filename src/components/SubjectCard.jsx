import React, { useState } from 'react';

const SubjectCard = ({ 
  subject, 
  approved, 
  available, 
  missing = [], 
  chosenElectiveName,
  chosenElectiveCode,
  onElectiveChange,
  electiveOptions,
  onClick 
}) => {
  const [isShaking, setIsShaking] = useState(false);

  let statusClass = 'unavailable';
  let statusText = 'No Disponible';
  
  if (approved) {
    statusClass = 'approved';
    statusText = 'Aprobada';
  } else if (available) {
    statusClass = 'available';
    statusText = 'Disponible';
  }

  const isElectiveSlot = electiveOptions && electiveOptions.length > 0;
  const displayTitle = (isElectiveSlot && chosenElectiveName) ? chosenElectiveName : subject.name;

  const handleClick = () => {
    if (!approved && !available) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
    onClick(subject.code);
  };

  return (
    <div 
      className={`subject-card ${statusClass} glass ${isShaking ? 'shake' : ''}`}
      onClick={handleClick}
      data-testid={`subject-card-${subject.code}`}
    >
      <div className="subject-header">
        <span className="subject-code">{subject.code.replace('ELE_', '')}</span>
        <span className="subject-uc">{subject.uc} u.c</span>
      </div>
      <h3 className="subject-name">{displayTitle}</h3>
      
      {isElectiveSlot && !approved && (
        <div className="elective-selector-container">
          <select 
            className="elective-select glass"
            value={chosenElectiveCode || ""}
            onChange={(e) => onElectiveChange(e.target.value)}
            disabled={!available}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="" disabled>Seleccionar Electiva...</option>
            {electiveOptions.map((opt) => (
              <option key={opt.code} value={opt.code}>{opt.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className="subject-footer">
        <span className="status-badge">{statusText}</span>
        {missing && missing.length > 0 && (
          <div className="tooltip-container" data-testid="missing-alert">
            <span className="alert-icon">⚠️</span>
            <div className="tooltip-content">
              <strong>Falta para cursar:</strong>
              <ul>
                {missing.map((req, idx) => (
                  <li key={idx}>- {req}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
