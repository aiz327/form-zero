import { useMemo, useEffect, useRef, useContext } from 'react'
import { IFormProps } from '../interface/core-type'
import { Subscription } from '../manager';
import { useFieldState } from './useFieldState';
import { useForm } from './useForm';
/**
 * 定义状态
 * form的状态订阅
 * 
 * @param props 
 */

export const useSchemaForm = (
  props: IFormProps
) => {

  const form = useForm(props);

  return {
    form: form
  }

}

export default useSchemaForm
