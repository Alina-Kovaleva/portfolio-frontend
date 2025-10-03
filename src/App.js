import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from './components';
import HomePage from './pages/HomePage';
import ProjectDetail from './pages/ProjectDetail';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
