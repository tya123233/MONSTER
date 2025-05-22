import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  // 使用JavaScript移除Next.js开发按钮
  useEffect(() => {
    // 立即尝试移除
    removeNextButtons();
    
    // 设置定时器持续检查并移除按钮（可能按钮是动态添加的）
    const interval = setInterval(removeNextButtons, 500);
    
    function removeNextButtons() {
      const selectors = [
        '[data-nextjs-dialog-overlay]',
        '[data-nextjs-dialog]',
        '[data-nextjs-toast]',
        '[data-nextjs-portal]',
        '.nextjs-portal-dialog-overlay',
        '#__next-build-watcher',
        '#__nextjs-portal-root',
        '[data-nextjs-dialog-banner]',
        '[data-nextjs-refresh-overlay]',
        '[data-nextjs-refresh-overlay-overlay]',
        '.nextjs-container'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      });
    }
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx global>{`
        /* 更强力的CSS隐藏规则 */
        body > div:not(#__next),
        #__next ~ div,
        .nextjs-portal-dialog-overlay,
        [data-nextjs-dialog-overlay],
        [data-nextjs-dialog],
        [data-nextjs-toast],
        [data-nextjs-portal],
        [data-nextjs-dialog-banner],
        [data-nextjs-refresh-overlay],
        [data-nextjs-refresh-overlay-overlay],
        #__next-build-watcher,
        #__nextjs-portal-root,
        .nextjs-container {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          position: absolute !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          z-index: -9999 !important;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 