import {  useCallback, useState  } from 'react';
import { CustomSelect } from '@learnbase/rslib';
import { Select } from 'antd';

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

  return (
    <div>
      <CustomSelect value={value} onChange={handleChange} placeholder="Select Status" options={options} />

      <Select mode="multiple" placeholder="select" options={options} maxCount={1}></Select>

      {/* <Tooltip title="without warning">
        <div>without warning</div>
      </Tooltip>

      <Tooltip title="with warning">
        <CustomTrigger />
      </Tooltip>

      <Tooltip title="without warning">
        <div>
          <CustomTrigger />
        </div>
      </Tooltip>

      <Tooltip title="without warning">
        <CustomTriggerWithRef />
      </Tooltip> */}
    </div>
  );
};

// const CustomTrigger = (props: any) => <div {...props}>with warning</div>;

// // eslint-disable-next-line @typescript-eslint/ban-types
// const CustomTriggerWithRef = React.forwardRef<HTMLDivElement, {}>((props, ref) => (
//   <div {...props} ref={ref}>
//     with warning
//   </div>
// ));

export default CustomSelectExample;
