import React, { FC } from 'react';

const Demo: FC<{
  /**
   * @description 属性描述
   * @default "默认值"
   */
  title?: string;
}> = ({ title }) => {
  return <h4>Demo:{title}</h4>;
};

export default Demo;
