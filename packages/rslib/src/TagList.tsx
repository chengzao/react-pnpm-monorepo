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
  const measureBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expand) {
      setVisibleCount(tags.length);
      setShowExpand(tags.length > 0);
      return;
    }

    let frameId: number;

    const check = () => {
      const container = containerRef.current;
      const measureBtn = measureBtnRef.current;
      if (!container || !measureBtn) return;

      const containerRect = container.getBoundingClientRect();
      const firstLineHeight = container.children[0]?.clientHeight || 0;
      const maxHeight = firstLineHeight * maxLine;
      const containerBottom = containerRect.top + maxHeight;

      const btnStyle = window.getComputedStyle(measureBtn);
      const btnWidth =
        measureBtn.offsetWidth +
        parseFloat(btnStyle.marginLeft) +
        parseFloat(btnStyle.marginRight);

      const containerStyle = window.getComputedStyle(container);
      const gap = parseFloat(containerStyle.gap) || 8;

      const children = Array.from(container.children).filter((child) => child);

      let lastVisibleIndex = children.length;
      let needsExpand = false;

      for (let i = 0; i < children.length; i++) {
        const tag = children[i] as HTMLElement;
        const tagRect = tag.getBoundingClientRect();

        if (tagRect.top >= containerBottom) {
          lastVisibleIndex = i;
          needsExpand = true;
          break;
        }
      }

      if (lastVisibleIndex === children.length) {
        const lastChild = children[children.length - 1] as HTMLElement;
        if (lastChild) {
          const lastChildRect = lastChild.getBoundingClientRect();
          if (lastChildRect.bottom > containerBottom) {
            needsExpand = true;
            for (let i = children.length - 1; i >= 0; i--) {
              const tag = children[i] as HTMLElement;
              const tagRect = tag.getBoundingClientRect();
              if (tagRect.top < containerBottom) {
                lastVisibleIndex = i + 1;
                break;
              }
            }
          }
        }
      }

      if (needsExpand && lastVisibleIndex > 0) {
        let canFitButton = false;

        while (lastVisibleIndex > 0 && !canFitButton) {
          const lastVisibleTag = children[lastVisibleIndex - 1] as HTMLElement;
          const lastTagRect = lastVisibleTag.getBoundingClientRect();

          const availableWidth = containerRect.right - lastTagRect.right;
          const requiredWidth = gap * 2 + btnWidth + 4;

          if (availableWidth >= requiredWidth) {
            canFitButton = true;
          } else {
            lastVisibleIndex--;
          }
        }

        if (lastVisibleIndex === 0 && tags.length > 0) {
          lastVisibleIndex = 1;
        }
      }

      setVisibleCount(lastVisibleIndex);
      setShowExpand(needsExpand && tags.length > lastVisibleIndex);
    };

    const handleResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(check);
    };

    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(check);
    }, 0);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [tags, expand, maxLine]);

  const handleExpand = () => {
    setExpand((v) => !v);
  };

  return (
    <div>
      <div
        className="tags"
        ref={containerRef}
        style={{
          gap: '8px',
          overflow: 'hidden',
          maxHeight: expand ? 'none' : `${maxLine * (32 + 8)}px`, // 假设每行高度为32px
        }}
      >
        {tags
          .slice(0, expand ? tags.length : visibleCount)
          .map((item, index) => (
            <div className="tag-item" key={index}>
              {item}
            </div>
          ))}

        {showExpand && (
          <div className="tag-expand-btn" onClick={handleExpand}>
            {expand ? '收起' : '展开'}
          </div>
        )}
      </div>

      {/* 隐藏的测量按钮 */}
      <div
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div className="tag-expand-btn" ref={measureBtnRef}>
          {expand ? '收起' : '展开'}
        </div>
      </div>
    </div>
  );
};
