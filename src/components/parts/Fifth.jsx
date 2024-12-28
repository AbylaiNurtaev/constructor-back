import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { useFilters } from '../../context/FiltersContext';
import axios from '../../axios'
function Fifth({onNext}) {

  const [blocks, setBlocks] = useState()

const { filters, updateFilter } = useFilters();
const [selected, setSelected] = useState("")
useEffect(() => {
    setSelected(filters?.type)
    axios.get('/getColors')
    .then(res => res.data)
    .then(data => {
        if(data){
            setBlocks(data)
        }
    })


  }, [filters])

  const handleSelect = (brand) => {
    updateFilter('color', brand); // Обновляем выбранный бренд
    onNext()
  };

  return (
    <div className="flex flex-col justify-start items-center mb-5">
        <Title className='mt-[57px]'>Выберите цвет</Title>
        <div className='flex flex-row justify-center items-start flex-wrap gap-2 mt-5 w-[340px]'>
        {   blocks ?
            blocks.map((elem, index) => 
                <div className={`flex flex-col justify-center items-center gap-1 shadow-custom w-[108px] h-[67px] rounded-[10px] ${filters?.color?.includes(elem.title) ? 'bg-blue-200' : ''}` } key={index} onClick={() => handleSelect(elem.title)}>
                    <img src={elem.img} className='w-[108px] h-[40px] object-cover rounded-[10px]' alt="" />
                    <p className='text-[12px] font-sans'>{elem.title}</p>
                </div>
            ) : <><img className='w-[100px]' src="https://i.pinimg.com/originals/91/91/85/919185a188c5cc25655fadfbc9a4a2b4.gif" alt="" /></>
        }
        </div>
    </div>
  )
}

export default Fifth
