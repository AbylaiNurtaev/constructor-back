import React from 'react';
import Title from '../Title';
import { useFilters } from '../../context/FiltersContext';

function First() {
    const { filters, updateFilter } = useFilters();

    const blocks = [
        { img: '/images/ui/windeco.jpg', name: 'Windeco' },
        { img: '/images/ui/UYT.png', name: 'Уют' },
        { img: '/images/ui/Air_motor.png', name: 'Air Motor' },
        { img: '/images/ui/Arttex.png', name: 'Arttex' },
        { img: '/images/ui/SHIK.jpg', name: 'Шик' },
        { img: '/images/ui/OLEXDECO.jpg', name: 'Olexdeco' },
        { img: '/images/ui/Onviz.svg', name: 'Onviz' },
    ];

    const handleSelect = (brand) => {
        updateFilter('brand', brand); // Обновляем выбранный бренд
    };

    return (
        <div className="flex flex-col justify-start items-center gap-5">
            <Title className="mt-[57px]">Выберите бренд</Title>

            <div className="flex flex-row justify-center items-start flex-wrap gap-2 w-[340px]">
                {blocks.map((elem, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(elem.name)}
                        className={`flex flex-col justify-center items-center gap-1 shadow-custom w-[108px] h-[67px] rounded-[10px] cursor-pointer ${
                            filters.brand === elem.name ? 'border-2 border-blue-500' : ''
                        }`}
                    >
                        <img
                            src={elem.img}
                            className="object-contain h-[30px] w-[80%]"
                            alt={elem.name}
                        />
                        <p className="text-[12px] font-sans">{elem.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default First;
