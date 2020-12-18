import { useMemo, useEffect, useRef, useContext } from 'react'
import { isFunc } from './util';


export const createForm = (props: any) => {
  const {schema} = props;

  let form: any = {};

  form.state = {
    active: false,
    value: false,
    blur: false,
  };

  form.schema = schema;
  

  form.setState = (state: any) => {
    if (isFunc(state)) {
      state(form.state);
      console.log("trigger focus,", form)
    }
  }

  return form
}