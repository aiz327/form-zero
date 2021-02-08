import React from 'react';
import { IFormProps, ISchemaElement } from './interface/core-type';
import { Form } from './form';
import { Schema } from './schema';
import { Subscription } from './manager';
import { useForm } from './hooks/useForm';
import { FormComponentsContext, FormSchemaContext } from './context';
import { getRegistry } from './register';
import { FieldRender } from './field-render';
import useSchemaForm from './hooks/useSchemaForm';

/**
 * Form
 */
export const SchemaFromRender : any = (props: any) => {
  const {schema} = props
  const {fields, formComponent: FormComponent} = getRegistry()
  const {form} = useSchemaForm(props);

  const schemaF = new Schema(schema)
  const formComponentProps = {}
  return (
    <FormComponentsContext.Provider value={{fields, formComponent: FormComponent}}>
      <FormSchemaContext.Provider value={schemaF}>
        <Form {...props} form={form} >
          <FormComponent>
            <FieldRender {...props} schema={schemaF}></FieldRender>
          </FormComponent>
        </Form>
      </FormSchemaContext.Provider>
    </FormComponentsContext.Provider>
  )
}
