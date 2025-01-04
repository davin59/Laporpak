import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./App.css";

// Import Pages
import Home from "./pages/Home";
import Laporan from './pages/Laporan';
import Notfound from './pages/Notfound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Laporan' element={<Laporan/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </Router>
  );
};

export default App;
