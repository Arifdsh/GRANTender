import React from 'react'
import './notResult.scss'
import { LuSearchX } from "react-icons/lu";

const NotResult = () => {
    return (
        <div className='notResult'>
            <LuSearchX className="searchX" /> Axtarışınıza uyğun nəticə tapılmadı
        </div>
    )
}

export default NotResult