import React, { useState } from 'react';
import Title from '../Title';
import { useFilters } from '../../context/FiltersContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'

function Six({ onNext }) {
    const { filters, updateFilter } = useFilters();
    const navigate = useNavigate();
    const [files, setFiles] = useState()

    axios.get('/getFiles')
    .then(res => res.data)
    .then(data => {
        if(data){
            setFiles(data[0]?.files?.filter(elem => elem?.subType == filters?.subType))
        }

    })

    localStorage.setItem('page', '1')
    

    const options = [
        'Коллекция 1',
        'Коллекция 2',
        'Коллекция 3',
        'Коллекция 4'
    ];

    const handleSelect = (option) => {        
        updateFilter('document', option);
        onNext()
    };

    return (
        <div className="flex flex-col justify-start items-center mb-5">
            <Title className="mt-[57px]">Выберите коллекцию</Title>
            <div className="flex flex-col justify-center items-center gap-[10px] w-[330px] mt-5">
                {files && files.map((option, index) => (
                    <div className='flex w-[100%] justify-between items-center'>
                   <div
                   key={index}
                   onClick={() => handleSelect(option?.title)}
                   style={{
                       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                       backgroundColor: filters.document === option?.title ? '#93C5FD' : '#FFFFFF',
                       borderRadius: '10px',
                       width: '83%',
                       padding: '10px',
                       paddingLeft: '10px',
                       paddingRight: '8px',
                       display: 'flex',
                       flexDirection: 'row',
                       justifyContent: 'space-between',
                       cursor: 'pointer',
                   }}
               >
                   <span>{option?.title}</span>
               </div>
               <div className="w-[14%] flex justify-center items-center bg-white shadow-custom h-[45px] rounded-[10px]">
                   <img
                       onClick={() => {
                           localStorage.setItem('page', 5);
                           navigate(`/document/${option?._id}`);
                       }}
                       src="/images/icons/document.svg"
                       alt=""
                   />
               </div>
               </div>
                ))}
                
            </div>
        </div>
    );
}

export default Six;