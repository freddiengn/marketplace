import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Tag, Button } from "antd";

const { Title, Text } = Typography;

const ProductCard = (props) => {
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
    isSold, // new prop to indicate if the product is sold
  } = props;

  return (
    <Card
      hoverable
      bordered={false}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: isSold ? "#f0f0f0" : "#ffffff", // Change background color if sold
        boxShadow: isSold
          ? "0 8px 16px rgba(0, 0, 0, 0.1)"
          : "0 8px 16px rgba(0, 0, 0, 0.1)", // Optional shadow change
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      cover={
        <Link
          to={`/product-details/${productid}`}
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
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)")
      }
    >
      <Link
        to={`/product-details/${productid}`}
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
            color: isSold ? "#cccccc" : "#e60023", // Grey color for sold items
            fontWeight: "bold",
            fontSize: "16px",
            display: "block",
            marginBottom: "8px",
          }}
        >
          {price}
        </Text>
        <Text
          style={{
            color: "#777777",
            fontSize: "14px",
            display: "block",
            marginBottom: "8px",
          }}
        >
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
        to={`/product-details/${productid}`}
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
            backgroundColor: isSold ? "#cccccc" : "#1890ff", // Disable button if sold
            cursor: isSold ? "not-allowed" : "pointer",
          }}
          disabled={isSold} // Disable button for sold products
          onMouseOver={(e) =>
            !isSold && (e.target.style.backgroundColor = "#004085")
          }
          onMouseOut={(e) =>
            !isSold && (e.target.style.backgroundColor = "#1890ff")
          }
        >
          {isSold ? "Sold" : "View details"}
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;