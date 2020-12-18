import React from 'react';
import { IFormProps, ISchemaElement } from './interface/core-type';
import { Form } from './form';
import { Schema } from './schema';
import { FormSubscription } from './manager';
import { useForm } from './hooks/useForm';
import { FormComponentsContext } from './context';
import { getRegistry } from './register';

/**
 * Form
 */
export const SchemaFromRender : any = (props: any) => {
  const formComponentProps = {};
  const {fields, formComponent: FormComponent} = getRegistry();
  
  return (
    <FormComponentsContext.Provider value={{fields, formComponent: FormComponent}}>
      <Form {...props}></Form>
    </FormComponentsContext.Provider>
  )
}
