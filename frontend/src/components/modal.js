import React from "react";
import { useSelector } from "react-redux";
const Modal = () => {
  const { description } = useSelector((state) => state.Products);
  return (
    <div
      style={{
        height: "fitContent",
        minHeight: "450px",
        position: "fixed",
        width: "21%",
        zIndex: "1",
        top: "70px",
        padding: "0px 15px 20px",
        right: "15px",
        backgroundColor: "#3F51B5",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "white" }}>{description}</h1>
    </div>
  );
};

export default Modal;
