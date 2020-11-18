import React, {ButtonHTMLAttributes} from 'react';

import { Button } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const ButtonDefault: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Button>
    <button type="button" {...rest}>
      {children}
    </button>
  </Button>
);

export default ButtonDefault;
