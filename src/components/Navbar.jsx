import React from 'react'

import gsap from 'gsap'

import { navLinks } from '../constants'

import { useGSAP } from '@gsap/react'

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {

  useGSAP(()=>{
    //we creating a timeline, and in animation tweening means in-betweening, it's the process of generating images that go between keyframes
    const navTween = gsap.timeline({//we will be creating a gsap timeline which will be based of of a scroll trigger.
      scrollTrigger:{
        trigger: 'nav',
        start: 'bottom top', //start animation when 'bottom' of navbar reaches the 'top' of the viewport
        scrub: true,

      }
    })
    //this is the animation
    navTween.fromTo('nav',{//start from
      backgroundColor: 'transparent', 
    },{//to
      backgroundColor:'#00000050',//#000000 means black, 50 at the end means 30% in hexadecimal so 30% opacity
      backdropFilter: 'blur(10px)',
      duration: 1,
      ease: 'power1.inOut'
    }

    //SO ultimately, when the bottom of the navbar reaches the top of the viewport(scrollTrigger: start) start the fromTo animation on navTween
    //and the animation is turn 'from' a transparent background 'to' a dark blury background which will let us read the text(nav links) over the navbar, even tho it's showing on the top of other elements.
  
  
  )
  },[])

  return (
    <nav>
        <div>
            <a href="#home"  className='flex items-center gap-2'>
                <img src="/images/logo.png" alt="logo-png" />
                <p>Velvet Pour</p>
            </a>
            <ul>
                    {navLinks.map((element)=>(
                         <li key={element.id}><a href={`#${element.id}`}>{element.title}</a></li>
                    ))}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar