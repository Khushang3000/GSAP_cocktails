import React from 'react'
import {ScrollTrigger, SplitText} from 'gsap/all';//these are plugins so we have to register them first.
import gsap from 'gsap';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';
import About from './components/About';
import Art from './components/Art'
import Menu from './components/Menu';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger, SplitText)//just so we only do this once and use the plugins all over our app, registering plugin inside app is a good choice.
const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
    </main>
  )
}

export default App