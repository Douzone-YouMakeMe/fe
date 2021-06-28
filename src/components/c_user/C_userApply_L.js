import React from 'react'
import { Layout} from 'antd';
import { Table } from 'antd';


const columns = [
    { title: '프로젝트명', dataIndex: 'name', key: 'name' },
    { title: '포지션', dataIndex: 'position', key: 'position' },
    { title: '승인여부', dataIndex: 'approval', key: 'approval' },
    { title: '신청일', dataIndex: 'date', key: 'date' },
    {
        title: '지원취소',
        dataIndex: '',
        key: 'x',
        render: () => <button>취소</button>,
      },

  ];
  


  const data = [
    {
      key: 1,
      name: '위하고',
      position: '프론트앤드',
      approval:'F',
      date: '2021.05.21',
      description: '죄송합니다 우리 프로젝트에 부합하지 않습니다.',
    },
    {
      key: 2,
      name: '헬스케어',
      position:'백앤드',
      approval:'P',
      date: '2021.05.21',
      description: '우리 프로젝트에 함께 하실수 있으십니다.',
    },
    {
        key: 3,
        name: '스마트 A',
        position:'백앤드',
        approval:'C',
        date: '2021.05.21',
        description: '프로젝트 관리자 확인 중 입니다',
      }
      
  ];


function C_projectArray_L() {
    return (
        <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    )
}


export default C_projectArray_L

