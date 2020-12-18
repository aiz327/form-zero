import React, { useContext } from 'react';
import { IFormProps, ISchemaElement } from './interface/core-type';
import { FieldRender } from './field-render';
import { Schema } from './schema';
import { FormSubscription } from './manager';
import { useForm } from './hooks/useForm';
import { FormContext, FormComponentsContext } from './context';

/**
 * Form
 */
// export class Form extends React.Component<IFormProps> {

//   formSubscription: FormSubscription;
//   schemaOrigin?: any;

//   lifecycleCenter: {} = {};
 
//   /**
//    *
//    */
//   constructor(props: IFormProps) {
//     super(props)
//     console.log(123)
//     const { schema, onFieldChange } = props;
    
//     if (schema) {
//       this.schemaOrigin = new Schema(schema);
//     }

//     this.formSubscription = new FormSubscription();
//     this.formSubscription.subscribe("onFieldChange", onFieldChange);
//     this.lifecycleCenter = {
//       change: () => {
//         this.formSubscription.notify();
//       }
//     }

//     this.registComponent();
//   }

//   init() {
//   }

//   registComponent() {
//   }

//   render() {
//     return (
//       <FieldRender lifecycleCenter={this.lifecycleCenter}  schema={this.schemaOrigin}></FieldRender>
//     )
//   }
// }

/***
 * validate 21
 * changed
 * 
 */
export const Form : any = (props: any) => {
  const {schema} = props
  let form = useForm(props)
  const componentMapping = useContext(FormComponentsContext)
  const schemaF = new Schema(schema)
  
  const {formComponent: FormComponent} = componentMapping;

  return (
    <FormContext.Provider value={form}>
      <FormComponent>
        <FieldRender {...props} schema={schemaF}></FieldRender>
      </FormComponent>
    </FormContext.Provider>
  );
}
