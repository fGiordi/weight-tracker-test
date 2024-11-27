import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<h1>Home Page</h1>}></Route>
      {/* TODO to implement login route and dashboard/landing page */}
     </Routes>
    </BrowserRouter>
  )
}

export default App
