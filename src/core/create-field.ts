import { useMemo, useEffect, useRef, useContext } from 'react'
import { Subscription } from './manager';
import { isFunc } from './util';


export const createField = (props: any) => {
  const {schema} = props;

  const fieldSubscription = new Subscription();

  let field: any = {};

  field.state = {
    active: false,
    value: false,
    blur: false,
    validate: false,
  };

  field.schema = schema;

  field.subscription = fieldSubscription;

  field.setState = (state: any) => {
    if (isFunc(state)) {
      state(field.state);
      console.log("trigger focus,", field)
      // TODO 触发的时点要完善进去
      fieldSubscription.notify();
    }
  }

  return field
}