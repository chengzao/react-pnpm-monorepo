import React from 'react';
import { ValueType } from './utils';
// import { X } from 'lucide-react';
import { CascaderOption } from './utils';

interface FlatOption {
  value: ValueType;
  label: string;
  pathLabel: string;
  path: string[];
  node: CascaderOption;
  hasChildren: boolean;
}

interface Props {
  filteredOptions: FlatOption[];
  highlightedIndex: number;
  onOptionClick: (opt: FlatOption) => void;
  multiple: boolean;
  disabled: boolean;
  selectedValues: Set<ValueType>;
  setHighlightedIndex: (i: number) => void;
}

const SearchDropdown: React.FC<Props> = ({
  filteredOptions,
  highlightedIndex,
  onOptionClick,
  multiple,
  disabled,
  selectedValues,
  setHighlightedIndex,
}) => {
  return (
    <div
      className="search-dropdown"
      role="listbox"
      onMouseLeave={() => setHighlightedIndex(-1)}
    >
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option, index) => {
          const isSelected = selectedValues.has(option.value);
          const isHighlighted = index === highlightedIndex;
          return (
            <div
              key={option.value}
              className={`search-option ${isHighlighted ? 'highlighted' : ''} ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => !disabled && onOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                checked={isSelected}
                disabled={disabled}
                readOnly
                className="search-option-checkbox"
              />
              <span
                className={`search-option-text ${isSelected ? 'selected' : ''}`}
              >
                {option.pathLabel}
              </span>
            </div>
          );
        })
      ) : (
        <div className="no-results">无匹配结果</div>
      )}
    </div>
  );
};

export default SearchDropdown;
