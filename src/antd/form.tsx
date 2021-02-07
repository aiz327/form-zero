import React from 'react';
import { IFormProps, ISchemaElement } from '../core/interface/core-type';
import { Input, Button, Form as AntdForm, DatePicker } from 'antd';
import { SchemaFromRender } from '../core/SchemaFormRender';
import { registFormFields } from '../core/register';

/**
 * Form
 */
export class Form extends React.Component<IFormProps> {

  schemaOrigin?: any;

  lifecycleCenter: {} = {};

  /**
   *
   */
  constructor(props: IFormProps) {
    super(props)
    this.registComponent();
  }

  init() {
  }

  registComponent() {
    registFormFields({
      "date": DatePicker,
      "input": Input,
      "button": Button,
      
    })
  }

  render() {
    const { schema, onFieldChange } = this.props;
    return (
      <SchemaFromRender {...this.props}></SchemaFromRender>
    )
  }
}

