import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'

const LoginPage = () => {
    const login =(data)=>{
        console.log(data)
        localStorage.setItem('user', data.username)
        message.success('login berhasil sebagai ' + localStorage.getItem('user')).then(()=>window.location.href = '/')
    }
  return (
    <div className='d-flex align-items-center border justify-content-center'style={{height:'100vh'}}>
        <div className='border shadow container w-50 p-3 rounded'>
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
            <Button className='w-100 mt-3' onClick={()=>login({username:'tamu'})}>Masuk sebagai tamu</Button>
        </div>
    </div>
  )
}

export default LoginPage