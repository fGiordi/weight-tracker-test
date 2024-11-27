import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import { Login } from './pages/login';
import { Main } from './pages/main'
import { Toaster } from "@/components/ui/toaster"
import { useAuthStore } from './store/useAuthStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
     </Routes>
     <Toaster />
    </BrowserRouter>
  )
}

export default App
