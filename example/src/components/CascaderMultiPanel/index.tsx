import React, { useState } from 'react';
import { CascaderMultiPanel } from '@learnbase/rslib';

import { originData } from './origin';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  const onChange = (value: string[], options: any) => {
    console.log('onChange: ', value, options);
    setValue(value);
  };

  return <CascaderMultiPanel options={originData} value={value} onChange={onChange} />;
}

export default Demo;
