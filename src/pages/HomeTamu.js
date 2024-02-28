import { Button, DatePicker, Flex, Form, Image, Input, InputNumber, List, Segmented, Select, Space, Table, message } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const formatRupiah = (number) => {
    return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
  }
export const HomeTamu = () => {
    const [page, setPage] = useState('Home');
    
    const switchPage =(targetPage)=>{
        setPage(targetPage)
        console.log(targetPage)
    }
  return (
    <div>
        <div className='container p-3 bg-light bg-opacity-75 shadow rounded'>
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
            <div className='overflow-y-scroll overflow-hidden' style={{height:'70vh'}}>
            {page === 'Kamar' && (<Kamar/>)}
            {page === 'Fasilitas' && (<Fasilitas/>)}
            {page === 'Home' && (<Home/>)}
            <div className='mt-5 pt-2 bg-light bg-opacity-50 rounded shadow-sm'>
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
        </div>
        
    </div>
  )
}
const Kamar =()=>{
    const [dataKamar, setDataKamar] = useState([])
    const [dataFasilitas, setDataFasilitas] = useState([])

    useEffect(()=>{
        getDataKamar()
        getDataFasilitas()
    },[])
    const getDataKamar = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/api/kamar')
            setDataKamar(response.data)
            console.log(dataKamar)
        }catch(e){
            console.log(e)
        }
    }
    const getDataFasilitas =async()=>{
        try{
            const response = await axios.get('http://localhost:8000/api/fasilitas')
            setDataFasilitas(response.data)
            console.log(dataFasilitas)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div className='p-3 text-start'>
        {dataKamar.map((kamar, index) => (
        <KamarItem 
            tipe={kamar.tipe}
            harga={kamar.harga}
            gambar={`http://localhost:8000/image/${kamar.foto}`}
            key={index} // tambahkan key prop untuk setiap iterasi dalam map
        >
            {/* Filter dataFasilitas berdasarkan tipe kamar */}
            {dataFasilitas.filter(fasilitas => fasilitas.kamar === kamar.tipe).map((fasilitas, index) => (
                <li key={index}>{fasilitas.nama}</li>
            ))}
        </KamarItem>
    ))}
</div>
    )
}
const KamarItem =(props)=>{
    return(
        <>
        <Image src={props.gambar} width={1000} height={400} className='rounded'/>
                <h3 className='mt-3'>{props.tipe}</h3>
                <h5>Mulai dari : {formatRupiah(props.harga)}</h5>
                <span className='fw-bold'>Fasilitas : </span>
                {props.children}
                <br/>
                </>
    )
}
const Fasilitas = () =>{
    const [gambar, setGambar] = useState([])
    const getDataFasilitas = async() =>{
        try{
            const response = await axios.get('http://localhost:8000/api/fasilitas')
            setGambar(response.data)
            console.log(response.data)
        }catch(e)
        {
            console.log(e)
        }
    }
    useEffect(()=>{
        getDataFasilitas()
    },[])
    return(
        <>
        <Image src='./h1.jpg' height={400} width={1100} className='rounded'/>
                <Flex wrap='wrap'>
                    <h2>Fasilitas</h2>
                    <Space className='d-flex mt-2 align-items-center justify-content-center overflow-x-scroll'>
                        {gambar.map((data, index)=> data.foto && (<Image src={`http://localhost:8000/image/${data.foto}`} height={200} width={360}/>))}
                    </Space>
                </Flex>
                </>
    )
}
const Home =()=>{
    const [dataKamar, setDataKamar] = useState([])
    const [selectedTipe, setSelectedTipe] = useState()
    const [jumlahKamar, setJumlahKamar] = useState(1)
    const [Harga, setHarga] = useState()
    const totalHarga = Harga*jumlahKamar
    const gantiJumlah =(j)=>{
        setJumlahKamar(j)
        console.log(j)
    }
    const pilihTipe = async(t)=>{
        try{
            const response = await axios.get('http://localhost:8000/api/kamar/' + t)
            setSelectedTipe(t)
            setHarga(response.data.harga)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        getDataKamar()
    },[])
    const getDataKamar = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/api/kamar')
            setDataKamar(response.data.map(setOptions))
            function setOptions(d){
                return {
                    value:d.id,
                    label:d.tipe
                }
            }
        }catch(e){
            console.log(e)
            
        }
    }
    const checkinData =(c)=>{
        console.log(c)
        setShowForm(true)
        setCekinForm(c)
    }
    const [cekinForm, setCekinForm]=useState()
    const userData = async (u)=>{
        console.log(u)
        try{
            const response = await axios.post('http://localhost:8000/api/tamu', u, {
                headers: {
                    'Content-Type': 'application/json'
                    }
                })
            console.log(response)
            const cekinData = {
                check_in:cekinForm.check_in,
                check_out:cekinForm.check_out,
                id_kamar:selectedTipe,
                id_tamu:response.data.id
                
            }
            const cresponse = await axios.post('http://localhost:8000/api/check_in', cekinData, {
                headers: {
                    'Content-Type': 'application/json'
                    }
                })
                console.log(cresponse)
                message.success("berhasil membuat reservasi")
        }catch(e){
            console.log(e)
        }
    }
    const [showForm, setShowForm] = useState(false)
    return(
        <>
        <div className='w-100 p3'>
        <Image src='./h1.jpg' width={1000} preview={false} height={400} className='rounded'/>
            </div>
            <Form
            onFinish={checkinData}
            className='p-3 mt-4 mb-4 d-flex justify-content-center'
            layout='inline'>
                <Form.Item
                label='check-in'
                name='check_in'
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                label='check-out'
                name='check_out'
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                label='jumlah kamar'
                name='jumlah'>
                    <InputNumber min={0} onChange={gantiJumlah}/>
                </Form.Item>
                <Button type='default' htmlType='submit'>Pesan</Button>
            </Form>
            {showForm === true && (
                <Form
                onFinish={userData}
                layout='horizontal'
                labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}>
                    <h2>Form Pemesanan</h2>
                    <Form.Item
                    label='nama pemesan'
                    name='nama_pemesan'
                    >
                        <Input width={10}/>
                    </Form.Item>
                    <Form.Item
                    label='email'
                    name='email'
                    >
                        <Input suffix='@gmail.com'/>
                    </Form.Item>
                    <Form.Item
                    label='no telepon'
                    name='no_telp'
                    >
                        <Input type='number'/>
                    </Form.Item>
                    <Form.Item
                    label='nama tamu'
                    name='nama_tamu'
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                    label='tipe kamar'
                    name='tipe_kamar'>
                        <Select
                        onSelect={pilihTipe}
                        className='text-start'
                        options={dataKamar}/>
                    </Form.Item>
                <h4>total harga : {totalHarga > 0 ? formatRupiah(totalHarga) : '-'}</h4>
                    <Button type='primary' htmlType='submit'>Konfirmasi Pesanan</Button>
                </Form>
            )}
            </>
    )
}