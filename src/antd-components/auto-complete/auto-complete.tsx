import React from 'react';
import { useState, useEffect } from 'react'
import { AutoComplete as AntdAutoComplete, Input } from 'antd';
import { debounce } from '../../utils/utils';
import { highlight } from './utils';
import './auto-complete.css';
const { Option } = AntdAutoComplete;
/**
   * @description 自动搜索
   * @param {function} requestFunc 请求接口回调
   * @param {boolean} highlightStatus 是否高亮
   * @param {string} delayTime 防抖搜索毫秒时间
   * @param {boolean} currentInputOptions 是否展示当前输入选项
   * @param {object} extendReqParams 附带请求的扩展参数
   */
type optionsObj = {
  value: string
}

export default function AutoComplete(props: any) {
  const { requestFunc, highlightStatus = false, delayTime = 0, currentInputOptions = false, extendReqParams = {}, ...rest } = props;
  const [data, setData] = useState<any>([]);
  const [options] = useState<any>(props.options || []);
  const [keyword, setKeyword] = useState<string>('');
  useEffect(() => {
    requestFunc && requestFunc({ value: keyword, ...extendReqParams }).then((res: optionsObj[]) => {
      console.log('fetch', res)
      let getData = [...res];
      if (currentInputOptions && keyword) getData.unshift({ value: keyword })
      setData(getData)
    })
  }, [keyword && options.length === 0])
  const onSearchFuc = (value: string) => setKeyword(value)
  const children = options.length === 0 && data.map((item: optionsObj, index: string) =>
    <Option value={item.value} key={index} >
      {highlightStatus ? <span className="hight-warp" dangerouslySetInnerHTML={{ __html: highlight(item.value, keyword) }}></span> : item.value}
    </Option>);
  return (
    <AntdAutoComplete
      {...rest}
      className={`auto-complete ${props.className || ''}`}
      onSearch={debounce(onSearchFuc, delayTime)}
    >
      {children}
    </AntdAutoComplete>
  );

}