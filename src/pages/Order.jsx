import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import Location from '../components/ui/Location';
import Contacts from '../components/ui/Contacts';
import Goback2 from '../components/ui/GoBack2';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'


function Order() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    accepted: true,
  });

  const [highlightEmpty, setHighlightEmpty] = useState({
    name: false,
    phone: false,
    email: false,
    accepted: false,
  });
  const [totalPrices, setTotalPrices] = useState({});




  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем пустые поля и галочку
    const emptyFields = {
      // name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      // email: !formData.email.trim(),
      accepted: !formData.accepted,
    };

    setHighlightEmpty(emptyFields);

    // Если все поля заполнены, отправляем форму
    const isValid = !Object.values(emptyFields).includes(true);
    if (isValid) {
      sendMessageToTelegram()
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



  const [summa, setSumma] = useState(0)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem('items')) || [];
     

    axios.get('/getJournals').then((res) => {
      const data = res.data || [];
      const itemsWithCounts = data
        .filter((item) => existingItems.some((saved) => saved.id === item._id))
        .map((item) => {
          const savedItem = existingItems.find((saved) => saved.id === item._id);
          return { ...item, count: savedItem.quantity || 1 };
        });

        console.log(itemsWithCounts);
        
        let sum = 0
        for(let i = 0 ; i < itemsWithCounts.length; i++){
          sum += +itemsWithCounts[i].text * +itemsWithCounts[i].count
        }
        setSumma(sum)
        
      setCartItems(itemsWithCounts);
    });
  }, []);

  async function sendMessageToTelegram() {
    let formattedCartItems = cartItems.map((item, index) => 
      `${index + 1}) ${item.title} (${item.subType}) - ${item.text} руб. x ${item.count} ${item.isMetr ? "м" : "шт."}.`
    ).join('\n');
    let message = `Имя заказчика: ${formData.name} \n Контакты: ${formData.phone}, \n Почта: ${formData.email} \n Товары: \n ${formattedCartItems} \n Итоговая сумма: ${summa}`
    const BOT_TOKEN = '7667605650:AAGF_kvebMsGd17u-5jpKs5rd9yzQiytprg'; // Замените на ваш токен
    const CHAT_ID = '5056024242'; // Замените на ваш chat_id
    const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              chat_id: CHAT_ID,
              text: message,
          }),
      });

      const data = await response.json();

      if (data.ok) {
          console.log('Сообщение отправлено:', data);
      } else {
          console.error('Ошибка при отправке сообщения:', data);
      }
  } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
  }
}

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
          <p className="font-sans text-[13px]">{cartItems.length} шт.</p>
        </div>
        <div className="w-full flex justify-between items-start">
          <p className="font-sans text-[15px] font-semibold mt-[10px]">Сумма:</p>
          <p className="font-sans text-[15px] font-semibold mt-[10px]">
  {Math.round(summa)} ₽
</p>

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
            id='access'
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
