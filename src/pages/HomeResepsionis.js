import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Flex, Input, Table, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
dayjs.locale('id');
const showedFormat = 'DD MMMM YYYY';

export const HomeResepsionis = () => {
    const [cekin, setCekin] = useState([]);
    const [filteredCekin, setFilteredCekin] = useState([]);
    const [tanggalFilter, setTanggalFilter] = useState(null);

    useEffect(() => {
        getCekinData();
    }, []);

    const getCekinData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/check_in');
            const nresponse = await axios.get('http://localhost:8000/api/tamu');

            const list = response.data.map(element => {
                const listNama = nresponse.data.filter(data => data.id === element.id);
                const nama = listNama[0] ? listNama[0].nama_tamu : null;
                return {
                    harga: element.harga,
                    id: element.id,
                    id_kamar: element.id_kamar,
                    id_resepsionis: element.id_resepsionis,
                    id_tamu: element.id_tamu,
                    check_in: dayjs(element.check_in).format(showedFormat),
                    check_out: dayjs(element.check_out).format(showedFormat),
                    nama
                };
            });

            setCekin(list);
            setFilteredCekin(list);
        } catch (e) {
            console.log(e);
        }
    };

    const checkIn = async id => {
        console.log(id);
        const userId = JSON.parse(localStorage.getItem('user')).id;

        try {
            const response = await axios.put(
                'http://localhost:8000/api/check_in/' + id,
                { id_resepsionis: userId },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response);
            getCekinData();
            message.success('berhasil check in');
        } catch (e) {
            console.log(e);
        }
    };

    const handleTanggalFilterChange = value => {
        const formatDate = dayjs(value).format(showedFormat)
        setTanggalFilter(value);
        if (value) {
            const filteredData = cekin.filter(filterDate);
            function filterDate(d){
                return formatDate === d.check_in
            }
            setFilteredCekin(filteredData);
        } else {
            setFilteredCekin(cekin);
        }
    };
    const columns = [
        {
            title: 'Nama Tamu',
            dataIndex: 'nama',
            key: 'nama'
        },
        {
            title: 'Tanggal cek in',
            dataIndex: 'check_in',
            key: 'check_in'
        },
        {
            title: 'Tanggal cek out',
            dataIndex: 'check_out',
            key: 'check_out'
        },
        {
            title: 'Aksi',
            render: fasilitas => (
                fasilitas.id_resepsionis === null ? (
                    <Button type='primary' onClick={() => checkIn(fasilitas.id)}>Check In</Button>
                ) : (
                    <Button type='primary' disabled>Check in selesai</Button>
                )
            )
        }
    ];

    return (
        <div>
            <div className='container p-5 bg-light bg-opacity-75 shadow rounded'>
                <div className='row'>
                    <div className='col text-start'>
                        <h1>HOTEL HEBAT</h1>
                    </div>
                    <div className='col justify-content-end align-items-center d-flex'>
                        <h4 className='me-3'>Resepsionis</h4>
                    </div>
                    <Flex justify='space-between'>
                    <DatePicker onChange={handleTanggalFilterChange} />
                    <Input
                    className='w-25'
                        suffix={<SearchOutlined />}
                        placeholder='Search'
                        onChange={e => {
                            const keyword = e.target.value.toLowerCase();
                            const filteredData = cekin.filter(item =>
                                item.nama.toLowerCase().includes(keyword)
                            );
                            setFilteredCekin(filteredData);
                        }}
                    />
                    </Flex>
                    <Table dataSource={filteredCekin} className='mt-3' columns={columns} />
                </div>
            </div>
        </div>
    );
};
