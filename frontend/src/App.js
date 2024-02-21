import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import LoginPage from './Pages/login&registration/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './Components/AdminLogin';
import ProductPage from './Components/ProductPage';
import ProductCard from './Components/ProductCard';


function App() {
  return (
    {/* <BrowserRouter>

      <NavbarComponent />
     
      <Routes>
        <Route path='/' exact component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/admin-login' component={AdminLogin} />

      </Routes>

      <FooterComponent />

    </BrowserRouter> */}
  );
}

export default App;
