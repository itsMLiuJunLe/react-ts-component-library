import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload, UploadFile } from './Upload';

// const defaultFileList: UploadFile[] = [
//   { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
//   { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
//   { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
// ]

const chenckFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 20) {
    alert('file is too big!');
    return false
  } else {
    return true
  }
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type});
  return Promise.resolve(newFile);
}

const SimpleUpload = () => {
  return (
    <Upload 
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      // defaultFileList={defaultFileList}
      onRemove={action('removed')}
      name='filename'
      data={{'key': 'value111'}}
      accept='.ico, .png'
      multiple={true}
      headers={{'X-Powered-By': 'HaShiQi'}}
      drag={true}
    />
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)