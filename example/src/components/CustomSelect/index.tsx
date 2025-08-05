/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { CustomSelect } from '@learnbase/rslib';

const CustomSelectExample = () => {
  const [value, setValue] = useState<any[]>([]);

  const options = [
    {
      key: 'option1',
      label: 'Option 1',
      value: 'option1',
    },
    {
      key: 'option2',
      label: 'Option 2',
      value: 'option2',
    },
    {
      key: 'option3',
      label: 'Option 3',
      value: 'option3',
    },
    {
      key: 'option4',
      label: 'Option 4',
      value: 'option4',
    },
  ];

  const handleChange = useCallback((newValue: any[]) => {
    setValue(newValue);
    console.log('Selected values:', newValue);
  }, []);

  return <CustomSelect value={value} onChange={handleChange} placeholder="Select Status" options={options} />;
};

export default CustomSelectExample;
