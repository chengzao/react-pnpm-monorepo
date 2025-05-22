import React, { useState, useEffect } from 'react';
import './tagList.css';

export const TagList = ({ tags }: { tags: string[] }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [sectionRowIndex, setSectionRowIndex] = useState<number>(100);

  function getLastElementOfSecondRow() {
    const container = document.querySelector<HTMLElement>('.tags');
    if (!container) return;
    const containerWidth = container.offsetWidth;

    let lastIndex = 100;
    let currnetY = 0;
    let row = 0;

    if (containerWidth !== null) {
      const items = container.querySelectorAll<HTMLElement>('.tag-item');

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (Math.abs(currnetY - item.offsetTop) > 20) {
          currnetY = item.offsetTop;
          row++;
        }

        if (row > 2) {
          lastIndex = i - 1;
          break;
        }
      }
    }
    if (row <= 2) setExpand(false);

    setSectionRowIndex(lastIndex - 1);
  }

  useEffect(() => {
    getLastElementOfSecondRow();
  }, []);

  return (
    <div className="tags">
      {tags.map((item, index) => {
        if (index === sectionRowIndex)
          return (
            <>
              <div
                className="tag-item"
                style={{
                  position: 'relative',
                }}
              >
                <button
                  key="expand"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  onClick={() => setExpand(!expand)}
                >
                  + Expand all
                </button>
                <button key={index} style={{ visibility: 'hidden' }}>
                  {item}
                </button>
              </div>
              <div style={{ width: '100%' }}></div>
            </>
          );
        return (
          <button className="tag-item" key={index}>
            {item}
          </button>
        );
      })}
    </div>
  );
};
