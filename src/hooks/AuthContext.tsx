import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  userData: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  userData: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@PT4:token');
    const userData = localStorage.getItem('@PT4:user');

    if (token && userData) {
      return { token, userData: JSON.parse(userData) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, userData } = response.data;

    localStorage.setItem('@PT4:token', token);
    localStorage.setItem('@PT4:user', JSON.stringify(userData));

    setData({ token, userData })
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@PT4:token');
    localStorage.removeItem('@PT4:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ userData: data.userData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Use auth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

