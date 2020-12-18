import React from 'react';
import { Button } from 'antd';
import { Form } from './antd/form';
import logo from './logo.svg';
import './App.css';

const schema = {
  "key": "mainform",
  "type": "array",
  "children": [
    {
      "key": "name",
      "type": "array",   
      children: [
        {
          "key": "email1",
          "type": "input",
          "props": {
            "placeholder": "这是子元素的第一个input"
          },
        },
        {
          "key": "email2",
          "type": "input",
          "props": {
            "placeholder": "这是子元素的第二个input"
          },
        },
      ]
    },
    {
      "key": "email",
      "type": "input",
      "props": {
        "placeholder": "这是父元素的第一个input"
      },
    },
    {
      "key": "phone",
      "type": "input",
      "props": {
        "placeholder": "这是父元素的第二个input"
      },
    },
    {
      "key": "submit",
      "type": "button",
      "props": {
        "type": "primary"
      },
      "ui": {
        
      },
      "children": "提交"
    },
  ]
}

function App() {
  const onFCFieldChange = (e: any, value: any) => {
    console.log("onfieldchange", e, value)
  }
  const onFCFocus = (e: any, value: any) => {
    console.log("onFCFocus", e, value)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Form schema={schema} onFieldChange={onFCFieldChange} onFocus={onFCFocus}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
