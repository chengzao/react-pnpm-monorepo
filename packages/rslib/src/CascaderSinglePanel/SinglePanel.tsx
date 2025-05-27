import React, { useState, useEffect } from 'react';
// import styled from '@emotion/styled';

interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
}

interface CascaderPanelProps {
  options: CascaderOption[];
  value?: string[];
  onChange?: (values: string[], items: CascaderOption[]) => void;
}

const SingleCascaderUI: React.FC<CascaderPanelProps> = ({
  options,
  value = [],
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const [hoverValues, setHoverValues] = useState<string[]>([]);

  useEffect(() => {
    setSelectedValues(value);
    setHoverValues(value);
  }, [value]);

  const getSelectedItems = (values: string[]): CascaderOption[] => {
    let currentOptions = options;
    const items: CascaderOption[] = [];

    for (const val of values) {
      const item = currentOptions.find((opt) => opt.value === val);
      if (!item) break;

      items.push(item);
      currentOptions = item.children || [];
    }

    return items;
  };

  const handleItemHover = (option: CascaderOption, level: number) => {
    const newHoverValues = [...hoverValues.slice(0, level), option.value];
    setHoverValues(newHoverValues);
  };

  const handleItemClick = (option: CascaderOption, level: number) => {
    const newSelectedValues = [...hoverValues.slice(0, level), option.value];

    setSelectedValues(newSelectedValues);
    setHoverValues(newSelectedValues);

    if (!option.children?.length) {
      const selectedItems = getSelectedItems(newSelectedValues);
      onChange?.(newSelectedValues, selectedItems);
    }
  };

  const getParentOptions = (level: number): CascaderOption[] => {
    if (level < 0) return [];

    let currentOptions = options;

    for (let i = 0; i < level; i++) {
      const currentValue =
        i < hoverValues.length ? hoverValues[i] : selectedValues[i];
      const parentOption = currentOptions.find(
        (opt) => opt.value === currentValue,
      );

      if (!parentOption) return [];

      currentOptions = parentOption.children || [];
    }

    return currentOptions?.length ? currentOptions : [];
  };

  const isItemSelected = (value: string, level: number) => {
    return selectedValues[level] === value;
  };

  const generatePanels = () => {
    const panels = [];
    for (let i = 0; i <= hoverValues.length; i++) {
      const currentOptions = getParentOptions(i);
      if (!currentOptions?.length) break;
      const currentHoverValue = hoverValues[i];
      panels.push(
        <ul className="cascader-panel" key={`panel-${i}`}>
          {currentOptions.map((option) => (
            <li
              key={option.value}
              className={`cascader-panel-item${
                currentHoverValue === option.value ? ' hovered' : ''
              }${isItemSelected(option.value, i) ? ' selected' : ''}`}
              onMouseEnter={() => handleItemHover(option, i)}
              onClick={() => handleItemClick(option, i)}
            >
              {option.label}
              {option.children?.length && <span className="cascader-caret" />}
            </li>
          ))}
        </ul>,
      );
    }
    return panels;
  };

  return <div className="cascader-panel-container">{generatePanels()}</div>;
};

export default SingleCascaderUI;
