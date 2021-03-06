import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';

import { Header } from './styles';

const UpBar: React.FC = () => {
  const { signOut } = useAuth();

  const HandleExitButton = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Header>
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="bar">
        <ul>
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
          <li onClick={HandleExitButton}>Sair</li>
        </ul>
      </div>
    </Header>
  );
};

export default UpBar;
