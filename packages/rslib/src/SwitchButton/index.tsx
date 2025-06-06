import React, { useState } from 'react';
import './index.css';

const SwitchButton = () => {
  const [activeOption, setActiveOption] = useState('jobSeeker');

  const handleOptionChange = (option: string) => {
    setActiveOption(option);
  };

  return (
    <div className="switchWrapper">
      <div
        className={`switchOption ${
          activeOption === 'jobSeeker' ? 'active' : ''
        }`}
        onClick={() => handleOptionChange('jobSeeker')}
      >
        JobSeeker
      </div>

      <div
        className={`switchOption ${
          activeOption === 'recruiter' ? 'active' : ''
        }`}
        onClick={() => handleOptionChange('recruiter')}
      >
        Recruiter
      </div>

      <div
        className="switchSlider"
        style={{
          transform:
            activeOption === 'jobSeeker' ? 'translateX(0)' : 'translateX(100%)',
        }}
      />
    </div>
  );
};

export default SwitchButton;
