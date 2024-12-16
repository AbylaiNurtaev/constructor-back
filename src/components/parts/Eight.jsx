import React from 'react'
import Title from '../Title'

function Eight() {
  return (
    <div className="flex flex-col justify-start items-center mb-5">
        <Title className='mt-[57px]'>Выберите количество</Title>
        <div className='flex justify-start items-center gap-[10px] w-[340px] h-[38px] mt-10'>
            <span className=''>Введите значение</span>
            <input type="text" className='shadow-custom w-[122px] h-full rounded-[10px] outline-none px-[5px]'/>
            <span>шт.</span>
        </div>
    </div>
  )
}

export default Eight
