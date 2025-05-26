import React, { useState, useRef, useEffect } from 'react';

import './tagListWidth.css';

export const TagListWidth = ({
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
  const tagItemsRef = useRef<{ width: number; text: string }[]>([]);

  // 初始化时测量所有标签的宽度
  useEffect(() => {
    if (tags.length === 0) return;

    // 创建临时容器来测量每个标签的宽度
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.visibility = 'hidden';
    tempContainer.style.pointerEvents = 'none';
    tempContainer.style.display = 'flex';
    tempContainer.style.flexWrap = 'wrap';
    tempContainer.style.gap = '8px';
    document.body.appendChild(tempContainer);

    tagItemsRef.current = tags.map((tag) => {
      const tempTag = document.createElement('div');
      tempTag.className = 'tag-item';
      tempTag.textContent = tag;
      tempContainer.appendChild(tempTag);
      const width = tempTag.offsetWidth;
      return { width, text: tag };
    });

    document.body.removeChild(tempContainer);
  }, [tags]);

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
      if (!container || !measureBtn || tagItemsRef.current.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;

      const containerStyle = window.getComputedStyle(container);
      const gap = parseFloat(containerStyle.gap) || 8;

      // 获取展开按钮的宽度
      const btnStyle = window.getComputedStyle(measureBtn);
      const btnWidth =
        measureBtn.offsetWidth +
        parseFloat(btnStyle.marginLeft) +
        parseFloat(btnStyle.marginRight);

      // 基于容器宽度和maxLine计算可见的标签数量
      let currentLine = 1;
      let currentLineWidth = 0;
      let lastVisibleIndex = 0;
      let needsExpand = false;

      // 第一步：计算在maxLine限制下能显示多少个标签
      for (let i = 0; i < tagItemsRef.current.length; i++) {
        const tagWidth = tagItemsRef.current[i].width;
        const requiredWidth =
          currentLineWidth === 0 ? tagWidth : currentLineWidth + gap + tagWidth;

        if (requiredWidth <= containerWidth) {
          // 当前行可以放下这个标签
          currentLineWidth = requiredWidth;
          lastVisibleIndex = i + 1;
        } else {
          // 当前行放不下，需要换行
          if (currentLine < maxLine) {
            currentLine++;
            currentLineWidth = tagWidth;
            lastVisibleIndex = i + 1;
          } else {
            // 已达到最大行数限制
            needsExpand = true;
            break;
          }
        }
      }

      // 第二步：如果需要展开按钮，逐步减少标签直到能容纳展开按钮
      if (needsExpand && lastVisibleIndex > 0) {
        const requiredSpaceForBtn = gap + btnWidth;

        while (lastVisibleIndex > 0) {
          // 重新计算当前lastVisibleIndex下最后一行的宽度
          let tempLine = 1;
          let tempLineWidth = 0;
          let lastLineWidth = 0;

          for (let i = 0; i < lastVisibleIndex; i++) {
            const tagWidth = tagItemsRef.current[i].width;
            const requiredWidth =
              tempLineWidth === 0 ? tagWidth : tempLineWidth + gap + tagWidth;

            if (requiredWidth <= containerWidth) {
              tempLineWidth = requiredWidth;
              if (tempLine === maxLine) {
                lastLineWidth = tempLineWidth;
              }
            } else {
              tempLine++;
              tempLineWidth = tagWidth;
              if (tempLine === maxLine) {
                lastLineWidth = tempLineWidth;
              }
            }
          }

          // 检查是否能放下展开按钮
          if (lastLineWidth + requiredSpaceForBtn <= containerWidth) {
            break; // 可以放下展开按钮
          }

          lastVisibleIndex--; // 放不下，减少一个标签
        }

        // 确保至少显示一个标签
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

    // 等待标签宽度测量完成后再进行计算
    const timer = setTimeout(() => {
      if (tagItemsRef.current.length > 0) {
        frameId = requestAnimationFrame(check);
      }
    }, 0);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [expand, maxLine]); // 移除了 tags 依赖，因为标签宽度已经在单独的 useEffect 中处理

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
          maxHeight: expand ? 'none' : 'auto',
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
