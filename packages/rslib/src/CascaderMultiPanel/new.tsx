import React, { useState, useMemo, useRef } from 'react';
import { Search, ChevronRight, X } from 'lucide-react';
import './new.css';

const CascaderComponent = ({
  options = [],
  value = [],
  onChange,
  placeholder = '搜索选项...',
  multiple = true,
  disabled = false,
  maxTagCount = 5,
  searchable = true,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [activePath, setActivePath] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // 将传入的value转换为Set格式进行内部处理
  const selectedValues = useMemo(() => {
    return new Set(Array.isArray(value) ? value : value ? [value] : []);
  }, [value]);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // 扁平化数据并生成路径标签（用于搜索模式）
  const flattenOptions = useMemo(() => {
    const flatOptions = [];

    const traverse = (nodes, parentPath = []) => {
      nodes.forEach((node) => {
        const currentPath = [...parentPath, node.label];
        const pathLabel = currentPath.join(' - ');

        flatOptions.push({
          value: node.value,
          label: node.label,
          pathLabel,
          path: currentPath,
          node: node,
          hasChildren: !!(node.children && node.children.length > 0),
        });

        if (node.children) {
          traverse(node.children, currentPath);
        }
      });
    };

    traverse(options);
    return flatOptions;
  }, [options]);

  // 修复1: 搜索过滤选项 - 只返回叶子节点
  const filteredOptions = useMemo(() => {
    if (!searchValue.trim()) return [];

    return flattenOptions.filter((option) => {
      // 只返回叶子节点（没有子节点的节点）
      const isLeaf = !option.hasChildren;
      const matchesSearch =
        option.pathLabel.toLowerCase().includes(searchValue.toLowerCase()) ||
        option.label.toLowerCase().includes(searchValue.toLowerCase());

      return isLeaf && matchesSearch;
    });
  }, [flattenOptions, searchValue]);

  // 获取所有子节点的值
  const getAllChildrenValues = (node) => {
    const values = [];
    if (node.children) {
      node.children.forEach((child) => {
        values.push(child.value);
        values.push(...getAllChildrenValues(child));
      });
    }
    return values;
  };

  // 检查节点是否被选中
  const isNodeSelected = (node) => {
    return selectedValues.has(node.value);
  };

  // 修复2: 检查节点是否半选中状态 - 修复父节点全选状态检查
  const isNodeIndeterminate = (node) => {
    if (!node.children) return false;

    // 获取所有叶子节点的值
    const getLeafValues = (n) => {
      if (!n.children || n.children.length === 0) {
        return [n.value];
      }
      const leafValues = [];
      n.children.forEach((child) => {
        leafValues.push(...getLeafValues(child));
      });
      return leafValues;
    };

    const leafValues = getLeafValues(node);
    const selectedLeafCount = leafValues.filter((value) =>
      selectedValues.has(value),
    ).length;

    return selectedLeafCount > 0 && selectedLeafCount < leafValues.length;
  };

  // 修复2: 检查节点是否应该被全选 - 新增函数
  const shouldNodeBeSelected = (node) => {
    if (!node.children || node.children.length === 0) {
      // 叶子节点直接检查是否被选中
      return selectedValues.has(node.value);
    }

    // 获取所有叶子节点的值
    const getLeafValues = (n) => {
      if (!n.children || n.children.length === 0) {
        return [n.value];
      }
      const leafValues = [];
      n.children.forEach((child) => {
        leafValues.push(...getLeafValues(child));
      });
      return leafValues;
    };

    const leafValues = getLeafValues(node);
    // 只有当所有叶子节点都被选中时，父节点才应该显示为选中状态
    return (
      leafValues.length > 0 &&
      leafValues.every((value) => selectedValues.has(value))
    );
  };

  // 处理节点选择
  const handleNodeSelect = (node) => {
    if (!onChange) return;

    const newSelectedValues = new Set(selectedValues);

    if (node.children && multiple) {
      // 非叶子节点：选中/取消选中所有子节点
      const childrenValues = getAllChildrenValues(node);
      const isCurrentSelected = shouldNodeBeSelected(node); // 使用新的检查函数

      if (isCurrentSelected) {
        newSelectedValues.delete(node.value);
        childrenValues.forEach((value) => newSelectedValues.delete(value));
      } else {
        newSelectedValues.add(node.value);
        childrenValues.forEach((value) => newSelectedValues.add(value));
      }
    } else {
      // 叶子节点或单选模式
      if (multiple) {
        if (selectedValues.has(node.value)) {
          newSelectedValues.delete(node.value);
        } else {
          newSelectedValues.add(node.value);
        }
      } else {
        // 单选模式：清空其他选项，只保留当前选项
        newSelectedValues.clear();
        newSelectedValues.add(node.value);
      }
    }

    // 将Set转换为数组格式传给onChange
    const newValue = Array.from(newSelectedValues);
    onChange(multiple ? newValue : newValue.length > 0 ? newValue[0] : null);
  };

  // 处理搜索结果选择
  const handleSearchOptionSelect = (option) => {
    handleNodeSelect(option.node);
  };

  // 处理路径导航（级联面板模式）
  const handleNodeClick = (node, level) => {
    if (node.children) {
      const newPath = activePath.slice(0, level + 1);
      newPath[level] = node;
      setActivePath(newPath);
    }
  };

  // 获取当前层级数据（级联面板模式）
  const getCurrentLevelData = (level) => {
    if (level === 0) {
      return options;
    }

    const parentNode = activePath[level - 1];
    if (parentNode && parentNode.children) {
      return parentNode.children;
    }

    return [];
  };

  // 移除选中项
  const removeSelectedItem = (valueToRemove) => {
    if (!onChange) return;

    const newSelectedValues = new Set(selectedValues);
    newSelectedValues.delete(valueToRemove);
    const newValue = Array.from(newSelectedValues);
    onChange(multiple ? newValue : newValue.length > 0 ? newValue[0] : null);
  };

  // 获取已选中项的显示标签
  const getSelectedLabels = () => {
    return flattenOptions
      .filter((option) => selectedValues.has(option.value))
      .map((option) => ({
        value: option.value,
        label: option.pathLabel,
      }));
  };

  // 渲染级联面板节点
  const renderPanelNode = (node, level) => {
    const isSelected = shouldNodeBeSelected(node); // 使用新的检查函数
    const isIndeterminate = isNodeIndeterminate(node) && multiple;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div
        key={node.value}
        className={`cascade-node ${
          activePath[level]?.value === node.value ? 'active' : ''
        }`}
        onClick={() => !disabled && handleNodeClick(node, level)}
      >
        <div>
          <input
            type={multiple ? 'checkbox' : 'radio'}
            checked={isSelected}
            disabled={disabled}
            ref={(input) => {
              if (input && multiple) input.indeterminate = isIndeterminate;
            }}
            onChange={(e) => {
              e.stopPropagation();
              if (!disabled) handleNodeSelect(node);
            }}
            className="cascade-node-checkbox"
          />
        </div>

        <span className="cascade-node-label">{node.label}</span>

        {hasChildren && <ChevronRight className="cascade-node-arrow" />}
      </div>
    );
  };

  // 键盘导航（搜索模式）
  const handleKeyDown = (e) => {
    if (!searchValue.trim()) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSearchOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setSearchValue('');
        setHighlightedIndex(-1);
        break;
    }
  };

  const selectedLabels = getSelectedLabels();
  const isSearchMode = searchValue.trim().length > 0;

  return (
    <div
      className={`cascader-container ${disabled ? 'disabled' : ''}`}
      ref={containerRef}
    >
      {/* 搜索框和已选标签 */}
      <div className="cascader-header">
        {/* 已选择的标签 */}
        {selectedLabels.length > 0 && multiple && (
          <div className="selected-tags-container">
            <div className="selected-tags-title">
              已选择 {selectedLabels.length} 项:
            </div>
            <div className="selected-tags-wrapper">
              {selectedLabels.slice(0, maxTagCount).map((item) => (
                <span key={item.value} className="selected-tag">
                  <span className="selected-tag-text">{item.label}</span>
                  {!disabled && (
                    <X
                      className="selected-tag-close"
                      onClick={() => removeSelectedItem(item.value)}
                    />
                  )}
                </span>
              ))}
              {selectedLabels.length > maxTagCount && (
                <span className="selected-tag-more">
                  +{selectedLabels.length - maxTagCount} 更多...
                </span>
              )}
            </div>
          </div>
        )}

        {/* 搜索输入框 */}
        {searchable && (
          <div className="search-container">
            <Search className="search-icon" />
            <input
              ref={inputRef}
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

      {/* 内容区域 */}
      <div className="content-container">
        {isSearchMode && searchable ? (
          /* 搜索下拉模式 */
          <div className="search-dropdown">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = selectedValues.has(option.value);
                const isHighlighted = index === highlightedIndex;

                return (
                  <div
                    key={option.value}
                    className={`search-option ${
                      isHighlighted ? 'highlighted' : ''
                    } ${isSelected ? 'selected' : ''}`}
                    onClick={() =>
                      !disabled && handleSearchOptionSelect(option)
                    }
                  >
                    <input
                      type={multiple ? 'checkbox' : 'radio'}
                      checked={isSelected}
                      disabled={disabled}
                      onChange={() => {}}
                      className="search-option-checkbox"
                    />

                    <span
                      className={`search-option-text ${
                        isSelected ? 'selected' : ''
                      }`}
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
        ) : (
          /* 级联面板模式 */
          <div className="cascade-panels">
            {Array.from(
              { length: Math.max(1, activePath.length + 1) },
              (_, level) => {
                const levelData = getCurrentLevelData(level);

                return (
                  <div key={level} className="cascade-panel">
                    {levelData.length > 0 ? (
                      levelData.map((node) => renderPanelNode(node, level))
                    ) : (
                      <div className="empty-panel">暂无数据</div>
                    )}
                  </div>
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
