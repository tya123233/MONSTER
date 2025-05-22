"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/TypewriterText.module.css';

// 注册ScrollTrigger插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 添加速度参数，默认为74毫秒/字符
const TypewriterText = ({ text, className, speed = 74 }) => {
  const [displayText, setDisplayText] = useState('');
  const textContainerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const timerRef = useRef(null as unknown as number | null);
  
  // 打字机效果函数
  const typeWriter = (fullText, i, typingSpeed) => {
    if (i < fullText.length) {
      setDisplayText(fullText.substring(0, i + 1));
      timerRef.current = window.setTimeout(() => typeWriter(fullText, i + 1, typingSpeed), typingSpeed);
    }
  };

  useEffect(() => {
    if (!textContainerRef.current) return;

    // 设置初始状态
    gsap.set(textContainerRef.current, { opacity: 1 });

    // 创建滚动触发器
    const scrollTrigger = ScrollTrigger.create({
      trigger: textContainerRef.current,
      start: "top 70%",
      end: "bottom 20%",
      onEnter: () => {
        if (!hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          // 使用传入的速度参数
          typeWriter(text, 0, speed);
        }
      }
    });

    return () => {
      // 清理工作
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [text, speed]);

  return (
    <div ref={textContainerRef} className={`${styles.textContainer} ${className || ''}`}>
      <p className={styles.typewriterText}>{displayText}</p>
    </div>
  );
};

export default TypewriterText; 