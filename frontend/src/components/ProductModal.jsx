import React from "react";
import { Modal, Form, Input, InputNumber, Button, Space, Upload, Row, Col, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

const ProductModal = ({
  isVisible,
  isEditing,
  currentProduct,
  handleFormSubmit,
  setIsModalVisible,
}) => {
  const [form] = Form.useForm();

  // Set initial form values if editing an existing product
  React.useEffect(() => {
    if (isEditing && currentProduct) {
      form.setFieldsValue({
        title: currentProduct.title,
        category: currentProduct.category,
        price: currentProduct.price,
        condition: currentProduct.condition,
        details: currentProduct.details,
        image: currentProduct.image,
      });
    } else {
      // Clear form data when creating a new product
      form.resetFields();
    }
  }, [isEditing, currentProduct, form]);

  // Handle modal close to reset form if necessary
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Clear form data when closing the modal
  };
  const getModalWidth = () => {
    if (window.innerWidth < 768) {
      return 420; 
    }
    if (window.innerWidth < 1024) {
      return 800; 
    }
    return 1000; 
  };
  return (
    <Modal
      title={isEditing ? "Edit Product" : "Create New Product"}
      visible={isVisible}
      onCancel={handleModalCancel}
      footer={null}
      centered
      size="large"
      width={getModalWidth()}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input the category!" }]}
            >
              <Input />
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
          </Col>

          <Col span={12}>
            <Form.Item
                label="Condition"
                name="condition"
                rules={[{ required: true, message: "Please select the condition!" }]}
            >
                <Select placeholder="Select condition">
                <Option value="New">New</Option>
                <Option value="Sold">Sold</Option>
                </Select>
            </Form.Item>
        </Col>
          <Col span={24}>
            <Form.Item
              label="Details"
              name="details"
              rules={[{ required: true, message: "Please input the details!" }]}
            >
              <ReactQuill theme="snow" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Product Image" name="image" 
            rules = {[{ required: true, message: "Please input the image!"}]}>
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
          </Col>

          <Col span={24}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  {isEditing ? "Update Product" : "Create Product"}
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductModal;