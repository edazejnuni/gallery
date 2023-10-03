import React from "react";
import "./Product.scss";
import WhatshotIcon from "@mui/icons-material/Whatshot";

interface ProductProps {
  link: string;
  title: string;
  type: string;
  viral: boolean;
}

const Product: React.FC<ProductProps> = ({ link, title, type, viral }) => {
  return (
    <div className="product">
      {viral && (
        <div className="viral">
          <span>VIRAL</span> <WhatshotIcon />
        </div>
      )}
      <div className="link-container">
        {type === "video/mp4" ? (
          <video width="100%" height="200" loop autoPlay muted>
            <source src={link} type="video/mp4" />
          </video>
        ) : (
          <img src={link} alt="product-image" />
        )}
      </div>

      <p>{title}</p>
    </div>
  );
};

export default Product;
