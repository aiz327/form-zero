import React from "react";
import { IFieldProps, IFieldRenderProps } from "./interface/core-type";

import useField from "./hooks/useField";
import { FieldContext } from "./context";
import { isFunc } from "./util";

/**
 * Field 表单字段
 */
export const Field: React.FC<any> = (props) => {
  const { children } = props;
  
  const { mutator, field } = useField(props);

  return (
    <FieldContext.Provider value={field}>
      {isFunc(children) ? children({ mutator, field }) : children}
    </FieldContext.Provider>
  )
};

