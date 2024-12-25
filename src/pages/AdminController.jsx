import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '.././axios'
import ColorsComponent from '../components/ui/ColorsComponent';

function AdminController() {
    const { id } = useParams()
    const [auth, setAuth] = useState(false)
    const [data, setData] = useState()
    const [title, setTitle] = useState('');
    const [par, setPar] = useState('');
    const [content, setContent] = useState('');
    const [isMetr, setIsMetr] = useState('')

    const [localFile, setLocalFile] = useState(null);

    const [avatarSrc, setAvatarSrc] = useState('');
    const [brand, setBrand] = useState()

    const categories = {
        "Профильные карнизы": [
            "Профили без управления",
            "Профили универсальные",
            "Профили с управлением для тяжелых штор",
            "Профили для ламбрекена",
            "Эксклюзивные профильные карнизы",
            "Кронштейны",
        ],
        "Круглые карнизы": [
            "Металлические карнизы",
            "Деревянные круглые карнизы",
            "Кованые карнизы",
        ],
        "Подъемные системы": [
            "Подъемные системы",
            "Отвесы",
        ],
        "Багетные карнизы": [
            "Багетные карнизы",
            "Эксклюзивные багетные карнизы",
        ],
        "Мини карнизы": ["Мини карнизы"],
        "Пластмассовые шины": ["Пластмассовые шины"],
        "Электрокарнизы": [
            "Электрокарниз для раздвижных штор",
            "Электрокарниз для наклонных окон",
            "Подъемный электрокарниз",
            "Пульты",
            "Кнопки",
        ],
        "Аксессуары": [
            "Крючки",
            "Держатели подхватов",
        ],
    };
    const [colors, setColors] = useState()

    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);

    const [selectedSubCategory, setSelectedSubCategory] = useState()
    const [isAdd, setIsAdd] = useState(false)
    const [alreadyColors, setAlreadyColors] = useState()

    const [collections, setCollections] = useState([])
    const [selectedCollections, setSelectedCollections] = useState()
    
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setSubcategories(categories[category] || []);
    };

    useEffect(() => {
        const isAuth = localStorage.getItem('authorized');
        if(isAuth){
          setAuth(true)
          if (isAuth && id !== 'new') {
            axios
                .get(`/getJournalById/${id}`)
                .then((res) => res.data)
                .then((data) => {
                    if (data) {
                        setTitle(data.title || '');
                        setPar(data.par || '');
                        setContent(data.text || ''); // Устанавливаем текст из статьи
                        setAvatarSrc(data.img || '/images/male-placeholder-image.jpeg');
                        setBrand(data.brand || '')
                        setSelectedCategory(data.type || "")
                        setSubcategories(categories[data.type] || []);
                        setSelectedSubCategory(data.subType || "");
                        setIsAdd(data.isAdd || false)
                        setIsMetr(data.isMetr || false)
                        setAlreadyColors(data.colors || '')
                        setSelectedCollections(data.files || [])
                    }
                })
                .catch((err) => console.log('Произошла ошибка'));
                axios.get('/getColorsNames')
                .then(res => res.data)
                .then(data => {
                    if(data){
                        setColors(data)
                    }
                })
        
        }
        }
        else{
          alert("Неверный логин или пароль")
        }
        

      }, [id])

      useEffect(() => {
        axios.get('/getFiles')
        .then(res => res.data)
        .then(data => setCollections(data[0]?.files?.filter(elem => elem.subType == selectedSubCategory))) 
      }, [selectedSubCategory])

      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setLocalFile(file); // Сохраняем локальный файл для отображения предпросмотра

        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', 'avatar');

        axios
            .post(`/uploadArticlePhoto/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                const { fileUrl } = res.data;
                setAvatarSrc(fileUrl); // Обновляем URL изображения
            })
            .catch((err) => console.log(err.message));
    };

    const sendInfo = () => {
        const dataToSend = {
            title,
            par,
            text: content, // Содержимое из редактора
            img: avatarSrc,
            type: selectedCategory,
            subType: selectedSubCategory,
            brand,
            isAdd,
            isMetr,
            colors: selectedColors,
            files: selectedCollections
        };
        console.log(dataToSend);
        
        if (id != 'new') {
            axios
                .post('/updateJournal', {
                    ...dataToSend,
                    id,
                })
                .then(() => alert('Данные сохранены!'))
                .catch(() => alert('Ошибка сохранения данных!'));
        } else {
            axios
                .post('/createJournal', {
                    ...dataToSend,
                })
                .then(() => alert('Данные сохранены!'))
                .catch(() => alert('Ошибка сохранения данных!'));
        }
    };
    const [selectedColors, setSelectedColors] = useState([]);

    // Функция для обновления состояния в родительском компоненте
    const handleColorsChange = (newColors) => {
        setSelectedColors(newColors); // Обновляем состояние
    };
    const handleCheckboxChange = (title) => {
        setSelectedCollections((prev = []) => { // Добавляем начальное значение по умолчанию
          if (prev.includes(title)) {
            // Удаляем элемент из массива, если он уже выбран
            return prev.filter((item) => item !== title);
          } else {
            // Добавляем элемент в массив, если он не выбран
            return [...prev, title];
          }
        });
      };

      console.log(selectedCollections);
      
      
    
  return (
    <div className='flex flex-col justify-center items-center mt-10 gap-4'>
        <label htmlFor="file-upload">
        <img
            src={localFile ? URL.createObjectURL(localFile) : avatarSrc || 'https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg'}
            alt="Avatar"
            style={{ border: '1px solid #1001' }}
            className='w-[200px] object-contain'
        />

        <div className="flex justify-center items-center gap-2 mt-2">

            <input id='isAdd' type="checkbox" checked={isAdd} onChange={(e) => setIsAdd(e.target.checked)} />
            <label htmlFor='isAdd'>Дополнительный товар</label>
        </div>

        </label>
        <input
            type="file"
            id="file-upload"
            onChange={handleFileUpload}
            accept="image/*"
            hidden={true}
        />

        <input
            className="w-[250px] h-[40px] shadow-custom rounded-[10px] p-3"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок"
        />
        <textarea
            className="w-[250px] h-[400px] shadow-custom rounded-[10px] p-3"
            type="text"
            value={par}
            onChange={(e) => setPar(e.target.value)}
            placeholder="Подзаголовок"
        />
        <input
            className="w-[250px] h-[40px] shadow-custom rounded-[10px] p-3"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Цена в рублях"
        />


        {
            isAdd != true &&
        <>
        <div className="flex justify-center items-center gap-2 mt-2">
            <input id='isMetr' type="checkbox" checked={isMetr} onChange={(e) => setIsMetr(e.target.checked)} />
            <label htmlFor='isMetr'>Цена считается за метр</label>
        </div>
        <div className="flex flex-col justify-start items-start gap-2">
            <h3 className='font-sans text-[20px] font-black mt-2'>Цвета в наличии:</h3>
            <ColorsComponent
                colors={colors ? colors.map(elem => elem.title) : []}
                alreadyColors={alreadyColors}
                onColorsChange={handleColorsChange} // Передаем callback
            />
        </div>
        <h3 className='mt-5 w-full'>Бренд</h3>
        <select onChange={(e) => setBrand(e.target.value)} className='w-full border-sky-300 border-[1px] p-4 rounded-[10px]'>
            <option value="Windeco" selected>Windeco</option>
            <option value="Уют">Уют</option>
            <option value="Air Motor">Air Motor</option>
            <option value="Arttex">Arttex</option>
            <option value="Шик">Шик</option>
            <option value="Olexdeco">Olexdeco</option>
            <option value="Onviz">Onviz</option>
        </select>


        <h3 className='mt-3 w-full'>Тип товара</h3>
        <select
                className="w-full border-sky-300 border-[1px] p-4 rounded-[10px]"
                onChange={handleCategoryChange}
                value={selectedCategory}
            >
                <option value="" disabled>
                    Выберите тип товара
                </option>
                {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {subcategories.length > 0 && (
                <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)} className="w-full border-sky-300 border-[1px] p-4 rounded-[10px] mt-4">
                    <option value="" disabled selected>
                        Выберите подтип
                    </option>
                    {subcategories.map((subcategory, index) => (
                        <option key={index} value={subcategory}>
                            {subcategory}
                        </option>
                    ))}
                </select>
            )}
            <h3 className='mt-3 w-full flex flex-col justify-start items-start'>Коллекции которые подлежать товару</h3>
            {
                selectedSubCategory && selectedSubCategory.length >= 0 && collections &&
                collections.map((elem) => 
                    <div className='flex justify-center items-center w-[400px] gap-2'>
                        <input type="checkbox"  onChange={() => handleCheckboxChange(elem.title)}
                        checked={selectedCollections?.includes(elem?.title)}  />
                        <p>{elem.title}</p>
                    </div>
                )
                
            }
            </>
        }
        <button className="w-[250px] h-[40px] rounded-[10px] shadow-custom text-white font-black bg-primary mb-10" onClick={sendInfo}>Сохранить</button>


        

                
    </div>
  )
}

export default AdminController
