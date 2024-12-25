import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '.././axios'

function ColorController() {
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

    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);

    const [selectedSubCategory, setSelectedSubCategory] = useState()
    const [isAdd, setIsAdd] = useState(false)
    
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
                .get(`/getColorById/${id}`)
                .then((res) => res.data)
                .then((data) => {
                    console.log("data", data);
                    
                    if (data) {
                        setTitle(data.title || '');
                        setAvatarSrc(data.img || '/images/male-placeholder-image.jpeg');
                    }
                })
                .catch((err) => console.log('Произошла ошибка'));
        }
        }
        else{
          alert("Неверный логин или пароль")
        }
        

      }, [id])

      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setLocalFile(file); // Сохраняем локальный файл для отображения предпросмотра

        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', 'avatar');

        axios
            .post(`/uploadColor/${id}`, formData, {
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
            img: avatarSrc,
        };
        console.log(dataToSend);
        
        if (id != 'new') {
            axios
                .post('/updateColor', {
                    ...dataToSend,
                    id,
                })
                .then(() => alert('Данные сохранены!'))
                .catch(() => alert('Ошибка сохранения данных!'));
        } else {
            axios
                .post('/createColor', {
                    ...dataToSend,
                })
                .then(() => alert('Данные сохранены!'))
                .catch(() => alert('Ошибка сохранения данных!'));
        }
    };

  return (
    <div className='flex flex-col justify-center items-center mt-10 gap-4'>
        <label htmlFor="file-upload">
        <img
            src={localFile ? URL.createObjectURL(localFile) : avatarSrc || 'https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg'}
            alt="Avatar"
            style={{ border: '1px solid #1001' }}
            className='w-[200px] object-contain'
        />
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
        <button className="w-[250px] h-[40px] rounded-[10px] shadow-custom text-white font-black bg-primary mb-10" onClick={sendInfo}>Сохранить</button>     
    </div>
  )
}

export default ColorController
