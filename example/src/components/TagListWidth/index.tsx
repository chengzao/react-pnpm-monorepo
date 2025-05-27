import React from 'react';

import { TagListWidth } from '@learnbase/rslib';

// 演示组件
const Demo = () => {
  const sampleTags = [
    'React',
    'TypeScript',
    'JavaScript',
    'CSS',
    'HTML',
    'Node.js',
    'Python',
    'Vue.js',
    'Angular',
    'Webpack',
    'Vite',
    'ESLint',
    'Prettier',
    'Git',
    'GitHub',
    'VS Code',
    'Chrome DevTools',
    'Responsive Design',
    'Flexbox',
    'Grid',
    'Tailwind CSS',
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '60%', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>TagListWidth 组件演示</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '10px' }}>最多显示 1 行：</h3>
        <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '8px' }}>
          <TagListWidth tags={sampleTags} maxLine={1} />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '10px' }}>最多显示 2 行：</h3>
        <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '8px' }}>
          <TagListWidth
            tags={sampleTags}
            maxLine={2}
            formatExpandText={(count) => `查看更多（剩余${count}项）`}
            expandText="查看更多" // 提供基础文本用于宽度估算
            collapseText="收起列表"
          />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '10px' }}>最多显示 3 行：</h3>
        <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '8px' }}>
          <TagListWidth tags={sampleTags} maxLine={3} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '10px' }}>少量标签（无需展开）：</h3>
        <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '8px' }}>
          <TagListWidth tags={['React', 'TypeScript', 'CSS']} maxLine={2} />
        </div>
      </div>
    </div>
  );
};

export default Demo;
