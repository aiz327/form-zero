import React from "react";
import { IFieldProps, IFieldRenderProps } from "./interface/core-type";

import { Schema } from "./schema";

/**
 * Field 表单字段
 */
export const Field: React.FC<IFieldRenderProps> = ({
  widget,
  schema,
  lifecycleCenter,
}) => {

  const renderComponent = () => {
    const componentName = schema.getSchemaType() || ""
    const schemaProps = schema.getSchemaProps()
    let componentProps = {
      ...schemaProps,
      onChange: (event: any, ...args: any[]) => {
        lifecycleCenter.change();
        if (schemaProps["onChange"]) {
          schemaProps["onChange"](event, ...args);
        }
      }
    };
    let FieldComponet = widget && widget[componentName]

    return (
      <FieldComponet {...componentProps}>
        {schema.getSchemeChild()}
      </FieldComponet>
    )
  };

  return renderComponent();
};

