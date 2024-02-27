import React from 'react'
import { HomeAdmin } from './HomeAdmin'
import { HomeResepsionis } from './HomeResepsionis'
import { HomeTamu } from './HomeTamu'

const HomePage = () => {
    const userType = localStorage.getItem('user')

    if (userType === 'admin'){
        return (<HomeAdmin/>)
    }else if (userType === 'resepsionis'){
        return (<HomeResepsionis/>)
    }else {
        return (<HomeTamu/>)
    }
  
}

export default HomePage