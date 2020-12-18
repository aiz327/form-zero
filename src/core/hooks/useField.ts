import { useMemo, useEffect, useRef, useContext } from 'react'
import { IFormProps } from '../interface/core-type'
import { Subscription } from '../manager';
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
  const fieldSubscription = new Subscription();

  const field = createField(props);

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
