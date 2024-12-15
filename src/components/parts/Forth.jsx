import React from 'react'
import Title from '../Title'

function Forth() {
  return (
    <div className="flex flex-col justify-start items-center mb-5">
        <Title className='mt-[57px]'>Выберите коллекцию</Title>
        <div className='flex flex-col justify-center items-center gap-[10px] w-[330px] mt-5'>
            <div className="shadow-custom bg-white rounded-[10px] w-full py-2.5 pl-2.5">Коллекция 1</div>
            <div className="shadow-custom bg-white rounded-[10px] w-full py-2.5 pl-2.5">Коллекция 2</div>
            <div className="shadow-custom bg-white rounded-[10px] w-full py-2.5 pl-2.5">Коллекция 3</div>
            <div className="shadow-custom bg-white rounded-[10px] w-full py-2.5 pl-2.5">Коллекция 4</div>
        </div>
    </div>
  )
}

export default Forth
