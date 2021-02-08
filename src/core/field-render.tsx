import React, { useContext } from "react";
import { IFieldRenderProps } from "./interface/core-type";
import { Schema } from "./schema";
import { Field } from "./field";
import { Layout } from "./layout";
import { FormComponentsContext } from "./context";


/**
 * 与布局组件结构还有点问题
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
      const {mutator,validateAllMutator} = props;
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
        onBlur: (event: any, ...args: any[]) => {mutator.blur(event, ...args)},
        onChange: (event: any, ...args: any[]) => {
          mutator.change(event, ...args);
          // TODO 预留 校验 位置
          mutator.validate();
          if (schemaProps["onChange"]) {
            schemaProps["onChange"](event, ...args);
          }
        },
      };
      let FieldComponet = fields && fields[componentName]

      return <FieldComponet {...componentProps}>{schema.getSchemeChild()}</FieldComponet>
         
    }
    return (
      <Field schema={schema}>
        {connectField}
      </Field>
    )
  }

  return (
    <Layout schema={schema} >
      {childField}
    </Layout>
  );
};
