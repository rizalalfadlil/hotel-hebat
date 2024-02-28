import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'

const LoginPage = () => {
    const login = async(data)=>{
        console.log(data)
        try{
            const response = await axios.post('http://localhost:8000/api/login', data,{
                headers: {
                    'Content-Type': 'application/json'
                    }
        })
            console.log(response)
            localStorage.setItem('user',JSON.stringify(response.data.data))
            message.success('login berhasil sebagai ' + response.data.data.tipe).then(()=>window.location.href = '/')
        }catch(e){
            console.log(e)
            message.error(e.response.data)
        }
    }
    const guestMode =()=>{
        localStorage.setItem('user',JSON.stringify({tipe:'tamu'}))
        window.location.href = '/'
        message.success('login berhasil sebagai tamu ').then(()=>window.location.href = '/')
    }
  return (
    <div className='container w-50 p-5 bg-light bg-opacity-75 shadow rounded'>
            <h4 className='text-start'>
                Login Admin
            </h4>
            <Form
            onFinish={login}
            layout='vertical'>
                <Form.Item
                label='username'
                name='username'
                rules={[
                    {
                        required:true,
                        message:'wajib diisi'
                    }
                ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                label='password'
                name='password'
                rules={[
                    {
                        required:true,
                        message:'wajib diisi'
                    }
                ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Button className='w-100' htmlType='submit' type='primary'>Login</Button>
            </Form>
            <Button className='w-100 mt-3' onClick={guestMode}>Masuk sebagai tamu</Button>
        </div>
  )
}

export default LoginPage