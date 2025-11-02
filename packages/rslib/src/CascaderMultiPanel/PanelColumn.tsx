import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CascaderOption, ValueType } from './utils';

interface Props {
  nodes: CascaderOption[];
  level: number;
  activePath: CascaderOption[];
  multiple: boolean;
  disabled: boolean;
  selectedValues: Set<ValueType>;
  onNodeClick: (node: CascaderOption, level: number) => void;
  onNodeSelect: (node: CascaderOption) => void;
  onNodeMouseEnter: (node: CascaderOption, level: number) => void;
  onNodeMouseLeave: (node: CascaderOption, level: number) => void;
  shouldNodeBeSelected: (node: CascaderOption) => boolean;
  isNodeIndeterminate: (node: CascaderOption) => boolean;
}

const PanelColumn: React.FC<Props> = ({
  nodes,
  level,
  activePath,
  multiple,
  disabled,
  onNodeClick,
  onNodeSelect,
  onNodeMouseEnter,
  onNodeMouseLeave,
  shouldNodeBeSelected,
  isNodeIndeterminate,
}) => {
  return (
    <div className="cascade-panel">
      {nodes.map((node) => {
        const hasChildren = !!(node.children && node.children.length > 0);
        const isSelected = shouldNodeBeSelected(node);
        const isIndeterminate = isNodeIndeterminate(node) && multiple;
        const showRadio = !multiple && !hasChildren;
        const showCheckbox = multiple;

        return (
          <div
            key={node.value}
            className={`cascade-node ${
              activePath[level]?.value === node.value ? 'active' : ''
            }`}
            onClick={() => !disabled && onNodeClick(node, level)}
            onMouseEnter={() => onNodeMouseEnter(node, level)}
            onMouseLeave={() => onNodeMouseLeave(node, level)}
          >
            {(showCheckbox || showRadio) && (
              <div>
                <input
                  type={multiple ? 'checkbox' : 'radio'}
                  checked={isSelected}
                  disabled={disabled}
                  ref={(input) => {
                    if (input && multiple) {
                      input.indeterminate = isIndeterminate;
                    }
                  }}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (!disabled) onNodeSelect(node);
                  }}
                  className="cascade-node-checkbox"
                />
              </div>
            )}

            <span className="cascade-node-label">{node.label}</span>

            {hasChildren && <ChevronRight className="cascade-node-arrow" />}
          </div>
        );
      })}
    </div>
  );
};

export default PanelColumn;
