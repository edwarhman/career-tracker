import React from 'react';

const SubjectCard = ({ subject, approved, available, onClick }) => {
  let statusClass = 'unavailable';
  let statusText = 'No Disponible';
  
  if (approved) {
    statusClass = 'approved';
    statusText = 'Aprobada';
  } else if (available) {
    statusClass = 'available';
    statusText = 'Disponible';
  }

  return (
    <div 
      className={`subject-card ${statusClass} glass`}
      onClick={() => onClick(subject.code)}
      data-testid={`subject-card-${subject.code}`}
    >
      <div className="subject-header">
        <span className="subject-code">{subject.code.replace('ELE_', '')}</span>
        <span className="subject-uc">{subject.uc} u.c</span>
      </div>
      <h3 className="subject-name">{subject.name}</h3>
      <div className="subject-footer">
        <span className="status-badge">{statusText}</span>
        {(!approved && !available) && subject.reqs && subject.reqs.length > 0 && (
          <span className="reqs-tooltip" title={`Pre-reqs: ${subject.reqs.join(', ')}`}>
            ⚠️ Faltan requisitos
          </span>
        )}
        {(!approved && !available) && subject.reqCr > 0 && (
          <span className="reqs-tooltip" title={`Requiere: ${subject.reqCr} U.C.`}>
            ⚠️ Faltan créditos
          </span>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
