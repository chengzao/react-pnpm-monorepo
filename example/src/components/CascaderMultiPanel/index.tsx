import React, { useState } from 'react';
import { CascaderMultiPanel } from '@learnbase/rslib';

import { originData } from './origin';

function Demo() {
  const [value, setValue] = useState<string[]>(['a-a-a']);
  const [value1, setValue1] = useState<string[]>(['a-a-b']);

  const onChange = (value: string[]) => {
    console.log('onChange: ', value);
    setValue(value);
  };

  const onChange1 = (value: string[]) => {
    console.log('onChange: ', value);
    setValue1(value);
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2>多选模式 (默认) : hover</h2>
        <CascaderMultiPanel options={originData} value={value} onChange={onChange} expandTrigger="hover" />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>多选模式 (默认) : click</h2>
        <CascaderMultiPanel options={originData} value={value1} onChange={onChange1} expandTrigger="click" />
      </div>
    </div>
  );
}

export default Demo;
