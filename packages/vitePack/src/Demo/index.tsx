import React, { FC } from 'react';

const Demo: FC<{
  /**
   * @description 属性描述
   * @default "默认值"
   */
  title?: string;
}> = ({ title }) => {
  return <h3>{title}</h3>;
};

export default Demo;
