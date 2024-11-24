import React from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Column } = Table;

const ProductTable = ({ products, showEditProductModal, handleDeleteProduct }) => {
  return (
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
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteProduct(product.productId)} />
          </Space>
        )}
      />
    </Table>
  );
};

export default ProductTable;