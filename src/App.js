import logo from './logo.svg';
import './App.css';
import { HomeTamu } from './pages/HomeTamu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeAdmin } from './pages/HomeAdmin';
import { HomeResepsionis } from './pages/HomeResepsionis';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
    <div className="App">
      <div className='d-flex justify-content-center align-items-center'style={{height:'100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' Component={HomePage}/>
          <Route path='/login' Component={LoginPage}/>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
    </>
  );
}

export default App;
