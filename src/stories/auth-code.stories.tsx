import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import AuthCode from '../antd-components/auth-code/auth-code';


export default {
  title: 'AuthCode',
  component: AuthCode,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;
const getCheckCode = () => {
  return new Promise((resolve, reject) => {
    resolve();
  })
}
const Template: Story<any> = (args) => <AuthCode getAuthCodeReq={getCheckCode} {...args} />;

export const authCode = Template.bind({});
authCode.args = {  
  countDownNumber:20
};

