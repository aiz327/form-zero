import React from 'react';
import { useState, useRef, useEffect } from 'react'
import { Select, Cascader } from 'antd';
import './multi-cascade.css';


type stringArray = string[];
type objArray = object[];
type numberArray = number[];
type val = {
  value: string,
  label: string,
  key: string,
}
/**
   * @description 级联多选
   * @param {number} hierarchyName 静态数据的每个层级的name
   * @param {Array} value 回显数据
   */
const MultiCascade: React.FC<any> = (props) => {
  const cascaderRef: any = useRef();
  const { hierarchyName = ["province", "city", "region"], expandTrigger = "hover", value, onChange, ...rest } = props;
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [cascadeOnMouse, setCascadeOnMouse] = useState<boolean>(false);
  const [selectOnFocus, setSelectOnFocus] = useState<boolean>(false);
  const [convertValue, setConvertValue] = useState([] as any[]);
  useEffect(() => { setConvertValue(convertValues(value)) }, [value])
  const onCascadeMouseEnter = () => setCascadeOnMouse(true);
  const onCascadeMouseLeave = () => {
    setCascadeOnMouse(false)
    setPopupVisible(selectOnFocus)
  };
  const onSelectFocus = () => {
    setPopupVisible(true);
    setSelectOnFocus(true)
  }
  const onSelectBlur = () => {
    setPopupVisible(cascadeOnMouse);
    setSelectOnFocus(false)
  }
  const onSelectSearch = (value: string) => { if (props.showSearch) cascaderRef.current.setState({ inputValue: value }) };
  const same = (res: any, currentValue: any) => {
    for (const item of currentValue) {
      const same: boolean[] = [];
      hierarchyName.map((key: string) => {
        const curKeyValue = item[key] ? parseInt(item[key]) : undefined;
        console.log("values", res, res[key], curKeyValue);
        same.push(res[key] === curKeyValue);
      });
      console.log("same", same);
      if (!same.includes(false)) return true;
    }
    return false;
  };
  //选中
  const onCascadeChange = (value: numberArray, selectedOptions: any) => {
    const res: any = {};
    const { fieldNames = {}, onChange, sel, limit, selSize = 1 } = props;
    const currentValue = props.value || [];
    if (limit && currentValue.length >= limit) return;
    selectedOptions.map((item: any, index: number) => {
      res[hierarchyName[index]] = item[fieldNames["value"] || "value"];
      res[`${hierarchyName[index]}_label`] = item[fieldNames["label"] || "label"];
    });
    if (!same(res, currentValue) && value.length > (selSize)) onChange([...currentValue, res]);
  };
  // 更新选中的
  const onSelectChange = (value: Array<val>) => {
    const { onChange } = props;
    value = value.map((item: any) => {
      let convertObj: any = {}
      const [firstName, secondName, threeName] = hierarchyName;
      const [firstKey, secondKey, threeKey]: stringArray = item.key.split("-");
      const [firstLabel, secondLabel, threeLabel]: stringArray = item.label.split("-");
      convertObj[firstName] = firstKey;
      convertObj[secondName] = secondKey;
      convertObj[threeName] = threeKey;
      convertObj[`${firstName}_label`] = firstLabel;
      convertObj[`${secondName}_label`] = secondLabel;
      convertObj[`${threeName}_label`] = threeLabel;
      console.log('ooobbj', convertObj)
      return convertObj
    });
    onChange && onChange(value);
  };
  // 回显
  const convertValues = (value: any) => {
    value = value || [];
    return value.map((item: any) => {
      const keys = [], labels = [];
      for (const name of hierarchyName) {
        let key = item[name];
        let label = item[`${name}_label`];
        key = key ? keys.push(key) : false
        label = label ? labels.push(label) : false
      }
      return {
        label: labels.join("-"),
        key: keys.join("-")
      };
    });
  };
  return (
    <div className={`multi-cascade ${props.className || ''}`}>
      <Select
        mode="multiple"
        labelInValue
        placeholder={props.placeholder}
        open={!!props.showSearch}
        onFocus={onSelectFocus}
        onBlur={onSelectBlur}
        value={convertValue}
        onSearch={onSelectSearch}
        onChange={onSelectChange}
      />
      <div onMouseEnter={onCascadeMouseEnter} onMouseLeave={onCascadeMouseLeave}>
        <Cascader
          className="cascade"
          ref={cascaderRef}
          changeOnSelect
          notFoundContent={props.notFoundContent}
          popupVisible={popupVisible}
          onChange={onCascadeChange}
          expandTrigger={expandTrigger}
          fieldNames={props.fieldNames}
          {...rest}
        />
      </div>
    </div>
  );

}
export default MultiCascade;