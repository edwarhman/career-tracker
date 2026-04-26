import React from 'react';

const Header = ({ specialtiesList, selectedSpecialty, onSpecialtyChange, totalCredits }) => {
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
