import logo from './logo.svg';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path='/' exact Component={LoginPage}></Route>
        <Route path='/login' Component={LoginPage}></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>

  );
}

export default App;
