import React, { SelectHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<SelectProps> = ({ children, icon: Icon, ...rest }) => {

  return (
    <Container>
      {Icon && <Icon size={20}/>}
      <select { ...rest }>
        { children }
      </select>
    </Container>
  );
};

export default Select;
