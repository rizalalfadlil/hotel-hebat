import { PlusCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, FloatButton, Form, Image, Input, InputNumber, List, Segmented, Select, Space, Table } from 'antd'
import React, { useState } from 'react'


export const HomeResepsionis = () => {
  return (
    <div>
        <div className='container mt-5 p-3'>
            <div className='row'>
                <div className='col text-start'>
                    <h1>HOTEL HEBAT</h1>
                </div>
                <div className='col justify-content-end align-items-center d-flex'>
                    <h4 className='me-3'>Resepsionis</h4>
                </div>
                <Flex justify='space-between'>
                    <DatePicker/>
                    <div>
                    <Input suffix={(<SearchOutlined/>)} placeholder='Search'/>
                    </div>
                </Flex>
                    <Table dataSource={data} className='mt-3' columns={columns}/>
            </div>
        </div>
    </div>
  )
}
const columns = [
    {
        title:'Nama Tamu',
        dataIndex:'tamu',
        key:'tamu'
    },
    {
        title:'Tanggal cek in',
        dataIndex:'check_in',
        key:'check_in'
    },
    {
        title:'Tanggal cek out',
        dataIndex:'check_out',
        key:'check_out'
    },
    {
        title:'Aksi',
        render:()=>(<Button type='primary'>Cek in</Button>)
    }
];
const data = [
    {
        tamu:'Mr X',
        check_in:'15-01-2022',
        check_out:'17-01-2022'
    },
    {
        tamu:'Mr Y',
        check_in:'15-01-2022',
        check_out:'17-01-2022'
    },
]
