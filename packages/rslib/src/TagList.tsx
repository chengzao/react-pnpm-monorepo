import React, { useState, useRef, useEffect } from 'react';

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
      setShowExpand(tags.length > 0);
      return;
    }

    const check = () => {
      const container = containerRef.current;
      const measureBtn = measureBtnRef.current;
      if (!container || !measureBtn) return;

      // 获取容器信息
      const containerRect = container.getBoundingClientRect();
      const firstLineHeight = container.children[0]?.clientHeight || 0;
      const maxHeight = firstLineHeight * maxLine;
      const containerBottom = containerRect.top + maxHeight;

      // 获取展开按钮的宽度（包括 margin）
      const btnStyle = window.getComputedStyle(measureBtn);
      const btnWidth =
        measureBtn.offsetWidth +
        parseFloat(btnStyle.marginLeft) +
        parseFloat(btnStyle.marginRight);

      const children = Array.from(container.children).filter(
        (child) => child !== measureBtnRef.current,
      );

      let lastVisibleIndex = children.length;
      let needsExpand = false;

      // 找到最后一个完全可见的标签
      for (let i = 0; i < children.length; i++) {
        const tag = children[i] as HTMLElement;
        const tagRect = tag.getBoundingClientRect();

        // 如果标签的顶部超出了最大高度，说明这个标签已经不可见
        if (tagRect.top >= containerBottom) {
          lastVisibleIndex = i;
          needsExpand = true;
          break;
        }
      }

      // 如果所有标签都可见，检查是否真的需要展开按钮
      if (lastVisibleIndex === children.length) {
        // 计算所有标签的总高度
        const lastChild = children[children.length - 1] as HTMLElement;
        if (lastChild) {
          const lastChildRect = lastChild.getBoundingClientRect();
          // 如果最后一个标签的底部超出了最大高度，说明需要收起一些标签
          if (lastChildRect.bottom > containerBottom) {
            needsExpand = true;
            // 重新计算可见标签数量
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

      // 如果需要展开按钮，检查最后一行是否有足够空间放置按钮
      if (needsExpand && lastVisibleIndex > 0) {
        const lastVisibleTag = children[lastVisibleIndex - 1] as HTMLElement;
        const lastTagRect = lastVisibleTag.getBoundingClientRect();

        // 检查按钮是否能放在最后一个可见标签的同一行
        const availableWidth = containerRect.right - lastTagRect.right;

        // 如果空间不够，需要减少一个可见标签来为按钮腾出空间
        if (availableWidth < btnWidth) {
          lastVisibleIndex = Math.max(0, lastVisibleIndex - 1);
        }
      }

      console.log('检查结果:', {
        lastVisibleIndex,
        needsExpand,
        totalTags: tags.length,
        containerBottom,
        btnWidth,
      });

      setVisibleCount(lastVisibleIndex);
      setShowExpand(needsExpand && tags.length > lastVisibleIndex);
    };

    // 使用 setTimeout 确保 DOM 更新后再检查
    const timer = setTimeout(check, 0);
    window.addEventListener('resize', check);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', check);
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
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          overflow: 'hidden',
          maxHeight: expand ? 'none' : `${maxLine * (32 + 8)}px`, // 假设每行高度为32px
        }}
      >
        {tags
          .slice(0, expand ? tags.length : visibleCount)
          .map((item, index) => (
            <button
              className="tag-item"
              key={index}
              style={{
                padding: '4px 12px',
                borderRadius: '16px',
                border: '1px solid #d1d5db',
                backgroundColor: '#f9fafb',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {item}
            </button>
          ))}
        {showExpand && (
          <button
            className="tag-expand-btn"
            onClick={handleExpand}
            style={{
              padding: '4px 12px',
              borderRadius: '16px',
              border: '1px solid #3b82f6',
              backgroundColor: '#eff6ff',
              color: '#3b82f6',
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '500',
            }}
          >
            {expand ? '收起' : '展开'}
          </button>
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
        <button
          className="tag-expand-btn"
          ref={measureBtnRef}
          style={{
            padding: '4px 12px',
            borderRadius: '16px',
            border: '1px solid #3b82f6',
            backgroundColor: '#eff6ff',
            color: '#3b82f6',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '500',
          }}
        >
          {expand ? '收起' : '展开'}
        </button>
      </div>
    </div>
  );
};
