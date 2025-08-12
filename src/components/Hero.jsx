import { useGSAP } from '@gsap/react'
import React from 'react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
const Hero = () => {
  useGSAP(()=>{
    
    document.fonts.ready.then(() => {//to make sure that split text is called only when fonts are loaded on the web page first.
    const heroSplit = new SplitText('.title', {type: 'chars, words'})//this means that we will split the text inside of element that has (.title class)
    // into characters/ words, so that when page loads this ".title" element loads word by word or char by char.

    const paragraphSplit = new SplitText('.subtitle', {type: 'lines'})// similarly here we will split text according to lines, so that eventually when the page loads, this ".subtitle" element loads line by line
    
    //now we add animations to them
    heroSplit.chars.forEach((char)=>{char.classList.add('text-gradient')})//text-gradient is just a utility class we used.
    

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1,
      ease: 'expo.inOut',
      stagger: 0.06 //here it means that stagger happens b/w each element of 1sec

    })

    gsap.from(paragraphSplit.lines, {
      opacity:0,
      yPercent:100,
      duration:1.7,
      ease: 'back.inOut',
      stagger: 0.06,
      delay:1 //delay: 1 means this animation will only start 1 sec after the prev i.e title's animation finishes 
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top', //1st top for element, 2nd top for screen
        end:'bottom top',
        scrub: true //so that animation completely depends on scroll
      }
    }).to('.right-leaf',{y:200},0)//right leaf should go down, 3rd parameter is after how much time should the tween start
    .to('.left-leaf',{y:-200}, 0)//left leaf should go up 
  })
  },[])//empty dependency array means that it will only run at the mount.
  return (

    <>
    <section id='hero' className='noisy'>
        <h1 className='title'>MOJITO</h1>
        <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />

        <div className='body md:absolute top-[50vh] left-[50vw] '>
          <div className="content">
            
            <div className="space-y-5 hidden md:block"> {/*hidden on small devices,and displayed as block on medium devices! */}
                <p className='subtitle'>Cool. Crisp. Classic.</p>
                <p className="subtitle">Sip The Spirit <br /> of Summer!</p>  
            </div>

            <div className='view-cocktails'>
              <p className="subtitle">Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.</p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          
          </div>
        </div>
    </section>
    </>
  )
}

export default Hero