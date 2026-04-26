import React from 'react';

const Header = ({ specialtiesList, selectedSpecialty, onSpecialtyChange, totalCredits, onExport, onImport }) => {
  return (
    <header className="header glass">
      <div className="header-content">
        <div className="title-area">
          <h1>🎓 Career Tracker</h1>
          <p>Ingeniería Eléctrica - UCV</p>
        </div>
        <div className="controls-area">
          <div className="control-group">
            <label htmlFor="specialty-select">Especialidad:</label>
            <select 
              id="specialty-select"
              value={selectedSpecialty} 
              onChange={(e) => onSpecialtyChange(e.target.value)}
              className="specialty-select"
            >
              {specialtiesList.map(sp => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
            </select>
          </div>
          <div className="action-group">
            <button className="action-btn-mini glass" onClick={onExport} title="Exportar Progreso">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </button>
            <label className="action-btn-mini glass" title="Importar Progreso">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <input type="file" accept=".json" onChange={onImport} hidden />
            </label>
          </div>
          <div className="stats-card glass" data-testid="stats-card">
            <div className="stat">
              <span className="stat-label">Créditos Totales</span>
              <span className="stat-value">{totalCredits} U.C.</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
