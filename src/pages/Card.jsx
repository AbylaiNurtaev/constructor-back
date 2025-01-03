import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import Counter from '../components/ui/Counter';
import { useNavigate } from 'react-router-dom';
import GoBack2 from '../components/ui/GoBack2';
import Contacts from '../components/ui/Contacts';
import Location from '../components/ui/Location';
import axios from '../axios';

function Card() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState({});
  
  const navigate = useNavigate();

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
      setCartItems(itemsWithCounts);
    });
  }, []);

  const saveCartToLocalStorage = (items) => {
    const savedItems = items.map((item) => ({
      id: item._id,
      quantity: item.count,
    }));
    localStorage.setItem('items', JSON.stringify(savedItems));
  };

  const handlePriceChange = (index, newPrice) => {
    setTotalPrices((prev) => ({
      ...prev,
      [index]: newPrice,
    }));
  };

  const handleCountChange = (index, newCount) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) =>
        i === index ? { ...item, count: newCount } : item
      );
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const calculateTotalSum = () => {
    return Object.values(totalPrices).reduce((sum, price) => sum + price, 0);
  };

  return (
    <div className="flex flex-col justify-start items-center mb-5">
      <Title className="mt-[57px]">Корзина</Title>
      {cartItems.map((elem, index) => (
        <div
          className="flex justify-center items-start gap-[10px] mt-[30px] pb-[20px]"
          style={{ borderBottom: '0.5px solid #DFDFDF' }}
          key={index}
        >
          <img
            src={elem.img}
            alt="img"
            className="w-[120px] rounded-[5px] h-[120px] object-cover"
          />
          <div
            className="flex flex-col justify-between items-between w-[190px]"
            style={{ minHeight: '120px' }}
          >
            <div>
              <p className="font-sans text-[13px]">{elem.title}</p>
              <p className="font-sans text-[13px]">{elem.par}</p>
            </div>
            <Counter
              price={parseFloat(elem.text)}
              initialCounter={elem.count}
              onPriceChange={(newPrice) => handlePriceChange(index, newPrice)}
              onCountChange={(newCount) => handleCountChange(index, newCount)}
              onRemove={() => handleRemoveItem(index)}
              isMetr={elem.isMetr}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center w-[320px] mt-5">
        <p className="font-semibold text-[13px] font-sans">Итого:</p>
        <p className="font-semibold text-[13px] font-sans">
  {Math.round(calculateTotalSum())} руб.
</p>

      </div>

      <button
        onClick={() => navigate('/order')}
        className="w-[340px] h-[43px] rounded-[10px] bg-buttonGradient text-white border-none mt-5"
      >
        Перейти к оформлению
      </button>
      <GoBack2 className="mt-[20px]" />
      <Contacts className="mt-[10px]" />
      <Location className="mt-[10px]" />
    </div>
  );
}

export default Card;
