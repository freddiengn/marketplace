// layouts/MainLayout.js
import React from "react";
import { Layout } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import BreadcrumbAuto from "../components/BreadcrumbAuto";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <Layout
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <Layout.Header style={{ padding: 0, background: "#001529" }}>
          <Header />
        </Layout.Header>

        {/* Main Content */}
        <Content style={{ padding: "24px", flex: 1, background: "#f0f2f5" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <BreadcrumbAuto />

            {/* Render the main content */}
            {children}
          </div>
        </Content>

        {/* Footer */}
        <Layout.Footer style={{ padding: 0 }}>
          <Footer />
        </Layout.Footer>
      </Layout>
    </AuthProvider>
  );
};

export default MainLayout;