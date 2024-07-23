import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "animate.css/animate.min.css";

const ProductDetail = () => {
  const { productId } = useParams();
  console.log("productId", productId);
  const [product, setProduct] = useState(null);
  console.log("product", product);

  const getByIdProduct = async () => {
    const url = `https://api.unsplash.com/photos/${productId}`;
    const params = {
      client_id: "yaupp1RbMklllc0PbTSDf0_qiFy91pHZH_0hGO-neXs",
    };

    axios
      .get(url, {
        params,
      })
      .then((res) => {
        console.log("res", res?.data);
        setProduct(res?.data);
      })
      .catch((error) => {
        console.log("errors", error);
      });
  };

  useEffect(() => {
    if (productId) {
      getByIdProduct();
    } else {
      setProduct(null);
    }
  }, [productId]);

  return (
    <>
      {!product ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto mt-8 animate__animated animate__fadeIn">
          <Link to="/" className="text-blue-500 mb-4 inline-block">
            &larr; Back to List
          </Link>
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={product?.urls.regular}
              alt={product?.alt_description}
              className="w-full object-cover h-96 sm:h-auto"
            />
            <div className="p-4">
              <h2 className="font-bold text-2xl mb-2">
                {product?.alt_description}
              </h2>
              <p className="text-gray-600 mb-2">Price: Not specified</p>
              <p className="text-sm mb-4">{product?.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
