import React, { useState } from 'react';
import './index.css';

const SwitchButton = () => {
  const [activeOption, setActiveOption] = useState('jobSeeker');

  const handleOptionChange = (option: string) => {
    setActiveOption(option);
  };

  return (
    <div className="switch-wrapper">
      <div
        className={`switch-option ${
          activeOption === 'jobSeeker' ? 'active' : ''
        }`}
        onClick={() => handleOptionChange('jobSeeker')}
      >
        JobSeeker
      </div>

      <div
        className={`switch-option ${
          activeOption === 'recruiter' ? 'active' : ''
        }`}
        onClick={() => handleOptionChange('recruiter')}
      >
        Recruiter
      </div>

      <div
        className="switch-slider"
        style={{
          transform:
            activeOption === 'jobSeeker' ? 'translateX(0)' : 'translateX(100%)',
        }}
      />
    </div>
  );
};

export default SwitchButton;
