import React, { useEffect, useState } from 'react';
import { flattenTreeWithPid } from './utils';
import SearchResultUI from './SearchResult';
import SingleCascaderUI from './SinglePanel';
import './index.css';

interface CascaderOption {
  value: string;
  label: string;
  pid?: string;
  isLeaf?: boolean;
  parents?: CascaderOption[];
  children?: CascaderOption[];
}

interface CascaderPanelProps {
  options: CascaderOption[];
  value?: string[];
  onSelect?: (values: string[], items: CascaderOption[]) => void;
}

export const CascaderSearchSingle = (props: CascaderPanelProps) => {
  const { options, value = [], onSelect } = props;
  const [originalOptions, setOriginalOptions] = useState<CascaderOption[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<CascaderOption[]>([]);

  useEffect(() => {
    const originalOptions = flattenTreeWithPid(options).filter(
      (item) => item.isLeaf,
    );
    setOriginalOptions(() => originalOptions);
  }, [options]);

  const handleSearch = (value: string) => {
    const result = originalOptions.filter((item: CascaderOption) => {
      // 忽略大小写
      const text = value.toLowerCase();
      const label = item.label.toLowerCase();
      if (!text) {
        return true;
      }
      return label.includes(text);
    });
    setSearchResult(result);
  };

  const handleSelect = (values: string[], items: CascaderOption[]) => {
    if (onSelect) {
      console.log('handleSelect', values, items);
      onSelect(values, items);
      setSearchValue('');
      setSearchResult(originalOptions);
    }
  };

  const handleChange = (values: string[], items: CascaderOption[]) => {
    if (onSelect) {
      console.log('handleChange', values, items);
      onSelect(values, items);
      setSearchValue('');
    }
  };

  return (
    <div className="cascader-search-container">
      <div className="cascader-search-input-container">
        <input
          className="cascader-search-input"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search any option"
        />
      </div>

      {searchValue ? (
        searchResult?.length > 0 ? (
          <SearchResultUI
            searchResult={searchResult}
            value={value}
            onSelect={handleSelect}
          />
        ) : (
          <div>Empty</div>
        )
      ) : (
        <SingleCascaderUI
          options={options}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};
