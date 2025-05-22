import React, { useRef, useState, useEffect } from 'react';
import './tagList.css';

export const TagList = ({ tags }: { tags: string[] }) => {
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  // 检查是否溢出
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const lineHeight = parseInt(
          getComputedStyle(containerRef.current).lineHeight,
          10,
        );
        const maxHeight = lineHeight * 2; // 最大显示 2 行

        setIsOverflow(
          (containerRef.current as HTMLDivElement).scrollHeight > maxHeight,
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [tags]);

  return (
    <div className="tag-container">
      <div
        ref={containerRef}
        className={`tag-list ${expanded ? 'expanded' : ''}`}
      >
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {isOverflow && (
        <button onClick={() => setExpanded(!expanded)} className="toggle-btn">
          {expanded ? '收起' : '展开'}
        </button>
      )}
    </div>
  );
};
