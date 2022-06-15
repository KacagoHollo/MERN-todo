import './App.css';
// import { NumberPresenter } from './components/NumberPresenter';
// import NumberModifier from './components/NumberModifier';
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Callback from './pages/Callback';


function App() {
  // const {value, decrement, increment} = useCounter();


  return (
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/callback' element={<Callback />} />
        </Routes>
      </div>
  );
}

export default App;
