import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Button } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<IconBaseProps>;
}

const ButtonDefault: React.FC<ButtonProps> = ({ children, icon: Icon, ...rest }) => (
  <Button>
    <button type="button" {...rest}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  </Button>
);

export default ButtonDefault;
