import React from "react";

const Post_Details = (prop) => {
  return (
    <section className="hero bg-dark pt-5">
      <div className="container bg-danger">
        <div className="row gutter-2 gutter-md-4 justify-content-between">
          <div className="col-lg-7">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSG-kAeynj8yPVNDIYMwuXkNBtxou9wOVjpw&s" />
          </div>
          <div className="col-lg-5 mb-5 mb-lg-0">
            <h1>"Item Number 1"</h1>
            <br />
            <p>
              "This is a test description that is here to serve as an example of
              the actual description"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post_Details;
