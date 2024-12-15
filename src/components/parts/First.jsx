import React from 'react'
import Title from '../Title'

function First() {

    const blocks = [
        {
            img: '/images/ui/цвет.png',
            name: 'Legrand'
        },
        {
            img: '/images/ui/цвет (2).png',
            name: 'Мастер'
        },
        {
            img: '/images/ui/цвет.png',
            name: 'Legrand'
        },
        {
            img: '/images/ui/цвет (2).png',
            name: 'Мастер'
        },
        {
            img: '/images/ui/цвет (1).png',
            name: 'ШторыКарнизы'
        },
        {
            img: '/images/ui/цвет.png',
            name: 'Legrand'
        },
        {
            img: '/images/ui/цвет (2).png',
            name: 'Мастер'
        },
        {
            img: '/images/ui/цвет (1).png',
            name: 'ШторыКарнизы'
        },
        {
            img: '/images/ui/цвет.png',
            name: 'Legrand'
        },
    ]

  return (
    <div className="flex flex-col justify-start items-center gap-5">
        <Title className='mt-[57px]'>Выберите бренд</Title>

        <div className='flex flex-row justify-center items-start flex-wrap gap-2'>
        {
            blocks.map((elem, index) => 
                <div className="flex flex-col justify-center items-center gap-1 shadow-custom w-[108px] h-[67px] rounded-[10px] " key={index}>
                    <img src={elem.img} alt="" />
                    <p className='text-[12px] font-sans'>{elem.name}</p>
                </div>
            )
        }
        </div>
    </div>
  )
}

export default First
