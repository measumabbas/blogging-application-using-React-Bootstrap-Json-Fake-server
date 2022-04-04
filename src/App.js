import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AddEditBlog from './pages/AddEditBlog';
import Blog from './pages/Blog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (

    <BrowserRouter>
      <div>
        <ToastContainer/>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addEditBlog' element={<AddEditBlog/>}/>
          <Route path='/addEditBlog/:id' element={<AddEditBlog/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
