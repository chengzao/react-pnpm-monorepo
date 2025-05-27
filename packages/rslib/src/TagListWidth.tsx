import React, { useState, useRef, useEffect, useCallback } from 'react';
import './tagListWidth.css';

const loadPolyfill = async () => {
  if (typeof ResizeObserver === 'undefined') {
    const module = await import('resize-observer-polyfill');
    return module.default;
  }
  return ResizeObserver;
};

export const TagListWidth = ({
  tags,
  maxLine = 2,
}: {
  tags: string[];
  maxLine?: number;
}) => {
  const [expand, setExpand] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0); // 初始设为0避免闪烁
  const containerRef = useRef<HTMLDivElement>(null);
  const measureBtnRef = useRef<{ offsetWidth: number }>(null);
  const tagItemsRef = useRef<{ width: number; text: string }[]>([]);
  const [measureVersion, setMeasureVersion] = useState(0); // 强制重新计算

  // 测量标签和按钮宽度
  useEffect(() => {
    if (tags.length === 0) {
      setVisibleCount(0);
      setShowExpand(false);
      return;
    }

    const tempContainer = document.createElement('div');
    tempContainer.style.cssText =
      'position:absolute; visibility:hidden; pointer-events:none; top:-9999px; left:-9999px;';
    document.body.appendChild(tempContainer);

    try {
      // 测量标签
      const tagWidths = tags.map((tag) => {
        const tagEl = document.createElement('div');
        tagEl.className = 'tag-item';
        tagEl.textContent = tag;
        tempContainer.appendChild(tagEl);
        const width = tagEl.getBoundingClientRect().width;
        tempContainer.removeChild(tagEl);
        return { width, text: tag };
      });

      // 测量按钮
      const btnEl = document.createElement('div');
      btnEl.className = 'tag-expand-btn';
      btnEl.textContent = '展开';
      tempContainer.appendChild(btnEl);
      const expandWidth = btnEl.getBoundingClientRect().width;
      btnEl.textContent = '收起';
      const collapseWidth = btnEl.getBoundingClientRect().width;

      // 存储测量结果
      tagItemsRef.current = tagWidths;
      measureBtnRef.current = {
        offsetWidth: Math.max(expandWidth, collapseWidth),
      };
      setMeasureVersion((v) => v + 1); // 触发重新计算
    } finally {
      document.body.removeChild(tempContainer);
    }
  }, [tags]);

  const calculateLastLineWidth = (
    count: number,
    gap: number,
    containerWidth: number,
  ) => {
    let lineWidth = 0;
    let line = 1;
    for (let i = 0; i < count; i++) {
      const tag = tagItemsRef.current[i];
      const needed = lineWidth === 0 ? tag.width : lineWidth + gap + tag.width;
      if (needed <= containerWidth) {
        lineWidth = needed;
      } else {
        line++;
        lineWidth = tag.width;
      }
      if (line > maxLine) break;
    }
    return line === maxLine ? lineWidth : 0;
  };

  const checkLayout = useCallback(() => {
    if (!containerRef.current || tags.length === 0) return;
    const container = containerRef.current!;
    const containerWidth = container.getBoundingClientRect().width;
    const gap = Number(getComputedStyle(container).gap.replace('px', '')) || 8;
    const btnWidth = measureBtnRef.current?.offsetWidth || 0;

    let lineCount = 1;
    let currentWidth = 0;
    let lastVisible = 0;
    let needsExpand = false;

    // 计算可见标签
    for (let i = 0; i < tagItemsRef.current.length; i++) {
      const tag = tagItemsRef.current[i];
      const needed =
        currentWidth === 0 ? tag.width : currentWidth + gap + tag.width;

      if (needed <= containerWidth) {
        currentWidth = needed;
        lastVisible = i + 1;
      } else {
        if (lineCount < maxLine) {
          lineCount++;
          currentWidth = tag.width;
          lastVisible = i + 1;
        } else {
          needsExpand = true;
          break;
        }
      }
    }

    // 调整以容纳按钮
    if (needsExpand) {
      const btnSpace = gap + btnWidth;
      while (lastVisible > 0) {
        const lastLineWidth = calculateLastLineWidth(
          lastVisible,
          gap,
          containerWidth,
        );
        if (lastLineWidth + btnSpace <= containerWidth) break;
        lastVisible--;
      }
    }

    lastVisible = Math.min(lastVisible, tags.length);
    setVisibleCount(expand ? tags.length : lastVisible);

    const shouldShowExpand =
      !expand && (needsExpand || lastVisible < tags.length);
    const shouldShowCollapse = expand && tags.length > 0; // 新增逻辑
    setShowExpand(shouldShowExpand || shouldShowCollapse);
  }, [expand, maxLine, measureVersion]);

  useEffect(() => {
    let observer: ResizeObserver | null = null;
    let resizeFallback: NodeJS.Timeout;
    const container = containerRef.current;

    const initObserver = async () => {
      // 现代浏览器直接使用
      if (typeof ResizeObserver !== 'undefined') {
        const ResizeObserver = await loadPolyfill();
        observer = new ResizeObserver(checkLayout);
        if (container) observer.observe(container);
      } else {
        // 降级方案：窗口resize+轮询检测
        const handleResize = () => {
          checkLayout();
          // 容器可能随父元素变化，增加主动检测
          resizeFallback = setInterval(() => {
            const newWidth = container?.offsetWidth;
            if (newWidth !== container?.dataset.lastWidth) {
              container?.setAttribute('data-last-width', newWidth + '');
              checkLayout();
            }
          }, 500);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 初始检测

        // 清理函数
        return () => {
          observer?.disconnect();
          window.removeEventListener('resize', handleResize);
          clearInterval(resizeFallback);
        };
      }
    };

    if (container) initObserver();

    return () => {
      observer?.disconnect();
      clearInterval(resizeFallback);
    };
  }, [checkLayout]);

  return (
    <div className="tags" ref={containerRef} style={{ gap: 8 }}>
      {tags.slice(0, visibleCount).map((tag, i) => (
        <div key={i} className="tag-item">
          {tag}
        </div>
      ))}
      {showExpand && (
        <button className="tag-expand-btn" onClick={() => setExpand((e) => !e)}>
          {expand ? '收起' : '展开'}
        </button>
      )}
    </div>
  );
};
