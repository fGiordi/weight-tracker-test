import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { Login } from './pages/login';

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      {/* TODO to implement login route and dashboard/landing page */}
     </Routes>
    </BrowserRouter>
  )
}

export default App
