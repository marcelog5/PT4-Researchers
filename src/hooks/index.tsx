import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { FormProvider } from './Form';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <FormProvider>
        {children}
      </FormProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
