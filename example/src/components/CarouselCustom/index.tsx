import React from 'react';

import { CarouselCustom } from '@learnbase/rslib';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
];

const SkillDemo = () => {
  return (
    <div style={{ width: '500px', height: '300px' }}>
      <CarouselCustom>
        {data.map((item) => (
          <div key={item.id}>
            <h3 style={contentStyle}>{item.name}</h3>
          </div>
        ))}
      </CarouselCustom>
    </div>
  );
};

export default SkillDemo;
