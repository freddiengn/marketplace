import React, { useEffect, useState } from "react";
import { Row, Col, Spin, message, Pagination } from "antd";
import ProductService from "../services/ProductService";
import ElementLayout from "./ElementLayout";

const ElementPageLayout = () => {
  const [products, setProducts] = useState([]); // Full list of products
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(8); // Number of products per page
  const [paginatedProducts, setPaginatedProducts] = useState([]); // Products to display on the current page
  const [loading, setLoading] = useState(true);

  // Fetch products from server
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

  // Handle pagination changes
  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Update paginated products whenever currentPage or pageSize changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, pageSize, products]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading products..." size="large" />
      </div>
    );
  }

  return (
    <div style={{ background: "#f0f2f5", padding: "20px 0" }}>
      <Row gutter={[16, 16]}>
        {/* Display products dynamically */}
        {paginatedProducts.map((product) => (
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

      {/* Pagination Controls */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={handlePaginationChange}
          showSizeChanger
          pageSizeOptions={["8", "12", "16"]}
        />
      </div>
    </div>
  );
};

export default ElementPageLayout;