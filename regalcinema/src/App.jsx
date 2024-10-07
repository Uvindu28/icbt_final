import { useEffect } from 'react';
import './App.css';
import Hero from './Components/Hero';
import AOS from "aos";
import "aos/dist/aos.css";
import Header from './Components/Header';
import MoviesSlide from './Components/MoviesSlide';
import CommingMovie from './Components/CommingMovie';
import Offers from './Components/Offers';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';
import { AuthProvider } from './utility/AuthContext.jsx';

function App() {

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <>
      <main>
        <Header/>
        <Hero/>
        <MoviesSlide/>
        <CommingMovie/>
        <Offers/>
        <AboutUs/>
        <Footer/>
      </main>
      
    </>
  );
}

export default App;
