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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductService from "../services/ProductService"; // Import the ProductService
import ElementPageLayout from "../components/ElementPageLayout";
import { useForm } from "antd/lib/form/Form";

const { Title } = Typography;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();
  const [loggedIn, setLoggedIn] = useState(true); // Assume the user is logged in for now

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await ProductService.getProducts();
        setProducts(productList);
      } catch (error) {
        message.error("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

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
      const newProduct = await ProductService.createProduct(formData); // Send FormData to backend
      setProducts([...products, newProduct]);
      message.success("Product created successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create product.");
    }
  };

  // Show the modal for creating a product
  const showCreateProductModal = () => {
    setIsModalVisible(true);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container">
        {/* Page title */}
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Product Showcase
        </Title>

        {/* Create Product Button (only if logged in) */}
        {loggedIn && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateProductModal}
            style={{
              marginTop: "20px",
              width: "200px",
              fontSize: "16px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Create Product
          </Button>
        )}

        <ElementPageLayout />

        {/* Create Product Modal */}
        <Modal
          title="Create New Product"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          width={800} // Increase the modal width to make it larger
        >
          <Form form={form} layout="vertical" onFinish={handleCreateProduct}>
            {/* Row for splitting form fields into two columns */}
            <Row gutter={24}>
              {/* First Column */}
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
                  rules={[{ required: true, message: "Please input the category!" }]}
                >
                  <Input />
                </Form.Item>

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
                  rules={[{ required: true, message: "Please input the condition!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              {/* Second Column */}
              <Col span={12}>
                <Form.Item
                  label="Details"
                  name="details"
                  rules={[{ required: true, message: "Please input the details!" }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  label="Product Image"
                  name="image"
                  rules={[{ required: true, message: "Please upload an image!" }]}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false} // Prevent auto upload
                    maxCount={1}
                  >
                    <Button icon={<PlusOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            {/* Footer with Action Buttons */}
            <Form.Item>
              <Space style={{ width: "100%" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Create Product
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Home;