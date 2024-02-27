import { PlusCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, FloatButton, Form, Image, Input, InputNumber, List, message, Segmented, Select, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('id')
const showedFormat = 'DD MMMM YYYY HH:mm'

export const HomeResepsionis = () => {
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
    const [cekin, setCekin] = useState(data)
    useEffect(()=>{
        getCekinData()
    },[])
    const getCekinData = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/api/check_in')
            console.log(response)
            setCekin(response.data.map(setOptions))
            function setOptions(d){
                return{
                    id:d.id,
                    tamu:d.id_tamu,
                    check_in:dayjs(d.check_in).format(showedFormat),
                    check_out:dayjs(d.check_out).format(showedFormat),
                    id_resepsionis:d.id_resepsionis
                }
            }
        }catch(e){
            console.log(e)
        }
    }
    const checkIn = async(id) =>{
        console.log(id)
        const userId = ('userdata', JSON.parse(localStorage.getItem('user')).id)
        
        try{
            const response = await axios.put('http://localhost:8000/api/check_in/' + id, {id_resepsionis:userId}, {
                headers: {
                    'Content-Type': 'application/json'
                    }
        })
        console.log(response)
        message.success('berhasil check in')
        getCekinData()
        }catch(e){
            console.log(e)
        }
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
            render:(fasilitas)=>(fasilitas.id_resepsionis === null? <Button type='primary' onClick={()=>checkIn(fasilitas.id)}>Check In</Button>:<Button type='primary' disabled>Check in selesai</Button>)
        }
    ];
    

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
                    <Table dataSource={cekin} className='mt-3' columns={columns}/>
            </div>
        </div>
    </div>
  )
}

