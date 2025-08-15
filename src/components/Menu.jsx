'use Client'; //This component should be rendered entirely on the client side, not on the server. cuz we're using state below
//if we render the page on server the state will get lost but on client's side his state will remain his own.


import React from 'react'
import Cocktails from './Cocktails'
import { allCocktails } from '../constants'
import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive'

import Hero from './Hero';

const Menu = () => {

    
    const isMobile = useMediaQuery({maxWidth:636})
    const contentRef = useRef();
    const [currentIndex, setcurrentIndex] = useState(0);
    
    useGSAP(()=>{
        const timeline = gsap.timeline({
            scrollTrigger:{
                trigger:'#menu',
                start: 'top center',
                end:'bottom top',
                scrub:true,
                
            },
           
            
            
        }).to('#m-right-leaf',{
            
            x:-2200
        }).to('#m-left-leaf',{
            x:2200
        })

        gsap.timeline({
            scrollTrigger:{
                trigger:'.cocktail-tabs',
                start:isMobile?'top 20%':'top 9%',
                end:'bottom top',
                scrub: true,
                pin: true
            }
        }).to('.cocktail-tabs',{
            duration: 2
        })
    })
    useGSAP(()=>{
        gsap.fromTo('#title',{opacity:0},{opacity:1,duration:1});
        gsap.fromTo('.cocktail img',{opacity: 0, xPercent: -100},{xPercent:0, opacity:1, duration:1, ease: 'power1.inOut'});
        gsap.fromTo('.details h2',{yPercent:100, opacity:0}, {yPercent:0, opacity:100, ease: 'power1.inOut'})
        gsap.fromTo('.details p',{yPercent:100, opacity:0}, {yPercent:0, opacity:100, ease: 'power1.inOut'})
    },[currentIndex])//useGsap just turned into componentDidChange, it is componentDidMount already too btw.

    const totalCocktails = allCocktails.length
    function goToSlide(index){
        const newIndex = (index + totalCocktails) % totalCocktails;
        setcurrentIndex(newIndex);
    }

    const getCocktailAt = (indexOffset)=>{
        return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
    } 

    const currentCocktail = getCocktailAt(0);
    const prevcocktail = getCocktailAt(-1);
    const nextcocktail = getCocktailAt(1);

  return (
    <section id="menu" className='z-1' aria-labelledby='menu-heading'>
    

    <img src="/images/apple.png" className='hidden md:block w-[200px] h-[200px] left-[-12vw] z-0' alt="left-leaf" id='m-left-leaf' />
    <img src="/images/mango.png" className='hidden md:block w-[200px] h-[200px] z-0 right-[-12vw]' alt="right-leaf" id='m-right-leaf' />


    <h2 id="menu-heading" className='sr-only'>Cocktail Menu</h2>
    
    <nav className="cocktail-tabs mb-[5vh]" aria-label='Cocktail Navigation'>
        {allCocktails.map((cocktail,index)=>{
            const isActive = index === currentIndex; //if index === current index then isActive is true otherwise it's false.
        // JUST A REMINDER:
        //     useEffect(() => {
        //     async function fetchData() {
        //     const res = await fetch("/api/data");
        //     const data = await res.json();
        //     console.log(data);
        // }

        // fetchData(); // call it right after defining
        // }, []);
        // Why not just async () => {} in useEffect?
        // If you try:

        // useEffect(async () => {
        // const res = await fetch("/api/data");
        // }, []);
        // React warns you because async functions return a Promise, and React doesn’t know how to handle a Promise as a cleanup function.
            
        return(
                <button key={cocktail.id} className={`${isActive?'text-white border-white':'text-white/50 border-white/50'}`} onClick={()=>{goToSlide(index) /*since we can't directly pass the argument inside onclick as the function will then be called, also instead of this gotoslides function we coulda directly called the setCurrentIndex, but we'll implement arrows as well so...*/}}>
                    {cocktail.name}
                </button>
            )
        
        })}
    </nav>


    <div className="content ">
        <div className="arrows">
            <button className='text-left' onClick={()=>goToSlide(currentIndex-1)}>
                <span>{prevcocktail.name}</span>
                <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden='true'/>
            </button>
            <button className='text-right' onClick={()=>goToSlide(currentIndex+1)}>
                <span>{nextcocktail.name}</span>
                <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden='true'/>
            </button>
        </div>

        <div className="cocktail">
            <img src={currentCocktail.image} className='object-contain' />
        </div>
        <div className="recipe">
            <div ref={contentRef} className='info'>
                <p>Recipe: </p>
                <p id='title'>{currentCocktail.name} </p>
            </div>
            <div className='details'>
                <h2>{currentCocktail.title}</h2>
                <p>{currentCocktail.description}</p>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Menu