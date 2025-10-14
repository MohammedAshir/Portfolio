import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import NavigationDots from './NavigationDots';

gsap.registerPlugin(ScrollTrigger);

const HorizontalPortfolio = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      console.log('Mobile detection:', mobile, 'Width:', window.innerWidth);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current;
    
    if (!container || !sections || isMobile) return;

    const totalWidth = sections.scrollWidth;
    const viewportWidth = window.innerWidth;

    let ctx = gsap.context(() => {
      const scrollTween = gsap.to(sections, {
        x: () => -(totalWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth - viewportWidth}`,
          invalidateOnRefresh: true,
        }
      });

      const sectionElements = sections.querySelectorAll('.section');
      sectionElements.forEach((section, index) => {
        const content = section.querySelector('.section-content');
        if (content) {
          gsap.fromTo(content, 
            {
              opacity: 0,
              x: 100,
            },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                containerAnimation: scrollTween,
                start: 'left 80%',
                end: 'left 20%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });
    }, container);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <>
      <div ref={containerRef} className={isMobile ? '' : 'overflow-hidden'}>
        <div 
          ref={sectionsRef} 
          className={isMobile ? 'flex flex-col' : 'flex w-max h-screen'}
          style={!isMobile ? { willChange: 'transform' } : {}}
        >
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </div>
      {!isMobile && <NavigationDots />}
    </>
  );
};

export default HorizontalPortfolio;
