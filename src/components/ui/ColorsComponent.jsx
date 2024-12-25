import React, { useState, useEffect } from 'react';

const ColorsComponent = ({ colors, alreadyColors, onColorsChange }) => {
    // Локальное состояние для отслеживания выбранных цветов
    const [selectedColors, setSelectedColors] = useState([]);

    // Синхронизация с родителем при изменении alreadyColors
    useEffect(() => {
        setSelectedColors(alreadyColors || []); // Обновляем локальное состояние
    }, [alreadyColors]); // Зависимость от alreadyColors

    // Функция для обработки изменения инпута
    const handleCheckboxChange = (color) => {
        setSelectedColors((prevSelected) => {
            let updatedColors;

            if (prevSelected.includes(color)) {
                updatedColors = prevSelected.filter((item) => item !== color); // Убираем цвет
            } else {
                updatedColors = [...prevSelected, color]; // Добавляем цвет
            }

            onColorsChange(updatedColors); // Передаем новые данные родителю
            return updatedColors;
        });
    };

    useEffect(() => {
        onColorsChange(selectedColors); // Синхронизация с родителем
    }, [selectedColors]); // Обновление, когда меняется локальное состояние

    console.log('selectedColors:', selectedColors);

    return (
        <div className="flex flex-col justify-start items-start gap-2">
            {colors &&
                colors.map((elem, index) => (
                    <div
                        key={index}
                        className="flex justify-start items-center gap-2"
                    >
                        <input
                            type="checkbox"
                            checked={selectedColors.includes(elem)} // Проверяем, выбран ли цвет
                            onChange={() => handleCheckboxChange(elem)} // Обработка клика
                        />
                        <p>{elem}</p>
                    </div>
                ))}
        </div>
    );
};

export default ColorsComponent;
