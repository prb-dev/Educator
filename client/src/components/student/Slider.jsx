import { Carousel } from "antd";
// import skillImg from "../../assets/skills-min-scaled.png";
import sliderData from "../../data/sliderData";

const contentStyle = {
  height: "300px",
  width: "100%",
  color: "#fff",
  alignContent: "center",
  background: "#364d79",
  position: "relative",
  marginTop: "100px",
};

const sliderImg = {
  width: "60%",
  position: "relative",
  left: "0px",
  height: "300px",
};

const textContainer = {
  padding: "20px",

  width: "30%",
  display: "block",
  position: "relative",
  top: "20px",
  left: "20px",
  borderRadius: "20px",
};

const sliderText = {
  fontSize: "40px",
  fontFamily: "PT Serif, serif",
  fontWeight: 400,
  fontStyle: "normal",
};
const sliderText2 = {
  fontSize: "20px",
};

export default function Slider() {
  return (
    <div>
      <>
        <Carousel autoplay>
          {sliderData.map((slide) => (
            <div key={slide.id}>
              <div style={contentStyle}>
                <div className="flex justify-between">
                  <div style={textContainer}>
                    <div style={sliderText}>{slide.title}</div>
                    <div style={sliderText2}>{slide.description}</div>
                  </div>
                  <img style={sliderImg} src={slide.image} alt="skill Image" />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </>
    </div>
  );
}
