import React, { useEffect, useState } from 'react';
import Title from '../Title';
import { useFilters } from '../../context/FiltersContext';
import axios from '../../axios'

function Seven() {
    const { filters, updateFilter } = useFilters();

    useEffect(() => {
        axios.get('/getJournals')
        .then(res => res.data)
        .then(data => {
            if(data){
                setElements(data.filter(elem => elem.isAdd == true))
            }
        })
    }, [])
    const [elements, setElements] = useState()

    const handleSelect = (elementName) => {
        // Получаем текущие элементы из localStorage, если они есть
        const savedElements = JSON.parse(localStorage.getItem('selectedElements')) || [];
    
        // Добавляем выбранный элемент в массив
        if (!savedElements.includes(elementName)) {
            savedElements.push(elementName);
        }
    
        // Сохраняем обновленный массив в localStorage
        localStorage.setItem('selectedElements', JSON.stringify(savedElements));
    
        // Обновляем фильтр с выбранным элементом
        updateFilter('element', elementName);
    };
    

    return (
        <div className="flex flex-col justify-start items-center mb-5">
            <Title className="mt-[57px]">Выберите элемент</Title>
            <div className="flex flex-col justify-center items-center gap-[10px] w-[340px] mt-5">
                {elements && elements.map((element, index) => (
                    <div
                        key={index}
                        className="flex justify-center items-center w-full h-[50px] gap-2 cursor-pointer"
                        onClick={() => handleSelect(element.title)}
                    >
                        <img className="w-[77px] rounded-[5px]" src={element.img} alt={element.title} />
                        <div className={`flex justify-center items-center font-sans text-[13px] bg-white shadow-custom rounded-[10px] h-full w-[201px]`} style={element.title == filters.element ? {background: "#93C5FD"}: {}}>
                            {element.title}
                        </div>
                        <div className="flex justify-center items-center font-sans text-[13px] bg-white shadow-custom rounded-[10px] h-full w-[57px]">
                            {element.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Seven;
