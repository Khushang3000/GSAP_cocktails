import React from 'react'
import { openingHours, socials } from '../constants'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

const Contact = () => {

    useGSAP(()=>{
        const titleSplit = SplitText.create('#contact h2',{type:'words'})//split it into a type of words, so array will be of words, i.e "where","to","find","us"
        
        const timeline = gsap.timeline({
            scrollTrigger:{
                trigger:'#contact',
                start: 'top center'
            
            },
            ease: 'power1.inOut'
            
            
        })
        timeline.from(titleSplit.words,{
            opacity:1,
            yPercent:100,
            stagger:0.02,
        
        }).from('#contact h3, #contact p',{
            opacity:1,
            yPercent:100,
            stagger:0.02,
        })

        const timeline2 = gsap.timeline({
            scrollTrigger:{
                trigger:'#contact',
                start: 'top center',
                scrub:true,
                
            },
           
            
            
        }).to('#f-right-leaf',{
            rotate:60,
            y:20
        }).to('#f-left-leaf',{
            rotate:60,
            y:20
        },0)
    
    
    })//we can also omit the dependency array if we're gonna send it empty anyways

  return (
    <footer id="contact">
        <img src="images/footer-right-leaf.png" alt="leaf-right" id='f-right-leaf'/>
        <img src="images/footer-left-leaf.png" alt="leaf-left" id='f-left-leaf'/>
        
        <div className="content">
            <h2>Where To Find Us</h2>
            
            <div>
                <h3>Visit Our Bar</h3>
                <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
            </div>
            
            <div>
                <h3>Contact Us</h3>
                <p>(555) 987-6543</p>
                <p>hello@jsmcocktail.com</p>
            </div>

            <div>
                <h3>Open EveryDay</h3>
                {openingHours.map((time)=>(
                    <p key={time.day}>
                        {time.day}:{time.time}
                    </p>
                ))}
            </div>

            <div>
                <h3>Socials</h3>
                <div className="flex-center gap-5">
                    {socials.map((social)=>(
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                            <img src={`${social.icon}`} alt="" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Contact