import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';

import './calcTags.css';

interface TagItem {
  id: string | number;
  value: string;
}

interface CalcTagsProps {
  data: TagItem[];
  value?: string | number;
  onChange: (id: string | number) => void;
}

export const CalcTags: React.FC<CalcTagsProps> = memo(
  ({ data, value, onChange }: CalcTagsProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [sliceIndex, setSliceIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const moreRef = useRef<HTMLSpanElement>(null);

    const handleResize = useCallback(() => {
      if (!ref.current) return;
      const children = Array.from(ref.current?.children || []);
      if (!children.length) {
        setSliceIndex(0);
        return;
      }
      // 获取父元素的height
      const parentHeight = ref.current?.getBoundingClientRect?.().height || 0;
      // 获取子元素的height
      const childHeight = children[0]?.getBoundingClientRect?.().height || 0;
      // 大于1行展示
      if (parentHeight <= childHeight) {
        setSliceIndex(0);
        return;
      }

      // 计算父容器的边界
      const parentGap = parseInt(getComputedStyle(ref.current).gap || '0');
      const parentBoundary = ref.current?.getBoundingClientRect?.();
      if (!parentBoundary) {
        setSliceIndex(0);
        return;
      }
      // 先假设全部展示
      let index = children.length;
      for (let i = 0; i < children.length; i++) {
        const ele = children[i];
        if (ele.getBoundingClientRect().top >= parentBoundary.bottom) {
          index = i;
          break;
        }
      }

      // 检查最后一个是否能放下 more 按钮
      if (index <= children.length) {
        const moreBoundWidth =
          moreRef.current?.getBoundingClientRect?.().width || 0;
        while (index > 0) {
          const lastTagBound = children[index - 1]?.getBoundingClientRect?.();
          // 检查最后一个标签的右侧加上 more 按钮的宽度是否超出父容器
          const isOverflow = Math.max(moreBoundWidth, 80) + parentGap * 2;
          if (lastTagBound.right + isOverflow > parentBoundary.right) {
            index--;
          } else {
            break;
          }
        }
      }

      index = Math.max(index, 1);
      setSliceIndex(index);
    }, []);

    useEffect(() => {
      handleResize();
      const resizeHandler = () => handleResize();
      window.addEventListener('resize', resizeHandler);
      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }, [data, handleResize]);

    if (!data.length) {
      return null;
    }

    const handleClick = useCallback(
      (tag: TagItem) => {
        onChange(tag.id);
      },
      [onChange],
    );

    // 提取标签项组件，减少重复代码
    const TagItem = useMemo(() => {
      return ({ tag, isLast = false }: { tag: TagItem; isLast?: boolean }) => (
        <div
          className={`skillItem${tag.id === value ? ' checked' : ''}${
            isLast ? ' skillItemForOverflow' : ''
          }`}
          onClick={() => handleClick(tag)}
        >
          <span>{tag.value}</span>
        </div>
      );
    }, [value, handleClick]);

    return (
      <div className="skillWrapper">
        {showAll ? (
          <div
            className="skills"
            style={{ height: 'auto', maxHeight: 'inherit' }}
            ref={ref}
          >
            {data.map((tag, index) => (
              <TagItem key={index} tag={tag} />
            ))}
            <span
              className="skillItem lessIcon"
              onClick={() => setShowAll(false)}
            >
              {'Less'} <MoreIcon />
            </span>
          </div>
        ) : (
          <>
            {sliceIndex === 0 && (
              <div className="skills" ref={ref}>
                {data.map((tag, index) => (
                  <TagItem key={index} tag={tag} />
                ))}
              </div>
            )}

            {sliceIndex !== 0 && (
              <div className="skills" ref={ref}>
                {data.slice(0, sliceIndex).map((tag, index, arr) => {
                  const isLast = index === arr.length - 1;
                  return <TagItem key={index} tag={tag} isLast={isLast} />;
                })}

                {Boolean(data.length - sliceIndex) && (
                  <span
                    className="skillItem moreIcon"
                    onClick={() => setShowAll(true)}
                  >
                    {'More'} <MoreIcon />
                  </span>
                )}
              </div>
            )}

            <div style={{ height: '0px', opacity: '0', overflow: 'hidden' }}>
              <span className="skillItem" ref={moreRef}>
                {'More'} <MoreIcon />
              </span>
            </div>
          </>
        )}
      </div>
    );
  },
);

const MoreIcon = memo((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#4B4C4D"
      fillRule="evenodd"
      d="m5.891 6.984-3.24-3.24a.5.5 0 0 0-.707 0l-.106.106a.5.5 0 0 0 0 .707L5.89 8.61l4.053-4.053a.5.5 0 0 0 0-.707l-.106-.106a.5.5 0 0 0-.707 0l-3.24 3.24Z"
      clipRule="evenodd"
    />
  </svg>
));
