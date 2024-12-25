import React, { useEffect, useState } from 'react';
import Contacts from '../components/ui/Contacts';
import Location from '../components/ui/Location';
import Goback2 from '../components/ui/GoBack2';
import { useParams } from 'react-router-dom';
import axios from '../axios';

function DocumentPage() {
  const [fileUrl, setFileUrl] = useState(null); // Состояние для URL PDF-файла
  const { file } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Получаем URL файла
    axios
      .get(`/getFile/${file}`)
      .then((res) => res.data)
      .then((data) => {
        if (data?.url) {
          setFileUrl(data.url);
        }
      })
      .catch((err) => {
        console.error('Ошибка при загрузке файла:', err);
      });
  }, [file]);

  return (
    <div className="flex flex-col justify-between items-center mt-[14px]">
      <div className="w-full h-[500px] mb-5">
        {fileUrl ? (
          <iframe
            src={fileUrl}
            className="w-full h-full"
            frameBorder="0"
            title="PDF Document"
          ></iframe>
        ) : (
          <p>Загрузка документа...</p>
        )}
      </div>
      <Goback2 className="mt-5" />
      <Contacts className="mt-[10px]" />
      <Location className="mt-[10px] mb-5" />
    </div>
  );
}

export default DocumentPage;
