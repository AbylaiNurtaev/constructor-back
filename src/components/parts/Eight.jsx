import React, { useState } from 'react';
import Title from '../Title';
import { useFilters } from '../../context/FiltersContext';

function Eight() {
    const { filters, updateFilter } = useFilters();
    const [value, setValue] = useState(filters.elemCount || '');

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        updateFilter('elemCount', newValue);
    };

    return (
        <div className="flex flex-col justify-start items-center mb-5">
            <Title className='mt-[57px]'>Выберите количество</Title>
            <div className='flex justify-start items-center gap-[10px] w-[340px] h-[38px] mt-10'>
                <span>Введите значение</span>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className='shadow-custom w-[122px] h-full rounded-[10px] outline-none px-[5px]'
                />
                <span>шт.</span>
            </div>
        </div>
    );
}

export default Eight;
