import { useMemo, useEffect, useRef, useContext } from 'react'
import { isFunc } from './util';


export const createField = (props: any) => {
  const {schema} = props;

  let field: any = {};

  field.state = {
    active: false,
    value: false,
    blur: false,
  };

  field.schema = schema;
  

  field.setState = (state: any) => {
    if (isFunc(state)) {
      state(field.state);
      console.log("trigger focus,", field)
    }
  }

  return field
}