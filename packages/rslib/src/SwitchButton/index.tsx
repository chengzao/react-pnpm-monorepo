import React, { useState } from 'react';
import './index.css';

interface Option {
  value: string;
  label: string;
}

interface SwitchButtonProps {
  options: [Option, Option]; // 限制为两个选项
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const SwitchButton = ({
  options,
  defaultValue,
  onChange,
}: SwitchButtonProps) => {
  const [activeOption, setActiveOption] = useState(
    defaultValue || options[0].value,
  );

  const handleOptionChange = (value: string) => {
    setActiveOption(value);
    onChange?.(value);
  };

  return (
    <div className="switchWrapper">
      {options.map((option) => (
        <div
          key={option.value}
          className={`switchOption ${
            activeOption === option.value ? 'active' : ''
          }`}
          onClick={() => handleOptionChange(option.value)}
        >
          {option.label}
        </div>
      ))}
      <div
        className="switchSlider"
        style={{
          transform: `translateX(${
            activeOption === options[0].value ? '0' : '100%'
          })`,
        }}
      />
    </div>
  );
};

export default SwitchButton;
