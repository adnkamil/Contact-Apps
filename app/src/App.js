import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux'
import store from './store/index'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar/>
        <Home />
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
