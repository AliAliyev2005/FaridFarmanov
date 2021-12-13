
import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 80, color: 'blue' }} spin />;


function MyLoading() {
    return (
        <div style={{ margin: '0',position: 'absolute',top: '50%',left: '50%',marginRight: '-50%',transform: 'translate(-50%, -50%)'}}>
          <Spin indicator={antIcon} />
        </div>
    )
}

export default MyLoading
