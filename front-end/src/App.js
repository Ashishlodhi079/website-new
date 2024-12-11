import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
<Routes>
   <Route element={<PrivateComponent />} >
  <Route path='/' element={<Products />} />
  <Route path='/add' element={<Addproduct />} />
  <Route path='/update/:id' element={<UpdateProduct />} />
  <Route path='/logout' element={<h1>Logout</h1>} />
  <Route path='/profile' element={<h1>Profile</h1>} />
</Route>
  <Route path='/signup' element={<Signup />} />
  <Route path='/login' element={<Login />} />
</Routes>
</BrowserRouter>
<Footer />
    </div>
  );
}

export default App;
