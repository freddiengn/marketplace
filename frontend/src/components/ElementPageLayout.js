import React, { useEffect, useState } from "react";
import Element_Layout from "./Element_Layout";
import ProductService from "../services/ProductService"; // Import the ProductService
import { message } from "antd"; // To display error messages

const Element_Page_Layout = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await ProductService.getProducts(); // Assuming ProductService.getProducts fetches the product list
        setProducts(productList);
      } catch (error) {
        message.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching products
  }

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          {/* Display products dynamically */}
          {products.map((product) => (
            <div className="col-md-4" key={product.productId}>
              <Element_Layout
                src={product.imageUrl || "https://via.placeholder.com/150"} // Use product image URL or a placeholder
                alt={product.title}
                title={product.title}
                description={product.details.substring(0, 50) + "..."} // Display a short description
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Element_Page_Layout;