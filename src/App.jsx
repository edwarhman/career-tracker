import React, { useState, useMemo, useRef, useEffect } from 'react';
import { pensum, specialtiesList } from './data/pensum';
import SubjectCard from './components/SubjectCard';
import Header from './components/Header';
import SliderButton from './components/SliderButton';

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(() => {
    return localStorage.getItem('selected_specialty') || specialtiesList[0];
  });
  const [approvedSubjects, setApprovedSubjects] = useState(() => {
    const saved = localStorage.getItem('approved_subjects');
    return saved ? JSON.parse(saved) : [];
  });
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
        return prev.filter(c => c !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('approved_subjects', JSON.stringify(approvedSubjects));
  }, [approvedSubjects]);

  useEffect(() => {
    localStorage.setItem('selected_specialty', selectedSpecialty);
  }, [selectedSpecialty]);

  const exportData = () => {
    const data = {
      selectedSpecialty,
      approvedSubjects,
      version: "1.0",
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tracker_${selectedSpecialty.replace(/\s+/g, '_').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.approvedSubjects && Array.isArray(data.approvedSubjects)) {
          if (data.selectedSpecialty && specialtiesList.includes(data.selectedSpecialty)) {
            setSelectedSpecialty(data.selectedSpecialty);
          }
          setApprovedSubjects(data.approvedSubjects);
        } else {
          alert('Error: El archivo no contiene un formato de progreso válido.');
        }
      } catch (err) {
        alert('Error al procesar el archivo JSON.');
      }
    };
    reader.readAsText(file);
    // Reset input so the same file can be imported again if needed
    event.target.value = '';
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
        onExport={exportData}
        onImport={importData}
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
