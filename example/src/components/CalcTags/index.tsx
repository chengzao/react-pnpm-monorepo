import React from 'react';

import { CalcTags } from '@learnbase/rslib';

// 演示组件
const Demo = () => {
  const tags = [
    { id: 1, value: 'React' },
    { id: 2, value: 'TypeScript' },
    { id: 3, value: 'JavaScript' },
    { id: 4, value: 'CSS' },
    { id: 5, value: 'HTML' },
    { id: 6, value: 'Node.js' },
    { id: 7, value: 'Python' },
    { id: 8, value: 'Vue.js' },
    { id: 9, value: 'Angular' },
    { id: 10, value: 'Webpack' },
    { id: 11, value: 'Vite' },
    { id: 12, value: 'ESLint' },
    { id: 13, value: 'Prettier' },
    { id: 14, value: 'Git' },
    { id: 15, value: 'GitHub' },
    { id: 16, value: 'VS Code' },
    { id: 17, value: 'Chrome DevTools' },
    { id: 18, value: 'Responsive Design' },
    { id: 19, value: 'Flexbox' },
    { id: 20, value: 'Grid' },
    { id: 21, value: 'Tailwind CSS' },
  ];

  const [val, setVal] = React.useState<string | number>();

  const onChange = (value: string | number) => {
    console.log('value', value);
    setVal(value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '60%', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>CalcTags 组件演示</h2>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '8px' }}>
          <CalcTags data={tags} value={val} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default Demo;
