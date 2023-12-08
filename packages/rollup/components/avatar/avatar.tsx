import * as React from 'react';

interface AvatarType {
  className?: string;
}

const Avatar: React.FC<AvatarType> = ({ className }: AvatarType) => <span className={`ant-avatar ${className ?? ''}`}>头像</span>;

Avatar.defaultProps = {
  className: '',
};

export default Avatar;
