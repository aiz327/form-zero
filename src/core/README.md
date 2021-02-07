```javascript
{
  "key": "name",                        // 基础描述
  "type": "array",
  "layout": ""
  "props": {
    
  },
  "ui": {
    "label": ""
  },
  "rules": [],
  "children": [] | string
}
```
form schema
type---array   表单 布局列表
type---block  表单 布局块
layout---default、flex

TODO
- [ ] 布局方案采用antd的三种布局方案 + 纯自定义方案
- [ ] 校验 触发时点、field、form的状态完善
- [ ] label需要自定义，扩充antd的方案
- [ ] 做个示例



layout vertical horizon inline

form的状态
init --- 
submit --- 提交
valid --- 
error 

form的api
subscribe


field的状态

文件功能（暂定随时调整）
field.tsx---表单字段抽象
create-field.ts---表单字段核心定义
form.tsx---表单抽象
field-render.tsx---表单字段与组件的耦合处
SchemaFormRender.tsx---表单渲染整体抽象
schema.ts---schema定义文件