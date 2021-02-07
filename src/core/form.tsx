import React, { useContext } from 'react';
import { IFormProps, ISchemaElement } from './interface/core-type';
import { Schema } from './schema';
import { Subscription } from './manager';
import { useForm } from './hooks/useForm';
import { FormContext, FormComponentsContext } from './context';

/***
 * validate 21
 * changed
 */
export const Form : any = (props: any) => {
  const {children} = props
  let form = useForm(props)
  form.registerFormSubscribe();
  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  );
}
