import React from 'react';
import { useState } from 'react'
import { Input } from 'antd';
import useInterval from '../../core/hooks/useInterval';
import './auth-code.css';
/**
   * @description 获取验证码
   * @param {number} countDownNumber 倒计时秒数
   * @param {demo} icon 输入框左边内侧icon节点
   * @param {function} getAuthCodeReq 请求接口获取验证码（promise函数）
   */
export default function AuthCode(props: any) {
  const { getAuthCodeReq, authCodeText = "", countDownNumber,...rest } = props;
  const [countDown, setCountDown] = useState<number>(countDownNumber || 60)
  const [delay, setDelay] = useState<number>(0)
  const [countStatus, setCountStatus] = useState<boolean>(false)
  useInterval(() => {
    if (countDown > 0 && countStatus) {
      setCountDown(countDown - 1)
    } else {
      setCountStatus(false)
    }
  }, delay)

  function onGetAuthCode() {
    getAuthCodeReq && getAuthCodeReq().then(() => { setDelay(1000); setCountStatus(true); setCountDown(countDownNumber || 60) })
  };
  return (
    <div
      className={`auth-code ${props.className || ''}`}
    >
      <div className={`wrap ${props.icon && 'icon-wrap'}`}>
        {props.icon && <span className="icon">{props.icon}</span>}
        <Input {...rest} />
        <span
          onClick={onGetAuthCode}
          className={`auth-button ${countStatus && "counting"}`}
        >
          {countStatus ? `${countDown}后重新获取` : authCodeText || "获取验证码"}
        </span>
      </div>
    </div>
  );

}
