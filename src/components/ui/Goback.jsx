import React from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

function Goback({ className }) {
    const navigate = useNavigate()

  return (
    <div
    onClick={() => navigate('/')}
      className={cn(
        'flex flex-row justify-center items-center w-[340px] h-[45px] rounded-[10px] shadow-custom bg-white gap-2',
        className // Передаем `className` как отдельный аргумент
      )}
    >
      <span className="text-gray font-light">Вернуться в меню</span>
      <img src="/images/icons/goback.svg" alt="Go back" />
    </div>
  );
}

export default Goback;
