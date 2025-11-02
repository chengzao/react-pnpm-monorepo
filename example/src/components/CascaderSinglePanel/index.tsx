import { useState } from 'react';
import { CascaderSearchSingle } from '@learnbase/rslib';

import { originData } from './origin';

const Demo = () => {
  const [value, setValue] = useState<string[]>([]);

  const onSelect = (value: string[], option: any) => {
    console.log('onSelect: ', value, option);
    setValue(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Cascader Panel: Single with Search</h3>
      <p>values: {value.join(' > ')}</p>
      <CascaderSearchSingle options={originData} value={value} onSelect={onSelect} />
    </div>
  );
};

export default Demo;
