
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import DocumentPage from './pages/DocumentPage';
import Order from './pages/Order';
import ThanksPage from './pages/ThanksPage';

function App() {
  return (
    <div className="App flex justify-center items-center">
      <Routes>
        <Route element={<HomePage/>} path='/' index />
        <Route element={<CalculatorPage/>} path='/calculator' />
        <Route element={<DocumentPage/>} path='/document'></Route>
        <Route element={<Order/>} path='/order'></Route>
        <Route element={<ThanksPage/>} path='/thanks'></Route>
      </Routes>
    </div>
  );
}

export default App;
