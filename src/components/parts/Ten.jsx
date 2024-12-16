import React from 'react'
import Title from '../Title'

function Ten() {
  return (
    <div className="flex flex-col justify-start items-center mb-5">
        <Title className='mt-[57px]'>Выберите количество</Title>
        <div className='flex flex-col justify-start items-start gap-[20px] w-[340px] mt-10'>
            <span className=''>Введите значение</span>
            <div className="flex items-center justify-between w-full h-[40px]">
                <span>от</span>
                <input type="text" className='shadow-custom w-[123px] h-full rounded-[10px] outline-none px-[5px]'/>
                <span>до</span>
                <input type="text" className='shadow-custom w-[123px] h-full rounded-[10px] outline-none px-[5px]'/>
            </div>
        </div>
    </div>
  )
}

export default Ten
