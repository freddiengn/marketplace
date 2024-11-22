import React, { useEffect, useState } from "react";
import { Row, Col, Spin, message } from "antd";
import ProductService from "../services/ProductService"; 
import ElementLayout from "./ElementLayout";

const ElementPageLayout = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await ProductService.getProducts(); 
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
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin tip="Loading products..." size="large" />
      </div>
    ); 
  }

  return (
    <div style={{ background: "#f0f2f5", padding: "20px 0" }}>
      <Row gutter={[16, 16]}>
        {/* Display products dynamically */}
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.productId}>
            {/* Use ElementLayout to display each product */}
            <ElementLayout
                productid={product.productId}
                src={product.imageUrl || "https://via.placeholder.com/150"} 
                alt={product.title}
                title={product.title}
                description={product.details} 
                price={product.price} 
                condition={product.condition} 
                category={product.category} 
                isSold={product.isSold} 
                createdAt={product.createdAt} 
                updatedAt={product.updatedAt} 
              />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ElementPageLayout;