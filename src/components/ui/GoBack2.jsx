import React from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

function Goback2({ className }) {
    const navigate = useNavigate()

  return (
    <div className={cn('flex flex-row justify-center items-center w-[340px] h-[45px] gap-[5px]', className)}>
        <div
        onClick={() => navigate('/calculator')}
        className={cn(
          'flex flex-row justify-center items-center w-[270px] h-[45px] rounded-[10px] shadow-custom bg-white gap-2'
        )}
        >
        <span className="text-gray font-light">Вернуться в меню</span>
        <img src="/images/icons/goback.svg" alt="Go back" />
        </div>
        <div onClick={() => navigate('/card')} className='shadow-custom flex justify-center items-center w-[64px] rounded-[10px] h-full bg-white'><img className='w-6' src="/images/icons/Card.svg" alt="" /></div>
    </div>
  );
}

export default Goback2;
