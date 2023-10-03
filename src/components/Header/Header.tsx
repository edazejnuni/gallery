import React, { useState, useEffect } from "react";
import "./Header.scss";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`sticky-header ${scrolling ? "colored" : ""}`}>
      <nav>
        <h2>Gallery</h2> <FilterVintageIcon />
      </nav>
    </header>
  );
};

export default Header;
