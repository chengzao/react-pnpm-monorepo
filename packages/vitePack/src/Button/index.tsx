import React from 'react';
import { Button } from 'antd';
import './button.css';

interface IButtonProps {
  onClick: () => void;
  /**
   * @description 属性描述
   * @default "默认值"
   */
  color: string;
}

const MButton: React.FC<IButtonProps> = (props) => {
  const { onClick, color } = props;

  return (
    <div onClick={onClick} style={{ color }}>
      <span className="name">vitePack</span>
      <Button type="primary">Button</Button>
    </div>
  );
};

export default MButton;
