import { useMemo, useEffect, useRef, useContext } from 'react'
import { IFormProps } from '../interface/core-type'
import { Subscription } from '../manager';
import { useFieldState } from './useFieldState';
import { isFunc } from '../util';

/**
 * 定义状态
 * form的状态订阅
 * 
 * @param props 
 */

export const useForm = (
  props: IFormProps
) => {

  if (props.form) return props.form;

  const formSubscription = new Subscription();

  const formApi = {
    registField: (field : any) => {
      formSubscription.notify("onFieldInit", field)
    },
    registerFormSubscribe: () => {
      formSubscription.subscribe("onFocus", (payload: any) => {
        if (isFunc(props.onFocus)) {
          props.onFocus(payload);
        }
      })
    },
    registMutator: (field: any) => {
      return {
        focus: (event : any, ...args : any[]) => {
          formSubscription.notify("onFocus", {field, event, ...args});
          field.setState((state: any) => {
            state.active = true;
          })
        },
        change: () => {
          formSubscription.notify("all", field);
          field.setState((state: any) => {
            state.value = true;
          })
        }
      }
    }
  }

  return formApi;

}

export default useForm
