

import { SwitchButton } from '@learnbase/rslib';

interface Option {
  value: string;
  label: string;
}

const Demo = () => {
  const options: [Option, Option] = [
    { value: 'jobSeeker', label: '求职者求职者求职者求职者' },
    { value: 'recruiter', label: '招聘者招聘者招聘者' },
  ];

  return (
    <div style={{ width: '500px', height: '300px' }}>
      <SwitchButton options={options} defaultValue="jobSeeker" onChange={(value) => console.log('选中:', value)} />
    </div>
  );
};

export default Demo;
