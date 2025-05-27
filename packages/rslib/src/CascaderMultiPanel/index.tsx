import React, { useState, useMemo } from 'react';
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
}

const CascaderPanel: React.FC<CascaderPanelProps> = ({
  options,
  value = [],
  onChange,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(value));
  const [activePath, setActivePath] = useState<TreeNode[]>([]);

  // 扁平化树数据
  const flattenTree = useMemo(() => {
    const map = new Map<string, TreeNode>();
    const flatten = (nodes: TreeNode[], parent?: TreeNode) => {
      nodes.forEach((node) => {
        node.parent = parent;
        node.isLeaf = !node.children || node.children.length === 0;
        map.set(node.value, node);
        if (node.children) {
          flatten(node.children, node);
        }
      });
    };
    flatten(options);
    return map;
  }, [options]);

  // 处理节点选择
  const handleSelect = (node: TreeNode) => {
    const newSelected = new Set(selectedKeys);
    const shouldSelect = !selectedKeys.has(node.value);

    const traverse = (n: TreeNode) => {
      shouldSelect ? newSelected.add(n.value) : newSelected.delete(n.value);
      n.children?.forEach((child) => traverse(child));
    };

    traverse(node);
    setSelectedKeys(newSelected);
    onChange?.(Array.from(newSelected));
  };

  // 搜索过滤逻辑
  const searchResults = useMemo(() => {
    if (!searchValue.trim()) return [];

    const results: TreeNode[] = [];
    const lowerSearch = searchValue.toLowerCase();

    const searchNodes = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        // 仅在当前节点匹配时记录叶子节点或最后一级节点
        if (node.label.toLowerCase().includes(lowerSearch)) {
          // 判断是否是最后一级或叶子节点
          if (!node.children || node.children.length === 0) {
            results.push(node);
          }
        }

        // 继续搜索子节点
        if (node.children) {
          searchNodes(node.children);
        }
      });
    };

    searchNodes(options);
    return results;
  }, [options, searchValue]);

  // 获取当前展示的面板数据
  const getPanelData = (level: number): TreeNode[] => {
    if (level === 0) return options;
    return activePath[level - 1]?.children || [];
  };

  const getNodePath = (node: TreeNode) => {
    const path = [];
    let current = node;
    while (current.parent) {
      path.unshift(current.parent.label);
      current = current.parent;
    }
    return path.join(' / ');
  };

  // 渲染搜索结果
  const renderSearchResults = () => {
    return (
      <div className="search-results">
        {searchResults.map((node) => (
          <div key={node.value} className="search-result-item">
            <input
              type="checkbox"
              checked={selectedKeys.has(node.value)}
              onChange={() => handleSelect(node)}
              className="node-checkbox"
            />
            <span className="search-result-label">
              {node.label}
              <span className="node-path-hint">（{getNodePath(node)}）</span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  // 渲染级联面板
  const renderPanel = (level: number) => {
    const nodes = getPanelData(level);
    if (!nodes.length) return null;

    return (
      <div className="cascader-panel">
        <div className="panel-header">
          {level > 0 && (
            <div className="breadcrumb">
              {activePath.slice(0, level).map((node, i) => (
                <span
                  key={node.value}
                  className="breadcrumb-item"
                  onClick={() => setActivePath((prev) => prev.slice(0, i + 1))}
                >
                  {node.label}
                  {i < level - 1 && <span className="separator">/</span>}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="panel-content">
          {nodes.map((node) => (
            <div
              key={node.value}
              className={`node-item ${
                selectedKeys.has(node.value) ? 'checked' : ''
              } ${node.children ? 'has-children' : ''}`}
              onClick={() =>
                node.children &&
                setActivePath((prev) => [...prev.slice(0, level), node])
              }
            >
              <input
                type="checkbox"
                checked={selectedKeys.has(node.value)}
                onChange={() => handleSelect(node)}
                className="node-checkbox"
                onClick={(e) => e.stopPropagation()}
              />
              <span className="node-label">{node.label}</span>
              {node.children && <span className="arrow-icon">❯</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };

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
          {renderPanel(0)}
          {activePath.map((_, i) => renderPanel(i + 1))}
        </div>
      )}
    </div>
  );
};

export default CascaderPanel;
