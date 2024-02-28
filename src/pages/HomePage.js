import React from 'react'
import { HomeAdmin } from './HomeAdmin'
import { HomeResepsionis } from './HomeResepsionis'
import { HomeTamu } from './HomeTamu'
import { message } from 'antd'

const HomePage = () => {
    try{
        const userType = JSON.parse(localStorage.getItem('user')).tipe
    if (userType === 'admin'){
        return (<HomeAdmin/>)
    }else if (userType === 'resepsionis'){
        return (<HomeResepsionis/>)
    }else {
        return (<HomeTamu/>)
    }
    }catch(e){
        console.log(e)
        message.warning('anda belum login').then(()=>window.location.href ='/login')
    }  
}

export default HomePage