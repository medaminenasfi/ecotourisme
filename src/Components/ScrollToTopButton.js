import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: 9999,
          background: "#2ecc71",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
          transition: "background 0.3s"
        }}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;