import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/StoryScroll.module.css';

gsap.registerPlugin(ScrollTrigger);

const StoryScrollPage = () => {
  const mainRef = useRef(null);
  const townRef = useRef(null);
  const walkingNightRef = useRef(null);
  const nightRef = useRef(null);
  const boy2Ref = useRef(null);
  const eyeRef = useRef(null);
  const classroomRef = useRef(null);

  useEffect(() => {
    const sections = [
      { ref: townRef, id: 'town', color: '#87CEEB' },
      { ref: walkingNightRef, id: 'walkingnight', color: '#4682B4' },
      { ref: nightRef, id: 'night', color: '#000080' },
      { ref: boy2Ref, id: 'boy2', color: '#DDA0DD' },
      { ref: eyeRef, id: 'eye', color: '#FFD700' },
      { ref: classroomRef, id: 'classroom', color: '#F0E68C' },
    ];

    gsap.set(mainRef.current, { /* perspective: '1000px', */ backgroundColor: '#FFFFFF' });

    sections.forEach((section, index) => {
      if (section.ref.current) {
        gsap.fromTo(
          section.ref.current,
          { autoAlpha: 0, y: 100 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section.ref.current,
              start: 'top center+=200',
              end: 'center center',
              toggleActions: 'play none none reverse',
              scrub: 1,
              // markers: true,
            },
          }
        );
      }
    });

    gsap.to(mainRef.current, {
      backgroundColor: '#FFFFFF',
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        // markers: true,
      }
    });

  }, []);

  return (
    <div ref={mainRef} className={styles.container}>
      <section ref={townRef} id="town" className={`${styles.section} ${styles.town}`}>
        <img src="/images/townlogo.png" alt="Town Logo" className={styles.townLogoOverlay} />
        {/* Content removed */}
      </section>
      <section ref={walkingNightRef} id="walkingnight" className={`${styles.section} ${styles.walkingNight}`}>
        {/* Content removed */}
      </section>
      <section ref={nightRef} id="night" className={`${styles.section} ${styles.night}`}>
        {/* Content removed */}
      </section>
      <section ref={boy2Ref} id="boy2" className={`${styles.section} ${styles.boy2}`}>
        {/* Content removed */}
      </section>
      <section ref={eyeRef} id="eye" className={`${styles.section} ${styles.eye}`}>
        {/* Content removed */}
      </section>
      <section ref={classroomRef} id="classroom" className={`${styles.section} ${styles.classroom}`}>
        {/* Content removed */}
      </section>
    </div>
  );
};

export default StoryScrollPage; 