"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './GhostedTitle.module.css';

// 简化：移除ScrollTrigger导入和注册，因为我们不再使用它
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

const GhostedTitle = () => {
  // 移除泛型参数以解决linter错误
  const titleRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    // 清除任何可能的先前动画
    gsap.killTweensOf(letterRefs.current);

    // 获取引用的DOM元素，并过滤掉null值
    const letters = letterRefs.current.filter(el => el !== null);
    
    if (titleRef.current && letters.length > 0) {
      // 设置初始状态
      gsap.set(letters, {
        opacity: 0,
        y: 30,
        filter: 'blur(5px)',
      });

      // 使用基本的GSAP动画，无需ScrollTrigger
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power3.out", // 使用简单的缓动函数
        stagger: 0.08,
        delay: 0.2, // 稍微减少延迟
      });
    }

    // 清理函数
    return () => {
      gsap.killTweensOf(letters);
    };
  }, []); // 仅在组件挂载时运行一次

  // 标题文本
  const titleText = "Ghosted";
  const letters = titleText.split('');

  // 在每次渲染时重置refs数组
  letterRefs.current = [];

  return (
    <div className={styles.titleContainer}>
      <h1 ref={titleRef} className={styles.title} aria-label={titleText}>
        {letters.map((letter, index) => (
          <span
            key={index}
            ref={el => { letterRefs.current[index] = el; }}
            className={styles.letter}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default GhostedTitle; 