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
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default range

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

  // Handle product creation
  const handleCreateProduct = async (values) => {
    const formData = new FormData();

    // Append text data to the FormData
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("details", values.details);
    formData.append("condition", values.condition);

    // Append file data to the FormData
    const file = values.image?.fileList[0]?.originFileObj;
    if (file) {
      formData.append("image", file);
    }

    try {
      await ProductService.createProduct(formData);
      message.success("Product created successfully!");
      fetchProducts(); // Fetch products again after adding a new product
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create product.");
    }
  };

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
              max={10000000}
              value={priceRange}
              onChange={handlePriceRangeChange}
              tipFormatter={(value) => `${value}`} // You can change the currency symbol
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <div>
              <span>Min Price: {priceRange[0]}</span> -{" "}
              <span>Max Price: {priceRange[1]}</span>
            </div>

            {/* Create Product Button */}
            {loggedIn && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showCreateProductModal}
                style={{
                  width: "100%",
                  fontSize: "16px",
                  borderRadius: "8px",
                  marginTop: "16px",
                }}
              >
                Create Product
              </Button>
            )}
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

      {/* Create Product Modal */}
      <Modal
        title="Create New Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateProduct}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please input the title!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please input the category!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Product Image"
                name="image"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <Button icon={<PlusOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input the price!" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Condition"
                name="condition"
                rules={[
                  { required: true, message: "Please input the condition!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Details"
                name="details"
                rules={[
                  { required: true, message: "Please input the details!" },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  onChange={(value) => form.setFieldsValue({ details: value })}
                  style={{ height: "150px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create Product
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
