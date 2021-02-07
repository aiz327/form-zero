import React, { useContext } from "react";
import { SchemaType } from "./constants/schema-constant";
import { ILayoutProps } from "./interface/props-type";
import './layout.css';

export const Layout: React.FC<ILayoutProps> = ({
  schema,
  children
}) => {
  /**
   * 自定义容器？
   */
  const schemaType = schema.getSchemaType();
  let Wrapper: React.FC = React.Fragment;
  if (schemaType === SchemaType.TYPE_ARRAY) {
    Wrapper = DefaultListLayout;
  } else if (schemaType === SchemaType.TYPE_BLOCK) {
    Wrapper = DefaultBlockLayout;
  }

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

const DefaultListLayout: React.FC = ({
  children
}) => {

  return (
    <div className="list-view">
      {children}
    </div>
  )
}


const DefaultBlockLayout: React.FC = ({
  children
}) => {

  return (
    <div className="block-view-wrapper">
      <div className="block-view">
        {children}
      </div>
    </div>
  )
}


// DefaultLayout.displayName = ""