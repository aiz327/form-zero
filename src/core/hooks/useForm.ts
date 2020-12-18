import { useMemo, useEffect, useRef, useContext } from 'react'
import { IFormProps } from '../interface/core-type'
import { FormSubscription } from '../manager';

/**
 * 定义状态
 * form的状态订阅
 * 
 * @param props 
 */

export const useForm = (
  props: IFormProps
) => {

  const formSubscription = new FormSubscription();

  const formApi = {

  }

  return formApi;

}

export default useForm
