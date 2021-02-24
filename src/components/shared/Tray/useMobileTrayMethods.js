import { useEffect, useState, useRef, useCallback } from 'react';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';

const useMobileTrayMethods = (slideableTray) => {
  // const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  const { appHeight } = useWindowHeightWidth(); // Get window height and width

  const initialTrayPosition = 100; // Initial position of tray
  const half = appHeight / 2; // Get half of the container height for tray to swipe to
  const [trayPosition, setTrayPosition] = useState(initialTrayPosition); // Set initial position of tray
  const { documentElement, body } = document;
  const scrollTopAtZeroRef = useRef(false); // ref to hold whether the inner tray is at the top of the outer tray
  const timeoutRef = useRef(); // ref to hold a timeout that can be cleared when unmounting

  const resetTrayScrollTop = useCallback(() => {
    const { swiper } = slideableTray.current;

    // Only reset the scroll if the user has just selected a service and is swiping up to see it
    if (parseInt(swiper.style.top, 10) === 0) return;

    const height = swiper.clientHeight;
    const offset = parseInt(swiper.style.top, 10) * -1;
    if (swiper.scrollHeight > height + offset) {
      // Move the tray back into place while keeping the service info in view then
      swiper.style.transition = 'none';
      swiper.style.height = `calc(100% + ${offset}px)`;
      swiper.style.visibility = 'hidden'; // hide scroll snapping from top to bottom on iOS
      timeoutRef.current = setTimeout(() => {
        swiper.style.top = 0;
        swiper.scrollTo(0, offset);
        swiper.style.transition = null;
        swiper.style.height = null;
        swiper.style.visibility = 'visible'; // hide scroll snapping from top to bottom on iOS
      }, 360);
    } else {
      // Scroll to the bottom of the info straight away
      swiper.style.top = 0;
      swiper.scrollTo(0, height);
    }
  }, [slideableTray]);

  useEffect(() => {
    documentElement.classList.add('mobile-tray-visible');

    return () => {
      documentElement.classList.remove('mobile-tray-visible');
    };
  });

  // SWIPE METHODS USED TO CONTROL SCROLLING OF TRAY
  const onSwipeStart = (e) => {
    body.style.overflow = 'hidden'; // Set body overflow to hidden, so we don't snap to body scrollbar
    documentElement.style.overscrollBehaviorY = 'none'; // Stops pull down to refresh in chrome on android
    scrollTopAtZeroRef.current = e.currentTarget.scrollTop === 0; // e.currentTarget (instead of e.target) makes sure that it's the Swiper component we're targeting
  };

  const onSwipeEnd = () => {
    // Scrolling finished so return overflow behavior to normal
    body.style.overflow = null;
    documentElement.style.overscrollBehaviorY = null;
  };

  const onSwipeDown = () => {
    if (trayPosition === appHeight && scrollTopAtZeroRef.current) {
      resetTrayScrollTop(); // reset sliding tray's position
      setTrayPosition(half); // If tray is open(position===appHeight) and the scrollTop is 0 (we're at the top of the tray scroll), then swipe down to half position
    }
    if (trayPosition === half) setTrayPosition(initialTrayPosition); // If tray is currently half then swipe down to default position
  };

  const onSwipeUp = () => {
    if (trayPosition === initialTrayPosition) setTrayPosition(half); // If tray is initial position then swipe up to half position
    if (trayPosition === half) {
      setTrayPosition(appHeight); // If tray is currently half, then swipe up to full position
      resetTrayScrollTop(); // reset sliding tray's position
    }
  };

  // Return methods to be used
  return { onSwipeStart, onSwipeEnd, onSwipeDown, onSwipeUp, trayPosition, appHeight };
};

export default useMobileTrayMethods;
