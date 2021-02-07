import { ISchemaElement } from "./interface/core-type";
import { isString, isArray } from "./util";
/**
 * Schema基元素
 */
export class Schema implements ISchemaElement {

  key?: string;
  type?: string;

  children?: Array<Schema>;

  rules = [];
  props?: {
    [name: string]: any
  };
  ui = {};

  /**
   *
   */
  constructor(jsonSchema: ISchemaElement) {
    this.convertJSON(jsonSchema);
  }

  getSchemaType() {
    return this.type;
  }

  

  getSchemaProps() {
    return {
      ...this.props
    };
  }

  getSchemeChild() {
    return this.children;
  }

  getSchemeUI() {
    return this.ui;
  }


  hasChildSchema() {
    return isArray(this.children);
  }

  convertJSON(jsonSchema: ISchemaElement) {
    Object.assign(this, jsonSchema);
    if (isArray(jsonSchema.children)) {
      this.children = jsonSchema.children && jsonSchema.children.map(schema => {
        return new Schema(schema);
      });
    }
  }
}
