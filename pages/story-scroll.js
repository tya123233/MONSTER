import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/StoryScroll.module.css';
import GhostedTitle from '../components/GhostedTitle';
import Section1Title from '../components/Section1Title';
import Section2Title from '../components/Section2Title';
import Section3Title from '../components/Section3Title';
import TypewriterText from '../components/TypewriterText';

// 确保在客户端环境中注册插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const StoryScrollPage = () => {
  const mainRef = useRef(null);
  const townRef = useRef(null);
  const walkingNightRef = useRef(null);
  const boy2Ref = useRef(null);
  const skyRef = useRef(null);
  const eyeRef = useRef(null);
  const endRef = useRef(null);
  const textSectionRef = useRef(null);
  const textSection2Ref = useRef(null);
  const grassSoundRef = useRef(null);
  const beginSoundRef = useRef(null);
  const speak1SoundRef = useRef(null);
  const speak2SoundRef = useRef(null);
  const starsSoundRef = useRef(null);
  const dabitSoundRef = useRef(null);
  
  const playedRefs = useRef({
    audio: false,
    begin: false,
    speak1: false,
    speak2: false,
    stars: false,
    dabit: false,
  });

  const [isClient, setIsClient] = useState(false);
  const scrollTriggersRef = useRef([]);
  const fadeOutTimersRef = useRef([]);

  const storyText = "I was born in Lauren Town, a small place that most people have never heard of. The streets were simple, the houses ordinary, but it was home to me. My childhood wasn't filled with anything extraordinary - just the honest joy of small-town life. I remember playing in the creek with friends, our shoes muddy and our hearts light. The neighbors knew each other by name, offering help without being asked.\n\nWhat I miss most were those quiet evenings when I would walk to the empty field at the edge of town. I'd lie on my back in the grass and look up at the stars. No phone, no distractions. Just me and the night sky. The stars seemed brighter there than anywhere else I've been since. I didn't need to think deep thoughts or make wishes - I just needed to be there, breathing and existing under that vast sky. It made me feel both small and somehow important at the same time. Those moments taught me that sometimes silence is enough. Even now, years later and miles away, I close my eyes and return to that field whenever life becomes too complicated. Lauren Town wasn't perfect, but it was real, and that field under the stars remains the place where I first felt truly at peace.";
  const storyText2 = "Then school began, and something shifted. Nothing dramatic—no single moment I could point to—but a gradual change, like water slowly rising around ankles before you notice you're standing in a stream. The hallways seemed longer than they were. Conversations felt like scripts I hadn't rehearsed. I watched myself participate in classes, answer questions correctly, walk home with others, all while feeling like I was observing from behind glass.\n\nEach morning, I'd wake and put on the expected version of myself like a uniform. My grades remained consistent. Teachers still nodded approvingly. Yet something was eroding beneath the surface, the way termites might work through wood while the paint stays intact. I couldn't name what had changed. The stars in the field still shone, but they no longer seemed to speak to me. I was being carried along by something—not violently, but steadily, like a leaf caught in a current too gentle to fight but too persistent to escape. The structure of days, the rhythm of bells, the unwritten rules—they were consuming me quietly, efficiently, without anyone noticing, least of all myself.";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mainRef.current) return;

    const addScrollTrigger = (config) => {
      const trigger = ScrollTrigger.create(config);
      scrollTriggersRef.current.push(trigger);
      return trigger;
    };

    const addFadeOutTimer = (timerId) => {
      fadeOutTimersRef.current.push(timerId);
    };

    const playAudio = (audioRef, playedType, volume = 1, startDuration = 0, fadeOutAfter = 0) => {
      if (audioRef?.current && !playedRefs.current[playedType]) {
        audioRef.current.volume = volume;
        audioRef.current.currentTime = startDuration;
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              playedRefs.current[playedType] = true;
              if (fadeOutAfter > 0) {
                const timerId = setTimeout(() => {
                  fadeOutAudio(audioRef, 1000); // 1 second fade out
                }, fadeOutAfter);
                addFadeOutTimer(timerId);
              }
            })
            .catch(error => {
              console.warn('自动播放被阻止，等待用户交互:', error, audioRef.current?.src);
              const unlockAudio = () => {
                if (!playedRefs.current[playedType] && audioRef?.current) {
                  audioRef.current.play()
                    .then(() => {
                      playedRefs.current[playedType] = true;
                      if (fadeOutAfter > 0) {
                        const timerId = setTimeout(() => {
                          fadeOutAudio(audioRef, 1000);
                        }, fadeOutAfter);
                        addFadeOutTimer(timerId);
                      }
                    })
                    .catch(err => console.error('播放失败:', err));
                }
                document.removeEventListener('touchstart', unlockAudio);
                document.removeEventListener('click', unlockAudio);
              };
              document.addEventListener('touchstart', unlockAudio, { once: true });
              document.addEventListener('click', unlockAudio, { once: true });
            });
        }
      }
    };

    const fadeOutAudio = (audioRef, duration, callback) => {
      if (!audioRef?.current || audioRef.current.paused) {
        if (typeof callback === 'function') callback();
        return;
      }

      const fadeOutTotalDuration = duration || 1000;
      const intervalTime = 50;
      const steps = fadeOutTotalDuration / intervalTime;
      const volumeStep = audioRef.current.volume / steps;
      let currentVolume = audioRef.current.volume;

      const timerId = setInterval(() => {
        currentVolume -= volumeStep;
        if (currentVolume <= 0.02) {
          currentVolume = 0;
          clearInterval(timerId);
          if (audioRef?.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 1; 
          }
          if (typeof callback === 'function') callback();
        } else {
          if (audioRef?.current) {
             audioRef.current.volume = currentVolume;
          }
        }
      }, intervalTime);
      addFadeOutTimer(timerId);
    };

    gsap.set(mainRef.current, { backgroundColor: '#FFFFFF' });

    const beginTimerId = setTimeout(() => playAudio(beginSoundRef, 'begin', 0.52), 300);
    addFadeOutTimer(beginTimerId);

    if (textSectionRef.current && speak1SoundRef.current) {
      addScrollTrigger({
        trigger: textSectionRef.current,
        start: 'top 60%',
        end: 'bottom top',
        onEnter: () => playAudio(speak1SoundRef, 'speak1', 1),
      });
    }

    if (walkingNightRef.current && grassSoundRef.current) {
       addScrollTrigger({
        trigger: walkingNightRef.current,
        start: 'top center+=100',
        end: 'bottom top',
        onEnter: () => playAudio(grassSoundRef, 'audio', 1, 0, 2500),
      });
    }

    if (skyRef.current && starsSoundRef.current) {
      addScrollTrigger({
        trigger: skyRef.current,
        start: 'top center',
        end: 'bottom top',
        onEnter: () => playAudio(starsSoundRef, 'stars', 1, 0, 2500),
      });
    }

    const section2Container = document.querySelector(`.${styles.section2TitleContainer}`);
    if (section2Container && dabitSoundRef?.current) {
      addScrollTrigger({
        trigger: section2Container,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          let speak1IsPlaying = speak1SoundRef?.current && !speak1SoundRef.current.paused && speak1SoundRef.current.volume > 0;
          let begin1IsPlaying = beginSoundRef?.current && !beginSoundRef.current.paused && beginSoundRef.current.volume > 0;

          const playDabitAndSpeak2 = () => {
            if (dabitSoundRef?.current && !playedRefs.current.dabit) {
              dabitSoundRef.current.volume = 0;
              dabitSoundRef.current.currentTime = 0;
              dabitSoundRef.current.play()
                .then(() => {
                  playedRefs.current.dabit = true;
                  
                  let currentVolume = 0;
                  const targetVolume = 0.7;
                  const fadeInDuration = 2000;
                  const intervalTime = 50;
                  const steps = fadeInDuration / intervalTime;
                  const volumeStep = targetVolume / steps;
                  
                  const fadeInTimerId = setInterval(() => {
                    currentVolume += volumeStep;
                    if (currentVolume >= targetVolume) {
                      currentVolume = targetVolume;
                      clearInterval(fadeInTimerId);
                    }
                    if (dabitSoundRef?.current) {
                      dabitSoundRef.current.volume = currentVolume;
                    }
                  }, intervalTime);
                  addFadeOutTimer(fadeInTimerId);
                })
                .catch(err => console.error('dabit音效播放失败:', err));
            }
            
            const speak2TimerId = setTimeout(() => {
              if (speak2SoundRef?.current) {
                playAudio(speak2SoundRef, 'speak2', 1);
              }
            }, 1500);
            addFadeOutTimer(speak2TimerId);
          };

          if (speak1IsPlaying) {
            fadeOutAudio(speak1SoundRef, 2500, playDabitAndSpeak2);
          } else {
            playDabitAndSpeak2();
          }
          
          if (begin1IsPlaying) {
            fadeOutAudio(beginSoundRef, 2500);
          }
        },
      });
    }

    const textSections = [textSectionRef, textSection2Ref];
    textSections.forEach(ref => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current, start: 'top 70%', end: 'center center', toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    const imageSections = [townRef, walkingNightRef, boy2Ref, skyRef, eyeRef, endRef];
    imageSections.forEach(ref => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 50, backgroundColor: '#FFFFFF' });
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50, backgroundColor: '#FFFFFF' },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', backgroundColor: '#FFFFFF',
            scrollTrigger: {
              trigger: ref.current, start: 'top 80%', end: 'top 20%', toggleActions: 'play none none reverse', scrub: 0.8,
            }
          }
        );
      }
    });

    return () => {
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
      
      fadeOutTimersRef.current.forEach(timerId => clearTimeout(timerId));
      fadeOutTimersRef.current = [];
      
      [grassSoundRef, beginSoundRef, speak1SoundRef, speak2SoundRef, starsSoundRef, dabitSoundRef].forEach(ref => {
        if (ref?.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
          ref.current.volume = 1; // Reset volume
        }
      });
      
      Object.keys(playedRefs.current).forEach(key => { playedRefs.current[key] = false; });

      document.removeEventListener('touchstart', () => {}); // Dummy removal for any attached listeners
      document.removeEventListener('click', () => {});
    };
  }, [isClient]);

  if (!isClient) {
    return <div className={styles.loadingContainer}><div className={styles.loadingText}>加载中...</div></div>;
  }

  return (
    <div ref={mainRef} className={styles.container}>
      <audio ref={beginSoundRef} src="/Voice/begin1.mp3" preload="metadata" playsInline />
      <div className={styles.heroSection}>
        <GhostedTitle />
        <Section1Title />
      </div>
      <div ref={textSectionRef} className={styles.textSection}>
        <audio ref={speak1SoundRef} src="/Voice/speak1.mp3" preload="metadata" playsInline />
        <TypewriterText text={storyText} />
      </div>
      <section ref={townRef} id="town" className={`${styles.section} ${styles.town} ${styles.firstSection}`}>
        <img src="/images/townlogo.png" alt="Town Logo" className={styles.townLogoOverlay} />
      </section>
      <section ref={walkingNightRef} id="walkingnight" className={`${styles.section} ${styles.walkingNight}`}>
        <audio ref={grassSoundRef} src="/Voice/grass.mp3" preload="metadata" playsInline />
      </section>
      <section ref={boy2Ref} id="boy2" className={`${styles.section} ${styles.boy2}`}></section>
      <section ref={skyRef} id="sky" className={`${styles.section} ${styles.sky}`}>
        <audio ref={starsSoundRef} src="/Voice/stars.mp3" preload="metadata" playsInline />
      </section>
      <section ref={eyeRef} id="eye" className={`${styles.section} ${styles.eye}`}></section>
      <div className={styles.section2TitleContainer}>
        <Section2Title />
        <audio ref={speak2SoundRef} src="/Voice/speak2.mp3" preload="metadata" playsInline />
        <audio ref={dabitSoundRef} src="/Voice/david.mp3" preload="metadata" playsInline />
      </div>
      <div ref={textSection2Ref} className={styles.textSection}>
        <TypewriterText text={storyText2} speed={106} />
      </div>
      <section ref={endRef} id="end" className={`${styles.section} ${styles.end}`}></section>
      <div className={styles.section3TitleContainer}>
        <Section3Title />
      </div>
    </div>
  );
};

export default StoryScrollPage; 