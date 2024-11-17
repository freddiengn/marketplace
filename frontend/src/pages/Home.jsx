import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductService from "../services/ProductService"; // Import the ProductService
import Header from "../components/Header";
import Footer from "../components/Footer";
import ElementPageLayout from "../components/ElementPageLayout";
import { useForm } from "antd/lib/form/Form";

const Home = () => {
  return (
    <body className="d-flex flex-column min-vh-100 bg-danger">
      <div className="container">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2 bg-secondary"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn text-white bg-black" type="submit">
            Search
          </button>
        </form>
        <Element_Page_Layout />
        <br />
        <br />
        <p>Expected structure</p>
        <p>Main Body</p>
        <p>
          ---header <strong> Completed</strong>
        </p>
        <p>---Body</p>
        <p>
          ------Search bar{" "}
          <strong> Completed needs js for dictating the usage</strong>(future
          implimentation/ low priority)
        </p>
        <p>------rows div</p>
        <p>---------left row div (contains filters (future update))</p>
        <p>
          ---------right row div (contains elements) <strong> Completed</strong>
        </p>
        <p>
          ------------elements (div) (Upon clicking this elements we should be
          redirected to elements page)
        </p>
        <p>---------------div</p>
        <p>------------------image</p>
        <p>---------------seller's username</p>
        <p>---------------product's mini description</p>
        <p>
          ---------------chat icon (clicking this should redirect us to the
          chats feature)
        </p>
        <p>---------------price</p>
        <p>---------------like button (maybe)</p>
        <p>---footer</p>
      </div>
    </body>
  );
};

export default Home;
