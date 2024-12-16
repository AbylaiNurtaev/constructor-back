import React, { useState } from 'react';
import Title from '../components/Title';
import Location from '../components/ui/Location';
import Contacts from '../components/ui/Contacts';
import Goback2 from '../components/ui/GoBack2';
import { useNavigate } from 'react-router-dom';

function Order() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    accepted: false,
  });

  const [highlightEmpty, setHighlightEmpty] = useState({
    name: false,
    phone: false,
    email: false,
    accepted: false,
  });

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем пустые поля и галочку
    const emptyFields = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      email: !formData.email.trim(),
      accepted: !formData.accepted,
    };

    setHighlightEmpty(emptyFields);

    // Если все поля заполнены, отправляем форму
    const isValid = !Object.values(emptyFields).includes(true);
    if (isValid) {
      navigate('/thanks')
      // Очистка формы
      setFormData({
        name: '',
        phone: '',
        email: '',
        accepted: false,
      });
      setHighlightEmpty({
        name: false,
        phone: false,
        email: false,
        accepted: false,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Убираем подсветку ошибок, если пользователь начал заполнять поле
    if (highlightEmpty[name]) {
      setHighlightEmpty({
        ...highlightEmpty,
        [name]: false,
      });
    }
  };

  return (
    <div>
      <Title className="mt-[57px]">Оставить заявку</Title>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col justify-center items-start w-[340px]"
      >
        {/* Товаров и Сумма */}
        <div className="w-full flex justify-between items-start">
          <p className="font-sans text-[13px]">Товаров:</p>
          <p className="font-sans text-[13px]">3 шт.</p>
        </div>
        <div className="w-full flex justify-between items-start">
          <p className="font-sans text-[15px] font-semibold mt-[10px]">Сумма:</p>
          <p className="font-sans text-[15px] font-semibold mt-[10px]">78 600 ₽</p>
        </div>

        {/* Поле ФИО */}
        <input
          placeholder="ФИО"
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className={`w-[340px] h-[49px] rounded-[10px] mt-[20px] outline-none px-3 ${
            highlightEmpty.name ? 'border-red-500' : 'border-[#297BFF99]'
          }`}
          style={{
            border: highlightEmpty.name ? '1px solid red' : '1px solid #297BFF99',
          }}
        />

        {/* Поле Телефон */}
        <input
          placeholder="Телефон"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="text"
          className={`w-[340px] h-[49px] rounded-[10px] mt-[20px] outline-none px-3 ${
            highlightEmpty.phone ? 'border-red-500' : 'border-[#297BFF99]'
          }`}
          style={{
            border: highlightEmpty.phone ? '1px solid red' : '1px solid #297BFF99',
          }}
        />

        {/* Поле Почта */}
        <input
          placeholder="Почта"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="text"
          className={`w-[340px] h-[49px] rounded-[10px] mt-[20px] outline-none px-3 ${
            highlightEmpty.email ? 'border-red-500' : 'border-[#297BFF99]'
          }`}
          style={{
            border: highlightEmpty.email ? '1px solid red' : '1px solid #297BFF99',
          }}
        />

        {/* Галочка согласия */}
        <div className="flex flex-row justify-center items-center gap-2.5 mt-5">
          <input
            type="checkbox"
            name="accepted"
            checked={formData.accepted}
            onChange={handleChange}
            className={`w-[18px] ${
              highlightEmpty.accepted ? 'border-red-500' : 'border-[#297BFF99]'
            }`}
            style={{
              outline: highlightEmpty.accepted ? '2px solid red' : 'none',
            }}
          />
          <label
            htmlFor="access"
            className="leading-[120%] text-[13px] font-sans"
          >
            Я согласен(а) с{' '}
            <span className="text-primary">
              Политикой по обработке персональных данных
            </span>
          </label>
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          className="w-[340px] h-[43px] rounded-[10px] bg-buttonGradient text-white border-none mt-10"
        >
          Отправить
        </button>

        {/* Остальные компоненты */}
        <Goback2 className="mt-[50px]" />
        <Contacts className="mt-2.5"></Contacts>
        <Location className="mt-2.5"></Location>
      </form>
    </div>
  );
}

export default Order;
