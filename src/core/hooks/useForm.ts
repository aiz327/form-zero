import { useMemo, useEffect, useRef, useContext } from 'react'
import { IFormProps } from '../interface/core-type'
import { Subscription } from '../manager';
import { Validator } from '../validator';
import { useFieldState } from './useFieldState';
import { isFunc } from '../util';

import AsyncValidator from 'async-validator';
import { getValueFromEvent, isHas } from '../../utils/utils';
import { debug } from 'webpack';

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
  const formValidator = new Validator();

  const formApi = {
    registField: (field: any) => {
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
        focus: (event: any, ...args: any[]) => {
          formSubscription.notify("onFocus", { field, event, ...args });
          field.setState((state: any) => {
            state.active = true;
          })
        },
        blur: (event: any, ...args: any[]) => {
          const { rules = [] } = field.schema;
          //单独写为了判断是否需要失去焦点触发验证
          if (isHas(rules, 'blur')) return;
          validatorFuc(field)
        },
        change: (event: any, ...args: any[]) => {
          formSubscription.notify("all", field);
          field.setState((state: any) => {
            state.value = getValueFromEvent(event);
          })
        },
        validate: () => { validatorFuc(field) }
      }
    },
  }
  const validatorFuc = (field: any) => {
    const { rules = [], key } = field.schema;
    const { value, errors } = field.state;
    let validSource: any = {};
    validSource[key] = value;
    let descriptor: any = {};
    descriptor[key] = rules;
    const validator = new AsyncValidator(descriptor)
    validator.validate(validSource, undefined, (errors: any, fields: any) => {
      field.setState((state: any) => { state.errors = errors; })
    })
  }

  return formApi;

}

export default useForm
