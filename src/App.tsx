import React, { useState } from 'react';
import { Button } from 'antd';
import { Form } from './antd/form';
import AuthCode from './antd-components/auth-code/auth-code';
import AutoComplete from './antd-components/auto-complete/auto-complete';
import MultiCascade from './antd-components/multi-cascade/multi-cascade';
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
          "ui": {
            "label": "邮箱",
          },
          "props": {
            "placeholder": "这是子元素的第一个input",
          },
          "rules": [
            {"required": true, "message": "必填项"},
            {"type": "email", "message": "必须是邮箱"}
          ]
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
      "key": "name",
      "type": "block",
      children: [
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
      ]
    },
    {
      "key": "name",
      "type": "block",
      children: [
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
      ]
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
  const [val, setVal] = useState('')
  const [data, setData] = useState([{ value: "dsfsd" }, { value: "是的发个" }])
  const [dataCascade, setDataCascade] = useState([])
  const onFCFieldChange = (e: any, value: any) => {
    console.log("onfieldchange", e, value)
  }
  const onFCFocus = (e: any, value: any) => {
    console.log("onFCFocus", e, value)
  }
  const onChangeCode = (e: any) => {
    console.log(e.target.value)
  }
  const getAutoCompleteReq = (params: any) => {
    console.log("返回参数", params)
    return new Promise((resolve, reject) => {
      resolve([{ value: "阿斯顿发送到" }, { value: "是的发个" }]);
    })
  }
  const getCheckCode = () => {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
console.log('dataCascade',dataCascade)
  return (
    <div className="App">
      <header className="App-header">
        <AutoComplete
          //  options={[{value:"11"},{value:"22"}]}
          highlightStatus={true}
          currentInputOptions={false}
          delayTime={600}
          extendReqParams={{ type: 1 }}
          requestFunc={(params: object) => getAutoCompleteReq(params)}
          onSelect={(value: any) => {
            console.log('选中的', value)
          }}
        />
        <AuthCode icon={<img src={logo} className="App-logo" alt="logo" />} countDownNumber={20} onInput={onChangeCode} getAuthCodeReq={getCheckCode} />
        <MultiCascade
          fieldNames={{
            label: "name",
            value: "id",
            children: "list"
          }}
          hierarchyName={['row1','row2','row3']}
          onChange={(val:any)=>{setDataCascade(val)}}
          value={dataCascade}
          showSearch={true}
          notFoundContent="没有选项"
          options={[{id:1,name:"江苏",list:[{id:55,name:"苏州",list:[{id:66,name:"吴中"}]}]},{id:11,name:"浙江",list:[{id:155,name:"杭州",list:[{id:166,name:"西湖"}]}]}]}
          placeholder="请选择"
        />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Form schema={schema} onFieldChange={onFCFieldChange} onFocus={onFCFocus} />
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
