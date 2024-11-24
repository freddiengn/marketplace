import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Typography,
  Space,
  Row,
  Col,
  Select,
  Slider,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ProductService from "../services/ProductService";
import ElementPageLayout from "../components/ElementPageLayout";
import { useForm } from "antd/lib/form/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();
  const [loggedIn, setLoggedIn] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]); // Default range

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const productList = await ProductService.getProducts();
      setProducts(productList);

      // Extract unique categories from product list
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

  // Handle product search
  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  // Handle category filter
  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  // Handle price range filter
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  // Filtered products
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) &&
      (category ? product.category === category : true) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );


  const showCreateProductModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="d-flex min-vh-100">
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Product Showcase
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
              >
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
                tipFormatter={(value) => `${value}`} // You can change the currency symbol
                style={{ width: "100%", marginBottom: "16px" }}
              />
              <div>
                <span>Min Price: {priceRange[0]}</span> -{" "}
                <span>Max Price: {priceRange[1]}</span>
              </div>

      
            </div>
          </Col>

          {/* Right Column - Product List */}
          <Col span={18}>
            {/* Product List */}
            {filteredProducts.length > 0 ? (
              <ElementPageLayout products={filteredProducts} />
            ) : (
              <Typography.Text type="warning">
                No products match your search or filter criteria.
              </Typography.Text>
            )}
          </Col>
        </Row>

    
    </div>
  );
};

export default Home;