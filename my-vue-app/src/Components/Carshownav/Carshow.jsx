import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarLinks, carData } from "./data";
import "./carshow.css";
import SignUpModal from "../AuthPage/SignUpModal";
import CarShowcase from "../VideoCarousel/VideoCarousel";

const Carshownav = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showDigitalShowroom, setShowDigitalShowroom] = useState(false);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  // Map car names to their IDs
  const carLinks = {
    Nexon: 6,
    Tiago: 3,
    Tigor: 4,
    Punch: 5,
    Curvv: 2,
    Harrier: 7,
    Safari: 8,
    Altroz: 1,
  };

  const handleSidebarLinkClick = (item) => {
    if (item.label === "Sign In") {
      setShowSignUpModal(true);
    } else if (item.label === "Digital Showroom") {
      setShowDigitalShowroom(true);
    } else if (item.subMenu) {
    }
  };

  return (
    <div className="carshow-container">
      {showSignUpModal && (
        <SignUpModal onClose={() => setShowSignUpModal(false)} />
      )}

      {showDigitalShowroom && (
        <div className="digital-showroom-overlay">
          <div className="digital-showroom-container">
            <button
              className="close-digital-showroom"
              onClick={() => setShowDigitalShowroom(false)}
            >
              Close
            </button>
            <CarShowcase />
          </div>
        </div>
      )}

      <aside className="carshow-sidebar">
        <ul className="carshow-links">
          {sidebarLinks.map((item, index) => (
            <li
              key={index}
              className="carshow-link-item"
              onMouseEnter={() => item.subMenu && setExpandedIndex(index)}
              onMouseLeave={() => item.subMenu && setExpandedIndex(null)}
            >
              <div
                className={`carshow-link ${item.highlight ? "highlight" : ""}`}
                onClick={() => handleSidebarLinkClick(item)}
              >
                {item.label}
                {item.subMenu && <span className="carshow-arrow">▸</span>}
              </div>

              {item.subMenu && expandedIndex === index && (
                <ul className="carshow-submenu">
                  {item.subMenu.map((sub, subIndex) => (
                    <li key={subIndex} className="carshow-sublink">
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Car Section - Only show if digital showroom is not active */}
      {!showDigitalShowroom && (
        <main className="carshow-main">
          <h2 className="carshow-heading">Our Models</h2>
          <p className="carshow-subheading">
            Drive NEW FOREVER. A whole new range of cars from Tata Motors.
          </p>

          <div className="carshow-grid">
            {carData.map((car) => (
              <div className="carshow-card" key={car.id}>
                <img src={car.image} alt={car.name} className="carshow-image" />
                <h3>{car.name}</h3>
                <Link
                  to={`/cars/${carLinks[car.name]}`}
                  className="carshow-link-button"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default Carshownav;
