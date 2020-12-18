import React, { useContext } from "react";
import { IFieldRenderProps } from "./interface/core-type";
import { Schema } from "./schema";
import { Field } from "./field";
import { FormComponentsContext } from "./context";
import { Form } from "antd";

/**
 * Field使用
 */
export const FieldRender: React.FC<IFieldRenderProps> = (props) => {
  let childField : React.ReactNode = [];
  
  const {schema} = props
  const componentMapping = useContext(FormComponentsContext)
  
  const {formComponent: FormComponent, fields} = componentMapping;


  const renderField = (schema : Schema, cprops: any) => {
    return <FieldRender {...cprops} schema={schema} ></FieldRender>
  }

  if (schema.hasChildSchema()) {
    childField = schema.children ? schema.children.map(cSchema => {
      return renderField(cSchema, props);
    }) : []
  } else {
    const connectField = (props : any) => {
      const {mutator} = props;
      const componentName = schema.getSchemaType() || ""
      const schemaProps = schema.getSchemaProps()
      let componentProps = {
        ...schemaProps,
        onFocus: (event: any, ...args: any[]) => {
          mutator.focus(event, ...args);
          if (schemaProps["onFocus"]) {
            schemaProps["onFocus"](event, ...args);
          }
        },
        onChange: (event: any, ...args: any[]) => {
          mutator.change(event, ...args);
          if (schemaProps["onChange"]) {
            schemaProps["onChange"](event, ...args);
          }
        }
      };
      let FieldComponet = fields && fields[componentName]

      return <FieldComponet {...componentProps}>{schema.getSchemeChild()}</FieldComponet>
         
    }
    return (
      <FieldUI schema={schema}>
        <Field schema={schema}>
          {connectField}
        </Field>
      </FieldUI>
    )
  }

  return (
    <React.Fragment>
      {childField}
    </React.Fragment>
  );
};


/**
 * FieldUI 留作后续自定义布局使用
 */
export const FieldUI: React.FC<IFieldRenderProps> = ({
  children,
  schema,
}) => {

  const uiLayoutProps = schema.getSchemeUI();
    
  return (
    <Form.Item {...uiLayoutProps}>
      {children}
    </Form.Item>
  );
}

