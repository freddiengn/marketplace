import React from "react";
import { Link } from "react-router-dom";

/*As of now prop requires:
Image source
image alternative
Element Title
Element description*/

const Element_Layout = (prop) => {
  const { productid, src, title, description } = prop;
  return (
    <Link to={`/post_details/${productid}`} state={{ title, src, description }}>
      <div className="card">
        <img className="card-img-top" src={prop.src} alt={prop.alt} />
        <div className="card-body">
          <h5 className="card-title">{prop.title}</h5>
          <p className="card-text">{prop.description}</p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Element_Layout;
