import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  console.log("products", products);
  const [searchText, setSearchText] = useState("");
  console.log("searchText", searchText);

  // getAllProducts
  const getAllProducts = () => {
    const url = "https://api.unsplash.com/photos";
    const params = {
      query: "fashion",
      per_page: 20,
      client_id: "yaupp1RbMklllc0PbTSDf0_qiFy91pHZH_0hGO-neXs",
    };

    axios
      .get(url, {
        params,
      })
      .then((res) => {
        console.log("res", res?.data);
        setProducts(res?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const filteredProducts = products.filter((product) =>
    product?.alt_description?.toLowerCase()?.includes(searchText?.toLowerCase())
  );

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-yellow-50">
      <input
        type="text"
        placeholder="Search by product name"
        className="border p-2 rounded-md mb-4 w-full"
        value={searchText}
        onChange={(e) => setSearchText(e?.target?.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts?.map((product) => (
          <Link to={`/products/${product?.id}`} key={product?.id}>
            <div className="border rounded-lg overflow-hidden shadow-lg animate__animated animate__fadeInUp hover:animate__pulse">
              <img
                src={product?.urls?.small}
                alt={product?.alt_description}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-xl">
                  {product?.alt_description}
                </h2>
                <p className="text-gray-600">Price: Not specified</p>
                <p className="text-sm">{product?.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
