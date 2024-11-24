import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Card, Typography, Space, Spin } from "antd";
import { MailOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductService from "../services/ProductService";

const { Title, Paragraph } = Typography;

const PostDetails = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await ProductService.getProductById(productid); 
        setProduct(fetchedProduct); 
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details."); 
        setLoading(false);
      }
    };

    fetchProduct(); 
  }, [productid]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography.Text type="danger">{error}</Typography.Text>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography.Text>No product found.</Typography.Text>
      </div>
    );
  }

  const {
    title,
    imageUrl,
    description,
    price,
    seller,
    condition,
    category,
    isSold,
    createdAt,
    updatedAt,
  } = product;

  return (
    <section style={{ paddingTop: "50px", background: "#f0f2f5" }}>
      <div className="container">
        <Row gutter={[16, 16]} justify="space-between">
          <Col lg={12} xs={24}>
            {/* Product Image */}
            <Card
              hoverable
              cover={<img alt={title} src={imageUrl || "https://via.placeholder.com/150"} />}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Col>

          <Col lg={12} xs={24}>
            {/* Product Details */}
            <Card
              title={<Title level={2}>{title}</Title>}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography.Text strong style={{ fontSize: "18px" }}>
                Price: {price} VNĐ
              </Typography.Text>
              <br />
              <Paragraph>{description}</Paragraph>
              <br />
              
              {/* Additional Product Information */}
              <Typography.Text>Condition: {condition}</Typography.Text>
              <br />
              <Typography.Text>Category: {category}</Typography.Text>
              <br />
              <Typography.Text>{isSold ? "Status: Sold" : "Status: Available"}</Typography.Text>
              <br />
              <Typography.Text>Created At: {new Date(createdAt).toLocaleDateString()}</Typography.Text>
              <br />
              <Typography.Text>Updated At: {new Date(updatedAt).toLocaleDateString()}</Typography.Text>
              <br />

              {/* Seller Information */}
              <Typography.Text>Seller: {seller}</Typography.Text>
              <br />

              {/* Action Buttons */}
              <Space style={{ marginTop: "20px" }}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  style={{ width: "150px" }}
                >
                  Buy
                </Button>
                <Button
                  type="default"
                  icon={<MailOutlined />}
                  size="large"
                  style={{ width: "180px" }}
                >
                  Message for Seller
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default PostDetails;