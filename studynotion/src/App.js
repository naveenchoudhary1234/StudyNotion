import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './common/Navbar';
import Login from './pages/Login';
import Signup from "./pages/Signup";
function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
