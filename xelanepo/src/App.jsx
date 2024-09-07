import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from './components/Home.jsx'; 
import { Search } from './components/Search/Search.jsx';
import { Profile } from './components/Profile/Profile.jsx';

import { ErrorPage } from './components/ErrorPage.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;