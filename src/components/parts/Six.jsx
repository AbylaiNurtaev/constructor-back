import React from 'react'
import Title from '../Title'
import { useNavigate } from 'react-router-dom'

function Six() {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-start items-center mb-5">
        <Title className='mt-[57px]'>Выберите коллекцию</Title>
        <div className='flex flex-col justify-center items-center gap-[10px] w-[340px] mt-5'>
            <div className="shadow-custom bg-white rounded-[10px] w-full py-2.5 pl-2.5 pr-2 flex flex-row justify-between"><span>Коллекция 1</span><img onClick={() => navigate('/document')} src="/images/icons/document.svg" alt="" /></div>
            <div className="shadow-custom bg-white rounded-[10px] w-full py-2.5 pl-2.5 pr-2 flex flex-row justify-between"><span>Коллекция 2</span><img onClick={() => navigate('/document')} src="/images/icons/document.svg" alt="" /></div>
            <div className="shadow-custom bg-white rounded-[10px] w-full py-2.5 pl-2.5 pr-2 flex flex-row justify-between"><span>Коллекция 3</span><img onClick={() => navigate('/document')} src="/images/icons/document.svg" alt="" /></div>
            <div className="shadow-custom bg-white rounded-[10px] w-full py-2.5 pl-2.5 pr-2 flex flex-row justify-between"><span>Коллекция 4</span><img onClick={() => navigate('/document')} src="/images/icons/document.svg" alt="" /></div>
        </div>
    </div>
  )
}

export default Six
