import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Tag, Button } from "antd";

const { Title, Text } = Typography;

const ElementLayout = (props) => {
  const {
    productid,
    src,
    alt,
    title,
    description,
    price,
    condition,
    category,
    createdAt,
    updatedAt,
  } = props;

  return (
    <Card
      hoverable
      bordered={false}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      cover={
        <Link
          to={`/post_details/${productid}`}
          state={{
            title,
            src,
            description,
            price,
            condition,
            category,
            createdAt,
            updatedAt,
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "12px 12px 0 0",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
        </Link>
      }
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)")}
    >
      <Link
        to={`/post_details/${productid}`}
        state={{
          title,
          src,
          description,
          price,
          condition,
          category,
          createdAt,
          updatedAt,
        }}
        style={{ textDecoration: "none" }}
      >
        <Title level={5} style={{ color: "#333333", marginBottom: "8px" }}>
          {title}
        </Title>
        <Text
          style={{
            color: "#e60023",
            fontWeight: "bold",
            fontSize: "16px",
            display: "block",
            marginBottom: "8px",
          }}
        >
          {price}
        </Text>
        <Text style={{ color: "#777777", fontSize: "14px", display: "block", marginBottom: "8px" }}>
          Condition: {condition}
        </Text>
        <Tag
          color="blue"
          style={{
            fontSize: "12px",
            padding: "4px 12px",
            borderRadius: "16px",
            marginBottom: "8px",
          }}
        >
          {category}
        </Tag>
        <Text
          type="secondary"
          style={{ fontSize: "12px", color: "#aaaaaa", display: "block" }}
        >
          Updated on: {new Date(updatedAt).toLocaleDateString("en-US")}
        </Text>
      </Link>

      {/* View Details Button */}
      <Link
        to={`/post_details/${productid}`}
        state={{
          title,
          src,
          description,
          price,
          condition,
          category,
          createdAt,
          updatedAt,
        }}
      >
        <Button
          type="primary"
          style={{
            marginTop: "16px",
            width: "100%",
            fontWeight: "bold",
            height: "40px",
            fontSize: "16px",
            borderRadius: "8px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#004085")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1890ff")}
        >
          View details
        </Button>
      </Link>
    </Card>
  );
};

export default ElementLayout;