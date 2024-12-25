import React from 'react';
import Title from '../Title';
import { useFilters } from '../../context/FiltersContext';

function Second() {
    // Достаем фильтры и функцию обновления из контекста
    const { filters, updateFilter } = useFilters();

    // Список опций
    const options = [
        'Профильные карнизы',
        'Круглые карнизы',
        'Подъемные системы',
        'Багетные карнизы',
        'Мини карнизы',
        'Пластмассовые карнизы',
        'Электрокарнизы',
        'Аксессуары'
    ];

    // Обработка выбора опции
    const handleSelect = (option) => {
        updateFilter('type', option); // Обновляем фильтр в контексте
    };

    return (
        <div className="flex flex-col justify-start items-center mb-5">
            {/* Заголовок */}
            <Title className="mt-[57px]">Выберите тип карниза</Title>
            
            {/* Список опций */}
            <div className="flex flex-col justify-center items-center gap-[10px] w-[330px] mt-5">
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(option)}
                        style={{
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            backgroundColor: filters?.type === option ? '#93C5FD' : '#FFFFFF', // Цвет фона
                            color: filters?.type === option ? '#000000' : '#333333',          // Цвет текста
                            borderRadius: '10px',
                            width: '100%',
                            padding: '10px',
                            paddingLeft: '10px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease' // Анимация смены цвета
                        }}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Second;
