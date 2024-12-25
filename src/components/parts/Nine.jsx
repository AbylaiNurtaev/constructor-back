import React, { useState } from 'react';
import Title from '../Title';
import { useFilters } from '../../context/FiltersContext';

function Nine() {
    const { filters, updateFilter } = useFilters();
    const [value, setValue] = useState(filters.metr || '');

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        updateFilter('metr', newValue);
    };

    const handleOptionClick = (option) => {
        setValue(option);
        updateFilter('metr', option);
    };

    const options = ['1,2', '2,2', '3,2', '4', '4,2'];

    return (
        <div className="flex flex-col justify-start items-center mb-5">
            <Title className='mt-[57px]'>Выберите метраж</Title>
            <div className='flex justify-start items-center gap-[10px] w-[340px] h-[38px] mt-10'>
                <span>Введите значение</span>
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    className='shadow-custom w-[122px] h-full rounded-[10px] outline-none px-[5px]'
                />
                <span>м.</span>
            </div>

            <div className="mt-10">
                <span className='font-sans text-[13px]'>или выберите из списка</span>
                <div className="flex justify-between items-center mt-5 gap-2">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`flex justify-center items-center shadow-custom w-[61px] h-[38px] rounded-[10px] cursor-pointer font-sans ${
                                value === option ? 'bg-blue-100' : 'bg-white'
                            }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Nine;
