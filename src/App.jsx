import React from 'react'
import {ScrollTrigger, SplitText} from 'gsap/all';//these are plugins so we have to register them first.
import gsap from 'gsap';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';



gsap.registerPlugin(ScrollTrigger, SplitText)//just so we only do this once and use the plugins all over our app, registering plugin inside app is a good choice.
const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
    </main>
  )
}

export default App