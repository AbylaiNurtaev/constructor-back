
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage/>} path='/' index />
        <Route element={<CalculatorPage/>} path='/calculator' />
      </Routes>
    </div>
  );
}

export default App;
