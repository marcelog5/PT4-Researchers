import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface FormContextData {
  formData: FormState;
  addForm(link: string): Promise<boolean>;
  removeForm(): void;
}

interface Question {
  id: string;
  question: string;
  inverted: boolean;
  trait: string;
  factor: string;
  questionNumber: number;
}

interface Inventory {
  id: string;
  author: string;
  numberOfQuestions: number;
  inventoryName: string;
  questions: Question[];
}

interface FormState {
  id: string;
  name: string;
  term: string;
  link: string;
  inventory: Inventory;
}

const FormContext = createContext<FormContextData>({} as FormContextData);

const FormProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<FormState>(() => {
    const form = localStorage.getItem('@PT4:form');

    if (form) {
      return JSON.parse(form);
    }

    return {} as FormState;
  });

  const addForm = useCallback(async (link) => {
    const response = await api.get('forms/' + link).then((response) => {
      if (response.data.message === 'Form not found.') {
        return false;
      } else {
        localStorage.setItem('@PT4:form', JSON.stringify(response.data));

        setData(response.data);

        return true;
      }
    });
    if (response) return true;
    else return false;
  }, []);

  const removeForm = useCallback(() => {
    localStorage.removeItem('@PT4:form');

    setData({} as FormState);
  }, []);

  return (
    <FormContext.Provider value={{ formData: data, addForm, removeForm }}>
      {children}
    </FormContext.Provider>
  );
};

function useForm(): FormContextData {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }

  return context;
}

export { FormProvider, useForm };
