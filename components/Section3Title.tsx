"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './GhostedTitle.module.css'; // 复用相同的样式

// 注册ScrollTrigger插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Section3Title = () => {
  const titleRef = useRef(null);
  const letterRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // 清除任何可能的先前动画
    gsap.killTweensOf(letterRefs.current);
    
    // 获取引用的DOM元素，并过滤掉null值
    const letters = letterRefs.current.filter(el => el !== null);
    
    if (titleRef.current && letters.length > 0 && containerRef.current) {
      // 设置初始状态 - 完全不可见
      gsap.set(containerRef.current, { 
        opacity: 0,
        visibility: 'hidden'
      });
      
      gsap.set(letters, {
        opacity: 0,
        y: 30,
        filter: 'blur(5px)',
      });

      // 创建滚动触发器，当用户向下滚动时才显示标题
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%', // 当容器顶部到达视口70%的位置时开始动画
        once: false, // 允许动画重复触发
        onEnter: () => {
          // 首先使容器可见
          gsap.to(containerRef.current, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.5,
            onComplete: () => {
              // 容器可见后，执行逐字动画
              gsap.to(letters, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.08,
              });
            }
          });
        },
        onLeaveBack: () => {
          // 当向上滚动离开触发区域时，隐藏标题
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(containerRef.current, { visibility: 'hidden' });
              // 重置字母状态，为下次进入做准备
              gsap.set(letters, {
                opacity: 0,
                y: 30,
                filter: 'blur(5px)',
              });
            }
          });
        }
      });
    }

    // 清理函数
    return () => {
      if (typeof window !== 'undefined') {
        // 移除所有相关的滚动触发器
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
          if (trigger.vars.trigger === containerRef.current) {
            trigger.kill();
          }
        });
      }
      gsap.killTweensOf(letters);
      gsap.killTweensOf(containerRef.current);
    };
  }, []); // 仅在组件挂载时运行一次

  // 标题文本
  const titleText1 = "To be continued...";
  const titleText2 = "(Mike, I'm sure to finish this project within two weeks.TAT)";
  
  // 将两部分文本分别处理
  const letters1 = titleText1.split('');
  const letters2 = titleText2.split('');
  
  // 在每次渲染时重置refs数组
  letterRefs.current = [];
  
  // 跟踪当前字母的索引
  let letterIndex = 0;

  return (
    <div ref={containerRef} className={styles.titleContainer}>
      <h1 ref={titleRef} className={styles.title} aria-label={`${titleText1} ${titleText2}`}>
        {/* 第一行文本 */}
        {letters1.map((letter, index) => (
          <span
            key={`first-${index}`}
            ref={el => { letterRefs.current[letterIndex++] = el; }}
            className={styles.letter}
          >
            {letter}
          </span>
        ))}
        
        {/* 添加换行 */}
        <br />
        
        {/* 第二行文本 */}
        {letters2.map((letter, index) => (
          <span
            key={`second-${index}`}
            ref={el => { letterRefs.current[letterIndex++] = el; }}
            className={`${styles.letter} ${styles.smallerText}`}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Section3Title; 