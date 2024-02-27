import { Button, DatePicker, Flex, Form, Image, Input, InputNumber, List, Segmented, Select, Space, Table } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
        <div className='mt-5 pt-2' style={{backgroundColor:'#E7E7E7'}}>
                <h2>Tentang Kami</h2>
                <p className='text-start mt-3 container pb-3'>
                    Lepaskan diri Anda ke Hotel Hebat, dikelilingi oleh keindahan pegunungan yang indah, danau dan sawah menghijau, Nikmati
                    sore yang hangat dengan berenang di kolam renang dengan pemandangan matahari terbenam yang memukau; Kid's Club yang luas
                    menawarkan - beragam fasilitas dan kegiatan anak-anak yang akan melengkapi kenyamanan keluarga, Convenion Center kami, 
                    dilengkapi pelayanan lengkap dengan ruang konvensi terbesar di Bandung, mampu mengakomodasi hingga 3.000 delegasi. Manfaatkan
                    ruang penyelenggaraan konvensi M.I.C.E. ataupun mewujudkan acara pernikahan adat yang mewah.
                </p>
            </div>
    </div>
  )
}
const Kamar =()=>{
    const [dataKamar, setDataKamar] = useState([])
    const [dataFasilitas, setDataFasilitas] = useState([])

    useEffect(()=>{
        getDataKamar()
    },[])
    const getDataKamar = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/api/kamar')
            const fresponse = await axios.get('http://localhost:8000/api/fasilitas')
            setDataKamar(response.data)
            setDataFasilitas(fresponse.data)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div className='p-3 text-start'>
                {dataKamar.map((data, index)=>
                    (
                        <KamarItem 
                        fasilitas={[
                            'Kamar Berukuran luas 32 m2',
                            'Kamar Mandi Shower',
                            'Coffe Maker',
                            'AC',
                            'LED TV 32 inch'
                        ]} 
                        tipe={data.tipe}
                        gambar='./h1.jpg'
                        />
                    )
                )}
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
        <Image src='./h1.jpg' height={400} width={1100}/>
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
        <Image src='./h1.jpg' width={1000} height={400}/>
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