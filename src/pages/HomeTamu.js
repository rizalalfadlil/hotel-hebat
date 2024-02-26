import { Button, DatePicker, Flex, Form, Image, Input, InputNumber, List, Segmented, Select, Space, Table } from 'antd'
import React, { useState } from 'react'

export const HomeTamu = () => {
    const [page, setPage] = useState('home');
    
    const switchPage =(targetPage)=>{
        setPage(targetPage)
        console.log(targetPage)
    }
  return (
    <div>
        <div className='container mt-5 p-3'>
            <div className='row'>
                <div className='col text-start'>
                    <h1>HOTEL HEBAT</h1>
                </div>
                <div className='col justify-content-end align-items-center d-flex'>
                    <Segmented
                    options={['Home', 'Kamar', 'Fasilitas']}
                    onChange={(value)=> switchPage(value)}/>
                </div>
            </div>
            {page === 'Kamar' && (<Kamar/>)}
            {page === 'Fasilitas' && (<Fasilitas/>)}
            {page === 'Home' && (<Home/>)}
        </div>
    </div>
  )
}
const Kamar =()=>{
    return(
        <div className='p-3 text-start'>
                <KamarItem 
                fasilitas={[
                    'Kamar Berukuran luas 32 m2',
                    'Kamar Mandi Shower',
                    'Coffe Maker',
                    'AC',
                    'LED TV 32 inch'
                ]} 
                tipe='Tipe Superior'
                gambar='./h1.jpg'
                />
                <KamarItem 
                fasilitas={[
                    'Kamar Berukuran luas 32 m2',
                    'Kamar Mandi Shower dan Bathtub',
                    'Coffe Maker',
                    'Sofa',
                    'LED TV 40 inch',
                    'AC',
                ]} 
                tipe='Tipe Deluxe'
                gambar='./h4.jpg'
                />
            </div>
    )
}
const KamarItem =(props)=>{
    return(
        <>
        <Image src={props.gambar} width={1000} height={400}/>
                <h3 className='mt-3'>{props.tipe}</h3>
                <span className='fw-bold'>Fasilitas : </span>
                <List 
                className='mt-3'
                size='small'
                dataSource={props.fasilitas}
                renderItem={(item)=>(
                    <p>{item}</p>
                )}/>
                </>
    )
}
const Fasilitas = () =>{
    return(
        <>
        <Image src='./h1.jpg' height={400}/>
                <Flex wrap='wrap'>
                    <h2>Fasilitas</h2>
                    <Space className='d-flex mt-2 align-items-center justify-content-center'>
                        <Image src='./h2.png' height={200} width={360}/>
                        <Image src='./h3.jpg' height={200} width={360}/>
                        <Image src='./h4.jpg' height={200} width={360}/>
                    </Space>
                </Flex>
                </>
    )
}
const Home =()=>{
    return(
        <>
        <div className='border w-100 p3'>
                kosong
            </div>
            <Form
            className='p-3 mt-4 mb-4 d-flex justify-content-center'
            layout='inline'>
                <Form.Item
                label='check-in'
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                label='check-out'
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                label='jumlah kamar'>
                    <InputNumber min={0}/>
                </Form.Item>
                <Button type='default'>Pesan</Button>
            </Form>
            <Form
            layout='horizontal'
            labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}>
                <h2>Form Pemesanan</h2>
                <Form.Item
                label='nama pemesan'>
                    <Input width={10}/>
                </Form.Item>
                <Form.Item
                label='email'>
                    <Input suffix='@gmail.com'/>
                </Form.Item>
                <Form.Item
                label='no telepon'>
                    <Input/>
                </Form.Item>
                <Form.Item
                label='nama tamu'>
                    <Input/>
                </Form.Item>
                <Form.Item
                label='tipe kamar'>
                    <Select 
                    className='text-start'
                    options={
                        [{value:'superior',label:'Superior'},
                         {value:'deluxe', label:'Deluxe'}]}/>
                </Form.Item>
                <Button type='primary'>Konfirmasi Pesanan</Button>
            </Form>
            </>
    )
}