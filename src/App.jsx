import React, { useState, useMemo, useRef, useEffect } from 'react';
import { pensum, specialtiesList, electiveOptions } from './data/pensum';
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
  const [chosenElectives, setChosenElectives] = useState(() => {
    const saved = localStorage.getItem('chosen_electives');
    return saved ? JSON.parse(saved) : {};
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

  const getEffectiveRequirements = (subjectSlot) => {
    let reqCr = subjectSlot.reqCr || 0;
    let reqs = [...(subjectSlot.reqs || [])];

    const chosenCode = chosenElectives[subjectSlot.code];
    if (chosenCode) {
      const isHumanistic = subjectSlot.code.startsWith('ELH');
      // Case-insensitive specialty matching
      const techKey = Object.keys(electiveOptions.technical).find(
        k => k.toLowerCase() === selectedSpecialty.toLowerCase()
      );
      const pool = isHumanistic ? electiveOptions.humanistic : 
                   (techKey ? electiveOptions.technical[techKey] : []);
      
      const specific = pool?.find(opt => opt.code === chosenCode);
      if (specific) {
        reqCr = Math.max(reqCr, specific.reqCr || 0);
        if (specific.reqs) {
          reqs = [...new Set([...reqs, ...specific.reqs])];
        }
      }
    }
    return { reqCr, reqs };
  };

  const isAvailable = (subject) => {
    if (isApproved(subject.code)) return false; 
    
    const { reqCr, reqs } = getEffectiveRequirements(subject);

    if (reqCr > 0 && totalCredits < reqCr) {
      return false;
    }
    
    for (let req of reqs) {
      if (!isApproved(req)) {
        return false;
      }
    }
    
    return true;
  };

  const scrollBoard = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -304 : 304; 
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getMissingRequirements = (subject) => {
    let missingInfo = [];
    const { reqCr, reqs } = getEffectiveRequirements(subject);

    if (reqCr > 0 && totalCredits < reqCr) {
      missingInfo.push(`Tener ${reqCr} U.C.`);
    }
    for (let reqCode of reqs) {
      if (!isApproved(reqCode)) {
        const prereq = pensum.find(s => s.code === reqCode);
        if (prereq) {
          missingInfo.push(`Aprobar ${prereq.name}`);
        } else {
          // Check if it's an elective code
          const allTechnical = Object.values(electiveOptions.technical).flat();
          const electivePrereq = [...electiveOptions.humanistic, ...allTechnical].find(e => e.code === reqCode);
          if (electivePrereq) {
             missingInfo.push(`Aprobar ${electivePrereq.name}`);
          } else {
             missingInfo.push(`Aprobar materia cód. ${reqCode}`);
          }
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

  const clearData = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todo tu progreso?')) {
      setApprovedSubjects([]);
      setChosenElectives({});
      localStorage.clear();
      window.location.reload();
    }
  };

  useEffect(() => {
    localStorage.setItem('approved_subjects', JSON.stringify(approvedSubjects));
  }, [approvedSubjects]);

  useEffect(() => {
    localStorage.setItem('selected_specialty', selectedSpecialty);
  }, [selectedSpecialty]);

  useEffect(() => {
    localStorage.setItem('chosen_electives', JSON.stringify(chosenElectives));
  }, [chosenElectives]);

  const handleElectiveChoice = (code, value) => {
    setChosenElectives(prev => ({ ...prev, [code]: value }));
  };

  const exportData = () => {
    const data = {
      selectedSpecialty,
      approvedSubjects,
      chosenElectives,
      version: "1.1",
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
          if (data.chosenElectives) {
            setChosenElectives(data.chosenElectives);
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

  const renderSemesterGrid = (sem) => {
    const subjects = getSubjectsForSemester(sem);
    if (subjects.length === 0) return null;
    let semUc = subjects.reduce((sum, s) => sum + s.uc, 0);

    return (
      <div key={sem} className={`semester-col ${sem >= 8 ? 'specialty-semester' : ''}`}>
        <div className="semester-header">
          <div className="semester-title-group">
            <h2>Semestre {sem}</h2>
            {sem >= 8 ? (
              <span className="specialty-badge">{selectedSpecialty}</span>
            ) : (
              <span className="specialty-badge basic-cycle">Ciclo Básico</span>
            )}
          </div>
          <span className="semester-uc">{semUc} U.C.</span>
        </div>
        <div className="semester-subjects">
          {subjects.map(subject => {
            const approved = isApproved(subject.code);
            const available = isAvailable(subject);
            const missing = (!approved && !available) ? getMissingRequirements(subject) : [];
            
            // Elective Logic - Robust detection
            const isHumanistic = subject.code.startsWith('ELH');
            const isTechnical = subject.code.startsWith('ELE_') || 
                                subject.name.toLowerCase().includes('electiva técnica');
            
            // Case-insensitive specialty matching
            const techKey = Object.keys(electiveOptions.technical).find(
              k => k.toLowerCase() === selectedSpecialty.toLowerCase()
            );
            const techOptions = techKey ? electiveOptions.technical[techKey] : [];
            
            const options = isHumanistic ? electiveOptions.humanistic : 
                            isTechnical ? techOptions : null;

            const chosenCode = chosenElectives[subject.code];
            const chosenElectiveObj = options?.find(opt => opt.code === chosenCode);

            return (
              <SubjectCard 
                key={subject.code} 
                subject={subject} 
                approved={approved} 
                available={available} 
                missing={missing}
                chosenElectiveName={chosenElectiveObj?.name}
                chosenElectiveCode={chosenCode}
                onElectiveChange={(val) => handleElectiveChoice(subject.code, val)}
                electiveOptions={options && options.length > 0 ? options : null}
                onClick={toggleSubject} 
              />
            );
          })}
        </div>
      </div>
    );
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
        onClear={clearData}
      />

      <div className="board-wrapper">
        <SliderButton direction="left" onClick={() => scrollBoard('left')} />

        <main className="board-container" ref={scrollRef}>
          <div className="semesters-grid">
            <div className="basic-cycle-group">
              {semesters.filter(s => s < 8).map(sem => renderSemesterGrid(sem))}
            </div>
            <div className="specialty-group">
              {semesters.filter(s => s >= 8).map(sem => renderSemesterGrid(sem))}
            </div>
          </div>
        </main>
        
        <SliderButton direction="right" onClick={() => scrollBoard('right')} />
      </div>
    </div>
  );
}

export default App;
