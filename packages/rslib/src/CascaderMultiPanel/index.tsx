import React, { useState, useMemo, useEffect } from 'react';
import './new.css';
import { Search } from 'lucide-react';
import PanelColumn from './PanelColumn';
import SearchDropdown from './SearchDropdown';
import SelectedTags from './SelectedTags';
import {
  CascaderOption,
  ValueType,
  flattenOptions as flatten,
  findPathByValue,
  getAllChildrenValues,
  isNodeIndeterminate,
  shouldNodeBeSelected,
} from './utils';

interface CascaderMultiPanelProps {
  options?: CascaderOption[];
  value?: ValueType | ValueType[];
  onChange?: (value: ValueType | ValueType[] | null) => void;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxTagCount?: number;
  searchable?: boolean;
  expandOnHover?: boolean;
  hoverDelay?: number;
}

const CascaderComponent = ({
  options = [],
  value = [],
  onChange,
  placeholder = '搜索选项...',
  multiple = true,
  disabled = false,
  maxTagCount = 5,
  searchable = true,
  expandOnHover = true,
  hoverDelay = 300,
}: CascaderMultiPanelProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [activePath, setActivePath] = useState<CascaderOption[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [hoverTimers, setHoverTimers] = useState<
    Record<string, NodeJS.Timeout>
  >({});

  const selectedValues = useMemo<Set<ValueType>>(
    () => new Set(Array.isArray(value) ? value : value ? [value] : []),
    [value],
  );

  const flat = useMemo(() => flatten(options), [options]);

  // 默认展开第一个选中项路径
  useEffect(() => {
    if (
      selectedValues.size > 0 &&
      activePath.length === 0 &&
      options.length > 0
    ) {
      const first = Array.from(selectedValues)[0];
      const p = findPathByValue(first, options);
      if (p && p.length > 1) setActivePath(p.slice(0, -1));
    }
  }, [selectedValues, options, activePath.length]);

  const filteredOptions = useMemo(() => {
    if (!searchValue.trim()) return [];
    return flat.filter((o) => {
      const isLeaf = !o.hasChildren;
      const matches =
        o.pathLabel.toLowerCase().includes(searchValue.toLowerCase()) ||
        o.label.toLowerCase().includes(searchValue.toLowerCase());
      return isLeaf && matches;
    });
  }, [flat, searchValue]);

  const handleNodeSelect = (node: CascaderOption) => {
    if (!onChange) return;
    const newSet = new Set(selectedValues);

    if (node.children && multiple) {
      const childrenValues = getAllChildrenValues(node);
      const currentSelected = shouldNodeBeSelected(node, selectedValues);
      if (currentSelected) {
        newSet.delete(node.value);
        childrenValues.forEach((v) => newSet.delete(v));
      } else {
        newSet.add(node.value);
        childrenValues.forEach((v) => newSet.add(v));
      }
    } else {
      if (multiple) {
        if (selectedValues.has(node.value)) newSet.delete(node.value);
        else newSet.add(node.value);
      } else {
        newSet.clear();
        newSet.add(node.value);
      }
    }

    const arr = Array.from(newSet);
    onChange(multiple ? arr : arr.length > 0 ? arr[0] : null);
  };

  // helper: 在指定 level 更新 activePath，保证没有空洞并修剪长度
  const updateActivePathAt = (node: CascaderOption, level: number) => {
    setActivePath((prev) => {
      const next = [...prev.slice(0, level), node];
      return next;
    });
  };

  const handleNodeClick = (node: CascaderOption, level: number) => {
    // 无论是否有 children，都更新该层级的 activePath（叶子也高亮）
    updateActivePathAt(node, level);
  };

  // hover 展开
  const handleNodeMouseEnter = (node: CascaderOption, level: number) => {
    if (!expandOnHover || disabled) return;
    const key = `${level}-${node.value}`;
    if (hoverTimers[key]) clearTimeout(hoverTimers[key]);
    const timer = setTimeout(() => {
      updateActivePathAt(node, level);
      setHoverTimers((p) => {
        const n = { ...p };
        delete n[key];
        return n;
      });
    }, hoverDelay);
    setHoverTimers((p) => ({ ...p, [key]: timer }));
  };

  const handleNodeMouseLeave = (node: CascaderOption, level: number) => {
    if (!expandOnHover || disabled) return;
    const key = `${level}-${node.value}`;
    if (hoverTimers[key]) {
      clearTimeout(hoverTimers[key]);
      setHoverTimers((p) => {
        const n = { ...p };
        delete n[key];
        return n;
      });
    }
  };

  const removeSelectedItem = (valueToRemove: ValueType) => {
    if (!onChange) return;
    const newSet = new Set(selectedValues);
    newSet.delete(valueToRemove);
    const arr = Array.from(newSet);
    onChange(multiple ? arr : arr.length > 0 ? arr[0] : null);
  };

  const getSelectedLabels = () =>
    flat
      .filter((o) => selectedValues.has(o.value))
      .map((o) => ({ value: o.value, label: o.pathLabel }));

  const isSearchMode = searchValue.trim().length > 0;

  // 键盘导航（用于搜索结果）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchMode) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((p) =>
          p < filteredOptions.length - 1 ? p + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((p) =>
          p > 0 ? p - 1 : filteredOptions.length - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex])
          handleNodeSelect(filteredOptions[highlightedIndex].node);
        break;
      case 'Escape':
        setSearchValue('');
        setHighlightedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    return () => {
      Object.values(hoverTimers).forEach((t) => t && clearTimeout(t));
    };
  }, [hoverTimers]);

  return (
    <div className={`cascader-container ${disabled ? 'disabled' : ''}`}>
      <div className="cascader-header">
        <SelectedTags
          selectedLabels={getSelectedLabels()}
          maxTagCount={maxTagCount}
          disabled={disabled}
          onRemove={removeSelectedItem}
        />

        {searchable && (
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder={placeholder}
              value={searchValue}
              disabled={disabled}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setHighlightedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className="search-input"
            />
          </div>
        )}
      </div>

      <div className="content-container">
        {isSearchMode && searchable ? (
          <SearchDropdown
            filteredOptions={filteredOptions}
            highlightedIndex={highlightedIndex}
            onOptionClick={(opt) => handleNodeSelect(opt.node)}
            multiple={multiple}
            disabled={disabled}
            selectedValues={selectedValues}
            setHighlightedIndex={setHighlightedIndex}
          />
        ) : (
          <div className="cascade-panels">
            {Array.from(
              { length: Math.max(1, activePath.length + 1) },
              (_, level) => {
                const levelData =
                  level === 0
                    ? options
                    : (activePath[level - 1]?.children ?? []);

                if (!levelData || !levelData?.length) return null;

                return (
                  <PanelColumn
                    key={level}
                    nodes={levelData}
                    level={level}
                    activePath={activePath}
                    multiple={multiple}
                    disabled={disabled}
                    selectedValues={selectedValues}
                    onNodeClick={handleNodeClick}
                    onNodeSelect={handleNodeSelect}
                    onNodeMouseEnter={handleNodeMouseEnter}
                    onNodeMouseLeave={handleNodeMouseLeave}
                    shouldNodeBeSelected={(n) =>
                      shouldNodeBeSelected(n, selectedValues)
                    }
                    isNodeIndeterminate={(n) =>
                      isNodeIndeterminate(n, selectedValues)
                    }
                  />
                );
              },
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CascaderComponent;
