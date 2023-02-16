import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Vector from "./assets/Vector.svg";
import Edit from "./Edit";
import Popup from "./Upload";
import leftArrow from "./assets/leftArrow.svg";
import rightArrow from "./assets/rightArrow.svg";

function App() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [dataIndex, setDataIndex] = useState("");
  const [src, setSrc] = useState("");
  const [sliderImage, setSliderImage] = useState(1);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/cats`).then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    setTitle(data[0]?.title);
    setDataIndex(data[0]?.id);
    setSrc(data[0]?.src);
  }, [data]);

  const handleClick = (index) => {
    const item = data.map((val) => val.id).indexOf(index.id);
    const slider = data[item];
    setImage(slider);
    setTitle(slider.title);
    setDataIndex(slider.id);
    setSrc(slider.src);
  };

  const lastSlider = sliderImage * 4;
  const firstSlider = lastSlider - 4;
  const currentSlider = data.slice(firstSlider, lastSlider);

  const addImage = (res) => {
    setData([...data, res]);
  };

  return (
    <div>
      <div className="navBar">
        <img className="vector-img" src={Vector}></img>
        <h2 className="catlery">Catlery</h2>
      </div>
      <div className="nav-bar-text">
        <p>Adopt</p>
        <p>Stories</p>
        <p>Donate</p>
        <button onClick={() => setPopup(!popup)} className="upload-btn">
          Upload
        </button>
      </div>

      <div key={data.id} className="img-cat">
        <img
          className="img-cat"
          src={image?.src ? image?.src : data[0]?.src}
          alt="no img"
        />
        <Edit
          data={data}
          setData={setData}
          image={image}
          dataIndex={dataIndex}
          title={title}
          src={src}
        />
      </div>

      <div className="img-container">
        <div className="slider-btns">
          <button
            id="btn-prev"
            onClick={() => setSliderImage(sliderImage - 1)}
            disabled={firstSlider === 0}
          >
            <img src={leftArrow} alt="" />
          </button>
        </div>

        {currentSlider.map((val) => (
          <div className="small-imgs">
            <img
              key={val.id}
              className="img-small"
              src={val.src}
              onClick={() => handleClick(val)}
            />
          </div>
        ))}
        <div className="slider-btns">
          <button
            id="btn-next"
            onClick={() => setSliderImage(sliderImage + 1)}
            disabled={lastSlider === data.length || currentSlider.length < 4}
          >
            <img src={rightArrow} alt="" />
          </button>
        </div>
      </div>
      {popup && <Popup setPopup={setPopup} onCreate={addImage} />}
    </div>
  );
}

export default App;
