import React from "react";
import "./Upload.css";
import axios from "axios";
import { useState } from "react";

function Popup({ setPopup, onCreate }) {
  const [title, setTitle] = useState("");
  const [src, setSrc] = useState("");

  const postData = async () => {
    await axios
      .post("http://localhost:3001/cats", {
        title,
        src,
      })
      .then((result) => onCreate(result.data));
    setPopup(false);
  };
  return (
    <div className="upload-page">
      <div className="upload-box">
        <div className="heading">
          <h2 className="heading-line">Add New Image To Gallery</h2>
        </div>
        <div className="input-value">
          <input
            type="text"
            value={title}
            className="input-box"
            placeholder=" Enter Name... "
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            type="text"
            value={src}
            className="input-box"
            placeholder=" Upload Img..."
            onChange={(e) => setSrc(e.target.value)}
          ></input>

          <button className="btn-submit" onClick={postData}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
