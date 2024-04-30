import { useState, useEffect } from 'react';

function useIdle(timeout) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    const resetIdleTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), timeout);
    };

    const handleUserActivity = () => {
      setIsIdle(false);
      resetIdleTimer();
    };

    // Initial setup
    resetIdleTimer();

    // Event listeners
    const events = [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'resize',
      'scroll',
      'keyup', 
      'keypress', 
      'focus' 
    ];
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [timeout]);

  return isIdle;
}

export default useIdle;
