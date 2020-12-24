import React from 'react';
import { useState, useEffect } from 'react'
import { AutoComplete, Input } from 'antd';
import { debounce } from '../../utils/utils';
import { highlight } from './utils';
import './auto-complete.css';
const { Option } = AutoComplete;
/**
   * @description 自动搜索
   * @param {boolean} currentShow 是否展示当前输入选项
   * @param {boolean} highlightStatus 是否高亮
   * @param {string} delayTime 防抖搜索毫秒时间
   * @param {function} requestFunc 请求接口回调
   * @param {object} extendParams 附带请求的扩展参数
   */
export default function Autocomplete(props: any) {
  const { requestFunc, highlightStatus = false, delayTime = 0, currentShow = false } = props;
  const [data, setData] = useState<any>([]);
  const [options] = useState<any>(props.options || []);
  const [keyword, setKeyword] = useState<string>('');
  useEffect(() => {
    requestFunc && requestFunc({ value: keyword }).then((res: any) => {
      console.log('fetch', res)
      let getData = [...res];
      if (currentShow && keyword) getData.unshift({ value: keyword })
      setData(getData)
    })
  }, [keyword && options.length === 0])
  const onSearchFuc = (value: string) => setKeyword(value)
  const children = options.length && data.map((item: any, index: string) =>
    <Option value={item.value} key={index} >
      {highlightStatus ? <span className="hight-warp" dangerouslySetInnerHTML={{ __html: highlight(item.value, keyword) }}></span> : item.value}
    </Option>);
  return (
    <AutoComplete
      {...props}
      className={`auto-complete ${props.className || ''}`}
      onSearch={debounce(onSearchFuc, delayTime)}
    >
      {children}
    </AutoComplete>
  );

}