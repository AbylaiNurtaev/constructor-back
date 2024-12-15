import React from 'react'

function HomePage() {
  return (
    <div className='flex flex-col justify-between align-top w-full'>
      <img
        src="/images/ui/topSquares.png"
        alt="top Square"  
        className='w-full'
      />

      <h1 className='font-black text-primary text-[45px] text-center mt-[63px]'>TipTopKarniz</h1>

      <div className="flex flex-row justify-center align-middle gap-2.5 mt-[200px]">
        <div className='bg-primary text-white w-[165px] border rounded-[10px] h-10 flex flex-row justify-center items-center gap-2.5'><span className='leading-[130%]'>Каталог</span> <img className='w-[18px] h-[18px]' src="/images/icons/buttonIcon1.svg" alt="" /></div>
        <div className='bg-primary text-white w-[165px] border rounded-[10px] h-10 flex flex-row justify-center items-center gap-2.5'><span className='leading-[130%]'>Калькулятор</span> <img className='w-[18px] h-[18px]' src="/images/icons/buttonIcon2.svg" alt="" /></div>
      </div>
      <img
        src="/images/ui/bottomSquares.png"
        alt="top Square"  
        className='w-full mt-[53px]'
      />
    </div>
  )
}

export default HomePage
