import * as React from 'react';
import { isNumeric } from '../util';

interface ButtonType {
  className?: string;
}

console.log(isNumeric);

const Button: React.FC<ButtonType> = ({ className }: ButtonType) => (
  <button className={`ant-btn ant-btn-primary ${className ?? ''}`}>点我</button>
);

Button.defaultProps = {
  className: '',
};

export default Button;
