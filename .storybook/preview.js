import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo); 
addParameters({info:{
  inline: true,
  header: false
}})
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [(Story) => (
  <div style={{ padding: '20px 40px' }}>
    <h3>组件演示</h3>
    <Story/>
  </div>
)];
