import React from 'react'
import { HomeAdmin } from './HomeAdmin'
import { HomeResepsionis } from './HomeResepsionis'
import { HomeTamu } from './HomeTamu'

const HomePage = () => {
    console.log(JSON.parse(localStorage.getItem('user')))
    const userType = JSON.parse(localStorage.getItem('user')).tipe
    console.log(userType)
    if (userType === 'admin'){
        return (<HomeAdmin/>)
    }else if (userType === 'resepsionis'){
        return (<HomeResepsionis/>)
    }else {
        return (<HomeTamu/>)
    }
  
}

export default HomePage