import React, { useEffect, useState } from 'react';
import { useFilters } from '.././context/FiltersContext';
import axios from '../axios';
import Title from '../components/Title';
import Counter from '../components/ui/Counter';
import { useNavigate } from 'react-router-dom';
import GoBack2 from '../components/ui/GoBack2';
import Contacts from '../components/ui/Contacts';
import Location from '../components/ui/Location';

function Found() {
  const { filters } = useFilters();
  const [allItems, setAllItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  console.log(quantities);
  

  const handleQuantityChange = (index, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: newQuantity,
    }));
  };

  const calculateTotalSum = () => {
    return allItems.reduce((sum, item, index) => {
      const quantity = quantities[index] || 0;
      return sum + quantity * item.text;
    }, 0);
  };

  useEffect(() => {
    const additionalItems = JSON.parse(localStorage.getItem('selectedElements')) || [];
    console.log(filters);
    localStorage.setItem("page", 1)
  
    axios
      .get('/getJournals')
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          setAllItems([
            // Фильтруем элементы по типу и подтипу
            ...data.filter(
              (elem) => elem.type === filters?.type && elem.subType === filters?.subType && +elem.text >= filters.ot && +elem.text <= filters.do && elem?.colors?.includes(filters.color) && elem.files.includes(filters.document)
            ),
            // Добавляем те элементы, которые есть в additionalItems
            ...data.filter((elem) => additionalItems.includes(elem.title))
          ]);
        }
      });
  }, [filters]);

  const handleRemoveItem = (index) => {
    setAllItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const saveItems = () => {
    const existingItems = JSON.parse(localStorage.getItem('items')) || [];
    const newItems = allItems.map((item, index) => ({
      id: item._id,
      quantity: quantities[index] || 0,
    }));
    const mergedItems = [...existingItems, ...newItems];
    localStorage.setItem('items', JSON.stringify(mergedItems));
    navigate('/card')
    window.location.reload()
  };

  
  return (
    <div className="flex flex-col justify-start items-center mb-5">
      <Title className="mt-[57px]">Найдены товары</Title>
      {allItems.map((elem, index) => (
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
              price={+elem.text}
              onPriceChange={(newPrice) => handleQuantityChange(index, newPrice / elem.text)}
              onRemove={() => handleRemoveItem(index)}
              isMetr={elem.isMetr}
              initialCounter={elem.isMetr ? +filters?.metr.replace(',', '.') : 1}

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
        onClick={saveItems}
        className="w-[340px] h-[43px] rounded-[10px] bg-buttonGradient text-white border-none mt-5"
      >
        Выбрать
      </button>
      <GoBack2 className="mt-[20px]" />
      <Contacts className="mt-[10px]" />
      <Location className="mt-[10px]" />
    </div>
  );
}

export default Found;
