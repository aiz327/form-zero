import { useMemo, useEffect, useRef, useContext } from 'react'
import { IFormProps } from '../interface/core-type'
import { Subscription } from '../manager';
import { FormContext } from '../context';

/**
 * 定义状态
 * form的状态订阅
 * 
 * @param props 
 */

export const useFieldState = (
  props: any
) => {

  const fieldState = {
    active: false,
    value: false,
    blur: false,
  }



  return {

  };
}
