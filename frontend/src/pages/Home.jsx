import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form, Input, InputNumber, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductService from "../services/ProductService"; // Import the ProductService
import ElementPageLayout from "../components/ElementPageLayout";
import { useForm } from 'antd/lib/form/Form';

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
    formData.append('title', values.title);
    formData.append('category', values.category);
    formData.append('price', values.price);
    formData.append('details', values.details);
    formData.append('condition', values.condition);

    // Append file data to the FormData
    const file = values.image?.fileList[0]?.originFileObj;
    if (file) {
      formData.append('image', file);
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
        <ElementPageLayout />
        <br />
        <br />

        {/* Create Product Button (only if logged in) */}
        {loggedIn && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateProductModal}
            style={{ marginTop: "20px" }}
          >
            Create Product
          </Button>
        )}

        {/* Create Product Modal */}
        <Modal
          title="Create New Product"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateProduct}
          >
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
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label="Details"
              name="details"
              rules={[{ required: true, message: "Please input the details!" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Condition"
              name="condition"
              rules={[{ required: true, message: "Please input the condition!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Product Image"
              name="image"
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Upload
                listType="picture"
                beforeUpload={() => false} // Prevent auto upload
                maxCount={1}
              >
                <Button icon={<PlusOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Product
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        
      </div>
    </div>
  );
};

export default Home;