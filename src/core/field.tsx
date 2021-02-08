import React from "react";
import { IFieldProps, IFieldRenderProps } from "./interface/core-type";

import useField from "./hooks/useField";
import useForceUpdate from "./hooks/useForceUpdate";
import { FieldContext } from "./context";
import { isFunc } from "./util";

import { Form } from "antd";


const processValidProps = (state : any) => {
  console.log('processValidProps',state)
  // 这里先实现功能 校验状态还需要细化
  return {
    validateStatus: state.errors ? 'error' : 'success',
    help: state.errors ? state.errors[0].message : '',
  }
}

/**
 * Field 表单字段
 */
export const Field: React.FC<any> = (props) => {
  const { children, schema } = props;
  
  const { mutator, field } = useField(props);
  const forceUpdate = useForceUpdate();
  const { state, subscription } = field

  subscription.subscribe("FieldRender", (payload: any) => {
    forceUpdate();
  })

  let validProps = processValidProps(state);
  console.log("change field", validProps, field)
  return (
    <FieldContext.Provider value={field}>
      <FieldUI schema={schema} {...validProps}>
        {isFunc(children) ? children({ mutator, field }) : children}
      </FieldUI>
    </FieldContext.Provider>
  )
};


/**
 * FieldUI 留作后续自定义布局使用
 */
export const FieldUI: React.FC<IFieldRenderProps> = ({
  children,
  schema,
  ...props
}) => {

  const uiLayoutProps = schema.getSchemeUI();
    
  return (
    <Form.Item {...uiLayoutProps} {...props}>
      {children}
    </Form.Item>
  );
}


