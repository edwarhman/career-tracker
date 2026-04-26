import React from 'react';

const SliderButton = ({ direction, onClick }) => {
  const isLeft = direction === 'left';
  const symbol = isLeft ? '\u276E' : '\u276F'; 
  const label = isLeft ? "Desplazar a la izquierda" : "Desplazar a la derecha";

  return (
    <button 
      className={`slider-zone ${direction}`} 
      onClick={onClick}
      aria-label={label}
      data-testid={`slider-${direction}`}
    >
      <div className="slider-btn-circle">{symbol}</div>
    </button>
  );
};

export default SliderButton;
