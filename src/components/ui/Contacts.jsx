import React from 'react'
import cn from 'classnames'

function Contacts({ className }) {
  return (
    <div className={cn('flex flex-row justify-center items-center w-[340px] gap-2.5', className)}>
      <div className="flex flex-col justify-center items-center gap-2 shadow-custom bg-white w-[165px] h-[76px] rounded-[10px]">
        <p className='text-gray text-[13px]'>Контактный телефон</p>
        <p className='text-[15px] font-semibold'>+7 925 457-20-15</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 shadow-custom bg-white w-[165px] h-[76px] rounded-[10px]">
        <p className='text-gray text-[13px]'>Наши соц. сети</p>
        <div className="flex flex-row justify-center items-center gap-5">
            <img className='w-[30px]' src="/images/icons/whatsapp.svg" alt="" />
            <img className='w-[30px]' src="/images/icons/telegram.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Contacts
