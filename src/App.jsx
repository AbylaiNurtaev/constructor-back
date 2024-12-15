
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage/>} path='/' index />
      </Routes>
    </div>
  );
}

export default App;
