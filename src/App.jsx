import React, { useState, useMemo, useRef } from 'react';
import { pensum, specialtiesList } from './data/pensum';
import SubjectCard from './components/SubjectCard';
import Header from './components/Header';
import SliderButton from './components/SliderButton';

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialtiesList[0]);
  const [approvedSubjects, setApprovedSubjects] = useState([]);
  const scrollRef = useRef(null);

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

  const scrollBoard = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -304 : 304; // 280px card + 24px gap
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getMissingRequirements = (subject) => {
    let missingInfo = [];
    if (subject.reqCr > 0 && totalCredits < subject.reqCr) {
      missingInfo.push(`Tener ${subject.reqCr} U.C.`);
    }
    for (let reqCode of subject.reqs) {
      if (!isApproved(reqCode)) {
        const prereq = pensum.find(s => s.code === reqCode);
        if (prereq) {
          missingInfo.push(`Aprobar ${prereq.name}`);
        }
      }
    }
    return missingInfo;
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
      <Header 
        specialtiesList={specialtiesList}
        selectedSpecialty={selectedSpecialty}
        onSpecialtyChange={setSelectedSpecialty}
        totalCredits={totalCredits}
      />

      <div className="board-wrapper">
        <SliderButton direction="left" onClick={() => scrollBoard('left')} />

        <main className="board-container" ref={scrollRef}>
          <div className="semesters-grid">
            {/* Ciclo Básico */}
            <div className="basic-cycle-group">
              {semesters.filter(sem => sem < 8).map(sem => {
                const subjects = getSubjectsForSemester(sem);
                if (subjects.length === 0) return null;
                let semUc = subjects.reduce((sum, s) => sum + s.uc, 0);

                return (
                  <div key={sem} className="semester-col">
                    <div className="semester-header">
                      <div className="semester-title-group">
                        <h2>Semestre {sem}</h2>
                        <span className="specialty-badge basic-cycle">Ciclo Básico</span>
                      </div>
                      <span className="semester-uc">{semUc} U.C.</span>
                    </div>
                    <div className="semester-subjects">
                      {subjects.map(subject => {
                        const approved = isApproved(subject.code);
                        const available = isAvailable(subject);
                        const missing = (!approved && !available) ? getMissingRequirements(subject) : [];
                        return (
                          <SubjectCard 
                            key={subject.code} 
                            subject={subject} 
                            approved={approved} 
                            available={available} 
                            missing={missing}
                            onClick={toggleSubject} 
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
            </div>

            {/* Ciclo Especializado */}
            <div className="specialty-group">
              {semesters.filter(sem => sem >= 8).map(sem => {
                const subjects = getSubjectsForSemester(sem);
                if (subjects.length === 0) return null;
                let semUc = subjects.reduce((sum, s) => sum + s.uc, 0);

                return (
                  <div key={sem} className="semester-col specialty-semester">
                    <div className="semester-header">
                      <div className="semester-title-group">
                        <h2>Semestre {sem}</h2>
                        <span className="specialty-badge">{selectedSpecialty}</span>
                      </div>
                      <span className="semester-uc">{semUc} U.C.</span>
                    </div>
                    <div className="semester-subjects">
                      {subjects.map(subject => {
                        const approved = isApproved(subject.code);
                        const available = isAvailable(subject);
                        const missing = (!approved && !available) ? getMissingRequirements(subject) : [];
                        return (
                          <SubjectCard 
                            key={subject.code} 
                            subject={subject} 
                            approved={approved} 
                            available={available} 
                            missing={missing}
                            onClick={toggleSubject} 
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        
        <SliderButton direction="right" onClick={() => scrollBoard('right')} />
      </div>
    </div>
  );
}

export default App;
