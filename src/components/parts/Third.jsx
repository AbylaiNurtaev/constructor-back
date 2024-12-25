import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { useFilters } from '../../context/FiltersContext';

function Third() {

  const { filters, updateFilter } = useFilters();

  const categories = {
    "Профильные карнизы": [
        "Профили без управления",
        "Профили универсальные",
        "Профили с управлением для тяжелых штор",
        "Профили для ламбрекена",
        "Эксклюзивные профильные карнизы",
        "Кронштейны",
    ],
    "Круглые карнизы": [
        "Металлические карнизы",
        "Деревянные круглые карнизы",
        "Кованые карнизы",
    ],
    "Подъемные системы": [
        "Подъемные системы",
        "Отвесы",
    ],
    "Багетные карнизы": [
        "Багетные карнизы",
        "Эксклюзивные багетные карнизы",
    ],
    "Мини карнизы": ["Мини карнизы"],
    "Пластмассовые шины": ["Пластмассовые шины"],
    "Электрокарнизы": [
        "Электрокарниз для раздвижных штор",
        "Электрокарниз для наклонных окон",
        "Подъемный электрокарниз",
        "Пульты",
        "Кнопки",
    ],
    "Аксессуары": [
        "Крючки",
        "Держатели подхватов",
    ],
};

  const [selected, setSelected] = useState("")

  useEffect(() => {
    setSelected(filters?.type)

  }, [filters])

  const handleSelect = (brand) => {
    updateFilter('subType', brand); // Обновляем выбранный бренд
  };


  return (
    <div className="flex flex-col justify-start items-center mb-5">
        <Title className='mt-[57px]'>Выберите категорию товара</Title>
        <div className='flex flex-col justify-center items-center gap-[10px] w-[330px] mt-5'>
          {
            ( categories && selected.length >= 1 ) ? categories[selected].map((elem) => 
              <div
    style={{
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: filters.subType === elem ? '#93C5FD' : 'white', // bg-blue-300 или белый
        borderRadius: '10px',
        width: '100%',
        padding: '10px 0 10px 10px',
        cursor: 'pointer',
    }}
    onClick={() => handleSelect(elem)}
>
    {elem}
</div>

            ) : <p>Выберите основной тип</p>
          }
        </div>
    </div>
  )
}

export default Third
