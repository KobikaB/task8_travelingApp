import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
