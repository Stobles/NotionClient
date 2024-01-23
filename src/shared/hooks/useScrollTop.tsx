import { useState, useEffect } from "react";

export const useScrollTop = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold && !isScrolled) {
        setScrolled(true);
        setIsScrolled(true);
      }
      if (window.scrollY < threshold) setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, isScrolled]);

  return scrolled;
};
