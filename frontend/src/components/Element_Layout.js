import React from "react";

/*As of now prop requires:
Image source
image alternative
Element Title
Element description*/
const Element_Layout = (prop) => {
  return (
    <a href="/post_details">
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
    </a>
  );
};
export default Element_Layout;
