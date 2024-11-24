import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Upload, message, Table, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ProductService from "../services/ProductService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Column } = Table;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const productList = await ProductService.getProductsByCurrentUser();
      setProducts(productList);
    } catch (error) {
      message.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product creation or update
  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("details", values.details);
    formData.append("condition", values.condition);

    // If editing, skip appending the image if not changed
    if (!isEditing || values.image?.fileList.length > 0) {
      const file = values.image?.fileList[0]?.originFileObj;
      if (file) {
        formData.append("image", file);
      }
    }

    try {
      if (isEditing) {
        await ProductService.updateProduct(currentProduct.productId, formData);
        message.success("Product updated successfully!");
      } else {
        await ProductService.createProduct(formData);
        message.success("Product created successfully!");
      }
      fetchProducts();
      setIsModalVisible(false);
      setIsEditing(false);
      setCurrentProduct(null);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save product.");
    }
  };

  // Show modal for creating new product
  const showCreateProductModal = () => {
    setIsModalVisible(true);
    setIsEditing(false);
    form.resetFields();
  };

  // Show modal for editing existing product
  const showEditProductModal = (product) => {
    setIsModalVisible(true);
    setIsEditing(true);
    setCurrentProduct(product);
    form.setFieldsValue({
      title: product.title,
      category: product.category,
      price: product.price,
      condition: product.condition,
      details: product.details,
    });
  };


  const handleDeleteProduct = (productId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await ProductService.deleteProduct(productId);
          message.success("Product deleted successfully!");
          fetchProducts(); // Refresh the product list after deletion
        } catch (error) {
          message.error("Failed to delete product.");
        }
      },
      onCancel: () => {
        // No action on cancel, modal will close automatically
      }
    });
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showCreateProductModal}
        style={{ marginBottom: "20px" }}
      >
        Create Product
      </Button>

      <Table dataSource={products} rowKey="productId">
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Category" dataIndex="category" key="category" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column title="Condition" dataIndex="condition" key="condition" />
        <Column
          title="Actions"
          key="actions"
          render={(text, product) => (
            <Space>
              <Button icon={<EditOutlined />} onClick={() => showEditProductModal(product)} />
              <Button icon={<DeleteOutlined />} onClick={() => handleDeleteProduct(product.productId)} />
            </Space>
          )}
        />
      </Table>

      {/* Create/Edit Product Modal */}
      <Modal
        title={isEditing ? "Edit Product" : "Create New Product"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please input the category!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Condition"
            name="condition"
            rules={[{ required: true, message: "Please input the condition!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Details"
            name="details"
            rules={[{ required: true, message: "Please input the details!" }]}>
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item label="Product Image" name="image">
            {/* If editing, show the existing image in the upload component */}
            {isEditing && currentProduct?.image && (
              <div>
                <img
                  src={currentProduct.image}
                  alt="Product"
                  style={{ width: "100px", marginBottom: "10px" }}
                />
              </div>
            )}
            <Upload listType="picture-card" beforeUpload={() => false} maxCount={1}>
              <Button icon={<PlusOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {isEditing ? "Update Product" : "Create Product"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;