// CascaderPanel.tsx
import React, { useState, useMemo, useEffect } from 'react';
import './index.css';

interface TreeNode {
  value: string;
  label: string;
  children?: TreeNode[];
  parent?: TreeNode;
  isLeaf?: boolean;
}

interface CascaderPanelProps {
  options: TreeNode[];
  value?: string[];
  onChange?: (value: string[]) => void;
  expandTrigger?: 'hover' | 'click';
}

type CheckState = {
  checked: boolean;
  indeterminate: boolean;
};

const CascaderPanel = ({
  options,
  value = [],
  onChange,
  expandTrigger = 'click',
}: CascaderPanelProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(value));
  const [activePath, setActivePath] = useState<TreeNode[]>([]);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // 扁平化树数据
  const flattenTree = useMemo(() => {
    const map = new Map<string, TreeNode>();
    const flatten = (nodes: TreeNode[], parent?: TreeNode) => {
      nodes.forEach((node) => {
        node.parent = parent;
        node.isLeaf = !node.children?.length;
        map.set(node.value, node);
        flatten(node.children || [], node);
      });
    };
    flatten(options);
    return map;
  }, [options]);

  const handleExpand = (node: TreeNode, level: number) => {
    // if (node.children) {
    // }
    setActivePath((prev) => [...prev.slice(0, level), node]);
  };

  const handleHover = (node: TreeNode, level: number) => {
    if (expandTrigger !== 'hover') return;

    if (hoverTimeout) clearTimeout(hoverTimeout);

    const timeout = setTimeout(() => {
      handleExpand(node, level);
    }, 200); // 添加200ms延迟防止误触

    setHoverTimeout(timeout);
  };

  useEffect(() => {
    if (value.length > 0 && flattenTree.size > 0) {
      const firstValue = value[0];
      const node = flattenTree.get(firstValue);

      if (node) {
        const path: TreeNode[] = [];
        let current: TreeNode | undefined = node;

        // 收集所有父节点
        while (current?.parent) {
          path.unshift(current.parent);
          current = current.parent;
        }

        setActivePath(path);
      }
    }
  }, []);

  // 计算选择状态
  const checkStates = useMemo(() => {
    const states = new Map<string, CheckState>();

    const calculateState = (node: TreeNode): CheckState => {
      if (node.isLeaf) {
        return {
          checked: selectedKeys.has(node.value),
          indeterminate: false,
        };
      }

      let hasChecked = false;
      let hasUnchecked = false;

      node.children?.forEach((child) => {
        const childState = calculateState(child);
        if (childState.checked || childState.indeterminate) hasChecked = true;
        if (!childState.checked || childState.indeterminate)
          hasUnchecked = true;
      });

      return {
        checked: !hasUnchecked,
        indeterminate: hasChecked && hasUnchecked,
      };
    };

    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        states.set(node.value, calculateState(node));
        traverse(node.children || []);
      });
    };

    traverse(options);
    return states;
  }, [options, selectedKeys]);

  // 处理节点选择
  const handleSelect = (node: TreeNode) => {
    const newSelected = new Set(selectedKeys);
    const state = checkStates.get(node.value)!;
    const shouldSelect = !state.checked;

    const toggleSelection = (n: TreeNode) => {
      if (n.isLeaf) {
        if (shouldSelect) {
          newSelected.add(n.value);
        } else {
          newSelected.delete(n.value);
        }
      }
      n.children?.forEach(toggleSelection);
    };

    toggleSelection(node);
    setSelectedKeys(newSelected);
    onChange?.(Array.from(newSelected));
  };

  // 搜索功能
  const searchResults = useMemo(() => {
    if (!searchValue.trim()) return [];
    const lowerSearch = searchValue.toLowerCase();

    return Array.from(flattenTree.values()).filter((node) => {
      const isMatch = node.label.toLowerCase().includes(lowerSearch);
      return isMatch && (!node.children?.length || node.isLeaf);
    });
  }, [searchValue, flattenTree]);

  // 获取节点路径
  const getNodePath = (node: TreeNode) => {
    const path = [];
    let current = node;
    while (current.parent) {
      path.unshift(current.parent.label);
      current = current.parent;
    }
    return path.join(' / ');
  };

  const renderNodeItem = (node: TreeNode, level: number) => {
    const isActive = activePath[level]?.value === node.value;
    const eventHandlers = {
      ...(expandTrigger === 'hover' && {
        onMouseEnter: () => handleHover(node, level),
      }),
      ...(expandTrigger === 'click' && {
        onClick: () => handleExpand(node, level),
      }),
    };

    return (
      <div
        key={node.value}
        className={`node-item
          ${checkStates.get(node.value)?.checked ? 'checked' : ''}
          ${isActive ? 'active-path' : ''}`}
        {...eventHandlers}
      >
        <input
          type="checkbox"
          className={`custom-checkbox ${
            checkStates.get(node.value)?.indeterminate ? 'indeterminate' : ''
          }`}
          checked={checkStates.get(node.value)?.checked}
          onChange={() => handleSelect(node)}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="node-label">{node.label}</span>
        {node.children && <span className="arrow-icon">❯</span>}
      </div>
    );
  };

  // 渲染搜索结果
  const renderSearchResults = () => (
    <div className="search-results">
      {searchResults.map((node) => (
        <div key={node.value} className="search-result-item">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={selectedKeys.has(node.value)}
            onChange={() => handleSelect(node)}
          />
          <span className="node-label">
            {node.label}
            <span className="node-path">{getNodePath(node)}</span>
          </span>
        </div>
      ))}
    </div>
  );

  // 渲染级联面板
  const renderPanel = (nodes: TreeNode[], level: number) => (
    <div key={level} className="cascader-panel">
      <div className="panel-header">
        {level > 0 ? (
          <div className="breadcrumb">
            {activePath.slice(0, level).map((node, i) => (
              <span
                key={node.value}
                className={`breadcrumb-item ${i === level - 1 ? 'active' : ''}`}
                onClick={() => setActivePath((prev) => prev.slice(0, i + 1))}
              >
                {node.label}
                {i < level - 1 && <span className="separator">/</span>}
              </span>
            ))}
          </div>
        ) : (
          <div className="breadcrumb">
            <span className="breadcrumb-item active">Root</span>
          </div>
        )}
      </div>
      <div className="panel-content">
        {nodes.map((node) => renderNodeItem(node, level))}
      </div>
    </div>
  );

  return (
    <div className="cascader-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
        />
      </div>

      {searchValue ? (
        renderSearchResults()
      ) : (
        <div className="panels-container">
          {renderPanel(options, 0)}
          {activePath.map((node, i) => renderPanel(node.children || [], i + 1))}
        </div>
      )}
    </div>
  );
};

export default CascaderPanel;
