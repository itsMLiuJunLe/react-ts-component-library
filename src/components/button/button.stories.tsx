import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const bottonWithSize = () => (
  <Fragment>
    <Button size='lg'>large button</Button>
    <Button size='sm'>small button</Button>
  </Fragment>
)

const bottonWithType = () => (
  <Fragment>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='link' href="https://www.baidu.com">link button</Button>
  </Fragment>
)

storiesOf('Buttpn Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的Button', bottonWithSize)
  .add('不同类型的Button', bottonWithType)
