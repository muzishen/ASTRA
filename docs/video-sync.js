// video-sync.js
// 平滑滚动功能
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // 滚动动画功能
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
  
    document.querySelectorAll('.section, .comparison-group').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
  
  // 视频控制条显示/隐藏
  function initVideoControls() {
    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
      const video = wrapper.querySelector('video');
      
      // 鼠标进入显示控制条
      wrapper.addEventListener('mouseenter', () => {
        video.setAttribute('controls', 'controls');
      });
      
      // 鼠标离开隐藏控制条
      wrapper.addEventListener('mouseleave', () => {
        video.removeAttribute('controls');
      });
      
      // 确保视频自动播放
      video.addEventListener('loadeddata', () => {
        if (video.paused) {
          video.play().catch(e => console.log('Auto-play prevented:', e));
        }
      });
    });
  }
  
  // 初始化功能
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initScrollAnimations();
    initVideoControls();
  });