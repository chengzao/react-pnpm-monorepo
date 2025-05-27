import React from 'react';
// import styled from '@emotion/styled';

interface CascaderOption {
  value: string;
  label: string;
  pid?: string;
  isLeaf?: boolean;
  parents?: CascaderOption[];
  children?: CascaderOption[];
}

interface CascaderPanelProps {
  searchResult: CascaderOption[];
  value?: string[];
  onSelect?: (values: string[], items: CascaderOption[]) => void;
}

const renderLabel = (option: CascaderOption) => {
  if (option?.parents?.length) {
    return (
      option?.parents?.map((item) => item.label).join(' / ') +
      ' / ' +
      option?.label
    );
  }
  return option?.label;
};

const SearchResultUI: React.FC<CascaderPanelProps> = (props) => {
  const { searchResult, value = [], onSelect } = props;

  const handleChange = (item: CascaderOption) => {
    if (onSelect) {
      if (item?.parents?.length) {
        const _values = item?.parents?.map((item) => item.value) || [];
        _values.push(item.value);
        const _options = [...(item?.parents || []), item];
        onSelect(_values, _options);
      } else {
        onSelect([item.value], [item]);
      }
    }
  };

  return (
    <div className="cascader-search-result">
      {searchResult.map((item) => {
        const isChecked = value.includes(item.value);
        return (
          <div
            className={`cascader-search-result-item${
              isChecked ? ' selected' : ''
            }`}
            key={item.value}
            onClick={() => handleChange(item)}
          >
            {renderLabel(item)}
            {isChecked && <span style={{ marginLeft: 'auto' }}>✔</span>}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultUI;
