import React, { useState, useRef, useEffect, useCallback } from 'react';
import './tagListWidth.css';

// 复用全局测量容器
let globalMeasureContainer: HTMLDivElement | null = null;
const getMeasureContainer = () => {
  if (!globalMeasureContainer) {
    globalMeasureContainer = document.createElement('div');
    globalMeasureContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      pointer-events: none;
      top: -9999px;
      left: -9999px;
    `;
    document.body.appendChild(globalMeasureContainer);
  }
  return globalMeasureContainer;
};

const loadPolyfill = async () => {
  if (typeof ResizeObserver === 'undefined') {
    const module = await import('resize-observer-polyfill');
    return module.default;
  }
  return ResizeObserver;
};

interface TagMetrics {
  tagWidths: { width: number; text: string }[];
  btnWidth: number;
}

interface TagListWidthProps {
  tags: string[];
  maxLine?: number;
  expandText?: string;
  collapseText?: string;
  formatExpandText?: (hiddenCount: number) => string;
}

const useTagMetrics = (
  tags: string[],
  options: Pick<
    TagListWidthProps,
    'expandText' | 'collapseText' | 'formatExpandText'
  >,
) => {
  const [metrics, setMetrics] = useState<TagMetrics>({
    tagWidths: [],
    btnWidth: 0,
  });

  useEffect(() => {
    if (tags.length === 0) {
      setMetrics({ tagWidths: [], btnWidth: 0 });
      return;
    }

    const tempContainer = getMeasureContainer();
    try {
      // 测量标签宽度
      const tagWidths = tags.map((tag) => {
        const tagEl = document.createElement('div');
        tagEl.className = 'tag-item';
        tagEl.textContent = tag;
        tempContainer.appendChild(tagEl);
        const width = tagEl.getBoundingClientRect().width;
        tempContainer.removeChild(tagEl);
        return { width, text: tag };
      });

      // 测量按钮宽度
      const measureButtonWidth = () => {
        const texts: string[] = [];

        // 收集所有可能的按钮文本
        if (options.collapseText) texts.push(options.collapseText);
        if (options.expandText) texts.push(options.expandText);
        if (options.formatExpandText) {
          // 生成最大可能文本（假设最多隐藏999项）
          texts.push(options.formatExpandText(999));
        }

        console.log('texts', texts);

        // 测量所有可能文本的宽度
        return Math.max(
          ...texts.map((text) => {
            const btn = document.createElement('div');
            btn.className = 'tag-expand-btn';
            btn.textContent = text;
            tempContainer.appendChild(btn);
            const width = btn.getBoundingClientRect().width;
            tempContainer.removeChild(btn);
            return width;
          }),
        );
      };

      const btnWidth = measureButtonWidth();
      setMetrics({ tagWidths, btnWidth });
    } catch (e) {
      console.error('Measurement failed:', e);
    }
  }, [
    tags,
    options.expandText,
    options.collapseText,
    options.formatExpandText,
  ]);

  return metrics;
};

export const TagListWidth = ({
  tags,
  maxLine = 2,
  expandText = '展开',
  collapseText = '收起',
  formatExpandText,
}: TagListWidthProps) => {
  const [expand, setExpand] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showExpand, setShowExpand] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { tagWidths, btnWidth } = useTagMetrics(tags, {
    expandText,
    collapseText,
    formatExpandText,
  });
  const lastWidth = useRef<number>(0);

  const calculateVisibility = useCallback(
    (containerWidth: number, gap: number) => {
      let lineCount = 1;
      let currentWidth = 0;
      let lastVisible = 0;
      let needsExpand = false;

      for (let i = 0; i < tagWidths.length; i++) {
        const tag = tagWidths[i];
        const needed =
          currentWidth + (currentWidth === 0 ? 0 : gap) + tag.width;

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
      return { lastVisible, needsExpand };
    },
    [tagWidths, maxLine],
  );

  const checkLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container || tagWidths.length === 0) return;

    const containerWidth = container.getBoundingClientRect().width;
    if (containerWidth <= 0) {
      setVisibleCount(0);
      setShowExpand(false);
      return;
    }

    const gap = Number(getComputedStyle(container).gap.replace('px', '')) || 8;
    const { lastVisible, needsExpand } = calculateVisibility(
      containerWidth,
      gap,
    );

    let adjustedVisible = lastVisible;
    if (needsExpand) {
      const btnSpace = gap + btnWidth;
      while (adjustedVisible > 0) {
        let lineWidth = 0;
        let line = 1;
        for (let i = 0; i < adjustedVisible; i++) {
          const needed =
            lineWidth + (lineWidth === 0 ? 0 : gap) + tagWidths[i].width;
          if (needed <= containerWidth) {
            lineWidth = needed;
          } else {
            line++;
            lineWidth = tagWidths[i].width;
          }
          if (line > maxLine) break;
        }
        if (line === maxLine && lineWidth + btnSpace <= containerWidth) break;
        adjustedVisible--;
      }
    }

    const finalVisible = expand
      ? tagWidths.length
      : Math.min(adjustedVisible, tagWidths.length);
    const shouldShow = expand
      ? tagWidths.length > 0
      : needsExpand || adjustedVisible < tagWidths.length;

    setVisibleCount((prev) => (prev !== finalVisible ? finalVisible : prev));
    setShowExpand((prev) => (prev !== shouldShow ? shouldShow : prev));
  }, [expand, tagWidths, btnWidth, maxLine, calculateVisibility]);

  // 响应式布局处理
  useEffect(() => {
    let observer: ResizeObserver | null = null;
    let rafId: number;
    let isMounted = true;

    const initObserver = async () => {
      try {
        const ResizeObserver = await loadPolyfill();
        if (!isMounted || !containerRef.current) return;

        observer = new ResizeObserver(() => {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(checkLayout);
        });
        observer.observe(containerRef.current);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // 降级方案使用RAF轮询
        const checkSize = () => {
          if (!isMounted || !containerRef.current) return;
          const newWidth = containerRef.current.offsetWidth;
          if (newWidth !== lastWidth.current) {
            lastWidth.current = newWidth;
            checkLayout();
          }
          requestAnimationFrame(checkSize);
        };
        checkSize();
      }
    };

    initObserver();
    checkLayout(); // 初始检查

    return () => {
      isMounted = false;
      observer?.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [checkLayout]);

  const buttonText = expand
    ? collapseText
    : formatExpandText
      ? formatExpandText(tags.length - visibleCount)
      : expandText;

  return (
    <div className="tags-container" ref={containerRef}>
      <div className="tags">
        {tags.slice(0, visibleCount).map((tag, i) => (
          <div key={`${tag}-${i}`} className="tag-item">
            {tag}
          </div>
        ))}
        {showExpand && (
          <button
            className="tag-expand-btn"
            onClick={() => setExpand((e) => !e)}
            aria-expanded={expand}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
