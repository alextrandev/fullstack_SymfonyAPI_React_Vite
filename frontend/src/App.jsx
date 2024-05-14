import './App.css';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/" element={<AddProject />} />
      </Routes>
    </Router>
  );
}