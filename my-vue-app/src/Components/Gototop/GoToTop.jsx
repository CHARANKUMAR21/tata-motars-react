import React, { useEffect, useState } from "react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "100px",
    right: "30px",
    zIndex: 1000,
    padding: "12px 16px",
    fontSize: "25px",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    display: isVisible ? "block" : "none",
    transition: "background-color 0.3s ease",
  };

  return (
    <button style={buttonStyle} onClick={scrollToTop} title="Go to Top">
      ↑
    </button>
  );
};

export default GoToTop;
