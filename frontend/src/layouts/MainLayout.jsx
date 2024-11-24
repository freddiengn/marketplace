import React from "react";
import { Layout, Breadcrumb } from "antd";
import Header from "../components/Header"; 
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom"; 
import { AuthProvider } from '../context/AuthContext';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const location = useLocation(); 

  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return pathnames.map((name, index) => {
      const path = `/${pathnames.slice(0, index + 1).join("/")}`;
      return {
        title: name.charAt(0).toUpperCase() + name.slice(1),
        path,
      };
    });
  };

  return (
    <AuthProvider>
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Layout.Header style={{ padding: 0, background: "#001529" }}>
        <Header />
      </Layout.Header>

      {/* Main Content */}
      <Content style={{ padding: "24px", flex: 1, background: "#f0f2f5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <Breadcrumb style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item>
              <a href="/">Home</a> {/* Home link */}
            </Breadcrumb.Item>
            {getBreadcrumbItems().map((item, index) => (
              <Breadcrumb.Item key={index}>
                <a href={item.path}>{item.title}</a>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>

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