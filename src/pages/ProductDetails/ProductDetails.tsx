import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import { useGetImageQuery } from "../../redux-toolkit/api/galleryApi";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

const ProductDetails = () => {
  const [product, setProduct] = useState<any>();

  const { id } = useParams();
  const { data: productData } = useGetImageQuery({
    id: id,
  });

  const fetchproductData = async () => {
    if (productData && productData.data) {
      setProduct(productData.data);
      console.log(productData.data);
    }
  };

  useEffect(() => {
    fetchproductData();
  }, [productData]);

  return (
    <div className="product__details">
      <h2 className="product__title">{product?.title}</h2>
      {product?.images ? (
        <>
          {console.log(product)}
          {product?.images?.map((productLink: any, index: number) => (
            <div key={index}>
              {productLink && productLink.type === "video/mp4" ? (
                <video width="700" height="100%" loop autoPlay muted>
                  <source src={productLink.link} type="video/mp4" />
                </video>
              ) : (
                <img src={productLink.link} alt="product-product" />
              )}
            </div>
          ))}
        </>
      ) : (
        <img src={product?.link} alt="product-product" />
      )}

      <div className="product__description">
        {product?.images?.map((productDesc: any, index: number) => (
          <p key={index}>{productDesc?.description}</p>
        ))}
      </div>
      <div className="score">
        <p>
          <ThumbUpIcon />
          {product?.ups}
        </p>
        <p>
          <ThumbDownIcon />
          {product?.downs}
        </p>
        <p>
          <SportsScoreIcon />
          {product?.score}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
