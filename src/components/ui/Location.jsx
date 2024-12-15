import React from 'react'
import cn from 'classnames'

function Location({className}) {
  return (
    <div className={cn('flex flex-col justify-start items-center p-2.5 rounded-[10px] bg-white shadow-custom w-[340px]', className)}>
      <div className="flex flex-row justify-start items-start gap-[5px] w-full">
        <img className='w-4 mt-1 ' src="/images/icons/location.svg" alt="" />
        <p className='font-sans text-[13px] font-normal leading-[130%]'><span className='font-[600]'>г. Москва. ул. Тарусская 18, к1 </span><br/>
        магазин "Интерьерные Ткани"</p>
      </div>
      <div className="flex flex-row justify-start items-start gap-[5px] w-full mt-4">
        <img className='w-4 mt-1 ' src="/images/icons/location.svg" alt="" />
        <p className='font-sans text-[13px] font-normal leading-[130%]'><span className='font-[600]'>г. Москва. ул. Большая Полянка 28, к2 </span><br/>
        магазин "Шторы - и точка!"</p>
      </div>
    </div>
  )
}

export default Location
