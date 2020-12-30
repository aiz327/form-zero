import { createContext } from 'react'
import { IComponentsRegistry } from './interface/core-type'

export const FormComponentsContext = createContext<any>(null);

export const FormContext = createContext<any>(null);

export const FormSchemaContext = createContext<any>(null);

export const FieldContext = createContext<any>(null);