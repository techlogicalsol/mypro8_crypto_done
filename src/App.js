import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import CoinGraph from './Components/CoinGraph';
import Contact from './Components/Contact';
import Home from './Components/Home';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="CoinGraph/:id" element={<CoinGraph />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
