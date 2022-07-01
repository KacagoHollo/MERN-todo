import './App.css';
// import { NumberPresenter } from './components/NumberPresenter';
// import NumberModifier from './components/NumberModifier';
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Callback from './pages/Callback';
import Protected from './components/Protected';
import Register from './pages/Register';


function App() {
  // const {value, decrement, increment} = useCounter();


  return (
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={(
            <Protected> 
              <Profile />
            </Protected>
          )}/>
          <Route path='/callback' element={<Callback />} />
          <Route path='/register' element={
            <Protected>
              <Register />
            </Protected>
          } />
        </Routes>
      </div>
  );
}

export default App;
