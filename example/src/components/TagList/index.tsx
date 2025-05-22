import React from 'react';

import { TagList } from '@learnbase/rslib';

const Demo = () => {
  const tags = [
    'React',
    'JavaScript',
    'CSS',
    'HTML',
    'Node.js',
    'TypeScript',
    'Redux',
    'Webpack',
    'Docker',
    'GraphQL',
    'MongoDB',
    'Express',
    'React',
    'JavaScript',
    'CSS',
    'HTML',
    'Node.js',
    'TypeScript',
    'Redux',
    'Webpack',
    'Docker',
    'GraphQL',
    'MongoDB',
    'Express',
  ];

  return (
    <div style={{ width: '50%' }}>
      <TagList tags={tags} />
    </div>
  );
};

export default Demo;
