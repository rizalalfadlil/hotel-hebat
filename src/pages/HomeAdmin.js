import { PlusCircleFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, FloatButton, Form, Image, Input, Drawer, InputNumber, List, Segmented, Select, Space, Table, Upload, message, Modal } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const formatRupiah = (number) => {
    return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
  }

export const HomeAdmin = () => {
    const [page, setPage] = useState('Kamar');
    
    const switchPage =(targetPage)=>{
        setPage(targetPage)
        console.log(targetPage)
    }
  return (
    <div>
        <div className='container p-5 bg-light bg-opacity-75 shadow rounded'>
            <div className='row'>
                <div className='col text-start'>
                    <h1>HOTEL HEBAT</h1>
                </div>
                <div className='col justify-content-end align-items-center d-flex'>
                    <h4 className='me-3'>Admin</h4>
                    <Segmented
                    options={['Kamar', 'Fasilitas Kamar', 'Fasilitas Hotel']}
                    onChange={(value)=> switchPage(value)}/>
                </div>
                <div className='overflow-y-scroll rounded'style={{height:'50vh'}}>
                {page === 'Kamar' && (<Kamar/>)}
                {page === 'Fasilitas Kamar' && (<FasilitasKamar/>)}
                {page === 'Fasilitas Hotel' && (<FasilitasHotel/>)}
                </div>
            </div>
        </div>
    </div>
  )
}
const Kamar =()=>{
    const KamarData =[
        {
            tipe:'superior',
            harga:'1000000',
            jumlah:'32'
        },
        {
            tipe:'deluxe',
            harga:'4000000',
            jumlah:'40'
        }
    ]
    const [data, setData] = useState(KamarData)
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false);
    const [drawerMode, setDrawerMode]= useState('tambah');
    const showDrawer = (mode) => {
        form.resetFields();
        setDrawerMode(mode)
        setOpen(true);
    };
    const [openModal, setOpenModal] = useState(false)
    const modalOpen = (data) =>{
        setOpenModal(true)
        setEditData(data)
    }
    const modalClose = ()=>{setOpenModal(false)}
    const [editData, setEditData] = useState({
        tipe:'tipe',
        jumlah:'89',
        harga:'100'
    })
    const sendData = async (d)=>{
        console.log(drawerMode === 'tambah'? ('post',d) : ('put',editData))

        if(drawerMode === 'tambah'){
            try{
                const response = await axios.post('http://localhost:8000/api/kamar', d, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                console.log(response)
                getKamarData()
                message.success('berhasil tambah data')
            }catch(e){
                console.log(e)
                message.error('gagal tambah data')
            }
        }else {
            try{
                const putData = {
                    foto:`k${editData.id}.jpg`,
                    tipe:d.tipe !== undefined? d.tipe:editData.tipe,
                    jumlah:d.jumlah !== undefined? d.jumlah:editData.jumlah,
                    harga:d.harga !== undefined? d.harga:editData.harga,
                }
                const response = await axios.put(`http://localhost:8000/api/kamar/${editData.id}`,putData,{
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  console.log(response)
                  message.success('berhasil edit data')
                  getKamarData()
            }catch(e){
                console.log(e)
                message.error('gagal edit data')
            }
        }
    }
    const onClose = () => {
        setOpen(false);
    };
    const openEditMode=(data)=>{
        setEditData(data)
        console.log('edit', editData)
        showDrawer('edit')
    }
    const KamarColumn = [
        {
            title:'Tipe Kamar',
            key:'tipe',
            dataIndex:'tipe'
        },
        {
            title:'Jumlah Kamar',
            key:'jumlah',
            dataIndex:'jumlah'
        },
        {
            title:'Harga',
            key:'harga',
            render:(record)=>(
                <p>{formatRupiah(record.harga)}</p>
            )
        },
        {
            title:'Aksi',
            key:'aksi',
            render:(_, record)=>(
                <Space>
                    <Button type='primary' onClick={()=>openEditMode(record)}>Ubah</Button>
                    <Button onClick={()=>modalOpen(record)}>Lihat</Button>
                    <Modal
                    centered 
                    open={openModal} 
                    onCancel={modalClose}
                    title={editData.tipe}
                    width={800}
                    footer={null}
                    >
                        <div className='row'>
                            <Image src={`http://localhost:8000/image/${editData.foto}`} width={500} preview={false} className='rounded col'/>
                            <div className='col'>
                            id : {editData.id}
                            <h5 className='mt-3'>Kamar {editData.tipe}</h5>
                            <span>Mulai dari : {formatRupiah(editData.harga)}</span>
                            </div>
                        </div>
                    </Modal>
                </Space>
            )
    
        }
    ];
    
    useEffect(()=>{
        getKamarData();
    }, [])
     // Mengirimkan file ke server
  const handleUpload = (file) => {
    // Mengubah nama file
    const newFileName = `k${editData.id}.jpg`;

    // Membuat objek FormData untuk mengirim file ke server
    const formData = new FormData();
    formData.append('file', file, newFileName);
    
    // Mengirim permintaan POST ke server
    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      console.log(response)
    })
    .then(data => {
      console.log('File uploaded successfully:', data);
    })
    .catch(error => {
      console.error('Upload error:', error);
    });
  };
    const getKamarData = async()=>{
        onClose()
        try{
            const data = await axios.get('http://localhost:8000/api/kamar')
            setData(data.data)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
        <div>
            <Table dataSource={data} columns={KamarColumn}/>
            <FloatButton icon={<PlusOutlined/>} onClick={() => showDrawer('tambah')} type='primary'/>
        </div>
        <Drawer className='text-capitalize' title={`${drawerMode} Kamar`} onClose={onClose} open={open}>
        <Form
        onFinish={sendData}
        form={form}
        layout='vertical'>
            <Form.Item
            rules={drawerMode !== 'edit' && [
                {
                    required:true,
                    message:'wajib diisi'
                }
            ]}
            label='Tipe Kamar' name='tipe'
            >
                <Input defaultValue={drawerMode === 'edit'? editData.tipe : ''}/>
            </Form.Item>
            <Form.Item
            rules={drawerMode !== 'edit' && [
                {
                    required:true,
                    message:'wajib diisi'
                }
            ]}
            label='Jumlah Kamar' name='jumlah'>
                <InputNumber type='number' className='w-100' defaultValue={drawerMode === 'edit'? editData.jumlah : ''}/>
            </Form.Item>
            <Form.Item
            rules={drawerMode !== 'edit' && [
                {
                    required:true,
                    message:'wajib diisi'
                }
            ]}
            label='Harga' name='harga'>
                <InputNumber className='w-100' type='number' prefix='Rp.' min={0} step={50000} defaultValue={drawerMode === 'edit'? editData.harga : ''}/>
            </Form.Item>
            {drawerMode === 'edit' && (<Upload
            maxCount={1}
            customRequest={({ file }) => handleUpload(file)}
            >
            <Button icon={<UploadOutlined />} className='w-100'>Upload Gambar</Button>
            </Upload>)}
            <Button type='primary' className='w-100 mt-3 text-capitalize' htmlType='submit'>{drawerMode} Kamar</Button>
        </Form>
      </Drawer>
      </>
    )
}
const FasilitasKamar =()=>{
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false);
    const [drawerMode, setDrawerMode]= useState('tambah');
    const showDrawer = (mode) => {
        form.resetFields();
        setDrawerMode(mode)
        setOpen(true);
    };
    const [editData, setEditData] = useState({
        tipe:'tipe',
        kamar:'kamar',
    })
    const [openModal, setOpenModal] = useState(false)
    const modalOpen = (data) =>{
        setOpenModal(true)
        setEditData(data)
    }
    const modalClose = ()=>{setOpenModal(false)}
    const sendData = async (d)=>{
        const dataToSend = {
            tipe:'kamar',
            nama:d.nama !== undefined? d.nama:editData.nama,
            kamar:d.kamar !== undefined? d.kamar:editData.kamar
        }
       if(drawerMode === 'tambah'){
        try{
            const response = await axios.post(`http://localhost:8000/api/fasilitas`,dataToSend,{
                headers: {
                    'Content-Type': 'application/json'
                    }
                })
                message.success('berhasil tambah data')
                console.log(response)
                getFasilitasData()
           }catch(e){
            console.log(e)
            message.error('gagal tambah data')
           }
       }else{
        try{
            const response = await axios.put(`http://localhost:8000/api/fasilitas/${editData.id}`,dataToSend,{
                headers: {
                    'Content-Type': 'application/json'
                    }
                })
                console.log(response)
                message.success('berhasil edit data')
                getFasilitasData()
           }catch(e){
            console.log(e)
            message.error('gagal edit data')
           }
       }
        
    }
    const onClose = () => {
        setOpen(false);
    };
    const openEditMode=(data)=>{
        setEditData(data)
        showDrawer('edit')
    }
    const column = [
        {
            title:'Tipe Kamar',
            key:'kamar',
            dataIndex:'kamar'
        },
        {
            title:'Nama Fasilitas',
            key:'nama',
            dataIndex:'nama'
        },
        {
            title:'Aksi',
            key:'aksi',
            render:(_, record)=>(
                <Space>
                    <Button type='primary' onClick={()=>openEditMode(record)}>Ubah</Button>
                    <Button onClick={()=>modalOpen(record)}>Lihat</Button>
                    <Modal
                    centered 
                    open={openModal} 
                    onCancel={modalClose}
                    title='fasilitas'
                    footer={null}
                    >
                        id : {editData.id}
                        <h6 className='mt-3'>{editData.nama}</h6>
                        <span className='text-bg-secondary rounded p-1'>{editData.tipe} / {editData.kamar}</span>
                        <p className='mt-2'>{editData.keterangan}</p>
                    </Modal>
                </Space>
            )
    
        }
    ];
    const data =[
        {
            tipe:'Superior',
            fasilitas:'TV 32 inch'
        },
        {
            tipe:'Deluxe',
            fasilitas:'Bath Tub'
        },
        {
            tipe:'Deluxe',
            fasilitas:'TV 40 inch'
        },
        {
            tipe:'Deluxe',
            fasilitas:'Cofee Maker'
        }
    ]
    const [fasilitasData, setFasilitasData] = useState(data)
    useEffect(()=>{
        getFasilitasData();
    }, [])
    const getFasilitasData = async()=>{
        onClose()
        try{
            const data = await axios.get('http://localhost:8000/api/fasilitas')
            const filteredData = data.data.filter(filterTipe)
            setFasilitasData(filteredData)
            function filterTipe(t){
                return t.tipe ==='kamar';
            }
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
        <div>
            <Table dataSource={fasilitasData} columns={column}/>
            <FloatButton icon={<PlusOutlined/>} onClick={()=>showDrawer('tambah')} type='primary'/>
        </div>
        <Drawer className='text-capitalize' title={`${drawerMode} Fasilitas`} onClose={onClose} open={open}>
        <Form
        form={form}
        onFinish={sendData}
        layout='vertical'>
            <Form.Item
            rules={drawerMode !== 'edit' && [
                {
                    required:true,
                    message:'wajib diisi'
                }
            ]}
            label='Tipe Kamar' name='kamar'>
                <Input defaultValue={drawerMode === 'edit'? editData.kamar : ''}/>
            </Form.Item>
            <Form.Item
            rules={drawerMode !== 'edit' && [
                {
                    required:true,
                    message:'wajib diisi'
                }
            ]}
            label='Nama fasilitas' name='nama'>
                <Input defaultValue={drawerMode === 'edit'? editData.nama : ''}/>
            </Form.Item>
            <Button type='primary' className='w-100 mt-3 text-capitalize' htmlType='submit'>{drawerMode} Fasilitas</Button>
        </Form>
      </Drawer>
      </>
    )
}
const FasilitasHotel =()=>{
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false);
    const [drawerMode, setDrawerMode]= useState('tambah');
    const showDrawer = (mode) => {
        form.resetFields();
        setDrawerMode(mode)
        setOpen(true);
    };
    const [openModal, setOpenModal] = useState(false)
    const modalOpen = (data) =>{
        setOpenModal(true)
        setEditData(data)
    }
    const modalClose = ()=>{setOpenModal(false)}
    const onClose = () => {
        setOpen(false);
    };
    const openEditMode=async(data)=>{
        showDrawer('edit')
        setEditData(data) 
        console.log('edit', editData)
    }
    const [editData, setEditData] = useState({
        nama:'',
        keterangan:'',
        image:''
    })
    const sendData = async (d)=>{
        const dataToSend = {
            foto:`f${editData.id}.jpg`,
            tipe:'umum',
            nama:d.nama !== undefined? d.nama:editData.nama,
            keterangan:d.keterangan !== undefined? d.keterangan:editData.keterangan
        }
       if(drawerMode === 'tambah'){
        try{
            const response = await axios.post(`http://localhost:8000/api/fasilitas`,dataToSend,{
                headers: {
                    'Content-Type': 'application/json'
                    }
                })
                console.log(response)
                message.success('berhasil tambah data')
                getFasilitasData()
           }catch(e){
            message.error('gagal tambah data')
            console.log(e)
           }
       }else{
        try{
            const response = await axios.put(`http://localhost:8000/api/fasilitas/${editData.id}`,dataToSend,{
                headers: {
                    'Content-Type': 'application/json'
                    }
                })
                message.success('berhasil edit data')
                console.log(response)
                getFasilitasData()
           }catch(e){
            console.error('gagal edit data')
            console.log(e)
           }
       }
        
    }
    const column = [
        {
            title:'Nama Fasilitas',
            key:'nama',
            dataIndex:'nama'
        },
        {
            title:'Keterangan',
            key:'keterangan',
            dataIndex:'keterangan'
        },
        {
            title:'Image',
            key:'image',
            render:(source)=>(
                <Image src={`http://localhost:8000/image/${source.foto}`} className='rounded' width={150}/>
            )
        },
        {
            title:'Aksi',
            key:'aksi',
            render:(_, record)=>(
                <Space>
                    <Button type='primary' onClick={()=>openEditMode(record)}>Ubah</Button>
                    <Button onClick={()=>modalOpen(record)}>Lihat</Button>
                    <Modal
                    centered 
                    open={openModal} 
                    width={800}
                    onCancel={modalClose}
                    title='fasilitas'
                    footer={null}
                    >
                        <div className='row'>
                        <Image src={`http://localhost:8000/image/${editData.foto}`} width={500} preview={false} className='mb-2 rounded col'/>
                        <div className='col'>
                            id : {editData.id}
                            <h6 className=''>{editData.nama}</h6>
                            <span className='text-bg-secondary rounded p-1'>{editData.tipe}</span>
                            <p className='mt-1'>{editData.keterangan}</p>
                        </div>
                        </div>
                    </Modal>
                </Space>
            )
    
        }
    ]
     // Mengirimkan file ke server
  const handleUpload = (file) => {
    // Mengubah nama file
    const newFileName = `f${editData.id}.jpg`;

    // Membuat objek FormData untuk mengirim file ke server
    const formData = new FormData();
    formData.append('file', file, newFileName);
    
    // Mengirim permintaan POST ke server
    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      console.log(response)
    })
    .then(data => {
      console.log('File uploaded successfully:', data);
      getFasilitasData();
    })
    .catch(error => {
      console.error('Upload error:', error);
    });
  };
    const data =[
        {
            nama:'Kolam Renang',
            keterangan:'Berada di lantai 3 dengan luas 50m persegi',
            image:'./h3.jpg'
        },
    ]
    const [fasilitasData, setFasilitasData] = useState(data)
    useEffect(()=>{
        getFasilitasData();
    }, [])
    const getFasilitasData = async()=>{
        onClose()
        try{
            const data = await axios.get('http://localhost:8000/api/fasilitas')
            const filteredData = data.data.filter(filterTipe)
            setFasilitasData(filteredData)
            function filterTipe(t){
                return t.tipe ==='umum';
            }
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
        <div>
            <Table dataSource={fasilitasData} columns={column}/>
            <FloatButton icon={<PlusOutlined/>} onClick={()=>showDrawer('tambah')} type='primary'/>
        </div>
        <Drawer className='text-capitalize' title={`${drawerMode} Fasilitas`} onClose={onClose} open={open}>
        <Form
        form={form}
        onFinish={sendData}
        layout='vertical'>
            <Form.Item
            rules={drawerMode !== 'edit' && [
                {
                    required:true,
                    message:'wajib diisi'
                }
            ]}
            label='Tipe Kamar' name='nama'>
                <Input defaultValue={drawerMode === 'edit'? editData.nama : ''}/>
            </Form.Item>
            <Form.Item
            rules={drawerMode !== 'edit' && [
                {
                    required:true,
                    message:'wajib diisi'
                }
            ]}
            label='Nama fasilitas' name='keterangan'>
                <Input defaultValue={drawerMode === 'edit'? editData.keterangan : ''}/>
            </Form.Item>
            {drawerMode === 'edit' && (<Upload
            maxCount={1}
            customRequest={({ file }) => handleUpload(file)}
            >
            <Button icon={<UploadOutlined />} className='w-100'>Upload Gambar</Button>
            </Upload>)}
            <Button type='primary' className='w-100 mt-3 text-capitalize' htmlType='submit'>{drawerMode} Fasilitas</Button>
        </Form>
      </Drawer>
      </>
    )
}