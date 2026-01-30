import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/project/:id" element={isAuthenticated ? <ProjectDetail /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
