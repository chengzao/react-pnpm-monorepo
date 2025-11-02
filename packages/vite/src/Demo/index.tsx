import { FC } from 'react';
import './demo.css';

const Demo: FC<{
  /**
   * @description 属性描述
   * @default "默认值"
   */
  title?: string;
}> = ({ title }) => {
  return <h3 className="title">{title}</h3>;
};

export default Demo;
