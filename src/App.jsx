
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import DocumentPage from './pages/DocumentPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage/>} path='/' index />
        <Route element={<CalculatorPage/>} path='/calculator' />
        <Route element={<DocumentPage/>} path='/document'></Route>
      </Routes>
    </div>
  );
}

export default App;
