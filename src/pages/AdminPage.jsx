import React, { useEffect, useState } from 'react'
import axios from '.././axios'
import { useNavigate } from 'react-router-dom'
import mongoose from 'mongoose'
function AdminPage() {
    const [auth, setAuth] = useState(false)

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    const [items, setItems] = useState()
    const [files, setFiles] = useState({});
    const [colors, setColors] = useState()

    const navigate = useNavigate()

    const checkPass = () => {
      if(login == "admin" && pass == '123'){
        setAuth(true)
        localStorage.setItem('authorized', true)
      }
    }

    const deleteArticle = (id) => {
      axios.post('/deleteJournal', {
          id
      })
      .then(res => res.data)
      .then(data => {
          if(data){
              alert('Успешно удален товар')
              setItems(prev => prev.filter(elem => elem._id !== id))
          }
      })
      .catch(err => alert('произошла ошибка'))
      
  }

    const deleteColor = (id) => {
      axios.post('/deleteColor', {
          id
      })
      .then(res => res.data)
      .then(data => {
          if(data){
              alert('Успешно удален товар')
              setColors(prev => prev.filter(elem => elem._id !== id))
          }
      })
      .catch(err => alert('произошла ошибка'))
      
  }

  const deleteFile = (id) => {
    console.log(id);
    
    axios
      .delete(`/deleteFile/${id}`)
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          alert('Файл успешно удален');
          setFiles((prev) => {
            const updated = { ...prev };
            for (const key in updated) {
              updated[key] = updated[key].filter((file) => file._id !== id);
            }
            return updated;
          });
        }
      })
      .catch(() => alert('Произошла ошибка при удалении файла'));
  };

    useEffect(() => {
      const isAuth = localStorage.getItem('authorized');
      if(isAuth){
        setAuth(true)
      }
      else{
        alert("Неверный логин или пароль")
      }

      axios.get('/getJournals')
      .then(res => res.data)
      .then(data => {
        if(data){
          setItems(data)
        }
      })

      axios.get('/getColors')
      .then(res => res.data)
      .then(data => {
        if(data){
          setColors(data)
        }
      })

      axios
      .get('/getFiles')
      .then((res) => res.data)
      .then((data) => {
        console.log("ФАЙЛЫ", data);
        
        if (data[0].files) {
          const groupedFiles = data[0].files.reduce((acc, file) => {
            acc[file.subType] = acc[file.subType] || [];
            acc[file.subType].push(file);
            return acc;
          }, {});
          setFiles(groupedFiles);
        }
      })
      .catch(() => alert('Ошибка при загрузке файлов'));
    }, [])

  return (
    <div className='flex flex-col justify-center items-center gap-4 mt-8'>
      <button className='w-[200px] h-[40px] rounded-[10px] bg-orange-300 text-white font-black cursor-pointer' onClick={() => window.open('https://docs.google.com/spreadsheets/d/1-gCiIaM8YQPBwkh-kbkm1oGRb7nkdEmXcFC2kWnUeeg/edit?gid=0#gid=0')}>Ткани</button>
      {
        auth ? 
        <div className='flex flex-col justify-center items-start'>
          <div className="flex flex-row  justify-between items-center w-[1000px]">
            <h1 className='text-[30px] font-sans font-black text-primary'>Управление товарами</h1>
            <button className='w-[200px] h-[40px] rounded-[10px] bg-primary text-white font-black'     onClick={() => {
              const newId = new mongoose.Types.ObjectId(); // Генерируем новый ObjectId
              window.open(`/adminController/${newId}`);
          }}>Добавить</button>
          </div>

          <div className="flex flex-col justify-start items-center w-[1000px] mt-10">
            {
              items && items.map((elem) => 
                <div className="flex justify-between items-center w-full mt-3 pb-5 border-b-[1px] border-red-200">
                  <p className='underline text-primary cursor-pointer' onClick={() => window.open(`/adminController/${elem._id}`)}>{elem.title}</p>
                  <p className='underline cursor-pointer' onClick={() => deleteArticle(elem._id)}>Удалить</p>
                </div>
              )
            }
          </div>

          {/*  ------------ >  ЦВЕТА */}

          <div className="flex justify-between items-center w-[1000px] mt-[200px]">
            <h1 className='text-[30px] font-sans font-black text-primary'>Управление цветами</h1>
            <button className='w-[200px] h-[40px] rounded-[10px] bg-primary text-white font-black'     onClick={() => {
        const newId = new mongoose.Types.ObjectId(); // Генерируем новый ObjectId
        window.open(`/colorController/${newId}`);
    }}>Добавить</button>
          </div>

          <div className="flex flex-col justify-start items-center w-[1000px] mt-10  mb-[100px]">
            {
              colors && colors.map((elem) => 
                <div className="flex justify-between items-center w-full mt-3 pb-5 border-b-[1px] border-red-200">
                  <p className='underline text-primary cursor-pointer' onClick={() => window.open(`/colorController/${elem._id}`)}>{elem.title}</p>
                  <p className='underline cursor-pointer' onClick={() => deleteColor(elem._id)}>Удалить</p>
                </div>
              )
            }
          </div>


          <div className="flex flex-col justify-start items-center w-[1000px] mt-20 mb-[200px]">
            <div className="flex flex-row justify-between items-center w-[1000px]">
              <h1 className="text-[30px] font-sans font-black text-primary">
                Управление файлами
              </h1>
              <button
                className="w-[200px] h-[40px] rounded-[10px] bg-primary text-white font-black mt-4"
                onClick={() => window.open('/fileUpload')}
              >
                Добавить файл
              </button>
            </div>
            {Object.entries(files).map(([subType, fileList]) => (
              <div
                key={subType}
                className="flex flex-col w-full mt-10 border-t-[1px] pt-4"
              >
                <h2 className="text-[20px] font-bold text-secondary">
                  {subType}
                </h2>
                {fileList.map((file) => (
                  <div
                    key={file._id}
                    className="flex justify-between items-center mt-3"
                  >
                    <p>{file.title}</p>
                    <button
                      className="text-red-500 underline"
                      onClick={() => deleteFile(file._id)}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>


          
        </div> : 
        <>
        
        <input type="text" placeholder='Логин' onChange={(e) => setLogin(e.target.value)} className='shadow-custom w-[223px] h-[40px] rounded-[10px] outline-none px-[5px]'/>
        <input type="password" placeholder='Пароль' onChange={(e) => setPass(e.target.value)} className='shadow-custom w-[223px] h-[40px] rounded-[10px] outline-none px-[5px]'/>
        <button
            type="submit"
            className="w-[223px] h-[43px] rounded-[10px] bg-buttonGradient text-white border-none mt-4"
            onClick={checkPass}
          >
            Войти
          </button>
        </>
      }
    </div>
  )
}

export default AdminPage
