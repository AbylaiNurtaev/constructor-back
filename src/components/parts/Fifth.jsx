import React from 'react'
import Title from '../Title'

function Fifth() {

  const blocks = [
    {
        img: '/images/ui/color_1.png',
        name: 'Зеленое золото'
    },
    {
        img: '/images/ui/color_2.png',
        name: 'Сл. кость'
    },
    {
        img: '/images/ui/color_3.png',
        name: 'Белый глянец'
    },
    {
        img: '/images/ui/color_3.png',
        name: 'Белый глянец'
    },
    {
        img: '/images/ui/color_2.png',
        name: 'Сл. кость'
    },
    {
        img: '/images/ui/color_1.png',
        name: 'Зеленое золото'
    },
    {
        img: '/images/ui/color_1.png',
        name: 'Зеленое золото'
    },
    {
        img: '/images/ui/color_2.png',
        name: 'Сл. кость'
    },
    {
        img: '/images/ui/color_3.png',
        name: 'Белый глянец'
    },
]


  return (
    <div className="flex flex-col justify-start items-center mb-5">
        <Title className='mt-[57px]'>Выберите коллекцию</Title>
        <div className='flex flex-row justify-center items-start flex-wrap gap-2 mt-5 w-[340px]'>
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

export default Fifth
