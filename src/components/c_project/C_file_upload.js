import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



function C_file_upload() {
   
    return (
        <div>
          파일 업로드 자리(컨포넌트 잘 안됨 )
        </div>
    )
}



export default C_file_upload;

/*
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


    const props = {
        beforeUpload: file => {
        if (file.type !== 'image/png') {
            message.error(`${file.name} pdf 파일이 아닙니다`);
        }
        return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
        },
        onChange: info => {
        console.log(info.fileList);
        },
    };


*/

