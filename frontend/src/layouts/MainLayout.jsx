import React from "react";
import { Layout } from "antd";
import Header from "../components/Header"; // Import your Header component
import Footer from "../components/Footer"; // Import your Footer component

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Layout.Header style={{ padding: 0, background: "#001529" }}>
        <Header />
      </Layout.Header>

      {/* Main Content */}
      <Content style={{ padding: "24px", flex: 1, background: "#f0f2f5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>
      </Content>

      {/* Footer */}
      <Layout.Footer style={{ padding: 0 }}>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};

export default MainLayout;