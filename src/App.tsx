import React ,{useState}from 'react';
import { Button } from 'antd';
import { Form } from './antd/form';
import AuthCode from './antd-components/auth-code/auth-code';
import AutoComplete from './antd-components/auto-complete/auto-complete';
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
  const[val,setVal]=useState('')
  const[data,setData]=useState([{value:"dsfsd"},{value:"是的发个"}])
  const onFCFieldChange = (e: any, value: any) => {
    console.log("onfieldchange", e, value)
  }
  const onFCFocus = (e: any, value: any) => {
    console.log("onFCFocus", e, value)
  }
  const onChangeCode=(e:any)=>{
    console.log( e.target.value )
  }
  const getAutoCompleteReq=(params:any)=>{
    console.log("返回参数",params)
    return new Promise((resolve, reject) => {
      resolve([{value:"阿斯顿发送到"},{value:"是的发个"}]);
    })
  }
  const getCheckCode=()=>{
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
  
  return (
    <div className="App">
      <header className="App-header">
      <AutoComplete 
      //  options={[{value:"11"},{value:"22"}]}
       highlightStatus={true}
       currentShow={false}
       delayTime={600}
       extendParams={{type:1}}
       requestFunc={(params:object)=>getAutoCompleteReq(params)}
       onSelect={(value:any) => {
        console.log('选中的',value)
       }}
      />
      <AuthCode icon={<img src={logo} className="App-logo" alt="logo" />} countDown={20} onInput={onChangeCode}   getAuthCodeReq={getCheckCode} />
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
