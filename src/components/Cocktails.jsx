import React from 'react'
import { cocktailLists } from '../constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


const Cocktails = () => {


    useGSAP(()=>{
        const parallaxTimeline = gsap.timeline({
            scrollTrigger:{
                trigger: '#cocktails', //trigger the #cocktails section.
                start: 'top 30%', //start when top of section reaches 30% of screen.
                end: 'bottom 80%', //end when section's bottom reaches 80% of the screen.
                scrub: true, //animate it on scroll

            }
        })


        parallaxTimeline.from('#c-left-leaf', {
            x: -100, //leaf goes on right.
            y: 100, //leaf goes down.
            //why were these two in reverse? cuz we used from! not to.
        }).from('#c-right-leaf',{
            x: 100,
            y: 100,
            // delay:0.4 this makes the right leaf animation occur 0.4 sec after the left-leaf finishes, but since we're using scrollTrigger it's of no use as it's overridden.
        },0)//this 0(3rd argument means that, right-leaf's animation will start WITH the left-leaf's animation!!!, if we didn't give this, then they'd start one after another)
            //or you could've also given '<'
    
    
        
            // If you want them to start at different scroll positions or offsets delay won't work as it's overridden by scrollTrigger, you have a few options:

            // 1️⃣ Use position parameters in the timeline
            // Instead of relying on delay, you can offset the start time of each tween using the position parameter:

            
            // parallaxTimeline
            // .from('#c-left-leaf', { x: -100, y: 100 })
            // .from('#c-right-leaf', { x: 100, y: 100 }, "+=0.5") // starts 0.5s after left leaf
            // Here "+=0.5" means “start 0.5 seconds after the previous tween ends” (still scroll-linked).

            // 2️⃣ Start them at the same time, but offset inside the scroll range
            // If you want both tweens in the same scroll range but starting at different scroll positions:

           
            // parallaxTimeline
            // .from('#c-left-leaf', { x: -100, y: 100 }, 0) // starts at timeline's beginning
            // .from('#c-right-leaf', { x: 100, y: 100 }, 0.3) // starts 0.3s later in the timeline
            // This way, you’re not depending on real-time delay, but on the timeline’s scrubbed progress.

            // 3️⃣ Use separate ScrollTriggers
            // If you truly want them to trigger at different scroll points in the page:

            
            // gsap.from('#c-left-leaf', {
            // scrollTrigger: {
            //     trigger: '#section',
            //     start: "top center"
            // },
            // x: -100,
            // y: 100
            // });

            // gsap.from('#c-right-leaf', {
            // scrollTrigger: {
            //     trigger: '#section',
            //     start: "top 60%" // triggers later while scrolling
            // },
            // x: 100,
            // y: 100
            // });
    
    },[])




  return (
    <>
    <section id='cocktails' className="noisy">
        <img src="/images/cocktail-left-leaf.png" alt="left-leaf" id='c-left-leaf' />
        <img src="/images/cocktail-right-leaf.png" alt="right-leaf" id='c-right-leaf' />


        <div className="list">
        <div className="popular">
            Most Popular Cocktails:

            <ul>
                {cocktailLists.map((cocktail)=>(
                    <li key={cocktail.name}>
                        <div className='md:me-28'>
                            {/* me-28 in Tailwind sets margin at the end of an element’s inline direction.
                            Inline direction = the direction in which text flows.

                            In most sites (English, Hindi, etc.), text flows left → right (LTR).

                            In some languages (Arabic, Hebrew), text flows right → left (RTL).

                            End of the inline direction = the side where the text flow stops.

                            LTR → right side is the “end”

                            RTL → left side is the “end”

                            So in Tailwind:

                            me-28 = "margin on the end side of the text flow" 
                            If your page is in English → me-28 = margin-right: 7rem
                            (english follows ltr(left to right) writing*/}

                            <h3>{cocktail.name}</h3>
                            <p>{cocktail.country} | {cocktail.detail}</p>

                        </div>
                        <span>-{cocktail.price}</span>
                        {/* here we are using cocktail too many times, so we could have just destructured it like .map(({name, country, detail, price})=>(...blah...blah...blah)) */}
                    </li>
                ))}
            </ul>
        </div>
        <div className="loved">
            Most Loved Mocktails:

            <ul>
                {cocktailLists.map(({name, country, detail, price})=>(
                    <li key={name}>
                        <div className=' me-28'>


                            <h3>{name}</h3>
                            <p>{country} | {detail}</p>

                        </div>
                        <span>-{price}</span>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    </section>
  </>
  )
}

export default Cocktails