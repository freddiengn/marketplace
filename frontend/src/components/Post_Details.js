import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Post_Details = () => {
  const { productid } = useParams();
  const location = useLocation();
  const { title, src, description } = location.state || {};
  return (
    <section className="hero bg-dark pt-5">
      <div className="container bg-danger">
        <div className="row gutter-2 gutter-md-4 justify-content-between">
          <div className="col-lg-7">
            <img src={src} />
          </div>
          <div className="col-lg-5 mb-5 mb-lg-0">
            <h1>{title}</h1>
            <br />
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post_Details;
