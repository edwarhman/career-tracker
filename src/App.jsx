import React, { useState, useMemo } from 'react';
import { pensum, specialtiesList } from './data/pensum';

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialtiesList[0]);
  const [approvedSubjects, setApprovedSubjects] = useState([]);

  // Calculate total credits
  const totalCredits = useMemo(() => {
    let uc = 0;
    approvedSubjects.forEach(code => {
      const subject = pensum.find(s => s.code === code);
      if (subject) uc += subject.uc;
    });
    return uc;
  }, [approvedSubjects]);

  const isApproved = (code) => approvedSubjects.includes(code);

  const isAvailable = (subject) => {
    if (isApproved(subject.code)) return false; // Ya esta aprobada, su estado es 'Aprobada'
    
    // Check credits requirement
    if (subject.reqCr > 0 && totalCredits < subject.reqCr) {
      return false;
    }
    
    // Check subject prerequisites
    for (let req of subject.reqs) {
      if (!isApproved(req)) {
        return false;
      }
    }
    
    return true;
  };

  const toggleSubject = (code) => {
    setApprovedSubjects(prev => {
      if (prev.includes(code)) {
        // If we uncheck a subject, ideally we should uncheck everything that depends on it.
        // For simplicity now, we just uncheck this one. A full implementation would do a recursive uncheck.
        return prev.filter(c => c !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  // Group subjects by Semester (1 to 10)
  const semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  const getSubjectsForSemester = (sem) => {
    return pensum.filter(subject => {
      if (subject.common && subject.semester === sem) return true;
      if (subject.specialties && subject.specialties[selectedSpecialty] === sem) return true;
      return false;
    });
  };

  return (
    <div className="app-container">
      <header className="header glass">
        <div className="header-content">
          <div className="title-area">
            <h1>🎓 Career Tracker</h1>
            <p>Ingeniería Eléctrica - UCV</p>
          </div>
          <div className="controls-area">
            <div className="control-group">
              <label>Especialidad:</label>
              <select 
                value={selectedSpecialty} 
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="specialty-select"
              >
                {specialtiesList.map(sp => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            </div>
            <div className="stats-card glass">
              <div className="stat">
                <span className="stat-label">Créditos Totales</span>
                <span className="stat-value">{totalCredits} U.C.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="board-container">
        <div className="semesters-grid">
          {semesters.map(sem => {
            const subjects = getSubjectsForSemester(sem);
            if (subjects.length === 0) return null; // Avoid empty columns if any

            let semUc = subjects.reduce((sum, s) => sum + s.uc, 0);

            return (
              <div key={sem} className="semester-col">
                <div className="semester-header">
                  <h2>Semestre {sem}</h2>
                  <span className="semester-uc">{semUc} U.C.</span>
                </div>
                <div className="semester-subjects">
                  {subjects.map(subject => {
                    const approved = isApproved(subject.code);
                    const available = isAvailable(subject);
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
                        key={subject.code} 
                        className={`subject-card ${statusClass} glass`}
                        onClick={() => {
                          // Only toggle generic electives smoothly
                          toggleSubject(subject.code);
                        }}
                      >
                        <div className="subject-header">
                          <span className="subject-code">{subject.code.replace('ELE_', '')}</span>
                          <span className="subject-uc">{subject.uc} u.c</span>
                        </div>
                        <h3 className="subject-name">{subject.name}</h3>
                        <div className="subject-footer">
                          <span className="status-badge">{statusText}</span>
                          {(!approved && !available) && subject.reqs.length > 0 && (
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
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
