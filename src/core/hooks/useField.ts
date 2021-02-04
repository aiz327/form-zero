import { useMemo, useEffect, useRef, useContext } from 'react'
import { IFormProps } from '../interface/core-type'

import { FormContext } from '../context';
import { createField } from '../create-field';

/**
 * 定义状态
 * form的状态订阅
 * 
 * @param props 
 */

export const useField = (
  props: IFormProps
) => {
  const form = useContext(FormContext);
  const fieldRef = useRef<any>({});
  
  let field = null
  if (!fieldRef.current.field) {
    field = createField(props);
  } else {
    field = fieldRef.current.field
  }

  let currentField = form.registField(field);
  const mutator = form.registMutator(field);

  // fieldRef.fieldState = fieldState;

  const fieldApi = {
    focus: () => {

    }
  }
  fieldRef.current.field = field;

  return {
    mutator: mutator,
    field: fieldRef.current.field
  };
}

export default useField
