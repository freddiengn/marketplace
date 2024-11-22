import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Row, Col, Button, Card, Typography, Space } from "antd";
import { MailOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const PostDetails = () => {
  const { productid } = useParams();
  const location = useLocation();
  const { title, src, description, price, seller } = location.state || {};

  return (
    <section style={{ paddingTop: "50px", background: "#f0f2f5" }}>
      <div className="container">
        <Row gutter={[16, 16]} justify="space-between">
          <Col lg={12} xs={24}>
            {/* Product Image */}
            <Card
              hoverable
              cover={<img alt={title} src={src} />}
              style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            />
          </Col>

          <Col lg={12} xs={24}>
            {/* Product Details */}
            <Card
              title={<Title level={2}>{title}</Title>}
              style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
              <Typography.Text strong style={{ fontSize: "18px" }}>
                Price: ${price}
              </Typography.Text>
              <br />
              <Paragraph>{description}</Paragraph>

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