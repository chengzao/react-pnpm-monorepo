import React, { useState, useRef, useEffect } from 'react';
import './tagList.css';

export const TagList = ({
  tags,
  maxLine = 2,
}: {
  tags: string[];
  maxLine?: number;
}) => {
  const [expand, setExpand] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (expand) {
      setVisibleCount(tags.length);
      setShowExpand(tags.length > 0 && tags.length > visibleCount);
      return;
    }
    const check = () => {
      const container = containerRef.current;
      if (!container) return;

      // 创建临时测量按钮
      const containerRect = container.getBoundingClientRect();
      const firstLineHeight = container.children[0]?.clientHeight || 0;
      const containerBottom = containerRect.top + firstLineHeight * maxLine;

      const children = Array.from(container.children).filter(
        (child) => child !== measureBtnRef.current,
      );
      let lastIndex = children.length;

      for (let i = 0; i < children.length; i++) {
        const tag = children[i] as HTMLElement;
        const tagRect = tag.getBoundingClientRect();

        // 通过标签顶部判断是否超出可视区域
        if (tagRect.top > containerBottom) {
          lastIndex = i;
          break;
        }

        // 保留按钮宽度补偿逻辑
        const btn = measureBtnRef.current;
        if (btn) {
          const btnRect = btn.getBoundingClientRect();
          if (tagRect.right + btnRect.width + 8 > containerRect.right) {
            lastIndex = i;
            break;
          }
        }
      }

      setVisibleCount(Math.max(0, lastIndex));
      setShowExpand(tags.length > 0 && tags.length > lastIndex);
    };
    check();
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('resize', check);
    };
  }, [tags, expand, maxLine]);

  const handleExpand = () => {
    setExpand((v) => !v);
  };

  return (
    <div>
      <div className="tags" ref={containerRef}>
        {tags
          .slice(0, expand ? tags.length : visibleCount)
          .map((item, index) => (
            <button className="tag-item" key={index}>
              {item}
            </button>
          ))}
        {showExpand && (
          <button className="tag-expand-btn" onClick={handleExpand}>
            {expand ? '收起' : '展开'}
          </button>
        )}
      </div>

      <div style={{ height: 0, opacity: 0 }}>
        <button className="tag-expand-btn" ref={measureBtnRef}>
          {expand ? '收起' : '展开'}
        </button>
      </div>
    </div>
  );
};
