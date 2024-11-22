import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Pagination } from "antd";
import ElementLayout from "./ElementLayout";

const ElementPageLayout = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(8); // Number of products per page
  const [paginatedProducts, setPaginatedProducts] = useState([]); // Products to display on the current page

  // Handle pagination changes
  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Update paginated products whenever currentPage, pageSize, or products change
  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, pageSize, products]);

  // Show loading spinner if products are empty
  if (products.length === 0) {
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