import { React, useState, useRef, useEffect } from "react";
import edit from "./assets/edit.svg";
import axios from "axios";
import "./Edit.css";

function Edit({ data, setData, dataIndex, title, src }) {
  const inputRef = useRef(null);
  const [button, setButton] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(title);
  }, [title]);

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const putData = () => {
    if (title !== name) {
      axios
        .put(`http://localhost:3001/cats/${dataIndex}`, {
          title: name,
          src: src,
        })
        .then((res) => {
          setData(
            data.map((obj) => [res.data].find((o) => o.id === obj.id) || obj)
          );
        });
    }
  };

  return (
    <div className="cat-name">
      <div className="text-box-wrapper">
        <input
          ref={inputRef}
          className="text-box"
          key={data.id}
          value={name}
          name="title"
          type="text"
          onChange={nameChange}
        />
      </div>
      <div className="edit-img-wrapper" onClick={() => setButton(!button)}>
        <img
          className="edit-img"
          src={edit}
          onClick={() => {
            inputRef.current.focus();
          }}
        ></img>
      </div>
      <div className="save-btn-wrapper">
        <button onClick={putData}>Save</button>
      </div>
    </div>
  );
}

export default Edit;
