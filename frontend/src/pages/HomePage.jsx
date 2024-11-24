import React, { useEffect, useState } from "react";
import { Input, message, Typography, Row, Col, Select, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ProductService from "../services/ProductService";
import ProductList from "../components/ProductList";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000000]);

  const fetchProducts = async () => {
    try {
      const productList = await ProductService.getProducts();
      setProducts(productList);

      const uniqueCategories = [
        ...new Set(productList.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      message.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) &&
      (category ? product.category === category : true) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  // Format the price as Vietnamese currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="d-flex min-vh-100">
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome to Owl Swap
      </Title>

      {/* Main Row with Left Filter and Right Product List */}
      <Row gutter={24}>
        {/* Left Column - Filters and Search */}
        <Col span={6}>
          <div>
            {/* Search Bar */}
            <Search
              placeholder="Search products"
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
              allowClear
              style={{ width: "100%", marginBottom: "16px" }}
            />

            {/* Category Filter */}
            <Select
              placeholder="Filter by Category"
              style={{ width: "100%", marginBottom: "16px" }}
              allowClear
              onChange={handleCategoryChange}
              value={category}
            >
              <Option value="">All Categories</Option> {/* Add All Categories option */}
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            {/* Price Range Filter */}
            <Slider
              range
              min={0}
              max={5000000}
              value={priceRange}
              onChange={handlePriceRangeChange}
              tipFormatter={(value) => formatCurrency(value)}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <div>
              <span>Min Price: {formatCurrency(priceRange[0])}</span> -{" "}
              <span>Max Price: {formatCurrency(priceRange[1])}</span>
            </div>
          </div>
        </Col>

        {/* Right Column - Product List */}
        <Col span={18}>
          {/* Product List */}
          {filteredProducts.length > 0 ? (
            <ProductList
              products={filteredProducts.map((product) => ({
                ...product,
                price: formatCurrency(product.price),
              }))}
            />
          ) : (
          <Typography.Text
            type="default"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "16px",
              color: "#999", // Light gray color for the message
              fontWeight: "bold", // Bold text for emphasis
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            No products match your search or filter criteria.
          </Typography.Text>

          )}
        </Col>
      </Row>
    </div>
  );
};

export default Home;