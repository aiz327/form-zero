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
    const componentName = schema.getSchemaType() || ""
    const schemaProps = schema.getSchemaProps()
    let componentProps = {
      ...schemaProps,
      onChange: (event: any, ...args: any[]) => {
        if (schemaProps["onChange"]) {
          schemaProps["onChange"](event, ...args);
        }
      }
    };
    let FieldComponet = fields && fields[componentName]

    return (
      <FieldUI schema={schema}>
        <FieldComponet {...componentProps}>{schema.getSchemeChild()}</FieldComponet>
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

