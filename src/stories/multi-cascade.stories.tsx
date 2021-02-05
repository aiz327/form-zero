import React, { useState,Component } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Cascader } from 'antd';

import MultiCascade from '../antd-components/multi-cascade/multi-cascade';

export default {
  title: 'MultiCascade',
  component: MultiCascade,
  argTypes: {
    backgroundColor: { control: 'color' },
    onChange: { action: '选择了' },
  },
};

const Template: Story<any> = (args) => <MultiCascade  {...args} />;

export const multiCascade = Template.bind({});
multiCascade.args = {
  options: [{ id: 1, name: "江苏", list: [{ id: 55, name: "苏州", list: [{ id: 66, name: "吴中" }] }] }, { id: 11, name: "浙江", list: [{ id: 155, name: "杭州", list: [{ id: 166, name: "西湖" }] }] }],
  fieldNames: {
    label: "name",
    value: "id",
    children: "list"
  },
  showSearch: true,
  hierarchyName: ["grandParent", "parent", "child"],
}


