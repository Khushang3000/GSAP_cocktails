import React from 'react'
import { featureLists, goodLists } from '../constants'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const Art = () => {

  const isMobile = useMediaQuery({maxWidth:767})

  useGSAP(()=>{
    const start = isMobile?'top top':'top -1%'; //top top means as soon as element's top hit's top of viewport(REMEMBER, viewport is NOT the whole page!, it is ONLY what we see CURRENTLY ON THE WINDOW), so the animation will start as soon as the element is visible


    const maskTimeline = gsap.timeline({
      
      scrollTrigger: {
        trigger: '#art',
        start,//start(property):start(isMobile)
        end:'bottom center',//end when bottom of section reaches center of the screen
        scrub:1.5,//smooth scroll control, i.e scrub animation will follow but with a little bit of delay(1.5)
        pin: true //this keeps the art section fixed in place.

      }
    })

    maskTimeline.to('.will-fade',{
      opacity: 0,
      stagger: 0.2,//fade them one-by-one
      ease: 'power1.inOut'
    }).to('.masked-img',{
      scale:1.4,
      maskPosition: 'center',
      maskSize: '400%',
      duration:1,
      ease: 'power1.inOut'

    }).to('.cocktail-img',{
      yPercent:-70, //y won't work cuz GSAP always treats y as additive to whatever is currently set, so depending on your transform origin and rendering
      //we had translate-y-1/2 in index.css already.
      //and we already had transform property on .cocktail-img, 
      //but yPercent is independent of previous transform values as it's calculated fresh against the element's size, not current transform values.
    }).to('#masked-content',{
      opacity:1,
      duration:1,
      ease:'power1.inOut',
      yPercent:-5 //here there's no translate in y direction atleast.
    })
  },[])

  return (
    <div id='art' className='z-1'>
        <div className="container mx-auto h-full pt-10 bottom-0">
            <h2 className='will-fade z-1'>The Art</h2>

            <div className="content bottom-0">
              <ul className="space-y-4 will-fade">
                {goodLists.map((feature, index)=>(
                  <li key={index} className='flex items-center gap-2'>
                    <img src="/images/check.png" alt="check" />
                    <p>{feature}</p>
                  </li>
                  // items-center

                  // Aligns flex items along the cross axis (perpendicular to the main axis).

                  // For default flex-row, the cross axis is vertical, so items-center vertically centers the items inside the flex container.
                ))}
              </ul>

              <div className="cocktail-img">
                {/* abs-center: absolute center. */}
                <img src="/images/under-img.jpg" alt="cocktail" className='abs-center masked-img size-full object-contain' />
                {/*object-contain The image scales down to fit inside the container, keeping its aspect ratio. See the masked img class too! */}
              </div>

{/* we have a rotate property + x&y properties, we could create something like a pendulum anima  */}
              <ul className="space-y-6 will-fade">
                {featureLists.map((feature, index)=>(
                  <li key={index} className='flex items-center justify-start gap-2'>
                    <img src="/images/check.png" alt="check" />
                    <p className='md:w-fit w-60'>{feature}</p>
                  </li>
                  ))}
              </ul>
            </div>
            <div className="masked-container">
              <h2 className="will-fade mt-50vh ">Sip-Worthy Perfection</h2>
              <div id="masked-content">
                <h3>Made with Craft, Poured with Passion</h3>
                <p>This isn't just a drink. It's a carefully crafted moment made just for you.</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Art