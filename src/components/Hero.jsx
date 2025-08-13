import { useGSAP } from '@gsap/react'
import React from 'react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'



const Hero = () => {

  const videoRef = useRef();

    //checking if the device is a mobile.
  const isMobile = useMediaQuery({maxWidth:767})//if it's less than 767px then it will be mobile. now below the gsap timeline where we have animated right and left leaves, and we'll decide where the animation for the video will start and end
  useGSAP(()=>{
    
    


    document.fonts.ready.then(() => {//to make sure that split text is called only when fonts are loaded on the web page first.
    const heroSplit = new SplitText('.title', {type: 'chars, words'})//this means that we will split the text inside of element that has (.title class)
    // into characters/ words, so that when page loads this ".title" element loads word by word or char by char.

    const paragraphSplit = new SplitText('.subtitle', {type: 'lines'})// similarly here we will split text according to lines, so that eventually when the page loads, this ".subtitle" element loads line by line
    
    //now we add animations to them
    heroSplit.chars.forEach((char)=>{char.classList.add('text-gradient')})//text-gradient is just a utility class we used.
    

    gsap.from(heroSplit.chars, {
      yPercent: 100,//move 100% of the element’s own height down, but since this is from, so animation will be from final to current state.
      duration: 1,
      ease: 'expo.inOut',
      stagger: 0.06, //here it means that stagger happens b/w each element of 1sec
      

    })

    gsap.from(paragraphSplit.lines, {
      opacity:0,
      yPercent:100,
      duration:1.7,
      ease: 'back.inOut',
      stagger: 0.06,
      delay:0.5 //delay: 1 means this animation will only start 1 sec after the prev i.e title's animation finishes 
    })
    })//fonts ready



    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top', //1st top for element, 2nd top for screen
        end:'bottom top',
        scrub: true //so that animation completely depends on scroll
      }
    }).to('.right-leaf',{y:200},0)//right leaf should go down, 3rd parameter is after how much time should the tween start
    .to('.left-leaf',{y:-200}, 0)//left leaf should go up 



    const startValue =isMobile?'top 50%':'center 60%'; //when element's center hits 60% of the viewport, truthy value is for mobile.
    const endValue =isMobile?'120% top':'bottom top'//when element's bottom hits top of the viewport, truthy value is for mobile.
    //when the top of the video goes past 120% past the top of the screen, end animation
    //for mobile applications it will be different cuz there's less space.
    
    //setting up timeline on the video.
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin:true, //this freezes the element in it's place while the animation is happening! 
      },

      

    })
    
    //when video is loaded only then call the animation 'to' on the video.
    videoRef.current.onloadedmetadata = ()=>{
      tl.to(videoRef.current,{
        currentTime: videoRef.current.duration, //change the current time of the video to the whole video's duration, over a period of time(duration)
        //that time could be set manually by providing another property duration: _ in sec, but that would just play the video automatically(for that you can remove start,end,scrub and pin from the scrollTrigger or the scrollTrigger entirely.)
        //and we want to play it according to scroll, since we are using the scrollTrigger for the animation, that time is decided by our scrolling speed from startValue to the endValue!!!
        //use ffmpeg to make the video smoother.it basically makes every single frame a keyframe.
      });
    };
    
  
  },[])//empty dependency array means that it will only run at the mount.


  return (

    <>
    <section id='hero' className='noisy '>
        <h1 className='title mb-[17px] whitespace-nowrap text-[clamp(12px,17vw,17vw)]'>MOJITO</h1> 
        {/* whitespace-nowrap stops the text in the element to go on the next line when the screen size shrinks, but text will then overflow out of the window
        so to fix that: text-[clamp(12px,5vw,20px)] 
        whitespace-nowrap → keeps it one line

        clamp(12px, 5vw, 20px) →

        Min font size → 12px

        Preferred → 5% of viewport width

        Max → 20px

        So as the screen shrinks, 5vw shrinks, and the text size follows along — staying within the min/max range.*/}
        <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />

        <div className='body mt-6'>
          <div className="content mt-4 pb-0">
            
            <div className="hidden md:block mt-6 mb-0"> {/*hidden on small devices,and displayed as block on medium devices! */}
                <p className='subtitle'>Cool. Crisp. Classic.</p>
                <p className="subtitle">Sip The Spirit <br /> of Summer!</p>  
            </div>

                {/* text-[min(5vw,20px)]
                If 5% of viewport width is less than 20px → use 5vw.

                If it’s greater than 20px → use 20px.

                */}
            <div className='view-cocktails md:mt-0  '>
              <p className="subtitle max-[639px]:hidden">Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.</p>
              <a className='subtitle' href="#cocktails">View Cocktails</a>
            </div>
          
          </div>
        </div>
    </section>
    <div className='video absolute inset-0'>
      {/* playInline hides all the controls like play pause mute timer, and preload loads the vid automatically when the page loads. 
      inset-0 means that element will take 0 space from all 4 sides of it's container, think of it like padding, but this time 
      In Tailwind, inset is just a shorthand for top, right, bottom, left — so to give different values for each side, you can’t do it in one inset-* class, you combine the individual top-*, right-*, bottom-*, left-* utilities.

      Example

      <div class="absolute top-2 right-4 bottom-6 left-8"></div>
      it means that div will take 2px distance from top, 4 from right 6from bottom and 8 from left of it's container.
      */}
      <video src="/videos/output.mp4" muted playsInline preload='auto' ref={videoRef}/>
    </div>
    </>
  )
}

export default Hero