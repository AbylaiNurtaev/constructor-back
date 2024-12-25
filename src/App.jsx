
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import DocumentPage from './pages/DocumentPage';
import Order from './pages/Order';
import ThanksPage from './pages/ThanksPage';
import AdminPage from './pages/AdminPage';
import AdminController from './pages/AdminController';
import { FiltersProvider } from './context/FiltersContext';
import Found from './pages/Found';
import Card from './pages/Card';
import ColorController from './pages/ColorController';
import FileUpload from './pages/FileUpload';

function App() {
  return (
    <FiltersProvider>
      <div className="App flex justify-center items-center">
        <Routes>
          <Route element={<HomePage/>} path='/' index />
          <Route element={<CalculatorPage/>} path='/calculator' />
          <Route element={<DocumentPage/>} path='/document/:file'></Route>
          <Route element={<Order/>} path='/order'></Route>
          <Route element={<ThanksPage/>} path='/thanks'></Route>
          <Route element={<AdminPage/>} path='/admin'></Route>
          <Route element={<Found/>} path='/found'></Route>
          <Route element={<Card/>} path='/card'></Route>
          <Route element={<FileUpload/>} path='/fileUpload'></Route>
          <Route element={<AdminController/>} path='/adminController/:id'></Route>
          <Route element={<ColorController/>} path='/colorController/:id'></Route>
        </Routes>
      </div>
    </FiltersProvider>
  );
}

export default App;
