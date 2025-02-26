import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get the current path

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever the path changes
  }, [pathname]);

  return null; // This component does not render anything
};

export default ScrollToTop;
