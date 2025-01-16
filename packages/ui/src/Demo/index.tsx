import React, { FC } from 'react';

import './style.less';

const Demo: FC<{
  /**
   * @description 属性描述
   * @default "默认值"
   */
  title?: string;
}> = ({ title }) => {
  return <h4 className="title">Demo:{title}</h4>;
};

export default Demo;
