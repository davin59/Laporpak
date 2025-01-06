import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./App.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from './pages/Notfound';
import Register from './pages/Register';


import NewLaporan from './pages/NewLaporan';
import useAuthentication from './Utils/useAuthentication';


const App = () => {
  const isAuthenticated = useAuthentication();
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/newlaporan' element={isAuthenticated ? <NewLaporan/> :  <Login/>}/>
        <Route path='*' element={<Notfound/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App;
