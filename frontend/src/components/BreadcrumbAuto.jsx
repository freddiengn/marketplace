// components/BreadcrumbAuto.js
import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

const BreadcrumbAuto = () => {
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
  );
};

export default BreadcrumbAuto;