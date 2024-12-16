import React from 'react'
import Title from '../Title'

function Nine() {
  return (
    <div className="flex flex-col justify-start items-center mb-5">
        <Title className='mt-[57px]'>Выберите метраж</Title>
        <div className='flex justify-start items-center gap-[10px] w-[340px] h-[38px] mt-10'>
            <span className=''>Введите значение</span>
            <input type="text" className='shadow-custom w-[122px] h-full rounded-[10px] outline-none px-[5px]'/>
            <span>м.</span>
        </div>

        <div className="mt-10 ">
            <span className='font-sans text-[13px]'>или выберите из списка</span>
            <div className="flex justify-between items-center mt-5 gap-2">
                <div className="flex justify-center items-center shadow-custom w-[61px] h-[38px] rounded-[10px] cursor-pointer bg-white font-sans">1,2 м</div>
                <div className="flex justify-center items-center shadow-custom w-[61px] h-[38px] rounded-[10px] cursor-pointer bg-white font-sans">2,2 м</div>
                <div className="flex justify-center items-center shadow-custom w-[61px] h-[38px] rounded-[10px] cursor-pointer bg-white font-sans">3,2 м</div>
                <div className="flex justify-center items-center shadow-custom w-[61px] h-[38px] rounded-[10px] cursor-pointer bg-white font-sans">4 м</div>
                <div className="flex justify-center items-center shadow-custom w-[61px] h-[38px] rounded-[10px] cursor-pointer bg-white font-sans">4,2 м</div>
            </div>
        </div>
    </div>
  )
}

export default Nine
