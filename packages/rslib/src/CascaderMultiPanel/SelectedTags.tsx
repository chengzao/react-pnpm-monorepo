import React from 'react';
import { ValueType } from './utils';
import { X } from 'lucide-react';

interface Item {
  value: ValueType;
  label: string;
}

interface Props {
  selectedLabels: Item[];
  maxTagCount: number;
  disabled: boolean;
  onRemove: (v: ValueType) => void;
}

const SelectedTags: React.FC<Props> = ({
  selectedLabels,
  maxTagCount,
  disabled,
  onRemove,
}) => {
  if (!selectedLabels.length) return null;
  return (
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
                onClick={() => onRemove(item.value)}
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
  );
};

export default SelectedTags;
