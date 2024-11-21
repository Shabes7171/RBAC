import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import PermissionManagement from './pages/PermissionManagement';
import './App.css';

function App() {
  return (
    <Router className="main">
      <div className="App">
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/permissions" element={<PermissionManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
