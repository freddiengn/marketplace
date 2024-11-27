import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Card, Typography, Space, Spin, Input } from "antd";
import { MailOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductService from "../services/ProductService";
import { AuthContext } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";
import {
  sendMessage,
  getChatHistoryForBuyer,
  getChatHistoryForSeller,
  getSendersForProduct,
} from "../services/MessageService";

const { Title, Paragraph, Text } = Typography;

const ProductDetailsPage = () => {
  const { productid } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [showBuyerList, setShowBuyerList] = useState(false);

  // Fetch product and buyer details
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedProduct = await ProductService.getProductById(productid);
        setProduct(fetchedProduct);
        const fetchedBuyers = await getSendersForProduct(productid);
        setBuyers(fetchedBuyers);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productid]);

  // Fetch chat history based on user role (buyer/seller)
  useEffect(() => {
    if (userInfo && product) {
      const fetchChatHistory = async () => {
        try {
          if (userInfo.username !== product.seller) {
            const history = await getChatHistoryForBuyer(productid);
            setChatMessages(history);
          }
        } catch (err) {
          console.error("Failed to fetch chat history", err);
        }
      };

      fetchChatHistory();
    }
  }, [userInfo, product]);

  // Format price in Vietnamese currency
  const formatCurrency = (value) =>
    new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(value);

  // Handle sending message to the seller
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const data = await sendMessage({
          receiverId: product.sellerId,
          productId: product.productId,
          message,
        });
        setChatMessages((prevMessages) => [...prevMessages, data]);
        setMessage("");
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  // Handle buyer click to view chat history for that buyer
  const handleBuyerClick = async (senderId) => {
    try {
      const history = await getChatHistoryForSeller(productid, senderId);
      setSelectedBuyer(senderId);
      setChatMessages(history);
      setShowBuyerList(false);
      setChatVisible(true);
    } catch (err) {
      console.error("Error fetching chat history for buyer", err);
    }
  };

  // Show loading state while fetching product data
  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}><Spin size="large" /></div>;
  }

  // Show error message if product loading fails
  if (error) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}><Typography.Text type="danger">{error}</Typography.Text></div>;
  }

  // Show if no product is found
  if (!product) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}><Typography.Text>No product found.</Typography.Text></div>;
  }

  const { title, imageUrl, description, price, seller, condition, category, isSold, createdAt, updatedAt } = product;
  const isSeller = userInfo && userInfo.username === seller;

  return (
    <section style={{ paddingTop: "50px", background: "#f0f2f5" }}>
      <div className="container">
        <Row gutter={[16, 16]} justify="space-between">
          <Col lg={12} xs={24}>
            <Card hoverable cover={<img alt={title} src={imageUrl || "https://via.placeholder.com/150"} />} style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />
          </Col>

          <Col lg={12} xs={24}>
            <Card title={<Title level={2}>{title}</Title>} style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <Typography.Text strong style={{ fontSize: "18px", color: "#1890ff" }}>Price: {formatCurrency(price)}</Typography.Text>
              <Paragraph>{description}</Paragraph>
              <Typography.Text>Condition: {condition}</Typography.Text><br />
              <Typography.Text>Category: {category}</Typography.Text><br />
              <Typography.Text>{isSold ? <span style={{ color: "red", fontWeight: "bold" }}>Status: Sold</span> : <span style={{ color: "green", fontWeight: "bold" }}>Status: Available</span>}</Typography.Text><br />
              <Typography.Text>Created At: {new Date(createdAt).toLocaleDateString()}</Typography.Text><br />
              <Typography.Text>Updated At: {new Date(updatedAt).toLocaleDateString()}</Typography.Text><br />
              <Typography.Text>Seller: {seller}</Typography.Text><br />
              <Space style={{ marginTop: "20px" }}>
                {isSold || isSeller ? (
                  <Button type="primary" icon={<ShoppingCartOutlined />} size="large" style={{ width: "150px", backgroundColor: "#f5222d", color: "#fff", borderColor: "#f5222d" }} disabled>Buy</Button>
                ) : (
                  <Button type="primary" icon={<ShoppingCartOutlined />} size="large" style={{ width: "150px", backgroundColor: "green", borderColor: "#52c41a" }}>Buy</Button>
                )}
                <Button type="default" icon={<MailOutlined />} size="large" style={{ width: "180px", backgroundColor: "#1890ff", color: "white", borderColor: "#1890ff" }} onClick={() => isSeller ? setShowBuyerList(!showBuyerList) : setChatVisible(!chatVisible)}>
                  {isSeller ? "View Messages" : "Message for Seller"}
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      <ChatBox chatVisible={chatVisible} setChatVisible={setChatVisible} messages={messages} setMessage={setMessage} message={message} handleSendMessage={handleSendMessage}  isSeller={isSeller}/>

      {/* Buyer List in Bottom-Right Corner */}
      {isSeller && showBuyerList && (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", maxHeight: "400px", overflowY: "auto", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", padding: "10px", width: "250px", zIndex: 1000 }}>
          <h4>Buyers List</h4>
          {buyers.length > 0 ? (
            buyers.filter((buyer, index, self) => index === self.findIndex((b) => b.senderName === buyer.senderName))
              .map((buyer) => (
                <div key={buyer.senderId} onClick={() => handleBuyerClick(buyer.senderId)} style={{ cursor: "pointer", padding: "5px", marginBottom: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
                  <Text>{buyer.senderName}</Text>
                </div>
              ))
          ) : (
            <p>No buyers yet.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ProductDetailsPage;