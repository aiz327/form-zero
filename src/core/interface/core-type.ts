import { Schema } from "../schema";

/**
 * 
 */
export interface ISchemaElement{

  key?: string;
  /**
   * 元素类型
   */
  type?: string;

  children?: Array<ISchemaElement> | string;

  [name: string]: any;
}

/**
 * form props
 */
export interface IFormProps {

  schema: ISchemaElement;
  onFieldChange?: any;
}

/**
 * field props
 */
export interface IFieldProps {

  schema?: ISchemaElement;

  
}

/**
 * field render props
 */
export interface IFieldRenderProps {

  schema: Schema;

  widget?: any;

  [name: string]: any;

}

export interface IComponentsRegistry {
  fields: {
    [key: string]: any
  }
  [key: string]: any
}