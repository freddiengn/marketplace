import React from "react";
import Element_Layout from "./Element_Layout";

/*In future we would be receiving the details of the elements through an api in the form of prop*/
/*This forms the main page of the home screen
This layout has the elements in it*/

const Element_Page_Layout = (prop) => {
  let elements = [];
  for (let i = 0; i < 10; i++) {
    let a = "This is supposed to be title" + i;
    elements.push(
      <div className="col-md-4">
        <Element_Layout
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSG-kAeynj8yPVNDIYMwuXkNBtxou9wOVjpw&s"
          alt="A cat Image"
          title={a}
          edscription="This is a test case"
        />
      </div>
    );
  }

  return (
    <div className="album py-5 bg-danger">
      <div className="container">
        <div className="row">{elements}</div>
      </div>
    </div>
  );
};
export default Element_Page_Layout;
