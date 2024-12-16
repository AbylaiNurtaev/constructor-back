import React, { useState } from 'react';
import './Popup.css'; // Файл для стилизации

function Popup() {
  return (
    <div>
        <div className="popup-content flex flex-col justify-center items-center w-[340px] h-[213px] rounded-[10px] shadow-custom mt-[76px] gap-[15px]" style={{ background: 'rgba(41, 123, 255, 0.15)' }}>
          <h4 className='font-sans text-[17px] text-primary font-semibold'>Спасибо за заявку!</h4>
          <p className='font-sans text-[13px]'>Мы свяжемся с вами в ближайшее время.</p>
          <p className='font-sans text-[13px] w-[300px]'>Обратите внимание, что все заявки обрабатываются ежедневно с 10:00 до 20:00. Если вы отправили заявку после 20:00, мы свяжемся с Вами на следующий день.  </p>
        </div>
    </div>
  );
}

export default Popup;
