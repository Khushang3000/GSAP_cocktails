import React from 'react'
import {ScrollTrigger, SplitText} from 'gsap/all';//these are plugins so we have to register them first.
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger, SplitText)//just so we only do this once and use the plugins all over our app, registering plugin inside app is a good choice.
const App = () => {
  return (
    <div className='flex-center h-[100vh]'>
      <h1 className='text-3xl text-indigo-500 flex flex-center'>Hello Gsap!!!</h1>
    </div>
  )
}

export default App