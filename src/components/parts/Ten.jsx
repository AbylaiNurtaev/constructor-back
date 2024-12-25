import React, { useState } from 'react';
import Title from '../Title';
import { useFilters } from '../../context/FiltersContext';

function Ten() {
    const { filters, updateFilter } = useFilters();
    const [minPrice, setMinPrice] = useState(filters.ot || '');
    const [maxPrice, setMaxPrice] = useState(filters.do || '');

    const handleMinPriceChange = (e) => {
        const newMinPrice = e.target.value;
        setMinPrice(newMinPrice);
        updateFilter('ot', newMinPrice);
    };

    const handleMaxPriceChange = (e) => {
        const newMaxPrice = e.target.value;
        setMaxPrice(newMaxPrice);
        updateFilter('do', newMaxPrice);
    };

    return (
        <div className="flex flex-col justify-start items-center mb-5">
            <Title className='mt-[57px]'>Выберите стоимость</Title>
            <div className='flex flex-col justify-start items-start gap-[20px] w-[340px] mt-10'>
                <span>Введите значение</span>
                <div className="flex items-center justify-between w-full h-[40px]">
                    <span>от</span>
                    <input
                        type="text"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className='shadow-custom w-[123px] h-full rounded-[10px] outline-none px-[5px]'
                    />
                    <span>до</span>
                    <input
                        type="text"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className='shadow-custom w-[123px] h-full rounded-[10px] outline-none px-[5px]'
                    />
                </div>
            </div>
        </div>
    );
}

export default Ten;
