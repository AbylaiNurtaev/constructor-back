import React, { useEffect, useState } from 'react';
import axios from '../axios';

function FileUpload() {
    const [selectedSubType, setSelectedSubType] = useState(''); // Выбранный подтип
    const [file, setFile] = useState(null); // Загружаемый файл
    const [title, setTitle] = useState(''); // Название файла
    const [isUploading, setIsUploading] = useState(false);

    // Получение журналов и извлечение уникальных подтипов
    const subTypes =[
            "Профили без управления",
            "Профили универсальные",
            "Профили с управлением для тяжелых штор",
            "Профили для ламбрекена",
            "Эксклюзивные профильные карнизы",
            "Кронштейны",
            "Металлические карнизы",
            "Деревянные круглые карнизы",
            "Кованые карнизы",
            "Подъемные системы",
            "Отвесы",
            "Багетные карнизы",
            "Эксклюзивные багетные карнизы",
            "Мини карнизы",
            "Пластмассовые шины",
            "Электрокарниз для раздвижных штор",
            "Электрокарниз для наклонных окон",
            "Подъемный электрокарниз",
            "Пульты",
            "Кнопки",
            "Крючки",
            "Держатели подхватов",
        ]

    // Обработчик загрузки файла
    const handleFileUpload = async () => {
        if (!selectedSubType || !file) {
            alert('Выберите подтип и загрузите файл!');
            return;
        }

        const formData = new FormData();
        formData.append('subType', selectedSubType);
        formData.append('document', file);
        formData.append('title', title);

        try {
            setIsUploading(true); 
            const response = await axios.post('/uploadFile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setIsUploading(false);
            if (response.data) {
                alert('Файл успешно загружен');
                setFile(null);
                setTitle('');
                setSelectedSubType('');
            }
        } catch (error) {
            setIsUploading(false);
            console.error('Ошибка при загрузке файла:', error);
            alert('Не удалось загрузить файл');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-6 mt-10">
            <h1 className="text-[30px] font-sans font-black text-primary">Загрузка файла</h1>
            
            {/* Выбор подтипа */}
            <select
                value={selectedSubType}
                onChange={(e) => setSelectedSubType(e.target.value)}
                className="w-[300px] h-[40px] rounded-[10px] border border-gray-300 px-3"
            >
                <option value="" disabled>Выберите подтип</option>
                {subTypes.map((subType, index) => (
                    <option key={index} value={subType}>{subType}</option>
                ))}
            </select>

            {/* Ввод названия файла */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название файла"
                className="shadow-custom w-[300px] h-[40px] rounded-[10px] outline-none px-[5px]"
            />

            {/* Загрузка файла */}
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-[300px] h-[40px] rounded-[10px] border border-gray-300 px-3"
            />

{isUploading && (
                <img src="https://i.gifer.com/VAyR.gif" alt="Загрузка..." width="100" />
            )}

            {/* Кнопка загрузки */}
            <button
                onClick={handleFileUpload}
                className="w-[300px] h-[40px] rounded-[10px] bg-primary text-white font-black"
            >
                Загрузить
            </button>
        </div>
    );
}

export default FileUpload;
