/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useMemo } from 'react';
import { Dropdown } from 'antd';
import './index.css';

// SVG Icons as components for better performance and reusability
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.89047 6.98404L2.65061 3.74418C2.45535 3.54892 2.13877 3.54892 1.94351 3.74418L1.83744 3.85024C1.64218 4.04551 1.64218 4.36209 1.83744 4.55735L5.89047 8.61038L9.94351 4.55735C10.1388 4.36209 10.1388 4.04551 9.94351 3.85024L9.83744 3.74418C9.64218 3.54892 9.32559 3.54892 9.13033 3.74418L5.89047 6.98404Z"
      fill="currentColor"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    fillRule="evenodd"
    viewBox="64 64 896 896"
    focusable="false"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z" />
  </svg>
);

const CloseCircleIcon = () => (
  <svg
    fillRule="evenodd"
    viewBox="64 64 896 896"
    focusable="false"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" />
  </svg>
);

// Types
interface Option {
  key: string;
  value: any;
  label: string;
}

interface DropRenderProps {
  menus: Option[];
  values: any[];
  onChange: (value: any, item: Option) => void;
}

const DropRender: React.FC<DropRenderProps> = ({
  menus = [],
  values = [],
  onChange,
}) => {
  const handleItemClick = useCallback(
    (value: any, item: Option) => {
      onChange(value, item);
    },
    [onChange],
  );

  return (
    <div className="dropdown-container">
      {menus.map((item) => {
        const checked = values.includes(item.value);
        return (
          <div
            key={item.key}
            className={`dropdown-item ${checked ? 'dropdown-item-active' : ''}`}
            onClick={() => handleItemClick(item.value, item)}
          >
            <span>{item.label}</span>
            {checked && <CheckIcon />}
          </div>
        );
      })}
    </div>
  );
};

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  value: any[];
  onChange: (value: any[]) => void;
}

const CustomSelect = ({
  options = [],
  placeholder = 'Please select',
  value = [],
  onChange,
}: CustomSelectProps) => {
  // Memoized calculations
  const firstSelectedOption = useMemo(
    () => options.find((item) => item.value === value[0]),
    [options, value],
  );

  const remainingCount = useMemo(
    () => Math.max(0, value.length - 1),
    [value.length],
  );

  // Event handlers
  const handleChange = useCallback(
    (val: any) => {
      const newValue = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
      onChange(newValue);
    },
    [value, onChange],
  );

  const handleClearFirst = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (value.length > 0) {
        const newValue = value.filter((v) => v !== value[0]);
        onChange(newValue);
      }
    },
    [value, onChange],
  );

  const handleClearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange([]);
    },
    [onChange],
  );

  // Memoized dropdown render
  const dropdownRender = useCallback(
    () => <DropRender values={value} onChange={handleChange} menus={options} />,
    [value, handleChange, options],
  );

  const hasSelection = value.length > 0;
  const displayLabel = firstSelectedOption?.label || placeholder;

  return (
    <Dropdown trigger={['click']} popupRender={dropdownRender}>
      <div className="dropdown-button">
        {hasSelection ? (
          <>
            <span className="dropdown-label-tag">
              <span className="dropdown-tag-text">{displayLabel}</span>
              <span className="dropdown-tag-clear" onClick={handleClearFirst}>
                <CloseIcon />
              </span>
            </span>
            {remainingCount > 0 && (
              <span className="dropdown-label-num">+{remainingCount} ...</span>
            )}
          </>
        ) : (
          <span className="dropdown-label-placeholder">{placeholder}</span>
        )}
        <span className="dropdown-arrow">
          <span className="dropdown-arrow-icon">
            <ArrowIcon />
          </span>
          {hasSelection && (
            <span className="dropdown-arrow-clear" onClick={handleClearAll}>
              <CloseCircleIcon />
            </span>
          )}
        </span>
      </div>
    </Dropdown>
  );
};

export default CustomSelect;

// Example component with proper typing
interface CustomSelectExampleProps {
  options?: Option[];
}

export const CustomSelectExample: React.FC<CustomSelectExampleProps> = ({
  options = [],
}) => {
  const [value, setValue] = useState<any[]>([]);

  const handleChange = useCallback((newValue: any[]) => {
    setValue(newValue);
    console.log('Selected values:', newValue);
  }, []);

  return (
    <CustomSelect
      value={value}
      onChange={handleChange}
      placeholder="Select Status"
      options={options}
    />
  );
};
