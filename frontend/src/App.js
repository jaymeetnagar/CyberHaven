import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import LoginPage from './Pages/login&registration/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './Components/AdminLogin';
import CartComponent from './Components/CartComponent';
import CartPage from './Pages/Cart/CartPage';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path='/' exact Component={HomePage}></Route>
        <Route path='/login' Component={LoginPage}></Route>
        <Route path='/admin-login' Component={AdminLogin}></Route>
        <Route path="/cart" component={CartPage} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
